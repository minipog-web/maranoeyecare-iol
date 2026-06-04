'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { trackEvent } from '@/lib/gtag';
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
    tagline: 'Extended Depth of Focus — Fewest halos of any premium IOL',
    description:
      'The Clareon Vivity uses non-diffractive X-WAVE™ technology to stretch and shift light, delivering seamless vision from distance through intermediate — with the lowest rate of halos and glare among premium lenses. Ideal for active patients who drive frequently and want natural, comfortable vision.',
    highlights: [
      'Excellent distance & intermediate vision',
      'Fewest halos & glare of any premium IOL',
      'Non-diffractive — no light splitting',
      'Great for night driving',
      'FDA-approved extended depth of focus',
    ],

    color: 'text-primary',
    glow: 'shadow-[0_0_40px_rgba(0,201,177,0.25)]',
    border: 'border-primary/50',
    badge: 'Most Popular',
    badgeColor: 'bg-primary text-background',
    src: '/assets/images/vivity_iol_dark.png',
    alt: 'Clareon Vivity IOL — extended depth of focus intraocular lens',
    cta: 'Book a Vivity Consultation',
  },
  panoptix: {
    key: 'panoptix',
    name: 'PanOptix Pro',
    tagline: 'Trifocal — Full range: near, intermediate & distance',
    description:
      'The PanOptix Pro trifocal IOL is the only FDA-approved trifocal lens in the US, delivering clear vision at all three focal points — near, intermediate, and distance. Perfect for patients who want to minimize reading glasses entirely and live a fully glasses-free lifestyle.',
    highlights: [
      'Near, intermediate & distance vision',
      '99% would choose a premium lens again',
      'Only FDA-approved trifocal in the US',
      'Ideal for reading without glasses',
      'Best for glasses-free lifestyle',
    ],

    color: 'text-violet-300',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.25)]',
    border: 'border-violet-500/50',
    badge: 'Trifocal',
    badgeColor: 'bg-violet-500 text-white',
    src: '/assets/images/panoptix_iol_dark.png',
    alt: 'PanOptix Pro trifocal IOL — advanced multifocal intraocular lens',
    cta: 'Book a PanOptix Consultation',
  },
  eyhance: {
    key: 'eyhance',
    name: 'Eyhance',
    tagline: 'Enhanced Monofocal — Crisp distance + improved intermediate',
    description:
      'The Eyhance is a next-generation monofocal IOL that goes beyond standard monofocal performance. Its unique continuous power profile delivers sharper distance vision and meaningfully improved intermediate vision — ideal for patients who want a reliable, low-risk upgrade over standard lenses.',
    highlights: [
      'Superior distance vision clarity',
      'Better intermediate than standard monofocal',
      'Lowest risk of halos/glare',
      'Excellent for light-sensitive patients',
      'Proven monofocal reliability with a plus',
    ],

    color: 'text-emerald-300',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.2)]',
    border: 'border-emerald-500/40',
    badge: 'Monofocal+',
    badgeColor: 'bg-emerald-500 text-white',
    src: '/assets/images/eyhance_iol_dark.png',
    alt: 'Eyhance enhanced monofocal IOL — next-generation monofocal intraocular lens',
    cta: 'Book an Eyhance Consultation',
  },
  monofocal: {
    key: 'monofocal',
    name: 'Standard Monofocal',
    tagline: 'Insurance-Covered — Reliable single-focus clarity',
    description:
      'The standard monofocal IOL is the most widely used cataract lens and is fully covered by Medicare and most insurance plans. It delivers excellent vision at one focal distance (typically distance), with reading glasses used for near tasks. A trusted, proven choice for patients who prefer the insurance-covered option.',
    highlights: [
      'Fully covered by Medicare & most insurance',
      'Excellent single-distance clarity',
      'Most widely implanted IOL worldwide',
      'Proven safety record over decades',
      'Reading glasses used for near tasks',
    ],

    color: 'text-slate-200',
    glow: 'shadow-[0_0_40px_rgba(100,116,139,0.15)]',
    border: 'border-slate-500/40',
    badge: 'Insurance Covered',
    badgeColor: 'bg-slate-500 text-white',
    src: '/assets/images/monofocal_iol_dark.png',
    alt: 'Standard monofocal IOL — insurance-covered intraocular lens for cataract surgery',
    cta: 'Book a Consultation',
  },
};

