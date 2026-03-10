import type { Metadata } from 'next'
import { Card, SectionHeading } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Farm Store',
  description:
    '100% grass-fed Highland beef, pasture raised poultry, farm fresh eggs, hay, and raw fiber from Moonlight Run Farm.',
}

const products = [
  {
    name: '100% Grass-Fed Highland Beef',
    category: 'Beef',
    description:
      'Our Scottish Highland cattle are 100% grass-fed and finished. Processed at local, federally inspected slaughter houses. We encourage you to come see the animal before processing.',
    badges: ['Grass-Fed', 'No Hormones', 'No Steroids', 'No Antibiotics', 'Federally Inspected'],
    availability: 'available' as const,
    price: 'Contact for pricing',
  },
  {
    name: 'Pasture Raised Turkey',
    category: 'Poultry',
    description:
      'Heritage turkeys raised on open pasture with plenty of room to roam. Available for Thanksgiving pre-orders.',
    badges: ['Pasture Raised', 'No Hormones', 'No Antibiotics'],
    availability: 'seasonal' as const,
    seasonalNote: 'November only',
    price: 'Pre-order required',
  },
  {
    name: 'Pasture Raised Chicken',
    category: 'Poultry',
    description:
      'Free-ranging chickens raised on pasture with supplemental organic feed. Rich flavor you can taste.',
    badges: ['Pasture Raised', 'No Hormones', 'No Antibiotics'],
    availability: 'available' as const,
    price: 'Contact for pricing',
  },
  {
    name: 'Farm Fresh Eggs',
    category: 'Eggs',
    description:
      'Both chicken and goose eggs from our free-ranging flocks. Rich, deep-colored yolks from happy birds.',
    badges: ['Farm Fresh', 'Free Range', 'Chicken & Goose'],
    availability: 'available' as const,
    price: 'Contact for pricing',
  },
  {
    name: 'Hay',
    category: 'Hay & Feed',
    description:
      'Quality hay available in small square bales and round bales. Perfect for livestock, horses, and garden mulch.',
    badges: ['Small Square Bales', 'Round Bales'],
    availability: 'available' as const,
    price: 'Contact for pricing',
  },
  {
    name: 'Raw Fiber',
    category: 'Fiber',
    description:
      'Beautiful raw fiber from our llamas, alpaca, and sheep. Perfect for spinning, felting, and fiber arts.',
    badges: ['Llama', 'Alpaca', 'Sheep'],
    availability: 'seasonal' as const,
    seasonalNote: 'After spring shearing',
    price: 'Contact for pricing',
  },
]

export default function StorePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative py-28 overflow-hidden">
        <div className="absolute top-1/2 left-[10%] w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-label text-gold-400/80 mb-5 animate-reveal delay-1">Farm Store</p>
          <h1 className="text-display text-5xl sm:text-6xl lg:text-7xl text-cream-50 mb-6 animate-reveal delay-2">
            From Our Farm
            <br />
            <span className="gradient-text">To Your Table</span>
          </h1>
          <p className="text-cream-200/60 text-xl font-light max-w-xl leading-relaxed animate-reveal delay-3">
            No hormones. No steroids. No antibiotics.
          </p>
          <p className="text-cream-300/30 text-base italic font-display mt-2 animate-reveal delay-4">
            &ldquo;Full transparency is our policy&rdquo;
          </p>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-10 relative">
        <div className="absolute top-0 left-0 right-0 glass-divider" />
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="text-cream-300/50 text-sm leading-relaxed font-light">
              We encourage you to ask questions and even come see the animal you will be getting
              before processing. Our meat is processed at local, federally inspected slaughter houses.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 ambient-glow relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <ScrollReveal key={product.name} delay={i * 80}>
                <Card className="flex flex-col h-full" glow>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-label text-cream-300/40">
                      {product.category}
                    </span>
                    <span className={`badge text-[0.6rem] ${product.availability === 'seasonal' ? 'badge-gold' : ''}`}>
                      {product.availability === 'seasonal' && product.seasonalNote
                        ? product.seasonalNote
                        : product.availability === 'available' ? 'Available' : 'Seasonal'}
                    </span>
                  </div>

                  <h3 className="text-display text-xl text-cream-50 mb-3 tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-cream-300/50 text-sm leading-relaxed mb-5 flex-1 font-light">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {product.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-1 bg-forest-700/15 rounded-full text-[0.68rem] text-forest-300/60 border border-forest-600/10 font-light"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <p className="text-gold-400/80 text-sm font-medium">{product.price}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/5 rounded-full blur-[120px]" />

        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <p className="text-label text-gold-400/60 mb-5">Interested?</p>
            <h2 className="text-display text-4xl sm:text-5xl text-cream-50 mb-6">
              Get Fresh
              <br />
              <span className="gradient-text">Farm Products</span>
            </h2>
            <p className="text-cream-200/50 text-lg font-light mb-10 leading-relaxed">
              Send us an inquiry and we&apos;ll get back to you with availability and pricing.
            </p>
            <Button variant="secondary" size="lg" href="/inquiry">
              Inquire About Products
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
