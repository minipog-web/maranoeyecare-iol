import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface MedicalReviewBadgeProps {
  lastUpdated?: string;
  compact?: boolean;
}

export default function MedicalReviewBadge({
  lastUpdated = 'November 2026',
  compact = false,
}: MedicalReviewBadgeProps) {
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 max-w-full rounded-2xl border border-white/[0.09] bg-[#0c101b]/95 md:bg-white/[0.03] md:backdrop-blur-md ${
        compact ? 'px-3 sm:px-3.5 py-2 text-[11px]' : 'px-3.5 sm:px-4 py-2.5 text-xs'
      } text-slate-200 leading-relaxed shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`}
    >
      <span className="inline-flex items-center gap-1.5 font-bold text-primary uppercase tracking-[0.12em]">
        <Icon name="ShieldCheckIcon" size={15} className="text-primary shrink-0" />
        <span>Medically Reviewed</span>
      </span>
      <span className="hidden sm:inline text-white/20" aria-hidden="true">
        |
      </span>
      <span>
        By{' '}
        <a
          href="https://www.maranoeyecare.com/provider/matthew-j-marano-jr-md"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-white hover:text-primary underline decoration-primary/40 underline-offset-2 transition-colors"
        >
          Matthew J. Marano Jr., MD
        </a>{' '}
        &amp;{' '}
        <a
          href="https://www.maranoeyecare.com/provider/sherief-raouf-md"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-white hover:text-primary underline decoration-primary/40 underline-offset-2 transition-colors"
        >
          Sherief Raouf, MD
        </a>
      </span>
      <span className="hidden md:inline text-white/20" aria-hidden="true">
        ·
      </span>
      <span className="text-slate-300 font-medium">
        Board-Certified NJ Ophthalmologists · Updated {lastUpdated}
      </span>
    </div>
  );
}
