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
      className="relative w-full bg-[#0a0c10] py-16 sm:py-24 overflow-hidden scroll-mt-16"
    >
      {/* Background dot grid and ambient glows */}
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
            The Physics of{' '}
            <span className="font-semibold text-gradient-primary">Visual Freedom.</span>
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
              className={`relative z-10 flex-1 py-3 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded-xl ${
                activeTab === 'vivity'
                  ? 'text-[#e9c481]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Vivity<sup>®</sup> EDOF
            </button>
            <button
              onClick={() => setActiveTab('panoptix')}
              className={`relative z-10 flex-1 py-3 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded-xl ${
                activeTab === 'panoptix'
                  ? 'text-[#a78bfa]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              PanOptix<sup>®</sup> Trifocal
            </button>
            <button
              onClick={() => setActiveTab('puresee')}
              className={`relative z-10 flex-1 py-3 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded-xl ${
                activeTab === 'puresee'
                  ? 'text-[#38bdf8]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              TECNIS PureSee™
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Side: Interactive Physics Diagram (7 Columns on Large Screens) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="glass-card border border-white/[0.08] backdrop-blur-md rounded-[32px] p-6 sm:p-10 bg-black/20 shadow-2xl relative overflow-hidden flex flex-col items-center">
              {/* Dynamic Lens Title Badge */}
              <div className="absolute top-4 right-6 text-[10px] font-mono tracking-widest text-muted-foreground/60 uppercase">
                Interactive Ray Tracer
              </div>

              {/* Dynamic SVG Ray Tracing Simulators */}
              {activeTab === 'panoptix' ? (
                /* PanOptix Diffractive Light-Splitting Simulator */
                <svg
                  className="w-full max-w-[560px] aspect-[1.6/1] overflow-visible"
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
                    <path d="M 144,230 L 450,160" stroke="#8B5CF6" strokeWidth="2" opacity="0.9" />

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

                    {/* Scattered Halo Rays */}
                    <path
                      d="M 144,90 Q 280,70 450,110"
                      stroke="rgba(139,92,246,0.3)"
                      strokeDasharray="3,3"
                      strokeWidth="1"
                    />
                    <path
                      d="M 144,230 Q 280,250 450,210"
                      stroke="rgba(139,92,246,0.3)"
                      strokeDasharray="3,3"
                      strokeWidth="1"
                    />
                  </g>

                  {/* Focal Points/Retinal Plane */}
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

                  {/* Animated Glows at 3 focal points */}
                  <circle cx="450" cy="160" r="10" fill="url(#focalPointGlow)" />
                  <circle cx="320" cy="160" r="8" fill="url(#focalPointGlow)" opacity="0.4" />
                  <circle cx="230" cy="160" r="7" fill="url(#focalPointGlow)" opacity="0.4" />

                  {/* Annotations */}
                  <text x="160" y="235" fill="#10B981" fontSize="13" fontWeight="bold">
                    NEAR (40cm)
                  </text>
                  <line
                    x1="205"
                    y1="223"
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
                    x1="315"
                    y1="107"
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
                    y1="223"
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
                /* Vivity Non-Diffractive Wavefront-Shaping Simulator */
                <svg
                  className="w-full max-w-[560px] aspect-[1.6/1] overflow-visible"
                  viewBox="0 0 500 320"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="vivityLaserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
                      <stop offset="100%" stopColor="#C5A059" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="focusTube" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C5A059" stopOpacity="0.35" />
                      <stop offset="40%" stopColor="#C5A059" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#C5A059" stopOpacity="0.05" />
                    </linearGradient>
                    <filter id="vivityGlow">
                      <feGaussianBlur stdDeviation="1" result="coloredBlur" />
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

                  {/* Lens Body Cross Section with 1-Micron Transition Plateau */}
                  <g transform="translate(140, 60)">
                    <path
                      d="M 0,0 Q 25,100 0,200 Q -25,100 0,0"
                      fill="rgba(197, 160, 89, 0.08)"
                      stroke="rgba(197, 160, 89, 0.4)"
                      strokeWidth="2"
                    />
                    <rect x="7" y="94" width="3" height="12" fill="#C5A059" rx="0.5" />
                    <path
                      d="M 6,90 C 8,92 8,108 6,110"
                      stroke="#C5A059"
                      fill="none"
                      strokeWidth="1.5"
                    />
                  </g>

                  {/* Stretched Wavefront & Elongated Focus Tube */}
                  <g filter="url(#vivityGlow)">
                    <polygon points="152,160 450,150 450,170" fill="url(#focusTube)" />
                    <path
                      d="M 148,90 L 320,158 L 450,159"
                      stroke="#C5A059"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                    <path
                      d="M 148,230 L 320,162 L 450,161"
                      stroke="#C5A059"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                    <path d="M 153,160 L 450,160" stroke="#C5A059" strokeWidth="3" />
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
                  className="w-full max-w-[560px] aspect-[1.6/1] overflow-visible"
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

              {/* Live Status Description box below diagram */}
              <div className="w-full mt-6 pt-6 border-t border-white/[0.06] text-center">
                <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-2">
                  Simulated Mechanism
                </span>
                <p className="text-sm text-foreground/80 leading-relaxed font-light">
                  {activeTab === 'panoptix'
                    ? 'Incoming light is split by concentric micro-ridges, creating sharp focus points at 40cm, 60cm, and distance.'
                    : activeTab === 'vivity'
                      ? 'The central transition element alters the wavefront phase, stretching light into a single continuous tube of focus.'
                      : 'A purely refractive aspheric design continuously modulates optical power with zero diffractive rings, preserving 100% natural contrast.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Educational & Promotional Content (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* The Lens Card Detail */}
            <div
              className="p-[1px] rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl shadow-xl transition-all duration-500"
              style={{
                boxShadow: `0 10px 30px -10px ${tabColors[activeTab].glow}`,
              }}
            >
              <div className="bg-[#0e1017] rounded-[calc(1.5rem-1px)] p-6 sm:p-8 flex flex-col gap-6 border border-white/[0.03]">
                {/* Badge and Title */}
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-widest block mb-2"
                    style={{ color: tabColors[activeTab].text }}
                  >
                    {activeTab === 'panoptix'
                      ? 'Proprietary ENLIGHTEN Optics'
                      : activeTab === 'vivity'
                        ? 'Advanced X-WAVE™ Wavefront Technology'
                        : 'Purely Refractive EDOF Innovation'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-foreground font-medium flex items-center">
                    {activeTab === 'panoptix' ? (
                      <>
                        PanOptix<sup>®</sup>
                      </>
                    ) : activeTab === 'vivity' ? (
                      <>
                        Vivity<sup>®</sup>
                      </>
                    ) : (
                      <>TECNIS PureSee™</>
                    )}
                  </h3>
                </div>

                {/* Physics explanation text */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                  {activeTab === 'panoptix' ? (
                    <>
                      The PanOptix trifocal design splits light into three distinct optical focus
                      paths to deliver true vision independence{' '}
                      <sup className="text-[10px] ml-0.5">
                        <a
                          href="https://pubmed.ncbi.nlm.nih.gov/32049015/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-mono"
                        >
                          [1]
                        </a>
                      </sup>
                      . By focusing 88% of available light directly to the retina, it optimizes
                      light utilization to provide clear, high-resolution vision at distance,
                      arm&apos;s length, and close-up.
                    </>
                  ) : activeTab === 'vivity' ? (
                    <>
                      Unlike traditional multifocals, Vivity is non-diffractive{' '}
                      <sup className="text-[10px] ml-0.5">
                        <a
                          href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P190018"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-mono"
                        >
                          [2]
                        </a>
                      </sup>
                      . It uses a microscopic 1-micron transition element to bend and stretch
                      incoming light rays instead of splitting them. This provides an elongated
                      range of vision with the pristine contrast sensitivity of a standard
                      monofocal.
                    </>
                  ) : (
                    <>
                      The TECNIS PureSee is a purely refractive extended depth of focus (EDOF) IOL
                      that delivers uninterrupted continuous vision without diffractive rings or
                      light splitting{' '}
                      <sup className="text-[10px] ml-0.5">
                        <a
                          href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P980040"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-mono"
                        >
                          [3]
                        </a>
                      </sup>
                      . By utilizing advanced continuous surface refraction, 100% of incoming light
                      is harnessed without scatter. It is the first FDA-approved EDOF lens with zero
                      contrast sensitivity warning, providing a dysphotopsia profile identical to a
                      monofocal control.
                    </>
                  )}
                </p>

                {/* Performance stats bar */}
                <div className="flex flex-col gap-4 pt-4 border-t border-white/[0.06]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Visual Profile
                  </h4>

                  {activeTab === 'panoptix' ? (
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Near (Reading)</span>
                        <span className="font-semibold text-emerald-400">Excellent</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Intermediate</span>
                        <span className="font-semibold text-emerald-400">Excellent</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Night Driving</span>
                        <span className="font-semibold text-purple-400">Halos Present</span>
                      </div>
                    </div>
                  ) : activeTab === 'vivity' ? (
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Near (Reading)</span>
                        <span className="font-semibold text-[#e9c481]">Functional</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Intermediate</span>
                        <span className="font-semibold text-emerald-400">Excellent</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Night Driving</span>
                        <span className="font-semibold text-emerald-400">Glare-Free</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Near (Reading)</span>
                        <span className="font-semibold text-[#38bdf8]">
                          Functional{' '}
                          <sup className="text-[9px] ml-0.5">
                            <a
                              href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P980040"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-mono"
                            >
                              [3]
                            </a>
                          </sup>
                        </span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Intermediate</span>
                        <span className="font-semibold text-emerald-400">
                          Excellent{' '}
                          <sup className="text-[9px] ml-0.5">
                            <a
                              href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P980040"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-mono"
                            >
                              [3]
                            </a>
                          </sup>
                        </span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Night Driving</span>
                        <span className="font-semibold text-emerald-400">Monofocal-Like</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Key promotional advantage highlight */}
                <div
                  className="p-4 rounded-2xl border"
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
                        : 'Zero Diffractive Rings & 100% Contrast'}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activeTab === 'panoptix' ? (
                      <>
                        Engineered for active lifestyles. Allows reading, screen work, and outdoor
                        hobbies without spectacles.
                      </>
                    ) : activeTab === 'vivity' ? (
                      <>
                        Ideal for night driving, stargazing, and patients seeking a smooth, visual
                        range with zero glare risk.
                      </>
                    ) : (
                      <>
                        Engineered for patients seeking seamless computer and functional near vision
                        with the exact high-contrast clarity and dysphotopsia-free night profile of
                        a standard monofocal lens{' '}
                        <sup className="text-[10px] ml-0.5">
                          <a
                            href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P980040"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-mono"
                          >
                            [3]
                          </a>
                        </sup>
                        .
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Promotional LENSAR Precision Callout Card */}
            <div className="glass-card border border-white/[0.08] backdrop-blur-md rounded-3xl p-6 bg-gradient-to-r from-primary/5 to-transparent relative overflow-hidden flex items-start gap-4">
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
                <p className="text-xs text-muted-foreground leading-relaxed">
                  At Marano Eye Care, we don&apos;t just implant these lenses. We program their
                  sub-micron coordinates into the LENSAR laser system, ensuring perfect optical
                  center alignment to maximize their high-tech design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Footnote References */}
        <div className="mt-16 pt-8 border-t border-white/[0.05] text-[10px] text-muted-foreground/60 leading-relaxed max-w-5xl">
          <p className="mb-2 uppercase tracking-widest text-[9px] font-bold text-primary">
            Section References:
          </p>
          <p className="mb-2">
            <strong>
              [1] PanOptix<sup>®</sup> Clinical Performance:
            </strong>{' '}
            Based on Alcon FDA PMA Approval registry. Evaluates patient outcomes on diffractive
            trifocal rings, indicating an 88% light transmission rate to the retina and a 99%
            patient satisfaction/spectacle independence rate.{' '}
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/32049015/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              [View PubMed Study]
            </a>
          </p>
          <p className="mb-2">
            <strong>
              [2] Clareon<sup>®</sup> Vivity<sup>®</sup> Optical Assessment:
            </strong>{' '}
            FDA PMA Approval P190018 study. Wavefront-shaping X-WAVE™ technology assessment confirms
            monofocal-like visual disturbance profile (low glare/halos) with extended range of
            focus.{' '}
            <a
              href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P190018"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              [View FDA PMA Registry]
            </a>
          </p>
          <p>
            <strong>[3] TECNIS PureSee™ FDA Approval &amp; Clinical Data:</strong> FDA PMA Approval
            P980040 registry. Confirms purely refractive extended depth of focus with zero
            diffractive rings, zero contrast sensitivity warning, and a dysphotopsia (glare/halo)
            rate comparable to a monofocal control lens.{' '}
            <a
              href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P980040"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              [View FDA PMA Registry]
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
