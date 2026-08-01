import { cn } from '../../lib/utils'
import { Button } from './Button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav
      className="flex items-center justify-center gap-2 pt-6"
      aria-label="Pagination"
    >
      <Button
        variant="secondary"
        className="px-4 py-1.5"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      {pages.map((page) => {
        const isActive = page === currentPage

        return (
          <button
            key={page}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onPageChange(page)}
            className={cn(
              'flex size-9 items-center justify-center rounded-full text-sm font-medium transition-colors',
              isActive
                ? 'bg-teal-600 text-white'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
            )}
          >
            {page}
          </button>
        )
      })}

      <Button
        variant="secondary"
        className="px-4 py-1.5"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </nav>
  )
}
