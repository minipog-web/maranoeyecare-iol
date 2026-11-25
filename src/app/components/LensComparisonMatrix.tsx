'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface LensComparisonMatrixProps {
  onSelectLens: (lensKey: string, label: string) => void;
}

type LensKey = 'vivity' | 'panoptix' | 'puresee' | 'monofocal';

interface LensColumn {
  key: LensKey;
  name: string;
  shortName: string;
  category: string;
  badge?: string;
  accentClass: string;
  headerBg: string;
  ctaLabel: string;
}

interface MatrixRow {
  label: string;
  sublabel: string;
  values: Record<LensKey, { text: string; tone: 'gold' | 'emerald' | 'sky' | 'purple' | 'muted' }>;
}

const COLUMNS: LensColumn[] = [
  {
    key: 'vivity',
    name: 'Clareon® Vivity®',
    shortName: 'Vivity',
    category: 'Non-Diffractive EDOF',
    badge: 'Most Popular',
    accentClass: 'text-[#F5E4C3]',
    headerBg: 'bg-primary/[0.08] border-primary/30',
    ctaLabel: 'Evaluate Vivity',
  },
  {
    key: 'panoptix',
    name: 'Clareon® PanOptix® Pro',
    shortName: 'PanOptix Pro',
    category: 'Full-Range Trifocal',
    badge: 'Max Reading Freedom',
    accentClass: 'text-purple-200',
    headerBg: 'bg-purple-500/[0.08] border-purple-400/30',
    ctaLabel: 'Evaluate PanOptix',
  },
  {
    key: 'puresee',
    name: 'TECNIS PureSee™',
    shortName: 'PureSee',
    category: 'Pure Refractive EDOF',
    badge: 'Latest Night Clarity',
    accentClass: 'text-sky-200',
    headerBg: 'bg-sky-500/[0.08] border-sky-400/30',
    ctaLabel: 'Evaluate PureSee',
  },
  {
    key: 'monofocal',
    name: 'Standard Monofocal',
    shortName: 'Monofocal',
    category: 'Single-Focus Baseline',
    badge: 'Medicare Covered',
    accentClass: 'text-slate-300',
    headerBg: 'bg-white/[0.03] border-white/10',
    ctaLabel: 'Evaluate Monofocal',
  },
];

const ROWS: MatrixRow[] = [
  {
    label: 'Distance Vision',
    sublabel: 'Driving, TV, golf & outdoors',
    values: {
      vivity: { text: 'Crisp HD Clarity', tone: 'emerald' },
      panoptix: { text: 'Crisp HD Clarity', tone: 'emerald' },
      puresee: { text: 'Crisp HD Clarity', tone: 'emerald' },
      monofocal: { text: 'Crisp Single Focus', tone: 'emerald' },
    },
  },
  {
    label: 'Computer & Dashboard',
    sublabel: 'Intermediate (2–3 ft)',
    values: {
      vivity: { text: 'Seamless · Glasses-Free', tone: 'emerald' },
      panoptix: { text: 'Seamless · Glasses-Free', tone: 'emerald' },
      puresee: { text: 'Seamless · Glasses-Free', tone: 'emerald' },
      monofocal: { text: 'Glasses Typically Needed', tone: 'muted' },
    },
  },
  {
    label: 'Phone, Menus & Books',
    sublabel: 'Close-up reading (14–16 in)',
    values: {
      vivity: { text: 'Functional (Readers for tiny print)', tone: 'gold' },
      panoptix: { text: 'Full Near · Zero Readers', tone: 'purple' },
      puresee: { text: 'Strong Functional Near', tone: 'sky' },
      monofocal: { text: 'Reading Glasses Required', tone: 'muted' },
    },
  },
  {
    label: 'Night Driving & Halos',
    sublabel: 'Headlights & dark highways',
    values: {
      vivity: { text: 'Minimal · Monofocal-Like', tone: 'emerald' },
      panoptix: { text: 'Mild Halos (Neuroadapts)', tone: 'gold' },
      puresee: { text: 'Zero Rings · Max Contrast', tone: 'sky' },
      monofocal: { text: 'Minimal Glare', tone: 'emerald' },
    },
  },
  {
    label: 'Astigmatism (Toric)',
    sublabel: 'Corneal cylinder correction',
    values: {
      vivity: { text: 'Included ($0 Extra)', tone: 'gold' },
      panoptix: { text: 'Included ($0 Extra)', tone: 'gold' },
      puresee: { text: 'Included ($0 Extra)', tone: 'gold' },
      monofocal: { text: 'Extra Fee (If Toric)', tone: 'muted' },
    },
  },
  {
    label: 'Insurance & Financing',
    sublabel: 'Medicare + upgrade options',
    values: {
      vivity: { text: 'Upgrade · 0% APR / HSA', tone: 'gold' },
      panoptix: { text: 'Upgrade · 0% APR / HSA', tone: 'gold' },
      puresee: { text: 'Upgrade · 0% APR / HSA', tone: 'gold' },
      monofocal: { text: '100% Covered by Medicare*', tone: 'muted' },
    },
  },
];

