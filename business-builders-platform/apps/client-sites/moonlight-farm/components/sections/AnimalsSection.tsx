'use client'

import Image from 'next/image'
import { SectionHeading } from '@/components/ui/Card'
import { Reveal, Stagger, StaggerItem, ScaleIn } from '@/components/ui/MotionReveal'
import { motion } from 'framer-motion'

const animals = [
  'Scottish Highland Cattle',
  'Llamas',
  'Alpaca',
  'Nigerian Dwarf Goats',
  'Painted Desert Sheep',
  'Yaks',
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
    <section className="py-28 ambient-glow relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <SectionHeading
            label="Our Family"
            title="The Animals"
            description="We raise a diverse family of animals with love, knowledge, and the care that comes from our backgrounds as nurses."
          />
        </Reveal>

        {/* Moonlight logo — cinematic entrance */}
        <ScaleIn delay={200}>
          <div className="flex justify-center mb-14">
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80"
              whileInView={{
                filter: [
                  'drop-shadow(0 0 0px rgba(201,149,106,0))',
                  'drop-shadow(0 0 30px rgba(201,149,106,0.3))',
                  'drop-shadow(0 0 15px rgba(201,149,106,0.15))',
                ],
              }}
              transition={{ duration: 2, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <Image
                src="/moonlight.png"
                alt="Moonlight Run Farm — Highland Cattle, Llama, Goat & Chicken under the moon"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 256px, 320px"
              />
            </motion.div>
          </div>
        </ScaleIn>

        {/* Animal pills — staggered cascade */}
        <Stagger className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto" stagger={0.04} delay={400}>
          {animals.map((animal) => (
            <StaggerItem key={animal}>
              <motion.span
                className="glass-card !transform-none px-5 py-2.5 rounded-full text-cream-200/80 text-sm font-light tracking-wide inline-block cursor-default"
                whileHover={{
                  scale: 1.08,
                  backgroundColor: 'rgba(201,149,106,0.12)',
                  transition: { type: 'spring', stiffness: 400, damping: 15 },
                }}
              >
                {animal}
              </motion.span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Decorative ambient orb behind logo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  )
}
