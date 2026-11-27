'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import LensComparisonMatrix from '@/app/components/LensComparisonMatrix';
import LazySimulatorGate from '@/components/ui/LazySimulatorGate';
import { VisionSimulatorPreviewPlaceholder } from '@/components/ui/SimulatorPreviewPlaceholders';
import { trackEvent } from '@/lib/gtag';
import { renderFootnoteText, smoothScrollToElement } from '@/lib/ui';

const LensVisionComparisonSection = dynamic(
  () => import('@/app/components/LensVisionComparisonSection'),
  {
    ssr: false,
    loading: () => <VisionSimulatorPreviewPlaceholder isLoading />,
  }
);

const LENS_CARDS = [
  {
    key: 'vivity',
    name: 'Clareon® Vivity®',
    shortName: 'Vivity®',
    href: '/clareon-vivity',
    badge: 'Most Popular · Non-Diffractive EDOF',
    image: '/assets/images/vivity_hero.jpg',
    alt: 'Clareon Vivity extended depth of focus intraocular lens',
    summary:
      'Smooth, continuous vision from highway distance to your dashboard and computer—with a night glare profile like a standard lens.',
    benefits: [
      'Crisp night driving with minimal halos or glare [2]',
      'Effortless computer, cooking & dashboard focus',
      'Toric astigmatism correction included at no extra fee',
    ],
    range: { distance: 100, intermediate: 100, near: 65 },
    accentBorder: 'border-primary/45',
    badgeClass: 'bg-primary text-[#050608]',
  },
  {
    key: 'panoptix',
    name: 'Clareon® PanOptix® Pro',
    shortName: 'PanOptix® Pro',
    href: '/panoptix-pro',
    badge: 'Full-Range Trifocal',
    image: '/assets/images/panoptix_hero.jpg',
    alt: 'Clareon PanOptix Pro trifocal intraocular lens',
    summary:
      'Engineered for maximum freedom from glasses—read texts, restaurant menus, laptops, and distant street signs with one lens.',
    benefits: [
      'Sharp near (40 cm), intermediate & distance vision [1]',
      '99.2% of patients say they would choose it again [5]',
      'Next-gen 94% light utilization for vivid clarity [5]',
    ],
    range: { distance: 100, intermediate: 100, near: 100 },
    accentBorder: 'border-purple-400/40',
    badgeClass: 'bg-purple-500/25 text-purple-200 border border-purple-400/40',
  },
  {
    key: 'puresee',
    name: 'TECNIS PureSee™',
    shortName: 'PureSee™',
    href: '/tecnis-puresee',
    badge: 'Latest Refractive EDOF',
    image: '/assets/images/puresee_hero.jpg',
    alt: 'TECNIS PureSee purely refractive EDOF intraocular lens',
    summary:
      'Purely refractive optics with zero diffractive rings and zero contrast sensitivity warning—built for crisp night highways and digital work.',
    benefits: [
      'Monofocal-like night contrast & zero halo rings [3]',
      'Continuous distance, intermediate & functional near',
      'Latest FDA-approved purely refractive EDOF design [3]',
    ],
    range: { distance: 100, intermediate: 100, near: 78 },
    accentBorder: 'border-sky-400/40',
    badgeClass: 'bg-sky-500/25 text-sky-200 border border-sky-400/40',
  },
];

