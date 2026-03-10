import { createHash, randomBytes } from 'crypto'
import type { BasePayload } from 'payload'

const API_KEY_PREFIX = 'client_'

export function generateApiKey(): { key: string; hash: string; prefix: string } {
  const randomPart = randomBytes(32).toString('hex')
  const key = `${API_KEY_PREFIX}${randomPart}`
  const hash = hashApiKey(key)
  const prefix = key.substring(0, API_KEY_PREFIX.length + 8)

  return { key, hash, prefix }
}

export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex')
}

export async function validateApiKey(
  key: string,
  payload: BasePayload,
): Promise<{
  valid: boolean
  tenantId?: string
  tenantSlug?: string
  rateLimit?: number
}> {
  const hash = hashApiKey(key)

  const result = await payload.find({
    collection: 'api-keys',
    where: {
      keyHash: { equals: hash },
      status: { equals: 'active' },
    },
    depth: 1,
    limit: 1,
  })

  if (!result.docs.length) {
    return { valid: false }
  }

  const apiKeyDoc = result.docs[0]
  const tenant =
    typeof apiKeyDoc.tenant === 'object' ? apiKeyDoc.tenant : null

  if (!tenant) {
    return { valid: false }
  }

  // Update last used timestamp
  await payload.update({
    collection: 'api-keys',
    id: apiKeyDoc.id,
    data: { lastUsedAt: new Date().toISOString() },
  })

  return {
    valid: true,
    tenantId: String(tenant.id),
    tenantSlug: tenant.slug,
    rateLimit: apiKeyDoc.rateLimit || 500,
  }
}
