import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import StickyCTABar from '@/app/components/StickyCTABar';

// Below-the-fold sections code-split dynamically to minimize initial mobile JS bundle and optimize LCP/FCP
const TrustSection = dynamic(() => import('@/app/components/TrustSection'));
const CertificationLogos = dynamic(() => import('@/app/components/CertificationLogos'));
const TestimonialsSection = dynamic(() => import('@/app/components/TestimonialsSection'));
const CataractEducationTeaserSection = dynamic(
  () => import('@/app/components/CataractEducationTeaserSection')
);
const InteractiveMediaHubSection = dynamic(
  () => import('@/app/components/InteractiveMediaHubSection')
);
const LensarAllySection = dynamic(() => import('@/app/components/LensarAllySection'));
const RecoveryTimelineSection = dynamic(() => import('@/app/components/RecoveryTimelineSection'));
const CandidacySection = dynamic(() => import('@/app/components/CandidacySection'));
const InsuranceCostSection = dynamic(() => import('@/app/components/InsuranceCostSection'));
const FAQSection = dynamic(() => import('@/app/components/FAQSection'));
const BookingSection = dynamic(() => import('@/app/components/BookingSection'));

export const metadata: Metadata = {
  title: 'Laser Cataract Surgery & Premium IOLs NJ | Marano Eye Care',
  description:
    'Compare Clareon Vivity, PanOptix Pro & TECNIS PureSee lenses in Livingston, Denville & Newark, NJ. 40,000+ surgeries, 4.9★ (650+ reviews) & $0 Toric upgrade.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Laser Cataract Surgery & Premium IOLs NJ | Marano Eye Care',
    description:
      'Compare Clareon Vivity, PanOptix Pro & TECNIS PureSee IOLs at Marano Eye Care. Bladeless LENSAR laser precision, $0 Toric upgrade & 40,000+ NJ procedures.',
    url: 'https://premium-iol.maranoeye.com',
    siteName: 'Marano Eye Care',
    images: [
      {
        url: '/assets/images/vivity_hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium Cataract Lens Options at Marano Eye Care NJ',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laser Cataract Surgery & Premium IOLs NJ | Marano Eye Care',
    description:
      'Compare Clareon Vivity, PanOptix Pro & TECNIS PureSee IOLs in Livingston, Denville & Newark, NJ. 40,000+ surgeries & $0 Toric upgrade.',
    images: ['/assets/images/vivity_hero.jpg'],
  },
};

const homeSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://premium-iol.maranoeye.com/#webpage',
    url: 'https://premium-iol.maranoeye.com',
    name: 'Laser Cataract Surgery & Premium IOLs NJ | Marano Eye Care',
    description:
      'Compare Clareon Vivity, PanOptix Pro & TECNIS PureSee lenses in Livingston, Denville & Newark, NJ with board-certified surgeons Dr. Matthew Marano Jr., MD & Dr. Sherief Raouf, MD.',
    isPartOf: {
      '@id': 'https://premium-iol.maranoeye.com/#website',
    },
    lastReviewed: '2026-11-25',
    dateModified: '2026-11-25',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#faq h2', '#faq h3'],
    },
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
          name: 'LENSAR ALLY Laser Cataract Surgery with Premium IOL Implantation',
        },
      },
      {
        '@type': 'MedicalCondition',
        name: 'Astigmatism',
        possibleTreatment: {
          '@type': 'MedicalDevice',
          name: 'Toric Intraocular Lens ($0 Upgrade Fee on Premium Lenses)',
        },
      },
      {
        '@type': 'MedicalCondition',
        name: 'Presbyopia',
        possibleTreatment: {
          '@type': 'MedicalDevice',
          name: 'Trifocal and Extended Depth of Focus (EDOF) Intraocular Lenses',
        },
      },
    ],
    reviewedBy: [
      { '@id': 'https://premium-iol.maranoeye.com/#dr-marano' },
      { '@id': 'https://premium-iol.maranoeye.com/#dr-raouf' },
    ],
    author: [
      {
        '@type': 'Physician',
        '@id': 'https://premium-iol.maranoeye.com/#dr-marano',
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
        '@id': 'https://premium-iol.maranoeye.com/#dr-raouf',
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
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://premium-iol.maranoeye.com/#iol-comparison-list',
    name: 'FDA-Approved Premium Intraocular Lens (IOL) Guides at Marano Eye Care',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 4,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Clareon Vivity Non-Diffractive EDOF IOL Guide',
        url: 'https://premium-iol.maranoeye.com/clareon-vivity',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Clareon PanOptix Pro Trifocal IOL Guide',
        url: 'https://premium-iol.maranoeye.com/panoptix-pro',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'TECNIS PureSee Pure Refractive EDOF IOL Guide',
        url: 'https://premium-iol.maranoeye.com/tecnis-puresee',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'How Cataracts Form & Why Acrylic IOL Replacement Is Permanent',
        url: 'https://premium-iol.maranoeye.com/cataract-education',
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
        <hr className="section-divider" />
        <div className="optimize-offscreen">
          <TrustSection />
        </div>
        <div className="optimize-offscreen">
          <CertificationLogos />
        </div>
        <div className="optimize-offscreen">
          <TestimonialsSection />
        </div>
        <hr className="section-divider" />
        <div className="optimize-offscreen">
          <CataractEducationTeaserSection />
        </div>
        <hr className="section-divider" />
        <div className="optimize-offscreen">
          <InteractiveMediaHubSection />
        </div>
        <hr className="section-divider" />
        <div className="optimize-offscreen">
          <LensarAllySection />
        </div>
        <hr className="section-divider" />
        <div className="optimize-offscreen">
          <RecoveryTimelineSection />
        </div>
        <hr className="section-divider" />
        <div className="optimize-offscreen">
          <CandidacySection />
        </div>
        <hr className="section-divider" />
        <div className="optimize-offscreen">
          <InsuranceCostSection />
        </div>
        <hr className="section-divider" />
        <div className="optimize-offscreen">
          <FAQSection />
        </div>
        <hr className="section-divider" />
        <div className="optimize-offscreen">
          <BookingSection sectionId="bottom-booking" />
        </div>
        <StickyCTABar />
        <Footer />
      </main>
    </>
  );
}
