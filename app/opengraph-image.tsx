import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Used by link previews (Reddit, Slack, iMessage, etc.) via Open Graph. */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #111 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
          padding: "64px",
        }}
      >
        <p
          style={{
            fontSize: "28px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(250,250,250,0.55)",
            margin: 0,
            marginBottom: "16px",
          }}
        >
          Event Parlour
        </p>
        <h1
          style={{
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            marginBottom: "28px",
            maxWidth: "900px",
          }}
        >
          Reach event-goers. Sell tickets. Run events.
        </h1>
        <p
          style={{
            fontSize: "30px",
            lineHeight: 1.45,
            color: "rgba(250,250,250,0.78)",
            margin: 0,
            maxWidth: "820px",
          }}
        >
          Distribution-first event marketplace for organizers, attendees & vendors — Nairobi & beyond.
        </p>
        <p
          style={{
            position: "absolute",
            bottom: "48px",
            left: "64px",
            fontSize: "26px",
            fontWeight: 600,
            color: "rgba(250,250,250,0.9)",
            margin: 0,
          }}
        >
          www.eventparlour.com
        </p>
      </div>
    ),
    { ...size }
  );
}
