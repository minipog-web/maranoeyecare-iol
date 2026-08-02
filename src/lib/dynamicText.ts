export interface DynamicContent {
  badgeText: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDesc: string;
  bookingHeadline: string;
  bookingUrgencyTitle: string;
  bookingUrgencyText: string;
  preselectedLens?: 'vivity' | 'panoptix' | 'eyhance' | 'monofocal';
}

export const DEFAULT_CONTENT: DynamicContent = {
  badgeText: 'Premium IOL Specialists — Livingston • Denville • Newark',
  heroTitleLine1: 'One Surgery. One Choice.',
  heroTitleLine2: 'Lifetime Visual Freedom.',
  heroDesc:
    'Cataract surgery is a single, permanent opportunity to reclaim your active lifestyle. Rather than accepting standard lenses that require reading glasses for the rest of your life, discover the freedom of advanced lenses designed to restore complete, multi-distance clarity.',
  bookingHeadline: 'Reclaim Clear Vision',
  bookingUrgencyTitle: 'Cataracts only progress',
  bookingUrgencyText:
    'and never improve on their own. Waiting makes vision worse and recovery longer.',
};

interface KeywordMapping {
  pattern: RegExp;
  content: Partial<DynamicContent>;
}

const KEYWORD_MAPS: KeywordMapping[] = [
  {
    pattern: /cataract/i,
    content: {
      badgeText: 'Cataract Surgery Specialists — Livingston • Denville • Newark',
      heroTitleLine1: 'Modern Cataract Care.',
      heroTitleLine2: 'Lifetime Visual Freedom.',
      heroDesc:
        'Cataract surgery is a single, permanent choice to reclaim your active lifestyle. Rather than accepting standard lenses, discover the freedom of advanced premium lenses designed to restore crystal-clear, multi-distance vision.',
      bookingHeadline: 'Schedule Your Cataract Consultation',
      bookingUrgencyTitle: 'Cataracts only progress',
      bookingUrgencyText:
        'and never improve on their own. Delaying surgery makes procedures more complex and prolongs recovery.',
    },
  },
  {
    pattern: /vivity/i,
    content: {
      badgeText: 'Vivity IOL Specialists — Livingston • Denville • Newark',
      heroTitleLine1: 'Clareon Vivity EDOF.',
      heroTitleLine2: 'Continuous Visual Depth.',
      heroDesc:
        'Reclaim sharp, high-definition vision without the glare and halo profile of traditional multi-focal lenses. The non-diffractive Clareon Vivity IOL offers seamless focus from distance to intermediate ranges.',
      bookingHeadline: 'Discuss Vivity With Dr. Marano',
      bookingUrgencyTitle: 'A Single, Permanent Opportunity',
      bookingUrgencyText:
        'Your lens choice is a once-in-a-lifetime decision. Explore Vivity to minimize dependence on glasses.',
      preselectedLens: 'vivity',
    },
  },
  {
    pattern: /panoptix/i,
    content: {
      badgeText: 'PanOptix IOL Specialists — Livingston • Denville • Newark',
      heroTitleLine1: 'PanOptix Trifocal IOL.',
      heroTitleLine2: 'Complete Visual Range.',
      heroDesc:
        'Imagine reading your phone, working on your computer, and driving safely without glasses. The Clareon PanOptix trifocal lens delivers exceptional clarity across near, intermediate, and far distances.',
      bookingHeadline: 'Discuss PanOptix With Dr. Marano',
      bookingUrgencyTitle: 'A Single, Permanent Opportunity',
      bookingUrgencyText:
        'Restore your natural visual spectrum in a single 10-minute procedure. Compare premium options today.',
      preselectedLens: 'panoptix',
    },
  },
  {
    pattern: /eyhance/i,
    content: {
      badgeText: 'Eyhance IOL Specialists — Livingston • Denville • Newark',
      heroTitleLine1: 'TECNIS Eyhance IOL.',
      heroTitleLine2: 'Enhanced Monofocal Depth.',
      heroDesc:
        'Upgrade your standard cataract surgery experience. The TECNIS Eyhance offers enhanced intermediate vision to help you navigate daily activities with greater ease and independence.',
      bookingHeadline: 'Discuss Eyhance With Dr. Marano',
      bookingUrgencyTitle: 'Upgrade Your Standard Lens',
      bookingUrgencyText:
        'Standard monofocals only focus at a single distance. Eyhance extends your vision range for a more natural everyday experience.',
      preselectedLens: 'eyhance',
    },
  },
  {
    pattern: /astigmatism|toric/i,
    content: {
      badgeText: 'Astigmatism Specialists — Livingston • Denville • Newark',
      heroTitleLine1: 'Precision Toric Lenses.',
      heroTitleLine2: 'Astigmatism-Free Clarity.',
      heroDesc:
        "Don't let astigmatism hold your vision back. We utilize advanced diagnostic technology and customized toric IOLs to correct astigmatism directly during your cataract surgery.",
      bookingHeadline: 'Schedule Your Astigmatism Consultation',
      bookingUrgencyTitle: 'Permanent Correction',
      bookingUrgencyText:
        'Cataract surgery is your primary opportunity to permanently eliminate corneal astigmatism and reduce your daily reliance on glasses.',
    },
  },
  {
    pattern: /doctor|surgeon|marano/i,
    content: {
      badgeText: 'Top Eye Surgeons — Livingston • Denville • Newark',
      heroTitleLine1: 'Led by Matthew Marano, MD.',
      heroTitleLine2: '40,000+ Completed Procedures.',
      heroDesc:
        'Trust your eyes to a recognized leader teaching other surgeons how to restore absolute clarity. Dr. Marano is a 15-time NJ Monthly Top Doctor dedicated to premium lens technology.',
      bookingHeadline: 'Request a Visit with Dr. Marano',
      bookingUrgencyTitle: 'Experience Matters',
      bookingUrgencyText:
        "Schedule with NJ's leading premium IOL surgeon. Consultations are highly personalized and comprehensive.",
    },
  },
];

/**
 * Resolves the dynamic page content based on incoming search parameters.
 */
export function getDynamicContent(
  searchParams: Record<string, string | string[] | undefined>
): DynamicContent {
  const keyword = searchParams.keyword || searchParams.utm_term || searchParams.utm_campaign || '';
  const searchStr = Array.isArray(keyword) ? keyword.join(' ') : keyword;

  if (!searchStr) {
    return DEFAULT_CONTENT;
  }

  const match = KEYWORD_MAPS.find((item) => item.pattern.test(searchStr));

  if (!match) {
    return DEFAULT_CONTENT;
  }

  return {
    ...DEFAULT_CONTENT,
    ...match.content,
  };
}
