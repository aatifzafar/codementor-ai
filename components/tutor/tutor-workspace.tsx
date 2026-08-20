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
}

const modes: { value: Mode; label: string; icon: typeof Code2 }[] = [
  { value: 'explain', label: 'Explain', icon: Code2 },
  { value: 'debug', label: 'Debug', icon: Bug },
  { value: 'hint', label: 'Hint', icon: Lightbulb },
  { value: 'optimize', label: 'Optimize', icon: Gauge },
]

const sampleCode = `class Student:
    def __init__(name, marks):
        self.name = name
        self.marks = marks

    def get_average(marks):
        return sum(marks) / len(marks)

s = Student("Aatif", [88, 92, 79])
print(s.get_average())`

const starter: Message[] = [
  {
    id: 'intro',
    role: 'tutor',
    blocks: [
      {
        kind: 'text',
        content:
          "Hi Aatif! I'm your AI tutor. Paste some code on the left, pick a mode, and I'll explain it, help you debug, drop a hint without spoiling the answer, or suggest optimizations. Try the sample to see how it works.",
      },
    ],
  },
]

function buildResponse(mode: Mode, code: string): Block[] {
  const hasMissingSelf = /def\s+\w+\s*\(\s*(?!self)\w+/.test(code) && code.includes('class')
  const hasSingleEquals = /if\s+\w+\s*=\s*[^=]/.test(code)

  if (mode === 'debug') {
    const blocks: Block[] = [
      { kind: 'text', content: "I traced through your code and found the issues below." },
    ]
    if (hasMissingSelf) {
      blocks.push({
        kind: 'warning',
        tone: 'warning',
        content:
          'Bug #1 — Missing `self`: Your methods are defined without `self` as the first parameter. In Python, instance methods must take `self` so they can access instance data.',
      })
      blocks.push({
        kind: 'code',
        content: `def __init__(self, name, marks):\n    self.name = name\n    self.marks = marks\n\ndef get_average(self):\n    return sum(self.marks) / len(self.marks)`,
      })
    }
    if (hasSingleEquals) {
      blocks.push({
        kind: 'warning',
        tone: 'warning',
        content:
          'Bug #2 — Assignment vs comparison: You used a single `=` inside an `if`. Use `==` to compare values.',
      })
    }
    if (!hasMissingSelf && !hasSingleEquals) {
      blocks.push({
        kind: 'success',
        tone: 'success',
        content:
          "No syntax errors jumped out. Double-check your edge cases — what happens with an empty input? That's the most common source of runtime errors here.",
      })
    } else {
      blocks.push({
        kind: 'text',
        content: 'Fix those and re-run — your `get_average()` call should then print `86.33`.',
      })
    }
    return blocks
  }

  if (mode === 'hint') {
    return [
      {
        kind: 'text',
        content: "I won't give you the full answer — let's get you there step by step.",
      },
      {
        kind: 'info',
        tone: 'info',
        content:
          'Hint 1: Every method inside a class needs a way to reference the object it belongs to. What special first parameter does Python expect?',
      },
      {
        kind: 'info',
        tone: 'info',
        content:
          'Hint 2: Once methods can see `self`, ask yourself where the data they need actually lives — on the instance, or passed in again?',
      },
      { kind: 'text', content: 'Try applying hint 1 first, then send me your updated code.' },
    ]
  }

  if (mode === 'optimize') {
    return [
      { kind: 'text', content: 'Your logic is correct. Here are a couple of ways to make it cleaner and faster.' },
      {
        kind: 'info',
        tone: 'info',
        content:
          'Use `statistics.mean()` for readability, or cache the average if `get_average()` is called repeatedly on unchanged data.',
      },
      {
        kind: 'code',
        content: `from statistics import mean\n\nclass Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n\n    def get_average(self):\n        return round(mean(self.marks), 2)`,
      },
      {
        kind: 'success',
        tone: 'success',
        content: 'This is O(n) — optimal, since you must read every mark at least once.',
      },
    ]
  }

  // explain
  return [
    {
      kind: 'text',
      content:
        'This code defines a `Student` class that models a student with a name and a list of marks, then computes their average.',
    },
    {
      kind: 'text',
      content:
        '`__init__` is the constructor — it runs when you create a `Student` and stores the passed-in values on the instance. `get_average()` is meant to sum the marks and divide by how many there are.',
    },
    {
      kind: 'info',
      tone: 'info',
      content:
        'Key concept: `self` refers to the specific object you\'re working with, letting each Student keep its own data separate from every other Student.',
    },
    {
      kind: 'text',
      content: 'Want me to point out what would stop this from running? Switch to Debug mode and ask again.',
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

// normalize warning/info/success helper kinds into callout
function normalize(blocks: Block[]): Block[] {
  return blocks.map((b) =>
    b.kind === 'text' || b.kind === 'code'
      ? b
      : ({ kind: 'callout', tone: (b as { tone: 'info' | 'warning' | 'success' }).tone, content: b.content } as Block),
  )
}

export function TutorWorkspace() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('python')
  const [mode, setMode] = useState<Mode>('explain')
  const [messages, setMessages] = useState<Message[]>(starter)
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  function submit() {
    if (!code.trim() || thinking) return
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      mode,
      code,
      language,
    }
    setMessages((m) => [...m, userMsg])
    setThinking(true)

    setTimeout(() => {
      const tutorMsg: Message = {
        id: `t-${Date.now()}`,
        role: 'tutor',
        blocks: normalize(buildResponse(mode, code)),
      }
      setMessages((m) => [...m, tutorMsg])
      setThinking(false)
    }, 1100)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Code panel */}
      <Card className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Your Code</CardTitle>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger size="sm" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            placeholder="Paste or type your code here..."
            className="h-64 w-full resize-none rounded-lg border border-input bg-background/60 p-3 font-mono text-xs leading-relaxed outline-none ring-ring/50 focus-visible:ring-[3px]"
          />
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCode(sampleCode)}
              className="text-muted-foreground"
            >
              <Sparkles data-icon="inline-start" />
              Load sample
            </Button>
            {code && (
              <Button variant="ghost" size="sm" onClick={() => setCode('')}>
                <RotateCcw data-icon="inline-start" />
                Clear
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">Mode</span>
            <ToggleGroup
              value={[mode]}
              onValueChange={(v) => v[0] && setMode(v[0] as Mode)}
              variant="outline"
              className="grid grid-cols-4"
            >
              {modes.map((m) => (
                <ToggleGroupItem key={m.value} value={m.value} aria-label={m.label}>
                  <m.icon data-icon="inline-start" />
                  <span className="hidden sm:inline">{m.label}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <Button onClick={submit} disabled={!code.trim() || thinking} className="w-full">
            <Send data-icon="inline-start" />
            Ask Tutor
          </Button>
        </CardContent>
      </Card>

      {/* Conversation */}
      <Card className="lg:col-span-3 flex h-[calc(100vh-9rem)] flex-col">
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bot className="size-4" />
            </div>
            <div className="leading-tight">
              <CardTitle className="text-base">AI Tutor</CardTitle>
              <span className="text-xs text-muted-foreground">Always patient · never gives up on you</span>
            </div>
            <Badge variant="secondary" className="ml-auto gap-1">
              <span className="size-1.5 rounded-full bg-success" />
              Online
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 p-0">
          <ScrollArea className="h-full">
            <div ref={scrollRef} className="flex flex-col gap-5 p-4">
              {messages.map((msg) =>
                msg.role === 'user' ? (
                  <div key={msg.id} className="flex justify-end gap-3">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-primary-foreground">
                      <div className="mb-2 flex items-center gap-2 text-xs opacity-90">
                        <Badge className="bg-primary-foreground/15 text-primary-foreground capitalize">
                          {msg.mode}
                        </Badge>
                        <span className="uppercase tracking-wide">{msg.language}</span>
                      </div>
                      <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
                        <code>{msg.code}</code>
                      </pre>
                    </div>
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback className="bg-secondary">
                        <UserIcon className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div key={msg.id} className="flex gap-3">
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border bg-muted/40 px-4 py-3">
                      {msg.blocks?.map((b, i) => <BlockView key={i} block={b} />)}
                    </div>
                  </div>
                ),
              )}
              {thinking && (
                <div className="flex gap-3">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-muted/40 px-4 py-3.5">
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
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
