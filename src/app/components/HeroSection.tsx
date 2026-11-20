'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { trackEvent, trackPhoneClick } from '@/lib/gtag';
import { renderFootnoteText, smoothScrollToElement } from '@/lib/ui';

const lenses = [
  {
    name: 'Clareon Vivity',
    tag: 'Most Popular',
    subtitle: 'Non-diffractive EDOF',
    detail: 'Glare & halo profile similar to monofocal [2]',
    src: '/assets/images/vivity_hero.jpg',
    alt: 'Clareon Vivity IOL, non-diffractive extended depth of focus intraocular lens',
    href: '/clareon-vivity',
    accent: 'border-primary/50',
    featured: true,
    glow: 'shadow-[0_0_60px_rgba(197,160,89,0.35),0_0_0_1px_rgba(197,160,89,0.2)] border-primary/45 bg-white/[0.05]',
    inactiveGlow: 'shadow-[0_0_20px_rgba(197,160,89,0.08)] border-white/[0.08]',
  },
  {
    name: 'PanOptix Pro',
    tag: 'Trifocal',
    subtitle: 'Full trifocal range',
    detail: '99.2% would choose this lens again [5]',
    src: '/assets/images/panoptix_hero.jpg',
    alt: 'Clareon PanOptix Pro trifocal IOL, trifocal intraocular lens',
    href: '/panoptix-pro',
    accent: 'border-primary/25',
    featured: false,
    glow: 'shadow-[0_0_60px_rgba(139,92,246,0.35),0_0_0_1px_rgba(139,92,246,0.2)] border-[rgba(139,92,246,0.45)] bg-white/[0.05]',
    inactiveGlow: 'shadow-[0_0_20px_rgba(139,92,246,0.08)] border-white/[0.08]',
  },
  {
    name: 'TECNIS PureSee',
    tag: 'Latest EDOF',
    subtitle: 'Refractive EDOF',
    detail: 'Zero contrast loss warning [3]',
    src: '/assets/images/puresee_hero.jpg',
    alt: 'TECNIS PureSee IOL, the latest and most cutting-edge purely refractive extended depth of focus intraocular lens',
    href: '/tecnis-puresee',
    accent: 'border-primary/25',
    featured: false,
    glow: 'shadow-[0_0_60px_rgba(0,163,255,0.35),0_0_0_1px_rgba(0,163,255,0.2)] border-[rgba(0,163,255,0.45)] bg-white/[0.05]',
    inactiveGlow: 'shadow-[0_0_20px_rgba(0,163,255,0.08)] border-white/[0.08]',
  },
];

const lensRangeData: Record<
  string,
  {
    name: string;
    tagline: string;
    badge: string;
    badgeColor: string;
    distance: { status: string; percent: number; label: string };
    intermediate: { status: string; percent: number; label: string };
    near: { status: string; percent: number; label: string };
    highlightActivities: string[];
  }
> = {
  'Clareon Vivity': {
    name: 'Clareon Vivity',
    tagline: 'Non-Diffractive Extended Depth (X-WAVE™)',
    badge: 'Monofocal-Like Zero Glare',
    badgeColor: 'bg-primary/20 text-primary border-primary/40',
    distance: { status: '100% Crisp', percent: 100, label: 'Driving, TV, Outdoor Sports' },
    intermediate: {
      status: '100% Continuous',
      percent: 100,
      label: 'Computers, Dashboard, Cooking',
    },
    near: { status: 'Functional Assist', percent: 55, label: 'Casual Phone & Menu Reading' },
    highlightActivities: [
      'Night highway driving with zero halo rings',
      'Seamless dashboard & computer distance',
      'Active lifestyle & outdoor freedom',
    ],
  },
  'PanOptix Pro': {
    name: 'PanOptix Pro',
    tagline: 'High-Definition Trifocal Optics (ENLIGHTEN® NXT)',
    badge: '91.6% Complete Glasses Freedom',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    distance: { status: '100% Crisp', percent: 100, label: 'Driving, Scenery, Golf' },
    intermediate: {
      status: '100% Crisp (60 cm)',
      percent: 100,
      label: 'Laptops, Tablets, Price Tags',
    },
    near: { status: '100% Crisp (40 cm)', percent: 100, label: 'Books, Fine Print, Text Messages' },
    highlightActivities: [
      'Complete spectacle freedom morning to night',
      'Crisp reading without searching for glasses',
      '99% would choose the same lens again',
    ],
  },
  'TECNIS PureSee': {
    name: 'TECNIS PureSee',
    tagline: 'Pure Refractive Zonal EDOF Optics',
    badge: 'Zero Contrast Sensitivity Warning',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    distance: { status: '100% Crisp', percent: 100, label: 'Precision Driving, Clear Horizons' },
    intermediate: { status: '100% Crisp', percent: 100, label: 'Multi-Screen Work, Navigation' },
    near: { status: 'High Functional', percent: 75, label: 'Smartphones & Everyday Menus' },
    highlightActivities: [
      '100% pure refractive night contrast',
      'Zero dysphotopsia / no diffractive rings',
      'The newest FDA-approved EDOF design',
    ],
  },
};

