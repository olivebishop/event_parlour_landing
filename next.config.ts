import createNextIntlPlugin from 'next-intl/plugin';

// Specify the custom path to your i18n/request.ts file
const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);