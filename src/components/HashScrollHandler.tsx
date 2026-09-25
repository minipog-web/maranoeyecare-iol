'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { smoothScrollToElement } from '@/lib/ui';

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const handleScrollTarget = () => {
      let targetHash = window.location.hash?.replace(/^#/, '');

      try {
        const pending = sessionStorage.getItem('pending-scroll-hash');
        if (pending) {
          targetHash = pending;
          sessionStorage.removeItem('pending-scroll-hash');
        }
      } catch {
        // ignore storage restrictions
      }

      if (targetHash) {
        const el = document.getElementById(targetHash);
        if (el) {
          smoothScrollToElement(targetHash);
        } else {
          // Retry after short tick for delayed React components
          const timeoutId = setTimeout(() => {
            const retryEl = document.getElementById(targetHash);
            if (retryEl) {
              smoothScrollToElement(targetHash);
            }
          }, 200);
          return () => clearTimeout(timeoutId);
        }
      }
    };

    // Run after paint
    const timer = setTimeout(handleScrollTarget, 120);

    const onHashChange = () => {
      const current = window.location.hash?.replace(/^#/, '');
      if (current) {
        smoothScrollToElement(current);
      }
    };

    window.addEventListener('hashchange', onHashChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [pathname]);

  return null;
}
