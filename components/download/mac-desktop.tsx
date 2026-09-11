"use client"

import type { ReactNode } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { DesktopWallpaper } from "@/components/download/desktop-wallpaper"
import { OsScaleFrame } from "@/components/download/os-scale-frame"
import { useLocalClock } from "@/components/download/use-local-clock"
import {
  AppleLogo,
  CalendarIcon,
  DriveIcon,
  EventParlourMark,
  FinderIcon,
  FolderIcon,
  MessagesIcon,
  NotesIcon,
  PhotosIcon,
  SettingsIcon,
  TerminalIcon,
  TrashIcon,
  WifiGlyph,
  BluetoothGlyph,
} from "@/components/download/os-icons"

function DockItem({
  children,
  label,
  active = false,
  featured = false,
}: {
  children: ReactNode
  label: string
  active?: boolean
  featured?: boolean
}) {
  return (
    <div className="group relative flex flex-col items-center">
      <span className="os-pill pointer-events-none absolute bottom-[calc(100%+18px)] z-20 whitespace-nowrap bg-black/88 px-2.5 py-1 font-body text-[11px] leading-none text-white opacity-0 shadow-[0_6px_18px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-150 group-hover:opacity-100">
        {label}
        <span
          aria-hidden
          className="absolute left-1/2 top-full -translate-x-1/2 border-x-[5px] border-t-[5px] border-x-transparent border-t-black/88"
        />
      </span>
      <div
        className={cn(
          "origin-bottom transition-transform duration-200 ease-out group-hover:-translate-y-1.5 group-hover:scale-110",
          featured && "scale-110",
        )}
      >
        {children}
      </div>
      <span
        className={cn(
          "os-dot mt-1 size-1 bg-black/75",
          active ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  )
}

function DockApp({
  src,
  label,
  fit = "cover",
  tile,
}: {
  src: string
  label: string
  fit?: "cover" | "contain"
  tile?: string
}) {
  return (
    <DockItem label={label}>
      <span
        className={cn(
          "os-squircle relative flex size-11 items-center justify-center overflow-hidden",
          tile ?? "bg-black/5",
        )}
      >
        {/* Decorative OS chrome — local SVG assets */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className={cn(
            "size-full",
            fit === "cover" ? "object-cover" : "object-contain p-1.5",
          )}
        />
      </span>
    </DockItem>
  )
}

function FocusGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden>
      <path d="M14.8 3.2A8.6 8.6 0 1 0 20.6 15 7 7 0 0 1 14.8 3.2Z" />
    </svg>
  )
}

function DisplayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden>
      <circle cx="12" cy="12" r="4.1" />
      <path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.6 5.6l1.5 1.5M16.9 16.9l1.5 1.5M5.6 18.4l1.5-1.5M16.9 7.1l1.5-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ControlButton({
  children,
  on = true,
}: {
  children: ReactNode
  on?: boolean
}) {
  return (
    <span
      className={cn(
        "os-dot flex size-7 items-center justify-center",
        on ? "bg-[#0a84ff] text-white" : "bg-white/16 text-white",
      )}
    >
      {children}
    </span>
  )
}

function BatteryGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden>
      <path d="M3.6 8.2h14.2a1.6 1.6 0 0 1 1.6 1.6v4.4a1.6 1.6 0 0 1-1.6 1.6H3.6A1.6 1.6 0 0 1 2 14.2V9.8a1.6 1.6 0 0 1 1.6-1.6Zm16.8 3.1h1.2v1.4h-1.2v-1.4ZM4.4 9.8v4.4h12.6V9.8H4.4Z" />
    </svg>
  )
}

function FinderTile({
  icon,
  label,
}: {
  icon: ReactNode
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {icon}
      <span className="max-w-full truncate font-body text-[10px] text-white/65">
        {label}
      </span>
    </div>
  )
}

function FinderImg({
  src,
  label,
  fit = "cover",
}: {
  src: string
  label: string
  fit?: "cover" | "contain"
}) {
  return (
    <FinderTile
      label={label}
      icon={
        <span className="os-squircle relative flex size-10 items-center justify-center overflow-hidden bg-[#2a2a2c]">
          {/* Decorative OS chrome — local SVG assets */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className={cn(
              "size-full",
              fit === "cover" ? "object-cover" : "object-contain p-1",
            )}
          />
        </span>
      }
    />
  )
}

function TextEditIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-white",
        className,
      )}
      aria-hidden
    >
      <span className="absolute inset-x-0 top-0 h-[22%] bg-[#e8e8ed]" />
      <span className="mt-2 h-[2px] w-[46%] bg-black/20" />
    </span>
  )
}

