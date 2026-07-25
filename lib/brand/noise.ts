import type { CSSProperties } from "react";

const BRAND_NOISE_DATA_URI = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

/** Tileable film grain — opacity is tuned per surface in BrandGrainOverlay. */
export const brandNoiseLayerStyle: CSSProperties = {
  opacity: 0.42,
  backgroundImage: BRAND_NOISE_DATA_URI,
  backgroundRepeat: "repeat",
  backgroundSize: "180px 180px",
  mixBlendMode: "multiply",
};

/** Soft vignette / glow for depth on branded surfaces. */
export const brandGlowLayerStyle: CSSProperties = {
  opacity: 0.5,
  background:
    "radial-gradient(ellipse 90% 70% at 50% 100%, color-mix(in oklch, var(--foreground) 10%, transparent), transparent 65%), radial-gradient(ellipse 60% 40% at 0% 0%, color-mix(in oklch, var(--foreground) 6%, transparent), transparent 55%)",
  mixBlendMode: "soft-light",
};
