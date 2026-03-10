import { useCollection } from './useCollection'
import type { HookListResult, Event, FetchOptions } from '../types'

export function useEvents(options?: FetchOptions): HookListResult<Event> {
  return useCollection<Event>('events', { sort: '-startTime', ...options })
}
