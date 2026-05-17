import { type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

function Card({ className, hoverable = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[#171717] border border-[#0E5D3E]/20 rounded-[8px] p-6',
        hoverable && 'transition-colors duration-200 hover:border-[#1FA06D]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Card }
