"use client"

import NumberFlow from "@number-flow/react"
import {
  Bell,
  Calendar,
  ChartSpline,
  CheckCircle2,
  ClipboardList,
  LayoutPanelTop,
  Map,
  Megaphone,
  MessageSquare,
  Mic,
  PartyPopper,
  Search,
  Settings,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { EventParlourLogoIcon } from "@/components/download/os-icons"
import { useLocalClock } from "@/components/download/use-local-clock"
import {
  mockRecentActivity,
  mockUpcomingEvents,
} from "@/components/demo/mockData"

const NAV = [
  { id: "dashboard", icon: LayoutPanelTop },
  { id: "events", icon: PartyPopper },
  { id: "hangouts", icon: Map },
  { id: "tickets", icon: Ticket },
  { id: "team", icon: Users },
  { id: "announcements", icon: Megaphone },
  { id: "community", icon: MessageSquare },
  { id: "speakers", icon: Mic },
  { id: "forms", icon: ClipboardList },
  { id: "analytics", icon: ChartSpline },
  { id: "settings", icon: Settings },
] as const

const STATS = [
  {
    id: "events",
    title: "Total Events",
    value: 12,
    caption: "12 events",
    icon: Calendar,
    spark: [4, 5, 6, 7, 8, 10, 12],
  },
  {
    id: "checkin",
    title: "Check-in",
    value: 50,
    suffix: "%",
    caption: "1,225 of 2,450 in · all time",
    icon: CheckCircle2,
    spark: [18, 22, 28, 31, 36, 44, 50],
  },
  {
    id: "tickets",
    title: "Tickets Sold",
    value: 2450,
    caption: "+15 free registrations",
    icon: Ticket,
    spark: [820, 1100, 1400, 1680, 1910, 2200, 2450],
  },
  {
    id: "revenue",
    title: "Revenue",
    value: 8.2,
    prefix: "KES ",
    suffix: "M",
    caption: "From 245 purchases",
    icon: TrendingUp,
    spark: [1.2, 2.1, 3.4, 4.6, 5.8, 7.1, 8.2],
  },
] as const

function greetingFor(now: Date) {
  const hour = now.getHours()
  if (hour >= 5 && hour < 12) return "Good morning"
  if (hour >= 12 && hour < 17) return "Good afternoon"
  return "Good evening"
}

function Sparkline({
  data,
  gradientId,
}: {
  data: readonly number[]
  gradientId: string
}) {
  const min = Math.min(...data, 0)
  const max = Math.max(...data)
  const span = max - min || 1
  const width = 120
  const height = 32
  const coords = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = 2 + (1 - (value - min) / span) * (height - 4)
    return [x, y] as const
  })
  const line = coords
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ")
  const area = `${line} L${width} ${height} L0 ${height} Z`
  const rising = (data[data.length - 1] ?? 0) >= (data[0] ?? 0)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn(
        "mt-3 h-8 w-full",
        rising ? "text-green-400" : "text-red-400",
      )}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function OrganizerSidebar() {
  return (
    <aside className="absolute inset-y-0 left-0 z-20 flex w-[72px] flex-col overflow-hidden border-r border-border bg-background">
      <div className="flex h-16 shrink-0 items-center px-3">
        <div className="os-row mx-auto flex size-10 items-center justify-center border border-border bg-background p-2">
          <EventParlourLogoIcon className="size-5" />
        </div>
      </div>

      <nav className="min-h-0 flex-1 overflow-hidden px-3 pt-6" aria-hidden>
        <div className="flex flex-col gap-3">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = item.id === "dashboard"
            return (
              <div
                key={item.id}
                className={cn(
                  "os-row mx-auto flex size-10 items-center justify-center border border-transparent",
                  active
                    ? "border-border bg-accent text-foreground"
                    : "text-muted-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-5 shrink-0",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                  strokeWidth={1.75}
                />
              </div>
            )
          })}
        </div>
      </nav>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent"
      />
    </aside>
  )
}

