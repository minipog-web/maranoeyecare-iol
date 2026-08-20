import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/app/components/StickyCTABar';
import BookingSection from '@/app/components/BookingSection';
import PureSeePageClient from './PureSeePageClient';

export const metadata: Metadata = {
  title: 'TECNIS PureSee IOL Guide: Refractive Extended Depth of Focus | Marano Eye Care NJ',
  description:
    'Comprehensive clinical guide to the TECNIS PureSee™ IOL by Johnson & Johnson MedTech. Discover pure refractive continuous zonal optics, 100% light utilization, zero FDA contrast warning, and comparisons with PanOptix and Vivity.',
  alternates: {
    canonical: '/tecnis-puresee',
  },
  openGraph: {
    title: 'TECNIS PureSee IOL Guide: Refractive EDOF & Contrast Clarity | Marano Eye Care NJ',
    description:
      'Explore the TECNIS PureSee™ purely refractive EDOF lens with Dr. Matthew Marano Jr., MD. Zero diffractive rings, monofocal-like night vision, and continuous intermediate clarity with LENSAR ALLY laser precision.',
    url: 'https://www.maranoeye.com/tecnis-puresee',
    siteName: 'Marano Eye Care',
    images: [
      {
        url: '/assets/images/puresee_iol_clean.png',
        width: 1200,
        height: 630,
        alt: 'TECNIS PureSee Refractive Extended Depth of Focus IOL',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
};

const pureseeSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://www.maranoeye.com/tecnis-puresee#webpage',
    url: 'https://www.maranoeye.com/tecnis-puresee',
    name: 'TECNIS PureSee IOL Clinical Guide & Outcomes | Marano Eye Care',
    description:
      'Detailed clinical overview of the Johnson & Johnson TECNIS PureSee refractive extended depth of focus intraocular lens, optical physics, contrast sensitivity, and 3-way comparisons.',
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
    '@type': 'FAQPage',
    '@id': 'https://www.maranoeye.com/tecnis-puresee#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes TECNIS PureSee different from other EDOF lenses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unlike older EDOF lenses that relied on diffractive rings or light splitting, TECNIS PureSee is purely refractive. It utilizes proprietary continuous surface refraction to harness 100% of incoming light without diffractive scatter. It is the first FDA-approved EDOF lens with zero clinical contrast sensitivity loss warning.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does night driving compare with TECNIS PureSee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because PureSee has zero diffractive rings, its dysphotopsia profile (night glare and halos) is statistically comparable to a standard monofocal lens. Patients can drive at night on highways and in rainy conditions with excellent confidence and comfort.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I need reading glasses with TECNIS PureSee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TECNIS PureSee delivers sharp 20/20 distance vision and continuous 20/20 to 20/25 intermediate vision for computer monitors, car dashboards, laptops, and tablets. It also provides functional near vision for smartphones and restaurant menus. For sustained reading of small paperback books or fine medicine print in dim lighting, lightweight readers may occasionally be used.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a Toric option for astigmatism with TECNIS PureSee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The TECNIS PureSee Toric II lens corrects corneal astigmatism with squared-edge haptics for rotational stability. At Marano Eye Care, Dr. Matthew Marano Jr. provides custom Toric upgrades on all premium lenses with zero extra upgrade fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does TECNIS PureSee compare to PanOptix Pro and Clareon Vivity?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PureSee is a purely refractive EDOF lens prioritizing 100% contrast sensitivity and zero diffractive rings. Clareon Vivity is a non-diffractive wavefront-shaping EDOF lens. PanOptix Pro is a trifocal diffractive lens designed for maximum near reading freedom with dedicated 40cm focus.',
        },
      },
    ],
  },
];

export default function TecnisPureSeePage() {
  return (
    <>
      {pureseeSchemas.map((schema, index) => (
        <Script
          key={`puresee-schema-${index}`}
          id={`puresee-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="min-h-screen bg-background overflow-x-hidden text-foreground">
        <Header />

        {/* Client Interactive Body Content */}
        <PureSeePageClient />

        {/* Dedicated Booking Section with PureSee Pre-Selected */}
        <div id="consultation" className="scroll-mt-20">
          <BookingSection
            preselectedLens="puresee"
            bookingHeadline="Schedule Your TECNIS PureSee™ Consultation"
            bookingUrgencyTitle="Precision LENSAR ALLY Laser Cataract Surgery"
            bookingUrgencyText="Personalized 3D corneal biometry with Dr. Matthew Marano Jr., MD. All premium lenses include custom Toric astigmatism correction at no extra fee."
          />
        </div>

        <StickyCTABar />
        <Footer />
      </main>
    </>
  );
}
