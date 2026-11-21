/**
 * `og:video` for link previews in Apple Messages (Apple TN3156), following
 * eventpalour_app (lib/seo/og-video.ts) and cleaning_website (src/lib/og-video.ts).
 *
 * - Everyone gets the page exactly as built (title, description, og:image).
 * - Only the iMessage preview crawler additionally gets one `og:video` that
 *   points at a direct MPEG-4 file (never an HTML player page).
 * - The MP4 honours Range requests: iMessage probes `bytes=0-1` and only plays
 *   the clip when that probe returns 206. Without Range it returns 200, since
 *   WhatsApp/Facebook HEAD the file and reject a 206.
 */
import { createReadStream } from "node:fs"
import { readFile, stat } from "node:fs/promises"

export const OG_VIDEO_PATH = "/og/video.mp4"
/** Bump when the MP4 bytes change so Messages doesn't reuse a failed fetch. */
export const OG_VIDEO_ASSET_VERSION = "1"
const OG_VIDEO_WIDTH = 1200
const OG_VIDEO_HEIGHT = 630
const OG_VIDEO_FILE = new URL("../assets/og/video.mp4", import.meta.url)

/** Pages that show the clip in iMessage. Others keep their image card. */
const PAGES_WITH_VIDEO = new Map([["/", new URL("../dist/client/index.html", import.meta.url)]])

const RANGE_PATTERN = /^bytes=(\d*)-(\d*)$/i

/** The Messages crawler sends a mixed UA: facebookexternalhit/Facebot + Twitterbot. */
export function isIMessagePreviewCrawler(userAgent) {
  if (!userAgent) return false
  return /facebookexternalhit|Facebot/i.test(userAgent) && /Twitterbot/i.test(userAgent)
}

export function pageHasVideo(pathname) {
  return PAGES_WITH_VIDEO.has(pathname)
}

/** Serve the built page with `og:video` tags added, for the iMessage crawler. */
export async function sendPageWithVideo(req, res, origin, pathname) {
  const html = await readFile(PAGES_WITH_VIDEO.get(pathname), "utf8")
  const video = `${origin}${OG_VIDEO_PATH}?v=${OG_VIDEO_ASSET_VERSION}`
  // One og:video only: TN3156 treats extra video tags as extra sources.
  const tags =
    `<meta property="og:video" content="${video}"/>` +
    `<meta property="og:video:type" content="video/mp4"/>` +
    `<meta property="og:video:width" content="${OG_VIDEO_WIDTH}"/>` +
    `<meta property="og:video:height" content="${OG_VIDEO_HEIGHT}"/>`
  const body = html.includes('property="og:video"') ? html : html.replace("</head>", `${tags}</head>`)
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }) // Vary is set by server.mjs
  res.end(req.method === "HEAD" ? undefined : body)
}

function parseByteRange(header, size) {
  if (header == null || header.trim() === "") return { kind: "full" }
  if (size <= 0) return { kind: "unsatisfiable" }
  const trimmed = header.trim()
  if (trimmed.includes(",")) return { kind: "unsatisfiable" }
  const match = RANGE_PATTERN.exec(trimmed)
  if (!match) return { kind: "unsatisfiable" }
  const [, startRaw = "", endRaw = ""] = match
  if (startRaw === "" && endRaw === "") return { kind: "unsatisfiable" }

  if (startRaw === "") {
    const suffix = Number(endRaw)
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return { kind: "unsatisfiable" }
    const length = Math.min(suffix, size)
    return { kind: "partial", start: size - length, end: size - 1 }
  }
  const start = Number(startRaw)
  if (!Number.isSafeInteger(start) || start < 0 || start >= size) return { kind: "unsatisfiable" }
  const end = endRaw === "" ? size - 1 : Number(endRaw)
  if (!Number.isSafeInteger(end) || end < start) return { kind: "unsatisfiable" }
  return { kind: "partial", start, end: Math.min(end, size - 1) }
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Range",
  "Access-Control-Expose-Headers": "Accept-Ranges, Content-Length, Content-Range, Content-Type",
  "Cross-Origin-Resource-Policy": "cross-origin",
}

export async function sendOgVideo(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, { ...CORS, "Access-Control-Max-Age": "86400" })
    return res.end()
  }

  let size
  try {
    size = (await stat(OG_VIDEO_FILE)).size
  } catch {
    res.writeHead(404)
    return res.end()
  }

  const headers = {
    ...CORS,
    "Content-Type": "video/mp4",
    "Accept-Ranges": "bytes",
    // Browsers may cache it; CDNs must not, or a `bytes=0-1` probe gets a cached
    // full 200 and iMessage falls back to the poster.
    "Cache-Control": "public, max-age=3600",
    "CDN-Cache-Control": "no-store",
    "Content-Disposition": "inline",
    Vary: "Range",
    "X-Content-Type-Options": "nosniff",
  }

  const range = parseByteRange(req.headers.range ?? null, size)
  if (range.kind === "unsatisfiable") {
    res.writeHead(416, { ...headers, "Content-Range": `bytes */${size}`, "Content-Length": "0" })
    return res.end()
  }

  const partial = range.kind === "partial"
  const start = partial ? range.start : 0
  const end = partial ? range.end : size - 1
  res.writeHead(partial ? 206 : 200, {
    ...headers,
    "Content-Length": String(end - start + 1),
    ...(partial ? { "Content-Range": `bytes ${start}-${end}/${size}` } : {}),
  })
  if (req.method === "HEAD") return res.end()
  createReadStream(OG_VIDEO_FILE, { start, end }).pipe(res)
}
