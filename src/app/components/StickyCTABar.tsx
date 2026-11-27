'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { trackEvent, trackPhoneClick } from '@/lib/gtag';
import { resolveScrollTarget, smoothScrollToElement } from '@/lib/ui';

export default function StickyCTABar() {
  const router = useRouter();
  const phoneLinkRef = useRef<HTMLAnchorElement>(null);
  const desktopPhoneLinkRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const observedElements = new Set<Element>();
    const intersectingElements = new Set<Element>();
    let isAtBookingOrFooter = false;

    // Helper to sync with CallRail tracking number if another tel: link was already swapped
    const syncWithSwappedCallRail = () => {
      const targets = [phoneLinkRef.current, desktopPhoneLinkRef.current].filter(
        Boolean
      ) as HTMLAnchorElement[];
      if (targets.length === 0) return;

      const swapped = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]')
      ).find(
        (a) =>
          !targets.includes(a) &&
          !a.href.includes('9733220100') &&
          !a.href.includes('973-322-0100') &&
          !a.href.includes('9733156439') &&
          !a.href.includes('9733580416') &&
          !a.href.includes('9738775534') &&
          !a.href.includes('9736257970')
      );
      if (swapped && swapped.href) {
        targets.forEach((el) => {
          const current = el.getAttribute('href') || '';
          if (current.includes('9733220100') || current.includes('973-322-0100')) {
            el.href = swapped.href;
          }
        });
      }
    };

    syncWithSwappedCallRail();

    // Re-trigger CallRail dynamic number swap for newly observed elements
    if (typeof window !== 'undefined') {
      const w = window as unknown as { CallTrk?: { swap?: () => void } };
      if (w.CallTrk?.swap) {
        try {
          w.CallTrk.swap();
        } catch {
          // Ignore swap errors
        }
      }
    }

    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const observeTargets = () => {
      if (!observer) return;
      const candidates = [
        document.getElementById('booking'),
        document.getElementById('bottom-booking'),
        document.getElementById('consultation'),
        document.querySelector('footer'),
      ].filter(Boolean) as Element[];

      candidates.forEach((el) => {
        if (!observedElements.has(el)) {
          observedElements.add(el);
          observer?.observe(el);
        }
      });

      if (document.getElementById('bottom-booking') || document.getElementById('booking')) {
        mutationObserver?.disconnect();
        mutationObserver = null;
      }
    };

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              intersectingElements.add(entry.target);
            } else {
              intersectingElements.delete(entry.target);
            }
          });
          isAtBookingOrFooter = intersectingElements.size > 0;
          setVisible(window.scrollY > 400 && !isAtBookingOrFooter);
        },
        { rootMargin: '100px 0px 0px 0px' }
      );

      observeTargets();

      if (
        !document.getElementById('bottom-booking') &&
        !document.getElementById('booking') &&
        typeof MutationObserver !== 'undefined'
      ) {
        mutationObserver = new MutationObserver(() => {
          observeTargets();
        });
        mutationObserver.observe(document.body, { childList: true, subtree: true });
      }
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 400 && !isAtBookingOrFooter);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [dismissed]);

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    let currentHref = e.currentTarget.getAttribute('href') || 'tel:9733220100';

    // If still pointing to raw office number, do a fallback check for any swapped CallRail link on the page
    if (currentHref.includes('9733220100') || currentHref.includes('973-322-0100')) {
      const swapped = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]')
      ).find(
        (a) =>
          a !== e.currentTarget &&
          !a.href.includes('9733220100') &&
          !a.href.includes('973-322-0100') &&
          !a.href.includes('9733156439') &&
          !a.href.includes('9733580416') &&
          !a.href.includes('9738775534') &&
          !a.href.includes('9736257970')
      );
      if (swapped && swapped.href) {
        currentHref = swapped.href;
        e.currentTarget.setAttribute('href', currentHref);
      }
    }

    const dialedNumber = currentHref.replace('tel:', '').trim();
    trackPhoneClick(`Sticky CTA Bar: ${dialedNumber}`, dialedNumber);
  };

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent({
      action: 'sticky_booking_click',
      category: 'Conversion',
      label: 'Book Consultation',
    });
    const el =
      resolveScrollTarget('bottom-booking') ||
      resolveScrollTarget('booking') ||
      document.getElementById('consultation');
    if (el) {
      e.preventDefault();
      smoothScrollToElement(el.id);
      window.history.pushState(null, '', `#${el.id}`);
    } else {
      e.preventDefault();
      try {
        sessionStorage.setItem('pending-scroll-hash', 'bottom-booking');
      } catch {
        // Ignore storage write issues
      }
      router.push('/#bottom-booking');
    }
  };

  if (dismissed) return null;

  return (
    <>
      {/* Mobile Sticky Bottom Bar: Explicit Call Now + Book Consult */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-out ${
          visible
            ? 'translate-y-0 opacity-100 pointer-events-auto visible'
            : 'translate-y-full opacity-0 pointer-events-none invisible'
        }`}
        role="complementary"
        aria-label="Quick consultation actions"
        aria-hidden={!visible}
      >
        <div className="h-6 bg-gradient-to-t from-background/85 to-transparent pointer-events-none" />

        <div className="bg-[#0d0e12] border-t border-primary/40 px-3 py-2.5 shadow-[0_-10px_34px_rgba(0,0,0,0.85)]">
          <div className="flex items-center gap-2">
            {/* Explicit Mobile Call CTA */}
            <a
              ref={phoneLinkRef}
              href="tel:9733220100"
              suppressHydrationWarning
              tabIndex={visible ? 0 : -1}
              onClick={handlePhoneClick}
              className="flex-1 flex items-center justify-center gap-1.5 px-2.5 xs:px-3 py-2.5 min-h-[48px] rounded-full border-2 border-primary bg-[#161a24] text-white hover:bg-[#1f2533] text-xs xs:text-sm font-bold text-center leading-tight transition-all active:scale-[0.98] touch-manipulation shadow-[0_2px_12px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              aria-label="Call Marano Eye Care (973) 322-0100"
            >
              <Icon name="PhoneIcon" size={16} className="text-primary shrink-0" />
              <span>Call Now</span>
              <span className="sr-only" suppressHydrationWarning>
                (973) 322-0100
              </span>
            </a>

            {/* Primary Book CTA */}
            <a
              href="#bottom-booking"
              tabIndex={visible ? 0 : -1}
              onClick={handleBookClick}
              className="flex-[1.35] flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-2.5 bg-primary text-[#000000] rounded-full text-xs xs:text-sm font-bold text-center leading-tight hover:bg-accent transition-all active:scale-[0.98] touch-manipulation min-h-[48px] group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <span>Book Consult</span>
              <Icon
                name="ArrowRightIcon"
                size={14}
                className="text-black shrink-0 transition-transform group-hover:translate-x-0.5"
              />
            </a>

            {/* Compact Dismiss (44x44px minimum target) */}
            <button
              type="button"
              tabIndex={visible ? 0 : -1}
              onClick={() => {
                setDismissed(true);
                trackEvent({
                  action: 'sticky_bar_dismiss',
                  category: 'Engagement',
                  label: 'Dismiss Sticky Bar (Mobile)',
                });
              }}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full text-slate-300 hover:text-white active:bg-white/10 transition-colors touch-manipulation shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              aria-label="Dismiss quick actions bar"
            >
              <Icon name="XMarkIcon" size={18} />
            </button>
          </div>
          <div className="safe-area-pb" />
        </div>
      </div>

      {/* Desktop & Tablet Floating Conversion Bar */}
      <div
        className={`hidden md:block fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2.5rem)] max-w-4xl transition-all duration-300 ease-out ${
          visible
            ? 'translate-y-0 opacity-100 pointer-events-auto visible'
            : 'translate-y-8 opacity-0 pointer-events-none invisible'
        }`}
        role="complementary"
        aria-label="Schedule cataract consultation"
        aria-hidden={!visible}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3 rounded-full bg-[#0e1017]/95 backdrop-blur-xl border border-primary/35 shadow-[0_14px_45px_rgba(0,0,0,0.65),0_0_25px_rgba(197,160,89,0.14)]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.85)]" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">
                One-Time Cataract Lens Window ·{' '}
                <span className="text-primary">$0 Toric Astigmatism Upgrade</span>
              </p>
              <p className="text-xs text-muted-foreground truncate">
                4.9★ (650+ NJ Reviews) · Livingston, Denville &amp; Newark · Medicare Accepted
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              ref={desktopPhoneLinkRef}
              href="tel:9733220100"
              suppressHydrationWarning
              onClick={handlePhoneClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/40 bg-white/[0.04] hover:bg-primary/15 hover:border-primary text-white text-sm font-bold transition-all whitespace-nowrap min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Icon name="PhoneIcon" size={15} className="text-primary shrink-0" />
              <span suppressHydrationWarning>(973) 322-0100</span>
            </a>

            <a
              href="#bottom-booking"
              onClick={handleBookClick}
              className="btn-premium-chic inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-[#000000] rounded-full text-sm font-bold hover:bg-accent transition-all whitespace-nowrap min-h-[44px] group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <span>Book Consultation</span>
              <Icon
                name="ArrowRightIcon"
                size={15}
                className="text-black shrink-0 transition-transform group-hover:translate-x-0.5"
              />
            </a>

            <button
              onClick={() => {
                setDismissed(true);
                trackEvent({
                  action: 'sticky_bar_dismiss',
                  category: 'Engagement',
                  label: 'Dismiss Sticky Bar (Desktop)',
                });
              }}
              className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground/75 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              aria-label="Dismiss consultation bar"
            >
              <Icon name="XMarkIcon" size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
