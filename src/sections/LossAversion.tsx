import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function LossAversion() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 bg-[#111111]">
      <div className="container mx-auto px-4 max-w-3xl text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-[#F5F5F5] leading-tight mb-4">
            {t('lossAversion.headline')}
          </h2>
          <p className="text-[#525252] text-lg">{t('lossAversion.sub')}</p>
        </motion.div>
      </div>
    </section>
  )
}

export { LossAversion }
