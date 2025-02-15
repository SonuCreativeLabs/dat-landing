declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = 'G-HR2JWB4M2G';

// Initialize GA with cookie consent settings
export const initGA = () => {
  window.gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
  });

  // Function to update consent
  window.gtag('consent', 'update', {
    'analytics_storage': 'granted',
  });
};

// Enhanced event tracking with error handling
export const trackEvent = (
  action: string,
  category: string,
  label: string,
  value?: number
) => {
  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      send_to: GA_TRACKING_ID,
      non_interaction: false,
    });
  } catch (error) {
    console.warn('Analytics event tracking failed:', error);
  }
};

// Page view tracking with enhanced error handling
export const trackPageView = (url: string, title: string) => {
  try {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title,
      transport_type: 'beacon',
    });
  } catch (error) {
    console.warn('Analytics page view tracking failed:', error);
  }
}; 