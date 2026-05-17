import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'wouter'
import { Instagram, Phone } from 'lucide-react'
import { StickyNav } from '../components/shared/StickyNav'
import { WhatsAppSticky } from '../components/shared/WhatsAppCTA'
import { ScrollProgress } from '../components/shared/ScrollProgress'
import { CookieConsent } from '../components/shared/CookieConsent'
import { CalDialog } from '../components/shared/CalDialog'
import { TimedPopup } from '../popup/TimedPopup'

interface RootLayoutProps {
  children: ReactNode
}

function RootLayout({ children }: RootLayoutProps) {
  const { t, i18n } = useTranslation()
  const [calOpen, setCalOpen] = useState(false)

  const year = new Date().getFullYear()
  const phone = import.meta.env.VITE_PHONE_NUMBER || ''

  const toggleLang = () => {
    const next = i18n.language === 'de' ? 'en' : 'de'
    i18n.changeLanguage(next)
  }

  return (
    <>
      <ScrollProgress />
      <StickyNav onCalOpen={() => setCalOpen(true)} />

      <main>{children}</main>

      <footer className="bg-[#111111] border-t border-[#262626] pt-16 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <p className="font-display text-lg uppercase tracking-widest text-[#0E5D3E] mb-3">
                KAMPFGEIST PT
              </p>
              <p className="text-[#A3A3A3] text-sm leading-relaxed">{t('footer.tagline')}</p>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 mt-4 text-sm text-[#525252] hover:text-[#F5F5F5] transition-colors"
                >
                  <Phone size={14} />
                  {phone}
                </a>
              )}
            </div>

            {/* Links */}
            <div>
              <p className="font-semibold text-[#F5F5F5] mb-4">{t('footer.links')}</p>
              <ul className="space-y-2">
                <li>
                  <a href="#k3" className="text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">
                    {t('nav.method')}
                  </a>
                </li>
                <li>
                  <a href="#coach" className="text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">
                    {t('nav.coach')}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">
                    {t('nav.services')}
                  </a>
                </li>
                <li>
                  <a
                    href={import.meta.env.VITE_GOOGLE_MAPS_URL || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
                  >
                    {t('reviews.allReviews')}
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/kampfgeist.personal.training"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
                  >
                    <Instagram size={13} />
                    {t('footer.instagram')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="font-semibold text-[#F5F5F5] mb-4">{t('footer.legal')}</p>
              <ul className="space-y-2">
                <li>
                  <Link href="/impressum" className="text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">
                    {t('footer.impressum')}
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutz" className="text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">
                    {t('footer.datenschutz')}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={toggleLang}
                    className="text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
                  >
                    {t('footer.languageSwitch')}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#262626] pt-6 text-center">
            <p className="text-xs text-[#525252]">
              {t('footer.copyright', { year })}
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppSticky />
      <CookieConsent />
      <CalDialog open={calOpen} onClose={() => setCalOpen(false)} source="layout" />
      <TimedPopup onCalOpen={() => setCalOpen(true)} />
    </>
  )
}

export { RootLayout }
