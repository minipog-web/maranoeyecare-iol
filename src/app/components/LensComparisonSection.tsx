import React from 'react';

import Icon from '@/components/ui/AppIcon';

const lenses = [
  {
    id: 'vivity',
    name: 'Clareon Vivity',
    manufacturer: 'Alcon',
    type: 'Extended Depth of Focus (EDOF)',
    tagline: 'Maximum range. Minimum disturbance.',
    color: '#00C9B1',
    featured: true,
    badge: 'Most Popular',
    specs: [
      { label: 'Distance Vision', value: 'Excellent', score: 95 },
      { label: 'Intermediate (60–70cm)', value: 'Excellent', score: 92 },
      { label: 'Near (40cm)', value: 'Functional', score: 55 },
      { label: 'Halo / Glare Risk', value: 'Very Low', score: 92 },
    ],
    highlights: [
      '94% report excellent distance vision',
      'Non-diffractive X-WAVE™ Technology',
      'Similar halos to standard monofocal',
      'Neuroadaptation: 1–4 weeks',
    ],
    bestFor: 'Active patients who use screens heavily and want extended range with the fewest visual disturbances.',
  },
  {
    id: 'panoptix',
    name: 'PanOptix Pro',
    manufacturer: 'Alcon',
    type: 'Trifocal IOL',
    tagline: 'True glasses independence at all distances.',
    color: '#7EECD8',
    featured: false,
    badge: 'Full Trifocal',
    specs: [
      { label: 'Distance Vision', value: 'Excellent', score: 97 },
      { label: 'Intermediate (60–70cm)', value: 'Excellent', score: 95 },
      { label: 'Near (40cm)', value: 'Excellent', score: 90 },
      { label: 'Halo / Glare Risk', value: 'Mild', score: 72 },
    ],
    highlights: [
      '99% of patients would choose again',
      'ENLIGHTEN NXT: 94% light capture',
      'Only FDA-approved trifocal in US',
      '120M+ implanted worldwide',
    ],
    bestFor: 'Patients wanting maximum glasses freedom — reading, screens, and driving — all without spectacles.',
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
    specs: [
      { label: 'Distance Vision', value: 'Excellent', score: 98 },
      { label: 'Intermediate (60–70cm)', value: 'Good', score: 75 },
      { label: 'Near (40cm)', value: 'Limited', score: 30 },
      { label: 'Halo / Glare Risk', value: 'None Added', score: 98 },
    ],
    highlights: [
      '100% distance independence at 5 years',
      'Ring-free refractive optic design',
      'No increase in halos vs. monofocal',
      'Ideal for patients with mild comorbidities',
    ],
    bestFor: 'Patients who prioritise pristine distance clarity and zero added visual disturbances, with some intermediate benefit.',
  },
];

export default function LensComparisonSection() {
  return (
    <section id="lenses" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 radial-glow-primary opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">Premium IOL Options</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4 sm:mb-6 leading-tight">
            Three Lenses.{' '}
            <span className="text-gradient-primary font-medium">One Right Choice.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dr. Marano evaluates each patient individually to recommend the lens that matches your vision goals, lifestyle, and eye health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {lenses.map((lens) => (
            <div
              key={lens.id}
              className={`relative rounded-4xl p-5 sm:p-8 flex flex-col transition-all duration-500 group ${
                lens.featured
                  ? 'bg-card border border-primary/40 card-glow-featured md:ring-2 md:ring-primary/20' :'bg-card border border-border card-glow hover:border-border/80'
              }`}
            >
              {/* Featured indicator for mobile */}
              {lens.featured && (
                <div className="md:hidden absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full whitespace-nowrap">
                  ★ Recommended
                </div>
              )}

              {/* Badge */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                  style={{
                    backgroundColor: `${lens.color}15`,
                    color: lens.color,
                    border: `1px solid ${lens.color}30`,
                  }}
                >
                  {lens.badge}
                </span>
              </div>

              {/* Lens name */}
              <div className="mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{lens.manufacturer} · {lens.type}</p>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground">{lens.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 sm:mb-6 leading-relaxed italic">{lens.tagline}</p>

              {/* Specs bars */}
              <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-8">
                {lens.specs.map((spec) => (
                  <div key={spec.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground font-medium">{spec.label}</span>
                      <span className="font-semibold" style={{ color: lens.color }}>{spec.value}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${spec.score}%`,
                          backgroundColor: lens.color,
                          opacity: 0.8,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-8 flex-1">
                {lens.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Icon name="CheckCircleIcon" size={16} className="mt-0.5 shrink-0" style={{ color: lens.color } as React.CSSProperties} />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Best for */}
              <div className="border-t border-border pt-4 sm:pt-6 mb-4 sm:mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Best for</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{lens.bestFor}</p>
              </div>

              <a
                href="#booking"
                className="w-full py-4 rounded-2xl text-sm font-bold text-center transition-all duration-300 hover:scale-[1.02] active:scale-95 touch-manipulation min-h-[52px] flex items-center justify-center"
                style={{
                  backgroundColor: lens.featured ? 'var(--primary)' : 'transparent',
                  color: lens.featured ? 'var(--primary-foreground)' : lens.color,
                  border: lens.featured ? 'none' : `1px solid ${lens.color}40`,
                }}
              >
                Ask About {lens.name}
              </a>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-muted-foreground mt-8 max-w-3xl mx-auto px-2">
          Clinical data sourced from Alcon and J&J Vision published studies. Individual outcomes vary. A comprehensive eye exam with Dr. Marano determines candidacy.
        </p>
      </div>
    </section>
  );
}