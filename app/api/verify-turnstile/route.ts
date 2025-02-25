// app/api/verify-turnstile/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token } = body;
  
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token is required" },
      { status: 400 }
    );
  }
  
  try {
    const formData = new URLSearchParams();
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY as string);
    formData.append('response', token);
    
    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    
    const data = await result.json();
    
    if (!data.success) {
      return NextResponse.json({
        success: false,
        message: "Verification failed",
        errors: data['error-codes'] || []
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: true,
      message: "Verification successful"
    });
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return NextResponse.json(
      { success: false, message: "Verification failed" },
      { status: 500 }
    );
  }
}