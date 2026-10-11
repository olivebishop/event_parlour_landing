"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import BackgroundVideo from "next-video/background-video"
import fourOhFour from "../videos/404.webm"
import { Button } from "@/components/ui/button"

function FourOhFourVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const muxReady = fourOhFour.status === "ready"

  // Some browsers drop the `loop` attribute on webm — force infinite playback.
  useEffect(() => {
    if (muxReady) return
    const el = videoRef.current
    if (!el) return

    const restart = () => {
      el.currentTime = 0
      void el.play().catch(() => {})
    }

    el.addEventListener("ended", restart)
    void el.play().catch(() => {})

    return () => el.removeEventListener("ended", restart)
  }, [muxReady])

  if (muxReady) {
    return (
      <BackgroundVideo
        src={fourOhFour}
        autoPlay
        muted
        loop
        playsInline
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 h-full w-full motion-reduce:hidden"
        style={{ position: "absolute", inset: 0 }}
      />
    )
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      tabIndex={-1}
      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
    >
      <source src="/404.webm" type="video/webm" />
    </video>
  )
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-x-clip bg-background px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16">
      <div
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="relative mx-auto flex w-full max-w-[min(100%,72rem)] flex-col items-start gap-6 sm:gap-8 md:gap-10">
        <div
          aria-hidden
          className="relative isolate w-full max-w-full overflow-hidden"
        >
          <FourOhFourVideo />
          <div className="relative z-10 flex w-full select-none items-center justify-start overflow-hidden bg-white px-0.5 py-0.5 text-black mix-blend-screen dark:bg-black dark:text-white dark:mix-blend-multiply xs:px-1 sm:px-2">
            <span
              className="block max-w-full whitespace-nowrap font-numbers text-[clamp(4.5rem,42vw,22rem)] font-medium leading-[0.85] tracking-[-0.05em]"
              style={{ WebkitTextStroke: "clamp(2px, 0.4vw, 6px) currentColor" }}
            >
              404
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 z-20 bg-background mix-blend-darken dark:mix-blend-lighten" />
        </div>
        <p className="max-w-md font-body text-pretty text-base leading-relaxed text-foreground/70 sm:text-lg md:text-xl">
          Not every event is worth attending. This page is one of them.
        </p>
        <Button asChild size="cta" className="w-full max-w-[14.5rem] sm:w-auto">
          <Link href="/">Back to main page</Link>
        </Button>
      </div>
    </main>
  )
}
