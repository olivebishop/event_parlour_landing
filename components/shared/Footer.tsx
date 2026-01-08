"use client"
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/lib/i18n/translations";
import { 
  HugeiconsWhatsapp, 
  HugeiconsTiktok, 
  HugeiconsInstagram, 
  HugeiconsLinkedin01, 
  HugeiconsNewTwitter 
} from "./social-icons";

const Footer = () => {
  const [footerVisible, setFooterVisible] = useState(false);
  const footerTarget = useRef(null);
  const isInView = useInView(footerTarget, { once: true, amount: 0.1 });
  const t = useTranslations('Footer');

  React.useEffect(() => {
    if (isInView) {
      setFooterVisible(true);
    }
  }, [isInView]);

  const brandText = ["e", "v", "e", "n", "t", " ", "p", "a", "r", "l", "o", "u", "r"];

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navColumns = {
    product: [
      { href: "https://app.eventparlour.com/auth/sign-up", label: "List your event" },
      { href: "https://app.eventparlour.com/auth/sign-in", label: "Explore events" },
      { href: "#features", label: "Features" },
    ],
    company: [
      { href: "#contact", label: "Contact us" },
      { href: "/legal", label: "Terms & Conditions" },
      { href: "/legal", label: "Privacy Policy" },
    ],
  };
  
  const socialLinks = [
    { href: "https://x.com/EventsPalour", label: "X (Twitter)", icon: HugeiconsNewTwitter },
    { href: "https://www.tiktok.com/@eventparlour", label: "TikTok", icon: HugeiconsTiktok },
    { href: "https://www.instagram.com/event.parlour", label: "Instagram", icon: HugeiconsInstagram },
    { href: "https://www.linkedin.com/company/eventparlour", label: "LinkedIn", icon: HugeiconsLinkedin01 },
    { href: "https://www.whatsapp.com/channel/0029ValLxITAO7RActotOX3R", label: "WhatsApp", icon: HugeiconsWhatsapp }
  ];

  return (
    <footer 
      className="bg-black w-full border-t border-white/10" 
      ref={footerTarget}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content - Multi Column Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-12 md:py-16">
          {/* Product Column */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={footerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Product</h4>
              <ul className="space-y-3">
                {navColumns.product.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company Column */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={footerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                {navColumns.company.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Column */}
          <div className="col-span-2 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={footerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">We are social :)</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, i) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      aria-label={social.label}
                    >
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:border-white transition-all duration-300 bg-white/5 group-hover:bg-white/10">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>
              <p className="text-gray-500 text-xs mt-4">Join the community on WhatsApp channel</p>
            </motion.div>
          </div>
        </div>

        {/* Brand Text Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={footerVisible ? "visible" : "hidden"}
          className="overflow-hidden py-8 border-t border-white/10"
        >
          <div className="flex flex-wrap justify-center">
            {brandText.map((letter, i) => (
              <motion.span
                key={i}
                variants={childVariants}
                className="inline-block text-white text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-[rejoice-heading] leading-none opacity-10"
                style={{ 
                  display: "inline-block", 
                  overflow: "hidden",
                  marginRight: letter === " " ? "clamp(0.5rem, 1.5vw, 1.5rem)" : "0"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <motion.div 
            className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-2 text-gray-500 text-xs text-center sm:text-left"
            initial={{ opacity: 0 }}
            animate={footerVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>©{new Date().getFullYear()} <span className="text-white">Event Parlour</span></p>
            <span>•</span>
            <p>{t('address1')}</p>
            <span className="hidden sm:inline">•</span>
            <p className="w-full sm:w-auto">
              {t('copyright').replace('©{year}', '').replace('event parlour.', '').trim()}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;