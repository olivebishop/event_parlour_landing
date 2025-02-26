import { Hero } from "@/components/shared/Hero";
import EventSection from "@/components/shared/EventSection";
import FAQSection from "@/components/shared/FAQSection";
import BedsSection from "@/components/shared/BedSection";
import ExpandingCards from "@/components/shared/animations/expanding-cards";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#171717]">
      <div className="relative z-20">
        <Hero />
      </div>
      <div className="relative z-10">
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