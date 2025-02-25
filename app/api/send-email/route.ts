import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    console.log("Received POST request to /api/send-email")
    let body
    try {
      body = await req.json()
    } catch (jsonError) {
      console.error("Failed to parse request body:", jsonError)
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
    }
    console.log("Request body:", body)

    const { name, email, subject, message, turnstileToken } = body as {
      name: string
      email: string
      subject: string
      message: string
      turnstileToken: string
    }

    if (!name || !email || !subject || !message || !turnstileToken) {
      console.error("Missing required fields:", { name, email, subject, message, turnstileToken })
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    console.log("Verifying Turnstile token:", turnstileToken)
    const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: turnstileToken }),
    })

    if (!turnstileResponse.ok) {
      console.error("Turnstile verification failed with status:", turnstileResponse.status)
      return NextResponse.json(
        { message: `Turnstile verification failed: ${turnstileResponse.statusText}` },
        { status: 500 }
      )
    }

    const turnstileResult = await turnstileResponse.json()
    console.log("Turnstile verification result:", turnstileResult)
    if (!turnstileResult.success) {
      return NextResponse.json({ message: "Invalid Turnstile verification" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    })

    console.log("Sending email to owner:", process.env.EMAIL_TO)
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission: ${subject}`,
      html: `<h2>New Message from ${name}</h2><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong> ${message}</p>`,
    })

    console.log("Sending confirmation email to:", email)
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Thank You for Contacting Event Parlour",
      html: `<h2>Message Received</h2><p>Dear ${name},</p><p>Thank you for reaching out! We've received your message and will get back to you soon.</p><p><strong>Your Message:</strong> ${message}</p><p>Best regards,<br>Event Parlour Team</p>`,
    })

    console.log("Emails sent successfully")
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in POST /api/send-email:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to send email due to a server issue"
    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}