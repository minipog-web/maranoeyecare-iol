import React from 'react';

/**
 * Updates CSS custom properties `--mouse-x` and `--mouse-y` on an element
 * for interactive card spotlight/glow effects, without dirty DOM object mutations.
 */
export function handleSpotlightMouseMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
}

/**
 * Parses and renders text containing footnote references like "[1]", "[2]"
 * into clickable sup links with proper accessibility labels.
 */
export function renderFootnoteText(text: string): React.ReactNode {
  const parts = text.split(/(\[\d+\])/);
  return parts.map((part, idx) => {
    const match = part.match(/^\[(\d+)\]$/);
    if (match) {
      const num = match[1];
      return (
        <sup key={idx} className="text-[9px] font-bold text-primary inline-block ml-0.5">
          <a
            href={`#footnote-${num}`}
            onClick={(e) => e.stopPropagation()}
            className="text-primary hover:underline hover:text-accent font-bold"
            aria-label={`View citation footnote ${num}`}
          >
            [{num}]
          </a>
        </sup>
      );
    }
    return part;
  });
}
