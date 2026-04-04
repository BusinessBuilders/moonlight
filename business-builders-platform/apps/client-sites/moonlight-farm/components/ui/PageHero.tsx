import Image from 'next/image'

interface PageHeroProps {
  image: string
  imageAlt: string
  label: string
  title: string | React.ReactNode
  description: string
  imagePosition?: string
}

export function PageHero({
  image,
  imageAlt,
  label,
  title,
  description,
  imagePosition = 'center',
}: PageHeroProps) {
  return (
    <section className="relative py-28 overflow-hidden min-h-[45vh] flex items-center">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        style={{ objectPosition: imagePosition }}
        sizes="100vw"
      />

      {/* 4-layer gradient system for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-950/40 via-[25%] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/85 via-[40%] to-transparent" />
      <div className="absolute inset-0 bg-forest-950/30 mix-blend-multiply" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(10,26,18,0.6) 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <p className="text-label text-gold-400/80 mb-5 animate-reveal delay-1">{label}</p>
        <h1 className="text-display text-5xl sm:text-6xl lg:text-7xl text-cream-50 mb-6 animate-reveal delay-2">
          {title}
        </h1>
        <p className="text-cream-200/60 text-xl font-light max-w-2xl leading-relaxed animate-reveal delay-3">
          {description}
        </p>
      </div>
    </section>
  )
}
