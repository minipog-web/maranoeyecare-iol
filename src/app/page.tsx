import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import TrustBadgeBar from '@/app/components/TrustBadgeBar';
import CertificationLogos from '@/app/components/CertificationLogos';
import StickyCTABar from '@/app/components/StickyCTABar';
import CandidacySection from '@/app/components/CandidacySection';
import FinancingSection from '@/app/components/FinancingSection';
import { getDynamicContent } from '@/lib/dynamicText';
import dynamic from 'next/dynamic';

// Dynamically import heavy interactive client-side components to minimize initial JS payload
const TrustSection = dynamic(() => import('@/app/components/TrustSection'));

const LensVisionComparisonSection = dynamic(
  () => import('@/app/components/LensVisionComparisonSection')
);

const LensTechnologyDeepDiveSection = dynamic(
  () => import('@/app/components/LensTechnologyDeepDiveSection')
);

const LensarAllySection = dynamic(() => import('@/app/components/LensarAllySection'));

const LifestyleMatchSection = dynamic(() => import('@/app/components/LifestyleMatchSection'));

const LensQuestionnaireSection = dynamic(() => import('@/app/components/LensQuestionnaireSection'));

const RecoveryTimelineSection = dynamic(() => import('@/app/components/RecoveryTimelineSection'));

const TestimonialsSection = dynamic(() => import('@/app/components/TestimonialsSection'));

const FAQSection = dynamic(() => import('@/app/components/FAQSection'));

const BookingSection = dynamic(() => import('@/app/components/BookingSection'));

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
      <LensTechnologyDeepDiveSection />
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
