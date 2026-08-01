import { useEffect, useState } from 'react'
import { ExecutionList } from './ExecutionList'
import { CrawlConsole } from './CrawlConsole'
import { useAppDispatch, useSearchExecutions } from '../../../hooks/hooks'
import { getSearchExecutions } from '../../../features/search-execution/search-execution.slice'

export function Logs({ campaignId }: { campaignId: string }) {
  const dispatch = useAppDispatch()
  const [selectedExecutionId, setSelectedExecutionId] = useState<string | undefined>(undefined)
  useSearchExecutions(campaignId)

  // useEffect(() => {
  //   dispatch(getSearchExecutions(campaignId))
  //   setSelectedExecutionId(undefined)
  // }, [campaignId, dispatch])

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
