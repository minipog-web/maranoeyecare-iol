'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';
import { handleSpotlightMouseMove, renderFootnoteText } from '@/lib/ui';

interface ComparisonMetric {
  title: string;
  puresee: string;
  vivity: string;
  panoptix: string;
}

const comparisonMetrics: ComparisonMetric[] = [
  {
    title: 'Optical Design',
    puresee: 'Proprietary Refractive EDOF Surface Zonal Optics [3]',
    vivity: 'X-WAVE™ Non-Diffractive Wavefront Shaping [2]',
    panoptix: 'ENLIGHTEN® Diffractive Trifocal (Concentric Rings) [1]',
  },
  {
    title: 'Light Transmission Efficiency',
    puresee: '~100% transmitted light utilization (Zero diffractive light splitting) [3]',
    vivity: '~100% transmitted light utilization (Zero light splitting) [2]',
    panoptix: '88% transmitted light (12% energy lost to diffractive scatter) [1]',
  },
  {
    title: 'FDA Contrast Sensitivity Status',
    puresee: 'Zero FDA contrast sensitivity deficit warning [3]',
    vivity: 'Statistically comparable to standard monofocal control [2]',
    panoptix: 'Slight reduction due to diffractive energy splitting [1]',
  },
  {
    title: 'Distance Clarity (Driving, Outdoor Views)',
    puresee: '20/20 Binocular Crisp Distance Vision [3]',
    vivity: '20/20 Binocular Crisp Distance Vision [2]',
    panoptix: '20/20 Binocular Crisp Distance Vision [1]',
  },
  {
    title: 'Intermediate Clarity (Computer, Dashboard, Cooking)',
    puresee: '20/20 – 20/25 Continuous Extended Focus (Arm’s length) [3]',
    vivity: '20/20 – 20/25 Continuous Extended Focus (66 cm corridor) [2]',
    panoptix: 'Dedicated 20/20 Focal Peak at 60 cm [1]',
  },
  {
    title: 'Near Vision (Smartphones, Menus, Books)',
    puresee: 'Functional Near (~20/32–20/40); readers for small fine print',
    vivity: 'Functional Near (~20/32–20/40); readers for small fine print',
    panoptix: 'High Spectacle Independence (20/20 at 40 cm) [1]',
  },
  {
    title: 'Night Glare & Halos Profile',
    puresee: 'Monofocal-like dysphotopsia profile (Zero concentric rings) [3]',
    vivity: 'Monofocal-like (<2% severe halos in FDA trials) [2]',
    panoptix: 'Noticeable diffractive rings around oncoming headlights [1]',
  },
  {
    title: 'Material & Chromatic Aberration',
    puresee: 'High Abbe Number (55) patented hydrophobic acrylic [3]',
    vivity: 'Clareon 0.0 glistening hydrophobic acrylic [2]',
    panoptix: 'Clareon 0.0 glistening hydrophobic acrylic [1]',
  },
  {
    title: 'Neuroadaptation Timeline',
    puresee: 'Immediate to few days (Continuous refractive surface) [3]',
    vivity: 'Immediate to few days (Smooth wavefront channel) [2]',
    panoptix: '2 to 8 weeks as brain adapts to trifocal optics [1]',
  },
];

const faqs = [
  {
    question: 'What makes TECNIS PureSee different from other EDOF lenses?',
    answer:
      'Unlike older EDOF lenses that relied on diffractive rings or light splitting, TECNIS PureSee is purely refractive. It utilizes proprietary continuous surface refraction to harness 100% of incoming light without diffractive scatter. It is the first FDA-approved EDOF lens with zero clinical contrast sensitivity loss warning [3].',
  },
  {
    question: 'How does night driving compare with TECNIS PureSee?',
    answer:
      'Because PureSee has zero diffractive rings, its dysphotopsia profile (night glare and halos) is statistically comparable to a standard monofocal lens. Patients can drive at night on highways and in rainy conditions with excellent confidence and comfort [3].',
  },
  {
    question: 'Will I need reading glasses with TECNIS PureSee?',
    answer:
      'TECNIS PureSee delivers sharp 20/20 distance vision and continuous 20/20 to 20/25 intermediate vision for computer monitors, car dashboards, laptops, and tablets. It also provides functional near vision for smartphones and restaurant menus. For sustained reading of small paperback books or fine medicine print in dim lighting, lightweight readers may occasionally be used.',
  },
  {
    question: 'Is there a Toric option for astigmatism with TECNIS PureSee?',
    answer:
      'Yes. The TECNIS PureSee Toric II lens corrects corneal astigmatism with squared-edge haptics for rotational stability. At Marano Eye Care, Dr. Matthew Marano Jr. provides custom Toric upgrades on all premium lenses with zero extra upgrade fees.',
  },
  {
    question: 'What is the Abbe number and why does Abbe 55 matter?',
    answer:
      'The Abbe number measures optical dispersion. A higher Abbe number means lower chromatic aberration (less color distortion and sharper edge contrast). PureSee is engineered from Johnson & Johnson’s proprietary biomaterial with an Abbe number of 55, providing superior optical clarity and color fidelity in both bright daylight and dim evening conditions [3].',
  },
  {
    question: 'How fast is recovery after TECNIS PureSee cataract surgery?',
    answer:
      'Dr. Matthew Marano Jr. performs outpatient laser cataract surgery in approximately 10 minutes using gentle zero-needle numbing eye drops. Most patients notice clear vision within 24 to 48 hours and can resume light driving and work the following day.',
  },
];

