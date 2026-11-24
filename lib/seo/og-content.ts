import content from "@/lib/content"
import {
  getAllPlatformFeatureSlugs,
  getPlatformFeatureBySlug,
} from "@/lib/platform-features-content"
import { normalizePath } from "@/lib/seo/site"

export type OgContent = {
  eyebrow: string
  title: string
  description?: string
}

/** Marketing paths that have a dedicated Open Graph card. */
export function getOgPaths(): string[] {
  return [
    "",
    "/why-us",
    "/contact",
    "/download",
    "/features",
    "/features/organizers",
    "/features/attendees",
    ...getAllPlatformFeatureSlugs().map((slug) => `/features/${slug}`),
  ]
}

export function getOgContent(path = ""): OgContent {
  const normalized = normalizePath(path)

  switch (normalized) {
    case "":
      return {
        eyebrow: "Event Parlour",
        title: "Sell out your next event.",
        description:
          "Distribution-first event marketplace for organizers, attendees & vendors. Nairobi and beyond.",
      }
    case "/why-us":
      return {
        eyebrow: "Why Us",
        title: "Why organizers choose Event Parlour",
        description:
          "M-PESA ticketing, marketplace reach, clear fees, and public notes from builders who tried it.",
      }
    case "/contact":
      return {
        eyebrow: "Contact & FAQ",
        title: "Talk to the Event Parlour team",
        description:
          "Get in touch for planning help, or find answers about ticketing and payouts.",
      }
    case "/download":
      return {
        eyebrow: "Download",
        title: "Sell out from your desk",
        description:
          "List events, sell tickets, and check them in from your Mac or Windows machine.",
      }
    case "/features": {
      const copy = content.PlatformFeatures.index
      return {
        eyebrow: copy.eyebrow,
        title: copy.title,
        description: copy.description,
      }
    }
    case "/features/organizers":
      return {
        eyebrow: "For organizers",
        title: "Reach, sell, and run the room",
        description: content.FeaturesSection.subtitle,
      }
    case "/features/attendees":
      return {
        eyebrow: "For attendees",
        title: "Discover, ticket, and show up",
        description:
          "Find events you'll love, keep tickets in one place, and never miss what matters.",
      }
    default: {
      const featureMatch = normalized.match(/^\/features\/([^/]+)$/)
      if (featureMatch) {
        const data = getPlatformFeatureBySlug(featureMatch[1])
        if (data) {
          return {
            eyebrow: data.feature.label,
            title: data.catalog.navTitle,
            description: data.feature.description,
          }
        }
      }
      return {
        eyebrow: "Event Parlour",
        title: "Sell out your next event.",
        description:
          "Distribution-first event marketplace for organizers, attendees & vendors.",
      }
    }
  }
}
