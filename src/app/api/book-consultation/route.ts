import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, preferredContact, location, lens, message } = body;

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Brevo API key not configured' }, { status: 500 });
    }

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:24px;border-radius:8px;">
        <h2 style="color:#1a1a2e;margin-top:0;">New Consultation Request</h2>
        <p style="color:#444;">A new "Book a Consultation" form has been submitted on the Marano Eye Care website.</p>
        
        <div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:16px;margin:16px 0;">
          <h3 style="margin-top:0;color:#00c9b1;">Patient Information</h3>
          <p style="margin:4px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p style="margin:4px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin:4px 0;"><strong>Phone:</strong> ${phone}</p>
          <p style="margin:4px 0;"><strong>Preferred Contact Method:</strong> ${preferredContact || 'Not specified'}</p>
          <p style="margin:4px 0;"><strong>Preferred Location:</strong> ${location}</p>
        </div>

        <div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:16px;margin:16px 0;">
          <h3 style="margin-top:0;color:#1a1a2e;">Inquiry Details</h3>
          <p style="margin:4px 0;"><strong>Lens of Interest:</strong> ${lens || 'Not specified'}</p>
          <p style="margin:4px 0;"><strong>Message:</strong></p>
          <p style="color:#666;white-space:pre-wrap;">${message || 'No additional notes provided.'}</p>
        </div>

        <p style="color:#888;font-size:12px;margin-top:24px;">This notification was sent automatically from the Marano Eye Care website.</p>
      </div>
    `;

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
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
        replyTo: {
          email: email,
          name: `${firstName} ${lastName}`,
        },
        subject: `New Consultation Request: ${firstName} ${lastName}`,
        htmlContent,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('Brevo API error:', result);
      return NextResponse.json(
        {
          error: result.message || 'Failed to send email',
          code: result.code,
          details: result,
        },
        { status: response.status }
      );
    }

    console.log('Email sent successfully:', result.messageId);
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error('Booking submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
