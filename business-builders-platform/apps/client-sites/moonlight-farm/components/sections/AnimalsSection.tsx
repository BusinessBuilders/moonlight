'use client'

import { SectionHeading } from '@/components/ui/Card'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/MotionReveal'

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

export function AnimalsSection() {
  return (
    <section className="py-28 ambient-glow relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <SectionHeading
            label="Our Family"
            title="The Animals"
            description="We raise a diverse family of animals with love, knowledge, and the care that comes from our backgrounds as nurses."
          />
        </Reveal>

        <Stagger className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto" stagger={0.04} delay={200}>
          {animals.map((animal) => (
            <StaggerItem key={animal}>
              <span className="glass-card !transform-none px-5 py-2.5 rounded-full text-cream-200/80 text-sm font-light tracking-wide inline-block">
                {animal}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
