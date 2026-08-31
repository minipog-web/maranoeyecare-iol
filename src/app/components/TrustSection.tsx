'use client';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import styles from './TrustSection.module.css';
import { handleSpotlightMouseMove } from '@/lib/ui';

const maranoAwards = [
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

const raoufCredentials = [
  {
    value: 'M.D. with Honors',
    label: 'Stony Brook University School of Medicine',
    sublabel: 'Alpha Omega Alpha Honor Medical Society',
    icon: 'AcademicCapIcon',
  },
  {
    value: 'Residency Training',
    label: 'Manhattan Eye, Ear & Throat Hospital',
    sublabel: 'Northwell Health Eye Institute',
    icon: 'BuildingOfficeIcon',
  },
  {
    value: 'Clinical Fellowship',
    label: 'Cornea & Refractive Surgery',
    sublabel: 'Advanced Subspecialty Surgical Training',
    icon: 'SparklesIcon',
  },
  {
    value: '12+ Publications',
    label: 'Peer-Reviewed Research',
    sublabel: 'Active Member, AAO & ASCRS',
    icon: 'DocumentTextIcon',
  },
];

export default function TrustSection() {
  return (
    <section id="trust" className="py-16 sm:py-24 relative overflow-hidden bg-[#0c0e14]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.015)_0%,transparent_70%)]" />
      <div className="absolute inset-0 grid-lines-bg opacity-20" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[500px] bg-primary/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/[0.015] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
            Your Surgeons
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-5 sm:mb-6 leading-tight">
            New Jersey&apos;s{' '}
            <span className="font-semibold text-gradient-primary">Most Awarded Cataract</span>{' '}
            Surgeons
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground font-normal max-w-3xl mx-auto leading-relaxed">
            At Marano Eye Care, your surgery is personally performed by renowned board-certified
            ophthalmologists Dr. Matthew Marano Jr., MD and Dr. Sherief Raouf, MD. Combining over
            four decades of cumulative surgical excellence, subspecialty corneal fellowship
            training, and cutting-edge laser biometry, our surgical team delivers life-changing
            visual clarity.
          </p>
        </div>

        {/* ── Surgeon 1: Dr. Matthew Marano Jr., MD ── */}
        <div className="mb-20 sm:mb-28">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
            {/* Left: Photo */}
            <div className="relative pb-10 sm:pb-0">
              <div
                onMouseMove={handleSpotlightMouseMove}
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
                <div className="absolute bottom-0 left-0 max-w-[190px] sm:max-w-[220px] p-5 sm:p-6 bg-gradient-to-tr from-background via-background/90 to-transparent z-30">
                  <p className="font-display text-xl font-medium text-foreground">
                    Matthew Marano Jr., MD
                  </p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    Founder · Board-Certified Ophthalmologist
                  </p>
                </div>
              </div>

              {/* Floating credential card */}
              <div className="absolute bottom-0 right-4 sm:-bottom-6 sm:-right-4 md:-right-10 w-48 sm:w-52 glass-card-bright rounded-3xl p-4 sm:p-5 shadow-2xl animate-float z-40 hidden xs:block">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="StarIcon" size={12} className="text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Top Doctor
                  </span>
                </div>
                <p className="font-display text-2xl font-semibold text-foreground">15 Years</p>
                <p className="text-sm text-foreground/90 mt-1 leading-snug font-medium">
                  NJ Monthly Magazine consecutive recognition
                </p>
              </div>
            </div>

            {/* Right: Awards & Experience */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase">
                  <Icon name="CheckBadgeIcon" size={14} className="text-primary" />
                  40,000+ Successful Eye Surgeries
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                  Dr. Matthew Marano Jr., MD
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Dr. Marano has spent over three decades helping patients achieve lasting freedom
                  from glasses and contacts. Named a Top Doctor for 15 consecutive years and Chief
                  of Ophthalmology across premier regional medical centers, he is a recognized
                  specialist in complex cataract surgery and customized premium intraocular lens
                  implantation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4 sm:gap-y-6">
                {maranoAwards.map((award) => (
                  <div
                    key={award.value}
                    onMouseMove={handleSpotlightMouseMove}
                    className="group relative overflow-hidden luxury-rim-card border border-border/80 rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:border-primary/40"
                  >
                    <div
                      className={`absolute pointer-events-none rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-[60px] z-0 will-change-transform ${styles.cardSpotlight}`}
                    />
                    <div className="relative z-10">
                      <div className="w-8 h-8 rounded-2xl bg-primary/10 flex items-center justify-center mb-2.5 group-hover:bg-primary/20 transition-colors">
                        <Icon name={award.icon as 'StarIcon'} size={16} className="text-primary" />
                      </div>
                      <p
                        className={`font-display font-semibold text-primary mb-1.5 ${
                          award.value.length > 10 ? 'text-sm sm:text-base' : 'text-lg sm:text-xl'
                        }`}
                      >
                        {award.value}
                      </p>
                      {award.value === 'Chief of Ophthalmology' ? (
                        <div className="space-y-1">
                          <p className="text-xs sm:text-sm font-bold text-foreground">
                            {award.label}
                          </p>
                          <p className="text-xs sm:text-sm font-bold text-foreground">
                            {award.sublabel}
                          </p>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs sm:text-sm font-bold text-foreground mb-0.5">
                            {award.label}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                            {award.sublabel}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                onMouseMove={handleSpotlightMouseMove}
                className="group relative overflow-hidden luxury-rim-card border border-border/80 rounded-3xl p-5 sm:p-6"
              >
                <div
                  className={`absolute pointer-events-none rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-[60px] z-0 will-change-transform ${styles.cardSpotlight}`}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Icon name="AcademicCapIcon" size={16} className="text-primary" />
                    </div>
                    <p className="text-sm font-bold text-foreground">
                      Leadership &amp; Memberships
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      'Chief Medical Editor at Ophthalmology 360',
                      'Active Member, American Academy of Ophthalmology (AAO) & ASCRS',
                      'Specialist in complex cataract cases and customized astigmatism correction',
                      'Expert in advanced microsurgical techniques for irregular corneal anatomy',
                    ]?.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.6)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Subtitle Divider Between Surgeons ── */}
        <div className="relative my-16 sm:my-24">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border/60" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#0c0e14] px-6 text-xs font-bold uppercase tracking-[0.25em] text-primary/80 border border-primary/20 rounded-full py-1.5 backdrop-blur-md">
              Cornea &amp; Refractive Subspecialist
            </span>
          </div>
        </div>

        {/* ── Surgeon 2: Dr. Sherief Raouf, MD ── */}
        <div>
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
            {/* Left: Photo */}
            <div className="relative pb-10 sm:pb-0 lg:order-2">
              <div
                onMouseMove={handleSpotlightMouseMove}
                className={`relative rounded-t-[6rem] rounded-b-[2.5rem] overflow-hidden aspect-[3/4] max-w-xs sm:max-w-sm mx-auto group ${styles.photoWrapper}`}
              >
                <AppImage
                  src="/assets/images/Raouf.jpg"
                  alt="Dr. Sherief Raouf, MD - Board-Certified Ophthalmologist & Cornea Specialist"
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
                <div className="absolute bottom-0 left-0 max-w-[190px] sm:max-w-[220px] p-5 sm:p-6 bg-gradient-to-tr from-background via-background/90 to-transparent z-30">
                  <p className="font-display text-xl font-medium text-foreground">
                    Sherief Raouf, MD
                  </p>
                  <p className="text-sm text-primary mt-1 font-medium">
                    Board-Certified Ophthalmologist · Cornea Specialist
                  </p>
                </div>
              </div>

              {/* Floating credential card */}
              <div className="absolute bottom-0 right-4 sm:-bottom-6 sm:-right-4 md:-right-10 w-48 sm:w-52 glass-card-bright rounded-3xl p-4 sm:p-5 shadow-2xl animate-float-delayed z-40 hidden xs:block">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="SparklesIcon" size={12} className="text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Fellowship Trained
                  </span>
                </div>
                <p className="font-display text-lg sm:text-xl font-semibold text-foreground leading-snug">
                  Cornea &amp; Refractive
                </p>
                <p className="text-xs text-foreground/90 mt-1 leading-snug font-medium">
                  Manhattan Eye, Ear &amp; Throat Hospital
                </p>
              </div>
            </div>

            {/* Right / Left on Desktop: Credentials & Experience */}
            <div className="space-y-6 sm:space-y-8 lg:order-1">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase">
                  <Icon name="AcademicCapIcon" size={14} className="text-primary" />
                  Cornea, Cataract &amp; Laser Vision Specialist
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                  Dr. Sherief Raouf, MD
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Dr. Sherief Raouf is a board-certified ophthalmologist and subspecialty
                  fellowship-trained cornea and refractive surgeon. Born and raised in Bergen
                  County, NJ, Dr. Raouf completed his medical degree with honors at Stony Brook
                  University, followed by residency at Manhattan Eye, Ear &amp; Throat Hospital and
                  advanced fellowship training in corneal and laser refractive surgery. He pairs
                  deep anterior segment expertise with sub-micron femtosecond laser technology to
                  customize every intraocular lens procedure.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4 sm:gap-y-6">
                {raoufCredentials.map((cred) => (
                  <div
                    key={cred.label}
                    onMouseMove={handleSpotlightMouseMove}
                    className="group relative overflow-hidden luxury-rim-card border border-border/80 rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:border-primary/40"
                  >
                    <div
                      className={`absolute pointer-events-none rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-[60px] z-0 will-change-transform ${styles.cardSpotlight}`}
                    />
                    <div className="relative z-10">
                      <div className="w-8 h-8 rounded-2xl bg-primary/10 flex items-center justify-center mb-2.5 group-hover:bg-primary/20 transition-colors">
                        <Icon
                          name={cred.icon as 'AcademicCapIcon'}
                          size={16}
                          className="text-primary"
                        />
                      </div>
                      <p className="font-display font-semibold text-primary text-sm sm:text-base mb-1.5">
                        {cred.value}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-foreground mb-0.5">
                        {cred.label}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                        {cred.sublabel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                onMouseMove={handleSpotlightMouseMove}
                className="group relative overflow-hidden luxury-rim-card border border-border/80 rounded-3xl p-5 sm:p-6"
              >
                <div
                  className={`absolute pointer-events-none rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-[60px] z-0 will-change-transform ${styles.cardSpotlight}`}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Icon name="SparklesIcon" size={16} className="text-primary" />
                    </div>
                    <p className="text-sm font-bold text-foreground">
                      Clinical Focus &amp; Research
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      'Laser-Assisted Cataract Surgery with Clareon PanOptix Pro, Vivity & PureSee IOLs',
                      'Subspecialist in Corneal Cross-Linking (CXL), LASIK, PRK & Ocular Surface Disease',
                      'Author of 12+ peer-reviewed scientific publications in leading ophthalmology journals',
                      'Active Member, American Academy of Ophthalmology (AAO) & ASCRS',
                      'Serving patients across Livingston, Denville, and Newark offices',
                    ]?.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_6px_rgba(197,160,89,0.6)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
