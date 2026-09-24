// Google Tag Manager & Google Analytics (GA4) helper functions
// Optimized for Google Analytics 4 standard events, Consent Mode v2, and Next.js App Router

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== 'your-google-analytics-id-here'
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    : 'G-CTYWND91QV';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PB9D9RHS';

// Google Tag Gateway / Server-Side Tagging first-party endpoint configuration
export const TAG_GATEWAY_URL =
  process.env.NEXT_PUBLIC_TAG_GATEWAY_URL || 'https://www.googletagmanager.com';

// ─── Named conversion event names (used as GTM trigger event names) ──────────
export const CONVERSION_EVENTS = {
  PHONE_CLICK: 'phone_click',
  BOOKING_STEP_1: 'booking_step_1_complete',
  BOOKING_COMPLETE: 'booking_complete',
  STICKY_BOOKING_CLICK: 'sticky_booking_click',
  STICKY_BAR_DISMISS: 'sticky_bar_dismiss',
  HEADER_BOOKING_CLICK: 'header_booking_click',
  HEADER_NAV_CLICK: 'header_nav_click',
  LENS_QUIZ_START: 'lens_quiz_start',
  LENS_QUIZ_COMPLETE: 'lens_quiz_complete',
  SIMULATOR_INTERACTION: 'simulator_interaction',
  CANDIDACY_CLICK: 'candidacy_click',
  SCROLL_DEPTH: 'scroll_depth',
} as const;

// ─── Type declarations ────────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set' | 'consent',
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: object[];
    CallRail?: unknown;
  }
}

// ─── GA4 Page View Tracking for Next.js App Router ───────────────────────────
export const pageview = (url: string, title?: string) => {
  if (typeof window === 'undefined') return;

  const pageTitle = title || document.title;
  const pageLocation = window.location.href;

  // 1. Push to dataLayer for GTM GA4 Configuration Tag
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_path: url,
    page_location: pageLocation,
    page_title: pageTitle,
    send_to: GA_MEASUREMENT_ID,
  });

  // 2. Direct gtag event & config update targeting GA4 Measurement ID G-CTYWND91QV
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: pageLocation,
      page_title: pageTitle,
      send_to: GA_MEASUREMENT_ID,
    });
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_location: pageLocation,
      page_title: pageTitle,
    });
  }
};

// ─── Track custom GA4 / GTM events ───────────────────────────────────────────
export const trackEvent = ({
  action,
  category,
  label,
  value,
  customParams = {},
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParams?: Record<string, unknown>;
}) => {
  if (typeof window === 'undefined') return;

  // Primary: push to GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  const eventPayload: Record<string, unknown> = {
    event: action,
    eventCategory: category,
    eventLabel: label,
    eventValue: value,
    measurement_id: GA_MEASUREMENT_ID,
    ...customParams,
  };
  window.dataLayer.push(eventPayload);

  // Fallback / Direct gtag execution with GA4 G-CTYWND91QV
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      send_to: GA_MEASUREMENT_ID,
      ...customParams,
    });

    // Automatically map to GA4 Recommended Standard Events
    if (action === CONVERSION_EVENTS.BOOKING_STEP_1) {
      window.gtag('event', 'generate_lead', {
        event_category: category,
        event_label: label,
        currency: 'USD',
        value: value ?? 150,
        lead_type: 'consultation_step1',
        preferred_location: label,
        send_to: GA_MEASUREMENT_ID,
        ...customParams,
      });
    } else if (action === CONVERSION_EVENTS.BOOKING_COMPLETE) {
      window.gtag('event', 'schedule_appointment', {
        event_category: category,
        event_label: label,
        currency: 'USD',
        value: value ?? 500,
        appointment_type: 'cataract_iol_consultation',
        send_to: GA_MEASUREMENT_ID,
        ...customParams,
      });
      window.gtag('event', 'generate_lead', {
        event_category: category,
        event_label: label,
        currency: 'USD',
        value: value ?? 500,
        lead_type: 'consultation_complete',
        send_to: GA_MEASUREMENT_ID,
        ...customParams,
      });
    } else if (action === CONVERSION_EVENTS.PHONE_CLICK) {
      window.gtag('event', 'contact', {
        method: 'phone',
        event_category: category,
        event_label: label,
        phone_number: label,
        currency: 'USD',
        value: value ?? 200,
        send_to: GA_MEASUREMENT_ID,
        ...customParams,
      });
    } else if (action === CONVERSION_EVENTS.LENS_QUIZ_COMPLETE || action === 'quiz_complete') {
      window.gtag('event', 'qualify_lead', {
        lead_score: 95,
        recommended_lens: label,
        send_to: GA_MEASUREMENT_ID,
        ...customParams,
      });
      window.gtag('event', 'select_content', {
        content_type: 'lens_quiz_recommendation',
        item_id: label,
        send_to: GA_MEASUREMENT_ID,
        ...customParams,
      });
    } else if (action === CONVERSION_EVENTS.LENS_QUIZ_START) {
      window.gtag('event', 'tutorial_begin', {
        tutorial_id: 'lens_selection_quiz',
        send_to: GA_MEASUREMENT_ID,
        ...customParams,
      });
    } else if (action === CONVERSION_EVENTS.SIMULATOR_INTERACTION) {
      window.gtag('event', 'select_content', {
        content_type: 'vision_simulator',
        item_id: label,
        send_to: GA_MEASUREMENT_ID,
        ...customParams,
      });
    } else if (action === CONVERSION_EVENTS.SCROLL_DEPTH) {
      window.gtag('event', 'scroll', {
        percent_scrolled: value,
        send_to: GA_MEASUREMENT_ID,
        ...customParams,
      });
    }
  }
};

