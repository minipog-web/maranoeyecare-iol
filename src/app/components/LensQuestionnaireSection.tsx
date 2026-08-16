'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';
import confetti from 'canvas-confetti';
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
    src: '/assets/images/vivity_iol_dark.jpg',
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
    src: '/assets/images/panoptix_iol_dark.jpg',
    alt: 'PanOptix Pro trifocal IOL, advanced multifocal intraocular lens',
    cta: 'Book a PanOptix Consultation',
  },
  puresee: {
    key: 'puresee',
    name: 'TECNIS PureSee',
    tagline: 'Purely Refractive EDOF: Continuous focus with zero contrast warning',
    description:
      'The TECNIS PureSee is a purely refractive Extended Depth of Focus (EDOF) IOL from Johnson & Johnson MedTech. Its refractive zonal optics deliver continuous clarity from distance through intermediate to functional near vision, with zero diffractive rings, zero contrast sensitivity warnings, and a night glare profile identical to a standard monofocal lens.',
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
    badge: 'Refractive EDOF',
    badgeColor: 'bg-[var(--lens-color)] text-white',
    src: '/assets/images/puresee_iol_dark.jpg',
    alt: 'TECNIS PureSee IOL, purely refractive extended depth of focus intraocular lens',
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
    alt: 'Standard monofocal IOL, insurance-covered intraocular lens for cataract surgery',
    cta: 'Book a Consultation',
  },
};

const QUESTIONS: Record<string, Question> = {
  q1: {
    id: 'q1',
    text: 'What is your primary goal for life after cataract surgery?',
    subtext: 'This helps us identify the lifestyle archetype that fits you best.',
    options: [
      {
        label: 'Standard clarity covered by insurance (reading glasses required)',
        sublabel: 'Medicare / standard insurance coverage',
        icon: '🛡️',
        next: 'result:monofocal',
      },
      {
        label: 'Complete freedom to read, work, and drive without reaching for glasses',
        sublabel: 'Ditch glasses for books, phones, and dashboards',
        icon: '👓',
        next: 'q2',
      },
      {
        label: 'Pristine distance clarity for driving, sports, and outdoors',
        sublabel: 'Prioritize far-away sharpness over close-up reading',
        icon: '🚗',
        next: 'q3',
      },
      {
        label: 'Pristine night vision with the absolute lowest risk of glare or halos',
        sublabel: 'Maximize visual purity in low light and night driving',
        icon: '🌙',
        next: 'q4',
      },
    ],
  },
  q2: {
    id: 'q2',
    text: 'How frustrating is the prospect of needing reading glasses for daily tasks?',
    subtext: 'Think of reaching for readers to view your phone, restaurant menus, or price tags.',
    options: [
      {
        label: 'Very frustrating, I want to read phones, menus, and fine print glasses-free',
        sublabel: 'Maximize near-vision independence',
        icon: '📖',
        next: 'result:panoptix',
      },
      {
        label: "Manageable, I don't mind keeping readers nearby for tiny print",
        sublabel: 'Acceptable trade-off for other vision benefits',
        icon: '📱',
        next: 'q3',
      },
    ],
  },
  q3: {
    id: 'q3',
    text: 'How many hours do you spend focusing on screens (laptops, monitors, dashboards)?',
    subtext: "Intermediate range (arm's length) is critical for modern digital life.",
    options: [
      {
        label: 'Over 4 hours a day, screen clarity is essential for my work and life',
        sublabel: 'Active computer work, Zoom calls, and laptop use',
        icon: '💻',
        next: 'result:vivity',
      },
      {
        label: '1 to 3 hours a day, casual browsing and messaging',
        sublabel: 'Casual tablet reading and social media',
        icon: '🖥️',
        next: 'q4',
      },
      {
        label: 'Rarely, I prioritize distance activities like driving, golf, and watching TV',
        sublabel: 'Minimal computer use, focusing on distance tasks',
        icon: '📺',
        next: 'q5',
      },
    ],
  },
  q4: {
    id: 'q4',
    text: 'How critical is visual purity at night (for example, night driving without glare or halos)?',
    subtext: 'Certain multifocal designs may produce mild halos around oncoming headlights.',
    options: [
      {
        label: 'Extremely important, I drive frequently after dark and want minimal glare',
        sublabel: 'Prioritize halo-free night vision',
        icon: '💡',
        next: 'q5',
      },
      {
        label: 'Flexible, I can easily adapt if it gives me complete glasses-free near vision',
        sublabel: 'Willing to neuroadapt for full near and intermediate focus',
        icon: '😎',
        next: 'result:panoptix',
      },
    ],
  },
  q5: {
    id: 'q5',
    text: 'To ensure compatibility, have you been diagnosed with any other eye conditions?',
    subtext: 'Co-morbidities can influence which lens is safest and most effective for you.',
    options: [
      {
        label: 'Dry eye, macular changes, or irregular cornea',
        sublabel: 'Requires advanced refractive considerations',
        icon: '👁️',
        next: 'result:puresee',
      },
      {
        label: 'None of the above',
        sublabel: 'My eyes are otherwise healthy',
        icon: '✅',
        next: 'result:puresee',
      },
    ],
  },
};

