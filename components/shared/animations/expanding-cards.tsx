"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"

// Define card type for better type safety
interface Card {
  id: number
  title: string
  description: string
  features: string[]
  image: string
  subtext?: string
}

const cards: Card[] = [
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
    image: "/images/org.svg",
  },
  {
    id: 2,
    title: "Attendees",
    description:
      "Discover and attend events, manage your tickets, and connect with other attendees. Transfer tickets easily and build your event network.",
    features: ["• Event Discovery", "• Ticket Transfers", "• Peer Connection", "• Event Calendar", "• Digital Tickets"],
    image: "/images/attendee.svg",
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
    image: "/images/vendor.svg",
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
    image: "/images/speaker.svg",
  },
  {
    id: 5,
    title: "Musicians",
    description: "Showcase your talent, sell merchandise, and connect with event organizers for live performances.",
    features: [
      "• Performance Booking",
      "• Merchandise  and  Album Sales",
      "• Music Samples",
      "• Tour Management",
   
    ],
    image: "/images/musician.svg",
  },
  {
    id: 6,
    title: "Accommodation",
    description: "Host attendees, speakers, vendors, and organizers with our Airbnb-like feature for events.",
    features: [
      "• Event Hosting",
      "• Booking Management",
      "• Guest Communication",
      "• Payment Processing",
      "• Review System",
    ],
    image: "/images/accomodation.svg",
  },
]

