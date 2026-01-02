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
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group relative z-[60]">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <p className="font-extrabold text-xl sm:text-xl md:text-2xl lg:text-2xl text-white">
                  Event Parlour.
                </p>
              </motion.div>
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

            <div className="flex items-center space-x-2 sm:space-x-4">
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
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="hidden md:block">
                <Button
                  className="bg-white text-black border-white hover:bg-zinc-200 transition-all duration-300"
                >
                  {t('signIn')}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Button - Fixed Position */}
      <div className="lg:hidden">
        <motion.div
          animate={{
            width: isOpen ? 'calc(100% - 32px)' : '48px',
            height: isOpen ? 'calc(100vh - 32px)' : '48px',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed z-[60] rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl shadow-black/50 overflow-hidden"
          style={{
            top: '16px',
            right: '16px',
          }}
        >
          {/* Hamburger Button */}
          <button
            className="absolute right-0 top-0 z-[70] size-12 bg-transparent transition-all hover:bg-white/10 rounded-xl flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.span
              animate={{
                top: isOpen ? '50%' : '35%',
                rotate: isOpen ? 45 : 0,
              }}
              className="absolute block h-0.5 w-6 bg-white"
              style={{
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }}
            />
            <motion.span
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              className="absolute block h-0.5 w-6 bg-white"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }}
            />
            <motion.span
              animate={{
                bottom: isOpen ? '45%' : '35%',
                left: isOpen ? '50%' : '60%',
                rotate: isOpen ? -45 : 0,
                width: isOpen ? 24 : 12,
              }}
              className="absolute block h-0.5 bg-white"
              style={{
                transform: 'translateX(-50%) translateY(50%)',
              }}
            />
          </button>

          {/* Mobile Menu Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="h-full w-full overflow-y-auto pt-20 px-8 pb-8"
              >
                <div className="space-y-6">
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
                        className="block text-4xl sm:text-5xl font-semibold text-zinc-400 transition-colors hover:text-white cursor-pointer"
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
                      href="/sign-in"
                      onClick={() => setIsOpen(false)}
                      className="block text-4xl sm:text-5xl font-semibold text-zinc-400 transition-colors hover:text-white"
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
                    className="mt-12"
                  >
                    <p className="text-sm text-zinc-500 mb-4">Language</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(languages as unknown as Language[]).slice(0, 6).map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={cn(
                            "px-3 py-2 text-sm rounded-lg transition-all duration-200",
                            selectedLanguage === lang.code 
                              ? "bg-white text-black font-medium" 
                              : "text-zinc-400 hover:text-white hover:bg-white/10"
                          )}
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
                  className="absolute bottom-8 left-8 flex gap-4"
                >
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
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
