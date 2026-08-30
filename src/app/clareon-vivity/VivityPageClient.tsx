'use client';

import React, { useState, useEffect } from 'react';
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
    vivity:
      '~100% transmitted light utilization (Non-diffractive wavefront shaping, zero light splitting) [2]',
    panoptix:
      '88% light transmitted to retina (Highest efficiency among diffractive trifocals; 12% diffractive loss) [1]',
    puresee: '~100% transmitted light (Pure refractive focus, zero diffractive loss) [3]',
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
    question: 'Will I need reading glasses after getting the Clareon Vivity IOL?',
    answer:
      'Most Clareon Vivity patients achieve complete independence from glasses for driving, outdoor activities, computer work, cooking, and everyday tasks. Because Vivity prioritizes exceptional night vision without glare rings, fine near vision (such as reading small pill bottle labels or fine paperback novel print in dim light) may occasionally require a pair of lightweight +1.25 to +1.50D readers.',
  },
  {
    question: 'How does Vivity compare to the PanOptix Pro trifocal lens?',
    answer:
      'PanOptix Pro is a diffractive trifocal lens with three distinct focal points, offering higher complete spectacle freedom for very close reading, but with a slight possibility of mild nighttime halos around headlights. Vivity uses non-diffractive wavefront shaping, giving you seamless distance and intermediate vision with virtually zero night glare or halos, matching the safety profile of a standard single-focus lens.',
  },
  {
    question: 'Can Vivity correct my astigmatism?',
    answer:
      'Yes. The Clareon Vivity Toric II IOL corrects corneal astigmatism with exact rotational stability. At Marano Eye Care, our surgeons pair the Vivity Toric II with high-resolution 3D LENSAR ALLY laser mapping to align your lens with precise degree accuracy.',
  },
  {
    question: 'Is Clareon Vivity covered by Medicare or private medical insurance?',
    answer:
      'Medicare and commercial insurance plans cover the basic cataract surgery, surgeon fees, and anesthesia costs. The advanced optical design of the Clareon Vivity lens and custom laser imaging involve an out-of-pocket upgrade fee. Our surgical coordinators provide transparent, all-inclusive pricing with zero hidden facility costs during your consultation.',
  },
  {
    question: 'How long does the recovery take after Clareon Vivity surgery?',
    answer:
      'Laser cataract surgery with the Clareon Vivity takes approximately 10 minutes per eye at our accredited outpatient surgical center. Our surgeons use 100% topical numbing eye drops—no needles, no retrobulbar injections, and no general anesthesia. Most patients return to light driving, reading, and screen use within 24 to 48 hours.',
  },
];

