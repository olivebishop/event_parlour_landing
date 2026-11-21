/**
 * Generate Open Graph cards with Cloudflare Browser Run.
 * https://developers.cloudflare.com/browser-run/how-to/og-images-astro/
 *
 * Screenshots each deployed /social-card/<card> template (1200×630) and writes
 * it to public/og/<card>.png, the URL every page's og:image / twitter:image
 * and the sitemap point at.
 *
 * The templates must already be live (they deploy with the site).
 * Run this, commit the updated PNGs, and push so the next deploy serves them.
 * Hosting doesn't matter: Browser Run only screenshots the public URL.
 *
 *   CF_ACCOUNT_ID=… CF_API_TOKEN=… bun scripts/generate-social-cards.ts           # missing cards only
 *   CF_ACCOUNT_ID=… CF_API_TOKEN=… bun scripts/generate-social-cards.ts --force   # regenerate all
 *
 * Optional: OG_BASE_URL to screenshot a preview deployment instead of production.
 * The API token needs the "Browser Rendering - Edit" permission.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { getOgPaths } from "../lib/seo/og-content"
import { SITE_URL, ogImageSlug } from "../lib/seo/site"

const CF_API = "https://api.cloudflare.com/client/v4/accounts"
const OUTPUT_DIR = "public/og"
const BASE_URL = (process.env.OG_BASE_URL ?? SITE_URL).replace(/\/$/, "")

async function captureScreenshot(accountId: string, apiToken: string, pageUrl: string) {
  const res = await fetch(`${CF_API}/${accountId}/browser-run/screenshot`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: pageUrl,
      viewport: { width: 1200, height: 630 },
      gotoOptions: { waitUntil: "networkidle0" },
    }),
  })

  if (!res.ok) {
    throw new Error(`Screenshot failed (${res.status}): ${await res.text()}`)
  }
  const type = res.headers.get("content-type") ?? ""
  if (!type.startsWith("image/")) {
    throw new Error(`Expected an image, got ${type}: ${(await res.text()).slice(0, 300)}`)
  }
  return res.arrayBuffer()
}

async function main() {
  const accountId = process.env.CF_ACCOUNT_ID
  const apiToken = process.env.CF_API_TOKEN
  if (!accountId || !apiToken) {
    console.error("Set CF_ACCOUNT_ID and CF_API_TOKEN (see .env.example).")
    process.exit(1)
  }

  const force = process.argv.includes("--force")
  const cards = getOgPaths().map(ogImageSlug)
  let failures = 0

  console.log(`Generating ${cards.length} social cards from ${BASE_URL}${force ? " (--force)" : ""}`)

  for (const [index, card] of cards.entries()) {
    const outPath = join(OUTPUT_DIR, `${card}.png`)
    const label = `[${index + 1}/${cards.length}] ${card}`

    if (!force && existsSync(outPath)) {
      console.log(`${label}: exists, skipping`)
      continue
    }

    try {
      const png = await captureScreenshot(accountId, apiToken, `${BASE_URL}/social-card/${card}`)
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, Buffer.from(png))
      console.log(`${label}: saved ${outPath}`)
    } catch (error) {
      failures++
      console.error(`${label}: ${error instanceof Error ? error.message : error}`)
    }

    // Stay well inside Browser Run rate limits.
    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  if (failures) {
    console.error(`${failures} card(s) failed.`)
    process.exit(1)
  }
}

main()
