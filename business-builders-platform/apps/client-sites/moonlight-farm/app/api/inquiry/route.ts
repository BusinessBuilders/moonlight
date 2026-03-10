import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RECIPIENT_EMAIL = 'moonlightrunfarmllc@gmail.com'
const FROM_EMAIL = 'Moonlight Run Farm <noreply@business-builder.online>'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { branchId, branchLabel, name, email, phone, answers, additionalMessage } = body

    if (!name || !email || !branchId) {
      return NextResponse.json(
        { error: 'Name, email, and branch are required', code: 'MISSING_FIELDS' },
        { status: 400 },
      )
    }

    // Build answer rows for email
    const answerRows = Object.entries(answers as Record<string, string>)
      .map(
        ([key, value]) =>
          `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;text-transform:capitalize">${key.replace(/([A-Z])/g, ' $1').trim()}</td><td style="padding:8px 12px;border:1px solid #ddd">${value}</td></tr>`,
      )
      .join('')

    const emailHtml = `
      <div style="font-family:'DM Sans',sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
        <div style="background:#1B4332;padding:24px;text-align:center">
          <h1 style="color:#FDF8E8;margin:0;font-size:24px">New Inquiry: ${branchLabel}</h1>
        </div>
        <div style="padding:24px">
          <p style="color:#333"><strong>From:</strong> ${name}</p>
          <p style="color:#333"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p style="color:#333"><strong>Phone:</strong> ${phone}</p>` : ''}
          <table style="width:100%;border-collapse:collapse;margin:20px 0">
            <thead>
              <tr style="background:#f5f5f5">
                <th style="padding:8px 12px;border:1px solid #ddd;text-align:left">Question</th>
                <th style="padding:8px 12px;border:1px solid #ddd;text-align:left">Answer</th>
              </tr>
            </thead>
            <tbody>${answerRows}</tbody>
          </table>
          ${additionalMessage ? `<div style="background:#f9f9f9;padding:16px;border-radius:8px;margin-top:16px"><p style="color:#333;margin:0"><strong>Additional Message:</strong></p><p style="color:#555;margin:8px 0 0">${additionalMessage}</p></div>` : ''}
        </div>
        <div style="background:#f5f5f5;padding:16px;text-align:center;font-size:12px;color:#999">
          Sent via Moonlight Run Farm inquiry form
        </div>
      </div>
    `

    // Send email via Resend if API key available
    if (RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [RECIPIENT_EMAIL],
          reply_to: email,
          subject: `[Moonlight Run Farm] New Inquiry: ${branchLabel} — from ${name}`,
          html: emailHtml,
        }),
      })

      if (!resendResponse.ok) {
        console.error('[Inquiry] Resend error:', await resendResponse.text())
      }
    } else {
      console.log('[Inquiry] No RESEND_API_KEY — logging submission:', { branchLabel, name, email })
    }

    // Also forward to platform API if configured
    const bbApiUrl = process.env.BB_API_URL
    const bbApiKey = process.env.BB_API_KEY
    const bbTenantId = process.env.BB_TENANT_ID

    if (bbApiUrl && bbApiKey && bbTenantId) {
      try {
        await fetch(`${bbApiUrl}/api/v1/${bbTenantId}/inquiry-submissions`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${bbApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            branchId,
            branchLabel,
            name,
            email,
            phone,
            answers,
            additionalMessage,
            status: 'new',
          }),
        })
      } catch (err) {
        console.warn('[Inquiry] Failed to store in platform:', err)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Inquiry] Error:', err)
    return NextResponse.json(
      { error: 'Failed to process inquiry', code: 'INTERNAL_ERROR' },
      { status: 500 },
    )
  }
}
