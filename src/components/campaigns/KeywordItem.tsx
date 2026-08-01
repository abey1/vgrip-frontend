import { GripVertical, Trash2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { Keyword } from '../../types/Campaign'

interface KeywordItemProps {
  keyword: Keyword
  onToggle: (id: string) => void
  onChange: (id: string, text: string) => void
  onRemove: (id: string) => void
  isSelected: boolean
}

export function KeywordItem({
  keyword,
  onToggle,
  onChange,
  onRemove,
  isSelected,
}: KeywordItemProps) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(keyword.id)}
        className="size-4 cursor-pointer accent-blue-600"
        aria-label={`Select keyword ${keyword.text || 'empty'}`}
      />

      <button
        type="button"
        className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="size-4" />
      </button>

      <input
        type="text"
        value={keyword.text}
        onChange={(event) => onChange(keyword.id, event.target.value)}
        placeholder="Enter keyword"
        className="min-w-0 flex-1 border-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
      />

      <button
        type="button"
        onClick={() => onRemove(keyword.id)}
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-md border border-red-200 text-red-500 transition-colors hover:bg-red-50',
        )}
        aria-label={`Remove keyword ${keyword.text || 'empty'}`}
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  )
}
