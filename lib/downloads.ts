import { appHref } from "@/lib/app-url"
import {
  type DesktopPlatformKey,
  desktopDownloadHref,
} from "@/lib/desktop-releases/platforms"

export type DownloadPlatform = "mac" | "windows"

/**
 * Every button links to /api/download, which redirects to the installer in the
 * latest published release, so links never change between versions. Whether a
 * build is ready comes from /api/download/latest at runtime, not from env vars
 * baked in at build time.
 */
export type DownloadBuild = {
  id: string
  label: string
  platform: DesktopPlatformKey
  href: string
}

const build = (
  id: string,
  label: string,
  platform: DesktopPlatformKey,
): DownloadBuild => ({ id, label, platform, href: desktopDownloadHref(platform) })

export const desktopDownloads = {
  eyebrow: "Built to sell out",
  browserLink: "Or list your event in the browser",
  mac: {
    id: "mac" as const,
    label: "Mac",
    title: "Sell out from your Mac",
    description:
      "List the show. Watch tickets move. Check them in when doors open. Event Parlour lives on the dock, not in a lost browser tab.",
    builds: [
      build("mac-silicon", "Download Apple Silicon", "mac-arm64"),
      build("mac-intel", "Download Intel", "mac-x64"),
    ] satisfies DownloadBuild[],
    requirements: "Requires macOS 13 or later.",
    // Remove once the builds are signed and notarized (ROADMAP Phase 5).
    firstLaunch:
      "First launch: right-click the app in Applications, choose Open, then Open again.",
  },
  windows: {
    id: "windows" as const,
    label: "Windows",
    title: "Sell out from Windows",
    description:
      "List the show. Watch tickets move. Check them in when doors open. Event Parlour sits on the taskbar, ready before the room fills.",
    builds: [
      build("windows-x64", "Download Windows", "windows"),
    ] satisfies DownloadBuild[],
    requirements: "Requires Windows 10 or later.",
    // Remove once the installer is code-signed (ROADMAP Phase 5).
    firstLaunch:
      'If Windows shows "Windows protected your PC", choose More info, then Run anyway.',
  },
  /** Secondary installers, listed as plain links under the buttons. */
  more: [
    build("windows-msi", "Windows MSI (IT-managed)", "windows-msi"),
    build("linux-deb", "Linux .deb", "linux-deb"),
    build("linux-rpm", "Linux .rpm", "linux-rpm"),
    build("linux-appimage", "Linux AppImage", "linux-appimage"),
  ] satisfies DownloadBuild[],
  webHref: appHref("/auth/sign-up"),
}

export function isBuildReady(
  build: DownloadBuild,
  available: ReadonlySet<DesktopPlatformKey>,
) {
  return available.has(build.platform)
}
