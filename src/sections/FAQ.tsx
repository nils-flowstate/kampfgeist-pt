import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../components/shared/SectionHeader'
import { Accordion } from '../components/ui/Accordion'
import { useCSVData } from '../hooks/useCSVData'

interface FAQItem {
  question: string
  answer: string
  order: number
  visible: boolean
}

function FAQ() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { data } = useCSVData<FAQItem>('/data/faq.csv')

  const i18nItems = t('faq.items', { returnObjects: true }) as { question: string; answer: string }[]

  const items =
    data.length > 0
      ? [...data]
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((d) => ({ question: d.question, answer: d.answer }))
      : i18nItems

  return (
    <section id="faq" className="section-padding bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-3xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow={t('faq.eyebrow')}
            headline={t('faq.headline')}
          />
          <Accordion items={items} />
        </motion.div>
      </div>
    </section>
  )
}

export { FAQ }
