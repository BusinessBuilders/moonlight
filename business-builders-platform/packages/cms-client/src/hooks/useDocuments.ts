import { useCollection } from './useCollection'
import type { HookListResult, DocumentItem, FetchOptions } from '../types'

export function useDocuments(options?: FetchOptions): HookListResult<DocumentItem> {
  return useCollection<DocumentItem>('documents', { sort: '-createdAt', ...options })
}
