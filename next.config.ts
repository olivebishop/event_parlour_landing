import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// Specify the custom path to your i18n/request.ts file
const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    compiler:{
        removeConsole: process.env.NODE_ENV === 'production'
    }
};

export default withNextIntl(nextConfig);