const inMemoryStore = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 60_000 // 1 minute

export function checkRateLimit(
  key: string,
  maxRequests: number,
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = inMemoryStore.get(key)

  if (!entry || now > entry.resetAt) {
    const resetAt = now + WINDOW_MS
    inMemoryStore.set(key, { count: 1, resetAt })
    return { allowed: true, remaining: maxRequests - 1, resetAt }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt }
}

// Periodic cleanup of expired entries
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of inMemoryStore) {
    if (now > entry.resetAt) {
      inMemoryStore.delete(key)
    }
  }
}, 60_000)
