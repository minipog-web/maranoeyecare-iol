'use client';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import styles from './LifestyleMatchSection.module.css';

const profiles = [
  {
    id: 'active',
    title: 'The Active Professional',
    description:
      "Right now, you're squinting at your phone and reaching for readers 6 times a day. You spend 6+ hours daily on screens, drive frequently, and want to ditch glasses entirely.",
    activities: [
      'Remote work & Zoom calls',
      'Driving day and night',
      'Reading menus and phones',
      'Golf, tennis, or cycling',
    ],
    recommendation: 'PanOptix Pro',
    reason:
      'Trifocal design gives you sharp vision at every distance — from your 27″ monitor to a road sign 200 metres away.',
    image: '/assets/images/profile_active_professional.jpg',
    imageAlt: 'Professional person at bright, well-lit modern office desk with laptop',
    stat: '99% would choose a premium lens again',
  },
  {
    id: 'tech',
    title: 'The Tech-Conscious Patient',
    description:
      'You value excellent distance and computer vision but are concerned about halos or glare, especially at night.',
    activities: [
      'Evening driving (halo-sensitive)',
      'Extended computer use',
      'Outdoor activities in bright light',
      'Occasional reading with glasses is acceptable',
    ],
    recommendation: 'Clareon Vivity',
    reason:
      'X-WAVE™ non-diffractive technology extends your vision range with halo and glare rates nearly identical to a basic monofocal.',
    image: '/assets/images/profile_tech_conscious.jpg',
    imageAlt: 'Person at bright modern workspace with multiple screens',
    stat: '92% report excellent intermediate vision',
  },
  {
    id: 'conservative',
    title: 'The Conservative Candidate',
    description:
      'You have mild eye conditions or simply want the most predictable outcome with zero visual disturbances.',
    activities: [
      'Distance vision is the top priority',
      'Comfortable using reading glasses for close tasks',
      'Sensitive to any optical side effects',
      'History of dry eye or retinal conditions',
    ],
    recommendation: 'Tecnis Eyhance',
    reason:
      'Ring-free optic design means zero added halos or glare — with meaningful intermediate improvement over standard monofocal.',
    image: '/assets/images/profile_conservative_candidate.jpg',
    imageAlt: 'Mature adult reading outdoors in bright sunlight',
    stat: 'Over 90% distance satisfaction rate',
  },
];

