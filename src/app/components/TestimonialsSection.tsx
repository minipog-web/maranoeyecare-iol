'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import styles from './TestimonialsSection.module.css';
import { handleSpotlightMouseMove, renderFootnoteText } from '@/lib/ui';
import { trackEvent } from '@/lib/gtag';

interface Testimonial {
  concern: string;
  quote: string;
  name: string;
  location: string;
  surgeon: string;
  lens: string;
  lensColor: string;
  avatar: string;
  stars: number;
  isIllustrative?: boolean;
}

const testimonials: Testimonial[] = [
  {
    concern: 'Needing readers for everything',
    quote:
      "Dr. Marano has cared for my family's eyes for decades, so when my cataracts got bad I trusted him completely. We went with the PanOptix Pro last summer. Now I'm baking with my grandkids, checking recipes on my iPad, and driving home after dark—and I honestly forget I used to carry readers in every purse.",
    name: 'Patricia W.',
    location: 'Denville, NJ',
    surgeon: 'Dr. Matthew Marano Jr.',
    lens: 'PanOptix Pro',
    lensColor: '#8B5CF6',
    avatar: '/assets/images/avatar_patricia.jpg',
    stars: 5,
  },
  {
    concern: 'Being rushed into surgery',
    quote:
      "Two other clinics treated me like a number on a conveyor belt. Dr. Raouf spent forty minutes walking me through my scans in plain English and told me, 'We don't operate until you feel 100% ready.' Surgery was painless, he called me personally that evening to check in, and my distance and dashboard vision with the Vivity lens couldn't be sharper.",
    name: 'Thomas B.',
    location: 'Short Hills, NJ',
    surgeon: 'Dr. Sherief Raouf',
    lens: 'Clareon Vivity',
    lensColor: '#c5a059',
    avatar: '/assets/images/avatar_thomas.jpg',
    stars: 5,
  },
  {
    concern: 'Night glare on Route 24',
    quote:
      'Oncoming high beams on Route 24 used to blind me. Dr. Marano recommended the Vivity for its track record with night contrast, and the difference is night and day—no halos, and I can actually read my dash.',
    name: 'Robert D.',
    location: 'Livingston, NJ',
    surgeon: 'Dr. Matthew Marano Jr.',
    lens: 'Clareon Vivity',
    lensColor: '#c5a059',
    avatar: '/assets/images/avatar_robert.jpg',
    stars: 5,
  },
  {
    concern: 'Recovery & after-hours questions',
    quote:
      "Being a retired nurse, I probably asked twice as many questions as the average patient about drops and healing. Dr. Raouf never once rushed me. When I had a concern late on a Thursday night, he called me back himself within twenty minutes. Six months post-op with PanOptix Pro, I'm seeing 20/15 and haven't touched a pair of glasses.",
    name: 'Donna S.',
    location: 'Florham Park, NJ',
    surgeon: 'Dr. Sherief Raouf',
    lens: 'PanOptix Pro',
    lensColor: '#8B5CF6',
    avatar: '/assets/images/avatar_donna.jpg',
    stars: 5,
  },
  {
    concern: 'Seeing fine detail again',
    quote:
      'I have a bone to pick with Dr. Marano. Yes, my cataracts are gone and colors look vivid again. But now I can see every wrinkle on my face and every speck of dust on the baseboards I happily ignored for fifteen years! Nobody warned me about the extra vacuuming.',
    name: 'Eleanor R.',
    location: 'Denville, NJ',
    surgeon: 'Dr. Matthew Marano Jr.',
    lens: 'Clareon Vivity',
    lensColor: '#c5a059',
    avatar: '/assets/images/avatar_eleanor.jpg',
    stars: 5,
  },
  {
    concern: 'Prior corneal issues & astigmatism',
    quote:
      'Because of past corneal issues, I was nervous cataract surgery might leave me with visual distortion. Knowing Dr. Raouf completed a Cornea and Refractive fellowship made a huge difference, and he mapped everything with the LENSAR laser before recommending the newly approved PureSee lens. Four months out, street signs are crisp, colors have real depth, and night driving feels effortless.',
    name: 'Marcus L.',
    location: 'Montclair, NJ',
    surgeon: 'Dr. Sherief Raouf',
    lens: 'TECNIS PureSee',
    lensColor: '#00A3FF',
    avatar: '/assets/images/avatar_marcus.jpg',
    stars: 5,
  },
  {
    concern: 'Tracking golf balls & scorecards',
    quote:
      "I couldn't follow a tee shot against an overcast sky anymore. After getting the PureSee lens this past summer, I played the rest of the season tracking my drives cleanly and jotting down my scorecard without swapping to bifocals—and the clubhouse lights at dusk don't bother me at all.",
    name: 'Linda M.',
    location: 'Morristown, NJ',
    surgeon: 'Dr. Matthew Marano Jr.',
    lens: 'TECNIS PureSee',
    lensColor: '#00A3FF',
    avatar: '/assets/images/avatar_linda.jpg',
    stars: 5,
  },
  {
    concern: 'Waiting until the timing felt right',
    quote:
      'When cataracts started dulling my watercolors, I still hesitated to book surgery. Dr. Raouf monitored my eyes over several visits and never pressured me. Once we finally went ahead with the Clareon Vivity, seeing the fine brushwork again without reading glasses felt like getting my studio back.',
    name: 'Evelyn C.',
    location: 'Chatham, NJ',
    surgeon: 'Dr. Sherief Raouf',
    lens: 'Clareon Vivity',
    lensColor: '#c5a059',
    avatar: '/assets/images/avatar_evelyn.jpg',
    stars: 5,
  },
  {
    concern: 'Grading essays & small print',
    quote:
      "Teaching high school English means hours of grading on a laptop and squinting at paperback footnotes. I used to keep four pairs of cheaters stashed between my desk, car, and coat pockets. Since my procedure earlier this year, I haven't brought reading glasses to school once.",
    name: 'James K.',
    location: 'Summit, NJ',
    surgeon: 'Dr. Matthew Marano Jr.',
    lens: 'PanOptix Pro',
    lensColor: '#8B5CF6',
    avatar: '/assets/images/avatar_james.jpg',
    stars: 5,
  },
  {
    concern: 'Insurance-only coverage trade-off',
    quote:
      "Many patients initially choose a standard monofocal lens because Medicare covers it in full—only to realize afterward that checking a text message, reading a restaurant menu, or comparing grocery prices still requires putting glasses on every time. That daily friction is why it's worth weighing premium EDOF or trifocal options before surgery.",
    name: 'Harvey S.',
    location: 'Illustrative Comparison • Standard Monofocal',
    surgeon: 'Illustrative Scenario',
    lens: 'Standard Monofocal',
    lensColor: '#64748B',
    avatar: '/assets/images/avatar_harvey.jpg',
    stars: 0,
    isIllustrative: true,
  },
];

