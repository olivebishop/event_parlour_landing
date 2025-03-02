"use client"

import React, { useState, useEffect } from "react"
import { motion, type Transition, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { Barcode } from "lucide-react"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media"

// Container Variants
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

// Spinning Text Component
type SpinningTextProps = {
  children: string
  style?: React.CSSProperties
  duration?: number
  className?: string
  reverse?: boolean
  fontSize?: number
  radius?: number
  transition?: Transition
  variants?: {
    container?: Variants
    item?: Variants
  }
  showCenterDot?: boolean
  centerDotSize?: number
  centerDotColor?: string
}

const BASE_TRANSITION = {
  repeat: Number.POSITIVE_INFINITY,
  ease: "linear",
}

const BASE_ITEM_VARIANTS = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
}

// Memoized SpinningText component for better performance
const SpinningText = React.memo(
  ({
    children,
    duration = 10,
    style,
    className,
    reverse = false,
    fontSize = 0.8,
    radius = 4,
    transition,
    variants,
    showCenterDot = true,
    centerDotSize = 4,
    centerDotColor = "white",
  }: SpinningTextProps) => {
    const letters = children.split("")
    const totalLetters = letters.length

    const finalTransition = {
      ...BASE_TRANSITION,
      ...transition,
      duration: (transition as { duration?: number })?.duration ?? duration,
    }

    const containerVariants = {
      visible: { rotate: reverse ? -360 : 360 },
      ...variants?.container,
    }

    const itemVariants = {
      ...BASE_ITEM_VARIANTS,
      ...variants?.item,
    }

    return (
      <motion.div
        className={cn("relative", className)}
        style={{
          ...style,
        }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={finalTransition}
      >
        {letters.map((letter, index) => (
          <motion.span
            aria-hidden="true"
            key={`${index}-${letter}`}
            variants={itemVariants}
            className="absolute left-1/2 top-1/2 inline-block"
            style={
              {
                "--index": index,
                "--total": totalLetters,
                "--font-size": fontSize,
                "--radius": radius,
                fontSize: `calc(var(--font-size, 0.8) * 1rem)`,
                transform: `
                translate(-50%, -50%)
                rotate(calc(360deg / var(--total) * var(--index)))
                translateY(calc(var(--radius, 4) * -1ch))
              `,
                transformOrigin: "center",
              } as React.CSSProperties
            }
          >
            {letter}
          </motion.span>
        ))}
        {showCenterDot && (
          <div
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: `${centerDotSize}px`,
              height: `${centerDotSize}px`,
              backgroundColor: centerDotColor,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        <span className="sr-only">{children}</span>
      </motion.div>
    )
  },
)

SpinningText.displayName = "SpinningText"

// Enhanced Word Animation Component with character-by-character animation
function WordAnimation() {
  const [index, setIndex] = useState(0)
  const words = ["Organizers", "Attendees", "Speakers", "Venues", "Vendors", "Caterers"]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const currentWord = words[index]

  return (
    <motion.div className="inline-block">
      {currentWord.split("").map((char, i) => (
        <motion.span
          key={`${currentWord}-${char}-${i}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{
            duration: 0.15,
            delay: i * 0.015,
            ease: "easeOut",
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Spinning Text Basic
function SpinningTextBasic() {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 768px)")

  return (
    <SpinningText
      radius={4}
      fontSize={isMobile ? 1.2 : isTablet ? 1 : 0.8}
      className="font-sm leading-none"
      centerDotColor="white"
      centerDotSize={3}
      duration={12}
    >
      {`connect • discover • create • connect • `}
    </SpinningText>
  )
}

export default function Hero() {
  const [currentDateTime, setCurrentDateTime] = useState<{ date: string; time: string }>({ date: "", time: "" })
  const [userLocation, setUserLocation] = useState<string>("Loading location...")
  const isLargeScreen = useMediaQuery("(min-width: 1024px)")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentDateTime({
        date: now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        time: now.toLocaleTimeString(),
      })
    }

    // Update immediately
    updateDateTime()

    // Update every second
    const interval = setInterval(updateDateTime, 1000)

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
    <div className="relative min-h-screen flex items-center justify-center py-10 px-4 sm:px-6">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_one.svg"
          alt="Hero background showing an event venue"
          fill
          priority
          loading="eager"
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
          quality={100}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-6xl z-10 bg-gradient-to-r from-black/40 via-transparent to-black/40 shadow-lg shadow-black rounded-3xl overflow-hidden backdrop-blur-[2px]">
        <div className="px-6 md:px-10 pt-8 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 lg:mt-10">
          {/* Left Column - Main Content */}
          <motion.div
            className="flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight"
              variants={itemVariants}
            >
              Event platform for <span className="text-[#f6efe5]">everyone</span>
            </motion.h1>

            <motion.p className="text-lg text-gray-300 mt-6 mb-8" variants={itemVariants}>
              Connecting organizers, attendees, and vendors in one seamless experience.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
              <button
                className="bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-md font-medium transition-colors"
                aria-label="Get started with Event Parlour"
              >
                Get Started
              </button>
              <button
                className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
                aria-label="Explore Event Parlour features"
              >
                Explore
              </button>
            </motion.div>

            <motion.div className="mt-8 flex items-center space-x-6 text-sm text-gray-400" variants={itemVariants}>
              <span>✓ All-in-one solution</span>
              <span>✓ No hidden fees</span>
            </motion.div>

            <motion.div
              className="mt-12 flex justify-center sm:justify-center md:justify-center lg:justify-start lg:ml-20"
              variants={itemVariants}
            >
              <SpinningTextBasic />
            </motion.div>
          </motion.div>

          {/* Right Column - Ticket Example */}
          {isLargeScreen && (
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="bg-black text-white p-6 rounded-lg border-2 border-dashed border-gray-100 shadow-lg w-full max-w-md">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-2xl">Unforgettable Events,</h3>
                    <h4 className="font-bold text-xl">Made Simple.</h4>
                  </div>
                  <div className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold">Event Parlour</div>
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm font-semibold mb-1">Date: {currentDateTime.date}</p>
                    <p className="text-sm font-semibold mb-1">Time: {currentDateTime.time}</p>
                    <p className="text-sm font-semibold">Venue: {userLocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold mb-1">Seat: General Admission</p>
                    <p className="text-sm font-semibold">Price: $50.00</p>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <p className="text-xs text-white">
                    The complete events ecosystem for <WordAnimation />
                  </p>
                  <div className="flex flex-col items-end">
                    <Barcode className="h-10 w-24 text-gray-100" />
                    <p className="text-xs font-mono mt-1">eventparlour.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}