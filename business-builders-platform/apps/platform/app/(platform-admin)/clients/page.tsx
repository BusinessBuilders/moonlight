import Link from 'next/link'

export default function ClientsPage() {
  return (
    <div>
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
              <tr className="border-b border-slate-800/50">
                <td className="py-3 text-white font-medium">Moonlight Run Farm LLC</td>
                <td className="py-3 text-slate-300 font-mono text-xs">moonlight-farm</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs">Farm</span>
                </td>
                <td className="py-3">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs">Active</span>
                </td>
                <td className="py-3 text-slate-300">moonlightrunfarmllc@gmail.com</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors">
                      Impersonate
                    </button>
                    <button className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors">
                      Rotate Key
                    </button>
                    <button className="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors">
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
