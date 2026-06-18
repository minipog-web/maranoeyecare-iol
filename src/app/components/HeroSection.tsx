'use client';

import { useState } from 'react';
import styles from './HeroSection.module.css';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';

const lenses = [
  {
    name: 'Clareon Vivity',
    tag: 'Most Popular',
    tagColor: 'bg-primary text-primary-foreground',
    subtitle: 'Non-diffractive EDOF',
    detail: 'Fewest halos of any premium IOL',
    src: '/assets/images/vivity_iol_clean.png',
    alt: 'Clareon Vivity IOL — non-diffractive extended depth of focus intraocular lens',
    accent: 'border-primary/50',
    featured: true,
  },
  {
    name: 'PanOptix Pro',
    tag: 'Trifocal',
    tagColor: 'bg-primary/20 text-primary border border-primary/30',
    subtitle: 'Full trifocal range',
    detail: '99% would choose a premium lens again',
    src: '/assets/images/panoptix_iol_clean.png',
    alt: 'Clareon PanOptix Pro trifocal IOL — trifocal intraocular lens',
    accent: 'border-primary/25',
    featured: false,
  },
  {
    name: 'Eyhance',
    tag: 'Monofocal+',
    tagColor: 'bg-primary/20 text-primary border border-primary/30',
    subtitle: 'Enhanced monofocal',
    detail: 'Crisp distance + intermediate',
    src: '/assets/images/eyhance_iol_clean.png',
    alt: 'TECNIS Eyhance IOL — enhanced monofocal intraocular lens',
    accent: 'border-primary/25',
    featured: false,
  },
];

// Default active lens when nothing is hovered
const DEFAULT_ACTIVE = 'Clareon Vivity';

