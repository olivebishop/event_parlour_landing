"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Languages, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';
import { languages } from "@/utils/languageUtils"
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

const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const t = useTranslations('Navbar');
  const router = useRouter();
  
  // Fix hydration mismatch by using useState with no initial value
  // and updating it in useEffect
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to 'en' initially
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side initialization after mount
  useEffect(() => {
    setIsMounted(true);
    const savedLanguage = Cookies.get('language') || 'en';
    setSelectedLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { href: "/contact-us", label: t('contact') }
  ];

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    Cookies.set('language', code, { expires: 365 });
    router.refresh();
    setIsLanguageOpen(false);
    setIsMobileLanguageOpen(false);
  };

  // Function to render language grid in 3x3 format
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
              className={`px-3 py-2 text-sm text-white hover:bg-[#2a2a2a] transition-colors duration-200 rounded 
                ${selectedLanguage === lang.code ? 'bg-[#2a2a2a]' : ''}`}
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
                className={`px-3 py-2 text-sm text-white hover:bg-[#2a2a2a] transition-colors duration-200 rounded 
                  ${selectedLanguage === lang.code ? 'bg-[#2a2a2a]' : ''}`}
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
                className={`px-3 py-2 text-sm text-white hover:bg-[#2a2a2a] transition-colors duration-200 rounded 
                  ${selectedLanguage === lang.code ? 'bg-[#2a2a2a]' : ''}`}
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
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#000000] backdrop-blur-sm transition-all duration-300 
      ${hasScrolled ? 'border-b border-black/50 shadow-lg' : 'border-b border-black/80'}`}>
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Event Parlour"
              width={180}
              height={60}
              className="h-10 sm:h-14 w-auto"
              priority
            />
            <span className="sr-only">Event Parlour</span>
          </Link>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4 sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-white hover:text-gray-100 transition-colors duration-300 text-sm sm:text-base group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language selector - visible only on md and larger screens */}
            {isMounted && (
              <div className="relative language-dropdown-container hidden md:block">
                <Button
                  variant="ghost"
                  className="text-white hover:text-black transition-colors duration-300 flex items-center"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  <Languages className="h-5 w-5 mr-2" />
                  {getCurrentLanguageName()}
                </Button>
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 bg-[#171717] border border-gray-700 rounded-lg shadow-lg z-50 p-4 w-72">
                    {renderLanguageGrid()}
                  </div>
                )}
              </div>
            )}

            <Button
              variant="outline"
              className="relative text-black hover:text-white border-white hover:bg-white/10 text-sm sm:text-base 
                transition-all duration-300 group overflow-hidden"
            >
              {t('signIn')}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out 
                group-hover:w-full"></span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-white hover:text-primary md:hidden transition-colors duration-300"
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
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <Link
                      href={link.href}
                      className="relative text-white hover:text-primary transition-colors duration-300 text-lg block group"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 
                        ease-in-out group-hover:w-full"></span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Language selector in mobile menu */}
                {isMounted && (
                  <motion.div
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    custom={navLinks.length}
                  >
                    <div className="relative">
                      <button
                        onClick={() => setIsMobileLanguageOpen(!isMobileLanguageOpen)}
                        className="flex items-center justify-between w-full text-white hover:text-primary transition-colors duration-300 text-lg group"
                      >
                        <div className="flex items-center">
                          <Languages className="h-5 w-5 mr-2" />
                          {getCurrentLanguageName()}
                        </div>
                        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isMobileLanguageOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isMobileLanguageOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 bg-[#1f1f1f] rounded-lg p-3"
                          >
                            {renderLanguageGrid()}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
                
                <motion.div
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  custom={navLinks.length + 1}
                >
                  <Button
                    variant="outline"
                    className="relative text-black hover:text-white border-white hover:bg-white/10 text-lg w-full 
                      transition-all duration-300 group overflow-hidden"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('signIn')}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 
                      ease-in-out group-hover:w-full"></span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;