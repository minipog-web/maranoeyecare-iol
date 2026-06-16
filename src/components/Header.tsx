'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const handleScroll = () => setMenuOpen(false);
      window.addEventListener('scroll', handleScroll, { passive: true, once: true });
    }
  }, [menuOpen]);

  const navLinks = [
    { label: 'Lens Options', href: '#lenses' },
    { label: 'Vision Outcomes', href: '#vision' },
    { label: 'IOL Simulator', href: '#iol-simulator' },
    { label: 'Find My Lens', href: '#lifestyle' },
    { label: 'Our Doctors', href: '#trust' },
  ];

  const handleNavClick = (label: string) => {
    trackEvent({
      action: 'header_nav_click',
      category: 'Engagement',
      label: label,
    });
  };

  const handlePhoneClick = (source: string) => {
    trackEvent({
      action: 'phone_click',
      category: 'Conversion',
      label: `Header Call: ${source}`,
    });
  };

  const handleBookingClick = (source: string) => {
    trackEvent({
      action: 'header_booking_click',
      category: 'Engagement',
      label: `Header Booking: ${source}`,
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-2xl border-b border-border/60 shadow-[0_1px_0_rgba(0,201,177,0.07)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12 h-16 sm:h-20 flex items-center justify-between gap-4 lg:gap-5 xl:gap-6">
        <div className="flex items-center gap-3">
          <a
            href="https://www.maranoeyecare.com"
            aria-label="Marano Eye Care — return to homepage"
            className="hover:opacity-80 transition-opacity block shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <AppLogo
              src="/assets/images/marano_logo.png"
              width={240}
              height={60}
              className="w-[150px] sm:w-[180px] lg:w-[200px] xl:w-[220px] 2xl:w-[260px] h-auto"
            />
          </a>
        </div>

        {/* Tablet & Desktop Nav — pill with subtle gradient border */}
        <nav className="hidden md:flex items-center gap-0 lg:gap-0.5 px-1.5 lg:px-2 xl:px-2 py-1 lg:py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-md shrink-0">
          {navLinks?.map((link, idx) => (
            <a
              key={link?.href}
              href={link?.href}
              onClick={() => handleNavClick(link.label)}
              className={`px-1.5 md:px-2 lg:px-2.5 2xl:px-3 py-1.5 lg:py-2 text-[11px] md:text-[11px] lg:text-[12px] 2xl:text-[13px] font-semibold uppercase tracking-[0.02em] md:tracking-[0.04em] lg:tracking-[0.05em] 2xl:tracking-[0.06em] text-muted-foreground hover:text-primary transition-all duration-200 rounded-full hover:bg-white/[0.06] whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${
                idx === 1 || idx === 3 ? 'md:hidden lg:hidden xl:inline-block' : ''
              }`}
            >
              {link?.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-4 shrink-0">
          <a
            href="tel:9733220100"
            onClick={() => handlePhoneClick('desktop')}
            aria-label="Call Marano Eye Care at 973-322-0100"
            className="group flex items-center gap-2.5 text-xs xl:text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] touch-manipulation whitespace-nowrap lg:ml-2 xl:ml-3 rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
              <Icon name="PhoneIcon" size={13} className="text-primary" />
            </div>
            <span className="hidden 2xl:inline font-semibold text-foreground/90 text-xs xl:text-sm tracking-wide">
              (973) 322-0100
            </span>
          </a>

          <div className="h-5 w-[1px] bg-white/[0.08] hidden lg:block" />

          <a
            href="#booking"
            onClick={() => handleBookingClick('desktop')}
            className="btn-premium-primary btn-shimmer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile/Tablet Hamburger */}
        <button
          className="flex md:hidden p-3 text-foreground touch-manipulation -mr-1 rounded-xl hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-border px-4 sm:px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col border-b border-border/40 pb-2">
            {navLinks?.map((link) => (
              <a
                key={link?.href}
                href={link?.href}
                className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary py-3 transition-colors touch-manipulation rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                onClick={() => {
                  handleNavClick(link.label);
                  setMenuOpen(false);
                }}
              >
                {link?.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <a
              href="tel:9733220100"
              onClick={() => handlePhoneClick('mobile')}
              className="group flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground py-3 border border-white/10 rounded-xl hover:bg-white/5 hover:border-primary/30 transition-all duration-200 touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Icon name="PhoneIcon" size={12} className="text-primary" />
              </div>
              (973) 322-0100
            </a>

            <a
              href="#booking"
              className="w-full py-3.5 bg-primary text-[#040506] rounded-xl text-xs font-bold uppercase tracking-wider text-center hover:bg-accent transition-colors touch-manipulation flex items-center justify-center shadow-[0_4px_14px_rgba(0,201,177,0.15)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              onClick={() => {
                handleBookingClick('mobile');
                setMenuOpen(false);
              }}
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
