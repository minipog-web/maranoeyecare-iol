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
          ? 'bg-background/90 backdrop-blur-xl border-b border-border' :'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <AppLogo
            src="/assets/images/Marano_Eye_Care-1777160896260.png"
            size={100}
            className="text-primary sm:w-[120px]"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 px-5 py-2 bg-muted/50 rounded-full border border-border/50 backdrop-blur-sm">
          {navLinks?.map((link) => (
            <a
              key={link?.href}
              href={link?.href}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5"
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
            <span className="hidden lg:inline">973-322-0100</span>
          </a>
          <a
            href="#booking"
            className="px-4 lg:px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-accent transition-all hover:scale-105 active:scale-95 touch-manipulation whitespace-nowrap"
          >
            Book Free Consult
          </a>
        </div>

        {/* Mobile/Tablet Hamburger */}
        <button
          className="flex md:hidden p-3 text-foreground touch-manipulation -mr-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border px-4 sm:px-6 py-4 flex flex-col">
          {navLinks?.map((link) => (
            <a
              key={link?.href}
              href={link?.href}
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-4 border-b border-border/50 last:border-0 touch-manipulation"
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
            className="w-full mt-3 py-4 bg-primary text-primary-foreground rounded-full text-sm font-bold text-center hover:bg-accent transition-colors touch-manipulation min-h-[52px] flex items-center justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Book Free Consultation
          </a>
        </div>
      )}
    </header>
  );
}