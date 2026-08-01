import { useEffect } from 'react'
import { ExecutionListItem } from './ExecutionListItem'
import { useAppSelector, useLogs } from '../../../hooks/hooks'

interface ExecutionListProps {
  campaignId: string
  selectedExecutionId?: string
  onSelect: (executionId: string) => void
}

export function ExecutionList({
  campaignId,
  selectedExecutionId,
  onSelect,
}: ExecutionListProps) {
  const searchExecutions = useAppSelector(
    (state) => state.searchExecutions.byCampaignId[campaignId] ?? [],
  )

  // Keep crawl slice updated for the selected execution (and react-query cache)
  useLogs(selectedExecutionId ?? '')

  useEffect(() => {
    if (!selectedExecutionId && searchExecutions.length > 0) {
      onSelect(searchExecutions[0].id)
    }
  }, [searchExecutions, selectedExecutionId, onSelect])

  return (
    <section className="flex h-full min-h-0 flex-col rounded-xl border border-gray-200 bg-white">
      <header className="border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">Executions</h3>
      </header>

      <div className="min-h-0 flex-1 space-y-0.5 overflow-y-auto p-2">
        {searchExecutions.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-gray-500">
            No executions yet.
          </p>
        ) : (
          searchExecutions.map((execution) => (
            <ExecutionListItem
              key={execution.id}
              execution={execution}
              selected={execution.id === selectedExecutionId}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </section>
  )
}