export function OrganizerAppPreview() {
  const now = useLocalClock()
  const greeting = greetingFor(now)
  const dateLabel = now.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="dark relative flex h-full min-h-0 overflow-hidden bg-black text-white [--accent:#1a1a1a] [--background:#000000] [--border:#ffffff1f] [--card:#141414] [--foreground:#ffffff] [--muted:#1a1a1a] [--muted-foreground:#a3a3a3] [--primary:#ffffff] [--primary-foreground:#000000]">
      <OrganizerSidebar />

      <div className="ml-[72px] flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-background/95 px-6">
          <div className="relative flex h-9 w-64 items-center border border-border bg-background px-3 font-body text-sm text-muted-foreground">
            <Search className="mr-2 size-[18px] shrink-0" strokeWidth={1.75} />
            <span className="truncate">Find anything...</span>
            <kbd className="absolute top-1.5 right-1.5 hidden h-5 items-center border border-border bg-muted px-1.5 font-mono text-[10px] sm:flex">
              Ctrl K
            </kbd>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-xs text-muted-foreground">
              {dateLabel}
            </span>
            <span className="relative flex size-8 items-center justify-center text-muted-foreground">
              <Bell className="size-4" strokeWidth={1.75} />
              <span className="os-dot absolute right-1.5 top-1.5 size-1.5 bg-foreground" />
            </span>
            {/* Decorative OS chrome — local avatar */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatars/olivebishop.png"
              alt=""
              className="os-dot size-8 object-cover"
            />
          </div>
        </header>

        <div className="relative min-h-0 flex-1 overflow-hidden px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-[22px] font-medium tracking-tight">
                <span className="text-muted-foreground">{greeting}</span>
                {", Phelix"}
              </h1>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                Here&apos;s what&apos;s happening with Blackie Labs
              </p>
            </div>
            <span className="os-row inline-flex shrink-0 items-center gap-1.5 border border-border bg-background px-3 py-1.5 font-body text-xs font-medium">
              <Megaphone className="size-4 text-primary" strokeWidth={1.75} />
              Broadcast
            </span>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-3">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.id}
                  className="flex flex-col bg-card px-4 pb-4 pt-4 ring-1 ring-white/10"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-body text-xs font-medium sm:text-sm">
                      {stat.title}
                    </p>
                    <Icon
                      className="size-4 text-muted-foreground"
                      strokeWidth={1.75}
                    />
                  </div>
                  <NumberFlow
                    value={stat.value}
                    prefix={"prefix" in stat ? stat.prefix : undefined}
                    suffix={"suffix" in stat ? stat.suffix : undefined}
                    format={{
                      maximumFractionDigits: stat.id === "revenue" ? 1 : 0,
                      useGrouping: true,
                    }}
                    className="mt-2 font-numbers text-2xl font-bold tracking-tight"
                  />
                  <p className="mt-1 font-body text-[10px] text-muted-foreground sm:text-xs">
                    {stat.caption}
                  </p>
                  <Sparkline
                    data={stat.spark}
                    gradientId={`ep-stat-spark-${stat.id}`}
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-5 grid grid-cols-7 gap-4">
            <section className="col-span-4 border border-border bg-card px-5 pt-5">
              <h3 className="font-heading text-base font-semibold">
                Recent Activity
              </h3>
              <p className="mt-0.5 font-body text-xs text-muted-foreground">
                Recent ticket sales and registrations
              </p>
              <div className="mt-4 space-y-3">
                {mockRecentActivity.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="os-dot flex size-10 shrink-0 items-center justify-center bg-primary/10">
                      <Ticket className="size-5 text-primary" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-body text-sm font-medium">
                        {item.userName} • {item.eventTitle}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {item.type === "ticket_purchase"
                          ? `Purchased ${item.quantity} ticket${item.quantity === 1 ? "" : "s"}`
                          : "Registered for free event"}
                        {" • "}
                        {item.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="shrink-0 font-body text-sm font-medium">
                      {item.price > 0
                        ? `KES ${item.price.toLocaleString()}`
                        : "Free"}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="col-span-3 border border-border bg-card px-5 pt-5">
              <h3 className="font-heading text-base font-semibold">
                Upcoming Events
              </h3>
              <p className="mt-0.5 font-body text-xs text-muted-foreground">
                Your scheduled events
              </p>
              <div className="mt-4 space-y-3">
                {mockUpcomingEvents.slice(0, 2).map((event) => (
                  <div key={event.id}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 truncate font-body text-sm font-medium">
                        {event.title}
                      </p>
                      <span className="shrink-0 border border-border px-1.5 py-0.5 font-body text-[10px]">
                        {event.status}
                      </span>
                    </div>
                    <p className="mt-0.5 font-body text-xs text-muted-foreground">
                      {event.startDate.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                      {" • "}
                      {event.startDate.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="truncate font-body text-xs text-muted-foreground">
                      {event.venue}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
