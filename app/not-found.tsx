import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-x-clip bg-background px-5 py-16 sm:px-8">
      <div
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-start gap-8 sm:gap-10">
        <p className="font-numbers text-[clamp(6rem,28vw,12rem)] font-medium leading-none tracking-[-0.04em] text-foreground">
          404
        </p>
        <p className="max-w-md font-body text-pretty text-lg leading-relaxed text-foreground/70 sm:text-xl">
          Not every event is worth attending. This page is one of them.
        </p>
        <Button asChild size="cta">
          <Link href="/">Back to main page</Link>
        </Button>
      </div>
    </main>
  )
}
