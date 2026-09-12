'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';
import CataractLandingHook3D from '@/components/cataract-3d/CataractLandingHook3D';

export default function CataractEducationTeaserSection() {
  const [activeStage, setActiveStage] = useState(0);

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
      subtitle: 'Pristine Protein Lattice',
      detail: 'Zero Optical Scatter',
      dotColor: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]',
      activeBorder: 'border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.15)] bg-cyan-950/20',
    },
    {
      num: '02',
      name: 'Early Scatter',
      state: 'Night Glare',
      subtitle: 'Micro-Aggregates',
      detail: 'Peripheral Halos',
      dotColor: 'bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.6)]',
      activeBorder: 'border-amber-300/60 shadow-[0_0_15px_rgba(252,211,77,0.15)] bg-amber-950/20',
    },
    {
      num: '03',
      name: 'Protein Shift',
      state: 'Yellowing',
      subtitle: 'Nuclear Sclerosis',
      detail: 'Blue Light Filtered',
      dotColor: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]',
      activeBorder: 'border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] bg-amber-950/25',
    },
    {
      num: '04',
      name: 'Dense Cataract',
      state: 'Severe Blur',
      subtitle: 'Advanced Opacity',
      detail: 'Retinal Light Blockade',
      dotColor: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]',
      activeBorder: 'border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.15)] bg-rose-950/25',
    },
    {
      num: '05',
      name: 'Acrylic IOL',
      state: 'Permanent Cure',
      subtitle: 'Foldable Acrylic IOL',
      detail: 'Permanent 20/20 Clarity',
      dotColor: 'bg-primary shadow-[0_0_12px_rgba(197,160,89,0.85)]',
      activeBorder: 'border-primary shadow-[0_0_20px_rgba(197,160,89,0.25)] bg-primary/20',
      isCure: true,
    },
  ];

  return (
    <section
      id="cataract-education"
      className="py-8 sm:py-12 relative overflow-hidden bg-[#07090e] scroll-mt-20"
      aria-label="Cataract Education Guide & 3D Optical Simulation"
    >
      {/* Refined ambient depth gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_40%,rgba(197,160,89,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[200px] bg-cyan-500/[0.025] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="group relative rounded-3xl border border-white/[0.10] bg-gradient-to-r from-[#0c0f18]/95 via-[#090c13]/95 to-[#0f131f]/95 p-5 sm:p-7 lg:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] hover:border-primary/35 transition-all duration-500">
          {/* Top highlight hairline */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/35 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Sharp Editorial Hook & Surgical Clarity */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-primary">
                    Clinical Education &amp; Ocular Optics
                  </span>
                  <span className="text-white/20 text-xs">•</span>
                  <span className="text-[10.5px] font-mono text-muted-foreground uppercase tracking-wider">
                    3D Simulation
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-foreground leading-[1.15] tracking-tight">
                  How Cataracts Form — And Why{' '}
                  <span className="font-semibold text-gradient-primary block sm:inline">
                    Lens Replacement is Permanent.
                  </span>
                </h2>

                <p className="mt-3.5 text-xs sm:text-sm text-foreground/85 leading-relaxed font-normal">
                  A cataract is not a surface film, but the progressive oxidation and clumping of
                  crystalline proteins deep inside your natural crystalline lens. As demonstrated in
                  the cross-sectional ray trace, internal opacities scatter and block incoming light
                  before it can focus on the retina.
                </p>

                <div className="mt-4 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-sm flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                    <Icon name="EyeIcon" size={15} />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <span className="font-semibold text-white">The Surgical Transformation:</span>
                    <p className="text-muted-foreground leading-snug">
                      Phacoemulsification gently removes the denatured biological protein and
                      replaces it with a clear, biocompatible acrylic IOL that never degrades or
                      clouds again.
                    </p>
                  </div>
                </div>
              </div>

              {/* High-Intent CTAs */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="/cataract-education"
                  onClick={handleGuideClick}
                  className="group/btn inline-flex items-center justify-center px-6 py-3.5 bg-primary text-[#040506] rounded-xl text-xs sm:text-sm font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[48px] shadow-[0_4px_20px_rgba(197,160,89,0.25)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none whitespace-nowrap"
                >
                  <span>Explore Full 5-Stage 3D Anatomy</span>
                  <div className="ml-2.5 w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-1">
                    <Icon name="ArrowRightIcon" size={13} className="text-current" />
                  </div>
                </Link>

                <div className="flex items-center gap-2 text-xs text-muted-foreground/90">
                  <Icon name="SparklesIcon" size={14} className="text-primary shrink-0" />
                  <span>Interactive 540nm Ray-Tracing Simulation</span>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded 3D Minimalist Time-Lapse Vitrine */}
            <div className="lg:col-span-6 xl:col-span-6 w-full">
              <CataractLandingHook3D
                externalStage={activeStage}
                onStageChange={(idx) => setActiveStage(idx)}
              />
            </div>
          </div>

          {/* Connected 5-Stage Optical Progression Timeline (Full-Width Across Bottom) */}
          <div className="mt-7 pt-5 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  5-Stage Optical Cataract Progression &amp; Permanent IOL Cure
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground hidden md:inline">
                Hover or click any stage to inspect optical ray physics in the 3D model above →
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
              {previewStages.map((st, i) => {
                const isSelected = activeStage === i;
                return (
                  <button
                    key={st.num}
                    type="button"
                    onClick={() => setActiveStage(i)}
                    onMouseEnter={() => setActiveStage(i)}
                    className={`group/stage p-3 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-2 text-left cursor-pointer ${
                      isSelected
                        ? st.activeBorder
                        : st.isCure
                          ? 'bg-primary/10 border-primary/35 hover:bg-primary/15 col-span-2 sm:col-span-1'
                          : 'bg-black/50 border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 w-full">
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
                          CURE
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-muted-foreground/70">
                          {st.state}
                        </span>
                      )}
                    </div>

                    <div>
                      <p
                        className={`text-xs font-semibold transition-colors leading-tight ${
                          isSelected ? (st.isCure ? 'text-primary' : 'text-white') : 'text-white/90'
                        }`}
                      >
                        {st.name}
                      </p>
                      <p
                        className={`text-[10.5px] leading-tight mt-0.5 truncate ${
                          st.isCure ? 'text-primary/90 font-medium' : 'text-muted-foreground'
                        }`}
                      >
                        {st.subtitle}
                      </p>
                      <p className="text-[9.5px] text-white/40 leading-tight mt-1 truncate">
                        {st.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
