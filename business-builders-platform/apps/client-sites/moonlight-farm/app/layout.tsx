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
    'Scottish Highland Cattle',
    'farm',
    'Barre MA',
    'grass-fed beef',
    'petting zoo',
    'livestock transport',
    'farm products',
    'Moonlight Run Farm',
    'regenerative agriculture',
    'farm fresh eggs',
    'Nigerian Dwarf Goats',
    'llamas',
    'alpaca',
    'dog boarding',
    'livestock services',
    'farm events',
    'mobile petting zoo',
  ],
  metadataBase: new URL('https://moonlightrunfarm.com'),
  openGraph: {
    title: 'Moonlight Run Farm LLC',
    description:
      'Highland Cattle & Specialty Animals — Barre, MA. Know your farmer, know your food!',
    url: 'https://moonlightrunfarm.com',
    siteName: 'Moonlight Run Farm LLC',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Highland Cattle at Moonlight Run Farm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moonlight Run Farm LLC',
    description: 'Highland Cattle & Specialty Animals — Barre, MA',
    images: ['/banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://moonlightrunfarm.com',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Moonlight Run Farm LLC',
  description:
    'Scottish Highland Cattle, specialty animals, farm products, and agricultural services in Barre, MA.',
  url: 'https://moonlightrunfarm.com',
  image: 'https://moonlightrunfarm.com/banner.jpg',
  telephone: '',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1140 South Street',
    addressLocality: 'Barre',
    addressRegion: 'MA',
    postalCode: '01005',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.43,
    longitude: -72.1,
  },
  sameAs: [
    'https://www.facebook.com/MoonlightRunFarmLLC',
    'https://www.instagram.com/moonlightrunfarm',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    description: 'By appointment only',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
