'use client';

import { useState } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import Image from 'next/image';

const lenses = [
  {
    id: 'panoptix',
    name: 'PanOptix Pro',
    manufacturer: 'Alcon',
    type: 'Trifocal IOL',
    tagline: 'True glasses independence at all distances.',
    color: '#7EECD8',
    featured: true,
    badge: 'Full Trifocal',
    twColor: 'text-[#7EECD8]',
    twBadgeBg: 'bg-[#7EECD815]',
    twBadgeBorder: 'border-[#7EECD830]',
    twBadgeText: 'text-[#7EECD8]',
    twCtaBorder: 'border-[#7EECD840]',
    twSpecBar: 'bg-[#7EECD8]',
    images: {
      day: {
        distance: '/assets/images/day_driving_pro.jpg',
        intermediate: '/assets/images/sharp_day_intermediate_pro.png',
        near: '/assets/images/panoptix_day_near_pro.png',
      },
      night: {
        distance: '/assets/images/panoptix_night_pro_v2.jpg',
        intermediate: '/assets/images/night_panoptix_intermediate.png',
        near: '/assets/images/night_panoptix_near.png',
      },
    },
    specs: [
      { label: 'Distance Vision', value: 'Excellent', score: 97 },
      { label: 'Intermediate (Screens)', value: 'Excellent', score: 95 },
      { label: 'Near (Reading)', value: 'Excellent', score: 90 },
      { label: 'Night Vision Quality', value: 'Mild Halos', score: 72 },
    ],
    highlights: [
      '99% of patients would choose again',
      'ENLIGHTEN NXT: 94% light capture',
      'True 20/20 vision at all 3 distances',
      'Maximum independence from glasses',
    ],
    bestFor: 'Patients wanting maximum glasses freedom — reading, screens, and driving — all without spectacles.',
    blur: {
      day: { distance: 0, intermediate: 0, near: 0 },
      night: { distance: 0, intermediate: 0, near: 0 },
    },
    glareLabel: {
      day: 'Minimal',
      night: 'Mild Halos',
    },
  },
  {
    id: 'vivity',
    name: 'Clareon Vivity',
    manufacturer: 'Alcon',
    type: 'EDOF IOL',
    tagline: 'Maximum range. Minimum disturbance.',
    color: '#00C9B1',
    featured: false,
    badge: 'Most Popular',
    twColor: 'text-[#00C9B1]',
    twBadgeBg: 'bg-[#00C9B115]',
    twBadgeBorder: 'border-[#00C9B130]',
    twBadgeText: 'text-[#00C9B1]',
    twCtaBorder: 'border-[#00C9B140]',
    twSpecBar: 'bg-[#00C9B1]',
    images: {
      day: {
        distance: '/assets/images/day_driving_pro.jpg',
        intermediate: '/assets/images/sharp_day_intermediate_pro.png',
        near: '/assets/images/vivity_day_near_pro.png',
      },
      night: {
        distance: '/assets/images/vivity_night_pro.jpg',
        intermediate: '/assets/images/night_vivity_intermediate.png',
        near: '/assets/images/night_vivity_near.png',
      },
    },
    specs: [
      { label: 'Distance Vision', value: 'Excellent', score: 95 },
      { label: 'Intermediate (Screens)', value: 'Excellent', score: 92 },
      { label: 'Near (Reading)', value: 'Functional', score: 55 },
      { label: 'Night Vision Quality', value: 'Very Low Glare', score: 92 },
    ],
    highlights: [
      'Non-diffractive X-WAVE™ Technology',
      'Similar halos to standard monofocal',
      'Extended depth of focus (EDOF)',
      'Neuroadaptation: 1–4 weeks',
    ],
    bestFor: 'Active patients who use screens heavily and want extended range with the fewest visual disturbances.',
    blur: {
      day: { distance: 0, intermediate: 0, near: 0 },
      night: { distance: 0, intermediate: 0, near: 1.8 },
    },
    glareLabel: {
      day: 'None',
      night: 'Very Low',
    },
  },
  {
    id: 'eyhance',
    name: 'Tecnis Eyhance',
    manufacturer: 'J&J Vision',
    type: 'Enhanced Monofocal',
    tagline: 'Monofocal clarity with a meaningful upgrade.',
    color: '#A8B4C8',
    featured: false,
    badge: 'Zero Added Halos',
    twColor: 'text-[#A8B4C8]',
    twBadgeBg: 'bg-[#A8B4C815]',
    twBadgeBorder: 'border-[#A8B4C830]',
    twBadgeText: 'text-[#A8B4C8]',
    twCtaBorder: 'border-[#A8B4C840]',
    twSpecBar: 'bg-[#A8B4C8]',
    images: {
      day: {
        distance: '/assets/images/eyhance_day_distance_pro.png',
        intermediate: '/assets/images/eyhance_day_intermediate_pro_v2.png?v=2',
        near: '/assets/images/eyhance_day_near_pro_v2.png?v=2',
      },
      night: {
        distance: '/assets/images/eyhance_night_pro.jpg',
        intermediate: '/assets/images/night_eyhance_intermediate.png',
        near: '/assets/images/night_eyhance_near.png',
      },
    },
    specs: [
      { label: 'Distance Vision', value: 'Excellent', score: 98 },
      { label: 'Intermediate (Screens)', value: 'Good', score: 75 },
      { label: 'Near (Reading)', value: 'Limited', score: 30 },
      { label: 'Night Vision Quality', value: 'No Added Halos', score: 98 },
    ],
    highlights: [
      '100% distance independence at 5 years',
      'Ring-free refractive optic design',
      'No increase in halos vs. monofocal',
      'Ideal for patients with mild comorbidities',
    ],
    bestFor: 'Patients who prioritise pristine distance clarity and zero added visual disturbances, with some intermediate benefit.',
    blur: {
      day: { distance: 0, intermediate: 0, near: 0 },
      night: { distance: 0, intermediate: 2.8, near: 6.5 },
    },
    glareLabel: {
      day: 'None',
      night: 'None',
    },
  },
  {
    id: 'monofocal',
    name: 'Standard Monofocal',
    manufacturer: 'Various',
    type: 'Single Vision IOL',
    tagline: 'Proven clarity. Single focus point.',
    color: '#6B7280',
    featured: false,
    badge: 'Baseline',
    twColor: 'text-[#6B7280]',
    twBadgeBg: 'bg-[#6B728015]',
    twBadgeBorder: 'border-[#6B728030]',
    twBadgeText: 'text-[#6B7280]',
    twCtaBorder: 'border-[#6B728040]',
    twSpecBar: 'bg-[#6B7280]',
    images: {
      day: {
        distance: '/assets/images/monofocal_day_distance_pro.png',
        intermediate: '/assets/images/monofocal_day_intermediate_pro.png',
        near: '/assets/images/monofocal_day_near_pro_v2.png?v=2',
      },
      night: {
        distance: '/assets/images/monofocal_night_pro.jpg',
        intermediate: '/assets/images/night_monofocal_intermediate.png',
        near: '/assets/images/night_monofocal_near.png',
      },
    },
    specs: [
      { label: 'Distance Vision', value: 'Excellent', score: 98 },
      { label: 'Intermediate (Screens)', value: 'Functional', score: 45 },
      { label: 'Near (Reading)', value: 'Dependent', score: 20 },
      { label: 'Night Vision Quality', value: 'Baseline', score: 98 },
    ],
    highlights: [
      'Standard of care for decades',
      'Excellent distance contrast',
      'No rings or visual disturbances',
      'Fully covered by most insurance',
    ],
    bestFor: 'Patients comfortable wearing glasses for most tasks who want the most budget-friendly, clear distance option.',
    blur: {
      day: { distance: 0, intermediate: 0, near: 0 },
      night: { distance: 0, intermediate: 5.5, near: 16 },
    },
    glareLabel: {
      day: 'None',
      night: 'None',
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

function blurClass(px: number): string {
  if (px <= 0) return '';
  if (px <= 1.5) return 'blur-[1.5px] scale-[1.05]';
  if (px <= 2.5) return 'blur-[2.5px] scale-[1.05]';
  if (px <= 5) return 'blur-[5px] scale-[1.05]';
  if (px <= 6) return 'blur-[6px] scale-[1.05]';
  if (px <= 6.5) return 'blur-[6.5px] scale-[1.05]';
  if (px <= 15) return 'blur-[15px] scale-[1.05]';
  return 'blur-[16px] scale-[1.05]';
}

function scoreWidthClass(score: number): string {
  if (score <= 10) return 'w-[10%]';
  if (score <= 30) return 'w-[30%]';
  if (score <= 55) return 'w-[55%]';
  if (score <= 72) return 'w-[72%]';
  if (score <= 75) return 'w-[75%]';
  if (score <= 90) return 'w-[90%]';
  if (score <= 92) return 'w-[92%]';
  if (score <= 95) return 'w-[95%]';
  if (score <= 97) return 'w-[97%]';
  return 'w-[98%]';
}

export default function LensVisionComparisonSection() {
  const [activeDistance, setActiveDistance] = useState<Distance>('distance');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');

  const handleTimeOfDayChange = (t: TimeOfDay) => {
    setTimeOfDay(t);
    if (t === 'night') {
      setActiveDistance('distance');
    }
  };

  return (
    <section id="iol-simulator" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 vision-section-bg opacity-40" />
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4 animate-fade-in">Interactive Vision Simulator</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-6 leading-tight">
            See Your <span className="text-gradient-primary font-medium">Future Vision.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Compare visual outcomes across distance, intermediate, and near ranges to see which lens best fits your lifestyle.
          </p>
        </div>

        {/* Unified Controls */}
        <div className="flex flex-col items-center gap-6 mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            
            {/* Day / Night Toggle */}
            <div className="flex p-1.5 bg-card border border-border rounded-2xl shadow-sm">
              {(['day', 'night'] as TimeOfDay[]).map((t) => (
                <button
                  key={t}
                  onClick={() => handleTimeOfDayChange(t)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    timeOfDay === t
                      ? t === 'night'
                        ? 'bg-[#0D1020] text-[#A8C8FF] shadow-inner'
                        : 'bg-[#FFF8E7] text-[#B8860B] shadow-inner'
                      : 'text-muted-foreground hover:text-foreground'
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

            {/* Distance Toggle */}
            <div className="flex p-1.5 bg-card border border-border rounded-2xl shadow-sm">
              {(Object.keys(distanceLabels) as Distance[]).map((d) => (
                <button
                  key={d}
                  onClick={() => timeOfDay === 'day' && setActiveDistance(d)}
                  disabled={timeOfDay === 'night'}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeDistance === d
                      ? 'bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(0,201,177,0.3)]'
                      : timeOfDay === 'night'
                        ? 'text-muted-foreground/30 cursor-not-allowed'
                        : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {distanceLabels[d].label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-6">
            <p className="text-sm text-primary/80 font-medium tracking-wide uppercase">
              Current Focus: <span className="text-foreground">{timeOfDay === 'night' ? 'Distance (Night Driving)' : distanceLabels[activeDistance].desc}</span>
            </p>
          </div>
        </div>

        {/* Lens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {lenses.map((lens) => {
            const blurAmt = lens.blur[timeOfDay][activeDistance];
            const imageSrc = lens.images[timeOfDay][activeDistance];

            return (
              <div
                key={lens.id}
                className={`relative rounded-[32px] p-6 sm:p-8 flex flex-col transition-all duration-500 bg-card border ${
                  lens.featured 
                    ? 'border-primary/40 shadow-[0_20px_50px_rgba(0,0,0,0.4)]' 
                    : 'border-border shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-border/80'
                }`}
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${lens.twBadgeBg} ${lens.twBadgeText} ${lens.twBadgeBorder}`}
                  >
                    {lens.badge}
                  </span>
                </div>

                {/* Lens Name */}
                <div className="mb-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{lens.manufacturer} · {lens.type}</p>
                  <h3 className="font-display text-xl font-medium text-foreground">{lens.name}</h3>
                </div>

                {/* Simulation Image Box - NO TEXT OVERLAP */}
                <div className="mb-8 group">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 border border-border/50 shadow-inner">
                    <Image
                      src={imageSrc}
                      alt={`${lens.name} vision simulation`}
                      fill
                      className={`object-cover transition-all duration-700 ease-in-out ${blurClass(blurAmt)}`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Night Vision Effects Overlays */}
                    {timeOfDay === 'night' && (
                      <div className="absolute inset-0 pointer-events-none">
                        {/* PanOptix Halos - Disabled for PanOptix Pro as they are baked into the new image */}
                        {/* lens.id === 'panoptix' && (
                          <>
                            <div className="absolute hl-panoptix-left" />
                            <div className="absolute hl-panoptix-right" />
                          </>
                        ) */}
                        
                        {/* Vivity Haze - Disabled for Vivity Pro as it is baked into the new image */}
                        {/* lens.id === 'vivity' && (
                          <>
                            <div className="absolute hl-vivity-left" />
                            <div className="absolute hl-vivity-right" />
                          </>
                        ) */}

                        {/* Eyhance Dashboard & Mirror Blur - Disabled for Eyhance Pro as it is baked into the new image */}
                        {/* lens.id === 'eyhance' && (
                          <>
                            <div className="absolute inset-0 blur-overlay-bottom blur-overlay-bottom-eyhance" />
                            <div className="absolute inset-0 blur-overlay-top blur-overlay-top-eyhance" />
                          </>
                        ) */}
                        
                        {/* Monofocal Dashboard & Mirror Blur - Disabled for Monofocal as it is baked into the new image */}
                        {/* lens.id === 'monofocal' && (
                          <>
                            <div className="absolute inset-0 blur-overlay-bottom blur-overlay-bottom-monofocal" />
                            <div className="absolute inset-0 blur-overlay-top blur-overlay-top-monofocal" />
                          </>
                        ) */}
                      </div>
                    )}

                    {/* Daytime Vision Effects Overlays */}
                    {timeOfDay === 'day' && activeDistance === 'distance' && (
                      <div className="absolute inset-0 pointer-events-none">
                        {/* Overlays removed because blur is baked into the new images */}
                      </div>
                    )}
                    
                    {/* Scene Tag */}
                    <div className="absolute bottom-2 left-2 pointer-events-none z-20">
                      <span className="bg-black/40 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-full">
                        {timeOfDay === 'day' ? 'Day' : 'Night'} · {timeOfDay === 'night' ? 'Distance' : distanceLabels[activeDistance].label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specs bars */}
                <div className="space-y-4 mb-8">
                  {lens.specs.map((spec) => (
                    <div key={spec.label} className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-muted-foreground font-medium">{spec.label}</span>
                        <span className={`font-semibold ${lens.twColor}`}>{spec.value}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 opacity-80 ${lens.twSpecBar} ${scoreWidthClass(spec.score)}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="space-y-3 mb-8 flex-1">
                  {lens.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                      <AppIcon name="CheckCircleIcon" size={14} className={`mt-0.5 shrink-0 ${lens.twColor}`} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Best for */}
                <div className="border-t border-border pt-6 mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Best for</p>
                  <p className="text-xs text-foreground/80 leading-relaxed font-light">{lens.bestFor}</p>
                </div>

                <a
                  href="#booking"
                  className={`w-full py-4 rounded-2xl text-xs font-bold text-center transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center border shadow-sm ${
                    lens.featured
                      ? 'bg-primary text-primary-foreground border-transparent'
                      : `bg-transparent ${lens.twColor} ${lens.twCtaBorder}`
                  }`}
                >
                  Ask About {lens.name}
                </a>
              </div>
            );
          })}
        </div>

        {/* Legend / FAQ */}
        <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Range of Focus',
              desc: 'Premium IOLs extend your vision across different focal points, reducing or eliminating the need for glasses.',
            },
            {
              title: 'Night Vision',
              desc: 'Advanced optics minimize halos and glare, though some diffractive lenses may have a minor adjustment period.',
            },
            {
              title: 'Personalized Choice',
              desc: 'Your visual goals and eye health dictate the best lens. Dr. Marano provides expert guidance for your unique case.',
            },
          ].map((item, i) => (
            <div key={i} className="text-center md:text-left px-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] text-muted-foreground/60 mt-12 max-w-3xl mx-auto px-4 uppercase tracking-[0.1em] leading-relaxed">
          Simulations are for illustrative purposes only and represent a rough estimate of potential visual outcomes. 
          Individual patient experiences and clinical results may vary significantly. 
          A comprehensive consultation with Dr. Marano is required for medical diagnosis and personalized treatment planning.
        </p>
      </div>
    </section>
  );
}
