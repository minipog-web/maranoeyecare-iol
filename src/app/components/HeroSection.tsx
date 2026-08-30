'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';
import { renderFootnoteText } from '@/lib/ui';

const lenses = [
  {
    name: 'Clareon Vivity',
    tag: 'Most Popular',
    subtitle: 'Non-diffractive EDOF',
    detail: 'Glare & halo profile similar to monofocal [2]',
    src: '/assets/images/vivity_iol_clean.png',
    alt: 'Clareon Vivity IOL, non-diffractive extended depth of focus intraocular lens',
    accent: 'border-primary/50',
    featured: true,
    glow: 'shadow-[0_0_60px_rgba(197,160,89,0.35),0_0_0_1px_rgba(197,160,89,0.2)] border-primary/45 bg-white/[0.05]',
    inactiveGlow: 'shadow-[0_0_20px_rgba(197,160,89,0.08)] border-white/[0.08]',
  },
  {
    name: 'PanOptix Pro',
    tag: 'Trifocal',
    subtitle: 'Full trifocal range',
    detail: '99% would choose this lens again [1]',
    src: '/assets/images/panoptix_iol_clean.png',
    alt: 'Clareon PanOptix Pro trifocal IOL, trifocal intraocular lens',
    accent: 'border-primary/25',
    featured: false,
    glow: 'shadow-[0_0_60px_rgba(139,92,246,0.35),0_0_0_1px_rgba(139,92,246,0.2)] border-[rgba(139,92,246,0.45)] bg-white/[0.05]',
    inactiveGlow: 'shadow-[0_0_20px_rgba(139,92,246,0.08)] border-white/[0.08]',
  },
  {
    name: 'TECNIS PureSee',
    tag: 'Latest EDOF',
    subtitle: 'Latest refractive extended vision',
    detail: 'Latest, most cutting-edge EDOF IOL with zero contrast warning [3]',
    src: '/assets/images/puresee_iol_clean.png',
    alt: 'TECNIS PureSee IOL, the latest and most cutting-edge purely refractive extended depth of focus intraocular lens',
    accent: 'border-primary/25',
    featured: false,
    glow: 'shadow-[0_0_60px_rgba(0,163,255,0.35),0_0_0_1px_rgba(0,163,255,0.2)] border-[rgba(0,163,255,0.45)] bg-white/[0.05]',
    inactiveGlow: 'shadow-[0_0_20px_rgba(0,163,255,0.08)] border-white/[0.08]',
  },
];

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
  const router = useRouter();
  // Starts with Clareon Vivity enlarged at onset until user hovers over another card
  const [activeLens, setActiveLens] = useState<string>('Clareon Vivity');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-14 sm:pt-16 lg:pt-20 safe-area-pb">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-lines-bg opacity-100" />

      {/* Rich ambient lighting - tuned to avoid warm hue interference behind gold title text */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[500px] bg-[radial-gradient(circle,rgba(56,189,248,0.02)_0%,transparent_70%)] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full py-4 sm:py-6 lg:py-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-start">
          {/* Left Content */}
          <div className="lg:col-span-7 xl:col-span-7 w-full flex flex-col items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary/20 bg-primary/5 mb-5 sm:mb-8 shimmer-border animate-fade-up fill-both">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0 shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-primary">
                {badgeText || 'Premium IOL Specialists • Livingston, Denville & Newark'}
              </span>
            </div>
            <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-light leading-[1.12] sm:leading-[1.08] tracking-tight text-foreground mb-5 sm:mb-6 animate-fade-up delay-150 fill-both">
              <span className="block">{heroTitleLine1 || 'One Surgery. One Choice.'}</span>{' '}
              <span className="block text-gradient-primary font-semibold mt-1 pb-1 sm:pb-2">
                {heroTitleLine2 || 'Lifetime Visual Freedom.'}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/85 max-w-xl leading-relaxed mb-8 sm:mb-10 text-left animate-fade-up delay-300 fill-both">
              {heroDesc ||
                'Cataract surgery is a once-in-a-lifetime opportunity to restore your vision. Standard lenses only focus at a single distance, meaning you still depend on reading glasses every day. Advanced lenses are designed to restore clear vision across distance, intermediate, and near ranges so you can leave glasses behind.'}
            </p>{' '}
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-4 sm:mb-5 animate-fade-up delay-450 fill-both">
              <a
                href="#booking"
                onClick={() =>
                  trackEvent({
                    action: 'hero_primary_cta_click',
                    category: 'Engagement',
                    label: 'Check My Lens Candidacy',
                  })
                }
                className="group inline-flex items-center justify-between sm:justify-center gap-4 pl-8 pr-3 py-3 bg-primary text-[#020304] rounded-full text-base font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[56px] shadow-[0_0_28px_rgba(197,160,89,0.25)] btn-shimmer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <span>Check My Lens Candidacy</span>
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105">
                  <Icon name="ArrowRightIcon" size={18} className="text-current" />
                </div>
              </a>
              <a
                href="#lenses"
                onClick={() =>
                  trackEvent({
                    action: 'hero_secondary_cta_click',
                    category: 'Engagement',
                    label: 'Compare Lenses',
                  })
                }
                className="group relative focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none py-4 px-8 text-base tracking-wide flex items-center justify-center gap-2 rounded-xl border border-border-bright bg-muted/40 font-semibold uppercase text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-muted/80 hover:text-white overflow-hidden"
              >
                {/* Precision left indicator block */}
                <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

                {/* Diagnostic subtle corner ticks on hover */}
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">
                  Compare Lenses
                </span>
                <Icon
                  name="ChevronDownIcon"
                  size={16}
                  className="relative z-10 transition-all duration-300 group-hover:translate-y-0.5 group-hover:translate-x-1 text-muted-foreground group-hover:text-primary"
                />
              </a>
            </div>
            {/* Reassurance Indicators (Positioned above horizontal border line) */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-6 sm:mb-8 animate-fade-up delay-500 fill-both text-xs text-foreground/80 font-medium select-none">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <Icon name="MapPinIcon" size={15} className="text-primary shrink-0" />
                Livingston, Denville &amp; Newark Offices
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                Zero-Needle Topical Drops
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                99% Patient Satisfaction
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                Quick 10-Min Procedure
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                No Out-of-Pocket Consultation Cost
              </span>
            </div>
            {/* Editorial Proof Text */}
            <div className="border-t border-border pt-6 sm:pt-8 w-full animate-fade-up delay-600 fill-both max-w-xl">
              <p className="text-sm sm:text-base text-white/95 font-semibold mb-4 font-display">
                Led by Board-Certified Surgeons Dr. Matthew Marano Jr. &amp; Dr. Sherief Raouf:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  <span className="text-muted-foreground leading-snug">
                    <strong className="text-primary font-semibold">Board-Certified</strong>{' '}
                    Ophthalmologists &amp; Cornea Specialist
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  <span className="text-muted-foreground leading-snug">
                    <strong className="text-primary font-semibold">Chief of Ophthalmology</strong>{' '}
                    at Cooperman Barnabas Medical Center
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  <span className="text-muted-foreground leading-snug">
                    Recognized as a{' '}
                    <strong className="text-primary font-semibold">
                      15× NJ Monthly Top Doctor
                    </strong>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  <span className="text-muted-foreground leading-snug">
                    <strong className="text-white font-medium">Fellowship-Trained</strong> in Cornea
                    &amp; Refractive Surgery
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  <span className="text-muted-foreground leading-snug">
                    Over <strong className="text-primary font-semibold">40,000+ surgeries</strong>{' '}
                    completed with 99% satisfaction
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  <span className="text-muted-foreground leading-snug">
                    Over <strong className="text-primary font-semibold">4.9★ rating</strong> on
                    Google (&gt;650 reviews)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Three-Lens Visual Showcase with Top Comparison Text Box */}
          <div className="lg:col-span-5 xl:col-span-5 relative w-full flex flex-col items-center lg:items-end justify-start pt-2">
            {/* Elegant Lens Comparison Text Box — Generously spaced above the cards so enlargement never collides */}
            <div className="w-full max-w-[250px] sm:max-w-[260px] mb-12 sm:mb-16 lg:mb-20 animate-fade-up delay-450 fill-both z-20">
              <div className="glass-card-bright border border-primary/25 bg-[#0d0f15]/95 backdrop-blur-xl rounded-2xl p-2.5 sm:p-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 border border-primary/25 shadow-[0_0_10px_rgba(197,160,89,0.25)]">
                    <Icon name="SparklesIcon" size={13} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-primary uppercase tracking-[0.16em] leading-none mb-0.5">
                      Compare All 3
                    </p>
                    <p className="font-display text-xs sm:text-xs font-semibold text-foreground leading-tight">
                      Find Your Perfect Lens
                    </p>
                  </div>
                </div>
                <div className="mt-1.5 pt-1 border-t border-white/[0.06] flex justify-center">
                  <a
                    href="#lenses"
                    onClick={() =>
                      trackEvent({
                        action: 'hero_floating_card_click',
                        category: 'Engagement',
                        label: 'See comparison',
                      })
                    }
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-primary font-bold hover:text-accent hover:gap-2 transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                  >
                    <span>See comparison</span>
                    <Icon name="ArrowRightIcon" size={11} />
                  </a>
                </div>
              </div>
            </div>

            {/* Lens Cards Row */}
            <div className="w-full flex items-end justify-center lg:justify-end gap-2.5 sm:gap-3.5 xl:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 pt-4 pb-2">
              {lenses.map((lens, i) => {
                const isActive = activeLens === lens.name;
                const delayClass =
                  i === 0
                    ? 'animate-fade-up delay-600 fill-both'
                    : i === 1
                      ? 'animate-fade-up delay-750 fill-both'
                      : 'animate-fade-up delay-900 fill-both';
                return (
                  <div
                    key={lens.name}
                    onMouseEnter={() => setActiveLens(lens.name)}
                    onPointerEnter={() => setActiveLens(lens.name)}
                    className={`w-[31%] min-w-[105px] max-w-[125px] sm:w-32 sm:max-w-none lg:w-[124px] xl:w-[148px] 2xl:w-[164px] shrink-0 snap-center sm:snap-align-none ${delayClass}`}
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      aria-label={`Select ${lens.name} lens info`}
                      onMouseEnter={() => setActiveLens(lens.name)}
                      onPointerEnter={() => setActiveLens(lens.name)}
                      onMouseOver={() => setActiveLens(lens.name)}
                      onMouseMove={() => {
                        if (activeLens !== lens.name) setActiveLens(lens.name);
                      }}
                      onFocus={() => setActiveLens(lens.name)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (lens.name.includes('PanOptix')) {
                            trackEvent({
                              action: 'hero_panoptix_card_click',
                              category: 'Navigation',
                              label: 'Hero PanOptix Card to /panoptix-pro',
                            });
                            window.location.href = '/panoptix-pro';
                            return;
                          }
                          if (lens.name.includes('Vivity')) {
                            trackEvent({
                              action: 'hero_vivity_card_click',
                              category: 'Navigation',
                              label: 'Hero Vivity Card to /clareon-vivity',
                            });
                            window.location.href = '/clareon-vivity';
                            return;
                          }
                          if (lens.name.includes('PureSee')) {
                            trackEvent({
                              action: 'hero_puresee_card_click',
                              category: 'Navigation',
                              label: 'Hero PureSee Card to /tecnis-puresee',
                            });
                            window.location.href = '/tecnis-puresee';
                            return;
                          }
                          setActiveLens(lens.name);
                          trackEvent({
                            action: 'hero_lens_card_click',
                            category: 'Engagement',
                            label: lens.name,
                          });
                        }
                      }}
                      onClick={() => {
                        if (lens.name.includes('PanOptix')) {
                          trackEvent({
                            action: 'hero_panoptix_card_click',
                            category: 'Navigation',
                            label: 'Hero PanOptix Card to /panoptix-pro',
                          });
                          router.push('/panoptix-pro');
                          return;
                        }
                        if (lens.name.includes('Vivity')) {
                          trackEvent({
                            action: 'hero_vivity_card_click',
                            category: 'Navigation',
                            label: 'Hero Vivity Card to /clareon-vivity',
                          });
                          router.push('/clareon-vivity');
                          return;
                        }
                        if (lens.name.includes('PureSee')) {
                          trackEvent({
                            action: 'hero_puresee_card_click',
                            category: 'Navigation',
                            label: 'Hero PureSee Card to /tecnis-puresee',
                          });
                          router.push('/tecnis-puresee');
                          return;
                        }
                        setActiveLens(lens.name);
                        trackEvent({
                          action: 'hero_lens_card_click',
                          category: 'Engagement',
                          label: lens.name,
                        });
                      }}
                      className={`relative doppel-shell ${lens.accent} w-full h-[245px] sm:h-[340px] xl:h-[380px] cursor-pointer origin-bottom transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none will-change-transform
                        ${
                          isActive
                            ? 'scale-[1.08] -translate-y-3 z-30 opacity-100'
                            : 'scale-100 translate-y-0 z-10 opacity-75 hover:opacity-100 hover:scale-[1.08] hover:-translate-y-3 hover:z-30'
                        }
                        ${isActive ? lens.glow : lens.inactiveGlow}`}
                    >
                      <div className="w-full h-full flex flex-col bg-background/85 rounded-[calc(2rem-6px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative">
                        {/* Image: Full bleed, edge-to-edge, seamlessly blended */}
                        <div className="relative flex-1 overflow-hidden">
                          <AppImage
                            src={lens.src}
                            alt={lens.alt}
                            fill
                            className="object-cover object-center scale-[1.02]"
                            sizes="(max-width: 640px) 35vw, 176px"
                            priority={true}
                          />

                          {/* Top subtle vignette so pill sits over dark gradient */}
                          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

                          {/* Rich bottom gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />

                          {/* Ambient inner glow — follows active state */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent transition-opacity duration-400 pointer-events-none ${
                              isActive ? 'opacity-100' : 'opacity-0'
                            }`}
                          />

                          {/* Floating Top Tag Badge with ultra-clean compact footprint */}
                          <div className="absolute top-2 sm:top-2.5 inset-x-0 flex justify-center z-20 pointer-events-none px-1">
                            <span
                              className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[7.5px] sm:text-[8.5px] xl:text-[9.5px] font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-md whitespace-nowrap ${
                                isActive
                                  ? 'bg-primary text-[#020304] border border-primary/80 shadow-[0_0_12px_rgba(197,160,89,0.5)]'
                                  : 'bg-black/75 text-white/90 border border-white/20 shadow-md group-hover:bg-primary group-hover:text-[#020304] group-hover:border-primary'
                              }`}
                            >
                              {lens.tag}
                            </span>
                          </div>
                        </div>

                        {/* Bottom info */}
                        <div className="p-2 sm:p-3 xl:p-3.5 bg-gradient-to-t from-black/95 via-black/80 to-black/60 backdrop-blur-sm border-t border-white/[0.05]">
                          <p className="text-[9px] sm:text-xs font-bold text-primary uppercase tracking-widest mb-0.5">
                            {lens.name}
                          </p>
                          <p className="text-white font-medium text-[10px] sm:text-xs xl:text-sm leading-tight">
                            {lens.subtitle}
                          </p>
                          <p className="text-white/75 text-[8px] sm:text-[9px] xl:text-[10px] mt-0.5 sm:mt-1 leading-tight">
                            {renderFootnoteText(lens.detail)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
