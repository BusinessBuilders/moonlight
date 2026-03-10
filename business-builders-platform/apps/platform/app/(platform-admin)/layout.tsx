import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Business Builders — Super Admin',
    template: '%s | BB Admin',
  },
}

export default function PlatformAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-6 hidden lg:block">
            <div className="mb-8">
              <h1 className="text-lg font-bold text-white">Business Builders</h1>
              <p className="text-xs text-slate-400">Super Admin Panel</p>
            </div>
            <nav className="space-y-1">
              <a href="/dashboard" className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="/clients" className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                Clients
              </a>
              <a href="/clients/new" className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                + New Client
              </a>
              <a href="/admin" className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors mt-4 border-t border-slate-800 pt-4">
                Payload Admin
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
