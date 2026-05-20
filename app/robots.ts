import type { MetadataRoute } from "next"

const siteUrl = "https://www.eventparlour.com"

/**
 * Applies to Google, Bing, DuckDuckGo (mostly via Bing index), Yandex, etc.
 * Site is crawler-friendly (`Allow /`); Bing can import from Search Console separately.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
