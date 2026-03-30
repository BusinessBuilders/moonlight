import { HeroSection } from '@/components/sections/HeroSection'
import { AnimalsSection } from '@/components/sections/AnimalsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { FacebookSection } from '@/components/sections/FacebookSection'
import { CTASection } from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnimalsSection />
      <ServicesSection />
      <ProductsSection />
      <FacebookSection />
      <CTASection />
    </>
  )
}
