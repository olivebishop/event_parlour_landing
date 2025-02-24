import { BannerHero } from "@/components/shared/BannerHero";
import BedsSection from "@/components/shared/BedSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";


function CTABanner() {
  return (
    <section className="py-12 bg-gradient-to-r from-black to-[#171717] text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Secure Your Stay for the Event!
      </h2>
      <Link href="/sign-in">
        <Button className="bg-black text-gray-100 hover:bg-[#171717] border-[#171717] border hover:text-white px-6 py-2 rounded-full">
        Reserve Your Event Stay Now
        </Button>
      </Link>
    </section>
  );
}

export default function BedsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#171717] to-black mt-[72px] sm:mt-[88px]">
      <BannerHero />
      <BedsSection />
      <CTABanner />
    </main>
  );
}