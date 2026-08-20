import { TrendingUp, TrendingDown, Sparkles, ArrowUpRight } from 'lucide-react'
import { PageHeader, StatCard } from '@/components/ui-bits'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { SkillRadar } from '@/components/charts/skill-radar'
import { MasteryTrendChart } from '@/components/charts/mastery-trend-chart'
import { WeeklyActivityChart } from '@/components/charts/weekly-activity-chart'
import {
  skills,
  strengths,
  weaknesses,
  aiRecommendations,
  overallProgress,
  streak,
} from '@/lib/mock-data'
import { Trophy, Target, Flame, Clock } from 'lucide-react'

export default function ProgressPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Progress & Analytics"
        description="A data-driven view of how your skills are developing over time, with insights on where to focus next."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall Mastery" value={`${overallProgress.percent}%`} icon={Trophy} trend={10} sub="Across all skills" />
        <StatCard label="Accuracy" value={`${overallProgress.accuracy}%`} icon={Target} trend={3} />
        <StatCard label="Longest Streak" value={`${streak.longest} days`} icon={Flame} sub={`Current: ${streak.current} days`} />
        <StatCard label="Avg. Solve Time" value={`${overallProgress.avgSolveTimeMin} min`} icon={Clock} trend={-6} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Mastery Over Time</CardTitle>
            <CardDescription>Average skill mastery, last 6 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <MasteryTrendChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skill Balance</CardTitle>
            <CardDescription>Where you&apos;re strong and where to grow</CardDescription>
          </CardHeader>
          <CardContent>
            <SkillRadar />
          </CardContent>
        </Card>
      </div>

      {/* Per-skill breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Skill Breakdown</CardTitle>
          <CardDescription>Mastery and lessons completed per concept</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {skills.map((s) => (
            <div key={s.key} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {s.lessonsCompleted}/{s.totalLessons} lessons
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-0.5 text-success">
                    <ArrowUpRight className="size-3" />
                    {s.trend}%
                  </Badge>
                  <span className="w-9 text-right text-sm font-semibold tabular-nums">
                    {s.mastery}%
                  </span>
                </div>
              </div>
              <Progress value={s.mastery} />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <div className="flex size-9 items-center justify-center rounded-lg bg-success/12 text-success">
              <TrendingUp className="size-5" />
            </div>
            <CardTitle className="text-base">Your Strengths</CardTitle>
            <CardDescription>Concepts you&apos;ve nearly mastered</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {strengths.map((s) => (
              <div key={s.skill} className="flex items-center justify-between">
                <span className="text-sm">{s.skill}</span>
                <span className="text-sm font-semibold text-success tabular-nums">{s.mastery}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card>
          <CardHeader>
            <div className="flex size-9 items-center justify-center rounded-lg bg-warning/15 text-warning">
              <TrendingDown className="size-5" />
            </div>
            <CardTitle className="text-base">Focus Areas</CardTitle>
            <CardDescription>Where you have the most to gain</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {weaknesses.map((s) => (
              <div key={s.skill} className="flex items-center justify-between">
                <span className="text-sm text-pretty">{s.skill}</span>
                <span className="text-sm font-semibold text-warning tabular-nums">{s.mastery}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI recommendations */}
        <Card className="bg-primary/[0.05] border-primary/20">
          <CardHeader>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </div>
            <CardTitle className="text-base">AI Recommendations</CardTitle>
            <CardDescription>Your personalized study plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2.5">
              {aiRecommendations.map((rec, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-pretty">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary tabular-nums">
                    {i + 1}
                  </span>
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Practice Volume</CardTitle>
          <CardDescription>Minutes spent practicing each day</CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyActivityChart />
        </CardContent>
      </Card>
    </div>
  )
}
