import { getPayload } from 'payload'
import config from '@payload-config'
import type { Tenant } from '@/payload-types'

interface DashboardStats {
  activeTenants: number
  totalUsers: number
  activeApiKeys: number
  inquiriesToday: number
}

async function getDashboardStats(): Promise<DashboardStats | null> {
  try {
    const payload = await getPayload({ config })

    const [tenants, users, apiKeys, inquiries] = await Promise.all([
      payload.find({ collection: 'tenants', limit: 0, where: { status: { equals: 'active' } } }),
      payload.find({ collection: 'users', limit: 0 }),
      payload.find({ collection: 'api-keys', limit: 0, where: { status: { equals: 'active' } } }),
      payload.find({
        collection: 'inquiry-submissions',
        limit: 0,
        where: {
          createdAt: {
            greater_than: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
          },
        },
      }),
    ])

    return {
      activeTenants: tenants.totalDocs,
      totalUsers: users.totalDocs,
      activeApiKeys: apiKeys.totalDocs,
      inquiriesToday: inquiries.totalDocs,
    }
  } catch (err) {
    console.error('[Dashboard] Failed to fetch stats:', err)
    return null
  }
}

async function getRecentTenants(): Promise<Tenant[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'tenants',
      limit: 20,
      sort: '-createdAt',
    })
    return result.docs
  } catch (err) {
    console.error('[Dashboard] Failed to fetch tenants:', err)
    return []
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()
  const tenants = await getRecentTenants()

  const statCards = stats
    ? [
        { label: 'Active Tenants', value: String(stats.activeTenants), color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
        { label: 'Total Users', value: String(stats.totalUsers), color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
        { label: 'API Keys', value: String(stats.activeApiKeys), color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
        { label: 'Inquiries Today', value: String(stats.inquiriesToday), color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
      ]
    : [
        { label: 'Active Tenants', value: '—', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
        { label: 'Total Users', value: '—', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
        { label: 'API Keys', value: '—', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
        { label: 'Inquiries Today', value: '—', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
      ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-slate-400 mb-8">Overview of all tenants and platform health.</p>

      {!stats && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8">
          <p className="text-amber-400 text-sm">
            Database connection unavailable. Set <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs">DATABASE_URL</code> in your environment to see live data.
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border p-6 ${stat.color}`}
          >
            <p className="text-sm opacity-80 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Tenants */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Active Clients</h2>
        {tenants.length === 0 ? (
          <p className="text-slate-400 text-sm">No clients yet. Add your first client to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-800">
                  <th className="pb-3 font-medium">Business Name</th>
                  <th className="pb-3 font-medium">Slug</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Owner</th>
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
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300">{tenant.ownerEmail}</td>
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
