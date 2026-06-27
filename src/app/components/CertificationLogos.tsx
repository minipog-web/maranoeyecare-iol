'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function CertificationLogos() {
  return (
    <div className="border-y border-border/30 bg-black/20 py-6 sm:py-8 overflow-hidden relative">
      {/* Background glow lines */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/2 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Label */}
          <div className="text-center md:text-left shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              Clinical Affiliations
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Board-certified credentials and recognized quality standards.
            </p>
          </div>

          {/* Logos Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 opacity-75 hover:opacity-90 transition-opacity">
            {/* AAO */}
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2.5 backdrop-blur-sm shadow-sm">
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
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2.5 backdrop-blur-sm shadow-sm">
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
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2.5 backdrop-blur-sm shadow-sm">
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
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2.5 backdrop-blur-sm shadow-sm">
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
