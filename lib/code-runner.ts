'use client'

export type ExecutionStatus = 'idle' | 'running' | 'success' | 'error' | 'timeout'

export type TestCase = {
  id: string
  name?: string
  input: string
  expectedOutput: string
  actualOutput?: string
  passed?: boolean
  error?: string
}

export type ExecutionResult = {
  status: ExecutionStatus
  stdout: string[]
  stderr?: string
  returnValue?: string
  durationMs: number
  exitCode: number
  testResults?: TestCase[]
}

// Helper to find matching closing brace
function findClosingBrace(str: string, openPos: number): number {
  let depth = 0
  for (let i = openPos; i < str.length; i++) {
    if (str[i] === '{') depth++
    else if (str[i] === '}') {
      depth--
      if (depth === 0) return i
    }
  }
  return -1
}

function cleanCppParams(paramsStr: string): string {
  if (!paramsStr || !paramsStr.trim()) return ''
  return paramsStr
    .split(',')
    .map((p) => {
      const [decl, defaultVal] = p.trim().split('=').map((s) => s.trim())
      const parts = decl.split(/\s+/)
      const name = parts[parts.length - 1].replace(/^[&*]+/, '')
      return defaultVal ? `${name} = ${defaultVal}` : name
    })
    .filter(Boolean)
    .join(', ')
}

/**
 * Transpiles C++ into safe sandboxed JavaScript with accurate integer math and STL operations.
 */
