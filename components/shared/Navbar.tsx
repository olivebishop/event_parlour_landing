"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import content from "@/lib/content";
import { cn } from "@/lib/utils";
import { BrandLogoLink } from "@/components/shared/brand-logo-link";
import { Button } from "@/components/ui/button";
import {
  FeaturesNavTrigger,
  FeaturesNavPanel,
  MobileFeaturesLinks,
} from "@/components/shared/features-nav-menu";
import { categoryHubHref } from "@/lib/feature-catalog";
import {
  HugeiconsNewTwitter,
  HugeiconsInstagram,
  HugeiconsLinkedin01,
} from "./social-icons";

const copy = content.Navbar;

const secondaryLinks = [
  { href: "/why-us", label: copy["why us"] },
  { href: "/contact", label: copy.contact },
] as const;

/** Audience hubs — peer links in the mobile drawer (not nested under Features). */
const audienceLinks = [
  { href: categoryHubHref("organizers"), label: "For organizers" },
  { href: categoryHubHref("attendees"), label: "For attendees" },
] as const;

const externalLinks = [
  { href: "https://app.eventparlour.com", label: copy.events },
  { href: "https://app.eventparlour.com/blogs", label: copy.blogs },
] as const;

const SIGN_IN_HREF = "https://app.eventparlour.com/auth/sign-in";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isFeaturesActive(pathname: string) {
  return pathname.startsWith("/features");
}

const primaryNavLinkClass =
  "shrink-0 whitespace-nowrap font-body text-[0.9375rem] text-foreground transition-colors duration-200 hover:text-foreground/80";

const secondaryNavLinkClass =
  "shrink-0 whitespace-nowrap font-body text-[0.875rem] text-foreground/75 transition-colors duration-200 hover:text-foreground";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isHome = pathname === "/";
  const headerSolid = featuresOpen || isOpen || hasScrolled || !isHome;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setFeaturesOpen(false);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setHasScrolled(window.scrollY > 16);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!featuresOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setFeaturesOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [featuresOpen]);

  const closeMobile = () => setIsOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter] duration-300",
          headerSolid
            ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/90"
            : "bg-transparent backdrop-blur-none",
        )}
        aria-label="Primary"
        onMouseLeave={(e) => {
          const next = e.relatedTarget;
          if (next instanceof Node && headerRef.current?.contains(next)) return;
          setFeaturesOpen(false);
        }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:gap-6 sm:px-8 lg:h-16 lg:gap-8 lg:px-10 xl:max-w-[90rem] xl:px-12">
          <BrandLogoLink logoClassName="shrink-0 text-base font-semibold lowercase tracking-tight sm:text-lg" />

          <nav
            className="hidden min-w-0 items-center gap-5 lg:flex xl:gap-7"
            aria-label="Site"
          >
            <div className="flex min-w-0 items-center gap-5 xl:gap-7">
              <div
                className="shrink-0"
                onMouseEnter={() => setFeaturesOpen(true)}
              >
                <FeaturesNavTrigger
                  open={featuresOpen}
                  active={isFeaturesActive(pathname)}
                  onOpenChange={setFeaturesOpen}
                />
              </div>

              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    primaryNavLinkClass,
                    isActive(pathname, link.href) && "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <span
              className="h-4 w-px shrink-0 bg-border/80"
              aria-hidden
            />

            <div className="flex shrink-0 items-center gap-4 xl:gap-5">
              {externalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryNavLinkClass}
                >
                  {link.label}
                </Link>
              ))}

              <Button
                asChild
                size="sm"
                className="h-8 shrink-0 rounded-none px-3.5 text-xs shadow-none xl:px-4 xl:text-sm"
              >
                <Link
                  href={SIGN_IN_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.signIn}
                </Link>
              </Button>
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <Button
              asChild
              size="sm"
              className="h-8 rounded-none px-3 text-xs shadow-none"
            >
              <Link
                href={SIGN_IN_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.signIn}
              </Link>
            </Button>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <div className="relative flex h-5 w-6 flex-col items-center justify-center">
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -7 }}
                  className="absolute block h-0.5 w-6 bg-foreground"
                />
                <motion.span
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  className="absolute block h-0.5 w-6 bg-foreground"
                />
                <motion.span
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 7 }}
                  className="absolute block h-0.5 w-6 bg-foreground"
                />
              </div>
            </button>
          </div>
        </div>

        <div onMouseEnter={() => setFeaturesOpen(true)}>
          <FeaturesNavPanel
            open={featuresOpen}
            onOpenChange={setFeaturesOpen}
          />
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[55] bg-background/50 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <motion.nav
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="fixed left-0 right-0 top-14 z-[60] max-h-[calc(100dvh-3.5rem)] overflow-y-auto bg-background px-5 py-6 sm:px-8 lg:hidden"
            >
              <div className="space-y-1 border-b border-border pb-4">
                <MobileFeaturesLinks onNavigate={closeMobile} />

                {[...audienceLinks, ...secondaryLinks].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    className={cn(
                      "flex min-h-11 items-center font-heading text-xl font-semibold",
                      isActive(pathname, link.href)
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.label}.
                  </Link>
                ))}

                {externalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                    className="flex min-h-11 items-center font-heading text-xl font-semibold text-muted-foreground"
                  >
                    {link.label}.
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Button
                  asChild
                  size="cta"
                  className="h-11 w-full rounded-none text-sm shadow-none"
                >
                  <Link
                    href={SIGN_IN_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                  >
                    {copy.signIn}
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex gap-2 border-t border-border pt-6">
                <a
                  href="https://x.com/EventsPalour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground"
                  aria-label="X"
                >
                  <HugeiconsNewTwitter className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/event.parlour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground"
                  aria-label="Instagram"
                >
                  <HugeiconsInstagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/eventparlour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground"
                  aria-label="LinkedIn"
                >
                  <HugeiconsLinkedin01 className="h-4 w-4" />
                </a>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
