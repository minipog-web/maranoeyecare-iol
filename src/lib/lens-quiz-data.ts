export interface QuizOption {
  label: string;
  shortLabel: string;
  sublabel?: string;
  icon: string;
  next: string; // question id or 'result:LENS_KEY'
}

export interface QuizQuestion {
  id: string;
  text: string;
  shortText: string;
  subtext?: string;
  options: QuizOption[];
}

export interface LensResult {
  key: 'vivity' | 'panoptix' | 'puresee' | 'monofocal';
  name: string;
  formLabel: string;
  tagline: string;
  highlights: string[];
  badge: string;
  src: string;
  alt: string;
  href: string;
}

export const HERO_LENS_RESULTS: Record<LensResult['key'], LensResult> = {
  vivity: {
    key: 'vivity',
    name: 'Clareon® Vivity®',
    formLabel: 'Clareon Vivity (EDOF)',
    tagline: 'Extended Depth of Focus · Lowest rate of night halos',
    highlights: [
      'Crisp distance & dashboard/computer vision',
      'Non-diffractive X-WAVE™ optics (minimal glare)',
      'Ideal for active lifestyles & night driving',
    ],
    badge: 'Most Popular',
    src: '/assets/images/vivity_iol_real.jpg',
    alt: 'Clareon Vivity extended depth of focus intraocular lens',
    href: '/clareon-vivity',
  },
  panoptix: {
    key: 'panoptix',
    name: 'Clareon® PanOptix® Pro',
    formLabel: 'PanOptix Pro (Trifocal)',
    tagline: 'Full-Range Trifocal · Maximum freedom from reading glasses',
    highlights: [
      'Clear near, intermediate & distance focus',
      'Read phones, menus & books glasses-free',
      '99% of patients would choose it again',
    ],
    badge: 'Trifocal Freedom',
    src: '/assets/images/panoptix_iol_real.jpg',
    alt: 'Clareon PanOptix Pro trifocal intraocular lens',
    href: '/panoptix-pro',
  },
  puresee: {
    key: 'puresee',
    name: 'TECNIS PureSee™',
    formLabel: 'TECNIS PureSee (Refractive EDOF)',
    tagline: 'Purely Refractive EDOF · Zero contrast sensitivity warning',
    highlights: [
      'Pristine distance, intermediate & functional near',
      'Zero diffractive rings for monofocal-like night clarity',
      'Latest J&J MedTech refractive EDOF design',
    ],
    badge: 'Latest Refractive EDOF',
    src: '/assets/images/puresee_iol_real.jpg',
    alt: 'TECNIS PureSee purely refractive extended depth of focus lens',
    href: '/tecnis-puresee',
  },
  monofocal: {
    key: 'monofocal',
    name: 'Standard Monofocal',
    formLabel: 'Standard Monofocal',
    tagline: 'Insurance-Covered · Dependable single-distance clarity',
    highlights: [
      'Covered by Medicare & most commercial plans',
      'Sharp distance focus with proven decades-long safety',
      'Reading glasses used for close-up tasks',
    ],
    badge: 'Medicare Covered',
    src: '/assets/images/monofocal_iol_dark.jpg',
    alt: 'Standard Monofocal single-focus intraocular lens',
    href: '/cataract-education',
  },
};

