import { NextRequest, NextResponse } from 'next/server'
import { getPayload, type Where } from 'payload'
import config from '@payload-config'
import { validateApiKey } from '@/lib/api-key'
import { checkRateLimit } from '@/lib/rate-limiter'

const ALLOWED_COLLECTIONS = [
  'pages',
  'services',
  'gallery',
  'events',
  'products',
  'testimonials',
  'team',
  'documents',
  'inquiry-flow-config',
  'site-settings',
  'media',
] as const

type AllowedCollection = (typeof ALLOWED_COLLECTIONS)[number]

function isAllowedCollection(value: string): value is AllowedCollection {
  return ALLOWED_COLLECTIONS.includes(value as AllowedCollection)
}

function errorResponse(message: string, code: string, status: number) {
  return NextResponse.json({ error: message, code }, { status })
}

async function authenticateRequest(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: errorResponse('Missing or invalid authorization header', 'AUTH_MISSING', 401) }
  }

  const apiKey = authHeader.substring(7)
  const payload = await getPayload({ config })
  const validation = await validateApiKey(apiKey, payload)

  if (!validation.valid) {
    return { error: errorResponse('Invalid or revoked API key', 'AUTH_INVALID', 401) }
  }

  const rateCheck = checkRateLimit(
    `tenant:${validation.tenantSlug}`,
    validation.rateLimit || 500,
  )

  if (!rateCheck.allowed) {
    return {
      error: NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMITED' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
          },
        },
      ),
    }
  }

  return { payload, validation, rateCheck }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenant: string; collection: string }> },
) {
  const { tenant, collection } = await params

  const auth = await authenticateRequest(req)
  if ('error' in auth && auth.error) return auth.error

  const { payload, validation, rateCheck } = auth as Exclude<typeof auth, { error: NextResponse }>

  if (validation.tenantSlug !== tenant) {
    return errorResponse('Tenant mismatch', 'TENANT_MISMATCH', 403)
  }

  if (!isAllowedCollection(collection)) {
    return errorResponse(`Collection "${collection}" not found`, 'COLLECTION_NOT_FOUND', 404)
  }

  try {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const sort = searchParams.get('sort') || '-createdAt'

    const where: Where = {
      'tenant.slug': { equals: tenant },
    }

    // Support category filter
    const category = searchParams.get('category')
    if (category) {
      where.category = { equals: category }
    }

    // Support slug filter
    const slug = searchParams.get('slug')
    if (slug) {
      where.slug = { equals: slug }
    }

    const result = await payload.find({
      collection: collection as AllowedCollection,
      where,
      limit,
      page,
      sort,
      depth: 2,
    })

    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Remaining': String(rateCheck.remaining),
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (err) {
    console.error(`[API] Error fetching ${collection} for ${tenant}:`, err)
    return errorResponse('Internal server error', 'INTERNAL_ERROR', 500)
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tenant: string; collection: string }> },
) {
  const { tenant, collection } = await params

  // Only allow POST to inquiry-submissions
  if (collection !== 'inquiry-submissions') {
    return errorResponse('POST not allowed for this collection', 'METHOD_NOT_ALLOWED', 405)
  }

  const auth = await authenticateRequest(req)
  if ('error' in auth && auth.error) return auth.error

  const { payload, validation } = auth as Exclude<typeof auth, { error: NextResponse }>

  if (validation.tenantSlug !== tenant) {
    return errorResponse('Tenant mismatch', 'TENANT_MISMATCH', 403)
  }

  try {
    const body = await req.json()
    const result = await payload.create({
      collection: 'inquiry-submissions',
      data: {
        ...body,
        tenant: validation.tenantId,
      },
    })

    return NextResponse.json(result, { status: 201 })
  } catch (err) {
    console.error(`[API] Error creating inquiry submission for ${tenant}:`, err)
    return errorResponse('Internal server error', 'INTERNAL_ERROR', 500)
  }
}