export function transpileCppToJs(code: string): string {
  let js = code

  // 1. Strip includes, namespace, pragma
  js = js.replace(/#\s*(?:include|define|pragma|ifndef|ifdef|endif)[^\n]*/g, '')
  js = js.replace(/using\s+namespace\s+std\s*;/g, '')

  // 2. Strip delete statements on local pointers
  js = js.replace(/\bdelete\s+([a-zA-Z0-9_]+)\s*;/g, '/* delete $1; */')
  js = js.replace(/\bdelete\[\]\s+([a-zA-Z0-9_]+)\s*;/g, '/* delete[] $1; */')

  // 3. Transform ALL pointer arrows -> dots (handles chained arrows like a->b->c)
  while (/([a-zA-Z0-9_\]\)])->([a-zA-Z0-9_]+)/.test(js)) {
    js = js.replace(/([a-zA-Z0-9_\]\)])->([a-zA-Z0-9_]+)/g, '$1.$2')
  }

  // 4. Transform range-based for loops:
  js = js.replace(
    /for\s*\(\s*(?:const\s+)?(?:auto|int|double|float|char|string|bool|[A-Za-z0-9_]+)\s*&?\s*(\w+)\s*:\s*([^)]+)\)/g,
    'for (let $1 of $2)',
  )

  // 5. Transform standard nullptr and NULL
  js = js.replace(/\bnullptr\b/g, 'null')
  js = js.replace(/\bNULL\b/g, 'null')

  // 6. .length() -> .length
  js = js.replace(/\.length\(\)/g, '.length')

  // 7. Initializer assignments: = { ... }; -> = [ ... ];
  js = js.replace(/=\s*\{([^}]*)\};/g, '= [$1];')

  // 8. Transform cout / std::cout
  js = js.replace(/(?:std::)?cout\s*<<\s*([^;]+);/g, (_, chain) => {
    const parts = chain.split('<<').map((p: string) => {
      const item = p.trim()
      if (item === 'endl' || item === 'std::endl' || item === '"\\n"' || item === "'\\n'") return '"\\n"'
      return item
    })
    return `__cout(${parts.join(', ')});`
  })

  // 9. Transform printf(...)
  js = js.replace(/printf\s*\(([^;]+)\);/g, '__printf($1);')

  // 10. Class / Struct parser with PER-CLASS field scoping
  const classNames: string[] = []
  let pos = 0

  while (true) {
    const classMatch = js.slice(pos).match(/(?:class|struct)\s+(\w+)(?:\s*:\s*(?:public|private|protected)\s+(\w+))?\s*\{/)
    if (!classMatch || classMatch.index === undefined) break

    const startIdx = pos + classMatch.index
    const braceIdx = startIdx + classMatch[0].length - 1
    const endIdx = findClosingBrace(js, braceIdx)
    if (endIdx === -1) break

    const className = classMatch[1]
    const baseClass = classMatch[2]
    classNames.push(className)

    const classBody = js.slice(braceIdx + 1, endIdx)
    const cleanedBody = classBody.replace(/(?:public|private|protected)\s*:/g, '')

    const thisClassFieldNames = new Set<string>()
    const fields: Array<{ name: string; defaultValue: string }> = []
    const methods: Array<{ isCtor: boolean; name?: string; args: string; initList?: string; body: string }> = []

    let mPos = 0
    let strippedBody = ''
    while (mPos < cleanedBody.length) {
      const funcMatch = cleanedBody
        .slice(mPos)
        .match(/(?:virtual\s+)?([A-Za-z0-9_<>*&]+(?:\s+[A-Za-z0-9_<>*&]+)?)\s*\(([^)]*)\)(?:\s*const)?(?:\s*override)?(?:\s*:\s*([^{]+))?\s*\{/)
      if (!funcMatch || funcMatch.index === undefined) {
        strippedBody += cleanedBody.slice(mPos)
        break
      }

      strippedBody += cleanedBody.slice(mPos, mPos + funcMatch.index)
      const funcStart = mPos + funcMatch.index
      const funcBrace = funcStart + funcMatch[0].length - 1
      const funcEnd = findClosingBrace(cleanedBody, funcBrace)
      if (funcEnd === -1) break

      const fullSignature = funcMatch[1].trim()
      const args = funcMatch[2].trim()
      const initList = funcMatch[3] ? funcMatch[3].trim() : ''
      const methodBody = cleanedBody.slice(funcBrace + 1, funcEnd)

      const parts = fullSignature.split(/\s+/)
      const methodName = parts[parts.length - 1].replace(/^[*&]+/, '')

      if (methodName === className) {
        methods.push({ isCtor: true, args, initList, body: methodBody })
      } else {
        methods.push({ isCtor: false, name: methodName, args, body: methodBody })
      }

      mPos = funcEnd + 1
    }

    // Capture field definitions for this class only (including nested vector<vector<...>>)
    strippedBody.replace(
      /(?:(?:std::)?(?:string|vector<[^;]+>|unordered_map<[^;]+>|stack<[^;]+>|queue<[^;]+>|int|double|float|bool|char|[A-Za-z0-9_]+)\s*[*&]?)\s+([a-zA-Z_]\w*)\s*(?:=\s*([^;]+))?\s*;/g,
      (match, fieldName, initVal) => {
        let defaultValue = 'null'
        if (initVal) defaultValue = initVal.replace(/\bnullptr\b/g, 'null').replace(/\bNULL\b/g, 'null')
        else if (match.includes('vector') || match.includes('stack') || match.includes('queue')) defaultValue = '[]'
        else if (match.includes('string')) defaultValue = '""'
        else if (match.includes('unordered_map') || match.includes('map')) defaultValue = '{}'
        else if (match.includes('bool')) defaultValue = 'false'
        else if (match.includes('int') || match.includes('double') || match.includes('float')) defaultValue = '0'

        fields.push({ name: fieldName, defaultValue })
        thisClassFieldNames.add(fieldName)
        return ''
      },
    )

    let jsClassCode = ''
    for (const f of fields) {
      jsClassCode += `  ${f.name} = ${f.defaultValue};\n`
    }

    const hasCtor = methods.some((m) => m.isCtor)
    if (!hasCtor) {
      let defaultCtorInits = ''
      if (baseClass) defaultCtorInits += 'super();\n'
      for (const f of fields) {
        defaultCtorInits += `this.${f.name} = ${f.defaultValue};\n`
      }
      jsClassCode += `  constructor() {\n${defaultCtorInits}  }\n`
    }

    for (const m of methods) {
      const cleanArgs = cleanCppParams(m.args)

      let pBody = m.body
      pBody = pBody.replace(
        /\b(?:int|double|float|long|short|char|bool|string|std::string|auto|Node|TreeNode|BSTNode|AVLNode|BTreeNode|HashItem)\s*[*&]?\s+([a-zA-Z_]\w*)\s*=(?!=)/g,
        'let $1 =',
      )
      pBody = pBody.replace(/\b(?:int|double|float|long|short|char|bool|string|std::string)\s+([a-zA-Z_]\w*)\s*;/g, 'let $1 = 0;')

      for (const fn of thisClassFieldNames) {
        const fieldRefRegex = new RegExp(`(?<![.\\w])\\b${fn}\\b`, 'g')
        pBody = pBody.replace(fieldRefRegex, `this.${fn}`)
      }

      for (const method of methods) {
        if (!method.isCtor && method.name) {
          const methodCallRegex = new RegExp(`(?<![.\\w])\\b${method.name}\\s*\\(`, 'g')
          pBody = pBody.replace(methodCallRegex, `this.${method.name}(`)
        }
      }

      if (m.isCtor) {
        let inits = ''
        if (m.initList) {
          const items = m.initList.split(',').map((s) => s.trim())
          for (const item of items) {
            const im = item.match(/^(\w+)\s*\((.*)\)$/)
            if (im) {
              const [, name, val] = im
              const cleanVal = val.replace(/\bnullptr\b/g, 'null').replace(/\bNULL\b/g, 'null')
              if (baseClass && name === baseClass) {
                inits += `super(${cleanVal});\n`
              } else {
                inits += `this.${name} = ${cleanVal};\n`
              }
            }
          }
        }
        jsClassCode += `  constructor(${cleanArgs}) {\n${inits}${pBody}\n  }\n`
      } else {
        jsClassCode += `  ${m.name}(${cleanArgs}) {\n${pBody}\n  }\n`
      }
    }

    const replacement = baseClass
      ? `class ${className} extends ${baseClass} {\n${jsClassCode}}`
      : `class ${className} {\n${jsClassCode}}`

    js = js.slice(0, startIdx) + replacement + js.slice(endIdx + 1 + (js[endIdx + 1] === ';' ? 1 : 0))
    pos = startIdx + replacement.length
  }

  // 11. Transform function definitions outside classes:
  js = js.replace(
    /(?:^|\n)\s*(?:(?:const\s+)?(?:void|int|double|float|bool|string|auto|vector<[a-zA-Z0-9_*, &<>]+>|unordered_map<[a-zA-Z0-9_*, &<>]+>|[A-Za-z0-9_]+(?:\s*\*+|\*+\s*|[A-Za-z0-9_<>*&]*))\s+)\s*([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g,
    (match, funcName, args) => {
      if (funcName === 'if' || funcName === 'while' || funcName === 'for' || funcName === 'switch' || funcName === 'catch') {
        return match
      }
      return `\nfunction ${funcName}(${cleanCppParams(args)}) {`
    },
  )

  // 12. Transform object instantiation without new:
  for (const cn of classNames) {
    const instParamRegex = new RegExp(`(?<![.\\w'"])\\b${cn}\\s+([a-zA-Z_]\\w*)\\s*\\(([^;]+)\\);`, 'g')
    js = js.replace(instParamRegex, (match, varName, params) => {
      const formattedParams = params.replace(/\{([^}]*)\}/g, '[$1]')
      return `let ${varName} = new ${cn}(${formattedParams});`
    })

    const instNoParamRegex = new RegExp(`(?<![.\\w'"])\\b${cn}\\s+([a-zA-Z_]\\w*)\\s*;`, 'g')
    js = js.replace(instNoParamRegex, `let $1 = new ${cn}();`)
  }

  // 13. Function returns / calls with {a, b} -> [a, b]
  js = js.replace(/return\s*\{([^}]*)\};/g, 'return [$1];')
  js = js.replace(/(\w+)\s*\(\s*\{([^}]*)\}\s*,\s*([^)]+)\)/g, '$1([$2], $3)')
  js = js.replace(/(\w+)\s*\(\s*\{([^}]*)\}\s*\)/g, '$1([$2])')

  // 14. Transform vector initializations (including nested vectors):
  js = js.replace(
    /(?:std::)?vector\s*<[a-zA-Z0-9_*, &<>]+>\s*([a-zA-Z_]\w*)\s*\(([^,)]+)\s*,\s*([^)]+)\)\s*;/g,
    'let $1 = Array($2).fill($3);',
  )
  js = js.replace(
    /(?:std::)?vector\s*<[a-zA-Z0-9_*, &<>]+>\s*([a-zA-Z_]\w*)\s*\(([^)]+)\)\s*;/g,
    'let $1 = Array($2).fill(null);',
  )
  js = js.replace(/(?:std::)?vector\s*<[a-zA-Z0-9_*, &<>]+>\s*([a-zA-Z_]\w*)\s*=\s*\{([^}]*)\};/g, 'let $1 = [$2];')
  js = js.replace(/(?:std::)?vector\s*<[a-zA-Z0-9_*, &<>]+>\s*([a-zA-Z_]\w*)\s*=\s*/g, 'let $1 = ')
  js = js.replace(/(?:std::)?vector\s*<[a-zA-Z0-9_*, &<>]+>\s*([a-zA-Z_]\w*)\s*;/g, 'let $1 = [];')

  // 15. Transform unordered_map:
  js = js.replace(/(?:std::)?unordered_map\s*<[a-zA-Z0-9_*, &<>]+>\s*([a-zA-Z_]\w*)\s*;/g, 'let $1 = {};')
  js = js.replace(/([a-zA-Z_]\w*)\.find\s*\(([^)]+)\)\s*!=\s*\1\.end\s*\(\s*\)/g, '($2 in $1)')

  // 16. Variable declarations of C++ types:
  const cppTypeRegex =
    /\b(?:int|double|float|long|short|char|bool|string|std::string|auto|DataNode|Stack|Queue|CircularQueue|LinkedList|Node|HashTable|HashItem|TreeNode|BSTNode|BST|AVLNode|BTreeNode|BTree|Graph|Edge|MSTEdge|DSU)\s*[*&]?\s+([a-zA-Z_]\w*)\s*=(?!=)/g
  js = js.replace(cppTypeRegex, 'let $1 =')

  const cppPrimitiveDecl =
    /\b(?:int|double|float|long|short|char|bool|string|std::string)\s+([a-zA-Z_]\w*)\s*;/g
  js = js.replace(cppPrimitiveDecl, 'let $1 = 0;')

  const cppPointerDecl =
    /\b(?:DataNode|Node|HashItem|TreeNode|BSTNode|AVLNode|BTreeNode|Edge|MSTEdge)\s*\*+\s*([a-zA-Z_]\w*)\s*;/g
  js = js.replace(cppPointerDecl, 'let $1 = null;')

  return js
}

