import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/app/components/StickyCTABar';
import BookingSection from '@/app/components/BookingSection';
import RelatedClinicalGuides from '@/components/seo/RelatedClinicalGuides';
import CataractEducationClient from './CataractEducationClient';

export const metadata: Metadata = {
  title: '5 Stages of Cataracts & Permanent IOLs | Marano Eye Care NJ',
  description:
    'Learn how cataracts form across 5 stages, why new glasses stop working, and how 10-minute laser acrylic IOL replacement restores permanent clarity in NJ.',
  keywords: [
    'stages of cataracts',
    'can cataracts grow back after surgery',
    'when to have cataract surgery',
    'nuclear sclerosis yellowing cataract',
    'permanent acrylic intraocular lens',
    'cataract evaluation livingston denville newark nj',
  ],
  alternates: {
    canonical: '/cataract-education',
  },
  openGraph: {
    title: '5 Stages of Cataracts & Permanent IOLs | Marano Eye Care NJ',
    description:
      'Explore the 5 stages of cataract progression and discover why biocompatible acrylic IOL replacement is a permanent, once-in-a-lifetime cure with Dr. Marano & Dr. Raouf.',
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
  twitter: {
    card: 'summary_large_image',
    title: '5 Stages of Cataracts & Permanent IOLs | Marano Eye Care NJ',
    description:
      'Interactive 5-stage cataract progression guide and permanent acrylic IOL science from Marano Eye Care NJ.',
    images: ['/assets/images/lensar_ally_screen.jpg'],
  },
};

const cataractSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://premium-iol.maranoeye.com/cataract-education#webpage',
    url: 'https://premium-iol.maranoeye.com/cataract-education',
    name: '5 Stages of Cataracts & Why Lens Replacement Is Permanent | Marano Eye Care NJ',
    description:
      'Detailed clinical overview of cataract pathophysiology, crystallin protein breakdown, nuclear sclerosis stages, and permanent intraocular lens replacement.',
    isPartOf: { '@id': 'https://premium-iol.maranoeye.com/#website' },
    lastReviewed: '2026-11-25',
    dateModified: '2026-11-25',
    reviewedBy: [
      { '@id': 'https://premium-iol.maranoeye.com/#dr-marano' },
      { '@id': 'https://premium-iol.maranoeye.com/#dr-raouf' },
    ],
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
          name: 'Laser-Assisted Cataract Surgery with Permanent Acrylic IOL Implantation',
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
    '@id': 'https://premium-iol.maranoeye.com/cataract-education#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can a cataract ever grow back after surgery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. A cataract cannot grow back because your natural biological lens, where cataract proteins form, has been completely removed and replaced with a biocompatible acrylic IOL that never degrades. If mild Posterior Capsule Opacification (PCO) develops on the supporting membrane later, a painless 60-second in-office YAG laser clears it permanently.',
        },
      },
      {
        '@type': 'Question',
        name: 'At what stage should I have cataract surgery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You no longer need to wait for a cataract to become ripe or brown. Surgery is recommended as soon as cataract haze, night driving glare, or washed-out colors interfere with your daily life—allowing gentler laser softening and faster recovery.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why don’t updated eyeglasses clear my vision anymore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Glasses refocus incoming light, but when the eye’s internal lens becomes cloudy or yellow from denatured proteins, light cannot physically pass through cleanly regardless of your eyeglass prescription.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the cataract surgery procedure painful?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not at all. The ~10–15 minute outpatient procedure uses gentle topical numbing eye drops and light twilight relaxation with zero needles, zero injections, and zero stitches.',
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

        {/* Hub-and-Spoke Internal Link Mesh */}
        <RelatedClinicalGuides currentSlug="cataract-education" />

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
