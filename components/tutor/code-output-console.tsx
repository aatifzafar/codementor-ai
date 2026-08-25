'use client'

import { useState } from 'react'
import {
  Terminal,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Copy,
  Check,
  Bot,
  AlertTriangle,
  Layers,
  Cpu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { ExecutionResult, TestCase } from '@/lib/code-runner'

interface CodeOutputConsoleProps {
  result: ExecutionResult | null
  isRunning: boolean
  language: string
  testCases?: TestCase[]
  onClear: () => void
  onDebugWithAI?: (errorMessage: string) => void
}

export function CodeOutputConsole({
  result,
  isRunning,
  language,
  testCases,
  onClear,
  onDebugWithAI,
}: CodeOutputConsoleProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('output')

  const copyToClipboard = () => {
    if (!result) return
    const textToCopy = [
      ...result.stdout,
      result.stderr ? `Compiler Diagnostic:\n${result.stderr}` : '',
      result.returnValue ? `Return value: ${result.returnValue}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const hasTests = Boolean(testCases && testCases.length > 0)
  const passedTestsCount =
    result?.testResults?.filter((t) => t.passed).length ?? 0
  const totalTestsCount = result?.testResults?.length ?? testCases?.length ?? 0

  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-[#0c0e14] text-zinc-100 shadow-2xl overflow-hidden font-mono">
      {/* Console Top Bar (C++ / GCC Terminal Style) */}
      <div className="flex items-center justify-between border-b border-zinc-800/90 bg-[#12151f] px-3.5 py-2 text-xs select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f56]" />
            <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="size-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="ml-2 flex items-center gap-1.5 text-[11px] font-semibold text-zinc-300">
            <Terminal className="size-3.5 text-emerald-400" />
            <span>g++ (C++20) — ./a.out</span>
          </div>

          {/* Status Indicator */}
          {isRunning ? (
            <Badge
              variant="outline"
              className="ml-2 gap-1.5 border-amber-500/40 bg-amber-500/10 text-amber-300 animate-pulse text-[10px]"
            >
              <Cpu className="size-3 animate-spin text-amber-400" />
              Compiling main.cpp...
            </Badge>
          ) : result ? (
            <Badge
              variant="outline"
              className={cn(
                'ml-2 gap-1 text-[10px]',
                result.status === 'success'
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-rose-500/40 bg-rose-500/10 text-rose-400',
              )}
            >
              {result.status === 'success' ? (
                <>
                  <CheckCircle2 className="size-3" />
                  Process exited with return 0 (0x0)
                </>
              ) : (
                <>
                  <XCircle className="size-3" />
                  g++ Error (Exit 1)
                </>
              )}
            </Badge>
          ) : (
            <span className="ml-2 text-[10px] text-zinc-500">Ready to build</span>
          )}
        </div>

        {/* Toolbar Actions */}
        <div className="flex items-center gap-2">
          {result && (
            <div className="flex items-center gap-1 text-[11px] text-zinc-400">
              <Clock className="size-3 text-zinc-500" />
              <span>{result.durationMs}ms</span>
            </div>
          )}

          {result && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={copyToClipboard}
              className="h-6 w-6 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              title="Copy Output"
            >
              {copied ? (
                <Check className="size-3 text-emerald-400" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          )}

          {result && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onClear}
              className="h-6 w-6 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              title="Clear Terminal"
            >
              <RotateCcw className="size-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Tabs & Output Display */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1 min-h-[190px] max-h-[320px]"
      >
        <div className="flex items-center justify-between border-b border-zinc-800/60 bg-[#0f121a] px-3 py-1">
          <TabsList className="bg-transparent p-0 h-7 gap-1">
            <TabsTrigger
              value="output"
              className="h-6 rounded px-2.5 text-xs text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-400 font-medium"
            >
              <Terminal className="size-3 mr-1.5" />
              STDOUT (./a.out)
            </TabsTrigger>
            {hasTests && (
              <TabsTrigger
                value="tests"
                className="h-6 rounded px-2.5 text-xs text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100 font-medium"
              >
                <Layers className="size-3 mr-1.5" />
                GDB / Test Cases
                {result?.testResults && (
                  <span
                    className={cn(
                      'ml-1.5 rounded px-1.5 py-0 text-[10px] font-semibold font-mono',
                      passedTestsCount === totalTestsCount
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300',
                    )}
                  >
                    {passedTestsCount}/{totalTestsCount}
                  </span>
                )}
              </TabsTrigger>
            )}
          </TabsList>

          {/* Quick AI Debug Button if error or failed tests */}
          {result && (result.stderr || result.status === 'error') && onDebugWithAI && (
            <Button
              size="xs"
              variant="outline"
              onClick={() => onDebugWithAI(result.stderr || 'Compilation error')}
              className="h-6 text-[11px] gap-1.5 border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 font-sans font-medium"
            >
              <Bot className="size-3 text-rose-400" />
              Debug with AI Tutor
            </Button>
          )}
        </div>

        {/* Output Content */}
        <TabsContent value="output" className="m-0 flex-1 p-0">
          <ScrollArea className="h-[220px] w-full p-3 text-xs">
            {isRunning ? (
              <div className="flex flex-col items-center justify-center gap-2 text-zinc-400 py-8">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="size-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.3s]" />
                  <span className="size-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.15s]" />
                  <span className="size-2 animate-bounce rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-zinc-400 font-mono">❯ g++ -O3 -std=c++20 main.cpp -o a.out && ./a.out</span>
              </div>
            ) : !result ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-zinc-500">
                <Terminal className="size-7 mb-2 stroke-[1.5] text-zinc-600" />
                <p className="text-xs">
                  <span className="text-emerald-500/80 mr-1.5 font-bold">❯</span>
                  Click <strong className="text-zinc-300">Run Code</strong> (or <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 py-0.5 text-[10px] text-zinc-300">Ctrl+Enter</kbd>) to compile and run.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {/* Build Command Line */}
                <div className="flex items-center gap-2 text-[11px] text-zinc-500 select-none pb-1 border-b border-zinc-900">
                  <span className="text-emerald-400 font-bold">❯</span>
                  <span className="text-zinc-400">g++ -std=c++20 main.cpp -o a.out && ./a.out</span>
                </div>

                {/* Standard Output Lines */}
                {result.stdout && result.stdout.length > 0 && (
                  <div className="space-y-1 pt-1">
                    {result.stdout.map((line, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-zinc-200">
                        <span className="select-none text-zinc-600 text-[10px] w-5 text-right pt-0.5 font-mono">
                          {idx + 1}
                        </span>
                        <span className="whitespace-pre-wrap break-all leading-relaxed text-zinc-100 font-mono">
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Return Value */}
                {result.returnValue && (
                  <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-950/20 p-2 text-xs">
                    <span className="text-emerald-400 font-semibold">Process Return: </span>
                    <span className="text-zinc-200 font-mono">{result.returnValue}</span>
                  </div>
                )}

                {/* Compiler / Runtime Diagnostic Error */}
                {result.stderr && (
                  <div className="mt-2 rounded-lg border border-rose-500/30 bg-rose-950/25 p-3 text-rose-200 text-xs space-y-2">
                    <div className="flex items-center gap-1.5 font-semibold text-rose-400 font-mono text-[11px]">
                      <AlertTriangle className="size-3.5" />
                      <span>g++: Diagnostic / Compilation Error:</span>
                    </div>
                    <pre className="font-mono text-[11px] whitespace-pre-wrap break-all text-rose-300 leading-relaxed bg-black/40 p-2 rounded border border-rose-900/30">
                      {result.stderr}
                    </pre>
                  </div>
                )}

                {result.status === 'success' && (
                  <div className="mt-2 pt-2 border-t border-zinc-900 text-[10px] text-zinc-500 select-none">
                    [Process completed with exit code 0 · Memory allocated O(1)]
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        {/* Test Cases Content */}
        {hasTests && (
          <TabsContent value="tests" className="m-0 flex-1 p-0">
            <ScrollArea className="h-[220px] w-full p-3">
              <div className="flex flex-col gap-2.5">
                {(result?.testResults ?? testCases ?? []).map((tc, idx) => {
                  const hasRun = result?.testResults !== undefined
                  const passed = tc.passed

                  return (
                    <div
                      key={tc.id || idx}
                      className={cn(
                        'flex flex-col rounded-lg border p-2.5 text-xs transition-colors',
                        !hasRun
                          ? 'border-zinc-800 bg-zinc-900/30'
                          : passed
                          ? 'border-emerald-500/30 bg-emerald-950/15'
                          : 'border-rose-500/30 bg-rose-950/15',
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-zinc-200 font-mono text-xs">
                          {tc.name || `Assertion #${idx + 1}`}
                        </span>
                        {hasRun ? (
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-[10px] gap-1 font-mono',
                              passed
                                ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                                : 'border-rose-500/40 text-rose-400 bg-rose-500/10',
                            )}
                          >
                            {passed ? (
                              <>
                                <CheckCircle2 className="size-2.5" /> PASSED
                              </>
                            ) : (
                              <>
                                <XCircle className="size-2.5" /> FAILED
                              </>
                            )}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] text-zinc-500 border-zinc-700 font-mono">
                            Pending
                          </Badge>
                        )}
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="rounded bg-zinc-900/80 p-2 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px] uppercase font-sans">Input Signature</span>
                          <span className="text-zinc-300 break-all">{tc.input}</span>
                        </div>
                        <div className="rounded bg-zinc-900/80 p-2 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px] uppercase font-sans">Expected Output</span>
                          <span className="text-emerald-400/90 break-all">{tc.expectedOutput}</span>
                        </div>
                      </div>

                      {hasRun && !passed && tc.actualOutput && (
                        <div className="mt-1.5 rounded bg-rose-950/40 p-2 border border-rose-900/50 text-[11px] font-mono">
                          <span className="text-rose-400 block text-[10px] uppercase font-sans">Actual Output</span>
                          <span className="text-rose-200 break-all">{tc.actualOutput}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
