declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

export function loadGA4(): void {
  const id = import.meta.env.VITE_GA4_ID
  if (!id || id.startsWith('G-XXX')) return

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)
}

export function loadMetaPixel(): void {
  const id = import.meta.env.VITE_META_PIXEL_ID
  if (!id || id === '000000000000000') return

  const script = document.createElement('script')
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${id}');
    fbq('track', 'PageView');
  `
  document.head.appendChild(script)
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (window.gtag) window.gtag('event', name, params)
  if (window.fbq) window.fbq('trackCustom', name, params)
}
