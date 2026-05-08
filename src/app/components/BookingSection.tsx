'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const locations = ['Livingston (973-322-0100)', 'Denville (973-358-0416)', 'Newark (973-315-6439)'];
const lensOptions = ['Not sure yet — need guidance', 'PanOptix Pro (Trifocal)', 'Clareon Vivity (EDOF)', 'Tecnis Eyhance (Enhanced Monofocal)', 'Standard Monofocal'];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  lens: string;
  message: string;
}

export default function BookingSection() {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    lens: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        alert(data.error || 'Something went wrong. Please try again or call us directly.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please check your connection or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 bg-muted border border-border rounded-2xl text-foreground placeholder:text-muted-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all min-h-[52px] touch-manipulation';

  return (
    <section id="booking" className="py-16 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 radial-glow-primary" />
      <div className="absolute inset-0 grid-lines-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start">

          {/* Left: CTA copy */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">Free Consultation</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5 sm:mb-6">
              Take the First Step{' '}
              <span className="text-gradient-primary font-medium">Toward Clarity</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-10">
              Book a no-obligation consultation with Dr. Marano. In 45 minutes, you&apos;ll know exactly which IOL is right for your eyes, lifestyle, and vision goals.
            </p>

            {/* What to expect */}
            <div className="space-y-4 mb-8 sm:mb-10">
              {[
                { icon: 'EyeIcon', title: 'Comprehensive Eye Assessment', desc: 'Full biometry and corneal mapping to determine candidacy' },
                { icon: 'ChatBubbleLeftRightIcon', title: 'Personalised Lens Discussion', desc: 'Dr. Marano walks you through every option that fits your profile' },
                { icon: 'CalendarDaysIcon', title: 'Clear Next Steps', desc: 'Leave with a written plan, no pressure, no obligation' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={item.icon as 'EyeIcon'} size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Phone numbers */}
            <div className="border-t border-border pt-6 sm:pt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Or call us directly</p>
              <div className="space-y-1">
                {[
                  { city: 'Livingston', phone: '973-322-0100' },
                  { city: 'Denville', phone: '973-358-0416' },
                  { city: 'Newark', phone: '973-315-6439' },
                ].map((loc) => (
                  <a
                    key={loc.city}
                    href={`tel:${loc.phone.replace(/-/g, '')}`}
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors group py-3 touch-manipulation min-h-[48px]"
                  >
                    <Icon name="PhoneIcon" size={16} className="text-primary shrink-0" />
                    <span className="text-muted-foreground font-medium w-20 sm:w-24">{loc.city}:</span>
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors">{loc.phone}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-card border border-border rounded-4xl p-5 sm:p-8 md:p-10 card-glow">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-10 sm:py-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-glow-pulse">
                  <Icon name="CheckCircleIcon" size={32} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl font-medium text-foreground mb-3">Request Received</h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  Thank you. A member of the Marano Eye Care team will contact you within one business day to confirm your consultation.
                </p>
                <a
                  href="tel:9733220100"
                  className="text-sm text-primary mt-6 font-semibold hover:underline touch-manipulation"
                >
                  Need immediate assistance? Call 973-322-0100
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground mb-1">Book a Free Consultation</h3>
                  <p className="text-sm text-muted-foreground">We&apos;ll confirm within one business day.</p>
                </div>

                {/* Name fields — stacked on mobile, side-by-side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
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
                    <label htmlFor="lastName" className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                    Email Address
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
                  <label htmlFor="phone" className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                    Phone Number
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
                  <label htmlFor="location" className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                    Preferred Location
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
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="lens" className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                    Lens I&apos;m Interested In
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
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                    Questions or Notes (Optional)
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-full text-sm font-bold flex items-center justify-center gap-3 hover:bg-accent transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed min-h-[56px] touch-manipulation"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Book a Free Consultation
                      <Icon name="ArrowRightIcon" size={18} />
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to be contacted by Marano Eye Care. Your information is never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}