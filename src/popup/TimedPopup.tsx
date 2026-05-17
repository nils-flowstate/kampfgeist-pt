import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/Button'
import { WhatsAppCTA, getWhatsAppUrl } from '../components/shared/WhatsAppCTA'
import { useActiveTime } from '../hooks/useActiveTime'
import { trackEvent } from '../lib/analytics'

const POPUP_TRIGGER_SECONDS = 60
const SESSION_KEY = 'kg_popup_shown'

function TimedPopup({ onCalOpen }: { onCalOpen: () => void }) {
  const { t } = useTranslation()
  const activeSeconds = useActiveTime()
  const [visible, setVisible] = useState(false)
  const [variant] = useState<'A' | 'B'>(() => {
    const stored = localStorage.getItem('kg_popup_variant')
    if (stored === 'A' || stored === 'B') return stored
    const v = Math.random() < 0.5 ? 'A' : 'B'
    localStorage.setItem('kg_popup_variant', v)
    return v
  })

  // Timed trigger
  useEffect(() => {
    if (
      activeSeconds >= POPUP_TRIGGER_SECONDS &&
      !visible &&
      !sessionStorage.getItem(SESSION_KEY)
    ) {
      setVisible(true)
      sessionStorage.setItem(SESSION_KEY, '1')
      trackEvent('popup_shown', { variant })
    }
  }, [activeSeconds, variant, visible])

  // Exit-intent (Desktop: mouse leaves viewport)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !visible && !sessionStorage.getItem(SESSION_KEY)) {
        setVisible(true)
        sessionStorage.setItem(SESSION_KEY, '1')
        trackEvent('popup_shown', { variant })
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [variant, visible])

  const dismiss = () => {
    setVisible(false)
    trackEvent('popup_dismissed', { variant })
  }

  const vKey = `popup.variant${variant}` as const

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-sm bg-[#171717] border border-[#0E5D3E]/40 rounded-[8px] p-7 text-center shadow-2xl"
          >
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 p-2 text-[#525252] hover:text-[#A3A3A3] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Schließen"
            >
              <X size={18} />
            </button>

            <h2 className="font-display text-3xl uppercase text-[#F5F5F5] leading-tight mb-1">
              {t(`${vKey}.headline1`)}
            </h2>
            <h2 className="font-display text-3xl uppercase text-[#0E5D3E] leading-tight mb-4">
              {t(`${vKey}.headline2`)}
            </h2>

            <p className="font-semibold text-[#F5F5F5] mb-2">{t(`${vKey}.body`)}</p>
            <p className="text-[#A3A3A3] text-sm mb-7 leading-relaxed">{t(`${vKey}.sub`)}</p>

            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  trackEvent('popup_cta_clicked', { variant, cta: 'cal' })
                  onCalOpen()
                  dismiss()
                }}
              >
                {t(`${vKey}.cta1`)}
              </Button>

              <a
                href={getWhatsAppUrl(t('whatsapp.prefilledText'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('popup_cta_clicked', { variant, cta: 'whatsapp' })}
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-semibold rounded-[4px] hover:bg-[#1ebe57] transition-colors min-h-[44px]"
              >
                {t(`${vKey}.cta2`)}
              </a>

              <button
                onClick={dismiss}
                className="text-sm text-[#525252] hover:text-[#A3A3A3] transition-colors py-2 underline underline-offset-2"
              >
                {t(`${vKey}.dismiss`)} ↗
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export { TimedPopup }
