import type { APIRoute } from "astro"
import { getSecret } from "astro:env/server"
import { createElement, type ReactElement } from "react"
import { render, toPlainText } from "@react-email/render"
import { Resend } from "resend"
import { ContactReceivedEmail } from "@/emails/contact-received-email"
import { ContactTeamEmail } from "@/emails/contact-team-email"

/**
 * Contact form handler. Sends through Resend from the eventparlour.com domain,
 * the same way eventpalour_app does (lib/server/send-react-email.ts).
 *
 * Env (see .env.example): RESEND_API_KEY, EMAIL_FROM_SUPPORT / EMAIL_FROM,
 * EMAIL_FROM_SUPPORT_NAME, CONTACT_TO_EMAIL.
 */
export const prerender = false

const DEFAULT_TO = "olivehendrilgen1@gmail.com"
const DEFAULT_FROM = "noreply@eventparlour.com"
const MAX_LENGTH = { name: 120, email: 254, subject: 200, message: 5000 } as const
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })

async function renderEmail(element: ReactElement) {
  const html = await render(element)
  return { html, text: toPlainText(html).trim() }
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = getSecret("RESEND_API_KEY")
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set.")
    return json({ error: "Server configuration error" }, 500)
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return json({ error: "Invalid request body" }, 400)
  }

  const field = (key: keyof typeof MAX_LENGTH) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : ""
  const fields = {
    name: field("name"),
    email: field("email"),
    subject: field("subject"),
    message: field("message"),
  }

  if (!fields.name || !fields.email || !fields.subject || !fields.message) {
    return json({ error: "Missing required fields" }, 400)
  }
  if (!EMAIL_PATTERN.test(fields.email)) {
    return json({ error: "Please enter a valid email address" }, 400)
  }
  for (const [key, limit] of Object.entries(MAX_LENGTH)) {
    if (fields[key as keyof typeof fields].length > limit) {
      return json({ error: `${key[0].toUpperCase()}${key.slice(1)} is too long` }, 400)
    }
  }

  const fromAddress =
    getSecret("EMAIL_FROM_SUPPORT") || getSecret("EMAIL_FROM") || DEFAULT_FROM
  const fromName = getSecret("EMAIL_FROM_SUPPORT_NAME") || "Event Parlour"
  const from = `${fromName} <${fromAddress}>`
  const to = getSecret("CONTACT_TO_EMAIL") || DEFAULT_TO

  const resend = new Resend(apiKey)

  try {
    const team = await renderEmail(createElement(ContactTeamEmail, fields))
    const teamResult = await resend.emails.send({
      from,
      to: [to],
      replyTo: fields.email,
      subject: `New contact: ${fields.subject}`,
      html: team.html,
      text: team.text,
    })
    if (teamResult.error) throw new Error(teamResult.error.message)

    // The enquiry reached the team; a failed acknowledgment shouldn't fail the form.
    try {
      const ack = await renderEmail(
        createElement(ContactReceivedEmail, { name: fields.name, subject: fields.subject }),
      )
      const ackResult = await resend.emails.send({
        from,
        to: [fields.email],
        subject: "We received your message – Event Parlour",
        html: ack.html,
        text: ack.text,
      })
      if (ackResult.error) throw new Error(ackResult.error.message)
    } catch (error) {
      console.error("Contact form: acknowledgment email failed:", error)
    }
  } catch (error) {
    console.error("Contact form: sending failed:", error)
    return json({ error: "Failed to send email" }, 500)
  }

  return json({ success: true })
}
