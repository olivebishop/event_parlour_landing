import type { MetadataRoute } from "next"
import { getAllPlatformFeatureSlugs } from "@/lib/platform-feature-catalog"

const siteUrl = "https://www.eventparlour.com"
const appUrl = "https://app.eventparlour.com"

/** Marketing + primary product destinations crawlers should discover. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const platformFeaturePaths = getAllPlatformFeatureSlugs().map(
    (slug) => `/features/${slug}`,
  )

  const marketingPages: MetadataRoute.Sitemap = [
    "",
    "/why-us",
    "/contact",
    "/features",
    ...platformFeaturePaths,
    "/features/organizers",
    "/features/attendees",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/features/") ? 0.85 : 0.85,
  }))

  return [
    ...marketingPages,
    {
      url: `${appUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${appUrl}/events`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${appUrl}/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${appUrl}/roadmap`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${appUrl}/auth/sign-up`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${appUrl}/auth/sign-in`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${appUrl}/legal/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${appUrl}/legal/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${appUrl}/legal/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${appUrl}/legal/security`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${appUrl}/legal/refund-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${appUrl}/legal/cookie-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ]
}
