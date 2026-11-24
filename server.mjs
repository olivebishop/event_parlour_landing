/**
 * Production server — `bun run start` (replaces `next start`).
 *
 * Serves the prerendered pages and the /api/contact endpoint through Astro's
 * Node adapter, and applies the redirects and response headers that used to
 * live in next.config.ts. Listens on $PORT (default 3000), like `next start`.
 */
import { existsSync } from "node:fs"
import { createServer } from "node:http"
import { markdownPathFor, prefersMarkdown } from "./integrations/agent-markdown/convert.mjs"
import {
  OG_VIDEO_PATH,
  isIMessagePreviewCrawler,
  pageHasVideo,
  sendOgVideo,
  sendPageWithVideo,
} from "./server/og-video.mjs"

// The adapter's standalone entry would start its own server on import; we only
// want its request handler (static files + API), wrapped below.
process.env.ASTRO_NODE_AUTOSTART = "disabled"
const { handler: astroHandler } = await import("./dist/server/entry.mjs")

const PORT = Number(process.env.PORT) || 3000
const HOST = process.env.HOST || "0.0.0.0"
const SITE_URL = "https://www.eventparlour.com"
const APP_URL = "https://app.eventparlour.com"

/**
 * From next.config.ts `redirects()`, plus legacy URLs Google still crawls.
 * Absolute destinations leave this host (usually to the product app).
 * `permanent: true` → 308, as in Next.
 */
const REDIRECTS = [
  { source: /^\/platform$/, destination: "/" },
  { source: /^\/faq$/, destination: "/contact" },
  { source: /^\/features\/organizers\/[^/]+$/, destination: "/features/organizers" },
  { source: /^\/features\/attendees\/[^/]+$/, destination: "/features/attendees" },
  { source: /^\/features\/all-in-one$/, destination: "/features/workspace" },
  { source: /^\/features\/built-for-africa$/, destination: "/features/community" },
  { source: /^\/features\/transparent-pricing$/, destination: "/features/pricing" },
  { source: /^\/features\/live-analytics$/, destination: "/features/analytics" },
  { source: /^\/features\/instant-payouts$/, destination: "/features/pricing" },
  // Old marketing paths that 404 today but still appear in Search Console.
  // Events browse/tickets live on the product app homepage (app /events 404s).
  { source: /^\/events(?:\/.*)?$/, destination: `${APP_URL}/` },
  { source: /^\/event(?:\/.*)?$/, destination: `${APP_URL}/` },
  { source: /^\/marketplace(?:\/.*)?$/, destination: `${APP_URL}/` },
  { source: /^\/tickets(?:\/.*)?$/, destination: `${APP_URL}/` },
  { source: /^\/accommodation(?:\/.*)?$/, destination: "/" },
  { source: /^\/booking(?:\/.*)?$/, destination: "/" },
  { source: /^\/blog(\/.*)?$/, destination: `${APP_URL}/blogs$1` },
  { source: /^\/blogs(\/.*)?$/, destination: `${APP_URL}/blogs$1` },
  { source: /^\/pricing(\/.*)?$/, destination: `${APP_URL}/pricing$1` },
  { source: /^\/changelog(\/.*)?$/, destination: `${APP_URL}/changelog$1` },
  { source: /^\/roadmap(\/.*)?$/, destination: `${APP_URL}/roadmap$1` },
  { source: /^\/about(\/.*)?$/, destination: `${APP_URL}/legal/about` },
  { source: /^\/legal(\/.*)?$/, destination: `${APP_URL}/legal$1` },
  { source: /^\/sign-?in(\/.*)?$/, destination: `${APP_URL}/auth/sign-in` },
  { source: /^\/sign-?up(\/.*)?$/, destination: `${APP_URL}/auth/sign-up` },
  // Old dynamic OG image routes → the static PNGs that replaced them.
  { source: /^\/(?:og|opengraph-image|twitter-image)$/, destination: "/og/home.png" },
  // Only the old extensionless routes (/og/why-us) — not real files like video.mp4.
  { source: /^\/og\/([^.]+)$/, destination: "/og/$1.png" },
]

/** From next.config.ts `headers()`. */
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
}
const IMMUTABLE = "public, max-age=31536000, immutable"
const STATIC_ASSET = /\.(svg|jpg|jpeg|png|webp|avif|ico|woff2)$/

function cacheControlFor(pathname) {
  if (pathname.startsWith("/og/")) return "public, max-age=86400, stale-while-revalidate=604800"
  if (pathname.startsWith("/_astro/") || pathname.startsWith("/images/")) return IMMUTABLE
  if (STATIC_ASSET.test(pathname)) return IMMUTABLE
  return null
}

