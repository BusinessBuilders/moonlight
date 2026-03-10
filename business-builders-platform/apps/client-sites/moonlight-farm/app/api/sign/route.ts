import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = process.env.DROPBOX_SIGN_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'E-signature service not configured', code: 'NOT_CONFIGURED' },
      { status: 503 },
    )
  }

  try {
    const { signerEmail, signerName, templateId } = await req.json()

    if (!signerEmail || !signerName) {
      return NextResponse.json(
        { error: 'signerEmail and signerName are required', code: 'MISSING_FIELDS' },
        { status: 400 },
      )
    }

    // Create signature request via Dropbox Sign API
    const response = await fetch('https://api.hellosign.com/v3/signature_request/create_embedded', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.DROPBOX_SIGN_CLIENT_ID,
        template_ids: templateId ? [templateId] : undefined,
        signers: [
          {
            email_address: signerEmail,
            name: signerName,
            role: 'Signer',
          },
        ],
        test_mode: process.env.NODE_ENV !== 'production' ? 1 : 0,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('[Sign] Dropbox Sign error:', errorData)
      return NextResponse.json(
        { error: 'Failed to create signature request', code: 'SIGN_ERROR' },
        { status: 500 },
      )
    }

    const data = await response.json()
    const signatureId = data.signature_request?.signatures?.[0]?.signature_id

    if (!signatureId) {
      return NextResponse.json(
        { error: 'No signature ID returned', code: 'NO_SIGNATURE_ID' },
        { status: 500 },
      )
    }

    // Get embedded sign URL
    const embedResponse = await fetch(
      `https://api.hellosign.com/v3/embedded/sign_url/${signatureId}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
        },
      },
    )

    if (!embedResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to get sign URL', code: 'EMBED_ERROR' },
        { status: 500 },
      )
    }

    const embedData = await embedResponse.json()

    return NextResponse.json({
      signUrl: embedData.embedded?.sign_url,
      expiresAt: embedData.embedded?.expires_at,
    })
  } catch (err) {
    console.error('[Sign] Error:', err)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 },
    )
  }
}
