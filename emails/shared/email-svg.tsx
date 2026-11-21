import { Img } from "@react-email/components";
import { getEmailAssetOrigin } from "./email-theme";

export type SocialIconId =
  | "x"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "whatsapp";

/** PNG only — Gmail and Outlook drop SVG and data URIs. */
export function socialIconSrc(id: SocialIconId): string {
  return `${getEmailAssetOrigin()}/email/social/${id}.png`;
}

export function EmailSvgImg({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <Img
      alt={alt}
      className="email-icon"
      height={height}
      src={src}
      style={{
        border: "0",
        display: "block",
        height: `${height}px`,
        outline: "none",
        width: `${width}px`,
      }}
      width={width}
    />
  );
}
