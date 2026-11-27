'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/AppIcon';
import LazySimulatorGate from '@/components/ui/LazySimulatorGate';
import { Cataract3DPreviewPlaceholder } from '@/components/ui/SimulatorPreviewPlaceholders';
import { trackEvent } from '@/lib/gtag';
import { smoothScrollToElement } from '@/lib/ui';

const CataractLandingHook3D = dynamic(
  () => import('@/components/cataract-3d/CataractLandingHook3D'),
  {
    ssr: false,
    loading: () => <Cataract3DPreviewPlaceholder variant="teaser" isLoading />,
  }
);

const STAGE_PILLS = [
  { idx: 0, code: '01', label: 'Clear Lens' },
  { idx: 1, code: '02', label: 'Early Glare' },
  { idx: 2, code: '03', label: 'Yellowing' },
  { idx: 3, code: '04', label: 'Dense Cataract' },
  { idx: 4, code: '05', label: 'Acrylic IOL Cure' },
];

export default function CataractEducationTeaserSection() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [userRequested3D, setUserRequested3D] = useState<boolean>(false);
  const stagePillsRef = useRef<HTMLDivElement>(null);
  const viewerColRef = useRef<HTMLDivElement>(null);

  const handleGuideClick = () => {
    trackEvent({
      action: 'cataract_teaser_guide_click',
      category: 'Navigation',
      label: 'Explore Cataract Education Guide',
    });
  };

  return (
    <section
      id="cataract-education"
      className="py-14 sm:py-20 relative overflow-hidden bg-section-education scroll-mt-24 sm:scroll-mt-28"
      aria-label="Cataract Education & Interactive 3D Optical Simulation"
    >
      <div className="absolute inset-0 texture-fresnel-rings opacity-60 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary/[0.07] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-sky-500/[0.07] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Double-Bezel (Doppelrand) Clinical Vitrine */}
        <div className="p-1.5 sm:p-2 rounded-[2rem] bg-gradient-to-b from-primary/30 via-white/[0.07] to-white/[0.02] border border-primary/40 shadow-[0_28px_70px_rgba(0,0,0,0.8),0_0_45px_rgba(197,160,89,0.14)]">
          <div className="relative rounded-[calc(2rem-6px)] bg-gradient-to-r from-[#0d111c] via-[#090c14] to-[#0d1220] p-5 sm:p-8 lg:p-10 border border-white/[0.08]">
            <div className="absolute top-0 inset-x-10 h-[1.5px] bg-gradient-to-r from-transparent via-primary/65 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Editorial Hook, Interactive 5-Stage Selector & Deep-Dive CTA */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4 max-w-full">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    <span className="min-w-0 break-words text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#F6E6C4]">
                      Interactive 3D Eye Time-Lapse · 5 Clinical Stages
                    </span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-medium text-white leading-[1.1] tracking-tight">
                    Cataracts Form Over Decades.{' '}
                    <span className="block mt-1 font-semibold text-gradient-primary">
                      One 10-Minute Replacement Cures Them Forever.
                    </span>
                  </h2>

                  <p className="mt-3.5 text-sm sm:text-base text-slate-200/95 leading-relaxed">
                    Updated eyeglasses cannot clear a cataract because natural lens proteins
                    physically oxidize, yellow, and scatter light inside the eye. Replacing that
                    clouded lens with a biocompatible acrylic IOL restores crisp transmission—and{' '}
                    <strong className="text-white font-semibold">
                      can never cloud or form a cataract again
                    </strong>
                    .
                  </p>

                  {/* Interactive 5-Stage Synced Control Pills */}
                  <div ref={stagePillsRef} className="mt-5">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-300 mb-2">
                      Tap Any Stage to Inspect the 3D Eye Model:
                    </p>
                    <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 overflow-x-auto sm:overflow-visible scrollbar-none -mx-1 px-1 py-0.5">
                      {STAGE_PILLS.map((stage) => {
                        const selected = activeStage === stage.idx;
                        return (
                          <button
                            key={stage.code}
                            type="button"
                            onClick={() => {
                              setActiveStage(stage.idx);
                              setUserRequested3D(true);
                              trackEvent({
                                action: 'cataract_3d_stage_pill_click',
                                category: 'Engagement',
                                label: `${stage.code}: ${stage.label}`,
                              });
                              if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                                requestAnimationFrame(() => {
                                  const viewerEl = viewerColRef.current;
                                  const pillsEl = stagePillsRef.current;
                                  if (!viewerEl || !pillsEl) return;
                                  const viewerRect = viewerEl.getBoundingClientRect();
                                  if (viewerRect.bottom > window.innerHeight - 72) {
                                    const header =
                                      document.querySelector<HTMLElement>('[data-header-bar]') ||
                                      document.querySelector<HTMLElement>('header');
                                    const headerHeight = header
                                      ? header.getBoundingClientRect().height
                                      : 64;
                                    const targetTop = Math.max(
                                      0,
                                      pillsEl.getBoundingClientRect().top +
                                        window.scrollY -
                                        (headerHeight + 16)
                                    );
                                    window.scrollTo({ top: targetTop, behavior: 'smooth' });
                                  }
                                });
                              }
                            }}
                            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                              selected
                                ? 'bg-primary text-[#050608] shadow-[0_4px_14px_rgba(197,160,89,0.35)]'
                                : 'bg-white/[0.04] border border-white/10 text-slate-200 hover:border-primary/45 hover:text-white'
                            }`}
                          >
                            <span className="font-mono mr-1 opacity-75">{stage.code}</span>
                            <span>{stage.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Deep-Dive Education Hook + Direct Evaluation Link */}
                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/cataract-education"
                    onClick={handleGuideClick}
                    className="btn-premium-primary inline-flex items-center justify-between gap-2.5 pl-4 sm:pl-5 pr-2 py-2.5 rounded-full text-xs xs:text-sm font-extrabold min-h-[50px] touch-manipulation group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <span>Explore Full 5-Stage Cataract Guide</span>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                      <Icon name="ArrowRightIcon" size={14} className="text-black" />
                    </span>
                  </Link>

                  <a
                    href="#vision"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollToElement('vision');
                      window.history.pushState(null, '', '#vision');
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:border-primary/45 text-xs sm:text-sm font-bold text-slate-200 hover:text-white transition-colors min-h-[48px] touch-manipulation"
                  >
                    <span>Compare Replacement Lenses</span>
                    <Icon name="ArrowDownIcon" size={14} className="text-primary shrink-0" />
                  </a>
                </div>
              </div>

              {/* Right Column: Deferred Lazy-Loaded 3D Anatomical Cataract Simulator */}
              <div
                ref={viewerColRef}
                className="lg:col-span-6 w-full min-h-[360px] sm:min-h-[360px] lg:min-h-[385px]"
              >
                <LazySimulatorGate
                  rootMargin="120px"
                  forceActivate={userRequested3D}
                  placeholder={<Cataract3DPreviewPlaceholder variant="teaser" />}
                  render={() => (
                    <CataractLandingHook3D
                      externalStage={activeStage}
                      onStageChange={(idx) => setActiveStage(idx)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
