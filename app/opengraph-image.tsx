import {
  createOgImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/seo/create-og-image"
import { getOgContent } from "@/lib/seo/og-content"

export const alt = "Event Parlour — Sell out your next event"
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image() {
  return createOgImage(getOgContent(""))
}
