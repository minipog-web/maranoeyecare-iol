'use client';

import { useState } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import Image from 'next/image';

const lenses = [
  {
    id: 'vivity',
    name: 'Clareon Vivity',
    type: 'EDOF',
    color: '#00C9B1',
    twColor: 'text-[#00C9B1]',
    twBadgeBg: 'bg-[#00C9B118]',
    twBadgeBorder: 'border-[#00C9B130]',
    twBadgeText: 'text-[#00C9B1]',
    twGlareBar: 'bg-[#00C9B1]',
    twGlareBarHigh: 'bg-gradient-to-r from-[#00C9B1] to-[#FF6B6B]',
    blurClass: '',
    badge: 'Most Popular',
    images: {
      day: {
        distance: '/assets/images/day_distance.png',
        intermediate: '/assets/images/day_intermediate.png',
        near: '/assets/images/day_near_sharp.png',
      },
      night: {
        distance: '/assets/images/night_vivity_distance.png',
        intermediate: '/assets/images/night_vivity_intermediate.png',
        near: '/assets/images/night_vivity_near.png',
      },
    },
    glare: {
      day: { distance: 0, intermediate: 0, near: 5 },
      night: { distance: 8, intermediate: 10, near: 15 },
    },
    halos: {
      day: { distance: 0, intermediate: 0, near: 0 },
      night: { distance: 12, intermediate: 14, near: 18 },
    },
    blur: {
      day: { distance: 0, intermediate: 0, near: 1.2 },
      night: { distance: 0, intermediate: 0, near: 1.5 },
    },
    clarity: {
      distance: 'Excellent',
      intermediate: 'Excellent',
      near: 'Functional',
    },
    glareLabel: {
      day: 'Minimal',
      night: 'Very Low',
    },
  },
  {
    id: 'panoptix',
    name: 'PanOptix Pro',
    type: 'Trifocal',
    color: '#7EECD8',
    twColor: 'text-[#7EECD8]',
    twBadgeBg: 'bg-[#7EECD818]',
    twBadgeBorder: 'border-[#7EECD830]',
    twBadgeText: 'text-[#7EECD8]',
    twGlareBar: 'bg-[#7EECD8]',
    twGlareBarHigh: 'bg-gradient-to-r from-[#7EECD8] to-[#FF6B6B]',
    blurClass: '',
    badge: 'Full Trifocal',
    images: {
      day: {
        distance: '/assets/images/day_distance.png',
        intermediate: '/assets/images/day_intermediate.png',
        near: '/assets/images/day_near_sharp.png',
      },
      night: {
        distance: '/assets/images/night_panoptix_distance.png',
        intermediate: '/assets/images/night_panoptix_intermediate.png',
        near: '/assets/images/night_panoptix_near.png',
      },
    },
    glare: {
      day: { distance: 5, intermediate: 3, near: 3 },
      night: { distance: 22, intermediate: 18, near: 15 },
    },
    halos: {
      day: { distance: 5, intermediate: 3, near: 3 },
      night: { distance: 28, intermediate: 22, near: 18 },
    },
    blur: {
      day: { distance: 0, intermediate: 0, near: 0 },
      night: { distance: 0, intermediate: 0, near: 0 },
    },
    clarity: {
      distance: 'Excellent',
      intermediate: 'Excellent',
      near: 'Excellent',
    },
    glareLabel: {
      day: 'Minimal',
      night: 'Mild',
    },
  },
  {
    id: 'eyhance',
    name: 'Tecnis Eyhance',
    type: 'Enhanced Mono',
    color: '#A8B4C8',
    twColor: 'text-[#A8B4C8]',
    twBadgeBg: 'bg-[#A8B4C818]',
    twBadgeBorder: 'border-[#A8B4C830]',
    twBadgeText: 'text-[#A8B4C8]',
    twGlareBar: 'bg-[#A8B4C8]',
    twGlareBarHigh: 'bg-gradient-to-r from-[#A8B4C8] to-[#FF6B6B]',
    blurClass: 'blur-eyhance',
    badge: 'Zero Added Halos',
    images: {
      day: {
        distance: '/assets/images/day_distance.png',
        intermediate: '/assets/images/day_intermediate.png',
        near: '/assets/images/day_near_blurry.png',
      },
      night: {
        distance: '/assets/images/night_eyhance_distance.png',
        intermediate: '/assets/images/night_eyhance_intermediate.png',
        near: '/assets/images/night_eyhance_near.png',
      },
    },
    glare: {
      day: { distance: 0, intermediate: 0, near: 0 },
      night: { distance: 5, intermediate: 5, near: 5 },
    },
    halos: {
      day: { distance: 0, intermediate: 0, near: 0 },
      night: { distance: 6, intermediate: 6, near: 6 },
    },
    blur: {
      day: { distance: 0, intermediate: 0.3, near: 2.5 },
      night: { distance: 0, intermediate: 0.4, near: 2.8 },
    },
    clarity: {
      distance: 'Excellent',
      intermediate: 'Good',
      near: 'Limited',
    },
    glareLabel: {
      day: 'None',
      night: 'Minimal',
    },
  },
  {
    id: 'monofocal',
    name: 'Standard Monofocal',
    type: 'Monofocal',
    color: '#6B7280',
    twColor: 'text-[#6B7280]',
    twBadgeBg: 'bg-[#6B728018]',
    twBadgeBorder: 'border-[#6B728030]',
    twBadgeText: 'text-[#6B7280]',
    twGlareBar: 'bg-[#6B7280]',
    twGlareBarHigh: 'bg-gradient-to-r from-[#6B7280] to-[#FF6B6B]',
    blurClass: 'blur-monofocal',
    badge: 'Baseline',
    images: {
      day: {
        distance: '/assets/images/day_distance.png',
        intermediate: '/assets/images/day_intermediate.png',
        near: '/assets/images/day_near_veryblurry.png',
      },
      night: {
        distance: '/assets/images/night_monofocal_distance.png',
        intermediate: '/assets/images/night_monofocal_intermediate.png',
        near: '/assets/images/night_monofocal_near.png',
      },
    },
    glare: {
      day: { distance: 0, intermediate: 0, near: 0 },
      night: { distance: 5, intermediate: 5, near: 5 },
    },
    halos: {
      day: { distance: 0, intermediate: 0, near: 0 },
      night: { distance: 5, intermediate: 5, near: 5 },
    },
    blur: {
      day: { distance: 0, intermediate: 0.8, near: 3.5 },
      night: { distance: 0, intermediate: 0.9, near: 3.8 },
    },
    clarity: {
      distance: 'Excellent',
      intermediate: 'Fair',
      near: 'Poor',
    },
    glareLabel: {
      day: 'None',
      night: 'Minimal',
    },
  },
];

