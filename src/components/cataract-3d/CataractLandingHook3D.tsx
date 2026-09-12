'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CataractEyeScene } from './CataractEyeScene';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';

interface CataractLandingHook3DProps {
  externalStage?: number;
  onStageChange?: (stageIdx: number) => void;
}

export default function CataractLandingHook3D({
  externalStage,
  onStageChange,
}: CataractLandingHook3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<CataractEyeScene | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new CataractEyeScene({
      container: containerRef.current,
      isMinimal: true,
      onProgressUpdate: (_progress, stageIdx) => {
        setActiveStageIdx(stageIdx);
        onStageChange?.(stageIdx);
      },
    });
    sceneRef.current = scene;

    const handleResize = () => {
      scene.resize();
    };
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      scene.resize();
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      scene.dispose();
      sceneRef.current = null;
    };
  }, [onStageChange]);

  // Sync external stage commands (from bottom cards)
  useEffect(() => {
    if (externalStage !== undefined && sceneRef.current) {
      sceneRef.current.setStage(externalStage);
      setActiveStageIdx(externalStage);
    }
  }, [externalStage]);

  const togglePlay = () => {
    if (!sceneRef.current) return;
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);
    sceneRef.current.setPlaying(nextPlay);
  };

  const resetAngle = () => {
    if (!sceneRef.current) return;
    sceneRef.current.resetCamera();
  };

  const STAGES_DATA = [
    {
      num: '01',
      stageLabel: 'Stage 01',
      name: 'Youthful Crystalline Lens',
      metric: '99% Light Transmission',
      metricColor: 'text-cyan-400',
      finding: 'Parallel collimated rays refract cleanly onto macular fovea',
      dotColor: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.75)]',
      isCure: false,
    },
    {
      num: '02',
      stageLabel: 'Stage 02',
      name: 'Early Protein Clumping',
      metric: '85% Light Transmission',
      metricColor: 'text-amber-200',
      finding: 'Micro-protein aggregates scatter peripheral rays into night glare',
      dotColor: 'bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.7)]',
      isCure: false,
    },
    {
      num: '03',
      stageLabel: 'Stage 03',
      name: 'Nuclear Sclerosis',
      metric: '65% Light Transmission',
      metricColor: 'text-amber-400',
      finding: 'Nuclear amber density filters blue spectrum and impairs contrast',
      dotColor: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]',
      isCure: false,
    },
    {
      num: '04',
      stageLabel: 'Stage 04',
      name: 'Advanced Cataract',
      metric: '<28% Retinal Starvation',
      metricColor: 'text-rose-400',
      finding: 'Severe protein cross-linking blocks collimated rays from retina',
      dotColor: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.75)]',
      isCure: false,
    },
    {
      num: '05',
      stageLabel: 'Stage 05',
      name: 'Foldable Acrylic IOL',
      metric: '100% Optical Restoration',
      metricColor: 'text-primary',
      finding: 'Medical-grade acrylic IOL permanently eliminates cataract recurrence',
      dotColor: 'bg-primary shadow-[0_0_10px_rgba(197,160,89,0.9)]',
      isCure: true,
    },
  ];

  const current = STAGES_DATA[activeStageIdx] || STAGES_DATA[0];

  return (
    <div
      className="relative w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#090c14] via-[#06080e] to-[#030406] border border-white/[0.12] hover:border-primary/45 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.12)] overflow-hidden transition-all duration-500 group select-none"
      aria-label="3D Anatomical Cataract Formation and IOL Optical Simulation"
    >
      {/* Top Hairline Shimmer Accent */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent z-20 pointer-events-none" />

      {/* Canvas Viewport Area */}
      <div className="relative w-full h-[320px] sm:h-[350px] lg:h-[375px]">
        {/* Three.js canvas mounts here */}
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Cinematic Vignette Overlay to Enhance Depth */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(3,4,6,0.7)_100%)]" />

        {/* TOP FLOATING HUD */}
        <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex items-center justify-between z-20 pointer-events-none">
          {/* Left Clinical Identification Capsule */}
          <div className="pointer-events-auto backdrop-blur-xl bg-[#060810]/85 border border-white/10 px-3 sm:px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-2 sm:gap-2.5 transition-all">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.dotColor}`}
              />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${current.dotColor}`} />
            </span>
            <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">
              SAGITTAL ANATOMY
            </span>
            <span className="text-white/20 text-xs">/</span>
            <span
              className={`text-[10px] sm:text-[11px] font-semibold tracking-wide truncate max-w-[150px] sm:max-w-none ${
                current.isCure ? 'text-primary font-bold' : 'text-white'
              }`}
            >
              {current.name}
            </span>
          </div>

          {/* Right Playback & Camera Toolbar */}
          <div className="pointer-events-auto backdrop-blur-xl bg-[#060810]/85 border border-white/10 p-1 rounded-full shadow-xl flex items-center gap-1">
            <button
              onClick={resetAngle}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Reset Cross-Section View Angle"
              aria-label="Reset Cross-Section View Angle"
            >
              <Icon name="ArrowPathIcon" size={13} />
            </button>
            <button
              onClick={togglePlay}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-primary hover:bg-white/10 transition-colors"
              title={isPlaying ? 'Pause Time-Lapse' : 'Play Time-Lapse'}
              aria-label={isPlaying ? 'Pause Time-Lapse' : 'Play Time-Lapse'}
            >
              <Icon name={isPlaying ? 'PauseIcon' : 'PlayIcon'} size={13} />
            </button>
          </div>
        </div>

        {/* BOTTOM CLINICAL TELEMETRY GLASS CARD */}
        <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-20 pointer-events-none">
          <div className="pointer-events-auto backdrop-blur-2xl bg-[#05070e]/85 border border-white/[0.12] hover:border-white/20 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 transition-all">
            {/* Clinical Telemetry Readout */}
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[11px] sm:text-xs font-mono font-bold ${current.metricColor}`}
                >
                  {current.metric}
                </span>
                <span className="text-white/20 text-xs hidden sm:inline">•</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-white/90 truncate">
                  {current.stageLabel}: {current.name}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate leading-tight">
                {current.finding}
              </p>
            </div>

            {/* Seamless Pathway to Full 3D Clinical Simulator */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <span className="hidden xl:inline text-[9.5px] font-mono text-white/30 uppercase tracking-widest">
                Drag to orbit
              </span>
              <Link
                href="/cataract-education"
                onClick={() => {
                  trackEvent({
                    action: 'cataract_hook_3d_click',
                    category: 'Landing Hook',
                    label: 'Explore Full 3D Simulator',
                  });
                }}
                className="group/cta inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/35 text-primary text-[11px] font-bold tracking-wide transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98] shadow-sm whitespace-nowrap"
              >
                <span>Full 3D Guide</span>
                <Icon
                  name="ArrowRightIcon"
                  size={11}
                  className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
