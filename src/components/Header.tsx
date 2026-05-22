'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-2xl border-b border-border/60 shadow-[0_1px_0_rgba(0,201,177,0.07)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a
            href="https://www.maranoeyecare.com"
            className="hover:opacity-80 transition-opacity block shrink-0"
          >
            <AppLogo
              src="/assets/images/marano_logo.png"
              width={240}
              height={60}
              className="w-[150px] sm:w-[180px] lg:w-[200px] xl:w-[220px] 2xl:w-[260px] h-auto"
            />
          </a>
        </div>

        {/* Desktop Nav — pill with subtle gradient border */}
        <nav className="hidden lg:flex items-center gap-0 min-[1150px]:gap-0.5 px-2 xl:px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-md shrink-0">
          {navLinks?.map((link) => (
            <a
              key={link?.href}
              href={link?.href}
              className="px-2 lg:px-2.5 xl:px-3.5 py-2 text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-xs font-semibold uppercase tracking-[0.04em] lg:tracking-[0.06em] xl:tracking-[0.1em] text-muted-foreground hover:text-foreground transition-all duration-200 rounded-full hover:bg-white/[0.06] hover:text-primary whitespace-nowrap"
            >
              {link?.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4 shrink-0">
          <a
            href="tel:9733220100"
            className="flex items-center gap-1.5 lg:gap-2 text-xs xl:text-sm font-medium text-muted-foreground hover:text-primary transition-colors touch-manipulation whitespace-nowrap"
          >
            <Icon name="PhoneIcon" size={16} className="text-primary shrink-0" />
            <span className="hidden md:inline lg:text-[11px] xl:text-xs 2xl:text-sm whitespace-nowrap">973-322-0100</span>
          </a>
          <a
            href="#booking"
            className="inline-flex items-center justify-center text-center px-3 lg:px-4 xl:px-5 2xl:px-6 py-2 xl:py-2.5 bg-primary text-primary-foreground rounded-full text-xs xl:text-sm font-bold hover:bg-accent transition-all hover:scale-105 active:scale-95 touch-manipulation whitespace-nowrap shadow-[0_0_20px_rgba(0,201,177,0.25)] btn-shimmer"
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile/Tablet Hamburger */}
        <button
          className="flex md:hidden p-3 text-foreground touch-manipulation -mr-1 rounded-xl hover:bg-white/5 transition-colors"
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
                className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary py-3 transition-colors touch-manipulation"
                onClick={() => setMenuOpen(false)}
              >
                {link?.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <a
              href="tel:9733220100"
              className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground py-3 border border-white/10 rounded-full hover:bg-white/5 touch-manipulation"
            >
              <Icon name="PhoneIcon" size={16} className="text-primary" />
              973-322-0100
            </a>

            <a
              href="#booking"
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-wider text-center hover:bg-accent transition-colors touch-manipulation flex items-center justify-center shadow-[0_0_20px_rgba(0,201,177,0.25)]"
              onClick={() => setMenuOpen(false)}
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
