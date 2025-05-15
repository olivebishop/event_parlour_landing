import { NextResponse } from "next/server";

// Dummy event data (from lib/data)
const events = [
  { id: 1, title: "TechCon 2025", date: "May 15-17, 2025", time: "9:00 AM", location: "San Francisco, CA", category: "Tech", image: "/images/dummy/one.jpg", price: 5000 },
  { id: 2, title: "Global AI Summit", date: "June 5-7, 2025", time: "10:00 AM", location: "London, UK", category: "Conference", image: "/images/two.jpg", price: 7500 },
  { id: 3, title: "Startup Mixer", date: "July 12, 2025", time: "6:30 PM", location: "New York, NY", category: "Hangouts", image: "/images/dummy/three.jpg", price: 2000 },
  { id: 4, title: "Coachella 2025", date: "April 10-19, 2025", time: "12:00 PM", location: "Indio, CA", category: "Festivals", image: "/images/dummy/seven.jpg", price: 12000 },
  { id: 5, title: "Rock the Stadium", date: "August 22, 2025", time: "7:00 PM", location: "Chicago, IL", category: "Tech", image: "/images/dummy/four.jpg", price: 3500 },
  { id: 6, title: "DevOps World", date: "September 8-10, 2025", time: "9:30 AM", location: "Berlin, Germany", category: "Tech", image: "/images/dummy/five.jpg", price: 6000 },
  { id: 7, title: "Blockchain Revolution", date: "October 15-17, 2025", time: "10:00 AM", location: "Singapore", category: "Conference", image: "/images/dummy/six.jpg", price: 8000 },
  { id: 8, title: "Indie Music Fest", date: "July 3-5, 2025", time: "4:00 PM", location: "Austin, TX", category: "Festivals", image: "/images/dummy/eight.jpg", price: 4500 },
];

// Dummy bed data (from BedSection.tsx)
const beds = [
  { id: 1, title: "Cozy Studio Near Event Venue", image: "/images/dummy/a.jpg", location: "Downtown, 0.5 miles from venue", price: 9800, guests: 2, dates: "Mar 15 - Mar 18" },
  { id: 2, title: "Spacious 2BR Apartment", image: "/images/dummy/b.jpg", location: "Midtown, 1 mile from venue", price: 14700, guests: 4, dates: "Mar 14 - Mar 19" },
  { id: 3, title: "Luxury Penthouse with City View", image: "/images/dummy/c.jpg", location: "City Center, 0.2 miles from venue", price: 30500, guests: 6, dates: "Mar 13 - Mar 20" },
];

export async function GET() {
  const landingBaseUrl = "https://www.eventparlour.com"; // Landing page URL
  const appBaseUrl = "https://www.eventparlour.com"; // Temporary: Using landing URL until subdomain is ready (later: "https://app.eventparlour.com")

  // Static pages for landing page (eventparlour.com)
  const staticPages = [
    { href: "/", label: "Home", priority: 1.0, changeFreq: "daily" },
    { href: "/events", label: "Events Near Me", priority: 0.9, changeFreq: "daily" },
    { href: "/beds", label: "Accommodations", priority: 0.9, changeFreq: "daily" },
    { href: "/Venues", label: "Venues", priority: 0.8, changeFreq: "weekly" },
    { href: "/contact-us", label: "Contact", priority: 0.7, changeFreq: "monthly" },
  ].map((page) => ({
    url: `${landingBaseUrl}${page.href}`,
    lastModified: new Date().toISOString(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  // App-specific static pages (temporarily under eventparlour.com, later app.eventparlour.com)
  const appStaticPages = [
    { href: "/sign-in", label: "Sign In", priority: 0.6, changeFreq: "monthly" },
  ].map((page) => ({
    url: `${appBaseUrl}${page.href}`,
    lastModified: new Date().toISOString(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  // Dynamic event pages (temporarily under eventparlour.com, later app.eventparlour.com)
  const dynamicEventPages = events.map((event) => ({
    url: `${appBaseUrl}/events/${event.id}`,
    lastModified: new Date().toISOString(), // Could parse event.date for more accuracy
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic bed pages (temporarily under eventparlour.com, later app.eventparlour.com)
  const dynamicBedPages = beds.map((bed) => ({
    url: `${appBaseUrl}/beds/${bed.id}`,
    lastModified: new Date().toISOString(), // Could parse bed.dates for more accuracy
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Combine all URLs
  const allUrls = [...staticPages, ...appStaticPages, ...dynamicEventPages, ...dynamicBedPages];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (page) => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastModified}</lastmod>
      <changefreq>${page.changeFrequency}</changefreq>
      <priority>${page.priority}</priority>
    </url>`
    )
    .join("\n")}
</urlset>`;

  // Return the XML response
  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}