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
              for the premium upgrade ($4,100 per eye). We handle all billing details.
            </p>
            <div className="mt-6 pt-4 border-t border-border/60">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Hassle-Free Billing
              </span>
            </div>
          </div>
        </div>

        {/* Financial Value Callout */}
        <div className="mt-10 sm:mt-12 max-w-3xl mx-auto glass-card border border-primary/25 bg-primary/[0.02] rounded-2xl p-6 text-center">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.15em] mb-2">
            Lifetime Cost Comparison
          </p>
          <p className="text-sm sm:text-base text-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Compared to the ongoing lifetime cost of purchasing progressive designer glasses,
            contacts, and prescription sunglasses every few years, a one-time premium lens
            investment actually <strong className="text-gradient-primary">saves you money</strong>{' '}
            in the long run while providing permanent visual freedom.
          </p>
        </div>
      </div>
    </section>
  );
}
