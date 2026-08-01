import { cn } from '../../../lib/utils'
import { SearchStatus } from '../../../enums/app.enum'
import type { SearchExecutionResponseDto } from '../../../features/search-execution/search-execution.types'

interface ExecutionListItemProps {
  execution: SearchExecutionResponseDto
  selected?: boolean
  onSelect?: (id: string) => void
}

function StatusIndicator({
  status,
  selected,
}: {
  status: string
  selected: boolean
}) {
  const isRunning = status === SearchStatus.RUNNING

  const dot = (
    <span
      className={cn(
        'size-2.5 shrink-0 rounded-full',
        selected ? 'bg-teal-600' : 'border border-gray-400 bg-white',
      )}
      aria-hidden
    />
  )

  if (!isRunning) {
    return <span className="mt-1 flex shrink-0 items-center">{dot}</span>
  }

  return (
    <span
      className="relative mt-0.5 flex size-3.5 shrink-0 items-center justify-center"
      aria-label="Running"
    >
      {/* Spinning ring — shows activity even when not selected */}
      <span
        className={cn(
          'absolute inset-0 animate-spin rounded-full border-2 border-transparent',
          selected ? 'border-t-teal-600 border-r-teal-600' : 'border-t-gray-400 border-r-gray-400',
        )}
      />
      {dot}
    </span>
  )
}

export function ExecutionListItem({
  execution,
  selected = false,
  onSelect,
}: ExecutionListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(execution.id)}
      className={cn(
        'flex w-full items-start gap-2.5 rounded-md px-2 py-2.5 text-left transition-colors',
        selected ? 'bg-teal-50' : 'hover:bg-gray-50',
      )}
    >
      <StatusIndicator status={execution.status} selected={selected} />
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-gray-900">
          {execution.keyword}
        </span>
        <span className="mt-0.5 block text-xs uppercase tracking-wide text-gray-500">
          {execution.status} · {execution.urlsReturned} urls
        </span>
      </span>
    </button>
  )
}
