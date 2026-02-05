import type { Metadata } from "next";
import Hero from "@/components/shared/Hero";
import DistributionMetrics from "@/components/shared/DistributionMetrics";
import FAQSection from "@/components/shared/FAQSection";
import ExpandingCards from "@/components/shared/animations/expanding-cards";
import Testimonials from "@/components/shared/Testimonials";
import { ContactUs } from "@/components/shared/contactUs/Contact";
import FeaturesSection from "@/components/shared/FeaturesSection";

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
   <main className="relative overflow-hidden bg-black">
      {/* Hero Section */}
      <section className="relative z-10">
        <Hero />
      </section>
      
      {/* Distribution Metrics Section */}
      <section className="relative z-20">
        <DistributionMetrics />
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
        
        {/* Why Us Section */}
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