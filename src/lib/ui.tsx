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
            className="text-[9px] font-bold text-primary inline-block ml-0.5"
            aria-label={`Citation reference ${match[1]}`}
          >
            [{nums.join(', ')}]
          </sup>
        );
      }
      return (
        <sup key={idx} className="text-[9px] font-bold text-primary inline-block ml-0.5">
          [
          {nums.map((num, i) => (
            <React.Fragment key={num}>
              {i > 0 && ', '}
              <a
                href={`#footnote-${num}`}
                className="text-primary hover:underline hover:text-accent font-bold"
                aria-label={`View citation footnote ${num}`}
              >
                {num}
              </a>
            </React.Fragment>
          ))}
          ]
        </sup>
      );
    }
    return part;
  });
}

/**
 * Smoothly scrolls to an element by ID, calculating the fixed header height
 * and ensuring optimal viewport visibility below the navigation bar.
 */
export function smoothScrollToElement(targetId: string, customOffset?: number) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const cleanId = targetId.replace(/^#/, '');
  const target = document.getElementById(cleanId);
  if (!target) return;

  // Calculate dynamic header height with a comfortable margin
  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : 80;
  const offset = customOffset !== undefined ? customOffset : headerHeight + 20;

  const elementPosition = target.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = Math.max(0, elementPosition - offset);

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}
