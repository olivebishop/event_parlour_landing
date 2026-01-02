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
      "Sell tickets, access analytics, manage speaker lists for tech and music events.",
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
      "• Merchandise Sales",
      "• Music Samples",
      "• Tour Management",
      "• Fan Engagement",
    ],
    image: "/images/musician.svg",
  },
]

export default function ExpandingCards() {
  const [activeCard, setActiveCard] = useState(1)
  // Add responsive state to track vertical or horizontal layout
  const [isVerticalLayout, setIsVerticalLayout] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

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
      return cards.map((card) => (card.id === activeCard ? "auto" : "60px")).join(" ")
    }
    // For horizontal layout, equal rows
    return "1fr"
  }

  // Check screen size and adjust layout
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsVerticalLayout(width < 768) // Switch to vertical layout below md breakpoint
      setIsMobileView(width < 640) // Extra small devices
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

  // Handle card interaction
  const handleCardInteraction = (id: number) => {
    setActiveCard(id)
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 dark">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-center">Empowering Event Experiences</h1>
        <p className="max-w-[74ch] text-balance text-center mb-8 sm:mb-12 md:mb-16 opacity-80 text-xs sm:text-sm md:text-base">
          Unlock the art and science of event management. This isn&apos;t just about organizing events or following schedules
          — it&apos;s about mastering the tools, understanding the nuances, and shaping experiences with intention.
        </p>

        <ul
          className={`cards-container list-none p-0 m-0 w-full transition-all duration-600 ${
            isVerticalLayout 
              ? "grid grid-cols-1 gap-2 md:max-w-[640px]" 
              : "grid gap-2 h-[clamp(250px,40vh,474px)] md:max-w-[820px]"
          }`}
          style={
            {
              gridTemplateColumns: getGridTemplateColumns(),
              gridTemplateRows: getGridTemplateRows(),
              "--gap": "8px",
              "--base": isVerticalLayout ? "60px" : "clamp(2rem, 8cqi, 80px)",
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
                } border border-zinc-800 bg-black ${isActive ? "active" : ""}`}
                data-active={isActive.toString()}
                onClick={() => handleCardInteraction(card.id)}
                onMouseEnter={() => !isMobileView ? handleCardInteraction(card.id) : null}
              >
                {/* Image with overlay for better text readability */}
                <div className="absolute inset-0 w-full h-full z-0 hidden sm:block">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt=""
                    fill
                    className={`object-cover pointer-events-none transition-all duration-[calc(var(--speed)*1.2)] ease-[var(--easing)]
                     ${isActive ? "filter-none scale-100 blur-sm" : "filter grayscale(70%) brightness-50 scale-105 blur-sm"}
                    `}
                    style={{
                      maskImage: isActive 
                        ? "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 100%)" 
                        : "radial-gradient(100% 100% at 100% 0, rgba(255,255,255,0.5), rgba(0,0,0,0))",
                    }}
                  />
                  {/* Dark overlay for better contrast */}
                  <div 
                    className={`absolute inset-0 bg-black transition-opacity duration-[calc(var(--speed)*1.2)] ease-[var(--easing)]
                      ${isActive ? "opacity-40" : "opacity-60"}
                    `}
                  ></div>
                </div>
                
                {/* Animated background gradient that rises from bottom - MODIFIED to cover only up to description on larger screens */}
                <div 
                  className={`
                    absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent
                    transition-all duration-700 ease-in-out z-5
                    ${isVerticalLayout 
                      ? (isActive ? 'h-full' : 'h-0') 
                      : (isActive ? 'h-1/3' : 'h-0')}
                  `}
                ></div>
                
                <article className={`w-full h-full absolute top-0 left-0 flex flex-col ${isActive && isVerticalLayout ? "justify-start pt-14" : "justify-end"} gap-2 sm:gap-4 p-3 sm:p-4 overflow-hidden font-mono z-10`}>
                  <h3 className={`
                    text-base font-light uppercase text-white transition-all duration-[calc(var(--speed)*1.2)] ease-[var(--easing)]
                    ${isVerticalLayout 
                      ? (isActive ? "opacity-100 top-2 left-4" : "opacity-60 top-[50%] left-4 -translate-y-1/2") 
                      : (isActive ? "opacity-100 top-4 left-4 rotate-0" : "opacity-60 top-4 left-[calc(var(--base)*0.5)] origin-[0_50%] rotate-90")}
                    ${isActive ? "text-lg font-medium" : "text-base font-light"}
                    absolute
                  `}>
                    {card.title}
                  </h3>

                  {/* Content backdrop for better text visibility - MODIFIED for better text readability */}
                  <div className={`
                    absolute bottom-0 left-0 right-0 bg-black bg-opacity-70
                    transition-all duration-500 ease-in-out
                    ${isVerticalLayout 
                      ? (isActive ? 'h-3/4 opacity-70' : 'h-0 opacity-0')
                      : (isActive ? 'h-1/3 opacity-70' : 'h-0 opacity-0')}
                    transform ${isActive ? 'translate-y-0' : 'translate-y-full'}
                  `}></div>

                  <div className={`
                    flex flex-col gap-2 
                    ${isActive ? "opacity-100" : "opacity-0"} 
                    transition-opacity duration-[calc(var(--speed)*1.2)] ease-[var(--easing)] 
                    delay-[calc(var(--speed)*0.25)]
                    ${isVerticalLayout && isActive ? "mt-2" : ""}
                    relative z-20
                  `}>
                    <p className="text-xs sm:text-sm text-balance leading-tight text-white">
                      {card.description}
                    </p>
                    
                    {/* MODIFIED to only show features on vertical/mobile layout */}
                    {isActive && isVerticalLayout && (
                      <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                        {card.features.slice(0, isMobileView ? 3 : 5).map((feature, index) => (
                          <li key={index} className="text-zinc-200">{feature}</li>
                        ))}
                      </ul>
                    )}
                    
                    {/* MODIFIED to only show subtext on vertical/mobile layout */}
                    {card.subtext && isActive && isVerticalLayout && (
                      <p className="text-xs text-zinc-300 mt-1">
                        {card.subtext}
                      </p>
                    )}
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
        
        .cards-container {
          min-height: 60vh;
          max-height: 90vh;
        }
        
        @media (max-width: 768px) {
          .cards-container {
            min-height: auto;
            max-height: none;
            height: auto;
          }
          
          .card-item[data-active="true"] {
            min-height: 300px;
            max-height: 500px;
            height: auto;
            transition: min-height 0.6s ease;
          }
          
          .card-item {
            background-color: #111;
          }
        }
        
        @media (max-width: 640px) {
          .card-item[data-active="true"] {
            min-height: 250px;
          }
        }
        
        /* Animation for the rising background - MODIFIED to adjust height based on screen size */
        .card-item[data-active="true"] .bg-gradient-to-t {
          animation: rise-up 0.7s ease-out forwards;
        }
        
        @keyframes rise-up {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            height: 100%;
            opacity: 0.9;
          }
        }
        
        @media (min-width: 768px) {
          .card-item[data-active="true"] .bg-gradient-to-t {
            animation: rise-up-desktop 0.7s ease-out forwards;
          }
          
          @keyframes rise-up-desktop {
            from {
              height: 0;
              opacity: 0;
            }
            to {
              height: 33%;
              opacity: 0.9;
            }
          }
        }
      `}</style>
    </section>
  )
}