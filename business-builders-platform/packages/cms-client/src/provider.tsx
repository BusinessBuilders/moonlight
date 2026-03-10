import React, { createContext, useContext, useMemo } from 'react'
import { BBCMSClient } from './client'
import type { BBCMSConfig } from './types'

const BBCMSContext = createContext<BBCMSClient | null>(null)

export interface BBCMSProviderProps extends BBCMSConfig {
  children: React.ReactNode
}

export function BBCMSProvider({ children, apiUrl, apiKey, tenantId }: BBCMSProviderProps) {
  const client = useMemo(
    () => new BBCMSClient({ apiUrl, apiKey, tenantId }),
    [apiUrl, apiKey, tenantId],
  )

  return <BBCMSContext.Provider value={client}>{children}</BBCMSContext.Provider>
}

export function useBBCMS(): BBCMSClient {
  const client = useContext(BBCMSContext)
  if (!client) {
    throw new Error('useBBCMS must be used within a <BBCMSProvider>')
  }
  return client
}
