import React from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';
import { DM_Sans, Fraunces } from 'next/font/google';
import '../styles/tailwind-directives.css';
import '../styles/index.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans-font',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display-font',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maranoeyecare.com'),
  alternates: {
    canonical: '/',
  },
  title: 'Premium Cataract Lens Options & IOLs | Marano Eye Care NJ',
  description:
    "Compare Clareon Vivity, PanOptix Pro, and Eyhance IOLs at Marano Eye Care. Book a consultation with NJ's top-rated ophthalmologist, Dr. Matthew Marano Jr., MD.",
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    title: 'Premium Cataract Lens Options & IOLs | Marano Eye Care NJ',
    description:
      "Compare Clareon Vivity, PanOptix Pro, and Eyhance IOLs at Marano Eye Care. Book a consultation with NJ's top-rated ophthalmologist, Dr. Matthew Marano Jr., MD.",
    url: 'https://www.maranoeyecare.com',
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
      "Compare Clareon Vivity, PanOptix Pro, and Eyhance IOLs at Marano Eye Care. Book a consultation with NJ's top-rated ophthalmologist, Dr. Matthew Marano Jr., MD.",
    images: ['/assets/images/vivity_iol_clean.png'],
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'Physician'],
    name: 'Marano Eye Care',
    image: 'https://www.maranoeyecare.com/assets/images/marano_logo.png',
    url: 'https://www.maranoeyecare.com',
    telephone: '973-322-0100',
    priceRange: '$$$',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '200 South Orange Ave, Suite 209',
        addressLocality: 'Livingston',
        addressRegion: 'NJ',
        postalCode: '07039',
        addressCountry: 'US',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '16 Pocono Rd, Suite 301',
        addressLocality: 'Denville',
        addressRegion: 'NJ',
        postalCode: '07834',
        addressCountry: 'US',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '306 Martin L. King Blvd',
        addressLocality: 'Newark',
        addressRegion: 'NJ',
        postalCode: '07102',
        addressCountry: 'US',
      },
    ],
    medicalSpecialty: 'Ophthalmology',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '500',
    },
    knowsAbout: [
      'Cataract Surgery',
      'Intraocular Lenses',
      'Clareon Vivity',
      'PanOptix Pro',
      'Tecnis Eyhance',
      'Laser Cataract Surgery',
      'LENSAR Ally',
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
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-sans antialiased">
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18197167741"
          strategy="afterInteractive"
        />
        <Script id="google-tags-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18197167741');
            ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });` : ''}
          `}
        </Script>

        {/* Google tag (gtag.js) event - delayed navigation helper */}
        <Script id="google-ads-delayed-nav" strategy="afterInteractive">
          {`
            function gtagSendEvent(url) {
              var callback = function () {
                if (typeof url === 'string') {
                  window.location = url;
                }
              };
              gtag('event', 'ads_conversion_Form_1', {
                'event_callback': callback,
                'event_timeout': 2000,
              });
              return false;
            }
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
