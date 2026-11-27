import React from 'react';

// WeakMap to track RAF handles per DOM element to prevent layout thrashing and redundant updates
const rafMap = new WeakMap<HTMLElement, number>();

/**
 * Updates CSS custom properties `--mouse-x` and `--mouse-y` on an element
 * for interactive card spotlight/glow effects, using requestAnimationFrame
 * to eliminate layout thrashing and maintain 60fps interaction.
 */
export function handleSpotlightMouseMove(e: React.MouseEvent<HTMLElement>) {
  // Skip expensive calculations if user prefers reduced motion
  if (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  const target = e.currentTarget;
  const clientX = e.clientX;
  const clientY = e.clientY;

  const existingRaf = rafMap.get(target);
  if (existingRaf) {
    cancelAnimationFrame(existingRaf);
  }

  const rafId = requestAnimationFrame(() => {
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
    rafMap.delete(target);
  });

  rafMap.set(target, rafId);
}

/**
 * Parses and renders text containing footnote references like "[1]", "[2]"
 * into clickable sup links with proper accessibility labels.
 */
export function renderFootnoteText(
  text: string,
  options?: { withoutLink?: boolean }
): React.ReactNode {
  const parts = text.split(/(\[\d+(?:,\s*\d+)*\])/);
  return parts.map((part, idx) => {
    const match = part.match(/^\[([\d,\s]+)\]$/);
    if (match) {
      const nums = match[1].split(',').map((n) => n.trim());
      if (options?.withoutLink) {
        return (
          <sup
            key={idx}
            className="text-[10px] font-bold text-primary inline-block ml-0.5"
            aria-label={`Citation reference ${match[1]}`}
          >
            [{nums.join(', ')}]
          </sup>
        );
      }
      return (
        <sup
          key={idx}
          className="text-[10.5px] font-bold text-primary inline-flex items-center ml-0.5"
        >
          {nums.map((num, i) => (
            <React.Fragment key={num}>
              {i > 0 && <span className="mr-0.5">,</span>}
              <a
                href={`#footnote-${num}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  smoothScrollToElement(`footnote-${num}`);
                  window.history.pushState(null, '', `#footnote-${num}`);
                }}
                className="inline-flex items-center justify-center min-w-[24px] min-h-[24px] px-1 -my-1 rounded text-primary hover:underline hover:text-accent font-bold touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                aria-label={`View citation footnote ${num}`}
              >
                [{num}]
              </a>
            </React.Fragment>
          ))}
        </sup>
      );
    }
    return part;
  });
}

/**
 * Returns the ID of the bottom-of-page booking section (`bottom-booking` on the
 * homepage, falling back to `booking` or `consultation` on subpages).
 */
export function getBottomBookingTargetId(): string {
  if (typeof document !== 'undefined') {
    if (document.getElementById('bottom-booking')) return 'bottom-booking';
    if (document.getElementById('booking')) return 'booking';
    if (document.getElementById('consultation')) return 'consultation';
  }
  return 'bottom-booking';
}

const LAZY_SIMULATOR_TARGETS = new Set([
  'lenses',
  'iol-simulator',
  'vision-simulator',
  'cataract-3d-simulator',
]);

/**
 * Resolves a target ID or hash to the authoritative DOM element on the current page,
 * handling cross-page aliases and dynamic/lazy section fallbacks.
 */
export function resolveScrollTarget(targetId: string): HTMLElement | null {
  if (typeof document === 'undefined') return null;

  const cleanId = targetId.replace(/^#/, '');
  if (!cleanId) return null;

  if (cleanId === 'faqs') {
    return document.getElementById('faq') || document.getElementById('faqs');
  }

  if (cleanId === 'insurance-investment') {
    return document.getElementById('financing') || document.getElementById('insurance-investment');
  }

  if (cleanId === 'hero-quiz' || cleanId === 'lens-quiz') {
    const bookingEl = document.getElementById('booking');
    if (bookingEl?.closest('#hero-quiz')) return bookingEl;
    return document.getElementById('hero-quiz') || document.getElementById('lens-quiz');
  }

  if (cleanId === 'bottom-booking') {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      return document.getElementById('bottom-booking');
    }
    return (
      document.getElementById('bottom-booking') ||
      document.getElementById('booking') ||
      document.getElementById('consultation')
    );
  }

  if (cleanId === 'booking') {
    return document.getElementById('booking') || document.getElementById('consultation');
  }

  if (cleanId === 'lenses' || cleanId === 'iol-simulator' || cleanId === 'vision-simulator') {
    return document.getElementById(cleanId) || document.getElementById('vision');
  }

  return document.getElementById(cleanId);
}

let cancelActiveScroll: (() => void) | null = null;
let footnoteHighlightTimer: number | null = null;

/**
 * Smoothly scrolls to an element by ID with exact viewport framing:
 * - Cancels any prior in-flight scroll correction loop
 * - Unlocks `content-visibility: auto` sections during measurement
 * - Measures persistent `[data-header-bar]` height so open mobile menus do not skew offset
 * - Strips excessive section top padding to prevent previous-section bleed
 */
