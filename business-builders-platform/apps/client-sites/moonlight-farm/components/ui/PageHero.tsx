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
    <section className="relative py-20 sm:py-28 overflow-hidden min-h-[40vh] sm:min-h-[45vh] flex items-center">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        style={{ objectPosition: imagePosition }}
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-meadow-50 via-meadow-50/75 via-[35%] to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(78,55,42,0.38) 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <p className="text-label mb-5 animate-reveal delay-1">{label}</p>
        <h1 className="text-display text-4xl sm:text-5xl lg:text-7xl mb-5 sm:mb-6 animate-reveal delay-2">
          {title}
        </h1>
        <p className="text-cream-100 text-base sm:text-xl font-light max-w-2xl leading-relaxed animate-reveal delay-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          {description}
        </p>
      </div>
    </section>
  )
}
