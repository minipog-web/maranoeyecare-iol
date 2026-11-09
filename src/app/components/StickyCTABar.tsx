'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { trackEvent, trackPhoneClick } from '@/lib/gtag';
import { smoothScrollToElement } from '@/lib/ui';

export default function StickyCTABar() {
  const router = useRouter();
  const phoneLinkRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const bookingEl = document.getElementById('booking');
    let isAtBooking = false;

    // Helper to sync with CallRail tracking number if another tel: link was already swapped
    const syncWithSwappedCallRail = () => {
      if (!phoneLinkRef.current) return;
      const current = phoneLinkRef.current.getAttribute('href') || '';
      if (!current.includes('9733220100') && !current.includes('973-322-0100')) {
        return; // Already swapped by CallRail
      }
      const swapped = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]')
      ).find(
        (a) =>
          a !== phoneLinkRef.current &&
          !a.href.includes('9733220100') &&
          !a.href.includes('973-322-0100') &&
          !a.href.includes('9733156439') &&
          !a.href.includes('9733580416') &&
          !a.href.includes('9738775534') &&
          !a.href.includes('9736257970')
      );
      if (swapped && swapped.href) {
        phoneLinkRef.current.href = swapped.href;
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
    if (bookingEl && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isAtBooking = entry.isIntersecting;
          setVisible(window.scrollY > 400 && !isAtBooking);
        },
        { rootMargin: '100px 0px 0px 0px' }
      );
      observer.observe(bookingEl);
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 400 && !isAtBooking);
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

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      role="complementary"
      aria-label="Book consultation"
    >
      {/* Gradient mask above the bar */}
      <div className="h-8 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />

      <div className="bg-background/98 md:backdrop-blur-xl border-t border-border/60 px-4 py-3 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          {/* Phone CTA */}
          <a
            ref={phoneLinkRef}
            href="tel:9733220100"
            suppressHydrationWarning
            onClick={handlePhoneClick}
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-border bg-white/[0.05] hover:border-primary/50 hover:bg-primary/10 transition-all touch-manipulation shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            aria-label="Call Marano Eye Care (973) 322-0100"
          >
            <Icon name="PhoneIcon" size={18} className="text-primary" />
            {/* Screen-reader target text for CallRail Dynamic Number Insertion (DNI) */}
            <span className="sr-only" suppressHydrationWarning>
              (973) 322-0100
            </span>
          </a>

          {/* Primary CTA */}
          <a
            href="#booking"
            onClick={(e) => {
              trackEvent({
                action: 'sticky_booking_click',
                category: 'Engagement',
                label: 'Book Free Consultation',
              });
              const el =
                document.getElementById('booking') || document.getElementById('consultation');
              if (el) {
                e.preventDefault();
                smoothScrollToElement(el.id);
                window.history.pushState(null, '', '#booking');
              } else {
                e.preventDefault();
                try {
                  sessionStorage.setItem('pending-scroll-hash', 'booking');
                } catch {
                  // Ignore storage write issues
                }
                router.push('/#booking');
              }
            }}
            className="flex-1 flex items-center justify-between pl-3.5 sm:pl-5 pr-2 py-2 bg-primary text-[#000000] rounded-full text-xs xs:text-sm sm:text-base font-bold hover:bg-accent transition-all active:scale-[0.98] touch-manipulation min-h-[48px] group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <span>Book Free Consultation</span>
            <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
              <Icon name="ArrowRightIcon" size={14} className="text-current" />
            </span>
          </a>

          {/* Dismiss */}
          <button
            onClick={() => {
              setDismissed(true);
              trackEvent({
                action: 'sticky_bar_dismiss',
                category: 'Engagement',
                label: 'Dismiss Sticky Bar',
              });
            }}
            className="flex items-center justify-center w-12 h-12 text-muted-foreground/50 hover:text-muted-foreground transition-colors touch-manipulation shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            aria-label="Dismiss"
          >
            <Icon name="XMarkIcon" size={18} />
          </button>
        </div>

        {/* Safe area for iPhone home indicator */}
        <div className="safe-area-pb" />
      </div>
    </div>
  );
}
