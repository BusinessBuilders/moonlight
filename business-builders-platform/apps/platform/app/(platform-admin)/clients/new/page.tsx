'use client'

import { useState } from 'react'

export default function NewClientPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerEmail: '',
    ownerName: '',
    siteType: 'general',
    slug: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    apiKey?: string
    error?: string
  } | null>(null)

  function handleChange(field: string, value: string) {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }
      // Auto-generate slug from business name
      if (field === 'businessName') {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
      }
      return updated
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          ownerEmail: formData.ownerEmail,
          ownerName: formData.ownerName,
          siteType: formData.siteType,
          slug: formData.slug,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, apiKey: data.apiKey?.key })
      } else {
        setResult({ success: false, error: data.error })
      }
    } catch {
      setResult({ success: false, error: 'Failed to create client' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (result?.success) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">Client Created!</h1>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-emerald-400 mb-2">Success</h2>
          <p className="text-slate-300 mb-4">
            <strong>{formData.businessName}</strong> has been onboarded. A welcome email has been sent to{' '}
            <strong>{formData.ownerEmail}</strong>.
          </p>
          {result.apiKey && (
            <div className="bg-slate-900 rounded-lg p-4 mt-4">
              <p className="text-xs text-slate-400 mb-1">API Key (save this — it won&apos;t be shown again):</p>
              <code className="text-emerald-400 text-sm break-all">{result.apiKey}</code>
            </div>
          )}
        </div>
        <a
          href="/clients"
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Back to Clients
        </a>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Add New Client</h1>
      <p className="text-slate-400 mb-8">
        This will create the tenant, admin user, API key, default collections, and send a welcome email.
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Business Information</h2>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Business Name *</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              placeholder="e.g., Moonlight Run Farm LLC"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Tenant Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
              placeholder="e.g., moonlight-farm"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Site Type *</label>
            <select
              value={formData.siteType}
              onChange={(e) => handleChange('siteType', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="farm">Farm / Agriculture</option>
              <option value="contractor">Contractor / Trade</option>
              <option value="restaurant">Restaurant / Food</option>
              <option value="general">General Business</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Owner Information</h2>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Owner Name</label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => handleChange('ownerName', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              placeholder="e.g., Angela & Jesse Klayman"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Owner Email *</label>
            <input
              type="email"
              value={formData.ownerEmail}
              onChange={(e) => handleChange('ownerEmail', e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              placeholder="e.g., owner@example.com"
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Address (Optional)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <input type="text" value={formData.street} onChange={(e) => handleChange('street', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500" placeholder="Street Address" />
            </div>
            <div>
              <input type="text" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500" placeholder="City" />
            </div>
            <div className="flex gap-4">
              <input type="text" value={formData.state} onChange={(e) => handleChange('state', e.target.value)} className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500" placeholder="State" />
              <input type="text" value={formData.zip} onChange={(e) => handleChange('zip', e.target.value)} className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500" placeholder="ZIP" />
            </div>
          </div>
        </div>

        {result?.error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-red-400 text-sm">{result.error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          {isSubmitting ? 'Creating Client...' : 'Create Client & Send Welcome Email'}
        </button>
      </form>
    </div>
  )
}
