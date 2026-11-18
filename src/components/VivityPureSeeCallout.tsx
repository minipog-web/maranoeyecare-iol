'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { renderFootnoteText } from '@/lib/ui';

/**
 * Clinical decision callout explaining how surgeons differentiate between
 * Clareon Vivity and TECNIS PureSee when comparison metrics appear similar.
 */
export default function VivityPureSeeCallout() {
  return (
    <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#07090d] backdrop-blur-xl shadow-2xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
        <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 text-primary">
          <Icon name="ScaleIcon" size={22} />
        </div>
        <div className="space-y-4 flex-1">
          <div>
            <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1">
              Clinical Decision Guide
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
              How Our Surgeons Choose Between Vivity and PureSee
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
            Because both are non-diffractive EDOF lenses, their headline acuity and night-glare
            metrics look nearly identical on paper. During your consultation, Dr. Marano and Dr.
            Raouf weigh subtle optical and clinical differences tailored to your eyes:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div className="rounded-2xl bg-white/[0.02] border border-[#00a3ff]/20 p-4 sm:p-5">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] mb-2">
                TECNIS PureSee™
              </div>
              <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed font-light">
                {renderFootnoteText(
                  'Built on an Abbe 55 low-dispersion acrylic material with a posterior continuous refractive design, and is the first FDA-approved EDOF lens without a clinical contrast-sensitivity warning—ideal when maximizing chromatic clarity and dim-light contrast is top priority [3].'
                )}
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.02] border border-primary/20 p-4 sm:p-5">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary mb-2">
                Clareon® Vivity®
              </div>
              <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed font-light">
                {renderFootnoteText(
                  'Supported by a 6-year real-world US clinical track record on Alcon’s glistening-free Clareon® platform, offering deeply established surgical predictability and long-term US outcome data [2].'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
