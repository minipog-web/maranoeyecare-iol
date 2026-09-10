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
    { num: '01', title: 'Youthful Lens', color: 'bg-cyan-400', badge: '100% Clear' },
    { num: '02', title: 'Early Clouding', color: 'bg-amber-300', badge: 'Night Glare' },
    { num: '03', title: 'Yellowing Phase', color: 'bg-amber-500', badge: 'Color Loss' },
    { num: '04', title: 'Brown & Opaque', color: 'bg-amber-800', badge: 'Severe Blur' },
    {
      num: '05',
      title: 'Acrylic IOL',
      color: 'bg-primary',
      badge: 'Permanent Cure',
      isPrimary: true,
    },
  ];

  return (
    <section
      id="cataract-education"
      className="py-14 sm:py-20 relative overflow-hidden bg-[#090b11] scroll-mt-20"
      aria-label="Cataract Education Preview"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(197,160,89,0.035)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.015] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-bg opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="glass-card border border-white/[0.08] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl bg-gradient-to-b from-[#0e111a]/95 via-[#0b0d14]/95 to-[#080a0f]/95 relative overflow-hidden">
          {/* Subtle decorative edge accent */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <Icon name="EyeIcon" size={14} />
              <span>Clinical Education · Eye Anatomy</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-4">
              How Cataracts Form &amp; Why{' '}
              <span className="font-semibold text-gradient-primary">
                Lens Replacement is Permanent.
              </span>
            </h2>

            {/* Concise Reassuring Copy */}
            <p className="text-foreground/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
              A cataract is not a film or growth across the eye—it is the natural aging and clumping
              of crystallin proteins inside your biological lens. Explore our interactive 5-stage
              progression simulation to see how vision changes and why medical-grade acrylic IOLs
              provide a lifetime, once-in-a-lifetime cure.
            </p>

            {/* 5-Stage Progression Mini Track */}
            <div className="mb-9 p-3 sm:p-4 rounded-2xl bg-black/40 border border-white/[0.06] max-w-3xl mx-auto">
              <div className="flex items-center justify-between gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">
                <span className="flex items-center gap-1.5 text-primary">
                  <Icon name="SparklesIcon" size={13} />
                  <span>5-Stage Optical Progression</span>
                </span>
                <span className="text-[10px] text-muted-foreground/70 hidden sm:inline">
                  Biological Deterioration → Surgical Liberation
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {previewStages.map((stage, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                      stage.isPrimary
                        ? 'col-span-2 sm:col-span-1 bg-primary/10 border-primary/40 shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                        : 'bg-white/[0.02] border-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`w-2 h-2 rounded-full ${stage.color}`} />
                      <span className="text-[10px] font-mono text-muted-foreground/80 font-semibold">
                        {stage.num}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      {stage.title}
                    </span>
                    <span
                      className={`text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded ${
                        stage.isPrimary
                          ? 'bg-primary text-black'
                          : 'bg-white/[0.06] text-muted-foreground'
                      }`}
                    >
                      {stage.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/cataract-education"
                onClick={handleGuideClick}
                className="w-full sm:w-auto group inline-flex items-center justify-center pl-7 pr-4 py-3.5 bg-primary text-[#040506] rounded-full text-xs sm:text-sm font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[48px] shadow-[0_4px_20px_rgba(197,160,89,0.3)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <span>Explore Cataract Education Guide</span>
                <div className="ml-3 w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 shrink-0">
                  <Icon name="ArrowRightIcon" size={14} className="text-current" />
                </div>
              </Link>

              <a
                href="#lenses"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-foreground text-xs sm:text-sm font-semibold transition-all text-center touch-manipulation min-h-[48px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                Compare Lens Options Below ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
