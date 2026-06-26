'use client';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import styles from './TrustSection.module.css';

const awards = [
  { value: '15×', label: 'NJ Monthly Top Doctor', sublabel: 'Consecutive years', icon: 'StarIcon' },
  {
    value: '6×',
    label: "Int'l Star Diamond Award",
    sublabel: 'American Academy of Hospitality Sciences',
    icon: 'TrophyIcon',
  },
  {
    value: '2024 - 2026',
    label: 'Castle Connolly Top Doc',
    sublabel: 'National recognition',
    icon: 'AcademicCapIcon',
  },
  {
    value: 'Chief of Ophthalmology',
    label: 'Cooperman Barnabas Medical Center',
    sublabel: "St. Michael's Medical Center",
    icon: 'BuildingOfficeIcon',
  },
];

export default function TrustSection() {
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

  return (
    <section id="trust" className="py-12 sm:py-20 relative overflow-hidden bg-secondary">
      {/* Background */}
      <div className="absolute inset-0 grid-lines-bg opacity-25" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[500px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
            Your Surgeon
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-5 sm:mb-6 leading-tight">
            New Jersey&apos;s{' '}
            <span className="font-semibold text-gradient-primary">{`Most Awarded`}</span> Eye
            Surgeon
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dr. Matthew Marano Jr., MD has been named Top Doctor by NJ Monthly Magazine for 15
            consecutive years — the only physician to receive six International Star Diamond Awards.
          </p>
        </div>

        {/* Doctor + Awards layout */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          {/* Left: Photo */}
          <div className="relative pb-10 sm:pb-0">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              className={`relative rounded-t-[6rem] rounded-b-[2.5rem] overflow-hidden aspect-[3/4] max-w-xs sm:max-w-sm mx-auto group ${styles.photoWrapper}`}
            >
              <AppImage
                src="/assets/images/Marano-1777328574709.jpg"
                alt="Dr. Matthew Marano Jr., MD - Board-Certified Ophthalmologist"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-103 z-10"
                sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, 400px"
              />

              {/* Dynamic Mouse Spotlight Glow */}
              <div
                className={`absolute pointer-events-none rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-[60px] z-20 mix-blend-screen will-change-transform ${styles.photoSpotlight}`}
              />

              {/* Layered overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />

              {/* Consistent thin glass border overlay */}
              <div className="absolute inset-0 border border-white/[0.08] rounded-t-[6rem] rounded-b-[2.5rem] pointer-events-none z-35" />

              {/* Name plate */}
              <div className="absolute bottom-0 left-0 w-[75%] p-6 bg-gradient-to-tr from-background via-background/90 to-transparent z-30">
                <p className="font-display text-xl font-medium text-foreground">
                  Matthew Marano Jr., MD
                </p>
                <p className="text-sm text-primary mt-1 font-medium">
                  Board-Certified Ophthalmologist
                </p>
              </div>
            </div>

            {/* Floating credential card */}
            <div className="absolute bottom-0 right-4 sm:-bottom-6 sm:-right-4 md:-right-10 w-48 sm:w-52 glass-card-bright rounded-3xl p-4 sm:p-5 shadow-2xl animate-float-delayed z-40 hidden xs:block">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="StarIcon" size={12} className="text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Top Doctor
                </span>
              </div>
              <p className="font-display text-2xl font-medium text-foreground">15 Years</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">
                NJ Monthly Magazine consecutive recognition
              </p>
            </div>
          </div>

          {/* Right: Awards grid */}
          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-6 sm:gap-y-8">
              {awards?.map((award) => (
                <div
                  key={award?.value}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  className="group relative overflow-hidden glass-card border border-border rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:border-primary/30"
                >
                  {/* Dynamic Mouse Spotlight Glow */}
                  <div
                    className={`absolute pointer-events-none rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-[60px] z-0 will-change-transform ${styles.cardSpotlight}`}
                  />

                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon name={award.icon as 'StarIcon'} size={16} className="text-primary" />
                    </div>
                    <p
                      className={`font-display font-semibold text-primary mb-2 ${
                        award.value.length > 10 ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'
                      }`}
                    >
                      {award?.value}
                    </p>
                    {award.value === 'Chief of Ophthalmology' ? (
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-semibold text-foreground">
                          {award?.label}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-foreground">
                          {award?.sublabel}
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">
                          {award?.label}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {award?.sublabel}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              className="group relative overflow-hidden glass-card border border-border rounded-3xl p-5 sm:p-6"
            >
              {/* Dynamic Mouse Spotlight Glow */}
              <div
                className={`absolute pointer-events-none rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-[60px] z-0 will-change-transform ${styles.cardSpotlight}`}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon name="AcademicCapIcon" size={18} className="text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground">
                    {`Additional Roles`}
                    {` & Training`}
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    'Chief Medical Editor — Ophthalmology 360',
                    'Decades of experience teaching and training fellow refractive surgeons',
                    'Femto laser-assisted cataract surgery specialist',
                    'Three conveniently located NJ offices',
                  ]?.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_6px_rgba(197, 160, 89,0.6)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
