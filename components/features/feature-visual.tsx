"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import NumberFlow, { NumberFlowGroup } from "@number-flow/react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  BarChart3,
  Bell,
  CreditCard,
  Instagram,
  LayoutGrid,
  MapPin,
  MessageCircle,
  MessageSquare,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react"
import { encode as encodeQr } from "uqr"
import { BrandGrainOverlay } from "@/components/grain-overlay"
import { APP_URL } from "@/lib/app-url"
import { cn } from "@/lib/utils"

const COLLAB = {
  olivebishop: {
    name: "olivebishop",
    src: "/images/avatars/olivebishop.png",
    initials: "OB",
  },
  blackie: {
    name: "blackie",
    src: "/images/avatars/blackie.png",
    initials: "BK",
  },
} as const

function Face({
  src,
  alt,
  size = 20,
  ring = "ring-background",
}: {
  src: string
  alt: string
  size?: number
  ring?: string
}) {
  return (
    <span
      data-allow-radius
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-muted ring-2",
        ring,
      )}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes={`${size}px`} />
    </span>
  )
}

/** Mini product chrome matching apps/web dashboard (sidebar + header). */
function AppChrome({
  children,
  title,
  trailing,
}: {
  children: React.ReactNode
  title: React.ReactNode
  trailing?: React.ReactNode
}) {
  return (
    <div className="flex h-full w-full max-w-lg overflow-hidden border border-border bg-background text-foreground shadow-none">
      <aside className="hidden w-11 shrink-0 flex-col border-r border-border bg-background sm:flex sm:w-12">
        <div className="flex h-10 items-center justify-center border-b border-border sm:h-11">
          <span className="flex size-6 items-center justify-center border border-border bg-background font-heading text-[9px] font-bold sm:size-7 sm:text-[10px]">
            EP
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 py-2">
          {[LayoutGrid, Ticket, MessageSquare, BarChart3].map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "flex size-7 items-center justify-center sm:size-8",
                i === 0 ? "bg-foreground text-background" : "text-foreground/50",
              )}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
          ))}
        </div>
        <div className="flex justify-center border-t border-border py-2">
          <Face
            src={COLLAB.olivebishop.src}
            alt=""
            size={22}
            ring="ring-border"
          />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-10 items-center justify-between gap-2 border-b border-border px-2 sm:h-11 sm:px-3">
          <span className="truncate font-body text-xs font-medium">{title}</span>
          <div className="flex shrink-0 items-center gap-1.5">{trailing}</div>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

export type FeatureVisualKey =
  | "distribution"
  | "workspace"
  | "pricing"
  | "tickets-and-channels"
  | "community"
  | "analytics"

/** Map platform pillar slugs (/features/[slug]) to a designed layout.
 *  Organizer/attendee hub pages use images — do not alias those slugs here. */
export function resolveFeatureVisualKey(
  slug?: string,
): FeatureVisualKey | null {
  if (!slug) return null
  const map: Record<string, FeatureVisualKey> = {
    distribution: "distribution",
    workspace: "workspace",
    pricing: "pricing",
    "tickets-and-channels": "tickets-and-channels",
    community: "community",
    analytics: "analytics",
  }
  return map[slug] ?? null
}

function Stage({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full max-h-[22rem] overflow-hidden border border-border bg-muted/40 sm:max-h-none sm:aspect-[4/3]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      />
      <BrandGrainOverlay fixed={false} intensity="subtle" className="z-[1]" />
      <div className="relative z-[2] flex h-full items-center justify-center p-2 xs:p-3 sm:p-5 md:p-8">
        {children}
      </div>
    </div>
  )
}

function Panel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "w-full max-w-md border border-border bg-background text-foreground shadow-none",
        className,
      )}
    >
      {children}
    </div>
  )
}

function LiveDot({ label = "Live" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-body text-[10px] uppercase tracking-wider text-foreground/70">
      <span
        className="h-1.5 w-1.5 bg-foreground motion-safe:animate-pulse"
        aria-hidden
      />
      {label}
    </span>
  )
}

const DISTRIBUTION_EVENTS = [
  {
    title: "Afrobeats Night",
    place: "Nairobi",
    when: "Tonight · 8:00 PM",
    status: "840 interested",
    image: "/images/dummy/one.jpg",
  },
  {
    title: "Dev Summit",
    place: "Westlands",
    when: "Sat · 9:00 AM",
    status: "Early bird",
    image: "/images/dummy/three.jpg",
  },
  {
    title: "Gallery Walk",
    place: "CBD",
    when: "Sun · All day",
    status: "Free RSVP",
    image: "/images/dummy/five.jpg",
  },
  {
    title: "Afrobeats Night",
    place: "Nairobi",
    when: "Tonight · 8:00 PM",
    status: "910 interested",
    image: "/images/dummy/eight.jpg",
  },
  {
    title: "Dev Summit",
    place: "Westlands",
    when: "Sat · 9:00 AM",
    status: "Almost gone",
    image: "/images/dummy/four.jpg",
  },
  {
    title: "Gallery Walk",
    place: "CBD",
    when: "Sun · All day",
    status: "Free RSVP",
    image: "/images/dummy/six.jpg",
  },
] as const

