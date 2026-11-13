'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { trackEvent, trackPhoneClick } from '@/lib/gtag';
import { smoothScrollToElement } from '@/lib/ui';

const lensGuideLinks = [
  {
    label: 'Clareon® Vivity® IOL',
    sublabel: 'Non-Diffractive EDOF',
    href: '/clareon-vivity',
  },
  {
    label: 'Clareon® PanOptix® Pro',
    sublabel: 'Full-Range Trifocal',
    href: '/panoptix-pro',
  },
  {
    label: 'TECNIS PureSee™ IOL',
    sublabel: 'Pure Refractive EDOF',
    href: '/tecnis-puresee',
  },
  {
    label: 'Cataract & IOL Guide',
    sublabel: 'How Cataracts Form & Stages',
    href: '/cataract-education',
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
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
    { label: 'Lens Options', href: '/#lenses', hasDropdown: true },
    { label: 'Vision Simulator', href: '/#vision' },
    { label: 'Optical Physics', href: '/#physics' },
    { label: 'Cataract Guide', href: '/cataract-education' },
    { label: 'Lens Quiz', href: '/#lens-quiz' },
    { label: 'Our Doctors', href: '/#trust' },
    { label: 'FAQ', href: '/#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    trackEvent({
      action: 'header_nav_click',
      category: 'Engagement',
      label: label,
    });

    if (href.includes('#')) {
      const [, hash] = href.split('#');

      // If the target element exists on the CURRENT page, smooth-scroll to it directly
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        e.preventDefault();
        smoothScrollToElement(hash);
        window.history.pushState(null, '', `#${hash}`);
        return;
      }

      // If target element is on another page, save hash to sessionStorage
      // so HashScrollHandler executes smooth scroll right after navigation completes
      try {
        sessionStorage.setItem('pending-scroll-hash', hash);
      } catch {
        // ignore
      }
    } else if (href === pathname) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePhoneClick = (source: string) => {
    trackPhoneClick(`Header Call: ${source}`, '(973) 322-0100');
  };

  const handleBookingClick = (e: React.MouseEvent<HTMLAnchorElement>, source: string) => {
    trackEvent({
      action: 'header_booking_click',
      category: 'Engagement',
      label: `Header Booking: ${source}`,
    });

    const bookingEl = document.getElementById('booking') || document.getElementById('consultation');
    if (bookingEl) {
      e.preventDefault();
      smoothScrollToElement(bookingEl.id);
      window.history.pushState(null, '', `#${bookingEl.id}`);
    } else {
      try {
        sessionStorage.setItem('pending-scroll-hash', 'booking');
      } catch {
        // ignore
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'luxury-nav-blur border-b border-white/[0.05] shadow-[0_1px_0_rgba(197,160,89,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 2xl:px-12 h-16 sm:h-20 flex items-center justify-between gap-2 lg:gap-3 xl:gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            aria-label="Marano Eye Care: return to homepage"
            className="hover:opacity-80 transition-opacity block shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <AppLogo
              src="/assets/images/marano_logo.png"
              width={200}
              height={50}
              className="w-[130px] sm:w-[150px] lg:w-[160px] xl:w-[195px] 2xl:w-[220px] h-auto shrink-0"
            />
          </Link>
        </div>

        {/* Desktop Nav: pill with subtle gradient border */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-1.5 xl:px-2 py-1 xl:py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-md shrink-0"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === pathname ||
              (link.hasDropdown &&
                ['/clareon-vivity', '/panoptix-pro', '/tecnis-puresee'].includes(pathname));

            if (link.hasDropdown) {
              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.label)}
                    className={`inline-flex items-center gap-1 px-2 xl:px-3 py-1 xl:py-1.5 text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-full whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${
                      isActive
                        ? 'text-primary bg-white/[0.08]'
                        : 'text-white hover:text-primary hover:bg-white/[0.08]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <Icon
                      name="ChevronDownIcon"
                      size={12}
                      className="text-primary/80 transition-transform duration-200 group-hover:rotate-180"
                    />
                  </Link>

                  {/* Crawlable Lens Guides Submenu */}
                  <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 absolute left-0 top-full pt-2 w-64 z-50">
                    <div className="rounded-2xl border border-white/10 bg-[#0b0d13]/95 backdrop-blur-2xl p-2 shadow-[0_16px_40px_rgba(0,0,0,0.65)]">
                      {lensGuideLinks.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          onClick={(e) => handleNavClick(e, sublink.href, sublink.label)}
                          className={`block px-3 py-2.5 rounded-xl transition-colors ${
                            pathname === sublink.href
                              ? 'bg-primary/15 text-primary'
                              : 'text-white hover:bg-white/[0.06] hover:text-primary'
                          }`}
                        >
                          <span className="block text-xs font-bold tracking-wide">
                            {sublink.label}
                          </span>
                          <span className="block text-[10px] text-white/60 mt-0.5">
                            {sublink.sublabel}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.label)}
                className={`px-2 xl:px-3 py-1 xl:py-1.5 text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-full whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${
                  isActive
                    ? 'text-primary bg-white/[0.08]'
                    : 'text-white hover:text-primary hover:bg-white/[0.08]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-2.5 xl:gap-4 shrink-0">
          <a
            href="tel:9733220100"
            suppressHydrationWarning
            onClick={() => handlePhoneClick('desktop')}
            aria-label="Call Marano Eye Care"
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

          <Link
            href="/#booking"
            onClick={(e) => handleBookingClick(e, 'desktop')}
            className="btn-premium-primary rounded-full whitespace-nowrap text-sm font-bold px-4 py-2.5 xl:px-6 xl:py-2.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none shrink-0"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile/Tablet Hamburger */}
        <button
          className="flex lg:hidden items-center justify-center min-w-[44px] min-h-[44px] p-2.5 text-foreground touch-manipulation -mr-1 rounded-xl hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
        </button>
      </div>

      {/* Mobile & Tablet Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-border px-4 sm:px-6 py-5 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col border-b border-border/40 pb-2">
            {navLinks.map((link) => {
              const isActive = link.href === pathname;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`min-h-[44px] flex items-center text-sm font-semibold uppercase tracking-wider py-2.5 transition-colors touch-manipulation rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${
                    isActive ? 'text-primary font-bold' : 'text-slate-200 hover:text-primary'
                  }`}
                  onClick={(e) => {
                    handleNavClick(e, link.href, link.label);
                    setMenuOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Direct Lens Guides in Mobile Menu */}
            <div className="mt-2 pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {lensGuideLinks.slice(0, 3).map((lens) => (
                <Link
                  key={lens.href}
                  href={lens.href}
                  className={`min-h-[44px] flex flex-col justify-center px-3 py-2.5 rounded-xl border text-xs font-semibold transition-colors touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${
                    pathname === lens.href
                      ? 'border-primary/50 bg-primary/15 text-primary'
                      : 'border-white/10 bg-white/[0.03] text-white/90 hover:border-primary/30 hover:text-primary'
                  }`}
                  onClick={(e) => {
                    handleNavClick(e, lens.href, lens.label);
                    setMenuOpen(false);
                  }}
                >
                  <span className="block">{lens.label}</span>
                  <span className="block text-[10px] text-white/60 font-normal">
                    {lens.sublabel}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <a
              href="tel:9733220100"
              suppressHydrationWarning
              onClick={() => handlePhoneClick('mobile')}
              className="group flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wider text-white py-3 border border-white/10 rounded-xl hover:bg-white/5 hover:border-primary/30 transition-all duration-200 touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Icon name="PhoneIcon" size={12} className="text-primary" />
              </div>
              <span suppressHydrationWarning>(973) 322-0100</span>
            </a>

            <Link
              href="/#booking"
              className="w-full py-3.5 bg-primary text-[#000000] rounded-full text-sm font-bold text-center hover:bg-accent transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] touch-manipulation flex items-center justify-center shadow-[0_4px_16px_rgba(197,160,89,0.25),0_2px_4px_rgba(0,0,0,0.15)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              onClick={(e) => {
                handleBookingClick(e, 'mobile');
                setMenuOpen(false);
              }}
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
