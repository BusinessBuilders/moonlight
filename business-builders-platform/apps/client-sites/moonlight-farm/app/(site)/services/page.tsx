import type { Metadata } from 'next'
import { Card, SectionHeading } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Livestock transport, petting zoos, educational programs, livestock services, dog boarding, and animal sales at Moonlight Run Farm.',
}

const services = [
  {
    title: 'Livestock & Equine Transport',
    slug: 'transport',
    icon: '🚛',
    description:
      'Professional livestock and equine hauling throughout New England. Safe, insured transport with experienced handlers who treat your animals with the same care we give our own.',
    branch: 'hauling',
    features: ['Fully insured', 'Experienced handlers', 'Local & regional', 'All livestock types'],
  },
  {
    title: 'Educational Programs',
    slug: 'education',
    icon: '📚',
    description:
      'Immersive farm education for schools, homeschool groups, scout troops, and families. Learn about regenerative agriculture, animal husbandry, and where your food comes from.',
    branch: 'events',
    features: ['School groups', 'Homeschool friendly', 'Hands-on learning', 'All ages welcome'],
  },
  {
    title: 'Petting Zoos',
    slug: 'petting-zoos',
    icon: '🎉',
    description:
      'We bring the farm to you! Perfect for corporate events, birthday parties, weddings, Bar/Bat Mitzvahs, Sweet 16s, and any special occasion. Our friendly animals are crowd favorites.',
    branch: 'events',
    featured: true,
    features: ['Mobile setup', 'Full supervision', 'All event types', 'Custom packages'],
  },
  {
    title: 'Livestock Services',
    slug: 'livestock-services',
    icon: '🐄',
    description:
      'As nurses by profession, we bring medical-grade care to our livestock services: hoof trimming, catching, sorting, ear tagging, castration, worming, and vaccination.',
    branch: 'general',
    features: ['Hoof trimming', 'Ear tagging', 'Vaccinations', 'Worming & castration'],
  },
  {
    title: 'Dog Boarding',
    slug: 'dog-boarding',
    icon: '🐕',
    description:
      'Your dogs enjoy a farm vacation! Safe, supervised stays with our experienced team and Great Pyrenees guardian dogs. Plenty of space to play and explore.',
    branch: 'general',
    features: ['Farm environment', 'Supervised outdoor time', 'Great Pyrenees companions', 'Personalized care'],
  },
  {
    title: 'Animal Sales',
    slug: 'animal-sales',
    icon: '🏷️',
    description:
      'Quality Scottish Highland Cattle, Nigerian Dwarf Goats, poultry, rabbits, and more. All animals are raised with love on our regenerative farm. We welcome farm visits before purchase.',
    branch: 'animal-sales',
    features: ['Highland Cattle', 'Llamas & Alpacas', 'Nigerian Dwarf Goats', 'Buyer/seller matching'],
  },
  {
    title: 'Special Events',
    slug: 'special-events',
    icon: '✨',
    description:
      'Host your next event at the farm or let us bring the farm experience to your venue. We create unforgettable memories with our beautiful animals and authentic farm setting.',
    branch: 'events',
    features: ['On-farm events', 'Mobile experience', 'Custom planning', 'All occasions'],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative py-28 overflow-hidden">
        <div className="absolute top-1/3 right-[5%] w-[400px] h-[400px] bg-forest-600/8 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-label text-gold-400/80 mb-5 animate-reveal delay-1">What We Do</p>
          <h1 className="text-display text-5xl sm:text-6xl lg:text-7xl text-cream-50 mb-6 animate-reveal delay-2">
            Our Services
          </h1>
          <p className="text-cream-200/60 text-xl font-light max-w-2xl leading-relaxed animate-reveal delay-3">
            From livestock transport to farm events — every service is delivered with the care and
            expertise of experienced farmers and nurses.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 ambient-glow relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-5">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 80}>
                <Card featured={service.featured} glow>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex items-start gap-4 lg:w-1/2">
                      <span className="text-4xl flex-shrink-0">{service.icon}</span>
                      <div>
                        <h2 className="text-display text-2xl text-cream-50 mb-3 tracking-tight">
                          {service.title}
                        </h2>
                        <p className="text-cream-300/60 text-sm leading-relaxed font-light">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="lg:w-1/2 lg:pl-8 lg:border-l lg:border-forest-600/10">
                      <div className="grid grid-cols-2 gap-2 mb-5">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-cream-300/50 text-sm">
                            <span className="w-1 h-1 rounded-full bg-gold-500/50 flex-shrink-0" />
                            <span className="font-light">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" href={`/inquiry?branch=${service.branch}`}>
                        Inquire About This Service
                      </Button>
                    </div>
                  </div>
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
            <p className="text-label text-gold-400/60 mb-5">Not Sure What You Need?</p>
            <h2 className="text-display text-4xl sm:text-5xl text-cream-50 mb-6">
              We&apos;ll Help You
              <br />
              <span className="gradient-text">Figure It Out</span>
            </h2>
            <p className="text-cream-200/50 text-lg font-light mb-10 leading-relaxed">
              Our smart inquiry system asks the right questions and routes your request to Jesse directly.
            </p>
            <Button variant="secondary" size="lg" href="/inquiry">
              Start an Inquiry
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
