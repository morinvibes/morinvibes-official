'use strict';

/* ═══════════════════════════════════════════════════════════════
   MORINVIBES® — animations.js
   IntersectionObserver · scroll-reveal · counter · stagger delays
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  /* ─── SCROLL-REVEAL: .fade-up / .fade-left / .fade-right ─── */
  var fadeEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

  if (fadeEls.length > 0 && typeof IntersectionObserver !== 'undefined') {
    var fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(function(el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately if IntersectionObserver not supported
    fadeEls.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  /* ─── COUNTER ANIMATION ─── */
  // Elements with [data-count] animate their text content from 0 to the value
  var counterEls = document.querySelectorAll('[data-count]');

  if (counterEls.length > 0 && typeof IntersectionObserver !== 'undefined') {

    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counterEls.forEach(function(el) {
      counterObserver.observe(el);
    });
  }

  /**
   * Animate a counter element from 0 to its data-count value.
   * @param {HTMLElement} el
   */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;

    var duration = 1600; // ms
    var startTime = null;
    var startVal = 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(startVal + (target - startVal) * eased);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  /* ─── NAV SCROLL BEHAVIOUR ─── */
  var nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ─── SCROLL PROGRESS BAR ─── */
  var progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ─── META PIXEL — ViewContent on product section ─── */
  var productSection = document.getElementById('product');
  if (productSection && typeof IntersectionObserver !== 'undefined') {
    var viewContentFired = false;
    var productObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !viewContentFired) {
          viewContentFired = true;
          if (typeof fbTrack === 'function') {
            fbTrack('ViewContent', {
              content_name: 'MorinVibes Moringa Capsules',
              content_category: 'Health Supplement',
              value: 89,
              currency: 'MYR'
            });
          }
          productObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    productObserver.observe(productSection);
  }

});