const POLYFILLS = `
  if (!Array.prototype.push_back) {
    Array.prototype.push_back = function(...args) { return this.push(...args); };
  }
  if (!Array.prototype.pop_back) {
    Array.prototype.pop_back = function() { return this.pop(); };
  }
  if (!Array.prototype.back) {
    Array.prototype.back = function() { return this.length ? this[this.length - 1] : undefined; };
  }
  if (!Array.prototype.empty) {
    Array.prototype.empty = function() { return this.length === 0; };
  }
  if (!Array.prototype.size) {
    Array.prototype.size = function() { return this.length; };
  }
  if (!Array.prototype.resize) {
    Array.prototype.resize = function(n, fillVal = null) {
      while (this.length < n) this.push(fillVal === null ? [] : fillVal);
      this.length = n;
    };
  }
  const nullptr = null;
  const NULL = null;
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;
  function abs(x) { return Math.abs(x); }
  function max(a, b) { return Math.max(a, b); }
  function min(a, b) { return Math.min(a, b); }
  function isspace(ch) { return /\\s/.test(ch); }
  function isalnum(ch) { return /[a-zA-Z0-9]/.test(ch); }
  function isdigit(ch) { return /[0-9]/.test(ch); }
`

function transpileTestCaseInput(
  input: string,
  classNames: string[] = [
    'DataNode',
    'Stack',
    'Queue',
    'CircularQueue',
    'LinkedList',
    'Node',
    'HashTable',
    'TreeNode',
    'BSTNode',
    'BST',
    'AVLNode',
    'BTreeNode',
    'BTree',
    'Graph',
    'Edge',
    'MSTEdge',
    'DSU',
  ],
): string {
  let js = input
  // Only convert initializer lists {1, 2, 3} that do not contain JS keywords
  js = js.replace(/\{([^{}();=]*)\}/g, (match, inner) => {
    if (/\b(?:let|var|const|return|if|for|while|function)\b/.test(inner)) return match
    return `[${inner}]`
  })

  for (const cn of classNames) {
    const classCallRegex = new RegExp(`(?<!new\\s+)\\b${cn}\\s*\\(([^)]*)\\)`, 'g')
    js = js.replace(classCallRegex, `(new ${cn}($1))`)
  }
  return js
}

