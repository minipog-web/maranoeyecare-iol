'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';
import { handleSpotlightMouseMove, renderFootnoteText } from '@/lib/ui';

interface ComparisonMetric {
  title: string;
  vivity: string;
  panoptix: string;
  puresee: string;
}

const comparisonMetrics: ComparisonMetric[] = [
  {
    title: 'Optical Technology',
    vivity: 'X-WAVE™ Non-Diffractive Wavefront Shaping [2]',
    panoptix: 'ENLIGHTEN® Diffractive Trifocal (Concentric Rings) [1]',
    puresee: 'Proprietary Refractive EDOF Surface Zonal Optics [3]',
  },
  {
    title: 'Light Transmission Efficiency',
    vivity: '~100% transmitted light utilization (Zero light splitting) [2]',
    panoptix: '88% transmitted light (12% energy lost to diffractive scatter) [1]',
    puresee: '~100% transmitted light (Zero diffractive light splitting) [3]',
  },
  {
    title: 'Distance Clarity (Driving, Outdoor)',
    vivity: '20/20 Binocular Crisp Distance Vision [2]',
    panoptix: '20/20 Binocular Crisp Distance Vision [1]',
    puresee: '20/20 Binocular Crisp Distance Vision [3]',
  },
  {
    title: 'Intermediate Clarity (Computer, Dashboard, Cooking)',
    vivity: '20/20 – 20/25 Continuous Extended Focus (Arm’s length) [2]',
    panoptix: '20/20 Dedicated Focal Peak at 60 cm [1]',
    puresee: '20/20 – 20/25 Continuous Extended Focus [3]',
  },
  {
    title: 'Near Vision (Smartphones, Menus, Books)',
    vivity: 'Functional Near (~20/32–20/40); readers for small fine print',
    panoptix: 'High Spectacle Independence (~20/20–20/25) at 40 cm [1]',
    puresee: 'Functional Near (~20/32–20/40); readers for small fine print',
  },
  {
    title: 'Night Glare & Halos Profile',
    vivity: 'Monofocal-like (<2% severe halos in FDA trials) [2]',
    panoptix: 'Noticeable diffractive rings/halos around headlights [1]',
    puresee: 'Monofocal-like dysphotopsia profile [3]',
  },
  {
    title: 'Contrast Sensitivity in Low Light',
    vivity: 'Statistically comparable to standard monofocal control [2]',
    panoptix: 'Slight reduction due to diffractive energy splitting',
    puresee: 'No clinical FDA contrast sensitivity warning [3]',
  },
  {
    title: 'Neuroadaptation Speed',
    vivity: 'Fast (1–2 weeks); natural single-wavefront focus',
    panoptix: '2–8 weeks as visual cortex adapts to 3 simultaneous images',
    puresee: 'Fast (1–2 weeks); smooth refractive transition',
  },
  {
    title: 'Toric Astigmatism Correction',
    vivity: 'Available (Included with No Extra Charge at Marano Eye Care)',
    panoptix: 'Available (Included with No Extra Charge at Marano Eye Care)',
    puresee: 'Available (Included with No Extra Charge at Marano Eye Care)',
  },
];

