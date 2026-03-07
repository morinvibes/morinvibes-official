// ==========================================================================
// main.js — MorinVibes® v22.0
// All interactions: menu, FAQ, social popup, scroll-top click, ripple,
// magnetic buttons, 3D tilt, mobile tabs, ESC key, pixel events for popup,
// and more. Must be loaded after components.js and animations.js.
// ==========================================================================
'use strict';

(function() {
  // Ensure DOM is fully loaded (including injected components)
  document.addEventListener('DOMContentLoaded', function() {

    // --------------------------------------------------------------------
    // 1. SCROLL-TO-TOP CLICK HANDLER
    // --------------------------------------------------------------------
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // --------------------------------------------------------------------
    // 2. MOBILE MENU TOGGLE
    // --------------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const body = document.body;

    function openMenu() {
      if (mobileMenu) mobileMenu.classList.add('open');
      if (menuOverlay) menuOverlay.classList.add('active');
      body.classList.add('menu-open');
    }

    function closeMenu() {
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (menuOverlay) menuOverlay.classList.remove('active');
      body.classList.remove('menu-open');
    }

    if (menuToggle) {
      menuToggle.addEventListener('click', openMenu);
    }
    if (menuClose) {
      menuClose.addEventListener('click', closeMenu);
    }
    if (menuOverlay) {
      menuOverlay.addEventListener('click', closeMenu);
    }

    // --------------------------------------------------------------------
    // 3. FAQ ACCORDION (maxHeight expand/collapse, ARIA states)
    // --------------------------------------------------------------------
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
      const question = item.querySelector('.accordion-question');
      const answer = item.querySelector('.accordion-answer');
      if (!question || !answer) return;

      // Initially closed
      item.removeAttribute('open');
      answer.style.maxHeight = '0';

      question.addEventListener('click', () => {
        const isOpen = item.hasAttribute('open');
        // Close all others? We'll keep simple: just toggle current
        if (isOpen) {
          item.removeAttribute('open');
          answer.style.maxHeight = '0';
        } else {
          item.setAttribute('open', '');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
        // ARIA
        question.setAttribute('aria-expanded', !isOpen);
      });

      // Set initial ARIA
      question.setAttribute('aria-expanded', 'false');
    });

    // --------------------------------------------------------------------
    // 4. BENEFITS TAB SWITCHER (mobile)
    // --------------------------------------------------------------------
    const benefitsTabs = document.querySelectorAll('.benefits-tab');
    const benefitsCards = document.querySelectorAll('.benefit-card');
    if (benefitsTabs.length && benefitsCards.length) {
      // Initially show all (active tab "All")
      benefitsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const filter = tab.getAttribute('data-filter');
          // Update active tab
          benefitsTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          // Filter cards (simple hide/show)
          benefitsCards.forEach(card => {
            const categories = card.getAttribute('data-categories')?.split(' ') || [];
            if (filter === 'all' || categories.includes(filter)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // --------------------------------------------------------------------
    // 5. SOCIAL FOLLOW POPUP (exit-intent + 45s fallback, localStorage)
    // --------------------------------------------------------------------
    const popupOverlay = document.getElementById('socialPopupOverlay');
    const popupLater = document.getElementById('popupLater');
    const popupClose = document.querySelector('.popup-close');
    const socialLinks = document.querySelectorAll('.social-link, .btn--green[data-popup-channel]');

    if (popupOverlay) {
      const STORAGE_KEY = 'mv_social_v1';
      let popupShown = false;

      function showPopup() {
        if (popupShown) return;
        // Check localStorage
        try {
          if (localStorage.getItem(STORAGE_KEY) === 'seen') return;
        } catch (e) {}

        popupOverlay.classList.add('active');
        popupOverlay.removeAttribute('hidden');
        popupShown = true;

        // Mark as seen after showing (but we want to mark only after close or click)
        // Actually, we mark after any social click OR if user clicks "maybe later".
        // We'll handle in close.
      }

      function hidePopup() {
        popupOverlay.classList.remove('active');
        popupOverlay.setAttribute('hidden', '');
      }

      // Exit intent
      document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !popupShown) {
          showPopup();
        }
      });

      // Fallback timer (45 seconds)
      setTimeout(() => {
        if (!popupShown) showPopup();
      }, 45000);

      // "Maybe later" click
      if (popupLater) {
        popupLater.addEventListener('click', () => {
          try { localStorage.setItem(STORAGE_KEY, 'seen'); } catch (e) {}
          hidePopup();
        });
      }

      // Close button
      if (popupClose) {
        popupClose.addEventListener('click', () => {
          try { localStorage.setItem(STORAGE_KEY, 'seen'); } catch (e) {}
          hidePopup();
        });
      }

      // Social link clicks: fire pixel, then set localStorage and close after delay
      socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          const channel = this.getAttribute('data-popup-channel') || 
                          (this.classList.contains('btn--green') ? 'WhatsApp' : 'Social');
          // Pixel event
          if (typeof window.fbTrack === 'function') {
            window.fbTrack('Lead', { content_name: `Social Popup ${channel}` });
          }

          // Mark as seen, close after 800ms
          try { localStorage.setItem(STORAGE_KEY, 'seen'); } catch (e) {}
          setTimeout(hidePopup, 800);
        });
      });

      // ESC key closes popup
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
          hidePopup();
        }
      });
    }

    // --------------------------------------------------------------------
    // 6. RIPPLE EFFECT ON .btn--primary, .btn--green, .btn--outline
    // --------------------------------------------------------------------
    const rippleButtons = document.querySelectorAll('.btn--primary, .btn--green, .btn--outline');
    rippleButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size/2 + 'px';
        ripple.style.top = e.clientY - rect.top - size/2 + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
      });
    });

    // --------------------------------------------------------------------
    // 7. MAGNETIC BUTTON EFFECT (.btn--primary, .btn--green)
    // --------------------------------------------------------------------
    const magneticBtns = document.querySelectorAll('.btn--primary, .btn--green');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', function(e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        const maxDist = 6;
        const dist = Math.sqrt(x*x + y*y);
        if (dist < rect.width/2) {
          const moveX = (x / (rect.width/2)) * maxDist;
          const moveY = (y / (rect.height/2)) * maxDist;
          btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          btn.style.transform = '';
        }
      });
      btn.addEventListener('mouseleave', function() {
        btn.style.transform = '';
      });
    });

    // --------------------------------------------------------------------
    // 8. 3D TILT ON #prodCard (desktop hover)
    // --------------------------------------------------------------------
    const prodCard = document.getElementById('prodCard');
    if (prodCard && window.innerWidth > 768) {
      prodCard.addEventListener('mousemove', function(e) {
        const rect = prodCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 8; // max ±8deg
        const rotateX = ((centerY - y) / centerY) * 8;
        prodCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      prodCard.addEventListener('mouseleave', function() {
        prodCard.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
      });
    }

    // --------------------------------------------------------------------
    // 9. MOBILE STICKY CTA BAR SHOW/HIDE (already in animations.js, but we can add an extra guard)
    //    Not needed here – handled in animations.js.
    // --------------------------------------------------------------------

    // --------------------------------------------------------------------
    // 10. PIXEL EVENTS: WhatsApp clicks, Order Now (AddToCart already in animations.js)
    //     WhatsApp clicks
    // --------------------------------------------------------------------
    const waBtn = document.getElementById('waBtn');
    if (waBtn && typeof window.fbTrack === 'function') {
      waBtn.addEventListener('click', function() {
        window.fbTrack('Lead', { content_name: 'WhatsApp CTA' });
      });
    }

    // Also track WhatsApp from mobile menu right panel
    const waSmall = document.querySelector('.wa-small');
    if (waSmall && typeof window.fbTrack === 'function') {
      waSmall.addEventListener('click', function() {
        window.fbTrack('Lead', { content_name: 'WhatsApp Mobile Menu' });
      });
    }

    // --------------------------------------------------------------------
    // 11. HORIZONTAL SCROLL HINT (mobile review carousel) – simple pulse on .scroll-hint
    // --------------------------------------------------------------------
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
      // Could add a pulse animation, but we'll rely on CSS keyframes.
      // If not present, we can add a class.
    }

    // --------------------------------------------------------------------
    // 12. IMAGE LAZY PRELOAD (above the fold) – optional, but we can add a simple preload
    //     For now, rely on browser lazy loading.
    // --------------------------------------------------------------------

    // --------------------------------------------------------------------
    // 13. ESC KEY CLOSE OVERLAYS (already handled for popup, but also for menu if open)
    // --------------------------------------------------------------------
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          closeMenu();
        }
        // popup already handled
      }
    });

    // --------------------------------------------------------------------
    // 14. NO CHECKOUT MODAL (ensuring no remnants)
    // --------------------------------------------------------------------
    // Just a safety check: remove any leftover modal elements if they exist
    const oldModal = document.querySelector('.co-overlay');
    if (oldModal) oldModal.remove();

    // --------------------------------------------------------------------
    // 15. Ensure all "Order Now" links are plain <a> (already are)
    // --------------------------------------------------------------------

  }); // DOMContentLoaded
})();
