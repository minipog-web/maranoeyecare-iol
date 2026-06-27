'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    concern: 'Glasses dependency after surgery',
    quote:
      "Dr. Marano is simply the best in his field. I've been a patient for 25 years and have never felt rushed or unheard. After my PanOptix surgery, I haven't touched my glasses once — and it's been over 2 years.",
    name: 'Patricia W.',
    location: 'Denville, NJ',
    lens: 'PanOptix Pro',
    lensColor: '#8B5CF6',
    avatar: '/assets/images/avatar_patricia.jpg',
    stars: 5,
  },
  {
    concern: 'Night driving halos',
    quote:
      'I was nervous about halos at night because I drive a lot. Dr. Marano recommended Vivity and the results exceeded every expectation. Night driving is completely clear.',
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
      "I have a bone to pick with Dr. Marano. He recommended the Clareon Vivity lens, and yes, my cataracts are gone and my vision is crystal clear. But now I can see every single wrinkle on my face and all the dust on my walls that I happily ignored for years. I've spent more time cleaning and buying anti-aging creams than enjoying my new sight. A blessing, but a lot of work!",
    name: 'Eleanor R.',
    location: 'Denville, NJ',
    lens: 'Clareon Vivity',
    lensColor: '#c5a059',
    avatar: '/assets/images/avatar_patricia.jpg',
    stars: 5,
  },
  {
    concern: 'Dashboard and screen blur',
    quote:
      "I chose Eyhance because I wanted clear distance vision for golf and driving, and didn't want any night glare. The intermediate range is an amazing bonus. I can read my dashboard and laptop without glasses perfectly.",
    name: 'Linda M.',
    location: 'Morristown, NJ',
    lens: 'Tecnis Eyhance',
    lensColor: '#00A3FF',
    avatar: '/assets/images/avatar_linda.jpg',
    stars: 5,
  },
  {
    concern: 'Constant reading with glasses',
    quote:
      "As a teacher, I am constantly reading student essays and working on screens. Getting the PanOptix trifocal completely changed my day. I don't carry readers around anymore, and my night vision is wonderfully sharp.",
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
      "I chose a standard monofocal lens to save on cost, thinking I wouldn't mind reading glasses. I was wrong. The constant cycle of taking my readers on and off to look at my phone, type, or check a menu is exhausting. I truly wish I had invested in Vivity or PanOptix for visual freedom.",
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

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect = rect;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    let rect = (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect;
    if (!rect) {
      rect = e.currentTarget.getBoundingClientRect();
      (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect = rect;
    }
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    delete (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect;
  };

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackRef.current?.style.setProperty('--carousel-offset', `${activeIndex * 100}%`);
  }, [activeIndex]);

  return (
    <section
      id="testimonials"
      className="py-12 sm:py-20 border-t border-border relative overflow-hidden bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-lines-bg opacity-25" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px] pointer-events-none" />

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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-2 lg:-translate-x-4 w-10 h-10 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeftIcon" size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-2 lg:translate-x-4 w-10 h-10 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>

            {/* Carousel Viewport */}
            <div className="overflow-hidden rounded-3xl">
              <div ref={trackRef} className={styles.carouselTrack}>
                {testimonials?.map((t, idx) => (
                  <div key={idx} className="w-full shrink-0 px-2">
                    <div
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
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
                                : styles.spotlightEyhance
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
                                  : styles.lensEyhance
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
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
                    &ldquo;If I were choosing a lens for myself or my family, I&apos;d want the
                    Clareon Vivity. It gives the most natural vision with the fewest side effects
                    for most patients. But the truth is, no single lens is right for everyone —
                    which is exactly why I spend time getting to know every patient before I make
                    any recommendation. The right lens depends on <em>how you live</em>.&rdquo;
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
                      {['15× NJ Top Doctor', 'Chief of Ophthalmology'].map((b) => (
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
                  phone: '973-358-0416',
                  address: '16 Pocono Rd, Suite 301, Denville, NJ 07834',
                },
                {
                  city: 'Livingston',
                  phone: '973-322-0100',
                  address: '200 South Orange Ave, Suite 209, Livingston, NJ 07039',
                },
                {
                  city: 'Newark',
                  phone: '973-315-6439',
                  address: '306 Martin L. King Blvd, Newark, NJ 07102',
                },
              ]?.map((loc) => (
                <a
                  key={loc?.city}
                  href={`tel:${loc?.phone?.replace(/-/g, '')}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
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
                    <p className="text-sm font-semibold text-primary group-hover:underline leading-tight">
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
