import { useState, useEffect, useRef } from 'react'

export function useActiveTime(): number {
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const activeRef = useRef(true)

  useEffect(() => {
    const onVisible = () => {
      activeRef.current = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisible)

    intervalRef.current = setInterval(() => {
      if (activeRef.current) {
        setSeconds((s) => s + 1)
      }
    }, 1000)

    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return seconds
}
