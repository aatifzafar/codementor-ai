'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { weeklyActivity } from '@/lib/mock-data'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const config = {
  minutes: { label: 'Minutes', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function WeeklyActivityChart() {
  return (
    <ChartContainer config={config} className="h-[220px] w-full">
      <BarChart data={weeklyActivity} margin={{ left: -18, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="minutes" fill="var(--color-minutes)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
