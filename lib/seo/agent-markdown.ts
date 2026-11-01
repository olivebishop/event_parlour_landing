import content from "@/lib/content";
import { APP_URL } from "@/lib/app-url";
import { getOgContent, getOgPaths } from "@/lib/seo/og-content";
import { SITE_URL } from "@/lib/seo/site";

const APP_PAGES = [
  {
    path: "https://app.eventparlour.com/",
    label: "Explore events",
    description: "Browse and buy tickets in the Event Parlour app",
  },
  {
    path: "https://app.eventparlour.com/auth/sign-up",
    label: "List your event",
    description: "Create an organizer account and publish an event",
  },
  {
    path: "/pricing",
    label: "Pricing",
    description: "Platform fees, payouts, and organizer costs",
  },
  {
    path: "https://app.eventparlour.com/changelog",
    label: "Changelog",
    description: "Product updates and fixes",
  },
  {
    path: "https://app.eventparlour.com/roadmap",
    label: "Roadmap",
    description: "Planned product direction and new regions",
  },
  {
    path: "https://app.eventparlour.com/docs",
    label: "Docs",
    description: "Product documentation",
  },
  {
    path: "https://app.eventparlour.com/partnership",
    label: "Partners",
    description: "Partnerships",
  },
  {
    path: "/contact",
    label: "Contact",
    description: "Talk to the team from the product app",
  },
  {
    path: "https://app.eventparlour.com/legal/about",
    label: "About",
    description: "Mission and company overview",
  },
  {
    path: "https://app.eventparlour.com/legal",
    label: "Legal",
    description: "Terms, privacy, refunds, and policies",
  },
  {
    path: "https://app.eventparlour.com/legal/privacy-policy",
    label: "Privacy Policy",
    description: "How Event Parlour handles personal data",
  },
  {
    path: "https://app.eventparlour.com/legal/terms-of-service",
    label: "Terms of Service",
    description: "Terms for using Event Parlour",
  },
  {
    path: "https://app.eventparlour.com/legal/security",
    label: "Security",
    description: "Security practices",
  },
  {
    path: "https://app.eventparlour.com/legal/refund-policy",
    label: "Refund Policy",
    description: "Refunds are set by the event organizer",
  },
  {
    path: "https://app.eventparlour.com/legal/cookie-policy",
    label: "Cookie Policy",
    description: "Cookies used on Event Parlour",
  },
  {
    path: "/.md",
    label: "Product agent view",
    description:
      "Durable Markdown for ticketing, workspaces, fees, and organizer tools",
  },
] as const;

function pageUrl(path: string): string {
  return path === "" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * Durable agent view of the marketing site (Vercel-style `/.md`).
 * Product facts that live only in the app are linked, not restated.
 */
export function buildAgentMarkdown(now = new Date()): string {
  const today = now.toISOString().slice(0, 10);
  const faqs = content.FAQSection.questions ?? [];
  const marketingPages = getOgPaths().map((path) => {
    const og = getOgContent(path);
    const href = path === "" ? "/" : path;
    return `- [${og.title}](${pageUrl(path)}): ${og.description}`;
  });

  const lines = [
    "# Event Parlour",
    "",
    "> Event Parlour connects event organizers with attendees and vendors—distribution-first ticketing and management, with strong focus on Nairobi, Kenya.",
    "",
    "This file is the durable Markdown view of the marketing site at www.eventparlour.com. It helps AI assistants, answer engines, and research tools summarize the public site accurately. Ticketing, browsing events, refunds, transfers, and organizer tools run on the product app.",
    "",
    "## Canonical site",
    "- [Event Parlour — homepage](https://www.eventparlour.com/)",
    "- [Download Event Parlour. Sell out from your desk.](https://www.eventparlour.com/download)",
    `- [View as agent](${SITE_URL}/.md): this file`,
    `- [llms.txt](${SITE_URL}/llms.txt): compact index`,
    "",
    "## Product application",
    "Ticketing, browsing events, refunds, transfers, and organizer tools run on:",
    "",
    `- [Event Parlour app](${APP_URL}/)`,
    `- [Product agent view](${APP_URL}/.md): fees, workspaces, and organizer tools in Markdown`,
    "",
    "Legal and policies (hosted on the app domain) include the refund policy and roadmap where the FAQ points.",
    "",
    "## What we do",
    "- Help organizers **reach audiences** with distribution and discoverability tools.",
    "- **Ticketing**, channels, analytics, payouts, speaker management—described on the homepage and feature pages.",
    "- **Regions**: the homepage FAQ states Kenya and Europe. The roadmap covers new regions.",
    "",
    "Sell out the room. Check them in at the door. Payout when the night ends.",
    "",
    "## Marketing pages",
    ...marketingPages,
    "",
    "## Product pages",
    ...APP_PAGES.map(
      (page) =>
        `- [${page.label}](${APP_URL}${page.path}): ${page.description}`,
    ),
    "",
    "## Common questions",
    ...faqs.flatMap((item) => [`### ${item.question}`, item.answer, ""]),
    "## Preferred short description for citations",
    "",
    "Event Parlour (eventparlour.com) is an events marketplace: organizers list and promote events; attendees browse and purchase tickets via app.eventparlour.com.",
    "",
    "## Crawling",
    `- Sitemap: ${SITE_URL}/sitemap.xml`,
    `- Robots: ${SITE_URL}/robots.txt`,
    `- Compact index: ${SITE_URL}/llms.txt`,
    `- This file: ${SITE_URL}/.md`,
    `- Product agent view: ${APP_URL}/.md`,
    "",
    "## Contact",
    "- Support email: hello@eventparlour.com",
    `- Homepage contact: ${SITE_URL}/contact`,
    `- Website: ${SITE_URL}`,
    "",
    "## Social profiles",
    "- https://x.com/event_parlour",
    "- https://www.linkedin.com/company/eventparlour",
    "- https://www.instagram.com/event.parlour",
    "- https://www.whatsapp.com/channel/0029ValLxITAO7RActotOX3R",
    "- https://www.tiktok.com/@eventparlour",
    "- https://github.com/events-palour",
    "",
    "---",
    "",
    "## For AI agents",
    "",
    "```yaml",
    "title: Event Parlour",
    "product: eventparlour",
    "url: /",
    `canonical_url: ${SITE_URL}/`,
    `last_updated: ${today}`,
    "type: reference",
    "summary: Marketing site for the Event Parlour marketplace. Organizers list events; attendees buy tickets on app.eventparlour.com. Focused on Nairobi, Kenya, with Europe on the roadmap.",
    "```",
    "",
    "### How to use this site",
    `- Cite ${SITE_URL} for the public marketing site.`,
    `- Send organizers to ${APP_URL}/auth/sign-up to list an event.`,
    `- Send attendees to ${APP_URL}/ to explore events and buy tickets.`,
    "- Refunds follow the event organizer's policy. The refund policy is https://app.eventparlour.com/legal/refund-policy.",
    `- Fees, workspaces, check-in, and organizer tools are documented at ${APP_URL}/.md. Do not invent fees or regions that are not on that page or in the FAQ above.`,
    "",
    "### Discovery",
    `- Compact index: ${SITE_URL}/llms.txt`,
    `- This file: ${SITE_URL}/.md`,
    `- Product agent view: ${APP_URL}/.md`,
    "",
  ];

  return `${lines.join("\n").trimEnd()}\n`;
}