function DistributionEventRow({
  title,
  place,
  when,
  status,
  image,
}: {
  title: string
  place: string
  when: string
  status: string
  image: string
}) {
  return (
    <li className="flex h-[3.75rem] shrink-0 items-center gap-2.5 border-b border-border bg-background px-2.5 sm:gap-3 sm:px-3">
      <span className="relative h-10 w-10 shrink-0 overflow-hidden border border-border bg-black sm:h-11 sm:w-11">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="44px"
        />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-heading text-[13px] font-semibold tracking-tight sm:text-sm">
            {title}
          </p>
          <span className="max-w-[42%] shrink-0 truncate border border-border bg-foreground px-1.5 py-0.5 font-body text-[9px] font-medium uppercase tracking-wide text-background sm:max-w-[48%] md:max-w-none">
            {status}
          </span>
        </div>
        <p className="mt-0.5 truncate font-body text-[11px] text-foreground/55">
          <span className="text-foreground/75">{place}</span>
          <span className="mx-1 text-foreground/30">·</span>
          <span className="font-numbers tabular-nums">{when}</span>
        </p>
      </div>
    </li>
  )
}

function DistributionVisual() {
  const reduce = useReducedMotion()
  const scrollItems = [...DISTRIBUTION_EVENTS, ...DISTRIBUTION_EVENTS]

  return (
    <Stage>
      <div className="h-full w-full max-w-lg">
        <AppChrome title="Discover events" trailing={<LiveDot label="Feed" />}>
          <div className="flex h-full flex-col">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="shrink-0 border-b border-amber-500/30 bg-amber-500/5 px-3 py-2.5"
            >
              <div className="mb-1 flex items-center gap-1.5 font-body text-[10px] font-medium uppercase tracking-wider text-foreground/70">
                <Bell className="h-3 w-3" aria-hidden />
                Updates from the organizer
              </div>
              <p className="font-body text-xs font-semibold">Doors open 7pm</p>
              <p className="mt-0.5 font-body text-[11px] leading-snug text-foreground/75">
                Lineup drop in 20 minutes — don&apos;t miss it.
              </p>
            </motion.div>
            <div className="relative min-h-0 flex-1 overflow-hidden">
              {reduce ? (
                <ul>
                  {DISTRIBUTION_EVENTS.slice(0, 3).map((item, i) => (
                    <DistributionEventRow
                      key={`${item.title}-${item.status}-${i}`}
                      title={item.title}
                      place={item.place}
                      when={item.when}
                      status={item.status}
                      image={item.image}
                    />
                  ))}
                </ul>
              ) : (
                <motion.ul
                  aria-hidden
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    duration: 12,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {scrollItems.map((item, i) => (
                    <DistributionEventRow
                      key={`${item.title}-${item.status}-${i}`}
                      title={item.title}
                      place={item.place}
                      when={item.when}
                      status={item.status}
                      image={item.image}
                    />
                  ))}
                </motion.ul>
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-background to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-background to-transparent"
              />
            </div>
          </div>
        </AppChrome>
      </div>
    </Stage>
  )
}

function CollabCursor({
  person,
  invert = false,
  reduce,
  path,
}: {
  person: (typeof COLLAB)[keyof typeof COLLAB]
  invert?: boolean
  reduce: boolean | null
  /** Percent positions within the canvas (0–100). */
  path: { left: string[]; top: string[]; duration: number }
}) {
  return (
    <motion.div
      className="pointer-events-none absolute z-20"
      style={{ left: path.left[0], top: path.top[0] }}
      initial={false}
      animate={
        reduce
          ? { left: path.left[0], top: path.top[0] }
          : { left: path.left, top: path.top }
      }
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: path.duration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }
      }
      aria-hidden
    >
      <svg width="16" height="20" viewBox="0 0 18 22" fill="none">
        <path
          d="M1 1L1 17.5L5.2 13.8L8.4 20.2L11.2 19L8 12.5L13.5 12.5L1 1Z"
          className={
            invert
              ? "fill-background stroke-foreground"
              : "fill-foreground stroke-background"
          }
          strokeWidth="1"
        />
      </svg>
      <span
        className={cn(
          "ml-3.5 -mt-1 inline-flex max-w-[5.5rem] items-center gap-1 truncate py-0.5 pl-0.5 pr-1.5 font-body text-[10px] font-medium leading-none sm:max-w-none sm:whitespace-nowrap sm:overflow-visible",
          invert
            ? "border border-foreground bg-background text-foreground"
            : "bg-foreground text-background",
        )}
      >
        <Face
          src={person.src}
          alt=""
          size={14}
          ring={invert ? "ring-foreground/25" : "ring-background/50"}
        />
        <span className="truncate">{person.name}</span>
      </span>
    </motion.div>
  )
}

const WORKSPACE_MEMBERS = [
  {
    id: "olivebishop",
    person: COLLAB.olivebishop,
    role: "OWNER",
    you: true,
    idle: "Online",
    active: "Editing event title",
    cursorPath: {
      left: ["18%", "32%", "24%", "18%"],
      top: ["28%", "34%", "40%", "28%"],
      duration: 5.5,
    },
  },
  {
    id: "blackie",
    person: COLLAB.blackie,
    role: "ADMIN",
    you: false,
    idle: "Online",
    active: "Editing VIP tier",
    cursorPath: {
      left: ["48%", "62%", "55%", "48%"],
      top: ["52%", "58%", "64%", "52%"],
      duration: 4.2,
    },
  },
] as const

