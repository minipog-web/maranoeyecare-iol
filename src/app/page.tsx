import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import LensComparisonSection from '@/app/components/LensComparisonSection';
import LensQuestionnaireSection from '@/app/components/LensQuestionnaireSection';
import VisionVisualizerSection from '@/app/components/VisionVisualizerSection';
import LifestyleMatchSection from '@/app/components/LifestyleMatchSection';
import TrustSection from '@/app/components/TrustSection';
import BookingSection from '@/app/components/BookingSection';
import LensVisionComparisonSection from '@/app/components/LensVisionComparisonSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <LensComparisonSection />
      <LensVisionComparisonSection />
      <LensQuestionnaireSection />
      <VisionVisualizerSection />
      <LifestyleMatchSection />
      <TrustSection />
      <BookingSection />
      <Footer />
    </main>
  );
}