export default function ExpandingCards() {
  const [activeCard, setActiveCard] = useState(1)
  // Add responsive state to track vertical or horizontal layout
  const [isVerticalLayout, setIsVerticalLayout] = useState(false)
  // Track smaller screens for additional styling adjustments
  const [isExtraSmallScreen, setIsExtraSmallScreen] = useState(false)

  // Calculate grid template based on active card
  const getGridTemplateColumns = () => {
    // For horizontal layout
    if (!isVerticalLayout) {
      return cards.map((card) => (card.id === activeCard ? "10fr" : "1fr")).join(" ")
    }
    // For vertical layout, equal columns
    return "1fr"
  }

  const getGridTemplateRows = () => {
    // For vertical layout on mobile
    if (isVerticalLayout) {
      return cards.map((card) => (card.id === activeCard ? "10fr" : "1fr")).join(" ")
    }
    // For horizontal layout, equal rows
    return "1fr"
  }

  // Check screen size and adjust layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsVerticalLayout(window.innerWidth < 768) // Switch to vertical layout below md breakpoint
      setIsExtraSmallScreen(window.innerWidth < 480) // Extra small screens (most phones)
    }

    // Initial check
    checkScreenSize()

    // Add resize listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // Recalculate layout on resize if needed
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Force a re-render on resize to ensure proper layout
      setActiveCard((prev) => prev)
    })

    const container = document.querySelector(".cards-container")
    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      if (container) {
        resizeObserver.disconnect()
      }
    }
  }, [])

  // Handle card interaction
  const handleCardInteraction = (id: number) => {
    setActiveCard(id)
  }

  return (
    <section className="py-6 sm:py-10 md:py-16 dark">
      <div className="container mx-auto px-3 sm:px-6 flex flex-col items-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-center">Empowering Event Experiences</h1>
        <p className="max-w-[74ch] text-balance text-center mb-6 sm:mb-12 md:mb-16 opacity-80 text-xs sm:text-sm md:text-base">
          Unlock the art and science of event management. This isn&apos;t just about organizing events or following schedules
          — it&apos;s about mastering the tools, understanding the nuances, and shaping experiences with intention.
        </p>

        <ul
          className={`cards-container list-none p-0 m-0 w-full max-w-full sm:max-w-full md:max-w-[820px] transition-all duration-600 ${
            isVerticalLayout 
              ? "grid grid-cols-1 gap-2 h-[80vh] max-h-[900px]" 
              : "grid gap-2 h-[clamp(250px,40vh,474px)]"
          }`}
          style={
            {
              gridTemplateColumns: getGridTemplateColumns(),
              gridTemplateRows: getGridTemplateRows(),
              "--gap": "8px",
              "--base": isVerticalLayout ? (isExtraSmallScreen ? "35px" : "40px") : "clamp(2rem, 8cqi, 80px)",
              "--easing":
                "linear(0 0%, 0.1538 4.09%, 0.2926 8.29%, 0.4173 12.63%, 0.5282 17.12%, 0.6255 21.77%, 0.7099 26.61%, 0.782 31.67%, 0.8425 37%, 0.8887 42.23%, 0.9257 47.79%, 0.9543 53.78%, 0.9752 60.32%, 0.9883 67.11%, 0.9961 75%, 1 100%)",
              "--speed": "0.6s",
            } as React.CSSProperties
          }
        >
          {cards.map((card) => {
            const isActive = card.id === activeCard

            return (
              <li
                key={card.id}
                className={`card-item relative overflow-hidden ${
                  isVerticalLayout ? "min-h-[var(--base)]" : "min-w-[var(--base)]"
                } rounded-lg border border-zinc-800 bg-black ${isActive ? "active" : ""}`}
                data-active={isActive.toString()}
                onClick={() => handleCardInteraction(card.id)}
                onMouseEnter={() => !isExtraSmallScreen ? handleCardInteraction(card.id) : null}
              >
                <article className="w-full h-full absolute top-0 left-0 flex flex-col justify-end gap-2 sm:gap-4 p-3 sm:p-4 overflow-hidden font-mono">
                  <h3 className={`
                    absolute text-sm sm:text-base font-light uppercase text-white opacity-60 
                    transition-opacity duration-[calc(var(--speed)*1.2)] ease-[var(--easing)]
                    ${isVerticalLayout 
                      ? "top-[50%] left-4 -translate-y-1/2 rotate-0" 
                      : "top-4 left-[calc(var(--base)*0.5)] origin-[0_50%] rotate-90"}
                  `}>
                    {card.title}
                  </h3>

                  <div className={`
                    relative z-10 flex flex-col gap-1 sm:gap-2
                    transition-opacity duration-[calc(var(--speed)*1.2)] ease-[var(--easing)] delay-[calc(var(--speed)*0.25)]
                    opacity-0 ${isActive && isVerticalLayout ? "mt-4 sm:mt-6" : ""}
                  `}>
                    <p className="text-xs sm:text-sm text-balance leading-tight mb-1 sm:mb-2">
                      {card.description}
                    </p>
                    
                    {isActive && (
                      <ul className="text-xs leading-tight space-y-1 hidden sm:block">
                        {card.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="text-white/80">{feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className={`
                    absolute inset-0 w-full h-full
                    ${isActive && isVerticalLayout ? "opacity-40" : ""}
                  `}>
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt=""
                      fill
                      className={`
                        object-cover pointer-events-none filter grayscale brightness-150 scale-110 
                        transition-all duration-[calc(var(--speed)*1.2)] ease-[var(--easing)]
                      `}
                      style={{
                        maskImage: "radial-gradient(100% 100% at 100% 0, #fff, #0000)",
                      }}
                    />
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      <style jsx global>{`
        .dark {
          color-scheme: dark;
          background-color: #000;
          color: #fff;
        }
        
        [data-active="true"] :is(a, p, h3, ul, li, div) {
          opacity: 1 !important;
        }
        
        [data-active="true"] img {
          filter: grayscale(0) brightness(1) !important;
          scale: 1 !important;
          transition-delay: calc(var(--speed) * 0.25);
        }
        
        /* Add semi-transparent background behind content in active cards on small screens */
        @media (max-width: 767px) {
          [data-active="true"] article::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%);
            z-index: 1;
          }
        }
        
        /* Specific adjustments for extra small screens */
        @media (max-width: 479px) {
          [data-active="true"] article {
            padding-top: 2.5rem !important;
          }
          
          [data-active="true"] h3 {
            top: 0.75rem !important;
            left: 0.75rem !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}