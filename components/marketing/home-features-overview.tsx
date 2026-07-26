import Link from "next/link"
import content from "@/lib/content"
import {
  attendeeFeatureCatalog,
  featureHref,
  organizerFeatureCatalog,
} from "@/lib/feature-catalog"
import { PixelLabel } from "@/components/shared/pixel-label"

export function HomeFeaturesOverview() {
  const copy = content.FeaturesSection

  return (
    <section
      aria-labelledby="home-features-heading"
      className="relative z-20 py-14 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 max-w-2xl space-y-3 sm:mb-10">
          <PixelLabel tone="soft" as="p">
            {copy.sectionLabel}
          </PixelLabel>
          <h2
            id="home-features-heading"
            className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Everything you need to run and discover events
          </h2>
          <p className="font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2">
          <FeatureHubCard
            title={copy.tabs.organizers}
            href="/features/organizers"
            items={organizerFeatureCatalog.slice(0, 4)}
            category="organizers"
          />
          <FeatureHubCard
            title={copy.tabs.attendees}
            href="/features/attendees"
            items={attendeeFeatureCatalog}
            category="attendees"
          />
        </div>
      </div>
    </section>
  )
}

function FeatureHubCard({
  title,
  href,
  items,
  category,
}: {
  title: string
  href: string
  items: typeof organizerFeatureCatalog
  category: "organizers" | "attendees"
}) {
  return (
    <div className="bg-background p-6 sm:p-8">
      <Link
        href={href}
        className="font-heading text-lg font-semibold text-foreground hover:underline sm:text-xl"
      >
        {title}
      </Link>
      <ul className="mt-4 space-y-2">
        {items.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={featureHref(category, entry.slug)}
              className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {entry.navTitle}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-5 inline-block font-body text-sm text-foreground"
      >
        View all →
      </Link>
    </div>
  )
}
