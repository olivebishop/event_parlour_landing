"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
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

export function LaunchingSoon() {
  return (
    <div className="relative h-screen min-h-[90vh] z-10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/coming-soon.jpg" // Replace with your "coming soon" or launch image
          alt="Launching Soon Background"
          fill
          priority
          className="object-cover opacity-75 blur-sm" // Added blur-md class
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={100}
        />
        {/* Gradient Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/50 via-transparent to-[#171717]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#171717]/30 via-transparent to-[#171717]/80" />
      </div>

      {/* Main Launching Soon Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-32 flex flex-col items-center justify-center h-full">
        <motion.div 
          className="text-center max-w-3xl w-full" 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
          >
            Launching Soon
          </motion.h1>
          <motion.div variants={itemVariants} className="mt-6 sm:mt-8 md:mt-10">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-black hover:bg-[#171717] hover:border-white border-[#171717] border hover:text-white rounded-full  px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 transition-colors text-sm sm:text-base md:text-lg backdrop-blur-sm"
              onClick={() => window.location.href = "/contact-us"}
            >
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}