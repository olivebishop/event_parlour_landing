import { ImageResponse } from "next/og"
import { getOgFonts } from "@/lib/seo/og-fonts"

export const ogImageSize = { width: 1200, height: 630 }
export const ogImageContentType = "image/png"

export type CreateOgImageOptions = {
  eyebrow?: string
  title: string
  description?: string
}

/** Shared Open Graph card — Geist Pixel for brand type, Sans for support copy. */
export async function createOgImage({
  eyebrow = "Event Parlour",
  title,
  description,
}: CreateOgImageOptions) {
  const fonts = await getOgFonts()

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "1200px",
          height: "630px",
          background: "#ffffff",
          color: "#000000",
          padding: "56px 64px",
          position: "relative",
        }}
      >
        {/* Hairline grid — matches site hero cue */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 85% at 90% 0%, rgba(255,255,255,0) 0%, #ffffff 72%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            maxWidth: "980px",
          }}
        >
          <p
            style={{
              fontFamily: "Geist Pixel Square",
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.45)",
              margin: 0,
              marginBottom: 28,
            }}
          >
            {eyebrow}
          </p>
          <h1
            style={{
              fontFamily: "Geist Pixel Line",
              fontSize: title.length > 42 ? 56 : 68,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: "980px",
            }}
          >
            {title}
          </h1>
          {description ? (
            <p
              style={{
                fontFamily: "Geist Sans",
                fontSize: 28,
                lineHeight: 1.4,
                color: "rgba(0,0,0,0.62)",
                margin: 0,
                marginTop: 28,
                maxWidth: "820px",
              }}
            >
              {description}
            </p>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid rgba(0,0,0,0.12)",
            paddingTop: 22,
          }}
        >
          <p
            style={{
              fontFamily: "Geist Pixel Square",
              fontSize: 22,
              letterSpacing: "0.12em",
              color: "rgba(0,0,0,0.7)",
              margin: 0,
            }}
          >
            www.eventparlour.com
          </p>
          <p
            style={{
              fontFamily: "Geist Pixel Square",
              fontSize: 20,
              letterSpacing: "0.16em",
              color: "rgba(0,0,0,0.35)",
              margin: 0,
            }}
          >
            EVENTS MARKETPLACE
          </p>
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts,
    },
  )
}
