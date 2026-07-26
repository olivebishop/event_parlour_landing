import type { MetadataRoute } from "next"
import { getOgPaths } from "@/lib/seo/og-content"
import { APP_URL, SITE_URL, ogImageUrl } from "@/lib/seo/site"

type RouteEntry = {
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>
  priority: number
}

const marketingPriority = (path: string): RouteEntry["priority"] => {
  if (path === "") return 1
  if (path === "/features") return 0.9
  return 0.85
}

const marketingFrequency = (
  path: string,
): RouteEntry["changeFrequency"] =>
  path === "" || path === "/features" ? "weekly" : "monthly"

const appRoutes: RouteEntry[] = [
  { path: "/", changeFrequency: "daily", priority: 0.9 },
  { path: "/events", changeFrequency: "daily", priority: 0.95 },
  { path: "/blogs", changeFrequency: "weekly", priority: 0.7 },
  { path: "/roadmap", changeFrequency: "monthly", priority: 0.6 },
  { path: "/auth/sign-up", changeFrequency: "monthly", priority: 0.8 },
  { path: "/auth/sign-in", changeFrequency: "monthly", priority: 0.7 },
  { path: "/legal/about", changeFrequency: "yearly", priority: 0.5 },
  { path: "/legal/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/legal/terms-of-service", changeFrequency: "yearly", priority: 0.4 },
  { path: "/legal/security", changeFrequency: "yearly", priority: 0.4 },
  { path: "/legal/refund-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/legal/cookie-policy", changeFrequency: "yearly", priority: 0.4 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const marketingEntries: MetadataRoute.Sitemap = getOgPaths().map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: marketingFrequency(path),
    priority: marketingPriority(path),
    images: [ogImageUrl(path)],
  }))

  const appEntries: MetadataRoute.Sitemap = appRoutes.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${APP_URL}${path === "/" ? "/" : path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }),
  )

  return [...marketingEntries, ...appEntries]
}
