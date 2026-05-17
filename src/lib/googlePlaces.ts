const CACHE_KEY = 'kg_places_cache'
const CACHE_TTL = 24 * 60 * 60 * 1000

interface PlacesCache {
  rating: number
  count: number
  timestamp: number
}

export async function getGoogleRating(): Promise<{ rating: number; count: number }> {
  const cached = localStorage.getItem(CACHE_KEY)
  if (cached) {
    const data: PlacesCache = JSON.parse(cached)
    if (Date.now() - data.timestamp < CACHE_TTL) {
      return { rating: data.rating, count: data.count }
    }
  }

  const placeId = import.meta.env.VITE_GOOGLE_PLACES_ID
  if (!placeId || placeId === 'ChIJ...') {
    return { rating: 4.9, count: 47 }
  }

  try {
    // Google Places API requires backend proxy for CORS — fallback to hardcoded
    // TODO: implement server-side proxy when backend is ready
    return { rating: 4.9, count: 47 }
  } catch {
    return { rating: 4.9, count: 47 }
  }
}
