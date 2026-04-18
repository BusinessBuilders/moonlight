import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Cake, Building2, Heart, Star, Gift, BookOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { FacebookPageEmbed } from '@/components/facebook/FacebookPageEmbed'
import { EventsList } from '@/components/events/EventsList'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Upcoming events, petting zoos, educational programs, and farm activities at Moonlight Run Farm.',
}

export default function EventsPage() {
  return (
    <>
      <PageHero
        image="/moonlightEvents.jpg"
        imageAlt="Highland Calf at a wedding event with Moonlight Run Farm"
        imagePosition="center 38%"
        label="What&apos;s Happening"
        title="Events"
        description="Farm tours, petting zoos, educational programs, and seasonal celebrations."
      />

      {/* CMS Events */}
      <section className="py-20 ambient-glow relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 rounded-xl bg-stone-100/30 animate-pulse" />
              ))}
            </div>
          }>
            <EventsList />
          </Suspense>
        </div>
      </section>

      {/* Host Your Event CTA */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-600/15 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-label text-gold-400 mb-4 text-center animate-reveal">Celebrate Here</p>
          <h2 className="text-display text-4xl sm:text-5xl text-cream-50 mb-10 text-center animate-reveal delay-1">
            Host Your Event With Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {([
              { type: 'Birthday Parties', Icon: Cake, desc: 'Farm-themed birthday parties with friendly animals, hands-on activities, and unforgettable memories.' },
              { type: 'Corporate Events', Icon: Building2, desc: 'Team-building days, company picnics, and corporate outings in a relaxed farm setting.' },
              { type: 'Weddings', Icon: Heart, desc: 'Rustic charm and beautiful animals make for a truly unique wedding experience.' },
              { type: 'Bar/Bat Mitzvahs', Icon: Star, desc: 'Celebrate this milestone with a special farm experience your guests will never forget.' },
              { type: 'Sweet 16s', Icon: Gift, desc: 'A unique celebration with photo ops, animal interactions, and farm fun.' },
              { type: 'Educational Tours', Icon: BookOpen, desc: 'Schools, homeschool groups, and scouts learn about farm life and animal care.' },
            ] as { type: string; Icon: LucideIcon; desc: string }[]).map((event) => (
              <div key={event.type} className="glass-card rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-sage-600/30 border border-gold-500/15 flex items-center justify-center mb-4">
                  <event.Icon className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-ink-900 mb-2">{event.type}</h3>
                <p className="text-ink-700 text-sm leading-relaxed">{event.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center relative z-10">
            <p className="text-cream-100/75 text-sm mb-6">
              Want to host an event at the farm or book a mobile petting zoo?
            </p>
            <Button variant="secondary" href="/inquiry?branch=events">
              Book an Event
            </Button>
          </div>
        </div>
      </section>

      {/* Facebook Feed */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-label text-gold-400 mb-4 text-center">Stay Connected</p>
          <h2 className="text-display text-3xl sm:text-4xl text-cream-50 mb-8 text-center">Latest from Facebook</h2>
          <div className="flex justify-center">
            <div className="glass-card rounded-2xl p-4 !transform-none">
              <Suspense fallback={<div className="text-ink-700/40 text-center py-12 text-sm">Loading feed...</div>}>
                <FacebookPageEmbed
                  tabs={['timeline']}
                  width={500}
                  height={500}
                  smallHeader
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Follow CTAs */}
      <section className="py-8 bg-stone-100/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-ink-700 mb-4">
            Follow us for the latest farm updates, new animals, and event announcements:
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://www.facebook.com/MoonlightRunFarmLLC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#166FE5] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Follow on Facebook
            </a>
            <a
              href="https://www.instagram.com/moonlightrunfarm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
