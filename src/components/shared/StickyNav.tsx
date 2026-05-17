import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'

interface StickyNavProps {
  onCalOpen: () => void
}

function StickyNav({ onCalOpen }: StickyNavProps) {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: t('nav.method'), href: '#k3' },
    { label: t('nav.coach'), href: '#coach' },
    { label: t('nav.results'), href: '#transformations' },
    { label: t('nav.services'), href: '#services' },
  ]

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.nav
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-3 left-4 right-4 z-40 bg-[#111111]/95 backdrop-blur-md border border-[#262626] rounded-[8px] px-5 py-3 flex items-center justify-between shadow-xl"
        >
          <a href="#" className="font-display text-sm uppercase tracking-widest text-[#0E5D3E]">
            KAMPFGEIST PT
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" onClick={onCalOpen}>
              {t('nav.cta')}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#A3A3A3] hover:text-[#F5F5F5]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>
      )}

      {/* Mobile drawer */}
      {mobileOpen && scrolled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-20 left-4 right-4 z-39 bg-[#111111] border border-[#262626] rounded-[8px] p-5 shadow-xl flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button onClick={() => { onCalOpen(); setMobileOpen(false) }}>
            {t('nav.cta')}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { StickyNav }
