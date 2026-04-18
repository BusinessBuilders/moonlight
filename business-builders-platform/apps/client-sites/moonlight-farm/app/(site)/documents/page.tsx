import type { Metadata } from 'next'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Documents & Agreements',
  description: 'View and sign documents, waivers, and agreements for Moonlight Run Farm services.',
}

export default function DocumentsPage() {
  return (
    <>
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display text-5xl text-cream-50 mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">Documents & Agreements</h1>
          <p className="text-cream-100/85 text-xl max-w-2xl mx-auto font-light">
            View, download, and electronically sign documents related to your farm services.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Placeholder documents — will be populated from CMS */}
            <Card className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg text-ink-900">Liability Waiver</h3>
                <p className="text-ink-700 text-sm">Required for farm visits and petting zoo events</p>
              </div>
              <span className="px-3 py-1 bg-sage-500/40 rounded-full text-xs text-sage-700 border border-sage-500/30">
                Requires Signature
              </span>
            </Card>

            <Card className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg text-ink-900">Boarding Agreement</h3>
                <p className="text-ink-700 text-sm">Required for dog boarding services</p>
              </div>
              <span className="px-3 py-1 bg-sage-500/40 rounded-full text-xs text-sage-700 border border-sage-500/30">
                Requires Signature
              </span>
            </Card>

            <Card className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg text-ink-900">Animal Purchase Agreement</h3>
                <p className="text-ink-700 text-sm">Required for livestock purchases</p>
              </div>
              <span className="px-3 py-1 bg-sage-500/40 rounded-full text-xs text-sage-700 border border-sage-500/30">
                Requires Signature
              </span>
            </Card>
          </div>

          <div className="mt-12 glass-card !transform-none rounded-lg p-6 text-center">
            <p className="text-ink-700 text-sm">
              E-signature integration powered by Dropbox Sign will be configured once the API key is provided.
              <br />
              For now, please contact us to receive documents via email.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
