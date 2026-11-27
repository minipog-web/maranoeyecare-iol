'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';
import HeroLensQuiz from '@/app/components/HeroLensQuiz';
import HeroConsultationForm from '@/app/components/HeroConsultationForm';
import type { LensResult } from '@/lib/lens-quiz-data';
import { trackEvent } from '@/lib/gtag';
import { smoothScrollToElement } from '@/lib/ui';

type HeroTab = 'quiz' | 'booking';

export default function HeroInteractiveCard() {
  const [activeTab, setActiveTab] = useState<HeroTab>('quiz');
  const [matchedLensKey, setMatchedLensKey] = useState<string | null>(null);
  const [matchedAnswers, setMatchedAnswers] = useState<string[]>([]);
  const [quizSummaryNote, setQuizSummaryNote] = useState<string>('');

  const switchTab = useCallback((tab: HeroTab, source: string) => {
    setActiveTab(tab);
    trackEvent({
      action: 'hero_card_tab_switch',
      category: 'Engagement',
      label: `${tab} (${source})`,
    });
  }, []);

  useEffect(() => {
    if (window.location.hash === '#booking') {
      setActiveTab('booking');
    }

    const handleHashChange = () => {
      if (window.location.hash === '#booking') {
        setActiveTab('booking');
      } else if (window.location.hash === '#hero-quiz' || window.location.hash === '#lens-quiz') {
        setActiveTab('quiz');
      }
    };

    const handleSelectLens = (e: Event) => {
      const lensKey = (e as CustomEvent).detail as string;
      if (lensKey) {
        setMatchedLensKey(lensKey);
        setActiveTab('booking');
      }
    };

    const handleOpenTab = (e: Event) => {
      const tab = (e as CustomEvent).detail as HeroTab;
      if (tab === 'quiz' || tab === 'booking') {
        setActiveTab(tab);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('select-lens', handleSelectLens);
    window.addEventListener('hero-switch-tab', handleOpenTab);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('select-lens', handleSelectLens);
      window.removeEventListener('hero-switch-tab', handleOpenTab);
    };
  }, []);

  const handleLockInLens = (lens: LensResult, answers: string[]) => {
    setMatchedLensKey(lens.key);
    setMatchedAnswers(answers);
    setQuizSummaryNote(`Hero Quiz Match: ${lens.name} (${answers.join(' → ')})`);
    setActiveTab('booking');
    requestAnimationFrame(() => {
      const bookingCard = document.getElementById('booking');
      const header =
        document.querySelector<HTMLElement>('[data-header-bar]') ||
        document.querySelector<HTMLElement>('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 80;
      if (bookingCard && bookingCard.getBoundingClientRect().top < headerHeight + 8) {
        smoothScrollToElement('booking');
      }
    });
  };

  return (
    <div id="hero-quiz" className="relative scroll-mt-20">
      {/* Restrained Perimeter Studio Backlight for Clean Figure-Ground Separation */}
      <div
        className="absolute -inset-3 rounded-[2.25rem] opacity-60 blur-2xl pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(197,160,89,0.16) 0%, rgba(148,163,184,0.06) 55%, transparent 78%)',
        }}
      />

      {/* Precision Double-Bezel (Doppelrand) Architectural Frame */}
      <div className="relative rounded-[30px] p-[5px] bg-gradient-to-b from-white/[0.11] via-primary/[0.14] to-white/[0.04] border border-white/[0.12] shadow-[0_28px_70px_-12px_rgba(0,0,0,0.85),0_0_0_1px_rgba(0,0,0,0.5)]">
        <div
          id="booking"
          className="relative rounded-[25px] p-4 sm:p-6 scroll-mt-20 sm:scroll-mt-24 bg-gradient-to-b from-[#171d2c] via-[#121724] to-[#0e121d] border border-primary/30 shadow-[inset_0_1px_0_rgba(255,244,218,0.18)]"
        >
          <span id="lens-quiz" className="sr-only top-0 left-0" aria-hidden="true" />

          {/* Subtle Specular Top Catchlight */}
          <div
            className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#F5E4C3]/75 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Dual-Tab Precision Instrument Switcher */}
          <div
            role="tablist"
            aria-label="Choose between 60-second lens quiz or direct consultation request"
            className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[#090c14] border border-white/[0.08] shadow-inner mb-5"
          >
            <button
              type="button"
              role="tab"
              id="tab-hero-quiz"
              aria-selected={activeTab === 'quiz'}
              aria-controls="panel-hero-quiz"
              onClick={() => switchTab('quiz', 'tab_click')}
              className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold text-center leading-tight whitespace-normal transition-all duration-200 min-h-[44px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-b from-[#232b40] to-[#181e2e] text-white border border-primary/50 shadow-[0_4px_14px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,240,205,0.2)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <Icon
                name="SparklesIcon"
                size={15}
                className={`shrink-0 ${activeTab === 'quiz' ? 'text-primary' : 'text-slate-400'}`}
              />
              <span>Find My Lens (60s)</span>
            </button>

            <button
              type="button"
              role="tab"
              id="tab-hero-booking"
              aria-selected={activeTab === 'booking'}
              aria-controls="panel-hero-booking"
              onClick={() => switchTab('booking', 'tab_click')}
              className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold text-center leading-tight whitespace-normal transition-all duration-200 min-h-[44px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                activeTab === 'booking'
                  ? 'bg-gradient-to-b from-[#232b40] to-[#181e2e] text-white border border-primary/50 shadow-[0_4px_14px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,240,205,0.2)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <Icon
                name="CalendarDaysIcon"
                size={15}
                className={`shrink-0 ${activeTab === 'booking' ? 'text-primary' : 'text-slate-400'}`}
              />
              <span>Book Evaluation</span>
              {matchedLensKey && activeTab !== 'booking' && (
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] shrink-0"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>

          {/* Tab Panels */}
          <div
            id="panel-hero-quiz"
            role="tabpanel"
            aria-labelledby="tab-hero-quiz"
            className={activeTab === 'quiz' ? 'block' : 'hidden'}
          >
            <HeroLensQuiz onLockInLens={handleLockInLens} />
          </div>

          <div
            id="panel-hero-booking"
            role="tabpanel"
            aria-labelledby="tab-hero-booking"
            className={activeTab === 'booking' ? 'block' : 'hidden'}
          >
            <HeroConsultationForm
              embedded
              externalLensKey={matchedLensKey}
              externalQuizNote={quizSummaryNote}
              matchedAnswers={matchedAnswers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
