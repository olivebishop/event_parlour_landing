"use client"

import Link from "next/link"
import content from "@/lib/content"
import type { CategoryKey } from "@/lib/data/features"
import { getFeaturesForCategory } from "@/lib/features-content"
import {
  attendeeFeatureCatalog,
  featureHref,
  organizerFeatureCatalog,
} from "@/lib/feature-catalog"
import { FeatureBlock } from "@/components/features/feature-block"
import { FeatureCategoryCtaBanner } from "@/components/marketing/feature-category-cta-banner"
import { PixelLabel } from "@/components/shared/pixel-label"

export function FeatureCategoryView({
  category,
  showOverviewHeader = true,
}: {
  category: CategoryKey
  showOverviewHeader?: boolean
}) {
  const copy = content.FeaturesSection
  const features = getFeaturesForCategory(category)
  const catalog =
    category === "organizers"
      ? organizerFeatureCatalog
      : attendeeFeatureCatalog

  return (
    <section className="overflow-hidden bg-background py-12 xs:py-16 sm:py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        {showOverviewHeader ? (
          <div className="mb-10 text-center xs:mb-12 sm:mb-16 md:mb-20">
            <PixelLabel
              tone="soft"
              as="p"
              className="mb-3 xs:mb-4"
            >
              {copy.sectionLabel}
            </PixelLabel>
            <h1 className="mb-4 px-1 text-xl font-bold text-balance text-foreground xs:mb-5 xs:text-2xl sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
              {copy.tabs[category]}
            </h1>
            <p className="mx-auto max-w-xs px-2 text-[0.9375rem] leading-relaxed text-foreground/75 xs:max-w-sm xs:text-base sm:max-w-xl sm:text-lg md:max-w-2xl">
              {copy.subtitle}
            </p>
          </div>
        ) : null}

        <nav
          aria-label={`${copy.tabs[category]} sections`}
          className="mb-10 flex flex-wrap gap-2 xs:mb-12 sm:mb-14"
        >
          {catalog.map((entry) => (
            <Link
              key={entry.slug}
              href={featureHref(category, entry.slug)}
              className="border border-border bg-background px-2.5 py-1.5 font-body text-xs text-foreground/75 transition-[border-color,color,background-color] duration-200 hover:border-foreground/30 hover:bg-muted/50 hover:text-foreground sm:text-sm"
            >
              {entry.navTitle}
            </Link>
          ))}
        </nav>

        <div className="mx-auto max-w-7xl">
          {features.map((feature, index) => (
            <FeatureBlock
              key={catalog[index]?.slug ?? feature.label}
              sectionId={catalog[index]?.slug}
              feature={feature}
              index={index}
              isReversed={index % 2 === 1}
              includesText={copy.includes}
              activeText={copy.active}
            />
          ))}
        </div>

        <FeatureCategoryCtaBanner category={category} />
      </div>
    </section>
  )
}
