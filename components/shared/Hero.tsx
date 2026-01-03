"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ArtGallery from "@/components/shared/ArtGallery"
import { useTranslations } from "@/lib/i18n/translations"

// Floating avatar images data - positioned around the content
const avatars = [
  {
    delay: 0.2,
    img: "/images/dummy/a.jpg",
    position: "-top-[5%] -left-[1%] sm:top-[20%] sm:left-[5%]",
  },
  {
    delay: 0.3,
    img: "/images/dummy/b.jpg",
    position: "top-[45%] left-[5%] sm:left-[15%]",
  },
  {
    delay: 0.4,
    img: "/images/dummy/c.jpg",
    position: "top-[15%] right-[2%] sm:top-[20%] sm:right-[5%]",
  },
  {
    delay: 0.5,
    img: "/images/dummy/four.jpg",
    position: "top-[45%] right-[5%] sm:right-[15%]",
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
      className={cn("absolute z-20", position)}
    >
      <motion.div
        whileHover={{ rotate: 15, scale: 2.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 overflow-hidden rounded-lg border-2 border-white bg-zinc-800 shadow-lg cursor-pointer"
      >
        <Image
          src={img}
          alt="Event moment"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
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
    <section className="relative max-w-7xl mx-auto px-4 pt-32 sm:pt-36 md:pt-40 pb-10 text-center min-h-screen flex flex-col">
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

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-medium text-white mb-6 max-w-3xl mx-auto"
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
          className="text-zinc-400 text-base sm:text-lg mb-8 max-w-xl mx-auto"
        >
          {t('description')}
          <br />
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
          <Button size="lg" className="bg-white text-black hover:bg-zinc-200 px-8 py-6 text-base sm:text-lg font-medium">
            {t('cta')}
          </Button>
        </motion.div>
      </div>

      {/* Art Gallery */}
      <ArtGallery />
    </section>
  )
}