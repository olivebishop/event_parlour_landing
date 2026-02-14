import type { Metadata } from "next";
import Hero from "@/components/shared/Hero";
import DistributionMetrics from "@/components/shared/DistributionMetrics";
import FAQSection from "@/components/shared/FAQSection";
import ExpandingCards from "@/components/shared/animations/expanding-cards";
import Testimonials from "@/components/shared/Testimonials";
import { ContactUs } from "@/components/shared/contactUs/Contact";
import FeaturesSection from "@/components/shared/FeaturesSection";
import InteractiveDemo from "@/components/shared/InteractiveDemo";

const siteUrl = "https://www.eventparlour.com";

export const metadata: Metadata = {
  title: "Event Parlour - Reach Thousands of Event-Goers in Nairobi",
  description: "Get your events in front of the right audience. We connect organizers with active event-goers looking for experiences like yours. Distribution first. Management included.",
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  return (
   <main className="relative overflow-hidden bg-background">
      {/* Global subtle noise texture - very subtle across entire page */}
      <div 
        className="fixed inset-0 dark:hidden pointer-events-none z-0"
        style={{
          background: `#ffffff url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: '0.008',
        }}
      />
      <div 
        className="fixed inset-0 hidden dark:block pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: '0.01',
        }}
      />
      
      {/* Hero Section */}
      <section className="relative z-10">
        <Hero />
      </section>
      
      {/* Interactive Demo Section */}
      <section
        id="demo"
        className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16 scroll-mt-24"
      >
        <InteractiveDemo />
      </section>
      
      {/* User Types Section - Expanding Cards */}
      <section
        id="user-types"
        className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16 scroll-mt-24"
      >
        <ExpandingCards />
      </section>
      
      {/* Features Section */}
      <section
        id="features"
        className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16 scroll-mt-24"
      >
        <FeaturesSection />
      </section>
      
      {/* Distribution Metrics Section - Social Proof */}
      <section className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16">
        <DistributionMetrics />
      </section>
      
      {/* Why Us Section - Testimonials */}
      <section
        id="why-us"
        className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16 scroll-mt-24"
      >
        <Testimonials />
      </section>
      
      {/* FAQ Section */}
      <section className="relative z-20 mt-8 sm:mt-10 md:mt-12 lg:mt-16">
        <FAQSection />
      </section>
      
      {/* Contact Section */}
      <section
        id="contact"
        className="relative z-20 mt-10 sm:mt-12 md:mt-14 lg:mt-16 pb-10 sm:pb-14 md:pb-16 lg:pb-20 scroll-mt-24"
      >
        <ContactUs />
      </section>
    </main>
  );
}