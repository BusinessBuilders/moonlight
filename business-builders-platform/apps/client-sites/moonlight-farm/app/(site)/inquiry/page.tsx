import type { Metadata } from 'next'
import { Suspense } from 'react'
import { InquiryWizard } from '@/components/inquiry/InquiryWizard'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Send an inquiry to Moonlight Run Farm. Animal sales, events, livestock transport, and general questions.',
}

export default function InquiryPage() {
  return (
    <>
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display text-5xl text-cream-50 mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">How Can We Help You?</h1>
          <p className="text-cream-100/85 text-xl max-w-2xl mx-auto font-light">
            Select the option that best describes your inquiry and we&apos;ll guide you through the process.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-12 text-forest-600">Loading inquiry form...</div>}>
            <InquiryWizard />
          </Suspense>
        </div>
      </section>
    </>
  )
}
