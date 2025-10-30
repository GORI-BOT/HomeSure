import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
