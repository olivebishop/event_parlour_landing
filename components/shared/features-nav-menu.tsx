"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState, type ReactNode } from "react"
import content from "@/lib/content"
import {
  categoryHubHref,
} from "@/lib/feature-catalog"
import {
  platformFeatureCatalog,
  platformFeatureHref,
} from "@/lib/platform-feature-catalog"
import { BrandGrainOverlay } from "@/components/grain-overlay"
import { PixelLabel } from "@/components/shared/pixel-label"
import { cn } from "@/lib/utils"

const MENU_FEATURES = platformFeatureCatalog

const MENU_LEFT = MENU_FEATURES.slice(0, 3)
const MENU_RIGHT = MENU_FEATURES.slice(3, 6)

/** DiceBear avatars — https://www.dicebear.com/ (deterministic by seed). */
const ATTENDEE_AVATAR_SEEDS = ["Amina", "Brian", "Chioma", "Derek", "Elena"] as const

function dicebearAvatarUrl(seed: string) {
  const params = new URLSearchParams({
    seed,
    size: "96",
    radius: "50",
  })
  return `https://api.dicebear.com/9.x/lorelei/png?${params.toString()}`
}

const featureMegaMenuItemClass =
  "group block w-full min-h-[4.25rem] px-3 py-2.5 transition-colors hover:bg-background/80 focus-visible:bg-background/80 dark:hover:bg-background/15 dark:focus-visible:bg-background/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted"

type FeaturesNavProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeaturesNavTrigger({
  open,
  active,
  onOpenChange,
}: FeaturesNavProps & { active?: boolean }) {
  const copy = content.Navbar
  const highlighted = open || active

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap font-body text-[0.9375rem] transition-colors duration-200",
        highlighted
          ? "text-foreground"
          : "text-foreground/85 hover:text-foreground",
      )}
      aria-expanded={open}
      aria-haspopup="true"
      onClick={() => onOpenChange(!open)}
      onMouseEnter={() => onOpenChange(true)}
    >
      {copy.features}
      <ChevronDown
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          open && "rotate-180",
        )}
      />
    </button>
  )
}

export function FeaturesNavPanel({
  open,
  onOpenChange,
}: FeaturesNavProps) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="features-nav-panel"
          role="region"
          aria-label="Features menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden overflow-hidden border-b border-border bg-muted/55 lg:block dark:bg-muted/35"
        >
          <div className="mx-auto flex max-w-[90rem] flex-col items-stretch gap-8 px-5 py-8 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:px-10 lg:py-9">
            <div className="w-full min-w-0 lg:max-w-[36rem]">
              <div className="grid w-full grid-cols-1 gap-x-6 sm:grid-cols-2 sm:gap-x-10 md:gap-x-12">
                <PlatformFeatureLinkColumn items={MENU_LEFT} onNavigate={close} />
                <PlatformFeatureLinkColumn items={MENU_RIGHT} onNavigate={close} />
              </div>
            </div>

            <div className="flex w-full min-w-0 shrink-0 flex-col gap-4 xl:w-auto xl:flex-row">
              <AudiencePreviewCard
                href={categoryHubHref("organizers")}
                onNavigate={close}
                title="For music organizers"
                description="List shows, sell tickets, pack the room."
                imageSrc="/images/banner_one.png"
                imageAlt="DJ and crowd at a live music event"
                imageFit="cover"
              />
              <AudiencePreviewCard
                href={categoryHubHref("attendees")}
                onNavigate={close}
                title="For attendees"
                description="Find nights out. Keep your tickets."
                media={<AttendeesAvatarsMedia />}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function PlatformFeatureLinkColumn({
  items,
  onNavigate,
}: {
  items: typeof platformFeatureCatalog
  onNavigate: () => void
}) {
  return (
    <ul className="flex min-w-0 flex-col gap-0.5">
      {items.map((entry) => (
        <li key={entry.slug}>
          <Link
            href={platformFeatureHref(entry.slug)}
            onClick={onNavigate}
            className={featureMegaMenuItemClass}
          >
            <span className="block font-body text-sm leading-snug text-foreground">
              {entry.navTitle}
            </span>
            <span className="mt-1 block font-body text-xs leading-snug text-foreground/70 group-hover:text-foreground sm:text-[0.8125rem]">
              {entry.navDescription}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function AttendeesAvatarsMedia() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-muted/40 px-5 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, black 25%, transparent 75%)",
        }}
      />
      <BrandGrainOverlay fixed={false} intensity="subtle" className="z-[1]" />

      <div className="relative z-[2] flex flex-col items-center gap-3">
        <div className="flex items-center justify-center -space-x-2.5" data-allow-radius>
          {ATTENDEE_AVATAR_SEEDS.map((seed, i) => (
            <span
              key={seed}
              className="relative inline-block size-12 overflow-hidden rounded-full border-2 border-background bg-muted ring-1 ring-border"
              style={{ zIndex: ATTENDEE_AVATAR_SEEDS.length - i }}
            >
              <Image
                src={dicebearAvatarUrl(seed)}
                alt=""
                fill
                className="object-cover"
                sizes="48px"
              />
            </span>
          ))}
        </div>
        <p className="font-body text-[11px] leading-snug text-foreground/60">
          Your crowd, in one place
        </p>
      </div>
    </div>
  )
}

function AudiencePreviewCard({
  href,
  onNavigate,
  title,
  description,
  imageSrc,
  imageAlt,
  imageFit = "contain",
  media,
}: {
  href: string
  onNavigate: () => void
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  imageFit?: "contain" | "cover"
  media?: ReactNode
}) {
  const isCover = imageFit === "cover"

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex h-auto min-h-[240px] w-full min-w-0 flex-col overflow-hidden border border-border bg-background transition-colors hover:border-foreground/25 hover:bg-muted/40 xl:h-[277px] xl:w-[280px] xl:shrink-0 2xl:w-[320px]"
    >
      <div
        className={cn(
          "relative h-[168px] shrink-0 overflow-hidden bg-muted/20",
          !media && !isCover && "flex items-center justify-center p-6",
        )}
      >
        {media ? (
          media
        ) : isCover && imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              className="object-cover object-center contrast-[1.08] brightness-[0.85] saturate-[0.45] grayscale"
              sizes="(max-width: 1280px) 100vw, 320px"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent"
            />
          </>
        ) : imageSrc ? (
          <div className="relative h-full w-full max-h-[120px] max-w-[160px]">
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              className="object-contain object-center"
              sizes="160px"
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col justify-center border-t border-border p-4">
        <PixelLabel variant="circle" tone="foreground" as="p">
          {title}
        </PixelLabel>
        <p className="mt-1.5 font-body text-xs leading-relaxed text-foreground/70 sm:text-sm">
          {description}
        </p>
      </div>
    </Link>
  )
}

/** @deprecated Use FeaturesNavTrigger + FeaturesNavPanel in the header. */
export function FeaturesNavMenu(props: FeaturesNavProps) {
  return <FeaturesNavTrigger {...props} />
}

export function MobileFeaturesLinks({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-between py-2"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className="font-heading text-xl font-semibold text-foreground">
          {content.Navbar.features}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform",
            expanded && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {expanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <ul className="space-y-1 pb-1 pt-2">
              {platformFeatureCatalog.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={platformFeatureHref(entry.slug)}
                    onClick={onNavigate}
                    className="block py-2 font-body text-sm text-foreground/80"
                  >
                    {entry.navTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
