"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Languages, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from '@/lib/i18n/translations';
import { languages } from "@/utils/languageUtils";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { cn } from "@/lib/utils";
import { 
  HugeiconsNewTwitter, 
  HugeiconsInstagram, 
  HugeiconsLinkedin01 
} from "./social-icons";

// Define types for language and link data
interface Language {
  code: string;
  name: string;
}

interface NavLink {
  href: string;
  label: string;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const t = useTranslations('Navbar');
  const router = useRouter();
  
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const savedLanguage = Cookies.get('language') || 'en';
    setSelectedLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (isLanguageOpen && !document.querySelector('.language-dropdown-container')?.contains(target)) {
        setIsLanguageOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageOpen]);

  const navLinks: NavLink[] = [
    { href: "#features", label: t('features') },
    { href: "#why-us", label: t('why us') },
    { href: "#contact", label: t('contact') }
  ];

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    Cookies.set('language', code, { expires: 365 });
    router.refresh();
    setIsLanguageOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const renderLanguageGrid = () => {
    const typedLanguages = languages as unknown as Language[];
    const rows = [
      typedLanguages.slice(0, 3),
      typedLanguages.slice(3, 6),
      typedLanguages.slice(6, 9),
    ];

    return (
      <div className="flex flex-col space-y-2">
        {rows.map((row, rowIndex) => (
          row.length > 0 && (
            <div key={rowIndex} className="grid grid-cols-3 gap-2">
              {row.map((lang: Language) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-3 py-2 text-sm text-white hover:bg-white/10 transition-all duration-300 ease-out 
                    ${selectedLanguage === lang.code ? 'bg-white/20 font-medium' : ''}`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )
        ))}
      </div>
    );
  };

  const getCurrentLanguageName = () => {
    const typedLanguages = languages as unknown as Language[];
    const foundLang = typedLanguages.find(lang => lang.code === selectedLanguage);
    return foundLang?.name || 'English';
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
          ${hasScrolled 
            ? 'bg-black/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30' 
            : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group relative z-[60] touch-manipulation" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <p className="font-extrabold text-lg sm:text-xl md:text-2xl lg:text-2xl text-white">
                  Event Parlour.
                </p>
              </motion.div>
              <span className="ml-2 sm:ml-3 inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold uppercase border border-white rounded-none text-emerald-400">
                Beta
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-3 py-2 text-white text-sm lg:text-base transition-colors duration-300 cursor-pointer"
                  onMouseEnter={() => setIsHovering(link.href)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <span className="relative z-10">{link.label}</span>
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: isHovering === link.href ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              {/* Language selector - desktop only */}
              {isMounted && (
                <div className="relative language-dropdown-container hidden lg:block">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center"
                      onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    >
                      <Languages className="h-5 w-5 mr-2" />
                      {getCurrentLanguageName()}
                      <ChevronDown 
                        className={`ml-2 h-4 w-4 transition-transform duration-300 
                        ${isLanguageOpen ? 'rotate-180' : ''}`}
                      />
                    </Button>
                  </motion.div>
                  <AnimatePresence>
                    {isLanguageOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 bg-black border border-white/10 shadow-lg shadow-black/50 z-50 p-4 w-72 rounded-lg"
                      >
                        {renderLanguageGrid()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Sign In Button - hidden on mobile */}
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="hidden lg:block">
                <Link href="https://app.eventparlour.com/auth/sign-in" target="_blank" rel="noopener noreferrer">
                  <Button
                    className="bg-white text-black border-white hover:bg-zinc-200 transition-all duration-300"
                  >
                    {t('signIn')}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Button - Fixed Position */}
      <div className="lg:hidden">
        <motion.div
          animate={{
            width: isOpen ? '100vw' : '48px',
            height: isOpen ? '100vh' : '48px',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 z-[60] bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl shadow-black/50 overflow-hidden"
          style={{
            borderRadius: isOpen ? '0' : '0 0 0 1rem',
          }}
        >
          {/* Hamburger Button */}
          <button
            className="absolute right-0 top-0 z-[70] w-12 h-12 min-w-[48px] min-h-[48px] bg-transparent transition-all active:bg-white/20 hover:bg-white/10 flex items-center justify-center touch-manipulation"
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
                className="absolute block h-0.5 w-6 bg-white rounded-full"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                  x: isOpen ? 20 : 0,
                }}
                className="absolute block h-0.5 w-6 bg-white rounded-full"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? 0 : 8,
                }}
                className="absolute block h-0.5 w-6 bg-white rounded-full"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </button>

          {/* Mobile Menu Content */}
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
                  {/* Nav Links */}
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="block text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-400 transition-colors active:text-white hover:text-white cursor-pointer py-3 sm:py-4 px-2 -mx-2 rounded-lg active:bg-white/10 touch-manipulation min-h-[60px] flex items-center"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        {link.label}.
                      </a>
                    </motion.div>
                  ))}
                  
                  {/* Sign In Link */}
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
                      {t('signIn')}.
                    </Link>
                  </motion.div>
                </div>

                {/* Language Selector in Mobile */}
                {isMounted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 sm:mt-12"
                  >
                    <p className="text-xs sm:text-sm text-zinc-500 mb-3 sm:mb-4">Language</p>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {(languages as unknown as Language[]).slice(0, 6).map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={cn(
                            "px-2 sm:px-3 py-2.5 sm:py-2 text-xs sm:text-sm rounded-lg transition-all duration-200 touch-manipulation min-h-[44px] flex items-center justify-center",
                            selectedLanguage === lang.code 
                              ? "bg-white text-black font-medium" 
                              : "text-zinc-400 active:text-white active:bg-white/10 hover:text-white hover:bg-white/10"
                          )}
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-4 sm:bottom-8 left-4 sm:left-6 md:left-8 flex gap-3 sm:gap-4"
                >
                  <a 
                    href="https://x.com/EventsPalour" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 active:text-white hover:text-white transition-colors p-2 -m-2 rounded-lg active:bg-white/10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Follow us on X (Twitter)"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <HugeiconsNewTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a 
                    href="https://www.instagram.com/event.parlour" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 active:text-white hover:text-white transition-colors p-2 -m-2 rounded-lg active:bg-white/10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Follow us on Instagram"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <HugeiconsInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/eventparlour" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 active:text-white hover:text-white transition-colors p-2 -m-2 rounded-lg active:bg-white/10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
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
