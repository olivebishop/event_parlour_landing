import { cn } from "@/lib/utils"

export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-lg bg-muted/40", className)}
    />
  )
}
