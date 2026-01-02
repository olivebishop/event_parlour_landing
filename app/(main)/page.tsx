import Hero from "@/components/shared/Hero";

import FAQSection from "@/components/shared/FAQSection";
import ExpandingCards from "@/components/shared/animations/expanding-cards";
import Testimonials from "@/components/shared/Testimonials";
import { ContactUs } from "@/components/shared/contactUs/Contact";
import FeaturesSection from "@/components/shared/FeaturesSection";

export default function Home() {
  return (
   <main className="relative overflow-hidden bg-black">
      {/* Hero Section */}
      <section className="relative z-10">
        <Hero />
      </section>
      
      
        {/* User Types Section - Expanding Cards */}
        <section id="user-types" className="relative z-20 mt-12 sm:mt-16 lg:mt-24 scroll-mt-24">
          <ExpandingCards />
        </section>
        
        {/* Features Section */}
        <section id="features" className="relative z-20 mt-12 sm:mt-16 lg:mt-24 scroll-mt-24">
          <FeaturesSection />
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