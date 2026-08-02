import React from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GTM_ID } from '@/lib/gtag';
import { DM_Sans, Fraunces } from 'next/font/google';
import '../styles/tailwind-directives.css';
import '../styles/index.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maranoeye.com'),
  alternates: {
    canonical: '/',
  },
  title: 'Premium Cataract Lens Options & IOLs | Marano Eye Care NJ',
  description:
    "Compare Clareon Vivity, PanOptix Pro, and Tecnis Eyhance IOLs at Marano Eye Care. Book a consultation with NJ's top-rated ophthalmologist, Dr. Matthew Marano Jr., MD.",
  applicationName: 'Marano Eye Care',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'cataract surgery nj',
    'premium iol lenses',
    'clareon vivity',
    'panoptix pro',
    'tecnis eyhance',
    'marano eye care',
    'dr matthew marano',
    'nj ophthalmologist',
    'cataract lens options',
    'multifocal iol',
    'laser cataract surgery',
    'livingston nj eye doctor',
    'denville nj eye clinic',
    'newark nj eye surgery',
  ],
  authors: [{ name: 'Dr. Matthew Marano Jr., MD', url: 'https://www.maranoeye.com' }],
  creator: 'Dr. Matthew Marano Jr., MD',
  publisher: 'Marano Eye Care',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    title: 'Premium Cataract Lens Options & IOLs | Marano Eye Care NJ',
    description:
      "Compare Clareon Vivity, PanOptix Pro, and Tecnis Eyhance IOLs at Marano Eye Care. Book a consultation with NJ's top-rated ophthalmologist, Dr. Matthew Marano Jr., MD.",
    url: 'https://www.maranoeye.com',
    siteName: 'Marano Eye Care',
    images: [
      {
        url: '/assets/images/vivity_iol_clean.png',
        width: 800,
        height: 600,
        alt: 'Marano Eye Care — Premium IOL Lens Options',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Cataract Lens Options & IOLs | Marano Eye Care NJ',
    description:
      "Compare Clareon Vivity, PanOptix Pro, and Tecnis Eyhance IOLs at Marano Eye Care. Book a consultation with NJ's top-rated ophthalmologist, Dr. Matthew Marano Jr., MD.",
    images: ['/assets/images/vivity_iol_clean.png'],
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://www.maranoeye.com/#webpage',
    url: 'https://www.maranoeye.com',
    name: 'Premium Cataract Lens Options & IOLs | Marano Eye Care NJ',
    description:
      "Compare Clareon Vivity, PanOptix Pro, and Tecnis Eyhance IOLs at Marano Eye Care. Book a consultation with NJ's top-rated ophthalmologist, Dr. Matthew Marano Jr., MD.",
    about: {
      '@type': 'MedicalSpecialty',
      name: 'Ophthalmology',
    },
    author: {
      '@type': 'Physician',
      name: 'Dr. Matthew Marano Jr., MD',
      url: 'https://www.maranoeye.com',
      image: 'https://www.maranoeye.com/assets/images/marano_logo.png',
      sameAs: [
        'https://www.healthgrades.com/physician/dr-matthew-marano-yj6qy',
        'https://doctor.webmd.com/doctor/matthew-marano-7f897b2f-90e6-4d05-950c-e2f6ce834ef1-overview',
        'https://www.castleconnolly.com/clinicians/ophthalmology/matthew-j-marano-jr/48590',
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'Physician'],
    '@id': 'https://www.maranoeye.com/#medical-business',
    name: 'Marano Eye Care',
    image: 'https://www.maranoeye.com/assets/images/marano_logo.png',
    url: 'https://www.maranoeye.com',
    telephone: '973-322-0100',
    priceRange: '$$$',
    medicalSpecialty: 'Ophthalmology',
    knowsAbout: [
      'Cataract Surgery',
      'Intraocular Lenses',
      'Clareon Vivity',
      'PanOptix Pro',
      'Tecnis Eyhance',
      'Laser Cataract Surgery',
      'LENSAR Ally',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '500',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '17:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/maranoeyecare/',
      'https://www.healthgrades.com/physician/dr-matthew-marano-yj6qy',
      'https://doctor.webmd.com/doctor/matthew-marano-7f897b2f-90e6-4d05-950c-e2f6ce834ef1-overview',
    ],
    department: [
      {
        '@type': 'MedicalBusiness',
        name: 'Marano Eye Care - Livingston Office',
        telephone: '973-322-0100',
        hasMap: 'https://maps.app.goo.gl/9yB7D9S9Yv2D1PZc7',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '40.7845',
          longitude: '-74.3168',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '200 South Orange Ave, Suite 209',
          addressLocality: 'Livingston',
          addressRegion: 'NJ',
          postalCode: '07039',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'MedicalBusiness',
        name: 'Marano Eye Care - Denville Office',
        telephone: '973-627-0101',
        hasMap: 'https://maps.app.goo.gl/P2hUa9A9Yv2D1PZd8',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '40.8931',
          longitude: '-74.4754',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '16 Pocono Rd, Suite 301',
          addressLocality: 'Denville',
          addressRegion: 'NJ',
          postalCode: '07834',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'MedicalBusiness',
        name: 'Marano Eye Care - Newark Office',
        telephone: '973-642-4262',
        hasMap: 'https://maps.app.goo.gl/Q3iUa9A9Yv2D1PZe9',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '40.7306',
          longitude: '-74.1741',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '306 Martin L. King Blvd',
          addressLocality: 'Newark',
          addressRegion: 'NJ',
          postalCode: '07102',
          addressCountry: 'US',
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${dmSans.variable} ${fraunces.variable}`}>
      <head>
        {/* Google Tag Manager (GTM-PB9D9RHS) */}
        {GTM_ID && (
          <Script id="gtm-script" strategy="beforeInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {/* Google tag (gtag.js) - GA4 (G-1YBZ7BFJ4C) & Google Ads */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1YBZ7BFJ4C"
          strategy="afterInteractive"
        />
        <Script id="google-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1YBZ7BFJ4C', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
        {children}
        {/*
          CallRail Dynamic Number Swap & Google Ads Call Tracking
        */}
        <Script
          src="//cdn.callrail.com/companies/764798499/aff735ebb2e830b3a6df/12/swap.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
