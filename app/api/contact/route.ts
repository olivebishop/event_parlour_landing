import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Environment variables with validation
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_TO = process.env.EMAIL_TO;

export async function POST(req: NextRequest) {
  // Check if required environment variables are set
  if (
    !TURNSTILE_SECRET_KEY ||
    !EMAIL_HOST ||
    !EMAIL_PORT ||
    !EMAIL_USER ||
    !EMAIL_PASS ||
    !EMAIL_FROM ||
    !EMAIL_TO
  ) {
    console.error("❌ Missing one or more required environment variables.");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }
  
  try {
    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("❌ Invalid request body:", error);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    
    const { token, name, email, subject, message } = body;
    
    // Validate required fields
    if (!token || !name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Verify Turnstile token
    let turnstileRes;
    try {
      const form = new URLSearchParams();
      form.append("secret", TURNSTILE_SECRET_KEY as string);
      form.append("response", token);
      
      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: form,
        }
      );
      
      if (!turnstileResponse.ok) {
        throw new Error(`Turnstile API responded with status: ${turnstileResponse.status}`);
      }
      
      turnstileRes = await turnstileResponse.json();
    } catch (error) {
      console.error("❌ Turnstile verification error:", error);
      return NextResponse.json(
        { error: "Error verifying security challenge" },
        { status: 500 }
      );
    }
    
    if (!turnstileRes.success) {
      return NextResponse.json(
        { error: "Security challenge verification failed" },
        { status: 400 }
      );
    }
    
    // Nodemailer transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        secure: Number(EMAIL_PORT) === 465,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });
    } catch (error) {
      console.error("❌ Email transport configuration error:", error);
      return NextResponse.json(
        { error: "Error configuring email service" },
        { status: 500 }
      );
    }
    
    // Send emails
    try {
      // Email to admin
      await transporter.sendMail({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `New contact: ${subject}`,
        replyTo: email,
        text: `
          Name:    ${name}
          Email:   ${email}
          Subject: ${subject}
          
          Message:
          ${message}
        `,
        html: `
          <h2 style="margin:0">New enquiry from Event Parlour</h2>
          <p><strong>Name:</strong> ${name}<br/>
             <strong>Email:</strong> ${email}<br/>
             <strong>Subject:</strong> ${subject}</p>
          <pre>${message}</pre>
        `,
      });
      
      // Acknowledgment email to visitor
      await transporter.sendMail({
        from: EMAIL_FROM,
        to: email,
        subject: "We received your message – Event Parlour",
        html: `
          <div style="font-family:'Inter',sans-serif;padding:24px;background:#111;color:#f5f5f5">
            <h1 style="margin-top:0;background:linear-gradient(90deg,#bdbdbd,#fff);-webkit-background-clip:text;color:transparent">
              Thank you, ${name?.split(" ")[0]}!
            </h1>
            <p>
              We've received your message (<em>${subject}</em>) and will get back to you shortly.<br/><br/>
              <small style="opacity:.8">
                Sent automatically by eventparlour.com on ${new Date().toLocaleString(
                  "en-KE",
                  { timeZone: "Africa/Nairobi" }
                )}.
              </small>
            </p>
          </div>
        `,
      });
    } catch (error) {
      console.error("❌ Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
    
    // Success response
    return NextResponse.json({ success: true });
  } catch (error) {
    // Important: Make sure we return a proper JSON response even for unhandled errors
    console.error("❌ Unhandled error in contact route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}