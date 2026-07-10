import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Bricolage_Grotesque, Figtree } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { NetworkProvider } from "@/lib/providers/network-provider"
import { ThemeProvider } from "@/lib/providers/theme-provider"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ConsentManager } from "./consent-manager";
import { getSiteStructuredDataGraph } from "@/lib/seo/structured-data"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const siteUrl = "https://www.eventparlour.com"

const seoDescription =
  "Event Parlour connects organizers with event-goers in Nairobi and beyond—distribution-first discovery, ticketing, and event management."

export const metadata: Metadata = {
  title: {
    default: "Event Parlour — Events marketplace for organizers, attendees & vendors",
    template: "%s | Event Parlour",
  },
  description: seoDescription,
  keywords: [
    "Event Parlour",
    "event ticketing Kenya",
    "Nairobi events",
    "event organizers",
    "event marketplace",
    "event discovery",
    "event distribution",
    "Paystack ticketing",
    "event management Kenya",
    "sell event tickets Africa",
    "music festivals Kenya",
    "conferences Nairobi",
    "meetup ticketing",
    "event platform",
    "ticket sales online",
    "circleup.eventparlour",
  ],
  authors: [{ name: "Event Parlour", url: siteUrl }],
  applicationName: "Event Parlour",
  generator: "Next.js",
  creator: "Event Parlour",
  publisher: "Event Parlour",
  openGraph: {
    title: "Event Parlour — Reach event-goers. Sell tickets. Run events.",
    description: seoDescription,
    url: siteUrl,
    siteName: "Event Parlour",
    // Dynamic route — works for Reddit, LinkedIn, Discord, etc. (not a missing static jpg)
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Event Parlour — Events marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Parlour — Events marketplace",
    description: seoDescription,
    site: "@EventsPalour",
    creator: "@EventsPalour",
    images: [`${siteUrl}/opengraph-image`],
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
    date: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <html lang="en" suppressHydrationWarning>
          <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <meta name="theme-color" content="#171717" media="(prefers-color-scheme: dark)" />
            <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
            <meta name='dmca-site-verification' content='ZG0rMlhORGRZZlhkYnZQc1dxT2pSL3Awb3FFTkpIelBFRE96SHVEbmJBRT01' />
            {/* Yandex.Webmaster reads raw HTML — keep this tag in <head>, early. URL in Webmaster must match where this page is served (www vs apex). */}
            <meta
              name="yandex-verification"
              content={process.env.YANDEX_VERIFICATION ?? "26a40458f21b9754"}
            />
            <link
              rel="alternate"
              type="text/plain"
              href="/llms.txt"
              title="llms.txt"
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(getSiteStructuredDataGraph()),
              }}
            />
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.variable} ${figtree.variable} antialiased bg-background text-foreground`}
            suppressHydrationWarning
          >
    		<ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
    		<ConsentManager>
              <NetworkProvider>
                {children}
              </NetworkProvider>
              <Toaster />
              <GoogleAnalytics gaId="G-VSXHC4Y9YQ" />
              <SpeedInsights />
              <Analytics />
    		</ConsentManager>
    		</ThemeProvider>
    	</body>
        </html>
      )
}