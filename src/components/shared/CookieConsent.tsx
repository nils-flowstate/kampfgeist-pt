import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'wouter'
import { Button } from '../ui/Button'
import { hasConsented, setConsent } from '../../lib/consent'
import { loadGA4, loadMetaPixel } from '../../lib/analytics'
import { cn } from '../../lib/utils'

function CookieConsent() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analyticsChecked, setAnalyticsChecked] = useState(true)
  const [adsChecked, setAdsChecked] = useState(true)

  useEffect(() => {
    if (!hasConsented()) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    } else {
      const c = JSON.parse(localStorage.getItem('kg_consent') || '{}')
      if (c.analytics) loadGA4()
      if (c.ads) loadMetaPixel()
    }
  }, [])

  const accept = (analytics: boolean, ads: boolean) => {
    setConsent(analytics, ads)
    if (analytics) loadGA4()
    if (ads) loadMetaPixel()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-50 bg-[#171717] border border-[#262626] rounded-[8px] p-5 shadow-2xl"
          role="dialog"
          aria-label="Cookie-Einstellungen"
        >
          {!showSettings ? (
            <div>
              <p className="text-sm text-[#A3A3A3] mb-4">
                {t('cookie.text')}{' '}
                <Link href="/datenschutz" className="text-[#0E5D3E] hover:underline">
                  {t('cookie.privacy')}
                </Link>
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  onClick={() => accept(true, true)}
                  className="flex-1"
                >
                  {t('cookie.acceptAll')}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => accept(false, false)}
                  className="flex-1"
                >
                  {t('cookie.necessaryOnly')}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowSettings(true)}
                >
                  {t('cookie.settings')}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-semibold text-[#F5F5F5] mb-4">{t('cookie.settingsTitle')}</p>

              <div className="space-y-3 mb-5">
                <ToggleRow
                  label="Notwendig"
                  desc="Technisch erforderlich. Nicht deaktivierbar."
                  checked
                  disabled
                />
                <ToggleRow
                  label={t('cookie.analyticsLabel')}
                  desc={t('cookie.analyticsDesc')}
                  checked={analyticsChecked}
                  onChange={setAnalyticsChecked}
                />
                <ToggleRow
                  label={t('cookie.adsLabel')}
                  desc={t('cookie.adsDesc')}
                  checked={adsChecked}
                  onChange={setAdsChecked}
                />
              </div>

              <Button
                size="sm"
                onClick={() => accept(analyticsChecked, adsChecked)}
                className="w-full"
              >
                {t('cookie.save')}
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface ToggleRowProps {
  label: string
  desc: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}

function ToggleRow({ label, desc, checked, disabled, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-[#F5F5F5]">{label}</p>
        <p className="text-xs text-[#A3A3A3]">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative w-10 h-6 rounded-full transition-colors duration-200 shrink-0 mt-0.5',
          checked ? 'bg-[#0E5D3E]' : 'bg-[#262626]',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  )
}

export { CookieConsent }
