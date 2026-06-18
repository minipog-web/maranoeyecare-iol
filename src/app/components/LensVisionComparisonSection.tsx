'use client';

import { useState, useRef, useEffect } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import Image from 'next/image';
import styles from './LensVisionComparisonSection.module.css';
import { trackEvent } from '@/lib/gtag';

const lenses = [
  {
    id: 'panoptix',
    name: 'PanOptix Pro',
    manufacturer: 'Alcon',
    type: 'Trifocal IOL',
    tagline: 'True glasses independence at all distances.',
    color: '#8B5CF6',
    featured: true,
    badge: 'Full Trifocal',
    twColor: 'text-[#8B5CF6]',
    twBadgeBg: 'bg-[#8B5CF615]',
    twBadgeBorder: 'border-[#8B5CF630]',
    twBadgeText: 'text-[#8B5CF6]',
    twCtaBorder: 'border-[#8B5CF640]',
    twSpecBar: 'bg-[#8B5CF6]',
    images: {
      day: {
        distance: '/assets/images/day_driving_pro.jpg',
        intermediate: '/assets/images/sharp_day_intermediate_pro.jpg',
        near: '/assets/images/panoptix_day_near_pro.jpg',
      },
      night: {
        distance: '/assets/images/panoptix_night_pro_v2.jpg',
        intermediate: '/assets/images/panoptix_night_pro_v2.jpg',
        near: '/assets/images/panoptix_night_pro_v2.jpg',
      },
    },
    specs: [
      { label: 'Distance Vision', value: 'Excellent', score: 97 },
      { label: 'Intermediate (Screens)', value: 'Excellent', score: 95 },
      { label: 'Near (Reading)', value: 'Excellent', score: 90 },
      { label: 'Night Vision Quality', value: 'Mild Halos', score: 72 },
    ],
    highlights: [
      '99% would choose a premium lens again [1]',
      'ENLIGHTEN NXT: 94% light capture [1]',
      'True 20/20 vision at all 3 distances',
      'Maximum independence from glasses',
    ],
    bestFor:
      'Patients wanting maximum glasses freedom — reading, screens, and driving — all without spectacles.',
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
        intermediate: '/assets/images/sharp_day_intermediate_pro.jpg',
        near: '/assets/images/vivity_day_near_pro.jpg',
      },
      night: {
        distance: '/assets/images/vivity_night_pro.jpg',
        intermediate: '/assets/images/vivity_night_pro.jpg',
        near: '/assets/images/vivity_night_pro.jpg',
      },
    },
    specs: [
      { label: 'Distance Vision', value: 'Excellent', score: 95 },
      { label: 'Intermediate (Screens)', value: 'Excellent', score: 92 },
      { label: 'Near (Reading)', value: 'Functional', score: 55 },
      { label: 'Night Vision Quality', value: 'Very Low Glare', score: 92 },
    ],
    highlights: [
      'Non-diffractive X-WAVE™ Technology [2]',
      'Similar halos to standard monofocal [2]',
      'Extended depth of focus (EDOF)',
      'Neuroadaptation: 1–4 weeks',
    ],
    bestFor:
      'Active patients who use screens heavily and want extended range with the fewest visual disturbances.',
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
    color: '#00A3FF',
    featured: false,
    badge: 'Zero Added Halos',
    twColor: 'text-[#00A3FF]',
    twBadgeBg: 'bg-[#00A3FF15]',
    twBadgeBorder: 'border-[#00A3FF30]',
    twBadgeText: 'text-[#00A3FF]',
    twCtaBorder: 'border-[#00A3FF40]',
    twSpecBar: 'bg-[#00A3FF]',
    images: {
      day: {
        distance: '/assets/images/eyhance_day_distance_pro.jpg',
        intermediate: '/assets/images/eyhance_day_intermediate_pro_v2.jpg',
        near: '/assets/images/eyhance_day_near_pro_v2.jpg',
      },
      night: {
        distance: '/assets/images/eyhance_night_pro.jpg',
        intermediate: '/assets/images/eyhance_night_pro.jpg',
        near: '/assets/images/eyhance_night_pro.jpg',
      },
    },
    specs: [
      { label: 'Distance Vision', value: 'Excellent', score: 98 },
      { label: 'Intermediate (Screens)', value: 'Good', score: 75 },
      { label: 'Near (Reading)', value: 'Limited', score: 30 },
      { label: 'Night Vision Quality', value: 'No Added Halos', score: 98 },
    ],
    highlights: [
      '100% distance independence at 5 years [3]',
      'Ring-free refractive optic design',
      'No increase in halos vs. monofocal [3]',
      'Ideal for patients with mild comorbidities',
    ],
    bestFor:
      'Patients who prioritise pristine distance clarity and zero added visual disturbances, with some intermediate benefit.',
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
    color: '#64748B',
    featured: false,
    badge: 'Baseline',
    twColor: 'text-[#64748B]',
    twBadgeBg: 'bg-[#64748B15]',
    twBadgeBorder: 'border-[#64748B30]',
    twBadgeText: 'text-[#64748B]',
    twCtaBorder: 'border-[#64748B40]',
    twSpecBar: 'bg-[#64748B]',
    images: {
      day: {
        distance: '/assets/images/monofocal_day_distance_pro.jpg',
        intermediate: '/assets/images/monofocal_day_intermediate_pro.jpg',
        near: '/assets/images/monofocal_day_near_pro_v2.jpg',
      },
      night: {
        distance: '/assets/images/monofocal_night_pro.jpg',
        intermediate: '/assets/images/monofocal_night_pro.jpg',
        near: '/assets/images/monofocal_night_pro.jpg',
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
    bestFor:
      'Patients comfortable wearing glasses for most tasks who want the most budget-friendly, clear distance option.',
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
  intermediate: {
    label: 'Intermediate',
    desc: 'Computer, dashboard (60–70cm)',
    icon: 'ComputerDesktopIcon',
  },
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

const visualStatusOverlays: Record<
  string,
  Record<
    TimeOfDay,
    Record<Distance, { text: string; status: 'clear' | 'warning' | 'error' | 'info' }>
  >
> = {
  monofocal: {
    day: {
      distance: { text: 'Distance Vision: Clear (Glasses-Free)', status: 'clear' },
      intermediate: {
        text: 'Intermediate (Dashboard): Blurry (Glasses Required)',
        status: 'error',
      },
      near: { text: 'Near (Reading): Blurry (Readers Required)', status: 'error' },
    },
    night: {
      distance: { text: 'Distance: Clear Driving (Baseline Safety)', status: 'clear' },
      intermediate: { text: 'Intermediate: Blurry (Glasses Required)', status: 'error' },
      near: { text: 'Near: Blurry (Readers Required)', status: 'error' },
    },
  },
  eyhance: {
    day: {
      distance: { text: 'Distance Vision: Pristine Clear (Glasses-Free)', status: 'clear' },
      intermediate: { text: 'Intermediate: Good (Screen Reading Benefit)', status: 'info' },
      near: { text: 'Near (Reading): Blurry (Readers Required)', status: 'error' },
    },
    night: {
      distance: { text: 'Distance: Crisp Night Driving (Zero Added Halos)', status: 'clear' },
      intermediate: { text: 'Intermediate: Good (Screen Reading Benefit)', status: 'info' },
      near: { text: 'Near: Blurry (Readers Required)', status: 'error' },
    },
  },
  vivity: {
    day: {
      distance: { text: 'Distance Vision: Clear & Sharp (Glasses-Free)', status: 'clear' },
      intermediate: { text: 'Intermediate: Clear Computer & Dashboard', status: 'clear' },
      near: { text: 'Near (Reading): Functional (Readers for fine print)', status: 'info' },
    },
    night: {
      distance: { text: 'Distance: Clear Night Driving (Very Low Glare)', status: 'clear' },
      intermediate: { text: 'Intermediate: Clear Computer & Dashboard', status: 'clear' },
      near: { text: 'Near: Functional (Readers for fine print)', status: 'info' },
    },
  },
  panoptix: {
    day: {
      distance: { text: 'Distance Vision: Clear & Sharp (Glasses-Free)', status: 'clear' },
      intermediate: { text: 'Intermediate: Clear Computer & Dashboard', status: 'clear' },
      near: { text: 'Near (Reading): Full Freedom (No Readers Needed)', status: 'clear' },
    },
    night: {
      distance: { text: 'Distance: Functional Night Driving (Mild Halos)', status: 'warning' },
      intermediate: { text: 'Intermediate: Clear Computer & Dashboard', status: 'clear' },
      near: { text: 'Near (Reading): Full Freedom (No Readers Needed)', status: 'clear' },
    },
  },
};

const visionDescriptions: Record<string, Record<Distance, string>> = {
  monofocal: {
    distance:
      'Clear distance vision for driving and watching TV. Requires glasses for intermediate and reading ranges.',
    intermediate:
      'Screens and dashboard dials are blurry. Reading glasses or computer-specific lenses are required.',
    near: 'Fine print, smartphones, and reading materials are highly blurred. Reading glasses are strictly necessary.',
  },
  eyhance: {
    distance:
      'Pristine distance clarity. High-contrast driving and outdoor vision with a standard-monofocal safety profile.',
    intermediate:
      'Meaningful improvement. Good for computer screens and car dashboards, though mild glasses assistance may be needed.',
    near: 'Functional for larger print in good lighting, but reading glasses are still required for most close-up reading.',
  },
  vivity: {
    distance:
      'Superb distance vision. Excellent for driving, golf, and outdoor active lifestyles without glare or halos.',
    intermediate:
      'Seamless intermediate vision. Effortless computer work, cooking, and viewing dashboard indicators.',
    near: 'Functional near vision. Easily check text messages and read menus, but reading glasses may be needed for long reading sessions.',
  },
  panoptix: {
    distance:
      'Excellent distance vision. Sharp, clear view for driving, movies, and everyday outdoor activities.',
    intermediate:
      'Exceptional intermediate focus. Perfect for computer screen distances, dashboard dials, and store shelves.',
    near: 'Full reading independence. Excellent near vision down to 40cm. Read books, text messages, and menus without reading glasses.',
  },
};

const nightVisionDescriptions: Record<string, string> = {
  monofocal:
    'Pristine night driving. Standard single-focus lens with no added glare, halos, or starbursts around headlights.',
  eyhance:
    'Crisp night driving. Enhanced distance vision with a baseline safety profile and zero added glare or halos.',
  vivity:
    'Very low glare and minimal halos around headlights. Extremely safe and comfortable night driving.',
  panoptix:
    'Mild halos or starburst rings around headlights due to trifocal rings. Most patients easily adapt to this within weeks.',
};

export default function LensVisionComparisonSection() {
  const [activeDistance, setActiveDistance] = useState<Distance>('distance');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [activePremiumLensId, setActivePremiumLensId] = useState<string>('panoptix');
  const [activeMobileLensId, setActiveMobileLensId] = useState<string>('panoptix');
  const [isPeekingBaseline, setIsPeekingBaseline] = useState<boolean>(false);
  const [glowPosition, setGlowPosition] = useState<{ x: string; y: string } | null>(null);
  const [hoveredLensId, setHoveredLensId] = useState<string | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  const [visitedLenses, setVisitedLenses] = useState<string[]>(['panoptix', 'monofocal']);
  const [visitedStates, setVisitedStates] = useState<string[]>(['day-distance']);

  useEffect(() => {
    if (!visitedLenses.includes(activePremiumLensId)) {
      setVisitedLenses((prev) => [...prev, activePremiumLensId]);
    }
  }, [activePremiumLensId, visitedLenses]);

  useEffect(() => {
    if (!visitedLenses.includes(activeMobileLensId)) {
      setVisitedLenses((prev) => [...prev, activeMobileLensId]);
    }
  }, [activeMobileLensId, visitedLenses]);

  useEffect(() => {
    const currentStateKey = `${timeOfDay}-${activeDistance}`;
    if (!visitedStates.includes(currentStateKey)) {
      setVisitedStates((prev) => [...prev, currentStateKey]);
    }
  }, [timeOfDay, activeDistance, visitedStates]);

  const selectPremiumLens = (id: string) => {
    setActivePremiumLensId(id);
    setActiveMobileLensId(id);
    trackEvent({
      action: 'lens_comparison_premium_tab_select',
      category: 'Engagement',
      label: id,
    });
  };

  const selectMobileLens = (id: string) => {
    setActiveMobileLensId(id);
    if (id !== 'monofocal') {
      setActivePremiumLensId(id);
    }
  };

  const handleCardClick = (id: string) => {
    if (id === 'monofocal') {
      setActiveMobileLensId('monofocal');
    } else {
      selectPremiumLens(id);
    }
    trackEvent({
      action: 'lens_comparison_card_click',
      category: 'Engagement',
      label: id,
    });
    // Scroll to the simulator viewport container
    document
      .getElementById('simulator-viewport')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleTimeOfDayChange = (t: TimeOfDay) => {
    setTimeOfDay(t);
    if (t === 'night') {
      setActiveDistance('distance');
    }
    trackEvent({
      action: 'lens_comparison_time_select',
      category: 'Engagement',
      label: t,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, lensId: string) => {
    setHoveredLensId(lensId);
    const cardRect = e.currentTarget.getBoundingClientRect();
    const sectionElement = document.getElementById('lenses');
    if (sectionElement) {
      const sectionRect = sectionElement.getBoundingClientRect();
      const x = cardRect.left - sectionRect.left + cardRect.width / 2;
      const y = cardRect.top - sectionRect.top + cardRect.height / 2;
      setGlowPosition({ x: `${x}px`, y: `${y}px` });
    }
  };

  const handleMouseLeave = () => {
    setHoveredLensId(null);
    setGlowPosition(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const spotlight = e.currentTarget.querySelector(
      `.${styles.spotlightGlow}`
    ) as HTMLDivElement | null;
    if (spotlight) {
      spotlight.style.setProperty('--mouse-x', `${x}px`);
      spotlight.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const renderSimulatorImages = (lensId: string) => {
    const lens = lenses.find((l) => l.id === lensId);
    if (!lens) return null;
    return (
      <>
        {/* Layer 1: Day Distance */}
        {visitedStates.includes('day-distance') && (
          <Image
            src={lens.images.day.distance}
            alt={`${lens.name} daytime distance vision`}
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-500 ease-in-out ${
              timeOfDay === 'day' && activeDistance === 'distance'
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none'
            } ${blurClass(lens.blur.day.distance)}`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={lens.featured}
          />
        )}

        {/* Layer 2: Day Intermediate */}
        {visitedStates.includes('day-intermediate') && (
          <Image
            src={lens.images.day.intermediate}
            alt={`${lens.name} daytime intermediate vision`}
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-500 ease-in-out ${
              timeOfDay === 'day' && activeDistance === 'intermediate'
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none'
            } ${blurClass(lens.blur.day.intermediate)}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        {/* Layer 3: Day Near */}
        {visitedStates.includes('day-near') && (
          <Image
            src={lens.images.day.near}
            alt={`${lens.name} daytime near vision`}
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-500 ease-in-out ${
              timeOfDay === 'day' && activeDistance === 'near'
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none'
            } ${blurClass(lens.blur.day.near)}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        {/* Layer 4: Night */}
        {visitedStates.some((state) => state.startsWith('night-')) && (
          <Image
            src={lens.images.night.distance}
            alt={`${lens.name} night vision`}
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-500 ease-in-out ${
              timeOfDay === 'night' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            } ${blurClass(lens.blur.night[activeDistance])}`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={lens.featured}
          />
        )}
      </>
    );
  };

  const renderPremiumSimulatorImages = () => {
    return lenses
      .filter((l) => l.id !== 'monofocal')
      .map((lens) => {
        const isCurrentLens = activePremiumLensId === lens.id;
        const isVisited = visitedLenses.includes(lens.id);
        if (!isVisited) return null;
        return (
          <div
            key={lens.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              isCurrentLens ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {renderSimulatorImages(lens.id)}
          </div>
        );
      });
  };

  const mobileDisplayLensId = isPeekingBaseline ? 'monofocal' : activeMobileLensId;
  const activePremiumLens = lenses.find((l) => l.id === activePremiumLensId) || lenses[0];
  const activeMobileConfigLens = lenses.find((l) => l.id === activeMobileLensId) || lenses[0];

  const currentGlowLensId = hoveredLensId ?? activePremiumLensId;
  const currentGlowLens = lenses.find((l) => l.id === currentGlowLensId) || lenses[0];

  useEffect(() => {
    if (!ambientGlowRef.current) return;
    const x = glowPosition
      ? glowPosition.x
      : currentGlowLensId === 'panoptix'
        ? '65%'
        : currentGlowLensId === 'vivity'
          ? '50%'
          : '35%';
    const y = glowPosition ? glowPosition.y : '50%';
    const opacity = glowPosition ? '0.95' : '0.45';
    const glowBg = `radial-gradient(circle, ${currentGlowLens.id === 'panoptix' ? 'rgba(139,92,246,0.25)' : currentGlowLens.id === 'vivity' ? 'rgba(0,201,177,0.25)' : currentGlowLens.id === 'eyhance' ? 'rgba(16,185,129,0.2)' : 'rgba(100,116,139,0.15)'} 0%, rgba(0,0,0,0) 70%)`;

    ambientGlowRef.current.style.setProperty('--glow-x', x);
    ambientGlowRef.current.style.setProperty('--glow-y', y);
    ambientGlowRef.current.style.setProperty('--glow-opacity', opacity);
    ambientGlowRef.current.style.setProperty('--glow-bg', glowBg);
  }, [glowPosition, currentGlowLensId, currentGlowLens]);

  const renderMobileSimulatorImages = () => {
    return lenses.map((lens) => {
      const isCurrentLens = mobileDisplayLensId === lens.id;
      const isVisited = visitedLenses.includes(lens.id);
      if (!isVisited) return null;
      return (
        <div
          key={lens.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            isCurrentLens ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {renderSimulatorImages(lens.id)}
        </div>
      );
    });
  };

  return (
    <section id="lenses" className="py-12 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 vision-section-bg opacity-40" />

      {/* Subtle Central Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.01] rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Dynamic Sliding Background Glow that follows the active lens selection or mouse hover */}
      <div ref={ambientGlowRef} className={styles.ambientGlow} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4 animate-fade-in">
            Interactive Vision Simulator
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-6 leading-tight">
            See Your <span className="font-semibold text-gradient-primary">Future Vision.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Compare visual outcomes across distance, intermediate, and near ranges to see which lens
            best fits your lifestyle.
          </p>
        </div>

        <div
          id="iol-simulator"
          className="glass-card border border-white/[0.08] backdrop-blur-md rounded-[32px] p-3 sm:p-5 lg:p-10 mb-10 sm:mb-12 shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative z-10"
        >
          {/* Integrated Toggles Bar */}
          <div className="flex flex-col gap-6 pb-6 mb-8 border-b border-white/[0.06]">
            {/* Centered Environment Panel */}
            <div className="flex flex-col gap-4 sm:gap-6 p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] backdrop-blur-lg max-w-4xl mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Column 1: Lighting Time */}
                <div className="md:col-span-4 flex flex-col justify-center md:border-r border-white/[0.06] md:pr-6">
                  <span className="text-[10px] text-primary/80 font-bold uppercase tracking-[0.2em] mb-2.5 block text-center md:text-left">
                    Lighting Environment
                  </span>
                  <div className="relative flex p-1 bg-black/40 border border-white/[0.06] rounded-2xl w-full">
                    {/* Sliding background */}
                    <div
                      className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        timeOfDay === 'day'
                          ? 'left-1 bg-amber-500/10 border border-amber-500/20 shadow-[0_2px_8px_rgba(245,158,11,0.15)]'
                          : 'left-[calc(50%+2px)] bg-blue-500/10 border border-blue-500/20 shadow-[0_2px_8px_rgba(59,130,246,0.15)]'
                      }`}
                    />
                    {(['day', 'night'] as TimeOfDay[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => handleTimeOfDayChange(t)}
                        className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${
                          timeOfDay === t
                            ? t === 'night'
                              ? 'text-[#60A5FA]'
                              : 'text-[#F59E0B]'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <AppIcon
                          name={t === 'day' ? 'SunIcon' : 'MoonIcon'}
                          size={16}
                          variant="solid"
                          className={
                            timeOfDay === t
                              ? t === 'day'
                                ? 'text-[#F59E0B]'
                                : 'text-[#60A5FA]'
                              : 'text-muted-foreground'
                          }
                        />
                        <span>{t === 'day' ? 'Daytime' : 'Night driving'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column 2: Focus Distance */}
                <div className="md:col-span-8 flex flex-col justify-center">
                  <span className="text-[10px] text-primary/80 font-bold uppercase tracking-[0.2em] mb-2.5 block text-center md:text-left">
                    Simulated Focus distance
                  </span>
                  {timeOfDay === 'day' ? (
                    <div className="relative p-1 bg-black/40 border border-white/[0.06] rounded-2xl w-full grid grid-cols-3 gap-1 shadow-inner">
                      {/* Sliding Highlight Track */}
                      <div data-active={activeDistance} className={styles.distanceHighlight} />
                      {(Object.keys(distanceLabels) as Distance[]).map((d) => {
                        const isActive = activeDistance === d;
                        const details = distanceLabels[d];
                        return (
                          <button
                            key={d}
                            onClick={() => {
                              setActiveDistance(d);
                              trackEvent({
                                action: 'lens_comparison_distance_select',
                                category: 'Engagement',
                                label: d,
                              });
                            }}
                            className={`relative z-10 flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl border text-center transition-colors duration-300 group active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none border-transparent ${
                              isActive
                                ? 'text-white'
                                : 'bg-transparent text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <AppIcon
                              name={details.icon}
                              size={16}
                              className={`mb-1.5 sm:mb-2 transition-transform duration-300 group-hover:scale-110 ${
                                isActive ? 'text-primary' : 'text-muted-foreground'
                              }`}
                            />
                            <span className="block text-[10px] sm:text-xs font-bold leading-none">
                              {details.label}
                            </span>
                            <span className="hidden sm:block text-[8px] text-muted-foreground/60 font-light mt-1 truncate max-w-full">
                              {details.desc.split('(')[0].trim()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-blue-950/10 border border-blue-900/20 text-left w-full h-full min-h-[74px]">
                      <AppIcon
                        name="ExclamationTriangleIcon"
                        size={24}
                        className="text-[#60A5FA] shrink-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-white leading-none mb-1">
                          Distance Focus Locked
                        </p>
                        <p className="text-[10px] text-muted-foreground/90 font-light leading-relaxed">
                          Night simulation focuses specifically on distance headlight glare and
                          halos (critical for driving safety).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Simulator Viewport (md and up) */}
          <div className="hidden md:grid grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-4">
            {/* Left Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-white/[0.02] border border-white/[0.06] rounded-t-2xl border-b-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-500 shadow-[0_0_8px_rgba(107,114,128,0.6)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/90">
                  Baseline Vision
                </span>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest bg-white/[0.04] border border-white/[0.06] px-2.5 py-0.5 rounded-lg">
                Standard Monofocal
              </span>
            </div>

            {/* Right Header */}
            <div className="flex items-center justify-between px-5 py-2 bg-white/[0.02] border border-white/[0.06] rounded-t-2xl border-b-0">
              <div className="flex items-center gap-2">
                <span
                  data-lens={activePremiumLens.id}
                  className={`w-2 h-2 rounded-full transition-all duration-500 animate-pulse ${styles.indicatorDot}`}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Compare Premium Lens
                </span>
              </div>
              <div className="flex p-1 bg-black/60 rounded-xl border border-white/[0.08] gap-1 shadow-inner">
                {lenses
                  .filter((l) => l.id !== 'monofocal')
                  .map((lens) => {
                    const isActive = activePremiumLensId === lens.id;
                    return (
                      <button
                        key={lens.id}
                        onClick={() => selectPremiumLens(lens.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none flex items-center gap-1.5 border ${
                          isActive
                            ? 'bg-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] scale-[1.02]'
                            : 'text-muted-foreground hover:text-foreground border-transparent'
                        }`}
                      >
                        <span
                          data-lens={lens.id}
                          className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 ${isActive ? `${styles.sceneTagDot} scale-[1.2]` : styles.lensDot}`}
                        />
                        <span>
                          {lens.id === 'panoptix'
                            ? 'PanOptix Pro'
                            : lens.id === 'vivity'
                              ? 'Clareon Vivity'
                              : 'Tecnis Eyhance'}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Left Image Viewport */}
            <div className="relative aspect-[4/3] rounded-b-2xl overflow-hidden bg-black/40 border border-white/[0.08] border-t-0 shadow-[0_10px_30px_rgba(0,0,0,0.4)] group">
              {renderSimulatorImages('monofocal')}
              {/* Scene Tag */}
              <div className="absolute top-3 left-3 pointer-events-none z-20">
                <span className="bg-black/60 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                  {timeOfDay === 'day' ? 'Day' : 'Night'} · Monofocal
                </span>
              </div>
              {/* In-Image Visual Explanation Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/60 to-transparent backdrop-blur-[2px] z-20">
                <div className="flex items-center gap-2">
                  {(() => {
                    const overlay = visualStatusOverlays.monofocal[timeOfDay][activeDistance];
                    return (
                      <>
                        <AppIcon
                          name={
                            overlay.status === 'clear'
                              ? 'CheckCircleIcon'
                              : 'ExclamationTriangleIcon'
                          }
                          size={16}
                          variant="solid"
                          className={
                            overlay.status === 'clear' ? 'text-emerald-400' : 'text-amber-500'
                          }
                        />
                        <span className="text-xs font-medium text-white/95">{overlay.text}</span>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Right Image Viewport */}
            <div
              data-lens={activePremiumLens.id}
              className={`relative aspect-[4/3] rounded-b-2xl overflow-hidden bg-black/40 border border-t-0 transition-all duration-500 group ${styles.premiumViewport}`}
            >
              {renderPremiumSimulatorImages()}
              {/* Scene Tag */}
              <div className="absolute top-4 left-4 pointer-events-none z-20">
                <span
                  data-lens={activePremiumLens.id}
                  className={`bg-black/75 backdrop-blur-md text-[10px] px-3 py-1.5 rounded-xl uppercase tracking-wider font-bold border flex items-center gap-2 transition-all duration-500 ${styles.sceneTag}`}
                >
                  <span
                    data-lens={activePremiumLens.id}
                    className={`w-2 h-2 rounded-full ${styles.sceneTagDot}`}
                  />
                  <span>
                    {timeOfDay === 'day' ? 'Daytime' : 'Night driving'} · {activePremiumLens.name}
                  </span>
                </span>
              </div>
              {/* In-Image Visual Explanation Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/60 to-transparent backdrop-blur-[2px] z-20">
                <div className="flex items-center gap-2">
                  {(() => {
                    const overlay =
                      visualStatusOverlays[activePremiumLensId][timeOfDay][activeDistance];
                    return (
                      <>
                        <AppIcon
                          name={
                            overlay.status === 'clear'
                              ? 'CheckCircleIcon'
                              : overlay.status === 'info'
                                ? 'InformationCircleIcon'
                                : 'ExclamationTriangleIcon'
                          }
                          size={16}
                          variant="solid"
                          className={
                            overlay.status === 'clear'
                              ? 'text-emerald-400'
                              : overlay.status === 'info'
                                ? 'text-sky-400'
                                : 'text-amber-500'
                          }
                        />
                        <span className="text-xs font-medium text-white/95">{overlay.text}</span>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Left Description */}
            <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed min-h-[3rem] px-2">
              {timeOfDay === 'night'
                ? nightVisionDescriptions.monofocal
                : visionDescriptions.monofocal[activeDistance]}
            </p>

            {/* Right Description */}
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed min-h-[3rem] px-2">
              {timeOfDay === 'night'
                ? nightVisionDescriptions[activePremiumLensId]
                : visionDescriptions[activePremiumLensId][activeDistance]}
            </p>
          </div>

          {/* Mobile Simulator Viewport (less than md) */}
          <div className="md:hidden flex flex-col gap-5">
            {/* Mobile Consolidated Lens Selector */}
            <div className="flex flex-col w-full gap-2">
              <span className="text-[10px] text-primary/80 font-bold uppercase tracking-[0.2em] text-center">
                Select Lens to Simulate
              </span>
              <div className="flex p-1 bg-black/60 rounded-2xl border border-white/[0.08] w-full min-h-[65px] gap-1 shadow-inner">
                {lenses.map((lens) => {
                  const isActive = activeMobileLensId === lens.id;
                  return (
                    <button
                      key={lens.id}
                      onClick={() => selectMobileLens(lens.id)}
                      data-lens={lens.id}
                      className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl text-center transition-all duration-300 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none border ${
                        isActive
                          ? `bg-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] scale-[1.02] ${styles.mobileLensBtn}`
                          : 'text-muted-foreground hover:text-foreground border-transparent'
                      }`}
                    >
                      <span className="text-[11px] font-bold leading-none flex items-center gap-1">
                        <span
                          data-lens={lens.id}
                          className={`w-1.5 h-1.5 rounded-full inline-block shrink-0 ${isActive ? styles.mobileLensDot : styles.lensDot}`}
                        />
                        {lens.id === 'monofocal'
                          ? 'Mono'
                          : lens.id === 'panoptix'
                            ? 'PanOptix'
                            : lens.id === 'vivity'
                              ? 'Vivity'
                              : 'Eyhance'}
                      </span>
                      <span className="block text-[8px] opacity-60 font-medium mt-1 uppercase tracking-wider">
                        {lens.id === 'monofocal'
                          ? 'Baseline'
                          : lens.id === 'panoptix'
                            ? 'Trifocal'
                            : lens.id === 'vivity'
                              ? 'EDOF'
                              : 'Enhanced'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Viewport Image Box */}
            <div
              data-lens={activeMobileConfigLens.id}
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border transition-all duration-500 shadow-md ${styles.mobileViewport}`}
            >
              {renderMobileSimulatorImages()}

              {/* Hold to Compare Floating Button (only when premium lens is selected) */}
              {activeMobileLensId !== 'monofocal' && (
                <button
                  onMouseDown={() => setIsPeekingBaseline(true)}
                  onMouseUp={() => setIsPeekingBaseline(false)}
                  onMouseLeave={() => setIsPeekingBaseline(false)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    setIsPeekingBaseline(true);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setIsPeekingBaseline(false);
                  }}
                  className="absolute top-3 right-3 z-30 px-3 py-2 bg-black/75 hover:bg-black/90 active:bg-primary/95 text-[10px] font-bold text-white rounded-xl border border-white/20 backdrop-blur-sm transition-all shadow-lg active:scale-95 touch-none select-none flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span>Hold to Compare Monofocal</span>
                </button>
              )}

              {/* Status Overlay */}
              <div className="absolute top-4 left-4 pointer-events-none z-20">
                <span
                  data-lens={isPeekingBaseline ? 'monofocal' : activeMobileLensId}
                  className={`bg-black/75 backdrop-blur-md text-[10px] px-3 py-1.5 rounded-xl uppercase tracking-wider font-bold border flex items-center gap-2 transition-all duration-500 ${styles.mobileSceneTag}`}
                >
                  <span
                    data-lens={isPeekingBaseline ? 'monofocal' : activeMobileLensId}
                    className={`w-2 h-2 rounded-full ${styles.mobileSceneTagDot}`}
                  />
                  <span>
                    {isPeekingBaseline
                      ? 'Monofocal (Baseline)'
                      : lenses.find((l) => l.id === activeMobileLensId)?.name}
                  </span>
                </span>
              </div>

              {/* In-Image Visual Explanation Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/60 to-transparent backdrop-blur-[2px] z-20">
                <div className="flex items-center gap-2">
                  {(() => {
                    const overlay =
                      visualStatusOverlays[mobileDisplayLensId][timeOfDay][activeDistance];
                    return (
                      <>
                        <AppIcon
                          name={
                            overlay.status === 'clear'
                              ? 'CheckCircleIcon'
                              : overlay.status === 'info'
                                ? 'InformationCircleIcon'
                                : 'ExclamationTriangleIcon'
                          }
                          size={16}
                          variant="solid"
                          className={
                            overlay.status === 'clear'
                              ? 'text-emerald-400'
                              : overlay.status === 'info'
                                ? 'text-sky-400'
                                : 'text-amber-500'
                          }
                        />
                        <span className="text-xs font-medium text-white/95">{overlay.text}</span>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Mobile Description */}
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed min-h-[3rem] px-1">
              {timeOfDay === 'night'
                ? isPeekingBaseline || activeMobileLensId === 'monofocal'
                  ? nightVisionDescriptions.monofocal
                  : nightVisionDescriptions[activeMobileLensId]
                : isPeekingBaseline
                  ? visionDescriptions.monofocal[activeDistance]
                  : visionDescriptions[activeMobileLensId][activeDistance]}
            </p>
          </div>
        </div>

        {/* Detailed Specs Grid (Below Simulator) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch relative z-10">
          {lenses.map((lens, i) => {
            const isHovered = hoveredLensId === lens.id;
            const isActive = hoveredLensId ? isHovered : lens.id === activeMobileLensId;
            const delays = ['delay-75', 'delay-150', 'delay-300', 'delay-450'];

            return (
              <div
                key={lens.id}
                onMouseEnter={(e) => handleMouseEnter(e, lens.id)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onClick={() => handleCardClick(lens.id)}
                data-lens={lens.id}
                className={`group relative rounded-[32px] p-[2px] transition-spring flex flex-col hover:-translate-y-2 cursor-pointer border animate-fade-up fill-both ${delays[i]} ${
                  isActive
                    ? `bg-gradient-to-b from-white/12 to-white/0 border-transparent ${styles.specCard}`
                    : 'bg-gradient-to-b from-white/8 to-white/0 border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Dynamic Mouse Spotlight Glow */}
                <div data-lens={lens.id} className={styles.spotlightGlow} />
                <div className="relative rounded-[30px] p-6 sm:p-8 flex flex-col h-full bg-muted/70 backdrop-blur-xl transition-spring shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] z-10">
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${lens.twBadgeBg} ${lens.twBadgeText} ${lens.twBadgeBorder}`}
                    >
                      {lens.badge}
                    </span>
                  </div>

                  {/* Lens Name */}
                  <div className="mb-4 min-h-[64px]">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                      {lens.manufacturer} · {lens.type}
                    </p>
                    <h3 className="font-display text-xl font-medium text-foreground">
                      {lens.name}
                    </h3>
                  </div>

                  {/* Specs bars */}
                  <div className="space-y-4 mb-6">
                    {lens.specs.map((spec) => (
                      <div key={spec.label} className="space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-muted-foreground font-medium">{spec.label}</span>
                          <span className={`font-semibold ${lens.twColor}`}>{spec.value}</span>
                        </div>
                        <div className="h-1.5 bg-white/[0.04] border border-white/[0.02] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-spring opacity-80 ${lens.twSpecBar} ${scoreWidthClass(spec.score)}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {lens.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed"
                      >
                        <AppIcon
                          name="CheckCircleIcon"
                          size={14}
                          className={`mt-0.5 shrink-0 ${lens.twColor}`}
                        />
                        <span>
                          {(() => {
                            const parts = h.split(/(\[\d+\])/);
                            return parts.map((part, idx) => {
                              const match = part.match(/^\[(\d+)\]$/);
                              if (match) {
                                const num = match[1];
                                return (
                                  <sup key={idx} className="text-[9px] font-bold">
                                    <a
                                      href={`#footnote-${num}`}
                                      className="text-primary hover:underline ml-0.5"
                                    >
                                      [{num}]
                                    </a>
                                  </sup>
                                );
                              }
                              return part;
                            });
                          })()}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Best for */}
                  <div className="border-t border-border pt-5 mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                      Best for
                    </p>
                    <p className="text-xs text-foreground/80 leading-relaxed font-light">
                      {lens.bestFor}
                    </p>
                  </div>

                  <a
                    href="#booking"
                    data-lens={lens.id}
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full py-3 rounded-xl text-xs font-semibold text-center transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-2 border touch-manipulation min-h-[46px] relative overflow-hidden group/cta focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${styles.ctaButton}`}
                  >
                    <span>
                      Select{' '}
                      {lens.name
                        .replace('Clareon ', '')
                        .replace('Tecnis ', '')
                        .replace('Standard ', '')
                        .replace(' Pro', '')}
                    </span>
                    <svg
                      data-lens={lens.id}
                      className={`w-3.5 h-3.5 transform transition-transform duration-300 shrink-0 ${styles.ctaArrow}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend / FAQ */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] text-muted-foreground/60 mt-8 sm:mt-10 max-w-4xl mx-auto px-4 uppercase tracking-[0.1em] leading-relaxed">
          Simulations are for illustrative purposes only. Specifications displayed in charts above
          represent spectacle independence rates from published clinical data (PanOptix Pro:
          meta-analysis of 13 studies with 513 patients; Vivity: Alcon clinical data; Eyhance: J&J
          Vision 5-year follow-up). Individual patient experiences and clinical results may vary
          significantly. A comprehensive consultation with Dr. Marano is required for medical
          diagnosis and personalized treatment planning.
        </p>
      </div>
    </section>
  );
}
