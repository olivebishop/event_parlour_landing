import { createOgImage } from "@/lib/seo/create-og-image"
import { getOgContent } from "@/lib/seo/og-content"

export const runtime = "nodejs"

type Props = {
  params: Promise<{ slug?: string[] }>
}

/** Stable OG image URLs for sitemap + social crawlers (`/og`, `/og/why-us`, …). */
export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params
  const path = slug?.length ? `/${slug.join("/")}` : ""
  return createOgImage(getOgContent(path))
}
