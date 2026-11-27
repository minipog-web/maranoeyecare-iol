'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { trackEvent, trackPhoneClick } from '@/lib/gtag';
import { resolveScrollTarget, smoothScrollToElement } from '@/lib/ui';

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
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Lens Options', href: '/#vision', hasDropdown: true },
    { label: 'Lens Quiz', href: '/#lens-quiz' },
    { label: 'Cataract Guide', href: '/cataract-education' },
    { label: 'Our Doctors', href: '/#trust' },
    { label: 'FAQ', href: '/#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.currentTarget.blur();
    trackEvent({
      action: 'header_nav_click',
      category: 'Engagement',
      label: label,
    });

    if (href.includes('#')) {
      const [, hash] = href.split('#');
      const canResolveHere = href.startsWith('/#')
        ? pathname === '/' || Boolean(document.getElementById(hash))
        : Boolean(document.getElementById(hash));
      const targetElement = canResolveHere ? resolveScrollTarget(hash) : null;

      // If the target element exists on the CURRENT page, smooth-scroll to it directly
      if (targetElement) {
        e.preventDefault();
        setMenuOpen(false);
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
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', pathname);
    }
  };

  const handlePhoneClick = (source: string) => {
    trackPhoneClick(`Header Call: ${source}`, '(973) 322-0100');
  };

  const handleBookingClick = (e: React.MouseEvent<HTMLAnchorElement>, source: string) => {
    e.currentTarget.blur();
    setMenuOpen(false);
    trackEvent({
      action: 'header_booking_click',
      category: 'Engagement',
      label: `Header Booking: ${source}`,
    });

    const bookingEl = resolveScrollTarget('booking');
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
          ? 'luxury-nav-blur border-b border-primary/25 shadow-[0_12px_36px_rgba(0,0,0,0.65),0_1px_0_rgba(197,160,89,0.2)]'
          : 'bg-gradient-to-b from-[#05070d]/85 via-[#05070d]/40 to-transparent'
      }`}
    >
      <div
        data-header-bar
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 2xl:px-12 h-16 sm:h-20 flex items-center justify-between gap-2 lg:gap-3 xl:gap-6"
      >
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            onClick={(e) => {
              setMenuOpen(false);
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', '/');
              }
            }}
            aria-label="Marano Eye Care: return to homepage"
            className="hover:opacity-80 transition-opacity block shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <AppLogo
              src="/assets/images/marano_logo.png"
              width={200}
              height={50}
              className="w-[112px] xs:w-[130px] sm:w-[150px] lg:w-[160px] xl:w-[195px] 2xl:w-[220px] h-auto shrink-0"
            />
          </Link>
        </div>

        {/* Desktop Nav: subtle compact pill preserving right-side conversion focus */}
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

        {/* CTA: Always visible CallRail phone + Book Evaluation pill */}
        <div className="hidden sm:flex items-center gap-2.5 lg:gap-3 xl:gap-4 shrink-0">
          <a
            href="tel:9733220100"
            suppressHydrationWarning
            onClick={() => handlePhoneClick('desktop')}
            aria-label="Call Marano Eye Care at (973) 322-0100"
            className="group flex items-center gap-2 text-sm xl:text-base font-bold text-foreground hover:text-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] touch-manipulation whitespace-nowrap rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 border border-primary/30 group-hover:bg-primary/25 group-hover:border-primary/50 transition-all duration-300">
              <Icon name="PhoneIcon" size={15} className="text-primary" />
            </div>
            <span
              className="inline font-bold text-white text-xs sm:text-sm xl:text-base tracking-wide"
              suppressHydrationWarning
            >
              (973) 322-0100
            </span>
          </a>

          <div className="h-5 w-[1px] bg-white/[0.08] hidden sm:block" />

          <Link
            href="/#booking"
            onClick={(e) => handleBookingClick(e, 'desktop')}
            className="btn-premium-primary rounded-full whitespace-nowrap text-xs sm:text-sm font-bold px-4 py-2.5 xl:px-6 xl:py-2.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none shrink-0"
          >
            Book Evaluation
          </Link>
        </div>

        {/* Mobile Quick-Call + Hamburger */}
        <div className="flex lg:hidden items-center gap-1.5 shrink-0">
          <a
            href="tel:9733220100"
            suppressHydrationWarning
            onClick={() => handlePhoneClick('mobile-header')}
            aria-label="Call Marano Eye Care (973) 322-0100"
            className="sm:hidden inline-flex items-center gap-1.5 min-h-[44px] px-2.5 xs:px-3 rounded-full border border-primary/50 bg-primary/15 text-primary text-[11px] xs:text-xs font-bold tracking-wide whitespace-nowrap active:scale-95 transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <Icon name="PhoneIcon" size={14} className="text-primary shrink-0" />
            <span suppressHydrationWarning>(973) 322-0100</span>
          </a>

          <button
            type="button"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 text-foreground touch-manipulation -mr-1 rounded-xl hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu Backdrop + Drawer */}
      {menuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-black/70 z-40"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="mobile-navigation-drawer"
            aria-label="Mobile Navigation"
            className="relative z-50 lg:hidden bg-[#0b0d14] border-b border-primary/30 px-4 sm:px-6 py-5 flex flex-col gap-4 max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
          >
            <div className="flex flex-col border-b border-border/40 pb-3">
              {navLinks.map((link) => {
                const isActive = link.href === pathname;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`min-h-[48px] flex items-center justify-between px-2 text-sm font-semibold uppercase tracking-wider py-2.5 transition-colors touch-manipulation rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${
                      isActive
                        ? 'text-primary font-bold bg-primary/10'
                        : 'text-slate-100 hover:text-primary active:bg-white/[0.05]'
                    }`}
                    onClick={(e) => {
                      handleNavClick(e, link.href, link.label);
                      setMenuOpen(false);
                    }}
                  >
                    <span>{link.label}</span>
                    <Icon name="ChevronRightIcon" size={15} className="text-primary/70 shrink-0" />
                  </Link>
                );
              })}

              {/* Direct Lens Guides in Mobile Menu */}
              <div className="mt-2.5 pt-3 border-t border-white/10">
                <p className="px-2 mb-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-primary">
                  FDA-Approved Lens Clinical Guides
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {lensGuideLinks.slice(0, 3).map((lens) => (
                    <Link
                      key={lens.href}
                      href={lens.href}
                      className={`min-h-[48px] flex items-center justify-between sm:flex-col sm:items-start sm:justify-center px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${
                        pathname === lens.href
                          ? 'border-primary/60 bg-primary/15 text-primary'
                          : 'border-white/12 bg-white/[0.04] text-white hover:border-primary/40 hover:text-primary'
                      }`}
                      onClick={(e) => {
                        handleNavClick(e, lens.href, lens.label);
                        setMenuOpen(false);
                      }}
                    >
                      <span>
                        <span className="block font-bold">{lens.label}</span>
                        <span className="block text-[11px] text-slate-300 font-normal mt-0.5">
                          {lens.sublabel}
                        </span>
                      </span>
                      <Icon
                        name="ArrowRightIcon"
                        size={14}
                        className="text-primary shrink-0 sm:hidden"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-0.5 safe-area-pb">
              <a
                href="tel:9733220100"
                suppressHydrationWarning
                onClick={() => handlePhoneClick('mobile')}
                className="group flex items-center justify-center gap-2.5 min-h-[48px] text-sm font-bold tracking-wide text-white py-3 border border-primary/40 bg-white/[0.04] rounded-full hover:bg-white/10 transition-all duration-200 touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center border border-primary/35">
                  <Icon name="PhoneIcon" size={13} className="text-primary" />
                </div>
                <span>
                  Call Desk: <span suppressHydrationWarning>(973) 322-0100</span>
                </span>
              </a>

              <Link
                href="/#booking"
                className="w-full min-h-[50px] py-3.5 bg-primary text-[#000000] rounded-full text-sm font-extrabold text-center hover:bg-accent transition-all duration-300 active:scale-[0.98] touch-manipulation flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(197,160,89,0.28)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                onClick={(e) => {
                  handleBookingClick(e, 'mobile');
                  setMenuOpen(false);
                }}
              >
                <span>Book 1-on-1 Consultation</span>
                <Icon name="ArrowRightIcon" size={15} className="text-black shrink-0" />
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
