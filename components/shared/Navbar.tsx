"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Languages, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';
import { languages } from "@/utils/languageUtils";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Define types for language and link data
interface Language {
  code: string;
  name: string;
}

interface NavLink {
  href: string;
  label: string;
}

// Enhanced animation variants
const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1],
      delay: i * 0.05 
    }
  })
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<string>("desktop");
  const t = useTranslations('Navbar');
  const router = useRouter();
  
  // Fix hydration mismatch by using useState with no initial value
  // and updating it in useEffect
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  // Handle client-side initialization after mount
  useEffect(() => {
    setIsMounted(true);
    const savedLanguage = Cookies.get('language') || 'en';
    setSelectedLanguage(savedLanguage);
    
    // Initial screen size detection
    handleScreenSize();
  }, []);

  // Enhanced scroll effect with smoother threshold
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track screen size changes for responsive behavior
  const handleScreenSize = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize("desktop");
        if (isOpen) setIsOpen(false);
      } else if (width >= 768) {
        setScreenSize("tablet");
        if (isOpen) setIsOpen(false);
      } else {
        setScreenSize("mobile");
      }
    }
  };

  // Add resize listener
  useEffect(() => {
    window.addEventListener('resize', handleScreenSize);
    return () => window.removeEventListener('resize', handleScreenSize);
  }, [isOpen]);

  // Close the language dropdown when clicking outside
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
    { href: "#evento", label: t('eventsNearMe') },
    { href: "#bed", label: t('accommodations') },
    { href: "#venues", label: t('venues') },
    { href: "/why-us", label: "Why Us" }, // Fixed label - using direct string instead of translation key
    { href: "/contact-us", label: t('contact') }
  ];

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    Cookies.set('language', code, { expires: 365 });
    router.refresh();
    setIsLanguageOpen(false);
    setIsMobileLanguageOpen(false);
  };

  // Function to render language grid in 3x3 format with improved styling
  const renderLanguageGrid = () => {
    // Cast languages to ensure proper typing
    const typedLanguages = languages as unknown as Language[];
    
    // First 3 languages in the first row
    const firstRow = typedLanguages.slice(0, 3);
    // Middle 3 languages in the second row
    const secondRow = typedLanguages.slice(3, 6);
    // Last 3 languages in the third row (or remaining languages)
    const thirdRow = typedLanguages.slice(6, 9);

    return (
      <div className="flex flex-col space-y-2">
        {/* First row */}
        <div className="grid grid-cols-3 gap-2">
          {firstRow.map((lang: Language) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`px-3 py-2 text-sm text-white hover:bg-white/10 transition-all duration-300 ease-out rounded 
                ${selectedLanguage === lang.code ? 'bg-white/20 font-medium' : ''}`}
            >
              {lang.name}
            </button>
          ))}
        </div>
        
        {/* Second row */}
        {secondRow.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {secondRow.map((lang: Language) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-3 py-2 text-sm text-white hover:bg-white/10 transition-all duration-300 ease-out rounded 
                  ${selectedLanguage === lang.code ? 'bg-white/20 font-medium' : ''}`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
        
        {/* Third row */}
        {thirdRow.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {thirdRow.map((lang: Language) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-3 py-2 text-sm text-white hover:bg-white/10 transition-all duration-300 ease-out rounded 
                  ${selectedLanguage === lang.code ? 'bg-white/20 font-medium' : ''}`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Get the current language name safely
  const getCurrentLanguageName = () => {
    const typedLanguages = languages as unknown as Language[];
    const foundLang = typedLanguages.find(lang => lang.code === selectedLanguage);
    return foundLang?.name || 'English';
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${hasScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-black/10 shadow-lg shadow-black/30' 
          : 'bg-black/50 backdrop-blur-sm'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 ">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >

<p className="font-extrabold text-xl sm:text-xl md:text-2xl lg:text-2xl lg:ml-6">Event Parlour.</p>
    
              {/* <Image
                src="/images/logo.png"
                alt="Event Parlour"
                width={180}
                height={60}
                className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto transition-all duration-300"
                priority
              /> */}
            </motion.div>
            <span className="sr-only">Event Parlour</span>
          </Link>

          {/* Desktop & Tablet Navigation Links - Only show on lg+ for desktop and hide part on md */}
          <div className={`hidden ${screenSize === "desktop" ? "lg:flex" : "lg:hidden md:flex"}`}>
            <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-2 md:px-3 py-2 text-white transition-colors duration-300
                    ${screenSize === "tablet" ? "text-xs md:text-sm" : "text-sm lg:text-base"}
                    ${screenSize === "tablet" && index >= 3 ? "hidden lg:block" : ""}`}
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
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            {/* Language selector - visible on md and larger screens */}
            {isMounted && (
              <div className="relative language-dropdown-container hidden md:block">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Button
                    variant="ghost"
                    className={`text-white hover:bg-white/10 hover:text-white hover:border-gray-100 hover:border 
                      transition-all duration-300 flex items-center ${screenSize === "tablet" ? "text-xs px-2" : ""}`}
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  >
                    <Languages className={`${screenSize === "tablet" ? "h-4 w-4 mr-1" : "h-5 w-5 mr-2"}`} />
                    {screenSize === "tablet" ? getCurrentLanguageName().substring(0, 3) : getCurrentLanguageName()}
                    <ChevronDown 
                      className={`${screenSize === "tablet" ? "ml-1 h-3 w-3" : "ml-2 h-4 w-4"} transition-transform duration-300 
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
                      className="absolute right-0 mt-2 bg-black border border-white/10 rounded-lg shadow-lg shadow-black/50 z-50 p-4 w-72"
                    >
                      {renderLanguageGrid()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Button
                variant="outline"
                className={`relative text-black border-black/30 hover:bg-black hover:text-white hover:border-white 
                  transition-all duration-300 group 
                  ${screenSize === "tablet" ? "text-xs px-2 py-1" : "text-sm lg:text-base"}`}
              >
                <span className="relative z-10">{t('signIn')}</span>
                <motion.span 
                  className="absolute bottom-0 left-0 right-0 h-full w-full bg-white z-0"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.span 
                  className="absolute bottom-0 left-0 right-0 h-full w-full bg-black z-0"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 0.97 }}
                  transition={{ duration: 0.3, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </Button>
            </motion.div>
            
            {/* Tablet Menu Button - Show additional Menu button for tablet view */}
            {screenSize === "tablet" && (
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 hover:text-white transition-colors duration-300 md:block"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 hover:text-white md:hidden transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`${screenSize === "tablet" ? "" : "md:hidden"} mt-4 pb-4`}
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  // For tablets, only show the links that are hidden in the main navbar
                  (screenSize !== "tablet" || index >= 3) && (
                    <motion.div
                      key={link.href}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <Link
                        href={link.href}
                        className="relative text-white hover:text-gray-300 transition-colors duration-300 text-lg block py-2 px-3 border-l-2 border-transparent hover:border-white/50"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                ))}
                
                {/* Language selector in mobile menu - only show on mobile, not tablet */}
                {isMounted && screenSize === "mobile" && (
                  <motion.div
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    custom={navLinks.length}
                  >
                    <div className="relative py-2 px-3">
                      <button
                        onClick={() => setIsMobileLanguageOpen(!isMobileLanguageOpen)}
                        className="flex items-center justify-between w-full text-white hover:text-gray-300 transition-colors duration-300 text-lg"
                      >
                        <div className="flex items-center">
                          <Languages className="h-5 w-5 mr-2" />
                          {getCurrentLanguageName()}
                        </div>
                        <ChevronDown 
                          className={`h-5 w-5 transition-transform duration-300 ${isMobileLanguageOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {isMobileLanguageOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/10"
                          >
                            {renderLanguageGrid()}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
                
                {/* Sign in button in mobile menu - don't show on tablet */}
                {screenSize === "mobile" && (
                  <motion.div
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    custom={navLinks.length + 1}
                  >
                    <div className="py-2 px-3 pt-4">
                      <Button
                        variant="outline"
                        className="relative text-white border-white/30 hover:bg-white/10 hover:border-white text-lg w-full 
                          transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('signIn')}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;