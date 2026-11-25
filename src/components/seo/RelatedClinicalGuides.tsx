import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export type GuideSlug = 'clareon-vivity' | 'panoptix-pro' | 'tecnis-puresee' | 'cataract-education';

interface GuideItem {
  slug: GuideSlug;
  badge: string;
  title: string;
  summary: string;
  href: string;
  accentClass: string;
}

const GUIDES: GuideItem[] = [
  {
    slug: 'clareon-vivity',
    badge: 'Non-Diffractive EDOF',
    title: 'Clareon® Vivity® Clinical Guide',
    summary:
      'X-WAVE™ wavefront shaping for seamless distance & dashboard vision with monofocal-like night clarity.',
    href: '/clareon-vivity',
    accentClass: 'border-primary/35 hover:border-primary/70 text-primary',
  },
  {
    slug: 'panoptix-pro',
    badge: 'Full-Range Trifocal',
    title: 'Clareon® PanOptix® Pro Guide',
    summary:
      'ENLIGHTEN® NXT 94% light utilization for near reading (40 cm), computer (60 cm), and distance freedom.',
    href: '/panoptix-pro',
    accentClass: 'border-purple-400/35 hover:border-purple-400/70 text-purple-300',
  },
  {
    slug: 'tecnis-puresee',
    badge: 'Pure Refractive EDOF',
    title: 'TECNIS PureSee™ Clinical Guide',
    summary:
      'Zero diffractive rings and zero FDA contrast sensitivity warning—engineered for dark highways & screens.',
    href: '/tecnis-puresee',
    accentClass: 'border-amber-300/35 hover:border-amber-300/70 text-amber-200',
  },
  {
    slug: 'cataract-education',
    badge: 'Pathology & Permanence',
    title: '5 Stages of Cataracts & IOL Guide',
    summary:
      'Why natural lenses yellow over time and why biocompatible acrylic IOL replacement never clouds again.',
    href: '/cataract-education',
    accentClass: 'border-emerald-400/35 hover:border-emerald-400/70 text-emerald-300',
  },
];

interface RelatedClinicalGuidesProps {
  currentSlug: GuideSlug;
}

export default function RelatedClinicalGuides({ currentSlug }: RelatedClinicalGuidesProps) {
  const related = GUIDES.filter((g) => g.slug !== currentSlug);

  return (
    <section
      aria-label="Related Cataract and Intraocular Lens Clinical Guides"
      className="py-12 sm:py-16 border-t border-white/[0.06] bg-[#06080d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-1.5">
              Continue Comparing Options
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-tight">
              Explore Related Clinical IOL &amp; Cataract Guides
            </h2>
          </div>
          <Link
            href="/#vision"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline min-h-[44px] py-2 touch-manipulation focus-visible:ring-2 focus-visible:ring-primary rounded-lg focus-visible:outline-none"
          >
            <span>Compare All 4 Lenses Side-by-Side</span>
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {related.map((guide) => (
            <Link
              key={guide.slug}
              href={guide.href}
              className={`group rounded-2xl p-5 bg-gradient-to-b from-white/[0.045] to-white/[0.015] border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[168px] touch-manipulation shadow-[0_12px_32px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${guide.accentClass}`}
            >
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.16em] mb-2 opacity-95">
                  {guide.badge}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-white group-hover:text-primary transition-colors mb-2 leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{guide.summary}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-primary transition-colors">
                <span>Read Clinical Guide</span>
                <Icon
                  name="ArrowRightIcon"
                  size={13}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
