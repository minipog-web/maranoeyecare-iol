'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { trackEvent, trackPhoneClick } from '@/lib/gtag';
import { smoothScrollToElement } from '@/lib/ui';

interface MidPageConversionStripProps {
  variant: 'surgeons' | 'pricing';
}

const CONTENT = {
  surgeons: {
    eyebrow: 'Direct Surgeon Consultation',
    headline: 'Speak Directly With Dr. Marano or Dr. Raouf',
    subtext:
      'Your 3D corneal measurements and lens recommendation are reviewed personally by your surgeon—never delegated, zero pressure.',
    primaryLabel: 'Book Your Evaluation',
    trackingSource: 'Mid-Page Strip (Surgeons)',
  },
  pricing: {
    eyebrow: 'Insurance & Benefit Verification',
    headline: 'Get a Clear Written Cost Breakdown Before You Decide',
    subtext:
      'Our coordinators verify your Medicare or commercial benefits and walk you through $0-down 0% APR financing options in a quick 5-minute call.',
    primaryLabel: 'Request Free Benefit Check',
    trackingSource: 'Mid-Page Strip (Pricing)',
  },
} as const;

export default function MidPageConversionStrip({ variant }: MidPageConversionStripProps) {
  const copy = CONTENT[variant];

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollToElement('booking');
    window.history.pushState(null, '', '#booking');
    trackEvent({
      action: 'mid_page_booking_click',
      category: 'Conversion',
      label: copy.trackingSource,
    });
  };

  return (
    <div className="py-8 sm:py-10 relative overflow-hidden border-y border-primary/20 bg-gradient-to-r from-[#11131b] via-[#151823] to-[#11131b]">
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/[0.06] via-transparent to-primary/[0.06] pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 lg:gap-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
              {copy.eyebrow}
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground leading-snug mb-1">
              {copy.headline}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {copy.subtext}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href="#booking"
              onClick={handleBookClick}
              className="group btn-premium-chic inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 bg-primary text-[#000000] rounded-full text-sm font-bold text-center leading-snug transition-all min-h-[48px] touch-manipulation sm:whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <span>{copy.primaryLabel}</span>
              <Icon
                name="ArrowRightIcon"
                size={15}
                className="text-black shrink-0 transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="tel:9733220100"
              suppressHydrationWarning
              onClick={() => trackPhoneClick(copy.trackingSource, '(973) 322-0100')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-primary/40 bg-white/[0.04] hover:bg-primary/15 hover:border-primary text-white text-sm font-bold text-center leading-snug transition-all min-h-[48px] touch-manipulation sm:whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <Icon name="PhoneIcon" size={15} className="text-primary shrink-0" />
              <span>
                Call <span suppressHydrationWarning>(973) 322-0100</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
