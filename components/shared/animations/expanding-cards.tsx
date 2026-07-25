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
import { cn } from "@/lib/utils"
import { BrandGrainOverlay } from "@/components/grain-overlay"
import { brandNoiseLayerStyle } from "@/lib/brand/noise"

const copy = content.ExpandingCards
const cardData = copy.cards

const cards: Card[] = [
  { id: 1, ...cardData.allInOne },
  { id: 2, ...cardData.builtForAfrica },
  { id: 3, ...cardData.zeroFees },
  { id: 4, ...cardData.realTimeInsights },
  { id: 5, ...cardData.instantPayouts },
]

const collapsedSpineGradients: Record<
  number,
  { base: string; accent: string; glow: string }
> = {
  1: {
    base: "bg-gradient-to-b from-zinc-300/95 via-zinc-100/55 to-zinc-200 dark:from-zinc-600 dark:via-zinc-900/70 dark:to-zinc-800",
    accent:
      "bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5 dark:from-white/12 dark:to-white/5",
    glow: "bg-[radial-gradient(ellipse_80%_120%_at_30%_0%,color-mix(in_oklch,var(--foreground)_18%,transparent),transparent_60%)]",
  },
  2: {
    base: "bg-gradient-to-b from-zinc-200/90 via-zinc-50/50 to-zinc-300/70 dark:from-zinc-700 dark:via-zinc-950/65 dark:to-zinc-800/90",
    accent:
      "bg-gradient-to-tl from-foreground/8 via-transparent to-foreground/12 dark:from-white/10 dark:to-white/8",
    glow: "bg-[radial-gradient(ellipse_90%_100%_at_80%_100%,color-mix(in_oklch,var(--foreground)_16%,transparent),transparent_55%)]",
  },
  3: {
    base: "bg-gradient-to-b from-zinc-300/85 via-zinc-100/65 to-zinc-200/80 dark:from-zinc-700 dark:via-zinc-900/75 dark:to-zinc-800",
    accent:
      "bg-gradient-to-r from-transparent via-foreground/6 to-transparent dark:via-white/8",
    glow: "bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklch,var(--foreground)_14%,transparent),transparent_58%)]",
  },
  4: {
    base: "bg-gradient-to-b from-zinc-300/75 via-zinc-100/50 to-zinc-200/85 dark:from-zinc-700/90 dark:via-zinc-900/60 dark:to-zinc-800/85",
    accent:
      "bg-gradient-to-bl from-foreground/9 via-transparent to-foreground/7 dark:from-white/11 dark:to-white/6",
    glow: "bg-[radial-gradient(ellipse_70%_110%_at_10%_95%,color-mix(in_oklch,var(--foreground)_15%,transparent),transparent_50%)]",
  },
  5: {
    base: "bg-gradient-to-b from-zinc-200/90 via-zinc-100/60 to-zinc-300/70 dark:from-zinc-800/90 dark:via-zinc-950/70 dark:to-zinc-700/80",
    accent:
      "bg-gradient-to-tr from-foreground/7 via-transparent to-foreground/10 dark:from-white/9 dark:to-white/10",
    glow: "bg-[radial-gradient(ellipse_85%_90%_at_75%_15%,color-mix(in_oklch,var(--foreground)_17%,transparent),transparent_52%)]",
  },
}

/** Film grain (under dither) */
function CardSurfaceNoise() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply dark:opacity-[0.26] dark:mix-blend-soft-light"
      style={{
        backgroundImage: brandNoiseLayerStyle.backgroundImage,
        backgroundRepeat: brandNoiseLayerStyle.backgroundRepeat,
        backgroundSize: brandNoiseLayerStyle.backgroundSize,
      }}
    />
  )
}

/** Halftone + ordered dither — sits above grain */
function CardDitherOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 mix-blend-multiply dark:mix-blend-overlay",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.09] dark:opacity-[0.11]"
        style={{
          backgroundImage: `radial-gradient(circle at center, color-mix(in oklch, var(--foreground) 28%, transparent) 0.5px, transparent 0.5px)`,
          backgroundSize: "4px 4px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.085]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, color-mix(in oklch, var(--foreground) 20%, transparent) 0.45px, transparent 0.45px),
            radial-gradient(circle at center, transparent 0.45px, transparent 0.45px)
          `,
          backgroundSize: "4px 4px, 4px 4px",
          backgroundPosition: "0 0, 2px 2px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.055] dark:opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            108deg,
            transparent 0,
            transparent 2px,
            color-mix(in oklch, var(--foreground) 12%, transparent) 2px,
            color-mix(in oklch, var(--foreground) 12%, transparent) 3px
          )`,
        }}
      />
    </div>
  )
}

