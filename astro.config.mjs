// @ts-check
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import node from "@astrojs/node"
import tailwindcss from "@tailwindcss/vite"
import agentMarkdown from "./integrations/agent-markdown/index.mjs"

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://www.eventparlour.com",

  // One canonical form per URL: /why-us (no trailing slash). Pages are emitted
  // as why-us.html and served at /why-us by the Node adapter.
  trailingSlash: "never",
  build: {
    format: "file",
    inlineStylesheets: "auto",
  },

  // Every page is prerendered to static HTML. Only routes that opt out with
  // `export const prerender = false` (the contact API) run on the server.
  // `server.mjs` wraps the adapter's handler with the redirects and headers
  // that used to live in next.config.ts; `bun run start` runs it.
  output: "static",
  adapter: node({ mode: "standalone" }),

  // agentMarkdown: Markdown twin of every page + /llms-full.txt for AI agents.
  integrations: [react(), agentMarkdown()],

  // Hover-prefetch internal links (Next's <Link> prefetched too).
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  vite: {
    // Cast: @tailwindcss/vite's Plugin type and Astro's bundled Vite types differ
    // nominally; the plugin itself is compatible.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
})
