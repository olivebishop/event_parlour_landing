import type { CategoryKey } from "@/lib/data/features"

export type FeatureCatalogEntry = {
  slug: string
  contentKey: string
  navTitle: string
  navDescription: string
}

export const organizerFeatureCatalog: FeatureCatalogEntry[] = [
  {
    slug: "reach",
    contentKey: "reach",
    navTitle: "Marketplace reach",
    navDescription: "Get discovered by event-goers.",
  },
  {
    slug: "discovery",
    contentKey: "discovery",
    navTitle: "Smart discovery",
    navDescription: "Match the right audience to your event.",
  },
  {
    slug: "events",
    contentKey: "events",
    navTitle: "Event creation",
    navDescription: "Create events that sell out.",
  },
  {
    slug: "dashboard",
    contentKey: "dashboard",
    navTitle: "Dashboard",
    navDescription: "Manage everything in one workspace.",
  },
  {
    slug: "speakers",
    contentKey: "speakers",
    navTitle: "Speakers",
    navDescription: "Book and coordinate talent.",
  },
  {
    slug: "analytics",
    contentKey: "analytics",
    navTitle: "Analytics",
    navDescription: "Real-time growth insights.",
  },
  {
    slug: "payments",
    contentKey: "payments",
    navTitle: "Payments",
    navDescription: "Track sales and automate payouts.",
  },
  {
    slug: "post-event",
    contentKey: "postEvent",
    navTitle: "Post-event",
    navDescription: "Recaps, photos, and follow-up.",
  },
]

export const attendeeFeatureCatalog: FeatureCatalogEntry[] = [
  {
    slug: "discover",
    contentKey: "discover",
    navTitle: "Discover events",
    navDescription: "Find events you'll love.",
  },
  {
    slug: "local",
    contentKey: "local",
    navTitle: "Near you",
    navDescription: "Local events on your map.",
  },
  {
    slug: "tickets",
    contentKey: "tickets",
    navTitle: "Tickets",
    navDescription: "Wallet, QR entry, transfers.",
  },
  {
    slug: "network",
    contentKey: "network",
    navTitle: "Network",
    navDescription: "Connect with fellow fans.",
  },
  {
    slug: "alerts",
    contentKey: "alerts",
    navTitle: "Alerts",
    navDescription: "Never miss a drop or reminder.",
  },
]

export function categoryHubHref(category: CategoryKey) {
  return `/features/${category}`
}

/** In-page section on the organizers or attendees feature page. */
export function featureHref(category: CategoryKey, slug?: string) {
  const base = categoryHubHref(category)
  return slug ? `${base}#${slug}` : base
}

export function getCatalogEntry(
  category: CategoryKey,
  slug: string,
): FeatureCatalogEntry | undefined {
  const list =
    category === "organizers"
      ? organizerFeatureCatalog
      : attendeeFeatureCatalog
  return list.find((entry) => entry.slug === slug)
}

export function getAllFeatureSlugs(category: CategoryKey) {
  const list =
    category === "organizers"
      ? organizerFeatureCatalog
      : attendeeFeatureCatalog
  return list.map((entry) => entry.slug)
}
