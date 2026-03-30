'use client'

import { Suspense } from 'react'
import { SectionHeading } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FacebookPageEmbed, FacebookLikeButton } from '@/components/facebook/FacebookPageEmbed'
import { Reveal } from '@/components/ui/MotionReveal'

export function FacebookSection() {
  return (
    <section className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-600/15 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            label="Stay Connected"
            title="Follow the Farm"
            description="See what's happening at Moonlight Run Farm — new animals, farm updates, and upcoming events."
          />
        </Reveal>

        <Reveal delay={200}>
          <div className="flex justify-center mb-8">
            <Suspense fallback={null}>
              <FacebookLikeButton />
            </Suspense>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex justify-center">
            <div className="glass-card rounded-2xl p-4 !transform-none">
              <Suspense fallback={<div className="text-cream-300/40 text-center py-16 text-sm">Loading Facebook feed...</div>}>
                <FacebookPageEmbed
                  tabs={['timeline']}
                  width={500}
                  height={500}
                  smallHeader
                />
              </Suspense>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="text-center mt-10">
            <Button variant="outline" href="/events">
              View All Events
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
