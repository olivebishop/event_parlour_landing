import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { GeistPixelLine, GeistPixelSquare } from "geist/font/pixel"

/** Body — Geist Sans regular. Headers — Pixel Line. Numbers — Pixel Square. */
export const geistSans = GeistSans
export const geistMono = GeistMono
export const geistPixelHeading = GeistPixelLine
export const geistPixelNumbers = GeistPixelSquare

export const geistFontVariables = [
  geistSans.variable,
  geistMono.variable,
  geistPixelHeading.variable,
  geistPixelNumbers.variable,
].join(" ")
