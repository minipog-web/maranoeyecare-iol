'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CataractEyeScene, CameraViewMode, LandmarkMap } from './CataractEyeScene';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';

export interface CataractEducation3DViewerProps {
  activeStageId?: number;
  onStageChange?: (stageId: number) => void;
  className?: string;
}

const STAGES = [
  {
    id: 1,
    name: 'Youthful Lens',
    progress: 0.05,
    transmission: '99%',
    status: '100% Focused Transmission',
    color: 'text-cyan-400',
  },
  {
    id: 2,
    name: 'Early Clouding',
    progress: 0.35,
    transmission: '85%',
    status: 'Mild Halo & Glare Scatter',
    color: 'text-amber-300',
  },
  {
    id: 3,
    name: 'Nuclear Sclerosis',
    progress: 0.65,
    transmission: '65%',
    status: 'Severe Yellow Filtering & Scatter',
    color: 'text-amber-500',
  },
  {
    id: 4,
    name: 'Advanced Opaque',
    progress: 0.95,
    transmission: '<28%',
    status: 'Critical Retinal Light Starvation',
    color: 'text-red-400',
  },
  {
    id: 5,
    name: 'Clear Acrylic IOL',
    progress: 1.0,
    isIOL: true,
    transmission: '100%',
    status: 'Permanent Crystal Clarity Restored',
    color: 'text-primary',
  },
];

