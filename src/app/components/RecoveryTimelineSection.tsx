'use client';

import React from 'react';

export default function RecoveryTimelineSection() {
  const steps = [
    {
      phase: '01',
      title: 'Precision Planning',
      timeframe: '1–2 Weeks Prior',
      icon: 'DocumentTextIcon',
      description:
        'Using high-resolution corneal topography and optical biometry, we create a sub-micron 3D map of your eye. This data is programmed directly into the LENSAR laser guidance system for personalized alignment.',
    },
    {
      phase: '02',
      title: 'Procedure Day',
      timeframe: '15 Minutes',
      icon: 'ClockIcon',
      description:
        'An outpatient procedure. We apply local numbing eye drops—no pain, no injections, no general anesthesia. The robotic laser system replaces your cataract with your custom premium lens. You walk out the same day.',
    },
    {
      phase: '03',
      title: 'Immediate Shift',
      timeframe: '24–48 Hours',
      icon: 'EyeIcon',
      description:
        'Your vision begins clearing rapidly. Most patients return to light activities like reading, using computer screens, and light walking within 24 to 48 hours. Mild scratchiness is normal and easily managed with drops.',
    },
    {
      phase: '04',
      title: 'Neuroadaptation',
      timeframe: '4–6 Weeks',
      icon: 'SparklesIcon',
      description:
        'Your brain adapts to the new, premium optics. Contrast sensitivity peaks, night glare drops, and vision stabilizes completely, providing you with long-term, glasses-free visual freedom.',
    },
  ];

  return (
    <section id="recovery" className="py-12 sm:py-20 relative overflow-hidden bg-secondary">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-lines-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
            What to Expect
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
            Your Journey to{' '}
            <span className="font-semibold text-gradient-primary">Visual Freedom.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Fear of surgery is natural, but cataract correction is one of the safest, most common
            procedures in the world. Here is your step-by-step timeline.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line connector (desktop) */}
          <div className="absolute left-[39px] md:left-1/2 top-4 bottom-4 w-0.5 bg-border/40 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps?.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Timeline circle node */}
                  <div className="absolute left-[39px] md:left-1/2 w-8 h-8 rounded-full border border-primary/50 bg-[#0d0f16] flex items-center justify-center -translate-x-1/2 z-20 shadow-[0_0_12px_rgba(197,160,89,0.3)] shrink-0">
                    <span className="text-[10px] font-bold text-primary">{step.phase}</span>
                  </div>

                  {/* Left Column (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-0 md:pr-12 text-left md:text-right ${isEven ? 'md:block' : 'md:invisible md:pointer-events-none'}`}
                  >
                    {isEven && (
                      <div className="glass-card border border-border rounded-2xl p-6 hover:border-primary/20 transition-all hover:scale-[1.01]">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
                          {step.timeframe}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Spacer for center alignment */}
                  <div className="w-16 hidden md:block" />

                  {/* Right Column (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-12 text-left ${!isEven ? 'md:block' : 'md:invisible md:pointer-events-none'}`}
                  >
                    {!isEven && (
                      <div className="glass-card border border-border rounded-2xl p-6 hover:border-primary/20 transition-all hover:scale-[1.01]">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
                          {step.timeframe}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Mobile Layout Fallback (just display card underneath node) */}
                  <div className="w-full pl-16 pr-4 mt-2 md:hidden">
                    <div className="glass-card border border-border rounded-2xl p-5">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                        {step.timeframe}
                      </span>
                      <h3 className="text-base font-semibold text-foreground mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
