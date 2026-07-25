import type React from "react"
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
        "relative overflow-x-clip bg-background",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </main>
  )
}
