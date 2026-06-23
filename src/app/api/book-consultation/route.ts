import { NextRequest, NextResponse } from 'next/server';

function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildEmailHtml(s: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  location: string;
  lens: string;
  message: string;
}): string {
  const patientRows =
    '<p style="margin:4px 0;"><strong>Name:</strong> ' +
    s.firstName +
    ' ' +
    s.lastName +
    '</p>' +
    '<p style="margin:4px 0;"><strong>Email:</strong> ' +
    s.email +
    '</p>' +
    '<p style="margin:4px 0;"><strong>Phone:</strong> ' +
    s.phone +
    '</p>' +
    '<p style="margin:4px 0;"><strong>Preferred Contact Method:</strong> ' +
    (s.preferredContact || 'Not specified') +
    '</p>' +
    '<p style="margin:4px 0;"><strong>Preferred Location:</strong> ' +
    s.location +
    '</p>';

  const inquiryRows =
    '<p style="margin:4px 0;"><strong>Lens of Interest:</strong> ' +
    (s.lens || 'Not specified') +
    '</p>' +
    '<p style="margin:4px 0;"><strong>Message:</strong></p>' +
    '<p style="color:#666;white-space:pre-wrap;">' +
    (s.message || 'No additional notes provided.') +
    '</p>';

  return (
    '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:24px;border-radius:8px;">' +
    '<h2 style="color:#1a1a2e;margin-top:0;">New Consultation Request</h2>' +
    '<p style="color:#444;">A new &quot;Book a Consultation&quot; form has been submitted on the Marano Eye Care website.</p>' +
    '<div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:16px;margin:16px 0;">' +
    '<h3 style="margin-top:0;color:#c5a059;">Patient Information</h3>' +
    patientRows +
    '</div>' +
    '<div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:16px;margin:16px 0;">' +
    '<h3 style="margin-top:0;color:#1a1a2e;">Inquiry Details</h3>' +
    inquiryRows +
    '</div>' +
    '<p style="color:#888;font-size:12px;margin-top:24px;">This notification was sent automatically from the Marano Eye Care website.</p>' +
    '</div>'
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, preferredContact, location, lens, message } = body;

    // Server-side validation
    if (
      typeof firstName !== 'string' ||
      !firstName.trim() ||
      firstName.length > 50 ||
      typeof lastName !== 'string' ||
      !lastName.trim() ||
      lastName.length > 50 ||
      typeof email !== 'string' ||
      !email.trim() ||
      email.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof phone !== 'string' ||
      !phone.trim() ||
      phone.length > 25 ||
      !/^[\d\s()+-]{7,25}$/.test(phone) ||
      typeof location !== 'string' ||
      !location.trim() ||
      typeof preferredContact !== 'string' ||
      !['email', 'phone', 'text'].includes(preferredContact)
    ) {
      return NextResponse.json(
        { error: 'Invalid or incomplete payload parameters.' },
        { status: 400 }
      );
    }

    if (message && (typeof message !== 'string' || message.length > 1000)) {
      return NextResponse.json({ error: 'Message payload is too long.' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Brevo API key not configured' }, { status: 500 });
    }

    const safe = {
      firstName: escapeHtml(firstName),
      lastName: escapeHtml(lastName),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      preferredContact: escapeHtml(preferredContact),
      location: escapeHtml(location),
      lens: escapeHtml(lens),
      message: escapeHtml(message),
    };

    const htmlContent = buildEmailHtml(safe);

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
          name: safe.firstName + ' ' + safe.lastName,
        },
        subject: 'New Consultation Request: ' + safe.firstName + ' ' + safe.lastName,
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

    console.info('Email sent successfully:', result.messageId);
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error('Booking submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
