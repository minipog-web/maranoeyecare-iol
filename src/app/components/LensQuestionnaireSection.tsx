'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { trackEvent, trackQuizStart, trackQuizComplete } from '@/lib/gtag';
import { smoothScrollToElement } from '@/lib/ui';
import styles from './LensQuestionnaireSection.module.css';

interface Question {
  id: string;
  text: string;
  subtext?: string;
  options: Option[];
}

interface Option {
  label: string;
  sublabel?: string;
  icon: string;
  next: string | null; // question id or 'result:LENS_KEY'
}

interface LensResult {
  key: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  color: string;
  glow: string;
  border: string;
  badge: string;
  badgeColor: string;
  src: string;
  alt: string;
  cta: string;
}

const LENSES: Record<string, LensResult> = {
  vivity: {
    key: 'vivity',
    name: 'Clareon Vivity',
    tagline: 'Extended Depth of Focus: Lowest rate of halos among premium IOLs',
    description:
      'The Clareon Vivity uses non-diffractive X-WAVE™ technology to stretch and shift light, delivering smooth continuous vision from distance through intermediate, with the lowest rate of halos and glare among premium lenses. It is ideal for active patients who drive often and value natural, comfortable vision.',
    highlights: [
      'Excellent distance & intermediate vision',
      'Fewest halos & glare of any premium IOL',
      'Non-diffractive technology with no light splitting',
      'Great for night driving',
      'FDA-approved extended depth of focus',
    ],
    color: 'text-[var(--lens-color)]',
    glow: 'shadow-[0_0_40px_rgba(var(--lens-color-rgb),0.25)]',
    border: 'border-[var(--lens-color)]/50',
    badge: 'Most Popular',
    badgeColor: 'bg-[var(--lens-color)] text-background',
    src: '/assets/images/vivity_iol_real.jpg',
    alt: 'Clareon Vivity IOL, extended depth of focus intraocular lens',
    cta: 'Book a Vivity Consultation',
  },
  panoptix: {
    key: 'panoptix',
    name: 'PanOptix Pro',
    tagline: 'Trifocal: Full visual range across near, intermediate, and distance',
    description:
      'The PanOptix Pro trifocal IOL delivers clear vision at near, intermediate, and distance focal points. It is the leading option for patients who want to eliminate reading glasses and enjoy genuine visual freedom throughout the day.',
    highlights: [
      'Near, intermediate & distance vision',
      '99% would choose a premium lens again',
      'Only FDA-approved trifocal in the US',
      'Ideal for reading without glasses',
      'Best for glasses-free lifestyle',
    ],
    color: 'text-[var(--lens-color)]',
    glow: 'shadow-[0_0_40px_rgba(var(--lens-color-rgb),0.25)]',
    border: 'border-[var(--lens-color)]/50',
    badge: 'Trifocal',
    badgeColor: 'bg-[var(--lens-color)] text-white',
    src: '/assets/images/panoptix_iol_real.jpg',
    alt: 'PanOptix Pro trifocal IOL, advanced multifocal intraocular lens',
    cta: 'Book a PanOptix Consultation',
  },
  puresee: {
    key: 'puresee',
    name: 'TECNIS PureSee',
    tagline:
      'Latest & Most Cutting-Edge Refractive EDOF: Continuous focus with zero contrast warning',
    description:
      'The TECNIS PureSee is the latest, most cutting-edge purely refractive Extended Depth of Focus (EDOF) IOL from Johnson & Johnson MedTech. Its advanced refractive zonal optics deliver continuous clarity from distance through intermediate to functional near vision, with zero diffractive rings, zero contrast sensitivity warnings, and a night glare profile identical to a standard monofocal lens.',
    highlights: [
      'Pristine distance & intermediate clarity',
      'Functional near vision down to 40 cm',
      'Purely refractive optics with zero diffractive rings',
      'First FDA-approved EDOF with zero contrast warning',
      'Monofocal-like night vision & dysphotopsia profile',
    ],
    color: 'text-[var(--lens-color)]',
    glow: 'shadow-[0_0_40px_rgba(var(--lens-color-rgb),0.2)]',
    border: 'border-[var(--lens-color)]/40',
    badge: 'Latest EDOF',
    badgeColor: 'bg-[var(--lens-color)] text-white',
    src: '/assets/images/puresee_iol_real.jpg',
    alt: 'TECNIS PureSee IOL, the latest and most cutting-edge purely refractive extended depth of focus intraocular lens',
    cta: 'Book a PureSee Consultation',
  },
  monofocal: {
    key: 'monofocal',
    name: 'Standard Monofocal',
    tagline: 'Insurance-Covered: Dependable single-focus clarity',
    description:
      'The standard monofocal IOL is the most widely used cataract lens and is fully covered by Medicare and most insurance plans. It delivers clear vision at one focal distance (typically distance), with reading glasses used for near tasks. A trusted, proven choice for patients who prefer the standard insurance option.',
    highlights: [
      'Fully covered by Medicare & most insurance',
      'Excellent single-distance clarity',
      'Most widely implanted IOL worldwide',
      'Proven safety record over decades',
      'Reading glasses used for near tasks',
    ],
    color: 'text-[var(--lens-color)]',
    glow: 'shadow-[0_0_40px_rgba(var(--lens-color-rgb),0.15)]',
    border: 'border-[var(--lens-color)]/40',
    badge: 'Insurance Covered',
    badgeColor: 'bg-[var(--lens-color)] text-white',
    src: '/assets/images/monofocal_iol_dark.jpg',
    alt: 'Standard Monofocal IOL, traditional single focus lens',
    cta: 'Book a Consultation',
  },
};

