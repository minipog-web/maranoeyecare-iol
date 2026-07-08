export const DEFAULT_BADGE = 'Premium IOL Specialists — New Jersey';

const KEYWORD_MAPS = [
  {
    pattern: /cataract/i,
    text: 'Cataract Surgery Specialists — New Jersey',
  },
  {
    pattern: /vivity/i,
    text: 'Vivity IOL Specialists — New Jersey',
  },
  {
    pattern: /panoptix/i,
    text: 'PanOptix IOL Specialists — New Jersey',
  },
  {
    pattern: /eyhance/i,
    text: 'Eyhance IOL Specialists — New Jersey',
  },
  {
    pattern: /astigmatism|toric/i,
    text: 'Astigmatism Specialists — New Jersey',
  },
  {
    pattern: /doctor|surgeon|marano/i,
    text: 'Top Eye Surgeons — New Jersey',
  },
];

/**
 * Resolves the dynamic badge text based on incoming search parameters.
 */
export function getBadgeText(searchParams: Record<string, string | string[] | undefined>): string {
  // Extract tracking parameters
  const keyword = searchParams.keyword || searchParams.utm_term || searchParams.utm_campaign || '';

  const searchStr = Array.isArray(keyword) ? keyword.join(' ') : keyword;

  if (!searchStr) {
    return DEFAULT_BADGE;
  }

  // Find first matching pattern
  const match = KEYWORD_MAPS.find((item) => item.pattern.test(searchStr));

  return match ? match.text : DEFAULT_BADGE;
}
