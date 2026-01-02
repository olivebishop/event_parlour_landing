import Hero from "@/components/shared/Hero";

import FAQSection from "@/components/shared/FAQSection";
import ExpandingCards from "@/components/shared/animations/expanding-cards";
import Testimonials from "@/components/shared/Testimonials";
import { ContactUs } from "@/components/shared/contactUs/Contact";

export default function Home() {
  return (
   <main className="relative overflow-hidden bg-gradient-to-b from-black via-[#121212] to-black">
      {/* Hero Section */}
      <section className="relative z-10 lg:mt-0 mt-4 min-h-[70vh]">
        <Hero />
      </section>
      
      
        {/* Features Section - Expanding Cards */}
        <section id="features" className="relative z-20 mt-12 sm:mt-16 lg:mt-24 scroll-mt-24">
          <ExpandingCards />
        </section>
        
        {/* Why Us Section */}
        <section id="why-us" className="relative z-20 mt-12 sm:mt-16 lg:mt-24 scroll-mt-24">
          <Testimonials />
        </section>
        
        {/* FAQ Section */}
        <section className="relative z-20 mt-12 sm:mt-16 lg:mt-24">
          <FAQSection />
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="relative z-20 mt-12 sm:mt-16 lg:mt-24 pb-16 sm:pb-20 lg:pb-32 scroll-mt-24">
          <ContactUs />
        </section>
    </main>
  );
}