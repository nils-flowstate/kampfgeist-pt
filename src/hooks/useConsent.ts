import { useState, useEffect } from 'react'
import { getConsent, type ConsentState } from '../lib/consent'

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(() => getConsent())

  useEffect(() => {
    const handler = (e: Event) => {
      setConsent((e as CustomEvent<ConsentState>).detail)
    }
    window.addEventListener('kg:consent', handler)
    return () => window.removeEventListener('kg:consent', handler)
  }, [])

  return consent
}
