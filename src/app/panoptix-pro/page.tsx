import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/app/components/StickyCTABar';
import BookingSection from '@/app/components/BookingSection';
import PanOptixPageClient from './PanOptixPageClient';

export const metadata: Metadata = {
  title:
    'Clareon PanOptix Pro Trifocal IOL Guide: Near, Intermediate & Distance | Marano Eye Care NJ',
  description:
    'Comprehensive clinical guide to the Clareon® PanOptix® Pro Trifocal IOL by Alcon. Discover ENLIGHTEN® optical technology, 88% light transmission, 99% patient satisfaction, and comparisons with Vivity and PureSee.',
  alternates: {
    canonical: '/panoptix-pro',
  },
  openGraph: {
    title: 'Clareon PanOptix Pro Trifocal IOL Guide: Full-Range Clarity | Marano Eye Care NJ',
    description:
      'Explore the Clareon® PanOptix® Pro trifocal lens with Dr. Matthew Marano Jr., MD. High spectacle independence at 40cm near, 60cm intermediate, and distance with LENSAR ALLY laser precision.',
    url: 'https://www.maranoeye.com/panoptix-pro',
    siteName: 'Marano Eye Care',
    images: [
      {
        url: '/assets/images/panoptix_iol_real.jpg',
        width: 1200,
        height: 630,
        alt: 'Clareon PanOptix Pro Trifocal IOL with ENLIGHTEN Optical Technology',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
};

const panoptixSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://www.maranoeye.com/panoptix-pro#webpage',
    url: 'https://www.maranoeye.com/panoptix-pro',
    name: 'Clareon PanOptix Pro Trifocal IOL Clinical Guide & Outcomes | Marano Eye Care',
    description:
      'Detailed clinical overview of the Alcon Clareon PanOptix Pro trifocal intraocular lens, ENLIGHTEN optical design, 88% light transmission, and 3-way comparisons.',
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Cataract Patients, Presbyopia Patients, Avid Readers, Active Professionals',
    },
    about: {
      '@type': 'MedicalDevice',
      name: 'Clareon PanOptix Pro Trifocal IOL',
      manufacturer: 'Alcon',
      description:
        'Trifocal intraocular lens utilizing proprietary ENLIGHTEN optical technology delivering dedicated focal peaks at near (40 cm), intermediate (60 cm), and distance for high spectacle independence.',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://www.maranoeye.com/panoptix-pro#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes Clareon PanOptix Pro unique among trifocal lenses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Clareon PanOptix Pro utilizes proprietary ENLIGHTEN® optical technology that transmits 88% of light directly to the retina while providing a dedicated intermediate focal peak at 60 cm (natural arm’s length). Older European trifocals placed intermediate focus at 80 cm, forcing patients to stretch their arms too far to read computer screens and dashboards.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I be completely free from reading glasses with PanOptix Pro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In clinical trials and peer-reviewed meta-analyses covering over 500 patients, Clareon PanOptix demonstrated over 85–90%+ complete spectacle freedom across all distances. Patients can read smartphones, paperback novels, and menus without reading glasses.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the neuroadaptation period for PanOptix Pro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because diffractive trifocals split light into three simultaneous focal planes, the brain’s visual cortex requires a brief adaptation period (typically 2 to 8 weeks). During this time, night halos and glare around oncoming headlights gradually soften and become imperceptible as neuroadaptation completes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is astigmatism correction available with PanOptix Pro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Clareon PanOptix Toric IOL is designed for patients with corneal astigmatism. Dr. Matthew Marano Jr. aligns the lens using the LENSAR ALLY femtosecond laser system. At Marano Eye Care, Toric astigmatism correction is included on all premium lenses at no extra upgrade charge.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does PanOptix Pro compare to Clareon Vivity and TECNIS PureSee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PanOptix Pro provides the highest near reading independence (20/20 at 40cm) with a trifocal diffractive profile. Clareon Vivity is a non-diffractive EDOF lens offering seamless distance-to-intermediate vision with monofocal-like night glare safety. TECNIS PureSee is a purely refractive EDOF lens with high contrast sensitivity.',
        },
      },
    ],
  },
];

export default function ClareonPanOptixPage() {
  return (
    <>
      {panoptixSchemas.map((schema, index) => (
        <Script
          key={`panoptix-schema-${index}`}
          id={`panoptix-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="min-h-screen bg-background overflow-x-hidden text-foreground">
        <Header />

        {/* Client Interactive Body Content */}
        <PanOptixPageClient />

        {/* Dedicated Booking Section with PanOptix Pre-Selected */}
        <div id="consultation" className="scroll-mt-20">
          <BookingSection
            preselectedLens="panoptix"
            bookingHeadline="Schedule Your Clareon® PanOptix® Pro Consultation"
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
