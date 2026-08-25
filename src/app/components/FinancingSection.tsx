'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function FinancingSection() {
  return (
    <section id="financing" className="py-16 sm:py-24 relative overflow-hidden bg-[#090a0e]">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.015)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.015] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-bg opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
            Flexible Financing & Insurance
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-5">
            Clear Vision Made Accessible:{' '}
            <span className="font-semibold text-gradient-primary">Flexible Payment Options.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Standard cataract surgery is covered by Medicare and most commercial insurance plans. We
            offer flexible payment solutions and interest-free options so you can choose the lens
            that fits your active lifestyle with confidence.
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
              Flexible Spending Account (FSA) or Health Savings Account (HSA) dollars, maximizing
              your tax-advantaged healthcare savings.
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
              months. You can break your procedure into manageable monthly payments that comfortably
              fit your budget.
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
              Your insurance or Medicare covers the foundational surgery, facility fees, and
              baseline care. Our dedicated billing coordinators handle all insurance authorizations
              and provide a clear breakdown during your consultation.
            </p>
            <div className="mt-6 pt-4 border-t border-border/60">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Hassle-Free Coordination
              </span>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="mt-12 max-w-4xl mx-auto text-center glass-card border border-white/[0.08] rounded-3xl p-8 sm:p-10">
          <h3 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-3">
            Explore Your Options with Our Care Team
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
            During your private consultation, our patient coordinators will review your insurance
            benefits, HSA/FSA eligibility, and custom financing plans tailored to your needs.
          </p>
          <a
            href="#booking"
            className="btn-premium-primary btn-shimmer inline-flex items-center justify-center gap-2 py-3 px-8 text-sm font-bold uppercase tracking-wider rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <span>Schedule Consultation</span>
            <Icon name="ArrowRightIcon" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
