import { PageHeader } from '@/components/ui-bits'
import { PracticeExplorer } from '@/components/practice/practice-explorer'

export default function PracticePage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Practice Problems"
        description="Curated coding challenges matched to your skill level. Solve them alongside your AI tutor for real-time hints and feedback."
      />
      <PracticeExplorer />
    </div>
  )
}
