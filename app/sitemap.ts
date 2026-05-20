import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.eventparlour.com'

const languageAlternates = {
  en: siteUrl,
  sw: siteUrl,
  fr: siteUrl,
  ar: siteUrl,
  de: siteUrl,
  es: siteUrl,
  'x-default': siteUrl,
} as const

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  return [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: languageAlternates,
      },
    },
  ]
}
