'use client';

import React, { useState } from 'react';

type LensTab = 'panoptix' | 'vivity' | 'puresee';

export default function LensTechnologyDeepDiveSection() {
  const [activeTab, setActiveTab] = useState<LensTab>('vivity');

  const tabColors: Record<
    LensTab,
    { hex: string; bg: string; border: string; glow: string; text: string }
  > = {
    panoptix: {
      hex: '#8B5CF6',
      bg: '#8B5CF615',
      border: '#8B5CF630',
      glow: 'rgba(139,92,246,0.12)',
      text: '#a78bfa',
    },
    vivity: {
      hex: '#C5A059',
      bg: '#C5A05915',
      border: '#C5A05930',
      glow: 'rgba(197,160,89,0.12)',
      text: '#e9c481',
    },
    puresee: {
      hex: '#00A3FF',
      bg: '#00A3FF15',
      border: '#00A3FF30',
      glow: 'rgba(0,163,255,0.12)',
      text: '#38bdf8',
    },
  };

  return (
    <section
      id="physics"
      className="relative w-full bg-[#06070a] py-16 sm:py-24 overflow-hidden scroll-mt-16"
    >
      {/* Background dot grid and ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_40%_at_50%_100%,rgba(197,160,89,0.03)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[140px] opacity-5 pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: tabColors[activeTab].hex,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
            Optical Physics & Innovation
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-6">
            The Science of{' '}
            <span className="font-semibold text-gradient-primary">Seamless Sight.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
            Not all premium lenses work the same way. Explore the advanced science and
            light-manipulation technologies that restore youthful clarity to your vision.
          </p>
        </div>

        {/* Unified 3-Tab Switcher */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="relative p-1 bg-black/40 border border-white/[0.08] rounded-2xl flex w-full max-w-lg shadow-lg">
            {/* Active sliding background */}
            <div
              className="absolute top-1 bottom-1 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: 'calc(33.333% - 3px)',
                left:
                  activeTab === 'vivity'
                    ? '4px'
                    : activeTab === 'panoptix'
                      ? 'calc(33.333% + 2px)'
                      : 'calc(66.666% + 1px)',
                backgroundColor: tabColors[activeTab].bg,
                border: `1px solid ${tabColors[activeTab].border}`,
                boxShadow: `0 4px 12px ${tabColors[activeTab].glow}`,
              }}
            />

            <button
              onClick={() => setActiveTab('vivity')}
              className={`relative z-10 flex-1 py-3 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                activeTab === 'vivity'
                  ? 'text-[#e9c481]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Vivity<sup>®</sup> EDOF
            </button>
            <button
              onClick={() => setActiveTab('panoptix')}
              className={`relative z-10 flex-1 py-3 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                activeTab === 'panoptix'
                  ? 'text-[#a78bfa]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              PanOptix<sup>®</sup> Trifocal
            </button>
            <button
              onClick={() => setActiveTab('puresee')}
              className={`relative z-10 flex-1 py-3 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                activeTab === 'puresee'
                  ? 'text-[#38bdf8]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              TECNIS PureSee™
            </button>
          </div>
        </div>

        {/* Horizontally Arrayed Showcase: Diagram on Left, Lens Information Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Interactive Diagram Card */}
          <div
            className="glass-card border border-white/[0.08] backdrop-blur-md rounded-[32px] p-6 sm:p-8 lg:p-9 bg-[#0a0c13]/85 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full transition-all duration-500"
            style={{
              boxShadow: `0 20px 50px -12px ${tabColors[activeTab].glow}`,
            }}
          >
            {/* Top Specular Hairline */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            {/* Ambient Glow */}
            <div
              className="absolute -top-24 -right-24 w-52 h-52 rounded-full pointer-events-none blur-3xl opacity-15 transition-all duration-700"
              style={{ backgroundColor: tabColors[activeTab].hex }}
            />

            {/* Header: Diagram Label & Diagnostic Indicator Pill */}
            <div className="flex items-center justify-between gap-3 pb-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: tabColors[activeTab].hex }}
                />
                <span className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase font-semibold">
                  Interactive Ray Tracer
                </span>
              </div>

              <span className="optical-diagnostic-pill">
                <span className="indicator-dot" style={{ color: tabColors[activeTab].text }} />
                {activeTab === 'panoptix'
                  ? 'TRIFOCAL 3-ZONE'
                  : activeTab === 'vivity'
                    ? 'NON-DIFFRACTIVE'
                    : 'PURE-REFRACTIVE'}
              </span>
            </div>

            {/* Diagram Canvas */}
            <div className="my-auto py-6 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-[540px] aspect-[1.6/1] relative flex items-center justify-center">
                {activeTab === 'panoptix' ? (
                  /* PanOptix Diffractive Light-Splitting Simulator */
                  <svg
                    className="w-full max-w-[540px] aspect-[1.6/1] overflow-visible"
                    viewBox="0 0 500 320"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
                      </linearGradient>
                      <radialGradient id="focalPointGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                      </radialGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Incoming Light Waves/Rays */}
                    <g opacity="0.6">
                      <line
                        x1="10"
                        y1="90"
                        x2="140"
                        y2="90"
                        stroke="url(#laserGrad)"
                        strokeWidth="2"
                      />
                      <line
                        x1="10"
                        y1="120"
                        x2="140"
                        y2="120"
                        stroke="url(#laserGrad)"
                        strokeWidth="2"
                      />
                      <line
                        x1="10"
                        y1="160"
                        x2="140"
                        y2="160"
                        stroke="url(#laserGrad)"
                        strokeWidth="3"
                      />
                      <line
                        x1="10"
                        y1="200"
                        x2="140"
                        y2="200"
                        stroke="url(#laserGrad)"
                        strokeWidth="2"
                      />
                      <line
                        x1="10"
                        y1="230"
                        x2="140"
                        y2="230"
                        stroke="url(#laserGrad)"
                        strokeWidth="2"
                      />
                    </g>

                    {/* Lens Body Cross Section with Diffractive Steps */}
                    <g transform="translate(140, 60)">
                      <path
                        d="M 0,0 Q 20,100 0,200 Q -20,100 0,0"
                        fill="rgba(139, 92, 246, 0.08)"
                        stroke="rgba(139, 92, 246, 0.4)"
                        strokeWidth="2"
                      />
                      <path
                        d="M 2,40 C 6,45 6,55 2,60 M 4,70 C 8,75 8,85 4,90 M 5,95 C 10,100 10,110 5,115 M 4,120 C 8,125 8,135 4,140 M 2,150 C 6,155 6,165 2,170"
                        stroke="#8B5CF6"
                        fill="none"
                        strokeWidth="1.5"
                      />
                    </g>

                    {/* Refracted & Split Rays to 3 Distinct Focal Points */}
                    <g filter="url(#glow)">
                      {/* Distance Rays (Focus at Retina: x=450, y=160) */}
                      <path d="M 144,90 L 450,160" stroke="#8B5CF6" strokeWidth="2" opacity="0.9" />
                      <path
                        d="M 144,160 L 450,160"
                        stroke="#8B5CF6"
                        strokeWidth="2.5"
                        opacity="0.9"
                      />
                      <path
                        d="M 144,230 L 450,160"
                        stroke="#8B5CF6"
                        strokeWidth="2"
                        opacity="0.9"
                      />

                      {/* Intermediate Rays (Focus at 60cm: x=320, y=160 -> Crosses to Retina) */}
                      <path
                        d="M 144,90 L 320,160 L 450,195"
                        stroke="#EC4899"
                        strokeWidth="1.5"
                        opacity="0.8"
                      />
                      <path
                        d="M 144,230 L 320,160 L 450,125"
                        stroke="#EC4899"
                        strokeWidth="1.5"
                        opacity="0.8"
                      />

                      {/* Near Rays (Focus at 40cm: x=230, y=160 -> Crosses to Retina) */}
                      <path
                        d="M 144,90 L 230,160 L 450,225"
                        stroke="#10B981"
                        strokeWidth="1.5"
                        opacity="0.8"
                      />
                      <path
                        d="M 144,230 L 230,160 L 450,95"
                        stroke="#10B981"
                        strokeWidth="1.5"
                        opacity="0.8"
                      />

                      {/* Scattered Light Simulation for Halos (Soft Diffuse Rays) */}
                      <path
                        d="M 144,90 L 450,135"
                        stroke="#8B5CF6"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                        opacity="0.4"
                      />
                      <path
                        d="M 144,230 L 450,185"
                        stroke="#8B5CF6"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                        opacity="0.4"
                      />
                    </g>

                    {/* Focal Points along the visual axis */}
                    {/* Near Focus (40cm) */}
                    <circle cx="230" cy="160" r="4" fill="#10B981" />
                    <circle cx="230" cy="160" r="10" fill="none" stroke="#10B981" opacity="0.4" />

                    {/* Intermediate Focus (60cm) */}
                    <circle cx="320" cy="160" r="4" fill="#EC4899" />
                    <circle cx="320" cy="160" r="10" fill="none" stroke="#EC4899" opacity="0.4" />

                    {/* Distance Focus (Retina / Infinity) */}
                    <circle cx="450" cy="160" r="5" fill="#8B5CF6" />
                    <circle
                      cx="450"
                      cy="160"
                      r="14"
                      fill="url(#focalPointGlow)"
                      className="animate-pulse"
                    />

                    {/* Retinal Plane Indicator */}
                    <line
                      x1="450"
                      y1="40"
                      x2="450"
                      y2="280"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                    <text
                      x="460"
                      y="55"
                      fill="rgba(255,255,255,0.4)"
                      fontSize="9"
                      fontWeight="bold"
                      letterSpacing="1"
                    >
                      RETINA
                    </text>

                    {/* Explanatory Annotations inside Diagram with Pointer Lines */}
                    <text x="160" y="235" fill="#10B981" fontSize="13" fontWeight="bold">
                      NEAR (40cm)
                    </text>
                    <line
                      x1="205"
                      y1="220"
                      x2="228"
                      y2="173"
                      stroke="#10B981"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />

                    <text x="250" y="95" fill="#EC4899" fontSize="13" fontWeight="bold">
                      INTERMEDIATE (60cm)
                    </text>
                    <line
                      x1="300"
                      y1="105"
                      x2="320"
                      y2="146"
                      stroke="#EC4899"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />

                    <text x="380" y="235" fill="#8B5CF6" fontSize="13" fontWeight="bold">
                      DISTANCE (6m+)
                    </text>
                    <line
                      x1="430"
                      y1="220"
                      x2="447"
                      y2="178"
                      stroke="#8B5CF6"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />

                    <text
                      x="290"
                      y="75"
                      fill="rgba(139,92,246,0.9)"
                      fontSize="12"
                      fontWeight="semibold"
                    >
                      Scattered Light (Halos)
                    </text>
                  </svg>
                ) : activeTab === 'vivity' ? (
                  /* Clareon Vivity Wavefront-Shaping (Non-Diffractive) Simulator */
                  <svg
                    className="w-full max-w-[540px] aspect-[1.6/1] overflow-visible"
                    viewBox="0 0 500 320"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="vivityLaserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
                        <stop offset="100%" stopColor="#C5A059" stopOpacity="0.4" />
                      </linearGradient>
                      <linearGradient id="continuousBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C5A059" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#C5A059" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#C5A059" stopOpacity="0.05" />
                      </linearGradient>
                      <filter id="vivityGlow">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Incoming Light Waves/Rays */}
                    <g opacity="0.6">
                      <line
                        x1="10"
                        y1="90"
                        x2="140"
                        y2="90"
                        stroke="url(#vivityLaserGrad)"
                        strokeWidth="2"
                      />
                      <line
                        x1="10"
                        y1="120"
                        x2="140"
                        y2="120"
                        stroke="url(#vivityLaserGrad)"
                        strokeWidth="2"
                      />
                      <line
                        x1="10"
                        y1="160"
                        x2="140"
                        y2="160"
                        stroke="url(#vivityLaserGrad)"
                        strokeWidth="3"
                      />
                      <line
                        x1="10"
                        y1="200"
                        x2="140"
                        y2="200"
                        stroke="url(#vivityLaserGrad)"
                        strokeWidth="2"
                      />
                      <line
                        x1="10"
                        y1="230"
                        x2="140"
                        y2="230"
                        stroke="url(#vivityLaserGrad)"
                        strokeWidth="2"
                      />
                    </g>

                    {/* Lens Body Cross Section with Central Transition Wavefront Element */}
                    <g transform="translate(140, 60)">
                      <path
                        d="M 0,0 Q 24,100 0,200 Q -20,100 0,0"
                        fill="rgba(197, 160, 89, 0.08)"
                        stroke="rgba(197, 160, 89, 0.4)"
                        strokeWidth="2"
                      />
                      {/* Central Elevation Feature (Wavefront Element ~1 micron) */}
                      <path
                        d="M 2,85 Q 8,100 2,115"
                        stroke="#C5A059"
                        fill="#C5A059"
                        fillOpacity="0.4"
                        strokeWidth="2"
                      />
                    </g>

                    {/* Continuous Stretched Focal Beam (No Discontinuous Points) */}
                    <g filter="url(#vivityGlow)">
                      {/* Continuous focal envelope */}
                      <polygon points="144,160 450,150 450,170" fill="url(#continuousBeam)" />

                      {/* Wavefront Ray Paths forming continuous channel */}
                      <path
                        d="M 144,90 C 250,115 350,155 450,155"
                        stroke="#C5A059"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                      <path
                        d="M 144,230 C 250,205 350,165 450,165"
                        stroke="#C5A059"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                      <path
                        d="M 144,120 L 320,158 L 450,158"
                        stroke="#E9C481"
                        strokeWidth="1.5"
                        opacity="0.7"
                      />
                      <path
                        d="M 144,200 L 320,162 L 450,162"
                        stroke="#E9C481"
                        strokeWidth="1.5"
                        opacity="0.7"
                      />

                      {/* Central Axis Continuous Beam */}
                      <line
                        x1="144"
                        y1="160"
                        x2="450"
                        y2="160"
                        stroke="#C5A059"
                        strokeWidth="3.5"
                      />
                    </g>

                    {/* Focal Plane / Retina */}
                    <line
                      x1="450"
                      y1="40"
                      x2="450"
                      y2="280"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                    <text
                      x="460"
                      y="55"
                      fill="rgba(255,255,255,0.4)"
                      fontSize="9"
                      fontWeight="bold"
                      letterSpacing="1"
                    >
                      RETINA
                    </text>

                    {/* Stretched Focus Box indicator */}
                    <rect
                      x="300"
                      y="145"
                      width="150"
                      height="30"
                      fill="none"
                      stroke="rgba(197, 160, 89, 0.3)"
                      strokeDasharray="2,2"
                      rx="4"
                    />
                    <text x="315" y="137" fill="#C5A059" fontSize="9" fontWeight="bold">
                      EXTENDED DEPTH OF FOCUS (EDOF)
                    </text>

                    <text
                      x="180"
                      y="275"
                      fill="rgba(255,255,255,0.4)"
                      fontSize="9"
                      fontStyle="italic"
                    >
                      Zero scattered light = Monofocal night safety profile
                    </text>
                  </svg>
                ) : (
                  /* TECNIS PureSee Purely Refractive EDOF Simulator */
                  <svg
                    className="w-full max-w-[540px] aspect-[1.6/1] overflow-visible"
                    viewBox="0 0 500 320"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="pureseeLaserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
                        <stop offset="100%" stopColor="#00A3FF" stopOpacity="0.45" />
                      </linearGradient>
                      <linearGradient id="pureseeFocusBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#00A3FF" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#00A3FF" stopOpacity="0.08" />
                      </linearGradient>
                      <filter id="pureseeGlow">
                        <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Incoming Light Waves/Rays */}
                    <g opacity="0.65">
                      <line
                        x1="10"
                        y1="85"
                        x2="140"
                        y2="85"
                        stroke="url(#pureseeLaserGrad)"
                        strokeWidth="2"
                      />
                      <line
                        x1="10"
                        y1="115"
                        x2="140"
                        y2="115"
                        stroke="url(#pureseeLaserGrad)"
                        strokeWidth="2"
                      />
                      <line
                        x1="10"
                        y1="160"
                        x2="140"
                        y2="160"
                        stroke="url(#pureseeLaserGrad)"
                        strokeWidth="3"
                      />
                      <line
                        x1="10"
                        y1="205"
                        x2="140"
                        y2="205"
                        stroke="url(#pureseeLaserGrad)"
                        strokeWidth="2"
                      />
                      <line
                        x1="10"
                        y1="235"
                        x2="140"
                        y2="235"
                        stroke="url(#pureseeLaserGrad)"
                        strokeWidth="2"
                      />
                    </g>

                    {/* Purely Refractive Smooth Aspheric Lens Body (Zero Diffractive Micro-Steps) */}
                    <g transform="translate(140, 60)">
                      <path
                        d="M 0,0 Q 28,100 0,200 Q -22,100 0,0"
                        fill="rgba(0, 163, 255, 0.09)"
                        stroke="rgba(0, 163, 255, 0.45)"
                        strokeWidth="2"
                      />
                      {/* Continuous Refractive Power Profile Curves */}
                      <path
                        d="M 6,30 Q 18,100 6,170"
                        stroke="#00A3FF"
                        strokeOpacity="0.4"
                        fill="none"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                      <path
                        d="M 12,60 Q 22,100 12,140"
                        stroke="#00A3FF"
                        strokeOpacity="0.6"
                        fill="none"
                        strokeWidth="1.5"
                      />
                    </g>

                    {/* Continuous Pure Refractive Convergence Beam */}
                    <g filter="url(#pureseeGlow)">
                      {/* Smooth continuous focal envelope */}
                      <polygon points="152,160 450,146 450,174" fill="url(#pureseeFocusBeam)" />

                      {/* Smooth marginal and paraxial refractive ray paths */}
                      <path
                        d="M 148,85 C 240,120 350,158 450,158"
                        stroke="#00A3FF"
                        strokeWidth="1.8"
                        opacity="0.85"
                      />
                      <path
                        d="M 148,235 C 240,200 350,162 450,162"
                        stroke="#00A3FF"
                        strokeWidth="1.8"
                        opacity="0.85"
                      />
                      <path
                        d="M 148,115 L 340,159 L 450,159"
                        stroke="#38BDF8"
                        strokeWidth="1.5"
                        opacity="0.75"
                      />
                      <path
                        d="M 148,205 L 340,161 L 450,161"
                        stroke="#38BDF8"
                        strokeWidth="1.5"
                        opacity="0.75"
                      />

                      {/* Central continuous axis ray */}
                      <path d="M 152,160 L 450,160" stroke="#00A3FF" strokeWidth="3" />
                    </g>

                    {/* Retinal Plane */}
                    <line
                      x1="450"
                      y1="40"
                      x2="450"
                      y2="280"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                    <text
                      x="460"
                      y="55"
                      fill="rgba(255,255,255,0.4)"
                      fontSize="9"
                      fontWeight="bold"
                      letterSpacing="1"
                    >
                      RETINA
                    </text>

                    {/* Continuous Refractive EDOF Box */}
                    <rect
                      x="260"
                      y="142"
                      width="190"
                      height="36"
                      fill="none"
                      stroke="rgba(0, 163, 255, 0.35)"
                      strokeDasharray="2,2"
                      rx="4"
                    />
                    <text x="272" y="135" fill="#00A3FF" fontSize="9" fontWeight="bold">
                      PURE REFRACTIVE CONTINUOUS FOCUS
                    </text>

                    {/* Bottom Safety Highlight */}
                    <text
                      x="160"
                      y="275"
                      fill="rgba(255,255,255,0.5)"
                      fontSize="9"
                      fontStyle="italic"
                    >
                      Zero diffractive rings = 100% natural contrast &amp; zero contrast warning
                    </text>
                  </svg>
                )}
              </div>
            </div>

            {/* Simulated Mechanism Status Pill */}
            <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-center">
              <span className="text-[10px] text-primary uppercase font-bold tracking-widest block mb-1">
                Optical Mechanism
              </span>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-light">
                {activeTab === 'panoptix'
                  ? 'Incoming light is split by concentric micro-ridges, creating sharp focus points at 40cm, 60cm, and distance.'
                  : activeTab === 'vivity'
                    ? 'The central transition element alters the wavefront phase, stretching light into a single continuous tube of focus.'
                    : 'A purely refractive aspheric design continuously modulates optical power with zero diffractive rings, preserving 100% natural contrast.'}
              </p>
            </div>
          </div>

          {/* Right Column: Card with Lens Information */}
          <div
            className="glass-card border border-white/[0.08] backdrop-blur-md rounded-[32px] p-6 sm:p-8 lg:p-9 bg-[#0a0c13]/85 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full space-y-6 transition-all duration-500"
            style={{
              boxShadow: `0 20px 50px -12px ${tabColors[activeTab].glow}`,
            }}
          >
            {/* Top Specular Hairline */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            {/* Ambient Corner Glow */}
            <div
              className="absolute -top-24 -left-24 w-52 h-52 rounded-full pointer-events-none blur-3xl opacity-15 transition-all duration-700"
              style={{ backgroundColor: tabColors[activeTab].hex }}
            />

            {/* Header: Badge & Lens Title */}
            <div className="pb-5 border-b border-white/[0.06]">
              <span
                className="text-xs font-bold uppercase tracking-widest block mb-1.5"
                style={{ color: tabColors[activeTab].text }}
              >
                {activeTab === 'panoptix'
                  ? 'Proprietary ENLIGHTEN® Optics'
                  : activeTab === 'vivity'
                    ? 'Advanced X-WAVE™ Optics'
                    : 'Pure-Refractive EDOF Optics'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-foreground font-medium flex items-center">
                {activeTab === 'panoptix' ? (
                  <>
                    PanOptix<sup>®</sup> Trifocal
                  </>
                ) : activeTab === 'vivity' ? (
                  <>
                    Vivity<sup>®</sup> EDOF
                  </>
                ) : (
                  <>TECNIS PureSee™</>
                )}
              </h3>
            </div>

            {/* Clinical Physics Explanation */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Clinical Performance & Optical Architecture
              </h4>
              <p className="text-sm sm:text-[0.95rem] text-foreground/90 leading-relaxed font-light">
                {activeTab === 'panoptix' ? (
                  <>
                    The PanOptix trifocal design splits light into three distinct optical focal
                    points to deliver comprehensive spectacle independence{' '}
                    <sup className="text-[10px] ml-0.5">
                      <a href="#footnote-1" className="text-primary hover:underline font-mono">
                        [1]
                      </a>
                    </sup>
                    . By focusing 88% of available light directly to the retina, it optimizes light
                    utilization to provide sharp vision at reading distance (40cm), arm&apos;s
                    length (60cm), and far away.
                  </>
                ) : activeTab === 'vivity' ? (
                  <>
                    Unlike traditional multifocals, Clareon Vivity is non-diffractive{' '}
                    <sup className="text-[10px] ml-0.5">
                      <a href="#footnote-2" className="text-primary hover:underline font-mono">
                        [2]
                      </a>
                    </sup>
                    . It uses a microscopic 1-micron transition element to bend and stretch incoming
                    light rays into an elongated focus tube, delivering continuous intermediate and
                    distance vision with the glare-free contrast of a standard monofocal.
                  </>
                ) : (
                  <>
                    The TECNIS PureSee is a breakthrough purely refractive extended depth of focus
                    (EDOF) IOL from Johnson &amp; Johnson MedTech{' '}
                    <sup className="text-[10px] ml-0.5">
                      <a href="#footnote-3" className="text-primary hover:underline font-mono">
                        [3]
                      </a>
                    </sup>
                    . Utilizing continuous surface curvature without diffractive rings, 100% of
                    light is harnessed without scatter—delivering natural, dysphotopsia-free night
                    driving and clear intermediate vision.
                  </>
                )}
              </p>
            </div>

            {/* Performance Stats Bar (Visual Profile) */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground mb-2.5">
                Visual Profile
              </h4>
              {activeTab === 'panoptix' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
                    <span className="text-muted-foreground block mb-1">Near (Reading)</span>
                    <span className="font-semibold text-emerald-400">Excellent</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
                    <span className="text-muted-foreground block mb-1">Intermediate</span>
                    <span className="font-semibold text-emerald-400">Excellent</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
                    <span className="text-muted-foreground block mb-1">Night Driving</span>
                    <span className="font-semibold text-purple-400">Halos Present</span>
                  </div>
                </div>
              ) : activeTab === 'vivity' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
                    <span className="text-muted-foreground block mb-1">Near (Reading)</span>
                    <span className="font-semibold text-[#e9c481]">Functional</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
                    <span className="text-muted-foreground block mb-1">Intermediate</span>
                    <span className="font-semibold text-emerald-400">Excellent</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
                    <span className="text-muted-foreground block mb-1">Night Driving</span>
                    <span className="font-semibold text-emerald-400">Glare-Free</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
                    <span className="text-muted-foreground block mb-1">Near (Reading)</span>
                    <span className="font-semibold text-[#38bdf8]">
                      Functional{' '}
                      <sup className="text-[9px] ml-0.5">
                        <a href="#footnote-3" className="text-primary hover:underline font-mono">
                          [3]
                        </a>
                      </sup>
                    </span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
                    <span className="text-muted-foreground block mb-1">Intermediate</span>
                    <span className="font-semibold text-emerald-400">
                      Excellent{' '}
                      <sup className="text-[9px] ml-0.5">
                        <a href="#footnote-3" className="text-primary hover:underline font-mono">
                          [3]
                        </a>
                      </sup>
                    </span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
                    <span className="text-muted-foreground block mb-1">Night Driving</span>
                    <span className="font-semibold text-emerald-400">Monofocal-Like</span>
                  </div>
                </div>
              )}
            </div>

            {/* Key Promotional Advantage Highlight */}
            <div
              className="p-4 sm:p-5 rounded-2xl border flex flex-col justify-center"
              style={{
                backgroundColor: `${tabColors[activeTab].hex}0A`,
                borderColor: `${tabColors[activeTab].hex}26`,
              }}
            >
              <h4
                className="text-xs font-bold uppercase tracking-wider mb-1.5"
                style={{ color: tabColors[activeTab].text }}
              >
                {activeTab === 'panoptix'
                  ? 'Spectacle Independence'
                  : activeTab === 'vivity'
                    ? 'Monofocal-Like Contrast'
                    : 'Zero Diffractive Rings'}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeTab === 'panoptix' ? (
                  <>
                    Engineered for active lifestyles. Allows reading, screen work, and outdoor
                    hobbies without spectacles.
                  </>
                ) : activeTab === 'vivity' ? (
                  <>
                    Ideal for night driving, stargazing, and patients seeking a smooth visual range
                    with zero glare risk.
                  </>
                ) : (
                  <>
                    Engineered for seamless computer and functional near vision with 100% natural
                    contrast and zero glare warnings{' '}
                    <sup className="text-[10px] ml-0.5">
                      <a href="#footnote-3" className="text-primary hover:underline font-mono">
                        [3]
                      </a>
                    </sup>
                    .
                  </>
                )}
              </p>
            </div>

            {/* Laser-Guided Precision Alignment Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/[0.02] to-transparent border border-white/[0.08] flex items-start gap-4 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5"
                style={{ backgroundColor: tabColors[activeTab].hex }}
              />
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
                  Precision Execution
                </span>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Laser-Guided Optical Alignment
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                  At Marano Eye Care, we don&apos;t just implant these lenses. We program their
                  sub-micron coordinates into the LENSAR laser system, ensuring perfect optical
                  center alignment to maximize their high-tech design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
