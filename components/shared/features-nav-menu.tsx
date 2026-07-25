"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import content from "@/lib/content"
import {
  categoryHubHref,
} from "@/lib/feature-catalog"
import {
  platformFeatureCatalog,
  platformFeatureHref,
} from "@/lib/platform-feature-catalog"
import { cn } from "@/lib/utils"

const MENU_FEATURES = platformFeatureCatalog

const MENU_LEFT = MENU_FEATURES.slice(0, 3)
const MENU_RIGHT = MENU_FEATURES.slice(3, 6)

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
                title="For organizers"
                description="Workspace tools to list, sell, and run events."
                imageSrc="/images/org.svg"
                imageAlt=""
              />
              <AudiencePreviewCard
                href={categoryHubHref("attendees")}
                onNavigate={close}
                title="For attendees"
                description="Discover events, tickets, and your community."
                imageSrc="/images/attendee.svg"
                imageAlt=""
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

function AudiencePreviewCard({
  href,
  onNavigate,
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  href: string
  onNavigate: () => void
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex h-auto min-h-[240px] w-full min-w-0 flex-col overflow-hidden border border-border bg-background transition-colors hover:border-foreground/25 hover:bg-muted/40 xl:h-[277px] xl:w-[280px] xl:shrink-0 2xl:w-[320px]"
    >
      <div className="relative flex h-[168px] shrink-0 items-center justify-center bg-muted/20 p-6">
        <div className="relative h-full w-full max-h-[120px] max-w-[160px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain object-center"
            sizes="160px"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center border-t border-border p-4">
        <p className="font-body text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 font-body text-xs leading-relaxed text-foreground/70 sm:text-sm">
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
