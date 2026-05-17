import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/Button'
import { WhatsAppCTA } from '../components/shared/WhatsAppCTA'
import { ReviewStars } from '../components/shared/ReviewStars'
import { getGoogleRating } from '../lib/googlePlaces'

interface HeroProps {
  onCalOpen: () => void
}

function Hero({ onCalOpen }: HeroProps) {
  const { t } = useTranslation()
  const [rating, setRating] = useState({ rating: 4.9, count: 47 })

  useEffect(() => {
    getGoogleRating().then(setRating)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-poster.webp"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#0E5D3E] text-sm font-semibold tracking-widest uppercase mb-4"
        >
          {t('hero.eyebrow')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-[#F5F5F5] leading-tight mb-6"
        >
          {t('hero.headline')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-[#A3A3A3] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
        >
          {t('hero.subline')}
        </motion.p>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <ReviewStars
            rating={rating.rating}
            count={rating.count}
            mapsUrl={import.meta.env.VITE_GOOGLE_MAPS_URL}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
        >
          <WhatsAppCTA source="hero" size="lg" />
          <Button size="lg" variant="outline" onClick={onCalOpen}>
            {t('hero.ctaCal')}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="text-[#525252] text-sm"
        >
          {t('hero.micro')}
        </motion.p>

        {/* Scroll arrow */}
        <motion.a
          href="#k3"
          aria-label={t('hero.scrollHint')}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#525252] hover:text-[#0E5D3E] transition-colors"
        >
          <ChevronDown size={32} />
        </motion.a>
      </div>
    </section>
  )
}

export { Hero }
