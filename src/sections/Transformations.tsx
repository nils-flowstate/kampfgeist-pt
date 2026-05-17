import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { useCSVData } from '../hooks/useCSVData'
import { SectionHeader } from '../components/shared/SectionHeader'
import { Badge } from '../components/ui/Badge'

interface Transformation {
  name: string
  duration: string
  quote: string
  before_image: string
  after_image: string
  visible: boolean
}

interface LightboxState {
  before: string
  after: string
  name: string
}

function Transformations() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { data } = useCSVData<Transformation>('/data/transformations.csv')
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const items = data.length > 0 ? data : PLACEHOLDER_TRAFOS

  return (
    <section id="transformations" className="section-padding bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Badge className="mb-6">{t('transformations.badge')}</Badge>
          <SectionHeader
            eyebrow={t('transformations.eyebrow')}
            headline={t('transformations.headline')}
            sub={t('transformations.sub')}
          />
        </motion.div>

        {/* Horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-3 gap-6 w-max md:w-auto">
            {items.map((item, i) => (
              <TransformationCard
                key={i}
                item={item}
                index={i}
                inView={inView}
                onOpenLightbox={() =>
                  setLightbox({ before: item.before_image, after: item.after_image, name: item.name })
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-2xl w-full grid grid-cols-2 gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.before} alt={`${lightbox.name} vorher`} className="w-full rounded-[8px]" />
              <img src={lightbox.after} alt={`${lightbox.name} nachher`} className="w-full rounded-[8px]" />
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-[#A3A3A3] hover:text-[#F5F5F5]"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

interface CardProps {
  item: Transformation
  index: number
  inView: boolean
  onOpenLightbox: () => void
}

function TransformationCard({ item, index, inView, onOpenLightbox }: CardProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-72 md:w-auto bg-[#171717] border border-[#262626] rounded-[8px] overflow-hidden cursor-pointer group"
      onClick={onOpenLightbox}
    >
      <div className="relative grid grid-cols-2 h-48">
        <div className="relative overflow-hidden">
          <img
            src={`/images/transformations/${item.before_image}`}
            alt={`${item.name} vorher`}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
          <span className="absolute bottom-2 left-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
            {t('transformations.before')}
          </span>
        </div>
        <div className="relative overflow-hidden">
          <img
            src={`/images/transformations/${item.after_image}`}
            alt={`${item.name} nachher`}
            className="w-full h-full object-cover transition-all duration-500"
            loading="lazy"
          />
          <span className="absolute bottom-2 right-2 text-xs bg-[#0E5D3E]/80 text-white px-2 py-0.5 rounded">
            {t('transformations.after')}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-[#F5F5F5]">{item.name}</span>
          <Badge variant="outline">
            {item.duration} {t('transformations.weeks')}
          </Badge>
        </div>
        <p className="text-sm text-[#A3A3A3] italic">„{item.quote}"</p>
      </div>
    </motion.div>
  )
}

const PLACEHOLDER_TRAFOS: Transformation[] = [
  {
    name: 'Markus T.',
    duration: '12',
    quote: 'Ich wusste nach 4 Wochen, was ich tue. Jetzt mache ich das alleine weiter.',
    before_image: 'placeholder.webp',
    after_image: 'placeholder.webp',
    visible: true,
  },
  {
    name: 'Stefan K.',
    duration: '8',
    quote: '20 Minuten am Tag. Ich hätte nicht geglaubt, dass das reicht.',
    before_image: 'placeholder.webp',
    after_image: 'placeholder.webp',
    visible: true,
  },
  {
    name: 'Thomas W.',
    duration: '16',
    quote: 'Endlich ein System, das zu meinem Leben passt — nicht umgekehrt.',
    before_image: 'placeholder.webp',
    after_image: 'placeholder.webp',
    visible: true,
  },
]

export { Transformations }
