import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import TrustBadgeBar from '@/app/components/TrustBadgeBar';
import CertificationLogos from '@/app/components/CertificationLogos';
import StickyCTABar from '@/app/components/StickyCTABar';
import CandidacySection from '@/app/components/CandidacySection';
import InsuranceCostSection from '@/app/components/InsuranceCostSection';
import { getDynamicContent } from '@/lib/dynamicText';
import dynamic from 'next/dynamic';

// Dynamically import heavy interactive client-side components to minimize initial JS payload
const SkeletonLoader = () => (
  <div className="min-h-[400px] w-full bg-background/50 flex items-center justify-center p-8">
    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
  </div>
);

const TrustSection = dynamic(() => import('@/app/components/TrustSection'), {
  loading: SkeletonLoader,
});

const CataractFormationSection = dynamic(
  () => import('@/app/components/CataractFormationSection'),
  { loading: SkeletonLoader }
);

const LensVisionComparisonSection = dynamic(
  () => import('@/app/components/LensVisionComparisonSection'),
  { loading: SkeletonLoader }
);

const LensTechnologyDeepDiveSection = dynamic(
  () => import('@/app/components/LensTechnologyDeepDiveSection'),
  { loading: SkeletonLoader }
);

const LensarAllySection = dynamic(() => import('@/app/components/LensarAllySection'), {
  loading: SkeletonLoader,
});

const LifestyleMatchSection = dynamic(() => import('@/app/components/LifestyleMatchSection'), {
  loading: SkeletonLoader,
});

const LensQuestionnaireSection = dynamic(
  () => import('@/app/components/LensQuestionnaireSection'),
  { loading: SkeletonLoader }
);

const RecoveryTimelineSection = dynamic(() => import('@/app/components/RecoveryTimelineSection'), {
  loading: SkeletonLoader,
});

const TestimonialsSection = dynamic(() => import('@/app/components/TestimonialsSection'), {
  loading: SkeletonLoader,
});

const FAQSection = dynamic(() => import('@/app/components/FAQSection'), {
  loading: SkeletonLoader,
});

const BookingSection = dynamic(() => import('@/app/components/BookingSection'), {
  loading: SkeletonLoader,
});

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
      <CataractFormationSection />
      <hr className="section-divider" />
      <LensVisionComparisonSection />
      <hr className="section-divider" />
      <LensTechnologyDeepDiveSection />
      <hr className="section-divider" />
      <div className="content-auto">
        <LifestyleMatchSection />
      </div>
      <hr className="section-divider" />
      <div className="content-auto">
        <LensarAllySection />
      </div>
      <hr className="section-divider" />
      <div className="content-auto">
        <RecoveryTimelineSection />
      </div>
      <hr className="section-divider" />
      <div className="content-auto">
        <TrustSection />
      </div>
      <CertificationLogos />
      <hr className="section-divider" />
      <div className="content-auto">
        <CandidacySection />
      </div>
      <hr className="section-divider" />
      <div className="content-auto">
        <TestimonialsSection />
      </div>
      <hr className="section-divider" />
      <div className="content-auto">
        <LensQuestionnaireSection />
      </div>
      <hr className="section-divider" />
      <div className="content-auto">
        <FAQSection />
      </div>
      <hr className="section-divider" />
      <div className="content-auto">
        <InsuranceCostSection />
      </div>
      <hr className="section-divider" />
      <div className="content-auto">
        <BookingSection
          bookingHeadline={dynamicContent.bookingHeadline}
          bookingUrgencyTitle={dynamicContent.bookingUrgencyTitle}
          bookingUrgencyText={dynamicContent.bookingUrgencyText}
          preselectedLens={dynamicContent.preselectedLens}
        />
      </div>
      <StickyCTABar />
      <Footer />
    </main>
  );
}