function SidebarRow({
  label,
  active = false,
}: {
  label: string
  active?: boolean
}) {
  return (
    <div
      className={cn(
        "px-2 py-[5px] font-body text-[11px]",
        active ? "os-row bg-white/14 text-white" : "text-white/50",
      )}
    >
      {label}
    </div>
  )
}

function FinderWindow() {
  return (
    <div className="os-window absolute left-[56px] top-[56px] z-20 flex h-[468px] w-[620px] overflow-hidden bg-[#1c1c1e]/92 text-white shadow-[0_24px_60px_rgba(0,0,0,0.38)] ring-1 ring-white/8 backdrop-blur-xl">
      <aside className="flex w-[156px] shrink-0 flex-col bg-black/25 px-2.5 pt-3.5">
        <div className="mb-5 flex items-center gap-1.5 px-1.5">
          <span className="os-dot size-[11px] bg-[#ff5f57]" />
          <span className="os-dot size-[11px] bg-[#febc2e]" />
          <span className="os-dot size-[11px] bg-[#28c840]" />
        </div>
        <p className="px-2 pb-1 font-body text-[9px] font-medium uppercase tracking-[0.14em] text-white/30">
          Favorites
        </p>
        <SidebarRow label="AirDrop" />
        <SidebarRow label="Applications" active />
        <SidebarRow label="Desktop" />
        <SidebarRow label="Documents" />
        <SidebarRow label="Downloads" />
        <p className="mt-3 px-2 pb-1 font-body text-[9px] font-medium uppercase tracking-[0.14em] text-white/30">
          Locations
        </p>
        <SidebarRow label="Macintosh HD" />
        <SidebarRow label="Network" />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-11 items-center justify-between px-4">
          <div className="flex items-center gap-3 font-body text-[13px] text-white/85">
            <span className="text-[15px] tracking-widest text-white/25">‹ ›</span>
            Applications
          </div>
          <div className="os-pill flex h-6 w-6 items-center justify-center bg-white/8">
            <Search className="size-3 text-white/45" />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-4 content-start gap-x-3 gap-y-6 px-7 py-5">
          <FinderTile
            label="Event Parlour"
            icon={<EventParlourMark className="size-10" inverted />}
          />
          <FinderImg src="/icons/safari.svg" label="Safari" />
          <FinderImg src="/icons/apple-mail.svg" label="Mail" />
          <FinderTile
            label="Messages"
            icon={<MessagesIcon className="size-10" />}
          />
          <FinderTile label="Notes" icon={<NotesIcon className="size-10" />} />
          <FinderTile
            label="Calendar"
            icon={<CalendarIcon className="size-10 text-[10px]" />}
          />
          <FinderTile label="Photos" icon={<PhotosIcon className="size-10" />} />
          <FinderTile
            label="Settings"
            icon={<SettingsIcon className="size-10" />}
          />
          <FinderTile
            label="Terminal"
            icon={<TerminalIcon className="size-10" />}
          />
          <FinderImg src="/icons/xcode.svg" label="Xcode" fit="contain" />
          <FinderImg src="/icons/figma.svg" label="Figma" fit="contain" />
          <FinderTile
            label="TextEdit"
            icon={<TextEditIcon className="size-10" />}
          />
        </div>
      </div>
    </div>
  )
}

