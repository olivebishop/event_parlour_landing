"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTranslations } from "@/lib/i18n/translations"

// Define card type for better type safety
interface Card {
  id: number
  title: string
  description: string
  stat: string
  statLabel: string
}

const defaultCards: Card[] = [
  {
    id: 1,
    title: "All-in-One Platform",
    description:
      "Stop juggling multiple tools. Event Parlour unifies ticketing, analytics, speaker management, and payouts in one seamless workspace.",
    stat: "1",
    statLabel: "Platform for everything",
  },
  {
    id: 2,
    title: "Built for Africa",
    description:
      "Designed with local payment methods, mobile-first experiences, and infrastructure that works across the continent.",
    stat: "KE",
    statLabel: "Made in Nairobi",
  },
  {
    id: 3,
    title: "Zero Hidden Fees",
    description:
      "Transparent pricing with no surprises. Know exactly what you pay and what you earn from every ticket sold.",
    stat: "0%",
    statLabel: "Hidden charges",
  },
  {
    id: 4,
    title: "Real-Time Insights",
    description:
      "Make data-driven decisions with live dashboards showing sales, demographics, and attendance patterns as they happen.",
    stat: "Live",
    statLabel: "Analytics dashboard",
  },
  {
    id: 5,
    title: "Instant Payouts",
    description:
      "Get your money when you need it. Fast, reliable payouts directly to your preferred payment method.",
    stat: "24h",
    statLabel: "Payout processing",
  },
]

export default function ExpandingCards() {
  const [activeCard, setActiveCard] = useState(1)
  // Add responsive state to track vertical or horizontal layout
  const [isVerticalLayout, setIsVerticalLayout] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const t = useTranslations('ExpandingCards')

  // Get translated cards
  const getTranslatedCards = (): Card[] => {
    try {
      const cardsData = t('cards')
      if (cardsData && cardsData !== 'cards') {
        const parsed = JSON.parse(cardsData)
        return [
          { id: 1, ...parsed.allInOne },
          { id: 2, ...parsed.builtForAfrica },
          { id: 3, ...parsed.zeroFees },
          { id: 4, ...parsed.realTimeInsights },
          { id: 5, ...parsed.instantPayouts },
        ]
      }
    } catch {
      // Return default cards if parsing fails
    }
    return defaultCards
  }

  const cards = getTranslatedCards()

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
    <section className="py-6 xs:py-8 sm:py-12 md:py-16 dark">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 flex flex-col items-center">
        <p className="text-[10px] xs:text-xs font-medium tracking-widest text-zinc-500 mb-2 xs:mb-3 sm:mb-4">{t('sectionLabel')}</p>
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 xs:mb-3 sm:mb-4 text-center text-white">{t('title')}</h1>
        <p className="max-w-[60ch] text-balance text-center mb-6 xs:mb-8 sm:mb-12 md:mb-16 text-zinc-400 text-xs xs:text-sm sm:text-base px-2">
          {t('subtitle')}
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
                } border border-zinc-800 bg-zinc-950 ${isActive ? "active" : ""}`}
                data-active={isActive.toString()}
                onClick={() => handleCardInteraction(card.id)}
                onMouseEnter={() => !isMobileView ? handleCardInteraction(card.id) : null}
              >
                {/* Background gradient design */}
                <div className={`
                  absolute inset-0 transition-all duration-700 ease-out
                  ${isActive 
                    ? "opacity-100" 
                    : "opacity-0"}
                `}>
                  {/* Radial gradient from corner */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 via-zinc-900/30 to-transparent" />
                  {/* Subtle grid pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                      backgroundSize: '40px 40px'
                    }}
                  />
                  {/* Accent glow based on card position */}
                  <div className={`
                    absolute w-32 h-32 rounded-full blur-3xl transition-all duration-700
                    ${card.id === 1 ? "bg-white/10 -top-10 -left-10" : ""}
                    ${card.id === 2 ? "bg-white/10 -bottom-10 -right-10" : ""}
                    ${card.id === 3 ? "bg-white/10 top-1/2 -translate-y-1/2 -left-10" : ""}
                    ${card.id === 4 ? "bg-white/10 -top-10 right-10" : ""}
                    ${card.id === 5 ? "bg-white/10 -bottom-10 left-1/2 -translate-x-1/2" : ""}
                  `} />
                </div>
                
                {/* Bottom fade gradient for text readability */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-2/3 
                  bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent
                  transition-opacity duration-500
                  ${isActive ? "opacity-100" : "opacity-0"}
                `} />

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

                  <div className={`
                    flex flex-col gap-2 
                    ${isActive ? "opacity-100" : "opacity-0"} 
                    transition-opacity duration-[calc(var(--speed)*1.2)] ease-[var(--easing)] 
                    delay-[calc(var(--speed)*0.25)]
                    ${isVerticalLayout && isActive ? "mt-2" : ""}
                    relative z-20
                  `}>
                    <p className="text-xs sm:text-sm text-balance leading-tight text-zinc-300">
                      {card.description}
                    </p>
                    
                    {/* Stat highlight */}
                    {isActive && (
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-bold text-white">{card.stat}</span>
                        <span className="text-xs text-zinc-400">{card.statLabel}</span>
                      </div>
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