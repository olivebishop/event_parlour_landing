import type { Metadata } from "next"
import dynamic from "next/dynamic"
import content from "@/lib/content"
import { appHref } from "@/lib/app-url"
import { MarketingCtaBanner } from "@/components/marketing/marketing-cta-banner"
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero"
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell"
import { SectionSkeleton } from "@/components/shared/section-skeleton"

export const revalidate = 300

const Testimonials = dynamic(
  () => import("@/components/shared/Testimonials"),
  { loading: () => <SectionSkeleton className="min-h-[360px] w-full" /> },
)

const siteUrl = "https://www.eventparlour.com"
const copy = content.Testimonials

export const metadata: Metadata = {
  title: "Why Us — What organizers and builders say",
  description:
    "Real feedback from engineers, creators, and organizers who use Event Parlour to sell tickets and run events.",
  alternates: { canonical: `${siteUrl}/why-us` },
  openGraph: {
    images: [{ url: `${siteUrl}/og/why-us`, width: 1200, height: 630 }],
  },
  twitter: {
    images: [`${siteUrl}/og/why-us`],
  },
}

export default function WhyUsPage() {
  const cta = copy.cta

  return (
    <MarketingPageShell>
      <MarketingPageHero
        eyebrow={copy.sectionLabel}
        title={copy.title}
        titleAccent={copy.subtitle}
        description={copy.pageDescription}
      />

      <section
        id="why-us"
        className="relative z-20 scroll-mt-24 py-10 sm:py-14 md:py-16 lg:py-20"
      >
        <Testimonials showHeader={false} />
      </section>

      <section
        aria-labelledby="why-us-cta-heading"
        className="container relative z-20 mx-auto px-4 pb-16 xs:px-5 sm:px-6 sm:pb-20 md:pb-24 lg:pb-28"
      >
        <MarketingCtaBanner
          id="why-us-cta-heading"
          eyebrow={cta.eyebrow}
          kicker={cta.kicker}
          title={cta.title}
          description={cta.description}
          panelLine={cta.panelLine}
          primaryHref={appHref("/auth/sign-up")}
          primaryLabel={cta.primaryLabel}
          primaryExternal
          secondaryHref={cta.secondaryHref}
          secondaryLabel={cta.secondaryLabel}
          hint={cta.hint}
        />
      </section>
    </MarketingPageShell>
  )
}
