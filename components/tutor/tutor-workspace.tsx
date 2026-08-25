'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Bot,
  Send,
  Sparkles,
  Code2,
  Bug,
  Lightbulb,
  Gauge,
  RotateCcw,
  Play,
  User as UserIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { executeCode, type ExecutionResult, type TestCase } from '@/lib/code-runner'
import { CodeOutputConsole } from '@/components/tutor/code-output-console'
import { problems } from '@/lib/mock-data'

type Mode = 'explain' | 'debug' | 'hint' | 'optimize'

type Block =
  | { kind: 'text'; content: string }
  | { kind: 'code'; content: string }
  | { kind: 'callout'; tone: 'info' | 'warning' | 'success'; content: string }

type Message = {
  id: string
  role: 'user' | 'tutor'
  mode?: Mode
  code?: string
  language?: string
  blocks?: Block[]
  text?: string
  errorContext?: string
}

const modes: { value: Mode; label: string; icon: typeof Code2 }[] = [
  { value: 'explain', label: 'Explain', icon: Code2 },
  { value: 'debug', label: 'Debug', icon: Bug },
  { value: 'hint', label: 'Hint', icon: Lightbulb },
  { value: 'optimize', label: 'Optimize', icon: Gauge },
]

const sampleCode = `#include <iostream>
#include <string>
#include <vector>

using namespace std;

// Basic data structure node representing a memory record
struct DataNode {
    int id;
    string label;
    double value;

    DataNode(int i, string l, double v) : id(i), label(l), value(v) {}

    void display() const {
        cout << "Node [ID: " << id << ", Label: " << label << ", Value: " << value << "]" << endl;
    }
};

int main() {
    cout << "=== 1. Data Structures Basics in C++ ===" << endl;
    
    // Static record
    DataNode n1(101, "Sensor_Alpha", 98.6);
    n1.display();

    // Dynamic record allocation
    DataNode* n2 = new DataNode(102, "Sensor_Beta", 104.2);
    n2->display();

    delete n2;
    return 0;
}`

const starter: Message[] = [
  {
    id: 'intro',
    role: 'tutor',
    blocks: [
      {
        kind: 'text',
        content:
          "Hi Aatif! I'm your AI tutor for **21 C++ Data Structures & Algorithms Concepts**. You can select any concept from the practice list or write custom C++ code here. Click **Run Code** (or press Ctrl+Enter) to execute in the in-browser C++ console, or choose a mode below to get concept breakdowns, debugging help, guided hints, or O(n) algorithmic optimizations.",
      },
    ],
  },
]

