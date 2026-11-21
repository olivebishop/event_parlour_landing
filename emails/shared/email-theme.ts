/**
 * Shared with eventpalour_app/packages/email. The social-icon PNGs used in the
 * footer are hosted by the app, so assets always resolve against it.
 */
export function getEmailAppUrl(): string {
  return "https://app.eventparlour.com";
}

/** Hosted assets must be reachable from Gmail/Outlook — never localhost. */
export function getEmailAssetOrigin(): string {
  const base = getEmailAppUrl();
  if (!base || base.includes("localhost") || base.includes("127.0.0.1")) {
    return "https://app.eventparlour.com";
  }
  return base;
}

export const EMAIL_WEBSITE_URL = "https://eventparlour.com";
export const EMAIL_EVENTS_URL = "https://app.eventparlour.com/";
export const EMAIL_SUPPORT_URL = "https://www.eventparlour.com/contact";

export const SOCIAL_LINKS = [
  {
    id: "x" as const,
    label: "X",
    href: "https://x.com/event_parlour",
  },
  {
    id: "instagram" as const,
    label: "Instagram",
    href: "https://www.instagram.com/event.parlour",
  },
  {
    id: "tiktok" as const,
    label: "TikTok",
    href: "https://www.tiktok.com/@eventparlour",
  },
  {
    id: "linkedin" as const,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/eventparlour",
  },
  {
    id: "whatsapp" as const,
    label: "WhatsApp",
    href: "https://www.whatsapp.com/channel/0029ValLxITAO7RActotOX3R",
  },
] as const;

/** Quiet Midday-like palette using Event Parlour colors. Avoid pure black. */
export const emailColors = {
  background: "#ffffff",
  foreground: "#121212",
  muted: "#616161",
  secondary: "#878787",
  border: "#dbd9d5",
  highlight: "#f7f7f7",
} as const;

const SYSTEM_FONT =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export const EMAIL_CLIENT_CSS = `
:root {
  color-scheme: light only;
  supported-color-schemes: light;
}
html,
body,
.email-body {
  background-color: ${emailColors.background} !important;
  color: ${emailColors.foreground} !important;
}
.email-container,
.email-footer {
  background-color: ${emailColors.background} !important;
  border-color: ${emailColors.border} !important;
}
img {
  border: 0;
  outline: none;
  text-decoration: none;
  -ms-interpolation-mode: bicubic;
}
a {
  text-decoration: none;
}
.email-break {
  overflow-wrap: anywhere;
  word-break: break-word;
}
.email-announcement p {
  color: ${emailColors.muted} !important;
  font-size: 14px !important;
  line-height: 1.7 !important;
  margin: 0 0 12px !important;
}
.email-announcement p:last-child {
  margin-bottom: 0 !important;
}
.email-announcement .rich-html-spacer {
  height: 12px !important;
  line-height: 12px !important;
  margin: 0 !important;
}
.email-announcement ul,
.email-announcement ol {
  color: ${emailColors.muted} !important;
  font-size: 14px !important;
  line-height: 1.7 !important;
  margin: 0 0 12px !important;
  padding-left: 20px !important;
}
.email-announcement li {
  margin: 0 0 6px !important;
}
.email-announcement a {
  color: ${emailColors.foreground} !important;
  text-decoration: underline !important;
}
.email-announcement strong,
.email-announcement b {
  color: ${emailColors.foreground} !important;
  font-weight: 600 !important;
}
.email-announcement h1,
.email-announcement h2,
.email-announcement h3,
.email-announcement h4 {
  color: ${emailColors.foreground} !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  letter-spacing: -0.02em !important;
  line-height: 1.35 !important;
  margin: 16px 0 8px !important;
}
.email-announcement blockquote {
  border-left: 2px solid ${emailColors.border} !important;
  color: ${emailColors.muted} !important;
  margin: 0 0 12px !important;
  padding: 0 0 0 12px !important;
}
.email-announcement img {
  display: block !important;
  height: auto !important;
  max-width: 100% !important;
  margin: 0 0 12px !important;
}
.email-announcement hr {
  border: 0 !important;
  border-top: 1px solid ${emailColors.border} !important;
  margin: 16px 0 !important;
}
.email-announcement table {
  border-collapse: collapse !important;
  margin: 0 0 12px !important;
  width: 100% !important;
}
.email-announcement th,
.email-announcement td {
  border: 1px solid ${emailColors.border} !important;
  padding: 8px !important;
  text-align: left !important;
  vertical-align: top !important;
}
.email-announcement code,
.email-announcement pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace !important;
  font-size: 13px !important;
}
.email-announcement pre {
  background-color: ${emailColors.highlight} !important;
  border: 1px solid ${emailColors.border} !important;
  margin: 0 0 12px !important;
  padding: 12px !important;
  white-space: pre-wrap !important;
}
@media only screen and (max-width: 600px) {
  .email-body {
    padding: 12px 8px !important;
  }
  .email-container {
    width: 100% !important;
    max-width: 100% !important;
    border-left: none !important;
    border-right: none !important;
  }
  .email-brand,
  .email-content,
  .email-footer {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
  .email-cta {
    display: block !important;
    width: 100% !important;
    box-sizing: border-box !important;
    text-align: center !important;
  }
  .email-code {
    font-size: 26px !important;
    letter-spacing: 3px !important;
  }
  .email-qr {
    width: 148px !important;
    height: 148px !important;
  }
  .email-heading {
    font-size: 20px !important;
  }
}
@media (prefers-color-scheme: dark) {
  html,
  body,
  .email-body {
    background-color: ${emailColors.background} !important;
    color: ${emailColors.foreground} !important;
  }
  .email-container,
  .email-footer {
    background-color: ${emailColors.background} !important;
    border-color: ${emailColors.border} !important;
  }
  .email-icon {
    filter: none !important;
  }
  .email-announcement,
  .email-announcement p,
  .email-announcement li,
  .email-announcement blockquote {
    color: ${emailColors.muted} !important;
  }
  .email-announcement a,
  .email-announcement strong,
  .email-announcement b,
  .email-announcement h1,
  .email-announcement h2,
  .email-announcement h3,
  .email-announcement h4 {
    color: ${emailColors.foreground} !important;
  }
}
[data-ogsc] .email-body,
[data-ogsb] .email-body,
[data-ogsc] .email-container,
[data-ogsb] .email-container,
[data-ogsc] .email-footer,
[data-ogsb] .email-footer {
  background-color: ${emailColors.background} !important;
  color: ${emailColors.foreground} !important;
}
[data-ogsc] .email-icon,
[data-ogsb] .email-icon {
  filter: none !important;
}
`;

