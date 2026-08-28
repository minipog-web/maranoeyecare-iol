'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';
import { handleSpotlightMouseMove, renderFootnoteText } from '@/lib/ui';

interface ComparisonMetric {
  title: string;
  panoptix: string;
  vivity: string;
  puresee: string;
}

const comparisonMetrics: ComparisonMetric[] = [
  {
    title: 'Optical Technology',
    panoptix: 'ENLIGHTEN® Diffractive Trifocal (Concentric Rings) [1]',
    vivity: 'X-WAVE™ Non-Diffractive Wavefront Shaping [2]',
    puresee: 'Proprietary Refractive EDOF Surface Zonal Optics [3]',
  },
  {
    title: 'Light Transmission Efficiency',
    panoptix:
      '88% light transmitted to retina (Highest efficiency among diffractive trifocals) [1]',
    vivity: '~100% transmitted light utilization (Non-diffractive, zero light splitting) [2]',
    puresee: '~100% transmitted light (Pure refractive focus, zero diffractive loss) [3]',
  },
  {
    title: 'Near Vision (Reading Books, Menus, Smartwatches)',
    panoptix: 'Dedicated 20/20 Focal Peak at 40 cm (High Independence) [1]',
    vivity: 'Functional Near (~20/32–20/40); readers for fine print',
    puresee: 'Functional Near (~20/32–20/40); readers for fine print',
  },
  {
    title: 'Intermediate Clarity (Computer Screens & Dashboards)',
    panoptix: 'Dedicated 20/20 Focal Peak at 60 cm (Natural arm’s length) [1]',
    vivity: '20/20 – 20/25 Continuous Extended Focus (66 cm corridor) [2]',
    puresee: '20/20 – 20/25 Continuous Extended Focus [3]',
  },
  {
    title: 'Distance Clarity (Driving, Outdoor Landscapes)',
    panoptix: '20/20 Binocular Crisp Distance Vision [1]',
    vivity: '20/20 Binocular Crisp Distance Vision [2]',
    puresee: '20/20 Binocular Crisp Distance Vision [3]',
  },
  {
    title: 'Night Glare & Halos Profile',
    panoptix: 'Noticeable diffractive concentric rings during neuroadaptation [1]',
    vivity: 'Monofocal-like (<2% severe halos in FDA trials) [2]',
    puresee: 'Monofocal-like dysphotopsia profile [3]',
  },
  {
    title: 'Neuroadaptation Timeline',
    panoptix: '2 to 8 weeks as visual cortex adapts to trifocal optics [1]',
    vivity: 'Immediate to few days (Continuous wavefront) [2]',
    puresee: 'Immediate to few days (Refractive profile) [3]',
  },
  {
    title: 'Spectacle Independence Rate',
    panoptix: 'Over 85–90%+ complete freedom from reading glasses [1]',
    vivity: 'High freedom for distance/screens; readers for fine print',
    puresee: 'High freedom for distance/screens; readers for fine print',
  },
  {
    title: 'Overall Patient Satisfaction',
    panoptix: '99% of patients would choose PanOptix again (PubMed meta-analysis) [1]',
    vivity: '94%+ high satisfaction in clinical registries [2]',
    puresee: 'High satisfaction in international clinical trials [3]',
  },
];

