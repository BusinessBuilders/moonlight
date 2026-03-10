import { NextResponse } from 'next/server'

const GRAPH_API_VERSION = 'v22.0'

export async function GET() {
  const pageId = process.env.FACEBOOK_PAGE_ID
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN

  if (!pageId || !accessToken) {
    return NextResponse.json(
      { events: [], source: 'none', message: 'Facebook not configured' },
      { status: 200 },
    )
  }

  try {
    const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/events?access_token=${accessToken}&fields=id,name,description,start_time,end_time,place,cover&time_filter=upcoming&limit=25`

    const response = await fetch(url, { next: { revalidate: 3600 } })

    if (!response.ok) {
      console.error('[Facebook] API error:', response.status)
      return NextResponse.json(
        { events: [], source: 'facebook', error: 'Failed to fetch events' },
        { status: 200 },
      )
    }

    const data = await response.json()

    return NextResponse.json(
      { events: data.data || [], source: 'facebook' },
      {
        status: 200,
        headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' },
      },
    )
  } catch (err) {
    console.error('[Facebook] Fetch error:', err)
    return NextResponse.json(
      { events: [], source: 'facebook', error: 'Network error' },
      { status: 200 },
    )
  }
}
