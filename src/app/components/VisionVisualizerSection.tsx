'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './VisionVisualizerSection.module.css';

const lensData = [
  {
    name: 'Standard Monofocal',
    shortName: 'Monofocal',
    color: '#6B7280',
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
    sublabel: 'Screens, computers, dashboards',
    icon: '💻',
  },
  {
    key: 'near' as const,
    label: 'Near Vision',
    sublabel: 'Reading, phones, menus (40 cm)',
    icon: '📖',
  },
];

function BarGroup({ category, animated }: { category: (typeof categories)[0]; animated: boolean }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="text-center mb-5 sm:mb-6">
        <div className="text-2xl sm:text-3xl mb-3">{category.icon}</div>
        <h3 className="font-display text-sm sm:text-base font-medium text-foreground">
          {category.label}
        </h3>
        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{category.sublabel}</p>
      </div>

      <div className="space-y-3.5 sm:space-y-4">
        {lensData.map((lens) => {
          const value = lens[category.key];
          return (
            <div key={lens.name} className={`space-y-1.5 ${styles[`lens${lens.shortName}`]}`}>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-medium truncate pr-2">
                  {lens.shortName}
                </span>
                <span className={`font-bold shrink-0 tabular-nums ${styles.lensValue}`}>
                  {value}%
                </span>
              </div>
              <div className="h-2 bg-[#13151E] rounded-full overflow-hidden">
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
    <section
      id="vision"
      ref={sectionRef}
      className="py-16 sm:py-28 border-t border-border relative overflow-hidden"
    >
      {/* Background */}
      <div className={`absolute inset-0 ${styles.sectionBg}`} />
      <div className="absolute inset-0 grid-lines-bg opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 mb-10 sm:mb-16">
          <div className="lg:w-1/2">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-primary mb-4 opacity-90">
              Vision Outcomes
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-4 sm:mb-6">
              See the <span className="text-gradient-primary font-semibold">Difference</span>{' '}
              Clearly
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Spectacle independence rates from clinical studies. Higher is better. Standard
              monofocal shown as baseline.
            </p>
          </div>
        </div>

        {/* Visualizer card */}
        <div
          className={`glass-card border border-border rounded-3xl p-5 sm:p-8 md:p-12 ${styles.visualizerCard}`}
        >
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat.key}>
                <BarGroup category={cat} animated={animated} />
                {idx < categories.length - 1 && (
                  <>
                    {/* Horizontal divider on mobile */}
                    <div className={`md:hidden h-px w-full ${styles.dividerH}`} />
                    {/* Vertical divider on desktop */}
                    <div className={`hidden md:block w-px shrink-0 ${styles.dividerV}`} />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-10 mb-2 flex flex-wrap gap-2 sm:gap-3">
            {lensData.map((lens) => (
              <div
                key={lens.name}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] ${styles[`lens${lens.shortName}`]}`}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${styles.legendDot}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {lens.name}
                </span>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div
            className={`mt-8 sm:mt-10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-start gap-4 ${styles.disclaimerTop}`}
          >
            <div className="flex items-start gap-3 flex-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_6px_rgba(0,201,177,0.6)]" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Percentages represent glasses independence rates from published clinical data.
                PanOptix Pro: meta-analysis of 13 studies (513 patients). Vivity: Alcon clinical
                data. Eyhance: J&J Vision 5-year follow-up. Individual results vary.
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

        {/* Key takeaway cards */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              lens: 'PanOptix Pro',
              lensKey: 'panoptix',
              color: '#7EECD8',
              insight:
                'Leads at every distance — 90%+ glasses independence across all three vision zones.',
            },
            {
              lens: 'Clareon Vivity',
              lensKey: 'vivity',
              color: '#00C9B1',
              insight:
                'Exceptional distance and intermediate with far fewer halos than other premium lenses.',
            },
            {
              lens: 'Eyhance',
              lensKey: 'eyhance',
              color: '#A8B4C8',
              insight:
                'Unmatched distance clarity with zero added visual disturbances — best for sensitive eyes.',
            },
          ].map((item) => (
            <div
              key={item.lens}
              className={`glass-card border border-border rounded-3xl p-5 sm:p-6 card-hover-glow ${styles[`lens${item.lensKey.charAt(0).toUpperCase() + item.lensKey.slice(1)}`]}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full shrink-0 ${styles.takeawayDot}`} />
                <p
                  className={`text-[10px] font-bold uppercase tracking-[0.18em] ${styles.takeawayLabel}`}
                >
                  {item.lens}
                </p>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{item.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
