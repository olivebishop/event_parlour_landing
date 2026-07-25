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
        "relative mx-auto max-w-7xl",
        className,
      )}
    >
      <div className="relative overflow-hidden border border-foreground/20 bg-card shadow-[4px_4px_0_0] shadow-foreground/10 transition-[border-color,box-shadow] duration-300 ease-out hover:border-foreground/30 hover:shadow-[6px_6px_0_0] hover:shadow-foreground/12">
        <BrandGrainOverlay fixed={false} intensity="subtle" />
        <MarketingGridPattern className="opacity-80" />

        <div className="relative z-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(17rem,32rem)]">
          <div className="flex flex-col justify-center gap-5 border-b border-border/80 p-6 xs:p-8 sm:p-10 lg:border-b-0 lg:border-r lg:py-12 lg:pl-10 lg:pr-8 xl:p-12">
            <PixelLabel tone="soft" as="p">
              {eyebrow}
            </PixelLabel>

            <div className="space-y-3">
              <p className="font-body text-sm font-medium text-foreground">
                {kicker}
              </p>
              <h2
                id={id}
                className="font-heading text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-[2rem] md:leading-[1.12]"
              >
                {title}
              </h2>
              <p className="max-w-lg font-body text-[0.9375rem] leading-relaxed text-foreground/75 sm:text-base">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Button
                asChild
                size="cta"
                className="gap-2 shadow-none sm:min-w-[12rem]"
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
                className="border-foreground/15 bg-background/80 shadow-none backdrop-blur-sm"
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
            <p className="font-body text-sm leading-relaxed text-foreground/70">
              {hint}
            </p>
          </div>

          <div className="relative min-h-[14rem] sm:min-h-[16rem] lg:min-h-[22rem]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center contrast-[1.12] brightness-[0.72] saturate-[0.35] grayscale"
              sizes="(max-width: 1024px) 100vw, 32rem"
            />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-multiply bg-foreground/40"
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

            <div className="relative z-10 flex h-full min-h-[14rem] flex-col justify-end p-6 sm:min-h-[16rem] sm:p-8 lg:min-h-[22rem]">
              <p className="max-w-[16rem] font-heading text-lg font-semibold leading-snug text-background sm:text-xl">
                {panelLine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
