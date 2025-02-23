// BannerHero.tsx
"use client"

import { motion } from "framer-motion"
import { Search, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function BannerHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden ">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="w-full h-full"
          style={{
            backgroundImage: "url('/images/beds-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl text-gray-200 mb-8">Comfortable accommodations near your event venue</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-md rounded-full p-2 flex flex-col md:flex-row items-center"
          >
            <div className="flex-1 flex items-center space-x-4 w-full md:w-auto mb-4 md:mb-0">
              <MapPin className="text-white ml-4" />
              <Input
                type="text"
                placeholder="Location"
                className="bg-transparent border-none text-white placeholder-gray-300 flex-grow"
              />
            </div>
            <div className="flex-1 flex items-center space-x-4 w-full md:w-auto mb-4 md:mb-0">
              <Calendar className="text-white" />
              <Input
                type="text"
                placeholder="Check-in - Check-out"
                className="bg-transparent border-none text-white placeholder-gray-300 flex-grow"
              />
            </div>
            <Button className="w-full md:w-auto bg-white text-black hover:bg-gray-200 rounded-full px-8">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}