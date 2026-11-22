import { afterEach, describe, expect, it, mock, setSystemTime } from "bun:test"
import {
  findPlatformAsset,
  getLatestDesktopRelease,
  type GithubRelease,
  pickLatestDesktopRelease,
  resetDesktopReleaseCache,
  resolveAssetDownloadUrl,
  summarizeRelease,
} from "./github"

const asset = (id: number, name: string) => ({
  id,
  name,
  browser_download_url: `https://github.com/x/y/releases/download/v/${name}`,
})

const release = (
  tag: string,
  publishedAt: string | null,
  extra: Partial<GithubRelease> = {},
): GithubRelease => ({
  tag_name: tag,
  draft: false,
  prerelease: false,
  published_at: publishedAt,
  assets: [
    asset(1, "Event Parlour_0.2.0_aarch64.dmg"),
    asset(2, "Event Parlour_0.2.0_x64.dmg"),
    asset(3, "Event Parlour_0.2.0_x64-setup.exe"),
    asset(4, "Event Parlour_0.2.0_x64_en-US.msi"),
    asset(5, "Event Parlour_0.2.0_amd64.deb"),
    asset(6, "Event Parlour-0.2.0-1.x86_64.rpm"),
    asset(7, "Event Parlour.app.tar.gz"),
    asset(8, "Event Parlour.app.tar.gz.sig"),
  ],
  ...extra,
})

const realFetch = globalThis.fetch

afterEach(() => {
  resetDesktopReleaseCache()
  mock.restore()
  setSystemTime()
  globalThis.fetch = realFetch
})

describe("pickLatestDesktopRelease", () => {
  it("takes the newest published desktop release", () => {
    const picked = pickLatestDesktopRelease([
      release("desktop-v0.1.0", "2026-01-01T00:00:00Z"),
      release("desktop-v0.2.0", "2026-02-01T00:00:00Z"),
      release("v9.9.9", "2026-03-01T00:00:00Z"),
    ])
    expect(picked?.tag_name).toBe("desktop-v0.2.0")
  })

  it("ignores drafts and prereleases", () => {
    const picked = pickLatestDesktopRelease([
      release("desktop-v0.3.0", null, { draft: true }),
      release("desktop-v0.2.1", "2026-03-01T00:00:00Z", { prerelease: true }),
      release("desktop-v0.2.0", "2026-02-01T00:00:00Z"),
    ])
    expect(picked?.tag_name).toBe("desktop-v0.2.0")
  })

  it("returns null when nothing is published", () => {
    expect(
      pickLatestDesktopRelease([release("desktop-v1.0.0", null, { draft: true })]),
    ).toBeNull()
  })
})

describe("findPlatformAsset", () => {
  const r = release("desktop-v0.2.0", "2026-02-01T00:00:00Z")

  it("matches each installer by its suffix", () => {
    expect(findPlatformAsset(r, "mac-arm64")?.id).toBe(1)
    expect(findPlatformAsset(r, "mac-x64")?.id).toBe(2)
    expect(findPlatformAsset(r, "windows")?.id).toBe(3)
    expect(findPlatformAsset(r, "windows-msi")?.id).toBe(4)
    expect(findPlatformAsset(r, "linux-deb")?.id).toBe(5)
    expect(findPlatformAsset(r, "linux-rpm")?.id).toBe(6)
  })

  it("returns null for a missing build (the AppImage here)", () => {
    expect(findPlatformAsset(r, "linux-appimage")).toBeNull()
  })

  it("summarizes version and available platforms, never updater files", () => {
    expect(summarizeRelease(r)).toEqual({
      version: "0.2.0",
      publishedAt: "2026-02-01T00:00:00Z",
      platforms: [
        "mac-arm64",
        "mac-x64",
        "windows",
        "windows-msi",
        "linux-deb",
        "linux-rpm",
      ],
    })
  })
})

describe("GitHub calls", () => {
  it("caches the release lookup", async () => {
    const fetchMock = mock(async () =>
      Response.json([release("desktop-v0.2.0", "2026-02-01T00:00:00Z")]),
    )
    globalThis.fetch = fetchMock as unknown as typeof fetch
    const source = { repo: "o/r", token: "t" }
    await getLatestDesktopRelease(source)
    await getLatestDesktopRelease(source)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it("keeps serving the last good release through a GitHub error", async () => {
    const source = { repo: "o/r", token: "t" }
    setSystemTime(new Date("2026-06-01T00:00:00Z"))
    globalThis.fetch = (async () =>
      Response.json([
        release("desktop-v0.2.0", "2026-02-01T00:00:00Z"),
      ])) as unknown as typeof fetch
    await getLatestDesktopRelease(source)

    // Past the 5-minute cache, GitHub fails.
    setSystemTime(new Date("2026-06-01T00:06:00Z"))
    globalThis.fetch = (async () =>
      new Response("nope", { status: 502 })) as unknown as typeof fetch
    const stale = await getLatestDesktopRelease(source)
    expect(stale?.tag_name).toBe("desktop-v0.2.0")
  })

  it("returns null when GitHub fails and nothing was cached", async () => {
    globalThis.fetch = (async () =>
      new Response("nope", { status: 502 })) as unknown as typeof fetch
    expect(await getLatestDesktopRelease({ repo: "o/r", token: "t" })).toBeNull()
  })

  it("follows a private asset to its signed URL", async () => {
    globalThis.fetch = (async () =>
      new Response(null, {
        status: 302,
        headers: { location: "https://objects.example/signed" },
      })) as unknown as typeof fetch
    const url = await resolveAssetDownloadUrl(
      { repo: "o/r", token: "t" },
      asset(1, "x_aarch64.dmg"),
    )
    expect(url).toBe("https://objects.example/signed")
  })

  it("uses the public URL when no token is configured", async () => {
    const a = asset(1, "x_aarch64.dmg")
    expect(
      await resolveAssetDownloadUrl({ repo: "o/r", token: undefined }, a),
    ).toBe(a.browser_download_url)
  })
})
