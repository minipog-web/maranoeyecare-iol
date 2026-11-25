import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/app/components/StickyCTABar';
import RelatedClinicalGuides from '@/components/seo/RelatedClinicalGuides';
import VivityPageClient from './VivityPageClient';

const BookingSection = dynamic(() => import('@/app/components/BookingSection'));

export const metadata: Metadata = {
  title: 'Clareon Vivity IOL NJ: Night Vision & Outcomes | Marano Eye Care',
  description:
    'Clinical guide to Alcon Clareon® Vivity® EDOF IOL in Livingston, Denville & Newark, NJ. Monofocal-like night driving, computer clarity & $0 Toric upgrade.',
  keywords: [
    'clareon vivity nj',
    'vivity lens cataract surgery nj',
    'clareon vivity night driving halos',
    'vivity vs panoptix vs puresee',
    'clareon vivity toric cost nj',
    'non diffractive edof iol nj',
    'marano eye care vivity',
  ],
  alternates: {
    canonical: '/clareon-vivity',
  },
  openGraph: {
    title: 'Clareon Vivity IOL NJ: Night Vision & Outcomes | Marano Eye Care',
    description:
      'Explore the Clareon® Vivity® non-diffractive EDOF lens. Monofocal-like night vision, crisp intermediate & distance clarity, and $0 Toric upgrade with Dr. Marano & Dr. Raouf.',
    url: 'https://premium-iol.maranoeye.com/clareon-vivity',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Clareon Vivity IOL NJ: Night Vision & Outcomes | Marano Eye Care',
    description:
      'X-WAVE™ non-diffractive EDOF clarity for night driving, dashboards & computers. $0 Toric astigmatism upgrade at Marano Eye Care NJ.',
    images: ['/assets/images/vivity_iol_real.jpg'],
  },
};

const vivitySchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://premium-iol.maranoeye.com/clareon-vivity#webpage',
    url: 'https://premium-iol.maranoeye.com/clareon-vivity',
    name: 'Clareon Vivity IOL Clinical Guide & Outcomes | Marano Eye Care NJ',
    description:
      'Detailed clinical overview of the Alcon Clareon Vivity extended depth of focus intraocular lens, optical physics, defocus curves, and 3-way comparisons.',
    isPartOf: { '@id': 'https://premium-iol.maranoeye.com/#website' },
    lastReviewed: '2026-11-25',
    dateModified: '2026-11-25',
    reviewedBy: [
      { '@id': 'https://premium-iol.maranoeye.com/#dr-marano' },
      { '@id': 'https://premium-iol.maranoeye.com/#dr-raouf' },
    ],
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
        name: 'Clareon Vivity IOL Guide',
        item: 'https://premium-iol.maranoeye.com/clareon-vivity',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://premium-iol.maranoeye.com/clareon-vivity#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Clareon Vivity differ from a standard monofocal lens?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A standard monofocal lens (covered by standard Medicare) provides sharp vision at only one fixed focal distance, typically far distance, requiring glasses for your computer, dashboard, cell phone, and reading. Clareon Vivity stretches light into an extended continuous corridor, delivering clear distance vision plus sharp intermediate vision (screens, dashboards, cooking) and functional near vision without increasing nighttime glare.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is Clareon Vivity considered the best lens for night driving?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Older multifocal and trifocal lenses use concentric rings (diffractive optics) to split light, which can cause halos around headlights. Clareon Vivity utilizes non-diffractive X-WAVE™ technology that does not split light. In FDA clinical trials, bothersome glare and halo rates were statistically identical to a standard monofocal lens.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I need reading glasses after getting the Clareon Vivity IOL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most Clareon Vivity patients achieve independence from glasses for driving, outdoor activities, computer work, cooking, and everyday tasks. Fine near vision (such as small pill bottle labels or paperback print in dim light) may occasionally use lightweight +1.25 to +1.50D readers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Vivity compare to the PanOptix Pro trifocal lens?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PanOptix Pro is a diffractive trifocal lens offering maximum complete spectacle freedom for close reading, with mild temporary nighttime halos during neuroadaptation. Vivity uses non-diffractive wavefront shaping for seamless distance and intermediate vision with monofocal-like night driving clarity.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Vivity correct my astigmatism?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Clareon Vivity Toric II IOL corrects corneal astigmatism with exact rotational stability, aligned via 3D LENSAR ALLY laser mapping. At Marano Eye Care, custom Toric astigmatism correction is included on all premium lenses at no extra upgrade fee.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Clareon Vivity covered by Medicare or private medical insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Medicare and commercial insurance plans cover the core cataract surgery, surgeon fees, and anesthesia costs. The advanced optical design of Clareon Vivity and custom laser imaging involve an out-of-pocket upgrade fee eligible for HSA/FSA funds and 24-month 0% APR financing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the recovery take after Clareon Vivity surgery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Laser cataract surgery with Clareon Vivity takes approximately 10–15 minutes per eye at Ridgedale Surgery Center in Cedar Knolls using 100% topical numbing eye drops (zero needles or stitches). Most patients return to light driving, reading, and screen use within 24 to 48 hours.',
        },
      },
    ],
  },
];

export default function ClareonVivityPage() {
  return (
    <>
      {vivitySchemas.map((schema, index) => (
        <script
          key={`vivity-schema-${index}`}
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
        <VivityPageClient />

        {/* Hub-and-Spoke Internal Link Mesh */}
        <RelatedClinicalGuides currentSlug="clareon-vivity" />

        {/* Dedicated Booking Section with Vivity Pre-Selected */}
        <div id="consultation" className="scroll-mt-20">
          <BookingSection
            preselectedLens="vivity"
            bookingHeadline="Schedule Your Clareon® Vivity® Consultation"
            bookingUrgencyTitle="Precision LENSAR Ally Laser Cataract Surgery"
            bookingUrgencyText="Personalized 3D corneal biometry with Dr. Matthew Marano Jr., MD & Dr. Sherief Raouf, MD. All premium lenses include custom Toric astigmatism correction at no extra fee."
          />
        </div>

        <StickyCTABar />
        <Footer />
      </main>
    </>
  );
}
