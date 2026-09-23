'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function CertificationLogos() {
  return (
    <div className="border-y border-primary/20 bg-section-certifications py-6 sm:py-8 overflow-hidden relative shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      {/* Engraved plaque directional sheen */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.04] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Label */}
          <div className="text-center lg:text-left shrink-0 max-w-md">
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                Clinical Affiliations
              </p>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary border border-primary/25 tracking-wide">
                <Icon name="TrophyIcon" size={11} className="text-primary shrink-0" />
                15 Years in a Row
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Recipient of NJ Top Doc awards for 15 consecutive years, backed by board-certified
              credentials and recognized clinical excellence.
            </p>
          </div>

          {/* Logos Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 w-full lg:w-auto shrink-0 opacity-85 hover:opacity-100 transition-opacity">
            {/* NJ Top Doc */}
            <div className="flex items-center gap-2.5 bg-primary/[0.04] border border-primary/30 rounded-xl px-3.5 py-2.5 backdrop-blur-sm shadow-sm ring-1 ring-primary/15">
              <Icon name="TrophyIcon" size={18} className="text-primary shrink-0" />
              <div className="text-left">
                <p className="text-[10px] font-extrabold tracking-wider text-foreground leading-none">
                  NJ TOP DOC
                </p>
                <p className="text-[8px] text-primary font-semibold uppercase tracking-widest mt-0.5">
                  15 Years in a Row
                </p>
              </div>
            </div>

            {/* AAO */}
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl px-3.5 py-2.5 backdrop-blur-sm shadow-sm">
              <Icon name="EyeIcon" size={18} className="text-primary shrink-0" />
              <div className="text-left">
                <p className="text-[10px] font-extrabold tracking-wider text-foreground leading-none">
                  AAO
                </p>
                <p className="text-[8px] text-muted-foreground uppercase tracking-widest mt-0.5">
                  Fellow Member
                </p>
              </div>
            </div>

            {/* ASCRS */}
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl px-3.5 py-2.5 backdrop-blur-sm shadow-sm">
              <Icon name="BeakerIcon" size={18} className="text-primary shrink-0" />
              <div className="text-left">
                <p className="text-[10px] font-extrabold tracking-wider text-foreground leading-none">
                  ASCRS
                </p>
                <p className="text-[8px] text-muted-foreground uppercase tracking-widest mt-0.5">
                  Cataract Specialist
                </p>
              </div>
            </div>

            {/* ABO */}
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl px-3.5 py-2.5 backdrop-blur-sm shadow-sm">
              <Icon name="ShieldCheckIcon" size={18} className="text-primary shrink-0" />
              <div className="text-left">
                <p className="text-[10px] font-extrabold tracking-wider text-foreground leading-none">
                  ABO
                </p>
                <p className="text-[8px] text-muted-foreground uppercase tracking-widest mt-0.5">
                  Board Certified
                </p>
              </div>
            </div>

            {/* Castle Connolly */}
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl px-3.5 py-2.5 backdrop-blur-sm shadow-sm col-span-2 sm:col-span-1">
              <Icon name="StarIcon" size={18} className="text-primary shrink-0" />
              <div className="text-left">
                <p className="text-[10px] font-extrabold tracking-wider text-foreground leading-none">
                  CASTLE CONNOLLY
                </p>
                <p className="text-[8px] text-muted-foreground uppercase tracking-widest mt-0.5">
                  Top Doctor 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
