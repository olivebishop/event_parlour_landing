import en from "@/messages/en.json"

const SITE_URL = "https://www.eventparlour.com"
const APP_URL = "https://app.eventparlour.com"

/** JSON-LD @graph for search engines & generative systems (GEO). */
export function getSiteStructuredDataGraph() {
  const faqQuestions = en.FAQSection.questions ?? []

  const faqPage = faqQuestions.length
    ? {
        "@type": "FAQPage" as const,
        "@id": `${SITE_URL}/#faq`,
        url: SITE_URL,
        name: en.FAQSection.title,
        mainEntity: faqQuestions.map((item) => ({
          "@type": "Question" as const,
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: item.answer,
          },
        })),
      }
    : null

  const graph = [
    {
      "@type": "Organization" as const,
      "@id": `${SITE_URL}/#organization`,
      name: "Event Parlour",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        "Event marketplace and distribution platform connecting organizers with event-goers. Ticketing and event management focused on Nairobi, Kenya and expanding regions.",
      sameAs: [
        "https://x.com/event_parlour",
        "https://www.linkedin.com/company/eventparlour",
        "https://www.instagram.com/event.parlour",
        "https://www.whatsapp.com/channel/0029ValLxITAO7RActotOX3R",
        "https://www.tiktok.com/@eventparlour",
        "https://github.com/events-palour",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@eventparlour.com",
        contactType: "customer support",
        availableLanguage: ["English", "Swahili"],
      },
      areaServed: [
        { "@type": "Country", name: "Kenya" },
        { "@type": "Place", name: "Europe" },
      ],
    },
    {
      "@type": "WebSite" as const,
      "@id": `${SITE_URL}/#website`,
      name: "Event Parlour",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en", "sw", "fr", "ar", "de", "es"],
      description:
        "Reach thousands of event-goers in Nairobi. Distribution-first marketing, ticketing, and management for organizers, attendees, and vendors.",
    },
    {
      "@type": "WebPage" as const,
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Event Parlour — Events marketplace for organizers & attendees",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      description:
        "Get your events in front of the right audience. Connect organizers with active event-goers in Nairobi and beyond.",
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication" as const,
      "@id": `${SITE_URL}/#product`,
      name: "Event Parlour App",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: APP_URL,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Sign up via the Event Parlour app for ticketing and organizer tools.",
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    ...(faqPage ? [faqPage] : []),
  ]

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}
