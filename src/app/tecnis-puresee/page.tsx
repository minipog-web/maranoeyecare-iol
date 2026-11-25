import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/app/components/StickyCTABar';
import RelatedClinicalGuides from '@/components/seo/RelatedClinicalGuides';
import PureSeePageClient from './PureSeePageClient';

const BookingSection = dynamic(() => import('@/app/components/BookingSection'));

export const metadata: Metadata = {
  title: 'TECNIS PureSee Refractive EDOF IOL NJ | Marano Eye Care',
  description:
    'Clinical guide to J&J TECNIS PureSee™ purely refractive EDOF IOL in NJ. Zero diffractive rings, zero FDA contrast warning, night clarity & $0 Toric upgrade.',
  keywords: [
    'tecnis puresee nj',
    'puresee iol cataract surgery nj',
    'tecnis puresee vs vivity',
    'purely refractive edof iol',
    'tecnis puresee night driving',
    'zero contrast warning iol',
    'marano eye care puresee',
  ],
  alternates: {
    canonical: '/tecnis-puresee',
  },
  openGraph: {
    title: 'TECNIS PureSee Refractive EDOF IOL NJ | Marano Eye Care',
    description:
      'Explore TECNIS PureSee™, the purely refractive EDOF lens with zero diffractive rings and zero FDA contrast warning, with Dr. Marano & Dr. Raouf in NJ.',
    url: 'https://premium-iol.maranoeye.com/tecnis-puresee',
    siteName: 'Marano Eye Care',
    images: [
      {
        url: '/assets/images/puresee_iol_real.jpg',
        width: 1200,
        height: 630,
        alt: 'TECNIS PureSee Pure Refractive Extended Depth of Focus IOL',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TECNIS PureSee Refractive EDOF IOL NJ | Marano Eye Care',
    description:
      'Purely refractive EDOF optics with Abbe 55 clarity, zero diffractive rings & $0 Toric upgrade at Marano Eye Care NJ.',
    images: ['/assets/images/puresee_iol_real.jpg'],
  },
};

const pureseeSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://premium-iol.maranoeye.com/tecnis-puresee#webpage',
    url: 'https://premium-iol.maranoeye.com/tecnis-puresee',
    name: 'TECNIS PureSee IOL Clinical Guide & Outcomes | Marano Eye Care NJ',
    description:
      'Detailed clinical overview of the Johnson & Johnson TECNIS PureSee refractive extended depth of focus intraocular lens, optical physics, contrast sensitivity, and 3-way comparisons.',
    isPartOf: { '@id': 'https://premium-iol.maranoeye.com/#website' },
    lastReviewed: '2026-11-25',
    dateModified: '2026-11-25',
    reviewedBy: [
      { '@id': 'https://premium-iol.maranoeye.com/#dr-marano' },
      { '@id': 'https://premium-iol.maranoeye.com/#dr-raouf' },
    ],
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Cataract Patients, Presbyopia Patients, Night Drivers, Computer Professionals',
    },
    about: {
      '@type': 'MedicalDevice',
      name: 'TECNIS PureSee Refractive Extended Depth of Focus IOL',
      manufacturer: 'Johnson & Johnson MedTech',
      description:
        'Purely refractive extended depth of focus intraocular lens providing uninterrupted continuous vision from distance to intermediate with 100% light utilization and zero FDA contrast sensitivity loss warning.',
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
        name: 'TECNIS PureSee IOL Guide',
        item: 'https://premium-iol.maranoeye.com/tecnis-puresee',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://premium-iol.maranoeye.com/tecnis-puresee#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes TECNIS PureSee different from other EDOF lenses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unlike older EDOF lenses that relied on diffractive rings or light splitting, TECNIS PureSee is purely refractive. It utilizes continuous surface refraction to harness 100% of incoming light without diffractive scatter and is the first FDA-approved EDOF lens with zero clinical contrast sensitivity loss warning.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does night driving compare with TECNIS PureSee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because PureSee has zero diffractive rings, its dysphotopsia profile (night glare and halos) is statistically comparable to a standard monofocal lens, enabling confident highway and rainy-night driving.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I need reading glasses with TECNIS PureSee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TECNIS PureSee delivers sharp 20/20 distance vision, continuous 20/20–20/25 intermediate vision for computers and dashboards, and functional near vision for phones and menus. Lightweight readers may occasionally be used for sustained small print in dim lighting.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a Toric option for astigmatism with TECNIS PureSee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The TECNIS PureSee Toric II lens corrects corneal astigmatism with squared-edge haptics for rotational stability. At Marano Eye Care, Dr. Matthew Marano Jr. and Dr. Sherief Raouf include custom Toric upgrades on all premium lenses at zero extra upgrade fee.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Abbe number and why does Abbe 55 matter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Abbe number measures optical dispersion. PureSee is engineered from a proprietary hydrophobic acrylic biomaterial with an Abbe number of 55, minimizing chromatic aberration for sharper edge contrast and color fidelity in daylight and dim evening conditions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What causes cataracts, and will the TECNIS PureSee lens ever need replacement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cataracts form when natural crystalline lens proteins clump and yellow with age. Replacing the natural lens with the clear acrylic TECNIS PureSee IOL provides lifetime optical clarity with a permanent prescription that never clouds or degrades.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast is recovery after TECNIS PureSee cataract surgery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Outpatient laser cataract surgery at Ridgedale Surgery Center takes ~10–15 minutes under zero-needle numbing eye drops. Most patients notice clear vision within 24 to 48 hours and resume light driving and screen work the next day.',
        },
      },
    ],
  },
];

export default function TecnisPureSeePage() {
  return (
    <>
      {pureseeSchemas.map((schema, index) => (
        <script
          key={`puresee-schema-${index}`}
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
        <PureSeePageClient />

        {/* Hub-and-Spoke Internal Link Mesh */}
        <RelatedClinicalGuides currentSlug="tecnis-puresee" />

        {/* Dedicated Booking Section with PureSee Pre-Selected */}
        <div id="consultation" className="scroll-mt-20">
          <BookingSection
            preselectedLens="puresee"
            bookingHeadline="Schedule Your TECNIS PureSee™ Consultation"
            bookingUrgencyTitle="Precision LENSAR ALLY Laser Cataract Surgery"
            bookingUrgencyText="Personalized 3D corneal biometry with Dr. Matthew Marano Jr., MD & Dr. Sherief Raouf, MD. All premium lenses include custom Toric astigmatism correction at no extra fee."
          />
        </div>

        <StickyCTABar />
        <Footer />
      </main>
    </>
  );
}
