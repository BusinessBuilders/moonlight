import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-0">
      {/* Top decorative divider */}
      <div className="glass-divider" />

      <div className="relative bg-forest-950/60">
        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-forest-800/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-5">
                <Image
                  src="/logo-white.png"
                  alt="Moonlight Run Farm LLC"
                  width={180}
                  height={60}
                  className="object-contain opacity-90"
                />
              </div>
              <p className="text-cream-300/60 text-sm leading-relaxed font-light">
                Highland Cattle & Specialty Animals
                <br />
                Barre, Massachusetts
              </p>
              <p className="text-cream-300/30 text-xs mt-4 italic font-display">
                &ldquo;Know your farmer, know your food!&rdquo;
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-label text-cream-300/50 mb-5">Navigate</h3>
              <nav className="flex flex-col gap-2.5">
                {[
                  { href: '/services', label: 'Our Services' },
                  { href: '/gallery', label: 'Photo Gallery' },
                  { href: '/store', label: 'Farm Store' },
                  { href: '/events', label: 'Events' },
                  { href: '/about', label: 'About Us' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-cream-300/50 hover:text-cream-100 text-sm transition-colors duration-300 w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-label text-cream-300/50 mb-5">Visit Us</h3>
              <address className="text-cream-300/60 text-sm not-italic leading-relaxed font-light">
                1140 South Street
                <br />
                Barre, MA 01005
              </address>
              <p className="mt-3">
                <span className="badge-gold text-[0.65rem]">By appointment only</span>
              </p>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-label text-cream-300/50 mb-5">Connect</h3>
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-[0_2px_12px_rgba(201,149,106,0.2)] mb-5"
              >
                Send Inquiry
              </Link>
              <div className="flex gap-2.5">
                <a
                  href="https://www.facebook.com/MoonlightRunFarmLLC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-cream-50/[0.03] border border-cream-300/10 flex items-center justify-center text-cream-300/40 hover:text-cream-100 hover:border-cream-300/25 hover:bg-cream-50/[0.06] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/moonlightrunfarm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-cream-50/[0.03] border border-cream-300/10 flex items-center justify-center text-cream-300/40 hover:text-cream-100 hover:border-cream-300/25 hover:bg-cream-50/[0.06] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="glass-divider mt-14 mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-cream-300/25 text-xs font-light">
              &copy; {currentYear} Moonlight Run Farm LLC
            </p>
            <p className="text-cream-300/15 text-xs font-light">
              Built by{' '}
              <a
                href="https://business-builder.online"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream-300/40 transition-colors duration-300"
              >
                Business Builders
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
