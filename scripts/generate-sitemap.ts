import fs from 'fs';
import path from 'path';

// Removed dummy data - only homepage is available

function generateSitemap() {
  const landingBaseUrl = "https://www.eventparlour.com"; // Landing page URL

  // Only include the homepage - single-page landing site
  const staticPages = [
    { href: "/", label: "Home", priority: 1.0, changeFreq: "daily" },
  ].map((page) => ({
    url: `${landingBaseUrl}${page.href}`,
    lastModified: new Date().toISOString(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  // Combine all URLs - only homepage
  const allUrls = [...staticPages];

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

  // Write to public directory
  const publicDir = path.join(process.cwd(), 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write the sitemap
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

// Execute
generateSitemap();