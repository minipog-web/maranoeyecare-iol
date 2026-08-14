'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function CandidacySection() {
  return (
    <section id="candidacy" className="py-12 sm:py-20 relative overflow-hidden bg-card">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
            Clinical Safety First
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
            Are You a Candidate for
            <br />
            <span className="font-semibold text-gradient-primary">Premium Lenses?</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            While premium lenses deliver life-changing visual freedom, your individual eye anatomy
            is the ultimate deciding factor. Dr. Marano performs detailed clinical mapping to ensure
            a safe, high-satisfaction outcome.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Column 1: Ideal Candidate */}
          <div className="glass-card border border-emerald-500/20 bg-emerald-500/[0.01] rounded-3xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Icon name="CheckCircleIcon" size={20} className="text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Ideal Candidates</h3>
                <p className="text-xs text-muted-foreground">
                  Patients who typically experience the best outcomes
                </p>
              </div>
            </div>

            <ul className="space-y-4 flex-1">
              {[
                {
                  title: 'Desire for Spectacle Independence',
                  desc: 'Patients looking to read, drive, and use screens without relying on glasses.',
                },
                {
                  title: 'Stable Eye Health',
                  desc: 'A healthy cornea, retina, and optic nerve free from advanced ocular disease.',
                },
                {
                  title: 'Cataract or Presbyopia Symptoms',
                  desc: 'Experiencing cloudy vision, glare, or difficulty focusing on close-up tasks.',
                },
                {
                  title: 'Realistic Visual Expectations',
                  desc: 'Understanding that premium optics provide functional freedom but require a short neurological adaptation period. While patients can expect functional spectacle independence with a multi-focal or extended depth of field lens, individual results may vary, and some patients may still rely on low-power over-the-counter readers for extremely fine print in poor lighting.',
                },
              ]?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground/90">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Considerations / Exclusions */}
          <div className="glass-card border border-amber-500/20 bg-amber-500/[0.01] rounded-3xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <Icon name="ExclamationTriangleIcon" size={20} className="text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Important Considerations</h3>
                <p className="text-xs text-muted-foreground">
                  Conditions that may require alternative lens choices
                </p>
              </div>
            </div>

            <ul className="space-y-4 flex-1">
              {[
                {
                  title: 'Severe Dry Eye Disease',
                  desc: 'Unmanaged dry eye disrupts the tear film, which can cause blurry vision or glare—especially with diffractive multifocal lenses like the PanOptix.',
                },
                {
                  title: 'Macular Degeneration / Retinal Scars',
                  desc: "Retinal conditions limit the eye's contrast sensitivity, making standard monofocals or TECNIS PureSee (the first EDOF with zero contrast sensitivity warning) a safer, crisper choice than diffractive multifocals.",
                },
                {
                  title: 'Advanced or Uncontrolled Glaucoma',
                  desc: 'Optic nerve damage compromises visual field and contrast, making diffractive premium lenses clinically unsuitable.',
                },
                {
                  title: 'Advanced Diabetic Retinopathy',
                  desc: 'Potential future retinal treatments require clear views of the back of the eye, which standard monofocal lenses facilitate better.',
                },
                {
                  title: 'Hidden Pre-operative Conditions',
                  desc: 'Underlying eye disease limiting visual prognosis could exist without being seen pre-operatively due to the cataract blocking the view of the back of the eye.',
                },
              ]?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground/90">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto glass-card border border-border rounded-2xl p-5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <Icon name="InformationCircleIcon" size={18} />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              <strong className="text-foreground">Honest Clinical Advice:</strong> A comprehensive
              diagnostic mapping at our clinic is the only way to verify candidate status. If a
              premium lens isn&apos;t the safest choice for your unique eye anatomy, Dr. Marano will
              advise a standard lens or a custom monofocal-plus solution.
            </p>
          </div>
          <a
            href="#booking"
            className="group shrink-0 inline-flex items-center justify-center pl-6 pr-2.5 py-2.5 bg-primary text-[#040506] rounded-full text-xs font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[44px] shadow-[0_4px_12px_rgba(197,160,89,0.2)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <span>Check Candidacy</span>
            <div className="ml-3 w-6 h-7 rounded-full bg-black/10 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 shrink-0">
              <Icon name="ArrowRightIcon" size={14} className="text-current" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
