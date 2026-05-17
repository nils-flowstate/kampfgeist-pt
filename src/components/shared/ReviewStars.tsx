import { Star } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ReviewStarsProps {
  rating: number
  count?: number
  mapsUrl?: string
  className?: string
}

function ReviewStars({ rating, count, mapsUrl, className }: ReviewStarsProps) {
  const stars = Math.round(rating)
  const url = mapsUrl || import.meta.env.VITE_GOOGLE_MAPS_URL || '#'

  const content = (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < stars ? 'text-[#FBBF24] fill-[#FBBF24]' : 'text-[#525252]'}
          />
        ))}
      </div>
      <span className="text-[#F5F5F5] font-semibold text-sm">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-[#A3A3A3] text-sm">· {count} Bewertungen auf Google</span>
      )}
    </div>
  )

  if (!mapsUrl && !import.meta.env.VITE_GOOGLE_MAPS_URL) return content

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
      aria-label={`${rating} von 5 Sternen — ${count} Bewertungen auf Google Maps`}
    >
      {content}
    </a>
  )
}

export { ReviewStars }