export const HERO_QUIZ_QUESTIONS: Record<string, QuizQuestion> = {
  q1: {
    id: 'q1',
    text: 'What is your #1 vision goal after cataract surgery?',
    shortText: 'What is your #1 vision goal after cataract surgery?',
    subtext: 'Select your priority to match your lifestyle with the ideal optical lens.',
    options: [
      {
        label: 'Complete freedom from reading glasses across all distances',
        shortLabel: 'Total freedom from reading glasses',
        sublabel: 'Phones, books, menus & screens glasses-free',
        icon: 'BookOpenIcon',
        next: 'q_reading_priority',
      },
      {
        label: 'Smooth, natural vision for an active lifestyle & outdoor recreation',
        shortLabel: 'Active lifestyle & smooth natural vision',
        sublabel: 'Crisp distance, golf, computer & minimal glare',
        icon: 'SunIcon',
        next: 'q_active_routine',
      },
      {
        label: 'Pristine night driving clarity with zero halos or contrast loss',
        shortLabel: 'Pristine night driving with zero halos',
        sublabel: 'Maximum clarity for dark highways & commutes',
        icon: 'MoonIcon',
        next: 'q_night_priority',
      },
      {
        label: 'Standard distance clarity covered fully by Medicare / insurance',
        shortLabel: 'Standard distance covered by Medicare',
        sublabel: 'Insurance option; glasses used for near tasks',
        icon: 'ShieldCheckIcon',
        next: 'result:monofocal',
      },
    ],
  },
  q_reading_priority: {
    id: 'q_reading_priority',
    text: 'How important is reading fine print without readers?',
    shortText: 'How important is reading fine print without glasses?',
    subtext: 'Think about texts, restaurant menus, and labels.',
    options: [
      {
        label: 'Essential — I want to be completely glasses-free all day',
        shortLabel: 'Essential — I want zero reading glasses',
        sublabel: 'Full trifocal range across near, intermediate & distance',
        icon: 'DevicePhoneMobileIcon',
        next: 'result:panoptix',
      },
      {
        label: 'Important, but I also drive extensively on dark highways at night',
        shortLabel: 'Important, but I drive a lot at night',
        sublabel: 'Compare full trifocal near vs. refractive EDOF night purity',
        icon: 'MoonIcon',
        next: 'q_night_tradeoff',
      },
    ],
  },
  q_night_tradeoff: {
    id: 'q_night_tradeoff',
    text: 'When driving after dark, which priority wins?',
    shortText: 'When driving at night, which matters more?',
    subtext: 'Both lenses excel—this decides your ideal optical architecture.',
    options: [
      {
        label: 'I gladly trade mild night halos for 100% glasses-free reading',
        shortLabel: '100% glasses-free reading all day',
        sublabel: '99% of PanOptix Pro patients would choose it again',
        icon: 'EyeIcon',
        next: 'result:panoptix',
      },
      {
        label: 'I prefer pristine dark-highway clarity with zero halo distraction',
        shortLabel: 'Pristine dark-highway clarity',
        sublabel: 'TECNIS PureSee delivers monofocal-like night vision',
        icon: 'SparklesIcon',
        next: 'result:puresee',
      },
    ],
  },
  q_active_routine: {
    id: 'q_active_routine',
    text: 'Which daily environment best fits your routine?',
    shortText: 'Which daily routine sounds most like you?',
    subtext: 'Helps pinpoint the ideal Extended Depth of Focus lens.',
    options: [
      {
        label: 'Outdoor sports, golf, tennis & daily dashboard/computer screens',
        shortLabel: 'Outdoor sports, golf & daily screens',
        sublabel: 'Clareon Vivity X-WAVE™ optics with lowest halo rate',
        icon: 'SunIcon',
        next: 'result:vivity',
      },
      {
        label: 'Frequent night driving, dark commutes & multi-monitor work',
        shortLabel: 'Night commutes & multi-monitor work',
        sublabel: 'TECNIS PureSee refractive optics with zero contrast loss',
        icon: 'ComputerDesktopIcon',
        next: 'result:puresee',
      },
      {
        label: 'Hours of close-up reading & wanting zero reading glasses',
        shortLabel: 'Heavy close-up reading (no readers)',
        sublabel: 'Upgrade to full trifocal near-to-distance focus',
        icon: 'BookOpenIcon',
        next: 'result:panoptix',
      },
    ],
  },
  q_night_priority: {
    id: 'q_night_priority',
    text: 'What matters most in your night-friendly lens?',
    shortText: 'What matters most in your night-friendly lens?',
    subtext: 'Both Vivity and PureSee avoid traditional multifocal rings.',
    options: [
      {
        label: 'Purely refractive optics with zero contrast sensitivity warning',
        shortLabel: 'Pure refractive optics & max contrast',
        sublabel: 'TECNIS PureSee — newest FDA-approved refractive EDOF',
        icon: 'BeakerIcon',
        next: 'result:puresee',
      },
      {
        label: 'Proven wavefront shaping for smooth, forgiving natural vision',
        shortLabel: 'Proven smooth, forgiving natural vision',
        sublabel: 'Clareon Vivity — non-diffractive X-WAVE™ technology',
        icon: 'StarIcon',
        next: 'result:vivity',
      },
      {
        label: 'Good night vision, but reading without glasses is still #1',
        shortLabel: 'Reading without glasses is still #1',
        sublabel: 'PanOptix Pro — full trifocal near-to-distance clarity',
        icon: 'BookOpenIcon',
        next: 'result:panoptix',
      },
    ],
  },
};
