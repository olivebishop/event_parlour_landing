import { Link } from "@react-email/components";
import type * as React from "react";
import { emailTheme } from "./email-theme";

export function EmailButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <table
      border={0}
      cellPadding={0}
      cellSpacing={0}
      role="presentation"
      style={{ margin: "20px 0", width: "100%" }}
      width="100%"
    >
      <tbody>
        <tr>
          <td align="left">
            <Link
              className="email-cta"
              href={href}
              style={emailTheme.ctaButton}
            >
              {children}
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
