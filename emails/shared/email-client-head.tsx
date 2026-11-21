import { Font } from "@react-email/components";
import type * as React from "react";
import { EMAIL_CLIENT_CSS, emailTheme } from "./email-theme";

/** Viewport, Outlook/Apple fixes, and client CSS. Place inside <Head>. */
export function EmailClientHead(): React.JSX.Element {
  return (
    <>
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="true" name="x-apple-disable-message-reformatting" />
      <meta content="light only" name="color-scheme" />
      <meta content="light" name="supported-color-schemes" />
      <Font {...emailTheme.interFont} />
      <style>{EMAIL_CLIENT_CSS}</style>
    </>
  );
}
