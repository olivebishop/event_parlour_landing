import type { APIRoute } from "astro"
import { buildAgentMarkdown } from "@/lib/seo/agent-markdown"

/**
 * Durable Markdown view for AI agents. Public URL is `/.md` (Vercel-style);
 * server.mjs serves this file there with the Link/Cache-Control headers.
 */
export const GET: APIRoute = () =>
  new Response(buildAgentMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
