import styles from './HeroSection.module.css';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const lenses = [
  {
    name: 'Clareon Vivity',
    tag: 'Most Popular',
    tagColor: 'bg-primary text-primary-foreground',
    subtitle: 'Non-diffractive EDOF',
    detail: 'Fewest halos of any premium IOL',
    src: "/assets/images/vivity_iol_clean.png",
    alt: 'Clareon Vivity IOL — non-diffractive extended depth of focus intraocular lens',
    accent: 'border-primary/50',
    glow: 'shadow-[0_0_60px_rgba(0,201,177,0.3),0_0_0_1px_rgba(0,201,177,0.2)]',
    featured: true
  },
  {
    name: 'PanOptix Pro',
    tag: 'Trifocal',
    tagColor: 'bg-primary/20 text-primary border border-primary/30',
    subtitle: 'Full trifocal range',
    detail: '99% would choose again',
    src: "/assets/images/panoptix_iol_clean.png",
    alt: 'Clareon PanOptix Pro trifocal IOL — trifocal intraocular lens',
    accent: 'border-primary/25',
    glow: 'shadow-[0_0_30px_rgba(0,201,177,0.1)]',
    featured: false
  },
  {
    name: 'Eyhance',
    tag: 'Monofocal+',
    tagColor: 'bg-primary/20 text-primary border border-primary/30',
    subtitle: 'Enhanced monofocal',
    detail: 'Crisp distance + intermediate',
    src: "/assets/images/eyhance_iol_clean.png",
    alt: 'TECNIS Eyhance IOL — enhanced monofocal intraocular lens',
    accent: 'border-primary/25',
    glow: 'shadow-[0_0_30px_rgba(0,201,177,0.1)]',
    featured: false
  }
];


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#080910]" />
      <div className="absolute inset-0 grid-lines-bg opacity-100" />

      {/* Rich ambient lighting */}
      <div className="absolute inset-0 radial-glow-primary" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-primary/2 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle scan-line effect */}
      <div className={`absolute inset-0 pointer-events-none ${styles.scanLines}`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-8 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* Left Content */}
          <div className="flex-1 w-full flex flex-col items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary/20 bg-primary/5 mb-5 sm:mb-8 shimmer-border">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0 shadow-[0_0_8px_rgba(0,201,177,0.8)]" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-primary">
                Premium IOL Specialists — New Jersey
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[0.92] tracking-tight text-foreground mb-5 sm:mb-6">
              See Everything.{' '}
              <span className="block text-gradient-primary font-semibold mt-1">
                Without Glasses.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-8 sm:mb-10">
              Not all IOLs are equal. Discover how Clareon Vivity, PanOptix Pro, and Eyhance compare — and find the lens that gives you the clearest life after cataract surgery.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-12">
              <a
                href="#booking"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-primary text-primary-foreground rounded-full text-base font-bold flex items-center justify-center gap-3 group hover:bg-accent transition-all active:scale-95 animate-glow-pulse btn-shimmer min-h-[52px] touch-manipulation"
              >
                Book a Free Consultation
                <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-1.5 transition-transform shrink-0" />
              </a>
              <a
                href="tel:9733220100"
                className="w-full sm:w-auto px-6 sm:px-8 py-4 border border-border-bright text-foreground rounded-full text-base font-medium flex items-center justify-center gap-3 hover:border-primary/50 hover:bg-white/[0.03] transition-all min-h-[52px] touch-manipulation"
              >
                <Icon name="PhoneIcon" size={18} className="text-primary shrink-0" />
                <span className="text-sm sm:text-base">Call: 973-322-0100</span>
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-5 sm:gap-10 border-t border-border pt-6 sm:pt-8 w-full">
              {[
                { value: '15×', label: 'NJ Top Doctor Award' },
                { value: '94%', label: 'Vivity distance satisfaction' },
                { value: '99%', label: 'PanOptix would choose again' },
              ]?.map((stat) => (
                <div key={stat?.label} className="flex flex-col gap-1">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-primary">{stat?.value}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">{stat?.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Three-Lens Visual Showcase */}
          <div className="relative flex-1 w-full flex items-end justify-center lg:justify-end gap-2 sm:gap-3 md:gap-4 py-6 lg:py-0">
            {lenses?.map((lens, i) => (
              <div
                key={lens?.name}
                className={`relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden border bg-[rgba(8,9,16,0.85)] ${lens?.accent} ${lens?.glow} transition-all duration-500 hover:-translate-y-3 group cursor-pointer ${styles.lensCard}
                    ${lens?.featured
                      ? 'w-[38%] sm:w-44 h-[300px] sm:h-[420px] z-20 -mt-8'
                      : 'w-[28%] sm:w-36 h-[240px] sm:h-[360px] z-10'}`
                }
              >

                {/* Image */}
                <div className="relative flex-1 overflow-hidden">
                  <AppImage
                    src={lens?.src}
                    alt={lens?.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 38vw, 176px"
                    priority={i === 0}
                  />

                  {/* Rich gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                  {/* Ambient inner glow on featured */}
                  {lens.featured && (
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}

                  {/* Tag badge */}
                  <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-1 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider ${lens?.tagColor} shadow-lg backdrop-blur-sm`}>
                    {lens?.tag}
                  </div>
                </div>

                {/* Bottom info */}
                <div className="p-2 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-black/60 backdrop-blur-sm">
                  <p className="text-[9px] sm:text-xs font-bold text-primary uppercase tracking-widest mb-0.5">{lens?.name}</p>
                  <p className="text-white font-medium text-[10px] sm:text-sm leading-tight">{lens?.subtitle}</p>
                  <p className="text-white/50 text-[8px] sm:text-[10px] mt-0.5 sm:mt-1 leading-tight hidden sm:block">{lens?.detail}</p>
                </div>

                {/* Glow ring on hover */}
                <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl border-2 ${lens?.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none`} />
              </div>
            ))}

            {/* Floating lens detail card — desktop only */}
            <div className="hidden lg:block absolute -top-52 right-4 lg:right-8 w-44 glass-card-bright rounded-2xl p-4 shadow-2xl z-30 animate-float-delayed">
              <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center mb-3 shadow-[0_0_12px_rgba(0,201,177,0.3)]">
                <Icon name="SparklesIcon" size={18} className="text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Compare All 3</p>
              <p className="font-display text-sm font-medium text-foreground leading-tight">Find Your Perfect Lens</p>
              <a
                href="#lenses"
                className="mt-3 flex items-center gap-1.5 text-xs text-primary font-semibold hover:gap-2.5 transition-all touch-manipulation"
              >
                See comparison <Icon name="ArrowRightIcon" size={12} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}