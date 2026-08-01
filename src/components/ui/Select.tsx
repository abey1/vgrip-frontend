import type { ReactNode, SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  icon?: ReactNode
  options: { value: string; label: string }[]
}

export function Select({
  label,
  icon,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <label htmlFor={selectId} className="text-sm text-gray-500">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        ) : null}
        <select
          id={selectId}
          className={cn(
            'w-full appearance-none rounded-md border border-gray-200 bg-white py-2.5 pr-9 text-sm text-gray-900 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
            icon ? 'pl-10' : 'pl-3',
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-400"
          aria-hidden
        />
      </div>
    </div>
  )
}
