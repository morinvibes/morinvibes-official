// ==========================================================================
// transitions.js — MorinVibes® v22.0
// Page fade in/out transitions. Handles internal link clicks to fade out
// before navigation, and fade in on page load. Restores on back/forward.
// ==========================================================================
'use strict';

(function() {
  // Fade out duration (must match CSS transition)
  const FADE_DURATION = 200; // ms, same as in global.css main transition

  // Get main element
  const mainElement = document.querySelector('main');

  if (!mainElement) return; // no main, abort

  // On page load, ensure main is visible (in case of back/forward cache)
  mainElement.classList.remove('fade-out');
  mainElement.style.opacity = '1'; // redundant but safe

  // Handle all internal link clicks
  document.addEventListener('click', function(e) {
    // Find closest anchor
    const link = e.target.closest('a');
    if (!link) return;

    // Only handle internal links that lead to another page on this site
    const href = link.getAttribute('href');
    if (!href) return;

    // Skip if it's an external link, anchor link, or has target="_blank"
    if (link.target === '_blank') return;
    if (href.startsWith('http') && !href.includes(window.location.hostname)) return;
    if (href.startsWith('#')) return;
    if (href.startsWith('javascript:')) return;
    if (link.hasAttribute('download')) return;

    // Also skip if it's the WhatsApp button or any link with specific class
    if (link.classList.contains('whatsapp-btn') || link.classList.contains('wa-small') || link.classList.contains('footer__wa-link')) return;

    // Prevent default navigation
    e.preventDefault();

    // Fade out main
    mainElement.classList.add('fade-out');
    mainElement.style.opacity = '0';

    // Navigate after fade
    setTimeout(function() {
      window.location.href = href;
    }, FADE_DURATION);
  });

  // Handle back/forward cache (pageshow event)
  window.addEventListener('pageshow', function(event) {
    // If the page is loaded from cache (bfcache), ensure main is visible
    if (event.persisted) {
      mainElement.classList.remove('fade-out');
      mainElement.style.opacity = '1';
    }
  });

  // On initial page load, ensure main is visible (already done)
})();
