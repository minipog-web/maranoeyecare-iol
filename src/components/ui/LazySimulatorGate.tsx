'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LazySimulatorGateProps {
  children: React.ReactNode;
  placeholder: React.ReactNode;
  rootMargin?: string;
  loadOnScroll?: boolean;
  loadOnClick?: boolean;
  className?: string;
  onActivate?: (trigger: 'scroll' | 'click') => void;
}

/**
 * Defers mounting (and therefore dynamic chunk loading + WebGL/image initialization)
 * of heavy interactive simulators until the container approaches the viewport
 * (via IntersectionObserver) or the user clicks the static preview placeholder.
 */
export default function LazySimulatorGate({
  children,
  placeholder,
  rootMargin = '250px',
  loadOnScroll = true,
  loadOnClick = true,
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
    if (isActivated || !loadOnScroll) return;
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsActivated(true);
      onActivateRef.current?.('scroll');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsActivated(true);
          onActivateRef.current?.('scroll');
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isActivated, loadOnScroll, rootMargin]);

  const handleClickActivate = () => {
    if (!loadOnClick || isActivated) return;
    setIsActivated(true);
    onActivateRef.current?.('click');
  };

  return (
    <div ref={containerRef} className={className}>
      {isActivated ? (
        children
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
