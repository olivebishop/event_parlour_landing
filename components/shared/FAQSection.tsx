// components/shared/FAQSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "@/lib/i18n/translations";

const defaultFaqs = [
  {
    question: "How do I purchase tickets?",
    answer:
      "To purchase tickets, click on the 'Get Tickets' button on any event card. You'll need to sign in or create an account to complete your purchase.",
  },
  {
    question: "Can I get a refund for my tickets?",
    answer:
      "Refunds are available up to 24 hours before the event starts, subject to the event organizer's policy. If you're unavailable and unable to attend, you can also transfer your ticket to someone else. Check the event details for more information.",
  },
  {
    question: "Are events available internationally?",
    answer:
      "Yes, we feature events from various locations worldwide. Use the filters to find events near you or in specific regions.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team via email at support@example.com or through the 'Contact Us' page.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations('FAQSection');

  // Try to parse FAQs from translations, fallback to defaults
  let faqs = defaultFaqs;
  try {
    const translatedFaqs = t('questions');
    if (translatedFaqs && translatedFaqs !== 'questions') {
      faqs = JSON.parse(translatedFaqs);
    }
  } catch {
    // Use default FAQs if parsing fails
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Animation variants for the accordion content
  const variants = {
    open: { scaleY: 1, opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
    closed: { scaleY: 0, opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  return (
    <section className="py-10 xs:py-12 sm:py-16 bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="container mx-auto px-3 xs:px-4 sm:px-6"
      >
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center mb-6 xs:mb-8 sm:mb-10"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mr-3 xs:mr-4">{t('title')}</h2>
          <div className="flex-grow h-px bg-gradient-to-r from-gray-50 to-white"></div>
        </motion.div>

        <div className="space-y-2 xs:space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
              className="bg-zinc-900 shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-3 xs:p-4 sm:p-5 text-left text-white hover:bg-zinc-800 transition-colors duration-200"
              >
                <span className="text-sm xs:text-base sm:text-lg font-medium pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-4 w-4 xs:h-5 xs:w-5 text-gray-300" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    variants={variants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    style={{ transformOrigin: "top", willChange: "transform, opacity" }}
                    className="p-3 xs:p-4 sm:p-5 bg-zinc-900 text-gray-300 text-xs xs:text-sm"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}