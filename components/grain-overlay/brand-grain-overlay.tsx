"use client";

import { cn } from "@/lib/utils";
import { brandGlowLayerStyle, brandNoiseLayerStyle } from "@/lib/brand/noise";

export function BrandGrainOverlay({
  className,
  fixed = true,
  intensity = "default",
}: {
  className?: string;
  fixed?: boolean;
  intensity?: "subtle" | "default";
}) {
  const noiseOpacity =
    intensity === "subtle" ? 0.35 : brandNoiseLayerStyle.opacity;
  const glowOpacity =
    intensity === "subtle" ? 0.55 : brandGlowLayerStyle.opacity;

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none inset-0 z-[30]",
          fixed ? "fixed" : "absolute",
          className,
        )}
        style={{
          ...brandNoiseLayerStyle,
          opacity: noiseOpacity,
        }}
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none inset-0 z-[25]",
          fixed ? "fixed" : "absolute",
          className,
        )}
        style={{
          ...brandGlowLayerStyle,
          opacity: glowOpacity,
        }}
      />
    </>
  );
}

export default BrandGrainOverlay;
