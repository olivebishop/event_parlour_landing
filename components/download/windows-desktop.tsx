"use client"

import type { ReactNode } from "react"
import { Battery, Search, Volume2, Wifi } from "lucide-react"
import { cn } from "@/lib/utils"
import { DesktopWallpaper } from "@/components/download/desktop-wallpaper"
import { OsScaleFrame } from "@/components/download/os-scale-frame"
import { useLocalClock } from "@/components/download/use-local-clock"
import {
  useLocalWeather,
  type WeatherCondition,
} from "@/components/download/use-local-weather"
import { OrganizerAppPreview } from "@/components/download/organizer-app-preview"
import { EventParlourMark, WindowsLogo } from "@/components/download/os-icons"

function WeatherGlyph({ condition }: { condition: WeatherCondition }) {
  if (condition === "rain") {
    return (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
        <path
          fill="#e8e8ea"
          d="M8.2 5.6a5.1 5.1 0 0 1 9.2 2.1 3.7 3.7 0 0 1 .8 7.2H7.4a4.2 4.2 0 0 1-.8-8.3 5 5 0 0 1 1.6-1z"
        />
        <path
          fill="#4aa3ff"
          d="M8.2 17.2c-.3.8-.9 1.8-1.5 2.2-.2.1-.4 0-.4-.2.2-.7.8-1.7 1.4-2.2.2-.2.5 0 .5.2Zm4.1 0c-.3.8-.9 1.8-1.5 2.2-.2.1-.4 0-.4-.2.2-.7.8-1.7 1.4-2.2.2-.2.5 0 .5.2Zm4.2 0c-.3.8-.9 1.8-1.5 2.2-.2.1-.4 0-.4-.2.2-.7.8-1.7 1.4-2.2.2-.2.5 0 .5.2Z"
        />
      </svg>
    )
  }

  if (condition === "cloud") {
    return (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
        <path
          fill="#d8d8dc"
          d="M8.1 8.2a5.3 5.3 0 0 1 9.6 2.2 3.9 3.9 0 0 1 .8 7.5H7.2a4.4 4.4 0 0 1-.7-8.7 5.2 5.2 0 0 1 1.6-1z"
        />
        <path
          fill="#f2f2f4"
          d="M8.4 9.4a4.6 4.6 0 0 1 8.4 1.8 3.4 3.4 0 0 1 .7 6.5H7.6a3.8 3.8 0 0 1-.6-7.5 4.5 4.5 0 0 1 1.4-.8z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
      <path
        fill="#f5b400"
        d="M12 3.2c.4 0 .7.3.7.7v1.6a.7.7 0 1 1-1.4 0V3.9c0-.4.3-.7.7-.7Zm0 13.1c.4 0 .7.3.7.7v1.6a.7.7 0 1 1-1.4 0v-1.6c0-.4.3-.7.7-.7Zm8.1-5.6c.4 0 .7.3.7.7s-.3.7-.7.7h-1.6a.7.7 0 1 1 0-1.4h1.6Zm-13.1 0c.4 0 .7.3.7.7s-.3.7-.7.7H5.4a.7.7 0 1 1 0-1.4h1.6Zm10.7-4.6c.3.3.3.7 0 1l-1.1 1.1a.7.7 0 0 1-1-1l1.1-1.1c.3-.3.7-.3 1 0Zm-9.4 9.4c.3.3.3.7 0 1l-1.1 1.1a.7.7 0 1 1-1-1l1.1-1.1c.3-.3.7-.3 1 0Zm9.4 0c.3-.3.7-.3 1 0l1.1 1.1a.7.7 0 1 1-1 1l-1.1-1.1a.7.7 0 0 1 0-1ZM7.2 6.1c.3-.3.7-.3 1 0l1.1 1.1a.7.7 0 1 1-1 1L7.2 7.1a.7.7 0 0 1 0-1Z"
      />
      <circle cx="12" cy="12" r="4.15" fill="#ffcd33" />
    </svg>
  )
}

function TaskbarItem({
  children,
  active = false,
  label,
  badge,
}: {
  children: ReactNode
  active?: boolean
  label: string
  badge?: string
}) {
  return (
    <div className="group relative flex h-12 w-11 items-center justify-center">
      <span className="os-row pointer-events-none absolute bottom-[calc(100%+14px)] z-20 whitespace-nowrap bg-[#2b2b2b] px-2.5 py-1.5 font-body text-[11px] leading-none text-white/95 opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.4)] ring-1 ring-white/10 transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </span>
      <div
        className={cn(
          "os-row relative flex size-9 items-center justify-center transition-colors group-hover:bg-white/10",
          active && "bg-white/12",
        )}
      >
        {children}
        {badge ? (
          <span className="os-dot absolute -right-0.5 -top-0.5 z-10 flex h-3.5 min-w-3.5 items-center justify-center bg-[#c42b1c] px-1 font-body text-[8px] font-semibold leading-none text-white">
            {badge}
          </span>
        ) : null}
      </div>
      {active ? (
        <span className="os-pill absolute bottom-1.5 h-[3px] w-4 bg-[#60cdff]" />
      ) : null}
    </div>
  )
}

function TaskbarApp({ src, label }: { src: string; label: string }) {
  return (
    <TaskbarItem label={label}>
      {/* Decorative OS chrome — local SVG assets */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="size-6 object-contain" />
    </TaskbarItem>
  )
}

function DesktopShortcut({
  src,
  label,
}: {
  src: string
  label: string
}) {
  return (
    <div className="flex w-[68px] flex-col items-center gap-1 text-center">
      {/* Decorative OS chrome — local SVG assets */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="size-9 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
      />
      <span className="line-clamp-2 font-body text-[10px] leading-tight text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </div>
  )
}

function WindowsScene() {
  const now = useLocalClock()
  const weather = useLocalWeather()
  const timeLabel = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })
  const dateLabel = now.toLocaleDateString(undefined, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })

  return (
    <div
      data-os-chrome
      data-os="windows"
      className="relative h-full w-full overflow-hidden bg-black"
    >
      <DesktopWallpaper />

      <div className="absolute left-4 top-5 z-10 flex flex-col gap-5">
        <DesktopShortcut src="/icons/windows-folder.svg" label="Events" />
        <DesktopShortcut src="/icons/chrome.svg" label="Chrome" />
        <DesktopShortcut src="/icons/vlc.svg" label="VLC" />
        <DesktopShortcut src="/icons/cursor.svg" label="Cursor" />
        <DesktopShortcut src="/icons/netflix.svg" label="Netflix" />
        <DesktopShortcut src="/icons/spotify.svg" label="Spotify" />
      </div>

      <div className="os-window absolute left-[96px] top-[40px] z-20 flex h-[568px] w-[980px] flex-col overflow-hidden border border-white/10 bg-black shadow-[0_24px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="flex h-8 shrink-0 items-center justify-between bg-[#202020] text-white">
          <div className="flex min-w-0 items-center pl-3">
            <span className="truncate font-heading text-[12px] font-semibold lowercase tracking-tight text-white/80">
              event parlour
            </span>
          </div>
          <div className="flex h-8 items-center text-white/55">
            <span className="flex h-8 w-11 items-center justify-center text-[15px] leading-none">
              –
            </span>
            <span className="flex h-8 w-11 items-center justify-center">
              <span className="size-2.5 border border-current" />
            </span>
            <span className="flex h-8 w-11 items-center justify-center text-[11px] hover:bg-[#c42b1c] hover:text-white">
              ✕
            </span>
          </div>
        </div>
        <div className="min-h-0 flex-1">
          <OrganizerAppPreview />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 flex h-12 items-center justify-between bg-[#1c1c1e]/90 px-3 backdrop-blur-2xl">
        <div className="os-row flex h-8 min-w-[7.5rem] max-w-[10rem] items-center gap-1.5 bg-white/8 px-2">
          {weather ? <WeatherGlyph condition={weather.condition} /> : null}
          <div className="min-w-0 leading-none">
            <span className="block font-body text-[12px] text-white/80">
              {weather ? `${weather.temperature}°` : "–"}
            </span>
            <span className="mt-0.5 block truncate font-body text-[9px] text-white/35">
              {weather?.city ?? ""}
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 flex items-center justify-center gap-0.5">
          <TaskbarItem label="Start">
            <WindowsLogo branded className="size-6" />
          </TaskbarItem>
          <div className="os-row mr-1 flex h-8 items-center gap-2 bg-white/8 px-2.5">
            <Search className="size-3.5 text-white/80" strokeWidth={2} />
            <span className="font-body text-[12px] text-white/40">Search</span>
          </div>
          <TaskbarApp src="/icons/edge.svg" label="Edge" />
          <TaskbarApp src="/icons/windows-folder.svg" label="File Explorer" />
          <TaskbarItem label="Event Parlour" active badge="2">
            <EventParlourMark className="size-6" inverted />
          </TaskbarItem>
          <TaskbarApp src="/icons/outlook.svg" label="Outlook" />
          <TaskbarApp src="/icons/office.svg" label="Office" />
          <TaskbarApp src="/icons/teams.svg" label="Teams" />
          <TaskbarApp src="/icons/chrome.svg" label="Chrome" />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2.5 pr-1 text-white/75">
            <Wifi className="size-3.5" strokeWidth={2} />
            <Volume2 className="size-3.5" strokeWidth={2} />
            <Battery className="size-3.5" strokeWidth={2} />
          </div>
          <div className="flex flex-col items-end font-body text-[10px] leading-tight text-white/75">
            <span>{timeLabel}</span>
            <span className="text-white/40">{dateLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WindowsDesktop({ className }: { className?: string }) {
  return (
    <div className={className}>
      <OsScaleFrame>
        <WindowsScene />
      </OsScaleFrame>
    </div>
  )
}
