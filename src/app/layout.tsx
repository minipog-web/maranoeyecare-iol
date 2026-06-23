import React from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';
import '../styles/tailwind-directives.css';
import '../styles/index.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
  adjustFontFallback: false,
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Premium Cataract Lens Options & IOLs | Marano Eye Care NJ',
  description:
    "Compare Clareon Vivity, PanOptix Pro, and Eyhance IOLs at Marano Eye Care. Book a consultation with NJ's top-rated ophthalmologist, Dr. Matthew Marano Jr., MD.",
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Marano Eye Care",
    "image": "https://www.maranoeyecare.com/assets/images/marano_logo.png",
    "url": "https://www.maranoeyecare.com",
    "telephone": "973-322-0100",
    "priceRange": "$$$",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "200 South Orange Ave",
        "addressLocality": "Livingston",
        "addressRegion": "NJ",
        "postalCode": "07039",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "16 Pocono Rd",
        "addressLocality": "Denville",
        "addressRegion": "NJ",
        "postalCode": "07834",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "92 Ferry St",
        "addressLocality": "Newark",
        "addressRegion": "NJ",
        "postalCode": "07105",
        "addressCountry": "US"
      }
    ],
    "medicalSpecialty": "Optometry",
    "knowsAbout": ["Cataract Surgery", "Intraocular Lenses", "Clareon Vivity", "PanOptix Pro", "Tecnis Eyhance"]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "I'm worried about halos and glare — especially night driving.",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This is the #1 concern we hear — and it's why Dr. Marano recommends the Clareon Vivity for most night drivers. Unlike older diffractive lenses, Vivity uses non-diffractive X-WAVE™ technology that doesn't split light. Clinical data shows halo rates nearly identical to a standard monofocal. Robert D. from Livingston was in the same position: 'Night driving is completely clear.' That said, every patient is different — which is exactly why Dr. Marano reviews your specific eye anatomy before recommending any lens."
        }
      },
      {
        "@type": "Question",
        "name": "Why should I spend thousands of dollars on my eyes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Think of it this way: based on an average premium upgrade, over 20 years that breaks down to less than $0.60 per day for clear vision at every distance. The average American spends over $3,000 on glasses over a decade — and still can't see clearly at arm's length or while driving. Premium IOLs are also HSA and FSA eligible, and we offer CareCredit financing. Most of our patients say it's the best financial decision they've ever made for their quality of life — not just their vision."
        }
      },
      {
        "@type": "Question",
        "name": "What if I don't like the result? Can the lens be changed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IOL exchange is possible, though uncommon. Here's the reassuring truth: 99% of premium lens patients say they'd choose a premium lens again. Dr. Marano's approach eliminates most regret before it happens — he uses detailed biometry, corneal mapping, and lifestyle interviews to match you to the right lens. He won't recommend a premium lens if your eye anatomy doesn't support a great outcome. That's why our satisfaction rate has remained exceptional across over 40,000 successful procedures."
        }
      },
      {
        "@type": "Question",
        "name": "My insurance covers the basic lens. Why should I pay more?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Insurance covers cataract removal — but only at the level of single-focus vision. With a standard monofocal, you'll see clearly at one distance (usually far) and need reading glasses or bifocals for everything else — forever. You'll be trading one pair of glasses for another. Premium IOLs restore your full range of vision. For patients who drive, use a computer, and read daily, that difference is life-changing. The out-of-pocket cost is for the visual freedom the surgery can deliver — not the surgery itself."
        }
      },
      {
        "@type": "Question",
        "name": "Will premium lenses make my surgery more complicated or risky?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The surgical procedure is identical regardless of which IOL you choose — a 15-minute microsurgery performed under topical (eye drop) anesthesia. The only thing that changes is what Dr. Marano places in your eye. He has performed this procedure over 40,000 times and has been recognized as New Jersey's Top Doctor for 15 consecutive years. The lens choice affects your outcome — not your safety."
        }
      }
    ]
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} dark`}>
      <head>
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={dmSans.className}>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18197167741"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18197167741');
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

        {/* Google Analytics tag manager tracking scripts */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
