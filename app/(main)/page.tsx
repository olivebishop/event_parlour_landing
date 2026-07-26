import type { Metadata } from "next"
import dynamic from "next/dynamic"
import content from "@/lib/content"
import { appHref } from "@/lib/app-url"
import Hero from "@/components/shared/Hero"
import { MarketingCtaBanner } from "@/components/marketing/marketing-cta-banner"
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell"
import { SectionSkeleton } from "@/components/shared/section-skeleton"

export const revalidate = 300

const InteractiveDemo = dynamic(
  () => import("@/components/shared/InteractiveDemo"),
  { loading: () => <SectionSkeleton className="min-h-[640px] w-full" /> },
)

const ExpandingCards = dynamic(
  () => import("@/components/shared/animations/expanding-cards"),
  { loading: () => <SectionSkeleton className="min-h-[280px] w-full" /> },
)

const DistributionMetrics = dynamic(
  () => import("@/components/shared/DistributionMetrics"),
  { loading: () => <SectionSkeleton className="min-h-[200px] w-full" /> },
)

const siteUrl = "https://www.eventparlour.com"

export const metadata: Metadata = {
  title: "Event Parlour - Reach Thousands of Event-Goers in Nairobi",
  description:
    "Get your events in front of the right audience. We connect organizers with active event-goers looking for experiences like yours. Distribution first. Management included.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    images: [{ url: `${siteUrl}/og`, width: 1200, height: 630 }],
  },
  twitter: {
    images: [`${siteUrl}/og`],
  },
}

export default function Home() {
  const cta = content.HomePage.cta

  return (
    <MarketingPageShell>
      <section className="relative z-10">
        <Hero />
      </section>

      <section
        id="demo"
        aria-labelledby="demo-heading"
        className="relative z-20 scroll-mt-[4.5rem] sm:scroll-mt-24"
      >
        <InteractiveDemo />
      </section>

      <section
        id="user-types"
        className="relative z-20 mt-8 scroll-mt-[4.5rem] sm:mt-10 sm:scroll-mt-24 md:mt-12 lg:mt-16"
      >
        <ExpandingCards />
      </section>

      <section className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16">
        <DistributionMetrics />
      </section>

      <section
        aria-labelledby="home-cta-heading"
        className="container relative z-20 mx-auto mt-12 px-4 pb-10 xs:mt-14 xs:px-5 sm:mt-16 sm:px-6 sm:pb-12 md:mt-20 md:pb-14 lg:mt-24 lg:pb-16"
      >
        <MarketingCtaBanner
          id="home-cta-heading"
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
