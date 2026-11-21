/**
 * Ping IndexNow (Bing, Yandex, Seznam, Naver…) with every URL in the live
 * sitemap, so new or changed pages are re-crawled within minutes instead of
 * days. Bing's index feeds ChatGPT search and Microsoft Copilot.
 *
 * Run after each deploy:  bun scripts/indexnow.ts
 *
 * The key below is public by design: IndexNow verifies it by fetching
 * https://www.eventparlour.com/<key>.txt (public/<key>.txt).
 */
const SITE_URL = "https://www.eventparlour.com"
const KEY = "56e50a8a9e6435355309971bffe721de"

const sitemap = await (await fetch(`${SITE_URL}/sitemap.xml`)).text()
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1])
  .filter((url) => url.startsWith(SITE_URL))

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
})

console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`)
if (res.status >= 400) {
  console.error(await res.text())
  process.exit(1)
}

export {}
