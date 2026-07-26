import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

function IllustrationFrame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative w-full max-w-md border border-border bg-muted/30 p-4 shadow-none sm:p-5",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

export function PlatformPageIllustration() {
  return (
    <IllustrationFrame>
      <div className="grid grid-cols-3 gap-2">
        {["/images/org.svg", "/images/attendee.svg", "/images/speaker.svg"].map(
          (src) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden border border-border bg-background"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="120px" />
            </div>
          ),
        )}
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-2 w-3/4 bg-foreground/15" />
        <div className="h-2 w-full bg-foreground/10" />
        <div className="h-16 border border-border bg-background/80" />
      </div>
    </IllustrationFrame>
  )
}

export function FeaturesPageIllustration() {
  return (
    <IllustrationFrame>
      <div className="flex items-center gap-3 border border-border bg-background p-3">
        <div className="relative size-12 shrink-0 overflow-hidden border border-border">
          <Image
            src="/images/analytics.svg"
            alt=""
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-2 w-2/3 bg-foreground/20" />
          <div className="h-2 w-full bg-foreground/10" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {["/images/tickets.svg", "/images/revenue.svg"].map((src) => (
          <div
            key={src}
            className="relative aspect-[4/3] overflow-hidden border border-border bg-background"
          >
            <Image src={src} alt="" fill className="object-cover p-2" sizes="160px" />
          </div>
        ))}
      </div>
    </IllustrationFrame>
  )
}

export function WhyUsPageIllustration() {
  return (
    <IllustrationFrame>
      <p className="font-heading text-lg leading-snug text-foreground sm:text-xl">
        &ldquo;Clean UI, BETTER UX&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="relative size-10 overflow-hidden rounded-full border border-border">
          <Image
            src="/people-say/denis.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-24 bg-foreground/20" />
          <div className="h-2 w-16 bg-foreground/10" />
        </div>
      </div>
    </IllustrationFrame>
  )
}

export function FaqPageIllustration() {
  return (
    <IllustrationFrame>
      <svg
        viewBox="0 0 320 200"
        className="h-auto w-full text-foreground"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="318"
          height="198"
          stroke="currentColor"
          strokeOpacity="0.2"
        />
        {[32, 72, 112, 152].map((y, i) => (
          <g key={y}>
            <circle cx="28" cy={y} r="10" fill="currentColor" fillOpacity={0.12 + i * 0.04} />
            <rect
              x="52"
              y={y - 8}
              width={200 - i * 20}
              height="6"
              fill="currentColor"
              fillOpacity="0.18"
            />
            <rect
              x="52"
              y={y + 6}
              width={240 - i * 15}
              height="4"
              fill="currentColor"
              fillOpacity="0.1"
            />
          </g>
        ))}
      </svg>
    </IllustrationFrame>
  )
}

export function ContactPageIllustration() {
  return (
    <IllustrationFrame>
      <svg
        viewBox="0 0 320 200"
        className="h-auto w-full text-foreground"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="40"
          y="36"
          width="240"
          height="128"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        <path
          d="M40 36 L160 110 L280 36"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        <rect x="64" y="92" width="120" height="6" fill="currentColor" fillOpacity="0.15" />
        <rect x="64" y="108" width="160" height="6" fill="currentColor" fillOpacity="0.1" />
        <rect x="64" y="124" width="96" height="6" fill="currentColor" fillOpacity="0.1" />
      </svg>
      <p className="mt-3 font-numbers text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
        Nairobi · 24/7 support
      </p>
    </IllustrationFrame>
  )
}
