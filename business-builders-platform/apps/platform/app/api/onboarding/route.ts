import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { generateApiKey } from '@/lib/api-key'
import { sendEmail } from '@/lib/email'

function errorResponse(message: string, code: string, status: number) {
  return NextResponse.json({ error: message, code }, { status })
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })

    const {
      businessName,
      ownerEmail,
      ownerName,
      siteType,
      slug,
      address,
    } = await req.json()

    if (!businessName || !ownerEmail || !siteType || !slug) {
      return errorResponse(
        'businessName, ownerEmail, siteType, and slug are required',
        'MISSING_FIELDS',
        400,
      )
    }

    // 1. Create tenant
    const tenant = await payload.create({
      collection: 'tenants',
      data: {
        name: businessName,
        slug,
        status: 'active',
        siteType,
        ownerEmail,
        ownerName: ownerName || '',
        address: address || {},
      },
    })

    // 2. Create client admin user
    const tempPassword = `Welcome${Date.now().toString(36)}!`
    const user = await payload.create({
      collection: 'users',
      data: {
        email: ownerEmail,
        password: tempPassword,
        firstName: ownerName?.split(' ')[0] || '',
        lastName: ownerName?.split(' ').slice(1).join(' ') || '',
        roles: ['client_admin'],
        tenants: [{ tenant: tenant.id }],
      },
    })

    // 3. Generate API key
    const { key: apiKey, hash, prefix } = generateApiKey()
    await payload.create({
      collection: 'api-keys',
      data: {
        keyHash: hash,
        keyPrefix: prefix,
        tenant: tenant.id,
        status: 'active',
        rateLimit: 500,
        description: `Auto-generated during onboarding for ${businessName}`,
      },
    })

    // 4. Create default site settings
    await payload.create({
      collection: 'site-settings',
      data: {
        farmName: businessName,
        contactEmail: ownerEmail,
        tenant: tenant.id,
      },
    })

    // 5. Create default inquiry flow config
    await payload.create({
      collection: 'inquiry-flow-config',
      data: {
        title: 'Inquiry Flow Configuration',
        introHeading: 'How Can We Help You?',
        introText: 'Select the option that best describes your inquiry.',
        branches: [
          {
            branchId: 'general',
            label: 'General Inquiry',
            description: 'Ask us anything',
            icon: 'message-circle',
            questions: [
              {
                fieldName: 'topic',
                label: 'What is your inquiry about?',
                inputType: 'text',
                required: true,
              },
              {
                fieldName: 'message',
                label: 'Your message',
                inputType: 'textarea',
                required: true,
              },
            ],
          },
        ],
        emailRouting: {
          defaultRecipient: ownerEmail,
          subjectPrefix: `[${businessName}]`,
        },
        contactFields: {
          showName: true,
          showEmail: true,
          showPhone: true,
          showMessage: true,
        },
        confirmationHeading: 'Thank You!',
        confirmationText: "We've received your inquiry and will get back to you within 24-48 hours.",
        tenant: tenant.id,
      },
    })

    // 6. Send welcome email
    const platformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || 'http://localhost:3000'
    await sendEmail({
      to: ownerEmail,
      subject: `Welcome to Business Builders — ${businessName} is live!`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h1 style="color:#1B4332">Welcome to Business Builders!</h1>
          <p>Hi ${ownerName || 'there'},</p>
          <p>Your site <strong>${businessName}</strong> has been set up. Here are your details:</p>
          <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:16px 0">
            <p><strong>Admin Panel:</strong> <a href="${platformUrl}/admin">${platformUrl}/admin</a></p>
            <p><strong>Email:</strong> ${ownerEmail}</p>
            <p><strong>Temporary Password:</strong> ${tempPassword}</p>
            <p><strong>API Key:</strong> <code>${apiKey}</code></p>
            <p><strong>Tenant ID:</strong> <code>${slug}</code></p>
          </div>
          <p style="color:#d32f2f"><strong>Important:</strong> Please change your password after first login. Store your API key securely — it cannot be retrieved again.</p>
          <p>Need help? Reply to this email or contact the Business Builders team.</p>
        </div>
      `,
    })

    return NextResponse.json(
      {
        success: true,
        tenant: { id: tenant.id, slug: tenant.slug, name: businessName },
        user: { id: user.id, email: ownerEmail },
        apiKey: {
          key: apiKey,
          prefix,
          message: 'Store this key securely — it cannot be retrieved again.',
        },
      },
      { status: 201 },
    )
  } catch (err) {
    console.error('[Onboarding] Failed:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return errorResponse(`Onboarding failed: ${message}`, 'ONBOARDING_FAILED', 500)
  }
}
