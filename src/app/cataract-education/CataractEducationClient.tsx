'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';

interface ProgressionStage {
  id: number;
  label: string;
  badge: string;
  stageName: string;
  lensState: string;
  colorGrade: string;
  description: string;
  biologicalMechanism: string;
  visualSymptoms: string[];
  patientImpact: string;
  lensVisualClass: string;
  patientVisionClass: string;
  patientVisionLabel: string;
  opticalTransmission: string;
  doctorNote: string;
}

const progressionStages: ProgressionStage[] = [
  {
    id: 1,
    label: 'Youthful Lens',
    badge: 'Stage 1 · Baseline',
    stageName: 'Clear Natural Crystalline Lens',
    lensState: 'Healthy Biological Lens',
    colorGrade: '100% Transparent · Soluble Crystallin Proteins',
    description:
      'Inside the young eye, the natural crystalline lens is completely transparent and flexible. Specialized crystallin proteins are organized in an orderly, lattice-like pattern that allows 100% of light rays to pass freely onto the retina.',
    biologicalMechanism:
      'Youthful crystallin proteins remain perfectly hydrated and soluble, maintaining zero light scatter and sharp focus at all distances.',
    visualSymptoms: [
      'Vivid, true-to-life color saturation',
      'Crisp high-contrast edge definition',
      'Zero halos or glare around night lights',
      'Effortless adaptation in bright sunlight',
    ],
    patientImpact: 'Optimal, uninterrupted clarity across all daily tasks.',
    lensVisualClass: 'from-cyan-400/20 via-blue-500/10 to-transparent border-cyan-400/30',
    patientVisionClass: 'filter-none',
    patientVisionLabel: 'Vivid High-Contrast HD Clarity (100% Sharp)',
    opticalTransmission: '99% Light Transmission',
    doctorNote:
      'In our 20s and 30s, the natural lens functions like a pristine camera lens, bending light effortlessly onto the macula.',
  },
  {
    id: 2,
    label: 'Early Clouding',
    badge: 'Stage 2 · Early Onset',
    stageName: 'Protein Breakdown & Micro-Clouding',
    lensState: 'Early Cataractous Changes',
    colorGrade: 'Mild Haze · Protein Clumping Begins',
    description:
      'With age and cumulative UV/oxidative stress, the delicate crystallin proteins in the natural lens begin to break down, denature, and clump together. Microscopic cloudy patches form within the crystalline matrix.',
    biologicalMechanism:
      'Disorganized protein clusters cause light rays to scatter randomly as they enter the eye, rather than focusing cleanly onto a single focal point.',
    visualSymptoms: [
      'Subtle reduction in contrast sensitivity',
      'Increased glare from oncoming car headlights at night',
      'Need for brighter lighting when reading small print',
      'Occasional feeling of a thin film or smudge over the eye',
    ],
    patientImpact: 'Night driving starts feeling fatiguing; reading requires higher-wattage lamps.',
    lensVisualClass: 'from-amber-200/20 via-slate-400/10 to-transparent border-amber-300/30',
    patientVisionClass: 'blur-[1px] brightness-[0.95] contrast-[0.92]',
    patientVisionLabel: 'Subtle Fogging & Night Glare Scatter',
    opticalTransmission: '85% Light Transmission (Light Scattering)',
    doctorNote:
      'Most patients first notice early cataracts when night driving becomes uncomfortable or when book pages appear dimmer than they used to.',
  },
  {
    id: 3,
    label: 'Yellowing Phase',
    badge: 'Stage 3 · Moderate Progression',
    stageName: 'Nuclear Sclerosis & Yellowing',
    lensState: 'Moderate Cataract Formation',
    colorGrade: 'Noticeable Amber-Yellow Tint',
    description:
      'As protein breakdown accelerates, the center of the natural lens (the nucleus) hardens and turns yellow. This amber tint acts as an unwanted permanent sunglasses filter inside your eye.',
    biologicalMechanism:
      'Compacted, oxidized protein aggregates absorb blue-violet light wavelengths, desaturating colors and turning crisp whites into a dull yellowish-gray.',
    visualSymptoms: [
      'Colors lose vibrancy (navy blues and blacks look indistinguishable)',
      'Halo rings and starbursts appear around streetlights',
      'Frequent changes in eyeglass prescriptions that still do not fix blur',
      'Double vision in a single eye or increased distortion',
    ],
    patientImpact:
      'Driving at dusk or in rain becomes stressful; reading small labels becomes frustrating even with glasses.',
    lensVisualClass: 'from-amber-500/30 via-yellow-600/20 to-transparent border-amber-500/50',
    patientVisionClass: 'sepia-[0.55] saturate-[0.65] blur-[2px] brightness-[0.85]',
    patientVisionLabel: 'Yellow Filter Tint & Washed-Out Desaturation',
    opticalTransmission: '65% Light Transmission (Severe Color Shift)',
    doctorNote:
      'Because yellowing occurs slowly over years, many patients do not realize how much color vibrancy and contrast they have lost until the cataract is removed.',
  },
  {
    id: 4,
    label: 'Brown & Opaque',
    badge: 'Stage 4 · Advanced Stage',
    stageName: 'Advanced Brunenscent & Opaque Cataract',
    lensState: 'Dense / Mature Cataract',
    colorGrade: 'Dark Brown & Heavily Opaque',
    description:
      'Without intervention, the natural lens turns dark brown, dense, and opaque. Almost all light is scattered or absorbed before reaching the retina, severely impairing functional vision and daily independence.',
    biologicalMechanism:
      'Heavy cross-linking and mineralization of degraded proteins creates a dense, hardened cataract that blocks direct optical pathways.',
    visualSymptoms: [
      'Profound loss of visual acuity and depth perception',
      'Severe blur equivalent to looking through frosted, dirty glass',
      'Significantly heightened risk of falls and driving accidents',
      'Inability to read, recognize faces from a distance, or navigate steps',
    ],
    patientImpact: 'Loss of driving ability, severe visual handicap, and compromised safety.',
    lensVisualClass: 'from-amber-900/50 via-yellow-950/40 to-black/60 border-amber-700/60',
    patientVisionClass: 'sepia-[0.88] saturate-[0.3] blur-[4.5px] brightness-[0.55] contrast-[0.7]',
    patientVisionLabel: 'Dense Brown Obstruction & Profound Blur',
    opticalTransmission: 'Below 30% Light Transmission (Critical Obstruction)',
    doctorNote:
      'Waiting until a cataract turns dark brown increases surgical ultrasound energy. Treating it before this stage ensures the smoothest, fastest laser recovery.',
  },
  {
    id: 5,
    label: 'Clear Acrylic IOL',
    badge: 'Stage 5 · Permanent Solution',
    stageName: 'Clear Acrylic Lens Implantation (IOL)',
    lensState: 'Advanced Premium Intraocular Lens',
    colorGrade: 'Permanent Optical Clarity · Pure Hydrophobic Acrylic',
    description:
      'During a gentle 10-minute outpatient procedure, your surgeon removes the cloudy, cataractous natural lens and replaces it with a medical-grade clear acrylic intraocular lens (IOL) with a customized prescription engineered to remain stable for life.',
    biologicalMechanism:
      'High-purity acrylic polymers do not age, degrade, or break down. Unlike your biological lens, an acrylic IOL will never yellow, fog, or develop a cataract again.',
    visualSymptoms: [
      'Immediate restoration of vibrant, true-color brightness',
      'Crisp multi-distance focus (reading, computer, and driving)',
      'Permanent elimination of cataract haze and yellow filtering',
      'Lifetime prescription stability without shifts or degradation',
    ],
    patientImpact:
      'Complete visual liberation, effortless active lifestyle, and permanent peace of mind.',
    lensVisualClass:
      'from-primary/30 via-accent/15 to-transparent border-primary/60 shadow-[0_0_30px_rgba(197,160,89,0.25)]',
    patientVisionClass: 'brightness-[1.05] contrast-[1.1] saturate-[1.08]',
    patientVisionLabel: 'Permanent Crystal Clarity & Full Color Spectrum',
    opticalTransmission: '100% Focused Optical Transmission (Permanent)',
    doctorNote:
      'Cataract surgery is a once-in-a-lifetime cure. The clear acrylic lens we place inside your eye will provide stable, beautiful vision for the rest of your life.',
  },
];

