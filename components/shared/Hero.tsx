import { Button } from "@/components/ui/button"
import { HeroWordCycle } from "@/components/shared/HeroWordCycle"
import { appHref } from "@/lib/app-url"
import content from "@/lib/content"

const {
  eyebrow,
  words,
  headline,
  headlineLine2,
  description,
  cta,
} = content.HeroSection

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-x-clip"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,color-mix(in_oklch,var(--foreground)_5%,transparent)_0%,transparent_48%)]"
      />
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex min-h-[min(calc(100svh-3.5rem),42rem)] w-full max-w-6xl flex-col justify-center px-5 pb-10 pt-24 xs:px-6 sm:px-8 sm:pb-12 sm:pt-28 lg:px-10">
        {/* Eyebrow */}
        <div className="animate-hero-in flex items-baseline justify-between gap-6">
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/45 sm:text-xs">
            {eyebrow}{" "}
            <HeroWordCycle words={words} className="text-foreground/80" />
          </p>
          <span
            aria-hidden
            className="hidden shrink-0 font-numbers text-xs tracking-[0.2em] text-foreground/35 sm:block"
          >
            01
          </span>
        </div>

        {/* The one thing that should stop you */}
        <h1
          id="hero-heading"
          className="mt-6 font-heading text-[clamp(2.9rem,10.5vw,7rem)] font-bold leading-[0.86] tracking-[-0.02em] text-foreground sm:mt-8"
        >
          <span className="animate-hero-line block">{headline}</span>
          <span className="animate-hero-line block text-foreground/40 [animation-delay:120ms]">
            {headlineLine2}
          </span>
        </h1>

        {/* Pitch + action */}
        <div className="animate-hero-in mt-10 flex flex-col gap-8 border-t border-foreground/15 pt-6 sm:mt-12 sm:pt-7 md:flex-row md:items-start md:justify-between md:gap-14 [animation-delay:140ms]">
          <p className="max-w-md font-body text-pretty text-[0.975rem] leading-relaxed text-foreground/70 sm:text-base sm:leading-[1.6]">
            {description}
          </p>

          <div className="flex shrink-0 flex-col md:items-end">
            <Button
              asChild
              size="cta"
              className="w-full max-w-none justify-between gap-6 px-5 sm:w-auto sm:min-w-[15.5rem]"
            >
              <a
                href={appHref("/auth/sign-up")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{cta}</span>
                <span aria-hidden className="font-numbers text-base leading-none">
                  →
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
