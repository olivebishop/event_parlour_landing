import { readFile } from "node:fs/promises"
import { join } from "node:path"

export type OgFont = {
  name: string
  data: Buffer
  style: "normal"
  weight: 400 | 500
}

let cachedFonts: OgFont[] | null = null

function fontPath(fileName: string) {
  return join(process.cwd(), "assets/fonts", fileName)
}

/** Geist Pixel Line (headings) + Square (meta) + Sans (body) for next/og. */
export async function getOgFonts(): Promise<OgFont[]> {
  if (cachedFonts) return cachedFonts

  const [pixelLine, pixelSquare, geistSans] = await Promise.all([
    readFile(fontPath("GeistPixel-Line.ttf")),
    readFile(fontPath("GeistPixel-Square.ttf")),
    readFile(fontPath("Geist-Regular.ttf")),
  ])

  cachedFonts = [
    {
      name: "Geist Pixel Line",
      data: pixelLine,
      style: "normal",
      weight: 500,
    },
    {
      name: "Geist Pixel Square",
      data: pixelSquare,
      style: "normal",
      weight: 500,
    },
    {
      name: "Geist Sans",
      data: geistSans,
      style: "normal",
      weight: 400,
    },
  ]

  return cachedFonts
}
