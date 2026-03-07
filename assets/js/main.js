'use strict';

/* ═══════════════════════════════════════════════════════════════
   MORINVIBES® — main.js
   Checkout modal · Mobile menu · FAQ accordion
   Community popup · Scroll progress · ESC key
   Ripple effect · 3D tilt · WhatsApp pixel
   NOTE: No scroll-to-top logic — omitted per spec
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  /* ════════════════════════════════════════
     CHECKOUT MODAL
  ════════════════════════════════════════ */
  var ORDERLA_URL = '[ORDERLA_IFRAME_URL]'; // ← Replace with Orderla embed URL
  var coOverlay   = null;
  var coIframe    = null;
  var coSpinner   = null;
  var iframeLoaded = false;

  /**
   * Open the checkout modal.
   * Lazy-loads the Orderla iframe on first open only.
   */
  window.openCheckout = function() {
    coOverlay = coOverlay || document.getElementById('coOverlay');
    coIframe  = coIframe  || document.getElementById('coIframe');
    coSpinner = coSpinner || document.getElementById('coSpinner');

    if (!coOverlay) return;

    // Show overlay
    coOverlay.classList.add('open');
    coOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');

    // Lazy-load iframe on first open
    if (!iframeLoaded && coIframe && ORDERLA_URL !== '[ORDERLA_IFRAME_URL]') {
      if (coSpinner) coSpinner.classList.remove('hidden');
      coIframe.src = ORDERLA_URL;
      coIframe.addEventListener('load', function() {
        iframeLoaded = true;
        if (coSpinner) coSpinner.classList.add('hidden');
        coIframe.classList.add('loaded');
      }, { once: true });
    } else if (iframeLoaded && coIframe) {
      if (coSpinner) coSpinner.classList.add('hidden');
      coIframe.classList.add('loaded');
    }

    // Pixel event
    if (typeof fbTrack === 'function') {
      fbTrack('InitiateCheckout', {
        content_name: 'MorinVibes Moringa Capsules',
        value: 89,
        currency: 'MYR'
      });
    }

    // Focus trap — focus the close button
    var closeBtn = document.getElementById('coClose');
    if (closeBtn) {
      setTimeout(function() { closeBtn.focus(); }, 50);
    }
  };

  /**
   * Close the checkout modal.
   */
  window.closeCheckout = function() {
    coOverlay = coOverlay || document.getElementById('coOverlay');
    if (!coOverlay) return;

    coOverlay.classList.remove('open');
    coOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  // Click outside modal to close
  var overlay = document.getElementById('coOverlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        window.closeCheckout();
      }
    });
  }

  /* ════════════════════════════════════════
     MOBILE MENU
  ════════════════════════════════════════ */
  var mMenu      = null;
  var hamburger  = null;
  var menuClose  = null;

  /**
   * Open mobile menu.
   */
  window.openMenu = function() {
    mMenu     = mMenu     || document.getElementById('mobileMenu');
    hamburger = hamburger || document.getElementById('navHamburger');

    if (!mMenu) return;

    mMenu.classList.add('open');
    mMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');

    // Focus first link
    var firstLink = mMenu.querySelector('.m-menu__link');
    if (firstLink) setTimeout(function() { firstLink.focus(); }, 100);
  };

  /**
   * Close mobile menu.
   */
  window.closeMenu = function() {
    mMenu     = mMenu     || document.getElementById('mobileMenu');
    hamburger = hamburger || document.getElementById('navHamburger');

    if (!mMenu) return;

    mMenu.classList.remove('open');
    mMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  };

  // Hamburger click — bind after components.js has injected the nav
  function bindMenuEvents() {
    hamburger = document.getElementById('navHamburger');
    menuClose = document.getElementById('menuClose');

    if (hamburger) {
      hamburger.addEventListener('click', window.openMenu);
    }
    if (menuClose) {
      menuClose.addEventListener('click', window.closeMenu);
    }
  }

  // Retry binding after a short delay to allow components.js injection
  setTimeout(bindMenuEvents, 0);

  /* ════════════════════════════════════════
     FAQ ACCORDION
  ════════════════════════════════════════ */
  function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item__q');
    faqItems.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var targetId = btn.getAttribute('aria-controls');
        var answer   = targetId ? document.getElementById(targetId) : null;

        // Collapse all other open items
        faqItems.forEach(function(otherBtn) {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            var otherId = otherBtn.getAttribute('aria-controls');
            var otherEl = otherId ? document.getElementById(otherId) : null;
            if (otherEl) otherEl.style.maxHeight = null;
          }
        });

        // Toggle current
        if (expanded) {
          btn.setAttribute('aria-expanded', 'false');
          if (answer) answer.style.maxHeight = null;
        } else {
          btn.setAttribute('aria-expanded', 'true');
          if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  initFAQ();

  /* ════════════════════════════════════════
     COMMUNITY POPUP
     exit-intent + 45s fallback
     localStorage key: mv_popup_v1
  ════════════════════════════════════════ */
  var POPUP_KEY = 'mv_popup_v1';
  var popupShown = false;

  function getPopupSeen() {
    try {
      return localStorage.getItem(POPUP_KEY) === '1';
    } catch (e) {
      return false; // iOS private mode
    }
  }

  function setPopupSeen() {
    try {
      localStorage.setItem(POPUP_KEY, '1');
    } catch (e) {
      // Silently fail — iOS private mode
    }
  }

  function showPopup() {
    if (popupShown || getPopupSeen()) return;
    popupShown = true;

    var po = document.getElementById('popupOverlay');
    if (!po) return;

    po.classList.add('open');
    po.setAttribute('aria-hidden', 'false');

    // Focus close button
    var closeBtn = document.getElementById('popupClose');
    if (closeBtn) setTimeout(function() { closeBtn.focus(); }, 50);
  }

  function hidePopup() {
    var po = document.getElementById('popupOverlay');
    if (!po) return;

    po.classList.remove('open');
    po.setAttribute('aria-hidden', 'true');
    setPopupSeen();
  }

  // Only run popup logic if not already seen
  if (!getPopupSeen()) {

    // Exit intent — mouse leaves top of viewport
    document.addEventListener('mouseleave', function(e) {
      if (e.clientY <= 0) {
        showPopup();
      }
    });

    // Fallback — 45 seconds after load
    var popupTimer = setTimeout(showPopup, 45000);

    // Bind popup dismiss/close buttons
    function bindPopupEvents() {
      var popupClose   = document.getElementById('popupClose');
      var popupDismiss = document.getElementById('popupDismiss');
      var popupWaBtn   = document.getElementById('popupWaBtn');
      var popupOverlay = document.getElementById('popupOverlay');

      if (popupClose) {
        popupClose.addEventListener('click', function() {
          hidePopup();
          clearTimeout(popupTimer);
        });
      }

      if (popupDismiss) {
        popupDismiss.addEventListener('click', function() {
          hidePopup();
          clearTimeout(popupTimer);
        });
      }

      // WhatsApp click in popup fires Lead pixel event
      if (popupWaBtn) {
        popupWaBtn.addEventListener('click', function() {
          if (typeof fbTrack === 'function') {
            fbTrack('Lead', { content_name: 'Community Popup WhatsApp' });
          }
          hidePopup();
        });
      }

      // Click outside popup to dismiss
      if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
          if (e.target === popupOverlay) {
            hidePopup();
            clearTimeout(popupTimer);
          }
        });
      }
    }

    bindPopupEvents();
  }

  /* ════════════════════════════════════════
     WHATSAPP BUTTON — PIXEL EVENT
  ════════════════════════════════════════ */
  function bindWaButton() {
    var waBtn = document.getElementById('waBtn');
    if (waBtn) {
      waBtn.addEventListener('click', function() {
        if (typeof fbTrack === 'function') {
          fbTrack('Lead', { content_name: 'WhatsApp CTA' });
        }
      });
    }
    // Also bind footer WA links
    var footerWaLinks = document.querySelectorAll('.footer__wa-link');
    footerWaLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (typeof fbTrack === 'function') {
          fbTrack('Lead', { content_name: 'WhatsApp CTA' });
        }
      });
    });
  }

  // Bind after components injected
  setTimeout(bindWaButton, 100);

  /* ════════════════════════════════════════
     ORDER NOW — PIXEL EVENT (AddToCart)
  ════════════════════════════════════════ */
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('button, a');
    if (!btn) return;

    // Any button/link that calls openCheckout()
    var onclick = btn.getAttribute('onclick') || '';
    if (onclick.includes('openCheckout')) {
      if (typeof fbTrack === 'function') {
        fbTrack('AddToCart', {
          content_name: 'MorinVibes Moringa Capsules',
          value: 89,
          currency: 'MYR'
        });
      }
    }
  });

  /* ════════════════════════════════════════
     ESC KEY — close modal / menu
  ════════════════════════════════════════ */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      window.closeCheckout();
      window.closeMenu();

      var po = document.getElementById('popupOverlay');
      if (po && po.classList.contains('open')) {
        hidePopup();
      }
    }
  });

  /* ════════════════════════════════════════
     RIPPLE EFFECT — .btn--primary and .btn--outline
  ════════════════════════════════════════ */
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.btn--primary, .btn--outline');
    if (!btn) return;

    var ripple = document.createElement('span');
    ripple.classList.add('ripple');

    var rect   = btn.getBoundingClientRect();
    var size   = Math.max(rect.width, rect.height);
    var x      = e.clientX - rect.left - size / 2;
    var y      = e.clientY - rect.top  - size / 2;

    ripple.style.cssText = [
      'width:'  + size + 'px',
      'height:' + size + 'px',
      'left:'   + x    + 'px',
      'top:'    + y    + 'px'
    ].join(';');

    btn.appendChild(ripple);

    setTimeout(function() {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 600);
  });

  /* ════════════════════════════════════════
     3D TILT — #prodCard on desktop hover
  ════════════════════════════════════════ */
  var prodCard = document.getElementById('prodCard');

  if (prodCard && window.matchMedia('(hover: hover)').matches) {

    prodCard.addEventListener('mousemove', function(e) {
      var rect   = prodCard.getBoundingClientRect();
      var x      = e.clientX - rect.left;
      var y      = e.clientY - rect.top;
      var cx     = rect.width  / 2;
      var cy     = rect.height / 2;
      var rotX   = ((y - cy) / cy) * -8;  // max ±8deg
      var rotY   = ((x - cx) / cx) *  8;

      prodCard.style.transform =
        'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    });

    prodCard.addEventListener('mouseleave', function() {
      prodCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
  }

  /* ════════════════════════════════════════
     NEWSLETTER FORM (if present on page)
  ════════════════════════════════════════ */
  var newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var emailInput = newsletterForm.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value.trim() : '';

      if (!email || !email.includes('@')) {
        var err = newsletterForm.querySelector('.form-error');
        if (err) err.textContent = 'Please enter a valid email address.';
        return;
      }

      // Pixel Lead event
      if (typeof fbTrack === 'function') {
        fbTrack('Lead', {
          content_name: 'Newsletter Signup',
          content_category: 'Email'
        });
      }

      // Show success state
      newsletterForm.innerHTML = '<p style="color:var(--teal);font-weight:500;">Thank you! You\'re on the list.</p>';
    });
  }

});
