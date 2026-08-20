'use client';

import React, { useState } from 'react';
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
    panoptix: '88% transmitted light directly to retina (High energy efficiency) [1]',
    vivity: '~100% transmitted light utilization (Zero light splitting) [2]',
    puresee: '~100% transmitted light (Zero diffractive light splitting) [3]',
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

  const handleNavClick = (ctaName: string) => {
    trackEvent({
      action: 'panoptix_page_cta_click',
      category: 'Engagement',
      label: ctaName,
    });
  };

  return (
    <div className="flex flex-col w-full pt-20 sm:pt-24 lg:pt-28 pb-16">
      {/* ── BREADCRUMB & TOP NAV BAR ── */}
      <div className="bg-[#0a0c10] border-b border-border/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between text-xs sm:text-sm">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/30">Premium IOLs</span>
            <span className="text-white/30">/</span>
            <span className="text-primary font-semibold">Clareon® PanOptix® Pro</span>
          </nav>
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
            <a href="#enlighten" className="text-white/70 hover:text-primary transition-colors">
              ENLIGHTEN® Tech
            </a>
            <a href="#simulator" className="text-white/70 hover:text-primary transition-colors">
              3-Distance Acuity
            </a>
            <a href="#comparison" className="text-white/70 hover:text-primary transition-colors">
              3-Way Comparison
            </a>
            <a href="#candidates" className="text-white/70 hover:text-primary transition-colors">
              Candidacy
            </a>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#07080b] via-[#0d0e14] to-[#07080b] border-b border-border/40">
        {/* Optical Ray Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,92,246,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Clinical Positioning Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#a78bfa] text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse" />
                <span>FDA-Approved Trifocal Optical Innovation</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.12] mb-6">
                Clareon<sup>®</sup> PanOptix<sup>®</sup> Pro:{' '}
                <span className="font-semibold text-gradient-primary">
                  Full-Range Trifocal Clarity.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Engineered for maximum spectacle independence. The Clareon PanOptix Pro uses
                proprietary ENLIGHTEN® optical design to deliver continuous high-definition vision
                from 40 cm reading to 60 cm intermediate computer screens and distant horizons.
              </p>

              {/* 4 Clinical Benefit Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5 w-full mb-8 max-w-xl">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="BoltIcon" size={16} className="text-[#a78bfa]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      88% Light Transmission
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      {renderFootnoteText('Industry-leading energy utilization [1]')}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="BookOpenIcon" size={16} className="text-primary" />
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

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="TrophyIcon" size={16} className="text-emerald-400" />
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
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a
                  href="#consultation"
                  onClick={() => handleNavClick('hero_book_cta')}
                  className="btn-premium-primary btn-shimmer px-8 py-4 text-sm font-bold uppercase tracking-wider text-center shadow-[0_4px_24px_rgba(197,160,89,0.3)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  Schedule PanOptix Consultation
                </a>
                <a
                  href="#comparison"
                  onClick={() => handleNavClick('hero_compare_jump')}
                  className="px-6 py-4 rounded-xl border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-primary/40 text-sm font-bold uppercase tracking-wider transition-all duration-300 text-center flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>Compare with Vivity &amp; PureSee</span>
                  <Icon name="ArrowDownIcon" size={14} />
                </a>
              </div>
            </div>

            {/* Right Column: High-Res Lens Physical Model Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-[36px] bg-gradient-to-b from-white/[0.06] to-transparent p-1 border border-white/10 shadow-2xl overflow-hidden group">
                <div className="w-full h-full rounded-[34px] bg-[#07080b] relative overflow-hidden flex items-center justify-center p-6">
                  {/* Subtle Violet Radial Aura */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />

                  <AppImage
                    src="/assets/images/panoptix_iol_real.jpg"
                    alt="Clareon PanOptix Pro Trifocal IOL with ENLIGHTEN optical rings and STABLEFORCE haptics"
                    width={400}
                    height={400}
                    priority={true}
                    className="object-contain relative z-10 scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Optical Feature Pill Callouts */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/80 border border-[#8b5cf6]/40 backdrop-blur-md text-[10px] font-bold text-[#a78bfa] tracking-wider uppercase">
                    ENLIGHTEN® Trifocal Design
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

      {/* ── SECTION 1: THE OPTICAL PHYSICS OF ENLIGHTEN® TECHNOLOGY ── */}
      <section
        id="enlighten"
        className="py-16 sm:py-24 relative overflow-hidden bg-[#06070a] scroll-mt-20"
      >
        <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#8b5cf6]/4 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a78bfa] mb-3">
              Optical Physics &amp; Bio-Engineering
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              How ENLIGHTEN® Delivers 88% Light Energy to the Retina.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Traditional bifocal and early trifocal lenses lost up to 18–20% of light energy due to
              diffractive scattering. Alcon’s proprietary ENLIGHTEN® (Energy Delivering Light
              Energy) optical system redistributes light energy seamlessly across three dedicated
              focal peaks{' '}
              <sup className="text-[10px] font-bold text-primary inline-block ml-0.5">
                <a href="#footnote-1" className="text-primary hover:underline font-bold">
                  [1]
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
              className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-[#8b5cf6]/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center mb-6 text-[#a78bfa]">
                <Icon name="ComputerDesktopIcon" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                1. 60 cm Ergonomic Intermediate Peak
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {renderFootnoteText(
                  'Unlike older European trifocals tuned for 80 cm, PanOptix places intermediate focus at 60 cm (24 inches)—the exact natural arm’s-length distance for computer monitors, tablets, and car instrument panels [1].'
                )}
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-semibold text-[#a78bfa] uppercase tracking-wider">
                Natural Ergonomic Comfort
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-primary/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                <Icon name="BookOpenIcon" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                2. 40 cm High-Definition Near Vision
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {renderFootnoteText(
                  'A dedicated 40 cm near focal point delivers crisp 20/20 to 20/25 vision for fine book print, smartwatches, text messages, and menus without reading glasses [1].'
                )}
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-semibold text-primary uppercase tracking-wider">
                High Spectacle Independence
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                <Icon name="SparklesIcon" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                3. Clareon® 0.0 Glistening Acrylic
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {renderFootnoteText(
                  'Cast from Alcon’s purest hydrophobic acrylic polymer. Tested to yield a 0.0 glistening grade for lifelong optical clarity with blue-light filtering chromophores [1].'
                )}
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Permanent Clarity Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: 3-DISTANCE VISION SIMULATOR & CLINICAL OUTCOMES ── */}
      <section
        id="simulator"
        className="py-16 sm:py-24 relative overflow-hidden bg-[#090b10] scroll-mt-20"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Real-World Vision Simulator
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              Experience the Full Visual Range of PanOptix Pro.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Toggle between near, intermediate, and distance focal points to preview the visual
              acuity achieved with Clareon PanOptix Pro trifocal optics.
            </p>
          </div>

          {/* Interactive Distance Tabs Container */}
          <div className="max-w-4xl mx-auto bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            {/* Tab Navigation */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
              <button
                onClick={() => {
                  setSelectedDistanceTab('near');
                  trackEvent({
                    action: 'panoptix_simulator_tab',
                    category: 'Engagement',
                    label: 'near',
                  });
                }}
                className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedDistanceTab === 'near'
                    ? 'bg-primary text-[#060709] shadow-lg shadow-primary/25 font-extrabold'
                    : 'text-muted-foreground hover:text-white hover:bg-white/[0.04]'
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
                className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedDistanceTab === 'intermediate'
                    ? 'bg-primary text-[#060709] shadow-lg shadow-primary/25 font-extrabold'
                    : 'text-muted-foreground hover:text-white hover:bg-white/[0.04]'
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
                className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedDistanceTab === 'distance'
                    ? 'bg-primary text-[#060709] shadow-lg shadow-primary/25 font-extrabold'
                    : 'text-muted-foreground hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                3. Distance (6m+)
              </button>
            </div>

            {/* Active Distance Detail */}
            {selectedDistanceTab === 'near' && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    Visual Acuity: 20/20 at 40 cm
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                    Near Vision: Novels, Smartphones &amp; Menus
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                    {renderFootnoteText(
                      'PanOptix Pro provides a dedicated focal peak at 40 cm (16 inches). Over 85–90% of patients report never needing reading glasses for paperback books, restaurant menus, medication labels, or texting on smart devices [1].'
                    )}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-primary" />
                      <span>Comfortable prolonged reading in bed without reading glasses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-primary" />
                      <span>Smartphones, smartwatches, sewing, and close hobby work</span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <AppImage
                    src="/assets/images/panoptix_day_near_pro.png"
                    alt="Clareon PanOptix Pro crisp daytime near reading simulation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-primary border border-white/10">
                    Near Simulation: 20/20 Reading at 40 cm
                  </div>
                </div>
              </div>
            )}

            {selectedDistanceTab === 'intermediate' && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#a78bfa] text-xs font-bold uppercase tracking-wider mb-4">
                    Visual Acuity: 20/20 at 60 cm
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                    Intermediate: Laptop Screens &amp; Car Dashboards
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                    {renderFootnoteText(
                      'The 60 cm intermediate focal peak was specifically designed for natural desk work. Work on laptop displays, desktop monitors, and view GPS navigation and car speedometers with zero eye strain [1].'
                    )}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-[#a78bfa]" />
                      <span>All-day computer work, zoom meetings, and spreadsheets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-[#a78bfa]" />
                      <span>Automotive dashboard instruments and GPS navigation</span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <AppImage
                    src="/assets/images/sharp_day_intermediate_pro.jpg"
                    alt="Clareon PanOptix Pro daytime intermediate computer and dashboard simulation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-primary border border-white/10">
                    Intermediate Simulation: 20/20 at 60 cm
                  </div>
                </div>
              </div>
            )}

            {selectedDistanceTab === 'distance' && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                    Visual Acuity: 20/20 Crisp
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                    Distance Vision: Driving, Golf &amp; Landscapes
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                    {renderFootnoteText(
                      'PanOptix delivers crisp 20/20 distance clarity for daytime highway driving, theater, watching sports, and tracking golf ball flight [1].'
                    )}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-emerald-400" />
                      <span>Daytime highway navigation, road signs, and scenery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-emerald-400" />
                      <span>Golf ball trajectory, tennis, and spectator sports</span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <AppImage
                    src="/assets/images/day_driving_pro.jpg"
                    alt="Clareon PanOptix Pro daytime clear distance driving simulation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-primary border border-white/10">
                    Distance Simulation: 20/20 Clarity
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: 3-WAY HEAD-TO-HEAD COMPARISON (PANOPTIX vs VIVITY vs PURESEE) ── */}
      <section
        id="comparison"
        className="py-16 sm:py-24 relative overflow-hidden bg-[#0c0e14] scroll-mt-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a78bfa] mb-3">
              Head-to-Head Comparison
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              PanOptix® Pro vs. Clareon® Vivity® vs. TECNIS PureSee™.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Explore how trifocal diffractive optics differ from non-diffractive EDOF and pure
              refractive designs so you choose with complete clinical confidence.
            </p>
          </div>

          {/* 3 Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* PanOptix Card */}
            <div className="glass-card border-2 border-[#8b5cf6]/50 bg-[#8b5cf6]/[0.04] rounded-3xl p-6 sm:p-8 flex flex-col relative shadow-[0_0_40px_rgba(139,92,246,0.15)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8b5cf6] text-white text-[11px] font-bold uppercase tracking-wider">
                Full Trifocal Range
              </div>
              <h3 className="text-xl font-bold text-[#a78bfa] mt-2 mb-1">PanOptix® Pro</h3>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                Trifocal Diffractive IOL
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Best for patients whose highest priority is reading novels, menus, and smartphones
                without glasses, and are comfortable with brief neuroadaptation.
              </p>
              <div className="space-y-2 pt-4 border-t border-border/80 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Near Reading Focus:</span>
                  <span className="font-bold text-emerald-400">20/20 at 40 cm</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Spectacle Freedom:</span>
                  <span className="font-bold text-[#a78bfa]">
                    {renderFootnoteText('99% freedom reported [1]')}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Night Glare Profile:</span>
                  <span className="font-medium text-amber-400">Diffractive rings</span>
                </div>
              </div>
            </div>

            {/* Vivity Card */}
            <div className="glass-card border border-primary/30 bg-primary/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-[#060709] text-[11px] font-bold uppercase tracking-wider">
                Non-Diffractive EDOF
              </div>
              <h3 className="text-xl font-bold text-primary mt-2 mb-1">Clareon® Vivity®</h3>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                Extended Depth of Focus (EDOF)
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Best for frequent night drivers and screen workers wanting continuous intermediate
                focus with a monofocal-like night glare safety profile.
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
                  <span className="font-medium text-white/80">Occasional readers</span>
                </div>
              </div>
            </div>

            {/* PureSee Card */}
            <div className="glass-card border border-[#00a3ff]/30 bg-[#00a3ff]/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00a3ff] text-white text-[11px] font-bold uppercase tracking-wider">
                Pure Refractive EDOF
              </div>
              <h3 className="text-xl font-bold text-[#38bdf8] mt-2 mb-1">TECNIS PureSee™</h3>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                Refractive Extended Depth
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Best for patients seeking Johnson &amp; Johnson’s newest purely refractive EDOF
                optic with zero FDA contrast sensitivity warning.
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
                  <span className="font-medium text-white/80">Occasional readers</span>
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
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#a78bfa] w-1/4 bg-[#8b5cf6]/[0.06] border-x border-[#8b5cf6]/20">
                    PanOptix® Pro
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-primary w-1/4">
                    Clareon® Vivity®
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
                    <td className="p-4 sm:p-5 text-[#a78bfa] font-medium bg-[#8b5cf6]/[0.03] border-x border-[#8b5cf6]/10">
                      {renderFootnoteText(row.panoptix)}
                    </td>
                    <td className="p-4 sm:p-5 text-muted-foreground">
                      {renderFootnoteText(row.vivity)}
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
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a78bfa] mb-3">
              Patient Matching
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              Is Clareon PanOptix Pro the Right Choice for You?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Dr. Matthew Marano Jr. evaluates your lifestyle habits, hobbies, and corneal
              measurements before recommending an advanced intraocular lens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Left: When PanOptix is Ideal */}
            <div className="glass-card border border-[#8b5cf6]/30 bg-[#8b5cf6]/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
                  <Icon name="CheckCircleIcon" size={22} className="text-[#a78bfa]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    You Are an Ideal PanOptix Candidate If:
                  </h3>
                  <p className="text-xs text-muted-foreground">Maximum reading independence</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground flex-1">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Avid Reader &amp; Mobile User:</strong> You read
                    books in bed, review documents, text on smartphones, and want to discard reading
                    glasses.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Close Hobbyist:</strong> You enjoy cooking,
                    baking, sewing, crafts, woodworking, or card games that demand sharp near
                    detail.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Office &amp; Multi-Screen Professional:</strong>{' '}
                    You work across desktop monitors, laptops, and tablets throughout the day.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Healthy Cornea &amp; Retina:</strong> Normal
                    macular health with desire for full-range trifocal visual freedom.
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
                  <p className="text-xs text-muted-foreground">Alternative clinical pathways</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground flex-1">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Professional Night Driver:</strong>{' '}
                    {renderFootnoteText(
                      'If you are a commercial driver, pilot, or highly sensitive to night halos, Clareon Vivity is typically recommended [2].'
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Prefer Refractive EDOF:</strong>{' '}
                    {renderFootnoteText(
                      'Patients interested in Johnson & Johnson’s refractive EDOF design can evaluate the TECNIS PureSee [3].'
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Advanced Macular Disease:</strong> Patients with
                    significant macular degeneration or diabetic retinopathy are best served by
                    standard monofocal IOLs.
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
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a78bfa] mb-3">
                Precision Astigmatism Alignment
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
                Clareon<sup>®</sup> PanOptix<sup>®</sup> Toric +{' '}
                <span className="font-semibold text-gradient-primary">
                  LENSAR ALLY<sup>®</sup> Laser.
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {renderFootnoteText(
                  'Over 60% of cataract patients have corneal astigmatism that blurs light focus. Dr. Marano combines the Clareon PanOptix Toric IOL with the LENSAR ALLY Femtosecond Laser system to create sub-micron arcuate cuts and position the lens precisely along your eye’s steep axis [1].'
                )}
              </p>
              <div className="p-4 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 flex items-center gap-3.5 mb-6">
                <Icon name="SparklesIcon" size={24} className="text-[#a78bfa] shrink-0" />
                <p className="text-sm font-semibold text-white">
                  <strong className="text-[#a78bfa]">Toric Policy:</strong> At Marano Eye Care,
                  custom Toric astigmatism correction is included with all premium lenses at no
                  extra upgrade fee.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center shrink-0 text-[#a78bfa] font-bold">
                  3D
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    3D High-Res Corneal Reconstruction
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Automated Iris Registration and Streamline IV cyclotorsion tracking ensure
                    exact-degree rotational alignment.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">
                  0N
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Zero-Needle Topical Comfort</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Gentle numbing eye drops make the 10-minute outpatient procedure completely
                    comfortable without injections.
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
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a78bfa] mb-3">
              Clinical Questions Answered
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-4">
              Frequently Asked Questions About PanOptix Pro.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Clear clinical guidance from Board-Certified Surgeon Dr. Matthew Marano Jr., MD.
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
                          ? 'rotate-180 bg-[#8b5cf6]/10 border-[#8b5cf6] text-[#a78bfa]'
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
