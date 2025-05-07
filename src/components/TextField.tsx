import { type InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}
export const TextField = ({ label, className, ...rest }: Props) => (
  <label className="sr-only">
    {label}
    <input
      className={clsx(
        'w-full rounded bg-brand-300/80 px-6 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500',
        className
      )}
      {...rest}
    />
  </label>
)
