'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import styles from './BookingSection.module.css';
import { trackConsultationBooking, trackPhoneClick } from '@/lib/gtag';
import { getTrackingParams } from '@/lib/tracking-params';
import { validateConsultationBooking } from '@/lib/validation';
import { smoothScrollToElement } from '@/lib/ui';

const OFFICES = [
  { label: 'Livingston', value: 'Livingston Office (200 South Orange Ave)' },
  { label: 'Denville', value: 'Denville Office (16 Pocono Rd)' },
  { label: 'Newark', value: 'Newark Office (306 Martin Luther King Blvd)' },
];

const CONTACT_METHODS = [
  { value: 'phone', label: 'Call' },
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
];

const LENS_KEY_TO_LABEL: Record<string, string> = {
  vivity: 'Clareon Vivity (EDOF)',
  panoptix: 'PanOptix Pro (Trifocal)',
  puresee: 'TECNIS PureSee (Refractive EDOF)',
  monofocal: 'Standard Monofocal',
};

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  preferredContact: string;
  location: string;
  lens: string;
  message: string;
}

interface HeroConsultationFormProps {
  embedded?: boolean;
  externalLensKey?: string | null;
  externalQuizNote?: string;
  matchedAnswers?: string[];
}

export default function HeroConsultationForm({
  embedded = false,
  externalLensKey = null,
  externalQuizNote = '',
  matchedAnswers = [],
}: HeroConsultationFormProps) {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    phone: '',
    preferredContact: 'phone',
    location: OFFICES[0].value,
    lens: '',
    message: '',
  });
  const [showNotes, setShowNotes] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);

  useEffect(() => {
    const locParam = new URLSearchParams(window.location.search).get('loc')?.toLowerCase() || '';
    if (locParam.includes('denville')) {
      setForm((prev) => ({ ...prev, location: OFFICES[1].value }));
    } else if (locParam.includes('newark')) {
      setForm((prev) => ({ ...prev, location: OFFICES[2].value }));
    }

    const handleSelectLens = (e: Event) => {
      const lensKey = (e as CustomEvent).detail as string;
      const label = LENS_KEY_TO_LABEL[lensKey];
      if (label) {
        setForm((prev) => ({ ...prev, lens: label }));
        setQuizResult(lensKey);
      }
    };

    try {
      const stored = sessionStorage.getItem('preselect-lens');
      if (stored && LENS_KEY_TO_LABEL[stored]) {
        setForm((prev) => ({ ...prev, lens: LENS_KEY_TO_LABEL[stored] }));
        setQuizResult(stored);
      }
    } catch {
      // ignore storage errors
    }

    window.addEventListener('select-lens', handleSelectLens);
    return () => window.removeEventListener('select-lens', handleSelectLens);
  }, []);

  useEffect(() => {
    if (externalLensKey && LENS_KEY_TO_LABEL[externalLensKey]) {
      setForm((prev) => ({ ...prev, lens: LENS_KEY_TO_LABEL[externalLensKey] }));
      setQuizResult(externalLensKey);
    }
  }, [externalLensKey]);

  const formatPhone = (val: string): string => {
    if (val.startsWith('+')) return val.replace(/[^\d+\s()-]/g, '').slice(0, 25);
    const digits = val.replace(/\D/g, '');
    if (!digits) return '';
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const nextVal = name === 'phone' ? formatPhone(value) : value;
    setForm((prev) => ({ ...prev, [name]: nextVal }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = validateConsultationBooking(
      { ...form, email: '' },
      { requireEmail: false }
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = ['firstName', 'lastName', 'phone', 'location'].find(
        (key) => validationErrors[key]
      );
      if (firstErrorField) {
        const targetId =
          firstErrorField === 'location' ? 'hero-office-label' : `hero-${firstErrorField}`;
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          (el as HTMLElement).focus?.({ preventScroll: true });
        }
      }
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const trimmed = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    };
    const tracking = getTrackingParams();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'consultation');
      formData.append('bot-field', '');
      formData.append('name', `${trimmed.firstName} ${trimmed.lastName}`.trim());
      formData.append('firstName', trimmed.firstName);
      formData.append('lastName', trimmed.lastName);
      formData.append('email', '');
      formData.append('phone', trimmed.phone);
      formData.append('preferredContact', form.preferredContact || 'phone');
      formData.append('location', form.location);
      formData.append('lens', form.lens || 'Not specified');
      if (quizResult) formData.append('quizResult', quizResult);
      const combinedMessage = [externalQuizNote, trimmed.message].filter(Boolean).join(' | ');
      if (combinedMessage) formData.append('message', combinedMessage);
      if (tracking.gclid) formData.append('gclid', tracking.gclid);
      if (tracking.wbraid) formData.append('wbraid', tracking.wbraid);
      if (tracking.gbraid) formData.append('gbraid', tracking.gbraid);
      if (tracking.utm_source) formData.append('utmSource', tracking.utm_source);
      if (tracking.utm_medium) formData.append('utmMedium', tracking.utm_medium);
      if (tracking.utm_campaign) formData.append('utmCampaign', tracking.utm_campaign);
      if (tracking.utm_term) formData.append('utmTerm', tracking.utm_term);
      if (tracking.utm_content) formData.append('utmContent', tracking.utm_content);
      if (tracking.landing_page) formData.append('landingPage', tracking.landing_page);
      if (tracking.referrer) formData.append('referrer', tracking.referrer);

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        signal: controller.signal,
        body: formData.toString(),
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        setSubmitted(true);
        requestAnimationFrame(() => {
          const bookingCard = document.getElementById('booking');
          const header =
            document.querySelector<HTMLElement>('[data-header-bar]') ||
            document.querySelector<HTMLElement>('header');
          const headerHeight = header ? header.getBoundingClientRect().height : 80;
          if (bookingCard && bookingCard.getBoundingClientRect().top < headerHeight + 8) {
            smoothScrollToElement('booking');
          }
        });
        trackConsultationBooking(form.location, form.lens || 'No lens selected', quizResult, {
          phone: trimmed.phone,
          firstName: trimmed.firstName,
          lastName: trimmed.lastName,
        });
      } else {
        setErrorMessage(
          'Unable to submit right now. Please try again or call (973) 322-0100 directly.'
        );
      }
    } catch {
      clearTimeout(timeoutId);
      setErrorMessage('Connection issue. Please try again or call (973) 322-0100 directly.');
    } finally {
      setLoading(false);
    }
  };

  // 16px (text-base) on mobile prevents iOS Safari forced viewport auto-zoom on input focus
  const inputClass = `w-full px-3.5 py-2.5 ${styles.premiumInput} rounded-xl text-base sm:text-sm focus:outline-none min-h-[46px] sm:min-h-[44px] touch-manipulation`;
  const labelClass =
    'block text-[10.5px] font-bold text-slate-200/90 mb-1 uppercase tracking-[0.14em]';

  const content = (
    <>
      {!embedded && (
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-primary/70 to-transparent pointer-events-none" />
      )}

      {submitted ? (
        <div className="flex flex-col items-center justify-center text-center py-8 sm:py-10">
          <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/35 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(197,160,89,0.28)]">
            <Icon name="CheckCircleIcon" size={32} className="text-primary" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-white mb-2">
            Evaluation Request Received!
          </h2>
          <p className="text-sm text-slate-200/90 leading-relaxed max-w-sm">
            Our NJ patient care coordinator will reach out the same business day to confirm your
            visit with Dr. Marano or Dr. Raouf.
          </p>
          <a
            href="tel:9733220100"
            suppressHydrationWarning
            onClick={() => trackPhoneClick('Hero Form Confirmation Call', '(973) 322-0100')}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline min-h-[44px] px-3 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <Icon name="PhoneIcon" size={15} />
            <span>Need immediate help? Call (973) 322-0100</span>
          </a>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3.5">
            <div className="min-w-0">
              <h2 className="font-display text-lg sm:text-xl font-semibold text-white leading-tight">
                Request Your Cataract Evaluation
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Meet 1-on-1 with Dr. Marano or Dr. Raouf · Medicare Accepted
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Same-Day Callback
            </span>
          </div>

          {form.lens && (
            <div className="mb-3 px-3.5 py-2.5 rounded-xl bg-primary/15 border border-primary/35 text-xs space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-primary font-semibold min-w-0 break-words flex items-start sm:items-center gap-1.5">
                  <Icon
                    name="SparklesIcon"
                    size={14}
                    className="text-primary shrink-0 mt-0.5 sm:mt-0"
                  />
                  <span className="min-w-0">
                    Saved Lens Profile: <strong className="text-white">{form.lens}</strong>
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, lens: '' }))}
                  className="text-slate-200 hover:text-white text-xs font-semibold underline min-h-[44px] sm:min-h-[34px] px-2.5 rounded-lg hover:bg-white/10 transition-colors shrink-0 touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  Clear
                </button>
              </div>
              {matchedAnswers.length > 0 && (
                <p className="text-[11px] text-slate-300 leading-snug">
                  Priorities: {matchedAnswers.join(' · ')}
                </p>
              )}
            </div>
          )}

          {errorMessage && (
            <div
              role="alert"
              className="mb-3 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-200"
            >
              {errorMessage}
            </div>
          )}

          <form
            name="consultation"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-3"
            noValidate
          >
            <input type="hidden" name="form-name" value="consultation" />
            <p className="hidden" aria-hidden="true">
              <label>
                Don&apos;t fill this out if you&apos;re human:{' '}
                <input name="bot-field" tabIndex={-1} />
              </label>
            </p>

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="hero-firstName" className={labelClass}>
                  First Name *
                </label>
                <input
                  id="hero-firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                  maxLength={50}
                  required
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                  className={`${inputClass} ${errors.firstName ? 'border-red-500/60' : ''}`}
                />
                {errors.firstName && (
                  <p role="alert" className="text-red-400 text-[11px] mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="hero-lastName" className={labelClass}>
                  Last Name *
                </label>
                <input
                  id="hero-lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Smith"
                  maxLength={50}
                  required
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                  className={`${inputClass} ${errors.lastName ? 'border-red-500/60' : ''}`}
                />
                {errors.lastName && (
                  <p role="alert" className="text-red-400 text-[11px] mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Phone + Best Way to Reach You */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <div className="sm:col-span-7">
                <label htmlFor="hero-phone" className={labelClass}>
                  Phone Number *
                </label>
                <input
                  id="hero-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  enterKeyHint="done"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(973) 555-0123"
                  maxLength={25}
                  required
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  className={`${inputClass} ${errors.phone ? 'border-red-500/60' : ''}`}
                />
                {errors.phone && (
                  <p role="alert" className="text-red-400 text-[11px] mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="sm:col-span-5">
                <span id="hero-contact-label" className={labelClass}>
                  Best Way to Reach You
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby="hero-contact-label"
                  className="grid grid-cols-3 gap-1.5"
                >
                  {CONTACT_METHODS.map((m) => {
                    const checked = form.preferredContact === m.value;
                    return (
                      <button
                        key={m.value}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        onClick={() => setForm((prev) => ({ ...prev, preferredContact: m.value }))}
                        className={`min-h-[44px] rounded-xl border text-xs font-bold transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                          checked
                            ? 'bg-primary/20 border-primary text-white shadow-[0_0_12px_rgba(197,160,89,0.25)]'
                            : 'bg-slate-900/80 border-white/15 text-slate-200 hover:border-primary/50'
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Preferred Office Location */}
            <div>
              <span id="hero-office-label" className={labelClass}>
                Preferred Office Location *
              </span>
              <div
                role="radiogroup"
                aria-labelledby="hero-office-label"
                className="grid grid-cols-3 gap-2"
              >
                {OFFICES.map((office) => {
                  const selected = form.location === office.value;
                  return (
                    <button
                      key={office.label}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        setForm((prev) => ({ ...prev, location: office.value }));
                        if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                      }}
                      className={`min-h-[44px] px-1.5 sm:px-2 py-2 rounded-xl border text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                        selected
                          ? 'bg-primary/20 border-primary text-white shadow-[0_0_14px_rgba(197,160,89,0.25)]'
                          : 'bg-slate-900/80 border-white/15 text-slate-200 hover:border-primary/50'
                      }`}
                    >
                      <Icon
                        name="MapPinIcon"
                        size={13}
                        className={`hidden sm:block shrink-0 ${selected ? 'text-primary' : 'text-primary/70'}`}
                      />
                      <span>{office.label}</span>
                    </button>
                  );
                })}
              </div>
              {errors.location && (
                <p role="alert" className="text-red-400 text-[11px] mt-1">
                  {errors.location}
                </p>
              )}
            </div>

            {/* Optional Notes Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowNotes((prev) => !prev)}
                aria-expanded={showNotes}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent transition-colors min-h-[44px] py-2 px-1 rounded-lg touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <Icon name={showNotes ? 'ChevronUpIcon' : 'PlusCircleIcon'} size={14} />
                <span>
                  {showNotes ? 'Hide optional notes' : 'Add questions or notes (optional)'}
                </span>
              </button>
              {showNotes && (
                <textarea
                  name="message"
                  rows={2}
                  maxLength={1000}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Questions about lenses, astigmatism, or Medicare coverage..."
                  className={`${inputClass} mt-1.5 resize-none`}
                />
              )}
            </div>

            {/* Primary Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 sm:px-5 py-3.5 bg-primary text-[#000000] rounded-xl text-sm sm:text-base font-extrabold text-center leading-snug whitespace-normal hover:bg-accent transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 min-h-[52px] touch-manipulation shadow-[0_8px_28px_rgba(197,160,89,0.35)] group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <span>
                {loading ? 'Submitting Request...' : 'Request My 1-on-1 Surgeon Evaluation'}
              </span>
              {!loading && (
                <Icon
                  name="ArrowRightIcon"
                  size={17}
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                />
              )}
            </button>

            <p className="text-center text-[11px] text-slate-300/90 font-medium leading-snug pt-0.5">
              Written Medicare &amp; insurance check included · Zero sales pressure · HIPAA
              Protected
            </p>
          </form>
        </>
      )}
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <div
      id="booking"
      className={`relative rounded-3xl p-5 sm:p-6 scroll-mt-20 sm:scroll-mt-24 ${styles.formCard} border border-primary/35 shadow-[0_24px_70px_rgba(0,0,0,0.75),0_0_40px_rgba(197,160,89,0.14)]`}
    >
      {content}
    </div>
  );
}
