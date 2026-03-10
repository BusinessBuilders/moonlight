import { useState, useEffect, useCallback } from 'react'
import { useBBCMS } from '../provider'
import type { HookResult, InquiryFlowConfig } from '../types'

export function useInquiryConfig(): HookResult<InquiryFlowConfig> {
  const client = useBBCMS()
  const [data, setData] = useState<InquiryFlowConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await client.fetch<InquiryFlowConfig>('inquiry-flow-config', { limit: 1 })
      setData(result.docs[0] || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inquiry config')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