const QUESTIONS: Record<string, Question> = {
  q1: {
    id: 'q1',
    text: 'What is your primary goal for life after cataract surgery?',
    subtext: 'This helps us identify which lens architecture aligns best with your daily routine.',
    options: [
      {
        label: 'Complete freedom from reading glasses across all distances',
        sublabel: 'Read smartphones, books, and computer screens glasses-free',
        icon: '📖',
        next: 'q_reading_priority',
      },
      {
        label: 'Smooth, natural vision for an active lifestyle & outdoor recreation',
        sublabel: 'Pristine distance and dashboard/computer focus with minimal glare',
        icon: '⛳',
        next: 'q_active_routine',
      },
      {
        label: 'Pristine night driving clarity with zero halos or contrast loss',
        sublabel: 'Maximum visual purity for dark highways and night commutes',
        icon: '🌙',
        next: 'q_night_priority',
      },
      {
        label: 'Standard distance clarity covered fully by Medicare / insurance',
        sublabel: 'Traditional insurance option; reading glasses used for near tasks',
        icon: '🛡️',
        next: 'result:monofocal',
      },
    ],
  },
  q_reading_priority: {
    id: 'q_reading_priority',
    text: 'How important is reading fine print (phone, menus, books) without reading glasses?',
    subtext: 'Consider your daily frustration if you still needed readers for close-up tasks.',
    options: [
      {
        label: 'Essential — I want to be completely glasses-free throughout my day',
        sublabel: 'Full trifocal range across near (40 cm), intermediate, and distance',
        icon: '📱',
        next: 'result:panoptix',
      },
      {
        label: 'I want near independence, but I also do extensive night driving on dark roads',
        sublabel:
          'Evaluate whether full trifocal near focus or a refractive EDOF suits your nights best',
        icon: '🚗',
        next: 'q_night_tradeoff',
      },
    ],
  },
  q_night_tradeoff: {
    id: 'q_night_tradeoff',
    text: 'When driving after dark, which priority matters most to you?',
    subtext:
      'Trifocal optics offer total reading independence with brief night neuroadaptation; refractive EDOF offers monofocal-level night purity.',
    options: [
      {
        label: 'I gladly trade mild night halos for 100% glasses-free reading all day',
        sublabel: '99% of PanOptix patients would choose this lens again',
        icon: '👓',
        next: 'result:panoptix',
      },
      {
        label: 'I cannot tolerate halos at night — I prefer pristine dark-highway clarity',
        sublabel: 'TECNIS PureSee delivers zero contrast loss and monofocal-like night vision',
        icon: '✨',
        next: 'result:puresee',
      },
    ],
  },
  q_active_routine: {
    id: 'q_active_routine',
    text: 'Which visual environment best describes your favorite activities?',
    subtext: 'Different extended depth technologies optimize for distinct lighting and movement.',
    options: [
      {
        label: 'Outdoor sports, golf, tennis, hiking, and daily dashboard/computer screens',
        sublabel: 'Clareon Vivity uses non-diffractive X-WAVE™ optics for the lowest halo rate',
        icon: '🎾',
        next: 'result:vivity',
      },
      {
        label: 'Frequent night driving, dark highway commutes, and multi-monitor digital work',
        sublabel:
          'TECNIS PureSee provides cutting-edge refractive optics with zero contrast warning',
        icon: '🛣️',
        next: 'result:puresee',
      },
      {
        label: 'I also do hours of fine close-up reading and want zero reading glasses',
        sublabel: 'Upgrade from intermediate EDOF to full trifocal near vision',
        icon: '📚',
        next: 'result:panoptix',
      },
    ],
  },
  q_night_priority: {
    id: 'q_night_priority',
    text: 'What is your highest priority when choosing a night-friendly premium lens?',
    subtext:
      'Both Clareon Vivity and TECNIS PureSee eliminate traditional multifocal glare, through different optical designs.',
    options: [
      {
        label: 'Cutting-edge purely refractive optics with zero contrast sensitivity warning',
        sublabel:
          'TECNIS PureSee: newest FDA-approved refractive EDOF with monofocal-level night contrast',
        icon: '🔬',
        next: 'result:puresee',
      },
      {
        label: 'Proven non-diffractive wavefront shaping for smooth, forgiving natural vision',
        sublabel:
          'Clareon Vivity: proprietary X-WAVE™ technology stretching light without splitting it',
        icon: '🌟',
        next: 'result:vivity',
      },
      {
        label: 'I want good night vision, but I prioritize reading without glasses above all else',
        sublabel: 'PanOptix Pro: the only FDA-approved trifocal delivering complete near focus',
        icon: '📖',
        next: 'result:panoptix',
      },
    ],
  },
};

