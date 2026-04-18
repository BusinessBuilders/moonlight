import type { Metadata } from 'next'
import Image from 'next/image'
import { Leaf, Eye, Heart } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, SectionHeading } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet Angela & Jesse Klayman, owners of Moonlight Run Farm LLC in Barre, MA. Our story of nurses turned regenerative farmers.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/banner.jpg"
        imageAlt="Highland Cattle in pasture at Moonlight Run Farm"
        imagePosition="center 58%"
        label="Our Story"
        title={<>Nurses Turned<br /><span className="gradient-text">Farmers</span></>}
        description="A passion for regenerative agriculture, quality food, and the love of animals drives everything we do."
      />

      {/* Owners Story */}
      <section className="py-28 ambient-glow relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <Card className="p-8 sm:p-14" featured>
              <div className="text-center mb-10">
                <div className="relative w-full max-w-sm mx-auto mb-8 rounded-2xl overflow-hidden aspect-[4/3] border border-gold-500/20">
                  <Image src="/angela-jesse.jpg" alt="Angela and Jesse Klayman with Highland calves" fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, 384px" />
                </div>
                <h2 className="text-display text-3xl sm:text-4xl text-ink-900 tracking-tight">
                  Angela & Jesse Klayman
                </h2>
                <p className="text-label text-gold-400/60 mt-3">Owners, Moonlight Run Farm LLC</p>
              </div>

              <div className="glass-divider mb-10" />

              <div className="text-ink-800/70 leading-relaxed space-y-5 text-lg font-light max-w-2xl mx-auto">
                <p>
                  We met in 2018 both owning small farms in Rutland, MA.
                  In 2020, we purchased our current location in Barre — a place where we could
                  grow our shared vision for ethical, transparent farming.
                </p>
                <p>
                  Our similar backgrounds as nurses with a shared passion for regenerative agriculture,
                  quality food production, and a love of animals motivated us. As full-time caregiving
                  nurses in a hospital, we extend our love, knowledge, and skills to our animals.
                </p>
                <p className="text-ink-900/90">
                  Get to know us; we look forward to hearing from you.
                </p>
              </div>

              <div className="glass-divider mt-10 mb-8" />

              <div className="text-center">
                <p className="font-display text-ink-700/40 italic text-base">
                  Sincerely,
                </p>
                <p className="font-display text-ink-900 text-xl mt-1 font-bold tracking-tight">
                  Angela & Jesse Klayman
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Farm Values */}
      <section className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-600/15 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              label="What Drives Us"
              title="Our Values"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(
              [
                {
                  Icon: Leaf,
                  title: 'Regenerative Agriculture',
                  desc: 'We practice sustainable farming methods that restore the land while producing the highest quality food.',
                },
                {
                  Icon: Eye,
                  title: 'Full Transparency',
                  desc: '"Full transparency is our policy." We encourage you to ask questions and come see the animals before processing.',
                  featured: true,
                },
                {
                  Icon: Heart,
                  title: 'Compassionate Care',
                  desc: 'As nurses, we bring medical-grade care to every animal. Our livestock receives the same love and attention we give to patients.',
                },
              ] as { Icon: LucideIcon; title: string; desc: string; featured?: boolean }[]
            ).map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 120}>
                <Card className="text-center h-full" featured={value.featured} glow>
                  <div className="w-10 h-10 rounded-lg bg-sage-600/30 border border-gold-500/15 flex items-center justify-center mx-auto mb-5">
                    <value.Icon className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-display text-xl text-ink-900 mb-3 tracking-tight">
                    {value.title}
                  </h3>
                  <p className="text-ink-700/60 text-sm leading-relaxed font-light">
                    {value.desc}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-28 relative ambient-glow">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <SectionHeading
              label="Find Us"
              title="Visit the Farm"
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card className="p-0 overflow-hidden">
              <div className="aspect-[16/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2929.8!2d-72.1!3d42.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDI1JzQ4LjAiTiA3MsKwMDYnMDAuMCJX!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Moonlight Run Farm Location"
                />
              </div>
              <div className="p-7">
                <address className="not-italic text-ink-800/70 font-light">
                  <strong className="text-ink-900 font-display text-lg font-bold tracking-tight block mb-1">
                    Moonlight Run Farm LLC
                  </strong>
                  1140 South Street, Barre, MA 01005
                  <br />
                  <span className="badge-gold mt-3 inline-flex text-xs">By appointment only</span>
                </address>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="text-center mt-10 relative z-10">
              <Button variant="secondary" href="/inquiry">
                Schedule a Visit
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