export default function PureSeePageClient() {
  const [selectedDistanceTab, setSelectedDistanceTab] = useState<
    'near' | 'intermediate' | 'distance'
  >('intermediate');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleNavClick = (ctaName: string) => {
    trackEvent({
      action: 'puresee_page_cta_click',
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
            <span className="text-[#38bdf8] font-semibold">TECNIS PureSee™</span>
          </nav>
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
            <a href="#optics" className="text-white/70 hover:text-[#38bdf8] transition-colors">
              Refractive Optics
            </a>
            <a href="#simulator" className="text-white/70 hover:text-[#38bdf8] transition-colors">
              3-Distance Acuity
            </a>
            <a href="#comparison" className="text-white/70 hover:text-[#38bdf8] transition-colors">
              3-Way Comparison
            </a>
            <a href="#candidates" className="text-white/70 hover:text-[#38bdf8] transition-colors">
              Candidacy
            </a>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#07080b] via-[#090e18] to-[#07080b] border-b border-border/40">
        {/* Optical Ray Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,163,255,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Clinical Positioning Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/30 text-[#38bdf8] text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00a3ff] animate-pulse" />
                <span>Purely Refractive EDOF Innovation</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.12] mb-6">
                TECNIS PureSee™:{' '}
                <span className="font-semibold text-gradient-primary">
                  Continuous Vision. Zero Contrast Compromise.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                The world’s premier purely refractive extended depth of focus (EDOF) lens with zero
                clinical contrast sensitivity warning. PureSee utilizes continuous surface
                refraction to deliver seamless distance, intermediate, and functional near vision
                without diffractive rings.
              </p>

              {/* 4 Clinical Benefit Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5 w-full mb-8 max-w-xl">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#00a3ff]/10 border border-[#00a3ff]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="ShieldCheckIcon" size={16} className="text-[#38bdf8]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Zero Contrast Warning
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      {renderFootnoteText('First FDA EDOF with 0 warning [3]')}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="BoltIcon" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      100% Light Energy
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      Zero diffractive light scatter
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="EyeIcon" size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Abbe Number 55
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      Lowest chromatic aberration [3]
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
                  Schedule PureSee Consultation
                </a>
                <a
                  href="#comparison"
                  onClick={() => handleNavClick('hero_compare_jump')}
                  className="px-6 py-4 rounded-xl border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-[#00a3ff]/40 text-sm font-bold uppercase tracking-wider transition-all duration-300 text-center flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#00a3ff] focus-visible:outline-none"
                >
                  <span>Compare with PanOptix &amp; Vivity</span>
                  <Icon name="ArrowDownIcon" size={14} />
                </a>
              </div>
            </div>

            {/* Right Column: High-Res Lens Physical Model Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-[36px] bg-gradient-to-b from-white/[0.06] to-transparent p-1 border border-white/10 shadow-2xl overflow-hidden group">
                <div className="w-full h-full rounded-[34px] bg-[#07080b] relative overflow-hidden flex items-center justify-center p-6">
                  <AppImage
                    src="/assets/images/puresee_iol_clean.png"
                    alt="TECNIS PureSee Refractive Extended Depth of Focus IOL with Frosted 360 Edge Barrier"
                    width={400}
                    height={400}
                    priority={true}
                    className="object-contain relative z-10 scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Optical Feature Pill Callouts */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/80 border border-[#00a3ff]/40 backdrop-blur-md text-[10px] font-bold text-[#38bdf8] tracking-wider uppercase">
                    Pure Refractive Zonal Optics
                  </div>
                  <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-[10px] font-semibold text-white/90 tracking-wider uppercase">
                    360° PCO Square Barrier
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: THE OPTICAL PHYSICS OF PURE REFRACTION ── */}
      <section
        id="optics"
        className="py-16 sm:py-24 relative overflow-hidden bg-[#06070a] scroll-mt-20"
      >
        <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00a3ff]/4 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#38bdf8] mb-3">
              Optical Physics &amp; Bio-Engineering
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              How Pure Refraction Eliminates Diffractive Light Scatter.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Traditional multifocal and diffractive lenses divide incoming light with microscopic
              grooved concentric rings. TECNIS PureSee re-engineers the anterior surface with
              smooth, continuous refractive power progression, transmitting 100% of light energy to
              the retina with zero diffractive scatter{' '}
              <sup className="text-[10px] font-bold text-primary inline-block ml-0.5">
                <a href="#footnote-3" className="text-primary hover:underline font-bold">
                  [3]
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
              className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-[#00a3ff]/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#00a3ff]/10 border border-[#00a3ff]/20 flex items-center justify-center mb-6 text-[#38bdf8]">
                <Icon name="SparklesIcon" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                1. Continuous Refractive Zonal Profile
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {renderFootnoteText(
                  'A smoothly curved anterior refractive surface creates an extended depth of focus without sharp diffractive steps, delivering continuous distance and intermediate vision with monofocal-like night comfort [3].'
                )}
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-semibold text-[#38bdf8] uppercase tracking-wider">
                Zero Diffractive Rings
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-primary/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                <Icon name="ShieldCheckIcon" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                2. Abbe 55 Chromatic Clarity
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {renderFootnoteText(
                  'Engineered with Johnson & Johnson’s patented hydrophobic acrylic material featuring an industry-leading Abbe number of 55 for minimum chromatic aberration and superior edge contrast in dim lighting [3].'
                )}
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-semibold text-primary uppercase tracking-wider">
                Full Contrast Preservation
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                <Icon name="EyeIcon" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                3. 360° Continuous Square Edge
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {renderFootnoteText(
                  'A continuous 360-degree frosted posterior square edge acts as a physical barrier against lens epithelial cell migration, dramatically reducing long-term capsular opacification (PCO) rates [3].'
                )}
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Long-Term Capsular Stability
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
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#38bdf8] mb-3">
              Real-World Vision Simulator
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              Experience the Visual Clarity of TECNIS PureSee.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Toggle across distances to preview the sharp, contrast-rich visual acuity delivered by
              TECNIS PureSee purely refractive optics.
            </p>
          </div>

          {/* Interactive Distance Tabs Container */}
          <div className="max-w-4xl mx-auto bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            {/* Tab Navigation */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
              <button
                onClick={() => {
                  setSelectedDistanceTab('distance');
                  trackEvent({
                    action: 'puresee_simulator_tab',
                    category: 'Engagement',
                    label: 'distance',
                  });
                }}
                className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedDistanceTab === 'distance'
                    ? 'bg-[#00a3ff] text-white shadow-lg shadow-[#00a3ff]/25 font-extrabold'
                    : 'text-muted-foreground hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                1. Distance (6m+)
              </button>
              <button
                onClick={() => {
                  setSelectedDistanceTab('intermediate');
                  trackEvent({
                    action: 'puresee_simulator_tab',
                    category: 'Engagement',
                    label: 'intermediate',
                  });
                }}
                className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedDistanceTab === 'intermediate'
                    ? 'bg-[#00a3ff] text-white shadow-lg shadow-[#00a3ff]/25 font-extrabold'
                    : 'text-muted-foreground hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                2. Intermediate (66 cm)
              </button>
              <button
                onClick={() => {
                  setSelectedDistanceTab('near');
                  trackEvent({
                    action: 'puresee_simulator_tab',
                    category: 'Engagement',
                    label: 'near',
                  });
                }}
                className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedDistanceTab === 'near'
                    ? 'bg-[#00a3ff] text-white shadow-lg shadow-[#00a3ff]/25 font-extrabold'
                    : 'text-muted-foreground hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                3. Near (Functional)
              </button>
            </div>

            {/* Active Distance Detail */}
            {selectedDistanceTab === 'distance' && (
              <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/30 text-[#38bdf8] text-xs font-bold uppercase tracking-wider mb-4">
                    Visual Acuity: 20/20 Crisp
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                    Distance Vision: Driving, Golf &amp; Outdoors
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                    {renderFootnoteText(
                      'TECNIS PureSee provides uncompromised 20/20 binocular distance vision. Driving on highways, reading street signs, enjoying golf ball trajectory, and scenic vistas remain crisp and vivid with maximum contrast [3].'
                    )}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-[#38bdf8]" />
                      <span>Clear highway signs, traffic, and open-road driving</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-[#38bdf8]" />
                      <span>Outdoor sports, tennis, golf tracking, and panoramic views</span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <AppImage
                    src="/assets/images/day_driving_pro.jpg"
                    alt="TECNIS PureSee daytime crisp distance driving simulation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-[#38bdf8] border border-white/10">
                    Distance Simulation: 20/20 Clarity
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
                    Intermediate: Computer Screens &amp; Dashboards
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                    {renderFootnoteText(
                      'PureSee delivers continuous, uninterrupted focus across the intermediate range. Enjoy hours on desktop monitors, laptops, car dashboards, and GPS navigation without eye strain or glasses [3].'
                    )}
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-primary" />
                      <span>Full workday on laptops and monitors with natural posture</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-primary" />
                      <span>GPS maps, speedometer, cooking, and grocery shopping</span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <AppImage
                    src="/assets/images/sharp_day_intermediate_pro.jpg"
                    alt="TECNIS PureSee daytime intermediate workspace and dashboard simulation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-primary border border-white/10">
                    Intermediate Simulation: Screens &amp; Dashboard
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
                    PureSee provides solid functional near vision for quick glances at your phone,
                    checking text messages, smartwatches, restaurant menus, and receipts. For
                    prolonged reading of fine novel print in dim lighting, lightweight readers
                    remain helpful.
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
                        Optional lightweight readers for prolonged fine novel reading in dim light
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <AppImage
                    src="/assets/images/vivity_day_near_pro.png"
                    alt="TECNIS PureSee daytime near reading smartphone and menu clarity"
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

      {/* ── SECTION 3: 3-WAY HEAD-TO-HEAD COMPARISON (PURESEE vs PANOPTIX vs VIVITY) ── */}
      <section
        id="comparison"
        className="py-16 sm:py-24 relative overflow-hidden bg-[#0c0e14] scroll-mt-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,163,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#38bdf8] mb-3">
              Head-to-Head Comparison
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              TECNIS PureSee™ vs. PanOptix® Pro vs. Clareon® Vivity®.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Explore how pure continuous refraction contrasts with wavefront shaping and
              diffractive trifocal optics to match your precise lifestyle demands.
            </p>
          </div>

          {/* 3 Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* PureSee Card */}
            <div className="glass-card border-2 border-[#00a3ff]/50 bg-[#00a3ff]/[0.04] rounded-3xl p-6 sm:p-8 flex flex-col relative shadow-[0_0_40px_rgba(0,163,255,0.15)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00a3ff] text-white text-[11px] font-bold uppercase tracking-wider">
                Pure Refractive EDOF
              </div>
              <h3 className="text-xl font-bold text-[#38bdf8] mt-2 mb-1">TECNIS PureSee™</h3>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                Refractive Extended Depth
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Best for patients seeking maximum low-light contrast sensitivity, zero diffractive
                rings, and high optical clarity for screens and driving.
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
                  <span className="text-muted-foreground">Intermediate Focus:</span>
                  <span className="font-bold text-primary">20/20 to 20/25</span>
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
                Best for active drivers and screen workers wanting smooth wavefront-extended focus
                with a monofocal-like halo safety record.
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

            {/* PanOptix Card */}
            <div className="glass-card border border-[#8b5cf6]/30 bg-[#8b5cf6]/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8b5cf6] text-white text-[11px] font-bold uppercase tracking-wider">
                Full Trifocal Range
              </div>
              <h3 className="text-xl font-bold text-[#a78bfa] mt-2 mb-1">PanOptix® Pro</h3>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                Trifocal Diffractive IOL
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Best for patients who prioritize reading novels and fine print without glasses and
                are comfortable with minor night halos.
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
          </div>

          {/* Full Side-by-Side Specifications Matrix Table */}
          <div className="w-full overflow-x-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-muted-foreground w-1/4">
                    Comparison Parameter
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#38bdf8] w-1/4 bg-[#00a3ff]/[0.06] border-x border-[#00a3ff]/20">
                    TECNIS PureSee™
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-primary w-1/4">
                    Clareon® Vivity®
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#a78bfa] w-1/4">
                    PanOptix® Pro
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                {comparisonMetrics.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white/90">
                      {renderFootnoteText(row.title)}
                    </td>
                    <td className="p-4 sm:p-5 text-[#38bdf8] font-medium bg-[#00a3ff]/[0.03] border-x border-[#00a3ff]/10">
                      {renderFootnoteText(row.puresee)}
                    </td>
                    <td className="p-4 sm:p-5 text-muted-foreground">
                      {renderFootnoteText(row.vivity)}
                    </td>
                    <td className="p-4 sm:p-5 text-muted-foreground">
                      {renderFootnoteText(row.panoptix)}
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
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#38bdf8] mb-3">
              Patient Matching
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
              Is TECNIS PureSee the Right Choice for You?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Dr. Matthew Marano Jr. examines your corneal curvature, lifestyle habits, and visual
              needs before personalizing your IOL recommendation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Left: When PureSee is Ideal */}
            <div className="glass-card border border-[#00a3ff]/30 bg-[#00a3ff]/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#00a3ff]/10 flex items-center justify-center shrink-0">
                  <Icon name="CheckCircleIcon" size={22} className="text-[#38bdf8]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    You Are an Ideal PureSee Candidate If:
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    High contrast &amp; glare-sensitive
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground flex-1">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Frequent Night Driver:</strong> You drive
                    frequently after dusk and demand zero diffractive glare rings or halos around
                    headlights.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Demand Peak Contrast in Dim Light:</strong> You
                    enjoy restaurants, stargazing, twilight walks, and want maximum contrast
                    sensitivity.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Digital Professional:</strong> You spend hours
                    working across desktop displays, laptops, and tablets.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Mild Corneal Nuances:</strong> Patients with mild
                    ocular surface irregularities who cannot tolerate diffractive rings thrive with
                    PureSee.
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
                    <strong className="text-white">Need 100% Near Reading Independence:</strong>{' '}
                    {renderFootnoteText(
                      'If your goal is reading fine novel print in bed with zero reading glasses, Clareon PanOptix Pro is preferred [1].'
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Prefer Wavefront-Shaping Optics:</strong>{' '}
                    {renderFootnoteText(
                      'Patients seeking Alcon’s non-diffractive X-WAVE plateau technology can choose Clareon Vivity [2].'
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Severe Retinal Disease:</strong> Patients with
                    advanced maculopathy are best served by standard monofocal lenses.
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
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#38bdf8] mb-3">
                Precision Astigmatism Alignment
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
                TECNIS PureSee™ Toric II +{' '}
                <span className="font-semibold text-gradient-primary">
                  LENSAR ALLY<sup>®</sup> Laser.
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {renderFootnoteText(
                  'Over 60% of cataract patients have corneal astigmatism. Dr. Marano pairs the TECNIS PureSee Toric II lens with the LENSAR ALLY Femtosecond Laser system to create sub-micron arcuate incisions and align the lens with exact-degree rotational accuracy [3].'
                )}
              </p>
              <div className="p-4 rounded-2xl bg-[#00a3ff]/10 border border-[#00a3ff]/30 flex items-center gap-3.5 mb-6">
                <Icon name="SparklesIcon" size={24} className="text-[#38bdf8] shrink-0" />
                <p className="text-sm font-semibold text-white">
                  <strong className="text-[#38bdf8]">Toric Policy:</strong> At Marano Eye Care,
                  custom Toric astigmatism correction is included with all premium lenses at no
                  extra upgrade fee.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00a3ff]/10 flex items-center justify-center shrink-0 text-[#38bdf8] font-bold">
                  3D
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    3D High-Res Corneal Reconstruction
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Automated Iris Registration and Streamline IV cyclotorsion tracking guarantee
                    precision alignment.
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
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#38bdf8] mb-3">
              Clinical Questions Answered
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-4">
              Frequently Asked Questions About TECNIS PureSee.
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
                          ? 'rotate-180 bg-[#00a3ff]/10 border-[#00a3ff] text-[#38bdf8]'
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
