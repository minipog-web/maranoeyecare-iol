'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

const AFFILIATIONS = [
  {
    id: 'nj-top-doc',
    name: 'NJ TOP DOC',
    badge: '15 Years in a Row',
    icon: 'TrophyIcon',
  },
  {
    id: 'aao',
    name: 'AAO',
    badge: 'Fellow Member',
    icon: 'EyeIcon',
  },
  {
    id: 'ascrs',
    name: 'ASCRS',
    badge: 'Cataract Specialist',
    icon: 'SparklesIcon',
  },
  {
    id: 'abo',
    name: 'ABO',
    badge: 'Board Certified',
    icon: 'ShieldCheckIcon',
  },
  {
    id: 'castle-connolly',
    name: 'CASTLE CONNOLLY',
    badge: 'Top Doctor 2026',
    icon: 'StarIcon',
  },
];

export default function CertificationLogos() {
  return (
    <div className="border-y border-primary/20 bg-section-certifications py-6 sm:py-7 overflow-hidden relative shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      {/* Engraved plaque directional sheen */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.04] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-6 xl:pl-8 lg:pr-16 xl:pr-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 relative lg:-left-6 xl:-left-8">
          {/* Label Header */}
          <div className="text-center lg:text-left shrink-0 max-w-sm lg:max-w-xs xl:max-w-sm">
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
                Clinical Affiliations
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary border border-primary/25 tracking-wide shadow-[0_0_12px_rgba(197,160,89,0.15)]">
                <Icon name="TrophyIcon" size={11} className="text-primary shrink-0" />
                15 Years in a Row
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Recipient of NJ Top Doc awards for 15 consecutive years, backed by board-certified
              credentials and recognized clinical excellence.
            </p>
          </div>

          {/* Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5 xl:gap-3 w-full lg:w-auto shrink-0 justify-center">
            {AFFILIATIONS.map((item, idx) => (
              <div
                key={item.id}
                className={`relative group text-left rounded-xl px-3 py-2.5 sm:px-3.5 sm:py-2.5 bg-gradient-to-b from-white/[0.05] via-[#0e1322]/90 to-[#0a0d18]/95 border border-white/[0.08] hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_-4px_rgba(197,160,89,0.22),0_2px_8px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 ${
                  idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                {/* Specular Light Sheen sweep */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className="absolute -inset-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                </div>

                {/* Badge Content */}
                <div className="relative z-10 flex items-center gap-2.5 sm:gap-3">
                  {/* Medal Crest Icon */}
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 via-primary/5 to-white/[0.02] border border-primary/30 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_6px_rgba(0,0,0,0.4)] group-hover:scale-105 group-hover:border-primary/60 group-hover:shadow-[0_0_12px_rgba(197,160,89,0.35)] transition-all duration-300 shrink-0">
                    <Icon
                      name={item.icon}
                      size={16}
                      className="text-primary group-hover:text-accent transition-colors"
                    />
                  </div>

                  {/* Text Details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-foreground group-hover:text-white transition-colors leading-none whitespace-nowrap">
                        {item.name}
                      </p>
                      <Icon
                        name="CheckBadgeIcon"
                        size={10}
                        className="text-primary/70 group-hover:text-primary transition-colors shrink-0"
                      />
                    </div>
                    <p className="text-[8px] sm:text-[8.5px] text-muted-foreground group-hover:text-primary/90 transition-colors uppercase tracking-widest mt-1 font-semibold whitespace-nowrap">
                      {item.badge}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
