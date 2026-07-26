/** Standout product pillars — navbar + /features/[slug] (not org/attendee module lists). */

export type PlatformFeatureCatalogEntry = {
  slug: string
  contentKey: string
  navTitle: string
  navDescription: string
}

export const platformFeatureCatalog: PlatformFeatureCatalogEntry[] = [
  {
    slug: "distribution",
    contentKey: "distribution",
    navTitle: "Marketplace & updates",
    navDescription: "Discovery, announcements, and event updates in one feed.",
  },
  {
    slug: "workspace",
    contentKey: "workspace",
    navTitle: "Workspace & storefront",
    navDescription: "Invite your team and run events on your own URL.",
  },
  {
    slug: "pricing",
    contentKey: "pricing",
    navTitle: "Pricing & split pay",
    navDescription: "5% on paid tickets—split payments, clear totals.",
  },
  {
    slug: "tickets-and-channels",
    contentKey: "ticketsAndChannels",
    navTitle: "Tickets & channels",
    navDescription: "Transfers, QR entry, and event channels in-app.",
  },
  {
    slug: "community",
    contentKey: "community",
    navTitle: "Community promotion",
    navDescription: "Reach fans on Instagram, WhatsApp, and X with us.",
  },
  {
    slug: "analytics",
    contentKey: "analytics",
    navTitle: "Geo analytics",
    navDescription: "Detailed, location-aware insights—Google-grade depth.",
  },
]

export function platformFeatureHref(slug: string) {
  return `/features/${slug}`
}

export function getPlatformCatalogEntry(slug: string) {
  return platformFeatureCatalog.find((entry) => entry.slug === slug)
}

export function getAllPlatformFeatureSlugs() {
  return platformFeatureCatalog.map((entry) => entry.slug)
}
