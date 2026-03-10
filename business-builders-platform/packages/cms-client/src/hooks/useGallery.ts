import { useCollection } from './useCollection'
import type { HookListResult, GalleryItem, FetchOptions } from '../types'

export function useGallery(options?: FetchOptions): HookListResult<GalleryItem> {
  return useCollection<GalleryItem>('gallery', { sort: 'order', ...options })
}
