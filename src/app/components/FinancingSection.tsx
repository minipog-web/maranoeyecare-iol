'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function FinancingSection() {
  return (
    <section id="financing" className="py-12 sm:py-20 relative overflow-hidden bg-card">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
            Pricing & Accessibility
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
            Visual Freedom is an{' '}
            <span className="font-semibold text-gradient-primary">Investment in Yourself.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Standard cataract surgery is fully covered by Medicare and commercial insurance. Opting
            for a premium lens is an investment in permanent, glasses-free vision. We make it
            affordable.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Card 1: HSA/FSA */}
          <div className="glass-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col hover:border-primary/20 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
              <Icon name="BriefcaseIcon" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">HSA & FSA Eligible</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              Premium upgrades are considered eligible medical expenses. You can use your pre-tax
              Flexible Spending Account (FSA) or Health Savings Account (HSA) dollars, saving up to{' '}
              <strong className="text-foreground">30% to 40%</strong> depending on your tax bracket.
            </p>
            <div className="mt-6 pt-4 border-t border-border/60">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Tax-Free Savings
              </span>
            </div>
          </div>

          {/* Card 2: CareCredit */}
          <div className="glass-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col hover:border-primary/20 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
              <Icon name="CreditCardIcon" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">CareCredit® Financing</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              We offer flexible payment plans through CareCredit®, including{' '}
              <strong className="text-foreground">0% APR promotional financing</strong> for 12 or 24
              months. You can break your premium upgrade into low monthly payments that easily fit
              your budget.
            </p>
            <div className="mt-6 pt-4 border-t border-border/60">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Interest-Free Options
              </span>
            </div>
          </div>

          {/* Card 3: Insurance Info */}
          <div className="glass-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col hover:border-primary/20 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
              <Icon name="ShieldCheckIcon" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Insurance Integration</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              Your insurance (or Medicare) will still cover the foundation of your surgery
              (procedure, facility fees, standard lens). You only pay the out-of-pocket difference
              for the premium upgrade. We handle all billing details.
            </p>
            <div className="mt-6 pt-4 border-t border-border/60">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Hassle-Free Billing
              </span>
            </div>
          </div>
        </div>

        {/* Financial Value Callout & Transparent Pricing */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-primary/[0.03] to-transparent border border-primary/15 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block">
              Transparent Investment
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-light text-foreground">
              A One-Time Choice for{' '}
              <span className="font-semibold text-gradient-primary">Decades of Clarity.</span>
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Premium cataract options start at <strong className="text-foreground">$1,600</strong>{' '}
              for a standard monofocal lens paired with LENSAR® laser-assisted (Femtosecond)
              precision. Upgrades for custom astigmatism-correcting (toric) lenses start at{' '}
              <strong className="text-foreground">$1,900</strong>, and premium lenses range up to{' '}
              <strong className="text-foreground">$4,100</strong> per eye for highly advanced
              multi-focal or extended depth of field (EDOF) designs.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              When framed against the lifetime cost of premium glasses, contact lenses, solutions,
              and prescription sunglasses—which typically exceed{' '}
              <strong className="text-foreground">$8,000 to $12,000</strong> over a 15-year period—a
              premium lens is a permanent one-time choice that frees you from a lifetime of having
              to pay for glasses or contacts. Because premium lenses never degrade or develop
              cataracts again, this is a literal lifetime investment in your visual independence.
            </p>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="glass-card border border-primary/20 bg-background/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative z-10">
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground block">
                  Premium Surgical Upgrades
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
                    $1,600
                  </span>
                  <span className="text-sm text-muted-foreground">to $4,100 / eye</span>
                </div>
                <p className="text-xs text-muted-foreground leading-normal">
                  Standard lens with LENSAR® Femto laser starts at $1,600. Astigmatism-correcting
                  lenses start at $1,900, up to $4,100 for multi-focal or extended depth of field
                  (EDOF) designs.
                </p>
              </div>

              <hr className="border-border/60" />

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                  The Lifetime Freedom Package:
                </h4>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">
                      <Icon name="CheckIcon" size={14} />
                    </span>
                    <span>Custom optical wavefront mapping & diagnostic screening</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">
                      <Icon name="CheckIcon" size={14} />
                    </span>
                    <span>Integration with LENSAR® Precision Laser System</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">
                      <Icon name="CheckIcon" size={14} />
                    </span>
                    <span>Permanent, medical-grade materials that never age or decay</span>
                  </li>
                </ul>

                <a
                  href="#booking"
                  className="btn-premium-primary btn-shimmer w-full py-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 mt-4 text-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <span>Request Financing Consultation</span>
                  <Icon name="ArrowRightIcon" size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
