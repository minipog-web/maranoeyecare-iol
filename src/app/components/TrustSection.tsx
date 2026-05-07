import React from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const awards = [
{ value: '15×', label: 'NJ Monthly Top Doctor', sublabel: 'Consecutive years' },
{ value: '6×', label: 'Int\'l Star Diamond Award', sublabel: 'American Academy of Hospitality Sciences' },
{ value: '2026', label: 'Castle Connolly Top Doc', sublabel: 'National recognition' },
{ value: 'Chief', label: 'of Ophthalmology', sublabel: 'Saint Barnabas Medical Center' }];


const testimonials = [
{
  quote: "Dr. Marano is simply the best in his field. I've been a patient for 25 years and have never felt rushed or unheard. After my PanOptix surgery, I haven't touched my glasses once.",
  name: 'Patricia W.',
  location: 'Denville, NJ',
  lens: 'PanOptix Pro',
  avatar: 'https://i.pravatar.cc/100?img=44'
},
{
  quote: "I was nervous about halos at night because I drive a lot. Dr. Marano recommended Vivity and the results exceeded every expectation. Night driving is completely clear.",
  name: 'Robert D.',
  location: 'Livingston, NJ',
  lens: 'Clareon Vivity',
  avatar: 'https://i.pravatar.cc/100?img=52'
}];


export default function TrustSection() {
  return (
    <section id="trust" className="py-16 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 grid-lines-bg opacity-30" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">Your Surgeon</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-4 sm:mb-6">
            New Jersey&apos;s{' '}
            <span className="text-gradient-primary font-medium">Most Decorated</span>{' '}
            Ophthalmologist
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dr. Matthew Marano Jr., MD has been named Top Doctor by NJ Monthly Magazine for 15 consecutive years. He is the only physician to receive six International Star Diamond Awards from the American Academy of Hospitality Sciences.
          </p>
        </div>

        {/* Doctor + Awards layout */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center mb-16 sm:mb-20">
          {/* Left: Photo */}
          <div className="relative pb-10 sm:pb-0">
            <div className="relative rounded-t-[6rem] rounded-b-[2rem] overflow-hidden aspect-[3/4] max-w-xs sm:max-w-sm mx-auto shadow-2xl group">
              <AppImage
                src="/assets/images/Marano-1777328574709.png"
                alt="Dr. Matthew Marano Jr., MD - Board-Certified Ophthalmologist"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, 400px" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-xl font-medium text-foreground">Matthew Marano Jr., MD</p>
                <p className="text-sm text-primary mt-1">Board-Certified Ophthalmologist</p>
              </div>
            </div>

            {/* Floating credential card — repositioned to avoid overflow on mobile */}
            <div className="absolute bottom-0 right-4 sm:-bottom-6 sm:-right-4 md:-right-10 w-48 sm:w-52 bg-card/90 backdrop-blur-xl border border-primary/20 rounded-3xl p-4 sm:p-5 shadow-2xl animate-float-delayed">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="StarIcon" size={16} className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Top Doctor</span>
              </div>
              <p className="font-display text-2xl font-medium text-foreground">15 Years</p>
              <p className="text-xs text-muted-foreground mt-1">NJ Monthly Magazine consecutive recognition</p>
            </div>
          </div>

          {/* Right: Awards grid */}
          <div className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {awards?.map((award) =>
              <div
                key={award?.label}
                className="bg-card border border-border rounded-3xl p-4 sm:p-6 hover:border-primary/30 transition-colors">

                  <p className="font-display text-2xl sm:text-3xl font-medium text-primary mb-2">{award?.value}</p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">{award?.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{award?.sublabel}</p>
                </div>
              )}
            </div>

            <div className="bg-muted/30 border border-border rounded-3xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="AcademicCapIcon" size={16} className="text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground">Additional Roles</p>
              </div>
              <ul className="space-y-2.5">
                {[
                'Chief Medical Editor — Ophthalmology 360',
                'Fellowship-trained in cornea and refractive surgery',
                'Performs femto laser-assisted cataract surgery',
                'Three conveniently located NJ offices']?.
                map((item) =>
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-6 sm:mb-8 text-center">Patient Voices</p>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {testimonials?.map((t) =>
            <div
              key={t?.name}
              className="bg-card border border-border rounded-4xl p-6 sm:p-8 hover:border-primary/20 transition-colors relative overflow-hidden group">

                <div className="absolute top-4 right-6 sm:top-6 sm:right-8 font-display text-6xl sm:text-7xl text-primary/5 font-bold leading-none select-none">&ldquo;</div>
                <Icon name="StarIcon" size={16} className="text-primary mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-5 sm:mb-6 italic relative z-10">
                  &ldquo;{t?.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                    <AppImage
                    src={t?.avatar}
                    alt={`Patient ${t?.name} profile photo`}
                    fill
                    className="object-cover"
                    sizes="48px" />

                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{t?.name}</p>
                    <p className="text-xs text-muted-foreground">{t?.location}</p>
                  </div>
                  <div className="shrink-0">
                    <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full inline-block"
                    style={{ backgroundColor: 'rgba(0,201,177,0.1)', color: '#00C9B1', border: '1px solid rgba(0,201,177,0.2)' }}>

                      {t?.lens}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Locations */}
        <div className="mt-12 sm:mt-16 border-t border-border pt-10 sm:pt-12">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground mb-6 sm:mb-8 text-center">Three Convenient New Jersey Locations</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
            { city: 'Denville', phone: '973-358-0416', address: 'Morris County' },
            { city: 'Livingston', phone: '973-322-0100', address: 'Essex County' },
            { city: 'Newark', phone: '973-315-6439', address: 'Essex County' }]?.
            map((loc) =>
            <a
              key={loc?.city}
              href={`tel:${loc?.phone?.replace(/-/g, '')}`}
              className="flex items-center gap-4 bg-muted/30 border border-border rounded-3xl p-4 sm:p-5 hover:border-primary/30 hover:bg-primary/5 transition-all group touch-manipulation min-h-[72px]">

                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="PhoneIcon" size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{loc?.city}</p>
                  <p className="text-xs text-muted-foreground">{loc?.address}</p>
                  <p className="text-sm font-semibold text-primary mt-0.5 group-hover:underline">{loc?.phone}</p>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>);

}