'use client';

import React, { useState } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import Image from 'next/image';

const lenses = [
  {
    id: 'vivity',
    name: 'Clareon Vivity',
    type: 'EDOF',
    color: '#00C9B1',
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

export default function LensVisionComparisonSection() {
  const [activeDistance, setActiveDistance] = useState<Distance>('distance');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('night');
  const [activeLensId, setActiveLensId] = useState<string | null>(null);

  return (
    <section id="vision-comparison" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 60%, rgba(0,201,177,0.06) 0%, transparent 60%)' }} />

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
          <div className="flex items-center gap-1 p-1 rounded-2xl w-full max-w-xs sm:max-w-none sm:w-auto" style={{ background: 'var(--muted)', border: '1px solid var(--border)' }}>
            {(['day', 'night'] as TimeOfDay[]).map((t) => (
              <button
                key={t}
                onClick={() => setTimeOfDay(t)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 touch-manipulation min-h-[44px]"
                style={{
                  background: timeOfDay === t ? (t === 'night' ? '#0D1020' : '#FFF8E7') : 'transparent',
                  color: timeOfDay === t ? (t === 'night' ? '#A8C8FF' : '#B8860B') : 'var(--muted-foreground)',
                  boxShadow: timeOfDay === t ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                }}
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
          <div className="flex items-center gap-1 p-1 rounded-2xl w-full max-w-xs sm:max-w-none sm:w-auto" style={{ background: 'var(--muted)', border: '1px solid var(--border)' }}>
            {(Object.keys(distanceLabels) as Distance[]).map((d) => (
              <button
                key={d}
                onClick={() => setActiveDistance(d)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 touch-manipulation min-h-[44px]"
                style={{
                  background: activeDistance === d ? 'var(--primary)' : 'transparent',
                  color: activeDistance === d ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  boxShadow: activeDistance === d ? '0 2px 8px rgba(0,201,177,0.3)' : 'none',
                }}
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
                className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: 'var(--card)',
                  border: isActive ? `1.5px solid ${lens.color}` : '1px solid var(--border)',
                  boxShadow: isActive ? `0 0 0 1px ${lens.color}30, 0 20px 50px rgba(0,0,0,0.5)` : '0 4px 20px rgba(0,0,0,0.3)',
                  transform: isActive ? 'translateY(-4px)' : 'none',
                }}
              >
                {/* Lens header */}
                <div className="px-4 pt-4 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ background: `${lens.color}18`, color: lens.color, border: `1px solid ${lens.color}30` }}
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
                  <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={imageSrc}
                      alt={`${lens.name} ${timeOfDay} ${activeDistance} vision simulation`}
                      fill
                      className="object-cover transition-all duration-500"
                      style={
                        lens.id === 'panoptix' && timeOfDay === 'night'
                          ? { objectPosition: 'center center' }
                          : undefined
                      }
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Scene label overlay */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.7)' }}>
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
                    <span className="text-xs font-semibold" style={{ color: lens.color }}>{clarityVal}</span>
                  </div>

                  {/* Glare level bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Glare / Halos</span>
                      <span className="text-xs font-semibold" style={{ color: lens.color }}>{lens.glareLabel[timeOfDay]}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(glareAmt + haloAmt, 3)}%`,
                          background: glareAmt + haloAmt > 20
                            ? `linear-gradient(90deg, ${lens.color}, #FF6B6B)`
                            : lens.color,
                          opacity: 0.85,
                        }}
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
              className="flex gap-3 p-4 rounded-2xl"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,201,177,0.1)' }}>
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
