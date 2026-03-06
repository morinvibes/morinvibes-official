/* ===== MORINVIBES® — MAIN.JS ===== */
/* Version: 17.0 · March 2026 · Mobile-First */
/* Path: /morinvibes-official/assets/js/main.js */

(function() {
  'use strict';

  /* ------------------------------------ */
  /* CHECKOUT MODAL — Embedded Orderla   */
  /* ------------------------------------ */

  const coOverlay = document.getElementById('coOverlay');
  const coIframe = document.getElementById('coIframe');
  const coSpinner = document.getElementById('coSpinner');
  const coClose = document.getElementById('coClose');
  const coFallback = document.getElementById('coFallback');
  let iframeLoaded = false;

  function openCheckout() {
    if (!coOverlay) return;
    
    coOverlay.classList.add('open');
    document.body.classList.add('checkout-open');
    
    // Lazy load iframe on first open only
    if (!iframeLoaded && coIframe) {
      iframeLoaded = true;
      coIframe.src = coIframe.dataset.src;
      
      coIframe.addEventListener('load', function() {
        if (coSpinner) coSpinner.style.display = 'none';
        coIframe.classList.add('ready');
        if (coFallback) coFallback.classList.remove('show');
      }, { once: true });
      
      // 6-second fallback
      setTimeout(function() {
        if (!coIframe.classList.contains('ready')) {
          if (coSpinner) coSpinner.style.display = 'none';
          if (coFallback) coFallback.classList.add('show');
        }
      }, 6000);
    }
    
    // Track pixel events
    if (typeof window.fbTrack === 'function') {
      window.fbTrack('InitiateCheckout');
    }
  }

  function closeCheckout() {
    if (!coOverlay) return;
    coOverlay.classList.remove('open');
    document.body.classList.remove('checkout-open');
  }

  // Bind all 7 order buttons
  const orderButtonIds = [
    'navOrderBtn',
    'heroBuyBtn',
    'prodBuyBtn',
    'prodBuyBtn2',
    'ctaBuyBtn',
    'concernsBtn',
    'mOrderBtn'
  ];

  orderButtonIds.forEach(function(id) {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', openCheckout);
    }
  });

  // Close modal events
  if (coClose) {
    coClose.addEventListener('click', closeCheckout);
  }

  if (coOverlay) {
    coOverlay.addEventListener('click', function(e) {
      if (e.target === coOverlay) closeCheckout();
    });
  }

  /* ------------------------------------ */
  /* MOBILE MENU                         */
  /* ------------------------------------ */

  const mobileMenu = document.getElementById('mobileMenu');
  const navHam = document.getElementById('navHam');
  const mClose = document.getElementById('mClose');

  function openMenu() {
    if (!mobileMenu || !navHam) return;
    mobileMenu.classList.add('open');
    document.body.classList.add('menu-open');
    navHam.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!mobileMenu || !navHam) return;
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    navHam.setAttribute('aria-expanded', 'false');
  }

  if (navHam) {
    navHam.addEventListener('click', openMenu);
  }

  if (mClose) {
    mClose.addEventListener('click', closeMenu);
  }

  // Close menu when clicking on a link (for single-page navigation)
  const menuLinks = document.querySelectorAll('.m-link');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  /* ------------------------------------ */
  /* ESC KEY — Close modal and menu      */
  /* ------------------------------------ */

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeCheckout();
      closeMenu();
    }
  });

  /* ------------------------------------ */
  /* SCROLL EFFECTS                      */
  /* ------------------------------------ */

  const progressBar = document.getElementById('progressBar');
  const nav = document.getElementById('mainNav');
  const scrollTop = document.getElementById('scrollTop');
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Progress bar
        if (progressBar) {
          const progress = docHeight > 0 ? (scrollY / docHeight * 100) : 0;
          progressBar.style.width = progress + '%';
        }
        
        // Nav shrink
        if (nav) {
          nav.classList.toggle('scrolled', scrollY > 40);
        }
        
        // Scroll to top button visibility
        if (scrollTop) {
          scrollTop.classList.toggle('visible', scrollY > 300);
        }
        
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Scroll to top
  if (scrollTop) {
    scrollTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------ */
  /* LANGUAGE DROPDOWN                   */
  /* ------------------------------------ */

  const langDrop = document.getElementById('langDrop');
  const langBtn = document.getElementById('langBtn');

  if (langBtn && langDrop) {
    langBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = langDrop.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      langDrop.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    });

    // Prevent closing when clicking inside dropdown
    langDrop.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  /* ------------------------------------ */
  /* FAQ ACCORDION                       */
  /* ------------------------------------ */

  const faqQuestions = document.querySelectorAll('.faq-q');

  faqQuestions.forEach(function(question) {
    function toggleFaq() {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-ans');
      const icon = question.querySelector('.faq-icon');
      const wasOpen = item.classList.contains('open');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          const openAnswer = openItem.querySelector('.faq-ans');
          if (openAnswer) openAnswer.style.maxHeight = null;
        }
      });
      
      // Toggle current FAQ
      if (!wasOpen) {
        item.classList.add('open');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
        question.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('open');
        if (answer) answer.style.maxHeight = null;
        question.setAttribute('aria-expanded', 'false');
      }
    }

    question.addEventListener('click', toggleFaq);
    
    // Keyboard support (Enter or Space)
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq();
      }
    });
  });

  /* ------------------------------------ */
  /* RIPPLE EFFECT ON BUTTONS            */
  /* ------------------------------------ */

  const rippleButtons = document.querySelectorAll('.btn--primary, .btn--outline');

  rippleButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (x - 5) + 'px';
      ripple.style.top = (y - 5) + 'px';
      
      btn.appendChild(ripple);
      
      setTimeout(function() {
        ripple.remove();
      }, 600);
    });
  });

  /* ------------------------------------ */
  /* COMMUNITY POPUP — Once ever         */
  /* ------------------------------------ */

  const popup = document.getElementById('communityPopup');
  const POPUP_KEY = 'mv_popup_v1';
  let popupShown = false;

  // Check if popup has been shown before
  try {
    popupShown = !!localStorage.getItem(POPUP_KEY);
  } catch (e) {
    console.warn('localStorage not available');
  }

  function showPopup() {
    if (popup && !popupShown) {
      popup.classList.add('show');
      popupShown = true;
      try {
        localStorage.setItem(POPUP_KEY, '1');
      } catch (e) {}
    }
  }

  function closePopup() {
    if (popup) {
      popup.classList.remove('show');
    }
  }

  if (!popupShown && popup) {
    // Exit intent (mouse leaves top of viewport)
    document.addEventListener('mouseleave', function(e) {
      if (e.clientY < 10) {
        showPopup();
      }
    }, { once: true });
    
    // Time fallback — 45 seconds (increased from 30 for better UX)
    setTimeout(showPopup, 45000);
  }

  // Close handlers
  const popClose = document.getElementById('popClose');
  const popDismiss = document.getElementById('popDismiss');

  if (popClose) {
    popClose.addEventListener('click', closePopup);
  }

  if (popDismiss) {
    popDismiss.addEventListener('click', closePopup);
    popDismiss.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') closePopup();
    });
  }

  /* ------------------------------------ */
  /* PIXEL TRACKING FOR EXTERNAL LINKS   */
  /* ------------------------------------ */

  // WhatsApp button in CTA block
  const waBtn = document.getElementById('waBtn');
  if (waBtn) {
    waBtn.addEventListener('click', function() {
      if (typeof window.fbTrack === 'function') {
        window.fbTrack('Lead', { content_name: 'WhatsApp CTA' });
      }
    });
  }

  // WhatsApp in popup
  const popWa = document.getElementById('popWa');
  if (popWa) {
    popWa.addEventListener('click', function() {
      if (typeof window.fbTrack === 'function') {
        window.fbTrack('Lead', { content_name: 'WhatsApp Popup' });
      }
    });
  }

  // Shopee links
  const shopeeLinks = document.querySelectorAll('[href*="shopee.com.my"]');
  shopeeLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (typeof window.fbTrack === 'function') {
        window.fbTrack('CustomEvent', { name: 'ShopeeClick' });
      }
    });
  });

  // Lazada links
  const lazadaLinks = document.querySelectorAll('[href*="lazada.com.my"]');
  lazadaLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (typeof window.fbTrack === 'function') {
        window.fbTrack('CustomEvent', { name: 'LazadaClick' });
      }
    });
  });

  /* ------------------------------------ */
  /* TOUCH OPTIMIZATIONS                 */
  /* ------------------------------------ */

  // Prevent double-tap zoom on buttons (optional)
  if ('ontouchstart' in window) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(btn) {
      btn.addEventListener('touchstart', function(e) {
        // Prevent default only if needed
        // This helps with responsive touch feedback
      }, { passive: true });
    });
  }

  /* ------------------------------------ */
  /* INITIALIZATION ON PAGE LOAD         */
  /* ------------------------------------ */

  document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.m-link');
    
    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href && currentPath.includes(href) && href !== '/morinvibes-official/en/') {
        link.classList.add('active');
      } else if (href === '/morinvibes-official/en/' && 
                 (currentPath === '/morinvibes-official/en/' || 
                  currentPath === '/morinvibes-official/en/index.html')) {
        link.classList.add('active');
      }
    });
    
    // Log that main.js is loaded (for debugging)
    console.log('MorinVibes® main.js v17 loaded');
  });

})();
