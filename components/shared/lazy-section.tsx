"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

/**
 * Defers mounting (and thus dynamic import evaluation) until near the viewport.
 * Keeps below-fold client bundles off the mobile LCP critical path.
 */
export function LazySection({
  children,
  fallback,
  rootMargin = "280px 0px",
  minHeightClassName,
}: {
  children: ReactNode
  fallback: ReactNode
  rootMargin?: string
  minHeightClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, visible])

  return (
    <div ref={ref} className={minHeightClassName}>
      {visible ? children : fallback}
    </div>
  )
}
