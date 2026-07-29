"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronDown, Plus } from "lucide-react"
import content from "@/lib/content"
import { cn } from "@/lib/utils"

// Define card type for better type safety
interface Card {
  id: number
  title: string
  description: string
  stat: string
  statLabel: string
}

const copy = content.ExpandingCards
const cardData = copy.cards

const cards: Card[] = [
  { id: 1, ...cardData.allInOne },
  { id: 2, ...cardData.builtForAfrica },
  { id: 3, ...cardData.zeroFees },
  { id: 4, ...cardData.realTimeInsights },
  { id: 5, ...cardData.instantPayouts },
]

/** Clean B/W gradient for the open card — no grain, no half-tone. */
function ActiveCardFace() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-background dark:bg-card" />
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.07] via-transparent to-foreground/[0.04] dark:from-white/[0.08] dark:to-white/[0.03]" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/[0.06] via-transparent to-transparent dark:from-white/[0.07]" />
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 0% 0%, color-mix(in oklch, var(--foreground) 10%, transparent), transparent 55%), radial-gradient(ellipse 80% 60% at 100% 100%, color-mix(in oklch, var(--foreground) 8%, transparent), transparent 50%)",
        }}
      />
    </div>
  )
}

/** Slim collapsed spine — simple B/W wash. */
function CollapsedCardFace() {
  return (
    <div className="absolute inset-0 z-0 p-[3px]" aria-hidden>
      <div className="relative h-full w-full overflow-hidden border border-foreground/25 bg-muted/40 dark:border-white/20 dark:bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.06] via-transparent to-foreground/[0.1] dark:from-white/[0.07] dark:to-white/[0.1]" />
        <div className="absolute inset-y-2 left-1/2 z-[2] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/30 to-transparent dark:via-white/25" />
      </div>
    </div>
  )
}

export default function ExpandingCards() {
  const [activeCard, setActiveCard] = useState(1)
  const [isVerticalLayout, setIsVerticalLayout] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  const getGridTemplateColumns = () => {
    if (!isVerticalLayout) {
      return cards.map((card) => (card.id === activeCard ? "10fr" : "1fr")).join(" ")
    }
    return "1fr"
  }

  const getGridTemplateRows = () => {
    if (isVerticalLayout) {
      return cards.map((card) => (card.id === activeCard ? "auto" : "60px")).join(" ")
    }
    return "1fr"
  }

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsVerticalLayout(width < 1024)
      setIsMobileView(width < 640)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

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
          <p className="mx-auto mt-4 max-w-[42rem] px-2 text-sm text-foreground/65 lg:hidden">
            {copy.mobileTapHint}
          </p>
        </div>

        <div
          aria-hidden
          className="pointer-events-none relative mb-5 h-px w-full max-w-[820px] bg-border md:mb-6"
        />

        <div className="w-full border border-foreground/15 bg-card/60 p-2 shadow-[4px_4px_0_0] shadow-foreground/10 dark:border-white/15 dark:bg-card/90 dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.06)] sm:p-3 md:max-w-[836px]">
          <ul
            className={`cards-container m-0 w-full list-none p-0 transition-all duration-600 ${
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
                    "card-item relative isolate overflow-hidden bg-background transition-[border-color,box-shadow,opacity]",
                    isVerticalLayout ? "min-h-[var(--base)]" : "min-w-[var(--base)]",
                    isActive
                      ? "z-10 border-2 border-foreground shadow-[5px_5px_0_0] shadow-foreground/15 dark:border-white/40 dark:shadow-[5px_5px_0_0_rgba(255,255,255,0.12)]"
                      : "border border-foreground/30 dark:border-white/22",
                  )}
                  data-active={isActive.toString()}
                  onMouseEnter={() => (!isMobileView ? handleCardInteraction(card.id) : null)}
                >
                  <button
                    type="button"
                    className="absolute inset-0 z-30 cursor-pointer"
                    aria-expanded={isActive}
                    aria-controls={`expanding-card-${card.id}`}
                    aria-label={card.title}
                    onClick={() => handleCardInteraction(card.id)}
                  />

                  {!isActive && <CollapsedCardFace />}

                  {!isActive && isVerticalLayout && (
                    <div className="relative z-20 flex h-full min-h-[var(--base)] items-center justify-between gap-3 px-3 py-2 sm:px-4 pointer-events-none">
                      <span className="font-heading truncate text-left text-sm font-semibold uppercase tracking-wide text-foreground sm:text-base">
                        {card.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-1 text-foreground/70">
                        <span className="sr-only">Expand</span>
                        <Plus className="h-4 w-4 sm:hidden" aria-hidden />
                        <ChevronDown className="hidden h-4 w-4 sm:block" aria-hidden />
                      </span>
                    </div>
                  )}

                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden
                  >
                    <ActiveCardFace />
                  </div>

                  <div
                    id={`expanding-card-${card.id}`}
                    role="region"
                    aria-label={`${card.title} details`}
                    hidden={!isActive}
                    className={cn(
                      "pointer-events-none absolute left-0 top-0 z-10 flex h-full w-full flex-col overflow-hidden p-4 font-body sm:p-5",
                      isVerticalLayout ? "justify-start gap-2 pt-14 sm:gap-3" : "justify-end gap-2 sm:gap-3",
                    )}
                  >
                    <p
                      aria-hidden
                      className="relative z-20 font-heading text-base font-semibold uppercase tracking-wide text-foreground sm:text-lg"
                    >
                      {card.title}
                    </p>

                    <div
                      className={cn(
                        "relative z-20 flex flex-col gap-2",
                        isVerticalLayout && "mt-2",
                      )}
                    >
                      <p className="text-balance text-sm leading-relaxed text-foreground/85 sm:text-[0.9375rem]">
                        {card.description}
                      </p>

                      <div className="mt-2 flex items-baseline gap-2 border-t border-foreground/10 pt-3 dark:border-white/15">
                        <span className="font-numbers text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
                          {card.stat}
                        </span>
                        <span className="text-xs text-foreground/75 sm:text-sm">
                          {card.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>
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
      `}</style>
    </section>
  )
}
