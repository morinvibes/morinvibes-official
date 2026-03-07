'use strict';

/* ============================================================
   MORINVIBES® — pixel.js
   Meta Pixel — loads FIRST on every page
   ============================================================ */

(function () {
  var PIXEL_ID = '[PIXEL_ID]';

  // ── Inject base pixel code ──────────────────────────────────
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) s.parentNode.insertBefore(t, s);
  }(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );

  if (typeof window.fbq === 'function') {
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // ── NoScript fallback ───────────────────────────────────────
  var ns = document.createElement('noscript');
  var img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.cssText = 'display:none';
  img.src = 'https://www.facebook.com/tr?id=' + PIXEL_ID + '&ev=PageView&noscript=1';
  ns.appendChild(img);
  var body = document.body || document.getElementsByTagName('body')[0];
  if (body) body.insertBefore(ns, body.firstChild);

  // ── Global helper (used by main.js) ────────────────────────
  window.fbTrack = function (event, params) {
    if (typeof window.fbq !== 'function') return;
    try {
      if (params) {
        window.fbq('track', event, params);
      } else {
        window.fbq('track', event);
      }
    } catch (err) {
      /* silent fail — pixel must never break the page */
    }
  };
}());
