import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    inlineCss: true,
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "date-fns",
      "recharts",
      "react-icons",
    ],
  },
  async redirects() {
    return [
      { source: "/platform", destination: "/", permanent: true },
      { source: "/faq", destination: "/contact", permanent: true },
      {
        source: "/features/organizers/:slug",
        destination: "/features/organizers",
        permanent: true,
      },
      {
        source: "/features/attendees/:slug",
        destination: "/features/attendees",
        permanent: true,
      },
      {
        source: "/features/all-in-one",
        destination: "/features/workspace",
        permanent: true,
      },
      {
        source: "/features/built-for-africa",
        destination: "/features/community",
        permanent: true,
      },
      {
        source: "/features/transparent-pricing",
        destination: "/features/pricing",
        permanent: true,
      },
      {
        source: "/features/live-analytics",
        destination: "/features/analytics",
        permanent: true,
      },
      {
        source: "/features/instant-payouts",
        destination: "/features/pricing",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

export default nextConfig
