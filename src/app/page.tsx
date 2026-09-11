import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import TrustBadgeBar from '@/app/components/TrustBadgeBar';
import CertificationLogos from '@/app/components/CertificationLogos';
import StickyCTABar from '@/app/components/StickyCTABar';
import CandidacySection from '@/app/components/CandidacySection';
import InsuranceCostSection from '@/app/components/InsuranceCostSection';
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

const CataractEducationTeaserSection = dynamic(
  () => import('@/app/components/CataractEducationTeaserSection'),
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

export const metadata: Metadata = {
  title: 'Premium Cataract Lens Options & IOLs | Marano Eye Care NJ',
  description:
    "Compare Clareon Vivity, PanOptix Pro, and TECNIS PureSee IOLs at Marano Eye Care. Book a consultation with NJ's top-rated ophthalmic microsurgeons, Dr. Matthew Marano Jr., MD & Dr. Sherief Raouf, MD.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Premium Cataract Lens Options & IOLs | Marano Eye Care NJ',
    description:
      'Compare Clareon Vivity, PanOptix Pro, and TECNIS PureSee IOLs at Marano Eye Care. Discover customized multi-distance vision freedom with Dr. Matthew Marano Jr., MD & Dr. Sherief Raouf, MD.',
    url: 'https://premium-iol.maranoeye.com',
    siteName: 'Marano Eye Care',
    images: [
      {
        url: '/assets/images/vivity_hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium Cataract Lens Options at Marano Eye Care',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <TrustBadgeBar variant="clinical" />
      <hr className="section-divider" />
      <div className="content-auto">
        <CataractEducationTeaserSection />
      </div>
      <hr className="section-divider" />
      <div className="content-auto">
        <LensVisionComparisonSection />
      </div>
      <hr className="section-divider" />
      <div className="content-auto">
        <LensTechnologyDeepDiveSection />
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
        <BookingSection />
      </div>
      <StickyCTABar />
      <Footer />
    </main>
  );
}
