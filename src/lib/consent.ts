const CONSENT_KEY = 'kg_consent'

export interface ConsentState {
  analytics: boolean
  ads: boolean
  timestamp: string
}

export function getConsent(): ConsentState | null {
  const raw = localStorage.getItem(CONSENT_KEY)
  return raw ? JSON.parse(raw) : null
}

export function setConsent(analytics: boolean, ads: boolean): void {
  const state: ConsentState = {
    analytics,
    ads,
    timestamp: new Date().toISOString(),
  }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state))
  window.dispatchEvent(new CustomEvent('kg:consent', { detail: state }))
}

export function hasConsented(): boolean {
  return getConsent() !== null
}
