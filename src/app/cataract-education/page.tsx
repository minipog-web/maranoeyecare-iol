import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/app/components/StickyCTABar';
import BookingSection from '@/app/components/BookingSection';
import CataractEducationClient from './CataractEducationClient';

export const metadata: Metadata = {
  title: 'How Cataracts Form & Why Lens Replacement is Permanent | Marano Eye Care NJ',
  description:
    'Comprehensive clinical guide to cataract formation, protein denaturing, nuclear sclerosis, the 5 stages of optical loss, and why clear medical acrylic IOLs provide a permanent, once-in-a-lifetime cure.',
  alternates: {
    canonical: '/cataract-education',
  },
  openGraph: {
    title: 'How Cataracts Form & Why Lens Replacement is Permanent | Marano Eye Care NJ',
    description:
      'Explore the 5 stages of cataract progression and discover why modern acrylic IOL replacement is a permanent, once-in-a-lifetime solution with Dr. Matthew Marano Jr., MD & Dr. Sherief Raouf, MD.',
    url: 'https://premium-iol.maranoeye.com/cataract-education',
    siteName: 'Marano Eye Care',
    images: [
      {
        url: '/assets/images/lensar_ally_screen.jpg',
        width: 1200,
        height: 630,
        alt: 'High-definition 3D biometric cataract analysis and IOL alignment',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
};

const cataractSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://premium-iol.maranoeye.com/cataract-education#webpage',
    url: 'https://premium-iol.maranoeye.com/cataract-education',
    name: 'How Cataracts Form & Why Lens Replacement is Permanent | Marano Eye Care',
    description:
      'Detailed clinical overview of cataract pathophysiology, crystallin protein breakdown, nuclear sclerosis stages, and permanent intraocular lens replacement.',
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Cataract Patients, Presbyopia Patients, Caregivers, Aging Adults',
    },
    about: {
      '@type': 'MedicalCondition',
      name: 'Cataract',
      possibleTreatment: [
        {
          '@type': 'MedicalProcedure',
          name: 'Laser-Assisted Cataract Surgery with Premium IOL Implantation',
        },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://premium-iol.maranoeye.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Cataract Education & Lens Permanence',
        item: 'https://premium-iol.maranoeye.com/cataract-education',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can a cataract ever grow back after surgery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. A cataract cannot grow back because your natural biological lens—where cataract proteins form—has been completely removed and replaced with an artificial acrylic IOL that never degrades or turns cloudy.',
        },
      },
      {
        '@type': 'Question',
        name: 'At what stage should I have cataract surgery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You no longer need to wait for a cataract to mature or turn brown. Surgery is recommended as soon as cataract haze, night glare, or diminished contrast sensitivity interferes with your quality of life or safety.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do glasses stop working when cataracts develop?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Glasses refocus incoming light, but cannot clear the physical protein clouding and amber discoloration inside the eye’s natural lens. Only removing the clouded lens restores clear light transmission.',
        },
      },
    ],
  },
];

export default function CataractEducationPage() {
  return (
    <>
      {cataractSchemas.map((schema, index) => (
        <script
          key={`cataract-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main
        className="min-h-screen bg-background overflow-x-hidden text-foreground"
        suppressHydrationWarning
      >
        <Header />

        {/* Client Interactive Body Content */}
        <CataractEducationClient />

        {/* Dedicated Booking Section */}
        <div id="consultation" className="scroll-mt-20">
          <BookingSection
            bookingHeadline="Schedule Your Comprehensive Cataract Evaluation"
            bookingUrgencyTitle="Precision LENSAR ALLY Laser Cataract Surgery"
            bookingUrgencyText="High-definition 3D corneal biometry with Dr. Matthew Marano Jr., MD & Dr. Sherief Raouf, MD. All premium lenses include custom Toric astigmatism correction at no extra fee."
          />
        </div>

        <StickyCTABar />
        <Footer />
      </main>
    </>
  );
}
