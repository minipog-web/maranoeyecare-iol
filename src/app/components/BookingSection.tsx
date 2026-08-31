'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import styles from './BookingSection.module.css';
import { trackEvent, trackAdsConversion } from '@/lib/gtag';
import { validateConsultationBooking } from '@/lib/validation';

const locations = [
  'Livingston Office (200 South Orange Ave)',
  'Denville Office (16 Pocono Rd)',
  'Newark Office (306 Martin Luther King Blvd)',
];

const offices = [
  {
    city: 'Livingston',
    badge: 'Livingston (Essex Co.)',
    phone: '973-322-0100',
    address: '200 South Orange Ave, Suite 209, Livingston, NJ 07039',
    mapsUrl: 'https://maps.google.com/?q=200+South+Orange+Ave+Suite+209+Livingston+NJ+07039',
  },
  {
    city: 'Denville',
    badge: 'Denville (Morris Co.)',
    phone: '973-358-0416',
    address: '16 Pocono Rd, Suite 301, Denville, NJ 07834',
    mapsUrl: 'https://maps.google.com/?q=16+Pocono+Rd+Suite+301+Denville+NJ+07834',
  },
  {
    city: 'Newark',
    badge: 'Newark (Essex Co.)',
    phone: '973-315-6439',
    address: '306 Martin L. King Blvd, Newark, NJ 07102',
    mapsUrl: 'https://maps.google.com/?q=306+Martin+L.+King+Blvd+Newark+NJ+07102',
  },
];

const lensOptions = [
  'Not sure yet (need guidance)',
  'PanOptix Pro (Trifocal)',
  'Clareon Vivity (EDOF)',
  'TECNIS PureSee (Refractive EDOF)',
  'Standard Monofocal',
];

const contactMethods = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Call' },
  { value: 'text', label: 'Text' },
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
  email: string;
  phone: string;
  preferredContact: string;
  location: string;
  lens: string;
  message: string;
}

const whatHappensNext = [
  {
    step: '1',
    icon: 'ClipboardDocumentCheckIcon',
    title: 'Submit Your Request',
    desc: 'Takes 30 seconds · 100% free · No medical history or credit card needed.',
  },
  {
    step: '2',
    icon: 'PhoneIcon',
    title: 'Quick 5-Min Phone Callback',
    desc: 'Our friendly patient care coordinator calls within 1 business hour to confirm your time.',
  },
  {
    step: '3',
    icon: 'ChatBubbleLeftRightIcon',
    title: 'Surgeon Evaluation',
    desc: 'Comprehensive 1-on-1 optical scan with Dr. Marano or Dr. Raouf. Zero obligation.',
  },
];

interface BookingSectionProps {
  bookingHeadline?: string;
  bookingUrgencyTitle?: string;
  bookingUrgencyText?: string;
  preselectedLens?: 'vivity' | 'panoptix' | 'puresee' | 'monofocal';
}

