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
const RecoveryTimelineSection = dynamic(() => import('@/app/components/RecoveryTimelineSection'));
const TrustSection = dynamic(() => import('@/app/components/TrustSection'));
const CertificationLogos = dynamic(() => import('@/app/components/CertificationLogos'));
const CandidacySection = dynamic(() => import('@/app/components/CandidacySection'));
const TestimonialsSection = dynamic(() => import('@/app/components/TestimonialsSection'));
const LensQuestionnaireSection = dynamic(() => import('@/app/components/LensQuestionnaireSection'));
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

const homeSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://premium-iol.maranoeye.com/#webpage',
    url: 'https://premium-iol.maranoeye.com',
    name: 'Premium Cataract Lens Options & IOLs | Marano Eye Care NJ',
    description:
      "Compare Clareon Vivity, PanOptix Pro, and TECNIS PureSee IOLs at Marano Eye Care. Book a consultation with NJ's top-rated ophthalmic microsurgeons, Dr. Matthew Marano Jr., MD & Dr. Sherief Raouf, MD.",
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Cataract Patients, Presbyopia Patients, Astigmatism Patients',
    },
    aspect: ['Overview', 'Diagnosis', 'Treatment Options', 'Risks and Benefits'],
    about: [
      {
        '@type': 'MedicalCondition',
        name: 'Cataract',
        possibleTreatment: {
          '@type': 'MedicalProcedure',
          name: 'Cataract Surgery with Premium IOL Implantation',
        },
      },
      {
        '@type': 'MedicalCondition',
        name: 'Astigmatism',
        possibleTreatment: {
          '@type': 'MedicalDevice',
          name: 'Toric Intraocular Lens',
        },
      },
      {
        '@type': 'MedicalCondition',
        name: 'Presbyopia',
        possibleTreatment: {
          '@type': 'MedicalDevice',
          name: 'Multifocal and Extended Depth of Focus (EDOF) IOLs',
        },
      },
    ],
    author: [
      {
        '@type': 'Physician',
        name: 'Dr. Matthew Marano Jr., MD',
        jobTitle: 'Founder & Chief of Ophthalmology',
        medicalSpecialty: 'Ophthalmology',
        almaMater: 'New Jersey Medical School',
        hospitalAffiliation: [
          {
            '@type': 'Hospital',
            name: 'Cooperman Barnabas Medical Center',
          },
          {
            '@type': 'Hospital',
            name: "St. Michael's Medical Center",
          },
        ],
        url: 'https://www.maranoeyecare.com/provider/matthew-j-marano-jr-md',
        image: 'https://premium-iol.maranoeye.com/assets/images/Marano-1777328574709.jpg',
        sameAs: [
          'https://www.maranoeyecare.com/provider/matthew-j-marano-jr-md',
          'https://www.healthgrades.com/physician/dr-matthew-marano-ykk4n',
          'https://doctor.webmd.com/doctor/matthew-marano-7f897b2f-90e6-4d05-950c-e2f6ce834ef1-overview',
          'https://www.castleconnolly.com/clinicians/ophthalmology/matthew-j-marano-jr/48590',
        ],
      },
      {
        '@type': 'Physician',
        name: 'Dr. Sherief Raouf, MD',
        jobTitle: 'Board-Certified Ophthalmologist & Cornea Subspecialist',
        medicalSpecialty: ['Ophthalmology', 'Corneal and External Diseases', 'Refractive Surgery'],
        almaMater: 'Renaissance School of Medicine at Stony Brook University',
        alumniOf: [
          'Renaissance School of Medicine at Stony Brook University',
          'Manhattan Eye, Ear & Throat Hospital (Residency)',
          'Illinois Eye and Ear Infirmary (UIC - Fellowship)',
        ],
        url: 'https://www.maranoeyecare.com/provider/sherief-raouf-md',
        image: 'https://premium-iol.maranoeye.com/assets/images/Raouf.jpg',
        sameAs: ['https://www.maranoeyecare.com/provider/sherief-raouf-md'],
      },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      {homeSchemas.map((schema, index) => (
        <script
          key={`home-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

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
    </>
  );
}
