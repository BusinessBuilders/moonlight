interface CardProps {
  children: React.ReactNode
  className?: string
  featured?: boolean
  hover?: boolean
  glow?: boolean
}

export function Card({ children, className = '', featured = false, hover = true, glow = false }: CardProps) {
  const baseClass = featured ? 'glass-card-featured' : 'glass-card'
  const hoverClass = hover ? '' : '!transform-none'
  const glowClass = glow ? 'glow-hover' : ''

  return (
    <div className={`${baseClass} ${hoverClass} ${glowClass} rounded-2xl p-7 ${className}`}>
      {children}
    </div>
  )
}

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ label, title, description, align = 'center', className = '' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`mb-14 max-w-2xl ${alignClass} ${className}`}>
      {label && (
        <p className="text-label text-gold-400 mb-4 animate-reveal">
          {label}
        </p>
      )}
      <h2 className="text-display text-4xl sm:text-5xl text-cream-50 mb-5 animate-reveal delay-1">
        {title}
      </h2>
      {description && (
        <p className="text-cream-300/80 text-lg font-light leading-relaxed animate-reveal delay-2">
          {description}
        </p>
      )}
    </div>
  )
}
