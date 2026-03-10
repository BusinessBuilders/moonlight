import Link from 'next/link'
import { Suspense } from 'react'
import { Card, SectionHeading } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FacebookPageEmbed, FacebookLikeButton } from '@/components/facebook/FacebookPageEmbed'

const animals = [
  'Scottish Highland Cattle',
  'Llamas',
  'Alpaca',
  'Nigerian Dwarf Goats',
  'Donkeys',
  'Peafowl',
  'Geese',
  'Chickens',
  'Guinea Fowl',
  'New Zealand Rabbits',
  'Great Pyrenees Dogs',
]

const services = [
  {
    title: 'Livestock & Equine Transport',
    description: 'Safe, professional hauling for all livestock and equines across New England.',
    icon: '🚛',
    href: '/services',
  },
  {
    title: 'Educational Programs',
    description: 'Hands-on farm experiences for schools, groups, and families.',
    icon: '📚',
    href: '/services',
  },
  {
    title: 'Petting Zoos & Events',
    description: 'Corporate events, birthday parties, weddings, Bar/Bat Mitzvahs, and more.',
    icon: '🎉',
    href: '/services',
  },
  {
    title: 'Livestock Services',
    description: 'Hoof trimming, catching, sorting, ear tagging, castration, worming & vaccination.',
    icon: '🐄',
    href: '/services',
  },
  {
    title: 'Dog Boarding',
    description: 'Your dogs stay on the farm with our experienced team and guardian dogs.',
    icon: '🐕',
    href: '/services',
  },
  {
    title: 'Animal Sales',
    description: 'Quality Highland cattle, goats, poultry, and more — raised with care.',
    icon: '🏷️',
    href: '/inquiry',
  },
]

const products = [
  { name: '100% Grass-Fed Highland Beef', badges: ['Grass-Fed', 'No Hormones', 'Federally Inspected'], available: true },
  { name: 'Pasture Raised Chicken', badges: ['Pasture Raised', 'No Antibiotics'], available: true },
  { name: 'Farm Fresh Eggs', badges: ['Farm Fresh', 'Chicken & Goose'], available: true },
  { name: 'Pasture Raised Turkey', badges: ['Pasture Raised', 'November Only'], available: false },
  { name: 'Hay Bales', badges: ['Small Square', 'Round Bales'], available: true },
  { name: 'Raw Fiber', badges: ['Llama', 'Alpaca', 'Sheep'], available: false },
]

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — Full viewport, dramatic entrance
      ═══════════════════════════════════════════ */}
      <section className="hero-gradient relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-forest-600/8 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="max-w-4xl">
            {/* Staggered entrance sequence */}
            <p className="text-label text-gold-400/80 mb-6 animate-reveal delay-1">
              Barre, Massachusetts
            </p>

            <h1 className="text-display text-6xl sm:text-7xl lg:text-[5.5rem] text-cream-50 mb-2 animate-reveal delay-2">
              Moonlight Run
            </h1>
            <h1 className="text-display text-6xl sm:text-7xl lg:text-[5.5rem] mb-8 animate-reveal delay-3">
              <span className="gradient-text">Farm LLC</span>
            </h1>

            <p className="text-cream-200/80 text-xl sm:text-2xl font-light leading-relaxed max-w-xl mb-3 animate-reveal delay-4">
              Highland Cattle & Specialty Animals
            </p>

            <p className="text-cream-300/40 text-base italic font-display mb-12 animate-reveal delay-5">
              &ldquo;Full transparency is our policy&rdquo;
            </p>

            <div className="flex flex-wrap gap-4 animate-reveal delay-6">
              <Button variant="secondary" size="lg" href="/inquiry">
                Send Us an Inquiry
              </Button>
              <Button variant="outline" size="lg" href="/services">
                Explore Services
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-5 h-8 rounded-full border border-cream-300/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-cream-300/50 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ANIMALS — Flowing pills with ambient glow
      ═══════════════════════════════════════════ */}
      <section className="py-28 ambient-glow relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <SectionHeading
              label="Our Family"
              title="The Animals"
              description="We raise a diverse family of animals with love, knowledge, and the care that comes from our backgrounds as nurses."
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {animals.map((animal, i) => (
                <span
                  key={animal}
                  className="glass-card !transform-none px-5 py-2.5 rounded-full text-cream-200/80 text-sm font-light tracking-wide animate-scale-in"
                  style={{ animationDelay: `${0.6 + i * 0.05}s` }}
                >
                  {animal}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES — Bento-inspired grid
      ═══════════════════════════════════════════ */}
      <section className="py-28 relative">
        {/* Subtle section divider glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-600/15 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              label="What We Offer"
              title="Services"
              description="From livestock transport to educational programs and farm-fresh products — we do it all with heart."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100}>
                <Link href={service.href} className="block h-full">
                  <Card className="h-full group" glow>
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-500">
                        {service.icon}
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-cream-50 mb-2 font-bold tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-cream-300/60 text-sm leading-relaxed font-light">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={600}>
            <div className="text-center mt-12">
              <Button variant="outline" href="/services">
                View All Services
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRODUCTS — Farm Store preview
      ═══════════════════════════════════════════ */}
      <section className="py-28 relative ambient-glow">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <SectionHeading
              label="Farm Store"
              title="From Our Farm to Your Table"
              description="No hormones. No steroids. No antibiotics. We encourage you to come see the animals before processing."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <ScrollReveal key={product.name} delay={i * 80}>
                <Card className="relative overflow-hidden">
                  {/* Availability indicator */}
                  <div className="absolute top-4 right-4">
                    <span className={`badge text-[0.6rem] ${product.available ? 'badge' : 'badge-gold'}`}>
                      {product.available ? 'Available' : 'Seasonal'}
                    </span>
                  </div>

                  <h3 className="font-display text-lg text-cream-50 mb-4 pr-20 font-bold tracking-tight">
                    {product.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {product.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-1 bg-forest-700/20 rounded-full text-[0.68rem] text-forest-300/70 border border-forest-600/15 font-light"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <div className="text-center mt-12">
              <Button variant="outline" href="/store">
                View Farm Store
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FACEBOOK — Social feed embed
      ═══════════════════════════════════════════ */}
      <section className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-600/15 to-transparent" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              label="Stay Connected"
              title="Follow the Farm"
              description="See what's happening at Moonlight Run Farm — new animals, farm updates, and upcoming events."
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex justify-center mb-8">
              <Suspense fallback={null}>
                <FacebookLikeButton />
              </Suspense>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
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
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="text-center mt-10">
              <Button variant="outline" href="/events">
                View All Events
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — Final conversion section
      ═══════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* Dramatic gradient background */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[150px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <p className="text-label text-gold-400/60 mb-6">Ready?</p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-display text-5xl sm:text-6xl text-cream-50 mb-8">
              Let&apos;s Work
              <br />
              <span className="gradient-text">Together</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-cream-200/60 text-lg font-light mb-12 max-w-xl mx-auto leading-relaxed">
              Whether you&apos;re looking for farm-fresh products, event services, or livestock transport —
              our smart inquiry system will guide you to the right place.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <Button variant="secondary" size="lg" href="/inquiry">
              Send Us an Inquiry
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
