'use client';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import styles from './LifestyleMatchSection.module.css';
import { handleSpotlightMouseMove } from '@/lib/ui';

const profiles = [
  {
    id: 'active',
    title: 'The Active Athlete & Outdoor Explorer',
    description:
      'Engineered for dynamic lifestyles where seamless focus from distance to dashboard and digital screens is vital, without the glare, starbursts, or halo rings associated with traditional multi-focal lenses.',
    activities: [
      'Golf, tennis, pickleball & cycling',
      'Boating, hiking & outdoor recreation',
      'Day and nighttime highway driving',
      'Computer screens & smartphone navigation',
    ],
    recommendation: 'Clareon Vivity',
    reason:
      'Proprietary X-WAVE™ non-diffractive optics stretch light smoothly without splitting it, delivering natural intermediate depth and pristine night-driving comfort.',
    image: '/assets/images/profile_active_professional.jpg',
    imageAlt: 'Active mature athlete enjoying bright outdoor recreation',
    stat: '92% of patients report exceptional intermediate and distance visual comfort [2]',
  },
  {
    id: 'tech',
    title: 'The Avid Reader & Detail Craftsman',
    description:
      'Engineered for maximum daily independence from reading glasses. Delivers sharp clarity at close-up reading range, intermediate computer distance, and far driving vision.',
    activities: [
      'Reading fine print, books & smartphone text',
      'Woodworking, sewing & precision hobbies',
      'Desktop computer & laptop productivity',
      'Daily tasks without searching for reading glasses',
    ],
    recommendation: 'PanOptix Pro',
    reason:
      'Advanced trifocal optics focus light at near (40 cm), intermediate (60 cm), and far distances, enabling 99% of patients to go through their day completely glasses-free.',
    image: '/assets/images/profile_conservative_candidate.jpg',
    imageAlt: 'Avid reader enjoying fine book print comfortably outdoors without glasses',
    stat: '99% of PanOptix patients would choose the same lens again [1]',
  },
  {
    id: 'innovator',
    title: 'The Modern Innovator & Night Driver',
    description:
      'The newest FDA-approved purely refractive EDOF technology. Delivers continuous extended visual depth with zero diffractive rings and a nighttime contrast profile identical to a standard single-focus lens.',
    activities: [
      'Demands the newest optical engineering',
      'Frequent night driving on dark roads',
      'Seamless multi-distance screen lifestyle',
      'Zero tolerance for halo rings or contrast loss',
    ],
    recommendation: 'TECNIS PureSee',
    reason:
      'Refractive zonal optics eliminate dysphotopsia (halos/glare) entirely, delivering continuous clarity from distance through intermediate and functional near vision.',
    image: '/assets/images/day_driving_pro.jpg',
    imageAlt: 'Night driver experiencing crisp high-contrast highway visibility',
    stat: 'First FDA-approved EDOF with zero contrast sensitivity warning [3]',
  },
];