const TOTAL_QUESTIONS = 3;

function getProgressPercent(history: string[]): number {
  if (history.length === 0) return 0;
  return Math.min(Math.round((history.length / TOTAL_QUESTIONS) * 100), 90);
}

// progressWidthClass removed: width driven via CSS custom property set by ref

export default function LensQuestionnaireSection() {
  const [currentId, setCurrentId] = useState<string>('q1');
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<LensResult | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [answerLabels, setAnswerLabels] = useState<string[]>([]);

  const currentQuestion = QUESTIONS[currentId];

  function handleOption(option: Option, idx: number) {
    if (animating) return;
    setSelectedOption(idx);
    setAnimating(true);

    if (currentId === 'q1' && history.length === 0) {
      trackQuizStart();
    }

    // Track user selection in GA
    trackEvent({
      action: `quiz_question_${currentId}_answer`,
      category: 'Engagement',
      label: option.label,
    });

    setTimeout(() => {
      if (option.next?.startsWith('result:')) {
        const key = option.next.replace('result:', '');
        const lens = LENSES[key];
        const updatedAnswers = [...answerLabels, option.label];
        setAnswerLabels(updatedAnswers);
        setCalculating(true);

        // Track quiz completion event with the target recommendation
        trackQuizComplete(lens.name, lens.key);

        setTimeout(() => {
          setResult(lens);
          setCalculating(false);
          // Playful gold & warm platinum confetti matching the premium clinical brand colors
          import('canvas-confetti').then((module) => {
            const confetti = module.default;
            const end = Date.now() + 1000;
            const colors = ['#c5a059', '#e2c28a', '#ffffff', '#1e2029'];
            (function frame() {
              confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
              });
              confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
              });
              if (Date.now() < end) {
                requestAnimationFrame(frame);
              }
            })();
          });
        }, 1800);

        // Notify staff via Brevo
        fetch('/api/notify-staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lensName: lens.name,
            lensTagline: lens.tagline,
            answers: updatedAnswers,
          }),
        }).catch((err) => console.error('Failed to notify staff:', err));
      } else if (option.next) {
        setHistory((h) => [...h, currentId]);
        setAnswerLabels((a) => [...a, option.label]);
        setCurrentId(option.next!);
      }
      setSelectedOption(null);
      setAnimating(false);
    }, 350);
  }

  function handleBack() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setAnswerLabels((a) => a.slice(0, -1));
    setCurrentId(prev);
    setResult(null);
    setCalculating(false);
  }

  function handleRestart() {
    setCurrentId('q1');
    setHistory([]);
    setResult(null);
    setSelectedOption(null);
    setAnswerLabels([]);
    setCalculating(false);
  }

  const progress = result ? 100 : getProgressPercent(history);

  const progressTrackRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (progressTrackRef.current) {
      progressTrackRef.current.style.setProperty(
        '--progress-width',
        `${calculating ? 95 : progress}%`
      );
    }
  }, [calculating, progress]);

  return (
    <section
      id="lens-quiz"
      className="relative py-16 sm:py-24 overflow-hidden bg-section-quiz scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.04] content-auto"
    >
      {/* Radar concentric focus rings in negative space */}
      <div className="absolute inset-0 texture-radar-concentric opacity-65 pointer-events-none" />

      {/* Cockpit Guidance Directional Lighting Washes (Zero circular blobs) */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/[0.05] via-transparent to-primary/[0.05] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-1/2 h-[350px] bg-gradient-to-br from-sky-500/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-1/2 h-[350px] bg-gradient-to-tl from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0 shadow-[0_0_8px_rgba(197, 160, 89,0.8)]" />
            Lens Recommendation Quiz
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-4 leading-tight">
            Build Your{' '}
            <span className="font-semibold text-gradient-primary">Perfect Vision Plan</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Answer a few quick questions and we&apos;ll recommend the IOL best suited to your vision
            goals and lifestyle.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">
              {calculating
                ? 'Analyzing parameters...'
                : result
                  ? 'Complete'
                  : `Question ${history.length + 1}`}
            </span>
            <span className="text-xs text-primary font-medium">
              {calculating ? (
                'Processing...'
              ) : progress >= 60 && !result ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="animate-pulse">Almost there!</span> {progress}%
                </span>
              ) : (
                `${progress}%`
              )}
            </span>
          </div>
          <div
            ref={progressTrackRef}
            className={`h-1.5 w-full bg-muted rounded-full relative overflow-visible ${styles.progressTrack}`}
          >
            <div
              className={`h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out relative ${styles.progressBar}`}
            >
              {progress > 0 && <div className={styles.progressTip} />}
            </div>
          </div>
        </div>

        {/* Card with Doppelrand / Double-Bezel Architecture */}
        <div
          className={`double-bezel transition-all duration-300 ${
            animating && !calculating ? 'opacity-60 scale-[0.99]' : 'opacity-100 scale-100'
          }`}
        >
          <div className="double-bezel-inner bg-card p-5 sm:p-8 card-glow">
            {calculating ? (
              <div className="flex flex-col items-center justify-center py-10 text-center min-h-[300px]">
                {/* Spinning optical grid/reticle simulator */}
                <div className="relative w-24 h-24 mb-8">
                  {/* Outermost pulsing ring */}
                  <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" />
                  {/* Secondary rotating scanner ticks */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-primary/45 animate-[spin_8s_linear_infinite]" />
                  {/* Inner solid tracking ring */}
                  <div className="absolute inset-4 rounded-full border border-primary/60" />
                  {/* Core focus dot */}
                  <div className="absolute inset-9 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-medium text-foreground mb-4 tracking-wide uppercase">
                  Finding Your Best Match...
                </h3>
                <div className="w-64 max-w-full text-left font-mono text-[10px] sm:text-xs text-muted-foreground/85 space-y-1.5 bg-white/[0.01] border border-white/[0.04] p-3.5 rounded-lg">
                  <div
                    className={`flex items-center justify-between text-primary/80 ${styles.logItem}`}
                  >
                    <span>{`>`} Scanning answers...</span>
                    <span className="animate-pulse">PASS</span>
                  </div>
                  <div
                    className={`flex items-center justify-between text-muted-foreground ${styles.logItem}`}
                  >
                    <span>{`>`} Assessing lifestyle tier...</span>
                    <span className="font-semibold text-foreground">OK</span>
                  </div>
                  <div
                    className={`flex items-center justify-between text-muted-foreground ${styles.logItem}`}
                  >
                    <span>{`>`} Evaluating glare tolerance...</span>
                    <span className="font-semibold text-foreground">OK</span>
                  </div>
                  <div
                    className={`flex items-center justify-between text-muted-foreground ${styles.logItem}`}
                  >
                    <span>{`>`} Calibrating lens optics...</span>
                    <span className="font-semibold text-primary animate-pulse">CALIBRATED</span>
                  </div>
                </div>
              </div>
            ) : !result ? (
              <>
                {/* Question */}
                <div className="mb-5 sm:mb-6">
                  <h3 className="text-lg sm:text-2xl font-semibold text-foreground mb-2 leading-snug">
                    {currentQuestion.text}
                  </h3>
                  {currentQuestion.subtext && (
                    <p className="text-muted-foreground text-sm">{currentQuestion.subtext}</p>
                  )}
                </div>

                {/* Options */}
                <div
                  className="flex flex-col gap-3"
                  role="radiogroup"
                  aria-label={currentQuestion.text}
                >
                  {currentQuestion.options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOption(opt, idx)}
                      role="radio"
                      aria-checked={selectedOption === idx}
                      className={`group w-full text-left flex items-center gap-3 sm:gap-4 px-4 py-4 rounded-xl border transition-all duration-300 ease-out cursor-pointer touch-manipulation min-h-[64px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none
                      ${
                        selectedOption === idx
                          ? 'border-primary bg-primary/15 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.7),inset_-1px_-1px_3px_rgba(197,160,89,0.25),0_0_20px_rgba(197,160,89,0.2)] scale-[0.99]'
                          : 'border-white/10 bg-gradient-to-br from-[#161c28] to-[#0c1017] shadow-[-3px_-3px_8px_rgba(255,255,255,0.03),4px_5px_14px_rgba(0,0,0,0.6),inset_1px_1px_1.5px_rgba(255,255,255,0.08)] hover:border-primary/50 hover:shadow-[-4px_-4px_12px_rgba(255,255,255,0.05),6px_7px_18px_rgba(0,0,0,0.7)] hover:-translate-y-0.5 active:scale-[0.99]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="text-xl sm:text-2xl shrink-0 leading-none"
                      >
                        {opt.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm sm:text-base leading-snug group-hover:text-amber-100 transition-colors">
                          {opt.label}
                        </p>
                        {opt.sublabel && (
                          <p className="text-slate-300 text-xs mt-0.5">{opt.sublabel}</p>
                        )}
                      </div>
                      <span
                        aria-hidden="true"
                        className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-spring
                        ${
                          selectedOption === idx
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground/40 group-hover:border-primary/60'
                        }`}
                      >
                        {selectedOption === idx && (
                          <span className="w-1.5 h-1.5 rounded-full bg-background animate-fade-in-scale" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Back button */}
                {history.length > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-5 flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-semibold transition-colors touch-manipulation py-2 rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                  >
                    <Icon name="ChevronLeftIcon" size={16} />
                    Back to previous question
                  </button>
                )}
              </>
            ) : (
              /* Result */
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-sm text-muted-foreground">
                    Based on your answers, here&apos;s what patients like you most often choose:
                  </span>
                </div>

                {/* Mimetic Desire framing */}
                <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl bg-primary/6 border border-primary/15">
                  <span className="text-lg shrink-0">👥</span>
                  <p className="text-xs text-primary/90 font-medium leading-snug">
                    <strong className="text-primary">
                      {result.key === 'vivity'
                        ? '74%'
                        : result.key === 'panoptix'
                          ? '68%'
                          : result.key === 'puresee'
                            ? '81%'
                            : '100%'}{' '}
                      of patients with your vision profile
                    </strong>{' '}
                    chose {result.name}, and{' '}
                    {result.key === 'monofocal'
                      ? 'appreciate the reliability'
                      : "99% say they'd choose a premium lens again"}
                    .
                  </p>
                </div>

                <div
                  data-lens={result.key}
                  className={`doppel-shell p-1.5 mb-6 transition-spring ${styles.resultShell}`}
                >
                  <div className="bg-muted/90 rounded-[calc(2rem-6px)] p-5 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                      {/* Lens image */}
                      <div className="shrink-0 w-full sm:w-36 h-40 sm:h-36 rounded-xl overflow-hidden border border-white/[0.08] relative">
                        <AppImage
                          src={result.src}
                          alt={result.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 144px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${result.badgeColor}`}
                          >
                            {result.badge}
                          </span>
                        </div>
                        <h3
                          className={`text-2xl sm:text-3xl font-display font-bold mb-1 ${result.color}`}
                        >
                          {result.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">{result.tagline}</p>
                        <p className="text-foreground/80 text-sm leading-relaxed">
                          {result.description}
                        </p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mt-5 pt-5 border-t border-white/[0.08]">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">
                        Key Benefits
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {result.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className={`mt-0.5 shrink-0 ${result.color}`}>
                              <Icon name="CheckIcon" size={16} />
                            </span>
                            <span className="text-foreground/80">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      // Primary: fire custom event (for already-mounted BookingSection)
                      window.dispatchEvent(new CustomEvent('select-lens', { detail: result.key }));
                      // Fallback: write to sessionStorage (for cases where BookingSection mounts after)
                      try {
                        sessionStorage.setItem('preselect-lens', result.key);
                      } catch (e) {
                        console.warn('Session storage write failed:', e);
                      }
                      trackEvent({
                        action: 'quiz_cta_click',
                        category: 'Conversion',
                        label: result.name,
                      });
                      smoothScrollToElement('booking');
                      window.history.pushState(null, '', '#booking');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-primary text-[#000000] font-bold text-sm sm:text-base hover:bg-accent transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] min-h-[52px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                  >
                    {result.cta}
                    <Icon name="ArrowRightIcon" size={16} />
                  </a>
                  <button
                    onClick={handleRestart}
                    className="btn-neumorphic-secondary flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm sm:text-base font-bold text-white transition-all duration-200 min-h-[52px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                  >
                    <Icon name="ArrowPathIcon" size={16} />
                    Retake Quiz
                  </button>
                </div>

                <p className="mt-4 text-xs text-muted-foreground text-center">
                  This quiz cannot replace a thorough clinical evaluation by Dr. Marano or Dr.
                  Raouf, but it provides a clear starting point. During your consultation, your
                  surgeon will confirm the ideal match for your individual eyes.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        {!result && (
          <p className="text-center text-xs text-muted-foreground mt-5 px-2">
            No personal information required · Takes about 60 seconds · Results reviewed with your
            surgeon at time of consultation
          </p>
        )}
      </div>
    </section>
  );
}
