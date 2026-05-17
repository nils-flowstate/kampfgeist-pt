import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../components/shared/SectionHeader'
import { SwipeCard } from '../components/shared/SwipeCard'
import { trackEvent } from '../lib/analytics'

function Qualifier() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const questionTexts = t('qualifier.questions', { returnObjects: true }) as string[]
  const questions = questionTexts.map((text, i) => ({ id: i + 1, text }))

  return (
    <section id="qualifier" className="section-padding bg-[#111111]">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow={t('qualifier.eyebrow')}
            headline={t('qualifier.headline')}
            center
          />

          <SwipeCard
            questions={questions}
            onComplete={() => trackEvent('qualifier_completed', { result: 'ja' })}
            onDecline={() => trackEvent('qualifier_completed', { result: 'nein' })}
          />
        </motion.div>
      </div>
    </section>
  )
}

export { Qualifier }
