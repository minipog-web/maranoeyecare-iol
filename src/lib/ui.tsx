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
export function renderFootnoteText(text: string): React.ReactNode {
  const parts = text.split(/(\[\d+(?:,\s*\d+)*\])/);
  return parts.map((part, idx) => {
    const match = part.match(/^\[([\d,\s]+)\]$/);
    if (match) {
      const nums = match[1].split(',').map((n) => n.trim());
      return (
        <sup key={idx} className="text-[9px] font-bold text-primary inline-block ml-0.5">
          [
          {nums.map((num, i) => (
            <React.Fragment key={num}>
              {i > 0 && ', '}
              <a
                href={`#footnote-${num}`}
                onClick={(e) => e.stopPropagation()}
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
