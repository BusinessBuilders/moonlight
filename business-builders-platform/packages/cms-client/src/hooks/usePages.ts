import { useCollection } from './useCollection'
import type { HookListResult, PageItem, FetchOptions } from '../types'

export function usePages(options?: FetchOptions): HookListResult<PageItem> {
  return useCollection<PageItem>('pages', options)
}
