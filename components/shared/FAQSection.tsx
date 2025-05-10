// components/shared/FAQSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Animation variants for the accordion content
  const variants = {
    open: { scaleY: 1, opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
    closed: { scaleY: 0, opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black via-[#171717] to-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="container mx-auto px-4 sm:px-6"
      >
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mr-4">Frequently Asked Questions</h2>
          <div className="flex-grow h-px bg-gradient-to-r from-gray-50 to-white"></div>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
              className="bg-[#1f1f1f] rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left text-white hover:bg-[#2a2a2a] transition-colors duration-200"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-300" />
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
                    className="p-5 bg-[#171717] text-gray-300 text-sm"
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