const CLIENT_DIR = new URL("./dist/client/", import.meta.url)
const hasMarkdownTwin = (mdPath) => existsSync(new URL(`.${mdPath}`, CLIENT_DIR))

function appendVary(res, value) {
  const current = res.getHeader("Vary")
  res.setHeader("Vary", current ? `${current}, ${value}` : value)
}

function redirect(res, location) {
  res.writeHead(308, { Location: location, ...SECURITY_HEADERS })
  res.end()
}

function requestHost(req) {
  const raw = req.headers["x-forwarded-host"] || req.headers.host || ""
  return String(raw).split(",")[0].trim().split(":")[0].toLowerCase()
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost")
  let { pathname } = url

  // Apex → www so Search Console stops treating eventparlour.com as an
  // alternate of www.eventparlour.com (same HTML, www canonical).
  const host = requestHost(req)
  if (host === "eventparlour.com") {
    return redirect(res, `${SITE_URL}${pathname === "/" ? "/" : pathname}${url.search}`)
  }

  // Trailing slashes → canonical form (/why-us/ → /why-us), as Next did.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return redirect(res, pathname.replace(/\/+$/, "") + url.search)
  }
  // /why-us.html → /why-us so each page has one URL.
  if (pathname.endsWith(".html") && !pathname.startsWith("/google")) {
    return redirect(res, pathname.replace(/(\/index)?\.html$/, "") || "/")
  }

  for (const { source, destination } of REDIRECTS) {
    if (source.test(pathname)) {
      const target = pathname.replace(source, destination)
      // Keep query string on both same-host and app redirects.
      const location = target.includes("?") ? target : target + url.search
      return redirect(res, location)
    }
  }

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) res.setHeader(key, value)
  const cacheControl = cacheControlFor(pathname)
  if (cacheControl) res.setHeader("Cache-Control", cacheControl)

  // `/.md` agent view (was app/.md/route.ts) — built to /agent.md.
  if (pathname === "/.md") {
    req.url = "/agent.md" + url.search
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400")
    appendVary(res, "Accept")
    res.setHeader("Link", `<${SITE_URL}/llms.txt>; rel="alternate"; type="text/plain"`)
  } else if (pathname === "/agent.md") {
    res.setHeader("X-Robots-Tag", "noindex")
  }
  if (pathname.startsWith("/social-card/")) {
    res.setHeader("X-Robots-Tag", "noindex, nofollow")
  }

  // Agent-readable views (GEO/AEO) — generated by integrations/agent-markdown.
  if (pathname.endsWith(".md") || pathname === "/llms.txt" || pathname === "/llms-full.txt") {
    res.setHeader("Content-Type", pathname.endsWith(".md") ? "text/markdown; charset=utf-8" : "text/plain; charset=utf-8")
    if (!cacheControl) res.setHeader("Cache-Control", "public, max-age=3600")
    res.setHeader("Access-Control-Allow-Origin", "*")
    // Markdown twins are for agents; HTML is the indexed URL (canonical on each page).
    if (pathname.endsWith(".md")) res.setHeader("X-Robots-Tag", "noindex, follow")
  }
  const isPage =
    !/\.[a-z0-9]+$/i.test(pathname) && !pathname.startsWith("/api/") && !pathname.startsWith("/_") && !pathname.startsWith("/social-card/")
  if (isPage) {
    const mdPath = markdownPathFor(pathname)
    if (hasMarkdownTwin(mdPath)) {
      // Advertise the Markdown twin, and serve it to agents that ask for it.
      res.setHeader("Link", `<${SITE_URL}${mdPath}>; rel="alternate"; type="text/markdown"`)
      appendVary(res, "Accept")
      if ((req.method === "GET" || req.method === "HEAD") && prefersMarkdown(req.headers.accept)) {
        req.url = mdPath + url.search
        res.setHeader("Content-Type", "text/markdown; charset=utf-8")
        return astroHandler(req, res)
      }
    }
  }

  // og:video for iMessage link previews (see server/og-video.mjs).
  if (pathname === OG_VIDEO_PATH) return sendOgVideo(req, res)
  if (pageHasVideo(pathname)) {
    appendVary(res, "User-Agent")
    if (req.method !== "POST" && isIMessagePreviewCrawler(req.headers["user-agent"])) {
      // Canonical origin, not the Host header (may be internal behind a load balancer).
      return sendPageWithVideo(req, res, SITE_URL, pathname)
    }
  }

  astroHandler(req, res)
})

server.listen(PORT, HOST, () => {
  console.log(`Event Parlour listening on http://${HOST}:${PORT}`)
})
