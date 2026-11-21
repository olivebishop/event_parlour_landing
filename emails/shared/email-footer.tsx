import { Link, Section, Text } from "@react-email/components";
import type * as React from "react";
import { EmailSvgImg, socialIconSrc } from "./email-svg";
import {
  EMAIL_EVENTS_URL,
  EMAIL_SUPPORT_URL,
  EMAIL_WEBSITE_URL,
  SOCIAL_LINKS,
  emailTheme,
} from "./email-theme";

const ICON = 20;
const CELL = 36;

export function EmailFooter({
  note,
}: {
  note: React.ReactNode;
  appUrl?: string;
}): React.JSX.Element {
  const year = new Date().getFullYear();

  return (
    <Section className="email-footer" style={emailTheme.footer}>
      <Text style={emailTheme.footerHeading}>Host events. Sell tickets.</Text>

      <table
        border={0}
        cellPadding={0}
        cellSpacing={0}
        role="presentation"
        style={{ borderCollapse: "collapse", margin: "0 0 16px" }}
      >
        <tbody>
          <tr>
            {SOCIAL_LINKS.map((link) => (
              <td
                key={link.id}
                style={{
                  padding: "0 16px 0 0",
                  verticalAlign: "middle",
                  width: CELL,
                }}
                width={CELL}
              >
                <Link href={link.href} style={emailTheme.socialIconLink}>
                  <EmailSvgImg
                    alt={link.label}
                    height={ICON}
                    src={socialIconSrc(link.id)}
                    width={ICON}
                  />
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <Text style={emailTheme.footerNav}>
        <Link href={EMAIL_WEBSITE_URL} style={emailTheme.footerNavLink}>
          Website
        </Link>
        {" · "}
        <Link href={EMAIL_EVENTS_URL} style={emailTheme.footerNavLink}>
          Events
        </Link>
        {" · "}
        <Link href={EMAIL_SUPPORT_URL} style={emailTheme.footerNavLink}>
          Support
        </Link>
      </Text>

      <Text className="email-break" style={emailTheme.footerMeta}>
        {note}
      </Text>

      <Text style={emailTheme.copyright}>
        © {year} Event Parlour. All rights reserved.
      </Text>
    </Section>
  );
}
