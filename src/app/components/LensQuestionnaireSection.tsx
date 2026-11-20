'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import {
  trackEvent,
  trackQuizStart,
  trackQuizComplete,
  trackConsultationBooking,
  trackPhoneClick,
} from '@/lib/gtag';
import { getTrackingParams } from '@/lib/tracking-params';
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
    cta: 'Schedule Now',
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
    cta: 'Schedule Now',
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
    cta: 'Schedule Now',
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
    cta: 'Schedule Now',
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

const QUIZ_OFFICES = [
  { label: 'Livingston', value: 'Livingston Office (200 South Orange Ave)' },
  { label: 'Denville', value: 'Denville Office (16 Pocono Rd)' },
  { label: 'Newark', value: 'Newark Office (306 Martin Luther King Blvd)' },
];

export default function LensQuestionnaireSection() {
  const [currentId, setCurrentId] = useState<string>('q1');
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<LensResult | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [answerLabels, setAnswerLabels] = useState<string[]>([]);
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickOffice, setQuickOffice] = useState(QUIZ_OFFICES[0].value);
  const [quickSubmitting, setQuickSubmitting] = useState(false);
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [quickError, setQuickError] = useState<string | null>(null);

  const formatQuickPhone = (val: string): string => {
    const digits = val.replace(/\D/g, '');
    if (!digits) return '';
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || quickSubmitting) return;

    const trimmedName = quickName.trim();
    const trimmedPhone = quickPhone.trim();
    const digits = trimmedPhone.replace(/\D/g, '');

    if (!trimmedName) {
      setQuickError('Please enter your name so our coordinator knows who to ask for.');
      return;
    }
    if (digits.length < 7) {
      setQuickError('Please enter a valid 10-digit phone number.');
      return;
    }

    setQuickSubmitting(true);
    setQuickError(null);

    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0] || trimmedName;
    const lastName = nameParts.slice(1).join(' ') || '-';
    const tracking = getTrackingParams();

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'consultation');
      formData.append('name', trimmedName);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', '');
      formData.append('phone', trimmedPhone);
      formData.append('preferredContact', 'phone');
      formData.append('location', quickOffice);
      formData.append('lens', result.name);
      formData.append('quizResult', result.key);
      formData.append(
        'message',
        `Quiz inline callback request (Answers: ${answerLabels.join(' | ')})`
      );
      if (tracking.gclid) formData.append('gclid', tracking.gclid);
      if (tracking.wbraid) formData.append('wbraid', tracking.wbraid);
      if (tracking.gbraid) formData.append('gbraid', tracking.gbraid);
      if (tracking.utm_source) formData.append('utmSource', tracking.utm_source);
      if (tracking.utm_medium) formData.append('utmMedium', tracking.utm_medium);
      if (tracking.utm_campaign) formData.append('utmCampaign', tracking.utm_campaign);
      if (tracking.utm_term) formData.append('utmTerm', tracking.utm_term);
      if (tracking.utm_content) formData.append('utmContent', tracking.utm_content);
      if (tracking.landing_page) formData.append('landingPage', tracking.landing_page);
      if (tracking.referrer) formData.append('referrer', tracking.referrer);

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (response.ok) {
        setQuickSubmitted(true);
        trackConsultationBooking(quickOffice, result.name, result.key, {
          phone: trimmedPhone,
          firstName,
          lastName: lastName === '-' ? undefined : lastName,
        });
      } else {
        setQuickError('Could not submit right now. Please call us directly at (973) 322-0100.');
      }
    } catch {
      setQuickError('Connection issue. Please call us directly at (973) 322-0100.');
    } finally {
      setQuickSubmitting(false);
    }
  };

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
        }, 850);

        // Quiz result is stored in sessionStorage ('preselect-lens') and attached to the Netlify 'consultation' form submission
        try {
          sessionStorage.setItem('preselect-lens', lens.key);
        } catch {
          // Ignore storage issues
        }
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
    setQuickSubmitted(false);
    setQuickError(null);
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
      className="relative pt-7 sm:pt-9 lg:pt-10 pb-14 sm:pb-20 overflow-hidden bg-section-quiz scroll-mt-20 sm:scroll-mt-24 border-t border-primary/20"
    >
      {/* Prominent gold specular crown hairline bridging from Hero */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none" />

      {/* Radar concentric focus rings in negative space */}
      <div className="absolute inset-0 texture-radar-concentric opacity-65 pointer-events-none" />

      {/* Cockpit Guidance Directional Lighting Washes (Zero circular blobs) */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-sky-500/[0.04] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-1/2 h-[350px] bg-gradient-to-br from-sky-500/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-1/2 h-[350px] bg-gradient-to-tl from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/35 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-3 shadow-[0_0_20px_rgba(197,160,89,0.18)]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0 shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
            60-Second Lens Match Quiz
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal sm:font-medium text-foreground mb-2 leading-tight">
            Build Your{' '}
            <span className="font-semibold text-gradient-primary">Perfect Vision Plan</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Answer 2–3 quick questions for a personalized IOL match based on your daily routine and
            night-driving needs.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-4 sm:mb-5">
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
          <div className="double-bezel-inner bg-card p-5 sm:p-6 lg:p-7 card-glow">
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
                <div className="mb-4 sm:mb-5">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-1.5 leading-snug">
                    {currentQuestion.text}
                  </h3>
                  {currentQuestion.subtext && (
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {currentQuestion.subtext}
                    </p>
                  )}
                </div>

                {/* Options */}
                <div
                  className={`grid grid-cols-1 gap-3 ${
                    currentQuestion.options.length % 2 === 0 ? 'md:grid-cols-2' : ''
                  }`}
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
                    className="mt-4 inline-flex items-center gap-1.5 min-h-[44px] px-2 -ml-2 text-slate-300 hover:text-white text-sm font-semibold transition-colors touch-manipulation py-2 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
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

                {/* Hot Lead Reassurance Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/25 mb-4 text-xs">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span>Recommended Plan: {result.name}</span>
                  </div>
                  <span className="text-muted-foreground text-[11px] hidden sm:inline">
                    Complimentary 15-minute IOL lens education &amp; screening (full diagnostic
                    medical exam billed to insurance)
                  </span>
                </div>

                {/* Inline 15-Second Callback Capture + Direct Call at Peak Intent */}
                <div className="rounded-2xl bg-[#0e1018] border border-primary/40 p-4 sm:p-6 mb-4 shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
                  {quickSubmitted ? (
                    <div className="text-center py-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center mx-auto mb-3">
                        <Icon name="CheckCircleIcon" size={26} className="text-emerald-400" />
                      </div>
                      <h4 className="font-display text-xl font-semibold text-white mb-1.5">
                        Callback Requested for {result.name}!
                      </h4>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Our NJ patient care coordinator will call you back the same business day to
                        confirm your consultation and answer any questions.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleQuickSubmit} noValidate className="space-y-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm sm:text-base font-bold text-white">
                            Confirm Your {result.name} Candidacy
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Enter your name &amp; phone for a quick 5-minute same-day callback. Zero
                            obligation.
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          No Email Needed
                        </span>
                      </div>

                      {quickError && (
                        <p
                          role="alert"
                          className="text-xs text-red-300 bg-red-500/10 border border-red-500/25 rounded-xl px-3.5 py-2.5 font-medium"
                        >
                          {quickError}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          autoComplete="name"
                          value={quickName}
                          onChange={(e) => {
                            setQuickName(e.target.value);
                            if (quickError) setQuickError(null);
                          }}
                          placeholder="Your Full Name *"
                          aria-label="Your Full Name"
                          maxLength={80}
                          className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/15 focus:border-primary text-white placeholder:text-white/45 text-sm min-h-[50px] focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <input
                          type="tel"
                          autoComplete="tel"
                          value={quickPhone}
                          onChange={(e) => {
                            setQuickPhone(formatQuickPhone(e.target.value));
                            if (quickError) setQuickError(null);
                          }}
                          placeholder="Phone Number (973) 555-0123 *"
                          aria-label="Phone Number"
                          maxLength={25}
                          className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/15 focus:border-primary text-white placeholder:text-white/45 text-sm min-h-[50px] focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                          Office:
                        </span>
                        {QUIZ_OFFICES.map((off) => {
                          const active = quickOffice === off.value;
                          return (
                            <button
                              key={off.label}
                              type="button"
                              onClick={() => setQuickOffice(off.value)}
                              className={`px-3.5 py-2 rounded-lg text-xs font-bold border transition-all min-h-[40px] touch-manipulation ${
                                active
                                  ? 'bg-primary/20 border-primary text-primary'
                                  : 'bg-white/[0.03] border-white/15 text-white/80 hover:border-primary/50'
                              }`}
                            >
                              {off.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-1">
                        <button
                          type="submit"
                          disabled={quickSubmitting}
                          className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-[#000000] font-extrabold text-sm sm:text-base hover:bg-accent transition-all min-h-[52px] touch-manipulation shadow-[0_4px_20px_rgba(197,160,89,0.3)] disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        >
                          <Icon name="CalendarDaysIcon" size={18} className="text-black shrink-0" />
                          <span>
                            {quickSubmitting
                              ? 'Requesting Callback...'
                              : `Request My ${result.name} Callback`}
                          </span>
                          <Icon
                            name="ArrowRightIcon"
                            size={16}
                            className="text-black shrink-0 transition-transform group-hover:translate-x-1"
                          />
                        </button>

                        <a
                          href="tel:9733220100"
                          suppressHydrationWarning
                          onClick={() =>
                            trackPhoneClick(`Quiz Result Call: ${result.name}`, '(973) 322-0100')
                          }
                          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-primary/45 bg-primary/10 hover:bg-primary/20 text-white font-bold text-sm transition-all min-h-[52px] touch-manipulation whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        >
                          <Icon name="PhoneIcon" size={16} className="text-primary shrink-0" />
                          <span>
                            Call <span suppressHydrationWarning>(973) 322-0100</span>
                          </span>
                        </a>
                      </div>
                    </form>
                  )}
                </div>

                {/* Secondary Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-white font-semibold py-2 min-h-[40px] touch-manipulation"
                  >
                    <Icon name="ArrowPathIcon" size={14} />
                    Retake Quiz
                  </button>

                  <a
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('select-lens', { detail: result.key }));
                      try {
                        sessionStorage.setItem('preselect-lens', result.key);
                      } catch {
                        // ignore
                      }
                      trackEvent({
                        action: 'quiz_schedule_now_click',
                        category: 'Conversion',
                        label: result.name,
                      });
                      smoothScrollToElement('booking');
                      window.history.pushState(null, '', '#booking');
                    }}
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 py-2 min-h-[40px] touch-manipulation"
                  >
                    <span>Prefer the full consultation form?</span>
                    <span aria-hidden="true">&darr;</span>
                  </a>
                </div>
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