function buildResponse(mode: Mode, code: string, errorContext?: string): Block[] {
  if (errorContext) {
    return [
      {
        kind: 'text',
        content: `I analyzed the C++ compilation/runtime error:`,
      },
      {
        kind: 'warning',
        tone: 'warning',
        content: `Error Output: ${errorContext}`,
      },
      {
        kind: 'info',
        tone: 'info',
        content:
          'In C++, common causes include: missing semicolons, forgetting `#include <vector>` or `#include <iostream>`, nullptr pointer dereferencing (`curr->next` when `curr == nullptr`), or out-of-bounds array access.',
      },
      {
        kind: 'text',
        content: 'Check your code syntax, apply the fixes, and click "Run Code" again to verify!',
      },
    ]
  }

  const hasMissingInclude = !code.includes('#include')
  const hasPassByValueVector = /vector<\w+>\s+\w+(?!\s*&)/.test(code) && code.includes('void ')
  const hasOffByOne = /<=\s*\w+\.size\(\)/.test(code)

  if (mode === 'debug') {
    const blocks: Block[] = [
      { kind: 'text', content: "I traced through your C++ code and analyzed potential memory & logic issues below." },
    ]
    if (hasMissingInclude) {
      blocks.push({
        kind: 'warning',
        tone: 'warning',
        content:
          'Header Warning: Missing standard headers. Remember to include `#include <iostream>`, `#include <vector>`, and `using namespace std;` for DSA concepts.',
      })
    }
    if (hasOffByOne) {
      blocks.push({
        kind: 'warning',
        tone: 'warning',
        content:
          'Bug #1 — Out of Bounds: You used `i <= vec.size()`. In C++ 0-indexed vectors and arrays, valid indices are `0` to `size() - 1`. Change to `i < vec.size()`.',
      })
    }
    if (hasPassByValueVector) {
      blocks.push({
        kind: 'warning',
        tone: 'warning',
        content:
          'Performance Bug — Pass by Value: Passing `vector<int>` by value copies the entire array. Use `const vector<int>&` to pass by reference in O(1) time.',
      })
    }
    if (!hasOffByOne && !hasMissingInclude) {
      blocks.push({
        kind: 'success',
        tone: 'success',
        content:
          "Code structure and types look solid! Check edge cases (e.g. empty vectors `v.empty()`, single-element lists, nullptr base cases, or circular modulo bounds).",
      })
    } else {
      blocks.push({
        kind: 'text',
        content: 'Fix the highlighted points and click "Run Code" to inspect the stdout in the terminal below.',
      })
    }
    return blocks
  }

  if (mode === 'hint') {
    return [
      {
        kind: 'text',
        content: "Here are some step-by-step DSA hints for this C++ concept:",
      },
      {
        kind: 'info',
        tone: 'info',
        content:
          'Hint 1: What is the optimal time complexity? If nested loops are O(n²), can you use a hash table (`std::unordered_map`), binary search O(log n), or two pointers O(n)?',
      },
      {
        kind: 'info',
        tone: 'info',
        content:
          'Hint 2: For dynamic node structures (Linked Lists, Binary Trees, BST, AVL), always guard against `nullptr` base cases before accessing child pointers (`root->left`, `curr->next`).',
      },
      { kind: 'text', content: 'Try applying these hints, then run your code to test against the test cases.' },
    ]
  }

  if (mode === 'optimize') {
    return [
      { kind: 'text', content: 'Here is how to optimize this C++ implementation for performance and memory efficiency:' },
      {
        kind: 'info',
        tone: 'info',
        content:
          '1. Always pass large STL containers (vector, string, graph adjacency lists) by `const &` to eliminate O(n) memory allocation overhead on every recursive or helper function call.',
      },
      {
        kind: 'code',
        content: `// Optimized function signature:\nvoid processData(const vector<int>& data, vector<bool>& visited) {\n    // In-place traversal with O(1) auxiliary overhead\n}`,
      },
      {
        kind: 'success',
        tone: 'success',
        content: 'Time Complexity: Optimal O(n) or O(log n) | Space Complexity: O(1) auxiliary memory.',
      },
    ]
  }

  // explain
  return [
    {
      kind: 'text',
      content:
        'This C++ program implements the concept using clean data structures and modern C++ memory management.',
    },
    {
      kind: 'text',
      content:
        'It structures node records and algorithms with type safety, pointer references, and efficient O(1) / O(log n) / O(n) operations.',
    },
    {
      kind: 'info',
      tone: 'info',
      content:
        'C++ Key Principle: Direct memory control via pointers and dynamic allocation (`new` / `delete`) provides optimal cache locality and performance.',
    },
    {
      kind: 'text',
      content: 'Click "Run Code" below to compile & run the code in the output console!',
    },
  ]
}

function BlockView({ block }: { block: Block }) {
  if (block.kind === 'code') {
    return (
      <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-background/60 p-3 font-mono text-xs leading-relaxed">
        <code>{block.content}</code>
      </pre>
    )
  }
  if (block.kind === 'callout') {
    const tone = {
      info: 'border-primary/30 bg-primary/8 text-foreground',
      warning: 'border-warning/30 bg-warning/10 text-foreground',
      success: 'border-success/30 bg-success/10 text-foreground',
    }[block.tone]
    return (
      <div className={cn('mt-2 rounded-lg border p-3 text-sm leading-relaxed', tone)}>
        {block.content}
      </div>
    )
  }
  return <p className="mt-2 text-sm leading-relaxed text-pretty first:mt-0">{block.content}</p>
}

