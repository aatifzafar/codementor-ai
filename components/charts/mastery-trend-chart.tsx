'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { masteryTrend } from '@/lib/mock-data'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const config = {
  mastery: { label: 'Avg. Mastery', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function MasteryTrendChart() {
  return (
    <ChartContainer config={config} className="h-[220px] w-full">
      <AreaChart data={masteryTrend} margin={{ left: -18, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillMastery" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-mastery)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-mastery)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="week"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
        />
        <YAxis
          domain={[30, 100]}
          tickLine={false}
          axisLine={false}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="mastery"
          type="monotone"
          stroke="var(--color-mastery)"
          strokeWidth={2}
          fill="url(#fillMastery)"
        />
      </AreaChart>
    </ChartContainer>
  )
}
