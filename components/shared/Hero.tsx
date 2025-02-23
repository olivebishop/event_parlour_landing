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
    <div className="relative  h-[90vh] z-10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_one.svg"
          alt="Hero Image"
          fill
          priority
          className="object-cover opacity-75"
          sizes="100vw"
          quality={100}
        />
        {/* Adjusted Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* Top Update Link */}
      <div className="container mx-auto px-4 sm:px-6 pt-20">
        <motion.a
          href="/updates"
          className="inline-flex items-center space-x-2 text-sm text-white hover:text-gray-200 transition-colors border border-white/80 rounded-full px-4 py-1 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>🎉 | February Event Updates</span>
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>

      {/* Main Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 pt-6">
        <motion.div className="max-w-3xl" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg"
          >
            Unforgettable Events, Made Simple.
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-200 mb-8 leading-tight drop-shadow-md"
          >
            The Go-To Platform for <WordAnimation />
          </motion.h2>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-black bg-white/90 hover:bg-white hover:text-black rounded-md px-6 sm:px-8 py-2 sm:py-3 transition-colors text-sm sm:text-base backdrop-blur-sm"
            >
              Host Event
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/80 text-white  bg-black hover:bg-white/10 rounded-md px-6 sm:px-8 py-2 sm:py-3 hover:text-white transition-colors text-sm sm:text-base backdrop-blur-sm"
            >
              Explore Events
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}