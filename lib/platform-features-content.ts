import content from "@/lib/content"
import type { Feature } from "@/lib/data/features"
import { getPlatformFeatureBase } from "@/lib/data/platform-features"
import {
  getPlatformCatalogEntry,
  platformFeatureCatalog,
  type PlatformFeatureCatalogEntry,
} from "@/lib/platform-feature-catalog"

type PlatformFeatureCopy = {
  label?: string
  title?: string
  description?: string
  capabilities?: string[]
  navTitle?: string
  navDescription?: string
}

export function getPlatformFeaturesCopy() {
  return content.PlatformFeatures as {
    index: {
      eyebrow: string
      title: string
      description: string
      allFeaturesLabel: string
    }
    includes: string
    active: string
    cta: {
      eyebrow: string
      kicker: string
      title: string
      description: string
      panelLine: string
      primaryLabel: string
      secondaryLabel: string
      secondaryHref: string
      hint: string
    }
  } & Record<string, PlatformFeatureCopy | unknown>
}

function mergePlatformFeature(
  slug: string,
  entry: PlatformFeatureCatalogEntry,
): Feature | null {
  const base = getPlatformFeatureBase(slug)
  if (!base) return null

  const copy = getPlatformFeaturesCopy()
  const translated = copy[entry.contentKey] as PlatformFeatureCopy | undefined
  if (!translated?.title) return null

  return {
    ...base,
    label: translated.label ?? entry.navTitle,
    title: translated.title,
    description: translated.description ?? "",
    capabilities: translated.capabilities ?? [],
  }
}

export function getAllPlatformFeatures(): Feature[] {
  return platformFeatureCatalog
    .map((entry) => mergePlatformFeature(entry.slug, entry))
    .filter((f): f is Feature => f !== null)
}

export function getPlatformFeatureBySlug(slug: string): {
  feature: Feature
  catalog: PlatformFeatureCatalogEntry
} | null {
  const catalog = getPlatformCatalogEntry(slug)
  if (!catalog) return null
  const feature = mergePlatformFeature(slug, catalog)
  if (!feature) return null
  return { feature, catalog }
}

export { getAllPlatformFeatureSlugs } from "@/lib/platform-feature-catalog"
