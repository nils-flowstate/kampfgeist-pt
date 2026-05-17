import { useState, useRef } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { WhatsAppCTA } from './WhatsAppCTA'
import { cn } from '../../lib/utils'
import { trackEvent } from '../../lib/analytics'

interface Question {
  id: number
  text: string
}

interface SwipeCardProps {
  questions: Question[]
  onComplete: () => void
  onDecline: () => void
}

function SwipeCard({ questions, onComplete, onDecline }: SwipeCardProps) {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const [exitDir, setExitDir] = useState<'left' | 'right' | null>(null)
  const [declined, setDeclined] = useState(false)
  const [completed, setCompleted] = useState(false)
  const dragStartRef = useRef(0)

  const handleAnswer = (yes: boolean) => {
    if (!yes) {
      setExitDir('left')
      setTimeout(() => {
        setDeclined(true)
        onDecline()
        trackEvent('qualifier_completed', { result: 'nein' })
      }, 350)
      return
    }

    setExitDir('right')
    setTimeout(() => {
      const next = current + 1
      if (next >= questions.length) {
        setCompleted(true)
        onComplete()
        trackEvent('qualifier_completed', { result: 'ja' })
      } else {
        setCurrent(next)
        setExitDir(null)
      }
    }, 350)
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 80) handleAnswer(true)
    else if (info.offset.x < -80) handleAnswer(false)
  }

  if (declined) {
    return (
      <div className="text-center py-8">
        <p className="text-[#A3A3A3] text-lg mb-6">{t('qualifier.noMessage')}</p>
        <WhatsAppCTA source="qualifier-decline" size="lg" />
      </div>
    )
  }

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <h3 className="font-display text-3xl md:text-5xl uppercase text-[#0E5D3E] mb-6">
          {t('qualifier.completedHeadline')}
        </h3>
        <WhatsAppCTA source="qualifier-complete" size="lg" />
        <p className="mt-4 text-sm text-[#A3A3A3]">{t('qualifier.completedMicro')}</p>
      </motion.div>
    )
  }

  const question = questions[current]

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Card stack */}
      <div className="relative w-full max-w-sm h-48">
        {/* Shadow card behind */}
        {current < questions.length - 1 && (
          <div className="absolute inset-0 bg-[#171717] border border-[#262626] rounded-[8px] translate-y-2 scale-[0.97]" />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, scale: 0.9, x: exitDir === 'right' ? -60 : 60 }}
            animate={{
              opacity: exitDir ? 0 : 1,
              scale: exitDir ? 0.9 : 1,
              x: exitDir === 'right' ? 120 : exitDir === 'left' ? -120 : 0,
              rotate: exitDir === 'right' ? 8 : exitDir === 'left' ? -8 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: -120, right: 120 }}
            onDragEnd={handleDragEnd}
            onDragStart={(_, info) => { dragStartRef.current = info.point.x }}
            whileDrag={{ cursor: 'grabbing' }}
            className="absolute inset-0 bg-[#171717] border border-[#0E5D3E]/30 rounded-[8px] p-6 flex items-center justify-center cursor-grab select-none shadow-lg"
          >
            {/* Yes overlay */}
            <AnimatePresence>
              {exitDir === 'right' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center"
                >
                  <Check size={24} className="text-white" />
                </motion.div>
              )}
              {exitDir === 'left' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 left-4 w-12 h-12 rounded-full bg-[#EF4444] flex items-center justify-center"
                >
                  <X size={24} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-[#F5F5F5] text-lg font-semibold text-center leading-snug">
              {question.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot progress */}
      <div className="flex gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full transition-colors duration-200',
              i === current ? 'bg-[#0E5D3E]' : i < current ? 'bg-[#0E5D3E]/50' : 'bg-[#262626]'
            )}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 w-full max-w-xs">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 border-[#EF4444]/50 text-[#EF4444] hover:bg-[#EF4444]/10"
          onClick={() => handleAnswer(false)}
        >
          <X size={18} />
          {t('qualifier.no')}
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-[#22C55E] hover:bg-[#16a34a]"
          onClick={() => handleAnswer(true)}
        >
          <Check size={18} />
          {t('qualifier.yes')}
        </Button>
      </div>

      <p className="text-xs text-[#525252]">
        Swipe rechts = Ja · Swipe links = Nein
      </p>
    </div>
  )
}

export { SwipeCard }
