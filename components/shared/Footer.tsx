"use client"
import React, { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import content from "@/lib/content";
import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(
  () =>
    import("@/components/kibo-ui/theme-switcher").then((m) => ({
      default: m.ThemeSwitcher,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="h-8 sm:h-9 w-[7.5rem] rounded-full bg-muted/50 animate-pulse"
      />
    ),
  }
);
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
  const copy = content.Footer;

  React.useEffect(() => {
    if (isInView) {
      setFooterVisible(true);
    }
  }, [isInView]);

  const closingLines = [copy.closingLine1, copy.closingLine2]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const childVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: "easeInOut" as const,
      },
    },
  };

  const navColumns = useMemo(() => ({
    product: [
      { href: "https://app.eventparlour.com/auth/sign-up", label: copy.listYourEvent },
      { href: "https://app.eventparlour.com/auth/sign-in", label: copy.exploreEvents },
      { href: "#features", label: copy.features },
      { href: "https://app.eventparlour.com/roadmap", label: copy.roadmap },
    ],
    company: [
      { href: "#contact", label: copy.contactUs },
      { href: "https://app.eventparlour.com/legal/about", label: copy.about },
      { href: "https://app.eventparlour.com/legal/privacy-policy", label: copy.privacyPolicy },
      { href: "https://app.eventparlour.com/legal/terms-of-service", label: copy.termsOfService },
      { href: "https://app.eventparlour.com/legal/security", label: copy.security },
      { href: "https://app.eventparlour.com/legal/refund-policy", label: copy.refundPolicy },
      { href: "https://app.eventparlour.com/legal/cookie-policy", label: copy.cookiePolicy },
    ],
  }), [copy]);
  
  const socialLinks = [
    { href: "https://x.com/EventsPalour", label: "X (Twitter)", icon: HugeiconsNewTwitter },
    { href: "https://www.tiktok.com/@eventparlour", label: "TikTok", icon: HugeiconsTiktok },
    { href: "https://www.instagram.com/event.parlour", label: "Instagram", icon: HugeiconsInstagram },
    { href: "https://www.linkedin.com/company/eventparlour", label: "LinkedIn", icon: HugeiconsLinkedin01 },
    { href: "https://www.whatsapp.com/channel/0029ValLxITAO7RActotOX3R", label: "WhatsApp", icon: HugeiconsWhatsapp }
  ];

  return (
    <footer 
      className="bg-background w-full border-t border-border" 
      ref={footerTarget}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={footerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="flex justify-center md:justify-start pt-10 md:pt-12 pb-2"
        >
          {/* <Image
            src="/logo.png"
            alt={t("brandName")}
            width={200}
            height={56}
            className="h-10 md:h-12 w-auto object-contain object-left [filter:invert(1)_hue-rotate(180deg)_brightness(2.5)_saturate(2)] dark:[filter:none]"
            priority={false}
          /> */}
          <span className="text-2xl md:text-3xl font-heading font-semibold tracking-tight text-foreground lowercase">
            {copy.brandWordmark}
          </span>
        </motion.div>

        {/* Main Footer Content - Multi Column Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-10 md:py-14">
          {/* Product Column */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={footerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-foreground text-sm font-heading font-semibold mb-4 uppercase tracking-wider">{copy.product}</h4>
              <ul className="space-y-3">
                {navColumns.product.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
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
              <h4 className="text-foreground text-sm font-pixel font-semibold mb-4 uppercase tracking-wider">{copy.company}</h4>
              <ul className="space-y-3">
                {navColumns.company.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
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
              <h4 className="text-foreground text-sm font-pixel font-semibold mb-4 uppercase tracking-wider">{copy.weAreSocial}</h4>
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
              <p className="text-muted-foreground text-xs mt-4 font-body">{copy.joinCommunity}</p>
              <a
                href="https://tanstack.com/showcase/3c337dc8-cc31-40ee-adfc-413e9bdf041b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 px-2 py-1 rounded-full border border-border/50 bg-muted/30 text-[10px] text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/50 transition-colors"
              >
                <SimpleIconsTanstack className="w-3 h-3" />
                <span className="font-body">{copy.featuredInTanStack}</span>
              </a>
              <div className="mt-6">
                <p className="text-muted-foreground text-xs mb-2 font-body">{copy.theme}</p>
                <ThemeSwitcher />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Closing tagline — Ramp-style convert line for events */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={footerVisible ? "visible" : "hidden"}
          className="overflow-hidden px-2 sm:px-4 py-10 sm:py-12 md:py-14 lg:py-16"
          aria-label={`${copy.closingLine1} ${copy.closingLine2}`}
        >
          <div className="flex flex-col items-center justify-center text-center gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto">
            {closingLines.map((line) => (
              <div key={line} className="overflow-hidden w-full">
                <motion.p
                  variants={childVariants}
                  className="font-heading font-bold text-foreground leading-[1.08] sm:leading-[1.05] tracking-tight text-balance text-[clamp(1.5rem,7.2vw,5rem)]"
                >
                  {line}
                </motion.p>
              </div>
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
            <span className="flex items-center">©<span className="font-numbers tabular-nums">{new Date().getFullYear()}</span> <span className="text-foreground font-heading ml-1 lowercase">{copy.brandWordmark}</span></span>
            <span className="hidden sm:inline mx-0 sm:mx-1">•</span>
            <span className="flex items-center">{copy.address2}</span>
            <span className="hidden sm:inline mx-0 sm:mx-1">•</span>
            <span className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
              {copy.copyright
                .replace("©{year}", "")
                .replace("event parlour.", "")
                .replace("circleup.", "")
                .trim()}
            </span>
            <span className="hidden sm:inline mx-0 sm:mx-1">•</span>
            <a
              href="https://event-parlour.openstatus.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              {copy.systemStatus} <span className="text-green-500 dark:text-green-400 font-semibold ml-1">{copy.operational}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;