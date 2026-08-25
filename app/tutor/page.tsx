'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { problems } from '@/lib/mock-data'
import { TutorWorkspace } from '@/components/tutor/tutor-workspace'

function TutorContent() {
  const searchParams = useSearchParams()
  const problemId = searchParams.get('problem')
  const selectedProblem = problems.find((problem) => problem.id === problemId)

  return (
    <TutorWorkspace
      prefillCode={selectedProblem?.sample}
      problemId={problemId || undefined}
    />
  )
}

export default function TutorPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading workspace...</div>}>
        <TutorContent />
      </Suspense>
    </div>
  )
}

