import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell"
import { PlatformFeatureIntro } from "@/components/features/platform-feature-intro"
import { PlatformFeatureDetail } from "@/components/features/platform-feature-pages"
import {
  getAllPlatformFeatureSlugs,
  getPlatformFeatureBySlug,
} from "@/lib/platform-features-content"

export const revalidate = 300

const siteUrl = "https://www.eventparlour.com"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPlatformFeatureSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = getPlatformFeatureBySlug(slug)
  if (!data) {
    return { title: "Feature not found" }
  }

  return {
    title: data.catalog.navTitle,
    description: data.feature.description,
    alternates: { canonical: `${siteUrl}/features/${slug}` },
    openGraph: {
      images: [
        { url: `${siteUrl}/og/features/${slug}`, width: 1200, height: 630 },
      ],
    },
    twitter: {
      images: [`${siteUrl}/og/features/${slug}`],
    },
  }
}

export default async function PlatformFeaturePage({ params }: PageProps) {
  const { slug } = await params
  const data = getPlatformFeatureBySlug(slug)
  if (!data) notFound()

  return (
    <MarketingPageShell>
      <PlatformFeatureIntro slug={slug} />
      <PlatformFeatureDetail slug={slug} />
    </MarketingPageShell>
  )
}
