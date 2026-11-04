// Helper to capture and persist Google Ads Click IDs (GCLID, GBRAID, WBRAID) and UTM parameters
// Preserves attribution across multi-page navigation and SPAs for Offline Conversion Imports (OCI)

export interface TrackingParams {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
}

const STORAGE_KEY = 'mec_tracking_params';

export function captureTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const currentParams: TrackingParams = {};

    const gclid = urlParams.get('gclid');
    const gbraid = urlParams.get('gbraid');
    const wbraid = urlParams.get('wbraid');
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmTerm = urlParams.get('utm_term');
    const utmContent = urlParams.get('utm_content');

    if (gclid) currentParams.gclid = gclid;
    if (gbraid) currentParams.gbraid = gbraid;
    if (wbraid) currentParams.wbraid = wbraid;
    if (utmSource) currentParams.utm_source = utmSource;
    if (utmMedium) currentParams.utm_medium = utmMedium;
    if (utmCampaign) currentParams.utm_campaign = utmCampaign;
    if (utmTerm) currentParams.utm_term = utmTerm;
    if (utmContent) currentParams.utm_content = utmContent;

    // Retrieve existing stored params to merge (first-touch or last-touch)
    let existingParams: TrackingParams = {};
    const stored = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        existingParams = JSON.parse(stored);
      } catch {
        // Ignore parse error
      }
    }

    // Merge: if new query params exist, update; otherwise preserve stored
    const mergedParams: TrackingParams = {
      ...existingParams,
      ...currentParams,
      landing_page: existingParams.landing_page || window.location.pathname,
      referrer: existingParams.referrer || document.referrer || undefined,
    };

    // Store in both session and local storage
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mergedParams));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedParams));

    return mergedParams;
  } catch (e) {
    console.warn('Could not capture tracking parameters:', e);
    return {};
  }
}

export function getTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Could not read tracking parameters:', e);
  }

  return captureTrackingParams();
}
