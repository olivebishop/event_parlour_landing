import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Environment variables with validation
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_TO = process.env.EMAIL_TO;
const EMAIL_SECURE = process.env.EMAIL_SECURE === "True";

export async function POST(req: NextRequest) {
  // Check if required environment variables are set
  if (
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
    
    const { name, email, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Nodemailer transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        secure: EMAIL_SECURE, // Use the boolean value from env var
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
    
    // Return valid JSON success response
    return NextResponse.json({ success: true });
  } catch (error) {
    // Make sure we always return a valid JSON response
    console.error("❌ Unhandled error in contact route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}