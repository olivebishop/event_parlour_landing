import type React from "react"
import { PixelLabel } from "@/components/shared/pixel-label"
import { MarketingGridPattern } from "@/components/marketing/marketing-grid-pattern"
import { cn } from "@/lib/utils"

type MarketingPageHeroProps = {
  eyebrow: string
  title: string
  titleAccent?: string
  description: string
  illustration?: React.ReactNode
  className?: string
}

export function MarketingPageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  illustration,
  className,
}: MarketingPageHeroProps) {
  return (
    <header
      className={cn(
        "relative border-b border-border pt-24 sm:pt-28 md:pt-32",
        className,
      )}
    >
      <MarketingGridPattern />
      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="grid gap-10 pb-12 sm:pb-16 md:pb-20 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="max-w-xl space-y-4 sm:space-y-5">
            <PixelLabel tone="soft">
              {eyebrow}
            </PixelLabel>
            <h1 className="font-heading text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-foreground">
              <span className="block">{title}</span>
            {titleAccent ? (
              <span className="mt-1 block text-foreground/70">
                {titleAccent}
              </span>
            ) : null}
          </h1>
          <p className="max-w-md font-body text-[0.9375rem] leading-relaxed text-foreground/75 sm:text-base sm:leading-relaxed">
              {description}
            </p>
          </div>
          {illustration ? (
            <div className="relative flex min-h-[200px] items-end justify-center lg:min-h-[260px] lg:justify-end">
              {illustration}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
