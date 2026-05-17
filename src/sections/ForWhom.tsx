import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../components/shared/SectionHeader'

function ForWhom() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const forItems = t('forWhom.for', { returnObjects: true }) as string[]
  const notItems = t('forWhom.not', { returnObjects: true }) as string[]

  return (
    <section id="forwho" className="section-padding bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            headline={t('forWhom.headline')}
            center
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* For you */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-[#171717] border border-[#22C55E]/20 rounded-[8px] p-6"
          >
            <h3 className="font-display text-xl uppercase text-[#22C55E] mb-5">
              {t('forWhom.forLabel')}
            </h3>
            <ul className="space-y-3">
              {forItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={18} className="text-[#22C55E] shrink-0 mt-0.5" />
                  <span className="text-[#A3A3A3]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not for you */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-[#171717] border border-[#EF4444]/20 rounded-[8px] p-6"
          >
            <h3 className="font-display text-xl uppercase text-[#EF4444] mb-5">
              {t('forWhom.notLabel')}
            </h3>
            <ul className="space-y-3">
              {notItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X size={18} className="text-[#EF4444] shrink-0 mt-0.5" />
                  <span className="text-[#525252] line-through decoration-[#EF4444]/50">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { ForWhom }
