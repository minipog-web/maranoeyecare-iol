import { NextRequest, NextResponse } from 'next/server';
import { validateQuizPayload, QuizRecommendation } from '@/lib/validation';
import { sendQuizNotification } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const quizData: QuizRecommendation = {
      lensName: body.lensName,
      lensTagline: body.lensTagline,
      answers: body.answers,
    };

    // Domain validation
    const errors = validateQuizPayload(quizData);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Invalid payload parameters.', errors }, { status: 400 });
    }

    const result = await sendQuizNotification(quizData);
    console.info('Email sent successfully:', result.messageId);
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error: unknown) {
    console.error('Notify staff error:', error);
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
