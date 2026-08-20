'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { problems, type Difficulty } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DifficultyBadge } from '@/components/ui-bits'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

const difficulties: (Difficulty | 'All')[] = ['All', 'Easy', 'Medium', 'Hard']

export function PracticeExplorer() {
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All')

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
        p.skill.toLowerCase().includes(query.toLowerCase())
      const matchesDiff = difficulty === 'All' || p.difficulty === difficulty
      return matchesQuery && matchesDiff
    })
  }, [query, difficulty])

  const recommended = filtered.filter((p) => p.recommended)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="w-full sm:max-w-xs">
          <InputGroupInput
            placeholder="Search problems, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <ToggleGroup
          value={[difficulty]}
          onValueChange={(v) => v[0] && setDifficulty(v[0] as Difficulty | 'All')}
          variant="outline"
        >
          {difficulties.map((d) => (
            <ToggleGroupItem key={d} value={d}>
              {d}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {recommended.length > 0 && difficulty === 'All' && !query && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h3 className="text-sm font-semibold">Recommended for your level</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {recommended.map((p) => (
              <Card key={p.id} className="border-primary/25 bg-primary/[0.04]">
                <CardContent className="flex h-full flex-col gap-3 p-4">
                  <div className="flex items-center justify-between">
                    <DifficultyBadge difficulty={p.difficulty} />
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="size-3" />
                      {p.estimatedMin}m
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{p.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2 text-pretty">
                      {p.description}
                    </p>
                  </div>
                  <Button size="sm" className="w-full" render={<Link href="/tutor" />}>
                    Solve with tutor
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">
            {query || difficulty !== 'All' ? 'Results' : 'All problems'}
          </h3>
          <span className="text-xs text-muted-foreground">
            {filtered.length} problem{filtered.length === 1 ? '' : 's'}
          </span>
        </div>

        {filtered.length === 0 ? (
          <Empty className="rounded-xl border border-dashed border-border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Search />
              </EmptyMedia>
              <EmptyTitle>No problems found</EmptyTitle>
              <EmptyDescription>
                Try a different search term or difficulty filter.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((p) => (
              <Card key={p.id} className="transition-colors hover:border-primary/40">
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{p.title}</span>
                      {p.recommended && (
                        <Badge variant="secondary" className="gap-1 text-primary">
                          <Sparkles className="size-3" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1 text-pretty">
                      {p.description}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="outline" className="text-muted-foreground">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1.5">
                    <div className="flex items-center gap-3">
                      <DifficultyBadge difficulty={p.difficulty} />
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <CheckCircle2 className="size-3" />
                        {p.acceptance}%
                      </span>
                    </div>
                    <Button size="sm" variant="ghost" render={<Link href="/tutor" />}>
                      Solve
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
