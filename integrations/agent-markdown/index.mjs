/**
 * Agent-readable site (GEO / AEO).
 *
 * Build: for every prerendered page, writes a Markdown twin next to the HTML
 *   (/why-us → /why-us.md, / → /index.md) and a single /llms-full.txt with the
 *   whole site, so ChatGPT, Claude, Perplexity, Gemini and coding agents can
 *   read the real page content without running JavaScript.
 *
 * Dev: serves the same URLs live from the dev server (plus `/.md` and
 *   `Accept: text/markdown` negotiation), which production does in server.mjs.
 */
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"
import { markdownPathFor, pageHtmlToMarkdown, prefersMarkdown, SITE_URL } from "./convert.mjs"

/** Not real content pages. */
const SKIP = [/^404\.html$/, /^social-card\//, /^google[0-9a-f]+\.html$/]

async function listHtmlFiles(dir, base = dir) {
  const files = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await listHtmlFiles(full, base)))
    else if (entry.name.endsWith(".html")) files.push(relative(base, full).split(sep).join("/"))
  }
  return files
}

/** "features/analytics.html" → "/features/analytics", "index.html" → "/" */
const routeFor = (file) => `/${file.replace(/\.html$/, "").replace(/(^|\/)index$/, "")}`.replace(/\/$/, "") || "/"

function llmsFullHeader(pageCount) {
  return [
    "# Event Parlour — full site content",
    "",
    "> Event ticketing and event management for Kenya and East Africa: sell tickets online with M-PESA checkout, check guests in, and track sales.",
    "",
    `Every public page of ${SITE_URL}, as Markdown (${pageCount} pages). Index: ${SITE_URL}/llms.txt · Overview: ${SITE_URL}/.md · Product app: https://app.eventparlour.com/.md`,
    "",
  ].join("\n")
}

export default function agentMarkdown() {
  let clientDir

  return {
    name: "agent-markdown",
    hooks: {
      "astro:config:done": ({ config }) => {
        // Prerendered pages land in build.client for server builds, outDir otherwise.
        clientDir = fileURLToPath(config.adapter ? config.build.client : config.outDir)
      },

      "astro:build:done": async ({ logger }) => {
        const lastUpdated = new Date().toISOString().slice(0, 10)
        const files = (await listHtmlFiles(clientDir)).filter((f) => !SKIP.some((re) => re.test(f)))
        // Homepage first, then the rest alphabetically — the reading order in llms-full.txt.
        files.sort((a, b) => (a === "index.html" ? -1 : b === "index.html" ? 1 : a.localeCompare(b)))

        const sections = []
        for (const file of files) {
          const route = routeFor(file)
          const html = await readFile(join(clientDir, file), "utf8")
          const { markdown } = pageHtmlToMarkdown(html, { lastUpdated })
          await writeFile(join(clientDir, markdownPathFor(route).slice(1)), markdown)
          sections.push(markdown.trim())
        }

        let overview = ""
        try {
          overview = (await readFile(join(clientDir, "agent.md"), "utf8")).trim()
        } catch {
          // agent.md endpoint missing — llms-full.txt still has every page.
        }

        const full = [llmsFullHeader(files.length), overview, ...sections].filter(Boolean).join("\n\n---\n\n")
        await writeFile(join(clientDir, "llms-full.txt"), `${full}\n`)
        logger.info(`Wrote ${files.length} Markdown page views and llms-full.txt`)
      },

      "astro:config:setup": ({ updateConfig, command }) => {
        if (command !== "dev") return
        updateConfig({ vite: { plugins: [devAgentMarkdown()] } })
      },
    },
  }
}

/** Dev-server twin of what server.mjs + the build output do in production. */
function devAgentMarkdown() {
  return {
    name: "agent-markdown:dev",
    configureServer(server) {
      const origin = () => {
        const address = server.httpServer?.address()
        return typeof address === "object" && address ? `http://127.0.0.1:${address.port}` : "http://127.0.0.1:4321"
      }
      const fetchPage = async (route) => {
        const res = await fetch(`${origin()}${route}`, { headers: { Accept: "text/html" } })
        return res.ok ? res.text() : null
      }
      const sendMarkdown = (res, body, type = "text/markdown") => {
        res.statusCode = 200
        res.setHeader("Content-Type", `${type}; charset=utf-8`)
        res.end(body)
      }

      // Registered directly (not returned), so it runs before Vite's own
      // middleware — otherwise Vite tries to load "/.md" as a Markdown module.
      server.middlewares.use(async (req, res, next) => {
        try {
          const url = new URL(req.url ?? "/", "http://localhost")
          const { pathname } = url

          if (pathname === "/.md") {
            req.url = `/agent.md${url.search}`
            return next()
          }

          if (pathname.endsWith(".md") && pathname !== "/agent.md") {
            const route = pathname.replace(/\.md$/, "").replace(/\/index$/, "") || "/"
            const html = await fetchPage(route)
            if (!html) return next()
            return sendMarkdown(res, pageHtmlToMarkdown(html).markdown)
          }

          if (pathname === "/llms-full.txt") {
            const sitemap = await (await fetch(`${origin()}/sitemap.xml`)).text()
            const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.eventparlour\.com(\/[^<]*)<\/loc>/g)].map((m) => m[1] || "/")
            const pages = []
            for (const route of routes) {
              const html = await fetchPage(route)
              if (html) pages.push(pageHtmlToMarkdown(html).markdown.trim())
            }
            return sendMarkdown(res, `${[llmsFullHeader(pages.length), ...pages].join("\n\n---\n\n")}\n`, "text/plain")
          }

          const isPage = req.method === "GET" && !/\.[a-z0-9]+$/i.test(pathname) && !pathname.startsWith("/@") && !pathname.startsWith("/_")
          if (isPage && prefersMarkdown(req.headers.accept)) {
            const html = await fetchPage(pathname)
            if (html) return sendMarkdown(res, pageHtmlToMarkdown(html).markdown)
          }
        } catch (error) {
          return next(error)
        }
        next()
      })
    },
  }
}
