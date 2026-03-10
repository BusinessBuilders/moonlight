export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-slate-400 mb-8">Overview of all tenants and platform health.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Tenants', value: '1', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
          { label: 'Total Users', value: '2', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
          { label: 'API Keys', value: '1', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
          { label: 'Inquiries Today', value: '0', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
        ].map((stat) => (
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
              <tr className="border-b border-slate-800/50">
                <td className="py-3 text-white font-medium">Moonlight Run Farm LLC</td>
                <td className="py-3 text-slate-300">moonlight-farm</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs">Farm</span>
                </td>
                <td className="py-3">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs">Active</span>
                </td>
                <td className="py-3 text-slate-300">moonlightrunfarmllc@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
