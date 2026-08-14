'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { trackEvent, trackAdsConversion } from '@/lib/gtag';

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
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('scroll', handleScroll, { passive: true, once: true });
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeyDown);
      };
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
    trackAdsConversion('phone_click');
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
          ? 'luxury-nav-blur border-b border-white/[0.05] shadow-[0_1px_0_rgba(197,160,89,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 2xl:px-12 h-16 sm:h-20 flex items-center justify-between gap-3 lg:gap-4 xl:gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://www.maranoeye.com"
            aria-label="Marano Eye Care — return to homepage"
            className="hover:opacity-80 transition-opacity block shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <AppLogo
              src="/assets/images/marano_logo.png"
              width={240}
              height={60}
              className="w-[130px] sm:w-[150px] lg:w-[165px] xl:w-[195px] 2xl:w-[220px] h-auto shrink-0"
            />
          </a>
        </div>

        {/* Desktop Nav — pill with subtle gradient border */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-2 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-md shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.label)}
              className="px-2 lg:px-2.5 xl:px-3.5 py-1.5 text-[11px] lg:text-xs xl:text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-all duration-200 rounded-full hover:bg-white/[0.08] whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              {link?.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden sm:flex items-center gap-2.5 lg:gap-3.5 xl:gap-4 shrink-0">
          <a
            href="tel:9733220100"
            suppressHydrationWarning
            onClick={() => handlePhoneClick('desktop')}
            aria-label="Call Marano Eye Care at 973-322-0100"
            className="group flex items-center gap-2 text-sm xl:text-base font-bold text-foreground hover:text-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] touch-manipulation whitespace-nowrap rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 border border-primary/30 group-hover:bg-primary/25 group-hover:border-primary/50 transition-all duration-300">
              <Icon name="PhoneIcon" size={15} className="text-primary" />
            </div>
            <span
              className="hidden xl:inline font-bold text-white text-sm xl:text-base tracking-wide"
              suppressHydrationWarning
            >
              (973) 322-0100
            </span>
          </a>

          <div className="h-5 w-[1px] bg-white/[0.08] hidden xl:block" />

          <a
            href="#booking"
            onClick={() => handleBookingClick('desktop')}
            className="btn-premium-primary btn-shimmer whitespace-nowrap text-xs xl:text-sm px-3.5 py-2.5 lg:px-4 lg:py-2.5 xl:px-5 xl:py-2.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none shrink-0"
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile/Tablet Hamburger */}
        <button
          className="flex lg:hidden p-2.5 text-foreground touch-manipulation -mr-1 rounded-xl hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none shrink-0"
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
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
              suppressHydrationWarning
              onClick={() => handlePhoneClick('mobile')}
              className="group flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground py-3 border border-white/10 rounded-xl hover:bg-white/5 hover:border-primary/30 transition-all duration-200 touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Icon name="PhoneIcon" size={12} className="text-primary" />
              </div>
              <span suppressHydrationWarning>(973) 322-0100</span>
            </a>

            <a
              href="#booking"
              className="w-full py-3.5 bg-primary text-[#040506] rounded-xl text-xs font-bold uppercase tracking-wider text-center hover:bg-accent transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] touch-manipulation flex items-center justify-center shadow-[0_4px_16px_rgba(197,160,89,0.25),0_2px_4px_rgba(0,0,0,0.15)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
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