/** Noise + grain + dither stack for card surfaces */
function CardSurfaceTexture() {
  return (
    <>
      <CardSurfaceNoise />
      <BrandGrainOverlay
        fixed={false}
        intensity="subtle"
        className="z-[1] mix-blend-multiply dark:mix-blend-soft-light"
      />
      <CardDitherOverlay className="z-[2]" />
    </>
  )
}

const activePanelGradients: Record<
  number,
  { wash: string; depth: string; highlight: string }
> = {
  1: {
    wash: "bg-gradient-to-br from-black/[0.09] via-white/50 to-white dark:from-white/[0.12] dark:via-black/55 dark:to-black",
    depth: "bg-gradient-to-t from-black/[0.07] via-transparent to-transparent dark:from-white/[0.08]",
    highlight:
      "bg-[radial-gradient(ellipse_90%_80%_at_15%_10%,color-mix(in_oklch,black_10%,transparent),transparent_58%)] dark:bg-[radial-gradient(ellipse_90%_80%_at_15%_10%,color-mix(in_oklch,white_12%,transparent),transparent_58%)]",
  },
  2: {
    wash: "bg-gradient-to-bl from-black/[0.08] via-white/45 to-white dark:from-white/[0.1] dark:via-black/50 dark:to-black",
    depth: "bg-gradient-to-r from-black/[0.06] via-transparent to-black/[0.04] dark:from-white/[0.07] dark:to-white/[0.05]",
    highlight:
      "bg-[radial-gradient(ellipse_85%_75%_at_90%_85%,color-mix(in_oklch,black_11%,transparent),transparent_55%)] dark:bg-[radial-gradient(ellipse_85%_75%_at_90%_85%,color-mix(in_oklch,white_11%,transparent),transparent_55%)]",
  },
  3: {
    wash: "bg-gradient-to-b from-white via-white/70 to-black/[0.06] dark:from-black dark:via-black/70 dark:to-white/[0.08]",
    depth: "bg-gradient-to-r from-transparent via-black/[0.05] to-transparent dark:via-white/[0.06]",
    highlight:
      "bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklch,black_8%,transparent),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklch,white_10%,transparent),transparent_60%)]",
  },
  4: {
    wash: "bg-gradient-to-tr from-black/[0.07] via-white/55 to-white dark:from-white/[0.11] dark:via-black/45 dark:to-black",
    depth: "bg-gradient-to-bl from-black/[0.05] to-transparent dark:from-white/[0.07]",
    highlight:
      "bg-[radial-gradient(ellipse_80%_90%_at_10%_90%,color-mix(in_oklch,black_9%,transparent),transparent_52%)] dark:bg-[radial-gradient(ellipse_80%_90%_at_10%_90%,color-mix(in_oklch,white_10%,transparent),transparent_52%)]",
  },
  5: {
    wash: "bg-gradient-to-tl from-black/[0.08] via-white/48 to-white dark:from-white/[0.1] dark:via-black/52 dark:to-black",
    depth: "bg-gradient-to-t from-transparent via-black/[0.04] to-black/[0.06] dark:via-white/[0.05] dark:to-white/[0.07]",
    highlight:
      "bg-[radial-gradient(ellipse_75%_85%_at_75%_15%,color-mix(in_oklch,black_10%,transparent),transparent_50%)] dark:bg-[radial-gradient(ellipse_75%_85%_at_75%_15%,color-mix(in_oklch,white_12%,transparent),transparent_50%)]",
  },
}

function ActiveCardFace({ cardId }: { cardId: number }) {
  const panel = activePanelGradients[cardId] ?? activePanelGradients[1]

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className={`absolute inset-0 ${panel.wash}`} />
      <div className={`absolute inset-0 ${panel.depth}`} />
      <div className={`absolute inset-0 ${panel.highlight}`} />
      <div className="absolute inset-0 bg-[conic-gradient(from_200deg_at_70%_20%,color-mix(in_oklch,black_6%,transparent),transparent_35%,color-mix(in_oklch,black_4%,transparent))] dark:bg-[conic-gradient(from_200deg_at_70%_20%,color-mix(in_oklch,white_8%,transparent),transparent_35%,color-mix(in_oklch,white_5%,transparent))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.05] dark:to-white/[0.06]" />
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_88%)]">
        <CardSurfaceTexture />
      </div>
    </div>
  )
}

