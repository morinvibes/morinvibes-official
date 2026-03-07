/* ═══════════════════════════════════════════════════════════
   MORINVIBES® — main.js
   FAQ Accordion · Social Tab · Scroll-Top Click ·
   Sticky CTA · Ripple · Magnetic Hover · Product Tilt ·
   Benefit Tab Filter · AddToCart Pixel
   v1.0 · March 2026
═══════════════════════════════════════════════════════════ */
'use strict';

document.addEventListener('DOMContentLoaded', function() {

  /* ═══════════════════════════════════════
     SCROLL-TO-TOP — CLICK HANDLER
  ═══════════════════════════════════════ */
  var scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ═══════════════════════════════════════
     FAQ ACCORDION
  ═══════════════════════════════════════ */
  var faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq__question');
    var answer   = item.querySelector('.faq__answer');

    if (!question || !answer) return;

    question.addEventListener('click', function() {
      var isOpen = item.classList.contains('is-open');

      /* Close all other items */
      faqItems.forEach(function(other) {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          var otherAnswer = other.querySelector('.faq__answer');
          var otherBtn    = other.querySelector('.faq__question');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
          if (otherBtn)    otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      /* Toggle current */
      if (isOpen) {
        item.classList.remove('is-open');
        answer.style.maxHeight = '0';
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');

        /* Smooth scroll into view after opening */
        setTimeout(function() {
          var rect   = item.getBoundingClientRect();
          var navH   = 80;
          var offset = window.scrollY + rect.top - navH - 16;
          if (rect.top < navH + 20) {
            window.scrollTo({ top: offset, behavior: 'smooth' });
          }
        }, 100);
      }
    });

    /* Allow keyboard activation */
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });


  /* ═══════════════════════════════════════
     LEFT-SIDE SOCIAL TAB
  ═══════════════════════════════════════ */
  var socialTab      = document.getElementById('socialTab');
  var socialToggle   = document.getElementById('socialTabToggle');
  var socialClose    = document.getElementById('socialTabClose');
  var socialPanel    = document.getElementById('socialTabPanel');
  var socialTabWA    = document.getElementById('socialTabWA');

  function openSocialTab() {
    if (!socialTab) return;
    socialTab.classList.add('is-open');
    if (socialPanel) socialPanel.setAttribute('aria-hidden', 'false');
    /* Trap focus to close button */
    if (socialClose) {
      setTimeout(function() { socialClose.focus(); }, 360);
    }
  }

  function closeSocialTab() {
    if (!socialTab) return;
    socialTab.classList.remove('is-open');
    if (socialPanel) socialPanel.setAttribute('aria-hidden', 'true');
    if (socialToggle) socialToggle.focus();
  }

  if (socialToggle) socialToggle.addEventListener('click', openSocialTab);
  if (socialClose)  socialClose.addEventListener('click', closeSocialTab);

  /* Escape key closes tab */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && socialTab && socialTab.classList.contains('is-open')) {
      closeSocialTab();
    }
  });

  /* Pixel events on social link clicks */
  var socialLinks = document.querySelectorAll('.social-tab__link');
  socialLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      var platform = this.dataset.platform || 'Unknown';
      window.fbTrack('Lead', { content_name: 'Social Tab ' + platform });
    });
  });

  if (socialTabWA) {
    socialTabWA.addEventListener('click', function() {
      window.fbTrack('Lead', { content_name: 'Social Tab WhatsApp' });
    });
  }


  /* ═══════════════════════════════════════
     WHATSAPP BUTTON — PIXEL
  ═══════════════════════════════════════ */
  var waBtn = document.getElementById('waBtn');
  if (waBtn) {
    waBtn.addEventListener('click', function() {
      window.fbTrack('Lead', { content_name: 'WhatsApp CTA' });
    });
  }


  /* ═══════════════════════════════════════
     BENEFIT TAB FILTER (mobile)
  ═══════════════════════════════════════ */
  var benefitTabs  = document.querySelectorAll('.benefits__tab');
  var benefitCards = document.querySelectorAll('.benefit-card');

  if (benefitTabs.length > 0) {
    benefitTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var filter = this.dataset.filter;

        /* Update active tab */
        benefitTabs.forEach(function(t) { t.classList.remove('is-active'); });
        this.classList.add('is-active');

        /* Show/hide cards */
        benefitCards.forEach(function(card) {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }


  /* ═══════════════════════════════════════
     RIPPLE EFFECT
     On .btn--primary, .btn--green, .btn--outline
  ═══════════════════════════════════════ */
  var rippleButtons = document.querySelectorAll('.btn--primary, .btn--green, .btn--outline');

  rippleButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      /* Remove existing ripples */
      var oldRipple = btn.querySelector('.ripple');
      if (oldRipple) oldRipple.remove();

      var rect   = btn.getBoundingClientRect();
      var size   = Math.max(rect.width, rect.height);
      var x      = e.clientX - rect.left - size / 2;
      var y      = e.clientY - rect.top  - size / 2;

      var ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.width  = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left   = x + 'px';
      ripple.style.top    = y + 'px';
      btn.appendChild(ripple);

      ripple.addEventListener('animationend', function() {
        ripple.remove();
      });
    });
  });


  /* ═══════════════════════════════════════
     MAGNETIC HOVER EFFECT
     On .btn--primary, .btn--green, .btn--outline
  ═══════════════════════════════════════ */
  var magneticBtns = document.querySelectorAll('.btn--primary, .btn--green, .btn--outline');
  var MAX_TILT = 6; /* px */

  magneticBtns.forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      var rect    = btn.getBoundingClientRect();
      var centerX = rect.left + rect.width  / 2;
      var centerY = rect.top  + rect.height / 2;
      var dx = ((e.clientX - centerX) / rect.width)  * MAX_TILT;
      var dy = ((e.clientY - centerY) / rect.height) * MAX_TILT;
      btn.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
    });

    btn.addEventListener('mouseleave', function() {
      btn.style.transform = '';
    });
  });


  /* ═══════════════════════════════════════
     PRODUCT CARD 3D TILT
  ═══════════════════════════════════════ */
  var prodCard = document.getElementById('prodCard');

  if (prodCard) {
    prodCard.addEventListener('mousemove', function(e) {
      var rect    = prodCard.getBoundingClientRect();
      var centerX = rect.left + rect.width  / 2;
      var centerY = rect.top  + rect.height / 2;
      var rotX = ((e.clientY - centerY) / rect.height) * -14;
      var rotY = ((e.clientX - centerX) / rect.width)  *  14;
      prodCard.style.transform =
        'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.02)';
    });

    prodCard.addEventListener('mouseleave', function() {
      prodCard.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  }


  /* ═══════════════════════════════════════
     META PIXEL — ADD TO CART
     Fire before navigating to checkout
  ═══════════════════════════════════════ */
  var checkoutLinks = document.querySelectorAll('a[href*="checkout.html"]');
  checkoutLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      window.fbTrack('AddToCart', {
        value: 89,
        currency: 'MYR',
        content_name: 'MorinVibes Moringa Leaf 500mg Capsule'
      });
    });
  });


  /* ═══════════════════════════════════════
     META PIXEL — VIEW CONTENT
     Fire when #the-product enters viewport
  ═══════════════════════════════════════ */
  var productSection = document.getElementById('the-product');
  if (productSection && 'IntersectionObserver' in window) {
    var vcFired = false;
    var vcObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !vcFired) {
          vcFired = true;
          window.fbTrack('ViewContent', {
            content_name: 'MorinVibes Moringa Leaf 500mg Capsule',
            content_type: 'product',
            value: 89,
            currency: 'MYR'
          });
          vcObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    vcObserver.observe(productSection);
  }


  /* ═══════════════════════════════════════
     SMOOTH SCROLL FOR IN-PAGE ANCHOR HREFS
     (e.g. "See What's Inside ↓" → #the-product)
  ═══════════════════════════════════════ */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var navH   = parseInt(getComputedStyle(document.documentElement)
                              .getPropertyValue('--nav-h'), 10) || 72;
        var offset = target.getBoundingClientRect().top + window.scrollY - navH - 8;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });


  /* ═══════════════════════════════════════
     WHERE TO BUY — PLATFORM CARD HOVER
     Gently dims sibling cards on hover
  ═══════════════════════════════════════ */
  var platformCards = document.querySelectorAll('.platform-card');
  platformCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      platformCards.forEach(function(other) {
        if (other !== card) {
          other.style.opacity = '.72';
          other.style.transition = 'opacity .22s ease';
        }
      });
    });
    card.addEventListener('mouseleave', function() {
      platformCards.forEach(function(other) {
        other.style.opacity = '';
      });
    });
  });

}); /* end DOMContentLoaded */
