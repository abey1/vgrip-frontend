import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onRightIconClick?: () => void
  rightIconLabel?: string
}

export function Input({
  label,
  leftIcon,
  rightIcon,
  onRightIconClick,
  rightIconLabel = 'Toggle',
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  const hasLeftIcon = Boolean(leftIcon)
  const hasRightIcon = Boolean(rightIcon)

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm text-gray-500">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {hasLeftIcon ? (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        ) : null}

        <input
          id={inputId}
          className={cn(
            'w-full rounded-md border border-gray-200 bg-white py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
            hasLeftIcon ? 'pl-10' : 'pl-3',
            hasRightIcon ? 'pr-10' : 'pr-3',
            className,
          )}
          {...props}
        />

        {hasRightIcon ? (
          onRightIconClick ? (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
              aria-label={rightIconLabel}
            >
              {rightIcon}
            </button>
          ) : (
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </span>
          )
        ) : null}
      </div>
    </div>
  )
}
