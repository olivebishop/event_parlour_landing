"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

const cards = [
  {
    id: 1,
    title: "Organizers",
    description:
      "Sell tickets, access analytics, manage speaker lists for tech and music events. Create personalized profiles to share and sell merchandise, promote upcoming albums and more.",
    features: [
      "• Ticket Sales",
      "• Event Analytics",
      "• Speaker Management",
      "• Merchandise Sales",
      "• Profile Customization",
    ],
  },
  {
    id: 2,
    title: "Attendees",
    description:
      "Discover and attend events, manage your tickets, and connect with other attendees. Transfer tickets easily and build your event network.",
    features: ["• Event Discovery", "• Ticket Transfers", "• Peer Connection", "• Event Calendar", "• Digital Tickets"],
  },
  {
    id: 3,
    title: "Vendors",
    description:
      "Join our event vendor network to start offering your services for exciting events and create unforgettable experiences.",
    subtext: "Venue providers • Equipment rentals • Food Vendors",
    features: [
      "• Service Listings",
      "• Payment Processing",
      "• Event Applications",
      "• Booking Management & Analytics",
    ],
  },
  {
    id: 4,
    title: "Speakers",
    description: "Create your speaker profile, connect with event organizers, and manage your speaking engagements.",
    features: [
      "• Profile Creation",
      "• Engagement Calendar",
      "• Topic Management",
      "• Direct Booking",
      "• Performance Analytics",
    ],
  },
  {
    id: 5,
    title: "Musicians",
    description: "Showcase your talent, sell merchandise, and connect with event organizers for live performances.",
    features: [
      "• Performance Booking",
      "• Merchandise Sales",
      "• Music Samples",
      "• Tour Management",
      "• Fan Engagement",
    ],
  },
]

export default function ExpandingCards() {
  const [activeCard, setActiveCard] = useState(1)
  const isTablet = useMediaQuery("(min-width: 768px)")
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isXsMobile = useMediaQuery("(max-width: 380px)")
  const isLargeScreen = useMediaQuery("(min-width: 1024px)")
  const isExtraLargeScreen = useMediaQuery("(min-width: 1280px)")

  const getCardDimensions = () => {
    if (isXsMobile) {
      return {
        startWidth: 50,
        endWidth: 280,
        height: 480,
      }
    }
    if (isMobile) {
      return {
        startWidth: 60,
        endWidth: 320,
        height: 500,
      }
    }
    if (isTablet) {
      return {
        startWidth: 80,
        endWidth: 400,
        height: 520,
      }
    }
    if (isLargeScreen) {
      return {
        startWidth: 100,
        endWidth: 480,
        height: 540,
      }
    }
    if (isExtraLargeScreen) {
      return {
        startWidth: 120,
        endWidth: 520,
        height: 560,
      }
    }
    return {
      startWidth: 100,
      endWidth: 420,
      height: 540,
    }
  }

  const { startWidth, endWidth, height } = getCardDimensions()

  return (
    <section className="py-16 bg-gradient-to-b from-black via-[#171717] to-black">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="max-w-[1140px] mx-auto"
        >
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mr-4">Why choose us?</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-50 to-white"></div>
          </motion.div>
          
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl text-zinc-400">Empowering Event Experiences</h3>
          </div>

          <div
            className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-6 items-stretch scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
            style={{ height }}
          >
            {cards.map((card) => {
              const isSelected = card.id === activeCard

              const springConfig = {
                width: isSelected ? endWidth : startWidth,
                config: { mass: 2, friction: 40, tension: 600 },
              }

              return (
                <motion.div
                  key={card.id}
                  className="relative shrink-0 cursor-pointer rounded-xl bg-[#1f1f1f] transition-colors hover:bg-[#2a2a2a] shadow-lg"
                  onHoverStart={() => setActiveCard(card.id)}
                  onClick={() => setActiveCard(card.id)}
                  animate={springConfig}
                  style={{ width: springConfig.width }}
                >
                  <div className="h-full overflow-hidden">
                    <div className="w-full h-full relative">
                      <div className="p-3 xs:p-4 sm:p-5 lg:p-6 xl:p-8 h-full flex flex-col">
                        {/* Rotated title for non-selected cards and larger screens */}
                        <div 
                          className={`origin-top-left rotate-90 absolute left-[32px] xs:left-[36px] sm:left-[42px] lg:left-[60px] xl:left-[82px] top-[32px] xs:top-[36px] sm:top-[42px] lg:top-[46px] h-[80px] flex items-center
                          ${(isSelected && (isXsMobile || isMobile)) ? 'opacity-0' : 'opacity-100'}`}
                        >
                          <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-semibold text-white whitespace-nowrap">
                            {card.title}
                          </h3>
                        </div>

                        {/* Centered title for selected cards on small devices */}
                        <div 
                          className={`absolute top-4 left-0 right-0 text-center transition-opacity duration-300
                          ${(isSelected && (isXsMobile || isMobile)) ? 'opacity-100' : 'opacity-0'}`}
                        >
                          <h3 className="text-base xs:text-lg font-semibold text-white">
                            {card.title}
                          </h3>
                        </div>
                        
                        <div className="absolute inset-0 flex flex-col">
                          <div
                            className={`mt-[120px] xs:mt-[140px] sm:mt-[160px] lg:mt-[180px] transition-opacity duration-300 delay-100 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 pb-4 sm:pb-6 lg:pb-8 xl:pb-12 ${
                              isSelected ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <p className="text-xs xs:text-sm sm:text-base text-zinc-400 mb-2 sm:mb-3 lg:mb-4">{card.description}</p>
                            {card.subtext && (
                              <p className="text-xs xs:text-sm sm:text-base text-zinc-500 italic mb-3 sm:mb-4">
                                {card.subtext}
                              </p>
                            )}
                            <ul className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                              {card.features.map((feature, index) => (
                                <li key={index} className="text-xs xs:text-sm sm:text-base lg:text-base text-zinc-300">
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}