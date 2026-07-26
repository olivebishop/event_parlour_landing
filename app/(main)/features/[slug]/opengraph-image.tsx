import {
  createOgImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/seo/create-og-image"
import { getOgContent } from "@/lib/seo/og-content"
import { getAllPlatformFeatureSlugs } from "@/lib/platform-features-content"

export const alt = "Feature — Event Parlour"
export const size = ogImageSize
export const contentType = ogImageContentType

export function generateStaticParams() {
  return getAllPlatformFeatureSlugs().map((slug) => ({ slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  return createOgImage(getOgContent(`/features/${slug}`))
}
