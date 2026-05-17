import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/Button'
import { WhatsAppCTA } from '../components/shared/WhatsAppCTA'

interface FinalCTAProps {
  onCalOpen: () => void
}

function FinalCTA({ onCalOpen }: FinalCTAProps) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Brand gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A4630] via-[#0E5D3E] to-[#0A0A0A]" />
      <div className="absolute inset-0 bg-[#0A0A0A]/40" />

      <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-[#1FA06D] text-sm font-semibold tracking-widest uppercase">
            {t('finalCta.eyebrow')}
          </p>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase text-[#F5F5F5] leading-tight">
            {t('finalCta.headline')}
          </h2>

          <p className="text-[#A3A3A3] text-xl">{t('finalCta.sub')}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <WhatsAppCTA source="final" size="lg" />
            <Button size="lg" variant="outline" onClick={onCalOpen}>
              {t('finalCta.ctaCal')}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-[#A3A3A3] text-sm">{t('finalCta.micro1')}</p>
            <p className="text-[#525252] text-sm">{t('finalCta.micro2')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { FinalCTA }
