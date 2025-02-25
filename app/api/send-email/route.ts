import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const { name, email, subject, message, turnstileToken } = body as {
      name: string
      email: string
      subject: string
      message: string
      turnstileToken: string
    }

    // Verify Turnstile token
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    )

    if (!turnstileResponse.ok) {
      throw new Error("Failed to verify Turnstile token")
    }

    const turnstileResult = await turnstileResponse.json()
    if (!turnstileResult.success) {
      return NextResponse.json({ message: "Invalid Turnstile verification" }, { status: 400 })
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email to platform owner
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Thank You for Contacting Event Parlour",
      html: `
        <h2>Message Received</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out! We've received your message and will get back to you soon.</p>
        <p><strong>Your Message:</strong> ${message}</p>
        <p>Best regards,<br>Event Parlour Team</p>
      `,
    })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in POST /api/send-email:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send email due to a server issue"
    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}