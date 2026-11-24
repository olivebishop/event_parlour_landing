import { normalizePath } from "@/lib/seo/site"

/**
 * Search/answer-engine metadata for every marketing page — the single source
 * for <title>, meta description, keywords, the /llms.txt index and the
 * per-page Markdown views.
 *
 * Rules: titles ≤ 60 chars (Google truncates around there), descriptions
 * 120–158 chars, primary keyword early, and only claims the product app
 * itself states (https://app.eventparlour.com/.md): Kenya + East Africa,
 * M-PESA checkout in KES, 5% per paid ticket, no fee on free events.
 */
export type PageMeta = {
  title: string
  description: string
  /** Target search intents, most important first. */
  keywords: string[]
}

/** Brand + category terms every page can carry. */
export const CORE_KEYWORDS = [
  "Event Parlour",
  "event ticketing Kenya",
  "sell tickets online Kenya",
  "online ticketing platform Kenya",
  "M-PESA ticketing",
  "event management software Kenya",
  "events in Nairobi",
  "event ticketing East Africa",
]

const PAGES: Record<string, PageMeta> = {
  "": {
    title: "Event Parlour: Sell Event Tickets in Kenya with M-PESA",
    description:
      "Sell tickets online in Kenya and East Africa. M-PESA checkout, door check-in and live sales in one place. Free events are free; paid tickets are 5% each.",
    keywords: [
      "sell event tickets online Kenya",
      "event ticketing platform Kenya",
      "M-PESA event tickets",
      "online ticketing Nairobi",
      "event management platform East Africa",
      "Eventbrite alternative Kenya",
    ],
  },
  "/features": {
    title: "Event Ticketing & Management Features | Event Parlour",
    description:
      "Every Event Parlour feature: marketplace discovery, your own storefront, 5% pricing, ticket transfers, QR entry, community promotion and geo analytics.",
    keywords: [
      "event management software features",
      "event ticketing features",
      "QR code ticket check-in",
      "event storefront",
    ],
  },
  "/features/organizers": {
    title: "Event Ticketing for Organizers in Kenya | Event Parlour",
    description:
      "Tools for event organizers in Kenya: create events, sell tickets with M-PESA, run check-in at the door, manage speakers and track sales in one workspace.",
    keywords: [
      "event organizer software Kenya",
      "sell tickets for my event",
      "event check-in app",
      "event registration Kenya",
    ],
  },
  "/features/attendees": {
    title: "Find Events in Nairobi & Buy Tickets | Event Parlour",
    description:
      "Discover concerts, festivals, meetups and conferences in Nairobi and across East Africa. Buy tickets with M-PESA, keep them in one place, transfer them.",
    keywords: [
      "events in Nairobi this week",
      "buy event tickets Kenya",
      "concert tickets Nairobi",
      "things to do in Nairobi",
    ],
  },
  "/why-us": {
    title: "Why Organizers Choose Event Parlour | Kenya Ticketing",
    description:
      "Why organizers choose Event Parlour in Kenya: M-PESA ticketing, marketplace reach, 5% on paid tickets, and real notes from builders who tried it.",
    keywords: [
      "why Event Parlour",
      "best ticketing platform Kenya",
      "Event Parlour reviews",
      "event platform testimonials Kenya",
    ],
  },
  "/contact": {
    title: "Contact Event Parlour | Ticketing Help & FAQ",
    description:
      "Talk to the Event Parlour team about selling tickets, M-PESA payouts or planning your event, and read answers to common ticketing questions.",
    keywords: ["Event Parlour contact", "event ticketing support Kenya", "ticketing FAQ"],
  },
  "/download": {
    title: "Event Parlour Desktop App for Mac & Windows",
    description:
      "List events, sell tickets and check people in from your Mac or Windows desk with the Event Parlour desktop app. Free to start, 5% on paid tickets.",
    keywords: ["event management desktop app", "ticketing app for Mac", "ticketing app for Windows"],
  },
}

/** Feature detail pages: keyword-led titles; descriptions fit in 158 chars. */
const FEATURE_PAGES: Record<string, PageMeta> = {
  "/features/distribution": {
    title: "Event Marketplace & Discovery in Kenya | Event Parlour",
    description:
      "Get your event in front of people already looking for things to do. Event Parlour's marketplace, announcements and updates feed drive ticket sales.",
    keywords: ["event marketplace Kenya", "promote my event", "event discovery Nairobi"],
  },
  "/features/workspace": {
    title: "Event Workspace & Branded Storefront | Event Parlour",
    description:
      "Invite your team, run every event from one workspace and sell on your own storefront URL, with events, tickets, speakers, hangouts and payouts together.",
    keywords: ["event team workspace", "event storefront page", "organizer storefront"],
  },
  "/features/pricing": {
    title: "Event Ticketing Fees: 5% per Paid Ticket | Event Parlour",
    description:
      "Simple ticketing fees: no platform fee on free registration-only events and 5% per paid ticket sold. Split payments and clear totals for organizers.",
    keywords: ["ticketing fees Kenya", "cheapest ticketing platform Kenya", "event ticketing pricing"],
  },
  "/features/tickets-and-channels": {
    title: "Ticket Transfers, QR Entry & Event Channels | Event Parlour",
    description:
      "Tickets with QR entry, transfers between attendees and in-app event channels, so guests get in fast and stay connected before and after the event.",
    keywords: ["QR code event tickets", "ticket transfer", "event check-in QR"],
  },
  "/features/community": {
    title: "Event Promotion on Instagram, WhatsApp & X | Event Parlour",
    description:
      "Reach more fans with community promotion across Instagram, WhatsApp and X. Event Parlour helps your event get seen beyond your own followers.",
    keywords: ["event promotion Kenya", "promote events on WhatsApp", "event marketing Nairobi"],
  },
  "/features/analytics": {
    title: "Event Sales & Geo Analytics for Organizers | Event Parlour",
    description:
      "See ticket sales, traffic and attendance with location-aware breakdowns, so you know where buyers come from and which channels actually convert.",
    keywords: ["event analytics", "ticket sales analytics", "event attendance tracking"],
  },
}

const ALL: Record<string, PageMeta> = { ...PAGES, ...FEATURE_PAGES }

export function getPageMeta(path: string): PageMeta {
  const meta = ALL[normalizePath(path)]
  if (!meta) throw new Error(`No SEO metadata for "${path}" — add it to lib/seo/page-meta.ts`)
  return meta
}

export function getPageKeywords(path: string): string[] {
  return [...new Set([...getPageMeta(path).keywords, ...CORE_KEYWORDS])]
}
