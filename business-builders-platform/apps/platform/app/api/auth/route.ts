import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required', code: 'MISSING_CREDENTIALS' },
        { status: 400 },
      )
    }

    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    if (!result.user) {
      return NextResponse.json(
        { error: 'Invalid credentials', code: 'AUTH_FAILED' },
        { status: 401 },
      )
    }

    const user = result.user as Record<string, unknown>

    return NextResponse.json({
      token: result.token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      },
    })
  } catch (err) {
    console.error('[Auth] Login failed:', err)
    return NextResponse.json(
      { error: 'Invalid credentials', code: 'AUTH_FAILED' },
      { status: 401 },
    )
  }
}
