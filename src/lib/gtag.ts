// Google Tag Manager & Google Analytics helper functions to track custom user events and conversions
//
// ARCHITECTURE: GTM (GTM-PB9D9RHS) is the single source of truth for GA4 and Google Ads tags.
// All tracking is done by pushing events to window.dataLayer — GTM triggers pick them up.
// Direct gtag() calls are kept as a fallback only (they fire if GTM loads window.gtag).

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== 'your-google-analytics-id-here'
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    : 'G-1YBZ7BFJ4C';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PB9D9RHS';

// Google Tag Gateway / Server-Side Tagging first-party endpoint configuration
export const TAG_GATEWAY_URL =
  process.env.NEXT_PUBLIC_TAG_GATEWAY_URL || 'https://www.googletagmanager.com';

// ─── Named conversion event names (used as GTM trigger event names) ──────────
// These string values must match the "Custom Event" trigger names in your GTM container.
// For Google Ads conversions, configure a Google Ads Conversion tag in GTM triggered
// by these events — do not hardcode Google Ads conversion labels in this file.
export const CONVERSION_EVENTS = {
  PHONE_CLICK: 'phone_click',
  BOOKING_STEP_1: 'booking_step_1_complete',
  BOOKING_COMPLETE: 'booking_complete',
  STICKY_BOOKING_CLICK: 'sticky_booking_click',
  STICKY_BAR_DISMISS: 'sticky_bar_dismiss',
  HEADER_BOOKING_CLICK: 'header_booking_click',
  HEADER_NAV_CLICK: 'header_nav_click',
} as const;

// ─── Type declarations ────────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      action: string,
      params?: Record<string, unknown>
    ) => void;
    // GTM dataLayer — typed as object[] (GTM requires plain objects)
    dataLayer?: object[];
    // CallRail swap.js auto-executes on load; no manual API call needed.
    // For call conversion tracking, use CallRail's native Google Ads integration:
    //   CallRail Dashboard → Integrations → Google Ads
    // This pushes call conversions directly to Google Ads without code-level gtag calls.
    CallRail?: unknown;
  }
}

// ─── Track custom GA4 / GTM events ───────────────────────────────────────────
// Primary: pushes to GTM dataLayer. GTM GA4 tag picks this up via Custom Event trigger.
// Fallback: direct gtag() call if window.gtag is available (e.g. GTM loaded GA4 tag).
export const trackEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined') {
    // Primary: push to GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: action,
      eventCategory: category,
      eventLabel: label,
      eventValue: value,
    });

    // Fallback: direct gtag (only fires if GTM has loaded a GA4 tag that exposes window.gtag)
    if (window.gtag && GA_MEASUREMENT_ID) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }
};

// ─── Track Google Ads conversion via GTM dataLayer ───────────────────────────
// GTM should have a Google Ads Conversion tag triggered by the 'ads_conversion' event.
// Set the conversion action label on the GTM tag — not here.
//
// CALLRAIL NOTE: If CallRail's native Google Ads integration is enabled, phone call
// conversions are reported directly by CallRail. In that case, calling this function
// for phone clicks is redundant for calls (but harmless). Form submission conversions
// should always use this function.
export const trackAdsConversion = (conversionLabel: string, value?: number) => {
  if (typeof window !== 'undefined') {
    // Primary: push conversion event to GTM dataLayer
    // GTM picks this up via a Custom Event trigger → Google Ads Conversion tag
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ads_conversion',
      conversionLabel: conversionLabel,
      value: value,
      currency: 'USD',
    });

    // Fallback: direct gtag (only works if GTM's Google Ads tag has exposed window.gtag)
    // Note: 'AW-18197167741/conversionLabel' — replace conversionLabel with the actual
    // Google Ads conversion action label from: Google Ads → Goals → Conversions → [action] → Tag details
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `AW-18197167741/${conversionLabel}`,
        value: value,
        currency: 'USD',
      });
    }
  }
};
