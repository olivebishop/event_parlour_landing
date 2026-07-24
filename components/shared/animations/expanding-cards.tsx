"use client"

import type React from "react"

import { useState, useEffect } from "react"

// Define card type for better type safety
interface Card {
  id: number
  title: string
  description: string
  stat: string
  statLabel: string
}

import content from "@/lib/content"

const copy = content.ExpandingCards
const cardData = copy.cards

const cards: Card[] = [
  { id: 1, ...cardData.allInOne },
  { id: 2, ...cardData.builtForAfrica },
  { id: 3, ...cardData.zeroFees },
  { id: 4, ...cardData.realTimeInsights },
  { id: 5, ...cardData.instantPayouts },
]

export default function ExpandingCards() {
  const [activeCard, setActiveCard] = useState(1)
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
    <section className="py-6 xs:py-8 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 flex flex-col items-center">
        <p className="text-[10px] xs:text-xs font-body font-medium tracking-widest uppercase text-muted-foreground mb-2 xs:mb-3 sm:mb-4">
          {copy.sectionLabel}
        </p>
        <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-2 xs:mb-3 sm:mb-4 px-1 text-balance">
          {copy.title}
        </h1>
        <p className="max-w-[60ch] text-balance text-center mb-6 xs:mb-8 sm:mb-12 md:mb-16 text-muted-foreground text-xs xs:text-sm sm:text-base px-2">
          {copy.subtitle}
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
                } border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 ${isActive ? "active" : ""}`}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/50 via-zinc-100/30 to-transparent dark:from-zinc-800/50 dark:via-zinc-900/30" />
                  {/* Subtle grid pattern overlay - black for light mode, white for dark mode */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgb(0,0,0) 1px, transparent 1px), linear-gradient(to bottom, rgb(0,0,0) 1px, transparent 1px)`,
                      backgroundSize: '40px 40px'
                    }}
                  />
                  <div 
                    className="absolute inset-0 opacity-0 dark:opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgb(255,255,255) 1px, transparent 1px), linear-gradient(to bottom, rgb(255,255,255) 1px, transparent 1px)`,
                      backgroundSize: '40px 40px'
                    }}
                  />
                  {/* Accent glow based on card position */}
                  <div className={`
                    absolute w-32 h-32 rounded-full blur-3xl transition-all duration-700
                    ${card.id === 1 ? "bg-black/10 dark:bg-white/10 -top-10 -left-10" : ""}
                    ${card.id === 2 ? "bg-black/10 dark:bg-white/10 -bottom-10 -right-10" : ""}
                    ${card.id === 3 ? "bg-black/10 dark:bg-white/10 top-1/2 -translate-y-1/2 -left-10" : ""}
                    ${card.id === 4 ? "bg-black/10 dark:bg-white/10 -top-10 right-10" : ""}
                    ${card.id === 5 ? "bg-black/10 dark:bg-white/10 -bottom-10 left-1/2 -translate-x-1/2" : ""}
                  `} />
                </div>
                
                {/* Bottom fade gradient for text readability */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-2/3 
                  bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80
                  transition-opacity duration-500
                  ${isActive ? "opacity-100" : "opacity-0"}
                `} />

                <article className={`w-full h-full absolute top-0 left-0 flex flex-col ${isActive && isVerticalLayout ? "justify-start pt-14" : "justify-end"} gap-2 sm:gap-4 p-3 sm:p-4 overflow-hidden font-body z-10`}>
                  <h3 className={`
                    text-base font-light uppercase text-foreground transition-all duration-[calc(var(--speed)*1.2)] ease-[var(--easing)]
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
                    <p className="text-xs sm:text-sm text-balance leading-tight text-muted-foreground">
                      {card.description}
                    </p>
                    
                    {/* Stat highlight */}
                    {isActive && (
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-bold text-foreground font-numbers tabular-nums">{card.stat}</span>
                        <span className="text-xs text-muted-foreground">{card.statLabel}</span>
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