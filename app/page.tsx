import { ComparisonDashboard } from '@/components/comparison-dashboard'
import { ExampleDecisions } from '@/components/example-decisions'
import { Features } from '@/components/features'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { ReasoningPreview } from '@/components/reasoning-preview'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Testimonials } from '@/components/testimonials'
import { TrustSection } from '@/components/trust-section'
import { UploadSection } from '@/components/upload-section'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <UploadSection />
        <Features />
        <HowItWorks />
        <ExampleDecisions />
        <ReasoningPreview />
        <ComparisonDashboard />
        <Testimonials />
        <TrustSection />
      </main>
      <SiteFooter />
    </>
  )
}
