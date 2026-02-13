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
      "Login to the app and look for events in the sidebar. Explore events of your choice and purchase tickets directly from the event page.",
  },
  {
    question: "Can I get a refund for my tickets?",
    answer:
      "Refund policies depend on the event organizer. Refunds are typically available up to 24 hours before the event starts, subject to the event organizer's policy. If you're unavailable and unable to attend, you can also transfer your ticket to someone else. For more information, please refer to our refund policy at https://app.eventparlour.com/legal/refund-policy",
  },
  {
    question: "Are events available internationally?",
    answer:
      "Currently supporting Kenya and Europe. Support for more regions coming soon. Follow our roadmap at https://app.eventparlour.com/roadmap for updates on new regions.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team via email at hello@eventparlour.com or through the #contact section.",
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
    <section className="py-10 xs:py-12 sm:py-16 bg-background">
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
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mr-3 xs:mr-4">
            {t('title')}
          </h2>
          <div className="flex-grow h-px bg-gradient-to-r from-border to-foreground"></div>
        </motion.div>

        <div className="space-y-2 xs:space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
              className="bg-muted border border-border shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-3 xs:p-4 sm:p-5 text-left text-foreground hover:bg-muted/80 transition-colors duration-200"
              >
                <span className="text-sm xs:text-base sm:text-lg font-medium pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-4 w-4 xs:h-5 xs:w-5 text-muted-foreground" />
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
                    className="p-3 xs:p-4 sm:p-5 bg-muted text-muted-foreground text-xs xs:text-sm"
                  >
                    {faq.answer.split(/(https?:\/\/[^\s]+|#[^\s]+)/g).map((part, i) => {
                      if (part.match(/^https?:\/\//)) {
                        return (
                          <a
                            key={i}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {part}
                          </a>
                        );
                      }
                      if (part.match(/^#/)) {
                        return (
                          <a
                            key={i}
                            href={part}
                            className="text-primary hover:underline"
                          >
                            {part}
                          </a>
                        );
                      }
                      return <span key={i}>{part}</span>;
                    })}
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