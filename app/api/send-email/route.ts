import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { name, email, subject, message, turnstileToken } = req.body as {
    name: string
    email: string
    subject: string
    message: string
    turnstileToken: string
  }

  // Verify Turnstile token
  try {
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    )
    const turnstileResult = await turnstileResponse.json()
    if (!turnstileResult.success) {
      return res.status(400).json({ message: "Invalid Turnstile verification" })
    }
  } catch (error) {
    console.error("Turnstile verification error:", error)
    return res.status(500).json({ message: "Failed to verify CAPTCHA" })
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

  try {
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

    return res.status(200).json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("Email sending error:", error)
    return res.status(500).json({ message: "Failed to send email" })
  }
}