export default function HeroSection() {
  const [hoveredLens, setHoveredLens] = useState<string | null>(null);

  // The lens that should show the strong glow
  const activeLens = hoveredLens ?? DEFAULT_ACTIVE;

  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20 ${styles.hero}`}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-lines-bg opacity-100" />

      {/* Rich ambient lighting */}
      <div className="absolute inset-0 radial-glow-primary" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-primary/2 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle scan-line effect */}
      <div className={`absolute inset-0 pointer-events-none ${styles.scanLines}`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-8 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 w-full flex flex-col items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary/20 bg-primary/5 mb-5 sm:mb-8 shimmer-border animate-fade-up fill-both">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0 shadow-[0_0_8px_rgba(0,201,177,0.8)]" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-primary">
                Premium IOL Specialists — New Jersey
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-foreground mb-5 sm:mb-6 animate-fade-up delay-150 fill-both">
              Stop Missing Life.{' '}
              <span className="block text-gradient-primary font-semibold mt-1 pb-4">
                Start Seeing It.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-foreground/85 max-w-xl leading-relaxed mb-8 sm:mb-10 animate-fade-up delay-300 fill-both">
              Not all IOLs are equal. Discover how Clareon Vivity, PanOptix Pro, and Eyhance compare
              — and find the premium lens that can eliminate your dependence on glasses for the
              clearest life after cataract surgery.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-12 animate-fade-up delay-450 fill-both">
              <a
                href="#booking"
                onClick={() =>
                  trackEvent({
                    action: 'hero_primary_cta_click',
                    category: 'Engagement',
                    label: 'Book Your Free Consultation',
                  })
                }
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary text-[#020304] rounded-xl text-base font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[56px] shadow-[0_0_28px_rgba(0,201,177,0.25)] btn-shimmer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                Book Your Free Consultation
                <Icon
                  name="ArrowRightIcon"
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
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

            {/* Stats row */}
            <div className="flex flex-wrap gap-5 sm:gap-10 border-t border-border pt-6 sm:pt-8 w-full animate-fade-up delay-600 fill-both">
              {[
                { value: '15×', label: 'Consecutive NJ Top Doctor' },
                { value: '40,000+', label: 'Successful Procedures' },
                { value: '99%', label: '"I\'d Choose A Premium Lens Again"' },
                { value: '4.9 ★', label: 'Google Patient Rating' },
              ]?.map((stat) => (
                <div key={stat?.label} className="flex flex-col gap-1">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-primary">
                    {stat?.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {stat?.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Three-Lens Visual Showcase */}
          <div className="relative flex-1 w-full flex items-end justify-center lg:justify-end gap-2 sm:gap-3 md:gap-4 py-6 lg:py-0 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
            {lenses?.map((lens, i) => {
              const isActive = activeLens === lens.name;
              const delayClass =
                i === 0
                  ? 'animate-fade-up delay-600 fill-both'
                  : i === 1
                    ? 'animate-fade-up delay-750 fill-both'
                    : 'animate-fade-up delay-900 fill-both';
              return (
                <div
                  key={lens?.name}
                  onMouseEnter={() => setHoveredLens(lens.name)}
                  onMouseLeave={() => setHoveredLens(null)}
                  onClick={() =>
                    trackEvent({
                      action: 'hero_lens_card_click',
                      category: 'Engagement',
                      label: lens.name,
                    })
                  }
                  className={`relative doppel-shell ${lens?.accent} transition-spring hover:-translate-y-3 group cursor-pointer ${styles.lensCard} ${delayClass}
                      ${
                        lens?.featured
                          ? 'w-[42%] min-w-[130px] sm:w-44 h-[260px] sm:h-[420px] z-20 -mt-8 snap-center sm:snap-align-none shrink-0'
                          : 'w-[27%] min-w-[100px] sm:w-36 h-[210px] sm:h-[360px] z-10 snap-center sm:snap-align-none shrink-0'
                      }
                      ${
                        isActive
                          ? 'shadow-[0_0_60px_rgba(0,201,177,0.3),0_0_0_1px_rgba(0,201,177,0.2)] border-primary/45 bg-white/[0.05]'
                          : 'shadow-[0_0_20px_rgba(0,201,177,0.05)] border-white/[0.08]'
                      }`}
                >
                  <div className="w-full h-full flex flex-col bg-background/85 rounded-[calc(2rem-6px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative">
                    {/* Image */}
                    <div className="relative flex-1 overflow-hidden">
                      <AppImage
                        src={lens?.src}
                        alt={lens?.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2"
                        sizes="(max-width: 640px) 38vw, 176px"
                        priority={true}
                      />

                      {/* Rich gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                      {/* Ambient inner glow — follows active state */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent transition-opacity duration-500 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />

                      {/* Tag badge */}
                      <div
                        className={`absolute top-2 left-2 sm:top-3 sm:left-3 px-2.5 py-1 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider ${lens?.tagColor} shadow-lg backdrop-blur-sm`}
                      >
                        {lens?.tag}
                      </div>
                    </div>

                    {/* Bottom info */}
                    <div className="p-2.5 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-black/60 backdrop-blur-sm border-t border-white/[0.05]">
                      <p className="text-[9px] sm:text-xs font-bold text-primary uppercase tracking-widest mb-0.5">
                        {lens?.name}
                      </p>
                      <p className="text-white font-medium text-[10px] sm:text-sm leading-tight">
                        {lens?.subtitle}
                      </p>
                      <p className="text-white/50 text-[8px] sm:text-[10px] mt-0.5 sm:mt-1 leading-tight">
                        {lens?.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Floating lens detail card — desktop only */}
            <div className="hidden lg:block absolute bottom-[400px] right-4 lg:right-8 w-44 glass-card-bright rounded-2xl p-4 shadow-2xl z-30 animate-float-delayed">
              <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center mb-3 shadow-[0_0_12px_rgba(0,201,177,0.3)]">
                <Icon name="SparklesIcon" size={18} className="text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">
                Compare All 3
              </p>
              <p className="font-display text-sm font-medium text-foreground leading-tight">
                Find Your Perfect Lens
              </p>
              <a
                href="#lenses"
                onClick={() =>
                  trackEvent({
                    action: 'hero_floating_card_click',
                    category: 'Engagement',
                    label: 'See comparison',
                  })
                }
                className="mt-3 flex items-center gap-1.5 text-xs text-primary font-semibold hover:gap-2.5 transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                See comparison <Icon name="ArrowRightIcon" size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
