"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import content from "@/lib/content";
import { cn } from "@/lib/utils";
import { 
  HugeiconsNewTwitter, 
  HugeiconsInstagram, 
  HugeiconsLinkedin01 
} from "./social-icons";

const copy = content.Navbar;

interface NavLink {
  href: string;
  label: string;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const navLinks: NavLink[] = [
    { href: "#features", label: copy.features },
    { href: "#why-us", label: copy["why us"] },
    { href: "#contact", label: copy.contact }
  ];

  useEffect(() => {
    let ticking = false

    const update = () => {
      setHasScrolled(window.scrollY > 20)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    // Defer first measurement until after paint
    const idle = window.requestAnimationFrame(update)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(idle)
      window.removeEventListener("scroll", handleScroll)
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          hasScrolled 
            ? 'bg-background/90 dark:bg-black/90 backdrop-blur-md shadow-lg dark:shadow-black/30' 
            : 'bg-transparent'
        )}
        aria-label="Primary"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group relative z-[60] touch-manipulation" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="flex items-center">
                <span className="text-base sm:text-xl md:text-2xl font-heading font-semibold text-foreground tracking-tight whitespace-nowrap lowercase">
                  event parlour
                </span>
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="relative px-3 py-2 text-foreground text-sm lg:text-base transition-colors duration-300 cursor-pointer"
                  onMouseEnter={() => setIsHovering(link.href)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <span className="relative z-10">{link.label}</span>
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: isHovering === link.href ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </a>
              ))}

              <Link
                href="https://app.eventparlour.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-3 py-2 text-foreground text-sm lg:text-base transition-colors duration-300 cursor-pointer"
                onMouseEnter={() => setIsHovering("events")}
                onMouseLeave={() => setIsHovering(null)}
              >
                <span className="relative z-10">{copy.events}</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: isHovering === "events" ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </Link>

              <Link
                href="https://app.eventparlour.com/blogs"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-3 py-2 text-foreground text-sm lg:text-base transition-colors duration-300 cursor-pointer"
                onMouseEnter={() => setIsHovering("blogs")}
                onMouseLeave={() => setIsHovering(null)}
              >
                <span className="relative z-10">{copy.blogs}</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: isHovering === "blogs" ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </Link>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="hidden lg:block">
                <Link href="https://app.eventparlour.com/auth/sign-in" target="_blank" rel="noopener noreferrer">
                  <Button size="default" className="transition-all duration-300">
                    {copy.signIn}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="lg:hidden">
        <motion.div
          animate={{
            width: isOpen ? '100vw' : '48px',
            height: isOpen ? '100vh' : '48px',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 z-[60] bg-gradient-to-br from-background to-muted dark:from-zinc-800 dark:to-zinc-900 shadow-2xl dark:shadow-black/50 overflow-hidden"
          style={{
            borderRadius: isOpen ? '0' : '0 0 0 1rem',
          }}
        >
          <button
            className="absolute right-0 top-0 z-[70] w-12 h-12 min-w-[48px] min-h-[48px] bg-transparent transition-all active:bg-accent hover:bg-accent/50 flex items-center justify-center touch-manipulation"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="relative w-6 h-5 flex flex-col justify-center items-center">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 0 : -8,
                }}
                className="absolute block h-0.5 w-6 bg-foreground rounded-full"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                  x: isOpen ? 20 : 0,
                }}
                className="absolute block h-0.5 w-6 bg-foreground rounded-full"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? 0 : 8,
                }}
                className="absolute block h-0.5 w-6 bg-foreground rounded-full"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="h-full w-full overflow-y-auto pt-16 sm:pt-20 px-4 sm:px-6 md:px-8 pb-24 sm:pb-8"
              >
                <div className="space-y-4 sm:space-y-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        onClick={handleNavClick}
                        className="block text-3xl sm:text-4xl md:text-5xl font-semibold text-muted-foreground transition-colors active:text-foreground hover:text-foreground cursor-pointer py-3 sm:py-4 px-2 -mx-2 rounded-lg active:bg-accent touch-manipulation min-h-[60px] flex items-center"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        {link.label}.
                      </a>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                  >
                    <Link
                      href="https://app.eventparlour.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="block text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-400 transition-colors active:text-white hover:text-white py-3 sm:py-4 px-2 -mx-2 rounded-lg active:bg-white/10 touch-manipulation min-h-[60px] flex items-center"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {copy.events}.
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (navLinks.length + 1) * 0.1 }}
                  >
                    <Link
                      href="https://app.eventparlour.com/blogs"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="block text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-400 transition-colors active:text-white hover:text-white py-3 sm:py-4 px-2 -mx-2 rounded-lg active:bg-white/10 touch-manipulation min-h-[60px] flex items-center"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {copy.blogs}.
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      href="https://app.eventparlour.com/auth/sign-in"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="block text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-400 transition-colors active:text-white hover:text-white py-3 sm:py-4 px-2 -mx-2 rounded-lg active:bg-white/10 touch-manipulation min-h-[60px] flex items-center"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {copy.signIn}.
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-4 sm:bottom-8 left-4 sm:left-6 md:left-8 flex gap-3 sm:gap-4"
                >
                  <a 
                    href="https://x.com/EventsPalour" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground active:text-foreground hover:text-foreground transition-colors p-2 -m-2 rounded-lg active:bg-accent touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Follow us on X (Twitter)"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <HugeiconsNewTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a 
                    href="https://www.instagram.com/event.parlour" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground active:text-foreground hover:text-foreground transition-colors p-2 -m-2 rounded-lg active:bg-accent touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Follow us on Instagram"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <HugeiconsInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/eventparlour" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground active:text-foreground hover:text-foreground transition-colors p-2 -m-2 rounded-lg active:bg-accent touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Follow us on LinkedIn"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <HugeiconsLinkedin01 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

export default Navbar;