const faqs = [
  {
    question: 'What makes Clareon PanOptix Pro unique among trifocal lenses?',
    answer:
      'Unlike older European trifocals that positioned intermediate vision at 80 cm (which required patients to stretch their arms too far to see laptop screens), Clareon PanOptix Pro was specifically engineered with an intermediate focal distance of 60 cm. This precisely matches natural American arm’s-length working habits for computers, car dashboards, and tablets, while maintaining a dedicated 40 cm near reading peak and crisp 20/20 distance acuity [1].',
  },
  {
    question: 'Will I be able to read books and smartphones without glasses?',
    answer:
      'Yes. Clareon PanOptix Pro offers the highest rate of near reading independence among FDA-approved lenses. Over 85–90% of patients achieve complete freedom from glasses for reading books, smartphones, text messages, restaurant menus, and food labels [1].',
  },
  {
    question: 'What is neuroadaptation and how long does it take?',
    answer:
      'Because the ENLIGHTEN® optical design splits incoming light across near, intermediate, and distance focal planes simultaneously, your brain’s visual cortex must learn to select the sharp image while filtering out minor background focal rings. This natural process is called neuroadaptation. Most patients adapt within 2 to 8 weeks, during which subtle night halos around headlights become soft and imperceptible.',
  },
  {
    question: 'Is there a Toric option for PanOptix Pro to correct astigmatism?',
    answer:
      'Yes. The Clareon PanOptix Toric IOL corrects pre-existing corneal astigmatism at the exact same moment your cataract is removed. Dr. Matthew Marano Jr. uses the 3D high-resolution LENSAR ALLY femtosecond laser system to align the Toric axis with sub-micron accuracy. At Marano Eye Care, Toric astigmatism correction is included on all premium lenses at no extra upgrade charge.',
  },
  {
    question: 'How does Clareon PanOptix Pro compare to Clareon Vivity?',
    answer:
      'PanOptix Pro is a diffractive trifocal lens that delivers maximum near reading freedom (20/20 at 40 cm) with a brief neuroadaptation period. Clareon Vivity is a non-diffractive extended depth of focus (EDOF) lens that delivers exceptional intermediate computer vision and monofocal-like night driving safety with fewer night halos, but may require lightweight reading glasses for prolonged small book reading.',
  },
  {
    question: 'How does cataract surgery work with PanOptix Pro, and is the result permanent?',
    answer:
      'Cataracts form when natural crystalline lens proteins break down, causing the lens to turn cloudy, yellow, and eventually brown and opaque. During surgery, Dr. Matthew Marano Jr. removes the cloudy natural lens and replaces it with the Clareon PanOptix Pro acrylic IOL. Because high-purity acrylic never clouds or degrades, the custom prescription inside your new lens remains stable for the rest of your life.',
  },
  {
    question: 'How fast is the recovery after PanOptix Pro cataract surgery?',
    answer:
      'Dr. Matthew Marano Jr. performs outpatient laser cataract surgery in approximately 10 minutes using gentle zero-needle numbing eye drops. Most patients notice dramatic improvements in brightness and color vibrancy within 24 to 48 hours, and can resume light daily activities the very next day.',
  },
];

