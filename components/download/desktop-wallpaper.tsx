import { brandNoiseLayerStyle } from "@/lib/brand/noise"

export function DesktopWallpaper() {
  return (
    <div aria-hidden className="absolute inset-0 bg-black">
      {/* Decorative OS chrome — local wallpaper */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/pc_bg.png"
        alt=""
        className="h-full w-full object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.48] mix-blend-overlay"
        style={{
          backgroundImage: brandNoiseLayerStyle.backgroundImage,
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  )
}