function CollapsedCardFace({ cardId }: { cardId: number }) {
  const spine = collapsedSpineGradients[cardId] ?? collapsedSpineGradients[1]

  return (
    <div className="absolute inset-0 z-0 p-[3px]" aria-hidden>
      <div className="relative h-full w-full overflow-hidden border border-foreground/20 bg-background shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--foreground)_6%,transparent)] dark:border-white/15 dark:shadow-[inset_0_0_0_1px_color-mix(in_oklch,white_8%,transparent)]">
        <div className={`absolute inset-0 ${spine.base}`} />
        <div className={`absolute inset-0 ${spine.accent}`} />
        <div className={`absolute inset-0 ${spine.glow}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/8 via-transparent to-background/10 dark:from-black/15 dark:to-white/8" />
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]">
          <CardSurfaceTexture />
        </div>
        <div className="absolute inset-y-2 left-1/2 z-[2] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/25 to-transparent dark:via-white/20" />
      </div>
    </div>
  )
}

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
        <p className="max-w-[60ch] text-balance text-center mb-6 xs:mb-8 sm:mb-10 text-muted-foreground text-xs xs:text-sm sm:text-base px-2">
          {copy.subtitle}
        </p>

        <div
          aria-hidden
          className="pointer-events-none relative mb-4 h-9 w-full overflow-hidden border border-border/50 bg-gradient-to-r from-black/[0.03] via-transparent to-black/[0.03] dark:from-white/[0.05] dark:to-white/[0.05] md:max-w-[820px]"
        >
          <CardDitherOverlay />
        </div>

        <ul
          className={`cards-container list-none p-0 m-0 w-full transition-all duration-600 ${
            isVerticalLayout 
              ? "grid grid-cols-1 gap-3 md:max-w-[640px]" 
              : "grid gap-3 h-[clamp(250px,40vh,474px)] md:max-w-[820px]"
          }`}
          style={
            {
              gridTemplateColumns: getGridTemplateColumns(),
              gridTemplateRows: getGridTemplateRows(),
              "--gap": "12px",
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
                className={cn(
                  "card-item relative isolate overflow-hidden bg-background transition-[border-color,box-shadow]",
                  isVerticalLayout ? "min-h-[var(--base)]" : "min-w-[var(--base)]",
                  isActive
                    ? "z-10 border border-border"
                    : "border border-foreground/20 shadow-[0_0_0_1px_color-mix(in_oklch,var(--background)_100%,transparent)] dark:border-white/18 dark:shadow-[0_0_0_1px_var(--background)]",
                )}
                data-active={isActive.toString()}
                aria-label={card.title}
                onClick={() => handleCardInteraction(card.id)}
                onMouseEnter={() => !isMobileView ? handleCardInteraction(card.id) : null}
              >
                {!isActive && <CollapsedCardFace cardId={card.id} />}

                {/* Background gradient design — active panel only */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <ActiveCardFace cardId={card.id} />
                </div>
                
                {/* Text scrim — solid-enough band so texture never competes with copy */}
                <div
                  className={`card-text-scrim pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[78%] transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background from-[32%] via-background/92 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/25 to-transparent" />
                </div>

                {isActive && (
                <article className={`w-full h-full absolute top-0 left-0 z-10 flex flex-col ${isVerticalLayout ? "justify-start pt-14" : "justify-end"} gap-2 sm:gap-4 p-3 sm:p-4 overflow-hidden font-body`}>
                  <h3 className="text-lg font-medium uppercase text-foreground relative z-20 drop-shadow-[0_1px_0_color-mix(in_oklch,var(--background)_80%,transparent)]">
                    {card.title}
                  </h3>

                  <div className={`flex flex-col gap-2 opacity-100 relative z-20 ${isVerticalLayout ? "mt-2" : ""}`}>
                    <p className="text-xs sm:text-sm text-balance leading-tight text-muted-foreground">
                      {card.description}
                    </p>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-foreground font-numbers tabular-nums">{card.stat}</span>
                      <span className="text-xs text-muted-foreground">{card.statLabel}</span>
                    </div>
                  </div>
                </article>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <style jsx global>{`
        .cards-container {
          min-height: 60vh;
          max-height: 90vh;
          background: var(--background);
        }

        .card-item[data-active="false"] {
          background: var(--background);
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
        
        /* Animation for the rising text scrim */
        .card-item[data-active="true"] .card-text-scrim > div:first-child {
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
          .card-item[data-active="true"] .card-text-scrim > div:first-child {
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