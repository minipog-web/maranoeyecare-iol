'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import styles from './LensarAllySection.module.css';
import { trackEvent } from '@/lib/gtag';
import { handleSpotlightMouseMove } from '@/lib/ui';

export default function LensarAllySection() {
  const [activeTab, setActiveTab] = useState<'patient' | 'surgeon'>('patient');

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
      title: 'Gentler on Delicate Ocular Tissues',
      desc: 'The femtosecond laser pre-softens cataracts before extraction, reducing ultrasound energy by up to 50%. This dramatically minimizes post-operative inflammation and accelerates corneal recovery.',
      metric: 'Up to 50% less energy',
    },
    {
      icon: 'SparklesIcon',
      title: 'Sub-Micron Robotic Centration',
      desc: 'While traditional surgery relies on manual handheld blade incisions that can vary by fractions of a millimeter, ALLY creates a 99.8% mathematically circular opening to lock your premium lens into exact focal center.',
      metric: 'Sub-micron accuracy',
    },
    {
      icon: 'BuildingOfficeIcon',
      title: 'Seamless Single-Bed Comfort',
      desc: 'No transferring between rooms or repositioning surgical beds mid-procedure. The entire laser and micro-implantation process is completed in one relaxed, state-of-the-art suite.',
      metric: '100% single-suite flow',
    },
  ];

  const surgeonBenefits = [
    {
      icon: 'EyeIcon',
      title: 'Augmented Reality™ 3D Biometry',
      desc: "Generates a high-definition 3D reconstruction of your eye's unique anterior chamber, giving Dr. Marano and Dr. Raouf real-time anatomical depth guidance during every second of the procedure.",
      metric: 'High-definition 3D scan',
    },
    {
      icon: 'BoltIcon',
      title: 'Adaptive Cataract Density Profiling',
      desc: 'Automatically quantifies cataract hardness, allowing the laser to dynamically adapt fragmentation grids for the gentlest, most efficient tissue removal.',
      metric: 'Adaptive real-time density',
    },
    {
      icon: 'ScaleIcon',
      title: 'Digital Astigmatism Axis Guidance',
      desc: 'Projects digital alignment reticles directly onto the cornea, ensuring toric astigmatism and multi-focal lenses are placed with flawless rotational accuracy.',
      metric: 'Perfect IOL orientation',
    },
  ];

  const activeBenefits = activeTab === 'patient' ? patientBenefits : surgeonBenefits;

  return (
    <section id="lensar-ally" className="py-16 sm:py-24 relative overflow-hidden bg-[#0e1017]">
      {/* Background layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,163,255,0.04)_0%,transparent_50%)] pointer-events-none" />
      <div className={`absolute inset-0 opacity-25 pointer-events-none ${styles.gridLines}`} />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00a3ff]/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[140px] pointer-events-none" />

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
            precision into a seamless procedure.{' '}
            <strong>
              Dr. Marano and Dr. Raouf utilize the LENSAR® FEMTO laser system on every patient
              receiving a premium IOL to ensure maximum precision and outcome reliability.
            </strong>
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
              Patient Experience
            </button>
            <button
              onClick={() => handleTabChange('surgeon')}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'surgeon'
                  ? 'bg-primary text-[#020304] shadow-[0_0_20px_rgba(197,160,89,0.25)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon
                name="AcademicCapIcon"
                size={16}
                variant={activeTab === 'surgeon' ? 'solid' : 'outline'}
              />
              Surgical Advantages
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Dynamic interactive benefits grid */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <h3 className="font-display text-xl sm:text-3xl font-semibold text-foreground mb-4">
              {activeTab === 'patient'
                ? 'Designed for Comfort and Faster Recovery'
                : 'Empowering Our Surgeons with Sub-Micron Precision'}
            </h3>

            <div className="grid gap-4 sm:gap-6">
              {activeBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  onMouseMove={handleSpotlightMouseMove}
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

                {/* Biometric Laser-Guided Scanning Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none select-none">
                  {/* Rotating Outer Target Ticks */}
                  <svg
                    className="absolute inset-0 w-full h-full text-primary/30 animate-biometric-rotate"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeDasharray="2 12"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeDasharray="1 8"
                      fill="none"
                    />
                  </svg>

                  {/* Pulsing Capture Reticle */}
                  <div className="absolute top-1/2 left-1/2 w-48 h-48 animate-biometric-pulse">
                    <svg className="w-full h-full text-primary/60" viewBox="0 0 100 100">
                      {/* Corner crop marks */}
                      <path
                        d="M 10 30 L 10 10 L 30 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <path
                        d="M 70 10 L 90 10 L 90 30"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <path
                        d="M 10 70 L 10 90 L 30 90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <path
                        d="M 70 90 L 90 90 L 90 70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      {/* Inner target crosshair */}
                      <circle
                        cx="50"
                        cy="50"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        fill="none"
                        strokeDasharray="2 2"
                      />
                      <line
                        x1="50"
                        y1="25"
                        x2="50"
                        y2="40"
                        stroke="currentColor"
                        strokeWidth="0.75"
                      />
                      <line
                        x1="50"
                        y1="60"
                        x2="50"
                        y2="75"
                        stroke="currentColor"
                        strokeWidth="0.75"
                      />
                      <line
                        x1="25"
                        y1="50"
                        x2="40"
                        y2="50"
                        stroke="currentColor"
                        strokeWidth="0.75"
                      />
                      <line
                        x1="60"
                        y1="50"
                        x2="75"
                        y2="50"
                        stroke="currentColor"
                        strokeWidth="0.75"
                      />
                    </svg>
                  </div>

                  {/* Horizontal Scan Line Sweep */}
                  <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/80 to-transparent shadow-[0_0_10px_var(--primary)] animate-biometric-scan" />

                  {/* Subtle Tech Coordinates Overlay */}
                  <div className="absolute bottom-3 left-3 font-mono text-[8px] text-primary/70 tracking-wider">
                    SYS.ACTIVE // TRK: 509.2
                  </div>
                  <div className="absolute top-3 right-3 font-mono text-[8px] text-primary/70 tracking-wider">
                    CAL.LOCK: OK
                  </div>
                </div>

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
