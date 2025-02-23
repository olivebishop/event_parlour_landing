import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Use default export instead of GET function
export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "1200px",
          height: "630px",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          padding: "40px",
        }}
      >
        {/* Left Section - Text */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: "60px", fontWeight: "bold", marginBottom: "20px" }}>
            Unforgettable Events, <br /> Made Simple.
          </h1>
          <p style={{ fontSize: "28px", maxWidth: "500px", lineHeight: "1.4" }}>
            The ultimate platform for organizers, attendees & vendors.
          </p>
        </div>
        
        {/* Right Section - Image */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <img
            src="https://epalour.vercel.app/images/login.svg" // Replace with your actual image URL
            alt="Event Preview"
            style={{ width: "500px", height: "auto", borderRadius: "12px" }}
          />
        </div>
        
        {/* Footer - Brand URL */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "40px",
            fontSize: "22px",
            opacity: 0.8,
          }}
        >
          eventparlour.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}