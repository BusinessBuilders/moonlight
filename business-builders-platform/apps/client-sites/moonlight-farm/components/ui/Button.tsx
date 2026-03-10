import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  icon?: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-forest-700 text-cream-50 hover:bg-forest-600 border border-forest-600/60 shadow-[0_4px_20px_rgba(45,106,79,0.3)] hover:shadow-[0_8px_30px_rgba(45,106,79,0.4)]',
  secondary:
    'bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 font-semibold border border-gold-400/40 shadow-[0_4px_20px_rgba(201,149,106,0.25)] hover:shadow-[0_8px_30px_rgba(201,149,106,0.4)] hover:from-gold-400 hover:to-gold-500',
  outline:
    'bg-transparent text-cream-100 border border-cream-300/20 hover:border-cream-300/50 hover:bg-cream-50/[0.03] backdrop-blur-sm',
  ghost:
    'bg-transparent text-cream-200 hover:text-cream-50 hover:bg-forest-800/20 border border-transparent',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs tracking-wide gap-2',
  md: 'px-7 py-3 text-sm tracking-wide gap-2',
  lg: 'px-9 py-4 text-base tracking-wide gap-3',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, href, icon, ...props }, ref) => {
    const classes = `
      inline-flex items-center justify-center rounded-xl
      font-body font-medium
      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
      cursor-pointer active:scale-[0.97]
      ${variantClasses[variant]} ${sizeClasses[size]} ${className}
    `.trim().replace(/\s+/g, ' ')

    const content = (
      <>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </>
    )

    if (href) {
      return (
        <a href={href} className={classes}>
          {content}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'