const faqs = [
  {
    question: 'How does Clareon Vivity differ from a standard monofocal lens?',
    answer:
      'A standard monofocal lens (the type covered by standard Medicare) provides sharp vision at only one fixed focal distance—typically far distance. With a monofocal lens, you will require glasses for your computer, dashboard, cell phone, and reading. The Clareon Vivity stretches light into an extended continuous corridor, giving you clear distance vision PLUS sharp intermediate vision (screens, dashboards, cooking) and functional near vision without increasing nighttime glare.',
  },
  {
    question: 'Why is Clareon Vivity considered the best lens for night driving?',
    answer:
      'Older multifocal and trifocal lenses use concentric rings (diffractive optics) to create distinct focal points, which inherently cause light scatter, glare, and starburst halos around oncoming headlights. Clareon Vivity utilizes non-diffractive X-WAVE™ technology that does not split light. In FDA clinical trials, the incidence of bothersome glare and halos was statistically identical to a standard monofocal lens.',
  },
  {
    question: 'Will I still need reading glasses with Clareon Vivity?',
    answer:
      'Most Vivity patients enjoy freedom from glasses for distance tasks (driving, golf, watching movies) and intermediate tasks (computer monitors, car dashboards, tablets, grocery shelves, price tags). For small fine print, such as paperback books in dim light or prescription medicine labels, having a pair of lightweight reading glasses is normal and expected. Patients wanting complete near reading independence often consider the Clareon PanOptix Pro instead.',
  },
  {
    question: 'What is the Clareon hydrophobic acrylic biomaterial?',
    answer:
      'The Clareon platform is Alcon’s most advanced IOL biomaterial. It is made from ultra-pure hydrophobic acrylic with exceptional optical clarity. Long-term laboratory and clinical studies show 0.0 glistenings (micro-vacuoles that can cloud older lenses over decades) and features STABLEFORCE® haptics for unmatched centration and long-term rotational stability in the capsular bag.',
  },
  {
    question: 'What if I have astigmatism? Does Clareon Vivity Toric cost more?',
    answer:
      'If you have corneal astigmatism, Dr. Marano will implant the Clareon Vivity Toric IOL and precisely align the astigmatic axis using the LENSAR ALLY 3D Femtosecond Laser. At Marano Eye Care, custom Toric astigmatism correction is included on all premium lenses at no additional fee beyond the standard premium lens investment.',
  },
  {
    question: 'How long does the procedure take, and what is recovery like?',
    answer:
      'Laser cataract surgery with the Clareon Vivity takes approximately 10 minutes per eye at our accredited outpatient surgical center. Dr. Marano uses 100% topical numbing eye drops—no needles, no retrobulbar injections, and no general anesthesia. Most patients return to light driving, reading, and screen use within 24 to 48 hours.',
  },
];

