import type { APIRoute } from "astro"
import { SITE_URL } from "@/lib/seo/site"

/**
 * Search engines and AI/answer-engine crawlers are explicitly welcome (GEO/AEO):
 * being cited by ChatGPT, Claude, Perplexity, Gemini, etc. requires that their
 * crawlers can read the site. Remove a line below to opt a crawler out.
 */
const AI_CRAWLERS = [
  // Search engines (Google AI Overviews / AI Mode use Googlebot; Copilot and ChatGPT search lean on Bing)
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckDuckBot",
  "YandexBot",
  // OpenAI — ChatGPT search, browsing, training
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic — Claude search, user fetches, training
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / Vertex grounding
  "Google-Extended",
  "Google-CloudVertexBot",
  "GoogleOther",
  // Others
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
  "cohere-ai",
  "YouBot",
  "CCBot",
]

const DISALLOW = ["/private/", "/api/", "/social-card/"]

function group(userAgent: string) {
  return [`User-agent: ${userAgent}`, "Allow: /", ...DISALLOW.map((p) => `Disallow: ${p}`)].join(
    "\n",
  )
}

export const GET: APIRoute = () => {
  const body = [
    group("*"),
    // Explicit Yandex rule helps Webmaster confirm the site is allowed.
    group("Yandex"),
    ...AI_CRAWLERS.map(group),
    `Host: ${SITE_URL}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
    "# AI-readable versions of this site",
    `# Index: ${SITE_URL}/llms.txt`,
    `# Full content: ${SITE_URL}/llms-full.txt`,
    `# Overview: ${SITE_URL}/.md`,
    "# Any page as Markdown: append .md to its URL (homepage: /index.md) or send Accept: text/markdown",
    "",
  ].join("\n\n")

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
