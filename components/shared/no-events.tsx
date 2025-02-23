// components/NoEvents.jsx
"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function NoEvents() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full min-h-[30vh] text-center px-4 py-8"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[120px] sm:max-w-[150px] md:max-w-[180px] mb-4"
      >
        <Image
          src="/images/no-event.svg"
          alt="No events available"
          width={80}
          height={60}
          className="w-full h-auto object-contain"
        />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2"
      >
        No Events Found
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-gray-300 text-xs sm:text-sm md:text-base max-w-sm"
      >
        There are currently no events in this category. Check back later or explore other categories!
      </motion.p>
    </motion.div>
  )
}