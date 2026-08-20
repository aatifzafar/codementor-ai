'use client'

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import { radarData } from '@/lib/mock-data'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const config = {
  mastery: { label: 'Mastery', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function SkillRadar() {
  return (
    <ChartContainer config={config} className="mx-auto aspect-square max-h-[280px] w-full">
      <RadarChart data={radarData} outerRadius="72%">
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
        />
        <Radar
          dataKey="mastery"
          fill="var(--color-mastery)"
          fillOpacity={0.28}
          stroke="var(--color-mastery)"
          strokeWidth={2}
          dot={{ r: 3, fillOpacity: 1 }}
        />
      </RadarChart>
    </ChartContainer>
  )
}
