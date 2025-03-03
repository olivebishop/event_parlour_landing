"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Barcode, Sparkles } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media"
import { Wallet } from 'lucide-react';

// Container Variants with more dramatic animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1], // Improved easing
    },
  },
}

// Enhanced Word Animation Component with more vibrant transition
function WordAnimation() {
  const [index, setIndex] = useState(0)
  const words = ["Organizers", "Attendees", "Speakers", "Vendors",]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const currentWord = words[index]

  return (
    <motion.div className="inline-block font-medium">
      {currentWord.split("").map((char, i) => (
        <motion.span
          key={`${currentWord}-${char}-${i}`}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{
            duration: 0.2,
            delay: i * 0.02,
            ease: "easeOut",
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          className="text-white"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Noise Texture Component for added visual interest
export default function Hero() {
  const [currentDateTime, setCurrentDateTime] = useState<{ date: string; time: string }>({ date: "", time: "" })
  const [userLocation, setUserLocation] = useState<string>("Loading location...")
  const isLargeScreen = useMediaQuery("(min-width: 1024px)")
  const isMobileScreen = useMediaQuery("(max-width: 640px)")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentDateTime({
        date: now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })
    }

    // Update immediately
    updateDateTime()

    // Update every minute
    const interval = setInterval(updateDateTime, 60000)

    // Clean up interval
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Function to get user's location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Using reverse geocoding to get location name from coordinates
              const { latitude, longitude } = position.coords
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
              )
              
              if (response.ok) {
                const data = await response.json()
                // Get city name or address from the response
                const city = data.address.city || 
                             data.address.town || 
                             data.address.village || 
                             data.address.county ||
                             "Your Location"
                setUserLocation(city)
              } else {
                setUserLocation("Your Location")
              }
            } catch (error) {
              setUserLocation("Your Location")
              console.error("Error fetching location:", error)
            }
          },
          (error) => {
            setUserLocation("Your Location")
            console.error("Geolocation error:", error)
          }
        )
      } else {
        setUserLocation("Your Location")
        console.error("Geolocation is not supported by this browser")
      }
    }

    getUserLocation()
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center  bg-gradient-to-b from-black to-[#171717]">
      {/* Removed the Image background and related overlays */}
   

      {/* Animated Background Elements */}
      {!isMobileScreen && (
        <>
          <motion.div 
            className="absolute top-20 left-[10%] w-1 h-1 rounded-full bg-white z-5"
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute bottom-40 right-[20%] w-1 h-1 rounded-full bg-white z-5"
            animate={{ 
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-[15%] w-1 h-1 rounded-full bg-white z-5"
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}

      {/* Main Content Container with enhanced glassmorphism */}
      <div className="container mx-auto px-4 sm:px-6 z-10"> 
        <div className="w-full bg-gradient-to-r from-black/50 via-black/30 to-black/50 shadow-xl shadow-black/30 rounded-3xl overflow-hidden backdrop-blur-[4px] border border-white/10">
          <div className="px-6 md:px-10 pt-10 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Main Content */}
            <motion.div
              className="flex flex-col justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex items-center mb-2">
                <div className="w-10 h-0.5 bg-white/80 mr-3"></div>
                <span className="text-white/80 text-sm font-medium tracking-wider uppercase">Event Parlour</span>
              </motion.div>
              
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight"
                variants={itemVariants}
              >
                Event platform for{' '}
                <span className="relative">
                  <span className="relative z-10 text-[#f6efe5]">everyone</span>
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-white/30"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg md:text-xl text-gray-200 mt-6 mb-8 max-w-md" 
                variants={itemVariants}
              >
                Connecting organizers, attendees, and vendors in one seamless experience.
              </motion.p>

              <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
                <button
                  className="bg-white hover:bg-gray-100 text-black px-8 py-3 rounded-md font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/20 group"
                  aria-label="Get started with Event Parlour"
                >
                  <span className="flex items-center">
                    Get Started
                    <motion.span 
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >→</motion.span>
                  </span>
                </button>
                <button
                  className="bg-transparent border border-white/80 text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-all duration-300 hover:border-white"
                  aria-label="Explore Event Parlour features"
                >
                  Explore Events
                </button>
              </motion.div>

              <motion.div 
                className="mt-8 flex items-center space-x-6 text-sm text-gray-300" 
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center bg-white/10 rounded-full mr-2">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span>All-in-one solution</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center bg-white/10 rounded-full mr-2">
                    <Wallet className="w-3 h-3 text-white" />
                  </div>
                  <span>No hidden fees</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Enhanced Ticket Example */}
            {isLargeScreen && (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="bg-black/90 text-white p-8 rounded-xl border border-white/20 shadow-lg shadow-black/20 w-full max-w-md backdrop-blur-sm relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/5"></div>
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-white/5"></div>
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <h3 className="font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Unforgettable Events,</h3>
                      <h4 className="font-bold text-xl text-gray-300">Made Simple.</h4>
                    </div>
                    <div className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold">Event Parlour</div>
                  </div>

                  <div className="w-full h-0.5 bg-gradient-to-r from-white/5 via-white/20 to-white/5 mb-6"></div>

                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                      <p className="text-sm font-medium mb-2 text-gray-400">Date</p>
                      <p className="text-sm font-semibold mb-4 text-white">{currentDateTime.date}</p>
                      
                      <p className="text-sm font-medium mb-2 text-gray-400">Time</p>
                      <p className="text-sm font-semibold mb-4 text-white">{currentDateTime.time}</p>
                      
                      <p className="text-sm font-medium mb-2 text-gray-400">Venue</p>
                      <p className="text-sm font-semibold text-white">{userLocation}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium mb-2 text-gray-400">Seat</p>
                      <p className="text-sm font-semibold mb-4 text-white">General Admission</p>
                      
                      <p className="text-sm font-medium mb-2 text-gray-400">Price</p>
                      <p className="text-xl font-bold text-white">$50<span className="text-sm">.00</span></p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end relative z-10">
                    <p className="text-xs text-gray-300">
                      The complete events ecosystem for <WordAnimation />
                    </p>
                    <div className="flex flex-col items-end">
                      <Barcode className="h-10 w-24 text-white" />
                      <p className="text-xs font-mono mt-1 text-gray-400">eventparlour.com</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}