function WorkspaceVisual() {
  const reduce = useReducedMotion()
  const [selectedId, setSelectedId] =
    useState<(typeof WORKSPACE_MEMBERS)[number]["id"]>("olivebishop")
  const [invited, setInvited] = useState(false)

  const activeCount = invited ? 3 : 2
  const selected = WORKSPACE_MEMBERS.find((m) => m.id === selectedId) ?? WORKSPACE_MEMBERS[0]

  return (
    <Stage>
      <div className="relative h-full w-full max-w-lg">
        <AppChrome
          title="Workspace · Members"
          trailing={
            <span className="flex -space-x-1.5">
              <Face src={COLLAB.olivebishop.src} alt="olivebishop" size={20} />
              <Face src={COLLAB.blackie.src} alt="blackie" size={20} />
            </span>
          }
        >
          <div className="relative flex h-full flex-col">
            <div className="border-b border-border bg-muted/30 px-2.5 py-2 sm:px-3">
              <p className="font-body text-[9px] uppercase tracking-wider text-foreground/55">
                Storefront
              </p>
              <p className="mt-0.5 truncate font-numbers text-[11px] tabular-nums sm:text-xs">
                olive.eventparlour.com
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 border-b border-border px-2.5 py-1.5 sm:px-3">
              <span className="font-body text-[10px] text-foreground/60">
                Team · {activeCount} {invited ? "· 1 pending" : "active"}
              </span>
              <button
                type="button"
                onClick={() => setInvited(true)}
                disabled={invited}
                className={cn(
                  "inline-flex items-center gap-1 border px-1.5 py-0.5 font-body text-[10px] transition-colors",
                  invited
                    ? "cursor-default border-border bg-muted text-foreground/50"
                    : "border-foreground bg-foreground text-background hover:bg-foreground/90",
                )}
              >
                <Users className="h-3 w-3" aria-hidden />
                {invited ? "Invited" : "Invite"}
              </button>
            </div>

            <ul
              className="relative z-10 flex-1 divide-y divide-border overflow-hidden"
              aria-label="Workspace members"
            >
              {WORKSPACE_MEMBERS.map((m, i) => {
                const isSelected = m.id === selectedId
                return (
                  <motion.li
                    key={m.person.name}
                    initial={reduce ? false : { opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + i * 0.08, duration: 0.3 }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(m.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 px-2.5 py-2.5 text-left transition-colors sm:px-3",
                        isSelected
                          ? "bg-foreground/[0.06] ring-1 ring-inset ring-foreground/25"
                          : "hover:bg-muted/50",
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <Face src={m.person.src} alt="" size={28} />
                        <span className="min-w-0">
                          <span className="block truncate font-body text-xs font-medium sm:text-sm">
                            {m.person.name}
                            {m.you ? (
                              <span className="text-foreground/45"> · you</span>
                            ) : null}
                          </span>
                          <span className="font-body text-[10px] text-foreground/55">
                            {isSelected ? m.active : m.idle}
                          </span>
                        </span>
                      </span>
                      <span
                        className={cn(
                          "shrink-0 border px-1.5 py-0.5 font-body text-[9px] uppercase tracking-wide",
                          isSelected
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-foreground/70",
                        )}
                      >
                        {m.role}
                      </span>
                    </button>
                  </motion.li>
                )
              })}

              <AnimatePresence initial={false}>
                {invited ? (
                  <motion.li
                    key="pending"
                    initial={reduce ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={reduce ? undefined : { opacity: 0, height: 0 }}
                    className="flex items-center justify-between gap-2 border-t border-border bg-muted/20 px-2.5 py-2.5 sm:px-3"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-full border border-dashed border-border font-body text-[10px] text-foreground/50">
                        +
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-body text-xs font-medium">
                          alex@studio.co
                        </span>
                        <span className="font-body text-[10px] text-foreground/55">
                          Invite sent
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 border border-border px-1.5 py-0.5 font-body text-[9px] uppercase tracking-wide text-foreground/60">
                      Pending
                    </span>
                  </motion.li>
                ) : (
                  <motion.li
                    key="invite-row"
                    initial={false}
                    className="border-t border-dashed border-border"
                  >
                    <button
                      type="button"
                      onClick={() => setInvited(true)}
                      className="flex w-full items-center gap-2 px-2.5 py-2.5 text-left text-foreground/60 transition-colors hover:bg-muted/40 hover:text-foreground sm:px-3"
                    >
                      <span className="flex size-7 items-center justify-center rounded-full border border-dashed border-border">
                        <Users className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="font-body text-xs">Invite teammate…</span>
                    </button>
                  </motion.li>
                )}
              </AnimatePresence>
            </ul>

            <div className="pointer-events-none absolute inset-0 top-14 z-[5]">
              <CollabCursor
                key={selected.id}
                person={selected.person}
                invert={selected.id === "blackie"}
                reduce={reduce}
                path={selected.cursorPath}
              />
            </div>
          </div>
        </AppChrome>
      </div>
    </Stage>
  )
}

const PRICING_TIERS = [
  { id: "ga", label: "GA", price: 800 },
  { id: "early", label: "Early bird", price: 1200 },
  { id: "vip", label: "VIP", price: 2500 },
] as const

const PLATFORM_FEE = 0.05

function PricingVisual() {
  const reduce = useReducedMotion()
  const [tierId, setTierId] = useState<(typeof PRICING_TIERS)[number]["id"]>("vip")
  const tier = PRICING_TIERS.find((t) => t.id === tierId) ?? PRICING_TIERS[2]
  const keep = Math.round(tier.price * (1 - PLATFORM_FEE))
  const fee = tier.price - keep

  return (
    <Stage>
      <Panel className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-3 py-2.5 sm:px-4">
          <span className="flex items-center gap-2 font-body text-xs font-medium">
            <CreditCard className="h-3.5 w-3.5" aria-hidden />
            Split payment
          </span>
          <span className="border border-border bg-foreground px-1.5 py-0.5 font-numbers text-[10px] font-medium tabular-nums text-background">
            5% fee
          </span>
        </div>
        <div className="space-y-3 p-3 sm:p-4">
          <div>
            <p className="mb-1.5 font-body text-[10px] uppercase tracking-wider text-foreground/55">
              Pick a ticket
            </p>
            <div
              className="grid grid-cols-1 gap-1.5 sm:grid-cols-3"
              role="tablist"
              aria-label="Ticket tiers"
            >
              {PRICING_TIERS.map((t) => {
                const selected = t.id === tierId
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setTierId(t.id)}
                    className={cn(
                      "min-w-0 border px-2 py-2 text-left transition-colors",
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-foreground hover:bg-muted",
                    )}
                  >
                    <span className="block truncate font-body text-[11px] font-medium sm:text-xs">
                      {t.label}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block font-numbers text-[10px] tabular-nums",
                        selected ? "text-background/75" : "text-foreground/55",
                      )}
                    >
                      KES {t.price.toLocaleString("en-KE")}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <NumberFlowGroup>
            <div className="flex items-center justify-between gap-2 border border-border bg-muted/30 px-2.5 py-2">
              <span className="font-body text-sm">
                Ticket ·{" "}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={tier.id}
                    initial={reduce ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block font-medium"
                  >
                    {tier.label}
                  </motion.span>
                </AnimatePresence>
              </span>
              <NumberFlow
                value={tier.price}
                locales="en-KE"
                format={{ useGrouping: true }}
                prefix="KES "
                className="font-numbers text-base font-semibold tabular-nums [line-height:0.85]"
                animated={!reduce}
              />
            </div>

            <div className="h-2.5 w-full overflow-hidden border border-border bg-muted">
              <motion.div
                key={tier.id}
                className="h-full bg-foreground"
                initial={reduce ? { width: "95%" } : { width: "0%" }}
                animate={{ width: "95%" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="border border-border bg-muted/40 px-3 py-2.5">
                <p className="font-body text-[10px] uppercase tracking-wider text-foreground/60">
                  You keep
                </p>
                <NumberFlow
                  value={0.95}
                  format={{ style: "percent", maximumFractionDigits: 0 }}
                  className="mt-1 block font-numbers text-lg font-semibold tabular-nums [line-height:0.85]"
                  animated={!reduce}
                />
                <NumberFlow
                  value={keep}
                  locales="en-KE"
                  format={{ useGrouping: true }}
                  prefix="KES "
                  className="mt-0.5 block font-numbers text-sm tabular-nums text-foreground/70 [line-height:0.85]"
                  animated={!reduce}
                />
              </div>
              <div className="border border-border bg-background px-3 py-2.5">
                <p className="font-body text-[10px] uppercase tracking-wider text-foreground/60">
                  Platform
                </p>
                <NumberFlow
                  value={PLATFORM_FEE}
                  format={{ style: "percent", maximumFractionDigits: 0 }}
                  className="mt-1 block font-numbers text-lg font-semibold tabular-nums [line-height:0.85]"
                  animated={!reduce}
                />
                <NumberFlow
                  value={fee}
                  locales="en-KE"
                  format={{ useGrouping: true }}
                  prefix="KES "
                  className="mt-0.5 block font-numbers text-sm tabular-nums text-foreground/70 [line-height:0.85]"
                  animated={!reduce}
                />
              </div>
            </div>
          </NumberFlowGroup>
        </div>
      </Panel>
    </Stage>
  )
}

/** Real scannable QR — opens the Event Parlour app. */
function EntryQrMark({
  className,
  value = APP_URL,
}: {
  className?: string
  value?: string
}) {
  const qr = encodeQr(value)
  const size = qr.size

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={cn("text-black dark:text-foreground", className)}
      role="img"
      aria-label={`QR code linking to ${value}`}
    >
      <rect width={size} height={size} fill="white" className="dark:fill-background" />
      {qr.data.map((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
          ) : null,
        ),
      )}
    </svg>
  )
}

const CHANNEL_POST = {
  text: "Doors at 6:30 · show your QR at Gate B.",
  time: "6:12 PM",
  reactions: [
    { emoji: "🔥", count: 24 },
    { emoji: "🙌", count: 12 },
    { emoji: "✅", count: 8 },
  ],
} as const

const CHAT_EASE = [0.16, 1, 0.3, 1] as const

/** WhatsApp-style verified channel badge — blue disc + white check. */
function WaVerifiedBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("shrink-0", className)}
      aria-label="Verified"
      role="img"
    >
      <circle cx="8" cy="8" r="8" fill="#27a6e5" />
      <path
        d="M4.35 8.15 6.9 10.6l4.85-5.05"
        fill="none"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WaTypingIndicator({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.35, ease: CHAT_EASE }}
      className="flex items-start gap-1.5"
      aria-label="blackie-labs is typing"
    >
      <Face
        src={COLLAB.blackie.src}
        alt=""
        size={24}
        ring="ring-transparent"
      />
      <div className="relative max-w-[95%]">
        <span
          aria-hidden
          className="absolute left-0 top-0 z-[1] block h-0 w-0 border-y-[6px] border-r-[7px] border-y-transparent border-r-border"
        />
        <span
          aria-hidden
          className="absolute left-[1px] top-0 z-[2] block h-0 w-0 border-y-[6px] border-r-[7px] border-y-transparent border-r-background"
        />
        <div className="relative ml-[6px] flex items-center gap-1 rounded-[8px] rounded-tl-[2px] border border-border bg-background px-3 py-2.5 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              data-allow-radius
              className="inline-block size-1.5 rounded-full bg-foreground/35"
              animate={
                reduce
                  ? undefined
                  : { y: [0, -3, 0], opacity: [0.35, 1, 0.35] }
              }
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function WaChannelBubble({
  name,
  text,
  time,
  reactions,
  showName,
  showReactions,
  reduce,
}: {
  name: string
  text: string
  time: string
  reactions?: readonly { emoji: string; count: number }[] | null
  showName?: boolean
  showReactions?: boolean
  reduce: boolean | null
}) {
  return (
    <div className="relative max-w-[95%]">
      {/* Tail — bordered chat pointer */}
      <span
        aria-hidden
        className="absolute left-0 top-0 z-[1] block h-0 w-0 border-y-[6px] border-r-[7px] border-y-transparent border-r-border"
      />
      <span
        aria-hidden
        className="absolute left-[1px] top-0 z-[2] block h-0 w-0 border-y-[6px] border-r-[7px] border-y-transparent border-r-background"
      />

      <div className="relative ml-[6px] overflow-visible rounded-[8px] rounded-tl-[2px] border border-border bg-background px-2.5 pb-1.5 pt-1.5 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
        {showName ? (
          <p className="mb-0.5 font-body text-[11px] font-semibold leading-tight text-emerald-700 dark:text-emerald-400">
            {name}
          </p>
        ) : null}

        <p className="whitespace-pre-wrap break-words font-body text-[12.5px] leading-[1.35] text-foreground">
          {text}
        </p>

        <div className="mt-1 flex items-center justify-end">
          <span className="font-numbers text-[10px] tabular-nums text-foreground/45">
            {time}
          </span>
        </div>

        <AnimatePresence>
          {showReactions && reactions?.length ? (
            <motion.div
              key="reactions"
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: CHAT_EASE }}
              className="absolute bottom-1 right-2 z-[3] translate-y-0 sm:bottom-0 sm:translate-y-1/2"
            >
              <div
                data-allow-radius
                className="inline-flex items-center gap-px rounded-full border border-border bg-background px-1 py-px shadow-[0_1px_2px_rgba(11,20,26,0.12)]"
              >
                {reactions.map((reaction, i) => (
                  <motion.span
                    key={reaction.emoji}
                    initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: reduce ? 0 : 0.08 + i * 0.12,
                      duration: 0.4,
                      ease: CHAT_EASE,
                    }}
                    className="inline-flex items-center gap-px"
                  >
                    <span className="text-[9px] leading-none">
                      {reaction.emoji}
                    </span>
                    <span className="font-numbers text-[8px] font-medium tabular-nums text-foreground/55">
                      {reaction.count}
                    </span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

function TicketsChannelsVisual() {
  const reduce = useReducedMotion()
  /** One-shot: 1 typing → 2 first msg → 3 reactions → 4 typing (stays) */
  const [phase, setPhase] = useState(reduce ? 4 : 1)

  useEffect(() => {
    if (reduce) {
      setPhase(4)
      return
    }
    if (phase >= 4) return

    const holdMs = phase === 1 ? 1200 : phase === 2 ? 800 : 1000

    const timer = window.setTimeout(() => {
      setPhase((p) => p + 1)
    }, holdMs)

    return () => window.clearTimeout(timer)
  }, [phase, reduce])

  const showTypingFirst = !reduce && phase === 1
  const showFirst = reduce || phase >= 2
  const showReactions = reduce || phase >= 3
  const showTypingEnd = !reduce && phase >= 4

  return (
    <Stage>
      <div className="h-full w-full max-w-lg">
        <AppChrome
          title={
            <>
              <span className="sm:hidden">Channels</span>
              <span className="hidden sm:inline">Tickets · Channels</span>
            </>
          }
          trailing={<LiveDot />}
        >
          <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-0">
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex min-w-0 flex-col border-r border-border p-1.5 sm:p-3"
            >
              <div className="flex items-center gap-1.5 font-body text-[10px] uppercase tracking-wider text-foreground/60">
                <Ticket className="h-3 w-3" aria-hidden />
                Entry pass
              </div>
              <div className="mt-1.5 flex flex-1 flex-col items-center justify-center gap-0 border border-border bg-white p-2 sm:mt-2 sm:p-3 dark:bg-background">
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border bg-white p-1 transition-[border-color] hover:border-foreground/40 sm:p-1.5 dark:bg-background"
                  aria-label="Open Event Parlour app"
                >
                  <EntryQrMark
                    className="h-[4.25rem] w-[4.25rem] sm:h-[5.5rem] sm:w-[5.5rem]"
                    value={APP_URL}
                  />
                </a>
                <div className="mt-1.5 min-w-0 text-center sm:mt-2">
                  <p className="font-body text-[10px] font-medium tracking-wide">
                    GA · Afrobeats Night
                  </p>
                  <p className="mt-0.5 font-numbers text-[10px] tabular-nums text-foreground/60">
                    EP-7F3A-91C2
                  </p>
                  <p className="mt-1 font-body text-[9px] leading-snug text-foreground/65 sm:text-[10px]">
                    Scan →{" "}
                    <span className="font-medium text-foreground">
                      app.eventparlour.com
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
            <div className="flex min-h-0 min-w-0 flex-col bg-[#efeae2] dark:bg-muted/40">
              <div className="flex items-center gap-2 border-b border-border bg-background px-2 py-2 sm:px-2.5">
                <Face
                  src={COLLAB.blackie.src}
                  alt=""
                  size={22}
                  ring="ring-border"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="truncate font-body text-xs font-medium">
                      blackie-labs
                    </span>
                    <WaVerifiedBadge className="h-3.5 w-3.5" />
                  </div>
                  <p className="truncate font-body text-[9px] text-foreground/50">
                    Channel · 2.4k followers
                  </p>
                </div>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-1.5 py-2 pb-2.5 sm:min-h-[10.5rem] sm:px-2.5 sm:py-2.5 sm:pb-3">
                <AnimatePresence mode="sync" initial={false}>
                  {showTypingFirst ? (
                    <WaTypingIndicator key="typing-1" reduce={reduce} />
                  ) : null}

                  {showFirst ? (
                    <motion.div
                      key="msg-0"
                      className="flex items-start gap-1.5"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: CHAT_EASE }}
                    >
                      <Face
                        src={COLLAB.blackie.src}
                        alt=""
                        size={24}
                        ring="ring-transparent"
                      />
                      <WaChannelBubble
                        name="blackie-labs"
                        text={CHANNEL_POST.text}
                        time={CHANNEL_POST.time}
                        reactions={CHANNEL_POST.reactions}
                        showName
                        showReactions={showReactions}
                        reduce={reduce}
                      />
                    </motion.div>
                  ) : null}

                  {showTypingEnd ? (
                    <WaTypingIndicator key="typing-end" reduce={reduce} />
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </AppChrome>
      </div>
    </Stage>
  )
}

const COMMUNITY_LOOPS = [
  "Host with us · we amplify",
  "List with us · we boost",
  "Sell with us · we share",
  "Launch with us · we push",
]

const COMMUNITY_CHANNELS = [
  { name: "Instagram", icon: Instagram, reach: "4.3k" },
  { name: "WhatsApp", icon: MessageCircle, reach: "860" },
  { name: "X", icon: TrendingUp, reach: "1.2k" },
  { name: "Instagram", icon: Instagram, reach: "4.8k" },
  { name: "WhatsApp", icon: MessageCircle, reach: "940" },
  { name: "X", icon: TrendingUp, reach: "Live" },
] as const

function CommunityChannelRow({
  name,
  icon: Icon,
  reach,
}: {
  name: string
  icon: typeof Instagram
  reach: string
}) {
  return (
    <li className="flex h-14 shrink-0 items-center justify-between border-b border-border px-3 sm:px-4">
      <span className="flex items-center gap-2.5 font-body text-sm">
        <span className="flex h-8 w-8 items-center justify-center border border-border bg-muted">
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </span>
        {name}
      </span>
      <span className="font-numbers text-xs tabular-nums text-foreground/70">
        {reach}
      </span>
    </li>
  )
}

function CommunityVisual() {
  const reduce = useReducedMotion()
  const [loopIndex, setLoopIndex] = useState(0)
  const scrollItems = [...COMMUNITY_CHANNELS, ...COMMUNITY_CHANNELS]

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setLoopIndex((i) => (i + 1) % COMMUNITY_LOOPS.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <Stage>
      <Panel>
        <div className="border-b border-border px-3 py-2.5 sm:px-4">
          <p className="font-body text-xs font-medium">Community promotion</p>
          <div className="relative mt-0.5 h-4 overflow-hidden">
            {reduce ? (
              <p className="font-body text-[11px] text-foreground/65">
                {COMMUNITY_LOOPS[0]}
              </p>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={COMMUNITY_LOOPS[loopIndex]}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 font-body text-[11px] text-foreground/65"
                >
                  {COMMUNITY_LOOPS[loopIndex]}
                </motion.p>
              </AnimatePresence>
            )}
          </div>
        </div>
        <div className="relative h-[10.5rem] overflow-hidden">
          {reduce ? (
            <ul>
              {COMMUNITY_CHANNELS.slice(0, 3).map((ch, i) => (
                <CommunityChannelRow
                  key={`${ch.name}-${ch.reach}-${i}`}
                  name={ch.name}
                  icon={ch.icon}
                  reach={ch.reach}
                />
              ))}
            </ul>
          ) : (
            <motion.ul
              aria-hidden
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {scrollItems.map((ch, i) => (
                <CommunityChannelRow
                  key={`${ch.name}-${ch.reach}-${i}`}
                  name={ch.name}
                  icon={ch.icon}
                  reach={ch.reach}
                />
              ))}
            </motion.ul>
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-background to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background to-transparent"
          />
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="border-t border-border px-3 py-2.5 sm:px-4"
        >
          <LiveDot label="Boosting this weekend" />
        </motion.div>
      </Panel>
    </Stage>
  )
}

const ANALYTICS_RANGES = {
  "7d": {
    label: "7d",
    sub: "Last 7 days",
    delta: 0.184,
    pageViews: 12400,
    storefront: 4100,
    eventPages: 7800,
    linkClicks: 892,
    revenue: 820000,
    purchases: 328,
    ticketsSold: 612,
    purchaseRate: 0.042,
    regions: [
      { name: "Kenya", count: 1240, share: 0.54 },
      { name: "Uganda", count: 410, share: 0.18 },
      { name: "Tanzania", count: 320, share: 0.14 },
      { name: "Other", count: 318, share: 0.14 },
    ],
    spark: [28, 36, 32, 48, 44, 62, 58, 74, 68, 88, 82, 96],
  },
  "30d": {
    label: "30d",
    sub: "Last 30 days",
    delta: 0.312,
    pageViews: 48600,
    storefront: 16200,
    eventPages: 29100,
    linkClicks: 3410,
    revenue: 3180000,
    purchases: 1240,
    ticketsSold: 2480,
    purchaseRate: 0.051,
    regions: [
      { name: "Kenya", count: 4680, share: 0.52 },
      { name: "Uganda", count: 1620, share: 0.18 },
      { name: "Tanzania", count: 1350, share: 0.15 },
      { name: "Other", count: 1350, share: 0.15 },
    ],
    spark: [40, 38, 52, 48, 66, 60, 78, 72, 90, 84, 98, 92],
  },
  all: {
    label: "All",
    sub: "All time",
    delta: 0.468,
    pageViews: 128400,
    storefront: 42100,
    eventPages: 78400,
    linkClicks: 9840,
    revenue: 9200000,
    purchases: 4120,
    ticketsSold: 8640,
    purchaseRate: 0.058,
    regions: [
      { name: "Kenya", count: 14200, share: 0.5 },
      { name: "Uganda", count: 5100, share: 0.18 },
      { name: "Tanzania", count: 4250, share: 0.15 },
      { name: "Other", count: 4820, share: 0.17 },
    ],
    spark: [22, 34, 30, 55, 50, 70, 64, 82, 76, 94, 88, 100],
  },
} as const

type AnalyticsRangeKey = keyof typeof ANALYTICS_RANGES

function AnalyticsMetricCell({
  label,
  value,
  sub,
  prefix,
  suffix,
  format,
  reduce,
}: {
  label: string
  value: number
  sub: string
  prefix?: string
  suffix?: string
  format?: Intl.NumberFormatOptions
  reduce: boolean | null
}) {
  return (
    <div className="flex min-h-[4.5rem] flex-col justify-between bg-card p-2.5 sm:min-h-[5rem] sm:p-3">
      <p className="font-body text-[9px] font-medium uppercase tracking-wider text-foreground/55">
        {label}
      </p>
      <div>
        <NumberFlow
          value={value}
          prefix={prefix}
          suffix={suffix}
          format={format}
          locales="en-KE"
          className="font-numbers text-base font-semibold tabular-nums tracking-tight sm:text-lg [line-height:0.85]"
          animated={!reduce}
        />
        <p className="mt-0.5 font-body text-[9px] text-foreground/50">{sub}</p>
      </div>
    </div>
  )
}

function AnalyticsVisual() {
  const reduce = useReducedMotion()
  const [range, setRange] = useState<AnalyticsRangeKey>("7d")
  const data = ANALYTICS_RANGES[range]
  const mapDots = [
    { left: "48%", top: "42%", size: 10 },
    { left: "52%", top: "48%", size: 7 },
    { left: "44%", top: "52%", size: 5 },
    { left: "58%", top: "38%", size: 4 },
    { left: "40%", top: "36%", size: 3 },
  ]

  return (
    <Stage>
      <div className="h-full w-full max-w-lg">
        <AppChrome
          title="Deep analytics"
          trailing={
            <span className="inline-flex items-center gap-1 border border-border bg-foreground/5 px-1.5 py-0.5 font-numbers text-[9px] tabular-nums text-foreground">
              <TrendingUp className="h-3 w-3" aria-hidden />
              <NumberFlow
                value={data.delta}
                format={{
                  style: "percent",
                  signDisplay: "always",
                  maximumFractionDigits: 1,
                }}
                animated={!reduce}
              />
            </span>
          }
        >
          <div className="flex h-full flex-col overflow-hidden">
            <div className="flex flex-wrap items-center gap-1 border-b border-border px-2 py-1.5">
              {(Object.keys(ANALYTICS_RANGES) as AnalyticsRangeKey[]).map((key) => {
                const selected = key === range
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRange(key)}
                    className={cn(
                      "border px-1.5 py-0.5 font-body text-[9px] font-medium uppercase tracking-wide transition-colors sm:px-2 sm:py-1 sm:text-[10px]",
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-foreground/70 hover:bg-muted",
                    )}
                  >
                    {ANALYTICS_RANGES[key].label}
                  </button>
                )
              })}
            </div>

            <NumberFlowGroup>
              <div className="border-b border-border">
                <div className="border-b border-border bg-muted/40 px-2.5 py-1 font-body text-[9px] font-medium uppercase tracking-wider text-foreground/60">
                  Traffic
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">
                  <AnalyticsMetricCell
                    label="Page views"
                    value={data.pageViews}
                    sub={data.sub}
                    format={{ notation: "compact", maximumFractionDigits: 1 }}
                    reduce={reduce}
                  />
                  <AnalyticsMetricCell
                    label="Storefront"
                    value={data.storefront}
                    sub={data.sub}
                    format={{ notation: "compact", maximumFractionDigits: 1 }}
                    reduce={reduce}
                  />
                  <AnalyticsMetricCell
                    label="Event pages"
                    value={data.eventPages}
                    sub={data.sub}
                    format={{ notation: "compact", maximumFractionDigits: 1 }}
                    reduce={reduce}
                  />
                  <AnalyticsMetricCell
                    label="Link clicks"
                    value={data.linkClicks}
                    sub={data.sub}
                    format={{ useGrouping: true }}
                    reduce={reduce}
                  />
                </div>
                <div className="border-t border-border bg-muted/40 px-2.5 py-1 font-body text-[9px] font-medium uppercase tracking-wider text-foreground/60">
                  Tickets
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">
                  <AnalyticsMetricCell
                    label="Revenue"
                    value={data.revenue}
                    sub={data.sub}
                    prefix="KES "
                    format={{ notation: "compact", maximumFractionDigits: 1 }}
                    reduce={reduce}
                  />
                  <AnalyticsMetricCell
                    label="Purchases"
                    value={data.purchases}
                    sub={data.sub}
                    format={{ useGrouping: true }}
                    reduce={reduce}
                  />
                  <AnalyticsMetricCell
                    label="Tickets sold"
                    value={data.ticketsSold}
                    sub={data.sub}
                    format={{ useGrouping: true }}
                    reduce={reduce}
                  />
                  <AnalyticsMetricCell
                    label="Purchase rate"
                    value={data.purchaseRate}
                    sub={data.sub}
                    format={{
                      style: "percent",
                      maximumFractionDigits: 1,
                    }}
                    reduce={reduce}
                  />
                </div>
              </div>
            </NumberFlowGroup>

            <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1.15fr_0.95fr]">
              <div className="flex min-h-0 flex-col border-b border-border p-2 sm:p-2.5 lg:border-b-0 lg:border-r lg:p-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-body text-[9px] font-medium uppercase tracking-wider text-foreground/55">
                    Views by day
                  </span>
                  <LiveDot label="Live" />
                </div>
                <div className="relative mt-auto h-14 w-full sm:h-16">
                  <svg
                    viewBox="0 0 120 40"
                    className="h-full w-full overflow-visible"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      key={`fill-${range}`}
                      d={`M0,${40 - data.spark[0]! * 0.35} ${data.spark
                        .map((v, i) => `L${(i / (data.spark.length - 1)) * 120},${40 - v * 0.35}`)
                        .join(" ")} L120,40 L0,40 Z`}
                      fill="url(#analyticsFill)"
                      className="text-foreground"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35 }}
                    />
                    <motion.path
                      key={`line-${range}`}
                      d={`M0,${40 - data.spark[0]! * 0.35} ${data.spark
                        .map((v, i) => `L${(i / (data.spark.length - 1)) * 120},${40 - v * 0.35}`)
                        .join(" ")}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-foreground"
                      initial={reduce ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                </div>
                <p className="mt-1 font-body text-[10px] text-foreground/55">
                  Ticket sales &amp; registrations · workspace scope
                </p>
              </div>

              <div className="hidden min-h-0 flex-col p-2.5 lg:flex lg:p-3">
                <div className="mb-1.5 flex items-center gap-1 font-body text-[9px] font-medium uppercase tracking-wider text-foreground/55">
                  <MapPin className="h-3 w-3" aria-hidden />
                  Geo
                </div>
                <div className="relative mb-2 h-12 overflow-hidden border border-border bg-muted/30 sm:h-14">
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--foreground) 8%, transparent) 0%, transparent 55%)",
                    }}
                  />
                  {mapDots.map((dot, i) => (
                    <motion.span
                      key={i}
                      className="absolute rounded-full bg-foreground"
                      style={{
                        left: dot.left,
                        top: dot.top,
                        width: dot.size,
                        height: dot.size,
                        marginLeft: -dot.size / 2,
                        marginTop: -dot.size / 2,
                      }}
                      initial={reduce ? false : { scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 0.85 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.05, duration: 0.35 }}
                    />
                  ))}
                </div>
                <NumberFlowGroup>
                  <ul className="space-y-1">
                    {data.regions.map((region) => (
                      <li
                        key={region.name}
                        className="flex items-center justify-between gap-2 font-body text-[10px] sm:text-[11px]"
                      >
                        <span className="truncate text-foreground/80">{region.name}</span>
                        <span className="flex shrink-0 items-center gap-2 font-numbers tabular-nums text-foreground">
                          <NumberFlow
                            value={region.count}
                            format={{ useGrouping: true }}
                            className="text-foreground/50"
                            animated={!reduce}
                          />
                          <NumberFlow
                            value={region.share}
                            format={{
                              style: "percent",
                              maximumFractionDigits: 0,
                            }}
                            animated={!reduce}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </NumberFlowGroup>
              </div>
            </div>
          </div>
        </AppChrome>
      </div>
    </Stage>
  )
}

export function FeatureVisual({
  visualKey,
  className,
}: {
  visualKey: FeatureVisualKey
  className?: string
}) {
  const content = (() => {
    switch (visualKey) {
      case "distribution":
        return <DistributionVisual />
      case "workspace":
        return <WorkspaceVisual />
      case "pricing":
        return <PricingVisual />
      case "tickets-and-channels":
        return <TicketsChannelsVisual />
      case "community":
        return <CommunityVisual />
      case "analytics":
        return <AnalyticsVisual />
      default:
        return null
    }
  })()

  return <div className={cn("w-full", className)}>{content}</div>
}
