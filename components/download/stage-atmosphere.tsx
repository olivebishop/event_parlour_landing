import { brandNoiseLayerStyle } from "@/lib/brand/noise"

/** Same stage wash as the Interactive Demo — borders sit in the atmosphere. */
export function StageAtmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 dark:hidden"
        style={{
          background: [
            "radial-gradient(ellipse 90% 70% at 10% 30%, color-mix(in oklch, var(--foreground) 8%, transparent), transparent 55%)",
            "radial-gradient(ellipse 80% 60% at 90% 70%, color-mix(in oklch, var(--foreground) 6%, transparent), transparent 50%)",
            "linear-gradient(160deg, oklch(0.97 0 0) 0%, oklch(0.93 0 0) 100%)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden dark:block"
        style={{
          background: [
            "radial-gradient(ellipse 85% 75% at 12% 42%, oklch(0.22 0 0) 0%, transparent 58%)",
            "radial-gradient(ellipse 95% 85% at 88% 48%, oklch(0.34 0 0) 0%, transparent 62%)",
            "linear-gradient(108deg, oklch(0.09 0 0) 0%, oklch(0.16 0 0) 42%, oklch(0.27 0 0) 100%)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 mix-blend-multiply dark:opacity-[0.62] dark:mix-blend-overlay"
        style={{
          backgroundImage: brandNoiseLayerStyle.backgroundImage,
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 dark:opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 40%, color-mix(in oklch, var(--background) 70%, transparent) 100%)",
        }}
      />
    </>
  )
}
