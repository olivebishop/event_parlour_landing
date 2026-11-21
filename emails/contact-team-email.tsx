import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import type * as React from "react"
import { EmailBrandBar } from "./shared/email-brand-bar"
import { EmailButton } from "./shared/email-button"
import { EmailClientHead } from "./shared/email-client-head"
import { EmailFooter } from "./shared/email-footer"
import { emailTheme } from "./shared/email-theme"

export type ContactEmailProps = {
  name: string
  email: string
  subject: string
  message: string
}

/** Sent to the team when someone submits the website contact form. */
export function ContactTeamEmail({
  name,
  email,
  subject,
  message,
}: Readonly<ContactEmailProps>): React.JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <EmailClientHead />
      </Head>
      <Preview>{`New enquiry from ${name}: ${subject}`}</Preview>
      <Body className="email-body" style={emailTheme.body}>
        <Container className="email-container" style={emailTheme.container}>
          <EmailBrandBar kicker="Website contact form" />

          <Section className="email-content" style={emailTheme.content}>
            <Text className="email-heading" style={emailTheme.heading}>
              New enquiry from the website
            </Text>

            <Section style={emailTheme.panel}>
              <Text style={emailTheme.detailLabel}>Name</Text>
              <Text style={{ ...emailTheme.detailValue, margin: "0 0 12px" }}>
                {name}
              </Text>
              <Text style={emailTheme.detailLabel}>Email</Text>
              <Text
                className="email-break"
                style={{ ...emailTheme.detailValue, margin: "0 0 12px" }}
              >
                {email}
              </Text>
              <Text style={emailTheme.detailLabel}>Subject</Text>
              <Text style={emailTheme.detailValue}>{subject}</Text>
            </Section>

            <Text style={emailTheme.detailLabel}>Message</Text>
            <Text
              className="email-break"
              style={{ ...emailTheme.bodyText, whiteSpace: "pre-wrap" }}
            >
              {message}
            </Text>

            <EmailButton href={`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`}>
              Reply to {name.split(" ")[0] || name}
            </EmailButton>
          </Section>

          <EmailFooter note="Sent from the contact form at www.eventparlour.com/contact. Replying to this email goes straight to the sender." />
        </Container>
      </Body>
    </Html>
  )
}

export default ContactTeamEmail
