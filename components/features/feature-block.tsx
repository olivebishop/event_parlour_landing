"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Feature } from "@/lib/data/features"
import {
  FeatureVisual,
  resolveFeatureVisualKey,
} from "@/components/features/feature-visual"
import { BrandGrainOverlay } from "@/components/grain-overlay"

export function FeatureBlock({
  feature,
  isReversed,
  includesText,
  activeText,
  sectionId,
  /**
   * On small/medium only: hide the text column (page intro already covers it).
   * Large screens always keep the original two-column design.
   */
  omitIntroCopy = false,
  /** Designed mocks are for platform pillars only; hub pages pass false for images. */
  useDesignedVisual = false,
}: {
  feature: Feature
  index: number
  isReversed: boolean
  includesText: string
  activeText: string
  sectionId?: string
  omitIntroCopy?: boolean
  useDesignedVisual?: boolean
}) {
  const visualKey = useDesignedVisual
    ? resolveFeatureVisualKey(sectionId)
    : null
  const useDesignedLayout = Boolean(visualKey)

  return (
    <article
      id={sectionId}
      className={cn(
        "group/block scroll-mt-28 border-t border-border/70 py-10 first:border-t-0 first:pt-0 xs:py-14 sm:py-16 md:py-20 lg:py-28",
        omitIntroCopy && "border-t-0 pt-0 xs:pt-0 sm:pt-0 md:pt-0 lg:border-t-0 lg:pt-0",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 items-center gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-20",
          isReversed && "lg:[direction:rtl]",
        )}
      >
        <div
          className={cn(
            "space-y-4 xs:space-y-5 sm:space-y-6 lg:[direction:ltr]",
            omitIntroCopy && "hidden lg:block",
          )}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center border border-border bg-background xs:h-7 xs:w-7 sm:h-8 sm:w-8">
              <div className="text-xs text-foreground xs:text-sm sm:text-base">
                {feature.icon}
              </div>
            </div>
            <span className="font-body text-[10px] font-medium uppercase tracking-widest text-foreground/70 xs:text-xs">
              {feature.label}
            </span>
          </div>

          <h3 className="text-xl font-bold leading-tight text-foreground xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {feature.title}
          </h3>

          <p className="max-w-xs text-sm leading-relaxed text-foreground/75 xs:max-w-sm xs:text-base sm:text-lg md:max-w-md">
            {feature.description}
          </p>

          <ul className="flex flex-wrap gap-1.5 pt-1 xs:gap-2 xs:pt-2">
            {feature.capabilities.map((capability) => (
              <li key={capability}>
                <span className="inline-block border border-border bg-muted px-2 py-1 text-xs text-foreground/80 transition-colors duration-200 hover:border-foreground/25 hover:text-foreground xs:px-2.5 xs:py-1.5 sm:px-3 sm:text-sm">
                  {capability}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={cn(
            "relative lg:[direction:ltr]",
            !omitIntroCopy && "mt-4 xs:mt-6 lg:mt-0",
            omitIntroCopy && "lg:mt-0",
          )}
        >
          <div className="relative">
            {useDesignedLayout && visualKey ? (
              <div className="relative transition-[border-color] duration-300 ease-out group-hover/block:[&>div>div]:border-foreground/25">
                <FeatureVisual visualKey={visualKey} />
              </div>
            ) : (
              /* Same Stage housing as platform features — grain on the frame around the image */
              <div className="relative w-full overflow-hidden border border-border bg-muted/40 transition-[border-color] duration-300 ease-out group-hover/block:border-foreground/25">
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  aria-hidden
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                    maskImage:
                      "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
                  }}
                />
                <BrandGrainOverlay
                  fixed={false}
                  intensity="subtle"
                  className="z-[1]"
                />
                <div className="relative z-[2] p-2 xs:p-3 sm:p-5 md:p-8">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-muted transition-[border-color,box-shadow] duration-300 ease-out group-hover/block:border-foreground/20 group-hover/block:shadow-[6px_6px_0_0] group-hover/block:shadow-foreground/8">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/block:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-muted via-transparent to-transparent opacity-60" />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-muted to-transparent p-3 xs:p-4 sm:p-5 md:p-6">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2 xs:gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center border border-border bg-background xs:h-7 xs:w-7 sm:h-8 sm:w-8">
                            <div className="h-3 w-3 text-foreground xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4">
                              {feature.icon}
                            </div>
                          </div>
                          <span className="line-clamp-1 text-xs font-medium text-foreground xs:text-sm">
                            {feature.title.split(".")[0]}
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5 bg-background/10 px-2 py-1 backdrop-blur-sm xs:gap-2 xs:px-2.5 xs:py-1.5 sm:px-3">
                          <span
                            className="h-1.5 w-1.5 bg-foreground motion-safe:animate-pulse xs:h-2 xs:w-2"
                            aria-hidden
                          />
                          <span className="text-[10px] text-foreground xs:text-xs">
                            {activeText}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute left-2 top-2 z-10 max-w-[calc(100%-1rem)] border border-border bg-background px-2 py-1 xs:px-2.5 xs:py-1.5 sm:left-3 sm:top-3 sm:max-w-none sm:py-2">
                      <span className="block truncate text-[9px] font-medium tracking-wider text-muted-foreground xs:text-[10px] sm:text-xs">
                        {feature.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute bottom-2 right-2 z-10 hidden max-w-[180px] border border-border bg-background p-3 transition-transform duration-300 ease-out group-hover/block:translate-y-[-2px] lg:block xl:bottom-3 xl:right-3">
              <p className="mb-2 text-[10px] font-medium text-muted-foreground sm:text-xs">
                {includesText}
              </p>
              <ul className="space-y-1.5">
                {feature.capabilities.slice(0, 3).map((cap) => (
                  <li key={cap} className="flex items-center gap-2">
                    <div className="h-1 w-1 shrink-0 bg-foreground xs:h-1.5 xs:w-1.5" />
                    <span className="text-[10px] leading-tight text-foreground sm:text-xs">
                      {cap}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {omitIntroCopy ? (
            <ul className="mt-4 flex flex-wrap gap-1.5 xs:mt-5 xs:gap-2 lg:hidden">
              {feature.capabilities.map((capability) => (
                <li key={capability}>
                  <span className="inline-block border border-border bg-muted px-2 py-1 text-xs text-foreground/80 xs:px-2.5 xs:py-1.5 sm:px-3 sm:text-sm">
                    {capability}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  )
}
