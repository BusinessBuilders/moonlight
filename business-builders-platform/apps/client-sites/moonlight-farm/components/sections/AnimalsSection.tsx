'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { SectionHeading } from '@/components/ui/Card'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/MotionReveal'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Moonlight through fog — blur clears, logo emerges
      gsap.fromTo(
        logoRef.current,
        {
          opacity: 0,
          scale: 1.15,
          filter: 'blur(18px) drop-shadow(0 0 0px rgba(201,149,106,0))',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px) drop-shadow(0 0 20px rgba(201,149,106,0.25))',
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: logoRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      )
    }, logoRef)

    return () => ctx.revert()
  }, [])

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

        {/* Moonlight logo — fog-to-clarity reveal */}
        <div className="flex justify-center mb-14">
          <div
            ref={logoRef}
            className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] opacity-0"
          >
            <Image
              src="/moonlight.png"
              alt="Moonlight Run Farm — Highland Cattle, Llama, Goat & Chicken under the moon"
              fill
              className="object-contain"
              style={{ mixBlendMode: 'screen' }}
              sizes="(max-width: 640px) 320px, 420px"
            />
          </div>
        </div>

        {/* Animal pills */}
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

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  )
}
