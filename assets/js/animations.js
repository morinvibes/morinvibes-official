'use strict';

/* ============================================================
   MORINVIBES® — animations.js
   Scroll-reveal · Counter animation · Parallax
   Hero bottle tilt · Magnetic buttons
   ============================================================ */

(function () {

  // ── Scroll reveal ─────────────────────────────────────────
  var revealElements = [];

  function collectRevealElements() {
    var selectors = '.fade-up, .fade-left, .fade-right, .scale-in';
    var found = document.querySelectorAll(selectors);
    revealElements = Array.prototype.slice.call(found);
  }

  function checkReveal() {
    var vh = window.innerHeight;
    revealElements.forEach(function (el) {
      if (el.classList.contains('visible')) return;
      var rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.92) {
        el.classList.add('visible');
      }
    });
  }

  // ── Counter animation ──────────────────────────────────────
  var countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var allVisible = true;
    counters.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight) allVisible = false;
    });
    if (!allVisible) return;

    countersStarted = true;
    counters.forEach(function (el) {
      var target   = parseFloat(el.getAttribute('data-count')) || 0;
      var duration = 1600;
      var start    = null;
      var startVal = 0;
      var suffix   = el.getAttribute('data-suffix') || '';
      var prefix   = el.getAttribute('data-prefix') || '';
      var decimals = (String(target).split('.')[1] || '').length;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        // ease-out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = startVal + (target - startVal) * eased;
        el.textContent = prefix + current.toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toFixed(decimals) + suffix;
        }
      }
      requestAnimationFrame(step);
    });
  }

  // ── Timeline grow animation (Our Story) ───────────────────
  function initTimelineAnimation() {
    var timeline = document.querySelector('.story__timeline');
    if (!timeline) return;

    var line = document.createElement('div');
    line.className = 'story__timeline-line';
    line.style.cssText = [
      'position:absolute',
      'top:20px',
      'left:0',
      'height:1px',
      'background:rgba(255,255,255,.2)',
      'width:0',
      'transition:width 1.2s cubic-bezier(0,0,.2,1)',
      'pointer-events:none'
    ].join(';');
    timeline.style.position = 'relative';

    var triggered = false;
    function checkTimeline() {
      if (triggered) return;
      var rect = timeline.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        triggered = true;
        timeline.appendChild(line);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            line.style.width = '100%';
          });
        });
      }
    }
    window.addEventListener('scroll', checkTimeline, { passive: true });
    checkTimeline();
  }

  // ── Hero bottle 3D tilt ────────────────────────────────────
  function initHeroTilt() {
    var bottle = document.querySelector('.hero__bottle.js-tilt');
    if (!bottle) return;

    var visual = bottle.closest('.hero__visual');
    if (!visual) return;

    var isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    visual.addEventListener('mousemove', function (e) {
      var rect  = visual.getBoundingClientRect();
      var cx    = rect.left + rect.width / 2;
      var cy    = rect.top  + rect.height / 2;
      var dx    = (e.clientX - cx) / (rect.width  / 2);
      var dy    = (e.clientY - cy) / (rect.height / 2);
      var rotX  = -dy * 10;
      var rotY  =  dx * 10;
      bottle.style.transform = [
        'translateY(0)',
        'perspective(800px)',
        'rotateX(' + rotX + 'deg)',
        'rotateY(' + rotY + 'deg)'
      ].join(' ');
      bottle.style.transition = 'transform .1s linear';
    });

    visual.addEventListener('mouseleave', function () {
      bottle.style.transform = '';
      bottle.style.transition = 'transform .6s cubic-bezier(.34,1.56,.64,1)';
      setTimeout(function () {
        bottle.style.transition = '';
      }, 600);
    });
  }

  // ── Product card 3D tilt ───────────────────────────────────
  function initCardTilt() {
    var cards = document.querySelectorAll('.js-tilt-card');
    if (!cards.length) return;

    var isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var cx   = rect.left + rect.width  / 2;
        var cy   = rect.top  + rect.height / 2;
        var dx   = (e.clientX - cx) / (rect.width  / 2);
        var dy   = (e.clientY - cy) / (rect.height / 2);
        var rotX = -dy * 14;
        var rotY =  dx * 14;
        card.style.transform = [
          'perspective(800px)',
          'rotateX(' + rotX + 'deg)',
          'rotateY(' + rotY + 'deg)',
          'translateZ(8px)'
        ].join(' ');
        card.style.transition = 'transform .08s linear';
        card.style.boxShadow  = '0 32px 80px rgba(0,151,178,.22)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform  = '';
        card.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1), box-shadow .4s';
        card.style.boxShadow  = '';
        setTimeout(function () { card.style.transition = ''; }, 500);
      });
    });
  }

  // ── Magnetic buttons ───────────────────────────────────────
  function initMagneticButtons() {
    var btns = document.querySelectorAll('.btn--primary, .btn--inverted, .btn--green');
    if (!btns.length) return;

    var isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    btns.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect  = btn.getBoundingClientRect();
        var cx    = rect.left + rect.width  / 2;
        var cy    = rect.top  + rect.height / 2;
        var dx    = (e.clientX - cx) / (rect.width  / 2);
        var dy    = (e.clientY - cy) / (rect.height / 2);
        btn.style.transform  = 'translate(' + (dx * 6) + 'px, ' + (dy * 6) + 'px)';
        btn.style.transition = 'transform .2s cubic-bezier(.34,1.56,.64,1)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform  = '';
        btn.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1)';
      });
    });
  }

  // ── Benefit card sibling dim on hover ─────────────────────
  function initBenefitHover() {
    var grid = document.querySelector('.benefits__grid');
    if (!grid) return;

    var cards = grid.querySelectorAll('.benefit-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        cards.forEach(function (c) {
          if (c !== card) c.classList.add('is-dimmed');
        });
      });
      card.addEventListener('mouseleave', function () {
        cards.forEach(function (c) { c.classList.remove('is-dimmed'); });
      });
    });
  }

  // ── Proof stats number roll (if data-count attrs present) ──
  function initStatRoll() {
    var statValues = document.querySelectorAll('.proof__stat-value');
    if (!statValues.length) return;

    var triggered = false;
    function tryTrigger() {
      if (triggered) return;
      statValues.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          triggered = true;
          animateCounters();
        }
      });
    }
    window.addEventListener('scroll', tryTrigger, { passive: true });
    tryTrigger();
  }

  // ── Parallax for hero mesh background ─────────────────────
  function initParallax() {
    var mesh = document.querySelector('.hero__mesh');
    if (!mesh) return;

    var isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) return;

    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      mesh.style.transform = 'translateY(' + (y * 0.18) + 'px)';
    }, { passive: true });
  }

  // ── Init all ──────────────────────────────────────────────
  function init() {
    collectRevealElements();
    checkReveal();

    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('resize', function () {
      collectRevealElements();
      checkReveal();
    }, { passive: true });

    initHeroTilt();
    initCardTilt();
    initMagneticButtons();
    initBenefitHover();
    initStatRoll();
    initTimelineAnimation();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
