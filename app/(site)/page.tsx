import { HeroSection } from "@/components/home/hero-section"
import { AboutPreview } from "@/components/home/about-preview"
import { ServicesPreview } from "@/components/home/services-preview"
import { DonationCta } from "@/components/home/donation-cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ServicesPreview />
      <DonationCta />
    </>
  )
}
