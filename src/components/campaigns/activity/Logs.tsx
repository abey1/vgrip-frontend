import { useState } from 'react'
import { ExecutionList } from './ExecutionList'
import { CrawlConsole } from './CrawlConsole'
import { useSearchExecutions } from '../../../hooks/hooks'

export function Logs({ campaignId }: { campaignId: string }) {
  const [selectedExecutionId, setSelectedExecutionId] = useState<string | undefined>(undefined)
  useSearchExecutions(campaignId)

  return (
    <div className="grid h-72 gap-4 md:grid-cols-2">
      <ExecutionList
        campaignId={campaignId}
        selectedExecutionId={selectedExecutionId}
        onSelect={setSelectedExecutionId}
      />
      <CrawlConsole executionId={selectedExecutionId} />
    </div>
  )
}
