import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://premium-iol.maranoeye.com';
  const lastModified = new Date('2026-11-25');

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${baseUrl}/assets/images/vivity_hero.jpg`,
        `${baseUrl}/assets/images/Marano-1777328574709.jpg`,
        `${baseUrl}/assets/images/Raouf.jpg`,
        `${baseUrl}/assets/images/lensar_ally_screen.jpg`,
      ],
    },
    {
      url: `${baseUrl}/clareon-vivity`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        `${baseUrl}/assets/images/vivity_iol_real.jpg`,
        `${baseUrl}/assets/images/vivity_hero.jpg`,
      ],
    },
    {
      url: `${baseUrl}/panoptix-pro`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        `${baseUrl}/assets/images/panoptix_iol_real.jpg`,
        `${baseUrl}/assets/images/panoptix_hero.jpg`,
      ],
    },
    {
      url: `${baseUrl}/tecnis-puresee`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        `${baseUrl}/assets/images/puresee_iol_real.jpg`,
        `${baseUrl}/assets/images/puresee_hero.jpg`,
      ],
    },
    {
      url: `${baseUrl}/cataract-education`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}/assets/images/lensar_ally_screen.jpg`],
    },
  ];
}