function getToneClasses(tone: MatrixRow['values'][LensKey]['tone']): string {
  switch (tone) {
    case 'emerald':
      return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25';
    case 'purple':
      return 'text-purple-200 bg-purple-500/15 border-purple-400/30';
    case 'sky':
      return 'text-sky-200 bg-sky-500/15 border-sky-400/30';
    case 'gold':
      return 'text-[#F5E4C3] bg-primary/15 border-primary/35';
    default:
      return 'text-slate-200 bg-white/[0.04] border-white/15';
  }
}

export default function LensComparisonMatrix({ onSelectLens }: LensComparisonMatrixProps) {
  const [mobileLens, setMobileLens] = useState<LensKey>('vivity');
  const activeMobileCol = COLUMNS.find((c) => c.key === mobileLens) ?? COLUMNS[0];

  return (
    <div className="mb-10 sm:mb-12">
      {/* Matrix Container */}
      <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-b from-[#121623]/95 via-[#0b0e17]/98 to-[#070910] border border-primary/30 ring-1 ring-white/[0.06] shadow-[0_24px_70px_rgba(0,0,0,0.7)]">
        {/* Top Luminous Champagne Hairline */}
        <div
          className="absolute top-0 inset-x-10 h-[1.5px] bg-gradient-to-r from-transparent via-primary/70 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="px-5 sm:px-7 pt-6 pb-5 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-1.5">
              Side-by-Side Clinical Matrix
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-tight">
              Compare All 4 Lens Architectures at a Glance
            </h3>
          </div>
          <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
            Every premium lens includes LENSAR ALLY® 3D laser precision and Toric astigmatism
            correction when indicated.
          </p>
        </div>

        {/* Desktop 5-Column Architectural Matrix */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th scope="col" className="py-4 px-6 w-[22%] align-bottom">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">
                    Visual Feature
                  </span>
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={`py-4 px-4 w-[19.5%] align-bottom border-l border-white/[0.06] ${
                      col.key === 'vivity' ? 'bg-primary/[0.04]' : ''
                    }`}
                  >
                    {col.badge && (
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full border mb-2 ${col.headerBg} ${col.accentClass}`}
                      >
                        {col.badge}
                      </span>
                    )}
                    <div className="font-display text-lg font-semibold text-white leading-snug">
                      {col.name}
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                      {col.category}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {ROWS.map((row) => (
                <tr key={row.label} className="hover:bg-white/[0.02] transition-colors">
                  <th scope="row" className="py-3.5 px-6 align-middle">
                    <span className="block text-sm font-bold text-white leading-snug">
                      {row.label}
                    </span>
                    <span className="block text-[11px] text-slate-300 font-normal mt-0.5">
                      {row.sublabel}
                    </span>
                  </th>
                  {COLUMNS.map((col) => {
                    const cell = row.values[col.key];
                    return (
                      <td
                        key={`${row.label}-${col.key}`}
                        className={`py-3.5 px-4 align-middle border-l border-white/[0.06] ${
                          col.key === 'vivity' ? 'bg-primary/[0.04]' : ''
                        }`}
                      >
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-semibold leading-snug ${getToneClasses(cell.tone)}`}
                        >
                          {cell.text}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/[0.08] bg-white/[0.02]">
                <td className="py-4 px-6 text-[11px] text-slate-300 leading-snug">
                  *Subject to standard Medicare deductible &amp; copay.
                </td>
                {COLUMNS.map((col) => (
                  <td
                    key={`cta-${col.key}`}
                    className={`py-4 px-4 border-l border-white/[0.06] ${
                      col.key === 'vivity' ? 'bg-primary/[0.04]' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectLens(col.key, `Matrix CTA: ${col.name}`)}
                      className={`w-full h-[44px] px-3 rounded-xl text-xs font-bold text-center whitespace-nowrap transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                        col.key === 'monofocal'
                          ? 'bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-slate-200'
                          : 'bg-primary/15 hover:bg-primary hover:text-[#000000] border border-primary/45 text-[#F5E4C3]'
                      }`}
                    >
                      <span>{col.ctaLabel}</span>
                      <Icon name="ArrowRightIcon" size={13} className="shrink-0" />
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile & Tablet Zero-Overflow Interactive Lens Switcher Matrix */}
        <div className="lg:hidden p-4 sm:p-5">
          <div
            role="tablist"
            aria-label="Select lens to view specifications"
            className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-[#06080e]/95 border border-white/10 mb-4"
          >
            {COLUMNS.map((col) => {
              const selected = mobileLens === col.key;
              return (
                <button
                  key={col.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setMobileLens(col.key)}
                  className={`min-h-[44px] px-2.5 py-2 rounded-xl text-xs font-bold text-center leading-tight whitespace-normal transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    selected
                      ? 'bg-primary text-[#050608] shadow-[0_4px_16px_rgba(197,160,89,0.35)]'
                      : 'text-slate-200 hover:bg-white/[0.05]'
                  }`}
                >
                  {col.shortName}
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/[0.08]">
              <div>
                <h4 className="font-display text-lg font-semibold text-white">
                  {activeMobileCol.name}
                </h4>
                <p className="text-xs text-slate-300">{activeMobileCol.category}</p>
              </div>
              {activeMobileCol.badge && (
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${activeMobileCol.headerBg} ${activeMobileCol.accentClass}`}
                >
                  {activeMobileCol.badge}
                </span>
              )}
            </div>

            <div className="space-y-2.5">
              {ROWS.map((row) => {
                const cell = row.values[activeMobileCol.key];
                return (
                  <div
                    key={`m-${row.label}`}
                    className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 py-2 border-b border-white/[0.05] last:border-b-0"
                  >
                    <span className="text-xs font-bold text-white">{row.label}</span>
                    <span
                      className={`inline-flex w-fit items-center px-2.5 py-1 rounded-lg border text-xs font-semibold leading-snug ${getToneClasses(cell.tone)}`}
                    >
                      {cell.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                onSelectLens(activeMobileCol.key, `Mobile Matrix CTA: ${activeMobileCol.name}`)
              }
              className="mt-4 w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-primary text-[#050608] text-sm font-extrabold text-center leading-snug whitespace-normal flex items-center justify-center gap-2 hover:bg-accent active:scale-[0.99] transition-all touch-manipulation shadow-[0_6px_22px_rgba(197,160,89,0.3)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <span>{activeMobileCol.ctaLabel}</span>
              <Icon name="ArrowRightIcon" size={15} className="shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
