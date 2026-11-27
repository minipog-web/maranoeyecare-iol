'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { resolveScrollTarget, smoothScrollToElement } from '@/lib/ui';

const LAZY_HASHES = new Set([
  'lenses',
  'iol-simulator',
  'vision-simulator',
  'cataract-3d-simulator',
]);

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    let pollInterval: number | null = null;
    let initialTimer: number | null = null;

    const clearTimers = () => {
      if (initialTimer !== null) {
        window.clearTimeout(initialTimer);
        initialTimer = null;
      }
      if (pollInterval !== null) {
        window.clearInterval(pollInterval);
        pollInterval = null;
      }
    };

    const handleScrollTarget = () => {
      let targetHash = window.location.hash?.replace(/^#/, '') || '';

      try {
        const pending = sessionStorage.getItem('pending-scroll-hash');
        if (pending) {
          targetHash = pending.replace(/^#/, '');
          sessionStorage.removeItem('pending-scroll-hash');
        }
      } catch {
        // ignore storage restrictions
      }

      if (!targetHash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        return;
      }

      if (LAZY_HASHES.has(targetHash)) {
        window.dispatchEvent(new CustomEvent('activate-lazy-target', { detail: targetHash }));
      }

      const immediateEl = resolveScrollTarget(targetHash);
      if (immediateEl) {
        smoothScrollToElement(targetHash);
        return;
      }

      const startTime = Date.now();
      pollInterval = window.setInterval(() => {
        const el = resolveScrollTarget(targetHash);
        if (el) {
          if (pollInterval !== null) {
            window.clearInterval(pollInterval);
            pollInterval = null;
          }
          smoothScrollToElement(targetHash);
        } else if (Date.now() - startTime > 2000) {
          if (pollInterval !== null) {
            window.clearInterval(pollInterval);
            pollInterval = null;
          }
        }
      }, 60);
    };

    initialTimer = window.setTimeout(handleScrollTarget, 80);

    const onHashOrPopState = () => {
      const current = window.location.hash?.replace(/^#/, '') || '';
      if (current) {
        if (LAZY_HASHES.has(current)) {
          window.dispatchEvent(new CustomEvent('activate-lazy-target', { detail: current }));
        }
        smoothScrollToElement(current);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };

    const onDocumentClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.hash
      ) {
        const hashId = url.hash.replace(/^#/, '');
        if (LAZY_HASHES.has(hashId)) {
          window.dispatchEvent(new CustomEvent('activate-lazy-target', { detail: hashId }));
        }
        if (resolveScrollTarget(hashId)) {
          e.preventDefault();
          smoothScrollToElement(hashId);
          window.history.pushState(null, '', url.hash);
        }
      }
    };

    window.addEventListener('hashchange', onHashOrPopState);
    window.addEventListener('popstate', onHashOrPopState);
    document.addEventListener('click', onDocumentClick);

    return () => {
      clearTimers();
      window.removeEventListener('hashchange', onHashOrPopState);
      window.removeEventListener('popstate', onHashOrPopState);
      document.removeEventListener('click', onDocumentClick);
    };
  }, [pathname]);

  return null;
}
