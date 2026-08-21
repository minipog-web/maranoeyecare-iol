'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import styles from './TestimonialsSection.module.css';
import { handleSpotlightMouseMove } from '@/lib/ui';

const testimonials = [
  {
    concern: 'Glasses dependency after surgery',
    quote:
      "When Dr. Marano told me I needed cataract surgery, I was honestly anxious. But he has been looking after my family's eyes for decades. He suggested the PanOptix trifocal. Two years later, I bake with my grandkids, read recipes off my iPad, and drive home after dark without once digging through my purse for readers.",
    name: 'Patricia W.',
    location: 'Denville, NJ',
    lens: 'PanOptix Pro',
    lensColor: '#8B5CF6',
    avatar: '/assets/images/avatar_patricia.jpg',
    stars: 5,
  },
  {
    concern: 'Night driving glare and highway commute',
    quote:
      'My biggest worry was night driving on Route 24. With my old cataracts, oncoming high beams were blinding halos. Dr. Marano explained why the Vivity or PureSee optics would protect my contrast sensitivity. I chose the Vivity because it was the more proven lens. Night driving feels just like it did thirty years ago, and my dashboard is crystal clear.',
    name: 'Robert D.',
    location: 'Livingston, NJ',
    lens: 'Clareon Vivity',
    lensColor: '#c5a059',
    avatar: '/assets/images/avatar_robert.jpg',
    stars: 5,
  },
  {
    concern: 'Seeing every tiny detail',
    quote:
      'I have a bone to pick with Dr. Marano. He put the Clareon Vivity lenses in my eyes, and yes, my cataracts are gone and everything looks vivid. But now I can see every single wrinkle on my face and every speck of dust on the baseboards that I happily ignored for fifteen years! It is a genuine blessing, but nobody warned me about the extra vacuuming.',
    name: 'Eleanor R.',
    location: 'Denville, NJ',
    lens: 'Clareon Vivity',
    lensColor: '#c5a059',
    avatar: '/assets/images/avatar_patricia.jpg',
    stars: 5,
  },
  {
    concern: 'Golf ball tracking and scorecard clarity',
    quote:
      'Tracking a golf ball against an overcast sky used to be impossible for me. I went with the PureSee lens because I wanted crisp distance on the fairway without any glare around the clubhouse lights in the evening. Now I can track my drive off the tee and write my scorecard without switching to bifocals.',
    name: 'Linda M.',
    location: 'Morristown, NJ',
    lens: 'TECNIS PureSee',
    lensColor: '#00A3FF',
    avatar: '/assets/images/avatar_linda.jpg',
    stars: 5,
  },
  {
    concern: 'Grading papers and constant book reading',
    quote:
      "I teach high school English, so my day is spent grading essays on a laptop and reading small print in vintage paperbacks. Before surgery, I kept four separate pairs of reading glasses in my classroom, car, and jacket pockets. The PanOptix lens gave me total freedom. I haven't worn a pair of reading glasses to school since the week after my procedure.",
    name: 'James K.',
    location: 'Summit, NJ',
    lens: 'PanOptix Pro',
    lensColor: '#8B5CF6',
    avatar: '/assets/images/avatar_james.jpg',
    stars: 5,
  },
  {
    concern: "Only what's covered by insurance",
    quote:
      "I tried to be frugal and stuck with the standard lens because Medicare paid for it in full. Big mistake. Having to put glasses on to read a text message, check a menu, or read the price on a grocery shelf is a constant hassle. If you have the option to upgrade to Vivity or PanOptix, take it. Don't make the compromise I did.",
    name: 'Harvey S.',
    location: 'West Orange, NJ',
    lens: 'Standard Monofocal',
    lensColor: '#64748B',
    avatar: '/assets/images/avatar_harvey.png',
    stars: 4,
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  // Auto-advance every 7s, paused on hover
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackRef.current?.style.setProperty('--carousel-offset', `${activeIndex * 100}%`);
  }, [activeIndex]);

  return (
    <section
      id="testimonials"
      className="py-12 sm:py-20 border-t border-border relative overflow-hidden bg-[#08090c]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(197,160,89,0.06)_0%,transparent_70%)]" />
      <div className="absolute inset-0 grid-lines-bg opacity-15" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Testimonials */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 text-center">
            Patient Voices
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground text-center mb-10 sm:mb-14 leading-tight">
            Real Outcomes from{' '}
            <span className="font-semibold text-gradient-primary">Real Patients</span>
          </h2>

          <div className="relative max-w-3xl mx-auto px-1 sm:px-12">
            {/* Desktop floating arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-2 lg:-translate-x-4 w-11 h-11 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeftIcon" size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-2 lg:translate-x-4 w-11 h-11 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>

            {/* Carousel Viewport */}
            <div className="overflow-hidden rounded-3xl">
              <div ref={trackRef} className={styles.carouselTrack}>
                {testimonials.map((t, idx) => (
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

                        {/* Decorative quote mark */}
                        <div className="absolute top-4 right-6 sm:top-6 sm:right-8 font-display text-7xl sm:text-8xl text-primary/6 font-bold leading-none select-none pointer-events-none z-10">
                          &ldquo;
                        </div>

                        {/* Concern label */}
                        {t.concern && (
                          <div className="flex items-center gap-2 mb-3 relative z-10">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full">
                              Was worried about: {t.concern}
                            </span>
                          </div>
                        )}

                        {/* Stars */}
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

                        <p className="text-sm sm:text-base text-foreground/85 leading-relaxed mb-6 italic relative z-10">
                          &ldquo;{t?.quote}&rdquo;
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

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-0.5 mt-4">
              {testimonials.map((_, idx) => (
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

          {/* Dr. Marano's Recommendation Card — Authority Bias + Pratfall Effect */}
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
                {/* Dr. Marano Profile Photo */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-primary/30 shrink-0 shadow-[0_0_15px_rgba(197, 160, 89,0.2)]">
                  <AppImage
                    src="/assets/images/marano_thumbnail.png"
                    alt="Dr. Matthew Marano Jr., MD"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 64px, 80px"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed italic mb-5 sm:mb-6">
                    &ldquo;By far, the most meaningful and rewarding experience as an eye surgeon is
                    hearing back from patients about the life-liberating visual restoration they
                    experience after cataract surgery. Seeing someone regain effortless clarity and
                    independence—whether that means driving comfortably at night or seeing their loved
                    ones without hunting for glasses—is what makes this work so special. If I were
                    choosing a lens for myself or my own family, I would personally choose the Clareon
                    Vivity with the LENSAR 3D laser system for its extraordinary precision and comfort.
                    But no single lens fits every life. That is why I sit down with every patient to
                    understand your daily routines, hobbies, and work first. Your eyes, and how you
                    live, guide the decision.&rdquo;
                  </p>

                  <div className="flex items-center gap-4 flex-wrap">
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Dr. Matthew Marano Jr., MD
                      </p>
                      <p className="text-xs text-primary mt-0.5 font-medium">
                        Board-Certified Ophthalmologist
                      </p>
                      <p className="text-[11px] text-primary mt-0.5 font-medium">
                        40,000+ Cataract Surgeries Completed
                      </p>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {[
                        '15× NJ Top Doctor',
                        "Chief of Ophthalmology (Cooperman Barnabas & St. Michael's Medical Center)",
                      ].map((b) => (
                        <span
                          key={b}
                          className="text-[10px] font-semibold text-muted-foreground bg-white/[0.05] border border-border px-2.5 py-1 rounded-full"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className={`mt-10 sm:mt-12 pt-8 sm:pt-10 ${styles.locationsWrapper}`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-4 sm:mb-6 text-center">
              Three Convenient New Jersey Locations
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                {
                  city: 'Denville',
                  phone: '(973) 358-0416',
                  address: '16 Pocono Rd, Suite 301, Denville, NJ 07834',
                },
                {
                  city: 'Livingston',
                  phone: '(973) 322-0100',
                  address: '200 South Orange Ave, Suite 209, Livingston, NJ 07039',
                },
                {
                  city: 'Newark',
                  phone: '(973) 315-6439',
                  address: '306 Martin L. King Blvd, Newark, NJ 07102',
                },
              ].map((loc) => (
                <a
                  key={loc.city}
                  href={`tel:${loc.phone.replace(/[()\s-]/g, '')}`}
                  suppressHydrationWarning
                  onMouseMove={handleSpotlightMouseMove}
                  className="relative overflow-hidden flex items-center gap-4 glass-card border border-border rounded-3xl p-4 sm:p-5 card-hover-glow group touch-manipulation min-h-[72px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  {/* Dynamic Mouse Spotlight Glow */}
                  <div
                    className={`${styles.spotlight} ${styles.spotlightSm} ${styles.blur50} ${styles.spotlightPrimary} group-hover:opacity-10`}
                  />

                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors z-10">
                    <Icon name="PhoneIcon" size={18} className="text-primary" />
                  </div>
                  <div className="z-10 flex flex-col gap-0.5">
                    <p className="text-sm font-bold text-foreground leading-tight">{loc?.city}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1 leading-normal">
                      {loc?.address}
                    </p>
                    <p
                      className="text-sm font-semibold text-primary group-hover:underline leading-tight"
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
    </section>
  );
}
