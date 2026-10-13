import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import TrustBadgeBar from '@/app/components/TrustBadgeBar';
import StickyCTABar from '@/app/components/StickyCTABar';

// Below-the-fold sections code-split dynamically to minimize initial bundle size and optimize LCP/FCP
const CataractEducationTeaserSection = dynamic(
  () => import('@/app/components/CataractEducationTeaserSection')
);
const LensVisionComparisonSection = dynamic(
  () => import('@/app/components/LensVisionComparisonSection')
);
const LensTechnologyDeepDiveSection = dynamic(
  () => import('@/app/components/LensTechnologyDeepDiveSection')
);
const LensarAllySection = dynamic(() => import('@/app/components/LensarAllySection'));
const RecoveryTimelineSection = dynamic(
  () => import('@/app/components/RecoveryTimelineSection')
);
const TrustSection = dynamic(() => import('@/app/components/TrustSection'));
const CertificationLogos = dynamic(() => import('@/app/components/CertificationLogos'));
const CandidacySection = dynamic(() => import('@/app/components/CandidacySection'));
const TestimonialsSection = dynamic(() => import('@/app/components/TestimonialsSection'));
const LensQuestionnaireSection = dynamic(
  () => import('@/app/components/LensQuestionnaireSection')
);
const FAQSection = dynamic(() => import('@/app/components/FAQSection'));
const InsuranceCostSection = dynamic(() => import('@/app/components/InsuranceCostSection'));
const BookingSection = dynamic(() => import('@/app/components/BookingSection'));

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
      <CataractEducationTeaserSection />
      <hr className="section-divider" />
      <LensVisionComparisonSection />
      <hr className="section-divider" />
      <LensTechnologyDeepDiveSection />
      <hr className="section-divider" />
      <LensarAllySection />
      <hr className="section-divider" />
      <RecoveryTimelineSection />
      <hr className="section-divider" />
      <TrustSection />
      <CertificationLogos />
      <hr className="section-divider" />
      <CandidacySection />
      <hr className="section-divider" />
      <TestimonialsSection />
      <hr className="section-divider" />
      <LensQuestionnaireSection />
      <hr className="section-divider" />
      <FAQSection />
      <hr className="section-divider" />
      <InsuranceCostSection />
      <hr className="section-divider" />
      <BookingSection />
      <StickyCTABar />
      <Footer />
    </main>
  );
}
