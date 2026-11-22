"use client"

import { useEffect, useState } from "react"
import { MacDesktop } from "@/components/download/mac-desktop"
import { WindowsDesktop } from "@/components/download/windows-desktop"
import { StageAtmosphere } from "@/components/download/stage-atmosphere"
import { AppleLogo, WindowsLogo } from "@/components/download/os-icons"
import { Button } from "@/components/ui/button"
import {
  desktopDownloads,
  isBuildReady,
  type DownloadPlatform,
} from "@/lib/downloads"
import type {
  DesktopPlatformKey,
  LatestDesktopRelease,
} from "@/lib/desktop-releases/platforms"
import { cn } from "@/lib/utils"

type ReleaseState = {
  available: ReadonlySet<DesktopPlatformKey>
  version: string | null
}

const NO_RELEASE: ReleaseState = { available: new Set(), version: null }

/**
 * Which installers the latest published release has. Fetched at runtime
 * because pages are prerendered: a new release must switch buttons on without
 * rebuilding the site.
 */
function useLatestRelease(): ReleaseState {
  const [state, setState] = useState<ReleaseState>(NO_RELEASE)

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/download/latest", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((release: LatestDesktopRelease | null) => {
        if (!release) return
        setState({
          available: new Set(release.platforms),
          version: release.version,
        })
      })
      .catch(() => {
        // Leave the buttons in their "soon" state.
      })
    return () => controller.abort()
  }, [])

  return state
}

function detectPlatform(): DownloadPlatform {
  if (typeof navigator === "undefined") return "mac"
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes("windows")) return "windows"
  return "mac"
}

function DownloadButtons({
  platform,
  release,
}: {
  platform: DownloadPlatform
  release: ReleaseState
}) {
  const copy = desktopDownloads[platform]
  const many = copy.builds.length > 1

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full flex-row justify-center gap-2 sm:w-auto sm:gap-3">
        {copy.builds.map((build, index) => {
          const ready = isBuildReady(build, release.available)
          const label = ready ? build.label : `${build.label}, soon`
          const button = (
            <Button
              size="cta"
              variant={index === 0 ? "default" : "outline"}
              disabled={!ready}
              className={cn(
                "max-w-none justify-between gap-2 rounded-none px-3 shadow-none sm:min-w-[11.5rem] sm:gap-6 sm:px-5",
                many
                  ? "w-full min-w-0 flex-1 sm:w-auto sm:flex-none"
                  : "w-auto",
              )}
            >
              <span>
                <span className="hidden sm:inline">
                  {label.startsWith("Download ") ? "Download " : null}
                </span>
                {label.replace(/^Download /, "")}
              </span>
              <span aria-hidden className="font-numbers text-base leading-none">
                {ready ? "↓" : "·"}
              </span>
            </Button>
          )

          const wrapClass = many
            ? "min-w-0 flex-1 sm:flex-none"
            : "shrink-0"

          if (!ready) {
            return (
              <div key={build.id} className={wrapClass}>
                {button}
              </div>
            )
          }

          return (
            <a key={build.id} href={build.href} className={wrapClass}>
              {button}
            </a>
          )
        })}
      </div>
      <p className="font-body text-sm text-foreground/55 dark:text-white/55">
        {copy.requirements}{" "}
        <a
          href={desktopDownloads.webHref}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          {desktopDownloads.browserLink}
        </a>
      </p>
      {release.version ? (
        <p className="font-body text-xs text-foreground/50 dark:text-white/50">
          Version {release.version}. {copy.firstLaunch}
        </p>
      ) : null}
      <MoreDownloads release={release} />
    </div>
  )
}

function MoreDownloads({ release }: { release: ReleaseState }) {
  const builds = desktopDownloads.more.filter((build) =>
    isBuildReady(build, release.available),
  )
  if (builds.length === 0) return null
  return (
    <p className="font-body text-xs text-foreground/55 dark:text-white/55">
      Also available:{" "}
      {builds.map((build, index) => (
        <span key={build.id}>
          {index > 0 ? " · " : null}
          <a
            href={build.href}
            className="underline underline-offset-4 hover:text-foreground"
          >
            {build.label}
          </a>
        </span>
      ))}
    </p>
  )
}