export default function InteractiveMediaHubSection() {
  const [forceSimulatorActivate, setForceSimulatorActivate] = useState(false);

  useEffect(() => {
    const targetHashes = new Set(['#lenses', '#iol-simulator', '#vision-simulator']);
    if (targetHashes.has(window.location.hash)) {
      setForceSimulatorActivate(true);
    }

    const onActivateLazyTarget = (e: Event) => {
      const detail = (e as CustomEvent).detail as string | undefined;
      if (detail === 'lenses' || detail === 'iol-simulator' || detail === 'vision-simulator') {
        setForceSimulatorActivate(true);
      }
    };

    window.addEventListener('activate-lazy-target', onActivateLazyTarget);
    return () => window.removeEventListener('activate-lazy-target', onActivateLazyTarget);
  }, []);

  const handleBookWithLens = (lensKey?: string, label = 'Hub CTA') => {
    if (lensKey) {
      window.dispatchEvent(new CustomEvent('select-lens', { detail: lensKey }));
      try {
        sessionStorage.setItem('preselect-lens', lensKey);
      } catch {
        // ignore storage errors
      }
    }
    trackEvent({
      action: 'media_hub_booking_click',
      category: 'Conversion',
      label,
    });
    smoothScrollToElement('booking');
    window.history.pushState(null, '', '#booking');
  };

  return (
    <section
      id="vision"
      className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-section-physics border-t border-white/[0.05] scroll-mt-20 sm:scroll-mt-24"
      aria-label="Interactive Lens and Laser Technology Showcase"
    >
      <div id="physics" className="sr-only" aria-hidden="true" />

      <div className="absolute inset-0 texture-ray-grid opacity-55 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[260px] bg-gradient-to-b from-primary/[0.07] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary mb-2.5">
            Interactive Lens &amp; Vision Hub
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight mb-3">
            Explore Your{' '}
            <span className="font-semibold text-gradient-primary">Premium Lens Options</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Compare FDA-approved lenses side by side, preview how each lens looks day and night, and
            explore our interactive 3D cataract lens replacement model.
          </p>
        </div>

        {/* Always-Visible Premium Lens Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 mb-10 sm:mb-12">
          {LENS_CARDS.map((lens) => (
            <div
              key={lens.key}
              className={`relative group rounded-[28px] overflow-hidden bg-gradient-to-b from-[#131724]/95 via-[#0c0f18]/98 to-[#080a11] border ${lens.accentBorder} ring-1 ring-white/[0.06] flex flex-col justify-between shadow-[0_24px_64px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,244,218,0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_80px_rgba(0,0,0,0.82),0_0_40px_rgba(197,160,89,0.16)]`}
            >
              {/* Luminous Top Specular Hairline */}
              <div
                className="absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-primary/70 to-transparent z-20 pointer-events-none"
                aria-hidden="true"
              />
              <div>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#06080d]">
                  <AppImage
                    src={lens.image}
                    alt={lens.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1019] via-black/25 to-transparent" />
                  <span
                    className={`absolute top-3.5 left-3.5 right-3.5 w-fit max-w-[calc(100%-1.75rem)] px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-[0.12em] backdrop-blur-md leading-snug shadow-lg ${lens.badgeClass}`}
                  >
                    {lens.badge}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-2 tracking-tight">
                    {lens.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 lg:min-h-[68px]">
                    {lens.summary}
                  </p>

                  {/* Optical Range Clarity Bars */}
                  <div className="grid grid-cols-3 gap-2.5 mb-5 p-3 rounded-2xl bg-white/[0.035] border border-white/[0.08] shadow-inner">
                    {(
                      [
                        ['Distance', lens.range.distance],
                        ['Computer', lens.range.intermediate],
                        ['Reading', lens.range.near],
                      ] as const
                    ).map(([label, pct]) => (
                      <div key={label} className="text-center">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-slate-300 mb-1">
                          {label}
                        </span>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden mb-1">
                          <div
                            className={`h-full rounded-full ${
                              pct >= 90
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                                : pct >= 75
                                  ? 'bg-gradient-to-r from-sky-500 to-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                                  : 'bg-gradient-to-r from-[#C9A052] to-[#F6E2B3] shadow-[0_0_8px_rgba(197,160,89,0.6)]'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="block text-[10px] font-semibold text-slate-200">
                          {pct === 100 ? 'Full' : pct >= 75 ? 'Strong' : 'Functional'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-2 mb-5">
                    {lens.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-200"
                      >
                        <Icon name="CheckIcon" size={15} className="text-primary shrink-0 mt-0.5" />
                        <span>{renderFootnoteText(b)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto px-5 sm:px-6 pb-5 sm:pb-6 space-y-2">
                <button
                  type="button"
                  onClick={() => handleBookWithLens(lens.key, `Compare Card: ${lens.name}`)}
                  className="w-full h-[48px] px-4 rounded-xl border border-primary/45 bg-primary/15 hover:bg-primary hover:text-[#000000] active:scale-[0.99] text-[#F6E6C4] font-bold text-sm text-center whitespace-nowrap transition-all flex items-center justify-center gap-2 touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <span>Evaluate {lens.shortName}</span>
                  <Icon name="ArrowRightIcon" size={14} className="shrink-0" />
                </button>
                <Link
                  href={lens.href}
                  onClick={() =>
                    trackEvent({
                      action: 'lens_detail_link_click',
                      category: 'Engagement',
                      label: lens.name,
                    })
                  }
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-primary whitespace-nowrap transition-colors touch-manipulation rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>{lens.shortName} Clinical Guide &amp; Specs</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Scannable 4-Lens Side-by-Side Comparison Matrix */}
        <LensComparisonMatrix onSelectLens={handleBookWithLens} />

        {/* Lazy-Loaded Interactive Day & Night Vision Simulator */}
        <div className="rounded-3xl overflow-hidden border border-white/[0.1] bg-[#0a0c13]">
          <LazySimulatorGate
            rootMargin="120px"
            forceActivate={forceSimulatorActivate}
            placeholder={<VisionSimulatorPreviewPlaceholder />}
            render={() => <LensVisionComparisonSection />}
          />
        </div>

        {/* Persistent Conversion CTA Bar Inside Hub */}
        <div className="mt-7 sm:mt-8 rounded-2xl bg-gradient-to-r from-primary/15 via-[#10131e] to-primary/10 border border-primary/35 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="hidden sm:flex w-9 h-9 rounded-full bg-primary/20 border border-primary/40 items-center justify-center shrink-0">
              <Icon name="SparklesIcon" size={16} className="text-primary" />
            </span>
            <p className="text-sm sm:text-base font-semibold text-white">
              See which lens fits your eyes —{' '}
              <span className="text-primary">
                get a personalized 3D corneal scan &amp; surgeon review.
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleBookWithLens(undefined, 'Media Hub Persistent Bar')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-[#000000] rounded-xl text-sm font-extrabold text-center leading-snug whitespace-normal sm:whitespace-nowrap hover:bg-accent active:scale-[0.99] transition-all min-h-[48px] shrink-0 touch-manipulation shadow-[0_4px_18px_rgba(197,160,89,0.3)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <span>Request Your Evaluation</span>
            <Icon name="ArrowRightIcon" size={15} className="text-black" />
          </button>
        </div>
      </div>
    </section>
  );
}
