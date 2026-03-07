/* ═══════════════════════════════════════════════════════════
   MORINVIBES® — transitions.js
   Page Fade In · Page Fade Out on Navigation
   v1.0 · March 2026
═══════════════════════════════════════════════════════════ */
'use strict';

(function() {

  /* ─── FADE IN on load ─── */
  /* body starts at opacity:0 (set in global.css)
     Adding .loaded triggers opacity:1 transition */
  function fadeIn() {
    document.body.classList.add('loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      requestAnimationFrame(fadeIn);
    });
  } else {
    requestAnimationFrame(fadeIn);
  }


  /* ─── FADE OUT on navigation ─── */
  /* Intercepts all internal link clicks, fades page out,
     then follows the href — creates smooth page transitions */
  document.addEventListener('click', function(e) {
    /* Walk up from click target to find an <a> */
    var el = e.target;
    while (el && el.tagName !== 'A') {
      el = el.parentElement;
    }
    if (!el) return;

    var href = el.getAttribute('href');
    if (!href) return;

    /* Skip: external links, hash anchors, new tab, special protocols */
    var isExternal   = el.target === '_blank';
    var isHash       = href.charAt(0) === '#';
    var isSpecial    = /^(mailto:|tel:|javascript:)/.test(href);
    var isSameDomain = href.indexOf('http') === -1 ||
                       href.indexOf(window.location.hostname) !== -1;

    if (isExternal || isHash || isSpecial || !isSameDomain) return;

    /* Don't intercept if modifier keys held (open in new tab, etc.) */
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

    e.preventDefault();

    /* Fade out */
    document.body.classList.remove('loaded');

    /* Navigate after transition completes */
    var delay = 350; /* matches transition duration in global.css */
    setTimeout(function() {
      window.location.href = href;
    }, delay);
  });


  /* ─── HANDLE BACK/FORWARD (bfcache) ─── */
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      /* Page restored from bfcache — fade in again */
      requestAnimationFrame(fadeIn);
    }
  });

})();
