import type { Metadata } from "next"
import content from "@/lib/content"
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell"
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero"
import { PlatformFeaturesIndex } from "@/components/features/platform-feature-pages"

export const revalidate = 300

const copy = content.PlatformFeatures.index
const siteUrl = "https://www.eventparlour.com"

export const metadata: Metadata = {
  title: "Features",
  description: copy.description,
  alternates: { canonical: `${siteUrl}/features` },
  openGraph: {
    images: [{ url: `${siteUrl}/og/features`, width: 1200, height: 630 }],
  },
  twitter: {
    images: [`${siteUrl}/og/features`],
  },
}

export default function FeaturesIndexPage() {
  return (
    <MarketingPageShell>
      <MarketingPageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <PlatformFeaturesIndex />
    </MarketingPageShell>
  )
}