export default function CataractEducation3DViewer({
  activeStageId = 1,
  onStageChange,
  className = '',
}: CataractEducation3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<CataractEyeScene | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0.0);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(2.0);
  const [showLabels, setShowLabels] = useState(true);
  const [isIOLActive, setIsIOLActive] = useState(false);
  const [cameraView, setCameraView] = useState<CameraViewMode>('crossSection');

  // Dynamic 3D-to-screen projected anatomical landmarks
  const [landmarks, setLandmarks] = useState<LandmarkMap>({
    cornea: { x: 33, y: 50, visible: true },
    lens: { x: 42, y: 44, visible: true },
    opticNerve: { x: 72, y: 44, visible: true },
    macula: { x: 74, y: 54, visible: true },
  });

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new CataractEyeScene({
      container: containerRef.current,
      isMinimal: false,
      onProgressUpdate: (progress, stageIdx) => {
        setCurrentProgress(progress);
        setActiveStageIdx(stageIdx);
      },
      onLandmarksUpdate: (newLandmarks) => {
        setLandmarks(newLandmarks);
      },
    });
    scene.setPlaySpeed(0.045 * 2.0);
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

  // Sync external stage prop changes
  useEffect(() => {
    if (!sceneRef.current) return;

    const stage = STAGES.find((s) => s.id === activeStageId);
    if (!stage) return;

    if (stage.isIOL) {
      setIsIOLActive(true);
      sceneRef.current.setIOLMode(true);
      sceneRef.current.setPlaying(false);
      setIsPlaying(false);
      setCurrentProgress(1.0);
      setActiveStageIdx(4);
    } else {
      setIsIOLActive(false);
      sceneRef.current.setIOLMode(false);
      sceneRef.current.setProgress(stage.progress);
      setCurrentProgress(stage.progress);
      setActiveStageIdx(stage.id - 1);
    }
  }, [activeStageId]);

  // Handle stage tab click
  const handleStageClick = (stage: (typeof STAGES)[0]) => {
    if (!sceneRef.current) return;

    trackEvent({
      action: 'cataract_3d_stage_click',
      category: '3D Education',
      label: stage.name,
    });

    if (stage.isIOL) {
      setIsIOLActive(true);
      sceneRef.current.setIOLMode(true);
      sceneRef.current.setPlaying(false);
      setIsPlaying(false);
      setCurrentProgress(1.0);
      setActiveStageIdx(4);
      onStageChange?.(5);
    } else {
      setIsIOLActive(false);
      sceneRef.current.setIOLMode(false);
      sceneRef.current.setProgress(stage.progress);
      setCurrentProgress(stage.progress);
      setActiveStageIdx(stage.id - 1);
      onStageChange?.(stage.id);
    }
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!sceneRef.current) return;
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);
    if (nextPlay && isIOLActive) {
      setIsIOLActive(false);
      sceneRef.current.setIOLMode(false);
    }
    sceneRef.current.setPlaying(nextPlay);
  };

  // Timeline Scrubber Change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentProgress(val);
    if (sceneRef.current) {
      if (isIOLActive) {
        setIsIOLActive(false);
        sceneRef.current.setIOLMode(false);
      }
      sceneRef.current.setProgress(val);
    }
  };

  // Speed Toggle
  const handleSpeedCycle = () => {
    const speeds = [0.5, 1.0, 2.0];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (sceneRef.current) {
      sceneRef.current.setPlaySpeed(0.045 * nextSpeed);
    }
  };

  // Camera View Switching
  const handleResetAngle = () => {
    setCameraView('crossSection');
    sceneRef.current?.resetCamera();
  };

  const handleViewChange = (view: CameraViewMode) => {
    setCameraView(view);
    sceneRef.current?.setCameraView(view);
  };

  // Active stage details
  const activeStage = STAGES[activeStageIdx] || STAGES[0];
  const transmissionNum = isIOLActive
    ? 100
    : Math.max(20, Math.round(99 - Math.pow(currentProgress, 1.1) * 75));
  const proteinIndex = isIOLActive ? 0 : Math.round(currentProgress * 100);

  return (
    <div
      className={`relative w-full rounded-3xl bg-gradient-to-b from-[#090b10] via-[#07090e] to-[#040508] border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden ${className}`}
      aria-label="3D Anatomical Cataract Formation Time-Lapse"
    >
      {/* Top Header & Clinical Telemetry Bar */}
      <div className="p-4 sm:p-6 border-b border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.01]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold uppercase tracking-[0.18em]">
              <Icon name="EyeIcon" size={13} />
              <span>3D Biometric Ocular Time-Lapse</span>
            </span>
            <span className="hidden sm:inline text-white/30 text-xs">•</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Sagittal Cutaway · Crystalline Lens
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-2xl font-light text-foreground">
            Progressive Lens Protein Aggregation &amp; Light Scatter
          </h3>
        </div>

        {/* Live Telemetry Gauges */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Light Transmission Meter */}
          <div className="px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Light Transmission
              </p>
              <p className="text-sm font-bold text-foreground font-mono">{transmissionNum}%</p>
            </div>
          </div>

          {/* Protein Clumping Index */}
          <div className="px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3 shadow-inner">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                proteinIndex > 60
                  ? 'bg-amber-600'
                  : proteinIndex > 25
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
              }`}
            />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Protein Opacity
              </p>
              <p className="text-sm font-bold text-foreground font-mono">
                {proteinIndex}% Clumping
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas Area */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px] bg-gradient-to-b from-[#06080d] via-[#040508] to-[#020305] select-none cursor-grab active:cursor-grabbing">
        {/* Three.js mounts here */}
        <div ref={containerRef} className="w-full h-full" />

        {/* Dynamic 3D-Anchored Anatomical Labels & Precision Leader Lines */}
        {showLabels && (
          <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
            {/* SVG Precision Leader Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="0.4"
                    floodColor="#ffffff"
                    floodOpacity="0.3"
                  />
                </filter>
              </defs>

              {/* Cornea Leader Line (Cyan) */}
              {landmarks.cornea.visible &&
                (() => {
                  const px = landmarks.cornea.x;
                  const py = landmarks.cornea.y;
                  const cardLeft = Math.max(3, Math.min(22, px - 16));
                  const cardTop = Math.max(5, Math.min(24, py - 28));
                  const anchorX = cardLeft + 14;
                  const anchorY = cardTop + 5;
                  const elbowX = px - 4;
                  const elbowY = py - 14;
                  return (
                    <g className="text-cyan-400">
                      <polyline
                        points={`${px},${py} ${elbowX},${elbowY} ${anchorX},${anchorY}`}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                        strokeDasharray="2 1.5"
                        vectorEffect="non-scaling-stroke"
                        opacity="0.8"
                      />
                      <circle cx={anchorX} cy={anchorY} r="0.6" fill="#38bdf8" />
                    </g>
                  );
                })()}

              {/* Crystalline Lens Leader Line (Primary Gold) */}
              {landmarks.lens.visible &&
                (() => {
                  const px = landmarks.lens.x;
                  const py = landmarks.lens.y;
                  const cardLeft = Math.max(28, Math.min(48, px - 7));
                  const cardTop = Math.max(4, Math.min(18, py - 32));
                  const anchorX = cardLeft + 8;
                  const anchorY = cardTop + 6;
                  const elbowX = px;
                  const elbowY = py - 14;
                  return (
                    <g className="text-primary">
                      <polyline
                        points={`${px},${py} ${elbowX},${elbowY} ${anchorX},${anchorY}`}
                        fill="none"
                        stroke="#c5a059"
                        strokeWidth="1.4"
                        strokeDasharray="2 1.5"
                        vectorEffect="non-scaling-stroke"
                        opacity="0.9"
                      />
                      <circle cx={anchorX} cy={anchorY} r="0.7" fill="#c5a059" />
                    </g>
                  );
                })()}

              {/* Optic Nerve Leader Line (Rose/Nasal) */}
              {landmarks.opticNerve.visible &&
                (() => {
                  const px = landmarks.opticNerve.x;
                  const py = landmarks.opticNerve.y;
                  const cardLeft = Math.max(72, Math.min(84, px + 3));
                  const cardTop = Math.max(16, Math.min(28, py - 20));
                  const anchorX = cardLeft;
                  const anchorY = cardTop + 5;
                  const elbowX = px + 2;
                  const elbowY = py - 8;
                  return (
                    <g className="text-rose-400">
                      <polyline
                        points={`${px},${py} ${elbowX},${elbowY} ${anchorX},${anchorY}`}
                        fill="none"
                        stroke="#fb7185"
                        strokeWidth="1.2"
                        strokeDasharray="2 1.5"
                        vectorEffect="non-scaling-stroke"
                        opacity="0.8"
                      />
                      <circle cx={anchorX} cy={anchorY} r="0.6" fill="#fb7185" />
                    </g>
                  );
                })()}

              {/* Macula Leader Line (Amber/Focal Spot) */}
              {landmarks.macula.visible &&
                (() => {
                  const px = landmarks.macula.x;
                  const py = landmarks.macula.y;
                  const cardLeft = Math.max(68, Math.min(84, px + 4));
                  const cardTop = Math.min(82, Math.max(64, py + 12));
                  const anchorX = cardLeft;
                  const anchorY = cardTop + 4;
                  const elbowX = px + 3;
                  const elbowY = py + 8;
                  return (
                    <g className="text-amber-400">
                      <polyline
                        points={`${px},${py} ${elbowX},${elbowY} ${anchorX},${anchorY}`}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="1.3"
                        strokeDasharray="2 1.5"
                        vectorEffect="non-scaling-stroke"
                        opacity="0.9"
                      />
                      <circle cx={anchorX} cy={anchorY} r="0.6" fill="#fbbf24" />
                    </g>
                  );
                })()}
            </svg>

            {/* Target Pinpoint Indicators (Directly on 3D Physical Structures) */}
            {/* 1. Cornea Target Pin */}
            {landmarks.cornea.visible && (
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                style={{ left: `${landmarks.cornea.x}%`, top: `${landmarks.cornea.y}%` }}
              >
                <div className="w-3.5 h-3.5 rounded-full border border-cyan-400/80 bg-cyan-400/20 animate-ping absolute" />
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] border border-white" />
              </div>
            )}

            {/* 2. Crystalline Lens Target Pin */}
            {landmarks.lens.visible && (
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                style={{ left: `${landmarks.lens.x}%`, top: `${landmarks.lens.y}%` }}
              >
                <div className="w-4 h-4 rounded-full border border-primary/80 bg-primary/25 animate-pulse absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(197,160,89,0.9)] border border-white" />
              </div>
            )}

            {/* 3. Optic Nerve Target Pin */}
            {landmarks.opticNerve.visible && (
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                style={{ left: `${landmarks.opticNerve.x}%`, top: `${landmarks.opticNerve.y}%` }}
              >
                <div className="w-3.5 h-3.5 rounded-full border border-rose-400/80 bg-rose-400/20 animate-pulse absolute" />
                <div className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#fb7185] border border-white" />
              </div>
            )}

            {/* 4. Macula Target Pin */}
            {landmarks.macula.visible && (
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                style={{ left: `${landmarks.macula.x}%`, top: `${landmarks.macula.y}%` }}
              >
                <div className="w-4 h-4 rounded-full border border-amber-400/80 bg-amber-400/25 animate-ping absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24] border border-white" />
              </div>
            )}

            {/* Anchored Callout Badges in Balanced Quadrants */}
            {/* 1. Cornea Badge (Upper-Left Quadrant) */}
            {landmarks.cornea.visible &&
              (() => {
                const px = landmarks.cornea.x;
                const py = landmarks.cornea.y;
                const cardLeft = Math.max(3, Math.min(22, px - 16));
                const cardTop = Math.max(5, Math.min(24, py - 28));
                return (
                  <div
                    className="absolute pointer-events-auto transition-all duration-150"
                    style={{ left: `${cardLeft}%`, top: `${cardTop}%` }}
                  >
                    <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/35 text-[11px] shadow-2xl flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-cyan-400">
                          Anterior Optics
                        </span>
                      </div>
                      <span className="font-bold text-white leading-tight">
                        Cornea &amp; Anterior Chamber
                      </span>
                      <span className="text-[10px] text-cyan-200/80 leading-tight">
                        Initial Light Refraction
                      </span>
                    </div>
                  </div>
                );
              })()}

            {/* 2. Crystalline Lens Badge (Upper-Center Quadrant) */}
            {landmarks.lens.visible &&
              (() => {
                const px = landmarks.lens.x;
                const py = landmarks.lens.y;
                const cardLeft = Math.max(28, Math.min(48, px - 7));
                const cardTop = Math.max(4, Math.min(18, py - 32));
                return (
                  <div
                    className="absolute pointer-events-auto transition-all duration-150"
                    style={{ left: `${cardLeft}%`, top: `${cardTop}%` }}
                  >
                    <div className="bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-primary/50 text-[11px] shadow-[0_0_20px_rgba(197,160,89,0.25)] flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[9px] uppercase tracking-wider font-bold text-primary">
                          {isIOLActive ? 'Permanent Cure' : 'Cataract Focus Site'}
                        </span>
                      </div>
                      <span className="font-bold text-white leading-tight">
                        {isIOLActive ? 'Clear Acrylic IOL' : 'Crystalline Lens'}
                      </span>
                      <span className="text-[10px] text-amber-200/90 leading-tight">
                        {isIOLActive
                          ? '100% Focused Transmission · Never Clouds'
                          : activeStageIdx === 0
                            ? 'Soluble Protein Grid · 0% Scatter'
                            : `${STAGES[activeStageIdx]?.status} (${STAGES[activeStageIdx]?.transmission})`}
                      </span>
                    </div>
                  </div>
                );
              })()}

            {/* 3. Optic Nerve Badge (Upper-Right Quadrant) */}
            {landmarks.opticNerve.visible &&
              (() => {
                const px = landmarks.opticNerve.x;
                const py = landmarks.opticNerve.y;
                const cardLeft = Math.max(72, Math.min(84, px + 3));
                const cardTop = Math.max(16, Math.min(28, py - 20));
                return (
                  <div
                    className="absolute pointer-events-auto transition-all duration-150"
                    style={{ left: `${cardLeft}%`, top: `${cardTop}%` }}
                  >
                    <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose-500/35 text-[11px] shadow-2xl flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-rose-400">
                          Nasal Fundus
                        </span>
                      </div>
                      <span className="font-bold text-white leading-tight">
                        Optic Nerve Head &amp; Arcades
                      </span>
                      <span className="text-[10px] text-rose-200/80 leading-tight">
                        Retinal Vessels &amp; Cranial CN II
                      </span>
                    </div>
                  </div>
                );
              })()}

            {/* 4. Macula Badge (Lower-Right Quadrant) */}
            {landmarks.macula.visible &&
              (() => {
                const px = landmarks.macula.x;
                const py = landmarks.macula.y;
                const cardLeft = Math.max(68, Math.min(84, px + 4));
                const cardTop = Math.min(82, Math.max(64, py + 12));
                return (
                  <div
                    className="absolute pointer-events-auto transition-all duration-150"
                    style={{ left: `${cardLeft}%`, top: `${cardTop}%` }}
                  >
                    <div className="bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-500/40 text-[11px] shadow-[0_0_20px_rgba(251,191,36,0.2)] flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        <span className="text-[9px] uppercase tracking-wider font-bold text-amber-400">
                          Visual Axis Target
                        </span>
                      </div>
                      <span className="font-bold text-white leading-tight">
                        Macula &amp; Fovea Centralis
                      </span>
                      <span className="text-[10px] text-amber-200/90 leading-tight">
                        Collimated Focus Point
                      </span>
                    </div>
                  </div>
                );
              })()}
          </div>
        )}

        {/* In-Canvas Floating Interactive Controls (Reset angle, toggle labels, camera viewpoints) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20 flex-wrap justify-end">
          {/* Camera Viewpoint Selector */}
          <div className="flex items-center gap-1 bg-black/70 p-1 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
            <button
              onClick={() => handleViewChange('crossSection')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                cameraView === 'crossSection'
                  ? 'bg-primary/25 border border-primary/50 text-primary shadow-[0_0_10px_rgba(197,160,89,0.25)]'
                  : 'text-muted-foreground hover:text-white'
              }`}
              title="Anatomical Cutaway Overview"
            >
              {cameraView === 'crossSection' && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
              <span>Overview</span>
            </button>
            <button
              onClick={() => handleViewChange('lensFocus')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                cameraView === 'lensFocus'
                  ? 'bg-primary/30 border border-primary/60 text-primary shadow-[0_0_12px_rgba(197,160,89,0.35)]'
                  : 'text-muted-foreground hover:text-white'
              }`}
              title="Zoom in directly onto Crystalline Lens"
            >
              {cameraView === 'lensFocus' && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              )}
              <span>Lens Macro</span>
            </button>
            <button
              onClick={() => handleViewChange('anterior')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                cameraView === 'anterior'
                  ? 'bg-primary/25 border border-primary/50 text-primary shadow-[0_0_10px_rgba(197,160,89,0.25)]'
                  : 'text-muted-foreground hover:text-white'
              }`}
              title="Slit-Lamp Anterior Pupil View"
            >
              {cameraView === 'anterior' && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              )}
              <span>Slit-Lamp</span>
            </button>
          </div>

          <button
            onClick={() => setShowLabels(!showLabels)}
            title="Toggle Anatomical Labels"
            aria-label="Toggle Anatomical Labels"
            className={`p-2 rounded-xl border transition-all text-xs font-semibold backdrop-blur-md ${
              showLabels
                ? 'bg-primary/20 border-primary/50 text-primary'
                : 'bg-black/50 border-white/10 text-muted-foreground hover:text-white'
            }`}
          >
            <span className="hidden sm:inline mr-1.5">Labels</span>
            <Icon name="TagIcon" size={14} className="inline" />
          </button>

          <button
            onClick={handleResetAngle}
            title="Reset 3D Angle"
            aria-label="Reset 3D Angle"
            className="p-2 rounded-xl bg-black/50 border border-white/10 hover:border-white/30 text-muted-foreground hover:text-white transition-all backdrop-blur-md"
          >
            <Icon name="ArrowPathIcon" size={14} />
          </button>
        </div>

        {/* Drag Hint Watermark */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40 bg-black/40 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
          <Icon name="HandRaisedIcon" size={12} />
          <span>Click &amp; drag to orbit eye angle</span>
        </div>
      </div>

      {/* Interactive Bottom Control Deck: Scrubber, Playback & Stage Pills */}
      <div className="p-4 sm:p-6 bg-[#080a10] border-t border-white/[0.08] space-y-4">
        {/* Scrubber & Playback Controls Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center font-bold hover:bg-accent transition-all shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.3)] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            title={isPlaying ? 'Pause Time-Lapse' : 'Play Time-Lapse'}
            aria-label={isPlaying ? 'Pause Time-Lapse' : 'Play Time-Lapse'}
          >
            <Icon name={isPlaying ? 'PauseIcon' : 'PlayIcon'} size={18} />
          </button>

          {/* Continuous Timeline Slider */}
          <div className="flex-1 w-full flex items-center gap-3">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider shrink-0">
              Youth (20s)
            </span>
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.005"
                value={isIOLActive ? 1.0 : currentProgress}
                onChange={handleSliderChange}
                aria-label="Cataract Progression Timeline Scrubber"
                className="w-full h-2 rounded-lg bg-white/10 appearance-none cursor-pointer accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider shrink-0">
              Mature (70s+)
            </span>
          </div>

          {/* Speed Toggle */}
          <button
            onClick={handleSpeedCycle}
            className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono font-semibold text-muted-foreground hover:text-white transition-all shrink-0"
            title="Playback Speed"
            aria-label={`Playback Speed ${playbackSpeed}x`}
          >
            {playbackSpeed}x Speed
          </button>
        </div>

        {/* 5 Stage Quick Selection Deck */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-white/[0.06]">
          {STAGES.map((stage) => {
            const isSelected = isIOLActive ? stage.isIOL : activeStageIdx === stage.id - 1;

            return (
              <button
                key={stage.id}
                onClick={() => handleStageClick(stage)}
                className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                  stage.isIOL ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isSelected
                    ? stage.isIOL
                      ? 'bg-primary/20 border-primary text-foreground shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                      : 'bg-white/[0.1] border-primary/70 text-foreground shadow-md'
                    : 'bg-black/30 border-white/[0.06] hover:border-white/20 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider opacity-75">
                    {stage.isIOL ? 'Stage 05' : `Stage 0${stage.id}`}
                  </span>
                  <span className={`text-[10px] font-bold ${stage.color}`}>
                    {stage.transmission}
                  </span>
                </div>
                <span className="text-xs font-semibold text-foreground leading-tight">
                  {stage.name}
                </span>
                <span className="text-[10px] text-muted-foreground truncate w-full mt-0.5">
                  {stage.status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Clinical Explanation Callout */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-foreground/90">
            <span className="text-primary font-bold">Clinical Ray Finding:</span>
            <span className="text-muted-foreground">
              {activeStage.status} — {transmissionNum}% of incoming light penetrates to the retina.
            </span>
          </div>
          {isIOLActive ? (
            <span className="text-primary font-bold text-[11px] shrink-0 bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
              ✓ Acrylic Permanent Cure Active
            </span>
          ) : (
            <span className="text-amber-400 font-medium text-[11px] shrink-0">
              Phase 0{activeStage.id} In Progress
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
