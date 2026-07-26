"use client"

import Link from "next/link"
import { FeatureBlock } from "@/components/features/feature-block"
import { MarketingCtaBanner } from "@/components/marketing/marketing-cta-banner"
import {
  getAllPlatformFeatures,
  getPlatformFeaturesCopy,
  getPlatformFeatureBySlug,
} from "@/lib/platform-features-content"
import {
  platformFeatureCatalog,
  platformFeatureHref,
} from "@/lib/platform-feature-catalog"
import { appHref } from "@/lib/app-url"

export function PlatformFeatureDetail({
  slug,
}: {
  slug: string
}) {
  const data = getPlatformFeatureBySlug(slug)
  const copy = getPlatformFeaturesCopy()

  if (!data) return null

  const { feature } = data

  return (
    <section className="overflow-x-clip bg-background pt-24 pb-12 xs:pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-28 lg:pb-36">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <FeatureBlock
            sectionId={slug}
            feature={feature}
            index={0}
            isReversed={false}
            includesText={copy.includes}
            activeText={copy.active}
            useDesignedVisual
            asPageHeading
          />
        </div>

        <div className="mt-14 xs:mt-16 sm:mt-20 md:mt-24">
          <MarketingCtaBanner
            eyebrow={copy.cta.eyebrow}
            kicker={copy.cta.kicker}
            title={copy.cta.title}
            description={copy.cta.description}
            panelLine={copy.cta.panelLine}
            primaryHref={appHref("/auth/sign-up")}
            primaryLabel={copy.cta.primaryLabel}
            secondaryHref={copy.cta.secondaryHref}
            secondaryLabel={copy.cta.secondaryLabel}
            hint={copy.cta.hint}
            primaryExternal
          />
        </div>
      </div>
    </section>
  )
}

export function PlatformFeaturesIndex() {
  const copy = getPlatformFeaturesCopy()
  const features = getAllPlatformFeatures()

  return (
    <section className="overflow-x-clip bg-background pt-4 pb-12 xs:pb-16 sm:pt-6 sm:pb-20 md:pb-28 lg:pb-36">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {platformFeatureCatalog.map((entry, index) => {
            const feature = features[index]
            if (!feature) return null
            return (
              <li key={entry.slug}>
                <Link
                  href={platformFeatureHref(entry.slug)}
                  className="group block p-5 transition-colors duration-200 hover:bg-muted/40 sm:p-6"
                >
                  <p className="font-body text-base font-medium text-foreground sm:text-lg">
                    {entry.navTitle}
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-foreground/75">
                    {entry.navDescription}
                  </p>
                  <span className="mt-4 inline-block font-body text-sm text-foreground/80 underline-offset-4 group-hover:text-foreground group-hover:underline">
                    Read more →
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-3 pt-2 sm:flex-row sm:gap-6">
          <Link
            href="/features/organizers"
            className="font-body text-sm text-foreground underline-offset-4 hover:underline"
          >
            For organizers — workspace & tools →
          </Link>
          <Link
            href="/features/attendees"
            className="font-body text-sm text-foreground underline-offset-4 hover:underline"
          >
            For attendees — discover & tickets →
          </Link>
        </div>
      </div>
    </section>
  )
}
