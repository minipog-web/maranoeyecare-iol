import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/app/components/StickyCTABar';
import RelatedClinicalGuides from '@/components/seo/RelatedClinicalGuides';
import PanOptixPageClient from './PanOptixPageClient';

const BookingSection = dynamic(() => import('@/app/components/BookingSection'));

export const metadata: Metadata = {
  title: 'Clareon PanOptix Pro Trifocal IOL NJ | Marano Eye Care',
  description:
    'Clinical guide to Alcon Clareon® PanOptix® Pro Trifocal IOL in NJ. ENLIGHTEN® NXT 94% light utilization, glasses-free reading & $0 Toric astigmatism upgrade.',
  keywords: [
    'clareon panoptix pro nj',
    'panoptix pro trifocal iol',
    'panoptix pro vs vivity',
    'panoptix pro 94 light utilization',
    'trifocal cataract lens nj',
    'glasses free cataract surgery nj',
    'marano eye care panoptix',
  ],
  alternates: {
    canonical: '/panoptix-pro',
  },
  openGraph: {
    title: 'Clareon PanOptix Pro Trifocal IOL NJ | Marano Eye Care',
    description:
      'Explore the Clareon® PanOptix® Pro trifocal lens with Dr. Matthew Marano Jr., MD & Dr. Sherief Raouf, MD. 94% light utilization across 40cm near, 60cm intermediate & distance.',
    url: 'https://premium-iol.maranoeye.com/panoptix-pro',
    siteName: 'Marano Eye Care',
    images: [
      {
        url: '/assets/images/panoptix_iol_real.jpg',
        width: 1200,
        height: 630,
        alt: 'Clareon PanOptix Pro Trifocal IOL with ENLIGHTEN NXT Optical Technology',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clareon PanOptix Pro Trifocal IOL NJ | Marano Eye Care',
    description:
      'ENLIGHTEN® NXT 94% light utilization for glasses-free reading, screens & driving. $0 Toric upgrade at Marano Eye Care NJ.',
    images: ['/assets/images/panoptix_iol_real.jpg'],
  },
};

const panoptixSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://premium-iol.maranoeye.com/panoptix-pro#webpage',
    url: 'https://premium-iol.maranoeye.com/panoptix-pro',
    name: 'Clareon PanOptix Pro Trifocal IOL Clinical Guide & Outcomes | Marano Eye Care NJ',
    description:
      'Detailed clinical overview of the Alcon Clareon PanOptix Pro trifocal intraocular lens, ENLIGHTEN NXT optical design, 94% light utilization, and 3-way comparisons.',
    isPartOf: { '@id': 'https://premium-iol.maranoeye.com/#website' },
    lastReviewed: '2026-11-25',
    dateModified: '2026-11-25',
    reviewedBy: [
      { '@id': 'https://premium-iol.maranoeye.com/#dr-marano' },
      { '@id': 'https://premium-iol.maranoeye.com/#dr-raouf' },
    ],
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Cataract Patients, Presbyopia Patients, Avid Readers, Active Professionals',
    },
    about: {
      '@type': 'MedicalDevice',
      name: 'Clareon PanOptix Pro Trifocal IOL',
      manufacturer: 'Alcon',
      description:
        'Trifocal intraocular lens utilizing proprietary ENLIGHTEN NXT optical technology delivering 94% light utilization and dedicated focal peaks at near (40 cm), intermediate (60 cm), and distance for high spectacle independence.',
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
        name: 'Clareon PanOptix Pro IOL Guide',
        item: 'https://premium-iol.maranoeye.com/panoptix-pro',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://premium-iol.maranoeye.com/panoptix-pro#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes Clareon PanOptix Pro unique among trifocal lenses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unlike older European trifocals positioned at 80 cm, Clareon PanOptix Pro uses ENLIGHTEN® NXT optics (94% light utilization—50% less scatter than original 88% PanOptix) with a dedicated 60 cm intermediate focal point matching natural arm’s-length computer and dashboard distance, alongside 40 cm near reading and 20/20 distance acuity.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I be able to read books and smartphones without glasses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Clareon PanOptix Pro offers the highest rate of near reading independence among FDA-approved lenses, with over 85–90%+ complete spectacle freedom across reading books, smartphones, text messages, restaurant menus, and labels.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is neuroadaptation and how long does it take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because ENLIGHTEN® NXT splits incoming light across near, intermediate, and distance focal planes simultaneously, your visual cortex adapts over 2 to 8 weeks to select the sharp image while filtering out subtle night headlight rings.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a Toric option for PanOptix Pro to correct astigmatism?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Clareon PanOptix Toric IOL corrects corneal astigmatism during cataract removal using 3D LENSAR ALLY femtosecond laser alignment. At Marano Eye Care, Toric astigmatism correction is included on all premium lenses at no extra upgrade charge.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Clareon PanOptix Pro compare to Clareon Vivity?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PanOptix Pro is a diffractive trifocal lens delivering maximum near reading freedom (20/20 at 40 cm) with a brief neuroadaptation period. Clareon Vivity is a non-diffractive EDOF lens delivering seamless distance-to-computer clarity and monofocal-like night driving safety, using occasional low-power readers for tiny print.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does cataract surgery work with PanOptix Pro, and is the result permanent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our board-certified surgeons remove the clouded natural crystalline lens and replace it with the Clareon PanOptix Pro hydrophobic acrylic IOL. Because medical-grade acrylic never yellows or clouds, the prescription remains permanently stable for life.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast is the recovery after PanOptix Pro cataract surgery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dr. Matthew Marano Jr. and Dr. Sherief Raouf perform outpatient laser cataract surgery at Ridgedale Surgery Center in ~10–15 minutes using zero-needle numbing eye drops. Most patients notice vivid brightness within 24 to 48 hours and resume light daily activities the next day.',
        },
      },
    ],
  },
];

export default function ClareonPanOptixPage() {
  return (
    <>
      {panoptixSchemas.map((schema, index) => (
        <script
          key={`panoptix-schema-${index}`}
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
        <PanOptixPageClient />

        {/* Hub-and-Spoke Internal Link Mesh */}
        <RelatedClinicalGuides currentSlug="panoptix-pro" />

        {/* Dedicated Booking Section with PanOptix Pre-Selected */}
        <div id="consultation" className="scroll-mt-20">
          <BookingSection
            preselectedLens="panoptix"
            bookingHeadline="Schedule Your Clareon® PanOptix® Pro Consultation"
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
