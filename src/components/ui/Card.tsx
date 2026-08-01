import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-100 bg-white p-6 shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  icon: ReactNode
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function CardHeader({
  icon,
  title,
  description,
  align = 'left',
}: CardHeaderProps) {
  const isCentered = align === 'center'

  return (
    <div
      className={cn(
        'mb-5 flex gap-3',
        isCentered ? 'flex-col items-center text-center' : 'items-center',
      )}
    >
      <span
        className={cn(
          'flex items-center justify-center rounded-full bg-teal-50 text-teal-600',
          isCentered ? 'size-10' : 'size-8',
        )}
      >
        {icon}
      </span>
      <div className={cn(!isCentered && 'min-w-0')}>
        <h2
          className={cn(
            'font-semibold text-gray-900',
            isCentered ? 'text-2xl font-bold' : 'text-base',
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              'text-sm text-gray-500',
              isCentered ? 'mt-2 max-w-sm' : 'mt-0.5',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
