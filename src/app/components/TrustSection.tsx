import React from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const awards = [
  { value: '15×', label: 'NJ Monthly Top Doctor', sublabel: 'Consecutive years', icon: 'StarIcon' },
  { value: '6×', label: "Int'l Star Diamond Award", sublabel: 'American Academy of Hospitality Sciences', icon: 'TrophyIcon' },
  { value: '2026', label: 'Castle Connolly Top Doc', sublabel: 'National recognition', icon: 'AcademicCapIcon' },
  { value: 'Chief', label: 'of Ophthalmology', sublabel: 'Saint Barnabas Medical Center', icon: 'BuildingOfficeIcon' },
];

const testimonials = [
  {
    quote: "Dr. Marano is simply the best in his field. I've been a patient for 25 years and have never felt rushed or unheard. After my PanOptix surgery, I haven't touched my glasses once.",
    name: 'Patricia W.',
    location: 'Denville, NJ',
    lens: 'PanOptix Pro',
    lensColor: '#7EECD8',
    avatar: 'https://i.pravatar.cc/100?img=44',
    stars: 5,
  },
  {
    quote: "I was nervous about halos at night because I drive a lot. Dr. Marano recommended Vivity and the results exceeded every expectation. Night driving is completely clear.",
    name: 'Robert D.',
    location: 'Livingston, NJ',
    lens: 'Clareon Vivity',
    lensColor: '#00C9B1',
    avatar: 'https://i.pravatar.cc/100?img=52',
    stars: 5,
  },
];

export default function TrustSection() {
  return (
    <section id="trust" className="py-16 sm:py-28 border-t border-border relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-lines-bg opacity-25" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[500px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-primary mb-4 opacity-90">Your Surgeon</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-5 sm:mb-6 leading-tight">
            New Jersey&apos;s{' '}
            <span className="text-gradient-primary font-semibold">Most Decorated</span>
            <br className="hidden sm:block" />
            {' '}Ophthalmologist
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dr. Matthew Marano Jr., MD has been named Top Doctor by NJ Monthly Magazine for 15 consecutive years — the only physician to receive six International Star Diamond Awards.
          </p>
        </div>

        {/* Doctor + Awards layout */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center mb-20 sm:mb-28">
          {/* Left: Photo */}
          <div className="relative pb-10 sm:pb-0">
            <div className="relative rounded-t-[6rem] rounded-b-[2.5rem] overflow-hidden aspect-[3/4] max-w-xs sm:max-w-sm mx-auto group"
              style={{ boxShadow: '0 0 0 1px rgba(0,201,177,0.15), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,201,177,0.08)' }}
            >
              <AppImage
                src="/assets/images/Marano-1777328574709.png"
                alt="Dr. Matthew Marano Jr., MD - Board-Certified Ophthalmologist"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, 400px"
              />

              {/* Layered overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-primary/5" />

              {/* Name plate */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                <p className="font-display text-xl font-medium text-foreground">Matthew Marano Jr., MD</p>
                <p className="text-sm text-primary mt-1 font-medium">Board-Certified Ophthalmologist</p>
              </div>
            </div>

            {/* Floating credential card */}
            <div className="absolute bottom-0 right-4 sm:-bottom-6 sm:-right-4 md:-right-10 w-48 sm:w-52 glass-card-bright rounded-3xl p-4 sm:p-5 shadow-2xl animate-float-delayed">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="StarIcon" size={12} className="text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Top Doctor</span>
              </div>
              <p className="font-display text-2xl font-medium text-foreground">15 Years</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">NJ Monthly Magazine consecutive recognition</p>
            </div>
          </div>

          {/* Right: Awards grid */}
          <div className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {awards?.map((award) => (
                <div
                  key={award?.label}
                  className="glass-card rounded-3xl p-4 sm:p-6 card-hover-glow border border-border group"
                >
                  <div className="w-8 h-8 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon name={award.icon as 'StarIcon'} size={16} className="text-primary" />
                  </div>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-primary mb-2">{award?.value}</p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">{award?.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{award?.sublabel}</p>
                </div>
              ))}
            </div>

            <div className="glass-card border border-border rounded-3xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon name="AcademicCapIcon" size={18} className="text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground">Additional Roles & Training</p>
              </div>
              <ul className="space-y-3">
                {[
                  'Chief Medical Editor — Ophthalmology 360',
                  'Fellowship-trained in cornea and refractive surgery',
                  'Femto laser-assisted cataract surgery specialist',
                  'Three conveniently located NJ offices',
                ]?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_6px_rgba(0,201,177,0.6)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-primary mb-6 sm:mb-10 text-center opacity-90">Patient Voices</p>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {testimonials?.map((t) => (
              <div
                key={t?.name}
                className="glass-card border border-border rounded-3xl p-6 sm:p-8 card-hover-glow relative overflow-hidden group"
              >
                {/* Decorative quote mark */}
                <div className="absolute top-4 right-6 sm:top-6 sm:right-8 font-display text-7xl sm:text-8xl text-primary/6 font-bold leading-none select-none pointer-events-none">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Icon key={i} name="StarIcon" size={14} className="text-primary" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed mb-6 italic relative z-10">
                  &ldquo;{t?.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 shadow-[0_0_12px_rgba(0,201,177,0.2)]">
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
                  <div className="shrink-0">
                    <span
                      className="text-[10px] font-bold px-3 py-1.5 rounded-full inline-block uppercase tracking-widest"
                      style={{
                        backgroundColor: `${t.lensColor}15`,
                        color: t.lensColor,
                        border: `1px solid ${t.lensColor}30`,
                      }}
                    >
                      {t?.lens}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="mt-14 sm:mt-20 pt-10 sm:pt-12" style={{ borderTop: '1px solid transparent', backgroundImage: 'linear-gradient(var(--background), var(--background)), linear-gradient(90deg, transparent, rgba(0,201,177,0.2), transparent)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}>
          <div className="border-t border-border pt-10 sm:pt-12">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-muted-foreground mb-6 sm:mb-8 text-center">Three Convenient New Jersey Locations</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { city: 'Denville', phone: '973-358-0416', address: 'Morris County' },
                { city: 'Livingston', phone: '973-322-0100', address: 'Essex County' },
                { city: 'Newark', phone: '973-315-6439', address: 'Essex County' },
              ]?.map((loc) => (
                <a
                  key={loc?.city}
                  href={`tel:${loc?.phone?.replace(/-/g, '')}`}
                  className="flex items-center gap-4 glass-card border border-border rounded-3xl p-4 sm:p-5 card-hover-glow group touch-manipulation min-h-[72px]"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon name="PhoneIcon" size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{loc?.city}</p>
                    <p className="text-xs text-muted-foreground">{loc?.address}</p>
                    <p className="text-sm font-semibold text-primary mt-0.5 group-hover:underline">{loc?.phone}</p>
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