// components/shared/NewsletterSection.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you'd typically send the email to an API; for now, simulate success
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3s
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black via-[#171717] to-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="container mx-auto px-4 sm:px-6 text-center"
      >
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">Stay Updated</h2>
          <p className="mt-2 text-gray-300 text-sm md:text-base">
            Subscribe to our newsletter for the latest events and exclusive offers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="max-w-md mx-auto"
        >
          {submitted ? (
            <p className="text-green-400 text-sm font-medium">
              Thanks for subscribing! Check your inbox soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#1f1f1f] text-white border-[#2a2a2a] focus:border-gray-50 rounded-full px-4 py-2 w-full"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="bg-black hover:bg-[#171717] text-gray-100 hover:text-white rounded-full px-4 py-2"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}