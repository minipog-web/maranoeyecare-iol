'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import {
  HERO_LENS_RESULTS,
  HERO_QUIZ_QUESTIONS,
  type LensResult,
  type QuizOption,
} from '@/lib/lens-quiz-data';
import { trackEvent, trackQuizStart, trackQuizComplete } from '@/lib/gtag';

interface HeroLensQuizProps {
  onLockInLens: (lens: LensResult, answers: string[]) => void;
}

export default function HeroLensQuiz({ onLockInLens }: HeroLensQuizProps) {
  const [currentId, setCurrentId] = useState<string>('q1');
  const [history, setHistory] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<LensResult | null>(null);
  const [calculating, setCalculating] = useState(false);

  const currentQuestion = HERO_QUIZ_QUESTIONS[currentId];
  const stepNumber = Math.min(history.length + 1, 3);
  const progressPercent = result
    ? 100
    : calculating
      ? 92
      : Math.min(Math.round(((history.length + 0.5) / 3) * 100), 85);

  const handleSelect = (option: QuizOption) => {
    if (calculating) return;

    if (history.length === 0) {
      trackQuizStart();
      trackEvent({
        action: 'hero_quiz_start',
        category: 'Engagement',
        label: option.shortLabel,
      });
    }

    const nextAnswers = [...answers, option.shortLabel];
    setAnswers(nextAnswers);

    if (option.next.startsWith('result:')) {
      const lensKey = option.next.replace('result:', '') as LensResult['key'];
      const matched = HERO_LENS_RESULTS[lensKey];
      setCalculating(true);

      setTimeout(() => {
        setCalculating(false);
        setResult(matched);
        trackQuizComplete(matched.name, matched.key);
        try {
          sessionStorage.setItem('preselect-lens', matched.key);
        } catch {
          // ignore storage errors
        }
      }, 320);
    } else {
      setHistory((prev) => [...prev, currentId]);
      setCurrentId(option.next);
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prevId = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setAnswers((prev) => prev.slice(0, -1));
    setCurrentId(prevId);
  };

  const handleRestart = () => {
    setCurrentId('q1');
    setHistory([]);
    setAnswers([]);
    setResult(null);
    setCalculating(false);
  };

  if (calculating) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full border-2 border-primary/25 border-t-primary animate-spin mb-4 shadow-[0_0_24px_rgba(197,160,89,0.35)]" />
        <p className="font-display text-lg font-semibold text-white">
          Matching Your Optical Profile...
        </p>
        <p className="text-xs text-slate-300 mt-1">
          Comparing Vivity, PanOptix Pro &amp; TECNIS PureSee
        </p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-4">
        {/* Match Header */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/35 px-3 py-1 rounded-full">
            <Icon name="CheckBadgeIcon" size={14} className="text-emerald-400 shrink-0" />
            <span>Your Personalized Match</span>
          </span>
          <button
            type="button"
            onClick={handleRestart}
            className="text-xs font-semibold text-slate-200 hover:text-primary transition-colors min-h-[44px] px-3 rounded-lg touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            Retake Quiz
          </button>
        </div>

        {/* Matched Lens Visual Card */}
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-primary/40 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-primary/45 shrink-0 bg-slate-950 shadow-[0_6px_20px_rgba(0,0,0,0.5)]">
              <AppImage
                src={result.src}
                alt={result.alt}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.14em] text-[#F5E4C3] mb-0.5">
                {result.badge}
              </span>
              <h3 className="font-display text-xl font-semibold text-white leading-tight">
                {result.name}
              </h3>
              <p className="text-xs text-slate-300 leading-snug mt-0.5">{result.tagline}</p>
            </div>
          </div>

          <ul className="space-y-1.5 pt-3 border-t border-white/10">
            {result.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-slate-200 leading-snug">
                <Icon name="CheckCircleIcon" size={14} className="text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Co-Created Lifestyle Priorities Summary (Commitment & Consistency) */}
          {answers.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-white/[0.08]">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-300 mb-1.5">
                Matched to Your Stated Goals:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {answers.map((ans) => (
                  <span
                    key={ans}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-medium text-[#F5E4C3]"
                  >
                    <Icon name="CheckIcon" size={11} className="text-primary shrink-0" />
                    <span>{ans}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Asymmetric Value & Medicare Inclusion Strip */}
          {result.key !== 'monofocal' && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
                $0 Toric Astigmatism Included
              </span>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-slate-200 bg-white/[0.04] border border-white/10 px-2.5 py-0.5 rounded-full">
                Medicare Covers Core Surgery
              </span>
            </div>
          )}
        </div>

        {/* Conversion CTA */}
        <button
          type="button"
          onClick={() => {
            trackEvent({
              action: 'quiz_schedule_now_click',
              category: 'Conversion',
              label: `Hero Quiz Match: ${result.name}`,
            });
            onLockInLens(result, answers);
          }}
          className="w-full flex items-center justify-center gap-2 px-4 sm:px-5 py-3.5 bg-gradient-to-r from-[#E5C585] via-primary to-[#C9A052] text-[#050608] rounded-xl text-sm sm:text-base font-extrabold text-center leading-snug whitespace-normal hover:brightness-105 transition-all hover:scale-[1.01] active:scale-[0.99] min-h-[52px] touch-manipulation shadow-[0_10px_30px_rgba(197,160,89,0.4),inset_0_1px_0_rgba(255,255,255,0.45)] group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          <span>Lock In My {result.name} Evaluation</span>
          <Icon
            name="ArrowRightIcon"
            size={17}
            className="shrink-0 transition-transform group-hover:translate-x-1"
          />
        </button>

        <div className="flex items-center justify-between text-xs pt-0.5">
          <span className="text-slate-300/90">
            1-on-1 surgeon review · Zero obligation to upgrade
          </span>
          <Link
            href={result.href}
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1 min-h-[44px] px-2 rounded-lg touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <span>Lens Details</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header + Step Progress */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Previous question"
              className="min-w-[44px] min-h-[44px] rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-slate-200 hover:border-primary/60 hover:text-primary active:scale-95 transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Icon name="ArrowLeftIcon" size={14} />
            </button>
          )}
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#F5E4C3]">
            Step {stepNumber} of 3 · Lens Assessment
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-[#F5E4C3]/95 bg-primary/[0.10] border border-primary/25 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Instant Match
        </span>
      </div>

      {/* Refined Champagne Progress Bar */}
      <div className="w-full h-1.5 rounded-full bg-[#090c14] border border-white/[0.06] overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-[#C9A052] via-[#E5C585] to-[#F6E2B3] rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Prompt */}
      <h2 className="font-display text-lg sm:text-[1.28rem] font-semibold text-white leading-snug mb-1">
        {currentQuestion.shortText}
      </h2>
      {currentQuestion.subtext && (
        <p className="text-xs text-slate-300/95 mb-4 leading-relaxed">{currentQuestion.subtext}</p>
      )}

      {/* Bespoke Clinical Option Cards */}
      <div className="space-y-2.5">
        {currentQuestion.options.map((option) => (
          <button
            key={option.shortLabel}
            type="button"
            onClick={() => handleSelect(option)}
            className="relative w-full text-left px-3.5 py-3 rounded-2xl bg-gradient-to-b from-[#1d2436] to-[#171d2c] hover:from-[#232b40] hover:to-[#1b2234] border border-white/[0.13] hover:border-primary/65 transition-all duration-200 group flex items-center gap-3.5 min-h-[58px] touch-manipulation hover:-translate-y-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_6px_16px_rgba(0,0,0,0.32)] hover:shadow-[inset_0_1px_0_rgba(255,240,205,0.16),0_10px_24px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none overflow-hidden"
          >
            {/* Left gold accent bar on hover */}
            <span
              className="absolute left-0 inset-y-2.5 w-[3px] rounded-r-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
            <span
              className="w-10 h-10 rounded-xl bg-[#101420] border border-primary/30 group-hover:border-primary/65 flex items-center justify-center shrink-0 transition-colors shadow-[inset_0_1px_0_rgba(255,240,200,0.12)]"
              aria-hidden="true"
            >
              <Icon
                name={option.icon}
                size={18}
                className="text-[#F5E4C3] group-hover:text-primary transition-colors"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] sm:text-sm font-bold text-white group-hover:text-[#F6E6C4] leading-snug">
                {option.shortLabel}
              </span>
              {option.sublabel && (
                <span className="block text-[11px] text-slate-300 leading-snug mt-0.5">
                  {option.sublabel}
                </span>
              )}
            </span>
            <span
              className="w-7 h-7 rounded-full bg-white/[0.04] group-hover:bg-primary/15 border border-white/[0.08] group-hover:border-primary/45 flex items-center justify-center shrink-0 transition-all"
              aria-hidden="true"
            >
              <Icon
                name="ChevronRightIcon"
                size={14}
                className="text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all"
              />
            </span>
          </button>
        ))}
      </div>

      {/* Micro-Reassurance Footer */}
      <p className="text-center text-[11px] text-slate-300/90 font-medium leading-snug pt-4">
        No email required to see your match · Personalized in under 60 seconds
      </p>
    </div>
  );
}
