import type React from "react"
import { BrandGrainOverlay } from "@/components/grain-overlay"
import { cn } from "@/lib/utils"

export function MarketingPageShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <main
      className={cn(
        "relative overflow-hidden bg-background",
        className,
      )}
    >
      <BrandGrainOverlay intensity="subtle" />
      <div className="relative z-10">{children}</div>
    </main>
  )
}