const QUESTIONS: Record<string, Question> = {
  q1: {
    id: 'q1',
    text: 'What matters most to you when choosing your lens?',
    subtext: 'This helps us understand your top priority.',
    options: [
      {
        label: 'I only want the basic lens covered by insurance',
        sublabel: 'Medicare / standard insurance coverage',
        icon: '🛡️',
        next: 'result:monofocal',
      },
      {
        label: 'Maximum glasses freedom',
        sublabel: 'I want to read, use a computer, and drive without glasses',
        icon: '👓',
        next: 'q2',
      },
      {
        label: 'Best distance & driving vision',
        sublabel: 'I mostly want sharp distance vision',
        icon: '🚗',
        next: 'q3',
      },
      {
        label: 'Fewest side effects possible',
        sublabel: 'Halos, glare, and starbursts concern me',
        icon: '🌙',
        next: 'q4',
      },
    ],
  },
  q2: {
    id: 'q2',
    text: 'How important is reading without glasses to you?',
    subtext: 'Think about daily tasks like reading menus, books, or your phone.',
    options: [
      {
        label: 'Critical — I want to read everything without glasses',
        sublabel: 'Books, phone, menus, fine print',
        icon: '📖',
        next: 'result:panoptix',
      },
      {
        label: 'Important but not essential',
        sublabel: "I'm okay using readers occasionally",
        icon: '📱',
        next: 'q3',
      },
    ],
  },
  q3: {
    id: 'q3',
    text: 'How much do you use a computer or tablet daily?',
    subtext: "Intermediate vision (arm's length) is key for screens.",
    options: [
      {
        label: 'Heavily — 4+ hours a day',
        sublabel: 'Work, browsing, video calls',
        icon: '💻',
        next: 'result:vivity',
      },
      {
        label: 'Moderately — 1–3 hours a day',
        sublabel: 'Casual use, email, streaming',
        icon: '🖥️',
        next: 'q4',
      },
      {
        label: 'Rarely — I mostly watch TV and drive',
        sublabel: 'Distance vision is my main need',
        icon: '📺',
        next: 'q5',
      },
    ],
  },
  q4: {
    id: 'q4',
    text: 'How sensitive are you to light or visual disturbances?',
    subtext: 'Some premium lenses can cause halos or glare, especially at night.',
    options: [
      {
        label: 'Very sensitive — I notice halos easily',
        sublabel: 'Night driving or bright lights bother me',
        icon: '💡',
        next: 'q5',
      },
      {
        label: "Not very sensitive — it doesn't bother me",
        sublabel: "I've never had issues with glare",
        icon: '😎',
        next: 'result:panoptix',
      },
    ],
  },
  q5: {
    id: 'q5',
    text: 'Do you have any of the following eye conditions?',
    subtext: 'Certain conditions affect which lens is safest for you.',
    options: [
      {
        label: 'Dry eye, macular changes, or irregular cornea',
        sublabel: 'These may limit premium lens options',
        icon: '👁️',
        next: 'result:eyhance',
      },
      {
        label: 'None of the above',
        sublabel: 'My eyes are otherwise healthy',
        icon: '✅',
        next: 'result:eyhance',
      },
    ],
  },
};

const TOTAL_QUESTIONS = 5;

function getProgressPercent(history: string[]): number {
  if (history.length === 0) return 0;
  return Math.min(Math.round((history.length / TOTAL_QUESTIONS) * 100), 90);
}

function progressWidthClass(pct: number): string {
  if (pct === 0) return 'w-0';
  if (pct <= 10) return 'w-[10%]';
  if (pct <= 20) return 'w-[20%]';
  if (pct <= 40) return 'w-[40%]';
  if (pct <= 60) return 'w-[60%]';
  if (pct <= 80) return 'w-[80%]';
  if (pct <= 90) return 'w-[90%]';
  return 'w-full';
}

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

  return (
    <section id="lens-quiz" className="relative py-12 sm:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-lines-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0 shadow-[0_0_8px_rgba(0,201,177,0.8)]" />
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
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={`${progressWidthClass(calculating ? 95 : progress)} h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out`}
            />
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
                <div className="flex items-center justify-between text-primary/80">
                  <span>{`>`} Scanning answers...</span>
                  <span className="animate-pulse">PASS</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground animate-[fade-in_0.4s_ease-out_0.4s_both]">
                  <span>{`>`} Assessing lifestyle tier...</span>
                  <span className="font-semibold text-foreground">OK</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground animate-[fade-in_0.4s_ease-out_0.8s_both]">
                  <span>{`>`} Evaluating glare tolerance...</span>
                  <span className="font-semibold text-foreground">OK</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground animate-[fade-in_0.4s_ease-out_1.2s_both]">
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
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOption(opt, idx)}
                    className={`group w-full text-left flex items-center gap-3 sm:gap-4 px-4 py-4 rounded-xl border transition-spring cursor-pointer touch-manipulation min-h-[64px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none
                      ${
                        selectedOption === idx
                          ? 'border-primary bg-primary/10 shadow-[0_0_24px_rgba(0,201,177,0.12)] scale-[0.99]'
                          : 'border-white/[0.08] bg-white/[0.02] hover:border-primary/45 hover:bg-primary/5 hover:scale-[1.01] active:scale-[0.99]'
                      }`}
                  >
                    <span className="text-xl sm:text-2xl shrink-0 leading-none">{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground font-medium text-sm sm:text-base leading-snug">
                        {opt.label}
                      </p>
                      {opt.sublabel && (
                        <p className="text-muted-foreground text-xs mt-0.5">{opt.sublabel}</p>
                      )}
                    </div>
                    <span
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
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
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
                        : result.key === 'eyhance'
                          ? '81%'
                          : '100%'}{' '}
                    of patients with your vision profile
                  </strong>{' '}
                  chose {result.name} — and{' '}
                  {result.key === 'monofocal'
                    ? 'appreciate the reliability'
                    : "99% say they'd choose a premium lens again"}
                  .
                </p>
              </div>

              <div
                className={`doppel-shell p-1.5 mb-6 transition-spring ${
                  result.key === 'vivity'
                    ? styles.shellVivity
                    : result.key === 'panoptix'
                      ? styles.shellPanoptix
                      : result.key === 'eyhance'
                        ? styles.shellEyhance
                        : styles.shellMonofocal
                }`}
              >
                <div className="bg-[#0e1018]/90 rounded-[calc(2rem-6px)] p-5 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
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
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
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
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-primary text-[#040506] font-semibold text-sm hover:bg-accent transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] min-h-[52px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  {result.cta}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <button
                  onClick={handleRestart}
                  className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 text-sm transition-all duration-200 min-h-[52px] touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Retake Quiz
                </button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground text-center">
                This quiz can&apos;t replace Dr. Marano&apos;s clinical exam — but it gives you a
                strong starting point. In your consultation, he&apos;ll confirm the perfect match
                for your unique eyes.
              </p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        {!result && (
          <p className="text-center text-xs text-muted-foreground mt-5 px-2">
            No personal information required · Takes about 60 seconds · Results reviewed with Dr.
            Marano
          </p>
        )}
      </div>
    </section>
  );
}
