import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/utils'
import { trackEvent } from '../../lib/analytics'

interface WhatsAppCTAProps {
  source?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showMicro?: boolean
}

function getWhatsAppUrl(text: string): string {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '4900000000000'
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}

function WhatsAppCTA({ source = 'generic', className, size = 'md', showMicro = false }: WhatsAppCTAProps) {
  const { t } = useTranslation()
  const url = getWhatsAppUrl(t('whatsapp.prefilledText'))

  const handleClick = () => {
    trackEvent('whatsapp_clicked', { source })
  }

  return (
    <div className={cn('inline-flex flex-col items-start gap-1', className)}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label={t('whatsapp.ariaLabel')}
        className={cn(
          'inline-flex items-center gap-2 font-semibold bg-[#25D366] text-white rounded-[4px] transition-all duration-200',
          'hover:bg-[#1ebe57] active:scale-[0.98] min-h-[44px]',
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          }
        )}
      >
        <MessageCircle size={size === 'lg' ? 22 : 18} />
        {t('hero.ctaWhatsapp')}
      </a>
      {showMicro && (
        <span className="text-xs text-[#A3A3A3]">{t('whatsapp.micro')}</span>
      )}
    </div>
  )
}

function WhatsAppSticky() {
  const { t } = useTranslation()
  const url = getWhatsAppUrl(t('whatsapp.prefilledText'))

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-1">
      <span className="text-xs text-[#A3A3A3] bg-[#111111]/90 px-2 py-1 rounded text-right">
        {t('whatsapp.micro')}
      </span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_clicked', { source: 'sticky' })}
        aria-label={t('whatsapp.ariaLabel')}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe57] hover:scale-110 transition-all duration-200 active:scale-100"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  )
}

export { WhatsAppCTA, WhatsAppSticky, getWhatsAppUrl }
