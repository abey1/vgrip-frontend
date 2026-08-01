import { CrawlLogLine } from './CrawlLogLine'
import { useAppSelector } from '../../../hooks/hooks'
import { CrawlStatus } from '../../../enums/app.enum'

interface CrawlConsoleProps {
  executionId?: string
}

function formatLogTime(createdAt: Date | string | null | undefined): string {
  if (!createdAt) return ''
  const date = createdAt instanceof Date ? createdAt : new Date(createdAt)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleTimeString()
}

export function CrawlConsole({ executionId }: CrawlConsoleProps) {
  const crawlLogs = useAppSelector((state) =>
    executionId ? (state.crawl.byExecutionId[executionId] ?? []) : [],
  )
  const loadingExecutionId = useAppSelector(
    (state) => state.crawl.loadingExecutionId,
  )
  const isLoading = !!executionId && loadingExecutionId === executionId

  return (
    <section className="flex h-full min-h-0 flex-col rounded-xl border border-gray-800 bg-black">
      <header className="border-b border-white/10 px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Crawl console</h3>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        {!executionId ? (
          <p className="font-mono text-sm text-white/40">
            Select an execution to view crawl output...
          </p>
        ) : isLoading && crawlLogs.length === 0 ? (
          <p className="font-mono text-sm text-white/40">Loading crawl logs...</p>
        ) : crawlLogs.length === 0 ? (
          <p className="font-mono text-sm text-white/40">
            Waiting for crawl output...
          </p>
        ) : (
          <div className="space-y-0.5">
            {crawlLogs.map((entry) => (
              <CrawlLogLine
                key={entry.id}
                entry={{
                  id: entry.id,
                  time: formatLogTime(entry.createdAt),
                  status: entry.status,
                  detail: entry.error || entry.url || '',
                }}
              />
            ))}
          </div>
        )}
      </div>

      <footer className="border-t border-white/10 px-4 py-2.5">
        <p className="font-mono text-xs text-white/70">
          Summary:{' '}
          <span className="text-emerald-300">
            {crawlLogs.filter((log) => log.status === CrawlStatus.SUCCESS).length}{' '}
            success
          </span>
          {' · '}
          <span className="text-red-400">
            {crawlLogs.filter((log) => log.status === CrawlStatus.FAILED).length}{' '}
            failed
          </span>
        </p>
      </footer>
    </section>
  )
}
