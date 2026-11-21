"use client"

import { useEffect, useState } from "react"

/**
 * The visitor's local time, ticking every second.
 *
 * Returns `null` on the server and during hydration: pages are prerendered at
 * build time, so rendering a time there would never match the visitor's clock
 * (React hydration error #418). Callers render a blank label until it's set.
 */
export function useLocalClock(): Date | null {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return now
}
