import type { APIRoute } from "astro"
import { getOgPaths } from "@/lib/seo/og-content"
import { APP_URL, canonicalUrl, ogImageUrl } from "@/lib/seo/site"

type ChangeFrequency = "daily" | "weekly" | "monthly" | "yearly"

type SitemapEntry = {
  loc: string
  lastmod: string
  changefreq: ChangeFrequency
  priority: number
  image?: string
}

/**
 * Product URLs listed so the marketing property can discover the app.
 * Only paths that currently 200 on app.eventparlour.com — /events 404s there
 * too, so browse/tickets live at the app homepage.
 */
const appRoutes: { path: string; changefreq: ChangeFrequency; priority: number }[] = [
  { path: "/", changefreq: "daily", priority: 0.95 },
  { path: "/blogs", changefreq: "weekly", priority: 0.7 },
  { path: "/pricing", changefreq: "monthly", priority: 0.8 },
  { path: "/changelog", changefreq: "monthly", priority: 0.6 },
  { path: "/roadmap", changefreq: "monthly", priority: 0.6 },
  { path: "/auth/sign-up", changefreq: "monthly", priority: 0.8 },
  { path: "/auth/sign-in", changefreq: "monthly", priority: 0.7 },
  { path: "/legal/about", changefreq: "yearly", priority: 0.5 },
  { path: "/legal/privacy-policy", changefreq: "yearly", priority: 0.4 },
  { path: "/legal/terms-of-service", changefreq: "yearly", priority: 0.4 },
  { path: "/legal/security", changefreq: "yearly", priority: 0.4 },
  { path: "/legal/refund-policy", changefreq: "yearly", priority: 0.4 },
  { path: "/legal/cookie-policy", changefreq: "yearly", priority: 0.4 },
]

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

function renderEntry({ loc, lastmod, changefreq, priority, image }: SitemapEntry) {
  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(2)}</priority>`,
    ...(image
      ? ["    <image:image>", `      <image:loc>${escapeXml(image)}</image:loc>`, "    </image:image>"]
      : []),
    "  </url>",
  ].join("\n")
}

/** Built once per deploy, so lastmod reflects the latest release of the site. */
export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString()

  const marketing: SitemapEntry[] = getOgPaths().map((path) => ({
    loc: canonicalUrl(path),
    lastmod,
    changefreq:
      path === "" || path === "/features" || path === "/why-us" ? "weekly" : "monthly",
    priority:
      path === "" ? 1 : path === "/features" || path === "/why-us" ? 0.9 : 0.85,
    image: ogImageUrl(path),
  }))

  const app: SitemapEntry[] = appRoutes.map(({ path, changefreq, priority }) => ({
    loc: `${APP_URL}${path}`,
    lastmod,
    changefreq,
    priority,
  }))

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...[...marketing, ...app].map(renderEntry),
    "</urlset>",
    "",
  ].join("\n")

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
