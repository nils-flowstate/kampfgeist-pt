import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const spring = useSpring(0, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? scrolled / total : 0
      setProgress(pct)
      spring.set(pct)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [spring])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-[#0E5D3E] origin-left"
        style={{ scaleX: spring }}
      />
    </div>
  )
}

export { ScrollProgress }
