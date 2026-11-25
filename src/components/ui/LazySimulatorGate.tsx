'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LazySimulatorGateProps {
  children?: React.ReactNode;
  render?: () => React.ReactNode;
  placeholder: React.ReactNode;
  rootMargin?: string;
  loadOnScroll?: boolean;
  loadOnClick?: boolean;
  forceActivate?: boolean;
  className?: string;
  onActivate?: (trigger: 'scroll' | 'click') => void;
}

/**
 * Strictly defers mounting (and dynamic WebGL / Three.js / high-res asset chunk fetching)
 * until after initial layout stabilizes AND the container approaches the viewport
 * via IntersectionObserver, or when the user clicks to activate immediately.
 */
export default function LazySimulatorGate({
  children,
  render,
  placeholder,
  rootMargin = '120px',
  loadOnScroll = true,
  loadOnClick = true,
  forceActivate = false,
  className = '',
  onActivate,
}: LazySimulatorGateProps) {
  const [isActivated, setIsActivated] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onActivateRef = useRef(onActivate);

  useEffect(() => {
    onActivateRef.current = onActivate;
  }, [onActivate]);

  useEffect(() => {
    if (forceActivate && !isActivated) {
      setIsActivated(true);
      onActivateRef.current?.('click');
    }
  }, [forceActivate, isActivated]);

  useEffect(() => {
    if (isActivated || !loadOnScroll) return;

    let observer: IntersectionObserver | null = null;
    // Allow above-the-fold & preceding dynamic sections to settle before observing
    // so below-the-fold WebGL chunks never false-trigger on initial page paint.
    const timerId = window.setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;

      if (typeof IntersectionObserver === 'undefined') {
        setIsActivated(true);
        onActivateRef.current?.('scroll');
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setIsActivated(true);
            onActivateRef.current?.('scroll');
            observer?.disconnect();
          }
        },
        { rootMargin, threshold: 0.05 }
      );

      observer.observe(el);
    }, 180);

    return () => {
      window.clearTimeout(timerId);
      observer?.disconnect();
    };
  }, [isActivated, loadOnScroll, rootMargin]);

  const handleClickActivate = () => {
    if (!loadOnClick || isActivated) return;
    setIsActivated(true);
    onActivateRef.current?.('click');
  };

  return (
    <div ref={containerRef} className={className}>
      {isActivated ? (
        render ? (
          render()
        ) : (
          children
        )
      ) : (
        <div
          onClick={loadOnClick ? handleClickActivate : undefined}
          className={loadOnClick ? 'cursor-pointer' : undefined}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}
