import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { Difficulty } from '@/lib/mock-data'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-balance">{title}</h2>
        {description && (
          <p className="max-w-2xl text-sm text-muted-foreground text-pretty">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  trend,
}: {
  label: string
  value: string
  sub?: string
  icon: LucideIcon
  trend?: number
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">{value}</span>
        {typeof trend === 'number' && (
          <span
            className={cn(
              'mb-1 inline-flex items-center gap-0.5 text-xs font-medium',
              trend >= 0 ? 'text-success' : 'text-destructive',
            )}
          >
            {trend >= 0 ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

const diffStyles: Record<Difficulty, string> = {
  Easy: 'border-transparent bg-success/12 text-success',
  Medium: 'border-transparent bg-warning/15 text-warning',
  Hard: 'border-transparent bg-destructive/12 text-destructive',
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <Badge className={cn('font-medium', diffStyles[difficulty])}>{difficulty}</Badge>
  )
}
