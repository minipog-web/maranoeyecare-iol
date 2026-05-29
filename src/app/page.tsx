import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import TrustSection from '@/app/components/TrustSection';
import TrustBadgeBar from '@/app/components/TrustBadgeBar';
import LensVisionComparisonSection from '@/app/components/LensVisionComparisonSection';
import VisionVisualizerSection from '@/app/components/VisionVisualizerSection';
import LifestyleMatchSection from '@/app/components/LifestyleMatchSection';
import LensQuestionnaireSection from '@/app/components/LensQuestionnaireSection';
import FAQSection from '@/app/components/FAQSection';
import BookingSection from '@/app/components/BookingSection';
import StickyCTABar from '@/app/components/StickyCTABar';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <TrustSection />
      <TrustBadgeBar variant="clinical" />
      <LensVisionComparisonSection />
      <VisionVisualizerSection />
      <TrustBadgeBar variant="authority" />
      <LifestyleMatchSection />
      <LensQuestionnaireSection />
      <TrustBadgeBar variant="safety" />
      <FAQSection />
      <BookingSection />
      <StickyCTABar />
      <Footer />
    </main>
  );
}

