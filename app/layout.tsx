import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { NetworkProvider } from "@/lib/providers/network-provider"
import LoadingProvider from "@/lib/providers/loadingProvider"
import "./globals.css"
import TawkToChat from '@/components/shared/TawkToChat';
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const siteUrl = "https://www.eventparlour.com"

export const metadata: Metadata = {
  title: "Event Parlour - Events & Accommodation Booking",
  description:
    "Connecting organizers, attendees, and vendors in one seamless experience.",
  keywords:
    "event accommodations, event booking, event management, ticketing, concerts, festivals, conferences, Airbnb for events",
  authors: [{ name: "Event Parlour", url: siteUrl }],
  applicationName: "Event Parlour",
  generator: "Next.js",
  creator: "Event Parlour",
  publisher: "Event Parlour",
  openGraph: {
    title: "Event Parlour - Events & Accommodation Booking",
    description:
      "Plan events and book tailored accommodations with Event Parlour—like Airbnb for organizers, attendees, and speakers.",
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#171717" />
        <meta name="google-site-verification" content="google-site-verification: google6fd33e29e29c5c47.html" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LodgingBusiness", "EventVenue", "Event", "Ticketting"],
              name: "Event Parlour",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description:
                "A platform to discover, host events, and book event-specific accommodations for organizers, attendees, and speakers.",
              sameAs: [
                "https://x.com/EventsPalour",
                "https://www.facebook.com/eventparlour",
                "https://www.instagram.com/eventparlour",
              ],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#171717] text-white`}>
        <NextIntlClientProvider messages={messages}>
          <NetworkProvider>
            <LoadingProvider>
              {children}
            </LoadingProvider>
          </NetworkProvider>
          <Toaster />
          <GoogleAnalytics gaId="G-VSXHC4Y9YQ" />
          <SpeedInsights />
          <Analytics />
        </NextIntlClientProvider>
        <TawkToChat />
      </body>
    </html>
  )
}