interface HeroSectionProps {
  badgeText?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroDesc?: string;
}

export default function HeroSection({
  badgeText,
  heroTitleLine1,
  heroTitleLine2,
  heroDesc,
}: HeroSectionProps) {
  // Starts with Clareon Vivity selected at onset
  const [activeLens, setActiveLens] = useState<string>('Clareon Vivity');
  const [dynamicLocation, setDynamicLocation] = useState<string | null>(null);

  useEffect(() => {
    // Handle Dynamic Text Replacement (DTR) for location
    const urlParams = new URLSearchParams(window.location.search);
    const locParam = urlParams.get('loc');
    if (locParam) {
      // Clean and sanitize the location string (max 20 chars, Title Case)
      const cleanLoc = locParam
        .replace(/[^a-zA-Z\s]/g, '')
        .substring(0, 20)
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      if (cleanLoc) {
        setDynamicLocation(cleanLoc);
      }
    }
  }, []);

  const activeData = lensRangeData[activeLens] || lensRangeData['Clareon Vivity'];

  const locationText = dynamicLocation || 'Livingston, Denville & Newark, NJ';

  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-6 sm:pb-8 lg:pb-10 bg-section-hero">
      {/* Bespoke Optical Sunrise & Ray Texture Background */}
      <div className="absolute inset-0 texture-hero-optical opacity-40 pointer-events-none" />

      {/* Directional Dawn & Lens Aura Horizon (Seamless optical wash, zero hard edges) */}
      <div className="absolute top-0 right-0 w-full h-[520px] bg-gradient-to-bl from-primary/[0.08] via-primary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[320px] bg-gradient-to-tr from-sky-500/[0.05] via-transparent to-transparent pointer-events-none" />

      {/* Specular hairline at the hero crown */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full pt-2 sm:pt-4 lg:pt-5 pb-2 sm:pb-4">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-start min-w-0 w-full">
          {/* Left Content */}
          <div className="min-w-0 lg:col-span-7 xl:col-span-7 w-full flex flex-col items-start max-w-2xl xl:max-w-3xl">
            {/* Headline (incorporating semantic keyword & NJ location context in h1 while preserving exact visual layout) */}
            <h1 className="flex flex-col items-start mb-3.5 sm:mb-4 max-w-2xl xl:max-w-3xl w-full">
              {/* Eyebrow Badge Pill */}
              <span className="relative z-10 inline-flex flex-col items-center justify-center text-center gap-1 sm:gap-1.5 px-5 sm:px-7 py-2 sm:py-2.5 rounded-[20px] sm:rounded-2xl bg-[#0d0e12]/85 backdrop-blur-md border border-[#C5A059]/40 mb-3.5 sm:mb-5 animate-fade-up fill-both w-fit max-w-full shadow-[inset_0_1px_1px_rgba(250,232,200,0.22),0_4px_16px_rgba(0,0,0,0.4),0_0_18px_rgba(197,160,89,0.12)] font-sans">
                {badgeText ? (
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FAE8C8] via-[#E8C47E] to-[#C5A059] leading-none py-0.5">
                    {badgeText}
                  </span>
                ) : (
                  <>
                    {/* Tier 1: Specialty Credential & Beacon Dot */}
                    <span className="inline-flex items-center justify-center gap-2 text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FAE8C8] via-[#E8C47E] to-[#C5A059] sm:whitespace-nowrap text-center leading-none py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#FAE8C8] shrink-0 shadow-[0_0_8px_rgba(197,160,89,0.7)]" />
                      <span className="sm:hidden">Laser Cataract &amp; Premium IOLs</span>
                      <span className="hidden sm:inline">
                        Laser Cataract Surgery &amp; Premium IOL Specialists
                      </span>
                    </span>

                    {/* Tier 2: Locations with MapPin */}
                    <span className="inline-flex items-center justify-center gap-1.5 text-[9.5px] xs:text-[10px] sm:text-[11px] font-medium uppercase tracking-wide text-[#F5E4C3]/95 sm:whitespace-nowrap text-center leading-none py-0.5">
                      <Icon name="MapPinIcon" size={11} className="text-primary shrink-0" />
                      <span>{locationText}</span>
                    </span>
                  </>
                )}
              </span>

              <span className="font-display tracking-display-tight text-3xl xs:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-normal sm:font-medium leading-[1.12] sm:leading-[1.08] text-foreground block max-w-xl">
                <span className="block">{heroTitleLine1 || 'One Surgery. One Decision.'}</span>{' '}
                <span className="block text-gradient-primary font-semibold mt-1 pb-1 sm:pb-2">
                  {heroTitleLine2 || 'A Lifetime of Visual Freedom'}
                </span>
              </span>
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-foreground/85 max-w-xl leading-relaxed mb-5 sm:mb-6 text-left">
              {heroDesc ||
                'Cataract surgery is a once-in-a-lifetime chance to restore youthful vision. Discover advanced lenses engineered for clear, multi-distance sight—without daily reading glasses.'}
            </p>

            {/* Action CTAs: High-Intent Direct Booking + Instant Click-to-Call */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 w-full sm:w-auto mb-3">
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('booking');
                  window.history.pushState(null, '', '#booking');
                  trackEvent({
                    action: 'hero_primary_cta_click',
                    category: 'Conversion',
                    label: 'Book Consultation',
                  });
                }}
                className="group btn-premium-chic inline-flex items-center justify-between sm:justify-center gap-3 sm:gap-4 pl-6 sm:pl-7 pr-2.5 sm:pr-3 py-3 bg-primary text-[#000000] rounded-full text-sm sm:text-base font-bold transition-all touch-manipulation min-h-[54px] sm:min-h-[56px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <span>Book Consultation</span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/10 flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105">
                  <Icon name="ArrowRightIcon" size={18} className="text-current" />
                </div>
              </a>

              <a
                href="tel:9733220100"
                suppressHydrationWarning
                onClick={() => trackPhoneClick('Hero Direct Call', '(973) 322-0100')}
                aria-label="Call Marano Eye Care at (973) 322-0100"
                className="group relative focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none py-3 px-5 sm:px-6 text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 rounded-full btn-neumorphic-secondary border border-primary/40 hover:border-primary font-bold text-white transition-all duration-300 min-h-[54px] sm:min-h-[56px] touch-manipulation overflow-hidden"
              >
                <span className="w-8 h-8 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                  <Icon name="PhoneIcon" size={15} className="text-primary" />
                </span>
                <span className="relative z-10 flex flex-col items-start leading-tight text-left">
                  <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
                    Call to Schedule
                  </span>
                  <span
                    className="text-sm sm:text-base font-extrabold text-white"
                    suppressHydrationWarning
                  >
                    (973) 322-0100
                  </span>
                </span>
              </a>
            </div>

            {/* Educational Discovery & Financing Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-1 text-xs sm:text-sm">
              <a
                href="#lens-quiz"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('lens-quiz');
                  window.history.pushState(null, '', '#lens-quiz');
                  trackEvent({
                    action: 'hero_quiz_cta_click',
                    category: 'Engagement',
                    label: 'Take 60-Second Lens Match Quiz',
                  });
                }}
                className="text-primary font-bold underline underline-offset-4 hover:text-accent transition-colors inline-flex items-center gap-1.5 py-2 min-h-[44px] rounded touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <Icon name="SparklesIcon" size={14} className="shrink-0" />
                <span>Not sure which lens? Take the 60-sec Lens Quiz</span>
                <span aria-hidden="true">&rarr;</span>
              </a>

              <a
                href="#financing"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('financing');
                  window.history.pushState(null, '', '#financing');
                  trackEvent({
                    action: 'hero_financing_click',
                    category: 'Engagement',
                    label: 'Financing available as low as $170/mo',
                  });
                }}
                className="group inline-flex items-center gap-1.5 text-xs text-white/85 hover:text-primary transition-colors py-2 min-h-[44px] rounded touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <Icon name="CreditCardIcon" size={14} className="text-primary/85 shrink-0" />
                <span className="underline decoration-white/25 underline-offset-4 group-hover:decoration-primary transition-colors">
                  0% APR from{' '}
                  <span className="text-white font-semibold group-hover:text-primary transition-colors">
                    $170/mo
                  </span>
                </span>
              </a>
            </div>

            {/* Reassurance Indicators (Positioned above horizontal border line) */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-1.5 mb-3.5 sm:mb-4 text-xs sm:text-[13px] text-white/90 font-medium select-none">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(197,160,89,0.8)] shrink-0" />
                No Needles · No Pain
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(197,160,89,0.8)] shrink-0" />
                10–15 Min Procedure
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(197,160,89,0.8)] shrink-0" />
                Medicare &amp; Most Insurance Accepted
              </span>
            </div>

            {/* Editorial Proof Text */}
            <div className="border-t border-border/80 pt-3.5 sm:pt-4 w-full animate-fade-up delay-600 fill-both max-w-xl lg:max-w-2xl">
              <p className="text-sm sm:text-base text-white font-semibold mb-2 font-display">
                Led by Board-Certified Surgeons Dr. Matthew Marano Jr. &amp; Dr. Sherief Raouf
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-6 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  <span className="text-white/80 leading-snug">
                    <strong className="text-primary font-semibold">Dr. Marano:</strong> Chief of
                    Ophthalmology, Cooperman Barnabas &amp; St. Michael&apos;s
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  <span className="text-white/80 leading-snug">
                    <strong className="text-primary font-semibold">Dr. Raouf:</strong>{' '}
                    Fellowship-Trained Cornea Specialist (UIC)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  <span className="text-white/80 leading-snug">
                    <strong className="text-primary font-semibold">15× NJ Top Doctor</strong> ·
                    40,000+ surgeries (99% satisfaction)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  <span className="text-white/80 leading-snug">
                    <strong className="text-primary font-semibold">4.9★ Google Rating</strong> (650+
                    reviews) · Board-Certified
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Three-Lens Visual Showcase & Vision Reach Meter */}
          <div className="min-w-0 lg:col-span-5 xl:col-span-5 2xl:col-span-5 relative w-full flex flex-col items-center lg:items-end justify-start pt-1 lg:pt-1">
            {/* Mobile Swipe Hint */}
            <div className="sm:hidden w-full flex items-center justify-between mb-2 px-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Premium Lens Options
              </span>
              <span className="text-[11px] text-white/75 font-medium flex items-center gap-1">
                <span>Swipe</span>
                <span aria-hidden="true">&rarr;</span>
              </span>
            </div>

            {/* Lens Cards Row (Horizontal Snap Carousel on Mobile, 3-Col Grid on sm+) */}
            <div className="w-[calc(100%+2rem)] -mx-4 px-4 sm:w-full sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-3 gap-3 xl:gap-3.5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-none pt-1 pb-2 sm:pb-1">
              {lenses.map((lens, i) => {
                const isActive = activeLens === lens.name;
                const cardOrigin =
                  i === 0
                    ? 'origin-bottom-left'
                    : i === 2
                      ? 'origin-bottom-right'
                      : 'origin-bottom';
                const delayClass =
                  i === 0
                    ? 'animate-fade-up fill-both'
                    : i === 1
                      ? 'animate-fade-up delay-75 fill-both'
                      : 'animate-fade-up delay-150 fill-both';

                return (
                  <div
                    key={lens.name}
                    onMouseEnter={() => setActiveLens(lens.name)}
                    onPointerEnter={() => setActiveLens(lens.name)}
                    className={`w-[228px] shrink-0 snap-center sm:w-full sm:shrink min-w-0 ${delayClass}`}
                  >
                    <Link
                      href={lens.href}
                      onMouseEnter={() => setActiveLens(lens.name)}
                      onPointerEnter={() => setActiveLens(lens.name)}
                      onFocus={() => setActiveLens(lens.name)}
                      onClick={() => {
                        trackEvent({
                          action: 'hero_lens_card_navigate',
                          category: 'Navigation',
                          label: `Hero ${lens.name} Card to ${lens.href}`,
                        });
                      }}
                      className={`group block relative doppel-shell ${lens.accent} w-full h-[265px] sm:h-[280px] lg:h-[275px] xl:h-[295px] cursor-pointer ${cardOrigin} focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none transition-all duration-300 sm:hover:-translate-y-2 sm:hover:scale-[1.04]
                        ${
                          isActive
                            ? 'z-30 opacity-100 sm:-translate-y-1 sm:scale-[1.015]'
                            : 'z-10 opacity-95 sm:opacity-90 hover:opacity-100 hover:z-30'
                        }
                        ${isActive ? lens.glow : lens.inactiveGlow}`}
                    >
                      <div className="w-full h-full flex flex-col bg-background/85 rounded-[calc(2rem-6px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative">
                        {/* Image: Explicit fixed height so all 3 lenses render at exact identical size */}
                        <div className="relative w-full h-[126px] sm:h-[130px] lg:h-[125px] xl:h-[140px] flex-none overflow-hidden bg-[#07090e]">
                          <AppImage
                            src={lens.src}
                            alt={lens.alt}
                            fill
                            className="object-cover object-center scale-[1.02] transition-transform duration-500 ease-out group-hover:scale-105"
                            sizes="(max-width: 640px) 228px, 176px"
                            priority={i === 0}
                            fetchPriority={i === 0 ? 'high' : 'auto'}
                          />

                          {/* Fine Optical Edge Highlight */}
                          <div
                            className={`absolute inset-0 rounded-[calc(2rem-6px)] border transition-all duration-300 pointer-events-none z-20 ${
                              isActive
                                ? 'border-white/35 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]'
                                : 'border-transparent'
                            }`}
                          />

                          {/* Top subtle badge backing vignette */}
                          <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10" />

                          {/* Floating Top Tag Badge */}
                          <div className="absolute top-2.5 inset-x-0 flex justify-center z-20 pointer-events-none px-1">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-md whitespace-nowrap ${
                                isActive
                                  ? 'bg-primary text-[#020304] border border-primary/80 shadow-[0_0_12px_rgba(197,160,89,0.5)]'
                                  : 'bg-black/75 text-white/95 border border-white/20 shadow-md group-hover:bg-primary group-hover:text-[#020304] group-hover:border-primary'
                              }`}
                            >
                              {lens.tag}
                            </span>
                          </div>
                        </div>

                        {/* Bottom info */}
                        <div className="flex-1 flex flex-col justify-between p-3 lg:p-3.5 bg-gradient-to-t from-black/95 via-black/80 to-black/60 backdrop-blur-sm border-t border-white/[0.05]">
                          <div>
                            <p className="text-xs sm:text-[11px] xl:text-xs font-bold text-primary uppercase tracking-wider mb-1 flex items-center justify-between">
                              <span>{lens.name}</span>
                              <span
                                className={`text-xs text-primary/90 font-normal transition-all duration-300 shrink-0 ml-1 ${
                                  isActive
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-80 sm:opacity-0 sm:-translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                                }`}
                              >
                                &rarr;
                              </span>
                            </p>
                            <p className="text-white font-semibold text-xs xl:text-sm leading-tight">
                              {lens.subtitle}
                            </p>
                          </div>
                          <p className="text-white/85 text-xs sm:text-[10.5px] xl:text-[11px] mt-1.5 leading-snug">
                            {renderFootnoteText(lens.detail, { withoutLink: true })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Dynamic "Vision Reach" Optical Range Meter */}
            <div className="w-full mt-3 sm:mt-3.5 sm:max-w-md xl:max-w-[500px] animate-fade-up delay-900 fill-both">
              <div className="luxury-rim-card border border-white/[0.12] bg-[#0c0e15]/95 backdrop-blur-xl rounded-2xl p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
                {/* Interactive Lens Switcher Tabs (Touch & Keyboard Friendly) */}
                <div
                  role="tablist"
                  aria-label="Compare optical reach by lens"
                  className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.07] mb-3"
                >
                  {lenses.map((lens) => {
                    const selected = activeLens === lens.name;
                    return (
                      <button
                        key={lens.name}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => {
                          setActiveLens(lens.name);
                          trackEvent({
                            action: 'hero_reach_tab_select',
                            category: 'Engagement',
                            label: lens.name,
                          });
                        }}
                        className={`px-2 py-2.5 sm:py-2 min-h-[44px] sm:min-h-[38px] rounded-lg text-xs sm:text-[11px] font-bold transition-all duration-200 truncate cursor-pointer touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                          selected
                            ? 'bg-primary text-[#020304] shadow-sm'
                            : 'text-white/80 hover:text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        {lens.name.replace('Clareon ', '').replace('TECNIS ', '')}
                      </button>
                    );
                  })}
                </div>

                {/* Header with Active Lens & Superpower Badge */}
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 xs:gap-2 mb-2.5 pb-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(197,160,89,0.85)] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary block truncate">
                        {activeData.name} Optical Reach
                      </span>
                      <p className="text-xs text-white/95 font-medium truncate">
                        {activeData.tagline}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap self-start xs:self-auto shrink-0 ${activeData.badgeColor}`}
                  >
                    {activeData.badge}
                  </span>
                </div>

                {/* 3-Zone Visual Reach Spectrum with Clarity Bars */}
                <div className="grid grid-cols-3 gap-2 mb-2.5">
                  {[
                    { key: 'Distance', data: activeData.distance },
                    { key: 'Intermediate', data: activeData.intermediate },
                    { key: 'Near', data: activeData.near },
                  ].map(({ key, data }) => {
                    const barColor =
                      data.percent >= 90
                        ? 'bg-emerald-400'
                        : data.percent >= 70
                          ? 'bg-sky-400'
                          : 'bg-amber-400';
                    const textColor =
                      data.percent >= 90
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : data.percent >= 70
                          ? 'text-sky-400 bg-sky-500/10'
                          : 'text-amber-400 bg-amber-500/10';

                    return (
                      <div
                        key={key}
                        className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center flex flex-col justify-between"
                      >
                        <div>
                          <p className="text-[11px] uppercase tracking-wider font-semibold text-white/80 mb-1">
                            {key}
                          </p>
                          <span
                            className={`inline-block text-[11px] font-bold px-1.5 py-0.5 rounded ${textColor}`}
                          >
                            {data.status}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden my-2">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
                            style={{ width: `${data.percent}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-white/80 leading-tight">{data.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Top Real-World Highlights for Active Lens */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {activeData.highlightActivities.map((activity) => (
                    <span
                      key={activity}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-[11px] text-white/90 bg-white/[0.04] border border-white/[0.07] rounded-full px-2.5 py-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      {activity}
                    </span>
                  ))}
                </div>

                {/* Footer Links */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
                  <Link
                    href={lenses.find((l) => l.name === activeData.name)?.href || '/clareon-vivity'}
                    className="text-white/90 hover:text-primary font-semibold transition-colors inline-flex items-center gap-1 min-h-[44px] py-2 touch-manipulation rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <span>Explore {activeData.name}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <a
                    href="#vision"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollToElement('vision');
                      window.history.pushState(null, '', '#vision');
                    }}
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 shrink-0 min-h-[44px] py-2 touch-manipulation rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <Icon name="SparklesIcon" size={13} className="shrink-0" />
                    <span>Vision Simulator</span>
                    <span className="font-mono text-xs" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
