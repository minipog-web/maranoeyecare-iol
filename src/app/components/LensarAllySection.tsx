'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import styles from './LensarAllySection.module.css';
import { trackEvent } from '@/lib/gtag';

export default function LensarAllySection() {
  const [activeTab, setActiveTab] = useState<'patient' | 'surgeon'>('patient');

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect = rect;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    let rect = (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect;
    if (!rect) {
      rect = e.currentTarget.getBoundingClientRect();
      (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect = rect;
    }
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    delete (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect;
  };

  const handleTabChange = (tab: 'patient' | 'surgeon') => {
    setActiveTab(tab);
    trackEvent({
      action: 'lensar_tab_click',
      category: 'Engagement',
      label: tab,
    });
  };

  const patientBenefits = [
    {
      icon: 'HeartIcon',
      title: 'Gentler on the Eye',
      desc: 'The laser pre-softens the cataract before removal, reducing the amount of ultrasound energy needed. This means significantly less stress on delicate eye tissues.',
      metric: 'Up to 50% less energy',
    },
    {
      icon: 'SparklesIcon',
      title: 'Micron-level laser precision',
      desc: 'Computer-guided technology makes incisions with micron-level accuracy, creating the optimal foundation for aligning premium astigmatism and multifocal lenses.',
      metric: 'Micron-level accuracy',
    },
    {
      icon: 'BuildingOfficeIcon',
      title: 'Seamless Single-Bed Comfort',
      desc: 'No moving between rooms or shifting surgical tables mid-procedure. The integrated system allows the entire surgery to be completed in one comfortable spot.',
      metric: '100% single-suite flow',
    },
  ];

  const surgeonBenefits = [
    {
      icon: 'EyeIcon',
      title: 'Augmented Reality™ 3D Mapping',
      desc: 'Generates a high-definition 3D model of your exact eye structure. Dr. Marano can view and plan the surgery with real-time anatomical overlays.',
      metric: 'High-definition 3D scan',
    },
    {
      icon: 'BoltIcon',
      title: 'Cataract Density Profiling',
      desc: 'Intelligent imaging automatically measures the density of the cataract and customizes the laser fragmentation pattern instantly for optimal efficiency.',
      metric: 'Adaptive real-time density',
    },
    {
      icon: 'ScaleIcon',
      title: 'Astigmatism Target Alignment',
      desc: 'Integrates patient data directly into the surgical view, placing precise digital guidance overlay marks to align toric or multifocal IOLs perfectly.',
      metric: 'Perfect IOL orientation',
    },
  ];

  const activeBenefits = activeTab === 'patient' ? patientBenefits : surgeonBenefits;

  return (
    <section id="lensar-ally" className="py-12 sm:py-24 relative overflow-hidden bg-background">
      {/* Background layer */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none ${styles.gridLines}`} />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
            Surgical Innovation
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-5">
            <span className="block font-extrabold mb-1">
              LENSAR ALLY<sup>®</sup>
            </span>
            <span className="block font-semibold text-gradient-primary">
              Adaptive Laser Cataract System
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are proud to offer New Jersey patients the next generation of cataract surgery
            technology. ALLY combines advanced 3D imaging, Augmented Reality, and robotic laser
            precision into a seamless procedure.
          </p>
        </div>

        {/* Dynamic perspective selector */}
        <div className="flex justify-center mb-10 sm:mb-16">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            <button
              onClick={() => handleTabChange('patient')}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'patient'
                  ? 'bg-primary text-[#020304] shadow-[0_0_20px_rgba(197, 160, 89,0.25)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon
                name="UserIcon"
                size={16}
                variant={activeTab === 'patient' ? 'solid' : 'outline'}
              />
              For Patients
            </button>
            <button
              onClick={() => handleTabChange('surgeon')}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'surgeon'
                  ? 'bg-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon
                name="AcademicCapIcon"
                size={16}
                variant={activeTab === 'surgeon' ? 'solid' : 'outline'}
              />
              For Surgeons
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Dynamic interactive benefits grid */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <h3 className="font-display text-xl sm:text-3xl font-semibold text-foreground mb-4">
              {activeTab === 'patient'
                ? 'Designed for Comfort and Faster Recovery'
                : 'Empowering Dr. Marano with Sub-Micron Precision'}
            </h3>

            <div className="grid gap-4 sm:gap-6">
              {activeBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  className={`group relative overflow-hidden rounded-3xl p-5 sm:p-6 transition-all duration-300 ${styles.glassCard} ${
                    activeTab === 'surgeon' ? styles.glassCardDoctor : ''
                  }`}
                >
                  {/* Spotlight hover effect */}
                  <div
                    className={
                      activeTab === 'patient'
                        ? `${styles.spotlight} ${styles.spotlightPrimary} ${styles.blur60} group-hover:opacity-100`
                        : `${styles.spotlight} ${styles.spotlightSecondary} ${styles.blur60} group-hover:opacity-100`
                    }
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                        activeTab === 'patient'
                          ? 'bg-primary/10 border-primary/20 text-primary'
                          : 'bg-accent/10 border-accent/20 text-accent'
                      }`}
                    >
                      <Icon name={benefit.icon} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                        <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-white transition-colors">
                          {benefit.title}
                        </h4>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            activeTab === 'patient'
                              ? 'text-primary bg-primary/10'
                              : 'text-accent bg-accent/10'
                          }`}
                        >
                          {benefit.metric}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Premium clinical preview */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-square rounded-3xl border border-white/[0.08] bg-[#13151b] p-3 overflow-hidden shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/[0.05] bg-black/60 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <AppImage
                  src="/assets/images/lensar_ally_screen.jpg"
                  alt="LENSAR ALLY advanced 3D biometric eye scan and laser calibration interface"
                  fill
                  className="object-cover opacity-90 transition-all duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 360px"
                />
                {/* Subtle inner glass highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
