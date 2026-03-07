'use strict';

/* ============================================================
   MORINVIBES® — transitions.js
   Page fade-in on load · Fade-out before navigation
   ============================================================ */

(function () {

  // ── Inject transition overlay ─────────────────────────────
  var overlay = document.createElement('div');
  overlay.id = 'page-transition';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.cssText = [
    'position:fixed',
    'inset:0',
    'background:var(--white, #fff)',
    'z-index:9999',
    'pointer-events:none',
    'opacity:1',
    'transition:opacity .38s cubic-bezier(0,0,.2,1)'
  ].join(';');

  // Append as early as possible
  function appendOverlay() {
    if (document.body && !document.getElementById('page-transition')) {
      document.body.appendChild(overlay);
    }
  }

  if (document.body) {
    appendOverlay();
  } else {
    document.addEventListener('DOMContentLoaded', appendOverlay);
  }

  // ── Fade in on page load ──────────────────────────────────
  function fadeIn() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fadeIn);
  } else {
    fadeIn();
  }

  // ── Fade out before navigating away ──────────────────────
  function handleLinkClick(e) {
    var link = e.currentTarget;
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;

    // Skip: external, new tab, anchors, tel, mailto, javascript
    if (
      link.target === '_blank' ||
      href.charAt(0) === '#'   ||
      href.indexOf('tel:')        === 0 ||
      href.indexOf('mailto:')     === 0 ||
      href.indexOf('javascript:') === 0 ||
      href.indexOf('wa.me')       !== -1 ||
      e.ctrlKey || e.metaKey || e.shiftKey
    ) {
      return;
    }

    e.preventDefault();
    overlay.style.pointerEvents = 'all';
    overlay.style.opacity = '1';

    setTimeout(function () {
      window.location.href = href;
    }, 380);
  }

  function bindLinks() {
    var links = document.querySelectorAll('a[href]');
    links.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (
        link.target !== '_blank' &&
        href.charAt(0) !== '#'   &&
        href.indexOf('tel:')        !== 0 &&
        href.indexOf('mailto:')     !== 0 &&
        href.indexOf('javascript:') !== 0 &&
        href.indexOf('wa.me')       === -1
      ) {
        link.removeEventListener('click', handleLinkClick);
        link.addEventListener('click', handleLinkClick);
      }
    });
  }

  // Bind now and after components inject nav/footer
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindLinks);
  } else {
    bindLinks();
  }

  // Re-bind after a short delay (nav/footer injected by components.js)
  setTimeout(bindLinks, 300);

  // ── Handle back/forward (bfcache) ─────────────────────────
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    }
  });

}());
