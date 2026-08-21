import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/app/components/StickyCTABar';
import BookingSection from '@/app/components/BookingSection';
import VivityPageClient from './VivityPageClient';

export const metadata: Metadata = {
  title: 'Clareon Vivity IOL Guide: Extended Depth of Focus & Outcomes | Marano Eye Care NJ',
  description:
    'Comprehensive clinical guide to the Clareon® Vivity® IOL by Alcon. Discover X-WAVE™ non-diffractive wavefront shaping technology, visual acuity outcomes, night driving safety, and side-by-side comparisons with PanOptix and PureSee.',
  alternates: {
    canonical: '/clareon-vivity',
  },
  openGraph: {
    title: 'Clareon Vivity IOL Guide: Extended Depth of Focus & Outcomes | Marano Eye Care NJ',
    description:
      'Explore the Clareon® Vivity® non-diffractive EDOF lens. Monofocal-like night vision, crisp intermediate & distance clarity, and zero-needle laser cataract surgery with Dr. Matthew Marano Jr., MD.',
    url: 'https://www.maranoeye.com/clareon-vivity',
    siteName: 'Marano Eye Care',
    images: [
      {
        url: '/assets/images/vivity_iol_real.jpg',
        width: 1200,
        height: 630,
        alt: 'Clareon Vivity Non-Diffractive Extended Depth of Focus IOL',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
};

const vivitySchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://www.maranoeye.com/clareon-vivity#webpage',
    url: 'https://www.maranoeye.com/clareon-vivity',
    name: 'Clareon Vivity IOL Clinical Guide & Outcomes | Marano Eye Care',
    description:
      'Detailed clinical overview of the Alcon Clareon Vivity extended depth of focus intraocular lens, optical physics, defocus curves, and 3-way comparisons.',
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Cataract Patients, Presbyopia Patients, Active Drivers',
    },
    about: {
      '@type': 'MedicalDevice',
      name: 'Clareon Vivity Extended Depth of Focus IOL',
      manufacturer: 'Alcon',
      description:
        'Non-diffractive extended depth of focus intraocular lens utilizing X-WAVE wavefront shaping technology for continuous distance and intermediate vision with minimal night glare.',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Clareon Vivity avoid night halos and glare?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unlike traditional multifocal lenses that use concentric diffractive rings to split light into separate focal points, Clareon Vivity uses proprietary X-WAVE™ non-diffractive wavefront shaping technology. Two smooth surface transition elements stretch and shift the light wavefront, resulting in a visual disturbance profile statistically indistinguishable from a standard monofocal lens in FDA clinical trials.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I still need reading glasses with Clareon Vivity?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Clareon Vivity provides high spectacle independence for distance (driving, watching TV, golf) and intermediate tasks (computer screens, car dashboards, tablet use, cooking). Most patients can read large phone text and price tags comfortably without glasses. For sustained reading of fine print (such as prescription medicine bottles or paperback books in dim light), occasional lightweight reading glasses may still be helpful.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a Toric version of Clareon Vivity for astigmatism?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Clareon Vivity Toric IOL corrects pre-existing corneal astigmatism simultaneously during cataract surgery. At Marano Eye Care, Dr. Matthew Marano Jr. provides custom Toric upgrades on all premium IOLs at no additional fee beyond the standard premium lens price.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Clareon Vivity compare to PanOptix Pro and TECNIS PureSee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PanOptix Pro is a diffractive trifocal lens that maximizes near reading independence but has a higher incidence of night halos. TECNIS PureSee is a purely refractive EDOF lens with high contrast. Clareon Vivity is a non-diffractive EDOF lens that delivers exceptional intermediate computer clarity, excellent distance vision, and monofocal-like night driving safety without diffractive glare rings.',
        },
      },
    ],
  },
];

export default function ClareonVivityPage() {
  return (
    <>
      {vivitySchemas.map((schema, index) => (
        <Script
          key={`vivity-schema-${index}`}
          id={`vivity-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="min-h-screen bg-background overflow-x-hidden text-foreground">
        <Header />

        {/* Client Interactive Body Content */}
        <VivityPageClient />

        {/* Dedicated Booking Section with Vivity Pre-Selected */}
        <div id="consultation" className="scroll-mt-20">
          <BookingSection
            preselectedLens="vivity"
            bookingHeadline="Schedule Your Clareon® Vivity® Consultation"
            bookingUrgencyTitle="Precision LENSAR Ally Laser Cataract Surgery"
            bookingUrgencyText="Personalized 3D corneal biometry with Dr. Matthew Marano Jr., MD. All premium lenses include custom Toric astigmatism correction at no extra fee."
          />
        </div>

        <StickyCTABar />
        <Footer />
      </main>
    </>
  );
}
