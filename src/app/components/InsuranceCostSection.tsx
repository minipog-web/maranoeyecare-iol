'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';

interface CostPillar {
  badge: string;
  badgeType: 'covered' | 'featured' | 'financing';
  title: string;
  subtitle: string;
  priceHeadline: string;
  priceSub: string;
  highlights: string[];
  footerNote: string;
}

const costPillars: CostPillar[] = [
  {
    badge: '100% Medically Covered',
    badgeType: 'covered',
    title: 'Core Cataract Surgery',
    subtitle: 'Standard Medicare Part B & Commercial Insurance',
    priceHeadline: '$0 Procedure Out-of-Pocket*',
    priceSub: 'Subject only to your routine medical deductible & copay',
    highlights: [
      'Board-certified ophthalmic microsurgeon procedure fee (CPT 66984)',
      'Licensed Ambulatory Surgical Center (ASC) care at Ridgedale Surgery Center',
      'Board-certified anesthesiologist & gentle sedation monitoring',
      'Standard baseline monofocal lens (single-distance focus)',
      'Full 90-day post-operative surgical examinations & care',
    ],
    footerNote:
      '*Medicare & commercial insurers cover the entire medical procedure, operating room, and basic lens.',
  },
  {
    badge: 'Most Popular Upgrade',
    badgeType: 'featured',
    title: 'Advanced Lifestyle IOLs',
    subtitle: 'Clareon Vivity · PanOptix Pro · TECNIS PureSee',
    priceHeadline: 'The Optical Difference',
    priceSub: 'Insurance covers the surgery — you only invest in the lens upgrade',
    highlights: [
      'Seamless multi-distance visual freedom (distance, intermediate & near)',
      'Toric astigmatism correction included at no additional charge',
      'LENSAR ALLY 3D femtosecond laser biometry & arcuate incisions',
      'Medical-grade acrylic polymer that never clouds, ages, or requires replacement',
      'Designed to permanently reduce or eliminate daily reading glasses',
    ],
    footerNote:
      'One-time lifetime investment. Your natural lens is replaced only once in your entire life.',
  },
  {
    badge: 'Flexible & Tax-Advantaged',
    badgeType: 'financing',
    title: '0% APR & Pre-Tax Savings',
    subtitle: 'CareCredit · Alphaeon · HSA · FSA',
    priceHeadline: 'From ~$89 / Month',
    priceSub: '12 to 24-month 0% interest financing plans available',
    highlights: [
      '12 to 24-month 0% APR deferred interest financing via CareCredit & Alphaeon',
      'HSA & FSA 100% eligible — save an immediate 20%–35% using pre-tax dollars',
      'Zero pre-payment penalties or hidden maintenance fees',
      'Soft credit check pre-qualification in 2 minutes with zero impact to credit score',
      'Dedicated in-house surgical coordinators handle all paperwork for you',
    ],
    footerNote:
      'Many patients combine employer FSA/HSA accounts with 0% financing for maximum affordability.',
  },
];

