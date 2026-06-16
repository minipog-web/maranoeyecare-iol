import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import TrustSection from '@/app/components/TrustSection';
import TrustBadgeBar from '@/app/components/TrustBadgeBar';
import CertificationLogos from '@/app/components/CertificationLogos';
import LensVisionComparisonSection from '@/app/components/LensVisionComparisonSection';
import LensarAllySection from '@/app/components/LensarAllySection';
import LifestyleMatchSection from '@/app/components/LifestyleMatchSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import LensQuestionnaireSection from '@/app/components/LensQuestionnaireSection';
import FAQSection from '@/app/components/FAQSection';
import BookingSection from '@/app/components/BookingSection';
import StickyCTABar from '@/app/components/StickyCTABar';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <TrustBadgeBar variant="clinical" />
      <hr className="section-divider" />
      <TrustSection />
      <CertificationLogos />
      <hr className="section-divider" />
      <LensVisionComparisonSection />
      <hr className="section-divider" />
      <LensarAllySection />
      <hr className="section-divider" />
      <LifestyleMatchSection />
      <hr className="section-divider" />
      <LensQuestionnaireSection />
      <hr className="section-divider" />
      <TestimonialsSection />
      <hr className="section-divider" />
      <FAQSection />
      <hr className="section-divider" />
      <BookingSection />
      <StickyCTABar />
      <Footer />
    </main>
  );
}
