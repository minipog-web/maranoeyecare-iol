'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Cataract3DPreviewPlaceholderProps {
  variant?: 'teaser' | 'full';
  isLoading?: boolean;
}

/**
 * Lightweight static SVG/CSS preview placeholder for the 3D Cataract Optical Simulators.
 * Renders immediately with zero WebGL or Three.js bundle overhead until scroll or click.
 */
export function Cataract3DPreviewPlaceholder({
  variant = 'teaser',
  isLoading = false,
}: Cataract3DPreviewPlaceholderProps) {
  const isFull = variant === 'full';

  return (
    <div
      className={`relative w-full ${
        isFull
          ? 'aspect-[16/10] sm:aspect-[16/9] rounded-3xl'
          : 'h-[320px] sm:h-[350px] lg:h-[375px] rounded-2xl sm:rounded-3xl'
      } bg-gradient-to-br from-[#070a12] via-[#0a0e18] to-[#05070c] border border-white/[0.1] overflow-hidden flex flex-col items-center justify-center p-6 text-center group`}
    >
      {/* Lightweight inline SVG anatomical lens schematic */}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 200"
        className="w-48 sm:w-64 h-auto opacity-80 pointer-events-none select-none mb-3"
      >
        <defs>
          <radialGradient id="lensCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c5a059" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="160" cy="100" r="88" fill="url(#lensCoreGlow)" />
        <circle
          cx="160"
          cy="100"
          r="72"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <ellipse
          cx="160"
          cy="100"
          rx="54"
          ry="38"
          fill="rgba(56,189,248,0.06)"
          stroke="rgba(56,189,248,0.35)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="160"
          cy="100"
          rx="32"
          ry="22"
          fill="rgba(197,160,89,0.18)"
          stroke="rgba(197,160,89,0.65)"
          strokeWidth="1.5"
        />
        <line x1="36" y1="100" x2="106" y2="100" stroke="rgba(197,160,89,0.5)" strokeWidth="1.5" />
        <line
          x1="214"
          y1="100"
          x2="284"
          y2="100"
          stroke="rgba(56,189,248,0.45)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-2.5 max-w-sm">
        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
          {isFull ? '3D Anatomical Lens Simulation' : '3D Optical Simulation Preview'}
        </span>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-primary/15 border border-primary/40 text-primary text-xs sm:text-sm font-semibold hover:bg-primary hover:text-black transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
              <span>Initializing 3D Optics...</span>
            </>
          ) : (
            <>
              <Icon name="PlayIcon" size={15} />
              <span>{isFull ? 'Launch 3D Anatomical Viewer' : 'Activate 3D Simulation'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

interface VisionSimulatorPreviewPlaceholderProps {
  isLoading?: boolean;
}

/**
 * Lightweight static preview placeholder for the Interactive Vision Simulator (#vision).
 * Preserves the #vision anchor target and layout geometry before the full simulator loads.
 */
export function VisionSimulatorPreviewPlaceholder({
  isLoading = false,
}: VisionSimulatorPreviewPlaceholderProps) {
  return (
    <section
      id="vision"
      className="py-16 sm:py-24 relative overflow-hidden scroll-mt-24 sm:scroll-mt-28 bg-section-simulator"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">
            Interactive Vision Simulator
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal sm:font-medium text-foreground mb-6 leading-tight">
            See Your <span className="font-semibold text-gradient-primary">Future Vision</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Compare visual outcomes across distance, intermediate, and near ranges to see which lens
            best fits your lifestyle.
          </p>
        </div>

        <div className="optical-bezel rounded-3xl p-2 sm:p-3.5 lg:p-5 mb-10 sm:mb-12">
          <div className="rounded-[1.6rem] p-6 sm:p-10 bg-[#090b11]/95 border border-white/[0.06] flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] text-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full max-w-2xl mb-8">
              <div className="rounded-2xl border border-white/[0.08] bg-black/50 p-4 sm:p-5 text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  Standard Baseline
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-200 mt-1">
                  Monofocal IOL
                </p>
                <div className="mt-3 h-2 w-3/4 rounded-full bg-slate-700/60" />
              </div>
              <div className="rounded-2xl border border-primary/35 bg-primary/[0.06] p-4 sm:p-5 text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                  Premium Upgrade
                </span>
                <p className="text-sm sm:text-base font-semibold text-white mt-1">
                  Vivity · PanOptix · PureSee
                </p>
                <div className="mt-3 h-2 w-full rounded-full bg-primary/50" />
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] rounded-xl bg-primary text-black text-sm sm:text-base font-bold hover:bg-accent transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  <span>Loading Interactive Simulator...</span>
                </>
              ) : (
                <>
                  <Icon name="EyeIcon" size={18} />
                  <span>Launch Interactive Vision Simulator</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
