import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    compiler:{
        removeConsole: process.env.NODE_ENV === 'production'
    }
};

export default nextConfig;