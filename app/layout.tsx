// app/layout.tsx
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
  title: "Event Parlour - Discover & Host Events",
  description: "Join Event Parlour, the ultimate platform for event organizers, attendees, and vendors. Discover, create, and host unforgettable events.",
  keywords: "events, ticketing, event management, concerts, festivals, networking, conferences, music tours",
  authors: [{ name: "Event Parlour", url: siteUrl }],
  applicationName: "Event Parlour",
  generator: "Next.js",
  creator: "Event Parlour",
  publisher: "Event Parlour",
  openGraph: {
    title: "Event Parlour - Discover & Host Events",
    description: "Join Event Parlour, the ultimate platform for event organizers, attendees, and vendors.",
    url: siteUrl,
    siteName: "Event Parlour",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Event Parlour - Discover & Host Events",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Parlour - Discover & Host Events",
    description: "Find, create, and host unforgettable events with Event Parlour.",
    site: "@EventsPalour",
    creator: "@EventsPalour",
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
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Event Parlour",
              "url": siteUrl,
              "logo": `${siteUrl}/logo.png`,
              "description": "The ultimate platform for event organizers, attendees, and vendors.",
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
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}