import { appHref } from "@/lib/app-url"

export type DownloadPlatform = "mac" | "windows"

export type DownloadBuild = {
  id: string
  label: string
  href: string
  filename?: string
}

const macSiliconUrl = process.env.NEXT_PUBLIC_MAC_SILICON_URL ?? ""
const macIntelUrl = process.env.NEXT_PUBLIC_MAC_INTEL_URL ?? ""
const windowsUrl = process.env.NEXT_PUBLIC_WINDOWS_URL ?? ""

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
      {
        id: "mac-silicon",
        label: "Download Apple Silicon",
        href: macSiliconUrl,
        filename: "EventParlour-arm64.dmg",
      },
      {
        id: "mac-intel",
        label: "Download Intel",
        href: macIntelUrl,
        filename: "EventParlour-x64.dmg",
      },
    ] satisfies DownloadBuild[],
    requirements: "Requires macOS 13 or later.",
  },
  windows: {
    id: "windows" as const,
    label: "Windows",
    title: "Sell out from Windows",
    description:
      "List the show. Watch tickets move. Check them in when doors open. Event Parlour sits on the taskbar, ready before the room fills.",
    builds: [
      {
        id: "windows-x64",
        label: "Download Windows",
        href: windowsUrl,
        filename: "EventParlour-Setup.exe",
      },
    ] satisfies DownloadBuild[],
    requirements: "Requires Windows 10 or later.",
  },
  webHref: appHref("/auth/sign-up"),
}

export function isBuildReady(build: DownloadBuild) {
  return Boolean(build.href)
}