const TOTAL_QUESTIONS = 5;

function getProgressPercent(history: string[]): number {
  if (history.length === 0) return 0;
  return Math.min(Math.round((history.length / TOTAL_QUESTIONS) * 100), 90);
}

// progressWidthClass removed — width driven via CSS custom property set by ref

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
        trackEvent({
          action: 'quiz_complete',
          category: 'Conversion',
          label: lens.name,
        });

        setTimeout(() => {
          setResult(lens);
          setCalculating(false);
          // Playful gold & warm platinum confetti matching the premium clinical brand colors
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
    <section id="lens-quiz" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-lines-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

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

        {/* Card */}
        <div
          className={`relative bg-card border rounded-2xl p-5 sm:p-8 card-glow transition-all duration-300 ${
            animating && !calculating ? 'opacity-60 scale-[0.99]' : 'opacity-100 scale-100'
          }`}
        >
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
                          ? 'border-primary bg-primary/10 shadow-[0_0_24px_rgba(197,160,89,0.15)] scale-[0.99]'
                          : 'border-white/[0.08] bg-white/[0.02] hover:border-primary/45 hover:bg-primary/5 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(197,160,89,0.06)] active:scale-[0.99]'
                      }`}
                  >
                    <span aria-hidden="true" className="text-xl sm:text-2xl shrink-0 leading-none">
                      {opt.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground font-medium text-sm sm:text-base leading-snug">
                        {opt.label}
                      </p>
                      {opt.sublabel && (
                        <p className="text-muted-foreground text-xs mt-0.5">{opt.sublabel}</p>
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
                  className="mt-5 flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors touch-manipulation py-2 rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
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
                        className="w-full h-full object-cover"
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
                  onClick={() => {
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
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-primary text-[#040506] font-semibold text-sm hover:bg-accent transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] min-h-[52px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  {result.cta}
                  <Icon name="ArrowRightIcon" size={16} />
                </a>
                <button
                  onClick={handleRestart}
                  className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 text-sm transition-all duration-200 min-h-[52px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <Icon name="ArrowPathIcon" size={16} />
                  Retake Quiz
                </button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground text-center">
                This quiz cannot replace Dr. Marano&apos;s thorough clinical evaluation, but it
                provides a clear starting point. During your consultation, he will confirm the ideal
                match for your individual eyes.
              </p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        {!result && (
          <p className="text-center text-xs text-muted-foreground mt-5 px-2">
            No personal information required · Takes about 60 seconds · Results reviewed with Dr.
            Marano at time of consultation
          </p>
        )}
      </div>
    </section>
  );
}
