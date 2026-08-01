import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'danger-outline'
  | 'success-outline'
  | 'ghost'

type ButtonSize = 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-teal-600 text-white border border-teal-600 hover:bg-teal-700 hover:border-teal-700',
  secondary:
    'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50',
  danger:
    'bg-white text-red-500 border border-red-400 hover:bg-red-50',
  'danger-outline':
    'bg-white text-red-500 border border-red-400 hover:bg-red-50',
  'success-outline':
    'bg-white text-teal-600 border border-teal-500 hover:bg-teal-50',
  ghost:
    'bg-transparent text-teal-600 border border-transparent hover:text-teal-700',
}

const sizes: Record<ButtonSize, string> = {
  md: 'px-3.5 py-2 text-sm font-medium',
  lg: 'px-4 py-2.5 text-sm font-semibold',
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
