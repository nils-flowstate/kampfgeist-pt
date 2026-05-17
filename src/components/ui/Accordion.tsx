import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, i) => (
        <AccordionEntry
          key={i}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  )
}

interface AccordionEntryProps {
  question: string
  answer: ReactNode
  isOpen: boolean
  onToggle: () => void
}

function AccordionEntry({ question, answer, isOpen, onToggle }: AccordionEntryProps) {
  return (
    <div className="border border-[#262626] rounded-[8px] overflow-hidden bg-[#171717]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left min-h-[56px] hover:bg-[#262626]/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[#F5F5F5]">{question}</span>
        <ChevronDown
          size={20}
          className={cn(
            'text-[#0E5D3E] shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-5 pb-5 text-[#A3A3A3] leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Accordion }
