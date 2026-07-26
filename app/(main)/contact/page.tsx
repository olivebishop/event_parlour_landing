import type { Metadata } from "next"
import dynamic from "next/dynamic"
import content from "@/lib/content"
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell"
import { SectionSkeleton } from "@/components/shared/section-skeleton"
import FAQSection from "@/components/shared/FAQSection"

export const revalidate = 300

const ContactUs = dynamic(
  () =>
    import("@/components/shared/contactUs/Contact").then((m) => ({
      default: m.ContactUs,
    })),
  { loading: () => <SectionSkeleton className="min-h-[480px] w-full" /> },
)

const siteUrl = "https://www.eventparlour.com"

export const metadata: Metadata = {
  title: "Contact & FAQ — Talk to the Event Parlour team",
  description: `${content.ContactUs.description} Find answers to common questions about ticketing and payouts.`,
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    images: [{ url: `${siteUrl}/og/contact`, width: 1200, height: 630 }],
  },
  twitter: {
    images: [`${siteUrl}/og/contact`],
  },
}

export default function ContactPage() {
  return (
    <MarketingPageShell>
      <section
        id="contact"
        className="relative z-20 scroll-mt-24 pb-6 pt-20 sm:pb-8 sm:pt-24 md:pb-10"
      >
        <ContactUs />
      </section>

      <section id="faq" className="relative z-20 scroll-mt-24">
        <FAQSection />
      </section>
    </MarketingPageShell>
  )
}
