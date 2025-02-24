"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: "/events", label: "Events Near Me" },
    { href: "/bed", label: "Accomodations" },
    // { href: "/beds", label: "Accomodations" },
    { href: "/Venues", label: "Venues" },
    { href: "/contact-us", label: "Contact" }
  ]

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
            <Button
              variant="outline"
              className="relative text-black hover:text-white border-white hover:bg-white/10 text-sm sm:text-base 
                transition-all duration-300 group overflow-hidden"
            >
              Sign In
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
                <motion.div
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  custom={navLinks.length}
                >
                  <Button
                    variant="outline"
                    className="relative text-black hover:text-white border-white hover:bg-white/10 text-lg w-full 
                      transition-all duration-300 group overflow-hidden"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
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
  )
}

export default Navbar