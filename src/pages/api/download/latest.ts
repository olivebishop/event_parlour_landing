import type { APIRoute } from "astro"
import {
  getLatestDesktopRelease,
  summarizeRelease,
} from "@/lib/desktop-releases/github"
import { releaseSource } from "@/lib/desktop-releases/source"

/**
 * GET /api/download/latest — which installers the newest published release
 * has, and its version. The download page calls this to switch its buttons on;
 * nothing about the files or the repository is exposed.
 */
export const prerender = false

export const GET: APIRoute = async () => {
  const release = await getLatestDesktopRelease(releaseSource())
  return new Response(
    JSON.stringify(release ? summarizeRelease(release) : null),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    },
  )
}
