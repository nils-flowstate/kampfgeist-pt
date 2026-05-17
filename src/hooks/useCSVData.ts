import { useState, useEffect } from 'react'
import { parseCSV } from '../lib/csv'

interface UseCSVDataResult<T> {
  data: T[]
  loading: boolean
  error: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCSVData<T extends Record<string, any>>(
  url: string,
  filterVisible = true
): UseCSVDataResult<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    parseCSV<T>(url)
      .then((rows) => {
        const filtered = filterVisible
          ? rows.filter((r) => String(r.visible).toLowerCase() !== 'false')
          : rows
        setData(filtered)
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [url, filterVisible])

  return { data, loading, error }
}
