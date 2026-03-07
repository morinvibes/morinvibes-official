'use strict';

/* ═══════════════════════════════════════════════════════════════
   MORINVIBES® — transitions.js
   Page-exit fade on internal link clicks
   Page-enter fade on load
   ═══════════════════════════════════════════════════════════════ */

(function() {

  var BASE = '/morinvibes-official/';

  /* ─── PAGE ENTER — fade in on load ─── */
  document.addEventListener('DOMContentLoaded', function() {
    var main = document.querySelector('main');
    if (main) {
      main.classList.add('page-transition-enter');
    }
  });

  /* ─── PAGE EXIT — fade out on internal link click ─── */
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';

    // Only intercept internal same-origin links (not anchors, not external, not JS)
    var isInternal = (
      href.indexOf(BASE) === 0 &&
      href.indexOf('#') === -1 &&
      !link.hasAttribute('target') &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey
    );

    if (!isInternal) return;

    e.preventDefault();

    var main = document.querySelector('main');
    if (main) {
      main.style.opacity = '0';
      main.style.transition = 'opacity .22s ease';
    }

    setTimeout(function() {
      window.location.href = href;
    }, 240);
  });

  /* ─── BACK/FORWARD — restore fade on popstate ─── */
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      var main = document.querySelector('main');
      if (main) {
        main.style.opacity = '';
        main.style.transition = '';
        main.classList.add('page-transition-enter');
      }
    }
  });

})();
