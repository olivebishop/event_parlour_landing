"use client"

import { useEffect, useState } from "react"

export function HeroWordCycle({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion || words.length < 2) return

    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2500)

    return () => window.clearInterval(interval)
  }, [words.length])

  return (
    <span
      className="block font-heading font-bold text-foreground leading-[1.15] tracking-normal text-balance text-[1.3em]"
      aria-live="polite"
    >
      {words[index]}
    </span>
  )
}
