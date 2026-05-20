import type { MetadataRoute } from "next"

const siteUrl = "https://www.eventparlour.com"

/**
 * Crawler-friendly defaults. Explicit Yandex rule helps Webmaster see the site is allowed.
 * If Yandex still says "page unavailable", check www vs apex DNS and that verification URL matches.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/private/", "/api/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
