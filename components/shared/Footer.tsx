"use client";

import { motion } from "framer-motion";
import {
  HugeiconsWhatsapp,
  HugeiconsTiktok,
  HugeiconsGithub,
  HugeiconsInstagram,
  HugeiconsLinkedin01,
  HugeiconsNewTwitter,
  SimpleIconsTanstack,
} from "./social-icons";
import { BrandGrainOverlay } from "@/components/grain-overlay";
import { BrandLogoLink } from "@/components/shared/brand-logo-link";
import { PixelLabel } from "@/components/shared/pixel-label";
import { ThemeSwitcher as FooterThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { Button } from "@/components/ui/button";
import { FooterSystemStatus } from "@/components/shared/footer-system-status";
import { appHref } from "@/lib/app-url";

function resolveFooterHref(href: string): string {
  if (href.startsWith("http") || href.startsWith("#")) {
    return href;
  }
  return appHref(href);
}

const FOOTER_CLOSING_LINES = ["You know the drill.", "Sell out."] as const;

const closingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const closingLineVariants = {
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

const footerLinkClass =
  "inline-flex min-h-9 items-center font-body text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function FooterNavColumn({
  title,
  links,
  onNavClick,
}: {
  title: string;
  links: { href: string; label: string }[];
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <div className="min-w-0">
      <PixelLabel
        variant="plain"
        tone="foreground"
        as="h2"
        className="mb-4 block"
      >
        {title}
      </PixelLabel>
      <ul className="space-y-0.5">
        {links.map((link) => {
          const href = resolveFooterHref(link.href);
          return (
            <li key={link.href}>
              <a
                href={href}
                onClick={(e) => onNavClick(e, href)}
                className={footerLinkClass}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const Footer = () => {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const listEventHref = appHref("/auth/sign-up");
  const exploreHref = appHref("/auth/sign-in");

  const navColumns = {
    product: [
      { href: "/auth/sign-up", label: "List Your Event" },
      { href: "/auth/sign-in", label: "Explore Events" },
      { href: "/pricing", label: "Pricing" },
      { href: "/changelog", label: "Changelog" },
      { href: "/features/organizers", label: "Features" },
      { href: "/roadmap", label: "Roadmap" },
      { href: "/docs", label: "Docs" },
      { href: "/partnership", label: "Partners" },
    ],
    company: [
      { href: "/contact", label: "Contact Us" },
      { href: "/legal/about", label: "About" },
      { href: "/brand", label: "Brand" },
      { href: "/legal", label: "Legal" },
      { href: "/legal/privacy-policy", label: "Privacy Policy" },
      { href: "/legal/terms-of-service", label: "Terms of Service" },
      { href: "/legal/security", label: "Security" },
      { href: "/legal/refund-policy", label: "Refund Policy" },
      { href: "/legal/cookie-policy", label: "Cookie Policy" },
    ],
  };

  const socialLinks = [
    {
      href: "https://x.com/event_parlour",
      label: "X (Twitter)",
      icon: HugeiconsNewTwitter,
    },
    {
      href: "https://www.tiktok.com/@eventparlour",
      label: "TikTok",
      icon: HugeiconsTiktok,
    },
    {
      href: "https://www.instagram.com/event.parlour",
      label: "Instagram",
      icon: HugeiconsInstagram,
    },
    {
      href: "https://www.linkedin.com/company/eventparlour",
      label: "LinkedIn",
      icon: HugeiconsLinkedin01,
    },
    {
      href: "https://www.whatsapp.com/channel/0029ValLxITAO7RActotOX3R",
      label: "WhatsApp",
      icon: HugeiconsWhatsapp,
    },
    {
      href: "https://github.com/events-palour",
      label: "GitHub",
      icon: HugeiconsGithub,
    },
  ];

  return (
    <footer className="footer-inverted relative w-full overflow-hidden bg-background text-foreground">
      <BrandGrainOverlay fixed={false} intensity="subtle" className="z-0" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <section
          aria-labelledby="footer-brand"
          className="grid gap-8 py-12 sm:py-14 lg:grid-cols-12 lg:items-end lg:gap-12 lg:py-16"
        >
          <div className="space-y-4 lg:col-span-6 xl:col-span-5">
            <BrandLogoLink logoClassName="h-5 w-auto sm:h-6 text-foreground" />
            <div className="space-y-2.5">
              <PixelLabel
                id="footer-brand"
                variant="plain"
                tone="foreground"
                as="p"
                className="mb-0 text-foreground/80"
              >
                Tickets Events Vibes
              </PixelLabel>
              <p className="max-w-md font-body text-[0.9375rem] leading-relaxed text-foreground/75 sm:text-base">
                Sell out the room. Check them in at the door. Payout when the
                night ends.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row lg:col-span-6 lg:justify-end xl:col-span-7">
            <Button
              asChild
              size="sm"
              className="h-10 w-full rounded-none shadow-none sm:w-auto sm:min-w-[9.5rem]"
            >
              <a href={listEventHref}>List your event</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-10 w-full rounded-none shadow-none sm:w-auto sm:min-w-[9.5rem]"
            >
              <a href={exploreHref}>Explore events</a>
            </Button>
          </div>
        </section>

        <section
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-x-6 gap-y-10 pb-12 sm:gap-x-10 sm:gap-y-12 sm:pb-14 lg:grid-cols-12 lg:gap-x-12 lg:pb-16"
        >
          <div className="col-span-1 lg:col-span-3">
            <FooterNavColumn
              title="Product"
              links={navColumns.product}
              onNavClick={handleNavClick}
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <FooterNavColumn
              title="Company"
              links={navColumns.company}
              onNavClick={handleNavClick}
            />
          </div>
          <div className="col-span-2 lg:col-span-6">
            <PixelLabel
              variant="plain"
              tone="foreground"
              as="h2"
              className="mb-4 block"
            >
              We Are Social :)
            </PixelLabel>
            <p className="mb-6 max-w-sm font-body text-sm leading-relaxed text-muted-foreground">
              Join our community.
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex shrink-0"
                    aria-label={social.label}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-none border border-solid border-foreground/20 bg-background text-muted-foreground shadow-none transition-[border-color,background-color,color,transform] duration-200 group-hover:border-foreground group-hover:bg-muted group-hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group-active:scale-[0.97]">
                      <IconComponent className="h-4 w-4" aria-hidden />
                    </span>
                  </a>
                );
              })}
            </div>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
              <a
                href="https://tanstack.com/showcase/3c337dc8-cc31-40ee-adfc-413e9bdf041b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-1.5 self-start rounded-none border border-solid border-foreground/20 bg-background px-2.5 py-1.5 font-body text-xs text-muted-foreground transition-[border-color,color] duration-200 hover:border-foreground hover:text-foreground sm:self-auto"
              >
                <SimpleIconsTanstack
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden
                />
                Featured in TanStack
              </a>
              <div className="flex items-center gap-3">
                <PixelLabel variant="square" tone="soft" as="span">
                  Theme
                </PixelLabel>
                <FooterThemeSwitcher inverted />
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label={`${FOOTER_CLOSING_LINES[0]} ${FOOTER_CLOSING_LINES[1]}`}
          className="border-t border-border pb-12 pt-10 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-14"
        >
          <motion.div
            variants={closingContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="overflow-hidden">
              <motion.p
                variants={closingLineVariants}
                className="whitespace-nowrap font-heading text-[clamp(1.5rem,7.2vw,5rem)] font-bold leading-[1.08] tracking-tight text-foreground sm:leading-[1.05]"
              >
                {FOOTER_CLOSING_LINES[0]}
              </motion.p>
            </div>
            <div className="mt-3 overflow-hidden sm:mt-0">
              <motion.p
                variants={closingLineVariants}
                className="whitespace-nowrap text-right font-heading text-[clamp(1.5rem,7.2vw,5rem)] font-bold leading-[1.08] tracking-tight text-foreground sm:leading-[1.05]"
              >
                {FOOTER_CLOSING_LINES[1]}
              </motion.p>
            </div>
          </motion.div>
        </section>

        <div className="flex flex-col items-center gap-4 border-t border-border py-8 text-center font-body text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:py-9 sm:text-left">
          <p className="flex flex-col flex-wrap items-center gap-1 sm:flex-row sm:gap-x-3">
            <span>
              ©{new Date().getFullYear()}{" "}
              <span className="font-heading text-foreground">
                Event Parlour
              </span>
            </span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>All rights reserved</span>
          </p>
          <FooterSystemStatus />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
