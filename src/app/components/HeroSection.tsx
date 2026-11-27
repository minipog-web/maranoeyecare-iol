'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import HeroInteractiveCard from '@/app/components/HeroInteractiveCard';
import { trackEvent, trackPhoneClick } from '@/lib/gtag';
import { smoothScrollToElement } from '@/lib/ui';

interface HeroSectionProps {
  badgeText?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroDesc?: string;
}

const TRUST_METRICS = [
  { icon: 'TrophyIcon', value: '15×', label: 'NJ Top Doctor' },
  { icon: 'CheckBadgeIcon', value: '40,000+', label: 'Surgeries' },
  { icon: 'StarIcon', value: '4.9★', label: '650+ Reviews' },
  { icon: 'ShieldCheckIcon', value: 'Medicare', label: '& Major Plans' },
];

export default function HeroSection({
  badgeText,
  heroTitleLine1,
  heroTitleLine2,
  heroDesc,
}: HeroSectionProps) {
  const [dynamicLocation, setDynamicLocation] = useState<string | null>(null);

  useEffect(() => {
    const locParam = new URLSearchParams(window.location.search).get('loc');
    if (locParam) {
      const cleanLoc = locParam
        .replace(/[^a-zA-Z\s]/g, '')
        .substring(0, 20)
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      if (cleanLoc) setDynamicLocation(cleanLoc);
    }
  }, []);

  const locationText = dynamicLocation || 'Livingston, Denville & Newark, NJ';

  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 bg-[#070910]">
      {/* Quiet, High-Contrast Architectural Backdrop */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {/* Smooth vertical obsidian-slate depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06080f] via-[#0a0d17] to-[#080a12]" />

        {/* Subtle focal backlight behind the right-column interactive quiz */}
        <div
          className="hidden lg:block absolute top-1/2 right-[4%] -translate-y-1/2 w-[560px] h-[560px] rounded-full opacity-[0.14] blur-[110px]"
          style={{
            background:
              'radial-gradient(circle, rgba(212,175,105,0.5) 0%, rgba(148,163,184,0.16) 48%, transparent 72%)',
          }}
        />

        {/* Subtle golden hairline crown */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center min-w-0">
          {/* Left Column: Monumental Headline, Sculpted Metrics & Surgeon Authority */}
          <div className="min-w-0 lg:col-span-6 xl:col-span-7 flex flex-col items-start">
            {/* Jewel-Box Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#141824]/95 to-[#0c0f18]/90 md:backdrop-blur-xl border border-primary/45 mb-5 shadow-[inset_0_1px_0_rgba(255,235,190,0.2),0_8px_24px_rgba(0,0,0,0.55)] max-w-full">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_10px_rgba(197,160,89,0.95)]" />
              </span>
              <span className="min-w-0 break-words text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#F6E6C4] leading-snug">
                {badgeText || `Laser Cataract & Premium IOLs · ${locationText}`}
              </span>
            </div>

            {/* Monumental Editorial H1 */}
            <h1 className="font-display tracking-display-tight text-4xl xs:text-[2.6rem] sm:text-5xl lg:text-[3.45rem] xl:text-[4.1rem] font-medium leading-[1.03] text-white mb-5 max-w-2xl drop-shadow-[0_6px_28px_rgba(0,0,0,0.65)]">
              {heroTitleLine1 && heroTitleLine2 ? (
                <>
                  <span className="block">{heroTitleLine1}</span>
                  <span className="block text-gradient-primary font-semibold mt-1.5 pb-1">
                    {heroTitleLine2}
                  </span>
                </>
              ) : (
                <>
                  <span className="block">One Surgery.</span>
                  <span className="block text-gradient-primary font-semibold mt-1.5 pb-1">
                    A Lifetime of Visual Freedom.
                  </span>
                </>
              )}
            </h1>

            {/* Refined Subheadline: Once-in-a-Lifetime Optical Window + $0 Toric Value */}
            <p className="text-base sm:text-lg xl:text-[1.14rem] text-slate-200/95 max-w-xl leading-relaxed mb-6 font-normal">
              {heroDesc || (
                <>
                  Your natural lens is replaced only once. Upgrade cloudy cataracts to{' '}
                  <span className="text-[#F5E4C3] font-medium">Clareon® Vivity®</span>,{' '}
                  <span className="text-[#F5E4C3] font-medium">PanOptix® Pro</span>, or{' '}
                  <span className="text-[#F5E4C3] font-medium">TECNIS PureSee™</span>—with custom{' '}
                  <span className="text-white font-semibold">
                    Toric astigmatism correction included at $0 extra fee
                  </span>
                  .
                </>
              )}
            </p>

            {/* Elevated 4-Metric Glass Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl mb-4">
              {TRUST_METRICS.map((item) => (
                <div
                  key={item.label}
                  className="group relative min-w-0 rounded-2xl px-3 py-3 bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/[0.11] hover:border-primary/45 md:backdrop-blur-md transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon name={item.icon} size={14} className="text-primary shrink-0" />
                    <span className="text-sm sm:text-[15px] font-extrabold tracking-tight text-white">
                      {item.value}
                    </span>
                  </div>
                  <span className="block text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.06em] sm:tracking-[0.08em] text-slate-200 leading-snug break-words">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Compact Financing + Radical Surgeon Candor */}
            <div className="flex flex-col items-start gap-1.5 mb-5 max-w-2xl">
              <a
                href="#financing"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('financing');
                  window.history.pushState(null, '', '#financing');
                  trackEvent({
                    action: 'hero_financing_click',
                    category: 'Engagement',
                    label: 'Hero Medicare & 0% APR Financing Link',
                  });
                }}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#F5E4C3] hover:text-primary transition-colors min-h-[44px] py-1.5 touch-manipulation group rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <Icon name="CreditCardIcon" size={15} className="text-primary shrink-0" />
                <span>
                  Medicare covers core surgery · 0% APR financing (~$170/mo) &amp; HSA/FSA eligible
                </span>
                <Icon
                  name="ArrowRightIcon"
                  size={13}
                  className="text-primary shrink-0 transition-transform group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="#candidacy"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('candidacy');
                  window.history.pushState(null, '', '#candidacy');
                  trackEvent({
                    action: 'hero_candidacy_pledge_click',
                    category: 'Engagement',
                    label: 'Hero 20% Candor Pledge',
                  });
                }}
                className="inline-flex items-center gap-2 text-xs text-emerald-300/95 hover:text-emerald-200 font-medium transition-colors min-h-[44px] py-1.5 touch-manipulation rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <Icon name="ShieldCheckIcon" size={14} className="text-emerald-400 shrink-0" />
                <span>
                  Surgeon Candor Pledge: We advise against upgrades for ~20% of eyes when standard
                  Medicare lenses are safer.
                </span>
              </a>
            </div>

            {/* Mobile Single High-Contrast CTA */}
            <div className="w-full lg:hidden mb-5">
              <a
                href="#hero-quiz"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('hero-quiz');
                  window.history.pushState(null, '', '#hero-quiz');
                  trackEvent({
                    action: 'hero_mobile_cta_click',
                    category: 'Conversion',
                    label: 'Take 60-Second Lens Quiz',
                  });
                }}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-[#E5C585] via-primary to-[#C9A052] text-[#050608] rounded-2xl text-base font-extrabold hover:brightness-105 transition-all active:scale-[0.98] min-h-[56px] touch-manipulation shadow-[0_12px_34px_rgba(197,160,89,0.42),inset_0_1px_0_rgba(255,255,255,0.45)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <Icon name="SparklesIcon" size={18} className="text-black shrink-0" />
                <span>Take 60-Second Lens Quiz</span>
                <Icon name="ArrowDownIcon" size={17} className="text-black shrink-0" />
              </a>
            </div>

            {/* Executive Surgeon Portrait Strip + Direct Concierge Call Pill */}
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-white/[0.08] w-full max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 shrink-0">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-primary/80 shadow-[0_0_16px_rgba(197,160,89,0.3)] bg-slate-900">
                    <AppImage
                      src="/assets/images/Marano-1777328574709.jpg"
                      alt="Dr. Matthew Marano Jr., MD"
                      fill
                      sizes="44px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-primary/80 shadow-[0_0_16px_rgba(197,160,89,0.3)] bg-slate-900">
                    <AppImage
                      src="/assets/images/Raouf.jpg"
                      alt="Dr. Sherief Raouf, MD"
                      fill
                      sizes="44px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div className="text-xs leading-snug">
                  <p className="font-bold text-white">Dr. Marano &amp; Dr. Raouf</p>
                  <p className="text-slate-300/90">10-Min Bladeless LENSAR® Laser</p>
                </div>
              </div>

              <span className="hidden sm:block h-8 w-[1px] bg-white/10" aria-hidden="true" />

              <a
                href="tel:9733220100"
                suppressHydrationWarning
                onClick={() => trackPhoneClick('Hero Secondary Call', '(973) 322-0100')}
                className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-primary/15 border border-primary/40 hover:border-primary/70 text-slate-100 hover:text-white font-semibold text-sm transition-all active:scale-[0.98] min-h-[46px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <span className="w-7 h-7 rounded-full bg-primary/20 border border-primary/45 flex items-center justify-center shrink-0">
                  <Icon name="PhoneIcon" size={13} className="text-primary" />
                </span>
                <span>
                  <span className="text-slate-300 font-medium mr-1">Call Desk:</span>
                  <strong className="text-white tracking-wide">
                    <span suppressHydrationWarning>(973) 322-0100</span>
                  </strong>
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Jewel-Box Dual-Tab Interactive Lens Quiz & Consultation Card */}
          <div className="min-w-0 lg:col-span-6 xl:col-span-5 w-full">
            <HeroInteractiveCard />
          </div>
        </div>
      </div>
    </section>
  );
}
