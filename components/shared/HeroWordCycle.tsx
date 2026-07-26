"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function HeroWordCycle({
  words,
  className,
}: {
  words: string[]
  className?: string
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion || words.length < 2) return

    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2400)

    return () => window.clearInterval(interval)
  }, [words.length])

  // Widest word reserves the width so the line never reflows mid-cycle.
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), "")

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span aria-hidden className="invisible">
        {widest}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden
          className="absolute inset-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none"
          style={{
            opacity: i === index ? 1 : 0,
            transform: `translateY(${i === index ? "0" : "0.35em"})`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}