function MacScene() {
  const now = useLocalClock()
  const dateLabel = now.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
  const timeLabel = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <div
      data-os-chrome
      data-os="mac"
      className="relative h-full w-full overflow-hidden bg-black"
    >
      <DesktopWallpaper />

      <div className="relative z-30 flex h-7 items-center justify-between bg-white/35 px-3.5 text-[11px] text-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <AppleLogo className="h-[12px] w-[10px] text-black" />
          <span className="font-semibold">Finder</span>
          <span className="text-black/50">File</span>
          <span className="text-black/50">Edit</span>
          <span className="text-black/50">View</span>
          <span className="text-black/50">Go</span>
          <span className="text-black/50">Window</span>
          <span className="text-black/50">Help</span>
        </div>
        <div className="flex items-center gap-2.5 text-black/60">
          <WifiGlyph className="size-3.5" />
          <BatteryGlyph className="size-3.5" />
          <span>{dateLabel}</span>
          <span className="text-black/80">{timeLabel}</span>
        </div>
      </div>

      <div className="absolute right-6 top-11 z-10 flex w-[196px] flex-col gap-2">
        <div className="os-widget grid grid-cols-2 gap-1.5 bg-black/55 p-2 text-white shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="os-tile flex flex-col items-center gap-1.5 bg-white/10 py-2.5">
            <ControlButton>
              <WifiGlyph className="size-3.5" />
            </ControlButton>
            <div className="flex h-6 flex-col items-center justify-center text-center leading-tight">
              <p className="text-[8px] font-medium text-white/90">Wi‑Fi</p>
              <p className="text-[8px] text-white/45">Connected</p>
            </div>
          </div>
          <div className="os-tile flex flex-col items-center gap-1.5 bg-white/10 py-2.5">
            <ControlButton>
              <BluetoothGlyph className="size-3.5" />
            </ControlButton>
            <div className="flex h-6 flex-col items-center justify-center text-center leading-tight">
              <p className="text-[8px] font-medium text-white/90">Bluetooth</p>
              <p className="text-[8px] text-white/45">On</p>
            </div>
          </div>
          <div className="os-tile flex flex-col items-center gap-1.5 bg-white/10 py-2.5">
            <ControlButton>
              <FocusGlyph className="size-3.5" />
            </ControlButton>
            <div className="flex h-6 flex-col items-center justify-center text-center leading-tight">
              <p className="text-[8px] font-medium text-white/90">Focus</p>
              <p className="text-[8px] text-white/45">On</p>
            </div>
          </div>
          <div className="os-tile flex flex-col items-center gap-1.5 bg-white/10 px-2 py-2.5">
            <ControlButton>
              <DisplayGlyph className="size-3.5" />
            </ControlButton>
            <div className="flex h-6 w-full items-center px-0.5">
              <span className="os-pill h-1 w-full bg-white/20">
                <span className="os-pill block h-full w-[70%] bg-white" />
              </span>
            </div>
          </div>
        </div>
        <div className="os-widget flex items-center gap-2.5 bg-black/55 px-2.5 py-2 text-white shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <span className="os-squircle relative size-8 shrink-0 overflow-hidden">
            {/* Decorative OS chrome — local SVG assets */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/apple-music.svg"
              alt=""
              className="size-full object-cover"
            />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-body text-[11px] font-medium">
              Billie Jean
            </p>
            <p className="truncate text-[9px] text-white/45">Michael Jackson</p>
          </div>
          <div className="flex h-4 items-end gap-[3px] pr-0.5" aria-hidden>
            <span className="os-eq-bar os-pill w-[2px] bg-white/80" style={{ height: 10 }} />
            <span className="os-eq-bar os-pill w-[2px] bg-white/80" style={{ height: 16 }} />
            <span className="os-eq-bar os-pill w-[2px] bg-white/80" style={{ height: 12 }} />
          </div>
        </div>
      </div>

      <div className="absolute right-5 top-[318px] z-10 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-1">
          <DriveIcon className="size-10" />
          <span className="font-body text-[9px] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            Macintosh HD
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FolderIcon className="size-10" />
          <span className="font-body text-[9px] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            Projects
          </span>
        </div>
      </div>

      <FinderWindow />

      <div className="absolute inset-x-0 bottom-2.5 z-30 flex justify-center">
        <div className="os-dock flex items-end gap-3 bg-white/50 px-4 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
          <DockItem label="Finder">
            <FinderIcon className="size-11 text-black" />
          </DockItem>
          <span className="mb-3 h-8 w-px bg-black/15" />
          <DockItem label="Event Parlour" active featured>
            <EventParlourMark className="size-11" />
          </DockItem>
          <DockApp src="/icons/apple-mail.svg" label="Mail" />
          <DockApp
            src="/icons/xcode.svg"
            label="Xcode"
            fit="contain"
            tile="bg-white"
          />
          <DockApp src="/icons/apple-music.svg" label="Music" />
          <DockApp src="/icons/apple-podcasts.svg" label="Podcasts" />
          <DockApp src="/icons/apple-tv.svg" label="TV" />
          <DockApp
            src="/icons/figma.svg"
            label="Figma"
            fit="contain"
            tile="bg-[#1e1e1e]"
          />
          <span className="mb-3 h-8 w-px bg-black/15" />
          <DockItem label="Trash">
            <TrashIcon className="size-11" />
          </DockItem>
        </div>
      </div>
    </div>
  )
}

export function MacDesktop({ className }: { className?: string }) {
  return (
    <div className={className}>
      <OsScaleFrame>
        <MacScene />
      </OsScaleFrame>
    </div>
  )
}
