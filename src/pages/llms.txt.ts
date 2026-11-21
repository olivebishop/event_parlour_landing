import type { APIRoute } from "astro"
import content from "@/lib/content"
import { getOgPaths } from "@/lib/seo/og-content"
import { getPageMeta } from "@/lib/seo/page-meta"
import { APP_URL, SITE_URL, canonicalUrl, markdownUrl } from "@/lib/seo/site"

/**
 * /llms.txt (https://llmstxt.org): the compact index AI assistants read first.
 * Generated from the same page metadata and FAQ as the site, so it can't drift.
 * Links point at each page's Markdown twin, as the spec recommends.
 */
export const GET: APIRoute = () => {
  const pages = getOgPaths().map((path) => {
    const meta = getPageMeta(path)
    return `- [${meta.title}](${markdownUrl(path)}): ${meta.description} (HTML: ${canonicalUrl(path)})`
  })

  const faqs = (content.FAQSection.questions ?? []).map(
    (item) => `- **${item.question}** ${item.answer}`,
  )

  const body = [
    "# Event Parlour",
    "",
    "> Event Parlour is an event ticketing and event management platform for Kenya and East Africa. Organizers sell tickets online with M-PESA checkout, check guests in at the door, and track sales; attendees discover events and buy tickets.",
    "",
    "Key facts: serves Kenya (Nairobi, Mombasa, Kisumu), Uganda, Rwanda and Tanzania. Paid events in KES check out with M-PESA, with card payments where configured. No platform fee on free, registration-only events; 5% platform fee per paid ticket sold (payment-network charges separate). Physical, online and hybrid events.",
    "",
    "## Pages",
    "",
    ...pages,
    "",
    "## Product app",
    "",
    `- [Event Parlour app](${APP_URL}/): browse events and buy tickets`,
    `- [Create an organizer account](${APP_URL}/auth/sign-up): list an event and sell tickets`,
    `- [Pricing](${APP_URL}/pricing): platform fees and payouts`,
    `- [Product agent view](${APP_URL}/.md): fees, workspaces and organizer tools in Markdown`,
    "",
    "## FAQ",
    "",
    ...faqs,
    "",
    "## Optional",
    "",
    `- [Full site content](${SITE_URL}/llms-full.txt): every page above as Markdown in one file`,
    `- [Site overview for agents](${SITE_URL}/.md)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ].join("\n")

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
