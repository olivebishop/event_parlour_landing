import ExpandingCards from "@/components/shared/animations/expanding-cards";
import FAQSection from "@/components/shared/FAQSection";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-black">
      {/* Expanding Cards Section */}
      <section className="relative z-20 mt-12 sm:mt-16 lg:mt-24">
        <ExpandingCards />
      </section> 
      {/* <section className="relative z-20 mt-12 sm:mt-16 lg:mt-24">
        <ExpandingCards />
      </section>  */}
      
      {/* FAQ Section */}
      <section className="relative z-20 mt-12 sm:mt-16 lg:mt-24 pb-16 sm:pb-20 lg:pb-32">
        <FAQSection />
      </section> 
    </main>
  );
}