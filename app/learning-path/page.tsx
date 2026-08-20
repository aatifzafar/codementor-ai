import Link from 'next/link'
import {
  Check,
  Lock,
  Play,
  BookOpen,
  Dumbbell,
  ArrowRight,
} from 'lucide-react'
import { PageHeader } from '@/components/ui-bits'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { learningPath, type PathNode } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const masteryStyle: Record<PathNode['mastery'], string> = {
  Locked: 'text-muted-foreground bg-muted',
  Beginner: 'text-warning bg-warning/12',
  Intermediate: 'text-primary bg-primary/12',
  Advanced: 'text-primary bg-primary/12',
  Mastered: 'text-success bg-success/12',
}

export default function LearningPathPage() {
  const completed = learningPath.filter((n) => n.status === 'completed').length

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader
        title="Your Learning Path"
        description="A personalized curriculum that adapts as you grow. Each module unlocks once you've built the foundations before it."
      >
        <Badge variant="secondary" className="h-7 px-3">
          {completed} of {learningPath.length} modules complete
        </Badge>
      </PageHeader>

      <div className="relative flex flex-col gap-4">
        {/* vertical connector line */}
        <div
          className="absolute bottom-6 left-[27px] top-6 w-px bg-border md:left-[31px]"
          aria-hidden
        />

        {learningPath.map((node, i) => {
          const isLocked = node.status === 'locked'
          const isActive = node.status === 'in-progress'
          const isDone = node.status === 'completed'

          return (
            <div key={node.id} className="relative flex gap-4">
              {/* node marker */}
              <div
                className={cn(
                  'z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 md:size-16',
                  isDone && 'border-success bg-success/12 text-success',
                  isActive && 'border-primary bg-primary text-primary-foreground',
                  isLocked && 'border-border bg-muted text-muted-foreground',
                )}
              >
                {isDone ? (
                  <Check className="size-6" />
                ) : isLocked ? (
                  <Lock className="size-5" />
                ) : (
                  <Play className="size-5" />
                )}
              </div>

              <Card
                className={cn(
                  'flex-1 transition-colors',
                  isActive && 'border-primary/40',
                  isLocked && 'opacity-70',
                )}
              >
                <CardContent className="flex flex-col gap-3 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground tabular-nums">
                          Module {i + 1}
                        </span>
                        <Badge className={cn('font-medium', masteryStyle[node.mastery])}>
                          {node.mastery}
                        </Badge>
                      </div>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight">{node.title}</h3>
                      <p className="text-sm text-muted-foreground text-pretty">{node.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen className="size-3.5" />
                      {node.lessons} lessons
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Dumbbell className="size-3.5" />
                      {node.problems} problems
                    </span>
                  </div>

                  {!isLocked && (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Completion</span>
                        <span className="font-medium tabular-nums">{node.completion}%</span>
                      </div>
                      <Progress value={node.completion} />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    {isDone && (
                      <span className="text-xs font-medium text-success">Completed</span>
                    )}
                    {isActive && (
                      <Button size="sm" render={<Link href="/tutor" />}>
                        Continue
                        <ArrowRight data-icon="inline-end" />
                      </Button>
                    )}
                    {isLocked && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Lock className="size-3" />
                        Complete previous modules to unlock
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