export default function PanOptixPageClient() {
  const [selectedDistanceTab, setSelectedDistanceTab] = useState<
    'near' | 'intermediate' | 'distance'
  >('near');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    trackEvent({
      action: 'lens_guide_view',
      category: 'Lens Guide',
      label: 'panoptix_pro',
    });
  }, []);

  const handleNavClick = (ctaName: string) => {
    trackEvent({
      action: 'panoptix_page_cta_click',
      category: 'Engagement',
      label: ctaName,
    });
  };

  const handleFaqClick = (index: number, question: string) => {
    const isOpening = activeFaq !== index;
    setActiveFaq(isOpening ? index : null);
    if (isOpening) {
      trackEvent({
        action: 'panoptix_faq_expand',
        category: 'Engagement',
        label: question.slice(0, 60),
      });
    }
  };

  return (
    <div className="flex flex-col w-full pt-20 sm:pt-24 lg:pt-28 pb-20">
      {/* ── Top Breadcrumb & Back Navigation ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-10 w-full">
        <div className="flex items-center justify-between">
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
            <span className="text-[#a78bfa] font-medium tracking-wide">
              Clareon® PanOptix® Pro Clinical Guide
            </span>
          </nav>
          <div className="hidden md:flex items-center gap-3 text-xs font-mono font-medium">
            <a
              href="#enlighten"
              className="text-white/60 hover:text-primary transition-colors px-2.5 py-1 rounded-lg hover:bg-white/[0.03]"
            >
              ENLIGHTEN® Tech
            </a>
            <a
              href="#simulator"
              className="text-white/60 hover:text-primary transition-colors px-2.5 py-1 rounded-lg hover:bg-white/[0.03]"
            >
              3-Distance Acuity
            </a>
            <a
              href="#comparison"
              className="text-white/60 hover:text-primary transition-colors px-2.5 py-1 rounded-lg hover:bg-white/[0.03]"
            >
              3-Way Comparison
            </a>
            <a
              href="#candidates"
              className="text-white/60 hover:text-primary transition-colors px-2.5 py-1 rounded-lg hover:bg-white/[0.03]"
            >
              Candidacy
            </a>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION: Clinical Authority & Doppelrand Physical Showcase ── */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-[#08090e]">
        {/* Signature PanOptix Amber & Violet Ray Pattern */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-[#8b5cf6]/[0.08] via-primary/[0.08] to-transparent rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute inset-0 grid-lines-bg opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-16 items-center">
            {/* Left Column: Clinical Positioning Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#a78bfa] text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.25em] mb-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse" />
                <span>FDA-Approved Trifocal Optical Innovation</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.12] mb-6 tracking-tight">
                Clareon<sup>®</sup> PanOptix<sup>®</sup> Pro:{' '}
                <span className="font-semibold text-gradient-primary block mt-1">
                  Full-Range Trifocal Clarity.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl font-light">
                Engineered for maximum spectacle independence. The Clareon PanOptix Pro uses
                proprietary ENLIGHTEN® optical design to deliver continuous high-definition vision
                from 40 cm reading to 60 cm intermediate computer screens and distant horizons.
              </p>

              {/* 4 Clinical Benefit Badges (Doppelrand Architecture) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-10 max-w-xl">
                <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm">
                  <div className="p-3 rounded-[calc(1rem-2px)] bg-black/40 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#a78bfa]">
                      <Icon name="BoltIcon" size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">
                        88% Light to Retina
                      </p>
                      <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                        {renderFootnoteText('Highest among trifocal IOLs [1]')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm">
                  <div className="p-3 rounded-[calc(1rem-2px)] bg-black/40 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                      <Icon name="BookOpenIcon" size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">
                        40 cm Dedicated Near Peak
                      </p>
                      <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                        Paperback books, phones &amp; menus
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm">
                  <div className="p-3 rounded-[calc(1rem-2px)] bg-black/40 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                      <Icon name="TrophyIcon" size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">
                        99% Patient Satisfaction
                      </p>
                      <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                        {renderFootnoteText('513-patient meta-analysis [1]')}
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
              </div>

              {/* Action Buttons (Button-in-Button Island Architecture) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a
                  href="#consultation"
                  onClick={() => handleNavClick('hero_book_cta')}
                  className="group relative inline-flex items-center justify-between sm:justify-center rounded-full bg-gradient-to-r from-[#fff3d6] via-[#f7d492] to-[#d1ab60] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_4px_24px_rgba(197,160,89,0.35)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(197,160,89,0.5)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>Schedule PanOptix Consultation</span>
                  <div className="ml-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <Icon name="ArrowRightIcon" size={12} className="text-black" />
                  </div>
                </a>
                <a
                  href="#comparison"
                  onClick={() => handleNavClick('hero_compare_jump')}
                  className="group inline-flex items-center justify-between sm:justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/[0.08] hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>Compare with Vivity &amp; PureSee</span>
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
                    src="/assets/images/panoptix_iol_real.jpg"
                    alt="Clareon PanOptix Pro Trifocal IOL with real ENLIGHTEN optical rings and STABLEFORCE haptics"
                    fill
                    priority={true}
                    sizes="(max-width: 640px) 90vw, 440px"
                    className="object-cover relative z-10 scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />

                  {/* Optical Feature Floating Glass Pills */}
                  <div className="absolute top-5 left-5 z-20 px-3.5 py-1.5 rounded-full bg-black/80 border border-[#8b5cf6]/40 backdrop-blur-xl text-[10px] font-mono font-bold text-[#a78bfa] tracking-widest uppercase shadow-lg">
                    ENLIGHTEN® Trifocal Design
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

      {/* ── SECTION 1: THE OPTICAL PHYSICS OF ENLIGHTEN® TECHNOLOGY ── */}
      <section
        id="enlighten"
        className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#06070a] scroll-mt-20"
      >
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-[#8b5cf6]/[0.05] to-primary/[0.06] rounded-full blur-[170px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#a78bfa] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Optical Physics &amp; Bio-Engineering
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              How ENLIGHTEN® Delivers 88% Light Energy to the Retina.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
              While purely refractive lenses like TECNIS PureSee transmit ~100% of light by avoiding
              diffractive rings, traditional trifocal lenses historically lost up to 18–20% of light
              to scatter. Alcon’s proprietary ENLIGHTEN® optical system delivers 88% of transmitted
              light directly to the retina—the highest efficiency of any diffractive trifocal
              IOL—distributing sharp focus seamlessly across distance, intermediate, and dedicated
              40 cm near vision{' '}
              <sup className="text-[10px] font-bold text-primary inline-block ml-0.5">
                <a href="#footnote-1" className="text-primary hover:underline font-bold">
                  [1]
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
              className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/[0.08] shadow-lg group hover:border-[#8b5cf6]/40 transition-all duration-500"
            >
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0c0e16] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center mb-6 text-[#a78bfa]">
                  <Icon name="ComputerDesktopIcon" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    1. 60 cm Ergonomic Intermediate Peak
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {renderFootnoteText(
                      'Unlike older European trifocals tuned for 80 cm, PanOptix places intermediate focus at 60 cm (24 inches)—the exact natural arm’s-length distance for computer monitors, tablets, and car instrument panels [1].'
                    )}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono font-bold text-[#a78bfa] uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                  Natural Ergonomic Comfort
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/[0.08] shadow-lg group hover:border-primary/40 transition-all duration-500"
            >
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0c0e16] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                  <Icon name="BookOpenIcon" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    2. 40 cm High-Definition Near Vision
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {renderFootnoteText(
                      'A dedicated 40 cm near focal point delivers crisp 20/20 to 20/25 vision for fine book print, smartwatches, text messages, and menus without reading glasses [1].'
                    )}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  High Spectacle Independence
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/[0.08] shadow-lg group hover:border-emerald-500/40 transition-all duration-500"
            >
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0c0e16] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                  <Icon name="SparklesIcon" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    3. Clareon® 0.0 Glistening Acrylic
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {renderFootnoteText(
                      'Cast from Alcon’s purest hydrophobic acrylic polymer. Tested to yield a 0.0 glistening grade for lifelong optical clarity with blue-light filtering chromophores [1].'
                    )}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Permanent Clarity Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: 3-DISTANCE VISION SIMULATOR (Doppelrand Lab Viewport) ── */}
      <section
        id="simulator"
        className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#090b10] scroll-mt-20"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Real-World Vision Simulator
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              Experience the Full Visual Range of PanOptix Pro.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
              Toggle between near, intermediate, and distance focal points to preview the visual
              acuity achieved with Clareon PanOptix Pro trifocal optics.
            </p>
          </div>

          {/* Interactive Distance Tabs Container (Doppelrand Lab Apparatus) */}
          <div className="max-w-4xl mx-auto p-2 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.08] shadow-2xl">
            <div className="rounded-[calc(2.5rem-8px)] bg-[#07090d] p-6 sm:p-10 border border-white/[0.04]">
              {/* Tab Navigation */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 rounded-full bg-black/60 border border-white/10 max-w-xl mx-auto">
                <button
                  onClick={() => {
                    setSelectedDistanceTab('near');
                    trackEvent({
                      action: 'panoptix_simulator_tab',
                      category: 'Engagement',
                      label: 'near',
                    });
                  }}
                  className={`flex-1 min-w-[120px] py-3 px-5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    selectedDistanceTab === 'near'
                      ? 'bg-gradient-to-r from-[#fff3d6] via-[#f7d492] to-[#d1ab60] text-black shadow-[0_2px_14px_rgba(197,160,89,0.4)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                >
                  1. Near (40 cm)
                </button>
                <button
                  onClick={() => {
                    setSelectedDistanceTab('intermediate');
                    trackEvent({
                      action: 'panoptix_simulator_tab',
                      category: 'Engagement',
                      label: 'intermediate',
                    });
                  }}
                  className={`flex-1 min-w-[120px] py-3 px-5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    selectedDistanceTab === 'intermediate'
                      ? 'bg-gradient-to-r from-[#fff3d6] via-[#f7d492] to-[#d1ab60] text-black shadow-[0_2px_14px_rgba(197,160,89,0.4)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                >
                  2. Intermediate (60 cm)
                </button>
                <button
                  onClick={() => {
                    setSelectedDistanceTab('distance');
                    trackEvent({
                      action: 'panoptix_simulator_tab',
                      category: 'Engagement',
                      label: 'distance',
                    });
                  }}
                  className={`flex-1 min-w-[120px] py-3 px-5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    selectedDistanceTab === 'distance'
                      ? 'bg-gradient-to-r from-[#fff3d6] via-[#f7d492] to-[#d1ab60] text-black shadow-[0_2px_14px_rgba(197,160,89,0.4)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                >
                  3. Distance (6m+)
                </button>
              </div>

              {/* Active Distance Detail */}
              {selectedDistanceTab === 'near' && (
                <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      Visual Acuity: 20/20 at 40 cm
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                      Near Vision: Novels, Smartphones &amp; Menus
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6 font-light">
                      {renderFootnoteText(
                        'PanOptix Pro provides a dedicated focal peak at 40 cm (16 inches). Over 85–90% of patients report never needing reading glasses for paperback books, restaurant menus, medication labels, or texting on smart devices [1].'
                      )}
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                      <li className="flex items-center gap-2.5">
                        <Icon name="CheckCircleIcon" size={16} className="text-primary shrink-0" />
                        <span>Comfortable prolonged reading in bed without reading glasses</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Icon name="CheckCircleIcon" size={16} className="text-primary shrink-0" />
                        <span>Smartphones, smartwatches, sewing, and close hobby work</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <AppImage
                      src="/assets/images/panoptix_day_near_pro.png"
                      alt="Clareon PanOptix Pro crisp daytime near reading simulation"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-primary border border-white/10">
                      Near: 20/20 Reading at 40 cm
                    </div>
                  </div>
                </div>
              )}

              {selectedDistanceTab === 'intermediate' && (
                <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#a78bfa] text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      Visual Acuity: 20/20 at 60 cm
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                      Intermediate: Laptop Screens &amp; Car Dashboards
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6 font-light">
                      {renderFootnoteText(
                        'The 60 cm intermediate focal peak was specifically designed for natural desk work. Work on laptop displays, desktop monitors, and view GPS navigation and car speedometers with zero eye strain [1].'
                      )}
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                      <li className="flex items-center gap-2.5">
                        <Icon
                          name="CheckCircleIcon"
                          size={16}
                          className="text-[#a78bfa] shrink-0"
                        />
                        <span>All-day computer work, zoom meetings, and spreadsheets</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Icon
                          name="CheckCircleIcon"
                          size={16}
                          className="text-[#a78bfa] shrink-0"
                        />
                        <span>Automotive dashboard instruments and GPS navigation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <AppImage
                      src="/assets/images/sharp_day_intermediate_pro.jpg"
                      alt="Clareon PanOptix Pro daytime intermediate computer and dashboard simulation"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#a78bfa] border border-white/10">
                      Intermediate: 20/20 at 60 cm
                    </div>
                  </div>
                </div>
              )}

              {selectedDistanceTab === 'distance' && (
                <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      Visual Acuity: 20/20 Crisp
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                      Distance Vision: Driving, Golf &amp; Landscapes
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6 font-light">
                      {renderFootnoteText(
                        'PanOptix delivers crisp 20/20 distance clarity for daytime highway driving, theater, watching sports, and tracking golf ball flight [1].'
                      )}
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                      <li className="flex items-center gap-2.5">
                        <Icon
                          name="CheckCircleIcon"
                          size={16}
                          className="text-emerald-400 shrink-0"
                        />
                        <span>Daytime highway navigation, road signs, and scenery</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Icon
                          name="CheckCircleIcon"
                          size={16}
                          className="text-emerald-400 shrink-0"
                        />
                        <span>Golf ball trajectory, tennis, and spectator sports</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <AppImage
                      src="/assets/images/day_driving_pro.jpg"
                      alt="Clareon PanOptix Pro daytime clear distance driving simulation"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-400 border border-white/10">
                      Distance: 20/20 Clarity
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: 3-WAY HEAD-TO-HEAD COMPARISON (PANOPTIX vs VIVITY vs PURESEE) ── */}
      <section
        id="comparison"
        className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#0c0e14] scroll-mt-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#a78bfa] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Head-to-Head Comparison
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              PanOptix® Pro vs. Clareon® Vivity® vs. TECNIS PureSee™.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
              Explore how trifocal diffractive optics differ from non-diffractive EDOF and pure
              refractive designs so you choose with complete clinical confidence.
            </p>
          </div>

          {/* 3 Summary Cards (Doppelrand Architecture with PanOptix Spotlight) */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-14 pt-4">
            {/* PanOptix Card (Featured Spotlight) */}
            <div className="p-1.5 rounded-[2rem] bg-gradient-to-b from-[#8b5cf6]/30 via-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/40 shadow-[0_0_50px_rgba(139,92,246,0.2)] relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-[#8b5cf6] text-white text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                Full Trifocal Range
              </div>
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#090a12] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <h3 className="text-xl font-bold text-[#a78bfa] mt-2 mb-1">PanOptix® Pro</h3>
                  <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                    Trifocal Diffractive IOL
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
                    Best for patients whose highest priority is reading novels, menus, and
                    smartphones without glasses, and are comfortable with brief neuroadaptation.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-white/[0.08] text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Near Reading Focus:</span>
                    <span className="font-bold text-emerald-400 font-mono">20/20 at 40 cm</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Spectacle Freedom:</span>
                    <span className="font-bold text-[#a78bfa] font-mono">
                      {renderFootnoteText('99% freedom [1]')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Night Glare Profile:</span>
                    <span className="font-medium text-amber-400 font-mono">Diffractive rings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vivity Card */}
            <div className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-primary/30 shadow-lg relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-primary text-[#060709] text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                Non-Diffractive EDOF
              </div>
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0c0e16] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <h3 className="text-xl font-bold text-primary mt-2 mb-1">Clareon® Vivity®</h3>
                  <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                    Extended Depth of Focus (EDOF)
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
                    Best for frequent night drivers and screen workers wanting continuous
                    intermediate focus with a monofocal-like night glare safety profile.
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
                    <span className="font-medium text-white/80 font-mono">Occasional readers</span>
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
                    <span className="text-muted-foreground">Intermediate Focus:</span>
                    <span className="font-bold text-primary font-mono">20/20 to 20/25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden items-center justify-end gap-1.5 text-[11px] text-muted-foreground mb-3 px-1 font-mono">
            <Icon name="ArrowsRightLeftIcon" size={13} className="text-[#a78bfa] animate-pulse" />
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
                  <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-[#a78bfa] w-1/4 bg-[#8b5cf6]/[0.08] border-x border-[#8b5cf6]/30">
                    PanOptix® Pro
                  </th>
                  <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-primary w-1/4">
                    Clareon® Vivity®
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
                    <td className="p-5 text-[#a78bfa] font-medium bg-[#8b5cf6]/[0.03] border-x border-[#8b5cf6]/20 font-mono text-xs sm:text-[13px]">
                      {renderFootnoteText(row.panoptix)}
                    </td>
                    <td className="p-5 text-muted-foreground font-light text-xs sm:text-[13px]">
                      {renderFootnoteText(row.vivity)}
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#a78bfa] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Patient Matching
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              Is Clareon PanOptix Pro the Right Choice for You?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
              Dr. Matthew Marano Jr. evaluates your lifestyle habits, hobbies, and corneal
              measurements before recommending an advanced intraocular lens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* Left: When PanOptix is Ideal */}
            <div className="p-1.5 rounded-[2rem] bg-[#8b5cf6]/[0.04] border border-[#8b5cf6]/30 shadow-xl">
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#090b14] p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-8">
                    <div className="w-11 h-11 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center shrink-0 text-[#a78bfa]">
                      <Icon name="CheckCircleIcon" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        You Are an Ideal PanOptix Candidate If:
                      </h3>
                      <p className="text-xs text-[#a78bfa]/90 font-mono uppercase tracking-wider">
                        Maximum reading independence
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground font-light">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Avid Reader &amp; Mobile User:
                        </strong>{' '}
                        You read books in bed, review documents, text on smartphones, and want to
                        discard reading glasses.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">Close Hobbyist:</strong> You
                        enjoy cooking, baking, sewing, crafts, woodworking, or card games that
                        demand sharp near detail.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Office &amp; Multi-Screen Professional:
                        </strong>{' '}
                        You work across desktop monitors, laptops, and tablets throughout the day.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Healthy Cornea &amp; Retina:
                        </strong>{' '}
                        Normal macular health with desire for full-range trifocal visual freedom.
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
                        When Dr. Marano Suggests Alternatives:
                      </h3>
                      <p className="text-xs text-primary/90 font-mono uppercase tracking-wider">
                        Alternative clinical pathways
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground font-light">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Professional Night Driver:
                        </strong>{' '}
                        {renderFootnoteText(
                          'If you are a commercial driver, pilot, or highly sensitive to night halos, Clareon Vivity is typically recommended [2].'
                        )}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">Prefer Refractive EDOF:</strong>{' '}
                        {renderFootnoteText(
                          'Patients interested in Johnson & Johnson’s refractive EDOF design can evaluate the TECNIS PureSee [3].'
                        )}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Advanced Macular Disease:
                        </strong>{' '}
                        Patients with significant macular degeneration or diabetic retinopathy are
                        best served by standard monofocal IOLs.
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#a78bfa] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
                Precision Astigmatism Alignment
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
                Clareon<sup>®</sup> PanOptix<sup>®</sup> Toric +{' '}
                <span className="font-semibold text-gradient-primary">
                  LENSAR ALLY<sup>®</sup> Laser.
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 font-light max-w-xl">
                {renderFootnoteText(
                  'Over 60% of cataract patients have corneal astigmatism that blurs light focus. Dr. Marano combines the Clareon PanOptix Toric IOL with the LENSAR ALLY Femtosecond Laser system to create sub-micron arcuate cuts and position the lens precisely along your eye’s steep axis [1].'
                )}
              </p>
              <div className="p-1 rounded-2xl bg-gradient-to-r from-[#8b5cf6]/30 to-transparent border border-[#8b5cf6]/30 shadow-lg mb-4 max-w-xl">
                <div className="p-4 rounded-[calc(1rem-2px)] bg-[#0a0c12] flex items-center gap-3.5">
                  <Icon name="SparklesIcon" size={24} className="text-[#a78bfa] shrink-0" />
                  <p className="text-sm font-medium text-white">
                    <strong className="text-[#a78bfa] font-bold">Toric Policy:</strong> At Marano
                    Eye Care, custom Toric astigmatism correction is included with all premium
                    lenses at no extra upgrade fee.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-1.5 rounded-[1.75rem] bg-white/[0.02] border border-white/10 shadow-lg">
                <div className="p-5 rounded-[calc(1.75rem-6px)] bg-[#07090d] flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center shrink-0 text-[#a78bfa] font-mono font-bold text-sm">
                    3D
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      3D High-Res Corneal Reconstruction
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                      Automated Iris Registration and Streamline IV cyclotorsion tracking ensure
                      exact-degree rotational alignment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-1.5 rounded-[1.75rem] bg-white/[0.02] border border-white/10 shadow-lg">
                <div className="p-5 rounded-[calc(1.75rem-6px)] bg-[#07090d] flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary font-mono font-bold text-sm">
                    0N
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      Zero-Needle Topical Comfort
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                      Gentle numbing eye drops make the 10-minute outpatient procedure completely
                      comfortable without injections.
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#a78bfa] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Clinical Questions Answered
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5 tracking-tight">
              Frequently Asked Questions About PanOptix Pro.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto font-light">
              Clear clinical guidance from Board-Certified Surgeon Dr. Matthew Marano Jr., MD.
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
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] focus-visible:ring-2 focus-visible:ring-[#8b5cf6] focus-visible:outline-none transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-medium text-foreground">
                        {faq.question}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? 'rotate-180 bg-[#8b5cf6] text-white font-bold border-[#8b5cf6]'
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
