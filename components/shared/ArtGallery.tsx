"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Art gallery cards data - using local images
const artCards = [
  { image: "/images/concerts.png" },
  { image: "/images/cyclist.png" },
  { image: "/images/hiking.png" },
  { image: "/images/f1.png" },
  { image: "/images/concerts.png" },
  { image: "/images/cyclist.png" },
  { image: "/images/hiking.png" },
]

export default function ArtGallery() {
  return (
    <div className="relative h-[200px] xs:h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[400px] w-full mx-auto mt-6 xs:mt-8 sm:mt-10 md:mt-14 lg:mt-16">
      {/* Container with centered positioning */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-2">
        {artCards.map((card, index) => {
          // Calculate positions for fan-out effect from center
          const totalCards = artCards.length
          const middleIndex = Math.floor(totalCards / 2)
          const offset = index - middleIndex
          
          // X position: spread cards evenly from center (responsive spacing)
          // Use CSS custom properties for responsive values
          const xPosition = offset * 100 // Base spacing, scaled via CSS
          
          // Y position: create arc effect (cards at edges are lower)
          const yPosition = Math.abs(offset) * 12
          
          // Rotation: cards fan out from center
          const rotation = offset * 5

          return (
            <motion.div
              key={index}
              className="absolute cursor-pointer"
              style={{
                zIndex: totalCards - Math.abs(offset),
                // Responsive X positioning using clamp
                ['--card-x' as string]: `${offset * 50}px`,
              }}
              initial={{
                x: 0,
                y: 50,
                rotate: 0,
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                x: xPosition,
                y: yPosition,
                rotate: rotation,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.08,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                y: yPosition - 30,
                scale: 1.1,
                zIndex: 50,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                },
              }}
            >
              <div className="relative w-[70px] h-[100px] xs:w-[85px] xs:h-[120px] sm:w-[100px] sm:h-[140px] md:w-[120px] md:h-[170px] lg:w-[140px] lg:h-[200px] xl:w-[160px] xl:h-[230px] 2xl:w-[180px] 2xl:h-[260px] rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl shadow-2xl shadow-black/60 overflow-hidden border border-white/10 xs:border-2 xs:border-white/20 bg-zinc-900">
                <Image
                  src={card.image}
                  alt={`Event moment ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 475px) 70px, (max-width: 640px) 85px, (max-width: 768px) 100px, (max-width: 1024px) 120px, (max-width: 1280px) 140px, 180px"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
