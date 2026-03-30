'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal } from '@/components/ui/Modal'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'cattle', label: 'Highland Cattle' },
  { id: 'goats', label: 'Goats' },
  { id: 'llamas-alpaca', label: 'Llamas & Alpaca' },
  { id: 'poultry', label: 'Poultry & Fowl' },
  { id: 'dogs', label: 'Dogs' },
  { id: 'farm-life', label: 'Farm Life' },
  { id: 'events', label: 'Events' },
]

interface GalleryImage {
  id: string
  title: string
  category: string[]
  description?: string
  imageUrl: string
  thumbnailUrl: string
  alt: string
}

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'http://localhost:3003'

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch(`${PLATFORM_URL}/api/gallery?depth=1&sort=order&limit=100`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()

        const mapped: GalleryImage[] = data.docs
          .filter((doc: Record<string, unknown>) => doc.image)
          .map((doc: Record<string, unknown>) => {
            const img = doc.image as Record<string, unknown>
            const sizes = img.sizes as Record<string, Record<string, unknown>> | undefined

            const cardSize = sizes?.card
            const heroSize = sizes?.hero
            const thumbnailSize = sizes?.thumbnail

            const imageUrl = heroSize?.url
              ? `${PLATFORM_URL}${heroSize.url}`
              : cardSize?.url
                ? `${PLATFORM_URL}${cardSize.url}`
                : `${PLATFORM_URL}${img.url}`

            const thumbnailUrl = thumbnailSize?.url
              ? `${PLATFORM_URL}${thumbnailSize.url}`
              : cardSize?.url
                ? `${PLATFORM_URL}${cardSize.url}`
                : `${PLATFORM_URL}${img.url}`

            return {
              id: String(doc.id),
              title: String(doc.title || ''),
              category: Array.isArray(doc.category) ? doc.category : [doc.category],
              description: doc.description ? String(doc.description) : undefined,
              imageUrl: String(imageUrl),
              thumbnailUrl: String(thumbnailUrl),
              alt: String(doc.altText || (img as Record<string, unknown>).alt || doc.title || ''),
            }
          })

        setImages(mapped)
      } catch {
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const filteredImages =
    activeCategory === 'all'
      ? images
      : images.filter((img) => img.category.includes(activeCategory))

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-xl bg-forest-900/30 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring' as const, damping: 25, stiffness: 120 }}
      >
        <div className="w-20 h-20 rounded-full border-2 border-forest-600/20 mx-auto mb-6 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream-300/40">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <h3 className="text-display text-2xl text-cream-50 mb-3">Gallery Coming Soon</h3>
        <p className="text-cream-300/50 font-light max-w-md mx-auto">
          Photos are being uploaded. Check back soon to see our beautiful animals and farm life.
        </p>
      </motion.div>
    )
  }

  return (
    <>
      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring' as const, damping: 25, stiffness: 150 }}
      >
        {categories.map((cat) => {
          const count =
            cat.id === 'all'
              ? images.length
              : images.filter((img) => img.category.includes(cat.id)).length
          if (count === 0 && cat.id !== 'all') return null

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-forest-700 text-cream-50 border border-forest-500'
                  : 'bg-forest-900/30 text-cream-300 border border-forest-700/30 hover:border-forest-600/50'
              }`}
            >
              {cat.label}
              <span className="ml-1.5 text-xs opacity-60">{count}</span>
            </button>
          )
        })}
      </motion.div>

      {/* Image Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, i) => (
            <motion.button
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: 'spring' as const,
                damping: 25,
                stiffness: 200,
                delay: i * 0.04,
              }}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl glass-card p-0 cursor-pointer"
            >
              <Image
                src={image.thumbnailUrl}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="font-display text-cream-50 text-lg">{image.title}</h3>
                  {image.description && (
                    <p className="text-cream-300/70 text-sm font-light">{image.description}</p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredImages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-cream-300/50 font-light">No photos in this category yet.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <Modal
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title}
      >
        {selectedImage && (
          <div>
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            {selectedImage.description && (
              <p className="text-cream-300/70 font-light">{selectedImage.description}</p>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}
