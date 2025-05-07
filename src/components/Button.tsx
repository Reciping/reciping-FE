import { type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
}
export const Button = ({ variant = 'primary', className, ...rest }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'w-full py-3 font-semibold text-white transition',
        variant === 'primary' && 'bg-brand-500 hover:bg-brand-300',
        variant === 'ghost' && 'bg-transparent text-brand-500 hover:bg-brand-300 hover:text-white',
        className
      )}
      {...rest}
    />
  )
}