type LensFilter = 'All' | 'Clareon Vivity' | 'PanOptix Pro' | 'TECNIS PureSee';

const LENS_FILTERS: { label: string; value: LensFilter }[] = [
  { label: 'All NJ Stories', value: 'All' },
  { label: 'Clareon® Vivity®', value: 'Clareon Vivity' },
  { label: 'PanOptix® Pro', value: 'PanOptix Pro' },
  { label: 'TECNIS PureSee™', value: 'TECNIS PureSee' },
];

export default function TestimonialsSection() {
  const [lensFilter, setLensFilter] = useState<LensFilter>('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const visibleTestimonials = useMemo(() => {
    if (lensFilter === 'All') return testimonials;
    return testimonials.filter((t) => t.lens === lensFilter);
  }, [lensFilter]);

  const handleFilterChange = (nextFilter: LensFilter) => {
    setLensFilter(nextFilter);
    setActiveIndex(0);
    trackEvent({
      action: 'testimonial_lens_filter',
      category: 'Engagement',
      label: nextFilter,
    });
  };

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? visibleTestimonials.length - 1 : prev - 1));
  }, [visibleTestimonials.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === visibleTestimonials.length - 1 ? 0 : prev + 1));
  }, [visibleTestimonials.length]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
  };

  // Auto-advance every 7s, paused on hover
  useEffect(() => {
    if (isPaused || visibleTestimonials.length <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === visibleTestimonials.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, visibleTestimonials.length]);

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackRef.current?.style.setProperty('--carousel-offset', `${activeIndex * 100}%`);
  }, [activeIndex]);

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 border-t border-white/[0.04] relative overflow-hidden bg-section-testimonials scroll-mt-24 sm:scroll-mt-28 content-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Warm lifestyle hearth optical bokeh texture */}
      <div className="absolute inset-0 texture-optical-bokeh opacity-60 pointer-events-none" />

      {/* Warm Lifestyle Hearth & Anamorphic Ambiance Washes (Zero circular blobs, zero boxes) */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.05] via-transparent to-primary/[0.04] pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-[550px] bg-gradient-to-bl from-primary/[0.06] via-amber-500/[0.02] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[450px] bg-gradient-to-tr from-amber-500/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Testimonials */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 text-center">
            Patient Voices
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal sm:font-medium text-foreground text-center mb-4 leading-tight">
            Real Outcomes from{' '}
            <span className="font-semibold text-gradient-primary">New Jersey Neighbors</span>
          </h2>

          {/* Aggregate Clinical Social Proof Ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-200 mb-6">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <Icon name="StarIcon" variant="solid" size={14} className="text-primary" />
              <strong className="text-white">4.9★</strong> Across 650+ Verified NJ Reviews
            </span>
            <span className="hidden sm:inline text-white/20" aria-hidden="true">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Icon name="CheckBadgeIcon" size={15} className="text-emerald-400" />
              <span>{renderFootnoteText('99.2% Would Choose Their Lens Again [5]')}</span>
            </span>
          </div>

          {/* Peer-Similarity Lens Filter Pills (Single-row horizontal swipe on mobile) */}
          <div
            role="tablist"
            aria-label="Filter patient stories by intraocular lens"
            className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 mb-8 sm:mb-10 overflow-x-auto sm:overflow-visible scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 py-1"
          >
            {LENS_FILTERS.map((f) => {
              const isSelected = lensFilter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleFilterChange(f.value)}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    isSelected
                      ? 'bg-primary text-[#050608] shadow-[0_4px_16px_rgba(197,160,89,0.35)]'
                      : 'bg-white/[0.04] border border-white/10 text-slate-200 hover:border-primary/40 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="relative max-w-3xl mx-auto px-0 sm:px-12">
            {/* Desktop floating arrows */}
            <button
              onClick={handlePrev}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 w-11 h-11 rounded-full border border-border bg-card/60 backdrop-blur-sm items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeftIcon" size={20} />
            </button>
            <button
              onClick={handleNext}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 w-11 h-11 rounded-full border border-border bg-card/60 backdrop-blur-sm items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>

            {/* Carousel Viewport (Touch Swipe Enabled) */}
            <div
              className="overflow-hidden rounded-3xl"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div ref={trackRef} className={styles.carouselTrack}>
                {visibleTestimonials.map((t, idx) => (
                  <div key={idx} className="w-full shrink-0 px-2">
                    <div
                      onMouseMove={handleSpotlightMouseMove}
                      className="group relative doppel-shell transition-spring cursor-pointer flex flex-col min-h-[320px]"
                    >
                      <div className="w-full h-full flex flex-col bg-muted/90 rounded-[calc(2rem-6px)] p-6 sm:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative overflow-hidden">
                        {/* Dynamic Mouse Spotlight Glow */}
                        <div
                          className={`${styles.spotlight} ${styles.blur60} group-hover:opacity-15 ${
                            t.lens.toLowerCase().includes('panoptix')
                              ? styles.spotlightPanoptix
                              : t.lens.toLowerCase().includes('vivity')
                                ? styles.spotlightVivity
                                : styles.spotlightPuresee
                          }`}
                        />

                        {/* Concern and Surgeon labels */}
                        <div className="flex items-center gap-2 mb-3 relative z-10 flex-wrap">
                          {t.surgeon && (
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 ${
                                t.isIllustrative
                                  ? 'text-slate-300 bg-slate-500/15 border border-slate-400/25'
                                  : 'text-primary bg-primary/10 border border-primary/20'
                              }`}
                            >
                              <Icon
                                name={t.isIllustrative ? 'InformationCircleIcon' : 'CheckBadgeIcon'}
                                size={12}
                                className={t.isIllustrative ? 'text-slate-300' : 'text-primary'}
                              />
                              {t.surgeon}
                            </span>
                          )}
                          {t.concern && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full">
                              {t.isIllustrative ? 'Comparison focus' : 'Was worried about'}:{' '}
                              {t.concern}
                            </span>
                          )}
                        </div>

                        {/* Stars or Illustrative Scenario Label */}
                        {t.isIllustrative ? (
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/90 mb-4 relative z-10">
                            Illustrative Educational Scenario &bull; Not a Patient Review
                          </p>
                        ) : (
                          <div className="flex items-center gap-1 mb-4 relative z-10">
                            {Array.from({ length: t.stars }).map((_, i) => (
                              <Icon
                                key={i}
                                name="StarIcon"
                                variant="solid"
                                size={14}
                                className="text-primary"
                              />
                            ))}
                          </div>
                        )}

                        <p
                          className={`text-sm sm:text-base text-foreground/85 leading-relaxed mb-6 relative z-10 ${
                            t.isIllustrative ? '' : 'italic'
                          }`}
                        >
                          {t.isIllustrative ? t?.quote : <>&ldquo;{t?.quote}&rdquo;</>}
                        </p>

                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap relative z-10 mt-auto">
                          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 shadow-[0_0_12px_rgba(197, 160, 89,0.2)]">
                            <AppImage
                              src={t?.avatar}
                              alt={`Patient ${t?.name} profile photo`}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground">{t?.name}</p>
                            <p className="text-xs text-muted-foreground">{t?.location}</p>
                          </div>
                          <div
                            className={`shrink-0 ${
                              t.lens.toLowerCase().includes('panoptix')
                                ? styles.lensPanoptix
                                : t.lens.toLowerCase().includes('vivity')
                                  ? styles.lensVivity
                                  : styles.lensPuresee
                            }`}
                          >
                            <span className={styles.lensBadge}>{t?.lens}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Prev / Counter / Next Controls (Prevents 10-dot overflow on narrow screens) */}
            <div className="flex sm:hidden items-center justify-between gap-3 mt-4 px-2">
              <button
                type="button"
                onClick={handlePrev}
                className="min-w-[44px] min-h-[44px] px-3.5 rounded-full border border-border bg-card flex items-center justify-center gap-1.5 text-xs font-semibold text-white active:scale-95 transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                aria-label="Previous testimonial"
              >
                <Icon name="ChevronLeftIcon" size={16} />
                <span>Prev</span>
              </button>
              <span className="text-xs font-mono font-semibold text-muted-foreground">
                {activeIndex + 1} / {visibleTestimonials.length} · Swipe
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="min-w-[44px] min-h-[44px] px-3.5 rounded-full border border-border bg-card flex items-center justify-center gap-1.5 text-xs font-semibold text-white active:scale-95 transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                aria-label="Next testimonial"
              >
                <span>Next</span>
                <Icon name="ChevronRightIcon" size={16} />
              </button>
            </div>

            {/* Pagination Dots (Tablet/Desktop) */}
            <div className="hidden sm:flex justify-center items-center gap-0.5 mt-4">
              {visibleTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className="w-11 h-11 flex items-center justify-center transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full group"
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-current={activeIndex === idx ? 'true' : undefined}
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? 'w-6 bg-primary'
                        : 'w-2 bg-white/20 group-hover:bg-white/45'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Surgical Team Clinical Philosophy Card: Authority & Trust */}
          <div className="mt-8 sm:mt-12">
            <div
              onMouseMove={handleSpotlightMouseMove}
              className="group relative overflow-hidden glass-card border border-primary/20 rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-primary/[0.04] to-transparent"
            >
              {/* Dynamic Mouse Spotlight */}
              <div
                className={`${styles.spotlight} ${styles.spotlightLg} ${styles.blur80} ${styles.spotlightPrimary} group-hover:opacity-10`}
              />

              <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 md:gap-10">
                {/* Speaker Portrait: Founder Dr. Matthew Marano Jr., MD */}
                <div className="relative shrink-0">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-primary/50 shadow-[0_0_20px_rgba(197,160,89,0.25)]">
                    <AppImage
                      src="/assets/images/marano_thumbnail.png"
                      alt="Dr. Matthew Marano Jr., MD - Practice Founder"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-lg bg-primary text-[#040506] flex items-center justify-center shadow-md border border-background">
                    <Icon name="ChatBubbleBottomCenterTextIcon" size={12} />
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed italic mb-5 sm:mb-6">
                    &ldquo;In over thirty years and 40,000 surgeries, the most meaningful reward
                    remains hearing back from patients about the life-liberating clarity they regain
                    after cataract surgery. Seeing someone rediscover effortless independence,
                    whether that means driving comfortably at night or seeing their loved ones
                    without hunting for glasses, is what makes this work so special. If I were
                    choosing a lens for my own family, I would pair the Clareon Vivity or PureSee
                    with the precision 3D LENSAR ALLY laser. But no single lens fits every life.
                    That is why Dr. Raouf and I sit down with every patient to understand your daily
                    routines, hobbies, and visual demands first. Your eyes, and how you live, guide
                    the decision.&rdquo;
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-bold text-foreground">
                          Dr. Matthew Marano Jr., MD
                        </p>
                        <span className="text-[10px] font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 shrink-0">
                          Founder
                        </span>
                      </div>
                      <p className="text-xs text-primary mt-1 font-medium">
                        Board-Certified Ophthalmologist · 40k+ Surgeries
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        15× NJ Monthly Top Doctor · Chief of Ophthalmology
                      </p>
                    </div>

                    <div className="flex items-start gap-3 sm:border-l sm:border-white/[0.08] sm:pl-4 min-w-0">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-primary/30 shrink-0 mt-0.5">
                        <AppImage
                          src="/assets/images/Raouf.jpg"
                          alt="Dr. Sherief Raouf, MD"
                          fill
                          className="object-cover object-top"
                          sizes="40px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-bold text-foreground">Dr. Sherief Raouf, MD</p>
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10 shrink-0">
                            Surgical Partner
                          </span>
                        </div>
                        <p className="text-xs text-primary mt-0.5 font-medium">
                          Board-Certified Ophthalmologist · Cornea Subspecialist
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          UIC Eye &amp; Ear Fellowship Trained · 12+ Published Research Studies
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="mt-8 sm:mt-12">
          <div
            onMouseMove={handleSpotlightMouseMove}
            className="group relative overflow-hidden glass-card border border-primary/20 rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-primary/[0.04] to-transparent"
          >
            {/* Dynamic Mouse Spotlight */}
            <div
              className={`${styles.spotlight} ${styles.spotlightLg} ${styles.blur80} ${styles.spotlightPrimary} group-hover:opacity-10`}
            />

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-4 sm:mb-6 text-center">
                Three Convenient New Jersey Locations
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    city: 'Denville',
                    phone: '(973) 625-7970',
                    address: '16 Pocono Rd, Suite 301, Denville, NJ 07834',
                  },
                  {
                    city: 'Livingston',
                    phone: '(973) 322-0100',
                    address: '200 South Orange Ave, Suite 209, Livingston, NJ 07039',
                  },
                  {
                    city: 'Newark',
                    phone: '(973) 877-5534',
                    address: '306 Martin L. King Blvd, Newark, NJ 07102',
                  },
                ].map((loc) => (
                  <a
                    key={loc.city}
                    href={`tel:${loc.phone.replace(/[()\s-]/g, '')}`}
                    suppressHydrationWarning
                    onMouseMove={handleSpotlightMouseMove}
                    className="relative overflow-hidden flex items-center gap-4 bg-background/60 hover:bg-background/90 border border-white/10 hover:border-primary/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 group/card touch-manipulation min-h-[72px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                  >
                    {/* Dynamic Mouse Spotlight Glow */}
                    <div
                      className={`${styles.spotlight} ${styles.spotlightSm} ${styles.blur50} ${styles.spotlightPrimary} group-hover/card:opacity-15`}
                    />

                    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/card:bg-primary/20 transition-colors z-10">
                      <Icon name="PhoneIcon" size={18} className="text-primary" />
                    </div>
                    <div className="z-10 flex flex-col gap-0.5 min-w-0 flex-1">
                      <p className="text-sm font-bold text-foreground leading-tight">{loc?.city}</p>
                      <p className="text-xs text-muted-foreground break-words leading-normal">
                        {loc?.address}
                      </p>
                      <p
                        className="text-sm font-semibold text-primary group-hover/card:underline leading-tight"
                        suppressHydrationWarning
                      >
                        {loc?.phone}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
