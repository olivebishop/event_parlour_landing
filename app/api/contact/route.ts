import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  // Environment variables with proper handling
  const EMAIL_HOST = process.env.EMAIL_HOST;
  const EMAIL_PORT = process.env.EMAIL_PORT;
  const EMAIL_USER = process.env.EMAIL_USER;
  // Remove any spaces from the password
  const EMAIL_PASS = process.env.EMAIL_PASS?.replace(/\s/g, '');
  // Make sure FROM address is a valid email
  const EMAIL_FROM = process.env.EMAIL_USER; // Using EMAIL_USER as fallback is safer with Gmail
  // For Gmail with port 587, secure should be false regardless of env setting
  const EMAIL_SECURE = false;

  // Check if required environment variables are set
  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
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
    
    // Create nodemailer transporter with Gmail-specific settings
    let transporter;
    try {
      console.log(`📧 Setting up email transport with ${EMAIL_HOST}:${EMAIL_PORT}`);
      
      transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        secure: EMAIL_SECURE,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
        // Gmail-specific settings for reliability
        tls: {
          rejectUnauthorized: false, // Less strict about certificates
        },
      });
      
      // Verify connection before proceeding
      await transporter.verify();
      console.log("✅ SMTP connection verified successfully");
      
    } catch (error) {
      console.error("❌ Email transport configuration error:", error);
      return NextResponse.json(
        { error: "Error configuring email service" },
        { status: 500 }
      );
    }
    
    // Send emails
    try {
      console.log("📤 Sending email to admin...");
      
      // Email to admin (your own email)
      await transporter.sendMail({
        from: EMAIL_FROM,
        to: EMAIL_USER, // Send to your own email address
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
          <h2 style="margin:0">New enquiry from Event Parlour Website(Contact Us)</h2>
          <p><strong>Name:</strong> ${name}<br/>
             <strong>Email:</strong> ${email}<br/>
             <strong>Subject:</strong> ${subject}</p>
          <pre style="white-space: pre-wrap;">${message}</pre>
        `,
      });
      
      console.log("✅ Admin email sent");
      console.log("📤 Sending acknowledgment to visitor...");
      
     // Modified email template with improved styling
// Acknowledgment email to visitor
await transporter.sendMail({
  from: EMAIL_FROM,
  to: email,
  subject: "We received your message – Event Parlour",
  html: `
    <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#171717;color:#ffffff;border-radius:8px;">
      <div style="text-align:center;margin-bottom:24px;">
        <h1 style="margin:0;font-size:28px;background:linear-gradient(90deg,#f5f5f5,#bdbdbd);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:700;">
          Thank You for Reaching Out!
        </h1>
      </div>
      
      <div style="background:rgba(255,255,255,0.05);border-left:4px solid #e5e5e5;padding:16px;margin:24px 0;border-radius:4px;">
        <p style="margin:0;font-size:16px;">
          Hello <span style="font-weight:600;">${name?.split(" ")[0]}</span>,
        </p>
      </div>
      
      <p style="margin:24px 0;font-size:16px;line-height:1.6;">
        We've received your message regarding <strong>"${subject}"</strong> and our team will review it shortly.
      </p>
      
      <p style="margin:24px 0;font-size:16px;line-height:1.6; color:#a3a3a3;">
        At Event Parlour, we strive to provide excellent service, and your inquiry is important to us. 
        We'll get back to you as soon as possible.
      </p>
      
      <div style="margin:32px 0;padding-top:24px;border-top:1px solid rgba(255,255,255,0.1);">
        <p style="margin:0;font-size:14px;color:#a3a3a3;text-align:center;">
          <span style="display:block;margin-bottom:8px;">Event Parlour Team</span>
          <a href="https://eventparlour.com" style="color:#e5e5e5;text-decoration:none;">eventparlour.com</a>
        </p>
      </div>
      
      <div style="background:rgba(0,0,0,0.2);padding:12px;border-radius:4px;margin-top:24px;">
        <p style="margin:0;font-size:12px;color:#a3a3a3;text-align:center;">
          Sent automatically on ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}.
        </p>
      </div>
    </div>
  `,
});
      console.log("✅ Visitor acknowledgment email sent");
    } catch (error) {
      console.error("❌ Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
    
    console.log("✅ Contact form submission completed successfully");
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("❌ Unhandled error in contact route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}