export default function VivityPageClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedDistanceTab, setSelectedDistanceTab] = useState<
    'distance' | 'intermediate' | 'near'
  >('intermediate');

  useEffect(() => {
    trackEvent({
      action: 'lens_guide_view',
      category: 'Lens Guide',
      label: 'clareon_vivity',
    });
  }, []);

  const handleNavClick = (section: string) => {
    trackEvent({
      action: 'vivity_page_nav_click',
      category: 'Engagement',
      label: section,
    });
  };

  const handleSimulatorTabClick = (tab: 'distance' | 'intermediate' | 'near') => {
    setSelectedDistanceTab(tab);
    trackEvent({
      action: 'vivity_simulator_tab',
      category: 'Engagement',
      label: tab,
    });
  };

  const handleFaqClick = (index: number, question: string) => {
    const isOpening = activeFaq !== index;
    setActiveFaq(isOpening ? index : null);
    if (isOpening) {
      trackEvent({
        action: 'vivity_faq_expand',
        category: 'Engagement',
        label: question.slice(0, 60),
      });
    }
  };

  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-20">
      {/* ── Top Breadcrumb & Back Navigation ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
        >
          <Link
            href="/"
            className="hover:text-primary transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary rounded-full px-3 py-1 bg-white/[0.03] border border-white/10"
          >
            <Icon name="ArrowLeftIcon" size={13} />
            <span>All Premium Lens Options</span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-primary font-medium tracking-wide">
            Clareon® Vivity® Clinical Guide
          </span>
        </nav>
      </div>

      {/* ── HERO SECTION: Clinical Authority & Doppelrand Physical Showcase ── */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-[#080a0e]">
        {/* Signature Vivity Wavefront Emerald & Gold Ambient Aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-emerald-500/[0.07] via-primary/[0.09] to-transparent rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute inset-0 grid-lines-bg opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-16 items-center">
            {/* Left Column: Clinical Positioning */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.25em] mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Alcon X-WAVE™ Wavefront Shaping · FDA Approved
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.12] mb-6 tracking-tight">
                Clareon<sup>®</sup> Vivity<sup>®</sup> IOL:{' '}
                <span className="font-semibold text-gradient-primary block mt-1">
                  Continuous Vision with Monofocal-Like Night Clarity.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl font-light">
                Engineered for active lifestyles and night drivers. The Clareon Vivity is the
                world’s leading non-diffractive extended depth of focus (EDOF) lens, delivering
                seamless focus from crisp distance to computer screens without diffractive glare
                rings.
              </p>

              {/* 4 Clinical Benefit Badges (Double-Bezel Micro-Architecture) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-10 max-w-xl">
                <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm">
                  <div className="p-3 rounded-[calc(1rem-2px)] bg-black/40 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                      <Icon name="ShieldCheckIcon" size={16} />
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
                </div>

                <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm">
                  <div className="p-3 rounded-[calc(1rem-2px)] bg-black/40 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                      <Icon name="ComputerDesktopIcon" size={16} />
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
                </div>

                <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm">
                  <div className="p-3 rounded-[calc(1rem-2px)] bg-black/40 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                      <Icon name="SparklesIcon" size={16} />
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
                </div>

                <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm">
                  <div className="p-3 rounded-[calc(1rem-2px)] bg-black/40 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                      <Icon name="ClockIcon" size={16} />
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
              </div>

              {/* Action Buttons (Button-in-Button Island Architecture) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a
                  href="#consultation"
                  onClick={() => handleNavClick('hero_book_cta')}
                  className="group relative inline-flex items-center justify-between sm:justify-center rounded-full bg-gradient-to-r from-[#fff3d6] via-[#f7d492] to-[#d1ab60] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_4px_24px_rgba(197,160,89,0.35)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(197,160,89,0.5)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>Schedule Vivity Consultation</span>
                  <div className="ml-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <Icon name="ArrowRightIcon" size={12} className="text-black" />
                  </div>
                </a>
                <a
                  href="#comparison"
                  onClick={() => handleNavClick('hero_compare_jump')}
                  className="group inline-flex items-center justify-between sm:justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/[0.08] hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>Compare with PanOptix &amp; PureSee</span>
                  <div className="ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-1">
                    <Icon name="ArrowDownIcon" size={12} />
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Double-Bezel Hardware Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[390px] sm:max-w-[440px] aspect-square rounded-[40px] bg-white/[0.03] p-2.5 ring-1 ring-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] overflow-hidden group">
                <div className="w-full h-full rounded-[calc(40px-10px)] bg-[#07080b] border border-white/[0.08] relative overflow-hidden flex items-center justify-center">
                  <AppImage
                    src="/assets/images/vivity_iol_real.jpg"
                    alt="Clareon Vivity IOL with X-WAVE optical plateau and STABLEFORCE haptics"
                    fill
                    priority={true}
                    sizes="(max-width: 640px) 90vw, 440px"
                    className="object-cover relative z-10 scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />

                  {/* Optical Feature Floating Glass Pills */}
                  <div className="absolute top-5 left-5 z-20 px-3.5 py-1.5 rounded-full bg-black/80 border border-emerald-500/40 backdrop-blur-xl text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase shadow-lg">
                    Non-Diffractive Plateau
                  </div>
                  <div className="absolute bottom-5 right-5 z-20 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-xl text-[10px] font-mono font-medium text-white/90 tracking-widest uppercase shadow-lg">
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
        className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#06070a] scroll-mt-20"
      >
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-emerald-500/[0.04] to-primary/[0.06] rounded-full blur-[170px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Optical Physics &amp; Bio-Engineering
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              How X-WAVE™ Eliminates Diffractive Glare Rings.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
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

          {/* 3 Physics Pillars Grid (Doppelrand Nested Architecture) */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* Pillar 1 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/[0.08] shadow-lg group hover:border-emerald-500/30 transition-all duration-500"
            >
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0c0e14] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                  <Icon name="EyeIcon" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    1. Wavefront Plateau (No Rings)
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {renderFootnoteText(
                      'A microscopic 1-micrometer smooth plateau on the center of the lens gently stretches light. This creates a continuous channel of clear vision without splitting light into glare-inducing rings [2].'
                    )}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Continuous Light Channel
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/[0.08] shadow-lg group hover:border-primary/30 transition-all duration-500"
            >
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0c0e14] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                  <Icon name="BoltIcon" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    2. Arm’s-Length Screen Focus
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {renderFootnoteText(
                      'A second smooth surface curvature transition advances light forward to extend your sharp vision into the intermediate (66 cm) computer, dashboard, and cooking range without compromising distance vision [2].'
                    )}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  100% Light Energy Utilized
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/[0.08] shadow-lg group hover:border-primary/30 transition-all duration-500"
            >
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0c0e14] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                  <Icon name="SparklesIcon" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    3. Clareon® Lifelong Optical Polymer
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {renderFootnoteText(
                      'Manufactured from Alcon’s purest hydrophobic acrylic polymer. Tested to yield a 0.0 glistening grade for permanent optical clarity that never degrades over your lifetime [2].'
                    )}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Zero Glistening Grade
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: DEFOCUS CURVE & VISUAL ACUITY RANGE (Double-Bezel Lab Viewport) ── */}
      <section
        id="outcomes"
        className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#090a0d] scroll-mt-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(197,160,89,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Defocus Curve &amp; Daily Vision
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              Your Everyday Range of Vision with Vivity.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
              The clinical defocus curve shows how clearly you see across various distances. Explore
              how Clareon Vivity performs across your active day.
            </p>
          </div>

          {/* Interactive Distance Simulator Tabs (Doppelrand Lab Apparatus) */}
          <div className="max-w-4xl mx-auto p-2 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.08] shadow-2xl">
            <div className="rounded-[calc(2.5rem-8px)] bg-[#07090d] p-6 sm:p-10 border border-white/[0.04]">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 rounded-full bg-black/60 border border-white/10 max-w-xl mx-auto">
                <button
                  onClick={() => handleSimulatorTabClick('distance')}
                  className={`flex-1 min-w-[120px] py-3 px-5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    selectedDistanceTab === 'distance'
                      ? 'bg-gradient-to-r from-[#fff3d6] via-[#f7d492] to-[#d1ab60] text-black shadow-[0_2px_14px_rgba(197,160,89,0.4)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                >
                  Distance (6m+)
                </button>
                <button
                  onClick={() => handleSimulatorTabClick('intermediate')}
                  className={`flex-1 min-w-[120px] py-3 px-5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    selectedDistanceTab === 'intermediate'
                      ? 'bg-gradient-to-r from-[#fff3d6] via-[#f7d492] to-[#d1ab60] text-black shadow-[0_2px_14px_rgba(197,160,89,0.4)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                >
                  Intermediate (66cm)
                </button>
                <button
                  onClick={() => handleSimulatorTabClick('near')}
                  className={`flex-1 min-w-[120px] py-3 px-5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    selectedDistanceTab === 'near'
                      ? 'bg-gradient-to-r from-[#fff3d6] via-[#f7d492] to-[#d1ab60] text-black shadow-[0_2px_14px_rgba(197,160,89,0.4)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                >
                  Near (40cm)
                </button>
              </div>

              {/* Active Distance Detail */}
              {selectedDistanceTab === 'distance' && (
                <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      Visual Acuity: 20/20 Crisp
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                      Distance Vision: Driving, Golf &amp; Outdoors
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6 font-light">
                      {renderFootnoteText(
                        'In FDA trials, binocular uncorrected distance visual acuity with Clareon Vivity matched standard monofocal lenses (20/20 or better) [2]. Road signs, street navigation, movies, and golf ball trajectory remain crisp and sharp.'
                      )}
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                      <li className="flex items-center gap-2.5">
                        <Icon
                          name="CheckCircleIcon"
                          size={16}
                          className="text-emerald-400 shrink-0"
                        />
                        <span>Clear highway road signs, traffic, and open-road driving</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Icon
                          name="CheckCircleIcon"
                          size={16}
                          className="text-emerald-400 shrink-0"
                        />
                        <span>Sports, tennis, golf ball tracking, and outdoor panoramas</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <AppImage
                      src="/assets/images/day_driving_pro.jpg"
                      alt="Clareon Vivity daytime clear distance highway driving simulation"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-400 border border-white/10">
                      Distance: 20/20 Clarity
                    </div>
                  </div>
                </div>
              )}

              {selectedDistanceTab === 'intermediate' && (
                <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      Visual Acuity: 20/20 to 20/25
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                      Intermediate: Computers, Dashboards &amp; Cooking
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6 font-light">
                      {renderFootnoteText(
                        'This is Vivity’s greatest everyday strength. While monofocal patients must reach for glasses to see their car speedometer, laptop, or grocery prices, Vivity maintains continuous focus across the entire arm’s-length corridor [2].'
                      )}
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                      <li className="flex items-center gap-2.5">
                        <Icon name="CheckCircleIcon" size={16} className="text-primary shrink-0" />
                        <span>
                          Full workday on computer monitors and laptops without eye strain
                        </span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Icon name="CheckCircleIcon" size={16} className="text-primary shrink-0" />
                        <span>
                          GPS navigation, car speedometer, grocery shopping &amp; food prep
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <AppImage
                      src="/assets/images/sharp_day_intermediate_pro.jpg"
                      alt="Clareon Vivity daytime intermediate workspace and dashboard simulation"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-primary border border-white/10">
                      Intermediate: Screens &amp; Dashboard
                    </div>
                  </div>
                </div>
              )}

              {selectedDistanceTab === 'near' && (
                <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      Visual Acuity: ~20/32 to 20/40 (Functional Near)
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                      Near Vision: Smartphones, Menus &amp; Daily Tasks
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6 font-light">
                      Vivity provides excellent functional near vision for quick glances at your
                      phone, checking texts, reading menus, and signing receipts. For prolonged
                      reading of small book font in dim light, lightweight readers remain a helpful
                      companion.
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                      <li className="flex items-center gap-2.5">
                        <Icon name="CheckCircleIcon" size={16} className="text-primary shrink-0" />
                        <span>
                          Casual smartphone use, texting, and smartwatches without glasses
                        </span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Icon
                          name="InformationCircleIcon"
                          size={16}
                          className="text-muted-foreground shrink-0"
                        />
                        <span>
                          Optional +1.25 to +1.50D readers for fine medicine print or paperback
                          books
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <AppImage
                      src="/assets/images/vivity_day_near_pro.jpg"
                      alt="Clareon Vivity daytime near reading smartphone and menu clarity"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-amber-400 border border-white/10">
                      Near: Smartphone &amp; Menus
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: 3-WAY HEAD-TO-HEAD COMPARISON (VIVITY vs PANOPTIX vs PURESEE) ── */}
      <section
        id="comparison"
        className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#0c0e14] scroll-mt-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(197,160,89,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Head-to-Head Comparison
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              Clareon Vivity vs. PanOptix Pro vs. TECNIS PureSee.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
              Every eye is unique. Dr. Matthew Marano Jr. and Dr. Sherief Raouf offer all three
              premier FDA-approved advanced optics so you receive the exact lens engineered for your
              visual priorities.
            </p>
          </div>

          {/* 3 Summary Cards (Doppelrand Architecture with Spotlight Column) */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-14 pt-4">
            {/* Vivity Card (Featured Spotlight) */}
            <div className="p-1.5 rounded-[2rem] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent border border-primary/40 shadow-[0_0_50px_rgba(197,160,89,0.18)] relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-primary text-[#060709] text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                Non-Diffractive Leader
              </div>
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#090b10] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <h3 className="text-xl font-bold text-primary mt-2 mb-1">Clareon® Vivity®</h3>
                  <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                    Extended Depth of Focus (EDOF)
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
                    Best for active drivers, computer professionals, and patients sensitive to
                    glare. Stretches light smoothly without diffractive rings.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-white/[0.08] text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Night Glare Profile:</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {renderFootnoteText('Monofocal-like (<2%) [2]')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Intermediate Focus:</span>
                    <span className="font-bold text-primary font-mono">20/20 to 20/25</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Fine Print Readers:</span>
                    <span className="font-medium text-white/80 font-mono">
                      Occasional fine print
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* PanOptix Card */}
            <div className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-[#8b5cf6]/30 shadow-lg relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-[#8b5cf6] text-white text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                Full Trifocal Range
              </div>
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0c0e16] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <h3 className="text-xl font-bold text-[#a78bfa] mt-2 mb-1">PanOptix® Pro</h3>
                  <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                    Trifocal Diffractive IOL
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
                    Best for patients who want maximum near reading independence for books and fine
                    print, and are comfortable with minor night halos.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-white/[0.08] text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Night Glare Profile:</span>
                    <span className="font-bold text-amber-400 font-mono">Noticeable rings</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Near Reading Focus:</span>
                    <span className="font-bold text-[#a78bfa] font-mono">20/20 at 40 cm</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Spectacle Freedom:</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {renderFootnoteText('99% freedom [1]')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* PureSee Card */}
            <div className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-[#00a3ff]/30 shadow-lg relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-[#00a3ff] text-white text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                Latest EDOF
              </div>
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0c0e16] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <h3 className="text-xl font-bold text-[#38bdf8] mt-2 mb-1">TECNIS PureSee™</h3>
                  <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                    Latest Refractive Extended Depth
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
                    Best for patients seeking J&amp;J’s latest, most cutting-edge purely refractive
                    EDOF optic with zero FDA contrast sensitivity warning and high optical clarity.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-white/[0.08] text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Night Glare Profile:</span>
                    <span className="font-bold text-emerald-400 font-mono">Monofocal-like</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Contrast Sensitivity:</span>
                    <span className="font-bold text-[#38bdf8] font-mono">
                      {renderFootnoteText('Zero warning [3]')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Fine Print Readers:</span>
                    <span className="font-medium text-white/80 font-mono">
                      Occasional fine print
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden items-center justify-end gap-1.5 text-[11px] text-muted-foreground mb-3 px-1 font-mono">
            <Icon name="ArrowsRightLeftIcon" size={13} className="text-primary animate-pulse" />
            <span>Swipe horizontally to compare all lenses &rarr;</span>
          </div>

          {/* Full Side-by-Side Specifications Matrix Table (Luxury Glass Container) */}
          <div className="w-full overflow-x-auto rounded-[2rem] border border-white/10 bg-[#07090d] backdrop-blur-xl shadow-2xl p-1">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground w-1/4">
                    Comparison Parameter
                  </th>
                  <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-primary w-1/4 bg-primary/[0.08] border-x border-primary/30">
                    Clareon® Vivity®
                  </th>
                  <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-[#a78bfa] w-1/4">
                    PanOptix® Pro
                  </th>
                  <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] w-1/4">
                    TECNIS PureSee™
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                {comparisonMetrics.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-5 font-semibold text-white/90">
                      {renderFootnoteText(row.title)}
                    </td>
                    <td className="p-5 text-primary font-medium bg-primary/[0.03] border-x border-primary/20 font-mono text-xs sm:text-[13px]">
                      {renderFootnoteText(row.vivity)}
                    </td>
                    <td className="p-5 text-muted-foreground font-light text-xs sm:text-[13px]">
                      {renderFootnoteText(row.panoptix)}
                    </td>
                    <td className="p-5 text-muted-foreground font-light text-xs sm:text-[13px]">
                      {renderFootnoteText(row.puresee)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: CANDIDATE PROFILES & LIFESTYLE SUITABILITY (Double-Bezel Dual Cards) ── */}
      <section
        id="candidates"
        className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#08090d]"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Patient Matching
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              Is Clareon Vivity the Right Choice for You?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
              Dr. Matthew Marano Jr. and Dr. Sherief Raouf evaluate each patient’s corneal
              topography, lifestyle habits, and visual expectations before recommending an
              intraocular lens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* Left: When Vivity is Ideal */}
            <div className="p-1.5 rounded-[2rem] bg-emerald-500/[0.04] border border-emerald-500/30 shadow-xl">
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#070d0b] p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-8">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                      <Icon name="CheckCircleIcon" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        You Are an Ideal Vivity Candidate If:
                      </h3>
                      <p className="text-xs text-emerald-400/90 font-mono uppercase tracking-wider">
                        High satisfaction match profile
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground font-light">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">Frequent Night Driver:</strong>{' '}
                        You regularly drive on highways like Route 24, I-80, or the Parkway and
                        cannot tolerate distracting glare rings.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Computer &amp; Office Professional:
                        </strong>{' '}
                        You spend hours on laptops, desktop screens, Zoom calls, and tablets.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Active Outdoor Lifestyle:
                        </strong>{' '}
                        You play golf, tennis, hike, or travel and value continuous visual freedom.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Mild Corneal or Retinal Nuances:
                        </strong>{' '}
                        Patients with mild dry eye or early maculopathy where diffractive lenses are
                        not recommended often qualify for Vivity.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: When Another Lens is Better */}
            <div className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/[0.08] shadow-xl">
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0a0c10] p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-8">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                      <Icon name="InformationCircleIcon" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        When Our Surgeons Suggest Alternatives:
                      </h3>
                      <p className="text-xs text-primary/90 font-mono uppercase tracking-wider">
                        Alternative clinical considerations
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground font-light">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Need 100% Near Independence:
                        </strong>{' '}
                        {renderFootnoteText(
                          'If your highest priority is reading fine novels in bed without ever touching reading glasses, Clareon PanOptix Pro is typically preferred [1].'
                        )}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Interested in Refractive EDOF:
                        </strong>{' '}
                        {renderFootnoteText(
                          'Patients wanting Johnson & Johnson’s newest refractive zonal optics can evaluate the TECNIS PureSee [3].'
                        )}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Significant Retinal Disease:
                        </strong>{' '}
                        Patients with advanced macular degeneration or diabetic retinopathy will be
                        guided toward a standard monofocal lens for maximum safety.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: ASTIGMATISM & TORIC CORRECTION WITH LENSAR ALLY ── */}
      <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#0a0c12]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
                Precision Astigmatism Alignment
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
                Clareon<sup>®</sup> Vivity<sup>®</sup> Toric +{' '}
                <span className="font-semibold text-gradient-primary">
                  LENSAR ALLY<sup>®</sup> Laser.
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 font-light max-w-xl">
                {renderFootnoteText(
                  'Over 60% of cataract patients have corneal astigmatism that distorts light rays. Dr. Marano and Dr. Raouf pair the Clareon Vivity Toric IOL with the LENSAR ALLY Femtosecond Laser system to create sub-micron arcuate incisions and align the lens precisely to your eye’s steep axis [2].'
                )}
              </p>
              <div className="p-1 rounded-2xl bg-gradient-to-r from-primary/30 to-transparent border border-primary/30 shadow-lg mb-4 max-w-xl">
                <div className="p-4 rounded-[calc(1rem-2px)] bg-[#0a0c12] flex items-center gap-3.5">
                  <Icon name="SparklesIcon" size={24} className="text-primary shrink-0" />
                  <p className="text-sm font-medium text-white">
                    <strong className="text-primary font-bold">Toric Policy:</strong> At Marano Eye
                    Care, custom Toric astigmatism correction is included with all premium lenses at
                    no extra upgrade fee.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-1.5 rounded-[1.75rem] bg-white/[0.02] border border-white/10 shadow-lg">
                <div className="p-5 rounded-[calc(1.75rem-6px)] bg-[#07090d] flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary font-mono font-bold text-sm">
                    3D
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      Sub-Micron Corneal Topography
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                      Automated Iris Registration tracks cyclotorsion when you lie down for exact
                      degrees of alignment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-1.5 rounded-[1.75rem] bg-white/[0.02] border border-white/10 shadow-lg">
                <div className="p-5 rounded-[calc(1.75rem-6px)] bg-[#07090d] flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 font-mono font-bold text-sm">
                    0N
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      Zero-Needle Topical Anesthesia
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                      Gentle numbing eye drops make the 10-minute outpatient procedure completely
                      comfortable without needle injections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FREQUENTLY ASKED QUESTIONS (Double-Bezel Accordions) ── */}
      <section
        id="faqs"
        className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#07080c] scroll-mt-20"
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Clinical Questions Answered
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5 tracking-tight">
              Frequently Asked Questions About Clareon Vivity.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto font-light">
              Clear, transparent clinical guidance from Board-Certified Surgeons Dr. Matthew Marano
              Jr., MD &amp; Dr. Sherief Raouf, MD.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="p-1 rounded-[1.75rem] bg-white/[0.02] border border-white/[0.08] transition-all duration-300 shadow-md"
                >
                  <div className="rounded-[calc(1.75rem-4px)] bg-[#090b10] overflow-hidden">
                    <button
                      onClick={() => handleFaqClick(index, faq.question)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-medium text-foreground">
                        {faq.question}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? 'rotate-180 bg-primary text-black font-bold border-primary'
                            : 'text-muted-foreground bg-white/[0.03]'
                        }`}
                      >
                        <Icon name="ChevronDownIcon" size={14} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-muted-foreground leading-relaxed border-t border-white/[0.05] pt-4 font-light animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
