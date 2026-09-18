'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';

const CataractLandingHook3D = dynamic(
  () => import('@/components/cataract-3d/CataractLandingHook3D'),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full aspect-[4/3] rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
            Loading Optical Simulation...
          </span>
        </div>
      </div>
    ),
  }
);

export default function CataractEducationTeaserSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleGuideClick = () => {
    trackEvent({
      action: 'cataract_teaser_guide_click',
      category: 'Navigation',
      label: 'Explore Cataract Education Guide',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="cataract-education"
      className="py-12 sm:py-16 relative overflow-hidden bg-section-education scroll-mt-20 border-b border-white/[0.04]"
      aria-label="Cataract Education & 3D Optical Simulation"
    >
      {/* Fresnel concentric contour texture in negative space */}
      <div className="absolute inset-0 texture-fresnel-rings opacity-60 pointer-events-none" />

      {/* Dual Cellular Aging / Acrylic Prism Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[550px] h-[450px] bg-[radial-gradient(circle,rgba(217,119,6,0.06)_0%,transparent_65%)] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(0,163,255,0.07)_0%,transparent_65%)] rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="group relative rounded-3xl border border-white/[0.10] bg-gradient-to-r from-[#0c0f18]/95 via-[#090c13]/95 to-[#0f131f]/95 p-5 sm:p-7 lg:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] hover:border-primary/35 transition-all duration-500">
          {/* Top highlight hairline */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/35 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Sharp Editorial Hook & Surgical Clarity */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-primary">
                    Biological Time-Lapse • Natural Lens Aging
                  </span>
                  <span className="text-white/20 text-xs">•</span>
                  <span className="text-[10.5px] font-mono text-muted-foreground uppercase tracking-wider">
                    3D Simulation
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-foreground leading-[1.15] tracking-tight">
                  Cataracts Take Decades to Form.{' '}
                  <span className="font-semibold text-gradient-primary block sm:inline">
                    Curing Them Takes One Surgery.
                  </span>
                </h2>

                <p className="mt-3 text-xs sm:text-sm text-foreground/85 leading-relaxed font-normal">
                  Cataracts develop when natural crystalline proteins gradually oxidize and clump
                  over decades, scattering incoming light before it can reach the retina. Modern
                  microsurgery replaces the clouded natural lens with a clear, biocompatible acrylic
                  IOL that permanently restores sharp focus—and can never develop cataracts again.
                </p>

                <div className="mt-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-sm flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                    <Icon name="ClockIcon" size={14} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">
                    <strong className="text-white font-semibold">Permanent Replacement:</strong>{' '}
                    While biological lens proteins denature with age, synthetic acrylic IOLs are
                    inert and immune to cataracts for life.
                  </p>
                </div>
              </div>

              {/* High-Intent CTAs */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="/cataract-education"
                  onClick={handleGuideClick}
                  className="group/btn inline-flex items-center justify-center px-6 py-3.5 bg-primary text-[#040506] rounded-xl text-xs sm:text-sm font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[48px] shadow-[0_4px_20px_rgba(197,160,89,0.25)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none whitespace-nowrap"
                >
                  <span>Deep Dive: Cataract Education</span>
                  <div className="ml-2.5 w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-1">
                    <Icon name="ArrowRightIcon" size={13} className="text-current" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Column: Embedded 3D Minimalist Time-Lapse Vitrine */}
            <div className="lg:col-span-6 xl:col-span-6 w-full min-h-[280px] sm:min-h-[340px]">
              {isInView ? (
                <CataractLandingHook3D />
              ) : (
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                      Preparing 3D Optical Vitrine...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