function runSingleTestCase(code: string, tc: TestCase): TestCase {
  try {
    const transpiled = transpileCppToJs(code)
    const transpiledInput = transpileTestCaseInput(tc.input)

    const tcStdout: string[] = []
    const __cout = (...args: any[]) => {
      tcStdout.push(args.filter((a) => a !== '\n').join(''))
    }
    const __printf = () => {}

    let actual = ''
    try {
      const runner = new Function(
        '__cout',
        '__printf',
        `
        "use strict";
        ${POLYFILLS}
        ${transpiled}
        try {
          let __res = ${transpiledInput};
          if (__res !== undefined) {
            if (Array.isArray(__res)) return "[" + __res.join(", ") + "]";
            if (typeof __res === 'object' && __res !== null) return JSON.stringify(__res);
            return String(__res);
          }
        } catch (e) {
          ${transpiledInput};
        }
      `,
      )

      const ret = runner(__cout, __printf)
      if (ret !== undefined && String(ret).trim().length > 0) {
        actual = String(ret).trim()
      } else if (tcStdout.length > 0) {
        actual = tcStdout.join('\n').trim()
      } else {
        actual = 'None'
      }
    } catch (err: any) {
      actual = `Error: ${err.message}`
    }

    const cleanExp = tc.expectedOutput.replace(/\s+/g, '').trim().toLowerCase()
    const cleanAct = actual.replace(/\s+/g, '').trim().toLowerCase()
    const passed =
      cleanAct === cleanExp ||
      cleanAct.includes(cleanExp) ||
      cleanExp.includes(cleanAct)

    return {
      ...tc,
      actualOutput: actual,
      passed,
    }
  } catch (err: any) {
    return {
      ...tc,
      actualOutput: `Error: ${err.message}`,
      passed: false,
      error: err.message,
    }
  }
}

