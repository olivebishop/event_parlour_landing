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
        "relative mx-auto max-w-7xl overflow-x-clip pb-1.5",
        className,
      )}
    >
      <div className="relative m-0.5 overflow-hidden border border-foreground/20 bg-card shadow-[4px_4px_0_0] shadow-foreground/10 transition-[border-color,box-shadow] duration-300 ease-out hover:border-foreground/30 hover:shadow-[6px_6px_0_0] hover:shadow-foreground/12">
        <BrandGrainOverlay fixed={false} intensity="subtle" />
        <MarketingGridPattern className="opacity-80" />

        {/* One composition: stacked on small/medium, split on large — same CTA as desktop. */}
        <div className="relative z-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(17rem,32rem)]">
          <div className="flex flex-col justify-center gap-2.5 px-5 py-3 xs:gap-3 xs:px-6 xs:py-3.5 sm:gap-4 sm:px-8 sm:py-6 md:px-10 md:py-8 lg:border-r lg:border-border/80 lg:gap-5 lg:py-12 lg:pl-10 lg:pr-8 xl:p-12">
            <PixelLabel tone="soft" as="p">
              {eyebrow}
            </PixelLabel>

            <div className="space-y-2 sm:space-y-3">
              <p className="font-body text-sm font-medium text-foreground">
                {kicker}
              </p>
              <h2
                id={id}
                className="font-heading text-xl font-bold leading-tight tracking-tight text-foreground xs:text-2xl sm:text-3xl md:text-[2rem] md:leading-[1.12]"
              >
                {title}
              </h2>
              <p className="max-w-lg font-body text-sm leading-relaxed text-foreground/75 sm:text-base">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:pt-1">
              <Button
                asChild
                size="cta"
                className="h-10 w-full gap-2 shadow-none sm:w-auto sm:min-w-[12rem]"
              >
                {primaryExternal ? (
                  <a href={primaryHref} {...primaryLinkProps}>
                    {primaryLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : (
                  <Link href={primaryHref}>
                    {primaryLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                )}
              </Button>
              <Button
                asChild
                variant="outline"
                size="cta"
                className="hidden border-foreground/15 bg-background/80 shadow-none backdrop-blur-sm sm:inline-flex"
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
            <p className="hidden font-body text-sm leading-relaxed text-foreground/70 sm:block">
              {hint}
            </p>
          </div>

          <div className="relative hidden min-h-[22rem] lg:block">
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

            <div className="relative z-10 flex h-full min-h-[22rem] flex-col justify-end p-8">
              <p className="max-w-[16rem] font-heading text-xl font-semibold leading-snug text-background">
                {panelLine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
