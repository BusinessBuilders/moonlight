import { useCollection } from './useCollection'
import type { HookListResult, TeamMember, FetchOptions } from '../types'

export function useTeam(options?: FetchOptions): HookListResult<TeamMember> {
  return useCollection<TeamMember>('team', { sort: 'order', ...options })
}
