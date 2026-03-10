import { useCollection } from './useCollection'
import type { HookListResult, Product, FetchOptions } from '../types'

export function useProducts(options?: FetchOptions): HookListResult<Product> {
  return useCollection<Product>('products', { sort: 'order', ...options })
}
