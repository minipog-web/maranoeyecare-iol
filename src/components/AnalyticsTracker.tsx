'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, trackScrollDepth, trackEvent } from '@/lib/gtag';

function AnalyticsNavigationObserver() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);

  // Track page views on route and query param changes
  useEffect(() => {
    const searchString = searchParams?.toString();
    const url = searchString ? `${pathname}?${searchString}` : pathname;

    if (url && url !== lastTrackedPath.current) {
      lastTrackedPath.current = url;
      pageview(url);
    }
  }, [pathname, searchParams]);

  // Track engagement milestones: scroll depth (25%, 50%, 75%, 90%)
  useEffect(() => {
    const milestones = [25, 50, 75, 90];
    const reachedMilestones = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.min(100, Math.round((window.scrollY / scrollHeight) * 100));

      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !reachedMilestones.has(milestone)) {
          reachedMilestones.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Track outbound link clicks automatically
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target || !target.href) return;

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
