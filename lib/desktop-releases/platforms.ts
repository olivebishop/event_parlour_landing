/**
 * Desktop installers published by eventpalour_app's `Desktop Release` workflow
 * (tauri-action). Shared by the download page (client) and /api/download
 * (server), so a platform key always means the same file on both sides.
 *
 * File names come from Tauri's bundler, e.g. `Event Parlour_0.2.0_aarch64.dmg`.
 * Match on the suffix only: the product name and version change, the suffix
 * does not. Updater artifacts (`.app.tar.gz`, `.sig`) never match.
 */
export const DESKTOP_PLATFORMS = {
  "mac-arm64": { label: "Apple Silicon", pattern: /_aarch64\.dmg$/ },
  "mac-x64": { label: "Intel", pattern: /_x64\.dmg$/ },
  windows: { label: "Windows", pattern: /_x64-setup\.exe$/ },
  "windows-msi": { label: "Windows (MSI)", pattern: /_x64_en-US\.msi$/ },
  "linux-deb": { label: "Debian / Ubuntu (.deb)", pattern: /_amd64\.deb$/ },
  "linux-rpm": { label: "Fedora / RHEL (.rpm)", pattern: /\.x86_64\.rpm$/ },
  "linux-appimage": { label: "AppImage", pattern: /_amd64\.AppImage$/ },
} as const satisfies Record<string, { label: string; pattern: RegExp }>

export type DesktopPlatformKey = keyof typeof DESKTOP_PLATFORMS

export function isDesktopPlatformKey(value: string): value is DesktopPlatformKey {
  return Object.hasOwn(DESKTOP_PLATFORMS, value)
}

export function desktopDownloadHref(platform: DesktopPlatformKey): string {
  return `/api/download?platform=${platform}`
}

/** What `/api/download/latest` returns: enough to enable the right buttons. */
export type LatestDesktopRelease = {
  version: string
  publishedAt: string | null
  platforms: DesktopPlatformKey[]
}
