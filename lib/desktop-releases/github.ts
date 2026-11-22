import {
  DESKTOP_PLATFORMS,
  type DesktopPlatformKey,
  type LatestDesktopRelease,
} from "./platforms"

/**
 * Server-only: resolves desktop installers from GitHub Releases.
 *
 * The app repo is private, so release assets are not publicly downloadable.
 * With a read-only token, GitHub answers an asset request with a short-lived
 * signed URL, which we hand to the visitor as a redirect: the repo and the
 * token stay private, and the file comes straight from GitHub's storage.
 * Without a token (a public repo) the asset's public URL is used directly.
 *
 * Only *published* `desktop-v*` releases count. The release workflow creates
 * drafts, so nothing reaches visitors until someone publishes the release.
 */

const RELEASE_TAG_PREFIX = "desktop-v"
const API = "https://api.github.com"
/** One release lookup per process per window, so page views never hit rate limits. */
const RELEASE_TTL_MS = 5 * 60_000
/** Failures are cached briefly too, so an outage isn't amplified into a retry storm. */
const FAILURE_TTL_MS = 60_000

export type ReleaseSource = { repo: string; token: string | undefined }

export type ReleaseAsset = {
  id: number
  name: string
  browser_download_url: string
}

export type GithubRelease = {
  tag_name: string
  draft: boolean
  prerelease: boolean
  published_at: string | null
  assets: ReleaseAsset[]
}

/** Newest published, non-prerelease desktop release, or null. */
export function pickLatestDesktopRelease(
  releases: GithubRelease[],
): GithubRelease | null {
  const candidates = releases
    .filter(
      (release) =>
        !release.draft &&
        !release.prerelease &&
        release.tag_name.startsWith(RELEASE_TAG_PREFIX),
    )
    .sort((a, b) =>
      (b.published_at ?? "").localeCompare(a.published_at ?? ""),
    )
  return candidates[0] ?? null
}

export function findPlatformAsset(
  release: GithubRelease,
  platform: DesktopPlatformKey,
): ReleaseAsset | null {
  const { pattern } = DESKTOP_PLATFORMS[platform]
  return release.assets.find((asset) => pattern.test(asset.name)) ?? null
}

export function summarizeRelease(release: GithubRelease): LatestDesktopRelease {
  const platforms = (Object.keys(DESKTOP_PLATFORMS) as DesktopPlatformKey[]).filter(
    (platform) => findPlatformAsset(release, platform) !== null,
  )
  return {
    version: release.tag_name.slice(RELEASE_TAG_PREFIX.length),
    publishedAt: release.published_at,
    platforms,
  }
}

function githubHeaders(token: string | undefined, accept: string): HeadersInit {
  return {
    Accept: accept,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "eventparlour-website",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

let cached:
  | { key: string; at: number; ttl: number; release: GithubRelease | null }
  | undefined

export async function getLatestDesktopRelease(
  source: ReleaseSource,
): Promise<GithubRelease | null> {
  const key = source.repo
  const now = Date.now()
  if (cached && cached.key === key && now - cached.at < cached.ttl) {
    return cached.release
  }

  try {
    const response = await fetch(
      `${API}/repos/${source.repo}/releases?per_page=30`,
      {
        headers: githubHeaders(source.token, "application/vnd.github+json"),
        signal: AbortSignal.timeout(8_000),
      },
    )
    if (!response.ok) {
      throw new Error(`GitHub releases: HTTP ${response.status}`)
    }
    const release = pickLatestDesktopRelease(
      (await response.json()) as GithubRelease[],
    )
    cached = { key, at: now, ttl: RELEASE_TTL_MS, release }
    return release
  } catch (error) {
    console.error("[download] could not load desktop releases:", error)
    // Keep serving the last good answer through a GitHub blip.
    const stale = cached?.key === key ? cached.release : null
    cached = { key, at: now, ttl: FAILURE_TTL_MS, release: stale }
    return stale
  }
}

/**
 * Where to send the visitor for this asset. For a private repo this asks
 * GitHub for the signed storage URL (valid for minutes, so never cached).
 */
export async function resolveAssetDownloadUrl(
  source: ReleaseSource,
  asset: ReleaseAsset,
): Promise<string | null> {
  if (!source.token) return asset.browser_download_url

  const response = await fetch(
    `${API}/repos/${source.repo}/releases/assets/${asset.id}`,
    {
      headers: githubHeaders(source.token, "application/octet-stream"),
      redirect: "manual",
      signal: AbortSignal.timeout(8_000),
    },
  )
  const location = response.headers.get("location")
  if (response.status >= 300 && response.status < 400 && location) {
    return location
  }
  console.error(
    `[download] asset ${asset.name}: expected a redirect, got HTTP ${response.status}`,
  )
  return null
}

/** Test hook: forget the cached release. */
export function resetDesktopReleaseCache(): void {
  cached = undefined
}
