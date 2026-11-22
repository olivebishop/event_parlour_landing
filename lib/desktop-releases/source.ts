import { getSecret } from "astro:env/server"
import type { ReleaseSource } from "@/lib/desktop-releases/github"

const DEFAULT_REPO = "olivebishop/eventpalour_app"

/**
 * Where desktop releases live. `DESKTOP_RELEASES_TOKEN` is a fine-grained
 * GitHub token with read-only "Contents" access to that one repository; it is
 * needed while the repository is private and is never sent to the browser.
 */
export function releaseSource(): ReleaseSource {
  return {
    repo: getSecret("DESKTOP_RELEASES_REPO")?.trim() || DEFAULT_REPO,
    token: getSecret("DESKTOP_RELEASES_TOKEN")?.trim() || undefined,
  }
}
