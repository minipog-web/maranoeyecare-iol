'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CataractEyeScene } from './CataractEyeScene';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';

export default function CataractLandingHook3D() {
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
  }, []);

  const togglePlay = () => {
    if (!sceneRef.current) return;
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);
    sceneRef.current.setPlaying(nextPlay);
  };

  const stageStatuses = [
    {
      label: 'Youthful Lens',
      detail: 'Light Focuses Cleanly',
      color: 'text-cyan-400',
      badge: '100% Light',
    },
    {
      label: 'Protein Clumping',
      detail: 'Light Scatters into Halos',
      color: 'text-amber-300',
      badge: '85% Light',
    },
    {
      label: 'Nuclear Sclerosis',
      detail: 'Amber Fogging & Scatter',
      color: 'text-amber-500',
      badge: '65% Light',
    },
    {
      label: 'Dense Cataract',
      detail: 'Light Blocked at Retina',
      color: 'text-rose-400',
      badge: 'Blocked',
    },
  ];

  const currentStatus = stageStatuses[activeStageIdx] || stageStatuses[0];
  const isLightBlocked = activeStageIdx >= 3;

  return (
    <div
      className="relative w-full rounded-2xl bg-gradient-to-b from-[#0c0f17] via-[#090b12] to-[#06070a] border border-white/[0.12] shadow-2xl overflow-hidden group hover:border-primary/40 transition-all duration-500"
      aria-label="3D Cataract Formation Minimalist Animation"
    >
      {/* Top Header Eyebrow */}
      <div className="px-4 py-3 border-b border-white/[0.07] flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            3D Time-Lapse
          </span>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px]">
          <span className={`font-semibold ${currentStatus.color}`}>{currentStatus.label}</span>
          <span className="text-white/20">•</span>
          <span className="text-white/70 font-mono">{currentStatus.badge}</span>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full h-[240px] sm:h-[270px] select-none bg-gradient-to-b from-[#080a10] to-[#040507]">
        {/* Three.js canvas mounts here */}
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Dynamic Light Blocking Warning Overlay at Mature Stage */}
        <div
          className={`absolute bottom-3 inset-x-3 transition-all duration-700 pointer-events-none ${
            isLightBlocked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="p-2 rounded-xl bg-red-950/80 border border-red-500/40 backdrop-blur-md flex items-center justify-between gap-2 shadow-lg">
            <div className="flex items-center gap-1.5 text-xs text-red-200">
              <Icon name="ShieldExclamationIcon" size={14} className="text-red-400 shrink-0" />
              <span className="font-semibold text-[11px]">
                Cataract Blocks Light from Reaching Retina
              </span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-red-400 bg-red-500/20 px-2 py-0.5 rounded-full">
              Optical Starvation
            </span>
          </div>
        </div>

        {/* Subtle Play/Pause & Reset controls */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-lg bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all backdrop-blur-md"
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <Icon name={isPlaying ? 'PauseIcon' : 'PlayIcon'} size={12} />
          </button>
        </div>

        {/* Stage Timeline Indicator Dots */}
        <div className="absolute top-2.5 left-3 flex items-center gap-1 z-10 pointer-events-none">
          {stageStatuses.map((st, i) => (
            <div
              key={st.label}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === activeStageIdx ? 'w-5 bg-primary' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-3 bg-[#07090e] border-t border-white/[0.07] flex items-center justify-between gap-3">
        <div className="text-[11px] text-muted-foreground truncate">
          <span className="text-white font-medium">Finding: </span>
          <span>{currentStatus.detail}</span>
        </div>

        <Link
          href="/cataract-education"
          onClick={() => {
            trackEvent({
              action: 'cataract_hook_3d_click',
              category: 'Landing Hook',
              label: 'Explore Full 3D Simulator',
            });
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold tracking-wide transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Full 3D Guide</span>
          <Icon name="ArrowRightIcon" size={11} />
        </Link>
      </div>
    </div>
  );
}
