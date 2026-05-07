import React from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const lenses = [
{
  name: 'Clareon Vivity',
  tag: 'Most Popular',
  tagColor: 'bg-primary text-primary-foreground',
  subtitle: 'Non-diffractive EDOF',
  detail: 'Fewest halos of any premium IOL',
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_168bf1ace-1777413456273.png",
  alt: 'Clareon Vivity IOL — official Alcon product image of the non-diffractive extended depth of focus intraocular lens with X-WAVE technology',
  accent: 'border-primary/60',
  glow: 'shadow-[0_0_40px_rgba(99,102,241,0.35)]',
  featured: true,
  imgBg: 'transparent'
},
{
  name: 'PanOptix Pro',
  tag: 'Trifocal',
  tagColor: 'bg-accent/90 text-white',
  subtitle: 'Full trifocal range',
  detail: '99% would choose again',
  src: "/assets/images/PanOptix_Pro-1778167089816.jpg",
  alt: 'Clareon PanOptix Pro trifocal IOL — official Alcon product image of the trifocal intraocular lens with ENLIGHTEN NXT optical technology',
  accent: 'border-accent/50',
  glow: 'shadow-[0_0_30px_rgba(139,92,246,0.25)]',
  featured: false,
  imgBg: 'rgba(10,10,20,0.85)'
},
{
  name: 'Eyhance',
  tag: 'Monofocal+',
  tagColor: 'bg-emerald-500/90 text-white',
  subtitle: 'Enhanced monofocal',
  detail: 'Crisp distance + intermediate',
  src: "/assets/images/Eyhance_IOL.png",
  alt: 'TECNIS Eyhance IOL — official Johnson & Johnson product image of the enhanced monofocal intraocular lens with increased depth of focus',
  accent: 'border-emerald-500/40',
  glow: 'shadow-[0_0_30px_rgba(16,185,129,0.2)]',
  featured: false,
  imgBg: 'transparent'
}];


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 grid-lines-bg opacity-100" />
      <div className="absolute inset-0 radial-glow-primary" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-8 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* Left Content */}
          <div className="flex-1 w-full flex flex-col items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-5 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-primary">
                Premium IOL Specialists — New Jersey
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight text-foreground mb-4 sm:mb-6">
              See Everything.{' '}
              <span className="block text-gradient-primary font-medium">
                Without Glasses.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-7 sm:mb-10">
              Not all IOLs are equal. Discover how Clareon Vivity, PanOptix Pro, and Eyhance compare — and find the lens that gives you the clearest life after cataract surgery.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-12">
              <a
                href="#booking"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-primary text-primary-foreground rounded-full text-base font-bold flex items-center justify-center gap-3 group hover:bg-accent transition-all hover:scale-105 active:scale-95 animate-glow-pulse min-h-[52px] touch-manipulation">
                Book a Free Consultation
                <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
              <a
                href="tel:9733220100"
                className="w-full sm:w-auto px-6 sm:px-8 py-4 border border-border text-foreground rounded-full text-base font-medium flex items-center justify-center gap-3 hover:border-primary/50 hover:bg-white/5 transition-all min-h-[52px] touch-manipulation">
                <Icon name="PhoneIcon" size={18} className="text-primary shrink-0" />
                <span className="text-sm sm:text-base">Call: 973-322-0100</span>
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-5 sm:gap-8 border-t border-border pt-6 sm:pt-8 w-full">
              {[
              { value: '15×', label: 'NJ Top Doctor Award' },
              { value: '94%', label: 'Vivity distance satisfaction' },
              { value: '99%', label: 'PanOptix would choose again' }]?.
              map((stat) =>
              <div key={stat?.label} className="flex flex-col gap-1">
                  <span className="font-display text-2xl sm:text-3xl font-medium text-primary">{stat?.value}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">{stat?.label}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Three-Lens Visual Showcase */}
          <div className="relative flex-1 w-full flex items-end justify-center lg:justify-end gap-2 sm:gap-4 py-6 lg:py-0">
            {lenses?.map((lens, i) =>
            <div
              key={lens?.name}
              className={`relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden border bg-[rgba(10,10,20,0.7)] ${lens?.accent} ${lens?.glow} transition-transform duration-500 hover:-translate-y-2 group cursor-pointer
                  ${lens?.featured ?
              'w-[38%] sm:w-44 h-[300px] sm:h-[420px] z-20 -mt-8' :
              'w-[28%] sm:w-36 h-[240px] sm:h-[360px] z-10'}`
              }>

                {/* Image */}
                <div className={`relative flex-1 overflow-hidden${lens?.imgBg && lens?.imgBg !== 'transparent' ? ' lens-img-bg' : ''}`}>
                  <AppImage
                  src={lens?.src}
                  alt={lens?.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-90"
                  sizes="(max-width: 640px) 38vw, 176px"
                  priority={i === 0} />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Tag badge */}
                  <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider ${lens?.tagColor} shadow-lg`}>
                    {lens?.tag}
                  </div>
                </div>

                {/* Bottom info */}
                <div className="p-2 sm:p-4 bg-gradient-to-t from-black/95 to-black/70 backdrop-blur-sm">
                  <p className="text-[9px] sm:text-xs font-bold text-primary uppercase tracking-widest mb-0.5">{lens?.name}</p>
                  <p className="text-white font-medium text-[10px] sm:text-sm leading-tight">{lens?.subtitle}</p>
                  <p className="text-white/50 text-[8px] sm:text-[10px] mt-0.5 sm:mt-1 leading-tight hidden sm:block">{lens?.detail}</p>
                </div>

                {/* Glow ring on hover */}
                <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl border-2 ${lens?.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              </div>
            )}

            {/* Floating lens detail card — hidden on mobile */}
            <div className="hidden lg:block absolute -top-52 right-4 lg:right-8 w-44 bg-card/90 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 shadow-2xl z-30 animate-float-delayed">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Icon name="SparklesIcon" size={18} className="text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Compare All 3</p>
              <p className="font-display text-sm font-medium text-foreground leading-tight">Find Your Perfect Lens</p>
              <a
                href="#lenses"
                className="mt-3 flex items-center gap-1.5 text-xs text-primary font-semibold hover:gap-2.5 transition-all touch-manipulation">
                See comparison <Icon name="ArrowRightIcon" size={12} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );

}