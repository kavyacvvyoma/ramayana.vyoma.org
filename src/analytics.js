// ════════════════════════════════════════════════════════════════════════════
//  analytics.js  —  Global helper for pushing events to dataLayer (GTM / GA4)
// ════════════════════════════════════════════════════════════════════════════

export const trackEvent = (eventName, eventParams = {}) => {
  try {
    // Push to Google Tag Manager dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventParams
      });
    }

    // Also push to gtag if it exists and hasn't picked up from dataLayer directly
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }
    
    // Optional Meta Pixel fallback if desired (standard events mapping might be needed)
    if (typeof window.fbq === 'function') {
      // Mapping some custom events to standard Meta events, otherwise fire CustomEvent
      if (eventName === 'quiz_completed') {
        window.fbq('track', 'Lead', eventParams);
      } else {
        window.fbq('trackCustom', eventName, eventParams);
      }
    }
    
    // Log for debugging in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics] Tracked Event: ${eventName}`, eventParams);
    }
  } catch (error) {
    console.error("Analytics tracking error:", error);
  }
};
