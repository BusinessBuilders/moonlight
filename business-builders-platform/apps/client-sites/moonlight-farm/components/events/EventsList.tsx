'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CalendarDays, MapPin, Clock, ExternalLink } from 'lucide-react'

interface CMSEvent {
  id: string
  title: string
  shortDescription?: string
  startTime: string
  endTime?: string
  location?: string
  image?: {
    url: string
    alt?: string
    sizes?: Record<string, { url?: string }>
  }
  isFeatured: boolean
  registrationUrl?: string
  facebookEventUrl?: string
}

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'http://localhost:3003'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function isUpcoming(dateStr: string): boolean {
  return new Date(dateStr) >= new Date()
}

export function EventsList() {
  const [events, setEvents] = useState<CMSEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${PLATFORM_URL}/api/events?depth=1&sort=-startTime&limit=20`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()

        const mapped: CMSEvent[] = data.docs.map((doc: Record<string, unknown>) => {
          const img = doc.image as Record<string, unknown> | undefined
          return {
            id: String(doc.id),
            title: String(doc.title || ''),
            shortDescription: doc.shortDescription ? String(doc.shortDescription) : undefined,
            startTime: String(doc.startTime),
            endTime: doc.endTime ? String(doc.endTime) : undefined,
            location: doc.location ? String(doc.location) : undefined,
            image: img ? {
              url: `${PLATFORM_URL}${img.url}`,
              alt: String(img.alt || doc.title || ''),
              sizes: img.sizes as Record<string, { url?: string }> | undefined,
            } : undefined,
            isFeatured: Boolean(doc.isFeatured),
            registrationUrl: doc.registrationUrl ? String(doc.registrationUrl) : undefined,
            facebookEventUrl: doc.facebookEventUrl ? String(doc.facebookEventUrl) : undefined,
          }
        })

        setEvents(mapped)
      } catch {
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 rounded-xl bg-stone-100/30 animate-pulse" />
        ))}
      </div>
    )
  }

  const upcoming = events.filter(e => isUpcoming(e.startTime))
  const past = events.filter(e => !isUpcoming(e.startTime))

  if (events.length === 0) {
    return null
  }

  return (
    <div className="space-y-16">
      {/* Upcoming Events */}
      {upcoming.length > 0 && (
        <div>
          <h2 className="text-display text-2xl text-ink-900 mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((event, i) => (
              <motion.div
                key={event.id}
                className={`glass-card rounded-xl overflow-hidden ${event.isFeatured ? 'md:col-span-2 glass-card-featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring' as const,
                  damping: 25,
                  stiffness: 200,
                  delay: i * 0.1,
                }}
              >
                <div className={`flex ${event.isFeatured ? 'flex-col sm:flex-row' : 'flex-col'}`}>
                  {/* Event image */}
                  {event.image && (
                    <div className={`relative ${event.isFeatured ? 'sm:w-1/3 aspect-[4/3]' : 'aspect-[16/9]'}`}>
                      <Image
                        src={event.image.url}
                        alt={event.image.alt || event.title}
                        fill
                        className="object-cover"
                        sizes={event.isFeatured ? '(max-width: 640px) 100vw, 33vw' : '(max-width: 768px) 100vw, 50vw'}
                      />
                      {event.isFeatured && (
                        <div className="absolute top-3 left-3">
                          <span className="badge-gold text-[0.6rem]">Featured</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Event details */}
                  <div className="p-6 flex-1">
                    <h3 className="font-display text-xl text-ink-900 mb-3 font-bold">{event.title}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-ink-700/70">
                        <CalendarDays className="w-4 h-4 text-gold-400/70 flex-shrink-0" strokeWidth={1.5} />
                        <span>{formatDate(event.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-ink-700/70">
                        <Clock className="w-4 h-4 text-gold-400/70 flex-shrink-0" strokeWidth={1.5} />
                        <span>
                          {formatTime(event.startTime)}
                          {event.endTime && ` — ${formatTime(event.endTime)}`}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-ink-700/70">
                          <MapPin className="w-4 h-4 text-gold-400/70 flex-shrink-0" strokeWidth={1.5} />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>

                    {event.shortDescription && (
                      <p className="text-ink-700/50 text-sm font-light leading-relaxed mb-4">
                        {event.shortDescription}
                      </p>
                    )}

                    <div className="flex gap-3 flex-wrap">
                      {event.registrationUrl && (
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-gold-500/15 text-gold-400 border border-gold-500/20 hover:bg-gold-500/25 transition-colors"
                        >
                          Register <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {event.facebookEventUrl && (
                        <a
                          href={event.facebookEventUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-[#1877F2]/10 text-[#4599FF] border border-[#1877F2]/20 hover:bg-[#1877F2]/20 transition-colors"
                        >
                          Facebook <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {past.length > 0 && (
        <div>
          <h2 className="text-display text-xl text-ink-700/50 mb-6">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {past.slice(0, 6).map((event) => (
              <div key={event.id} className="glass-card rounded-xl p-5 opacity-60">
                <h3 className="font-display text-sm text-ink-900 mb-2">{event.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-ink-700/50">
                  <CalendarDays className="w-3 h-3" strokeWidth={1.5} />
                  <span>{formatDate(event.startTime)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
