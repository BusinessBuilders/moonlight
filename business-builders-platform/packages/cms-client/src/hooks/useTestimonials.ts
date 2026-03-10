import { useCollection } from './useCollection'
import type { HookListResult, Testimonial, FetchOptions } from '../types'

export function useTestimonials(options?: FetchOptions): HookListResult<Testimonial> {
  return useCollection<Testimonial>('testimonials', { sort: '-createdAt', ...options })
}
