/* ===== MORINVIBES® — MAIN.JS v19.0 ===== */
/* Version: 19.0 · March 2026 · Professional Edition */
/* Path: /morinvibes-official/assets/js/main.js */

(function() {
  'use strict';

  /* ------------------------------------ */
  /* CONFIGURATION                        */
  /* ------------------------------------ */

  const CONFIG = {
    // URLs
    checkoutUrl: '/morinvibes-official/en/checkout.html',
    
    // Popup settings
    popupKey: 'mv_popup_v1',
    popupDelay: 45000, // 45 seconds
    exitIntentThreshold: 10, // pixels from top
    
    // Scroll settings
    scrollThreshold: 300, // show scroll button after 300px
    navShrinkThreshold: 40, // shrink nav after 40px
    
    // Animation settings
    rippleDuration: 600, // ms
    faqAnimationDuration: 300, // ms
    
    // Debug mode
    debug: window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1'
  };

  /* ------------------------------------ */
  /* UTILITY FUNCTIONS                    */
  /* ------------------------------------ */

  /**
   * Safe console logging (only in debug mode)
   */
  function log(...args) {
    if (CONFIG.debug) {
      console.log('[MorinVibes]', ...args);
    }
  }

  /**
   * Check if element exists
   */
  function elementExists(selector) {
    if (typeof selector === 'string') {
      return document.querySelector(selector) !== null;
    }
    return selector !== null && selector !== undefined;
  }

  /**
   * Debounce function for performance
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /* ------------------------------------ */
  /* ORDER BUTTONS — Redirect to Checkout */
  /* ------------------------------------ */

  /**
   * Redirect user to checkout page
   */
  function goToCheckout() {
    log('Redirecting to checkout');
    window.location.href = CONFIG.checkoutUrl;
    
    // Track click if pixel is available
    if (typeof window.fbTrack === 'function') {
      window.fbTrack('AddToCart', { 
        content_name: 'Purchase CTA Click',
        content_type: 'product'
      });
    }
  }

  /**
   * Initialize all order buttons
   */
  function initOrderButtons() {
    const orderButtonIds = [
      // Global navigation
      'navOrderBtn',
      'mOrderBtn',
      
      // Homepage
      'heroBuyBtn',
      'prodBuyBtn',
      'prodBuyBtn2',
      'ctaBuyBtn',
      'concernsBtn',
      
      // Farm page
      'farmCtaBtn',
      
      // Quality page
      'qualityCtaBtn',
      
      // Wellness/Journal page
      'wellnessCtaBtn',
      'journalCtaBtn',
      
      // Shop page
      'shopBuyBtnDirect',
      
      // About page
      'aboutCtaBtn',
      
      // Testimonials page
      'testimonialsCtaBtn',
      
      // FAQ page
      'faqCtaBtn'
    ];

    let buttonsFound = 0;

    orderButtonIds.forEach(function(id) {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', goToCheckout);
        buttonsFound++;
        
        // Ensure touch target size
        btn.classList.add('touch-target');
        
        // Add ARIA label if missing
        if (!btn.hasAttribute('aria-label')) {
          btn.setAttribute('aria-label', 'Proceed to checkout');
        }
      }
    });

    log(`Initialized ${buttonsFound} order buttons`);
  }

  /* ------------------------------------ */
  /* MOBILE MENU — Two-Panel Navigation  */
  /* ------------------------------------ */

  const mobileMenu = document.getElementById('mobileMenu');
  const navHam = document.getElementById('navHam');
  const mClose = document.getElementById('mClose');

  /**
   * Open mobile menu
   */
  function openMenu() {
    if (!mobileMenu || !navHam) return;
    
    mobileMenu.classList.add('open');
    document.body.classList.add('menu-open');
    navHam.setAttribute('aria-expanded', 'true');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    log('Mobile menu opened');
  }

  /**
   * Close mobile menu
   */
  function closeMenu() {
    if (!mobileMenu || !navHam) return;
    
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    navHam.setAttribute('aria-expanded', 'false');
    
    // Restore body scrolling
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    
    log('Mobile menu closed');
  }

  /**
   * Initialize mobile menu
   */
  function initMobileMenu() {
    if (!mobileMenu || !navHam) {
      log('Mobile menu elements not found');
      return;
    }

    navHam.addEventListener('click', openMenu);

    if (mClose) {
      mClose.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on any link
    const menuLinks = document.querySelectorAll('.m-link');
    menuLinks.forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside (on right panel)
    const mRight = document.querySelector('.m-right');
    if (mRight) {
      mRight.addEventListener('click', closeMenu);
    }

    // Handle escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    log('Mobile menu initialized');
  }

  /* ------------------------------------ */
  /* SCROLL EFFECTS                      */
  /* ------------------------------------ */

  const progressBar = document.getElementById('progressBar');
  const nav = document.getElementById('mainNav');
  const scrollTop = document.getElementById('scrollTop');
  let ticking = false;

  /**
   * Handle scroll events with requestAnimationFrame
   */
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Update progress bar
        if (progressBar) {
          const progress = docHeight > 0 ? (scrollY / docHeight * 100) : 0;
          progressBar.style.width = progress + '%';
        }
        
        // Shrink navigation
        if (nav) {
          if (scrollY > CONFIG.navShrinkThreshold) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
        }
        
        // Show/hide scroll-to-top button
        if (scrollTop) {
          if (scrollY > CONFIG.scrollThreshold) {
            scrollTop.classList.add('visible');
            scrollTop.setAttribute('aria-hidden', 'false');
          } else {
            scrollTop.classList.remove('visible');
            scrollTop.setAttribute('aria-hidden', 'true');
          }
        }
        
        ticking = false;
      });
      ticking = true;
    }
  }

  /**
   * Smooth scroll to top
   */
  function scrollToTop() {
    log('Scrolling to top');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Initialize scroll effects
   */
  function initScrollEffects() {
    // Add scroll listener with passive option
    window.addEventListener('scroll', onScroll, { passive: true });

    // Scroll to top button
    if (scrollTop) {
      scrollTop.addEventListener('click', scrollToTop);
      scrollTop.classList.add('touch-target');
      scrollTop.setAttribute('aria-label', 'Scroll to top');
    }

    log('Scroll effects initialized');
  }

  /* ------------------------------------ */
  /* LANGUAGE DROPDOWN                    */
  /* ------------------------------------ */

  const langDrop = document.getElementById('langDrop');
  const langBtn = document.getElementById('langBtn');

  /**
   * Initialize language dropdown
   */
  function initLanguageDropdown() {
    if (!langBtn || !langDrop) {
      log('Language dropdown elements not found');
      return;
    }

    langBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = langDrop.classList.contains('open');
      
      if (isOpen) {
        langDrop.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      } else {
        langDrop.classList.add('open');
        langBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!langDrop.contains(e.target)) {
        langDrop.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Keyboard navigation
    const langOpts = document.querySelectorAll('.lang-opt');
    langOpts.forEach(function(opt) {
      opt.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = this.getAttribute('href');
        }
      });
    });

    log('Language dropdown initialized');
  }

  /* ------------------------------------ */
  /* FAQ ACCORDION                        */
  /* ------------------------------------ */

  const faqQuestions = document.querySelectorAll('.faq-q');

  /**
   * Initialize FAQ accordion
   */
  function initFaqAccordion() {
    if (!faqQuestions.length) {
      log('No FAQ elements found');
      return;
    }

    faqQuestions.forEach(function(question, index) {
      // Set unique ID for accessibility
      const answerId = `faq-answer-${index}`;
      const answer = question.nextElementSibling;
      
      if (answer && answer.classList.contains('faq-ans')) {
        answer.id = answerId;
        question.setAttribute('aria-controls', answerId);
      }

      // Set ARIA attributes
      question.setAttribute('role', 'button');
      question.setAttribute('tabindex', '0');
      
      if (!question.hasAttribute('aria-expanded')) {
        question.setAttribute('aria-expanded', 'false');
      }

      function toggleFaq(e) {
        e.preventDefault();
        
        const item = question.closest('.faq-item');
        const answer = item.querySelector('.faq-ans');
        const icon = question.querySelector('.faq-icon');
        const isOpen = item.classList.contains('open');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
          if (openItem !== item) {
            openItem.classList.remove('open');
            const openAnswer = openItem.querySelector('.faq-ans');
            const openQuestion = openItem.querySelector('.faq-q');
            
            if (openAnswer) {
              openAnswer.style.maxHeight = null;
            }
            
            if (openQuestion) {
              openQuestion.setAttribute('aria-expanded', 'false');
            }
          }
        });
        
        // Toggle current FAQ
        if (!isOpen) {
          item.classList.add('open');
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
          if (icon) {
            icon.textContent = '×';
            icon.setAttribute('aria-label', 'Collapse');
          }
          question.setAttribute('aria-expanded', 'true');
        } else {
          item.classList.remove('open');
          if (answer) {
            answer.style.maxHeight = null;
          }
          if (icon) {
            icon.textContent = '+';
            icon.setAttribute('aria-label', 'Expand');
          }
          question.setAttribute('aria-expanded', 'false');
        }
      }

      question.addEventListener('click', toggleFaq);
      
      // Keyboard support
      question.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFaq(e);
        }
      });
    });

    log(`Initialized ${faqQuestions.length} FAQ items`);
  }

  /* ------------------------------------ */
  /* RIPPLE EFFECT                        */
  /* ------------------------------------ */

  /**
   * Create ripple effect on button click
   */
  function createRipple(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (x - 5) + 'px';
    ripple.style.top = (y - 5) + 'px';
    
    btn.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(function() {
      ripple.remove();
    }, CONFIG.rippleDuration);
  }

  /**
   * Initialize ripple effect
   */
  function initRippleEffect() {
    const rippleButtons = document.querySelectorAll('.btn--primary, .btn--outline, .btn--ghost');
    
    rippleButtons.forEach(function(btn) {
      btn.addEventListener('click', createRipple);
    });

    log(`Initialized ripple effect on ${rippleButtons.length} buttons`);
  }

  /* ------------------------------------ */
  /* COMMUNITY POPUP                      */
  /* ------------------------------------ */

  const popup = document.getElementById('communityPopup');
  let popupShown = false;

  /**
   * Check if popup has been shown before
   */
  function checkPopupStorage() {
    try {
      popupShown = !!localStorage.getItem(CONFIG.popupKey);
      log(`Popup previously shown: ${popupShown}`);
    } catch (e) {
      log('localStorage not available');
      popupShown = true; // Don't show if storage is unavailable
    }
  }

  /**
   * Show the community popup
   */
  function showPopup() {
    if (!popup || popupShown) return;
    
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
    popupShown = true;
    
    try {
      localStorage.setItem(CONFIG.popupKey, '1');
    } catch (e) {}
    
    log('Community popup shown');
    
    // Track popup view
    if (typeof window.fbTrack === 'function') {
      window.fbTrack('ViewContent', {
        content_name: 'Community Popup',
        content_category: 'Engagement'
      });
    }
  }

  /**
   * Close the community popup
   */
  function closePopup() {
    if (!popup) return;
    
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
    log('Community popup closed');
  }

  /**
   * Initialize popup triggers
   */
  function initPopup() {
    if (!popup) {
      log('Popup element not found');
      return;
    }

    checkPopupStorage();
    
    if (!popupShown) {
      // Exit intent (mouse leaves top of viewport)
      document.addEventListener('mouseleave', function(e) {
        if (e.clientY < CONFIG.exitIntentThreshold) {
          log('Exit intent detected');
          showPopup();
        }
      }, { once: true });
      
      // Time fallback
      setTimeout(function() {
        if (!popupShown) {
          log('Popup timeout reached');
          showPopup();
        }
      }, CONFIG.popupDelay);
    }

    // Close handlers
    const popClose = document.getElementById('popClose');
    const popDismiss = document.getElementById('popDismiss');

    if (popClose) {
      popClose.addEventListener('click', closePopup);
      popClose.classList.add('touch-target');
    }

    if (popDismiss) {
      popDismiss.addEventListener('click', closePopup);
      popDismiss.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') closePopup();
      });
      popDismiss.classList.add('touch-target');
    }

    // WhatsApp link tracking
    const popWa = document.getElementById('popWa');
    if (popWa && typeof window.fbTrack === 'function') {
      popWa.addEventListener('click', function() {
        window.fbTrack('Lead', { content_name: 'WhatsApp Popup' });
      });
    }
  }

  /* ------------------------------------ */
  /* VIDEO PLACEHOLDER HANDLING          */
  /* ------------------------------------ */

  /**
   * Initialize video placeholder interactions
   */
  function initVideoHandling() {
    const videoItems = document.querySelectorAll('[data-video]');
    
    if (!videoItems.length) {
      return;
    }

    videoItems.forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const videoSrc = this.getAttribute('href');
        
        // Open video in new tab (can be enhanced with lightbox)
        window.open(videoSrc, '_blank');
        
        // Track video view
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('ViewContent', {
            content_name: 'Farm Video',
            content_category: 'Media'
          });
        }
      });
      
      // Make keyboard accessible
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });

    log(`Initialized ${videoItems.length} video placeholders`);
  }

  /* ------------------------------------ */
  /* PRODUCT TABS (Shop Page)            */
  /* ------------------------------------ */

  /**
   * Initialize product tabs
   */
  function initProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (!tabBtns.length) {
      return;
    }

    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const tabId = this.dataset.tab;
        
        // Remove active class from all tabs
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        
        document.querySelectorAll('.tab-pane').forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-hidden', 'true');
        });
        
        // Add active class to current tab
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        
        const targetPane = document.getElementById(tabId);
        if (targetPane) {
          targetPane.classList.add('active');
          targetPane.setAttribute('aria-hidden', 'false');
        }
      });
      
      // Set ARIA attributes
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.classList.add('touch-target');
    });
    
    // Activate first tab by default
    if (tabBtns.length > 0 && !document.querySelector('.tab-btn.active')) {
      tabBtns[0].click();
    }

    log(`Initialized ${tabBtns.length} product tabs`);
  }

  /* ------------------------------------ */
  /* EXTERNAL LINK TRACKING              */
  /* ------------------------------------ */

  /**
   * Initialize external link tracking
   */
  function initExternalLinkTracking() {
    // WhatsApp links
    document.querySelectorAll('[href*="wa.me"]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('Lead', { content_name: 'WhatsApp Click' });
        }
      });
    });

    // Shopee links
    document.querySelectorAll('[href*="shopee.com.my"]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('CustomEvent', { event_name: 'ShopeeClick' });
        }
      });
    });

    // Lazada links
    document.querySelectorAll('[href*="lazada.com.my"]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('CustomEvent', { event_name: 'LazadaClick' });
        }
      });
    });

    log('External link tracking initialized');
  }

  /* ------------------------------------ */
  /* ACTIVE NAVIGATION LINK              */
  /* ------------------------------------ */

  /**
   * Set active navigation link based on URL
   */
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.m-link');
    
    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      
      // Remove existing active class
      link.classList.remove('active');
      
      if (href) {
        // Handle homepage
        if (href === '/morinvibes-official/en/' && 
            (currentPath === '/morinvibes-official/en/' || 
             currentPath === '/morinvibes-official/en/index.html')) {
          link.classList.add('active');
        }
        // Handle other pages
        else if (href !== '/morinvibes-official/en/' && 
                 currentPath.includes(href) && 
                 href.length > 0) {
          link.classList.add('active');
        }
      }
    });

    log('Active navigation link set');
  }

  /* ------------------------------------ */
  /* TOUCH OPTIMIZATIONS                 */
  /* ------------------------------------ */

  /**
   * Add touch-friendly classes and prevent double-tap zoom
   */
  function initTouchOptimizations() {
    // Add touch-target class to all interactive elements
    const interactiveSelectors = [
      '.btn',
      '.nav__ham',
      '.m-close',
      '.pop-close',
      '.pop-dismiss',
      '.lang-btn',
      '.lang-opt',
      '.footer-social a',
      '.scroll-top',
      '.tag',
      '.farm-media__item',
      '.pagination-item',
      '.tab-btn',
      '.faq-q'
    ];
    
    interactiveSelectors.forEach(function(selector) {
      document.querySelectorAll(selector).forEach(function(el) {
        el.classList.add('touch-target');
      });
    });
    
    // Prevent double-tap zoom on touch devices
    if ('ontouchstart' in window) {
      document.querySelectorAll('a, button').forEach(function(el) {
        el.addEventListener('touchstart', function(e) {
          // Passive listener for performance
        }, { passive: true });
      });
    }

    log('Touch optimizations applied');
  }

  /* ------------------------------------ */
  /* LAZY LOADING FALLBACK                */
  /* ------------------------------------ */

  /**
   * Fallback lazy loading for older browsers
   */
  function initLazyLoadingFallback() {
    if ('IntersectionObserver' in window) return;

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    function lazyLoad() {
      lazyImages.forEach(function(img) {
        if (img.getBoundingClientRect().top < window.innerHeight + 100) {
          const src = img.dataset.src;
          if (src) {
            img.src = src;
          }
        }
      });
    }
    
    window.addEventListener('scroll', lazyLoad, { passive: true });
    window.addEventListener('resize', lazyLoad, { passive: true });
    lazyLoad(); // Initial check

    log('Lazy loading fallback initialized');
  }

  /* ------------------------------------ */
  /* RESIZE HANDLER                       */
  /* ------------------------------------ */

  /**
   * Handle window resize events
   */
  function initResizeHandler() {
    const handleResize = debounce(function() {
      const width = window.innerWidth;
      log(`Window resized to ${width}px`);
      
      // Close mobile menu on desktop
      if (width >= 768 && mobileMenu && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    }, 250);

    window.addEventListener('resize', handleResize);
  }

  /* ------------------------------------ */
  /* INITIALIZATION                       */
  /* ------------------------------------ */

  /**
   * Initialize all modules
   */
  function init() {
    log('Initializing MorinVibes® v19.0');
    
    // Core functionality
    initOrderButtons();
    initMobileMenu();
    initScrollEffects();
    initLanguageDropdown();
    initFaqAccordion();
    initRippleEffect();
    initPopup();
    initVideoHandling();
    initProductTabs();
    initExternalLinkTracking();
    initTouchOptimizations();
    initLazyLoadingFallback();
    initResizeHandler();
    
    // Set active navigation
    setActiveNavLink();
    
    // Log device info
    if (CONFIG.debug) {
      console.log('📱 Device Info:', {
        width: window.innerWidth,
        height: window.innerHeight,
        mobile: window.innerWidth < 768,
        touch: 'ontouchstart' in window,
        language: navigator.language
      });
    }
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ------------------------------------ */
  /* PUBLIC API (for debugging)          */
  /* ------------------------------------ */

  if (CONFIG.debug) {
    window.MorinVibes = {
      goToCheckout,
      openMenu,
      closeMenu,
      scrollToTop,
      showPopup,
      closePopup,
      CONFIG
    };
    log('Debug API exposed as window.MorinVibes');
  }

})();
