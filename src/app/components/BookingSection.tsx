'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import styles from './BookingSection.module.css';
import { trackEvent } from '@/lib/gtag';

const locations = ['Livingston (973-322-0100)', 'Denville (973-358-0416)', 'Newark (973-315-6439)'];
const lensOptions = [
  'Not sure yet — need guidance',
  'PanOptix Pro (Trifocal)',
  'Clareon Vivity (EDOF)',
  'Tecnis Eyhance (Enhanced Monofocal)',
  'Standard Monofocal',
];

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
    desc: 'Takes 60 seconds. No medical history needed.',
  },
  {
    step: '2',
    icon: 'PhoneIcon',
    title: 'We Call Within 1 Day',
    desc: 'Our team confirms a time that works for you.',
  },
  {
    step: '3',
    icon: 'ChatBubbleLeftRightIcon',
    title: '30-Min Consultation',
    desc: 'No obligation. No pressure. Just answers.',
  },
];

export default function BookingSection() {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    location: '',
    lens: '',
    message: '',
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.firstName && form.phone && form.location && form.email && form.preferredContact) {
      setStep(2);
      trackEvent({
        action: 'booking_step_1_complete',
        category: 'Engagement',
        label: form.location,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        trackEvent({
          action: 'booking_complete',
          category: 'Conversion',
          label: `${form.location} - ${form.lens || 'No lens selected'}`,
        });
      } else {
        const data = await response.json();
        setErrorMessage(
          data.error ||
            'We encountered an issue submitting your request. Please try again or call us directly.'
        );
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(
        'A network connection issue occurred. Please check your connection or call us directly.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3.5 ${styles.premiumInput} rounded-2xl text-base sm:text-sm focus:outline-none min-h-[52px] touch-manipulation`;
  const labelClass =
    'block text-[11px] font-semibold text-muted-foreground mb-2 uppercase tracking-[0.15em]';

  return (
    <section
      id="booking"
      className="py-12 sm:py-20 border-t border-border relative overflow-hidden bg-[#0f0d13]"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.06)_0%,transparent_70%)]" />
      <div className="absolute inset-0 grid-lines-bg opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start">
          {/* Left: CTA copy */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#f59e0b] mb-3">
              {`IOL Consultation`}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-5 sm:mb-6 whitespace-nowrap">
              {`Reclaim`}{' '}
              <span className="font-semibold text-gradient-primary">{`Clear Vision`}</span>
            </h2>

            {/* Urgency framing */}
            <div className="flex items-start gap-3 mb-5 sm:mb-6 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <Icon
                name="ExclamationTriangleIcon"
                size={18}
                className="text-amber-400 shrink-0 mt-0.5"
              />
              <p className="text-sm text-amber-200/80 leading-relaxed">
                <strong className="text-amber-300 font-semibold">{`Cataracts only progress`}</strong>
                {` and never improve on their own. Waiting makes vision worse and recovery longer.`}
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-10">
              {`Book a no-obligation consultation and know exactly which lens matches your eyes, lifestyle, and goals.`}
            </p>

            {/* What happens next */}
            <div className="mb-8 sm:mb-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-5">
                {`What Happens Next`}
              </p>
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute left-[22px] top-8 bottom-8 w-px bg-gradient-to-b from-amber-500/30 via-amber-500/10 to-transparent hidden sm:block" />
                <div className="space-y-5">
                  {whatHappensNext.map((item, i) => (
                    <div key={item.step} className="flex items-start gap-4 group">
                      <div className="relative shrink-0">
                        <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors z-10 relative">
                          <Icon
                            name={item.icon as 'PhoneIcon'}
                            size={18}
                            className="text-amber-400"
                          />
                        </div>
                        {i < whatHappensNext.length - 1 && (
                          <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-5 bg-amber-500/15 sm:hidden" />
                        )}
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-semibold text-foreground mb-0.5">{item.title}</p>
                        <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* HSA / Financing badges */}
            <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
              {[
                { icon: '💳', label: 'HSA / FSA Eligible' },
                { icon: '📋', label: 'CareCredit Accepted' },
                { icon: '🔒', label: 'HIPAA Protected' },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-white/[0.04] border border-border px-3 py-1.5 rounded-full"
                >
                  <span>{b.icon}</span> {b.label}
                </span>
              ))}
            </div>

            {/* Phone numbers */}
            <div className="border-t border-border pt-6 sm:pt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                {`Or call us directly`}
              </p>
              <div className="space-y-1">
                {[
                  { city: 'Livingston', phone: '973-322-0100' },
                  { city: 'Denville', phone: '973-358-0416' },
                  { city: 'Newark', phone: '973-315-6439' },
                ].map((loc) => (
                  <a
                    key={loc.city}
                    href={`tel:${loc.phone.replace(/-/g, '')}`}
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors group py-3 touch-manipulation min-h-[48px] rounded-xl px-2 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                  >
                    <Icon name="PhoneIcon" size={16} className="text-primary shrink-0" />
                    <span className="text-muted-foreground font-medium w-20 sm:w-24">
                      {loc.city}:
                    </span>
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {loc.phone}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 2-Step Form */}
          <div
            className={`glass-card border border-border rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 ${styles.formCard}`}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16">
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,201,177,0.25)]">
                  <Icon name="CheckCircleIcon" size={36} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-3">
                  {`Consultation Requested!`}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  {`We have received your information. A member of the Marano Eye Care team will call you within one business day to finalize a date and time that fits your schedule.`}
                </p>
                <p className="text-sm text-primary/80 mt-3 font-medium italic max-w-sm">
                  {`Most patients say their only regret is not doing this sooner.`}
                </p>
                <a
                  href="tel:9733220100"
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
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 text-sm text-red-200 leading-relaxed">
                      <Icon
                        name="ExclamationCircleIcon"
                        size={18}
                        className="text-red-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <strong className="font-semibold block text-red-300 mb-0.5">
                          Submission Error
                        </strong>
                        {errorMessage}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground">
                      {step === 1 ? 'Reserve Your Consultation' : 'Tell Us About Your Vision'}
                    </h3>
                    <span className="text-xs font-semibold text-muted-foreground bg-white/[0.04] border border-border px-3 py-1 rounded-full">
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
                  <p className="text-xs text-muted-foreground mt-2">
                    {step === 1
                      ? 'Provide your contact details to begin.'
                      : 'Optional — helps Dr. Marano prepare for your visit.'}
                  </p>
                </div>

                {step === 1 ? (
                  <form onSubmit={handleStep1} className="space-y-4 sm:space-y-5">
                    {/* Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="Jane"
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Smith"
                          className={inputClass}
                        />
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
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(973) 555-0123"
                        required
                        className={inputClass}
                      />
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
                        className={inputClass}
                      >
                        <option value="">Select a location</option>
                        {locations.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane.smith@example.com"
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Preferred Contact Method *</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'email', label: 'Email' },
                          { value: 'phone', label: 'Call' },
                          { value: 'text', label: 'Text' },
                        ].map((method) => (
                          <button
                            key={method.value}
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({ ...prev, preferredContact: method.value }))
                            }
                            className={`px-3 py-3 rounded-xl border text-sm font-medium transition-all ${
                              form.preferredContact === method.value
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'bg-transparent border-border hover:border-muted-foreground/30 text-muted-foreground'
                            }`}
                          >
                            {method.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-[#020304] rounded-xl text-base font-bold hover:bg-accent transition-all active:scale-[0.98] min-h-[56px] touch-manipulation shadow-[0_0_24px_rgba(0,201,177,0.22)] btn-shimmer mt-2 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                    >
                      <span>Continue to Step 2</span>
                      <Icon
                        name="ArrowRightIcon"
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>

                    <p className="text-[11px] text-muted-foreground/70 text-center pt-1">
                      No commitment required · We&apos;ll call within 1 business day · Your info
                      stays private
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane.smith@email.com"
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="preferredContact" className={labelClass}>
                        Preferred Contact Method *
                      </label>
                      <select
                        id="preferredContact"
                        name="preferredContact"
                        value={form.preferredContact}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone Call</option>
                        <option value="text">Text Message</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="lens" className={labelClass}>
                        Lens I&apos;m Interested In{' '}
                        <span className="text-muted-foreground/50 normal-case font-normal">
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
                        <span className="text-muted-foreground/50 normal-case font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Any specific concerns, current glasses prescription, or questions for Dr. Marano..."
                        rows={3}
                        className={`${inputClass} resize-none`}
                      />
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
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-[#020304] rounded-xl text-base font-bold hover:bg-accent transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed min-h-[56px] touch-manipulation shadow-[0_0_24px_rgba(0,201,177,0.22)] btn-shimmer group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                      >
                        {loading ? (
                          <span className="flex items-center gap-3">
                            <span className="w-4 h-4 border-2 border-[#020304]/30 border-t-[#020304] rounded-full animate-spin" />
                            Submitting Request...
                          </span>
                        ) : (
                          <>
                            <span>Reserve My Consultation</span>
                            <Icon
                              name="ArrowRightIcon"
                              size={18}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-muted-foreground/70 text-center pt-1">
                      By submitting, you agree to be contacted by Marano Eye Care. Your information
                      is never shared.
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
