import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../components/shared/SectionHeader'
import { useCSVData } from '../hooks/useCSVData'

interface Review {
  name: string
  rating: number
  text: string
  date: string
  role: string
  visible: boolean
}

const PLACEHOLDER_REVIEWS: Review[] = [
  {
    name: 'Andreas K.',
    rating: 5,
    text: 'Lukas hat mein Leben verändert. Nach 3 Monaten trainiere ich selbstständig weiter — genau das wollte ich.',
    date: '2025-03-10',
    role: 'Unternehmer',
    visible: true,
  },
  {
    name: 'Michael B.',
    rating: 5,
    text: 'Endlich jemand, der mich nicht abhängig machen will. Der Plan passt zu meinem Alltag — nicht umgekehrt.',
    date: '2025-02-15',
    role: 'Geschäftsführer',
    visible: true,
  },
  {
    name: 'Thomas R.',
    rating: 5,
    text: 'Bin seit 8 Jahren selbstständig und hatte nie Zeit für Sport. Mit Lukas hat das in 6 Wochen geklappt.',
    date: '2025-01-20',
    role: 'Selbstständiger',
    visible: true,
  },
  {
    name: 'Frank S.',
    rating: 5,
    text: 'Direktes Feedback, kein Kitsch, keine leeren Versprechen. Genau das hatte ich gesucht.',
    date: '2024-12-05',
    role: 'Führungskraft',
    visible: true,
  },
]

function Reviews() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { data } = useCSVData<Review>('/data/reviews.csv')
  const reviews = data.length > 0 ? data : PLACEHOLDER_REVIEWS

  return (
    <section id="reviews" className="section-padding bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow={t('reviews.eyebrow')}
            headline={t('reviews.headline')}
          />
        </motion.div>

        {/* Scrollable carousel */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 w-max md:w-auto">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Elfsight Widget — auskommentiert
        <div className="elfsight-app-TODO-WIDGET-ID" data-elfsight-app-lazy></div>
        <script src="https://static.elfsight.com/platform/platform.js" async></script>
        */}

        <div className="mt-8 text-center">
          <a
            href={import.meta.env.VITE_GOOGLE_MAPS_URL || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#0E5D3E] hover:underline"
          >
            {t('reviews.allReviews')} →
          </a>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const MAX = 120
  const isLong = review.text.length > MAX
  const displayText = expanded || !isLong ? review.text : review.text.slice(0, MAX) + '…'

  return (
    <div className="w-72 md:w-auto bg-[#171717] border border-[#262626] rounded-[8px] p-5 flex flex-col gap-3">
      {/* Google branding */}
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Google">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <div className="flex">
          {Array.from({ length: review.rating || 5 }).map((_, i) => (
            <Star key={i} size={13} className="text-[#FBBF24] fill-[#FBBF24]" />
          ))}
        </div>
      </div>

      <p className="text-[#A3A3A3] text-sm leading-relaxed">
        „{displayText}"
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-[#0E5D3E] hover:underline text-xs"
          >
            {expanded ? t('reviews.readLess') : t('reviews.readMore')}
          </button>
        )}
      </p>

      <div className="mt-auto">
        <p className="font-semibold text-sm text-[#F5F5F5]">{review.name}</p>
        {review.role && <p className="text-xs text-[#525252]">{review.role}</p>}
      </div>
    </div>
  )
}

export { Reviews }
