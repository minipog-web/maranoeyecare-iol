// Google Analytics helper function to track custom user events and conversions

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Declare global window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      action: string,
      params: {
        event_category: string;
        event_label?: string;
        value?: number;
      }
    ) => void;
  }
}

// Track custom GA4 events
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
  if (
    typeof window !== 'undefined' &&
    window.gtag &&
    GA_MEASUREMENT_ID &&
    GA_MEASUREMENT_ID !== 'your-google-analytics-id-here'
  ) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
