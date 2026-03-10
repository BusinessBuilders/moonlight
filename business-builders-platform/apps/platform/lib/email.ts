import { Resend } from 'resend'

let resendClient: Resend | null = null

function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set')
    }
    resendClient = new Resend(apiKey)
  }
  return resendClient
}

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  cc?: string | string[]
  replyTo?: string
  from?: string
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: options.from || 'Business Builders <noreply@business-builder.online>',
      to: Array.isArray(options.to) ? options.to : [options.to],
      cc: options.cc ? (Array.isArray(options.cc) ? options.cc : [options.cc]) : undefined,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
    })

    if (error) {
      console.error('[Email] Send failed:', error)
      return { success: false, error: error.message }
    }

    return { success: true, id: data?.id }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown email error'
    console.error('[Email] Exception:', message)
    return { success: false, error: message }
  }
}

export function buildInquiryEmailHtml(params: {
  branchLabel: string
  name: string
  email: string
  phone?: string
  answers: Record<string, string>
  additionalMessage?: string
  tenantName: string
}): string {
  const answerRows = Object.entries(params.answers)
    .map(([key, value]) => `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;text-transform:capitalize">${key.replace(/([A-Z])/g, ' $1').trim()}</td><td style="padding:8px;border:1px solid #ddd">${value}</td></tr>`)
    .join('')

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1B4332">New Inquiry: ${params.branchLabel}</h2>
      <p><strong>From:</strong> ${params.name} (${params.email}${params.phone ? `, ${params.phone}` : ''})</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <thead>
          <tr style="background:#f5f5f5">
            <th style="padding:8px;border:1px solid #ddd;text-align:left">Question</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:left">Answer</th>
          </tr>
        </thead>
        <tbody>${answerRows}</tbody>
      </table>
      ${params.additionalMessage ? `<p><strong>Additional Message:</strong><br/>${params.additionalMessage}</p>` : ''}
      <hr style="margin:24px 0;border:none;border-top:1px solid #ddd"/>
      <p style="color:#888;font-size:12px">Sent via ${params.tenantName} inquiry form — Business Builders Platform</p>
    </div>
  `
}
