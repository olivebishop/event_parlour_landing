import Hero from "@/components/shared/Hero";
import EventSection from "@/components/shared/EventSection";
import FAQSection from "@/components/shared/FAQSection";
import BedsSection from "@/components/shared/BedSection";
import ExpandingCards from "@/components/shared/animations/expanding-cards";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-black">
      <div className="relative z-20">
        <Hero />
      </div>
      {/* Added responsive spacing class */}
      <div className="relative z-10  lg:mt-12">
        <EventSection />
      </div>
      <div className="relative z-10">
        <BedsSection />
      </div>
      <ExpandingCards />
      <FAQSection />
    </main>
  );
}