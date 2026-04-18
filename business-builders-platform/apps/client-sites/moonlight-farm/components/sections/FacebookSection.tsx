'use client'

import { Suspense } from 'react'
import { Button } from '@/components/ui/Button'
import { FacebookPageEmbed, FacebookLikeButton } from '@/components/facebook/FacebookPageEmbed'
import { Reveal } from '@/components/ui/MotionReveal'

export function FacebookSection() {
  return (
    <section className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-600/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text content */}
          <Reveal>
            <div>
              <p className="text-label text-gold-400/80 mb-5">Stay Connected</p>
              <h2 className="text-display text-5xl sm:text-6xl text-cream-50 mb-6">
                Follow the Farm
              </h2>
              <p className="text-cream-100/75 text-xl font-light leading-relaxed mb-8">
                See what&apos;s happening at Moonlight Run Farm — new animals, farm
                updates, and upcoming events. Follow us on Facebook to stay in the loop.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href="https://www.facebook.com/MoonlightRunFarmLLC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 justify-center rounded-xl font-body font-semibold transition-all duration-500 px-7 py-3 text-sm tracking-wide bg-[#1877F2] text-white hover:bg-[#0E5DCC] border border-[#1877F2]/60 shadow-[0_4px_20px_rgba(24,119,242,0.35)] hover:shadow-[0_8px_30px_rgba(24,119,242,0.5)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Follow on Facebook
                </a>
                <Button variant="outline" href="/events">
                  View All Events
                </Button>
              </div>
              <div className="mt-8">
                <Suspense fallback={null}>
                  <FacebookLikeButton />
                </Suspense>
              </div>
            </div>
          </Reveal>

          {/* Right — Facebook embed */}
          <Reveal delay={200}>
            <div className="glass-card rounded-2xl p-3 sm:p-4 !transform-none w-full overflow-hidden">
              <Suspense fallback={<div className="text-ink-700/40 text-center py-16 text-sm">Loading Facebook feed...</div>}>
                <FacebookPageEmbed
                  tabs={['timeline']}
                  width={500}
                  height={560}
                  smallHeader
                />
              </Suspense>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
