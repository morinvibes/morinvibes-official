/* ===== MORINVIBES® — PIXEL.JS ===== */
/* Version: 16.0 · March 2026 */
/* External JS — Meta Pixel event tracking */
/* Path: /morinvibes-official/assets/js/pixel.js */

(function() {
  'use strict';

  /* ------------------------------------ */
  /* PIXEL CONFIGURATION                  */
  /* ------------------------------------ */

  // Pixel ID is defined in HTML as global variable PIXEL_ID
  // This file expects PIXEL_ID to be available in the global scope
  // It will be set in the inline script in the <head> of each page

  /**
   * Safe wrapper for fbq tracking
   * Only fires if fbq is defined AND Pixel ID is not the placeholder
   * @param {string} eventName - The event name (e.g., 'PageView')
   * @param {object} eventData - Optional event parameters
   */
  window.fbTrack = function(eventName, eventData) {
    // Check if fbq exists and PIXEL_ID is properly set (not the placeholder)
    if (typeof fbq !== 'undefined' && 
        typeof PIXEL_ID !== 'undefined' && 
        PIXEL_ID !== 'YOUR_PIXEL_ID') {
      fbq('track', eventName, eventData || {});
    } else {
      // Development mode — log events to console for testing
      if (window.location.hostname === 'localhost' || 
          window.location.hostname === '127.0.0.1') {
        console.log(`[Pixel Debug] ${eventName}:`, eventData || {});
      }
    }
  };

  /* ------------------------------------ */
  /* EVENT-SPECIFIC HELPER FUNCTIONS      */
  /* ------------------------------------ */

  /**
   * Track PageView (usually called automatically by base pixel)
   * @param {string} pageName - Optional page name
   */
  window.trackPageView = function(pageName) {
    window.fbTrack('PageView', pageName ? { page: pageName } : {});
  };

  /**
   * Track ViewContent (product views, category views)
   * @param {object} data - Content data
   */
  window.trackViewContent = function(data) {
    const defaultData = {
      content_name: 'MorinVibes Moringa Capsules',
      content_category: 'Moringa Supplements',
      content_ids: ['moringa-90s'],
      content_type: 'product',
      value: 89.00,
      currency: 'MYR'
    };
    
    window.fbTrack('ViewContent', { ...defaultData, ...data });
  };

  /**
   * Track AddToCart (any purchase CTA click)
   * @param {object} data - Cart data
   */
  window.trackAddToCart = function(data) {
    const defaultData = {
      content_ids: ['moringa-90s'],
      content_name: 'MorinVibes Moringa Capsules',
      content_type: 'product',
      value: 89.00,
      currency: 'MYR',
      num_items: 1
    };
    
    window.fbTrack('AddToCart', { ...defaultData, ...data });
  };

  /**
   * Track InitiateCheckout (checkout modal opened)
   * @param {object} data - Checkout data
   */
  window.trackInitiateCheckout = function(data) {
    const defaultData = {
      content_name: 'MorinVibes Moringa Capsules 90s',
      content_ids: ['moringa-90s'],
      content_type: 'product',
      value: 89.00,
      currency: 'MYR',
      num_items: 1
    };
    
    window.fbTrack('InitiateCheckout', { ...defaultData, ...data });
  };

  /**
   * Track Purchase (thankyou.html only)
   * @param {object} data - Purchase data
   */
  window.trackPurchase = function(data) {
    const defaultData = {
      value: 89.00,
      currency: 'MYR',
      content_ids: ['moringa-90s'],
      content_name: 'MorinVibes Moringa Capsules',
      content_type: 'product',
      num_items: 1
    };
    
    window.fbTrack('Purchase', { ...defaultData, ...data });
  };

  /**
   * Track Lead (WhatsApp clicks, newsletter signups)
   * @param {string} source - Source of the lead (e.g., 'WhatsApp CTA', 'Newsletter')
   */
  window.trackLead = function(source) {
    window.fbTrack('Lead', { content_name: source });
  };

  /**
   * Track custom events (Shopee/Lazada clicks, etc.)
   * @param {string} eventName - Custom event name
   * @param {object} data - Optional event data
   */
  window.trackCustomEvent = function(eventName, data) {
    window.fbTrack('CustomEvent', { event_name: eventName, ...data });
  };

  /* ------------------------------------ */
  /* AUTOMATIC PAGE-SPECIFIC TRACKING     */
  /* ------------------------------------ */

  // This runs on page load to track page-specific events
  document.addEventListener('DOMContentLoaded', function() {
    // Get current page path
    const path = window.location.pathname;
    
    // Track ViewContent for shop and wellness pages
    if (path.includes('/shop.html')) {
      window.trackViewContent({
        content_name: 'Shop Page - Moringa Capsules',
        content_category: 'Product Page'
      });
    } else if (path.includes('/wellness.html')) {
      window.trackViewContent({
        content_name: 'Wellness Page - Benefits & Journal',
        content_category: 'Content'
      });
    } else if (path.includes('/thankyou.html')) {
      // Thank you page will have its own Purchase event
      // This is just a fallback if the inline script doesn't fire
      console.log('Thank you page loaded — Purchase event should fire from inline script');
    }
    
    // Log pixel status (helpful for debugging)
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1') {
      console.log('[Pixel Debug] Pixel.js loaded. PIXEL_ID:', 
                  typeof PIXEL_ID !== 'undefined' ? PIXEL_ID : 'not defined');
    }
  });

  /* ------------------------------------ */
  /* DYNAMIC EVENT BINDING HELPERS        */
  /* ------------------------------------ */

  /**
   * Bind pixel tracking to a set of elements
   * @param {string|NodeList} elements - CSS selector or NodeList
   * @param {string} eventName - Pixel event name
   * @param {function} getData - Function to generate event data
   */
  window.bindPixelTracking = function(elements, eventName, getData) {
    const els = typeof elements === 'string' 
      ? document.querySelectorAll(elements) 
      : elements;
    
    if (!els || !els.forEach) return;
    
    els.forEach(function(el) {
      if (el) {
        el.addEventListener('click', function(e) {
          const data = typeof getData === 'function' ? getData(e, el) : {};
          window.fbTrack(eventName, data);
        });
      }
    });
  };

  // Log that pixel.js is loaded
  console.log('MorinVibes® pixel.js loaded');
})();
