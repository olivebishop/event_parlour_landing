import type { APIRoute } from "astro"
import {
  findPlatformAsset,
  getLatestDesktopRelease,
  resolveAssetDownloadUrl,
} from "@/lib/desktop-releases/github"
import { isDesktopPlatformKey } from "@/lib/desktop-releases/platforms"
import { releaseSource } from "@/lib/desktop-releases/source"

/**
 * GET /api/download?platform=mac-arm64|mac-x64|windows|windows-msi|
 *   linux-deb|linux-rpm|linux-appimage
 *
 * Redirects to the installer from the latest published desktop release, so
 * every download link on the site stays the same across versions. When there
 * is nothing to download yet, sends the visitor back to /download instead of
 * an error page.
 */
export const prerender = false

// Relative on purpose: behind the proxy `request.url` carries the server's
// internal origin, not the one the visitor used.
const backToDownloadPage = () =>
  new Response(null, {
    status: 302,
    headers: { Location: "/download?unavailable=1", "Cache-Control": "no-store" },
  })

export const GET: APIRoute = async ({ url }) => {
  const platform = url.searchParams.get("platform") ?? ""
  if (!isDesktopPlatformKey(platform)) {
    return new Response("Unknown platform", { status: 400 })
  }

  const source = releaseSource()
  const release = await getLatestDesktopRelease(source)
  const asset = release ? findPlatformAsset(release, platform) : null
  if (!asset) return backToDownloadPage()

  let target: string | null = null
  try {
    target = await resolveAssetDownloadUrl(source, asset)
  } catch (error) {
    console.error("[download] could not resolve asset URL:", error)
  }
  if (!target) return backToDownloadPage()

  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      // The target is a signed URL that expires in minutes.
      "Cache-Control": "no-store",
    },
  })
}
