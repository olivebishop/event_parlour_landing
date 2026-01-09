"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ArtGallery from "@/components/shared/ArtGallery"
import { useTranslations } from "@/lib/i18n/translations"

// Floating avatar images data - positioned around the content (pushed further out on mobile)
const avatars = [
  {
    delay: 0.2,
    img: "/images/attendee.svg",
    position: "top-[5%] -left-[5%] sm:top-[20%] sm:left-[5%]",
  },
  {
    delay: 0.3,
    img: "/images/speaker.svg",
    position: "top-[65%] -left-[3%] sm:top-[45%] sm:left-[15%]",
  },
  {
    delay: 0.4,
    img: "/images/vendor.svg",
    position: "top-[5%] -right-[5%] sm:top-[20%] sm:right-[5%]",
  },
  {
    delay: 0.5,
    img: "/images/org.svg",
    position: "top-[65%] -right-[3%] sm:top-[45%] sm:right-[15%]",
  },
]

// Word Animation Component
function WordAnimation({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [words.length])

  const currentWord = words[index]

  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        key={currentWord}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="inline-block text-white"
      >
        {currentWord}
      </motion.span>
    </span>
  )
}

// Floating Avatar Component
function FloatingAvatar({ 
  img, 
  delay, 
  position 
}: { 
  img: string
  delay: number
  position: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn("absolute z-10 opacity-60 sm:opacity-100", position)}
    >
      <motion.div
        whileHover={{ rotate: 15, scale: 2.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 overflow-hidden rounded-lg border-2 border-white/50 sm:border-white bg-zinc-800 shadow-lg cursor-pointer"
      >
        <Image
          src={img}
          alt="Event moment"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 40px, (max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
        />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const t = useTranslations('HeroSection')
  
  // Get translated words - handle both JSON string and fallback
  const getWords = () => {
    const defaultWords = ["Organizers", "Attendees", "Speakers", "Vendors"]
    try {
      const wordsValue = t('words')
      if (wordsValue && wordsValue !== 'words' && wordsValue.startsWith('[')) {
        return JSON.parse(wordsValue)
      }
      return defaultWords
    } catch {
      return defaultWords
    }
  }
  
  const words = getWords()
  
  return (
    <section className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 pt-24 xs:pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-6 xs:pb-8 sm:pb-10 text-center min-h-screen flex flex-col">
      {/* Content with floating avatars */}
      <div className="relative flex-1 flex flex-col justify-center">
        {/* Floating Avatars */}
        {avatars.map((avatar, index) => (
          <FloatingAvatar
            key={index}
            img={avatar.img}
            delay={avatar.delay}
            position={avatar.position}
          />
        ))}

        {/* Main Content - z-30 to ensure it's above floating avatars */}
        <div className="relative z-30">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white mb-4 xs:mb-5 sm:mb-6 max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto leading-tight"
          >
            {t('title')}
            <br />
            <WordAnimation words={words} />
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-zinc-400 text-sm xs:text-base sm:text-lg md:text-xl mb-6 xs:mb-7 sm:mb-8 max-w-[280px] xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 leading-relaxed"
          >
            {t('description')}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            {t('descriptionLine2')}
          </motion.p>

          {/* Single CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.6, 
              type: "spring", 
              stiffness: 400 
            }}
          >
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 px-5 xs:px-6 sm:px-8 py-4 xs:py-5 sm:py-6 text-sm xs:text-base sm:text-lg font-medium">
              {t('cta')}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Art Gallery */}
      <ArtGallery />
    </section>
  )
}