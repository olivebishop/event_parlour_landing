"use client"

import { FeatureCategoryView } from "@/components/features/feature-category-view"

/** @deprecated Use FeatureCategoryView on dedicated routes. */
export default function FeaturesSection() {
  return <FeatureCategoryView category="organizers" />
}
