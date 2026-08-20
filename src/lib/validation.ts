export interface ConsultationBooking {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone' | 'text' | string;
  location: string;
  lens: string;
  message?: string;
  quizResult?: string;
}

export interface QuizRecommendation {
  lensName: string;
  lensTagline: string;
  answers?: string[];
}

export function validateConsultationBooking(
  data: Partial<ConsultationBooking>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const firstName = (data.firstName || '').trim();
  if (!firstName) {
    errors.firstName = 'Please enter your first name.';
  } else if (firstName.length > 50) {
    errors.firstName = 'First name must be 50 characters or fewer.';
  } else if (!/^[A-Za-z\s'-]+$/.test(firstName)) {
    errors.firstName = 'Please use letters, spaces, hyphens, or apostrophes only.';
  }

  const lastName = (data.lastName || '').trim();
  if (!lastName) {
    errors.lastName = 'Please enter your last name.';
  } else if (lastName.length > 50) {
    errors.lastName = 'Last name must be 50 characters or fewer.';
  } else if (!/^[A-Za-z\s'-]+$/.test(lastName)) {
    errors.lastName = 'Please use letters, spaces, hyphens, or apostrophes only.';
  }

  const email = (data.email || '').trim();
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (email.length > 100) {
    errors.email = 'Email address must be 100 characters or fewer.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address (e.g., name@example.com).';
  }

  const phone = (data.phone || '').trim();
  if (!phone) {
    errors.phone = 'Please enter a phone number where we can reach you.';
  } else if (phone.length > 25) {
    errors.phone = 'Phone number must be 25 characters or fewer.';
  } else if (!/^[\d\s()+-]{7,25}$/.test(phone)) {
    errors.phone = 'Please enter a valid phone number (e.g., 973-555-0123).';
  }

  const location = (data.location || '').trim();
  if (!location) {
    errors.location = 'Please choose Livingston, Denville, or Newark.';
  }

  if (data.preferredContact && !['email', 'phone', 'text'].includes(data.preferredContact)) {
    errors.preferredContact = 'Please select a valid contact method';
  }

  if (data.message && data.message.trim().length > 1000) {
    errors.message = 'Your message is too long (maximum 1,000 characters).';
  }

  return errors;
}

export function validateQuizPayload(data: Partial<QuizRecommendation>): Record<string, string> {
  const errors: Record<string, string> = {};

  const lensName = (data.lensName || '').trim();
  if (!lensName) {
    errors.lensName = 'Lens name is required';
  } else if (lensName.length > 100) {
    errors.lensName = 'Lens name is too long';
  }

  const lensTagline = (data.lensTagline || '').trim();
  if (lensTagline.length > 200) {
    errors.lensTagline = 'Lens tagline is too long';
  }

  if (data.answers !== undefined) {
    if (!Array.isArray(data.answers) || data.answers.length > 20) {
      errors.answers = 'Invalid answers list';
    } else {
      for (const ans of data.answers) {
        if (typeof ans !== 'string' || ans.length > 200) {
          errors.answers = 'One or more answer strings are too long';
          break;
        }
      }
    }
  }

  return errors;
}
