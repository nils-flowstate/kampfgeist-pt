import { useTranslation } from 'react-i18next'
import { Link } from 'wouter'
import { Button } from '../components/ui/Button'

function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-center px-4">
      <div>
        <h1 className="font-display text-8xl uppercase text-[#0E5D3E] mb-4">
          {t('notFound.headline')}
        </h1>
        <p className="text-[#A3A3A3] text-xl mb-8">{t('notFound.sub')}</p>
        <Link href="/">
          <Button size="lg">{t('notFound.cta')}</Button>
        </Link>
      </div>
    </div>
  )
}

export { NotFound }
