import content from "@/lib/content"
import { WHY_US_TESTIMONIALS } from "@/lib/why-us-content"
import {
  APP_URL,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  canonicalUrl,
  ogImageUrl,
} from "@/lib/seo/site"

/**
 * JSON-LD for search engines and answer engines (SEO / GEO / AEO).
 *
 * Every page gets one `@graph` with stable `@id`s so crawlers can join the
 * nodes: Organization ← WebSite ← WebPage (+ BreadcrumbList, FAQPage, …).
 */

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const PRODUCT_ID = `${SITE_URL}/#product`
const SERVICE_ID = `${SITE_URL}/#ticketing-service`

/**
 * Facts here mirror what the product app states about itself
 * (https://app.eventparlour.com/.md). Don't add claims it doesn't make.
 */
const ORG_DESCRIPTION =
  "Event Parlour is an event ticketing and event management platform for Kenya and East Africa. Organizers sell tickets with M-PESA checkout, check guests in, and track sales; attendees discover events and buy tickets."

const AREA_SERVED = [
  { "@type": "Country", name: "Kenya" },
  { "@type": "Country", name: "Uganda" },
  { "@type": "Country", name: "Rwanda" },
  { "@type": "Country", name: "Tanzania" },
]

const CITIES = ["Nairobi", "Mombasa", "Kisumu", "Kampala", "Kigali", "Dar es Salaam"]

const FEATURES = [
  "Online ticket sales with M-PESA checkout in KES",
  "Card checkout where configured",
  "Free, registration-only events with no platform fee",
  "Physical, online and hybrid events",
  "Door check-in and live attendance",
  "Ticket transfers and QR entry",
  "Organizer workspaces and branded storefronts",
  "Speaker management and hangouts",
  "Event marketplace, announcements and community promotion",
  "Sales and geo analytics",
  "Desktop app for Mac and Windows",
]

export type Breadcrumb = { name: string; path: string }

export type PageStructuredDataInput = {
  path: string
  title: string
  description: string
  keywords?: string[]
  breadcrumbs?: Breadcrumb[]
  /** Only for pages where the FAQ is rendered visibly (Google requirement). */
  includeFaq?: boolean
  /** schema.org WebPage subtype, e.g. "AboutPage", "ContactPage", "CollectionPage". */
  pageType?: string
}

function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
    alternateName: ["EventParlour", "eventparlour.com"],
    slogan: "Sell out the room. Check them in at the door. Payout when the night ends.",
    description: ORG_DESCRIPTION,
    knowsAbout: [
      "Event ticketing",
      "Online ticket sales",
      "M-PESA payments",
      "Event management",
      "Event check-in",
      "Event marketing",
    ],
    sameAs: [...SOCIAL_PROFILES],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@eventparlour.com",
      contactType: "customer support",
      availableLanguage: ["English", "Swahili"],
    },
    areaServed: AREA_SERVED,
  }
}

function ticketingService() {
  return {
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "Event ticketing and event management",
    serviceType: "Event ticketing",
    description:
      "Sell event tickets online in Kenya and East Africa with M-PESA checkout, door check-in, and live sales tracking. No platform fee on free registration-only events; 5% platform fee per paid ticket sold.",
    provider: { "@id": ORG_ID },
    brand: { "@id": ORG_ID },
    areaServed: [...AREA_SERVED, ...CITIES.map((name) => ({ "@type": "City", name }))],
    audience: { "@type": "BusinessAudience", audienceType: "Event organizers" },
    url: `${SITE_URL}/`,
  }
}

function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    description:
      "Sell event tickets online in Kenya and East Africa. Event ticketing, M-PESA checkout, check-in and analytics for organizers; event discovery for attendees.",
  }
}

function softwareApplication() {
  return {
    "@type": "SoftwareApplication",
    "@id": PRODUCT_ID,
    name: "Event Parlour App",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Event ticketing and event management",
    operatingSystem: "Web, macOS, Windows",
    url: APP_URL,
    downloadUrl: `${SITE_URL}/download`,
    featureList: FEATURES,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
      description:
        "Free to start. No platform fee on free registration-only events; 5% platform fee per paid ticket sold. Payment-network charges are separate.",
      url: `${APP_URL}/pricing`,
    },
    publisher: { "@id": ORG_ID },
  }
}

function faqPage(pageUrl: string) {
  const questions = content.FAQSection.questions ?? []
  if (!questions.length) return null
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    name: content.FAQSection.title,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
}

function breadcrumbList(pageUrl: string, crumbs: Breadcrumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [{ name: "Home", path: "" }, ...crumbs].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: canonicalUrl(crumb.path),
      }),
    ),
  }
}

export function getPageStructuredData({
  path,
  title,
  description,
  keywords = [],
  breadcrumbs = [],
  includeFaq = false,
  pageType = "WebPage",
}: PageStructuredDataInput) {
  const url = canonicalUrl(path)
  const isHome = url === `${SITE_URL}/`
  const faq = includeFaq ? faqPage(url) : null
  const crumbs = !isHome && breadcrumbs.length ? breadcrumbList(url, breadcrumbs) : null

  const webPage = {
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImageUrl(path),
      width: 1200,
      height: 630,
    },
    ...(crumbs ? { breadcrumb: { "@id": crumbs["@id"] } } : {}),
  }

  const whyUsQuotes =
    path === "/why-us"
      ? {
          "@type": "ItemList",
          "@id": `${url}#quotes`,
          name: "What people say about Event Parlour",
          numberOfItems: WHY_US_TESTIMONIALS.length,
          itemListElement: WHY_US_TESTIMONIALS.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Quotation",
              text: item.description,
              url: item.link,
              creator: {
                "@type": "Person",
                name: item.name,
                jobTitle: item.profession,
              },
              about: { "@id": ORG_ID },
            },
          })),
        }
      : null

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      website(),
      webPage,
      ...(isHome ? [softwareApplication(), ticketingService()] : []),
      ...(crumbs ? [crumbs] : []),
      ...(faq ? [faq] : []),
      ...(whyUsQuotes ? [whyUsQuotes] : []),
    ],
  }
}

/** Serialize JSON-LD safely for inline <script> (no `</script>` breakouts). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
