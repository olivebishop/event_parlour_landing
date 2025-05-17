import Hero from "@/components/shared/Hero";
import EventSection from "@/components/shared/EventSection";
// import FAQSection from "@/components/shared/FAQSection";
import BedsSection from "@/components/shared/BedSection";
// import ExpandingCards from "@/components/shared/animations/expanding-cards";

export default function Home() {
  return (
   <main className="relative overflow-hidden bg-gradient-to-b from-black via-[#121212] to-black">
      {/* Hero Section */}
      <section className="relative z-10 lg:mt-0 mt-4 min-h-[70vh]">
        <Hero />
      </section>
      
      {/* Content Sections */}
      <div className="w-full">
        {/* Event Section - reduced top margin for small screens */}
      <section id="events" className="relative z-10 mt-4 sm:mt-8 lg:mt-12">
          <EventSection />
        </section>
        
        {/* Beds Section - consistent spacing across breakpoints */}
        <section className="relative z-10 mt-12 sm:mt-16 lg:mt-24">
          <BedsSection />
        </section>
        
        {/* Expanding Cards - responsive spacing */}
        {/* <section className="relative z-20 mt-12 sm:mt-16 lg:mt-24">
          <ExpandingCards />
        </section> */}
        
        {/* FAQ Section - consistent bottom padding */}
        {/* <section className="relative z-20 mt-12 sm:mt-16 lg:mt-24 pb-16 sm:pb-20 lg:pb-32">
          <FAQSection />
        </section> */}
      </div>
    </main>
  );
}