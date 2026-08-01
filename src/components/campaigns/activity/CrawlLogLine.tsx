import { useEffect, useState } from 'react'
import { cn } from '../../../lib/utils'
import type { CrawlStatus } from '../../../enums/app.enum'

export interface CrawlLogEntry {
  id: string
  time: string
  status: CrawlStatus
  detail: string
}

interface CrawlLogLineProps {
  entry: CrawlLogEntry
}

const statusClass: Record<CrawlStatus, string> = {
  RUNNING: 'text-sky-300',
  SUCCESS: 'text-emerald-300',
  FAILED: 'text-red-400',
}

const ELLIPSIS_FRAMES = ["",'.', '..', '...'] as const

function RunningEllipsis() {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setFrame((prev) => (prev + 1) % ELLIPSIS_FRAMES.length)
    }, 400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className="inline-block w-3 text-left" aria-hidden>
      {ELLIPSIS_FRAMES[frame]}
    </span>
  )
}

export function CrawlLogLine({ entry }: CrawlLogLineProps) {
  return (
    <div className="font-mono text-[13px] leading-6 text-white/90">
      <span className="text-white/50">[{entry.time}]</span>{' '}
      <span className={cn('inline-block w-24 font-semibold', statusClass[entry.status])}>
        {entry.status}
        {entry.status === 'RUNNING' ? <RunningEllipsis /> : null}
      </span>{' '}
      <span className="text-white/85">{entry.detail}</span>
    </div>
  )
}
