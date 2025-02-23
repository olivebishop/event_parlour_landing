// app/page.tsx
import { Hero } from "@/components/shared/Hero";
import EventSection from "@/components/shared/EventSection";
import FAQSection from "@/components/shared/FAQSection";
import BedsSection from "@/components/shared/BedSection";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#171717]">
      <div className="mt-[72px] sm:mt-[88px]">
        <Hero />
      </div>
      {/* Overlay only on mobile, normal spacing on desktop */}
      <div className="mt-0 md:mt-0 relative z-20">
        {/* use below commented infuture */}
      {/* <div className="-mt-48 md:mt-0 relative z-20"> */}
        <EventSection />
      </div>
      <div className="relative z-10">
        <BedsSection />
      </div>
      <FAQSection />
    </main>
  );
}