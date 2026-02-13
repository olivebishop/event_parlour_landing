"use client"
import React, { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "@/lib/i18n/translations";
import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { 
  HugeiconsWhatsapp, 
  HugeiconsTiktok, 
  HugeiconsInstagram, 
  HugeiconsLinkedin01, 
  HugeiconsNewTwitter,
  SimpleIconsTanstack, 
} from "./social-icons";

const Footer = () => {
  const [footerVisible, setFooterVisible] = useState(false);
  const footerTarget = useRef(null);
  const isInView = useInView(footerTarget, { once: true, amount: 0.1 });
  const t = useTranslations('Footer');
  const locale = useLocale(); // Make component reactive to language changes

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

  // Recalculate navColumns when locale changes - this ensures translations update
  const navColumns = useMemo(() => ({
    product: [
      { href: "https://app.eventparlour.com/auth/sign-up", label: t('listYourEvent') },
      { href: "https://app.eventparlour.com/auth/sign-in", label: t('exploreEvents') },
      { href: "#features", label: t('features') },
      { href: "https://app.eventparlour.com/roadmap", label: t('roadmap') },
    ],
    company: [
      { href: "#contact", label: t('contactUs') },
      { href: "https://app.eventparlour.com/legal/about", label: t('about') },
      { href: "https://app.eventparlour.com/legal/privacy-policy", label: t('privacyPolicy') },
      { href: "https://app.eventparlour.com/legal/terms-of-service", label: t('termsOfService') },
      { href: "https://app.eventparlour.com/legal/security", label: t('security') },
      { href: "https://app.eventparlour.com/legal/refund-policy", label: t('refundPolicy') },
      { href: "https://app.eventparlour.com/legal/cookie-policy", label: t('cookiePolicy') },
    ],
  }), [locale, t]);
  
  const socialLinks = [
    { href: "https://x.com/EventsPalour", label: "X (Twitter)", icon: HugeiconsNewTwitter },
    { href: "https://www.tiktok.com/@eventparlour", label: "TikTok", icon: HugeiconsTiktok },
    { href: "https://www.instagram.com/event.parlour", label: "Instagram", icon: HugeiconsInstagram },
    { href: "https://www.linkedin.com/company/eventparlour", label: "LinkedIn", icon: HugeiconsLinkedin01 },
    { href: "https://www.whatsapp.com/channel/0029ValLxITAO7RActotOX3R", label: "WhatsApp", icon: HugeiconsWhatsapp }
  ];

  return (
    <footer 
      key={locale}
      className="bg-background w-full border-t border-border" 
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
              <h4 className="text-foreground text-sm font-heading font-semibold mb-4 uppercase tracking-wider">{t('product')}</h4>
              <ul className="space-y-3">
                {navColumns.product.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body"
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
              <h4 className="text-foreground text-sm font-heading font-semibold mb-4 uppercase tracking-wider">{t('company')}</h4>
              <ul className="space-y-3">
                {navColumns.company.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body"
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

          {/* Social Column */}
          <div className="col-span-2 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={footerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-foreground text-sm font-heading font-semibold mb-4 uppercase tracking-wider">{t('weAreSocial')}</h4>
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
                      <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-foreground transition-all duration-300 bg-muted/50 group-hover:bg-muted">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>
              <p className="text-muted-foreground text-xs mt-4 font-body">{t('joinCommunity')}</p>
              <a
                href="https://tanstack.com/showcase/3c337dc8-cc31-40ee-adfc-413e9bdf041b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 px-2 py-1 rounded-full border border-border/50 bg-muted/30 text-[10px] text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/50 transition-colors"
              >
                <SimpleIconsTanstack className="w-3 h-3" />
                <span className="font-body">{t('featuredInTanStack')}</span>
              </a>
              <div className="mt-6">
                <p className="text-muted-foreground text-xs mb-2 font-body">{t('theme')}</p>
                <ThemeSwitcher />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Brand Text Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={footerVisible ? "visible" : "hidden"}
          className="overflow-hidden py-8"
        >
          <div className="flex flex-wrap justify-center">
            {brandText.map((letter, i) => (
              <motion.span
                key={i}
                variants={childVariants}
                className="inline-block text-black dark:text-white text-[10vw] xs:text-[9vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] xl:text-[5vw] 2xl:text-[4vw] font-heading leading-none opacity-10"
                style={{ 
                  display: "inline-block", 
                  overflow: "hidden",
                  marginRight: letter === " " ? "clamp(0.3rem, 1vw, 1rem)" : "0"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-y-1.5 sm:gap-y-0 gap-x-0 sm:gap-x-3 text-muted-foreground text-xs text-center sm:text-left font-body"
            initial={{ opacity: 0 }}
            animate={footerVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="flex items-center">©{new Date().getFullYear()} <span className="text-foreground font-heading ml-1">Event Parlour</span></span>
            <span className="hidden sm:inline mx-0 sm:mx-1">•</span>
            <span className="flex items-center">{t('address2')}</span>
            <span className="hidden sm:inline mx-0 sm:mx-1">•</span>
            <span className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
              {t('copyright').replace('©{year}', '').replace('event parlour.', '').trim()}
            </span>
            <span className="hidden sm:inline mx-0 sm:mx-1">•</span>
            <a
              href="https://event-parlour.openstatus.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              {t('systemStatus')} <span className="text-green-500 dark:text-green-400 font-semibold ml-1">{t('operational')}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;