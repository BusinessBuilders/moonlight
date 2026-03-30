'use client'

import { Card, SectionHeading } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/MotionReveal'

const products = [
  { name: '100% Grass-Fed Highland Beef', badges: ['Grass-Fed', 'No Hormones', 'Federally Inspected'], available: true },
  { name: 'Pasture Raised Chicken', badges: ['Pasture Raised', 'No Antibiotics'], available: true },
  { name: 'Farm Fresh Eggs', badges: ['Farm Fresh', 'Chicken & Goose'], available: true },
  { name: 'Pasture Raised Turkey', badges: ['Pasture Raised', 'November Only'], available: false },
  { name: 'Hay Bales', badges: ['Small Square', 'Round Bales'], available: true },
  { name: 'Raw Fiber', badges: ['Llama', 'Alpaca', 'Sheep'], available: false },
]

export function ProductsSection() {
  return (
    <section className="py-28 relative ambient-glow">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <SectionHeading
            label="Farm Store"
            title="From Our Farm to Your Table"
            description="No hormones. No steroids. No antibiotics. We encourage you to come see the animals before processing."
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {products.map((product) => (
            <StaggerItem key={product.name}>
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
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={400}>
          <div className="text-center mt-12">
            <Button variant="outline" href="/store">
              View Farm Store
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
