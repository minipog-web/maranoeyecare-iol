'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './VisionVisualizerSection.module.css';

const lensData = [
  {
    name: 'Standard Monofocal',
    shortName: 'Monofocal',
    color: '#4A5568',
    distance: 90,
    intermediate: 20,
    near: 10,
  },
  {
    name: 'Tecnis Eyhance',
    shortName: 'Eyhance',
    color: '#A8B4C8',
    distance: 98,
    intermediate: 75,
    near: 30,
  },
  {
    name: 'Clareon Vivity',
    shortName: 'Vivity',
    color: '#00C9B1',
    distance: 95,
    intermediate: 92,
    near: 55,
  },
  {
    name: 'PanOptix Pro',
    shortName: 'PanOptix',
    color: '#7EECD8',
    distance: 97,
    intermediate: 95,
    near: 90,
  },
];

const categories = [
  {
    key: 'distance' as const,
    label: 'Distance Vision',
    sublabel: 'Driving, TV, faces',
    icon: '🚗',
  },
  {
    key: 'intermediate' as const,
    label: 'Intermediate Vision',
    sublabel: 'Screens, computers, dashboards (60–70 cm)',
    icon: '💻',
  },
  {
    key: 'near' as const,
    label: 'Near Vision',
    sublabel: 'Reading, phones, menus (40 cm)',
    icon: '📖',
  },
];

function BarGroup({
  category,
  animated,
}: {
  category: (typeof categories)[0];
  animated: boolean;
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="text-center mb-5 sm:mb-6">
        <div className="text-xl sm:text-2xl mb-2">{category.icon}</div>
        <h3 className="font-display text-sm sm:text-base font-medium text-foreground">{category.label}</h3>
        <p className="text-xs text-muted-foreground mt-1 leading-snug">{category.sublabel}</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {lensData.map((lens) => {
          const value = lens[category.key];
          return (
            <div key={lens.name} className={`space-y-1.5 ${styles[`lens${lens.shortName}`]}`}>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-medium truncate pr-2">{lens.shortName}</span>
                <span className={`font-bold shrink-0 ${styles.lensValue}`}>{value}%</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`${styles.lensBar}${animated ? ` ${styles[`bar${value}`]}` : ''}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function VisionVisualizerSection() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="vision" ref={sectionRef} className="py-16 sm:py-24 border-t border-border relative">
      <div className={`absolute inset-0 ${styles.sectionBg}`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 mb-10 sm:mb-16">
          <div className="lg:w-1/3">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">Vision Outcomes</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-4 sm:mb-6">
              See the{' '}
              <span className="text-gradient-primary font-medium">Difference</span>{' '}
              Clearly
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Spectacle independence rates from clinical studies. Higher is better. Standard monofocal shown as baseline.
            </p>
          </div>


        </div>

        {/* Visualizer */}
        <div className="bg-card border border-border rounded-4xl p-5 sm:p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat.key}>
                <BarGroup category={cat} animated={animated} />
                {idx < categories.length - 1 && (
                  <>
                    {/* Horizontal divider on mobile */}
                    <div className="md:hidden h-px bg-border w-full" />
                    {/* Vertical divider on desktop */}
                    <div className="hidden md:block w-px bg-border shrink-0" />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Legend Moved Inside Box */}
          <div className="mt-10 mb-2 flex flex-wrap gap-2 sm:gap-3">
            {lensData.map((lens) => (
              <div key={lens.name} className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/50 ${styles[`lens${lens.shortName}`]}`}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${styles.legendDot}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{lens.name}</span>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-start gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Percentages represent glasses independence rates from published clinical data. PanOptix Pro: meta-analysis of 13 studies (513 patients). Vivity: Alcon clinical data. Eyhance: J&J Vision 5-year follow-up. Individual results vary.
              </p>
            </div>
            <a
              href="#booking"
              className="w-full sm:w-auto shrink-0 px-6 py-3 sm:py-2.5 bg-primary/10 text-primary border border-primary/30 rounded-full text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all text-center touch-manipulation min-h-[48px] flex items-center justify-center"
            >
              Find My Best Lens
            </a>
          </div>
        </div>

        {/* Key takeaway */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              lens: 'PanOptix Pro',
              lensKey: 'panoptix',
              insight: 'Leads at every distance — 90%+ glasses independence across all three vision zones.',
            },
            {
              lens: 'Clareon Vivity',
              lensKey: 'vivity',
              insight: 'Exceptional distance and intermediate with far fewer halos than other premium lenses.',
            },
            {
              lens: 'Eyhance',
              lensKey: 'eyhance',
              insight: 'Unmatched distance clarity with zero added visual disturbances — best for sensitive eyes.',
            },
          ].map((item) => (
            <div key={item.lens} className={`bg-muted/30 border border-border rounded-3xl p-5 sm:p-6 ${styles[`lens${item.lensKey.charAt(0).toUpperCase() + item.lensKey.slice(1)}`]}`}>
              <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${styles.takeawayLabel}`}>
                {item.lens}
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}