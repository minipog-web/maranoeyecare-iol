'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';
import HeroLensQuiz from '@/app/components/HeroLensQuiz';
import HeroConsultationForm from '@/app/components/HeroConsultationForm';
import type { LensResult } from '@/lib/lens-quiz-data';
import { trackEvent } from '@/lib/gtag';

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
  };

  return (
    <div id="hero-quiz" className="relative scroll-mt-20">
      {/* Ambient Champagne-Gold Optical Aura Behind Card */}
      <div
        className="absolute -inset-2 rounded-[2rem] opacity-40 blur-2xl pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(212,175,105,0.34) 0%, rgba(197,160,89,0.08) 55%, transparent 80%)',
        }}
      />

      <div
        id="booking"
        className="relative rounded-[28px] p-4 sm:p-6 scroll-mt-20 sm:scroll-mt-24 bg-gradient-to-b from-[#131724]/98 via-[#0c0f18]/98 to-[#080a10] md:backdrop-blur-2xl border border-primary/45 ring-1 ring-white/[0.07] shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(197,160,89,0.16)]"
      >
        <span id="lens-quiz" className="sr-only" aria-hidden="true" />

        {/* Luminous Specular Crown */}
        <div
          className="absolute top-0 inset-x-10 h-[1.5px] bg-gradient-to-r from-transparent via-[#F6E2B3] to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Dual-Tab Segmented Switcher */}
        <div
          role="tablist"
          aria-label="Choose between 60-second lens quiz or direct consultation request"
          className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-[#06080e]/95 border border-white/[0.09] shadow-inner mb-5"
        >
          <button
            type="button"
            role="tab"
            id="tab-hero-quiz"
            aria-selected={activeTab === 'quiz'}
            aria-controls="panel-hero-quiz"
            onClick={() => switchTab('quiz', 'tab_click')}
            className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2.5 rounded-xl text-xs sm:text-[13px] font-extrabold text-center leading-tight whitespace-normal transition-all duration-200 min-h-[46px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-[#E5C585] via-primary to-[#C9A052] text-[#050608] shadow-[0_6px_20px_rgba(197,160,89,0.38),inset_0_1px_0_rgba(255,255,255,0.45)]'
                : 'text-slate-200 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Icon
              name="SparklesIcon"
              size={15}
              className={`shrink-0 ${activeTab === 'quiz' ? 'text-black' : 'text-primary'}`}
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
            className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2.5 rounded-xl text-xs sm:text-[13px] font-extrabold text-center leading-tight whitespace-normal transition-all duration-200 min-h-[46px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
              activeTab === 'booking'
                ? 'bg-gradient-to-r from-[#E5C585] via-primary to-[#C9A052] text-[#050608] shadow-[0_6px_20px_rgba(197,160,89,0.38),inset_0_1px_0_rgba(255,255,255,0.45)]'
                : 'text-slate-200 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Icon
              name="CalendarDaysIcon"
              size={15}
              className={`shrink-0 ${activeTab === 'booking' ? 'text-black' : 'text-primary'}`}
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
  );
}
