import { HeroSection } from "@/components/home/hero-section"
import { AboutPreview } from "@/components/home/about-preview"
import { ServicesPreview } from "@/components/home/services-preview"
import { ImpactStats } from "@/components/home/impact-stats"
import { DonationCta } from "@/components/home/donation-cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ServicesPreview />
      <ImpactStats />
      <DonationCta />
    </>
  )
}
