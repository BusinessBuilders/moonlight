export interface FacebookEvent {
  id: string
  name: string
  description?: string
  start_time: string
  end_time?: string
  place?: {
    name: string
    location?: {
      city: string
      state: string
    }
  }
  cover?: {
    source: string
  }
  event_url?: string
}

const GRAPH_API_VERSION = 'v22.0'

export async function fetchFacebookEvents(
  pageId: string,
  accessToken: string,
): Promise<FacebookEvent[]> {
  if (!pageId || !accessToken) {
    console.warn('[Facebook] Missing pageId or accessToken')
    return []
  }

  try {
    const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/events?access_token=${accessToken}&fields=id,name,description,start_time,end_time,place,cover&time_filter=upcoming&limit=25`

    const response = await fetch(url, { next: { revalidate: 3600 } })

    if (!response.ok) {
      console.error('[Facebook] API error:', response.status, await response.text())
      return []
    }

    const data = await response.json()
    return (data.data || []) as FacebookEvent[]
  } catch (err) {
    console.error('[Facebook] Fetch error:', err)
    return []
  }
}