export function smoothScrollToElement(targetId: string, customOffset?: number) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const cleanId = targetId.replace(/^#/, '');
  if (!cleanId) return;

  if (cancelActiveScroll) {
    cancelActiveScroll();
    cancelActiveScroll = null;
  }

  const triggersTabSwitch =
    cleanId === 'booking' || cleanId === 'hero-quiz' || cleanId === 'lens-quiz';
  const triggersLazyMount = LAZY_SIMULATOR_TARGETS.has(cleanId);

  if (cleanId === 'booking') {
    window.dispatchEvent(new CustomEvent('hero-switch-tab', { detail: 'booking' }));
  } else if (cleanId === 'hero-quiz' || cleanId === 'lens-quiz') {
    window.dispatchEvent(new CustomEvent('hero-switch-tab', { detail: 'quiz' }));
  }

  if (triggersLazyMount) {
    window.dispatchEvent(new CustomEvent('activate-lazy-target', { detail: cleanId }));
  }

  document.documentElement.classList.add('force-scroll-layout');

  const initialTarget = resolveScrollTarget(cleanId);
  if (!initialTarget) {
    document.documentElement.classList.remove('force-scroll-layout');
    return;
  }

  if (cleanId.startsWith('footnote-')) {
    if (footnoteHighlightTimer !== null) {
      window.clearTimeout(footnoteHighlightTimer);
      footnoteHighlightTimer = null;
    }
    document.querySelectorAll('[data-footnote-active]').forEach((node) => {
      node.removeAttribute('data-footnote-active');
    });
    initialTarget.setAttribute('data-footnote-active', 'true');
    footnoteHighlightTimer = window.setTimeout(() => {
      initialTarget.removeAttribute('data-footnote-active');
      footnoteHighlightTimer = null;
    }, 4500);
  }

  const computeTargetScrollTop = (): number => {
    const el = resolveScrollTarget(cleanId) || initialTarget;
    const header =
      document.querySelector<HTMLElement>('[data-header-bar]') ||
      document.querySelector<HTMLElement>('header');
    const headerHeight = header ? header.getBoundingClientRect().height : 80;

    if (
      customOffset === undefined &&
      window.innerWidth >= 1024 &&
      (cleanId === 'booking' || cleanId === 'hero-quiz' || cleanId === 'lens-quiz') &&
      el.closest('#hero-quiz')
    ) {
      const rect = el.getBoundingClientRect();
      const elBottomAtZero = rect.top + window.scrollY + rect.height;
      if (elBottomAtZero <= window.innerHeight - 16) {
        return 0;
      }
    }

    let rawTop: number;
    if (el.tagName === 'SECTION' || el.id === 'consultation') {
      const sectionEl =
        el.tagName === 'SECTION' ? el : (el.querySelector('section') as HTMLElement | null) || el;
      const paddingTop = parseFloat(window.getComputedStyle(sectionEl).paddingTop) || 0;
      const breathingRoom = window.innerWidth < 640 ? 24 : 32;
      const offset =
        customOffset !== undefined
          ? customOffset
          : paddingTop >= breathingRoom
            ? headerHeight - (paddingTop - breathingRoom)
            : headerHeight + breathingRoom;
      rawTop = sectionEl.getBoundingClientRect().top + window.scrollY - offset;
    } else {
      const offset =
        customOffset !== undefined
          ? customOffset
          : headerHeight + (window.innerWidth < 640 ? 16 : 24);
      rawTop = el.getBoundingClientRect().top + window.scrollY - offset;
    }

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    return Math.min(maxScroll, Math.max(0, Math.round(rawTop)));
  };

  const prefersReduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = prefersReduced ? 'auto' : 'smooth';

  const scrollToTarget = () => {
    window.scrollTo({
      top: computeTargetScrollTop(),
      behavior,
    });
  };

  let cancelled = false;
  let initialRafId: number | null = null;
  const timerIds: number[] = [];

  const cleanupListeners = () => {
    window.removeEventListener('wheel', onUserInterrupt);
    window.removeEventListener('touchmove', onUserInterrupt);
    window.removeEventListener('keydown', onUserInterrupt);
  };

  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    if (initialRafId !== null) {
      cancelAnimationFrame(initialRafId);
      initialRafId = null;
    }
    timerIds.forEach((id) => window.clearTimeout(id));
    cleanupListeners();
    document.documentElement.classList.remove('force-scroll-layout');
  };

  const onUserInterrupt = () => {
    cancel();
  };

  cancelActiveScroll = cancel;

  window.addEventListener('wheel', onUserInterrupt, { once: true, passive: true });
  window.addEventListener('touchmove', onUserInterrupt, { once: true, passive: true });
  window.addEventListener('keydown', onUserInterrupt, { once: true, passive: true });

  if (triggersTabSwitch || triggersLazyMount) {
    initialRafId = requestAnimationFrame(() => {
      initialRafId = null;
      if (!cancelled) {
        scrollToTarget();
      }
    });
  } else {
    scrollToTarget();
  }

  // Re-align after lazy sections or intermediate `content-visibility: auto` sections expand
  [380, 850].forEach((delay) => {
    const id = window.setTimeout(() => {
      if (cancelled) return;
      const targetTop = computeTargetScrollTop();
      if (Math.abs(window.scrollY - targetTop) > 6) {
        window.scrollTo({
          top: targetTop,
          behavior,
        });
      }
    }, delay);
    timerIds.push(id);
  });

  const cleanupId = window.setTimeout(() => {
    cleanupListeners();
    document.documentElement.classList.remove('force-scroll-layout');
    if (cancelActiveScroll === cancel) {
      cancelActiveScroll = null;
    }
  }, 1200);
  timerIds.push(cleanupId);
}
