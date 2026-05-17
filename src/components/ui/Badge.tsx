import { type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'outline'
}

function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-[4px]',
        {
          'bg-[#0E5D3E]/20 text-[#1FA06D] border border-[#0E5D3E]/30': variant === 'default',
          'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30': variant === 'success',
          'border border-[#262626] text-[#A3A3A3]': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
