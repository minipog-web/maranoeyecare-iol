'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';
import styles from './StickyCTABar.module.css';

export default function StickyCTABar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px (past the hero)
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <div className="bg-background/95 backdrop-blur-2xl border-t border-border/60 px-4 py-3 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          {/* Phone CTA */}
          <a
            href="tel:9733220100"
            onClick={() =>
              trackEvent({
                action: 'phone_click',
                category: 'Conversion',
                label: 'Sticky CTA Bar: 9733220100',
              })
            }
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-border bg-white/[0.05] hover:border-primary/50 hover:bg-primary/10 transition-all touch-manipulation shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            aria-label="Call us"
          >
            <Icon name="PhoneIcon" size={18} className="text-primary" />
          </a>

          {/* Primary CTA */}
          <a
            href="#booking"
            onClick={() =>
              trackEvent({
                action: 'sticky_booking_click',
                category: 'Engagement',
                label: 'Book Free Consultation',
              })
            }
            className="flex-1 flex items-center justify-between pl-5 pr-3 py-2.5 bg-primary text-[#040506] rounded-xl text-sm font-semibold hover:bg-accent transition-all active:scale-[0.98] touch-manipulation min-h-[48px] shadow-[0_4px_16px_rgba(197,160,89,0.25),0_2px_4px_rgba(0,0,0,0.15)] group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <span>Book Free Consultation</span>
            <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
              <Icon name="ArrowRightIcon" size={13} />
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
            className="flex items-center justify-center w-8 h-8 text-muted-foreground/50 hover:text-muted-foreground transition-colors touch-manipulation shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            aria-label="Dismiss"
          >
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>

        {/* Safe area for iPhone home indicator */}
        <div className={styles.safeAreaBottom} />
      </div>
    </div>
  );
}