export default function LifestyleMatchSection() {
  return (
    <section id="lifestyle" className="py-16 sm:py-24 relative overflow-hidden bg-[#10131b]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(255,255,255,0.015)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/[0.015] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-16 mb-8 sm:mb-12">
          <div className="w-full lg:w-1/2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
              Find Your Match
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-5 sm:mb-6">
              Find Your <br />
              <span className="font-semibold text-gradient-primary">Perfect Lens.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-7 sm:mb-8 text-sm sm:text-base max-w-lg">
              The ideal lens is not just the most expensive option. It is the one tailored directly
              to how you live, work, and spend your free time. Dr. Marano and Dr. Raouf evaluate
              your visual routine thoroughly before recommending an implant.
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
                Standard Monofocal vs. Premium IOL Comparison
              </p>
              <div className="flex flex-col">
                {[
                  {
                    label: 'Distance vision (driving & television)',
                    standard: true,
                    premium: true,
                  },
                  {
                    label: 'Intermediate vision (dashboards & computers)',
                    standard: false,
                    premium: true,
                  },
                  { label: 'Near vision (reading books & phones)', standard: false, premium: true },
                  { label: 'Standard surgery covered by insurance', standard: true, premium: true },
                  {
                    label: 'Freedom from reading glasses & bifocals',
                    standard: false,
                    premium: true,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-3.5 border-b border-border/60 last:border-0 gap-2"
                  >
                    <span className="text-xs sm:text-sm text-muted-foreground flex-1 min-w-0 pr-2">
                      {row.label}
                    </span>
                    <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                      <div className="text-center w-12 sm:w-14">
                        <span className="text-[10px] text-muted-foreground block mb-1.5 uppercase tracking-wide">
                          Standard
                        </span>
                        {row.standard ? (
                          <Icon name="CheckCircleIcon" size={18} className="text-primary mx-auto" />
                        ) : (
                          <Icon name="XCircleIcon" size={18} className="text-red-500/50 mx-auto" />
                        )}
                      </div>
                      <div className="text-center w-12 sm:w-14">
                        <span className="text-[10px] text-primary block mb-1.5 uppercase tracking-wide">
                          Premium
                        </span>
                        {row.premium ? (
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
                <p className="text-[11px] text-muted-foreground/85 leading-relaxed">
                  <strong className="text-foreground/90 font-medium">
                    Insurance Coverage Note:
                  </strong>{' '}
                  Medicare and private insurance cover standard cataract removal and basic monofocal
                  lenses. The premium optical upgrade is a lifetime investment in continuous,
                  glasses-free vision.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              role="button"
              tabIndex={0}
              onMouseMove={handleSpotlightMouseMove}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if ((e.target as HTMLElement).closest('a')) return;
                  if (profile.id === 'tech') {
                    window.location.href = '/panoptix-pro';
                    return;
                  }
                  if (profile.id === 'active') {
                    window.location.href = '/clareon-vivity';
                    return;
                  }
                  if (profile.id === 'innovator') {
                    window.location.href = '/tecnis-puresee';
                    return;
                  }
                  window.location.hash = 'booking';
                }
              }}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('a')) {
                  return;
                }
                if (profile.id === 'tech') {
                  window.location.href = '/panoptix-pro';
                  return;
                }
                if (profile.id === 'active') {
                  window.location.href = '/clareon-vivity';
                  return;
                }
                if (profile.id === 'innovator') {
                  window.location.href = '/tecnis-puresee';
                  return;
                }
                window.location.hash = 'booking';
              }}
              className={`group relative doppel-shell transition-spring hover:-translate-y-2 cursor-pointer flex flex-col focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f16] focus-visible:outline-none ${styles.profileCard} ${styles[`profile${profile.id.charAt(0).toUpperCase() + profile.id.slice(1)}`]}`}
            >
              <div className="w-full h-full flex flex-col bg-muted/90 rounded-[calc(2rem-6px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative">
                {/* Dynamic Mouse Spotlight Glow */}
                <div
                  className={`absolute pointer-events-none rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-[80px] z-0 will-change-transform ${styles.spotlight}`}
                />

                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden z-10 border-b border-white/[0.05]">
                  <AppImage
                    src={profile.image}
                    alt={profile.imageAlt}
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
                      {(() => {
                        const parts = profile?.stat.split(/(\[\d+\])/);
                        return parts.map((part, idx) => {
                          const match = part.match(/^\[(\d+)\]$/);
                          if (match) {
                            const num = match[1];
                            return (
                              <sup key={idx} className="text-[9px] font-bold">
                                <a
                                  href={`#footnote-${num}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-primary hover:underline ml-0.5"
                                >
                                  [{num}]
                                </a>
                              </sup>
                            );
                          }
                          return part;
                        });
                      })()}
                    </p>
                    {profile.id === 'active' && (
                      <div className="mt-4 pt-3 border-t border-white/[0.06]">
                        <a
                          href="/clareon-vivity"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                        >
                          <span>View Clareon Vivity Patient Guide</span>
                          <span className="font-mono text-sm">&rarr;</span>
                        </a>
                      </div>
                    )}
                    {profile.id === 'tech' && (
                      <div className="mt-4 pt-3 border-t border-white/[0.06]">
                        <a
                          href="/panoptix-pro"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a78bfa] hover:underline"
                        >
                          <span>View PanOptix Pro Patient Guide</span>
                          <span className="font-mono text-sm">&rarr;</span>
                        </a>
                      </div>
                    )}
                    {profile.id === 'innovator' && (
                      <div className="mt-4 pt-3 border-t border-white/[0.06]">
                        <a
                          href="/tecnis-puresee"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38bdf8] hover:underline"
                        >
                          <span>View TECNIS PureSee Patient Guide</span>
                          <span className="font-mono text-sm">&rarr;</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
