"use client";

import {  useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ExpandingCards from "@/components/shared/animations/expanding-cards";
import Testimonials from "@/components/shared/Testimonials";
import FAQSection from "@/components/shared/FAQSection";

export default function Home() {
  // References for scroll animations
  const expandingCardsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const faqRef = useRef(null);

  // Check if sections are in view
  const expandingCardsInView = useInView(expandingCardsRef, { once: false, amount: 0.2 });
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.2 });
  const faqInView = useInView(faqRef, { once: false, amount: 0.2 });

  // Page load animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.3
      }
    }
  };

  // Section animation variants
  const sectionVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // For parallax scroll effect
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <motion.main 
      className="relative overflow-hidden bg-black"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* Background parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] to-black opacity-80"
        style={{ y: backgroundY }}
      />

      {/* Expanding Cards Section */}
      <motion.section 
        ref={expandingCardsRef}
        className="relative z-20 mt-12 sm:mt-16 lg:mt-24"
        variants={sectionVariants}
        animate={expandingCardsInView ? "visible" : "hidden"}
      >
        <ExpandingCards />
      </motion.section>
      
      {/* Testimonials Section */}
      <motion.section 
        ref={testimonialsRef}
        className="relative z-20 mt-12 sm:mt-16 lg:mt-24"
        variants={sectionVariants}
        animate={testimonialsInView ? "visible" : "hidden"}
      >
        <Testimonials />
      </motion.section>
      
      {/* FAQ Section */}
      <motion.section 
        ref={faqRef}
        className="relative z-20 mt-12 sm:mt-16 lg:mt-24 pb-16 sm:pb-20 lg:pb-32"
        variants={sectionVariants}
        animate={faqInView ? "visible" : "hidden"}
      >
        <FAQSection />
      </motion.section>
    </motion.main>
  );
}