const cataractFaqs = [
  {
    question: 'Can a cataract ever grow back after surgery?',
    answer:
      'No. A cataract cannot grow back because your natural biological lens—where cataract proteins form—has been completely removed. In some patients, the clear membrane (capsular bag) that supports the new lens can develop a mild haze months or years later, called Posterior Capsule Opacification (PCO). This is easily, permanently cleared in under 60 seconds with a quick, painless in-office YAG laser procedure.',
  },
  {
    question: 'At what stage should I have cataract surgery?',
    answer:
      'In modern ophthalmology, you no longer need to wait for a cataract to become "ripe" or brown. The ideal time for surgery is when cataract haze begins interfering with your daily quality of life—such as night driving glare, difficulty reading in low light, or washed-out colors. Removing the cataract during moderate stages ensures faster laser fragmentation and quicker recovery.',
  },
  {
    question: 'Why don’t updated eyeglasses clear my vision anymore?',
    answer:
      'Glasses correct refractive errors (nearsightedness, farsightedness, astigmatism) by focusing incoming light onto the lens. However, when the lens itself becomes cloudy or discolored from cataractous proteins, light cannot physically pass through cleanly regardless of how strong your eyeglass prescription is.',
  },
  {
    question: 'Is the cataract surgery procedure painful?',
    answer:
      'Not at all. The procedure is performed under gentle topical numbing eye drops combined with light twilight sedation. Patients do not feel needles, injections, or surgical discomfort. The entire outpatient procedure typically takes only 10 minutes, and patients return home comfortably the same morning.',
  },
];

