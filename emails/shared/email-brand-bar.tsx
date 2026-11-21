import { Section, Text } from "@react-email/components";
import type * as React from "react";
import { emailTheme } from "./email-theme";

export function EmailBrandBar({
  kicker,
}: {
  kicker?: string;
}): React.JSX.Element {
  return (
    <Section className="email-brand" style={emailTheme.brandBar}>
      <Text style={emailTheme.brandWordmark}>Event Parlour</Text>
      {kicker ? <Text style={emailTheme.brandKicker}>{kicker}</Text> : null}
    </Section>
  );
}
