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
import CandidacySection from '@/app/components/CandidacySection';
import RecoveryTimelineSection from '@/app/components/RecoveryTimelineSection';
import FinancingSection from '@/app/components/FinancingSection';
import { getDynamicContent } from '@/lib/dynamicText';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const dynamicContent = getDynamicContent(resolvedParams);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection
        badgeText={dynamicContent.badgeText}
        heroTitleLine1={dynamicContent.heroTitleLine1}
        heroTitleLine2={dynamicContent.heroTitleLine2}
        heroDesc={dynamicContent.heroDesc}
      />
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
      <CandidacySection />
      <hr className="section-divider" />
      <LensQuestionnaireSection />
      <hr className="section-divider" />
      <RecoveryTimelineSection />
      <hr className="section-divider" />
      <TestimonialsSection />
      <hr className="section-divider" />
      <FAQSection />
      <hr className="section-divider" />
      <FinancingSection />
      <hr className="section-divider" />
      <BookingSection
        bookingHeadline={dynamicContent.bookingHeadline}
        bookingUrgencyTitle={dynamicContent.bookingUrgencyTitle}
        bookingUrgencyText={dynamicContent.bookingUrgencyText}
        preselectedLens={dynamicContent.preselectedLens}
      />
      <StickyCTABar />
      <Footer />
    </main>
  );
}
