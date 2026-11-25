'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, trackScrollDepth, trackEvent, trackPhoneClick } from '@/lib/gtag';
import { captureTrackingParams } from '@/lib/tracking-params';

function AnalyticsNavigationObserver() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);

  // Capture Google Ads Click IDs and UTM params, and track page views
  useEffect(() => {
    captureTrackingParams();
    const searchString = searchParams?.toString();
    const url = searchString ? `${pathname}?${searchString}` : pathname;

    if (url && url !== lastTrackedPath.current) {
      lastTrackedPath.current = url;
      pageview(url);

      // Re-trigger CallRail dynamic number swap on client-side route transitions
      if (typeof window !== 'undefined' && window.CallTrk?.swap) {
        try {
          window.CallTrk.swap();
        } catch {
          // Ignore swap errors
        }
      }
    }
  }, [pathname, searchParams]);

  // Re-trigger CallRail swap when dynamically imported sections mount new tel: links
  useEffect(() => {
    if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

    const rawOfficeDigits = ['9733220100', '9736257970', '9738775534'];
    let swapTimer: ReturnType<typeof setTimeout> | null = null;

    const hasUnswappedOfficeLink = (node: Node): boolean => {
      if (!(node instanceof Element)) return false;
      const links = node.matches('a[href^="tel:"]')
        ? [node]
        : Array.from(node.querySelectorAll('a[href^="tel:"]'));
      return links.some((el) => {
        const digits = (el.getAttribute('href') || '').replace(/\D/g, '');
        return rawOfficeDigits.some((raw) => digits.endsWith(raw));
      });
    };

    const observer = new MutationObserver((mutations) => {
      const addedOfficeLink = mutations.some((m) =>
        Array.from(m.addedNodes).some(hasUnswappedOfficeLink)
      );
      if (!addedOfficeLink) return;

      if (swapTimer) clearTimeout(swapTimer);
      swapTimer = setTimeout(() => {
        if (window.CallTrk?.swap) {
          try {
            window.CallTrk.swap();
          } catch {
            // Ignore swap errors
          }
        }
      }, 250);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (swapTimer) clearTimeout(swapTimer);
    };
  }, []);

  // Track engagement milestones: scroll depth (25%, 50%, 75%, 90%)
  useEffect(() => {
    const milestones = [25, 50, 75, 90];
    const reachedMilestones = new Set<number>();

    let ticking = false;
    let lastCheck = 0;
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastCheck < 300) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          lastCheck = Date.now();
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollHeight > 0) {
            const scrollPercent = Math.min(100, Math.round((window.scrollY / scrollHeight) * 100));

            for (const milestone of milestones) {
              if (scrollPercent >= milestone && !reachedMilestones.has(milestone)) {
                reachedMilestones.add(milestone);
                trackScrollDepth(milestone);
              }
            }

            if (reachedMilestones.size === milestones.length) {
              window.removeEventListener('scroll', handleScroll);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Track outbound link clicks, phone calls, and email clicks automatically
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target || !target.href) return;

      // Automatically capture all tel: clicks across entire site
      if (target.href.startsWith('tel:')) {
        const phone = target.href.replace('tel:', '').trim();
        const trackingLabel =
          target.getAttribute('data-tracking-label') ||
          target.getAttribute('aria-label') ||
          target.innerText?.trim() ||
          phone;
        trackPhoneClick(trackingLabel, phone);
        return;
      }

      // Automatically capture all mailto: clicks
      if (target.href.startsWith('mailto:')) {
        const email = target.href.replace('mailto:', '').split('?')[0].trim();
        trackEvent({
          action: 'contact',
          category: 'Conversion',
          label: email,
          customParams: {
            method: 'email',
            email_address: email,
          },
        });
        return;
      }

      try {
        const url = new URL(target.href);
        const isExternal =
          url.hostname !== window.location.hostname &&
          !target.href.startsWith('tel:') &&
          !target.href.startsWith('mailto:');

        if (isExternal) {
          trackEvent({
            action: 'outbound_link_click',
            category: 'Engagement',
            label: target.href,
            customParams: {
              outbound: true,
              link_url: target.href,
              link_domain: url.hostname,
            },
          });
        }
      } catch {
        // Ignore invalid URLs
      }
    };

    document.addEventListener('click', handleDocumentClick, { passive: true });
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return null;
}

export default function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <AnalyticsNavigationObserver />
    </Suspense>
  );
}