export default function InsuranceCostSection() {
  return (
    <section
      id="insurance-investment"
      className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-background via-surface-dark/40 to-background border-t border-border"
      aria-label="Insurance and Pricing Transparency"
    >
      <div id="financing" className="relative -top-28" />
      {/* Background subtle atmospheric illumination */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 mb-4 shadow-[0_0_15px_rgba(197,160,89,0.15)]">
            <Icon name="ShieldCheckIcon" size={15} className="text-primary shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Transparent Surgical Investment • No Hidden Fees
            </span>
          </div>

          <h2 className="font-display text-3xl xs:text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-[1.15] mb-4">
            Clear Answers on <span className="text-gradient-primary font-semibold">Insurance</span>,{' '}
            <span className="text-gradient-primary font-semibold">Medicare</span> &amp; Your
            Investment.
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Cataract surgery is a medically necessary procedure covered by Medicare and virtually
            all major commercial health plans. Understanding how your coverage works with advanced
            lifestyle lenses gives you complete confidence before your consultation.
          </p>
        </div>

        {/* 3-Pillar Coverage Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-16 items-stretch">
          {costPillars.map((pillar, idx) => {
            const isFeatured = pillar.badgeType === 'featured';
            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'luxury-rim-gold border-2 border-primary bg-primary/[0.03] shadow-[0_0_40px_rgba(197,160,89,0.18)] lg:-translate-y-2'
                    : 'luxury-rim-card border border-white/[0.08] bg-white/[0.02] hover:border-primary/40'
                }`}
              >
                {/* Featured glowing beacon */}
                {isFeatured && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#d4af37] via-primary to-[#f3e5ab] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(197,160,89,0.5)] border border-primary-light"
                    aria-hidden="true"
                  >
                    Recommended For Active Lifestyles
                  </div>
                )}

                <div>
                  {/* Badge & Title */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        isFeatured
                          ? 'bg-primary/20 text-primary border border-primary/40'
                          : pillar.badgeType === 'covered'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {pillar.badge}
                    </span>
                    <Icon
                      name={
                        pillar.badgeType === 'covered'
                          ? 'CheckBadgeIcon'
                          : isFeatured
                            ? 'SparklesIcon'
                            : 'BanknotesIcon'
                      }
                      size={20}
                      className={isFeatured ? 'text-primary' : 'text-muted-foreground'}
                    />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-5 min-h-[36px]">
                    {pillar.subtitle}
                  </p>

                  {/* Price Banner */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] mb-6">
                    <div className="text-xl sm:text-2xl font-bold text-primary font-display">
                      {pillar.priceHeadline}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{pillar.priceSub}</p>
                  </div>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-3 text-xs sm:text-sm mb-6">
                    {pillar.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <Icon
                          name="CheckIcon"
                          size={16}
                          className={`mt-0.5 shrink-0 ${
                            isFeatured ? 'text-primary font-bold' : 'text-emerald-400'
                          }`}
                        />
                        <span className="text-foreground/90 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Note */}
                <div
                  className={`p-3.5 rounded-xl border text-center text-xs ${
                    isFeatured
                      ? 'bg-primary/10 border-primary/25 text-primary font-medium'
                      : 'bg-white/[0.02] border-white/[0.06] text-muted-foreground'
                  }`}
                >
                  {pillar.footerNote}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lifetime Value Ledger: One-Time IOL vs 20 Years of Glasses */}
        <div className="luxury-rim-card border border-primary/25 rounded-3xl p-6 sm:p-10 mb-14 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
              The Economics of Visual Freedom
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-2 md:whitespace-nowrap">
              One-Time Lens Upgrade vs. 20 Years of Glasses
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Many patients mistakenly view an advanced IOL as an expense. In reality, it
              permanently halts decades of recurring optical costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Standard Route Cost Accumulation */}
            <div className="rounded-2xl p-5 sm:p-7 bg-white/[0.02] border border-red-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    The Recurring Glasses Route
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">Next 15–20 Years</span>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-4">
                  Standard Monofocal Lens + Lifetime Specs
                </h4>

                <div className="space-y-3 text-xs sm:text-sm mb-6">
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-muted-foreground">
                      8–10 Pairs of Progressive Lenses &amp; Frames
                    </span>
                    <span className="font-mono text-foreground font-semibold">
                      ~$4,800 – $6,500
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-muted-foreground">
                      Prescription Reading Glasses &amp; Lost Replacements
                    </span>
                    <span className="font-mono text-foreground font-semibold">
                      ~$1,200 – $1,800
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-muted-foreground">
                      Prescription Sunglasses &amp; Polarized Coatings
                    </span>
                    <span className="font-mono text-foreground font-semibold">
                      ~$1,500 – $2,200
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-muted-foreground">
                      Biannual Refraction Exams &amp; Lens Changes
                    </span>
                    <span className="font-mono text-foreground font-semibold">
                      ~$1,000 – $1,500
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-red-400 font-bold">
                    Estimated 20-Year Cost
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Recurring cycle of frames &amp; lenses
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-red-300 text-right shrink-0">
                  $8,500 – $12,000+
                </div>
              </div>
            </div>

            {/* Advanced IOL Route */}
            <div className="rounded-2xl p-5 sm:p-7 bg-primary/[0.04] border-2 border-primary/40 flex flex-col justify-between shadow-[0_0_25px_rgba(197,160,89,0.12)]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                    The Permanent Solution
                  </span>
                  <span className="text-xs font-mono text-primary/80">
                    Permanent Lifetime Optic
                  </span>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-4">
                  Advanced Lifestyle IOL Upgrade
                </h4>

                <div className="space-y-3.5 text-xs sm:text-sm mb-6">
                  <div className="flex items-start gap-2.5">
                    <Icon
                      name="CheckCircleIcon"
                      size={16}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span className="text-foreground/90">
                      <strong>One single procedure:</strong> High-purity acrylic optic never
                      degrades, clouds, or shifts prescription for life.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Icon
                      name="CheckCircleIcon"
                      size={16}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span className="text-foreground/90">
                      <strong>All-distance clarity:</strong> Drive, navigate dashboards, use
                      computers, and read menus without hunting for glasses.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Icon
                      name="CheckCircleIcon"
                      size={16}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span className="text-foreground/90">
                      <strong>Toric astigmatism correction:</strong> Integrated into the lens design
                      with zero add-on charges.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Icon
                      name="CheckCircleIcon"
                      size={16}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span className="text-foreground/90">
                      <strong>0% APR financing:</strong> Spread your investment over 12–24 months
                      from ~$89/mo with zero interest.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-primary font-bold">
                    Future Glasses Expense
                  </div>
                  <div className="text-xs text-primary/80 mt-0.5">
                    Permanent daily visual freedom
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-primary text-right shrink-0">
                  $0 Recurring
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Written Guarantee & Insurance Verification Card */}
        <div className="rounded-3xl bg-[#0c0e15]/90 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center shrink-0 text-primary mt-1">
              <Icon name="DocumentCheckIcon" size={24} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  The Marano Eye Care Guarantee
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.04] text-white/80 border border-white/[0.08] font-medium">
                  Zero Surprise Billing
                </span>
              </div>
              <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground font-display mb-2 lg:whitespace-nowrap">
                Written Benefit Breakdown Before Every Procedure
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Prior to scheduling surgery, our dedicated patient coordinators contact your
                insurance provider to verify covered benefits. You receive a transparent, printed
                breakdown of all covered costs and elective upgrade options. No surprise medical
                bills.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            <a
              href="#booking"
              onClick={() => {
                trackEvent({
                  action: 'insurance_section_cta_click',
                  category: 'Conversion',
                  label: 'Verify Benefits Consultation',
                });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-black font-extrabold text-sm hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] transition-all shrink-0 active:scale-95 touch-manipulation min-h-[48px]"
            >
              <span>Verify My Insurance Benefits</span>
              <Icon name="ArrowRightIcon" size={16} className="text-black shrink-0" />
            </a>
            <p className="text-center text-xs text-muted-foreground">
              Or call Livingston:{' '}
              <a
                href="tel:9733220100"
                className="text-primary hover:underline font-semibold font-mono"
              >
                (973) 322-0100
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