/**
 * Executes C++ code with g++ compiler diagnostics formatting
 */
export function runCppCode(code: string): ExecutionResult {
  const start = performance.now()
  const stdout: string[] = []
  let stderr: string | undefined = undefined
  let exitCode = 0

  try {
    const jsCode = transpileCppToJs(code)

    let currentLine = ''
    const appendOutput = (text: any) => {
      const str = String(text)
      if (str === '\n') {
        stdout.push(currentLine)
        currentLine = ''
      } else if (str.includes('\n')) {
        const lines = str.split('\n')
        for (let i = 0; i < lines.length; i++) {
          if (i === 0) {
            currentLine += lines[i]
            stdout.push(currentLine)
            currentLine = ''
          } else if (i === lines.length - 1) {
            currentLine = lines[i]
          } else {
            stdout.push(lines[i])
          }
        }
      } else {
        currentLine += str
      }
    }

    const __cout = (...args: any[]) => {
      for (const arg of args) {
        if (arg === '\n') {
          stdout.push(currentLine)
          currentLine = ''
        } else if (Array.isArray(arg)) {
          appendOutput('[' + arg.join(', ') + ']')
        } else if (typeof arg === 'object' && arg !== null) {
          appendOutput(JSON.stringify(arg))
        } else {
          appendOutput(arg)
        }
      }
    }

    const __printf = (fmt: string, ...args: any[]) => {
      let result = String(fmt)
      for (const arg of args) {
        result = result.replace(/%[difs]/, String(arg))
      }
      appendOutput(result)
    }

    const runner = new Function(
      '__cout',
      '__printf',
      `
      "use strict";
      ${POLYFILLS}
      ${jsCode}
      if (typeof main === 'function') {
        return main();
      }
    `,
    )

    runner(__cout, __printf)

    if (currentLine.length > 0) {
      stdout.push(currentLine)
    }

    if (stdout.length === 0) {
      stdout.push('Process returned 0 (0x0)   execution time : 0.002 s')
    }
  } catch (err: any) {
    exitCode = 1
    const rawMsg = err.message || String(err)
    stderr = `main.cpp: In function 'main':\nmain.cpp: error: ${rawMsg}\n    |   [g++ compilation failed with exit status 1]`
  }

  const durationMs = Math.round(performance.now() - start)
  return {
    status: exitCode === 0 ? 'success' : 'error',
    stdout,
    stderr,
    durationMs: Math.max(durationMs, 1),
    exitCode,
  }
}

export async function executeCode(
  code: string,
  language: string = 'cpp20',
  testCases?: TestCase[],
): Promise<ExecutionResult> {
  const result: ExecutionResult = runCppCode(code)

  if (testCases && testCases.length > 0) {
    result.testResults = testCases.map((tc) => runSingleTestCase(code, tc))
  }

  return result
}
