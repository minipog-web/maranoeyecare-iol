'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import LazySimulatorGate from '@/components/ui/LazySimulatorGate';
import { VisionSimulatorPreviewPlaceholder } from '@/components/ui/SimulatorPreviewPlaceholders';

const LensVisionComparisonSection = dynamic(
  () => import('@/app/components/LensVisionComparisonSection'),
  {
    ssr: false,
    loading: () => <VisionSimulatorPreviewPlaceholder isLoading />,
  }
);

/**
 * Lazy-loads the heavy LensVisionComparisonSection interactive simulator
 * on scroll (IntersectionObserver) or click, serving a lightweight static
 * preview placeholder until interaction.
 */
export default function LazyVisionSimulatorSection() {
  return (
    <LazySimulatorGate rootMargin="250px" placeholder={<VisionSimulatorPreviewPlaceholder />}>
      <LensVisionComparisonSection />
    </LazySimulatorGate>
  );
}
