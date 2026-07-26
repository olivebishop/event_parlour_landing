import Link from "next/link"
import { PixelLabel } from "@/components/shared/pixel-label"
import { getPlatformFeatureBySlug } from "@/lib/platform-features-content"
import { platformFeatureHref } from "@/lib/platform-feature-catalog"

export function PlatformFeatureIntro({ slug }: { slug: string }) {
  const data = getPlatformFeatureBySlug(slug)
  if (!data) return null

  const { feature, catalog } = data

  return (
    <div className="relative pt-24 sm:pt-28 md:pt-32 lg:hidden">
      <div className="container relative mx-auto px-4 pb-8 sm:px-6 sm:pb-10">
        <div className="max-w-3xl space-y-4">
          <PixelLabel tone="soft">{feature.label}</PixelLabel>
          <h1 className="font-heading text-[clamp(1.65rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-foreground">
            {feature.title}
          </h1>
          <p className="max-w-xl font-body text-[0.9375rem] leading-relaxed text-foreground/75 sm:text-base">
            {feature.description}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
            <Link
              href="/features"
              className="font-body text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              All features
            </Link>
            <Link
              href={platformFeatureHref(catalog.slug)}
              className="font-body text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {catalog.navTitle}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