// ─── Dedicated GA4 Healthcare Interaction Trackers ───────────────────────────
export const trackPhoneClick = (source: string) => {
  trackEvent({
    action: CONVERSION_EVENTS.PHONE_CLICK,
    category: 'Conversion',
    label: source,
    value: 200,
  });
  trackAdsConversion('phone_click');
};

export const trackConsultationBooking = (location: string, lens?: string) => {
  trackEvent({
    action: CONVERSION_EVENTS.BOOKING_COMPLETE,
    category: 'Conversion',
    label: `${location}${lens ? ` - ${lens}` : ''}`,
    value: 500,
    customParams: {
      location,
      selected_lens: lens,
    },
  });
  trackAdsConversion(GOOGLE_ADS_CONVERSIONS.BOOK_APPOINTMENT, 500);
};

export const trackLeadStep1 = (location: string) => {
  trackEvent({
    action: CONVERSION_EVENTS.BOOKING_STEP_1,
    category: 'Engagement',
    label: location,
    value: 150,
    customParams: {
      location,
    },
  });
  trackAdsConversion(GOOGLE_ADS_CONVERSIONS.LEAD_FORM, 150);
};

export const trackScrollDepth = (percent: number) => {
  trackEvent({
    action: CONVERSION_EVENTS.SCROLL_DEPTH,
    category: 'Engagement',
    label: `${percent}%`,
    value: percent,
    customParams: { percent_scrolled: percent },
  });
};

export const trackQuizStart = () => {
  trackEvent({
    action: CONVERSION_EVENTS.LENS_QUIZ_START,
    category: 'Engagement',
    label: 'Lens Quiz Started',
  });
};

export const trackQuizComplete = (lensName: string, lensKey: string) => {
  trackEvent({
    action: CONVERSION_EVENTS.LENS_QUIZ_COMPLETE,
    category: 'Conversion',
    label: lensName,
    value: 250,
    customParams: {
      recommended_lens_key: lensKey,
      recommended_lens_name: lensName,
    },
  });
};

export const trackSimulatorInteraction = (lensKey: string, lighting: string, distance: string) => {
  trackEvent({
    action: CONVERSION_EVENTS.SIMULATOR_INTERACTION,
    category: 'Engagement',
    label: lensKey,
    customParams: {
      selected_lens: lensKey,
      lighting_condition: lighting,
      focal_distance: distance,
    },
  });
};

export const trackCandidacyClick = (source: string) => {
  trackEvent({
    action: CONVERSION_EVENTS.CANDIDACY_CLICK,
    category: 'Engagement',
    label: source,
  });
};

// ─── Google Ads Conversion Labels & Triggers ─────────────────────────────────
export const GOOGLE_ADS_CONVERSIONS = {
  LEAD_FORM: 'AW-17962563730/P12NCJ6IgdwcEJLxm_VC',
  BOOK_APPOINTMENT: 'AW-17962563730/IsEZCL66_dscEJLxm_VC',
} as const;

// ─── Track Google Ads conversion via gtag and GTM dataLayer ──────────────────
export const trackAdsConversion = (
  conversionIdOrLabel: string,
  value?: number,
  currency: string = 'USD'
) => {
  if (typeof window === 'undefined') return;

  const sendTo = conversionIdOrLabel.startsWith('AW-')
    ? conversionIdOrLabel
    : `AW-18197167741/${conversionIdOrLabel}`;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'ads_conversion',
    conversionLabel: conversionIdOrLabel,
    send_to: sendTo,
    value: value,
    currency: currency,
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: sendTo,
      value: value,
      currency: currency,
    });
  }
};
