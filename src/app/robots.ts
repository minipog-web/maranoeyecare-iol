import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://premium-iol.maranoeye.com';

  return {
    rules: [
      // Ad Verification & Landing Page Quality Crawlers (Google Ads, Meta Ads, Microsoft Ads, LinkedIn, X)
      // Google requires AdsBot user-agents to be explicitly named in robots.txt
      {
        userAgent: [
          'AdsBot-Google',
          'AdsBot-Google-Mobile',
          'AdsBot-Google-Mobile-Apps',
          'Mediapartners-Google',
          'Google-Adwords-Instant',
          'Google-InspectionTool',
          'GoogleOther',
          'adidxbot',
          'Facebot',
          'facebookexternalhit',
          'FacebookExternalHit',
          'LinkedInBot',
          'Twitterbot',
        ],
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/admin/'],
      },
      // Standard search engine crawlers (Google, Bing, Apple, Yandex, Baidu, DuckDuckGo)
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-News',
          'Googlebot-Video',
          'Bingbot',
          'msnbot',
          'Slurp',
          'DuckDuckBot',
          'Baiduspider',
          'YandexBot',
          'Applebot',
        ],
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/admin/'],
      },
      // AI & Generative Search Engine Crawlers (LLM & GEO discovery)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Amazonbot',
          'Cohere-ai',
          'Omgilibot',
          'SearchGPT',
          'Bytespider',
          'CCBot',
          'Diffbot',
        ],
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/admin/'],
      },
      // Default rule for all other crawlers
      {
        userAgent: '*',
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
