import type { BBCMSConfig, PaginatedResponse, FetchOptions } from './types'

export class BBCMSClient {
  private apiUrl: string
  private apiKey: string
  private tenantId: string

  constructor(config: BBCMSConfig) {
    this.apiUrl = config.apiUrl.replace(/\/$/, '')
    this.apiKey = config.apiKey
    this.tenantId = config.tenantId
  }

  async fetch<T>(collection: string, options?: FetchOptions): Promise<PaginatedResponse<T>> {
    const params = new URLSearchParams()
    if (options?.limit) params.set('limit', String(options.limit))
    if (options?.page) params.set('page', String(options.page))
    if (options?.sort) params.set('sort', options.sort)
    if (options?.category) params.set('category', options.category)
    if (options?.slug) params.set('slug', options.slug)

    const queryString = params.toString()
    const url = `${this.apiUrl}/api/v1/${this.tenantId}/${collection}${queryString ? `?${queryString}` : ''}`

    try {
      const response = await globalThis.fetch(url, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        throw new Error(errorBody.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      if (err instanceof Error && err.message.includes('HTTP')) {
        throw err
      }
      // Graceful degradation: return empty result
      console.warn(`[BBCMSClient] Failed to fetch ${collection}:`, err)
      return {
        docs: [],
        totalDocs: 0,
        limit: options?.limit || 50,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      }
    }
  }

  async post<T>(collection: string, data: unknown): Promise<T> {
    const url = `${this.apiUrl}/api/v1/${this.tenantId}/${collection}`

    const response = await globalThis.fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}))
      throw new Error(errorBody.error || `HTTP ${response.status}`)
    }

    return await response.json()
  }
}