export function DownloadSection({
  id = "download",
  variant = "section",
}: {
  id?: string
  variant?: "section" | "page"
}) {
  const [platform, setPlatform] = useState<DownloadPlatform>("mac")
  const release = useLatestRelease()
  // /api/download sends visitors back here when the installer isn't published.
  const [unavailable, setUnavailable] = useState(false)
  useEffect(() => {
    setUnavailable(
      new URLSearchParams(window.location.search).has("unavailable"),
    )
  }, [])

  useEffect(() => {
    setPlatform(detectPlatform())
  }, [])

  const copy = desktopDownloads[platform]
  const isPage = variant === "page"
  const Heading = isPage ? "h1" : "h2"

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative isolate z-20 overflow-hidden bg-muted/40 dark:bg-[oklch(0.11_0_0)]",
        isPage
          ? "scroll-mt-[4.5rem] pb-10 pt-24 xs:pb-12 sm:scroll-mt-24 sm:pb-14 sm:pt-28"
          : "mt-8 scroll-mt-[4.5rem] py-14 xs:py-16 sm:mt-10 sm:scroll-mt-24 sm:py-20 md:mt-12 md:py-28 lg:mt-16 lg:py-32",
      )}
    >
      <StageAtmosphere />

      <div className="container relative z-10 mx-auto px-3 xs:px-4 sm:px-6">
        <div className="mb-8 text-center xs:mb-10 sm:mb-12 md:mb-14">
          <p className="mb-3 font-body text-[10px] font-medium uppercase tracking-widest text-foreground/55 xs:mb-4 xs:text-xs dark:text-white/55">
            {desktopDownloads.eyebrow}
          </p>
          {/* The standalone /download page needs this as its <h1>. */}
          <Heading
            id={`${id}-heading`}
            className="mb-4 px-1 font-heading text-balance text-xl font-bold text-foreground xs:mb-5 xs:text-2xl sm:mb-6 sm:text-4xl md:text-5xl dark:text-white"
          >
            {copy.title}
          </Heading>
          <p className="mx-auto max-w-xs px-2 font-body text-[0.9375rem] leading-relaxed text-foreground/70 xs:max-w-sm xs:text-base sm:max-w-xl sm:text-lg md:max-w-2xl dark:text-white/65">
            {copy.description}
          </p>

          <div className="mt-6 flex justify-center gap-2 sm:mt-8">
            {(
              [
                { id: "mac", label: "Mac", icon: AppleLogo },
                { id: "windows", label: "Windows", icon: WindowsLogo },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon
              const active = platform === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPlatform(tab.id)}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-2 px-4 font-body text-sm transition-colors",
                    active
                      ? "bg-foreground text-background dark:bg-white dark:text-black"
                      : "bg-foreground/6 text-foreground/65 hover:bg-foreground/10 hover:text-foreground dark:bg-white/8 dark:text-white/65 dark:hover:bg-white/12 dark:hover:text-white",
                  )}
                  aria-pressed={active}
                >
                  <Icon
                    className={cn(
                      "size-3.5",
                      tab.id === "mac" && "h-[15px] w-[12px]",
                    )}
                  />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div
          data-os-chrome
          data-agent-skip
          className={cn(
            "os-frame relative mx-auto w-full max-w-6xl overflow-hidden",
            "border border-foreground/15 bg-background dark:border-white/15",
            "shadow-[0_28px_90px_-20px_rgba(0,0,0,0.18)] dark:shadow-[0_28px_90px_-20px_rgba(0,0,0,0.75)]",
          )}
        >
          {platform === "mac" ? <MacDesktop /> : <WindowsDesktop />}
        </div>

        <div className="mt-8 text-center xs:mt-10 sm:mt-12">
          {unavailable ? (
            <p
              role="status"
              className="mb-4 font-body text-sm text-foreground/70 dark:text-white/70"
            >
              That installer isn't available yet. Pick another below, or use
              Event Parlour in your browser.
            </p>
          ) : null}
          <DownloadButtons platform={platform} release={release} />
        </div>
      </div>
    </section>
  )
}
