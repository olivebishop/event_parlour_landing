"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Art gallery cards data - using local images
const artCards = [
  { image: "/images/dummy/a.jpg" },
  { image: "/images/dummy/b.jpg" },
  { image: "/images/dummy/c.jpg" },
  { image: "/images/dummy/five.jpg" },
  { image: "/images/dummy/six.jpg" },
  { image: "/images/dummy/seven.jpg" },
  { image: "/images/dummy/eight.jpg" },
]

export default function ArtGallery() {
  return (
    <div className="relative h-[280px] sm:h-[320px] md:h-[360px] w-full mx-auto mt-10 sm:mt-14 lg:mt-16">
      {/* Container with centered positioning */}
      <div className="relative w-full h-full flex items-center justify-center">
        {artCards.map((card, index) => {
          // Calculate positions for fan-out effect from center
          const totalCards = artCards.length
          const middleIndex = Math.floor(totalCards / 2)
          const offset = index - middleIndex
          
          // X position: spread cards evenly from center (responsive spacing)
          const xPosition = offset * 100 // reduced spacing for better fit
          
          // Y position: create arc effect (cards at edges are lower)
          const yPosition = Math.abs(offset) * 12
          
          // Rotation: cards fan out from center
          const rotation = offset * 5

          return (
            <motion.div
              key={index}
              className="absolute cursor-pointer"
              style={{
                zIndex: totalCards - Math.abs(offset), // Center cards have higher z-index
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
              <div className="relative w-[100px] h-[140px] sm:w-[120px] sm:h-[170px] md:w-[140px] md:h-[200px] lg:w-[160px] lg:h-[230px] rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/60 overflow-hidden border-2 border-white/20 bg-zinc-900">
                <Image
                  src={card.image}
                  alt={`Event moment ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
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
