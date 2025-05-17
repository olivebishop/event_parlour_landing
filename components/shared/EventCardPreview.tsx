"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Sample event data for preview
const previewEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    image: "/images/dummy/one.jpg",
    date: "Sat, Aug 12 • 2:00 PM",
    location: "Central Park",
    category: "Music",
    price: "Ksh 700"
  },
  {
    id: 2,
    title: "Food Truck Rally",
    image: "/images/dummy/five.jpg",
    date: "Sun, Aug 13 • 11:00 AM",
    location: "Downtown Square",
    category: "Food & Drink",
    price: "Free"
  },
  {
    id: 3,
    title: "Art Gallery Opening",
    image: "/images/dummy/four.jpg",
    date: "Fri, Aug 18 • 7:00 PM",
    location: "Modern Art Museum",
    category: "Arts",
    price: "Ksh 2890"
  }
]

export default function EventCardPreview() {
  const [, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate featured event
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % previewEvents.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8 sm:mt-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-lg sm:text-xl font-medium text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent inline-block">
          What&apos;s Happening Near You
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-white/80 to-white/20 mx-auto mt-2 rounded-full"></div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
      >
        {previewEvents.map((event, index) => {
          const isActive = index === activeIndex;
          
          return (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-xl bg-black/50 border border-gray-800 backdrop-blur-sm transition-all duration-300 ${
                isActive ? "md:scale-105 shadow-lg shadow-white/5 z-10" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                scale: isActive ? 1.05 : 1,
                borderColor: isActive ? "rgba(255, 255, 255, 0.3)" : "rgba(31, 41, 55, 0.8)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden">
                <div
                  style={{ backgroundImage: `url(${event.image})` }}
                  className="w-full h-full bg-cover bg-center absolute inset-0 transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
                
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 hover:bg-white text-black border-none text-xs font-medium px-2 py-0.5">
                    {event.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg text-white mb-2 line-clamp-1">{event.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="h-3.5 w-3.5 mr-2 text-gray-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <MapPin className="h-3.5 w-3.5 mr-2 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-white font-medium">
                    {event.price === "Free" ? (
                      <span className="text-green-400">Free</span>
                    ) : (
                      <span>{event.price}</span>
                    )}
                  </div>
                  <Link href="/events">
                    <motion.button
                      whileHover={{ x: 3 }}
                      className="text-gray-300 hover:text-white text-sm flex items-center"
                    >
                      View details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </motion.button>
                  </Link>
                </div>
              </div>
              
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-white/80 via-white/50 to-transparent"
                ></motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex justify-center mt-8"
      >
        <Link href="/events">
          <button className="bg-transparent border border-white/30 hover:border-white/70 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-all duration-300 flex items-center group">
            See all events
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              className="inline-block ml-2 group-hover:translate-x-1 transition-transform"
            >
              →
            </motion.span>
          </button>
        </Link>
      </motion.div>
    </div>
  )
}