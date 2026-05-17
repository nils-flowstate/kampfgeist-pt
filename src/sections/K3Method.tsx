import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, UtensilsCrossed, Dumbbell } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../components/shared/SectionHeader'
import { Card } from '../components/ui/Card'

const ICONS = [Brain, UtensilsCrossed, Dumbbell]

function K3Method() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const cards = t('k3.cards', { returnObjects: true }) as { title: string; body: string }[]

  return (
    <section id="k3" className="section-padding bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow={t('k3.eyebrow')}
            headline={t('k3.headline')}
            sub={t('k3.sub')}
            center
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Card hoverable className="h-full flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-[8px] bg-[#0E5D3E]/20 flex items-center justify-center">
                    <Icon size={22} className="text-[#0E5D3E]" />
                  </div>
                  <h3 className="font-display text-2xl uppercase text-[#F5F5F5]">
                    {card.title}
                  </h3>
                  <p className="text-[#A3A3A3] leading-relaxed flex-1">{card.body}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { K3Method }
