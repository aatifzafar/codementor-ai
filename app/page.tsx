import Link from 'next/link'
import {
  Sparkles,
  Trophy,
  Target,
  Zap,
  Clock,
  ArrowRight,
  Lightbulb,
  BookOpen,
  Dumbbell,
  RotateCcw,
  CheckCircle2,
  Info,
  AlertTriangle,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { StatCard, DifficultyBadge } from '@/components/ui-bits'
import { SkillRadar } from '@/components/charts/skill-radar'
import { WeeklyActivityChart } from '@/components/charts/weekly-activity-chart'
import {
  user,
  overallProgress,
  streak,
  aiInsight,
  continueLearning,
  recommendations,
  recentActivity,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const recIcon = { Lesson: BookOpen, Practice: Dumbbell, Review: RotateCcw }
const activityIcon = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
}
const activityColor = {
  success: 'text-success bg-success/12',
  info: 'text-primary bg-primary/12',
  warning: 'text-warning bg-warning/15',
}

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      {/* Hero */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="size-3" />
                Level {overallProgress.level}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {overallProgress.xp.toLocaleString()} / {overallProgress.xpToNext.toLocaleString()} XP
              </span>
            </div>
            <CardTitle className="text-2xl text-balance">
              Welcome back, {user.name}. Ready to level up?
            </CardTitle>
            <CardDescription className="text-pretty">
              You&apos;re {overallProgress.percent}% through your current curriculum. Keep the
              momentum going with your {streak.current}-day streak.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Level progress</span>
                <span className="font-medium tabular-nums">
                  {Math.round((overallProgress.xp / overallProgress.xpToNext) * 100)}%
                </span>
              </div>
              <Progress value={(overallProgress.xp / overallProgress.xpToNext) * 100} />
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Continue learning
                </span>
                <span className="font-medium">{continueLearning.title}</span>
                <span className="text-xs text-muted-foreground">
                  {continueLearning.topic} · {continueLearning.lesson} ·{' '}
                  {continueLearning.estimatedMin} min left
                </span>
                <Progress value={continueLearning.progress} className="mt-2 h-1.5 w-40" />
              </div>
              <Button render={<Link href="/learning-path" />}>
                Resume
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI insight */}
        <Card className="bg-primary/[0.06] border-primary/20">
          <CardHeader>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Lightbulb className="size-5" />
            </div>
            <CardTitle className="text-base">AI Insight</CardTitle>
            <CardDescription className="text-pretty leading-relaxed">
              {aiInsight}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" render={<Link href="/tutor" />}>
              Ask your AI tutor
              <ArrowRight data-icon="inline-end" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Problems Solved" value={String(overallProgress.problemsSolved)} icon={Trophy} trend={8} sub="+16 this week" />
        <StatCard label="Accuracy" value={`${overallProgress.accuracy}%`} icon={Target} trend={3} sub="First-attempt correct" />
        <StatCard label="Current Streak" value={`${streak.current} days`} icon={Zap} sub={`Longest: ${streak.longest} days`} />
        <StatCard label="Avg. Solve Time" value={`${overallProgress.avgSolveTimeMin} min`} icon={Clock} trend={-6} sub="Faster than last week" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skill Mastery</CardTitle>
            <CardDescription>Your proficiency across core concepts</CardDescription>
          </CardHeader>
          <CardContent>
            <SkillRadar />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">This Week&apos;s Activity</CardTitle>
            <CardDescription>Minutes practiced per day</CardDescription>
          </CardHeader>
          <CardContent>
            <WeeklyActivityChart />
          </CardContent>
        </Card>
      </div>

      {/* Recommendations + Activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recommended for you</CardTitle>
            <CardDescription>Personalized next steps from your AI tutor</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {recommendations.map((rec) => {
              const Icon = recIcon[rec.type]
              return (
                <div
                  key={rec.id}
                  className="flex items-center gap-4 rounded-xl border border-border p-3 transition-colors hover:bg-accent/50"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{rec.title}</span>
                      <DifficultyBadge difficulty={rec.difficulty} />
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{rec.reason}</p>
                  </div>
                  <div className="hidden items-center gap-3 sm:flex">
                    <span className="text-xs text-muted-foreground">{rec.estimatedMin} min</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      render={<Link href={rec.type === 'Practice' ? '/practice' : '/tutor'} />}
                    >
                      Start
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Your latest sessions</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {recentActivity.map((act) => {
              const Icon = activityIcon[act.status]
              return (
                <div key={act.id} className="flex items-start gap-3 py-2">
                  <div
                    className={cn(
                      'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full',
                      activityColor[act.status],
                    )}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="text-sm">
                      <span className="text-muted-foreground">{act.action} </span>
                      <span className="font-medium">{act.detail}</span>
                    </p>
                    <span className="text-xs text-muted-foreground">{act.time}</span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
