import { useTranslation } from 'react-i18next'
import { Link } from 'wouter'
import { ArrowLeft } from 'lucide-react'

function Datenschutz() {
  const { t } = useTranslation()
  const d = t('datenschutz', { returnObjects: true }) as Record<string, string>

  const sections = [
    { headline: d.responsibleHeadline, body: d.responsible },
    { headline: d.hostingHeadline, body: d.hosting },
    { headline: d.analyticsHeadline, body: d.analytics },
    { headline: d.pixelHeadline, body: d.pixel },
    { headline: d.rightsHeadline, body: d.rights },
    { headline: d.cookiesHeadline, body: d.cookies },
    { headline: d.whatsappHeadline, body: d.whatsapp },
  ]

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

        <h1 className="font-display text-4xl uppercase text-[#F5F5F5] mb-4">{d.title}</h1>
        <p className="text-[#A3A3A3] mb-10 leading-relaxed">{d.intro}</p>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-display text-2xl uppercase text-[#F5F5F5] mb-3">{s.headline}</h2>
              <p className="text-[#A3A3A3] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Datenschutz }
