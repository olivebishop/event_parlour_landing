import {
  createOgImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/seo/create-og-image"
import { getOgContent } from "@/lib/seo/og-content"

export const alt = "Download Event Parlour. Sell out from your Mac or Windows desk."
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image() {
  return createOgImage(getOgContent("/download"))
}
