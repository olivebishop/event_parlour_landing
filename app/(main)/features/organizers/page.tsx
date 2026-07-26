import type { Metadata } from "next"
import content from "@/lib/content"
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell"
import { FeatureCategoryView } from "@/components/features/feature-category-view"
import { FeaturePageIntro } from "@/components/features/feature-page-intro"

export const revalidate = 300

const copy = content.FeaturesSection
const siteUrl = "https://www.eventparlour.com"

export const metadata: Metadata = {
  title: "Features for organizers",
  description: copy.subtitle,
  alternates: { canonical: `${siteUrl}/features/organizers` },
  openGraph: {
    images: [
      { url: `${siteUrl}/og/features/organizers`, width: 1200, height: 630 },
    ],
  },
  twitter: {
    images: [`${siteUrl}/og/features/organizers`],
  },
}

export default function OrganizersFeaturesPage() {
  return (
    <MarketingPageShell>
      <FeaturePageIntro
        category="organizers"
        eyebrow={copy.sectionLabel}
        title="For organizers"
        titleAccent="reach, sell, and run the room"
        description={copy.subtitle}
      />
      <FeatureCategoryView category="organizers" showOverviewHeader={false} />
    </MarketingPageShell>
  )
}
