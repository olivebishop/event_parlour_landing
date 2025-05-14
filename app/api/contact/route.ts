import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ✅ Environment variables with validation
const {
  TURNSTILE_SECRET_KEY,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_FROM,
  EMAIL_TO,
} = process.env;

if (
  !TURNSTILE_SECRET_KEY ||
  !EMAIL_HOST ||
  !EMAIL_PORT ||
  !EMAIL_USER ||
  !EMAIL_PASS ||
  !EMAIL_FROM ||
  !EMAIL_TO
) {
  throw new Error("❌ Missing one or more required environment variables.");
}

export async function POST(req: NextRequest) {
  try {
    const { token, name, email, subject, message } = await req.json();

    // ✅ Verify Turnstile token
    const form = new URLSearchParams();
    form.append("secret", TURNSTILE_SECRET_KEY as string);
    form.append("response", token);

    const turnstileRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: form,
      }
    ).then((r) => r.json());

    if (!turnstileRes.success) {
      return NextResponse.json(
        { error: "Turnstile verification failed" },
        { status: 400 }
      );
    }

    // ✅ Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: Number(EMAIL_PORT) === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // ✅ Email to admin (you)
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

    // ✅ Acknowledgment email to visitor
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
            We’ve received your message (<em>${subject}</em>) and will get back to you shortly.<br/><br/>
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Error in contact route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
