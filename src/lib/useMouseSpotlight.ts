import React from 'react';

/**
 * useMouseSpotlight
 * Returns event handlers to drive the CSS --mouse-x / --mouse-y custom properties
 * used by the doppel-shell / glass-card spotlight effect.
 *
 * Usage:
 *   const spotlightHandlers = useMouseSpotlight();
 *   <div {...spotlightHandlers} className="doppel-shell ...">
 */
export function useMouseSpotlight() {
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect = rect;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    let rect = (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect;
    if (!rect) {
      rect = e.currentTarget.getBoundingClientRect();
      (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect = rect;
    }
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    delete (e.currentTarget as unknown as { _cachedRect?: DOMRect })._cachedRect;
  };

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseMove: handleMouseMove,
  };
}
