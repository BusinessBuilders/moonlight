import { BBCMSClient } from './client'
import type {
  BBCMSConfig,
  SiteSettings,
  Service,
  GalleryItem,
  Event,
  Product,
  Testimonial,
  TeamMember,
  DocumentItem,
  PageItem,
  InquiryFlowConfig,
  FetchOptions,
} from './types'

function getServerClient(): BBCMSClient {
  const apiUrl = process.env.BB_API_URL
  const apiKey = process.env.BB_API_KEY
  const tenantId = process.env.BB_TENANT_ID

  if (!apiUrl || !apiKey || !tenantId) {
    throw new Error(
      'Missing environment variables: BB_API_URL, BB_API_KEY, and BB_TENANT_ID are required',
    )
  }

  return new BBCMSClient({ apiUrl, apiKey, tenantId })
}

export function createServerClient(config: BBCMSConfig): BBCMSClient {
  return new BBCMSClient(config)
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const client = getServerClient()
    const result = await client.fetch<SiteSettings>('site-settings', { limit: 1 })
    return result.docs[0] || null
  } catch {
    return null
  }
}

export async function getServices(options?: FetchOptions): Promise<Service[]> {
  try {
    const client = getServerClient()
    const result = await client.fetch<Service>('services', { sort: 'order', ...options })
    return result.docs
  } catch {
    return []
  }
}

export async function getGallery(options?: FetchOptions): Promise<GalleryItem[]> {
  try {
    const client = getServerClient()
    const result = await client.fetch<GalleryItem>('gallery', { sort: 'order', ...options })
    return result.docs
  } catch {
    return []
  }
}

export async function getEvents(options?: FetchOptions): Promise<Event[]> {
  try {
    const client = getServerClient()
    const result = await client.fetch<Event>('events', { sort: '-startTime', ...options })
    return result.docs
  } catch {
    return []
  }
}

export async function getProducts(options?: FetchOptions): Promise<Product[]> {
  try {
    const client = getServerClient()
    const result = await client.fetch<Product>('products', { sort: 'order', ...options })
    return result.docs
  } catch {
    return []
  }
}

export async function getTestimonials(options?: FetchOptions): Promise<Testimonial[]> {
  try {
    const client = getServerClient()
    const result = await client.fetch<Testimonial>('testimonials', { sort: '-createdAt', ...options })
    return result.docs
  } catch {
    return []
  }
}

export async function getTeam(options?: FetchOptions): Promise<TeamMember[]> {
  try {
    const client = getServerClient()
    const result = await client.fetch<TeamMember>('team', { sort: 'order', ...options })
    return result.docs
  } catch {
    return []
  }
}

export async function getDocuments(options?: FetchOptions): Promise<DocumentItem[]> {
  try {
    const client = getServerClient()
    const result = await client.fetch<DocumentItem>('documents', { sort: '-createdAt', ...options })
    return result.docs
  } catch {
    return []
  }
}

export async function getPages(options?: FetchOptions): Promise<PageItem[]> {
  try {
    const client = getServerClient()
    const result = await client.fetch<PageItem>('pages', options)
    return result.docs
  } catch {
    return []
  }
}

export async function getPage(slug: string): Promise<PageItem | null> {
  try {
    const client = getServerClient()
    const result = await client.fetch<PageItem>('pages', { slug })
    return result.docs[0] || null
  } catch {
    return null
  }
}

export async function getInquiryConfig(): Promise<InquiryFlowConfig | null> {
  try {
    const client = getServerClient()
    const result = await client.fetch<InquiryFlowConfig>('inquiry-flow-config', { limit: 1 })
    return result.docs[0] || null
  } catch {
    return null
  }
}