export default function CataractEducationClient() {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeStage = progressionStages.find((s) => s.id === activeStageId) || progressionStages[0];

  const handleStageSelect = (stageId: number, stageName: string) => {
    setActiveStageId(stageId);
    trackEvent({
      action: 'cataract_progression_stage_click',
      category: 'Education',
      label: `Stage ${stageId}: ${stageName}`,
    });
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16">
      {/* ── BREADCRUMBS & HERO ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(197,160,89,0.04)_0%,transparent_70%)] pointer-events-none" />

        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumbs"
          className="mb-8 flex items-center justify-center gap-2 text-xs text-muted-foreground max-w-5xl mx-auto"
        >
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Icon name="HomeIcon" size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">
            Cataract Education &amp; Lens Permanence
          </span>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <Icon name="EyeIcon" size={14} />
            <span>Clinical Education · Ocular Anatomy &amp; Pathology</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.15] mb-6">
            How Cataracts Form &amp; Why{' '}
            <span className="font-semibold text-gradient-primary block sm:inline">
              Lens Replacement is Permanent.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto font-normal">
            A cataract is not a growth or film across the eye—it is the biological breakdown and
            clumping of crystalline proteins deep inside your natural biological lens. Explore the 5
            optical progression stages below and discover how clear medical acrylic IOLs provide a
            lifetime cure that never fogs or degrades.
          </p>
        </div>

        {/* 4 Clinical Takeaway Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-5xl mx-auto">
          <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5">
            <div className="p-3.5 rounded-[calc(1rem-2px)] bg-black/40 h-full flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                <Icon name="ClockIcon" size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  100% Inevitable
                </p>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                  Natural protein aging over decades
                </p>
              </div>
            </div>
          </div>

          <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm transition-all duration-300 hover:border-emerald-500/30 hover:-translate-y-0.5">
            <div className="p-3.5 rounded-[calc(1rem-2px)] bg-black/40 h-full flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                <Icon name="SparklesIcon" size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  10-Min Procedure
                </p>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                  Gentle numbing drops, no needles
                </p>
              </div>
            </div>
          </div>

          <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5">
            <div className="p-3.5 rounded-[calc(1rem-2px)] bg-black/40 h-full flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                <Icon name="ShieldCheckIcon" size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  Lifetime Stability
                </p>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                  Acrylic IOL never develops cataracts
                </p>
              </div>
            </div>
          </div>

          <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-0.5">
            <div className="p-3.5 rounded-[calc(1rem-2px)] bg-black/40 h-full flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                <Icon name="BoltIcon" size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  3D LENSAR Laser
                </p>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                  Sub-micron customized alignment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5-STAGE PROGRESSION SIMULATOR ── */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-16 sm:mb-20">
        {/* Unified Master Interactive Simulator Card */}
        <div className="max-w-5xl mx-auto glass-card border border-white/[0.12] rounded-3xl shadow-2xl bg-[#090b10]/95 overflow-hidden">
          {/* Card Top: Header & Stage Selector Deck */}
          <div className="p-5 sm:p-7 md:p-8 bg-gradient-to-b from-[#0e111a]/95 via-[#0b0d15]/95 to-[#090b10]/95 relative">
            <div className="pb-5 mb-6 border-b border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <Icon name="EyeIcon" size={15} />
                  <span>Lens Clarity Simulation · Interactive Optical Explorer</span>
                </p>
                <div className="flex items-center gap-2 text-xs text-primary font-semibold bg-primary/10 border border-primary/25 px-3.5 py-1.5 rounded-full shrink-0 self-start sm:self-auto shadow-[0_0_15px_rgba(197,160,89,0.12)]">
                  <Icon name="CursorArrowRaysIcon" size={14} />
                  <span>Click any lens stage to load clinical data below ↓</span>
                </div>
              </div>
              <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-medium text-foreground tracking-tight">
                How the Natural Lens Deteriorates From Youthful Clarity to Cataracts
              </h2>
            </div>

            {/* 5 Lens Discs Side-by-Side */}
            <div
              role="tablist"
              aria-label="Lens clarity progression stages"
              className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-2 lg:gap-3.5 relative"
            >
              {progressionStages.map((stage) => {
                const isSelected = stage.id === activeStageId;
                const isPermanentSolution = stage.id === 5;

                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageSelect(stage.id, stage.stageName)}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`stage-panel-${stage.id}`}
                    id={`stage-tab-${stage.id}`}
                    className={`relative flex flex-col items-center text-center p-3 sm:p-3 lg:p-4 rounded-2xl transition-all duration-300 touch-manipulation group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer ${
                      isPermanentSolution ? 'col-span-2 sm:col-span-1' : ''
                    } ${
                      isSelected
                        ? isPermanentSolution
                          ? 'bg-gradient-to-b from-primary/25 via-primary/15 to-[#0b0e17] border-2 border-primary shadow-[0_0_25px_rgba(197,160,89,0.35)] scale-[1.02] z-10 ring-1 ring-primary/40'
                          : 'bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-[#0b0e17] border-2 border-primary/70 text-foreground shadow-xl scale-[1.02] z-10 ring-1 ring-primary/30'
                        : 'bg-black/40 border border-white/[0.08] hover:border-white/30 hover:bg-white/[0.05] hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                          isPermanentSolution ? 'text-primary' : 'text-muted-foreground/80'
                        }`}
                      >
                        {stage.id === 5 ? 'Permanent Cure' : `Stage 0${stage.id}`}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          stage.id === 1
                            ? 'bg-cyan-400'
                            : stage.id === 2
                              ? 'bg-amber-300'
                              : stage.id === 3
                                ? 'bg-amber-500'
                                : stage.id === 4
                                  ? 'bg-amber-800'
                                  : 'bg-primary animate-pulse'
                        }`}
                      />
                    </div>

                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full my-1.5 flex items-center justify-center bg-black/80 p-1 border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
                      <div
                        className={`relative w-full h-full rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden ${
                          stage.id === 1
                            ? 'bg-gradient-to-br from-cyan-300/25 via-blue-400/15 to-cyan-500/10 border-2 border-cyan-300/50 shadow-[0_0_18px_rgba(34,211,238,0.25)]'
                            : stage.id === 2
                              ? 'bg-gradient-to-br from-amber-100/40 via-slate-300/30 to-amber-200/20 backdrop-blur-[2px] border-2 border-amber-200/40 shadow-[0_0_12px_rgba(251,191,36,0.15)]'
                              : stage.id === 3
                                ? 'bg-gradient-to-br from-amber-500/60 via-yellow-600/50 to-amber-700/40 backdrop-blur-[4px] border-2 border-amber-500/60 shadow-[0_0_18px_rgba(245,158,11,0.25)]'
                                : stage.id === 4
                                  ? 'bg-gradient-to-br from-[#451a03] via-[#290e02] to-[#120601] border-2 border-amber-900/80 shadow-[0_0_20px_rgba(69,26,3,0.5)]'
                                  : 'bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 border-2 border-primary shadow-[0_0_22px_rgba(197,160,89,0.35)]'
                        }`}
                      >
                        {(stage.id === 1 || stage.id === 5) && (
                          <>
                            <div className="absolute top-1 inset-x-2.5 h-4 rounded-[100%] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" />
                            <div className="absolute inset-1 rounded-full border border-white/15 pointer-events-none" />
                          </>
                        )}
                        {stage.id === 5 && (
                          <div className="w-12 h-12 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center pointer-events-none">
                            <div className="w-6 h-6 rounded-full border border-primary/50 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-primary/60" />
                            </div>
                          </div>
                        )}
                        {stage.id === 2 && (
                          <div className="w-8 h-8 rounded-full bg-white/20 blur-[1px] opacity-70" />
                        )}
                        {stage.id === 3 && (
                          <div className="w-10 h-10 rounded-full bg-amber-400/50 blur-[2px] shadow-[inset_0_0_8px_rgba(180,83,9,0.8)]" />
                        )}
                        {stage.id === 4 && (
                          <div className="w-12 h-12 rounded-full bg-[#1c0b02] blur-[1px] border border-amber-950/80" />
                        )}
                      </div>
                    </div>

                    <span className="text-xs sm:text-sm font-semibold text-foreground leading-snug mt-1">
                      {stage.label}
                    </span>

                    <span
                      className={`text-[10px] sm:text-[11px] font-bold mt-1.5 px-2.5 py-0.5 rounded-full ${
                        stage.id === 1
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : stage.id === 2
                            ? 'bg-amber-300/10 text-amber-300 border border-amber-300/20'
                            : stage.id === 3
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : stage.id === 4
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : 'bg-primary/20 text-primary border border-primary/30'
                      }`}
                    >
                      {stage.id === 1
                        ? '99% Light'
                        : stage.id === 2
                          ? '85% Light'
                          : stage.id === 3
                            ? '65% Light'
                            : stage.id === 4
                              ? '<30% Light'
                              : '100% Focused'}
                    </span>

                    {/* Action Indicator on Button */}
                    <div className="mt-2.5 w-full">
                      {isSelected ? (
                        <span className="inline-flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/20 border border-primary/30 px-2 py-0.5 rounded-full w-full shadow-sm">
                          <span>Viewing Below</span>
                          <span className="text-xs">↓</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center gap-1 text-[10px] font-semibold text-muted-foreground/80 group-hover:text-foreground bg-white/[0.04] group-hover:bg-white/10 px-2 py-0.5 rounded-full w-full transition-colors">
                          <span>Click to Inspect</span>
                          <span className="text-xs group-hover:translate-y-0.5 transition-transform">
                            ↓
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Active Caret Pointer physically connecting to content below */}
                    {isSelected && (
                      <div
                        className="hidden sm:block absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-primary" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Stage Bridge Bar */}
          <div className="bg-[#08090e] px-5 sm:px-8 py-3.5 border-t border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-20">
            <div className="flex items-center gap-2.5 text-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-muted-foreground uppercase tracking-wider font-semibold text-[11px]">
                Active Clinical Breakdown:
              </span>
              <span className="text-foreground font-bold font-display text-sm text-gradient-primary">
                Stage 0{activeStage.id} — {activeStage.stageName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground/80">
              <Icon name="SparklesIcon" size={13} className="text-primary" />
              <span>Select any stage above to instantly switch data &amp; vision simulation</span>
            </div>
          </div>

          {/* Integrated Active Stage Detail Panel */}
          <div
            id={`stage-panel-${activeStage.id}`}
            role="tabpanel"
            aria-labelledby={`stage-tab-${activeStage.id}`}
            className="p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-[#0b0e17]/95 via-[#090b12]/95 to-[#07080d]/95 transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/60 mb-8">
              <div>
                <div className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-2">
                  {activeStage.badge}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-foreground">
                  {activeStage.stageName}
                </h3>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] shrink-0">
                <Icon
                  name={activeStage.id === 5 ? 'SparklesIcon' : 'ShieldExclamationIcon'}
                  size={18}
                  className={activeStage.id === 5 ? 'text-primary' : 'text-amber-400'}
                />
                <span className="text-xs font-semibold text-foreground">
                  {activeStage.opticalTransmission}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 lg:gap-10">
              {/* Left Column: Biological Mechanism & Doctor Note */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                    <Icon name="DocumentTextIcon" size={16} className="text-primary" />
                    What Is Happening Inside The Lens
                  </h4>
                  <p className="text-foreground text-sm sm:text-base leading-relaxed">
                    {activeStage.description}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5 flex items-center gap-2">
                    <Icon name="BeakerIcon" size={14} />
                    Biological Protein State
                  </h5>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {activeStage.biologicalMechanism}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-primary/[0.04] border border-primary/20 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary mt-0.5">
                    <Icon name="UserCircleIcon" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                      Clinical Surgeon Perspective
                    </p>
                    <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
                      &ldquo;{activeStage.doctorNote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Physical Lens + Simulated Vision */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                <div className="p-5 rounded-2xl bg-[#07080c] border border-white/[0.08] relative overflow-hidden space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Icon name="EyeIcon" size={13} className="text-primary" />
                        Physical Lens State
                      </span>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                        {activeStage.opticalTransmission}
                      </span>
                    </div>

                    <div className="relative h-24 w-full rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-white/10 flex items-center justify-center overflow-hidden">
                      <div
                        className={`absolute inset-2.5 rounded-full bg-gradient-to-br ${activeStage.lensVisualClass} border flex items-center justify-center transition-all duration-700`}
                      >
                        <div className="text-center px-4">
                          <span className="text-xs font-bold tracking-wider uppercase text-foreground block">
                            {activeStage.lensState}
                          </span>
                          <span className="text-[10px] text-muted-foreground mt-0.5 block">
                            {activeStage.colorGrade}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Icon name="SparklesIcon" size={13} className="text-primary" />
                        What The Patient Sees
                      </span>
                      <span className="text-[10px] text-muted-foreground/80 font-medium">
                        Simulated View
                      </span>
                    </div>

                    <div className="relative h-20 w-full rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                      <div
                        className={`w-full h-full p-2.5 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 flex items-center justify-between transition-all duration-500 ${activeStage.patientVisionClass}`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-amber-400/90 flex items-center justify-center text-[9px] font-bold text-black">
                              ☼
                            </span>
                            <span className="text-xs font-bold text-white tracking-wide">
                              Road &amp; Sign View
                            </span>
                          </div>
                          <p className="text-[10px] text-white/90 font-medium font-mono">
                            20/20 Optical Target • Edge Contrast
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-bold text-primary block">
                            {activeStage.id === 1 || activeStage.id === 5
                              ? '100% Crisp'
                              : 'Degraded'}
                          </span>
                          <span className="text-[9px] text-white/70">
                            {activeStage.id === 5 ? 'Permanent' : `Phase 0${activeStage.id}`}
                          </span>
                        </div>
                      </div>

                      {activeStage.id === 2 && (
                        <div className="absolute inset-0 bg-white/[0.07] pointer-events-none mix-blend-overlay" />
                      )}
                      {activeStage.id === 3 && (
                        <div className="absolute inset-0 bg-amber-500/[0.12] pointer-events-none mix-blend-color" />
                      )}
                      {activeStage.id === 4 && (
                        <div className="absolute inset-0 bg-[#2b1104]/[0.45] pointer-events-none" />
                      )}
                    </div>
                    <p className="text-[11px] text-foreground/80 mt-1.5 font-medium">
                      → {activeStage.patientVisionLabel}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                    <Icon name="EyeDropperIcon" size={15} className="text-primary" />
                    Visual Symptoms &amp; Daily Impact
                  </h4>
                  <ul className="space-y-2.5">
                    {activeStage.visualSymptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                            activeStage.id === 5 ? 'bg-primary' : 'bg-amber-400'
                          }`}
                        />
                        <span className="text-foreground/90 leading-snug">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIDE-BY-SIDE: BIOLOGICAL LENS VS. ACRYLIC IOL ── */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="max-w-5xl mx-auto mb-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
            Natural Biological Lens vs.{' '}
            <span className="font-semibold text-gradient-primary">Clear Acrylic IOL</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Why modern premium cataract surgery is a permanent, once-in-a-lifetime cure.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Natural Biological Lens */}
          <div className="glass-card border border-amber-500/20 bg-amber-500/[0.01] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-0.5">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-400">
                  <Icon name="ClockIcon" size={20} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                  Biological &amp; Aging
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-3">
                The Natural Crystalline Lens
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                Living biological tissue made of water and crystallin proteins. While pristine in
                youth, cumulative oxidative stress causes proteins to clump and yellow over time,
                blocking light and rendering updated glasses ineffective.
              </p>

              <ul className="space-y-3.5 text-xs sm:text-sm mb-6">
                {[
                  'Subject to continuous oxidative stress and protein breakdown',
                  'Loses focus flexibility around age 45 (presbyopia / reading glasses)',
                  'Inevitably turns cloudy, yellow, and brown over decades',
                  'Blocks light from reaching the retina, making new glasses ineffective',
                  'Causes unpredictable prescription shifts as the lens center hardens',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Icon name="XMarkIcon" size={16} className="text-amber-400 mt-0.5 shrink-0" />
                    <span className="text-foreground/90 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-center">
              <p className="text-xs text-muted-foreground">
                <strong className="text-amber-400">Biological Reality:</strong> 100% of humans will
                develop cataract protein changes if they live long enough.
              </p>
            </div>
          </div>

          {/* Clear Acrylic IOL */}
          <div className="glass-card border border-primary/40 bg-primary/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(197,160,89,0.08)] transition-all duration-300 hover:border-primary/60 hover:-translate-y-0.5">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Icon name="CheckBadgeIcon" size={20} />
                </div>
                <span className="inline-flex items-center text-xs font-black uppercase tracking-wider text-black bg-gradient-to-r from-[#d4af37] via-primary to-[#f3e5ab] px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(197,160,89,0.45)] border border-primary-light/40">
                  Permanent &amp; Stable
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-3">
                The Clear Acrylic IOL Replacement
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                Engineered from high-purity, medical-grade hydrophobic acrylic polymer. Once
                positioned inside your natural capsular bag, it becomes a permanent optical
                component that never fogs, degrades, or yellows.
              </p>

              <ul className="space-y-3.5 text-xs sm:text-sm mb-6">
                {[
                  'Never breaks down, denatures, or clouds again',
                  'Prescription remains permanently stable for the rest of your life',
                  'Restores true color fidelity and vivid contrast brightness',
                  'Available in advanced multifocal and EDOF designs (PanOptix, Vivity, PureSee)',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Icon
                      name="CheckIcon"
                      size={16}
                      className="text-primary mt-0.5 shrink-0 font-bold"
                    />
                    <span className="text-foreground font-medium leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <p className="text-xs text-primary font-semibold">
                <strong>Lifetime Guarantee:</strong> An acrylic IOL can never develop a cataract. It
                is a permanent, once-in-a-lifetime visual transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLINICAL FAQS ── */}
      <section
        id="faq"
        className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-16 sm:mb-20 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
              Frequently Asked Questions About{' '}
              <span className="font-semibold text-gradient-primary">Cataract Biology</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Straightforward answers from our refractive cataract surgical team.
            </p>
          </div>

          <div className="space-y-4">
            {cataractFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/20"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`cataract-faq-answer-${index}`}
                    id={`cataract-faq-button-${index}`}
                  >
                    <span className="text-base sm:text-lg font-semibold text-foreground">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 text-primary border-primary/30'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <Icon name="ChevronDownIcon" size={16} />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`cataract-faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`cataract-faq-button-${index}`}
                      className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-white/[0.04]"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SURGICAL REASSURANCE & NEXT STEPS ── */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto glass-card border border-border rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl bg-[#090b10]/95">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <Icon name="SparklesIcon" size={15} />
              <span>Ready for Clear Sight?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Evaluate Your Cataracts With High-Definition 3D Biometry
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
              Schedule your comprehensive, unhurried evaluation. We measure your cornea down to the
              sub-micron level and help you choose the ideal lens for your eyes and lifestyle.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/#lenses"
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-foreground text-xs sm:text-sm font-semibold transition-all text-center touch-manipulation min-h-[48px] flex items-center justify-center"
            >
              Compare Lens Options
            </Link>
            <a
              href="#consultation"
              className="w-full sm:w-auto group inline-flex items-center justify-center pl-6 pr-3 py-3 bg-primary text-[#040506] rounded-full text-xs sm:text-sm font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[48px] shadow-[0_4px_16px_rgba(197,160,89,0.25)]"
            >
              <span>Schedule Evaluation</span>
              <div className="ml-3 w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 shrink-0">
                <Icon name="ArrowRightIcon" size={14} className="text-current" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
