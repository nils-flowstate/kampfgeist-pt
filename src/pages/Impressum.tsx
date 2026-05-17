import { useTranslation } from 'react-i18next'
import { Link } from 'wouter'
import { ArrowLeft } from 'lucide-react'

function Impressum() {
  const { t } = useTranslation()
  const i = t('impressum', { returnObjects: true }) as Record<string, string>

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Zurück
        </Link>

        <h1 className="font-display text-4xl uppercase text-[#F5F5F5] mb-8">{i.title}</h1>

        <div className="space-y-6 text-[#A3A3A3] leading-relaxed">
          <div>
            <p className="font-semibold text-[#F5F5F5]">{i.business}</p>
            <p>{i.name}</p>
            <p>{i.address}</p>
          </div>

          <div>
            <p>E-Mail: <a href={`mailto:${i.email}`} className="text-[#0E5D3E] hover:underline">{i.email}</a></p>
            <p>Tel: <a href={`tel:${i.phone}`} className="text-[#0E5D3E] hover:underline">{i.phone}</a></p>
          </div>

          <p>{i.vatNote}</p>

          <div>
            <p className="font-semibold text-[#F5F5F5] mb-1">{i.responsibleLabel}</p>
            <p>{i.responsible}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Impressum }
