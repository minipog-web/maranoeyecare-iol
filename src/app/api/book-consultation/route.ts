import { NextRequest, NextResponse } from 'next/server';
import { validateConsultationBooking, ConsultationBooking } from '@/lib/validation';
import { sendConsultationNotification } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const bookingData: ConsultationBooking = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      preferredContact: body.preferredContact,
      location: body.location,
      lens: body.lens,
      message: body.message,
      quizResult: body.quizResult,
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
