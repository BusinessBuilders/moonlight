'use client'

import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/MotionReveal'

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dramatic gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Reveal>
          <p className="text-label text-gold-400/60 mb-6">Ready?</p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="text-display text-5xl sm:text-6xl text-cream-50 mb-8">
            Let&apos;s Work
            <br />
            <span className="gradient-text">Together</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-cream-200/60 text-lg font-light mb-12 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re looking for farm-fresh products, event services, or livestock transport —
            our smart inquiry system will guide you to the right place.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <Button variant="secondary" size="lg" href="/inquiry">
            Send Us an Inquiry
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
