import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import {
  GeistPixelCircle,
  GeistPixelLine,
  GeistPixelSquare,
} from "geist/font/pixel"

/** Body — Geist Sans. Headers — Pixel Line. Numbers — Pixel Square. Labels — Pixel Circle. */
export const geistSans = GeistSans
export const geistMono = GeistMono
export const geistPixelHeading = GeistPixelLine
export const geistPixelNumbers = GeistPixelSquare
export const geistPixelCircle = GeistPixelCircle

export const geistFontVariables = [
  geistSans.variable,
  geistMono.variable,
  geistPixelHeading.variable,
  geistPixelNumbers.variable,
  geistPixelCircle.variable,
].join(" ")
