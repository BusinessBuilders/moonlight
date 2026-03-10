import { useCollection } from './useCollection'
import type { HookListResult, Service, FetchOptions } from '../types'

export function useServices(options?: FetchOptions): HookListResult<Service> {
  return useCollection<Service>('services', { sort: 'order', ...options })
}
