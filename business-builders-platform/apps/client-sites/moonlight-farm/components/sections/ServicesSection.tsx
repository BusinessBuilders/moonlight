'use client'

import Link from 'next/link'
import { Card, SectionHeading } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/MotionReveal'
import { Truck, BookOpen, CalendarDays, HeartPulse, PawPrint, Tag } from 'lucide-react'

const featuredService = {
  title: 'Petting Zoos & Events',
  description: 'Corporate events, birthday parties, weddings, Bar/Bat Mitzvahs — unforgettable farm experiences for any occasion.',
  Icon: CalendarDays,
  href: '/services',
  tags: ['Weddings', 'Corporate', 'Birthdays', 'Sweet 16s', 'Bar/Bat Mitzvahs'],
}

const compactServices = [
  { title: 'Livestock & Equine Transport', description: 'Safe nationwide hauling', Icon: Truck, href: '/services' },
  { title: 'Educational Programs', description: 'Schools, scouts & families', Icon: BookOpen, href: '/services' },
  { title: 'Livestock Services', description: 'Hoof care, tagging & more', Icon: HeartPulse, href: '/services' },
  { title: 'Dog Boarding', description: 'Farm vacation for your dogs', Icon: PawPrint, href: '/services' },
  { title: 'Animal Sales', description: 'Quality breeds, raised with care', Icon: Tag, href: '/inquiry' },
]

export function ServicesSection() {
  return (
    <section className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-600/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            label="What We Offer"
            title="Services"
            description="From livestock transport to educational programs and farm-fresh products — we do it all with heart."
          />
        </Reveal>

        {/* Featured Service — Hero Card */}
        <Reveal delay={100}>
          <Link href={featuredService.href} className="block group">
            <div className="glass-card-featured rounded-2xl p-7 sm:p-8 mb-6 relative overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute -top-10 -right-10 w-[200px] h-[200px] bg-gold-500/5 rounded-full blur-[80px] group-hover:bg-gold-500/10 transition-all duration-700" />

              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 relative z-10">
                <div className="flex-1">
                  <p className="text-label text-gold-400/70 mb-3 tracking-[0.2em]">Most Popular</p>
                  <h3 className="text-display text-2xl sm:text-3xl text-ink-900 mb-3">
                    {featuredService.title}
                  </h3>
                  <p className="text-ink-800/75 text-[0.95rem] font-light leading-relaxed max-w-lg mb-5">
                    {featuredService.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featuredService.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-sage-700/15 rounded-full text-[0.72rem] text-ink-800/80 border border-sage-700/20 font-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-16 h-16 rounded-2xl border border-gold-500/20 bg-gold-500/5 flex items-center justify-center flex-shrink-0 group-hover:border-gold-400/40 group-hover:bg-gold-500/10 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                  <featuredService.Icon className="w-8 h-8 text-gold-400/85" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* Compact Services Grid */}
        <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4" stagger={0.08} delay={200}>
          {compactServices.map((service) => (
            <StaggerItem key={service.title}>
              <Link href={service.href} className="block h-full group/card">
                <Card className="h-full text-center !py-6 !px-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl border border-gold-500/15 bg-gold-500/5 flex items-center justify-center group-hover/card:border-gold-400/35 group-hover/card:bg-gold-500/10 group-hover/card:scale-110 group-hover/card:-rotate-3 transition-all duration-500">
                    <service.Icon className="w-6 h-6 text-gold-400/85" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-sm text-ink-900 mb-1.5 font-bold tracking-tight leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-ink-800/75 text-[0.72rem] leading-relaxed font-light">
                    {service.description}
                  </p>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={500}>
          <div className="text-center mt-12">
            <Button variant="outline" href="/services">
              View All Services
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
