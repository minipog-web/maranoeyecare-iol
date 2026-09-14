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
import TrustSection from '@/app/components/TrustSection';
import CataractEducationTeaserSection from '@/app/components/CataractEducationTeaserSection';
import LensVisionComparisonSection from '@/app/components/LensVisionComparisonSection';
import LensTechnologyDeepDiveSection from '@/app/components/LensTechnologyDeepDiveSection';
import LensarAllySection from '@/app/components/LensarAllySection';
import LensQuestionnaireSection from '@/app/components/LensQuestionnaireSection';
import RecoveryTimelineSection from '@/app/components/RecoveryTimelineSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import FAQSection from '@/app/components/FAQSection';
import BookingSection from '@/app/components/BookingSection';

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
