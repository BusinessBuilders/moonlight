'use client'

import { Button } from '@/components/ui/Button'
import { HeroReveal } from '@/components/ui/MotionReveal'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="hero-gradient relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-forest-600/8 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="max-w-4xl">
          <HeroReveal index={0}>
            <p className="text-label text-gold-400/80 mb-6">
              Barre, Massachusetts
            </p>
          </HeroReveal>

          <HeroReveal index={1}>
            <h1 className="text-display text-6xl sm:text-7xl lg:text-[5.5rem] text-cream-50 mb-2">
              Moonlight Run
            </h1>
          </HeroReveal>

          <HeroReveal index={2}>
            <h1 className="text-display text-6xl sm:text-7xl lg:text-[5.5rem] mb-8">
              <span className="gradient-text">Farm LLC</span>
            </h1>
          </HeroReveal>

          <HeroReveal index={3}>
            <p className="text-cream-200/80 text-xl sm:text-2xl font-light leading-relaxed max-w-xl mb-3">
              Highland Cattle & Specialty Animals
            </p>
          </HeroReveal>

          <HeroReveal index={4}>
            <p className="text-cream-300/40 text-base italic font-display mb-12">
              &ldquo;Full transparency is our policy&rdquo;
            </p>
          </HeroReveal>

          <HeroReveal index={5}>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg" href="/inquiry">
                Send Us an Inquiry
              </Button>
              <Button variant="outline" size="lg" href="/services">
                Explore Services
              </Button>
            </div>
          </HeroReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-5 h-8 rounded-full border border-cream-300/30 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-cream-300/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
