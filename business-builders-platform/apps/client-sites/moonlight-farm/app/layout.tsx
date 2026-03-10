import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Moonlight Run Farm LLC | Highland Cattle & Specialty Animals',
    template: '%s | Moonlight Run Farm LLC',
  },
  description:
    'Scottish Highland Cattle, specialty animals, farm products, and agricultural services in Barre, MA. Full transparency is our policy — know your farmer, know your food!',
  keywords: [
    'Highland Cattle',
    'farm',
    'Barre MA',
    'grass-fed beef',
    'petting zoo',
    'livestock transport',
    'farm products',
    'Moonlight Run Farm',
  ],
  openGraph: {
    title: 'Moonlight Run Farm LLC',
    description:
      'Highland Cattle & Specialty Animals — Barre, MA. Know your farmer, know your food!',
    url: 'https://moonlightrunfarm.com',
    siteName: 'Moonlight Run Farm LLC',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-forest-950 text-cream-50 font-body antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
