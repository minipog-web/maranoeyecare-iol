import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://premium-iol.maranoeye.com';

  return {
    rules: [
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
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
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
          'FacebookExternalHit',
          'Omgilibot',
          'SearchGPT',
          'Bytespider',
          'CCBot',
          'Diffbot',
        ],
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // Default rule for all other crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
