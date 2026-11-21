import type { CSSProperties, ImgHTMLAttributes } from "react"

type StaticImage = { src: string; width?: number; height?: number }

export type ImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height"
> & {
  src: string | StaticImage
  alt: string
  width?: number
  height?: number
  /** Stretch to the nearest positioned ancestor (parent needs `relative`). */
  fill?: boolean
  /** Above-the-fold image: load eagerly with high fetch priority. */
  priority?: boolean
  /** Accepted for API compatibility; files in /public are served as-is. */
  quality?: number
}

const fillStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
}

/**
 * Plain `<img>` with sensible loading defaults. Always pass width/height
 * (or `fill`) so the browser reserves space and layout doesn't shift (CLS).
 */
export function Image({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  quality: _quality,
  style,
  loading,
  decoding,
  ...rest
}: ImageProps) {
  const resolved = typeof src === "string" ? { src } : src
  return (
    <img
      {...rest}
      src={resolved.src}
      alt={alt}
      width={fill ? undefined : (width ?? resolved.width)}
      height={fill ? undefined : (height ?? resolved.height)}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      fetchPriority={priority ? "high" : undefined}
      style={fill ? { ...fillStyle, ...style } : style}
    />
  )
}

export default Image
