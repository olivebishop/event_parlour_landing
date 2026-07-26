import content from "@/lib/content"
import {
  getAllPlatformFeatureSlugs,
  getPlatformFeatureBySlug,
} from "@/lib/platform-features-content"
import type { CreateOgImageOptions } from "@/lib/seo/create-og-image"

/** Marketing paths that have a dedicated Open Graph card. */
export function getOgPaths(): string[] {
  return [
    "",
    "/why-us",
    "/contact",
    "/features",
    "/features/organizers",
    "/features/attendees",
    ...getAllPlatformFeatureSlugs().map((slug) => `/features/${slug}`),
  ]
}

export function getOgContent(path = ""): CreateOgImageOptions {
  const normalized =
    !path || path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`

  switch (normalized) {
    case "":
      return {
        eyebrow: "Event Parlour",
        title: "Sell out your next event.",
        description:
          "Distribution-first event marketplace for organizers, attendees & vendors — Nairobi & beyond.",
      }
    case "/why-us":
      return {
        eyebrow: "Why Us",
        title: "What organizers and builders say",
        description:
          "Real feedback from engineers, creators, and organizers who use Event Parlour.",
      }
    case "/contact":
      return {
        eyebrow: "Contact & FAQ",
        title: "Talk to the Event Parlour team",
        description:
          "Get in touch for planning help, or find answers about ticketing and payouts.",
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

/** Stable absolute URL for sitemap / metadata OG images. */
export function stableOgImageUrl(path = "") {
  const siteUrl = "https://www.eventparlour.com"
  const normalized =
    !path || path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`
  return normalized ? `${siteUrl}/og${normalized}` : `${siteUrl}/og`
}
