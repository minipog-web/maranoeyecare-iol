'use client';

import React, { useState } from 'react';

type LensTab = 'panoptix' | 'vivity';

export default function LensTechnologyDeepDiveSection() {
  const [activeTab, setActiveTab] = useState<LensTab>('panoptix');

  return (
    <section className="relative w-full bg-[#0a0c10] py-20 sm:py-28 overflow-hidden">
      {/* Background dot grid and ambient glows */}
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[140px] opacity-10 pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: activeTab === 'panoptix' ? '#8B5CF6' : '#C5A059',
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

        {/* Unified Tab Switcher */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="relative p-1 bg-black/40 border border-white/[0.08] rounded-2xl flex w-full max-w-md shadow-lg">
            {/* Active sliding background */}
            <div
              className="absolute top-1 bottom-1 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: 'calc(50% - 4px)',
                left: activeTab === 'panoptix' ? '4px' : 'calc(50% + 2px)',
                backgroundColor: activeTab === 'panoptix' ? '#8B5CF615' : '#C5A05915',
                border: `1px solid ${activeTab === 'panoptix' ? '#8B5CF630' : '#C5A05930'}`,
                boxShadow: `0 4px 12px ${activeTab === 'panoptix' ? 'rgba(139,92,246,0.1)' : 'rgba(197,160,89,0.1)'}`,
              }}
            />

            <button
              onClick={() => setActiveTab('panoptix')}
              className={`relative z-10 flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded-xl ${
                activeTab === 'panoptix'
                  ? 'text-[#a78bfa]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              PanOptix<sup>®</sup> Trifocal
            </button>
            <button
              onClick={() => setActiveTab('vivity')}
              className={`relative z-10 flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded-xl ${
                activeTab === 'vivity'
                  ? 'text-[#e9c481]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Vivity<sup>®</sup> EDOF
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
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
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

                  {/* Lens Body Cross Section with Diffractive Concentric Rings */}
                  <g transform="translate(140, 60)">
                    <path
                      d="M 0,0 Q 25,100 0,200 Q -25,100 0,0"
                      fill="rgba(139, 92, 246, 0.08)"
                      stroke="rgba(139, 92, 246, 0.4)"
                      strokeWidth="2"
                    />
                    {/* Ring ridges representing the diffractive zones */}
                    <path
                      d="M 3,40 Q 15,40 3,45 M 6,80 Q 20,80 6,85 M 7,120 Q 20,120 7,125 M 3,160 Q 15,160 3,165"
                      stroke="rgba(139, 92, 246, 0.6)"
                      fill="none"
                      strokeWidth="1.5"
                    />
                  </g>

                  {/* Refracted & Split Rays (Diffractive orders) */}
                  <g filter="url(#glow)">
                    {/* Ray 1 (Distance Focus - Far) */}
                    <path d="M 152,160 L 450,160" stroke="#8B5CF6" strokeWidth="2" />
                    <path d="M 148,90 L 450,160" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.7" />
                    <path
                      d="M 148,230 L 450,160"
                      stroke="#8B5CF6"
                      strokeWidth="1.5"
                      opacity="0.7"
                    />

                    {/* Ray 2 (Intermediate Focus - 60cm) */}
                    <path
                      d="M 149,120 L 320,160 L 450,195"
                      stroke="#EC4899"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                    <path
                      d="M 149,200 L 320,160 L 450,125"
                      stroke="#EC4899"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />

                    {/* Ray 3 (Near Focus - 40cm) */}
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

                    {/* Scattered Halo Rays (The visual trade-off demonstration) */}
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

                  {/* Interactive/Animated Glows at the 3 focal points */}
                  <circle cx="450" cy="160" r="16" fill="url(#focalPointGlow)" />
                  <circle cx="320" cy="160" r="12" fill="url(#focalPointGlow)" opacity="0.7" />
                  <circle cx="230" cy="160" r="10" fill="url(#focalPointGlow)" opacity="0.7" />

                  {/* Explanatory Annotations inside Diagram with Pointer Lines */}
                  {/* Near (40cm) - Positioned below the axis */}
                  <text x="175" y="235" fill="#10B981" fontSize="9" fontWeight="bold">
                    NEAR (40cm)
                  </text>
                  <line
                    x1="205"
                    y1="223"
                    x2="228"
                    y2="173"
                    stroke="#10B981"
                    strokeWidth="1"
                    opacity="0.6"
                  />

                  {/* Intermediate (60cm) - Positioned above the axis */}
                  <text x="265" y="95" fill="#EC4899" fontSize="9" fontWeight="bold">
                    INTERMEDIATE (60cm)
                  </text>
                  <line
                    x1="315"
                    y1="107"
                    x2="320"
                    y2="146"
                    stroke="#EC4899"
                    strokeWidth="1"
                    opacity="0.6"
                  />

                  {/* Distance (6m+) - Positioned below the axis */}
                  <text x="395" y="235" fill="#8B5CF6" fontSize="9" fontWeight="bold">
                    DISTANCE (6m+)
                  </text>
                  <line
                    x1="430"
                    y1="223"
                    x2="447"
                    y2="178"
                    stroke="#8B5CF6"
                    strokeWidth="1"
                    opacity="0.6"
                  />

                  {/* Halo Indicator Label */}
                  <text x="310" y="80" fill="rgba(139,92,246,0.6)" fontSize="9" fontStyle="italic">
                    Scattered Light (Halos)
                  </text>
                </svg>
              ) : (
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
                      <stop offset="0%" stopColor="#C5A059" stopOpacity="0.8" />
                      <stop offset="40%" stopColor="#C5A059" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#C5A059" stopOpacity="0.2" />
                    </linearGradient>
                    <filter id="vivityGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
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
                    {/* Lens is mostly standard monofocal-smooth */}
                    <path
                      d="M 0,0 Q 25,100 0,200 Q -25,100 0,0"
                      fill="rgba(197, 160, 89, 0.08)"
                      stroke="rgba(197, 160, 89, 0.4)"
                      strokeWidth="2"
                    />
                    {/* The 1-micron flat optical element at the very center */}
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
                    {/* Continuous focal cylinder representing the EDOF range */}
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

                    {/* Central ray delayed and stretched */}
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

                  {/* Notes inside diagram highlighting low glare */}
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
              )}

              {/* Live Status Description box below diagram */}
              <div className="w-full mt-6 pt-6 border-t border-white/[0.06] text-center">
                <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-2">
                  Simulated Mechanism
                </span>
                <p className="text-sm text-foreground/80 leading-relaxed font-light">
                  {activeTab === 'panoptix'
                    ? 'Incoming light is split by concentric micro-ridges, creating sharp focus points at 40cm, 60cm, and distance.'
                    : 'The central transition element alters the wavefront phase, stretching light into a single continuous tube of focus.'}
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
                boxShadow:
                  activeTab === 'panoptix'
                    ? '0 10px 30px -10px rgba(139,92,246,0.15)'
                    : '0 10px 30px -10px rgba(197,160,89,0.15)',
              }}
            >
              <div className="bg-[#0e1017] rounded-[calc(1.5rem-1px)] p-6 sm:p-8 flex flex-col gap-6 border border-white/[0.03]">
                {/* Badge and Title */}
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-widest block mb-2"
                    style={{ color: activeTab === 'panoptix' ? '#a78bfa' : '#e9c481' }}
                  >
                    {activeTab === 'panoptix'
                      ? 'Proprietary ENLIGHTEN Optics'
                      : 'Advanced X-WAVE™ Wavefront Technology'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-foreground font-medium flex items-center">
                    {activeTab === 'panoptix' ? (
                      <>
                        PanOptix<sup>®</sup>
                      </>
                    ) : (
                      <>
                        Vivity<sup>®</sup>
                      </>
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
                      arm&apos;s length, and close-up{' '}
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
                      .
                    </>
                  ) : (
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
                      incoming light rays instead of splitting them{' '}
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
                      . This provides an elongated range of vision with the pristine contrast
                      sensitivity of a standard monofocal lens.
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
                        <span className="font-semibold text-emerald-400">
                          Excellent{' '}
                          <sup className="text-[9px] ml-0.5">
                            <a
                              href="https://pubmed.ncbi.nlm.nih.gov/32049015/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-mono"
                            >
                              [1]
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
                              href="https://pubmed.ncbi.nlm.nih.gov/32049015/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-mono"
                            >
                              [1]
                            </a>
                          </sup>
                        </span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Night Driving</span>
                        <span className="font-semibold text-purple-400">Halos Present</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Near (Reading)</span>
                        <span className="font-semibold text-[#e9c481]">
                          Functional{' '}
                          <sup className="text-[9px] ml-0.5">
                            <a
                              href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P190018"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-mono"
                            >
                              [2]
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
                              href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P190018"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-mono"
                            >
                              [2]
                            </a>
                          </sup>
                        </span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                        <span className="text-muted-foreground block mb-1">Night Driving</span>
                        <span className="font-semibold text-emerald-400">Glare-Free</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Key promotional advantage highlight */}
                <div
                  className="p-4 rounded-2xl border"
                  style={{
                    backgroundColor:
                      activeTab === 'panoptix' ? 'rgba(139,92,246,0.04)' : 'rgba(197,160,89,0.04)',
                    borderColor:
                      activeTab === 'panoptix' ? 'rgba(139,92,246,0.15)' : 'rgba(197,160,89,0.15)',
                  }}
                >
                  <h4
                    className="text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: activeTab === 'panoptix' ? '#a78bfa' : '#e9c481' }}
                  >
                    {activeTab === 'panoptix'
                      ? 'Spectacle Independence'
                      : 'Monofocal-Like Contrast'}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activeTab === 'panoptix' ? (
                      <>
                        Engineered for active lifestyles{' '}
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
                        . Allows reading, screen work, and outdoor hobbies without spectacles.
                      </>
                    ) : (
                      <>
                        Ideal for night driving, stargazing, and patients seeking a smooth, visual
                        range with zero glare risk{' '}
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
                style={{ backgroundColor: activeTab === 'panoptix' ? '#8B5CF6' : '#C5A059' }}
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
          <p>
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
        </div>
      </div>
    </section>
  );
}
