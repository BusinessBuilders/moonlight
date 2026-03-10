import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos of our Highland Cattle, llamas, goats, poultry, and beautiful farm life at Moonlight Run Farm.',
}

export default function GalleryPage() {
  return (
    <>
      <section className="hero-gradient relative py-28 overflow-hidden">
        <div className="absolute top-1/3 left-[10%] w-[400px] h-[400px] bg-forest-600/8 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-label text-gold-400/80 mb-5 animate-reveal delay-1">The Farm</p>
          <h1 className="text-display text-5xl sm:text-6xl lg:text-7xl text-cream-50 mb-6 animate-reveal delay-2">
            Photo Gallery
          </h1>
          <p className="text-cream-200/60 text-xl font-light max-w-2xl leading-relaxed animate-reveal delay-3">
            Take a virtual tour of Moonlight Run Farm and meet our beautiful animals.
          </p>
        </div>
      </section>

      <section className="py-20 ambient-glow relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <GalleryGrid />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
