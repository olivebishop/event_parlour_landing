import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.eventparlour.com";

export const metadata: Metadata = {
  title: "Event Parlour - Events & Accommodation Booking",
  description: "Discover, host, and book event accommodations on Event Parlour—Airbnb-style lodging for organizers, attendees, and speakers.",
  keywords: "event accommodations, event booking, event management, ticketing, concerts, festivals, conferences, Airbnb for events",
  authors: [{ name: "Event Parlour", url: siteUrl }],
  applicationName: "Event Parlour",
  generator: "Next.js",
  creator: "Event Parlour",
  publisher: "Event Parlour",
  openGraph: {
    title: "Event Parlour - Events & Accommodation Booking",
    description: "Plan events and book tailored accommodations with Event Parlour—like Airbnb for organizers, attendees, and speakers.",
    url: siteUrl,
    siteName: "Event Parlour",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Event Parlour - Events & Accommodation Booking",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Parlour - Events & Accommodation Booking",
    description: "Host events and book event-specific stays with Event Parlour—Airbnb for the event world.",
    site: "@EventParlour", // Fixed typo assuming this is correct
    creator: "@EventParlour",
    images: [`${siteUrl}/twitter-card.jpg`],
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#171717" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LodgingBusiness"],
              "name": "Event Parlour",
              "url": siteUrl,
              "logo": `${siteUrl}/logo.png`,
              "description": "A platform to discover, host events, and book event-specific accommodations for organizers, attendees, and speakers.",
              "sameAs": [
                "https://twitter.com/eventparlour",
                "https://www.facebook.com/eventparlour",
                "https://www.instagram.com/eventparlour",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#171717] text-white`}
      >
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}