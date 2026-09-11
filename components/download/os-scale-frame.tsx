"use client"

import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

export const OS_SCENE_WIDTH = 1200
export const OS_SCENE_HEIGHT = 700

export function OsScaleFrame({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = outerRef.current
    if (!el) return

    const update = () => {
      const width = el.clientWidth
      if (width <= 0) return
      setScale(Math.min(1, width / OS_SCENE_WIDTH))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={outerRef}
      className="relative w-full overflow-hidden"
      style={{ height: OS_SCENE_HEIGHT * scale }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left will-change-transform"
        style={{
          width: OS_SCENE_WIDTH,
          height: OS_SCENE_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