export default function BookingSection({
  bookingHeadline,
  bookingUrgencyTitle,
  bookingUrgencyText,
  preselectedLens,
}: BookingSectionProps) {
  const [form, setForm] = useState<FormState>(() => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredContact: 'email',
      location: '',
      lens: preselectedLens ? (LENS_KEY_TO_LABEL[preselectedLens] ?? '') : '',
      message: '',
    };
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<string | null>(preselectedLens || null);
  const [activeOfficeTab, setActiveOfficeTab] = useState(0);

  React.useEffect(() => {
    const handleSelectLens = (e: Event) => {
      const customEvent = e as CustomEvent;
      const lensKey = customEvent.detail;
      const optionValue = LENS_KEY_TO_LABEL[lensKey] ?? '';

      if (optionValue) {
        setForm((prev) => ({ ...prev, lens: optionValue }));
        setQuizResult(lensKey);
      }
    };

    // Fallback: read from sessionStorage in case event fired before mount
    try {
      const stored = sessionStorage.getItem('preselect-lens');
      if (stored) {
        handleSelectLens(new CustomEvent('select-lens', { detail: stored }));
      }
    } catch (e) {
      console.warn('Session storage read failed:', e);
    }

    window.addEventListener('select-lens', handleSelectLens);
    return () => window.removeEventListener('select-lens', handleSelectLens);
  }, []);

  const handleRadioKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % contactMethods.length;
      setForm((prev) => ({ ...prev, preferredContact: contactMethods[nextIndex].value }));
      setTimeout(() => {
        const nextBtn = document.getElementById(`radio-contact-${contactMethods[nextIndex].value}`);
        nextBtn?.focus();
      }, 0);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + contactMethods.length) % contactMethods.length;
      setForm((prev) => ({ ...prev, preferredContact: contactMethods[prevIndex].value }));
      setTimeout(() => {
        const prevBtn = document.getElementById(`radio-contact-${contactMethods[prevIndex].value}`);
        prevBtn?.focus();
      }, 0);
    }
  };

  const validateField = (name: string, value: string): string => {
    const singleFieldBooking = { ...form, [name]: value };
    const allErrors = validateConsultationBooking(singleFieldBooking);
    return allErrors[name] || '';
  };

  const validateStep1Fields = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    const fieldsToValidate = ['firstName', 'lastName', 'phone', 'location', 'email'];
    fieldsToValidate.forEach((field) => {
      const err = validateField(field, form[field as keyof FormState] || '');
      if (err) newErrors[field] = err;
    });
    return newErrors;
  };

  const formatPhoneInput = (val: string): string => {
    if (val.startsWith('+')) {
      return val.replace(/[^\d+\s()-]/g, '').slice(0, 25);
    }
    const digits = val.replace(/\D/g, '');
    if (!digits) return '';
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const finalValue = name === 'phone' ? formatPhoneInput(value) : value;
    setForm((prev) => ({ ...prev, [name]: finalValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const newErrors = validateStep1Fields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep(2);
    trackEvent({
      action: 'booking_step_1_complete',
      category: 'Engagement',
      label: form.location,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const newErrors = validateStep1Fields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStep(1);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const trimmedForm = {
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          ...trimmedForm,
          quizResult: quizResult,
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setSubmitted(true);
        trackEvent({
          action: 'booking_complete',
          category: 'Conversion',
          label: `${form.location} - ${form.lens || 'No lens selected'}`,
        });
        trackAdsConversion('booking_complete');
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.errors && typeof data.errors === 'object') {
          setErrors(data.errors);
          const step1Fields = ['firstName', 'lastName', 'phone', 'location', 'email'];
          const hasStep1Error = Object.keys(data.errors).some((key) => step1Fields.includes(key));
          if (hasStep1Error) setStep(1);
        }
        setErrorMessage(
          data.error ||
            'We encountered an issue submitting your request. Please review your entries or call us directly at 973-322-0100.'
        );
      }
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      const isAbort = (error as Error)?.name === 'AbortError';
      console.error('Submission error:', error);
      setErrorMessage(
        isAbort
          ? 'The request timed out. Please check your connection or call us directly at 973-322-0100.'
          : 'A network connection issue occurred. Please check your connection or call us directly at 973-322-0100.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3.5 ${styles.premiumInput} rounded-2xl text-base sm:text-sm focus:outline-none min-h-[52px] touch-manipulation`;
  const labelClass =
    'block text-[11px] font-semibold text-muted-foreground mb-2 uppercase tracking-[0.15em]';

  return (
    <section id="booking" className="py-16 sm:py-24 relative overflow-hidden bg-[#0c0f16]">
      {/* Background */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(56,189,248,0.02)_0%,transparent_70%)]" />
      <div className="absolute inset-0 grid-lines-bg opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/[0.015] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start">
          {/* Left: CTA copy */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
              {`IOL Consultation`}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-light text-foreground leading-tight mb-5 sm:mb-6">
              {bookingHeadline === 'Reclaim Clear Vision' || !bookingHeadline ? (
                <span className="whitespace-nowrap">
                  Reclaim <span className="font-semibold text-gradient-primary">Clear Vision</span>
                </span>
              ) : bookingHeadline.includes('Clareon® Vivity®') ? (
                <>
                  Schedule Your{' '}
                  <span className="font-semibold text-gradient-primary block sm:inline">
                    Clareon<sup>®</sup> Vivity<sup>®</sup>
                  </span>{' '}
                  Consultation
                </>
              ) : (
                bookingHeadline
              )}
            </h2>

            {/* Unified Reassurance & Urgency Card */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-white/[0.03] to-transparent border border-primary/20 shadow-lg">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0 mt-1.5" />
                <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                  {bookingUrgencyTitle && bookingUrgencyText
                    ? `${bookingUrgencyTitle} ${bookingUrgencyText}`
                    : 'Cataracts only progress and never improve on their own. Waiting makes vision worse and recovery longer.'}
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-white font-medium leading-relaxed mb-3">
              {`Call any of our 3 New Jersey offices directly to schedule by phone, or complete the form to have our care coordinator contact you.`}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {`Whether you call or submit online, our dedicated team is here to answer your questions and find a time that fits your schedule.`}
            </p>

            {/* What happens next */}
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3.5">
                {`What Happens When You Submit`}
              </p>
              <div className="grid grid-cols-1 gap-3">
                {whatHappensNext.map((item) => (
                  <div key={item.step} className="flex items-start gap-3 group">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                      {item.step}
                    </div>
                    <div className="pt-0.5">
                      <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HSA / Financing badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: 'CreditCardIcon', label: 'HSA / FSA Eligible' },
                { icon: 'ClipboardDocumentListIcon', label: 'CareCredit Accepted' },
                { icon: 'LockClosedIcon', label: 'HIPAA Protected' },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-white/[0.04] border border-border px-3 py-1 rounded-full"
                >
                  <Icon
                    name={b.icon as 'CreditCardIcon'}
                    size={12}
                    className="text-primary shrink-0"
                  />{' '}
                  {b.label}
                </span>
              ))}
            </div>

            {/* Surgeon Direct Care Guarantee */}
            <div className="mb-6 p-4 rounded-2xl bg-[#11131a] border border-primary/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/35 flex items-center justify-center shrink-0 text-primary shadow-[0_0_15px_rgba(197,160,89,0.25)]">
                  <Icon name="ShieldCheckIcon" size={20} />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-foreground text-xs sm:text-sm">
                      Surgeon Direct Care Pledge
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 font-bold uppercase tracking-wider">
                      Dr. Marano &amp; Dr. Raouf
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-xs">
                    &ldquo;Every surgical evaluation is conducted directly with Dr. Matthew Marano
                    Jr. or Dr. Sherief Raouf. We personally analyze your 3D corneal biometry and
                    perform your procedure. If an advanced lifestyle lens is not clinically superior
                    for your eye anatomy, we will be the first to advise you.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Office Locations Segmented Card */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-primary flex items-center gap-2">
                  <Icon name="PhoneIcon" size={14} className="text-primary animate-pulse" />
                  Prefer to Call? Select Your Office:
                </p>
              </div>

              {/* Bold Location tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-black/60 border border-primary/25 rounded-2xl mb-3.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
                {offices.map((loc, idx) => {
                  const isActive = activeOfficeTab === idx;
                  return (
                    <button
                      key={loc.city}
                      type="button"
                      onClick={() => setActiveOfficeTab(idx)}
                      className={`relative flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-bold rounded-xl transition-all duration-200 min-h-[48px] touch-manipulation select-none ${
                        isActive
                          ? 'bg-gradient-to-r from-primary via-[#e6c378] to-primary text-black font-extrabold shadow-[0_4px_20px_rgba(197,160,89,0.45)] border border-primary-light scale-[1.02] z-10'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-white/90 hover:text-white border border-white/10 hover:border-primary/40 active:scale-[0.98]'
                      }`}
                    >
                      <Icon
                        name="MapPinIcon"
                        size={15}
                        className={isActive ? 'text-black shrink-0' : 'text-primary/70 shrink-0'}
                      />
                      <span>{loc.city}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Office Detail Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-primary/30 space-y-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-foreground text-sm sm:text-base flex items-center gap-1.5">
                        <Icon name="MapPinIcon" size={15} className="text-primary shrink-0" />
                        {offices[activeOfficeTab].city} Office
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 font-semibold">
                        {offices[activeOfficeTab].badge}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mt-1">{offices[activeOfficeTab].address}</p>
                  </div>
                  <a
                    href={`tel:${offices[activeOfficeTab].phone.replace(/-/g, '')}`}
                    suppressHydrationWarning
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-black font-extrabold text-xs sm:text-sm hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(197,160,89,0.5)] transition-all shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.35)] active:scale-95 touch-manipulation min-h-[44px]"
                  >
                    <Icon name="PhoneIcon" size={13} className="text-black shrink-0" />
                    <span suppressHydrationWarning>Call {offices[activeOfficeTab].phone}</span>
                  </a>
                </div>
                <a
                  href={offices[activeOfficeTab].mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary/90 hover:text-primary transition-colors flex items-center justify-between group pt-2 border-t border-white/[0.08]"
                >
                  <span className="leading-snug text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    View on Google Maps
                  </span>
                  <span className="text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Get Directions &rarr;
                  </span>
                </a>
              </div>

              {/* Surgical Center Facility Note */}
              <div className="mt-3 p-3.5 rounded-2xl bg-primary/[0.04] border border-primary/25 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 mt-0.5">
                  <Icon name="BuildingOfficeIcon" size={16} className="text-primary" />
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">Surgical Center:</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 font-semibold uppercase tracking-wider">
                      Cedar Knolls, NJ
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Surgeries are performed at the accredited{' '}
                    <strong className="text-foreground">Ridgedale Surgery Center</strong>.
                    Consultations, advanced 3D corneal biometry, and follow-up care take place at
                    your selected local office above.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 2-Step Form */}
          <div
            className={`glass-card border border-border rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 ${styles.formCard}`}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16">
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(197, 160, 89,0.25)]">
                  <Icon name="CheckCircleIcon" size={36} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-3">
                  {`You're All Set!`}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  {`We have received your request. Our patient care coordinator will call you within 1 business hour to confirm your preferred office location and time, and answer any initial questions.`}
                </p>
                <p className="text-sm text-primary/90 mt-3 font-medium italic max-w-sm">
                  {`Most patients say their only regret is not doing this sooner.`}
                </p>
                <a
                  href="tel:9733220100"
                  suppressHydrationWarning
                  className="text-sm text-primary mt-6 font-semibold hover:underline touch-manipulation rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  Need immediate assistance? Call 973-322-0100
                </a>
              </div>
            ) : (
              <>
                {/* Step progress */}
                <div className="mb-6 sm:mb-8">
                  {errorMessage && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-red-200 leading-relaxed"
                    >
                      <div className="flex gap-3 items-start">
                        <Icon
                          name="ExclamationCircleIcon"
                          size={18}
                          className="text-red-400 shrink-0 mt-0.5"
                        />
                        <div>
                          <strong className="font-semibold block text-red-300 mb-0.5">
                            Submission Notice
                          </strong>
                          {errorMessage}
                        </div>
                      </div>
                      <a
                        href="tel:9733220100"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-bold text-red-200 border border-red-500/30 shrink-0 whitespace-nowrap transition-colors touch-manipulation min-h-[36px]"
                      >
                        <Icon name="PhoneIcon" size={13} />
                        <span>Call Us Directly</span>
                      </a>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-3 sm:gap-4 mb-3">
                    <h3
                      className={`font-display text-xl sm:text-2xl font-medium text-foreground ${styles.formHeader}`}
                    >
                      {step === 1
                        ? 'Reserve Your Consultation with Our Surgeons'
                        : 'Customize Your Visual Goals'}
                    </h3>
                    <span className="text-xs font-semibold text-muted-foreground bg-white/[0.04] border border-border px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                      Step {step} of 2
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out ${
                        step === 1 ? 'w-1/2' : 'w-full'
                      }`}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                    <p className="text-xs text-muted-foreground">
                      {step === 1
                        ? 'Complete this 30-second form, or call any office directly on the left.'
                        : 'Optional, helps our surgeons prepare for your visit.'}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-primary font-bold tracking-wide uppercase">
                      <Icon name="LockClosedIcon" size={14} className="shrink-0" />
                      {step === 1
                        ? 'HIPAA Compliant · No Medical History Required · Pressure Free'
                        : 'Privacy Protected & HIPAA Secure'}
                    </div>
                  </div>
                </div>

                {/* Dynamic Biometric Consultation Profile Card */}
                {form.lens ? (
                  <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border border-primary/35 shadow-[0_4px_20px_rgba(197,160,89,0.15)] relative overflow-hidden">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5 text-primary shadow-[0_0_12px_rgba(197,160,89,0.3)]">
                          <Icon name="SparklesIcon" size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/20 px-2.5 py-0.5 rounded-full border border-primary/30">
                              Personalized Lens Focus
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              Pre-Configured for Your Visit
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-foreground truncate">
                            {form.lens}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Dr. Marano &amp; Dr. Raouf will evaluate your custom 3D corneal biometry
                            for this lens profile.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs text-primary hover:text-white font-semibold underline underline-offset-4 shrink-0 p-1 touch-manipulation transition-colors"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon name="SparklesIcon" size={16} className="text-primary shrink-0" />
                      <span className="text-xs text-muted-foreground truncate">
                        Unsure which lens fits your lifestyle? 3D corneal biometry is included with
                        your visit.
                      </span>
                    </div>
                    <a
                      href="#vision"
                      className="text-xs text-primary font-bold hover:underline shrink-0 whitespace-nowrap"
                    >
                      Try Simulator &rarr;
                    </a>
                  </div>
                )}

                {step === 1 ? (
                  <form onSubmit={handleStep1} className="space-y-4 sm:space-y-5" noValidate>
                    {/* Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          autoComplete="given-name"
                          value={form.firstName}
                          onChange={handleChange}
                          onBlur={(e) =>
                            setForm((prev) => ({ ...prev, firstName: e.target.value.trim() }))
                          }
                          placeholder="Jane"
                          maxLength={50}
                          required
                          aria-invalid={errors.firstName ? 'true' : 'false'}
                          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                          className={`${inputClass} ${
                            errors.firstName
                              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                              : ''
                          }`}
                        />
                        {errors.firstName && (
                          <p
                            id="firstName-error"
                            role="alert"
                            className="text-red-400 text-xs mt-1.5 font-medium"
                          >
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          autoComplete="family-name"
                          value={form.lastName}
                          onChange={handleChange}
                          onBlur={(e) =>
                            setForm((prev) => ({ ...prev, lastName: e.target.value.trim() }))
                          }
                          placeholder="Smith"
                          maxLength={50}
                          required
                          aria-invalid={errors.lastName ? 'true' : 'false'}
                          aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                          className={`${inputClass} ${
                            errors.lastName
                              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                              : ''
                          }`}
                        />
                        {errors.lastName && (
                          <p
                            id="lastName-error"
                            role="alert"
                            className="text-red-400 text-xs mt-1.5 font-medium"
                          >
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={(e) =>
                          setForm((prev) => ({ ...prev, phone: e.target.value.trim() }))
                        }
                        placeholder="(973) 555-0123"
                        maxLength={25}
                        required
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        className={`${inputClass} ${
                          errors.phone
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : ''
                        }`}
                      />
                      {errors.phone && (
                        <p
                          id="phone-error"
                          role="alert"
                          className="text-red-400 text-xs mt-1.5 font-medium"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="location" className={labelClass}>
                        Preferred Location *
                      </label>
                      <select
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        required
                        suppressHydrationWarning
                        aria-invalid={errors.location ? 'true' : 'false'}
                        aria-describedby={errors.location ? 'location-error' : undefined}
                        className={`${inputClass} ${
                          errors.location
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : ''
                        }`}
                      >
                        <option value="">Select a location</option>
                        {locations.map((l) => (
                          <option key={l} value={l} suppressHydrationWarning>
                            {l}
                          </option>
                        ))}
                      </select>
                      {errors.location && (
                        <p
                          id="location-error"
                          role="alert"
                          className="text-red-400 text-xs mt-1.5 font-medium"
                        >
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={(e) =>
                          setForm((prev) => ({ ...prev, email: e.target.value.trim() }))
                        }
                        placeholder="jane.smith@example.com"
                        maxLength={100}
                        required
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`${inputClass} ${
                          errors.email
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : ''
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          role="alert"
                          className="text-red-400 text-xs mt-1.5 font-medium"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <span id="contact-method-label" className={labelClass}>
                        Preferred Contact Method *
                      </span>
                      <div
                        role="radiogroup"
                        aria-labelledby="contact-method-label"
                        className="grid grid-cols-3 gap-3"
                      >
                        {contactMethods.map((method, idx) => {
                          const isChecked = form.preferredContact === method.value;
                          return (
                            <button
                              id={`radio-contact-${method.value}`}
                              key={method.value}
                              type="button"
                              role="radio"
                              aria-checked={isChecked}
                              tabIndex={isChecked ? 0 : -1}
                              onKeyDown={(e) => handleRadioKeyDown(e, idx)}
                              onClick={() =>
                                setForm((prev) => ({ ...prev, preferredContact: method.value }))
                              }
                              className={`px-3 py-3 rounded-xl border text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${
                                isChecked
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'bg-transparent border-border hover:border-muted-foreground/30 text-muted-foreground'
                              }`}
                            >
                              {method.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl text-base font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[56px] touch-manipulation shadow-[0_4px_24px_rgba(197,160,89,0.35),0_2px_4px_rgba(0,0,0,0.15)] btn-shimmer mt-2 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                    >
                      <span>Continue to Step 2</span>
                      <Icon
                        name="ArrowRightIcon"
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>

                    <div className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] sm:text-xs font-semibold mt-3 text-center leading-snug">
                      <Icon name="LockClosedIcon" size={14} className="shrink-0 text-emerald-400" />
                      <span>HIPAA-Compliant &amp; 256-Bit Encrypted · No Commitment Required</span>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="lens" className={labelClass}>
                        Lens I&apos;m Interested In{' '}
                        <span className="text-muted-foreground normal-case font-normal">
                          (optional)
                        </span>
                      </label>
                      <select
                        id="lens"
                        name="lens"
                        value={form.lens}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select a lens (optional)</option>
                        {lensOptions.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Questions or Notes{' '}
                        <span className="text-muted-foreground normal-case font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onBlur={(e) =>
                          setForm((prev) => ({ ...prev, message: e.target.value.trim() }))
                        }
                        placeholder="Any specific concerns, current glasses prescription, or questions for Dr. Marano or Dr. Raouf..."
                        rows={3}
                        maxLength={1000}
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`${inputClass} resize-none ${
                          errors.message
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : ''
                        }`}
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          role="alert"
                          className="text-red-400 text-xs mt-1.5 font-medium"
                        >
                          {errors.message}
                        </p>
                      )}
                      <div className="flex justify-end mt-1">
                        <span className="text-[10px] text-muted-foreground/60">
                          {form.message.length} / 1000
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 text-sm font-medium transition-all duration-200 min-h-[52px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                      >
                        <Icon name="ArrowLeftIcon" size={14} />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl text-base font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed min-h-[56px] touch-manipulation shadow-[0_4px_24px_rgba(197,160,89,0.35),0_2px_4px_rgba(0,0,0,0.15)] btn-shimmer group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                      >
                        {loading ? (
                          <span className="flex items-center gap-3">
                            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Submitting Request...
                          </span>
                        ) : (
                          <>
                            <span>Request Consultation with Our Surgeons</span>
                            <Icon
                              name="ArrowRightIcon"
                              size={18}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center pt-1">
                      🔒 100% Confidential · Zero Obligation · Our Surgeons Personally Review Every
                      Request
                    </p>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
