'use client';

import React, { useState, useEffect } from 'react';
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
    puresee:
      '~100% transmitted light (Pure continuous refractive focus, zero diffractive loss) [3]',
    vivity:
      '~100% transmitted light utilization (Non-diffractive wavefront shaping, zero light splitting) [2]',
    panoptix:
      '88% light transmitted to retina (Highest efficiency among diffractive trifocals; 12% diffractive loss) [1]',
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
    question: 'What causes cataracts, and will the TECNIS PureSee lens ever need replacement?',
    answer:
      'A cataract forms in your eye’s natural crystalline lens as proteins break down and turn cloudy, yellow, and eventually brown and opaque. During surgery, Dr. Marano removes the cataractous natural lens and implants the clear acrylic TECNIS PureSee IOL. Because high-purity optical acrylic never ages or clouds, the lens provides lifetime optical clarity with a permanent, stable prescription that never changes.',
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

  useEffect(() => {
    trackEvent({
      action: 'lens_guide_view',
      category: 'Lens Guide',
      label: 'tecnis_puresee',
    });
  }, []);

  const handleNavClick = (ctaName: string) => {
    trackEvent({
      action: 'puresee_page_cta_click',
      category: 'Engagement',
      label: ctaName,
    });
  };

  const handleFaqClick = (index: number, question: string) => {
    const isOpening = activeFaq !== index;
    setActiveFaq(isOpening ? index : null);
    if (isOpening) {
      trackEvent({
        action: 'puresee_faq_expand',
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
            <span className="text-[#38bdf8] font-medium tracking-wide">
              TECNIS PureSee™ Clinical Guide
            </span>
          </nav>
          <div className="hidden md:flex items-center gap-3 text-xs font-mono font-medium">
            <a
              href="#optics"
              className="text-white/60 hover:text-[#38bdf8] transition-colors px-2.5 py-1 rounded-lg hover:bg-white/[0.03]"
            >
              Refractive Optics
            </a>
            <a
              href="#simulator"
              className="text-white/60 hover:text-[#38bdf8] transition-colors px-2.5 py-1 rounded-lg hover:bg-white/[0.03]"
            >
              3-Distance Acuity
            </a>
            <a
              href="#comparison"
              className="text-white/60 hover:text-[#38bdf8] transition-colors px-2.5 py-1 rounded-lg hover:bg-white/[0.03]"
            >
              3-Way Comparison
            </a>
            <a
              href="#candidates"
              className="text-white/60 hover:text-[#38bdf8] transition-colors px-2.5 py-1 rounded-lg hover:bg-white/[0.03]"
            >
              Candidacy
            </a>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION: Clinical Authority & Doppelrand Physical Showcase ── */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-[#08090e]">
        {/* Signature PureSee Crystalline Cyan & Violet Pattern */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-[#00a3ff]/[0.08] via-[#38bdf8]/[0.06] to-transparent rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute inset-0 grid-lines-bg opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-16 items-center">
            {/* Left Column: Clinical Positioning Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/30 text-[#38bdf8] text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.25em] mb-6 shadow-[0_0_20px_rgba(0,163,255,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#00a3ff] animate-pulse" />
                <span>Latest &amp; Most Cutting-Edge EDOF Technology</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.12] mb-6 tracking-tight">
                TECNIS PureSee™:{' '}
                <span className="font-semibold text-gradient-primary block mt-1">
                  Continuous Vision. Zero Contrast Compromise.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl font-light">
                The latest, most cutting-edge purely refractive extended depth of focus (EDOF) lens
                from Johnson &amp; Johnson MedTech, engineered with zero clinical contrast
                sensitivity warning. PureSee utilizes breakthrough continuous surface refraction to
                deliver seamless distance, intermediate, and functional near vision without
                diffractive rings.
              </p>

              {/* 4 Clinical Benefit Badges (Doppelrand Architecture) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-10 max-w-xl">
                <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm">
                  <div className="p-3 rounded-[calc(1rem-2px)] bg-black/40 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#00a3ff]/10 border border-[#00a3ff]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#38bdf8]">
                      <Icon name="ShieldCheckIcon" size={16} />
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
                </div>

                <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm">
                  <div className="p-3 rounded-[calc(1rem-2px)] bg-black/40 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                      <Icon name="BoltIcon" size={16} />
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
                </div>

                <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm">
                  <div className="p-3 rounded-[calc(1rem-2px)] bg-black/40 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                      <Icon name="EyeIcon" size={16} />
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
                  <span>Schedule PureSee Consultation</span>
                  <div className="ml-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <Icon name="ArrowRightIcon" size={12} className="text-black" />
                  </div>
                </a>
                <a
                  href="#comparison"
                  onClick={() => handleNavClick('hero_compare_jump')}
                  className="group inline-flex items-center justify-between sm:justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/[0.08] hover:border-[#00a3ff]/40 focus-visible:ring-2 focus-visible:ring-[#00a3ff] focus-visible:outline-none"
                >
                  <span>Compare with PanOptix &amp; Vivity</span>
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
                    src="/assets/images/puresee_iol_real.jpg"
                    alt="TECNIS PureSee Refractive Extended Depth of Focus IOL with Frosted 360 Edge Barrier"
                    fill
                    priority={true}
                    sizes="(max-width: 640px) 90vw, 440px"
                    className="object-cover relative z-10 scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />

                  {/* Optical Feature Floating Glass Pills */}
                  <div className="absolute top-5 left-5 z-20 px-3.5 py-1.5 rounded-full bg-black/80 border border-[#00a3ff]/40 backdrop-blur-xl text-[10px] font-mono font-bold text-[#38bdf8] tracking-widest uppercase shadow-lg">
                    Pure Refractive Zonal Optics
                  </div>
                  <div className="absolute bottom-5 right-5 z-20 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-xl text-[10px] font-mono font-medium text-white/90 tracking-widest uppercase shadow-lg">
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
        className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#06070a] scroll-mt-20"
      >
        <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-[#00a3ff]/[0.05] to-primary/[0.06] rounded-full blur-[170px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/20 text-[#38bdf8] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Optical Physics &amp; Bio-Engineering
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              How Pure Refraction Eliminates Diffractive Light Scatter.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
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

          {/* 3 Physics Pillars Grid (Doppelrand Nested Architecture) */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* Pillar 1 */}
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/[0.08] shadow-lg group hover:border-[#00a3ff]/40 transition-all duration-500"
            >
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#0c0e16] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-[#00a3ff]/10 border border-[#00a3ff]/20 flex items-center justify-center mb-6 text-[#38bdf8]">
                  <Icon name="SparklesIcon" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    1. Continuous Refractive Zonal Profile
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {renderFootnoteText(
                      'A smoothly curved anterior refractive surface creates an extended depth of focus without sharp diffractive steps, delivering continuous distance and intermediate vision with monofocal-like night comfort [3].'
                    )}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono font-bold text-[#38bdf8] uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00a3ff]" />
                  Zero Diffractive Rings
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
                  <Icon name="ShieldCheckIcon" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    2. Abbe 55 Chromatic Clarity
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {renderFootnoteText(
                      'Engineered with Johnson & Johnson’s patented hydrophobic acrylic material featuring an industry-leading Abbe number of 55 for minimum chromatic aberration and superior edge contrast in dim lighting [3].'
                    )}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Full Contrast Preservation
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
                  <Icon name="EyeIcon" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    3. 360° Continuous Square Edge
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {renderFootnoteText(
                      'A continuous 360-degree frosted posterior square edge acts as a physical barrier against lens epithelial cell migration, dramatically reducing long-term capsular opacification (PCO) rates [3].'
                    )}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Long-Term Capsular Stability
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/20 text-[#38bdf8] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Real-World Vision Simulator
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              Experience the Visual Clarity of TECNIS PureSee.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
              Toggle across distances to preview the sharp, contrast-rich visual acuity delivered by
              TECNIS PureSee purely refractive optics.
            </p>
          </div>

          {/* Interactive Distance Tabs Container (Doppelrand Lab Apparatus) */}
          <div className="max-w-4xl mx-auto p-2 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.08] shadow-2xl">
            <div className="rounded-[calc(2.5rem-8px)] bg-[#07090d] p-6 sm:p-10 border border-white/[0.04]">
              {/* Tab Navigation */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 rounded-full bg-black/60 border border-white/10 max-w-xl mx-auto">
                <button
                  onClick={() => {
                    setSelectedDistanceTab('distance');
                    trackEvent({
                      action: 'puresee_simulator_tab',
                      category: 'Engagement',
                      label: 'distance',
                    });
                  }}
                  className={`flex-1 min-w-[120px] py-3 px-5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#00a3ff] focus-visible:outline-none ${
                    selectedDistanceTab === 'distance'
                      ? 'bg-gradient-to-r from-[#fff3d6] via-[#f7d492] to-[#d1ab60] text-black shadow-[0_2px_14px_rgba(197,160,89,0.4)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
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
                  className={`flex-1 min-w-[120px] py-3 px-5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#00a3ff] focus-visible:outline-none ${
                    selectedDistanceTab === 'intermediate'
                      ? 'bg-gradient-to-r from-[#fff3d6] via-[#f7d492] to-[#d1ab60] text-black shadow-[0_2px_14px_rgba(197,160,89,0.4)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
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
                  className={`flex-1 min-w-[120px] py-3 px-5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 touch-manipulation active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#00a3ff] focus-visible:outline-none ${
                    selectedDistanceTab === 'near'
                      ? 'bg-gradient-to-r from-[#fff3d6] via-[#f7d492] to-[#d1ab60] text-black shadow-[0_2px_14px_rgba(197,160,89,0.4)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                >
                  3. Near (Functional)
                </button>
              </div>

              {/* Active Distance Detail */}
              {selectedDistanceTab === 'distance' && (
                <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/30 text-[#38bdf8] text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      Visual Acuity: 20/20 Crisp
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-4">
                      Distance Vision: Driving, Golf &amp; Outdoors
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6 font-light">
                      {renderFootnoteText(
                        'TECNIS PureSee provides uncompromised 20/20 binocular distance vision. Driving on highways, reading street signs, enjoying golf ball trajectory, and scenic vistas remain crisp and vivid with maximum contrast [3].'
                      )}
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                      <li className="flex items-center gap-2.5">
                        <Icon
                          name="CheckCircleIcon"
                          size={16}
                          className="text-[#38bdf8] shrink-0"
                        />
                        <span>Clear highway signs, traffic, and open-road driving</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Icon
                          name="CheckCircleIcon"
                          size={16}
                          className="text-[#38bdf8] shrink-0"
                        />
                        <span>Outdoor sports, tennis, golf tracking, and panoramic views</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <AppImage
                      src="/assets/images/day_driving_pro.jpg"
                      alt="TECNIS PureSee daytime crisp distance driving simulation"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#38bdf8] border border-white/10">
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
                      Intermediate: Computer Screens &amp; Dashboards
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6 font-light">
                      {renderFootnoteText(
                        'PureSee delivers continuous, uninterrupted focus across the intermediate range. Enjoy hours on desktop monitors, laptops, car dashboards, and GPS navigation without eye strain or glasses [3].'
                      )}
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                      <li className="flex items-center gap-2.5">
                        <Icon name="CheckCircleIcon" size={16} className="text-primary shrink-0" />
                        <span>Full workday on laptops and monitors with natural posture</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Icon name="CheckCircleIcon" size={16} className="text-primary shrink-0" />
                        <span>GPS maps, speedometer, cooking, and grocery shopping</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <AppImage
                      src="/assets/images/sharp_day_intermediate_pro.jpg"
                      alt="TECNIS PureSee daytime intermediate workspace and dashboard simulation"
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
                      PureSee provides solid functional near vision for quick glances at your phone,
                      checking text messages, smartwatches, restaurant menus, and receipts. For
                      prolonged reading of fine novel print in dim lighting, lightweight readers
                      remain helpful.
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
                        <span className="text-muted-foreground">
                          Optional lightweight readers for prolonged fine novel reading in dim light
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <AppImage
                      src="/assets/images/vivity_day_near_pro.png"
                      alt="TECNIS PureSee daytime near reading smartphone and menu clarity"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-primary border border-white/10">
                      Near: Smartphone &amp; Menus
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: 3-WAY HEAD-TO-HEAD COMPARISON (PURESEE vs PANOPTIX vs VIVITY) ── */}
      <section
        id="comparison"
        className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[#0c0e14] scroll-mt-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,163,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/20 text-[#38bdf8] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Head-to-Head Comparison
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              TECNIS PureSee™ vs. PanOptix® Pro vs. Clareon® Vivity®.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
              Explore how pure continuous refraction contrasts with wavefront shaping and
              diffractive trifocal optics to match your precise lifestyle demands.
            </p>
          </div>

          {/* 3 Summary Cards (Doppelrand Architecture with PureSee Spotlight) */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-14 pt-4">
            {/* PureSee Card (Featured Spotlight) */}
            <div className="p-1.5 rounded-[2rem] bg-gradient-to-b from-[#00a3ff]/30 via-[#00a3ff]/10 to-transparent border border-[#00a3ff]/40 shadow-[0_0_50px_rgba(0,163,255,0.2)] relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-[#00a3ff] text-white text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                Latest EDOF
              </div>
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#080d16] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <h3 className="text-xl font-bold text-[#38bdf8] mt-2 mb-1">TECNIS PureSee™</h3>
                  <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                    Latest Refractive Extended Depth
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
                    The latest, most cutting-edge refractive EDOF lens, best for patients seeking
                    maximum low-light contrast sensitivity, zero diffractive rings, and high optical
                    clarity for screens and driving.
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
                      {renderFootnoteText('Zero FDA warning [3]')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Intermediate Focus:</span>
                    <span className="font-bold text-primary font-mono">20/20 to 20/25</span>
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
                    Best for active drivers and screen workers wanting smooth wavefront-extended
                    focus with a monofocal-like halo safety record.
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
                    Best for patients who prioritize reading novels and fine print without glasses
                    and are comfortable with minor night halos.
                  </p>
                </div>
                <div className="space-y-2 pt-4 border-t border-white/[0.08] text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Night Glare Profile:</span>
                    <span className="font-bold text-amber-400 font-mono">Noticeable rings</span>
                  </div>
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
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden items-center justify-end gap-1.5 text-[11px] text-muted-foreground mb-3 px-1 font-mono">
            <Icon name="ArrowsRightLeftIcon" size={13} className="text-[#38bdf8] animate-pulse" />
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
                  <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] w-1/4 bg-[#00a3ff]/[0.08] border-x border-[#00a3ff]/30">
                    TECNIS PureSee™
                  </th>
                  <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-primary w-1/4">
                    Clareon® Vivity®
                  </th>
                  <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-[#a78bfa] w-1/4">
                    PanOptix® Pro
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                {comparisonMetrics.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-5 font-semibold text-white/90">
                      {renderFootnoteText(row.title)}
                    </td>
                    <td className="p-5 text-[#38bdf8] font-medium bg-[#00a3ff]/[0.03] border-x border-[#00a3ff]/20 font-mono text-xs sm:text-[13px]">
                      {renderFootnoteText(row.puresee)}
                    </td>
                    <td className="p-5 text-muted-foreground font-light text-xs sm:text-[13px]">
                      {renderFootnoteText(row.vivity)}
                    </td>
                    <td className="p-5 text-muted-foreground font-light text-xs sm:text-[13px]">
                      {renderFootnoteText(row.panoptix)}
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/20 text-[#38bdf8] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Patient Matching
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
              Is TECNIS PureSee the Right Choice for You?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
              Dr. Matthew Marano Jr. examines your corneal curvature, lifestyle habits, and visual
              needs before personalizing your IOL recommendation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* Left: When PureSee is Ideal */}
            <div className="p-1.5 rounded-[2rem] bg-[#00a3ff]/[0.04] border border-[#00a3ff]/30 shadow-xl">
              <div className="h-full rounded-[calc(2rem-6px)] bg-[#080d16] p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-8">
                    <div className="w-11 h-11 rounded-2xl bg-[#00a3ff]/10 border border-[#00a3ff]/20 flex items-center justify-center shrink-0 text-[#38bdf8]">
                      <Icon name="CheckCircleIcon" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        You Are an Ideal PureSee Candidate If:
                      </h3>
                      <p className="text-xs text-[#38bdf8]/90 font-mono uppercase tracking-wider">
                        High contrast &amp; glare-sensitive
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-xs sm:text-sm text-muted-foreground font-light">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">Frequent Night Driver:</strong>{' '}
                        You drive frequently after dusk and demand zero diffractive glare rings or
                        halos around headlights.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Demand Peak Contrast in Dim Light:
                        </strong>{' '}
                        You enjoy restaurants, stargazing, twilight walks, and want maximum contrast
                        sensitivity.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">Digital Professional:</strong>{' '}
                        You spend hours working across desktop displays, laptops, and tablets.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">Mild Corneal Nuances:</strong>{' '}
                        Patients with mild ocular surface irregularities who cannot tolerate
                        diffractive rings thrive with PureSee.
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
                          Need 100% Near Reading Independence:
                        </strong>{' '}
                        {renderFootnoteText(
                          'If your goal is reading fine novel print in bed with zero reading glasses, Clareon PanOptix Pro is preferred [1].'
                        )}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">
                          Prefer Wavefront-Shaping Optics:
                        </strong>{' '}
                        {renderFootnoteText(
                          'Patients seeking Alcon’s non-diffractive X-WAVE plateau technology can choose Clareon Vivity [2].'
                        )}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>
                        <strong className="text-white font-medium">Severe Retinal Disease:</strong>{' '}
                        Patients with advanced maculopathy are best served by standard monofocal
                        lenses.
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/20 text-[#38bdf8] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
                Precision Astigmatism Alignment
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 tracking-tight">
                TECNIS PureSee™ Toric II +{' '}
                <span className="font-semibold text-gradient-primary">
                  LENSAR ALLY<sup>®</sup> Laser.
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 font-light max-w-xl">
                {renderFootnoteText(
                  'Over 60% of cataract patients have corneal astigmatism. Dr. Marano pairs the TECNIS PureSee Toric II lens with the LENSAR ALLY Femtosecond Laser system to create sub-micron arcuate incisions and align the lens with exact-degree rotational accuracy [3].'
                )}
              </p>
              <div className="p-1 rounded-2xl bg-gradient-to-r from-[#00a3ff]/30 to-transparent border border-[#00a3ff]/30 shadow-lg mb-4 max-w-xl">
                <div className="p-4 rounded-[calc(1rem-2px)] bg-[#0a0c12] flex items-center gap-3.5">
                  <Icon name="SparklesIcon" size={24} className="text-[#38bdf8] shrink-0" />
                  <p className="text-sm font-medium text-white">
                    <strong className="text-[#38bdf8] font-bold">Toric Policy:</strong> At Marano
                    Eye Care, custom Toric astigmatism correction is included with all premium
                    lenses at no extra upgrade fee.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-1.5 rounded-[1.75rem] bg-white/[0.02] border border-white/10 shadow-lg">
                <div className="p-5 rounded-[calc(1.75rem-6px)] bg-[#07090d] flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#00a3ff]/10 border border-[#00a3ff]/20 flex items-center justify-center shrink-0 text-[#38bdf8] font-mono font-bold text-sm">
                    3D
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      3D High-Res Corneal Reconstruction
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                      Automated Iris Registration and Streamline IV cyclotorsion tracking guarantee
                      precision alignment.
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/20 text-[#38bdf8] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-4">
              Clinical Questions Answered
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5 tracking-tight">
              Frequently Asked Questions About TECNIS PureSee.
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
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] focus-visible:ring-2 focus-visible:ring-[#00a3ff] focus-visible:outline-none transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-medium text-foreground">
                        {faq.question}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? 'rotate-180 bg-[#00a3ff] text-white font-bold border-[#00a3ff]'
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
