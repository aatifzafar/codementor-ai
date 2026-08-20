import Link from 'next/link'
import {
  TriangleAlert,
  Repeat,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { PageHeader, StatCard } from '@/components/ui-bits'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { mistakes, type Mistake } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const severityStyle: Record<Mistake['severity'], string> = {
  high: 'text-destructive bg-destructive/12',
  medium: 'text-warning bg-warning/15',
  low: 'text-muted-foreground bg-muted',
}

const severityLabel: Record<Mistake['severity'], string> = {
  high: 'High priority',
  medium: 'Medium',
  low: 'Low',
}

export default function MistakesPage() {
  const totalOccurrences = mistakes.reduce((sum, m) => sum + m.occurrences, 0)
  const highPriority = mistakes.filter((m) => m.severity === 'high').length

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader
        title="Mistake Analysis"
        description="Your AI tutor tracks recurring errors so you can fix root causes, not just symptoms. Patterns you repeat show up here first."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Tracked Patterns" value={String(mistakes.length)} icon={TriangleAlert} />
        <StatCard label="Total Occurrences" value={String(totalOccurrences)} icon={Repeat} sub="Across all sessions" />
        <StatCard label="High Priority" value={String(highPriority)} icon={Clock} sub="Fix these first" />
      </div>

      <Alert>
        <Sparkles />
        <AlertTitle>Tutor summary</AlertTitle>
        <AlertDescription>
          Most of your recurring mistakes cluster around Object-Oriented Programming — specifically
          how methods access instance data. Nailing <span className="font-mono">self</span> and{' '}
          <span className="font-mono">super()</span> will clear up the majority of these.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col gap-3">
        {mistakes.map((m) => (
          <Card key={m.id}>
            <CardContent className="flex flex-col gap-3 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg',
                      severityStyle[m.severity],
                    )}
                  >
                    <TriangleAlert className="size-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{m.title}</h3>
                      <Badge className={cn('font-medium', severityStyle[m.severity])}>
                        {severityLabel[m.severity]}
                      </Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Repeat className="size-3" />
                        Seen {m.occurrences}×
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        Last: {m.lastSeen}
                      </span>
                      <Badge variant="outline" className="text-muted-foreground">
                        {m.concept}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Example
                </span>
                <pre className="mt-1.5 overflow-x-auto font-mono text-xs leading-relaxed">
                  <code>{m.example}</code>
                </pre>
              </div>

              <div className="flex justify-end">
                <Button size="sm" variant="outline" render={<Link href="/tutor" />}>
                  Review with tutor
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
