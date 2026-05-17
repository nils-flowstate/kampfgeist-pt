import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200',
          'min-h-[44px] cursor-pointer select-none rounded-[4px]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E5D3E]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-[#0E5D3E] text-[#F5F5F5] hover:bg-[#0A4630] active:scale-[0.98]':
              variant === 'primary',
            'border border-[#0E5D3E] text-[#F5F5F5] hover:bg-[#0E5D3E]/10 active:scale-[0.98]':
              variant === 'outline',
            'text-[#F5F5F5] hover:bg-[#262626] active:scale-[0.98]': variant === 'ghost',
            'bg-[#25D366] text-white hover:bg-[#1ebe57] active:scale-[0.98]':
              variant === 'whatsapp',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
