import { cn } from "@/lib/utils"

export function MarketingGridPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklch, var(--border) 80%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklch, var(--border) 80%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
        }}
      />
    </div>
  )
}
