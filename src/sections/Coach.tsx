import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../components/shared/SectionHeader'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

interface CoachProps {
  onCalOpen: () => void
}

function Coach({ onCalOpen }: CoachProps) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const badges = t('coach.badges', { returnObjects: true }) as string[]

  return (
    <section id="coach" className="section-padding bg-[#111111]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start gap-6"
          >
            <div className="relative w-64 sm:w-80">
              <div className="absolute inset-0 rounded-[8px] ring-2 ring-[#0E5D3E]/60 translate-x-3 translate-y-3" />
              <img
                src="/images/coach-lukas.webp"
                alt={t('coach.imgAlt')}
                className="relative w-full aspect-[4/5] object-cover rounded-[8px] grayscale-img"
                loading="lazy"
              />
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {badges.map((badge, i) => (
                <Badge key={i}>{badge}</Badge>
              ))}
            </div>

            {/* TODO: Lukas-Zertifikate einfügen, dann auskommentierung entfernen
            <div className="flex gap-2 flex-wrap">
              <Badge>TODO: Zertifikat 1</Badge>
              <Badge>TODO: Zertifikat 2</Badge>
            </div>
            */}
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <SectionHeader
              eyebrow={t('coach.label')}
              headline={t('coach.tagline')}
            />

            <div className="space-y-4">
              {t('coach.bio').split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-[#A3A3A3] leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {t('coach.ctaTrafos')}
              </Button>
              <Button size="lg" onClick={onCalOpen}>
                {t('coach.ctaCal')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { Coach }
