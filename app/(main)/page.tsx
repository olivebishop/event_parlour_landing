import Hero from "@/components/shared/Hero";
import EventSection from "@/components/shared/EventSection";
import FAQSection from "@/components/shared/FAQSection";
import BedsSection from "@/components/shared/BedSection";
import ExpandingCards from "@/components/shared/animations/expanding-cards";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-black">
      {/* Hero Section */}
      <section className="relative z-30">
        <Hero />
      </section>
      
      {/* Content Sections */}
      <div className="w-full">
        {/* Event Section - reduced top margin for small screens */}
        <section className="relative z-20 mt-8 sm:mt-12 lg:mt-16">
          <EventSection />
        </section>
        
        {/* Beds Section - consistent spacing across breakpoints */}
        <section className="relative z-20 mt-12 sm:mt-16 lg:mt-24">
          <BedsSection />
        </section>
        
        {/* Expanding Cards - responsive spacing */}
        <section className="relative z-20 mt-12 sm:mt-16 lg:mt-24">
          <ExpandingCards />
        </section>
        
        {/* FAQ Section - consistent bottom padding */}
        <section className="relative z-20 mt-12 sm:mt-16 lg:mt-24 pb-16 sm:pb-20 lg:pb-32">
          <FAQSection />
        </section>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/80 z-10" />
        
        {/* Animated dots */}
        <div className="absolute top-1/4 left-1/5 w-1 h-1 rounded-full bg-white/30 animate-pulse" style={{animationDuration: '3s'}} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-white/30 animate-pulse" style={{animationDuration: '4s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-white/30 animate-pulse" style={{animationDuration: '5s'}} />
      </div>
    </main>
  );
}