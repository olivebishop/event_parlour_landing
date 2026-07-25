import content from "@/lib/content"
import {
  categories,
  type CategoryKey,
  type Feature,
} from "@/lib/data/features"
import {
  attendeeFeatureCatalog,
  organizerFeatureCatalog,
  type FeatureCatalogEntry,
} from "@/lib/feature-catalog"

const organizerContentKeys = organizerFeatureCatalog.map((e) => e.contentKey)
const attendeeContentKeys = attendeeFeatureCatalog.map((e) => e.contentKey)

function mergeFeature(
  base: Feature,
  translated:
    | {
        label?: string
        title?: string
        description?: string
        capabilities?: string[]
      }
    | undefined,
): Feature {
  if (!translated) return base
  return {
    ...base,
    label: translated.label ?? base.label,
    title: translated.title ?? base.title,
    description: translated.description ?? base.description,
    capabilities: translated.capabilities ?? base.capabilities,
  }
}

export function getFeaturesForCategory(category: CategoryKey): Feature[] {
  const categoryData = categories.find((c) => c.id === category)
  if (!categoryData) return []

  const copy = content.FeaturesSection[category] as Record<
    string,
    {
      label?: string
      title?: string
      description?: string
      capabilities?: string[]
    }
  >

  const catalog: FeatureCatalogEntry[] =
    category === "organizers" ? organizerFeatureCatalog : attendeeFeatureCatalog
  const contentKeys =
    category === "organizers" ? organizerContentKeys : attendeeContentKeys

  return catalog.map((entry, index) => {
    const base = categoryData.features[index] ?? categoryData.features[0]
    if (!base) {
      throw new Error(`Missing base feature for ${category} index ${index}`)
    }
    const contentKey = contentKeys[index]
    return mergeFeature(base, copy[contentKey])
  })
}

export function getFeatureBySlug(
  category: CategoryKey,
  slug: string,
): { feature: Feature; catalog: FeatureCatalogEntry } | null {
  const catalog =
    category === "organizers" ? organizerFeatureCatalog : attendeeFeatureCatalog
  const index = catalog.findIndex((entry) => entry.slug === slug)
  if (index === -1) return null

  const features = getFeaturesForCategory(category)
  const feature = features[index]
  const entry = catalog[index]
  if (!feature || !entry) return null

  return { feature, catalog: entry }
}
