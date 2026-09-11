'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';

export default function CataractEducationTeaserSection() {
  const handleGuideClick = () => {
    trackEvent({
      action: 'cataract_teaser_guide_click',
      category: 'Navigation',
      label: 'Explore Cataract Education Guide',
    });
  };

  const previewStages = [
    {
      num: '01',
      name: 'Youthful',
      state: '100% Clear',
      dotColor: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]',
    },
    {
      num: '02',
      name: 'Early Scatter',
      state: 'Night Glare',
      dotColor: 'bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.5)]',
    },
    {
      num: '03',
      name: 'Protein Shift',
      state: 'Yellowing',
      dotColor: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    },
    {
      num: '04',
      name: 'Dense Cataract',
      state: 'Severe Blur',
      dotColor: 'bg-amber-800 shadow-[0_0_8px_rgba(146,64,14,0.5)]',
    },
    {
      num: '05',
      name: 'Acrylic IOL',
      state: 'Permanent Cure',
      dotColor: 'bg-primary shadow-[0_0_12px_rgba(197,160,89,0.8)]',
      isCure: true,
    },
  ];

  return (
    <section
      id="cataract-education"
      className="py-5 sm:py-7 relative overflow-hidden bg-[#090b11] scroll-mt-20"
      aria-label="Cataract Education Guide"
    >
      {/* Subtle ambient light accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(197,160,89,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[350px] h-[150px] bg-cyan-500/[0.02] rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="group relative rounded-2xl border border-white/[0.1] bg-gradient-to-r from-[#0d1017]/95 via-[#0b0d14]/95 to-[#11141e]/95 p-5 sm:p-6 lg:p-7 shadow-xl hover:border-primary/30 transition-all duration-300">
          {/* Top highlight hairline */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
            {/* Left Column: Sharp Editorial Hook & Integrated 5-Stage Strip */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  Clinical Education Guide
                </span>
                <span className="text-white/20 text-xs">•</span>
                <span className="text-[11px] text-muted-foreground">
                  Eye Anatomy &amp; Optical Biology
                </span>
              </div>

              <h2 className="font-display text-xl sm:text-2xl lg:text-[25px] font-light text-foreground leading-snug tracking-tight">
                How Cataracts Form — And Why{' '}
                <span className="font-semibold text-gradient-primary">
                  Lens Replacement is Permanent.
                </span>
              </h2>

              <p className="mt-1.5 text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-2xl font-normal">
                A cataract is not a surface film, but the natural clumping of crystalline proteins
                deep inside your biological lens. See how light scatter escalates across 5 optical
                stages, and why medical-grade acrylic never fogs.
              </p>

              {/* Connected 5-Stage Optical Progression Strip */}
              <div className="mt-4 inline-flex flex-wrap sm:flex-nowrap items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-xl bg-black/40 border border-white/[0.06]">
                {previewStages.map((st, i) => (
                  <React.Fragment key={st.num}>
                    <div
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${
                        st.isCure
                          ? 'bg-primary/10 border border-primary/30 shadow-[0_0_10px_rgba(197,160,89,0.15)]'
                          : 'bg-white/[0.02]'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${st.dotColor}`} />
                      <span
                        className={`text-[10px] font-mono ${
                          st.isCure ? 'text-primary font-bold' : 'text-muted-foreground'
                        }`}
                      >
                        {st.num}
                      </span>
                      <span className="text-[11px] font-medium text-foreground/90 whitespace-nowrap">
                        {st.name}
                      </span>
                      <span
                        className={`text-[9px] ${
                          st.isCure ? 'text-primary font-bold' : 'text-muted-foreground/70'
                        } hidden md:inline whitespace-nowrap`}
                      >
                        ({st.state})
                      </span>
                    </div>
                    {i < previewStages.length - 1 && (
                      <span className="text-white/20 text-[10px] px-0.5 font-mono hidden sm:inline">
                        →
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right Column: High-Intent Action */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between sm:justify-start gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
              <Link
                href="/cataract-education"
                onClick={handleGuideClick}
                className="group/btn inline-flex items-center justify-center px-6 py-3.5 bg-primary text-[#040506] rounded-xl text-xs sm:text-sm font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[46px] shadow-[0_4px_18px_rgba(197,160,89,0.25)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none whitespace-nowrap"
              >
                <span>Explore 5-Stage Guide</span>
                <div className="ml-2.5 w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-1">
                  <Icon name="ArrowRightIcon" size={13} className="text-current" />
                </div>
              </Link>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground justify-center lg:justify-end">
                <Icon name="SparklesIcon" size={12} className="text-primary" />
                <span>Interactive Simulator Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
