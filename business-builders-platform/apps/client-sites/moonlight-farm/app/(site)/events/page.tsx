import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Button } from '@/components/ui/Button'
import { FacebookPageEmbed } from '@/components/facebook/FacebookPageEmbed'
import { EventsList } from '@/components/events/EventsList'

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Upcoming events, petting zoos, educational programs, and farm activities at Moonlight Run Farm.',
}

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative py-28 overflow-hidden">
        <div className="absolute top-1/3 right-[10%] w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-label text-gold-400/80 mb-5 animate-reveal delay-1">What&apos;s Happening</p>
          <h1 className="text-display text-5xl sm:text-6xl lg:text-7xl text-cream-50 mb-6 animate-reveal delay-2">
            Events
          </h1>
          <p className="text-cream-200/60 text-xl font-light max-w-2xl leading-relaxed animate-reveal delay-3">
            Farm tours, petting zoos, educational programs, and seasonal celebrations.
          </p>
        </div>
      </section>

      {/* CMS Events */}
      <section className="py-20 ambient-glow relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 rounded-xl bg-forest-900/30 animate-pulse" />
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
          <h2 className="font-display text-3xl text-cream-50 mb-10 text-center animate-reveal delay-1">
            Host Your Event With Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { type: 'Birthday Parties', icon: '🎂', desc: 'Farm-themed birthday parties with friendly animals, hands-on activities, and unforgettable memories.' },
              { type: 'Corporate Events', icon: '🏢', desc: 'Team-building days, company picnics, and corporate outings in a relaxed farm setting.' },
              { type: 'Weddings', icon: '💒', desc: 'Rustic charm and beautiful animals make for a truly unique wedding experience.' },
              { type: 'Bar/Bat Mitzvahs', icon: '✡️', desc: 'Celebrate this milestone with a special farm experience your guests will never forget.' },
              { type: 'Sweet 16s', icon: '🎀', desc: 'A unique celebration with photo ops, animal interactions, and farm fun.' },
              { type: 'Educational Tours', icon: '📚', desc: 'Schools, homeschool groups, and scouts learn about farm life and animal care.' },
            ].map((event) => (
              <div key={event.type} className="glass-card rounded-xl p-6">
                <span className="text-3xl mb-3 block">{event.icon}</span>
                <h3 className="font-display text-lg text-cream-50 mb-2">{event.type}</h3>
                <p className="text-cream-300 text-sm leading-relaxed">{event.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-cream-300/60 text-sm mb-6">
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
          <h2 className="font-display text-2xl text-cream-50 mb-8 text-center">Latest from Facebook</h2>
          <div className="flex justify-center">
            <div className="glass-card rounded-2xl p-4 !transform-none">
              <Suspense fallback={<div className="text-cream-300/40 text-center py-12 text-sm">Loading feed...</div>}>
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
      <section className="py-8 bg-forest-900/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-cream-300 mb-4">
            Follow us for the latest farm updates, new animals, and event announcements:
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://www.facebook.com/moonlightrunfarm"
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