export default function VivityPageClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedDistanceTab, setSelectedDistanceTab] = useState<
    'distance' | 'intermediate' | 'near'
  >('intermediate');

  const handleNavClick = (section: string) => {
    trackEvent({
      action: 'vivity_page_nav_click',
      category: 'Engagement',
      label: section,
    });
  };

  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-16">
      {/* ── Top Breadcrumb & Back Navigation ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-6 sm:mb-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
        >
          <Link
            href="/"
            className="hover:text-primary transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <Icon name="ArrowLeftIcon" size={14} />
            <span>All Premium Lens Options</span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-primary font-medium">Clareon® Vivity® Clinical Guide</span>
        </nav>
      </div>

      {/* ── HERO SECTION: Clinical Authority & Core Value Proposition ── */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-[#0c0e14]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(197,160,89,0.12)_0%,transparent_75%)] pointer-events-none" />
        <div className="absolute inset-0 grid-lines-bg opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Left Column: Clinical Positioning */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Alcon X-WAVE™ Wavefront Shaping · FDA Approved
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.12] mb-6">
                Clareon<sup>®</sup> Vivity<sup>®</sup> IOL:{' '}
                <span className="font-semibold text-gradient-primary block mt-1">
                  Continuous Vision with Monofocal-Like Night Clarity.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Engineered for active lifestyles and night drivers. The Clareon Vivity is the
                world’s leading non-diffractive extended depth of focus (EDOF) lens, delivering
                seamless focus from crisp distance to computer screens without diffractive glare
                rings.
              </p>

              {/* 4 Clinical Benefit Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5 w-full mb-8 max-w-xl">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="ShieldCheckIcon" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Monofocal Glare Profile
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      {renderFootnoteText('<2% severe halos in FDA PMA trials [2]')}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="ComputerDesktopIcon" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      20/20 Intermediate Acuity
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      Dashboard, laptops &amp; tablets
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="SparklesIcon" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Toric Astigmatism Included
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      No additional upgrade fee at MEC
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="ClockIcon" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      10-Minute Procedure
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      Zero needles, topical drops only
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a
                  href="#consultation"
                  onClick={() => handleNavClick('hero_book_cta')}
                  className="btn-premium-primary btn-shimmer px-8 py-4 text-sm font-bold uppercase tracking-wider text-center shadow-[0_4px_24px_rgba(197,160,89,0.3)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  Schedule Vivity Consultation
                </a>
                <a
                  href="#comparison"
                  onClick={() => handleNavClick('hero_compare_jump')}
                  className="px-6 py-4 rounded-xl border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-primary/40 text-sm font-bold uppercase tracking-wider transition-all duration-300 text-center flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>Compare with PanOptix &amp; PureSee</span>
                  <Icon name="ArrowDownIcon" size={14} />
                </a>
              </div>
            </div>

            {/* Right Column: High-Res Lens Physical Model Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-[36px] bg-gradient-to-b from-white/[0.06] to-transparent p-1 border border-white/10 shadow-2xl overflow-hidden group">
                <div className="w-full h-full rounded-[34px] bg-[#07080b] relative overflow-hidden flex items-center justify-center p-6">
                  {/* Subtle Optic Radial Aura */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.22)_0%,transparent_65%)] pointer-events-none animate-pulse duration-1000" />

                  <AppImage
                    src="/assets/images/vivity_iol_real.jpg"
                    alt="Clareon Vivity IOL with X-WAVE optical plateau and STABLEFORCE haptics"
                    width={400}
                    height={400}
                    priority={true}
                    className="object-contain relative z-10 scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Optical Feature Pill Callouts */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/80 border border-primary/40 backdrop-blur-md text-[10px] font-bold text-primary tracking-wider uppercase">
                    Non-Diffractive Plateau
                  </div>
                  <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-[10px] font-semibold text-white/90 tracking-wider uppercase">
                    STABLEFORCE® Haptics
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: THE OPTICAL PHYSICS OF X-WAVE™ WAVEFRONT SHAPING ── */}
      <section
        id="physics"
        className="py-16 sm:py-24 relative overflow-hidden bg-[#06070a] scroll-mt-20"
      >
        <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/4 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Optical Physics &amp; Bio-Engineering
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              How X-WAVE™ Eliminates Diffractive Glare Rings.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Traditional multifocal lenses split incoming light into multiple distinct focal points
              using sharp microscopic concentric rings. This light-splitting creates visual
              disturbances like halos and starbursts around light sources. Vivity replaces rings
              with a continuous wavefront transition{' '}
              <sup className="text-[10px] font-bold text-primary inline-block ml-0.5">
                <a href="#footnote-2" className="text-primary hover:underline font-bold">
                  [2]
                </a>
              </sup>
              .
            </p>
          </div>

          {/* 3 Physics Pillars Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* Pillar 1 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                <Icon name="EyeIcon" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                1. Elevation Transition Element
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {renderFootnoteText(
                  'A sub-micron 1-micrometer smooth plateau on the anterior surface stretches the wavefront, creating an uninterrupted channel of light rather than dividing it into separate focal spikes [2].'
                )}
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-semibold text-primary uppercase tracking-wider">
                Continuous Light Channel
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                <Icon name="BoltIcon" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                2. Curvature Transition Element
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {renderFootnoteText(
                  'A second surface curvature shift advances the wavefront forward to extend depth of focus into the intermediate (66 cm) computer and dashboard range without sacrificing distant acuity [2].'
                )}
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-semibold text-primary uppercase tracking-wider">
                100% Light Energy Utilized
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                <Icon name="SparklesIcon" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                3. Clareon® Ultra-Pure Acrylic
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {renderFootnoteText(
                  'Manufactured from Alcon’s purest hydrophobic acrylic polymer. Tested to yield 0.0 glistening grade for guaranteed optical clarity over decades [2].'
                )}
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-semibold text-primary uppercase tracking-wider">
                Zero Glistening Grade
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: DEFOCUS CURVE & VISUAL ACUITY RANGE ── */}
      <section
        id="outcomes"
        className="py-16 sm:py-24 relative overflow-hidden bg-[#090a0d] scroll-mt-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(197,160,89,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Defocus Curve &amp; Daily Vision
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              Your Everyday Range of Vision with Vivity.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              The clinical defocus curve shows how clearly you see across various distances. Explore
              how Clareon Vivity performs across your active day.
            </p>
          </div>

          {/* Interactive Distance Simulator Tabs */}
          <div className="max-w-4xl mx-auto glass-card border border-white/10 rounded-3xl p-6 sm:p-10 bg-black/40 shadow-2xl">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <button
                onClick={() => setSelectedDistanceTab('distance')}
                className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                  selectedDistanceTab === 'distance'
                    ? 'bg-primary text-[#050608] shadow-[0_2px_12px_rgba(197,160,89,0.4)]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Distance (6m+)
              </button>
              <button
                onClick={() => setSelectedDistanceTab('intermediate')}
                className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                  selectedDistanceTab === 'intermediate'
                    ? 'bg-primary text-[#050608] shadow-[0_2px_12px_rgba(197,160,89,0.4)]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Intermediate (66cm)
              </button>
              <button
                onClick={() => setSelectedDistanceTab('near')}
                className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                  selectedDistanceTab === 'near'
                    ? 'bg-primary text-[#050608] shadow-[0_2px_12px_rgba(197,160,89,0.4)]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Near (40cm)
              </button>
            </div>

            {/* Active Distance Detail */}
            {selectedDistanceTab === 'distance' && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                    Visual Acuity: 20/20 Crisp
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                    Distance Vision: Driving, Golf &amp; Outdoors
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                    {renderFootnoteText(
                      'In FDA trials, binocular uncorrected distance visual acuity with Clareon Vivity matched standard monofocal lenses (20/20 or better) [2]. Road signs, street navigation, movies, and golf ball trajectory remain crisp and sharp.'
                    )}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-emerald-400" />
                      <span>Clear highway road signs, traffic, and open-road driving</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-emerald-400" />
                      <span>Sports, tennis, golf ball tracking, and outdoor panoramas</span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <AppImage
                    src="/assets/images/day_driving_pro.jpg"
                    alt="Clareon Vivity daytime clear distance highway driving simulation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-primary border border-white/10">
                    Daytime Distance Simulation: 20/20 Clarity
                  </div>
                </div>
              </div>
            )}

            {selectedDistanceTab === 'intermediate' && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    Visual Acuity: 20/20 to 20/25
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                    Intermediate: Computers, Dashboards &amp; Cooking
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                    {renderFootnoteText(
                      'This is Vivity’s greatest everyday strength. While monofocal patients must reach for glasses to see their car speedometer, laptop, or grocery prices, Vivity maintains continuous focus across the entire arm’s-length corridor [2].'
                    )}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-primary" />
                      <span>Full workday on computer monitors and laptops without eye strain</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-primary" />
                      <span>GPS navigation, car speedometer, grocery shopping &amp; food prep</span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <AppImage
                    src="/assets/images/sharp_day_intermediate_pro.jpg"
                    alt="Clareon Vivity daytime intermediate workspace and dashboard simulation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-primary border border-white/10">
                    Daytime Intermediate Simulation: Screens &amp; Dashboard
                  </div>
                </div>
              </div>
            )}

            {selectedDistanceTab === 'near' && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
                    Visual Acuity: ~20/32 to 20/40 (Functional Near)
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                    Near Vision: Smartphones, Menus &amp; Daily Tasks
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                    Vivity provides excellent functional near vision for quick glances at your
                    phone, checking texts, reading menus, and signing receipts. For prolonged
                    reading of small book font in dim light, lightweight readers remain a helpful
                    companion.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-primary" />
                      <span>Casual smartphone use, texting, and smartwatches without glasses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon
                        name="InformationCircleIcon"
                        size={16}
                        className="text-muted-foreground"
                      />
                      <span>
                        Optional +1.25 to +1.50D readers for fine medicine print or paperback books
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <AppImage
                    src="/assets/images/vivity_day_near_pro.png"
                    alt="Clareon Vivity daytime near reading smartphone and menu clarity"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-primary border border-white/10">
                    Daytime Near Simulation: Smartphone &amp; Menus
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: 3-WAY HEAD-TO-HEAD COMPARISON (VIVITY vs PANOPTIX vs PURESEE) ── */}
      <section
        id="comparison"
        className="py-16 sm:py-24 relative overflow-hidden bg-[#0c0e14] scroll-mt-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(197,160,89,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Head-to-Head Comparison
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              Clareon Vivity vs. PanOptix Pro vs. TECNIS PureSee.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Every eye is unique. Dr. Matthew Marano Jr. offers all three premier FDA-approved
              advanced optics so you receive the exact lens engineered for your visual priorities.
            </p>
          </div>

          {/* 3 Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* Vivity Card */}
            <div className="glass-card border-2 border-primary/50 bg-primary/[0.03] rounded-3xl p-6 sm:p-8 flex flex-col relative shadow-[0_0_40px_rgba(197,160,89,0.15)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-[#060709] text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                Non-Diffractive Leader
              </div>
              <h3 className="text-xl font-bold text-primary mt-2 mb-1">Clareon® Vivity®</h3>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                Extended Depth of Focus (EDOF)
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Best for active drivers, computer professionals, and patients sensitive to glare.
                Stretches light smoothly without diffractive rings.
              </p>
              <div className="space-y-2 pt-4 border-t border-border/80 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Night Glare Profile:</span>
                  <span className="font-bold text-emerald-400">
                    {renderFootnoteText('Monofocal-like (<2%) [2]')}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Intermediate Focus:</span>
                  <span className="font-bold text-primary">20/20 to 20/25</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Fine Print Readers:</span>
                  <span className="font-medium text-white/80">Occasional fine print</span>
                </div>
              </div>
            </div>

            {/* PanOptix Card */}
            <div className="glass-card border border-[#8b5cf6]/30 bg-[#8b5cf6]/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8b5cf6] text-white text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                Full Trifocal Range
              </div>
              <h3 className="text-xl font-bold text-[#a78bfa] mt-2 mb-1">PanOptix® Pro</h3>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                Trifocal Diffractive IOL
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Best for patients who want maximum near reading independence for books and fine
                print, and are comfortable with minor night halos.
              </p>
              <div className="space-y-2 pt-4 border-t border-border/80 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Night Glare Profile:</span>
                  <span className="font-bold text-amber-400">Noticeable concentric rings</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Near Reading Focus:</span>
                  <span className="font-bold text-[#a78bfa]">20/20 at 40 cm</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Spectacle Freedom:</span>
                  <span className="font-bold text-emerald-400">
                    {renderFootnoteText('99% freedom reported [1]')}
                  </span>
                </div>
              </div>
            </div>

            {/* PureSee Card */}
            <div className="glass-card border border-[#00a3ff]/30 bg-[#00a3ff]/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00a3ff] text-white text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                Pure Refractive EDOF
              </div>
              <h3 className="text-xl font-bold text-[#38bdf8] mt-2 mb-1">TECNIS PureSee™</h3>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                Refractive Extended Depth
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Best for patients seeking J&amp;J’s latest purely refractive EDOF optic with zero
                FDA contrast sensitivity warning and high optical clarity.
              </p>
              <div className="space-y-2 pt-4 border-t border-border/80 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Night Glare Profile:</span>
                  <span className="font-bold text-emerald-400">Monofocal-like</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Contrast Sensitivity:</span>
                  <span className="font-bold text-[#38bdf8]">
                    {renderFootnoteText('Zero FDA warning [3]')}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Fine Print Readers:</span>
                  <span className="font-medium text-white/80">Occasional fine print</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Side-by-Side Specifications Matrix Table */}
          <div className="w-full overflow-x-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-muted-foreground w-1/4">
                    Comparison Parameter
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-primary w-1/4 bg-primary/[0.05] border-x border-primary/20">
                    Clareon® Vivity®
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#a78bfa] w-1/4">
                    PanOptix® Pro
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#38bdf8] w-1/4">
                    TECNIS PureSee™
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                {comparisonMetrics.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white/90">
                      {renderFootnoteText(row.title)}
                    </td>
                    <td className="p-4 sm:p-5 text-primary font-medium bg-primary/[0.03] border-x border-primary/10">
                      {renderFootnoteText(row.vivity)}
                    </td>
                    <td className="p-4 sm:p-5 text-muted-foreground">
                      {renderFootnoteText(row.panoptix)}
                    </td>
                    <td className="p-4 sm:p-5 text-muted-foreground">
                      {renderFootnoteText(row.puresee)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: CANDIDATE PROFILES & LIFESTYLE SUITABILITY ── */}
      <section id="candidates" className="py-16 sm:py-24 relative overflow-hidden bg-[#08090d]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Patient Matching
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              Is Clareon Vivity the Right Choice for You?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Dr. Matthew Marano Jr. evaluates each patient’s corneal topography, lifestyle habits,
              and visual expectations before recommending an intraocular lens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Left: When Vivity is Ideal */}
            <div className="glass-card border border-emerald-500/30 bg-emerald-500/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Icon name="CheckCircleIcon" size={22} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    You Are an Ideal Vivity Candidate If:
                  </h3>
                  <p className="text-xs text-muted-foreground">High satisfaction match profile</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground flex-1">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Frequent Night Driver:</strong> You regularly
                    drive on highways like Route 24, I-80, or the Parkway and cannot tolerate
                    distracting glare rings.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Computer &amp; Office Professional:</strong> You
                    spend hours on laptops, desktop screens, Zoom calls, and tablets.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Active Outdoor Lifestyle:</strong> You play golf,
                    tennis, hike, or travel and value continuous visual freedom.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Mild Corneal or Retinal Nuances:</strong>{' '}
                    Patients with mild dry eye or early maculopathy where diffractive lenses are not
                    recommended often qualify for Vivity.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right: When Another Lens is Better */}
            <div className="glass-card border border-white/10 bg-white/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="InformationCircleIcon" size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    When Dr. Marano Suggests Alternatives:
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Alternative clinical considerations
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground flex-1">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Need 100% Near Independence:</strong>{' '}
                    {renderFootnoteText(
                      'If your highest priority is reading fine novels in bed without ever touching reading glasses, Clareon PanOptix Pro is typically preferred [1].'
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Interested in Refractive EDOF:</strong>{' '}
                    {renderFootnoteText(
                      'Patients wanting Johnson & Johnson’s newest refractive zonal optics can evaluate the TECNIS PureSee [3].'
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Significant Retinal Disease:</strong> Patients
                    with advanced macular degeneration or diabetic retinopathy will be guided toward
                    a standard monofocal lens for maximum safety.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: ASTIGMATISM & TORIC CORRECTION WITH LENSAR ALLY ── */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-[#0c0f16]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                Precision Astigmatism Alignment
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
                Clareon<sup>®</sup> Vivity<sup>®</sup> Toric +{' '}
                <span className="font-semibold text-gradient-primary">
                  LENSAR ALLY<sup>®</sup> Laser.
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {renderFootnoteText(
                  'Over 60% of cataract patients have corneal astigmatism that distorts light rays. Dr. Marano pairs the Clareon Vivity Toric IOL with the LENSAR ALLY Femtosecond Laser system to create sub-micron arcuate incisions and align the lens precisely to your eye’s steep axis [2].'
                )}
              </p>
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center gap-3.5 mb-6">
                <Icon name="SparklesIcon" size={24} className="text-primary shrink-0" />
                <p className="text-sm font-semibold text-white">
                  <strong className="text-primary">Toric Policy:</strong> At Marano Eye Care, custom
                  Toric astigmatism correction is included with all premium lenses at no extra
                  upgrade fee.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">
                  3D
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Sub-Micron Corneal Topography
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Automated Iris Registration tracks cyclotorsion when you lie down for exact
                    degrees of alignment.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">
                  0N
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Zero-Needle Topical Anesthesia
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Gentle numbing eye drops make the 10-minute outpatient procedure completely
                    comfortable without needle injections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FREQUENTLY ASKED QUESTIONS ── */}
      <section
        id="faqs"
        className="py-16 sm:py-24 relative overflow-hidden bg-[#0e1118] scroll-mt-20"
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Clinical Questions Answered
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-4">
              Frequently Asked Questions About Clareon Vivity.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Clear, transparent clinical guidance from Board-Certified Surgeon Dr. Matthew Marano
              Jr., MD.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-semibold text-foreground">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-primary/10 border-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <Icon name="ChevronDownIcon" size={16} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-muted-foreground leading-relaxed border-t border-white/[0.05] pt-4 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: CLINICAL FOOTNOTES & CITATIONS ── */}
      <section
        id="citations"
        className="py-12 border-t border-border/40 bg-black/60 text-muted-foreground text-xs scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 leading-relaxed space-y-4">
          <p className="font-bold uppercase tracking-wider text-xs sm:text-sm text-primary mb-2 select-none">
            Clinical References &amp; Trial Disclosures:
          </p>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
            <div className="space-y-4">
              <p
                id="footnote-1"
                className="scroll-mt-28 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <strong className="text-foreground">
                  [1] Clareon PanOptix Pro Spectacle Independence:
                </strong>{' '}
                Alcon FDA PMA clinical study data and peer-reviewed meta-analysis of 13 studies with
                513 patients demonstrating 99% overall satisfaction (PubMed PMID: 32049015).{' '}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/32049015/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium inline-block mt-1"
                >
                  [View PubMed Meta-Analysis]
                </a>
              </p>
              <p
                id="footnote-2"
                className="scroll-mt-28 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <strong className="text-foreground">
                  [2] Clareon Vivity Non-Diffractive Performance:
                </strong>{' '}
                FDA Premarket Approval Study PMA P190018 / S001. Defocus curve analysis and visual
                disturbance incidence demonstrating non-diffractive halo rates (&lt;2% severe halos)
                statistically comparable to standard monofocal control IOLs.{' '}
                <a
                  href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P190018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium inline-block mt-1"
                >
                  [View FDA PMA Registry]
                </a>
              </p>
            </div>
            <div className="space-y-4">
              <p
                id="footnote-3"
                className="scroll-mt-28 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <strong className="text-foreground">
                  [3] TECNIS PureSee Refractive EDOF Study:
                </strong>{' '}
                Johnson &amp; Johnson MedTech FDA PMA approval documentation (PMA P980040) for
                purely refractive extended depth of focus intraocular lens without clinical contrast
                sensitivity loss warning.{' '}
                <a
                  href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P980040"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium inline-block mt-1"
                >
                  [View FDA PMA Approval]
                </a>
              </p>
              <p
                id="footnote-4"
                className="scroll-mt-28 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <strong className="text-foreground">
                  [4] Clinical IOL Education &amp; Guidelines:
                </strong>{' '}
                American Academy of Ophthalmology (AAO EyeSmart®) clinical reference standards for
                cataract surgery and premium intraocular lenses.{' '}
                <a
                  href="https://www.aao.org/eye-health/diseases/cataracts-iol-implants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium inline-block mt-1"
                >
                  [View AAO IOL Guide]
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
