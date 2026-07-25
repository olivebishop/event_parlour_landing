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
    base: "bg-gradient-to-b from-zinc-400/90 via-zinc-200/70 to-zinc-300/85 dark:from-zinc-600 dark:via-zinc-800/90 dark:to-zinc-700",
    accent:
      "bg-gradient-to-br from-foreground/14 via-transparent to-foreground/8 dark:from-white/16 dark:to-white/6",
    glow: "bg-[radial-gradient(ellipse_80%_120%_at_30%_0%,color-mix(in_oklch,var(--foreground)_22%,transparent),transparent_60%)] dark:bg-[radial-gradient(ellipse_80%_120%_at_30%_0%,color-mix(in_oklch,white_18%,transparent),transparent_60%)]",
  },
  2: {
    base: "bg-gradient-to-b from-zinc-300/85 via-zinc-100/60 to-zinc-300/80 dark:from-zinc-700 dark:via-zinc-900/80 dark:to-zinc-800",
    accent:
      "bg-gradient-to-tl from-foreground/12 via-transparent to-foreground/10 dark:from-white/14 dark:to-white/8",
    glow: "bg-[radial-gradient(ellipse_90%_100%_at_80%_100%,color-mix(in_oklch,var(--foreground)_20%,transparent),transparent_55%)]",
  },
  3: {
    base: "bg-gradient-to-b from-zinc-400/80 via-zinc-200/70 to-zinc-300/75 dark:from-zinc-700 dark:via-zinc-900/85 dark:to-zinc-800",
    accent:
      "bg-gradient-to-r from-transparent via-foreground/10 to-transparent dark:via-white/12",
    glow: "bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklch,var(--foreground)_18%,transparent),transparent_58%)]",
  },
  4: {
    base: "bg-gradient-to-b from-zinc-300/80 via-zinc-100/55 to-zinc-300/80 dark:from-zinc-700/95 dark:via-zinc-900/70 dark:to-zinc-800/90",
    accent:
      "bg-gradient-to-bl from-foreground/11 via-transparent to-foreground/9 dark:from-white/14 dark:to-white/7",
    glow: "bg-[radial-gradient(ellipse_70%_110%_at_10%_95%,color-mix(in_oklch,var(--foreground)_19%,transparent),transparent_50%)]",
  },
  5: {
    base: "bg-gradient-to-b from-zinc-300/85 via-zinc-200/65 to-zinc-400/75 dark:from-zinc-800/95 dark:via-zinc-950/75 dark:to-zinc-700/85",
    accent:
      "bg-gradient-to-tr from-foreground/10 via-transparent to-foreground/12 dark:from-white/12 dark:to-white/11",
    glow: "bg-[radial-gradient(ellipse_85%_90%_at_75%_15%,color-mix(in_oklch,var(--foreground)_20%,transparent),transparent_52%)]",
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
    wash: "bg-gradient-to-br from-muted/90 via-card to-background dark:from-zinc-900 dark:via-card dark:to-background",
    depth: "bg-gradient-to-t from-foreground/[0.08] via-transparent to-transparent dark:from-white/[0.1]",
    highlight:
      "bg-[radial-gradient(ellipse_90%_80%_at_15%_10%,color-mix(in_oklch,var(--foreground)_14%,transparent),transparent_58%)] dark:bg-[radial-gradient(ellipse_90%_80%_at_15%_10%,color-mix(in_oklch,white_14%,transparent),transparent_58%)]",
  },
  2: {
    wash: "bg-gradient-to-bl from-muted/85 via-card to-background dark:from-zinc-900/95 dark:via-card dark:to-background",
    depth: "bg-gradient-to-r from-foreground/[0.07] via-transparent to-foreground/[0.05] dark:from-white/[0.08] dark:to-white/[0.06]",
    highlight:
      "bg-[radial-gradient(ellipse_85%_75%_at_90%_85%,color-mix(in_oklch,var(--foreground)_12%,transparent),transparent_55%)] dark:bg-[radial-gradient(ellipse_85%_75%_at_90%_85%,color-mix(in_oklch,white_12%,transparent),transparent_55%)]",
  },
  3: {
    wash: "bg-gradient-to-b from-card via-muted/80 to-background dark:from-card dark:via-zinc-900/80 dark:to-background",
    depth: "bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent dark:via-white/[0.07]",
    highlight:
      "bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklch,var(--foreground)_10%,transparent),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklch,white_11%,transparent),transparent_60%)]",
  },
  4: {
    wash: "bg-gradient-to-tr from-muted/80 via-card to-background dark:from-zinc-900/90 dark:via-card dark:to-background",
    depth: "bg-gradient-to-bl from-foreground/[0.06] to-transparent dark:from-white/[0.08]",
    highlight:
      "bg-[radial-gradient(ellipse_80%_90%_at_10%_90%,color-mix(in_oklch,var(--foreground)_11%,transparent),transparent_52%)] dark:bg-[radial-gradient(ellipse_80%_90%_at_10%_90%,color-mix(in_oklch,white_11%,transparent),transparent_52%)]",
  },
  5: {
    wash: "bg-gradient-to-tl from-muted/88 via-card to-background dark:from-zinc-900 dark:via-card dark:to-background",
    depth: "bg-gradient-to-t from-transparent via-foreground/[0.05] to-foreground/[0.08] dark:via-white/[0.06] dark:to-white/[0.09]",
    highlight:
      "bg-[radial-gradient(ellipse_75%_85%_at_75%_15%,color-mix(in_oklch,var(--foreground)_12%,transparent),transparent_50%)] dark:bg-[radial-gradient(ellipse_75%_85%_at_75%_15%,color-mix(in_oklch,white_13%,transparent),transparent_50%)]",
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
      <div className="relative h-full w-full overflow-hidden border border-foreground/30 bg-card shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--foreground)_8%,transparent)] dark:border-white/25 dark:bg-card dark:shadow-[inset_0_1px_0_0_color-mix(in_oklch,white_10%,transparent)]">
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
      setIsVerticalLayout(width < 1024) // Vertical until lg — horizontal spines are too tight at md
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
    <section className="relative bg-background py-10 xs:py-12 sm:py-16 md:py-20">
      <div className="container mx-auto flex flex-col items-center px-3 xs:px-4 sm:px-6">
        <div className="mb-8 max-w-3xl text-center xs:mb-10 sm:mb-12">
          <p className="mb-2 font-body text-[10px] font-medium uppercase tracking-widest text-foreground/70 xs:mb-3 xs:text-xs sm:mb-4">
            {copy.sectionLabel}
          </p>
          <h2 className="font-heading mb-3 px-1 text-balance text-2xl font-bold tracking-tight text-foreground xs:text-3xl sm:mb-4 sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {copy.title}
          </h2>
          <p className="mx-auto max-w-[42rem] text-balance px-2 text-[0.9375rem] leading-relaxed text-foreground/80 sm:text-base md:text-lg">
            {copy.subtitle}
          </p>
        </div>

        <div
          aria-hidden
          className="pointer-events-none relative mb-5 h-px w-full max-w-[820px] bg-border md:mb-6"
        />

        <div className="w-full border border-foreground/15 bg-card/60 p-2 shadow-[4px_4px_0_0] shadow-foreground/10 dark:border-white/15 dark:bg-card/90 dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.06)] sm:p-3 md:max-w-[836px]">
        <ul
          className={`cards-container list-none p-0 m-0 w-full transition-all duration-600 ${
            isVerticalLayout 
              ? "grid grid-cols-1 gap-3 md:max-w-[640px]" 
              : "grid h-[clamp(260px,42vh,480px)] gap-2 sm:gap-3 md:max-w-[820px]"
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
                    ? "z-10 border-2 border-foreground shadow-[5px_5px_0_0] shadow-foreground/15 dark:border-white/35 dark:shadow-[5px_5px_0_0_rgba(255,255,255,0.1)]"
                    : "border border-foreground/30 dark:border-white/22",
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background from-[28%] via-background/95 to-transparent dark:from-card dark:via-card/95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/[0.04] via-transparent to-transparent dark:from-black/30" />
                </div>

                {isActive && (
                <article className={`absolute left-0 top-0 z-10 flex h-full w-full flex-col overflow-hidden p-4 font-body sm:p-5 ${isVerticalLayout ? "justify-start pt-14" : "justify-end"} gap-2 sm:gap-3`}>
                  <h3 className="relative z-20 font-heading text-base font-semibold uppercase tracking-wide text-foreground drop-shadow-sm sm:text-lg">
                    {card.title}
                  </h3>

                  <div className={`relative z-20 flex flex-col gap-2 opacity-100 ${isVerticalLayout ? "mt-2" : ""}`}>
                    <p className="text-balance text-sm leading-relaxed text-foreground/85 sm:text-[0.9375rem]">
                      {card.description}
                    </p>

                    <div className="mt-2 flex items-baseline gap-2 border-t border-foreground/10 pt-3 dark:border-white/15">
                      <span className="font-numbers text-2xl font-bold tabular-nums text-foreground sm:text-3xl">{card.stat}</span>
                      <span className="text-xs text-foreground/75 sm:text-sm">{card.statLabel}</span>
                    </div>
                  </div>
                </article>
                )}
              </li>
            )
          })}
        </ul>
        </div>
      </div>

      <style jsx global>{`
        .cards-container {
          min-height: 52vh;
          max-height: 88vh;
          background: transparent;
        }

        .card-item[data-active="false"] {
          background: transparent;
        }
        
        @media (max-width: 1023px) {
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
        
        @media (min-width: 1024px) {
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