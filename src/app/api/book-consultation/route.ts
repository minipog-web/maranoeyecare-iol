import { NextRequest, NextResponse } from 'next/server';
import { validateConsultationBooking, ConsultationBooking } from '@/lib/validation';
import { sendConsultationNotification } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  try {
    // Validate Content-Type
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected application/json.' },
        { status: 415 }
      );
    }

    // Safely parse JSON body
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Malformed JSON payload in request body.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Request body must be a valid JSON object.' },
        { status: 400 }
      );
    }

    const bookingData: ConsultationBooking = {
      firstName: typeof body.firstName === 'string' ? body.firstName.trim() : '',
      lastName: typeof body.lastName === 'string' ? body.lastName.trim() : '',
      email: typeof body.email === 'string' ? body.email.trim() : '',
      phone: typeof body.phone === 'string' ? body.phone.trim() : '',
      preferredContact:
        typeof body.preferredContact === 'string' ? body.preferredContact.trim() : 'phone',
      location: typeof body.location === 'string' ? body.location.trim() : '',
      lens: typeof body.lens === 'string' ? body.lens.trim() : '',
      message: typeof body.message === 'string' ? body.message.trim() : undefined,
      quizResult: typeof body.quizResult === 'string' ? body.quizResult.trim() : undefined,
    };

    // Domain validation
    const errors = validateConsultationBooking(bookingData);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          error:
            'Some required fields are missing or formatted incorrectly. Please review the form and try again.',
          errors,
        },
        { status: 400 }
      );
    }

    const result = await sendConsultationNotification(bookingData);
    console.info('Email sent successfully:', result.messageId);
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error: unknown) {
    console.error('Booking submission error:', error);
    const err = error as { message?: string; code?: string; details?: unknown };
    if (err.message === 'BREVO_API_KEY_MISSING') {
      return NextResponse.json({ error: 'Brevo API key not configured' }, { status: 500 });
    }
    return NextResponse.json(
      {
        error: err.message || 'Failed to send email',
        code: err.code,
        details: err.details,
      },
      { status: 500 }
    );
  }
}
