import { cn } from '../../lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  headline: string
  sub?: string
  center?: boolean
  className?: string
}

function SectionHeader({ eyebrow, headline, sub, center = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', center && 'text-center', className)}>
      {eyebrow && (
        <p className="text-[#0E5D3E] text-sm font-semibold tracking-widest uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase text-[#F5F5F5] leading-tight">
        {headline}
      </h2>
      {sub && (
        <p className="mt-4 text-[#A3A3A3] text-lg leading-relaxed max-w-2xl">
          {sub}
        </p>
      )}
    </div>
  )
}

export { SectionHeader }
