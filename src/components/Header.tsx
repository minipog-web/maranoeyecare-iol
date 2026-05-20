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
            className="hover:opacity-80 transition-opacity block"
          >
            <AppLogo
              src="/assets/images/marano_logo.png"
              width={240}
              height={60}
              className="w-[180px] sm:w-[260px] h-auto"
            />
          </a>
        </div>

        {/* Desktop Nav — pill with subtle gradient border */}
        <nav className="hidden lg:flex items-center gap-0.5 px-4 py-2 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-md">
          {navLinks?.map((link) => (
            <a
              key={link?.href}
              href={link?.href}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-all duration-200 rounded-full hover:bg-white/[0.06] hover:text-primary"
            >
              {link?.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <a
            href="tel:9733220100"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors touch-manipulation"
          >
            <Icon name="PhoneIcon" size={16} className="text-primary" />
            <span className="hidden lg:inline text-sm">973-322-0100</span>
          </a>
          <a
            href="#booking"
            className="px-4 lg:px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-accent transition-all hover:scale-105 active:scale-95 touch-manipulation whitespace-nowrap shadow-[0_0_20px_rgba(0,201,177,0.25)] btn-shimmer"
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
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-border px-4 sm:px-6 py-4 flex flex-col">
          {navLinks?.map((link) => (
            <a
              key={link?.href}
              href={link?.href}
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-4 border-b border-border/50 last:border-0 touch-manipulation"
              onClick={() => setMenuOpen(false)}
            >
              {link?.label}
            </a>
          ))}
          <a
            href="tel:9733220100"
            className="flex items-center gap-3 text-base font-medium text-primary py-4 border-b border-border/50 touch-manipulation"
          >
            <Icon name="PhoneIcon" size={18} className="text-primary" />
            973-322-0100
          </a>
          <a
            href="#booking"
            className="w-full mt-3 py-4 bg-primary text-primary-foreground rounded-full text-sm font-bold text-center hover:bg-accent transition-colors touch-manipulation min-h-[52px] flex items-center justify-center shadow-[0_0_20px_rgba(0,201,177,0.2)]"
            onClick={() => setMenuOpen(false)}
          >
            Book Consultation
          </a>
        </div>
      )}
    </header>
  );
}
