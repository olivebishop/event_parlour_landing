import type { Metadata } from "next"
import content from "@/lib/content"
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell"
import { FeatureCategoryView } from "@/components/features/feature-category-view"
import { FeaturePageIntro } from "@/components/features/feature-page-intro"

export const revalidate = 300

const copy = content.FeaturesSection
const siteUrl = "https://www.eventparlour.com"

export const metadata: Metadata = {
  title: "Features for attendees",
  description:
    "Discover events in Nairobi, manage tickets, and stay connected with the experiences you care about.",
  alternates: { canonical: `${siteUrl}/features/attendees` },
  openGraph: {
    images: [
      { url: `${siteUrl}/og/features/attendees`, width: 1200, height: 630 },
    ],
  },
  twitter: {
    images: [`${siteUrl}/og/features/attendees`],
  },
}

export default function AttendeesFeaturesPage() {
  return (
    <MarketingPageShell>
      <FeaturePageIntro
        category="attendees"
        eyebrow={copy.sectionLabel}
        title="For attendees"
        titleAccent="discover, ticket, and show up"
        description="Find events you'll love, keep tickets in one place, and never miss what matters."
      />
      <FeatureCategoryView category="attendees" showOverviewHeader={false} />
    </MarketingPageShell>
  )
}
