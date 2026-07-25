import Link from "next/link"
import { PixelLabel } from "@/components/shared/pixel-label"
import { MarketingGridPattern } from "@/components/marketing/marketing-grid-pattern"
import type { CategoryKey } from "@/lib/data/features"
import {
  attendeeFeatureCatalog,
  featureHref,
  organizerFeatureCatalog,
} from "@/lib/feature-catalog"

export function FeaturePageIntro({
  category,
  eyebrow,
  title,
  titleAccent,
  description,
}: {
  category: CategoryKey
  eyebrow: string
  title: string
  titleAccent?: string
  description: string
}) {
  const siblingCategory = category === "organizers" ? "attendees" : "organizers"
  const siblingLabel =
    category === "organizers" ? "For attendees" : "For organizers"

  return (
    <div className="relative pt-24 sm:pt-28 md:pt-32">
      <MarketingGridPattern className="opacity-60" />
      <div className="container relative mx-auto px-4 pb-10 sm:px-6 sm:pb-14 md:pb-16">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          <PixelLabel tone="soft">
            {eyebrow}
          </PixelLabel>
          <h1 className="font-heading text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-foreground">
            <span className="block">{title}</span>
            {titleAccent ? (
              <span className="mt-1 block text-foreground/70">
                {titleAccent}
              </span>
            ) : null}
          </h1>
          <p className="max-w-xl font-body text-[0.9375rem] leading-relaxed text-foreground/75 sm:text-base">
            {description}
          </p>
          <Link
            href={`/features/${siblingCategory}`}
            className="inline-flex font-body text-sm text-foreground underline-offset-4 hover:underline"
          >
            {siblingLabel} →
          </Link>
        </div>
      </div>
    </div>
  )
}

export function FeatureDetailIntro({
  category,
  label,
  title,
  description,
}: {
  category: CategoryKey
  label: string
  title: string
  description: string
}) {
  const catalog =
    category === "organizers"
      ? organizerFeatureCatalog
      : attendeeFeatureCatalog

  return (
    <div className="relative pt-24 sm:pt-28 md:pt-32">
      <MarketingGridPattern className="opacity-60" />
      <div className="container relative mx-auto px-4 pb-8 sm:px-6 sm:pb-10">
        <div className="max-w-3xl space-y-4">
          <PixelLabel tone="soft">
            {label}
          </PixelLabel>
          <h1 className="font-heading text-[clamp(1.65rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-foreground">
            {title}
          </h1>
          <p className="max-w-xl font-body text-[0.9375rem] leading-relaxed text-foreground/75 sm:text-base">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href={`/features/${category}`}
              className="font-body text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              All {category === "organizers" ? "organizer" : "attendee"}{" "}
              features
            </Link>
            {catalog.slice(0, 3).map((entry) => (
              <Link
                key={entry.slug}
                href={featureHref(category, entry.slug)}
                className="font-body text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {entry.navTitle}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