export default function LifestyleMatchSection() {
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="lifestyle" className="py-12 sm:py-20 relative overflow-hidden bg-card">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-bg opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-16 mb-8 sm:mb-12">
          <div className="w-full lg:w-1/2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
              Find Your Match
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-5 sm:mb-6">
              Find Your <span className="font-semibold text-gradient-primary">Perfect Lens.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-7 sm:mb-8 text-sm sm:text-base max-w-lg">
              The best IOL isn&apos;t the most expensive — it&apos;s the one matched precisely to
              how you live. Dr. Marano spends time understanding your daily vision needs before
              recommending any lens.
            </p>
            <a
              href="#booking"
              className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-accent transition-all hover:scale-[1.03] active:scale-95 touch-manipulation min-h-[52px] shadow-[0_4px_24px_rgba(197,160,89,0.35),0_2px_4px_rgba(0,0,0,0.15)] btn-shimmer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              Book Your Assessment
              <Icon name="ArrowRightIcon" size={16} />
            </a>
          </div>

          {/* Right: comparison card */}
          <div className="w-full lg:w-1/2 flex items-start lg:justify-end">
            <div
              className={`glass-card border border-border rounded-3xl p-5 sm:p-8 w-full lg:max-w-md ${styles.comparisonCard}`}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5 sm:mb-6">
                Standard Monofocal vs. Premium IOL
              </p>
              <div className="flex flex-col">
                {[
                  { label: 'Distance', standard: true, premium: true },
                  { label: 'Intermediate (screens)', standard: false, premium: true },
                  { label: 'Near (reading)', standard: false, premium: true },
                  { label: 'Covered by insurance', standard: true, premium: false },
                  { label: 'Glasses-free lifestyle', standard: false, premium: true },
                ]?.map((row) => (
                  <div
                    key={row?.label}
                    className="flex items-center justify-between py-3.5 border-b border-border/60 last:border-0 gap-2"
                  >
                    <span className="text-xs sm:text-sm text-muted-foreground flex-1 min-w-0 pr-2">
                      {row?.label}
                    </span>
                    <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                      <div className="text-center w-12 sm:w-14">
                        <span className="text-[10px] text-muted-foreground block mb-1.5 uppercase tracking-wide">
                          Standard
                        </span>
                        {row?.standard ? (
                          <Icon name="CheckCircleIcon" size={18} className="text-primary mx-auto" />
                        ) : (
                          <Icon name="XCircleIcon" size={18} className="text-red-500/50 mx-auto" />
                        )}
                      </div>
                      <div className="text-center w-12 sm:w-14">
                        <span className="text-[10px] text-primary block mb-1.5 uppercase tracking-wide">
                          Premium
                        </span>
                        {row?.premium ? (
                          <Icon name="CheckCircleIcon" size={18} className="text-primary mx-auto" />
                        ) : (
                          <Icon name="XCircleIcon" size={18} className="text-red-500/50 mx-auto" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Integrated Footnote Callout */}
              <div className="mt-6 pt-5 border-t border-border/60 flex items-start gap-2.5">
                <Icon
                  name="InformationCircleIcon"
                  size={16}
                  className="text-primary/70 shrink-0 mt-0.5"
                />
                <p className="text-[11px] text-muted-foreground/75 leading-relaxed">
                  Premium lenses are an investment — typically $4,100 per eye beyond insurance. Most
                  patients report it&apos;s the best investment they&apos;ve ever made in their
                  vision.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {profiles?.map((profile) => (
            <a
              key={profile?.id}
              href="#booking"
              onMouseMove={handleMouseMove}
              onClick={() => {
                let lensKey = '';
                if (profile?.id === 'active') lensKey = 'panoptix';
                else if (profile?.id === 'tech') lensKey = 'vivity';
                else if (profile?.id === 'conservative') lensKey = 'eyhance';
                if (lensKey) {
                  window.dispatchEvent(new CustomEvent('select-lens', { detail: lensKey }));
                }
              }}
              className={`group relative doppel-shell transition-spring hover:-translate-y-2 cursor-pointer flex flex-col focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f16] focus-visible:outline-none ${styles.profileCard} ${styles[`profile${profile?.id.charAt(0).toUpperCase() + profile?.id.slice(1)}`]}`}
            >
              <div className="w-full h-full flex flex-col bg-muted/90 rounded-[calc(2rem-6px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative">
                {/* Dynamic Mouse Spotlight Glow */}
                <div
                  className={`absolute pointer-events-none rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-[80px] z-0 will-change-transform ${styles.spotlight}`}
                />

                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden z-10 border-b border-white/[0.05]">
                  <AppImage
                    src={profile?.image}
                    alt={profile?.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1018]/95 via-[#0E1018]/25 to-transparent" />

                  {/* Recommendation badge */}
                  <div
                    className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-sm ${styles.recommendationBadge}`}
                  >
                    → {profile?.recommendation}
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-5 sm:p-6 flex flex-col flex-1 z-10">
                  <h3 className="font-display text-lg sm:text-xl font-medium text-foreground mb-2">
                    {profile?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5">
                    {profile?.description}
                  </p>

                  <ul className="space-y-2 mb-5 sm:mb-6 flex-1">
                    {profile?.activities?.map((act) => (
                      <li
                        key={act}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${styles.activityDot}`}
                        />
                        {act}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border/60 pt-4 sm:pt-5">
                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.18em] mb-2 ${styles.recommendationLabel}`}
                    >
                      Our Recommendation
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                      {profile?.reason}
                    </p>
                    <p className={`text-xs font-semibold ${styles.recommendationStat}`}>
                      {profile?.stat}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
