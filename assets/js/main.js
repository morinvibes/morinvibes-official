'use strict';

/* ============================================================
   MORINVIBES® — main.js
   FAQ accordion · Social tab · Scroll-to-top · Sticky CTA
   Ripple · Benefit tab filter · Pixel events · Smooth scroll
   ============================================================ */

(function () {

  // ── FAQ accordion ─────────────────────────────────────────
  function initFAQ() {
    var items = document.querySelectorAll('.faq__item');
    if (!items.length) return;

    items.forEach(function (item) {
      var btn    = item.querySelector('.faq__question');
      var answer = item.querySelector('.faq__answer');
      if (!btn || !answer) return;

      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        // Close all
        items.forEach(function (i) {
          i.classList.remove('is-open');
          var q = i.querySelector('.faq__question');
          var a = i.querySelector('.faq__answer');
          if (q) q.setAttribute('aria-expanded', 'false');
          if (a) a.style.maxHeight = '0px';
        });

        // Open clicked (unless it was already open)
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  // ── Social tab ────────────────────────────────────────────
  function initSocialTab() {
    var tab     = document.getElementById('socialTab');
    var trigger = document.getElementById('socialTabTrigger');
    var close   = document.getElementById('socialTabClose');
    var panel   = document.getElementById('socialTabPanel');

    if (!tab) return;

    function openTab() {
      tab.classList.add('is-open');
      if (panel)   panel.setAttribute('aria-hidden', 'false');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
      setTimeout(function () { if (close) close.focus(); }, 380);
    }

    function closeTab() {
      tab.classList.remove('is-open');
      if (panel)   panel.setAttribute('aria-hidden', 'true');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    }

    if (trigger) trigger.addEventListener('click', openTab);
    if (close)   close.addEventListener('click', closeTab);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && tab.classList.contains('is-open')) closeTab();
    });

    // Click outside to close
    document.addEventListener('click', function (e) {
      if (tab.classList.contains('is-open') && !tab.contains(e.target)) {
        closeTab();
      }
    });

    // Pixel events — social links
    var links = document.querySelectorAll('.social-tab__link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        var platform = this.getAttribute('data-platform') || '';
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('Lead', { content_name: 'Social Tab ' + platform });
        }
      });
    });

    // WhatsApp from social panel
    var waBtn = document.getElementById('socialTabWA');
    if (waBtn) {
      waBtn.addEventListener('click', function () {
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('Lead', { content_name: 'Social Tab WhatsApp' });
        }
      });
    }
  }

  // ── Scroll-to-top button ──────────────────────────────────
  function initScrollTop() {
    var btn = document.getElementById('scrollTop');
    if (!btn) return;

    function updateVisibility() {
      if (window.scrollY > 400) {
        btn.classList.add('is-visible');
        btn.setAttribute('aria-hidden', 'false');
      } else {
        btn.classList.remove('is-visible');
        btn.setAttribute('aria-hidden', 'true');
      }
    }

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Mobile sticky CTA ─────────────────────────────────────
  function initStickyCta() {
    var bar = document.getElementById('stickyCta');
    if (!bar) return;

    // Show after hero exits viewport
    var hero = document.getElementById('hero');

    function updateCta() {
      var threshold = hero
        ? hero.offsetTop + hero.offsetHeight
        : 400;

      if (window.scrollY > threshold - 100) {
        bar.classList.add('is-visible');
        bar.setAttribute('aria-hidden', 'false');
      } else {
        bar.classList.remove('is-visible');
        bar.setAttribute('aria-hidden', 'true');
      }
    }

    window.addEventListener('scroll', updateCta, { passive: true });
    updateCta();
  }

  // ── Ripple effect on buttons ──────────────────────────────
  function initRipple() {
    var btns = document.querySelectorAll('.btn');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var rect   = btn.getBoundingClientRect();
        var size   = Math.max(rect.width, rect.height) * 2;
        var x      = e.clientX - rect.left - size / 2;
        var y      = e.clientY - rect.top  - size / 2;
        var ripple = document.createElement('span');
        ripple.className     = 'ripple';
        ripple.style.cssText = [
          'width:'  + size + 'px',
          'height:' + size + 'px',
          'left:'   + x    + 'px',
          'top:'    + y    + 'px'
        ].join(';');
        btn.appendChild(ripple);
        setTimeout(function () {
          if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 600);
      });
    });
  }

  // ── Benefit tab filter ────────────────────────────────────
  function initBenefitTabs() {
    var tabs  = document.querySelectorAll('.benefits__tab');
    var cards = document.querySelectorAll('.benefit-card');
    if (!tabs.length || !cards.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        // Update active tab
        tabs.forEach(function (t) {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        var filter = tab.getAttribute('data-filter');

        cards.forEach(function (card) {
          var cat = card.getAttribute('data-category') || '';
          if (filter === 'all' || cat === filter) {
            card.classList.remove('is-hidden');
            // Re-trigger reveal
            setTimeout(function () { card.classList.add('visible'); }, 10);
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // ── Smooth scroll for in-page anchor buttons ──────────────
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('.js-smooth-scroll');
    anchors.forEach(function (el) {
      el.addEventListener('click', function (e) {
        var targetId = el.getAttribute('data-target');
        if (!targetId) return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        var navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        var top    = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  // ── WhatsApp float — pixel event ─────────────────────────
  function initWaFloat() {
    var wa = document.getElementById('waBtn');
    if (!wa) return;
    wa.addEventListener('click', function () {
      if (typeof window.fbTrack === 'function') {
        window.fbTrack('Lead', { content_name: 'WhatsApp CTA' });
      }
    });
  }

  // ── Pixel: ViewContent on #the-product entering viewport ──
  function initProductPixel() {
    var productSection = document.getElementById('the-product');
    if (!productSection) return;

    var fired = false;
    function checkProduct() {
      if (fired) return;
      var rect = productSection.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        fired = true;
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('ViewContent', {
            content_name: 'MorinVibes Moringa Leaf 500mg Capsule',
            content_category: 'Supplement',
            currency: 'MYR',
            value: 89
          });
        }
      }
    }
    window.addEventListener('scroll', checkProduct, { passive: true });
    checkProduct();
  }

  // ── Pixel: AddToCart on any checkout.html link click ─────
  function initCheckoutPixel() {
    var checkoutLinks = document.querySelectorAll('a[href*="checkout.html"]');
    checkoutLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('AddToCart', {
            content_name: 'MorinVibes Moringa Leaf 500mg Capsule',
            currency: 'MYR',
            value: 89
          });
        }
      });
    });
  }

  // ── Pixel: InitiateCheckout (checkout.html only) ──────────
  function initCheckoutPagePixel() {
    if (window.location.pathname.indexOf('checkout.html') !== -1) {
      if (typeof window.fbTrack === 'function') {
        window.fbTrack('InitiateCheckout', {});
      }
    }
  }

  // ── Pixel: Purchase (thankyou.html only) ─────────────────
  function initPurchasePixel() {
    if (window.location.pathname.indexOf('thankyou.html') !== -1) {
      if (typeof window.fbTrack === 'function') {
        window.fbTrack('Purchase', {
          currency: 'MYR',
          value: 89
        });
      }
    }
  }

  // ── Init all ──────────────────────────────────────────────
  function init() {
    initFAQ();
    initSocialTab();
    initScrollTop();
    initStickyCta();
    initRipple();
    initBenefitTabs();
    initSmoothScroll();
    initWaFloat();
    initProductPixel();
    initCheckoutPixel();
    initCheckoutPagePixel();
    initPurchasePixel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
