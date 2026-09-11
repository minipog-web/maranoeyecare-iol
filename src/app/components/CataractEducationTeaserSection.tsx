'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';
import CataractLandingHook3D from '@/components/cataract-3d/CataractLandingHook3D';

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
      className="py-6 sm:py-10 relative overflow-hidden bg-[#090b11] scroll-mt-20"
      aria-label="Cataract Education Guide & 3D Time-Lapse"
    >
      {/* Subtle ambient light accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(197,160,89,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[350px] h-[150px] bg-cyan-500/[0.03] rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="group relative rounded-3xl border border-white/[0.12] bg-gradient-to-r from-[#0d1017]/95 via-[#0b0d14]/95 to-[#11141e]/95 p-5 sm:p-7 lg:p-9 shadow-2xl hover:border-primary/40 transition-all duration-300">
          {/* Top highlight hairline */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Sharp Editorial Hook & Integrated 5-Stage Strip */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                    Clinical Education &amp; Anatomy
                  </span>
                  <span className="text-white/20 text-xs">•</span>
                  <span className="text-[11px] text-muted-foreground">
                    3D Time-Lapse Simulation
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-light text-foreground leading-snug tracking-tight">
                  How Cataracts Form — And Why{' '}
                  <span className="font-semibold text-gradient-primary block sm:inline">
                    Lens Replacement is Permanent.
                  </span>
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-foreground/85 leading-relaxed max-w-2xl font-normal">
                  A cataract is not a surface film, but the natural denaturing and clumping of
                  crystalline proteins deep inside your biological lens. As seen in the 3D model,
                  developing opacity scatters and blocks incoming light rays before they can reach
                  the retina.
                </p>
              </div>

              {/* High-Intent CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/cataract-education"
                  onClick={handleGuideClick}
                  className="group/btn inline-flex items-center justify-center px-6 py-3.5 bg-primary text-[#040506] rounded-xl text-xs sm:text-sm font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[48px] shadow-[0_4px_18px_rgba(197,160,89,0.25)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none whitespace-nowrap"
                >
                  <span>Explore Full 5-Stage 3D Anatomy</span>
                  <div className="ml-2.5 w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-1">
                    <Icon name="ArrowRightIcon" size={13} className="text-current" />
                  </div>
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon name="SparklesIcon" size={13} className="text-primary" />
                  <span>Interactive 3D ray-tracing simulation</span>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded 3D Minimalist Time-Lapse */}
            <div className="lg:col-span-5 w-full">
              <CataractLandingHook3D />
            </div>
          </div>

          {/* Connected 5-Stage Optical Progression Timeline (Full-Width Across Bottom) */}
          <div className="mt-6 pt-5 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  5-Stage Optical Cataract Progression &amp; Permanent IOL Cure
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground hidden md:inline">
                Click any stage to inspect complete clinical data in full 3D guide →
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
              {previewStages.map((st) => (
                <Link
                  key={st.num}
                  href="/cataract-education"
                  onClick={handleGuideClick}
                  className={`group/stage p-2.5 sm:p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between gap-1.5 ${
                    st.isCure
                      ? 'bg-primary/10 border-primary/45 hover:bg-primary/20 shadow-[0_0_15px_rgba(197,160,89,0.15)] hover:border-primary col-span-2 sm:col-span-1'
                      : 'bg-black/50 border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${st.dotColor}`} />
                      <span
                        className={`text-[10px] font-mono font-bold ${
                          st.isCure ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        STAGE {st.num}
                      </span>
                    </div>
                    {st.isCure ? (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/20 px-1.5 py-0.5 rounded">
                        PERMANENT
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-muted-foreground/70">
                        {st.state}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white group-hover/stage:text-primary transition-colors leading-tight">
                      {st.name}
                    </p>
                    {st.isCure ? (
                      <p className="text-[10px] text-primary/90 font-medium leading-tight mt-0.5">
                        Permanent Crystal Clarity
                      </p>
                    ) : (
                      <p className="text-[10px] text-muted-foreground/80 leading-tight mt-0.5">
                        Optical Light Scatter
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
