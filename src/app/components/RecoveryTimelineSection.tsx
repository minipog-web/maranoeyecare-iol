'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function RecoveryTimelineSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      phase: '01',
      title: 'Precision Planning',
      timeframe: '1–2 Weeks Prior',
      icon: 'DocumentTextIcon',
      description:
        'Using high-resolution corneal topography and optical biometry, we create a sub-micron 3D map of your eye. This data is programmed directly into the LENSAR laser guidance system for personalized alignment.',
      color: '#00A3FF',
      rgb: '0, 163, 255',
    },
    {
      phase: '02',
      title: 'Procedure Day',
      timeframe: '10 Minutes',
      icon: 'ClockIcon',
      description:
        'An outpatient procedure. We apply local numbing eye drops—no pain, no injections, no general anesthesia. The robotic laser system replaces your cataract with your custom premium lens. You walk out the same day.',
      color: '#8B5CF6',
      rgb: '139, 92, 246',
    },
    {
      phase: '03',
      title: 'Immediate Shift',
      timeframe: '24–48 Hours',
      icon: 'EyeIcon',
      description:
        'Your vision begins clearing rapidly. Most patients return to light activities like reading, using computer screens, and light walking within 24 to 48 hours. Mild scratchiness is normal and easily managed with drops.',
      color: '#10B981',
      rgb: '16, 185, 129',
    },
    {
      phase: '04',
      title: 'Healing Response',
      timeframe: 'Days 2–7',
      icon: 'SparklesIcon',
      description:
        'Surgical energy causes temporary post-op swelling. A targeted drop cocktail quickly resolves inflammation; as swelling subsides, clarity increases. Though the advanced LENSAR laser minimizes swelling, individual variation occurs based on cataract density, calcification, age, and health.',
      color: '#EC4899',
      rgb: '236, 72, 153',
    },
    {
      phase: '05',
      title: 'Neuroadaptation',
      timeframe: '4–6 Weeks',
      icon: 'BrainIcon',
      description:
        'Your brain adapts to the new, premium optics. Contrast sensitivity peaks, night glare drops, and vision stabilizes completely, providing you with long-term, glasses-free visual freedom.',
      color: '#C5A059',
      rgb: '197, 160, 89',
    },
  ];

  return (
    <section id="recovery" className="py-24 relative overflow-hidden bg-[#0a0c10]">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
            The Path to Clarity
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
            Your Journey to{' '}
            <span className="font-semibold text-gradient-primary">Visual Freedom.</span>
          </h2>
          <p className="text-foreground font-normal leading-relaxed text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Fear of surgery is natural, but premium cataract correction is one of the safest, most
            precise procedures in modern medicine. Here is your timeline.
          </p>
        </div>

        {/* Timeline Interactive Layout */}
        <div className="relative max-w-6xl mx-auto mt-8">
          {/* Stepper Progress Bar (Desktop only) */}
          <div className="hidden md:block relative w-[calc(100%-24px)] mx-auto h-[2px] bg-white/10 mb-12">
            {/* Active connecting line with color-gradient interpolation */}
            <div
              className="absolute h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                width: `${(activeStep / (steps.length - 1)) * 100}%`,
                background: `linear-gradient(to right, #00A3FF, ${steps[activeStep].color})`,
              }}
            />
            {/* Connection nodes */}
            <div className="absolute inset-0 flex justify-between items-center -mx-[12px]">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 focus:outline-none"
                  style={{
                    borderColor: idx <= activeStep ? step.color : 'rgba(255,255,255,0.2)',
                    backgroundColor: idx <= activeStep ? step.color : '#0a0c10',
                    color: idx <= activeStep ? '#0a0c10' : '#94a3b8',
                    boxShadow: idx <= activeStep ? `0 0 12px rgba(${step.rgb}, 0.5)` : 'none',
                  }}
                  aria-label={`Go to step ${step.phase}`}
                >
                  <span className="text-[9px] font-bold">{step.phase}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="flex items-stretch md:grid md:grid-cols-5 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-6 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`flex-none w-[280px] sm:w-[320px] md:w-auto snap-center group relative transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] h-full flex flex-col ${
                    isActive ? 'scale-[1.02] md:translate-y-[-4px]' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* Outer Bezel (Doppelrand) with dynamic color border & glow */}
                  <div
                    className="p-1.5 rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] border h-full flex flex-col"
                    style={{
                      borderColor: isActive ? `rgba(${step.rgb}, 0.25)` : 'rgba(255,255,255,0.05)',
                      background: isActive
                        ? `linear-gradient(135deg, rgba(${step.rgb}, 0.2) 0%, rgba(${step.rgb}, 0.03) 100%)`
                        : 'rgba(255,255,255,0.02)',
                      boxShadow: isActive ? `0 12px 30px -10px rgba(${step.rgb}, 0.15)` : 'none',
                    }}
                  >
                    {/* Inner Core */}
                    <div className="bg-[#0e1017] rounded-[calc(2rem-6px)] p-6 min-h-[300px] md:min-h-0 h-full flex flex-col justify-between border border-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative overflow-hidden">
                      {/* Sub-bezel glow overlay using dynamic step color */}
                      <div
                        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-700"
                        style={{
                          background: `rgba(${step.rgb}, 0.08)`,
                          opacity: isActive ? 1 : 0,
                        }}
                      />

                      <div>
                        {/* Card Header */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-500"
                            style={{
                              color: isActive ? step.color : '#f1f5f9',
                            }}
                          >
                            {step.timeframe}
                          </span>
                          <div
                            className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500"
                            style={{
                              borderColor: isActive
                                ? `rgba(${step.rgb}, 0.3)`
                                : 'rgba(255,255,255,0.1)',
                              backgroundColor: isActive ? `rgba(${step.rgb}, 0.1)` : 'transparent',
                              color: isActive ? step.color : '#94a3b8',
                            }}
                          >
                            <Icon name={step.icon} size={16} />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-foreground/95 leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>

                      {/* Phase Number Indicator */}
                      <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest text-muted-foreground/50 uppercase">
                          Step
                        </span>
                        <span
                          className="text-sm font-semibold font-mono transition-colors duration-500"
                          style={{
                            color: isActive ? step.color : 'rgba(148, 163, 184, 0.6)',
                          }}
                        >
                          {step.phase}
                        </span>
                      </div>
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
