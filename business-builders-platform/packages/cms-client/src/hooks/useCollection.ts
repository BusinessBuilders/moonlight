import { useState, useEffect, useCallback } from 'react'
import { useBBCMS } from '../provider'
import type { HookListResult, FetchOptions } from '../types'

export function useCollection<T>(
  collection: string,
  options?: FetchOptions,
): HookListResult<T> {
  const client = useBBCMS()
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalDocs, setTotalDocs] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)

  const optionsKey = JSON.stringify(options || {})

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await client.fetch<T>(collection, options)
      setData(result.docs)
      setTotalDocs(result.totalDocs)
      setHasNextPage(result.hasNextPage)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch data'
      setError(message)
      setData([])
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, collection, optionsKey])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData, totalDocs, hasNextPage }
}