export const emailTheme = {
  body: {
    backgroundColor: emailColors.background,
    colorScheme: "light only" as const,
    color: emailColors.foreground,
    fontFamily: SYSTEM_FONT,
    margin: 0,
    padding: "24px 12px",
    width: "100%",
    WebkitTextSizeAdjust: "100%",
    msTextSizeAdjust: "100%",
  },
  container: {
    backgroundColor: emailColors.background,
    colorScheme: "light only" as const,
    border: `1px solid ${emailColors.border}`,
    margin: "0 auto",
    maxWidth: "560px",
    width: "100%",
  },
  brandBar: {
    padding: "28px 22px 0",
  },
  brandWordmark: {
    color: emailColors.foreground,
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    margin: 0,
    textTransform: "uppercase" as const,
  },
  brandKicker: {
    color: emailColors.secondary,
    fontSize: "13px",
    fontWeight: 400,
    letterSpacing: 0,
    margin: "6px 0 0",
    textTransform: "none" as const,
  },
  content: {
    padding: "24px 22px 8px",
  },
  heading: {
    color: emailColors.foreground,
    fontSize: "22px",
    fontWeight: 500,
    letterSpacing: "-0.02em",
    lineHeight: "1.3",
    margin: "0 0 20px",
  },
  greeting: {
    color: emailColors.foreground,
    fontSize: "14px",
    fontWeight: 500,
    margin: "0 0 12px",
  },
  bodyText: {
    color: emailColors.muted,
    fontSize: "14px",
    lineHeight: "1.7",
    margin: "0 0 16px",
  },
  hr: {
    borderColor: emailColors.border,
    borderStyle: "solid",
    borderWidth: "1px 0 0",
    margin: "24px 0 16px",
  },
  ctaButton: {
    backgroundColor: "transparent",
    border: `1px solid ${emailColors.foreground}`,
    boxSizing: "border-box" as const,
    color: emailColors.foreground,
    display: "inline-block",
    fontFamily: SYSTEM_FONT,
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "1.2",
    padding: "12px 20px",
    textAlign: "center" as const,
    textDecoration: "none",
    textTransform: "none" as const,
  },
  panel: {
    backgroundColor: emailColors.highlight,
    border: `1px solid ${emailColors.border}`,
    margin: "0 0 20px",
    padding: "16px",
  },
  panelTitle: {
    color: emailColors.foreground,
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: "1.35",
    margin: "0 0 4px",
  },
  detailLabel: {
    color: emailColors.secondary,
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.04em",
    margin: "0 0 2px",
    textTransform: "uppercase" as const,
  },
  detailValue: {
    color: emailColors.foreground,
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "1.45",
    margin: 0,
    overflowWrap: "anywhere" as const,
    wordBreak: "break-word" as const,
  },
  footer: {
    backgroundColor: emailColors.background,
    borderTop: `1px solid ${emailColors.border}`,
    padding: "20px 22px 24px",
  },
  footerHeading: {
    color: emailColors.foreground,
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: 0,
    margin: "0 0 14px",
    textAlign: "left" as const,
    textTransform: "none" as const,
  },
  socialIconLink: {
    display: "block",
    lineHeight: 0,
    textDecoration: "none",
  },
  footerNav: {
    color: emailColors.muted,
    fontSize: "12px",
    lineHeight: "1.7",
    margin: "0 0 12px",
  },
  footerNavLink: {
    color: emailColors.foreground,
    textDecoration: "none",
  },
  footerMeta: {
    color: emailColors.secondary,
    fontSize: "12px",
    lineHeight: "1.6",
    margin: "0 0 8px",
    textAlign: "left" as const,
  },
  footerEmail: {
    color: emailColors.foreground,
  },
  footerLink: {
    color: emailColors.foreground,
    textDecoration: "underline",
  },
  copyright: {
    color: emailColors.secondary,
    fontSize: "12px",
    margin: 0,
    textAlign: "left" as const,
  },
  interFont: {
    fallbackFontFamily: "Helvetica" as const,
    fontFamily: "Inter",
    fontStyle: "normal" as const,
    fontWeight: 400,
    webFont: {
      url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2",
      format: "woff2" as const,
    },
  },
};
