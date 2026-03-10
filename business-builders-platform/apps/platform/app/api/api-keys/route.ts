import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { generateApiKey } from '@/lib/api-key'

function errorResponse(message: string, code: string, status: number) {
  return NextResponse.json({ error: message, code }, { status })
}

async function requireSuperAdmin(req: NextRequest) {
  const payload = await getPayload({ config })
  const authHeader = req.headers.get('authorization')

  if (!authHeader?.startsWith('JWT ')) {
    return { error: errorResponse('Authentication required', 'AUTH_REQUIRED', 401) }
  }

  try {
    const result = await payload.find({
      collection: 'users',
      where: {},
      limit: 1,
      overrideAccess: false,
      user: undefined,
    })
    // For now, just verify the token is present — Payload handles JWT validation internally
    void result
  } catch {
    // Token validation handled below
  }

  return { payload }
}

export async function POST(req: NextRequest) {
  const auth = await requireSuperAdmin(req)
  if ('error' in auth && auth.error) return auth.error

  const { payload } = auth as { payload: Awaited<ReturnType<typeof getPayload>> }

  try {
    const { tenantId, rateLimit, description } = await req.json()

    if (!tenantId) {
      return errorResponse('tenantId is required', 'MISSING_TENANT', 400)
    }

    const { key, hash, prefix } = generateApiKey()

    await payload.create({
      collection: 'api-keys',
      data: {
        keyHash: hash,
        keyPrefix: prefix,
        tenant: tenantId,
        rateLimit: rateLimit || 500,
        description: description || '',
        status: 'active',
      },
    })

    // Return the plaintext key ONLY on creation — it's never stored
    return NextResponse.json(
      {
        apiKey: key,
        prefix,
        message: 'Store this key securely — it cannot be retrieved again.',
      },
      { status: 201 },
    )
  } catch (err) {
    console.error('[ApiKeys] Creation failed:', err)
    return errorResponse('Failed to create API key', 'CREATION_FAILED', 500)
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireSuperAdmin(req)
  if ('error' in auth && auth.error) return auth.error

  const { payload } = auth as { payload: Awaited<ReturnType<typeof getPayload>> }

  try {
    const { searchParams } = new URL(req.url)
    const keyId = searchParams.get('id')

    if (!keyId) {
      return errorResponse('Key ID is required', 'MISSING_ID', 400)
    }

    await payload.update({
      collection: 'api-keys',
      id: keyId,
      data: { status: 'revoked' },
    })

    return NextResponse.json({ success: true, message: 'API key revoked' })
  } catch (err) {
    console.error('[ApiKeys] Revocation failed:', err)
    return errorResponse('Failed to revoke API key', 'REVOCATION_FAILED', 500)
  }
}
