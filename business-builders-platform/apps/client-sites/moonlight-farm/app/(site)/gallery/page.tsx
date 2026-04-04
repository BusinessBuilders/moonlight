import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos of our Highland Cattle, llamas, goats, poultry, and beautiful farm life at Moonlight Run Farm.',
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        image="/moonlight3.jpg"
        imageAlt="Painted Desert Sheep at Moonlight Run Farm"
        imagePosition="center 45%"
        label="The Farm"
        title="Photo Gallery"
        description="Take a virtual tour of Moonlight Run Farm and meet our beautiful animals."
      />

      <section className="py-20 ambient-glow relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <GalleryGrid />
        </div>
      </section>
    </>
  )
}
