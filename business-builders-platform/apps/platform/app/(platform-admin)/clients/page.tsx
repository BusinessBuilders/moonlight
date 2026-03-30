import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Tenant } from '@/payload-types'

async function getTenants(): Promise<{ tenants: Tenant[]; dbError: boolean }> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'tenants',
      limit: 50,
      sort: '-createdAt',
    })
    return { tenants: result.docs, dbError: false }
  } catch (err) {
    console.error('[Clients] Failed to fetch tenants:', err)
    return { tenants: [], dbError: true }
  }
}

export default async function ClientsPage() {
  const { tenants, dbError } = await getTenants()

  return (
    <div>
      {dbError && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
          <p className="text-amber-400 text-sm">
            Database connection unavailable. Set <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">DATABASE_URL</code> in your environment.
          </p>
        </div>
      )}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Clients</h1>
          <p className="text-slate-400">Manage all client tenants.</p>
        </div>
        <Link
          href="/clients/new"
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          + Add New Client
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        {tenants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">No clients yet.</p>
            <Link
              href="/clients/new"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Add Your First Client
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-800">
                  <th className="pb-3 font-medium">Business Name</th>
                  <th className="pb-3 font-medium">Slug</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Owner Email</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-slate-800/50">
                    <td className="py-3 text-white font-medium">{tenant.name}</td>
                    <td className="py-3 text-slate-300 font-mono text-xs">{tenant.slug}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs capitalize">
                        {tenant.siteType}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        tenant.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : tenant.status === 'suspended'
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300">{tenant.ownerEmail}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/collections/tenants/${tenant.id}`}
                          className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/admin/collections/gallery?where[tenant][equals]=${tenant.id}`}
                          className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                        >
                          Gallery
                        </Link>
                        <Link
                          href={`/admin/collections/events?where[tenant][equals]=${tenant.id}`}
                          className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                        >
                          Events
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
