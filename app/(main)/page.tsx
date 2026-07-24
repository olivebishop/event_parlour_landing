import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Hero from "@/components/shared/Hero"
import FAQSection from "@/components/shared/FAQSection"
import { SectionSkeleton } from "@/components/shared/section-skeleton"

export const revalidate = 300

const InteractiveDemo = dynamic(
  () => import("@/components/shared/InteractiveDemo"),
  { loading: () => <SectionSkeleton className="min-h-[640px] w-full" /> }
)

const ExpandingCards = dynamic(
  () => import("@/components/shared/animations/expanding-cards"),
  { loading: () => <SectionSkeleton className="min-h-[280px] w-full" /> }
)

const FeaturesSection = dynamic(
  () => import("@/components/shared/FeaturesSection"),
  { loading: () => <SectionSkeleton className="min-h-[400px] w-full" /> }
)

const DistributionMetrics = dynamic(
  () => import("@/components/shared/DistributionMetrics"),
  { loading: () => <SectionSkeleton className="min-h-[200px] w-full" /> }
)

const Testimonials = dynamic(
  () => import("@/components/shared/Testimonials"),
  { loading: () => <SectionSkeleton className="min-h-[360px] w-full" /> }
)

const ContactUs = dynamic(
  () =>
    import("@/components/shared/contactUs/Contact").then((m) => ({
      default: m.ContactUs,
    })),
  { loading: () => <SectionSkeleton className="min-h-[480px] w-full" /> }
)

const siteUrl = "https://www.eventparlour.com"

export const metadata: Metadata = {
  title: "Event Parlour - Reach Thousands of Event-Goers in Nairobi",
  description:
    "Get your events in front of the right audience. We connect organizers with active event-goers looking for experiences like yours. Distribution first. Management included.",
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background">
      <div
        className="fixed inset-0 dark:hidden pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: `#ffffff url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: "0.008",
        }}
      />
      <div
        className="fixed inset-0 hidden dark:block pointer-events-none z-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: "0.01",
        }}
      />

      <section className="relative z-10">
        <Hero />
      </section>

      <section
        id="demo"
        className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16 scroll-mt-24"
      >
        <InteractiveDemo />
      </section>

      <section
        id="user-types"
        className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16 scroll-mt-24"
      >
        <ExpandingCards />
      </section>

      <section
        id="features"
        className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16 scroll-mt-24"
      >
        <FeaturesSection />
      </section>

      <section className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16">
        <DistributionMetrics />
      </section>

      <section
        id="why-us"
        className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16 scroll-mt-24"
      >
        <Testimonials />
      </section>

      <section className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16">
        <FAQSection />
      </section>

      <section
        id="contact"
        className="relative z-20 mt-10 sm:mt-12 md:mt-14 lg:mt-16 pb-10 sm:pb-14 md:pb-16 lg:pb-20 scroll-mt-24"
      >
        <ContactUs />
      </section>
    </main>
  )
}
