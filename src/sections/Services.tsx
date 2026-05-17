import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Dumbbell, Target, Building2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../components/shared/SectionHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useCSVData } from '../hooks/useCSVData'

interface Service {
  title: string
  description: string
  icon: string
  link: string
  visible: boolean
}

const ICON_MAP: Record<string, React.ElementType> = {
  Dumbbell,
  Target,
  Building2,
}

interface ServicesProps {
  onCalOpen: () => void
}

function Services({ onCalOpen }: ServicesProps) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { data } = useCSVData<Service>('/data/services.csv')

  const fallback = t('services.fallback', { returnObjects: true }) as Service[]
  const services = data.length > 0 ? data : fallback

  return (
    <section id="services" className="section-padding bg-[#111111]">
      <div className="container mx-auto px-4 max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow={t('services.eyebrow')}
            headline={t('services.headline')}
            center
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Dumbbell
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Card hoverable className="h-full flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-[8px] bg-[#0E5D3E]/20 flex items-center justify-center">
                    <Icon size={24} className="text-[#0E5D3E]" />
                  </div>
                  <h3 className="font-display text-2xl uppercase text-[#F5F5F5]">
                    {service.title}
                  </h3>
                  <p className="text-[#A3A3A3] leading-relaxed flex-1">{service.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="self-start"
                    onClick={onCalOpen}
                  >
                    {t('services.ctaLabel')}
                  </Button>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { Services }
