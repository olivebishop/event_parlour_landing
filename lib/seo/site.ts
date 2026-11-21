export const SITE_URL = "https://www.eventparlour.com"
export const APP_URL = "https://app.eventparlour.com"
export const SITE_NAME = "Event Parlour"
export const TWITTER_HANDLE = "@EventsPalour"
export const DEFAULT_LOCALE = "en_US"

export const SOCIAL_PROFILES = [
  "https://x.com/event_parlour",
  "https://www.linkedin.com/company/eventparlour",
  "https://www.instagram.com/event.parlour",
  "https://www.whatsapp.com/channel/0029ValLxITAO7RActotOX3R",
  "https://www.tiktok.com/@eventparlour",
  "https://github.com/events-palour",
] as const

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

/** "" | "/" | "/why-us/" → "" | "/why-us" */
export function normalizePath(path = ""): string {
  return !path || path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`
}

/** Absolute canonical URL. The homepage keeps its trailing slash (origin form). */
export function canonicalUrl(path = ""): string {
  const normalized = normalizePath(path)
  return normalized ? `${SITE_URL}${normalized}` : `${SITE_URL}/`
}

/** File slug for a marketing path's OG card: "" → "home", "/features/x" → "features/x". */
export function ogImageSlug(path = ""): string {
  return normalizePath(path).slice(1) || "home"
}

/** Site-relative path of the static OG card, e.g. `/og/features/analytics.png`. */
export function ogImagePath(path = ""): string {
  return `/og/${ogImageSlug(path)}.png`
}

/** Absolute OG card URL (social crawlers require absolute URLs). */
export function ogImageUrl(path = ""): string {
  return `${SITE_URL}${ogImagePath(path)}`
}

/**
 * Site-relative path of a page's Markdown view for AI agents:
 * "/" → "/index.md", "/features/analytics" → "/features/analytics.md".
 * Generated at build time (integrations/agent-markdown.mjs).
 */
export function markdownPath(path = ""): string {
  return `${normalizePath(path) || "/index"}.md`
}

export function markdownUrl(path = ""): string {
  return `${SITE_URL}${markdownPath(path)}`
}

export { getOgPaths } from "@/lib/seo/og-content"
