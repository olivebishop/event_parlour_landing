"use client"
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  const [footerVisible, setFooterVisible] = useState(false);
  const footerTarget = useRef(null);
  const isInView = useInView(footerTarget, { once: true, amount: 0.1 });

  React.useEffect(() => {
    if (isInView) {
      setFooterVisible(true);
    }
  }, [isInView]);

  const brandText = ["e", ".", "p", "a", "r", "l", "o", "u", "r"];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const childVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const quickLinks = [
    { href: "/", label: "Events" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-condition", label: "Terms And Condition" },
   
  ];
  
  const socialLinks = [
    { href: "https://x.com/EventsPalour", label: "X " },
    { href: "https://www.tiktok.com/@eventparlour", label: "TikTok" },
    // { href: "https://facebook.com/eparlour", label: "Facebook" },
    { href: "https://www.instagram.com/event.parlour", label: "Instagram" },
    { href: "https://www.linkedin.com/company/eventparlour", label: "LinkedIn" },
    { href: "https://www.whatsapp.com/channel/0029ValLxITAO7RActotOX3R", label: "WhatsApp Channel" }
 
  ];

  return (
    <footer 
      className="bg-black w-full" 
      ref={footerTarget}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <h6 className="text-white font-[rejoice-body] text-2xl lg:text-[1.8vw] mb-4">
              Relax we&apos;ve got you
            </h6>
            <motion.a
              href="/updates"
              className="inline-flex items-center space-x-2 text-sm text-white hover:text-gray-200 transition-colors border border-white/80 rounded-full px-4 py-1 backdrop-blur-sm mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>Latest Updates</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <div className="text-gray-300 text-sm space-y-2">
              <p>123 Business District</p>
              <p>Nairobi, Kenya</p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="col-span-1">
            <h6 className="text-white font-[rejoice-body] text-lg mb-4">Quick Links</h6>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="col-span-1">
            <h6 className="text-white text-lg mb-4 font-[rejoice-body]">Follow Us</h6>
            <ul className="space-y-2">
              {socialLinks.map((social, i) => (
                <li key={i}>
                  <Link 
                    href={social.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand Text Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={footerVisible ? "visible" : "hidden"}
          className="overflow-hidden my-12"
        >
          <div className="flex flex-wrap">
            {brandText.map((letter, i) => (
              <motion.span
                key={i}
                variants={childVariants}
                className="inline-block text-white text-[15vw] sm:text-[12vw] md:text-[4vw] lg:text-[3vw] font-[rejoice-heading] leading-none"
                style={{ 
                  display: "inline-block", 
                  overflow: "hidden"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-300  text-sm mb-4 sm:mb-0">
              ©{new Date().getFullYear()} <span className="font-semibold ">event parlour</span>. All rights reserved.
            </p>
            <Link 
              href="/legal"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;