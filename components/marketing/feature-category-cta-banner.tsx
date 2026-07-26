import content from "@/lib/content"
import type { CategoryKey } from "@/lib/data/features"
import { categoryHubHref } from "@/lib/feature-catalog"
import { appHref } from "@/lib/app-url"
import { MarketingCtaBanner } from "@/components/marketing/marketing-cta-banner"
import { cn } from "@/lib/utils"

const siblingMeta: Record<
  CategoryKey,
  {
    target: CategoryKey
    copyKey: "toAttendees" | "toOrganizers"
  }
> = {
  organizers: {
    target: "attendees",
    copyKey: "toAttendees",
  },
  attendees: {
    target: "organizers",
    copyKey: "toOrganizers",
  },
}

export function FeatureCategoryCtaBanner({
  category,
  className,
}: {
  category: CategoryKey
  className?: string
}) {
  const section = content.FeaturesSection
  const cta = section.siblingCta
  const meta = siblingMeta[category]
  const block = cta[meta.copyKey]

  return (
    <MarketingCtaBanner
      id="feature-sibling-cta-heading"
      className={cn(
        "mt-14 xs:mt-16 sm:mt-20 md:mt-24",
        className,
      )}
      eyebrow={cta.eyebrow}
      kicker={block.kicker}
      title={block.title}
      description={block.description}
      panelLine={block.panelLine}
      primaryHref={categoryHubHref(meta.target)}
      primaryLabel={block.button}
      secondaryHref={appHref("/auth/sign-up")}
      secondaryLabel={cta.appButton}
      secondaryExternal
      hint={cta.appHint}
    />
  )
}
