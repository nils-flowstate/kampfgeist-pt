import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../components/shared/SectionHeader'

function InstagramFeed() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const beholdId = import.meta.env.VITE_BEHOLD_WIDGET_ID

  return (
    <section id="instagram" className="section-padding bg-[#111111]">
      <div className="container mx-auto px-4 max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow={t('instagram.eyebrow')}
            headline={t('instagram.headline')}
            center
          />
        </motion.div>

        {beholdId && beholdId !== 'TODO' ? (
          /* Behold.so widget — Lukas verbindet Instagram selbst */
          <div id={`behold-widget-${beholdId}`} />
        ) : (
          /* Fallback if not configured */
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-center py-12 border border-[#262626] rounded-[8px] bg-[#171717]"
          >
            <Instagram size={40} className="text-[#525252] mx-auto mb-4" />
            <p className="text-[#A3A3A3] mb-6">{t('instagram.fallbackText')}</p>
            <a
              href={`https://instagram.com/kampfgeist.personal.training`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#0E5D3E] hover:underline font-semibold"
            >
              <Instagram size={18} />
              {t('instagram.handle')}
            </a>
          </motion.div>
        )}

        <div className="text-center mt-8">
          <a
            href={`https://instagram.com/kampfgeist.personal.training`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
          >
            <Instagram size={16} />
            {t('instagram.handle')} · {t('instagram.followCta')}
          </a>
        </div>
      </div>
    </section>
  )
}

export { InstagramFeed }
