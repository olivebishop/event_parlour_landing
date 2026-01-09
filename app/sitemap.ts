import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.eventparlour.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // Single-page landing - only the homepage
  return [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
