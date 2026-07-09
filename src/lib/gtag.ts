// Google Tag Manager & Google Analytics helper functions to track custom user events and conversions

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== 'your-google-analytics-id-here'
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    : 'G-1YBZ7BFJ4C';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-K525DMLF';

// Declare global window interface for gtag and dataLayer
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

// Track custom GA4 and GTM events
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
    // Push event to GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: action,
      eventCategory: category,
      eventLabel: label,
      eventValue: value,
    });

    // Fallback direct gtag tracking
    if (window.gtag && GA_MEASUREMENT_ID) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }
};

// Track Google Ads & GTM Conversion events
export const trackAdsConversion = (conversionLabel: string, value?: number) => {
  if (typeof window !== 'undefined') {
    // Push conversion event to GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ads_conversion',
      conversionLabel: conversionLabel,
      value: value,
      currency: 'USD',
    });

    // Fallback direct gtag tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `AW-18197167741/${conversionLabel}`,
        value: value,
        currency: 'USD',
      });
    }
  }
};
