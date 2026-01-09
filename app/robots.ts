import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.eventparlour.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/eventso/', '/beds/', '/sign-in/', '/events/', '/venues/', '/why-us/', '/contact-us/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}