import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lensName, lensTagline, answers } = body;

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Brevo API key not configured' }, { status: 500 });
    }

    const answersHtml = Array.isArray(answers) && answers.length > 0
      ? `<ul style="margin:8px 0;padding-left:20px;">${answers.map((a: string) => `<li style="margin-bottom:4px;">${a}</li>`).join('')}</ul>`
      : '<p style="color:#888;">No answer details captured.</p>';

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:24px;border-radius:8px;">
        <h2 style="color:#1a1a2e;margin-top:0;">New Lens Recommendation Completed</h2>
        <p style="color:#444;">A patient has completed the IOL Lens Recommendation Quiz on the Marano Eye Care website.</p>
        <div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:16px;margin:16px 0;">
          <h3 style="margin-top:0;color:#00c9b1;">Recommended Lens</h3>
          <p style="font-size:18px;font-weight:bold;color:#1a1a2e;margin:4px 0;">${lensName}</p>
          <p style="color:#666;margin:4px 0;">${lensTagline}</p>
        </div>
        <div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:16px;margin:16px 0;">
          <h3 style="margin-top:0;color:#1a1a2e;">Patient Answers</h3>
          ${answersHtml}
        </div>
        <p style="color:#888;font-size:12px;margin-top:24px;">This notification was sent automatically from the Marano Eye Care website.</p>
      </div>
    `;

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Marano Eye Care Website',
          email: process.env.BREVO_SENDER_EMAIL || 'noreply@mec1.net',
        },
        to: [
          {
            email: 'staff@mec1.net',
            name: 'Marano Eye Care Staff',
          },
          {
            email: 'adam.pogash@mec1.net',
            name: 'Adam Pogash',
          },
        ],
        subject: `New Lens Quiz Result: ${lensName}`,
        htmlContent,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('Brevo API error:', result);
      return NextResponse.json({ 
        error: result.message || 'Failed to send email',
        code: result.code,
        details: result 
      }, { status: response.status });
    }

    console.log('Email sent successfully:', result.messageId);
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error('Notify staff error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