type Distance = 'distance' | 'intermediate' | 'near';
type TimeOfDay = 'day' | 'night';

const distanceLabels: Record<Distance, { label: string; desc: string; icon: string }> = {
  distance: { label: 'Distance', desc: 'Driving, TV, outdoors (6m+)', icon: 'EyeIcon' },
  intermediate: { label: 'Intermediate', desc: 'Computer, dashboard (60–70cm)', icon: 'ComputerDesktopIcon' },
  near: { label: 'Near', desc: 'Reading, phone (40cm)', icon: 'BookOpenIcon' },
};

function glareWidthClass(pct: number): string {
  if (pct <= 5) return 'w-[5%]';
  if (pct <= 10) return 'w-[10%]';
  if (pct <= 15) return 'w-[15%]';
  if (pct <= 20) return 'w-[20%]';
  if (pct <= 25) return 'w-[25%]';
  if (pct <= 30) return 'w-[30%]';
  if (pct <= 35) return 'w-[35%]';
  if (pct <= 40) return 'w-[40%]';
  if (pct <= 46) return 'w-[46%]';
  return 'w-[50%]';
}

export default function LensVisionComparisonSection() {
  const [activeDistance, setActiveDistance] = useState<Distance>('distance');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('night');
  const [activeLensId, setActiveLensId] = useState<string | null>(null);

  return (
    <section id="vision-comparison" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 vision-section-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">Interactive Vision Simulator</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-4 sm:mb-6 leading-tight">
            See Through Each Lens.{' '}
            <span className="text-gradient-primary font-medium">Day & Night.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore how each IOL handles glare, halos, and focus across different distances and lighting conditions — before you decide.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-10 sm:mb-12">

          {/* Day / Night toggle */}
          <div className="toggle-container flex items-center gap-1 p-1 rounded-2xl w-full max-w-xs sm:max-w-none sm:w-auto">
            {(['day', 'night'] as TimeOfDay[]).map((t) => (
              <button
                key={t}
                onClick={() => setTimeOfDay(t)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 touch-manipulation min-h-[44px] ${
                  timeOfDay === t
                    ? t === 'night'
                      ? 'bg-[#0D1020] text-[#A8C8FF] shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                      : 'bg-[#FFF8E7] text-[#B8860B] shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                    : 'bg-transparent text-muted-foreground'
                }`}
              >
                {t === 'day' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
                {t === 'day' ? 'Daytime' : 'Night'}
              </button>
            ))}
          </div>

          {/* Distance selector */}
          <div className="toggle-container flex items-center gap-1 p-1 rounded-2xl w-full max-w-xs sm:max-w-none sm:w-auto">
            {(Object.keys(distanceLabels) as Distance[]).map((d) => (
              <button
                key={d}
                onClick={() => setActiveDistance(d)}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 touch-manipulation min-h-[44px] ${
                  activeDistance === d
                    ? 'bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(0,201,177,0.3)]'
                    : 'bg-transparent text-muted-foreground'
                }`}
              >
                {distanceLabels[d].label}
              </button>
            ))}
          </div>
        </div>

        {/* Distance description */}
        <p className="text-center text-sm text-muted-foreground mb-8 sm:mb-10">
          <span className="font-medium text-foreground/70">{distanceLabels[activeDistance].label}:</span>{' '}
          {distanceLabels[activeDistance].desc}
        </p>

        {/* Lens grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 sm:gap-5">
          {lenses.map((lens) => {
            const glareAmt = lens.glare[timeOfDay][activeDistance];
            const haloAmt = lens.halos[timeOfDay][activeDistance];
            const blurAmt = lens.blur[timeOfDay][activeDistance];
            const isActive = activeLensId === lens.id;
            const clarityVal = lens.clarity[activeDistance];
            const imageSrc = lens.images[timeOfDay][activeDistance];

            return (
              <div
                key={lens.id}
                onClick={() => setActiveLensId(isActive ? null : lens.id)}
                className={`rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 bg-card ${
                  isActive
                    ? `-translate-y-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)]`
                    : 'shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                } ${isActive ? `border-2 ${lens.twBadgeBorder}` : 'border border-border'}`}
              >
                {/* Lens header */}
                <div className="px-4 pt-4 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${lens.twBadgeBg} ${lens.twBadgeText} ${lens.twBadgeBorder}`}
                    >
                      {lens.badge}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-bold text-primary">Selected</span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-medium text-foreground mt-2">{lens.name}</h3>
                  <p className="text-xs text-muted-foreground">{lens.type}</p>
                </div>

                {/* Photorealistic image preview */}
                <div className="px-3 pb-3">
                  <div className="lens-image-wrapper relative w-full rounded-2xl overflow-hidden">
                    <Image
                      src={
                        timeOfDay === 'night' && activeDistance === 'distance'
                          ? '/assets/images/night_driving_single_car.png'
                          : imageSrc
                      }
                      alt={`${lens.name} ${timeOfDay} ${activeDistance} vision simulation`}
                      fill
                      className="object-cover transition-all duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    
                    {/* Dynamic Night Distance Overlays */}
                    {timeOfDay === 'night' && activeDistance === 'distance' && (
                      <div className="absolute inset-0 pointer-events-none">
                        {/* Monofocal / Eyhance Blur */}
                        {(lens.id === 'monofocal' || lens.id === 'eyhance') && (
                          <>
                            {/* Dashboard Blur (Bottom 25%) */}
                            <div className={`blur-overlay-bottom ${lens.blurClass} absolute inset-x-0 bottom-0 h-[25%]`} />
                            {/* Rearview Mirror & Top Blur */}
                            <div className={`blur-overlay-top ${lens.blurClass} absolute top-0 left-0 right-0 h-[40%]`} />
                          </>
                        )}

                        {/* Vivity Glare */}
                        {lens.id === 'vivity' && (
                          <div className="absolute inset-0 mix-blend-screen">
                            <div className="hl-vivity-left absolute rounded-full" />
                            <div className="hl-vivity-right absolute rounded-full" />
                          </div>
                        )}

                        {/* PanOptix Halos */}
                        {lens.id === 'panoptix' && (
                          <div className="absolute inset-0 mix-blend-screen">
                            <div className="hl-panoptix-left absolute rounded-full" />
                            <div className="hl-panoptix-right absolute rounded-full" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Scene label overlay */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="scene-label text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {timeOfDay === 'night' ? 'Night scene' : 'Daytime scene'} · {distanceLabels[activeDistance].label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="px-4 pb-4 space-y-2.5">
                  {/* Clarity */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Clarity</span>
                    <span className={`text-xs font-semibold ${lens.twColor}`}>{clarityVal}</span>
                  </div>

                  {/* Glare level bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Glare / Halos</span>
                      <span className={`text-xs font-semibold ${lens.twColor}`}>{lens.glareLabel[timeOfDay]}</span>
                    </div>
                    <div className="glare-bar-track h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 opacity-85 ${glareWidthClass(Math.max(glareAmt + haloAmt, 3))} ${
                          glareAmt + haloAmt > 20 ? lens.twGlareBarHigh : lens.twGlareBar
                        }`}
                      />
                    </div>
                  </div>

                  {/* Blur indicator */}
                  {blurAmt > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Focus blur</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {blurAmt < 1 ? 'Slight' : blurAmt < 2 ? 'Moderate' : 'Significant'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend / explainer */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: 'EyeIcon',
              title: 'Glare',
              desc: 'Bright wash of light around sources — most noticeable at night with oncoming headlights.',
            },
            {
              icon: 'SunIcon',
              title: 'Halos',
              desc: 'Rings around point light sources. Diffractive lenses (PanOptix) produce more halos than EDOF designs.',
            },
            {
              icon: 'AdjustmentsHorizontalIcon',
              title: 'Focus Blur',
              desc: "Out-of-focus blur at distances the lens isn't optimised for — most pronounced with monofocal lenses at near.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="legend-card flex gap-3 p-4 rounded-2xl"
            >
              <div className="legend-icon-wrap shrink-0 w-8 h-8 rounded-xl flex items-center justify-center">
                <AppIcon name={item.icon} size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 max-w-3xl mx-auto px-2">
          Visual simulations are illustrative approximations based on published clinical data. Actual perception varies by individual. A consultation with Dr. Marano determines the best lens for your eyes.
        </p>
      </div>
    </section>
  );
}
