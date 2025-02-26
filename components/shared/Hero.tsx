"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WordAnimation } from "@/components/shared/WordAnimation"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function Hero() {
  return (
    <div className="relative w-full flex flex-col justify-center items-center z-10 min-h-screen py-8 md:py-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_one.svg"
          alt="Hero Image"
          fill
          priority
          className="object-cover opacity-75"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
          quality={100}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>
      
      <div className="container mx-auto px-4 flex flex-col items-center justify-center w-full max-w-6xl">
        {/* Top Update Link */}
        <motion.a
          href="https://www.whatsapp.com/channel/0029ValLxITAO7RActotOX3R"
          className="inline-flex items-center space-x-2 text-xs sm:text-sm text-white hover:text-gray-200 transition-colors border border-white/80 rounded-full px-3 sm:px-4 py-1 backdrop-blur-sm mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>🎉 | Get Event Updates</span>
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 animate-out" />
        </motion.a>
        
        {/* Main Hero Content */}
        <motion.div 
          className="max-w-3xl mx-auto text-center px-2 my-4 sm:my-6 md:my-8"
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight drop-shadow-lg"
          >
            Unforgettable Events, Made Simple.
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-200 mb-4 sm:mb-5 md:mb-6 leading-tight drop-shadow-md"
          >
            The Go-To Platform for <WordAnimation />
          </motion.h2>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center mt-2">
            <Button
              variant="outline"
              className="border-white text-black bg-white/90 hover:bg-white hover:text-black rounded-md px-4 sm:px-5 py-2 transition-colors text-sm sm:text-base backdrop-blur-sm"
            >
              Host Event
            </Button>
            <Button
              variant="outline"
              className="border-white/80 text-white bg-black hover:bg-white/10 rounded-md px-4 sm:px-5 py-2 hover:text-white transition-colors text-sm sm:text-base backdrop-blur-sm"
            >
              Explore Events
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}