import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const checkboxId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <label
      htmlFor={checkboxId}
      className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-600"
    >
      <input
        id={checkboxId}
        type="checkbox"
        className={cn(
          'size-4 cursor-pointer rounded border-gray-300 accent-teal-600',
          className,
        )}
        {...props}
      />
      <span>{label}</span>
    </label>
  )
}
