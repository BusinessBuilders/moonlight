'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/store', label: 'Farm Store' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'bg-cream-50/95 backdrop-blur-2xl border-b border-gold-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.08)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo — white on banner, dark on scroll */}
            <Link href="/" className="flex items-center group relative">
              <Image
                src="/logo-white.png"
                alt="Moonlight Run Farm"
                width={200}
                height={75}
                className={`h-14 w-auto transition-all duration-500 group-hover:opacity-90 ${
                  scrolled ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
                priority
              />
              <Image
                src="/logo.png"
                alt="Moonlight Run Farm"
                width={200}
                height={75}
                className={`h-14 w-auto absolute top-0 left-0 transition-all duration-500 group-hover:opacity-90 ${
                  scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-[0.82rem] font-medium transition-all duration-500 relative ${
                      scrolled
                        ? isActive
                          ? 'text-ink-900'
                          : 'text-ink-900/70 hover:text-ink-900'
                        : isActive
                          ? 'text-ink-900'
                          : 'text-ink-800/80 hover:text-ink-900'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gold-500 rounded-full" />
                    )}
                  </Link>
                )
              })}
              <Link
                href="/inquiry"
                className={`ml-3 px-5 py-2.5 rounded-xl text-[0.82rem] font-semibold transition-all duration-500 ${
                  scrolled
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900 shadow-[0_2px_12px_rgba(201,149,106,0.25)] hover:shadow-[0_4px_20px_rgba(201,149,106,0.35)]'
                    : 'bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900 shadow-[0_2px_12px_rgba(201,149,106,0.25)] hover:shadow-[0_4px_20px_rgba(201,149,106,0.35)]'
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 transition-colors duration-500 ${
                scrolled ? 'text-ink-900 hover:text-ink-900' : 'text-ink-800 hover:text-ink-900'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${
                    isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-current transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${
                    isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-cream-50/98 backdrop-blur-2xl border-b border-gold-500/10">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-[0.95rem] font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-ink-900 bg-sage-600/5'
                      : 'text-ink-900/70 hover:text-ink-900 hover:bg-sage-600/5'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/inquiry"
              className="mt-2 px-4 py-3 rounded-xl text-center font-semibold bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900 hover:from-gold-400 hover:to-gold-500 transition-all shadow-[0_2px_12px_rgba(201,149,106,0.2)]"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
