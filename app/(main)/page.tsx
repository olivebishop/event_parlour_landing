import type { Metadata } from "next";
import Hero from "@/components/shared/Hero";

import FAQSection from "@/components/shared/FAQSection";
import ExpandingCards from "@/components/shared/animations/expanding-cards";
import Testimonials from "@/components/shared/Testimonials";
import { ContactUs } from "@/components/shared/contactUs/Contact";
import FeaturesSection from "@/components/shared/FeaturesSection";

const siteUrl = "https://www.eventparlour.com";

export const metadata: Metadata = {
  title: "Event Parlour - Events & Accommodation Booking",
  description: "Connecting organizers, attendees, and vendors in one seamless experience. Discover events, book accommodations, and plan your perfect event experience.",
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
      
      
        {/* User Types Section - Expanding Cards */}
        <section id="user-types" className="relative z-20 mt-8 xs:mt-10 sm:mt-12 md:mt-16 lg:mt-24 scroll-mt-24">
          <ExpandingCards />
        </section>
        
        {/* Features Section */}
        <section id="features" className="relative z-20 mt-8 xs:mt-10 sm:mt-12 md:mt-16 lg:mt-24 scroll-mt-24">
          <FeaturesSection />
        </section>
        
        {/* Why Us Section */}
        <section id="why-us" className="relative z-20 mt-8 xs:mt-10 sm:mt-12 md:mt-16 lg:mt-24 scroll-mt-24">
          <Testimonials />
        </section>
        
        {/* FAQ Section */}
        <section className="relative z-20 mt-8 xs:mt-10 sm:mt-12 md:mt-16 lg:mt-24">
          <FAQSection />
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="relative z-20 mt-8 xs:mt-10 sm:mt-12 md:mt-16 lg:mt-24 pb-10 xs:pb-12 sm:pb-16 md:pb-20 lg:pb-32 scroll-mt-24">
          <ContactUs />
        </section>
    </main>
  );
}