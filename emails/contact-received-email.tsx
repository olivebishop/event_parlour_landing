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
import { EMAIL_EVENTS_URL, emailTheme } from "./shared/email-theme"

/** Acknowledgment sent to the visitor after they submit the contact form. */
export function ContactReceivedEmail({
  name,
  subject,
}: Readonly<{ name: string; subject: string }>): React.JSX.Element {
  const firstName = name.trim().split(/\s+/)[0] || "there"

  return (
    <Html lang="en">
      <Head>
        <EmailClientHead />
      </Head>
      <Preview>We received your message and will get back to you soon.</Preview>
      <Body className="email-body" style={emailTheme.body}>
        <Container className="email-container" style={emailTheme.container}>
          <EmailBrandBar kicker="We received your message" />

          <Section className="email-content" style={emailTheme.content}>
            <Text className="email-heading" style={emailTheme.heading}>
              Thank you for reaching out
            </Text>

            <Text style={emailTheme.greeting}>Hello {firstName},</Text>

            <Text style={emailTheme.bodyText}>
              We've received your message regarding{" "}
              <strong style={{ color: emailTheme.heading.color, fontWeight: 600 }}>
                "{subject}"
              </strong>{" "}
              and our team will review it shortly.
            </Text>

            <Text style={emailTheme.bodyText}>
              At Event Parlour, your enquiry is important to us. We'll get back
              to you as soon as possible. In the meantime, see what's happening
              near you.
            </Text>

            <EmailButton href={EMAIL_EVENTS_URL}>Explore events</EmailButton>
          </Section>

          <EmailFooter note="You're receiving this because you contacted Event Parlour through www.eventparlour.com. No further action is needed." />
        </Container>
      </Body>
    </Html>
  )
}

export default ContactReceivedEmail