function normalize(blocks: Block[]): Block[] {
  return blocks.map((b) =>
    b.kind === 'text' || b.kind === 'code'
      ? b
      : ({ kind: 'callout', tone: (b as { tone: 'info' | 'warning' | 'success' }).tone, content: b.content } as Block),
  )
}

export function TutorWorkspace({
  prefillCode,
  problemId,
}: {
  prefillCode?: string
  problemId?: string
}) {
  const [code, setCode] = useState(prefillCode ?? sampleCode)
  const [language, setLanguage] = useState('cpp20')
  const [mode, setMode] = useState<Mode>('explain')
  const [messages, setMessages] = useState<Message[]>(starter)
  const [thinking, setThinking] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Find problem info and test cases if problemId provided
  const activeProblem = problems.find((p) => p.id === problemId)
  const testCases: TestCase[] | undefined = activeProblem?.testCases?.map((tc) => ({
    id: tc.id,
    name: tc.name,
    input: tc.input,
    expectedOutput: tc.expectedOutput,
  }))

  useEffect(() => {
    if (prefillCode) {
      setCode(prefillCode)
    }
  }, [prefillCode])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  async function handleRunCode() {
    if (!code.trim() || isRunning) return
    setIsRunning(true)

    try {
      const res = await executeCode(code, language, testCases)
      setExecutionResult(res)
    } catch (err: any) {
      setExecutionResult({
        status: 'error',
        stdout: [],
        stderr: err.message || String(err),
        durationMs: 1,
        exitCode: 1,
      })
    } finally {
      setIsRunning(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleRunCode()
    }
  }

  function submit(customError?: string) {
    if (!code.trim() || thinking) return
    const currentMode = customError ? 'debug' : mode
    if (customError) setMode('debug')

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      mode: currentMode,
      code,
      language,
      errorContext: customError,
    }
    setMessages((m) => [...m, userMsg])
    setThinking(true)

    setTimeout(() => {
      const tutorMsg: Message = {
        id: `t-${Date.now()}`,
        role: 'tutor',
        blocks: normalize(buildResponse(currentMode, code, customError)),
      }
      setMessages((m) => [...m, tutorMsg])
      setThinking(false)
    }, 1000)
  }

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      {/* Left Column: Code Editor & Output Console */}
      <div className="flex flex-col gap-4 lg:col-span-6 xl:col-span-7">
        <Card className="flex flex-col border-border/80 shadow-md">
          <CardHeader className="pb-3 border-b border-border/60">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-semibold">C++ & DSA Editor</CardTitle>
                {activeProblem && (
                  <Badge variant="outline" className="text-xs font-normal border-primary/30 text-primary">
                    {activeProblem.title}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger size="sm" className="w-40 h-8 text-xs font-medium font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="cpp20">C++20 (GCC 13.2)</SelectItem>
                      <SelectItem value="cpp23">C++23 (Latest)</SelectItem>
                      <SelectItem value="cpp17">C++17 (Modern)</SelectItem>
                      <SelectItem value="cpp14">C++14 (Classic)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 pt-4">
            {/* Editor Area */}
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                placeholder="// Write or paste your C++ code here..."
                className="h-72 w-full resize-none rounded-lg border border-input bg-zinc-950/80 p-3.5 font-mono text-xs leading-relaxed text-zinc-100 placeholder:text-zinc-500 outline-none ring-ring/50 focus-visible:ring-[2px]"
              />
              <div className="absolute right-3 bottom-3 select-none text-[10px] text-zinc-500 font-mono">
                Press <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 py-0.5 text-[9px] text-zinc-400">Ctrl+Enter</kbd> to Run
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setCode(activeProblem?.sample || sampleCode)}
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Sparkles className="size-3.5 mr-1" />
                  Load C++ sample
                </Button>
                {code && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setCode('')}
                    className="h-7 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="size-3.5 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              <span className="text-[11px] text-muted-foreground/80 hidden sm:inline">
                {language.toUpperCase()} · In-browser runner
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <Button
                onClick={handleRunCode}
                disabled={!code.trim() || isRunning}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-sm transition-all"
              >
                <Play className="size-4 mr-1.5 fill-current" />
                {isRunning ? 'Compiling & Running...' : 'Run Code'}
              </Button>

              <Button
                onClick={() => submit()}
                disabled={!code.trim() || thinking}
                variant="outline"
                className="w-full border-primary/40 text-primary hover:bg-primary/10 font-medium"
              >
                <Send className="size-4 mr-1.5" />
                Ask Tutor
              </Button>
            </div>

            {/* Tutor Mode Selector */}
            <div className="flex flex-col gap-1.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Tutor Assistance Mode</span>
                <span className="text-[11px] text-muted-foreground capitalize">Active: {mode}</span>
              </div>
              <ToggleGroup
                value={[mode]}
                onValueChange={(v) => v[0] && setMode(v[0] as Mode)}
                variant="outline"
                className="grid grid-cols-4"
              >
                {modes.map((m) => (
                  <ToggleGroupItem key={m.value} value={m.value} aria-label={m.label} className="text-xs">
                    <m.icon className="size-3.5 mr-1" />
                    <span className="hidden sm:inline">{m.label}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>

        {/* Live Output & Test Case Console */}
        <CodeOutputConsole
          result={executionResult}
          isRunning={isRunning}
          language={language}
          testCases={testCases}
          onClear={() => setExecutionResult(null)}
          onDebugWithAI={(errorMsg) => submit(errorMsg)}
        />
      </div>

      {/* Right Column: AI Tutor Chat */}
      <Card className="flex h-[calc(100vh-7.5rem)] flex-col lg:col-span-6 xl:col-span-5 border-border/80 shadow-md">
        <CardHeader className="border-b border-border/60 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Bot className="size-4" />
            </div>
            <div className="leading-tight">
              <CardTitle className="text-base font-semibold">C++ AI Tutor</CardTitle>
              <span className="text-xs text-muted-foreground">DSA Guidance · Memory & Complexity</span>
            </div>
            <Badge variant="secondary" className="ml-auto gap-1.5 text-xs">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="min-h-0 flex-1 p-0">
          <ScrollArea className="h-full">
            <div ref={scrollRef} className="flex flex-col gap-4 p-4">
              {messages.map((msg) =>
                msg.role === 'user' ? (
                  <div key={msg.id} className="flex justify-end gap-2.5">
                    <div className="max-w-[88%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-primary-foreground shadow-sm">
                      <div className="mb-1.5 flex items-center gap-2 text-xs opacity-90">
                        <Badge className="bg-primary-foreground/20 text-primary-foreground capitalize text-[10px] px-1.5 py-0">
                          {msg.mode}
                        </Badge>
                        <span className="uppercase tracking-wide text-[10px] font-mono">{msg.language}</span>
                      </div>
                      {msg.errorContext && (
                        <div className="mb-2 rounded bg-black/20 p-2 text-xs font-mono text-amber-200">
                          <strong>Error to debug:</strong> {msg.errorContext}
                        </div>
                      )}
                      <pre className="overflow-x-auto font-mono text-xs leading-relaxed bg-black/20 p-2 rounded">
                        <code>{msg.code}</code>
                      </pre>
                    </div>
                    <Avatar className="size-7 shrink-0 mt-1">
                      <AvatarFallback className="bg-secondary text-foreground text-xs">
                        <UserIcon className="size-3.5" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div key={msg.id} className="flex gap-2.5">
                    <Avatar className="size-7 shrink-0 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        <Bot className="size-3.5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-border/70 bg-muted/40 px-3.5 py-2.5 shadow-sm">
                      {msg.blocks?.map((b, i) => <BlockView key={i} block={b} />)}
                    </div>
                  </div>
                ),
              )}
              {thinking && (
                <div className="flex gap-2.5">
                  <Avatar className="size-7 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      <Bot className="size-3.5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border/70 bg-muted/40 px-3.5 py-3">
                    <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                    <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                    <span className="size-2 animate-bounce rounded-full bg-primary" />
                    <span className="ml-1 text-xs text-muted-foreground">Tutor is analyzing...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
