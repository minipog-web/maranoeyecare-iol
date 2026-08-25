'use client';

import React, { useState } from 'react';
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
      'Waiting until a cataract turns dark brown increases surgical ultrasound time. Treating it before this stage ensures the smoothest, fastest laser recovery.',
  },
  {
    id: 5,
    label: 'Clear Acrylic IOL',
    badge: 'Stage 5 · Permanent Solution',
    stageName: 'Clear Acrylic Lens Implantation (IOL)',
    lensState: 'Advanced Premium Intraocular Lens',
    colorGrade: 'Permanent Optical Clarity · Pure Hydrophobic Acrylic',
    description:
      'During a gentle 10-minute outpatient procedure, Dr. Marano removes the cloudy, cataractous natural lens and replaces it with a medical-grade clear acrylic intraocular lens (IOL) with a customized prescription engineered to remain stable for life.',
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

export default function CataractFormationSection() {
  const [activeStageId, setActiveStageId] = useState<number>(2);

  const activeStage = progressionStages.find((s) => s.id === activeStageId) || progressionStages[1];

  const handleStageSelect = (stageId: number, stageName: string) => {
    setActiveStageId(stageId);
    trackEvent({
      action: 'cataract_progression_stage_click',
      category: 'Education',
      label: `Stage ${stageId}: ${stageName}`,
    });
  };

  return (
    <section
      id="cataract-education"
      className="py-16 sm:py-24 relative overflow-hidden bg-[#0a0c12] scroll-mt-20"
      aria-label="Educational Guide: Cataract Formation, Progression and Permanent Lens Replacement"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(56,189,248,0.02)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Icon name="EyeIcon" size={15} />
            <span>Clinical Education & Eye Anatomy</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
            How Cataracts Form & Why{' '}
            <span className="font-semibold text-gradient-primary">
              Lens Replacement is Permanent.
            </span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            A cataract is not a growth on top of the eye—it is the natural aging and breakdown of
            proteins inside your biological crystalline lens. Learn how it progresses from mild haze
            to brown opacity, and how modern acrylic IOLs permanently restore clear sight.
          </p>
        </div>

        {/* Visual 5-Stage Lens Clarity Simulation Spectrum */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="glass-card border border-border/90 rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl bg-[#090b10]/95">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-white/[0.08]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <Icon name="EyeIcon" size={15} />
                  <span>Lens Clarity Simulation · Side-by-Side Progression Spectrum</span>
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground mt-1">
                  How the Natural Lens Deteriorates from Youthful Clarity to Brown Opacity
                </h3>
              </div>
              <span className="text-[11px] text-muted-foreground/80 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full shrink-0 self-start sm:self-auto">
                Tap any stage to inspect biological details
              </span>
            </div>

            {/* 5 Lens Discs Side-by-Side */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
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
                    className={`relative flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl transition-all duration-300 touch-manipulation group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                      isSelected
                        ? isPermanentSolution
                          ? 'bg-gradient-to-b from-primary/20 via-primary/10 to-transparent border-2 border-primary shadow-[0_0_25px_rgba(197,160,89,0.35)] scale-[1.02]'
                          : 'bg-white/[0.08] border-2 border-white/30 text-foreground shadow-xl scale-[1.02]'
                        : 'bg-black/40 border border-white/[0.07] hover:border-white/20 hover:bg-white/[0.03]'
                    }`}
                  >
                    {/* Stage Eyebrow */}
                    <div className="flex items-center justify-between w-full mb-2.5">
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

                    {/* Lens Graphic Simulation Disc */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full my-2 flex items-center justify-center bg-black/60 p-1 border border-white/10 shadow-inner">
                      {/* Grid Pattern inside to show optical transparency */}
                      <div className="absolute inset-2 rounded-full overflow-hidden opacity-25">
                        <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]" />
                      </div>

                      {/* Visual Lens State Simulation Disc */}
                      <div
                        className={`relative w-full h-full rounded-full transition-all duration-500 flex items-center justify-center ${
                          stage.id === 1
                            ? 'bg-gradient-to-br from-cyan-300/30 via-blue-400/20 to-cyan-500/10 border-2 border-cyan-300/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                            : stage.id === 2
                              ? 'bg-gradient-to-br from-amber-100/40 via-slate-300/30 to-amber-200/20 backdrop-blur-[2px] border-2 border-amber-200/40 shadow-[0_0_12px_rgba(251,191,36,0.15)]'
                              : stage.id === 3
                                ? 'bg-gradient-to-br from-amber-500/60 via-yellow-600/50 to-amber-700/40 backdrop-blur-[4px] border-2 border-amber-500/60 shadow-[0_0_18px_rgba(245,158,11,0.25)]'
                                : stage.id === 4
                                  ? 'bg-gradient-to-br from-[#451a03] via-[#290e02] to-[#120601] border-2 border-amber-900/80 shadow-[0_0_20px_rgba(69,26,3,0.5)]'
                                  : 'bg-gradient-to-br from-primary/35 via-accent/25 to-primary/15 border-2 border-primary shadow-[0_0_22px_rgba(197,160,89,0.4)]'
                        }`}
                      >
                        {/* Stage 5 Acrylic IOL Haptic Arms (Medical Implant Visualization) */}
                        {stage.id === 5 && (
                          <>
                            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-primary/80 rounded-tl-full pointer-events-none" />
                            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-primary/80 rounded-br-full pointer-events-none" />
                            <div className="w-2.5 h-2.5 rounded-full border border-primary/80 bg-primary/20 animate-ping opacity-75 pointer-events-none" />
                          </>
                        )}

                        {/* Stage 2 Micro-Clouding Flecks */}
                        {stage.id === 2 && (
                          <div className="w-8 h-8 rounded-full bg-white/20 blur-[1px] opacity-70" />
                        )}

                        {/* Stage 3 Nuclear Sclerosis Dense Yellow Core */}
                        {stage.id === 3 && (
                          <div className="w-10 h-10 rounded-full bg-amber-400/50 blur-[2px] shadow-[inset_0_0_8px_rgba(180,83,9,0.8)]" />
                        )}

                        {/* Stage 4 Dense Opaque Center */}
                        {stage.id === 4 && (
                          <div className="w-12 h-12 rounded-full bg-[#1c0b02] blur-[1px] border border-amber-950/80" />
                        )}
                      </div>
                    </div>

                    {/* Lens Label */}
                    <span className="text-xs sm:text-sm font-semibold text-foreground leading-snug mt-1">
                      {stage.label}
                    </span>

                    {/* Optical Transmission Badge */}
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
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div
          id={`stage-panel-${activeStage.id}`}
          role="tabpanel"
          aria-labelledby={`stage-tab-${activeStage.id}`}
          className="max-w-5xl mx-auto glass-card border border-border/80 rounded-3xl p-6 sm:p-8 lg:p-10 mb-12 shadow-2xl transition-all duration-500"
        >
          {/* Top Stage Header */}
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
            {/* Left: Biological Mechanism & Simulation */}
            <div className="md:col-span-7 space-y-6">
              {/* Biological explanation */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                  <Icon name="DocumentTextIcon" size={16} className="text-primary" />
                  What Is Happening Inside The Lens
                </h4>
                <p className="text-foreground text-sm sm:text-base leading-relaxed">
                  {activeStage.description}
                </p>
              </div>

              {/* Chemical / Protein detail */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h5 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5 flex items-center gap-2">
                  <Icon name="BeakerIcon" size={14} />
                  Biological Protein State
                </h5>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeStage.biologicalMechanism}
                </p>
              </div>

              {/* Doctor clinical quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-primary/[0.04] border border-primary/20 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary mt-0.5">
                  <Icon name="UserCircleIcon" size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    Dr. Matthew Marano Jr., MD — Clinical Perspective
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
                    &ldquo;{activeStage.doctorNote}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Visual Symptoms & Dual-Matrix Simulation */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-6">
              {/* Dual Simulation Card: Physical Lens + Patient Vision View */}
              <div className="p-5 rounded-2xl bg-[#07080c] border border-white/[0.08] relative overflow-hidden space-y-4">
                {/* 1. Physical Lens Optical State */}
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

                {/* 2. Simulated Patient Vision View Through This Stage */}
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
                    {/* Simulated Scene Graphic */}
                    <div
                      className={`w-full h-full p-2.5 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 flex items-center justify-between transition-all duration-500 ${activeStage.patientVisionClass}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-amber-400/90 flex items-center justify-center text-[9px] font-bold text-black">
                            ☼
                          </span>
                          <span className="text-xs font-bold text-white tracking-wide">
                            Street & Dashboard View
                          </span>
                        </div>
                        <p className="text-[10px] text-white/90 font-medium font-mono">
                          Text: 20/20 Optical Target • Road Sign
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold text-primary block">
                          {activeStage.id === 1 || activeStage.id === 5 ? '100% Crisp' : 'Degraded'}
                        </span>
                        <span className="text-[9px] text-white/70">
                          {activeStage.id === 5 ? 'Permanent' : `Phase 0${activeStage.id}`}
                        </span>
                      </div>
                    </div>

                    {/* Glare halo overlay for stage 2 and 3 */}
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

              {/* Patient Visual Symptoms */}
              <div className="flex-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                  <Icon name="EyeDropperIcon" size={15} className="text-primary" />
                  Visual Symptoms & Daily Impact
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

        {/* Side-by-Side Comparison: Natural Crystalline Lens vs. Clear Acrylic IOL */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-light text-foreground">
              Natural Crystalline Lens vs.{' '}
              <span className="font-semibold text-gradient-primary">Clear Acrylic IOL</span>
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Understanding why cataract surgery is a one-time, permanent upgrade to your optical
              system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Natural Biological Lens */}
            <div className="glass-card border border-amber-500/20 bg-amber-500/[0.01] rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-400">
                    <Icon name="ClockIcon" size={20} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                    Biological & Aging
                  </span>
                </div>

                <h4 className="text-lg font-bold text-foreground mb-3">
                  The Natural Crystalline Lens
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  Living biological tissue made of water and crystallin proteins. While highly
                  flexible in youth, it naturally deteriorates over time.
                </p>

                <ul className="space-y-3.5 text-xs sm:text-sm mb-6">
                  {[
                    'Subject to continuous oxidative stress and protein degradation',
                    'Loses flexibility around age 45 (presbyopia / reading glasses)',
                    'Inevitably turns cloudy, yellow, and brown over decades',
                    'Causes unpredictable prescription shifts as the nucleus swells',
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
                  <strong className="text-amber-400">Biological Reality:</strong> 100% of humans
                  eventually develop cataractous protein changes if they live long enough.
                </p>
              </div>
            </div>

            {/* Clear Acrylic IOL */}
            <div className="glass-card border border-primary/40 bg-primary/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(197,160,89,0.08)]">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Icon name="SparklesIcon" size={20} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Permanent & Stable
                  </span>
                </div>

                <h4 className="text-lg font-bold text-foreground mb-3">
                  The Clear Acrylic IOL Replacement
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  Engineered from ultra-pure, medical-grade hydrophobic acrylic polymer. Once placed
                  inside the eye’s natural capsular bag, it becomes a permanent part of your optics.
                </p>

                <ul className="space-y-3.5 text-xs sm:text-sm mb-6">
                  {[
                    'Never breaks down, degrades, or turns cloudy again',
                    'Prescription remains permanently stable for the rest of your life',
                    'Restores true color fidelity and high-contrast brightness',
                    'Available with advanced multi-distance focus (Clareon Vivity, PanOptix, PureSee)',
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
                  <strong>Lifetime Guarantee:</strong> Your new acrylic IOL can never develop a
                  cataract. It is a permanent, once-in-a-lifetime visual solution.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Surgical Reassurance Bottom Banner */}
        <div className="max-w-5xl mx-auto glass-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary mt-1 sm:mt-0">
              <Icon name="SparklesIcon" size={20} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-foreground">
                How Dr. Marano Performs Your Cataract Replacement
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                Using gentle numbing eye drops (zero needles) and the precision 3D LENSAR ALLY
                laser, Dr. Marano gently removes the cloudy cataractous lens in approximately 10
                minutes and places your customized clear acrylic lens. Most patients see clearly
                within 24 to 48 hours.
              </p>
            </div>
          </div>

          <a
            href="#booking"
            onClick={() =>
              trackEvent({
                action: 'cataract_education_cta_click',
                category: 'Conversion',
                label: 'Schedule Cataract Evaluation',
              })
            }
            className="group shrink-0 inline-flex items-center justify-center pl-6 pr-3 py-3 bg-primary text-[#040506] rounded-full text-xs sm:text-sm font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[48px] shadow-[0_4px_16px_rgba(197,160,89,0.25)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <span>Schedule Cataract Evaluation</span>
            <div className="ml-3 w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 shrink-0">
              <Icon name="ArrowRightIcon" size={14} className="text-current" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
