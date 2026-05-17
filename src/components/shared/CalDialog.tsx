import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Dialog } from '../ui/Dialog'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'
import { trackEvent } from '../../lib/analytics'

type TabType = 'phone' | 'video'

const phoneSchema = z.object({
  name: z.string().optional(),
  phone: z.string().min(6, 'phoneRequired'),
})

const videoSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('emailInvalid').min(1, 'emailRequired'),
})

type PhoneForm = z.infer<typeof phoneSchema>
type VideoForm = z.infer<typeof videoSchema>

interface CalDialogProps {
  open: boolean
  onClose: () => void
  defaultTab?: TabType
  source?: string
}

function CalDialog({ open, onClose, defaultTab = 'phone', source = 'unknown' }: CalDialogProps) {
  const { t } = useTranslation()
  const [tab, setTab] = useState<TabType>(defaultTab)
  const [submitted, setSubmitted] = useState(false)

  const phoneForm = useForm<PhoneForm>({ resolver: zodResolver(phoneSchema) })
  const videoForm = useForm<VideoForm>({ resolver: zodResolver(videoSchema) })

  const calPhoneLink = import.meta.env.VITE_CAL_PHONE_LINK || 'lukas/telefon-15min'
  const calVideoLink = import.meta.env.VITE_CAL_VIDEO_LINK || 'lukas/video-30min'
  const calUrl = tab === 'phone'
    ? `https://cal.com/${calPhoneLink}`
    : `https://cal.com/${calVideoLink}`

  const onPhoneSubmit = (data: PhoneForm) => {
    trackEvent('caldialog_opened', { type: 'phone', source })
    saveLead({ ...data, type: 'phone', source })
    setSubmitted(true)
  }

  const onVideoSubmit = (data: VideoForm) => {
    trackEvent('caldialog_opened', { type: 'video', source })
    saveLead({ ...data, type: 'video', source })
    setSubmitted(true)
  }

  function saveLead(data: Record<string, unknown>) {
    // Persist lead locally — backend CSV endpoint can be wired up later
    const leads = JSON.parse(localStorage.getItem('kg_leads') || '[]')
    leads.push({ ...data, timestamp: new Date().toISOString() })
    localStorage.setItem('kg_leads', JSON.stringify(leads))
  }

  return (
    <Dialog open={open} onClose={() => { onClose(); setSubmitted(false) }} title={t('calDialog.title')}>
      {submitted ? (
        <div className="text-center py-6">
          <p className="font-display text-3xl uppercase text-[#0E5D3E] mb-2">FAST GESCHAFFT</p>
          <p className="text-[#A3A3A3] mb-6">
            {tab === 'phone' ? t('calDialog.phoneCta') : t('calDialog.videoCta')}
          </p>
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full"
          >
            <Button className="w-full" size="lg">
              Termin im Kalender wählen
            </Button>
          </a>
          <p className="mt-4 text-xs text-[#A3A3A3]">{t('calDialog.micro')}</p>
        </div>
      ) : (
        <>
          {/* Tab switcher */}
          <div className="flex gap-2 mb-6 bg-[#0A0A0A] rounded-[4px] p-1">
            {(['phone', 'video'] as TabType[]).map((t_) => (
              <button
                key={t_}
                onClick={() => setTab(t_)}
                className={cn(
                  'flex-1 py-2 text-sm font-medium rounded-[4px] transition-colors min-h-[40px]',
                  tab === t_
                    ? 'bg-[#0E5D3E] text-[#F5F5F5]'
                    : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
                )}
              >
                {t_ === 'phone' ? t('calDialog.phoneTab') : t('calDialog.videoTab')}
              </button>
            ))}
          </div>

          {tab === 'phone' ? (
            <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
              <Input
                placeholder={t('calDialog.namePlaceholder')}
                {...phoneForm.register('name')}
              />
              <Input
                placeholder={t('calDialog.phonePlaceholder')}
                type="tel"
                error={phoneForm.formState.errors.phone?.message}
                {...phoneForm.register('phone')}
              />
              <Button type="submit" className="w-full" size="lg">
                {t('calDialog.submit')}
              </Button>
            </form>
          ) : (
            <form onSubmit={videoForm.handleSubmit(onVideoSubmit)} className="space-y-4">
              <Input
                placeholder={t('calDialog.namePlaceholder')}
                {...videoForm.register('name')}
              />
              <Input
                placeholder={t('calDialog.emailPlaceholder')}
                type="email"
                error={videoForm.formState.errors.email?.message}
                {...videoForm.register('email')}
              />
              <Button type="submit" className="w-full" size="lg">
                {t('calDialog.submit')}
              </Button>
            </form>
          )}

          <p className="mt-4 text-center text-xs text-[#A3A3A3]">{t('calDialog.micro')}</p>
        </>
      )}
    </Dialog>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

function Input({ error, className, ...props }: InputProps) {
  return (
    <div>
      <input
        className={cn(
          'w-full bg-[#0A0A0A] border border-[#262626] rounded-[4px] px-4 py-3 text-[#F5F5F5] placeholder-[#525252]',
          'focus:outline-none focus:border-[#0E5D3E] transition-colors min-h-[44px]',
          error && 'border-[#EF4444]',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-[#EF4444]">{error}</p>}
    </div>
  )
}

export { CalDialog }
