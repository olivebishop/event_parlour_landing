import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BrandGrainOverlay } from "@/components/grain-overlay"
import { MarketingGridPattern } from "@/components/marketing/marketing-grid-pattern"
import { PixelLabel } from "@/components/shared/pixel-label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const DEFAULT_IMAGE = {
  src: "/images/banner_two.png",
  alt: "DJ silhouette against vibrant blue and red lights in an energetic venue",
}

export type MarketingCtaBannerProps = {
  eyebrow: string
  kicker: string
  title: string
  description: string
  panelLine: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
  hint: string
  imageSrc?: string
  imageAlt?: string
  secondaryExternal?: boolean
  primaryExternal?: boolean
  className?: string
  id?: string
}

export function MarketingCtaBanner({
  eyebrow,
  kicker,
  title,
  description,
  panelLine,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  hint,
  imageSrc = DEFAULT_IMAGE.src,
  imageAlt = DEFAULT_IMAGE.alt,
  secondaryExternal = false,
  primaryExternal = false,
  className,
  id = "marketing-cta-heading",
}: MarketingCtaBannerProps) {
  const primaryLinkProps = primaryExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {}
  const secondaryLinkProps = secondaryExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {}

  return (
    <aside
      aria-labelledby={id}
      className={cn(
        "relative mx-auto max-w-7xl overflow-x-clip sm:pb-2 sm:pr-1.5",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          "sm:border sm:border-foreground/20 sm:bg-card",
          "sm:shadow-[4px_4px_0_0] sm:shadow-foreground/10",
          "sm:transition-[border-color,box-shadow] sm:duration-300 sm:ease-out",
          "sm:hover:border-foreground/30 sm:hover:shadow-[6px_6px_0_0] sm:hover:shadow-foreground/12",
        )}
      >
        <BrandGrainOverlay
          fixed={false}
          intensity="subtle"
          className="hidden sm:block"
        />
        <MarketingGridPattern className="hidden opacity-80 sm:block" />

        <div className="relative z-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(17rem,32rem)]">
          <div className="flex flex-col justify-center px-5 py-6 xs:px-6 xs:py-7 sm:gap-4 sm:px-8 sm:py-7 md:gap-5 md:px-10 md:py-8 lg:border-r lg:border-border/80 lg:py-10 lg:pl-10 lg:pr-8 xl:p-10">
            {/* Meta — tablet/desktop only */}
            <div className="mb-0 hidden flex-wrap items-center gap-x-3 gap-y-1 sm:mb-0 sm:flex">
              <PixelLabel tone="soft" as="p">
                {eyebrow}
              </PixelLabel>
              <span aria-hidden className="h-3 w-px bg-foreground/20" />
              <p className="font-body text-sm font-medium text-foreground/70">
                {kicker}
              </p>
            </div>

            <h2
              id={id}
              className="font-heading text-2xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-3xl md:text-[1.85rem] md:leading-[1.12]"
            >
              {title}
            </h2>

            <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-foreground/60 sm:mt-2.5 sm:max-w-lg sm:text-foreground/75 md:text-base">
              {description}
            </p>

            {/* Mobile: side-by-side compact buttons (reference layout) */}
            <div className="mt-5 flex flex-row items-center gap-2.5 sm:mt-4 sm:flex-wrap sm:gap-3">
              <Button
                asChild
                size="sm"
                className="h-9 min-h-9 flex-1 px-3 text-sm font-semibold shadow-none sm:h-auto sm:min-h-11 sm:w-auto sm:min-w-[12.5rem] sm:flex-none sm:px-6 sm:py-2.5 sm:text-[0.9375rem] sm:font-medium"
              >
                {primaryExternal ? (
                  <a href={primaryHref} {...primaryLinkProps}>
                    {primaryLabel}
                    <ArrowRight
                      className="hidden h-4 w-4 sm:inline"
                      aria-hidden
                    />
                  </a>
                ) : (
                  <Link href={primaryHref}>
                    {primaryLabel}
                    <ArrowRight
                      className="hidden h-4 w-4 sm:inline"
                      aria-hidden
                    />
                  </Link>
                )}
              </Button>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-9 min-h-9 flex-1 border-border bg-background px-3 text-sm font-semibold shadow-none sm:h-auto sm:min-h-11 sm:w-auto sm:flex-none sm:border-foreground/15 sm:bg-background/80 sm:px-6 sm:py-2.5 sm:text-[0.9375rem] sm:font-medium sm:backdrop-blur-sm"
              >
                {secondaryExternal ? (
                  <a href={secondaryHref} {...secondaryLinkProps}>
                    {secondaryLabel}
                  </a>
                ) : (
                  <Link href={secondaryHref}>{secondaryLabel}</Link>
                )}
              </Button>
            </div>

            <p className="mt-0 hidden font-body text-sm leading-relaxed text-foreground/70 sm:mt-1 sm:block">
              {hint}
            </p>
          </div>

          <div className="relative hidden min-h-[16rem] lg:block xl:min-h-[18rem]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center contrast-[1.12] brightness-[0.72] saturate-[0.35] grayscale"
              sizes="32rem"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-foreground/40 mix-blend-multiply"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.35 0.12 25 / 0.28) 0%, oklch(0.25 0.1 264 / 0.22) 40%, transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/45 to-transparent"
            />
            <BrandGrainOverlay fixed={false} intensity="subtle" />

            <div className="relative z-10 flex h-full min-h-[16rem] flex-col justify-end p-6 xl:min-h-[18rem] xl:p-8">
              <p className="max-w-[16rem] font-heading text-lg font-semibold leading-snug text-background xl:text-xl">
                {panelLine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
