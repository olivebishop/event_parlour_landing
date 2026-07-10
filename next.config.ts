import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    output: "standalone",
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    experimental: {
        optimizePackageImports: [
            "lucide-react",
            "framer-motion",
            "date-fns",
            "recharts",
            "react-icons",
        ],
    },
};

export default nextConfig;