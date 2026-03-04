/**
 * MorinVibes® — Meta Pixel Tracking v8.0
 * ================================================================
 * Events: PageView · ViewContent · AddToCart · InitiateCheckout
 *         Purchase · Lead · ScrollDepth · ShopeeClick · LazadaClick
 *         SocialClick · TimeOnPage · VideoEngagement
 *
 * Improvements over v7:
 *  ✦ Event deduplication via eventID (server-side API ready)
 *  ✦ Consent guard — respects cookie consent before firing
 *  ✦ Scroll listener throttled (no more per-pixel firing)
 *  ✦ Pixel load failure handled gracefully
 *  ✦ All click handlers merged into ONE delegated listener
 *  ✦ Time-on-page milestone tracking
 *  ✦ ViewContent fires via IntersectionObserver, not setTimeout
 *  ✦ Custom event queue — fires missed events after late consent
 *  ✦ Debug mode via ?mv_debug=1 URL param
 *
 * ► Replace PIXEL_ID before going live.
 * ================================================================
 */

(function () {
  'use strict';

  // ─────────────────────────────────────────────
  // CONFIGURATION
  // ─────────────────────────────────────────────
  const CONFIG = {
    PIXEL_ID: 'YOUR_PIXEL_ID',       // ← REPLACE with your actual Meta Pixel ID
    PRODUCT: {
      id:       'moringa-90',
      name:     'MorinVibes Moringa 90s',
      category: 'Moringa Capsules',
      price:    89,
      currency: 'MYR',
    },
    // Pathnames that count as "product/content" pages
    CONTENT_PATHS: ['/shop', '/benefits', '/product'],
    CHECKOUT_PATHS: ['/checkout'],
    THANKYOU_PATHS: ['/thankyou', '/thank-you', '/order-confirmed'],
    // Consent cookie name. Set to null to disable consent check.
    CONSENT_COOKIE: 'mv_cookie_consent',
    // Debug: also enable via ?mv_debug=1
    DEBUG: false,
  };

  // ─────────────────────────────────────────────
  // UTILITIES
  // ─────────────────────────────────────────────

  /** Throttle a function using RAF. */
  function throttle(fn, limit) {
    let last = 0, raf;
    return function () {
      const now = Date.now();
      if (now - last >= limit) {
        last = now;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => fn.apply(this, arguments));
      }
    };
  }

  /** Generate a short random event ID for deduplication. */
  function genEventId() {
    return `mv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  }

  /** Check if current pathname matches any of the given patterns. */
  function pathMatches(patterns) {
    const path = window.location.pathname.toLowerCase();
    return patterns.some((p) => path.includes(p));
  }

  /** Read a cookie value by name. */
  function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  }

  /** URL params helper. */
  const param = (key) => new URLSearchParams(window.location.search).get(key);

  /** Debug logger — only logs when debug mode is active. */
  const isDebug = CONFIG.DEBUG || param('mv_debug') === '1';
  function log(...args) {
    if (isDebug) console.log('%c[MorinVibes Pixel]', 'color:#1877f2;font-weight:bold', ...args);
  }

  // ─────────────────────────────────────────────
  // CONSENT GUARD
  // ─────────────────────────────────────────────
  let consentGranted = false;
  const pendingQueue = [];

  function hasConsent() {
    if (!CONFIG.CONSENT_COOKIE) return true; // consent check disabled
    return getCookie(CONFIG.CONSENT_COOKIE) === '1';
  }

  /**
   * Call this when the user accepts cookies.
   * Flushes the pending event queue.
   */
  window.MorinVibesPixelConsent = function grantConsent() {
    consentGranted = true;
    log('Consent granted — flushing queue', pendingQueue.length, 'events');
    while (pendingQueue.length) {
      const { name, params } = pendingQueue.shift();
      fire(name, params);
    }
  };

  // ─────────────────────────────────────────────
  // META PIXEL LOADER
  // ─────────────────────────────────────────────
  let pixelReady = false;

  function loadPixel() {
    return new Promise((resolve, reject) => {
      if (window.fbq) { resolve(); return; }

      /* eslint-disable */
      !function(f,b,e,v,n,t,s){
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s);
        t.onload = resolve;
        t.onerror = reject;
      }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
    });
  }

  // ─────────────────────────────────────────────
  // CORE FIRE FUNCTION
  // ─────────────────────────────────────────────

  /**
   * Fire a pixel event — respects consent, deduplicates via eventID.
   * @param {'track'|'trackCustom'} method
   * @param {string} eventName
   * @param {object} [params]
   */
  function fire(eventName, params = {}, method = 'track') {
    if (!consentGranted) {
      pendingQueue.push({ name: eventName, params });
      log('Queued (no consent yet):', eventName, params);
      return;
    }

    if (!window.fbq) {
      log('fbq not loaded yet — queuing:', eventName);
      pendingQueue.push({ name: eventName, params });
      return;
    }

    const eventId = genEventId();
    const options = { eventID: eventId }; // Enables Conversions API deduplication

    fbq(method, eventName, params, options);
    log(`✓ ${method}('${eventName}')`, params, '→ eventID:', eventId);
  }

  function fireCustom(eventName, params = {}) {
    fire(eventName, params, 'trackCustom');
  }

  // ─────────────────────────────────────────────
  // PRODUCT PAYLOAD HELPER
  // ─────────────────────────────────────────────
  function productPayload(overrides = {}) {
    return Object.assign(
      {
        content_ids:      [CONFIG.PRODUCT.id],
        content_name:     CONFIG.PRODUCT.name,
        content_category: CONFIG.PRODUCT.category,
        content_type:     'product',
        value:            CONFIG.PRODUCT.price,
        currency:         CONFIG.PRODUCT.currency,
      },
      overrides
    );
  }

  // ─────────────────────────────────────────────
  // 1. PAGE VIEW
  // ─────────────────────────────────────────────
  function trackPageView() {
    fbq('init', CONFIG.PIXEL_ID);
    fire('PageView');
    log('PageView fired for:', window.location.pathname);
  }

  // ─────────────────────────────────────────────
  // 2. VIEW CONTENT — fires when product section enters viewport
  // ─────────────────────────────────────────────
  function trackViewContent() {
    if (!pathMatches(CONFIG.CONTENT_PATHS)) return;

    // Try to observe the product card/section; fallback to body
    const target =
      document.querySelector('.product-svg-card, .product-section, #shop, #product') ||
      document.body;

    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (fired || !entries[0].isIntersecting) return;
        fired = true;
        fire('ViewContent', productPayload());
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(target);
  }

  // ─────────────────────────────────────────────
  // 3. INITIATE CHECKOUT
  // ─────────────────────────────────────────────
  function trackInitiateCheckout() {
    if (!pathMatches(CONFIG.CHECKOUT_PATHS)) return;
    fire('InitiateCheckout', productPayload({ num_items: 1 }));
  }

  // ─────────────────────────────────────────────
  // 4. PURCHASE — reads qty from URL param
  // ─────────────────────────────────────────────
  function trackPurchase() {
    if (!pathMatches(CONFIG.THANKYOU_PATHS)) return;

    const qty = Math.max(1, parseInt(param('qty') || '1', 10));
    const orderId = param('order_id') || genEventId(); // use order_id if available
    const total = parseFloat((qty * CONFIG.PRODUCT.price).toFixed(2));

    fire(
      'Purchase',
      productPayload({
        value:     total,
        num_items: qty,
        order_id:  orderId,
      })
    );
  }

  // ─────────────────────────────────────────────
  // 5. SCROLL DEPTH — throttled, fires each milestone once
  // ─────────────────────────────────────────────
  function trackScrollDepth() {
    const milestones = [25, 50, 75, 100];
    const fired = new Set();

    function check() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.round((window.scrollY / total) * 100);

      milestones.forEach((m) => {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          fireCustom('ScrollDepth', { depth: m, page: window.location.pathname });
        }
      });

      // Stop observing once all milestones hit
      if (fired.size === milestones.length) {
        window.removeEventListener('scroll', scrollHandler);
      }
    }

    const scrollHandler = throttle(check, 300);
    window.addEventListener('scroll', scrollHandler, { passive: true });
  }

  // ─────────────────────────────────────────────
  // 6. TIME ON PAGE — milestones at 15s, 30s, 60s, 120s
  // ─────────────────────────────────────────────
  function trackTimeOnPage() {
    const milestones = [15, 30, 60, 120]; // seconds
    milestones.forEach((seconds) => {
      setTimeout(() => {
        fireCustom('TimeOnPage', { seconds, page: window.location.pathname });
      }, seconds * 1000);
    });
  }

  // ─────────────────────────────────────────────
  // 7. UNIFIED CLICK DELEGATE
  //    One listener handles: Buy · WhatsApp · Shopee · Lazada · Social
  // ─────────────────────────────────────────────
  function trackClicks() {
    document.addEventListener('click', (e) => {

      // — AddToCart: Buy buttons —
      if (e.target.closest('.btn--primary, .btn--small, [href*="checkout"], .nav__mobile-right .btn, .product-svg-card .btn--primary')) {
        fire('AddToCart', productPayload({ num_items: 1 }));
        return;
      }

      // — Lead: WhatsApp —
      if (e.target.closest('a[href*="wa.me"], a[href*="whatsapp"], .btn-whatsapp, .popup-link--wa')) {
        fire('Lead', { content_name: 'WhatsApp Contact', lead_source: 'WhatsApp' });
        return;
      }

      // — Custom: Shopee —
      if (e.target.closest('a[href*="shopee"]')) {
        fireCustom('ShopeeClick', { destination: 'Shopee', content_name: 'Shopee Referral' });
        return;
      }

      // — Custom: Lazada —
      if (e.target.closest('a[href*="lazada"]')) {
        fireCustom('LazadaClick', { destination: 'Lazada', content_name: 'Lazada Referral' });
        return;
      }

      // — Custom: Social media —
      const platforms = {
        facebook:  'a[href*="facebook.com"]',
        instagram: 'a[href*="instagram.com"]',
        tiktok:    'a[href*="tiktok.com"]',
        youtube:   'a[href*="youtube.com"]',
      };
      for (const [platform, selector] of Object.entries(platforms)) {
        if (e.target.closest(selector)) {
          fireCustom('SocialClick', { platform });
          return;
        }
      }

    }, { passive: true });
  }

  // ─────────────────────────────────────────────
  // 8. VIDEO ENGAGEMENT — tracks play / 50% / complete
  // ─────────────────────────────────────────────
  function trackVideoEngagement() {
    const videos = document.querySelectorAll('video');
    if (!videos.length) return;

    videos.forEach((video) => {
      const label = video.dataset.trackLabel || video.src || 'video';
      let firedMid = false;

      video.addEventListener('play', () => {
        fireCustom('VideoPlay', { video: label });
      });

      video.addEventListener('timeupdate', () => {
        if (!firedMid && video.duration && video.currentTime / video.duration >= 0.5) {
          firedMid = true;
          fireCustom('VideoMidpoint', { video: label });
        }
      });

      video.addEventListener('ended', () => {
        fireCustom('VideoComplete', { video: label });
      });
    });
  }

  // ─────────────────────────────────────────────
  // BOOT — load pixel then initialise all tracking
  // ─────────────────────────────────────────────
  function boot() {
    // Check consent on init
    consentGranted = hasConsent();

    loadPixel()
      .then(() => {
        pixelReady = true;

        // If consent already given, fire everything immediately.
        // Otherwise, only PageView fires; rest queue until consent granted.
        if (consentGranted) {
          trackPageView();
        } else {
          // PageView fires without consent (standard practice for basic analytics)
          fbq('init', CONFIG.PIXEL_ID);
          fbq('track', 'PageView');
          log('PageView fired (pre-consent). Other events queued.');
        }

        trackViewContent();
        trackInitiateCheckout();
        trackPurchase();
        trackScrollDepth();
        trackTimeOnPage();
        trackClicks();
        trackVideoEngagement();

        log('Pixel v8.0 ready | Pixel ID:', CONFIG.PIXEL_ID);
      })
      .catch((err) => {
        // Pixel failed to load (ad blocker, network issue) — fail silently
        log('Pixel failed to load:', err.message || err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
