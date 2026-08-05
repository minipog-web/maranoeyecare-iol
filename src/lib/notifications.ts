import { ConsultationBooking, QuizRecommendation } from './validation';

function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildConsultationEmailHtml(s: ConsultationBooking): string {
  const safe = {
    firstName: escapeHtml(s.firstName),
    lastName: escapeHtml(s.lastName),
    email: escapeHtml(s.email),
    phone: escapeHtml(s.phone),
    preferredContact: escapeHtml(s.preferredContact),
    location: escapeHtml(s.location),
    lens: escapeHtml(s.lens),
    message: escapeHtml(s.message || ''),
    quizResult: s.quizResult ? escapeHtml(String(s.quizResult)) : undefined,
  };

  const patientRows = `
    <p style="margin:4px 0;"><strong>Name:</strong> ${safe.firstName} ${safe.lastName}</p>
    <p style="margin:4px 0;"><strong>Email:</strong> ${safe.email}</p>
    <p style="margin:4px 0;"><strong>Phone:</strong> ${safe.phone}</p>
    <p style="margin:4px 0;"><strong>Preferred Contact Method:</strong> ${safe.preferredContact || 'Not specified'}</p>
    <p style="margin:4px 0;"><strong>Preferred Location:</strong> ${safe.location}</p>
  `;

  const inquiryRows = `
    <p style="margin:4px 0;"><strong>Lens of Interest:</strong> ${safe.lens || 'Not specified'}</p>
    ${safe.quizResult ? `<p style="margin:4px 0;"><strong>Lens Quiz Result:</strong> ${safe.quizResult.toUpperCase()}</p>` : ''}
    <p style="margin:4px 0;"><strong>Message:</strong></p>
    <p style="color:#666;white-space:pre-wrap;">${safe.message || 'No additional notes provided.'}</p>
  `;

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:24px;border-radius:8px;">
      <h2 style="color:#1a1a2e;margin-top:0;">New Consultation Request</h2>
      <p style="color:#444;">A new &quot;Book a Consultation&quot; form has been submitted on the Marano Eye Care website.</p>
      <div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:16px;margin:16px 0;">
        <h3 style="margin-top:0;color:#c5a059;">Patient Information</h3>
        ${patientRows}
      </div>
      <div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:16px;margin:16px 0;">
        <h3 style="margin-top:0;color:#1a1a2e;">Inquiry Details</h3>
        ${inquiryRows}
      </div>
      <p style="color:#888;font-size:12px;margin-top:24px;">This notification was sent automatically from the Marano Eye Care website.</p>
    </div>
  `;
}

function buildQuizEmailHtml(q: QuizRecommendation): string {
  const safeName = escapeHtml(q.lensName);
  const safeTagline = escapeHtml(q.lensTagline);
  const answersHtml =
    Array.isArray(q.answers) && q.answers.length > 0
      ? `<ul style="margin:8px 0;padding-left:20px;">${q.answers.map((a: string) => `<li style="margin-bottom:4px;">${escapeHtml(a)}</li>`).join('')}</ul>`
      : '<p style="color:#888;">No answer details captured.</p>';

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:24px;border-radius:8px;">
      <h2 style="color:#1a1a2e;margin-top:0;">New Lens Recommendation Completed</h2>
      <p style="color:#444;">A patient has completed the IOL Lens Recommendation Quiz on the Marano Eye Care website.</p>
      <div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:16px;margin:16px 0;">
        <h3 style="margin-top:0;color:#c5a059;">Recommended Lens</h3>
        <p style="font-size:18px;font-weight:bold;color:#1a1a2e;margin:4px 0;">${safeName}</p>
        <p style="color:#666;margin:4px 0;">${safeTagline}</p>
      </div>
      <div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:16px;margin:16px 0;">
        <h3 style="margin-top:0;color:#1a1a2e;">Patient Answers</h3>
        ${answersHtml}
      </div>
      <p style="color:#888;font-size:12px;margin-top:24px;">This notification was sent automatically from the Marano Eye Care website.</p>
    </div>
  `;
}

export async function sendNotificationEmail(payload: {
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name: string };
}) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error('BREVO_API_KEY_MISSING');
  }

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
        { email: 'staff@mec1.net', name: 'Marano Eye Care Staff' },
        { email: 'adam.pogash@mec1.net', name: 'Adam Pogash' },
      ],
      replyTo: payload.replyTo,
      subject: payload.subject,
      htmlContent: payload.htmlContent,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    const error = new Error(result.message || 'Failed to send email via Brevo');
    (error as unknown as { code?: string; details?: unknown }).code = result.code;
    (error as unknown as { code?: string; details?: unknown }).details = result;
    throw error;
  }

  return result;
}

export async function sendConsultationNotification(booking: ConsultationBooking) {
  const htmlContent = buildConsultationEmailHtml(booking);
  const fullName = `${booking.firstName.trim()} ${booking.lastName.trim()}`;
  return sendNotificationEmail({
    subject: `New Consultation Request: ${fullName}`,
    htmlContent,
    replyTo: { email: booking.email.trim(), name: fullName },
  });
}

export async function sendQuizNotification(quiz: QuizRecommendation) {
  const htmlContent = buildQuizEmailHtml(quiz);
  return sendNotificationEmail({
    subject: `New Lens Quiz Result: ${quiz.lensName}`,
    htmlContent,
  });
}
