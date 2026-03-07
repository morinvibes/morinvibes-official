/* ===== MORINVIBES® — MAIN.JS v18.0 ===== */
/* Version: 18.0 · March 2026 · Mobile-First */
/* Path: /morinvibes-official/assets/js/main.js */

(function() {
  'use strict';

  /* ------------------------------------ */
  /* GLOBAL VARIABLES & CONFIG           */
  /* ------------------------------------ */

  const CONFIG = {
    checkoutUrl: '/morinvibes-official/en/checkout.html',
    popupKey: 'mv_popup_v1',
    popupDelay: 45000, // 45 seconds
    scrollThreshold: 300,
    navShrinkThreshold: 40
  };

  /* ------------------------------------ */
  /* ORDER BUTTONS — Redirect to Checkout */
  /* ------------------------------------ */

  /**
   * Redirect user to checkout page
   * All order buttons across the site use this function
   */
  function goToCheckout() {
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
   * Finds buttons by ID and attaches click handlers
   */
  function initOrderButtons() {
    // Complete list of all order button IDs across all pages
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
        
        // Add touch-friendly class for mobile
        btn.classList.add('touch-target');
      }
    });

    // Debug log in development
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1') {
      console.log(`[Main.js] Initialized ${buttonsFound} order buttons`);
    }
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
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = 'hidden';
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
  }

  /**
   * Initialize mobile menu event listeners
   */
  function initMobileMenu() {
    if (navHam) {
      navHam.addEventListener('click', openMenu);
    }

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
  }

  /* ------------------------------------ */
  /* ESC KEY HANDLER                      */
  /* ------------------------------------ */

  /**
   * Handle Escape key press
   * Closes mobile menu and any open modals
   */
  function handleEscKey(e) {
    if (e.key === 'Escape') {
      closeMenu();
      
      // Close any other open elements (for future use)
      const openElements = document.querySelectorAll('.open');
      openElements.forEach(function(el) {
        if (el.classList.contains('m-menu')) return; // Already handled
        el.classList.remove('open');
      });
    }
  }

  document.addEventListener('keydown', handleEscKey);

  /* ------------------------------------ */
  /* SCROLL EFFECTS — Progress Bar, Nav Shrink, Scroll Top */
  /* ------------------------------------ */

  const progressBar = document.getElementById('progressBar');
  const nav = document.getElementById('mainNav');
  const scrollTop = document.getElementById('scrollTop');
  let ticking = false;

  /**
   * Handle scroll events with requestAnimationFrame for performance
   */
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Update progress bar width
        if (progressBar) {
          const progress = docHeight > 0 ? (scrollY / docHeight * 100) : 0;
          progressBar.style.width = progress + '%';
        }
        
        // Shrink navigation on scroll
        if (nav) {
          nav.classList.toggle('scrolled', scrollY > CONFIG.navShrinkThreshold);
        }
        
        // Show/hide scroll-to-top button
        if (scrollTop) {
          scrollTop.classList.toggle('visible', scrollY > CONFIG.scrollThreshold);
        }
        
        ticking = false;
      });
      ticking = true;
    }
  }

  // Add scroll listener with passive option for better performance
  window.addEventListener('scroll', onScroll, { passive: true });

  /**
   * Smooth scroll to top
   */
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', scrollToTop);
    
    // Ensure button has proper touch target size
    scrollTop.classList.add('touch-target');
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
    if (!langBtn || !langDrop) return;

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

    // Keyboard navigation
    const langOpts = document.querySelectorAll('.lang-opt');
    langOpts.forEach(function(opt) {
      opt.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          window.location.href = this.getAttribute('href');
        }
      });
    });
  }

  /* ------------------------------------ */
  /* FAQ ACCORDION                        */
  /* ------------------------------------ */

  const faqQuestions = document.querySelectorAll('.faq-q');

  /**
   * Initialize FAQ accordion functionality
   */
  function initFaqAccordion() {
    if (!faqQuestions.length) return;

    faqQuestions.forEach(function(question) {
      // Ensure each FAQ has proper ARIA attributes
      question.setAttribute('role', 'button');
      question.setAttribute('tabindex', '0');
      
      if (!question.hasAttribute('aria-expanded')) {
        question.setAttribute('aria-expanded', 'false');
      }

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
            const openIcon = openItem.querySelector('.faq-icon');
            
            if (openAnswer) {
              openAnswer.style.maxHeight = null;
            }
            
            if (openIcon) {
              openIcon.textContent = '+';
              openIcon.setAttribute('aria-hidden', 'false');
            }
            
            const openQuestion = openItem.querySelector('.faq-q');
            if (openQuestion) {
              openQuestion.setAttribute('aria-expanded', 'false');
            }
          }
        });
        
        // Toggle current FAQ
        if (!wasOpen) {
          item.classList.add('open');
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
          if (icon) {
            icon.textContent = '×';
          }
          question.setAttribute('aria-expanded', 'true');
        } else {
          item.classList.remove('open');
          if (answer) {
            answer.style.maxHeight = null;
          }
          if (icon) {
            icon.textContent = '+';
          }
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
  }

  /* ------------------------------------ */
  /* RIPPLE EFFECT ON BUTTONS            */
  /* ------------------------------------ */

  /**
   * Create ripple effect on button click
   * @param {Event} e - Click event
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
    }, 600);
  }

  /**
   * Initialize ripple effect on buttons
   */
  function initRippleEffect() {
    const rippleButtons = document.querySelectorAll('.btn--primary, .btn--outline');
    
    rippleButtons.forEach(function(btn) {
      btn.addEventListener('click', createRipple);
    });
  }

  /* ------------------------------------ */
  /* COMMUNITY POPUP — Once Ever         */
  /* ------------------------------------ */

  const popup = document.getElementById('communityPopup');
  let popupShown = false;

  /**
   * Check if popup has been shown before
   */
  function checkPopupStorage() {
    try {
      popupShown = !!localStorage.getItem(CONFIG.popupKey);
    } catch (e) {
      console.warn('localStorage not available');
      popupShown = true; // Don't show if storage is unavailable
    }
  }

  /**
   * Show the community popup
   */
  function showPopup() {
    if (!popup || popupShown) return;
    
    popup.classList.add('show');
    popupShown = true;
    
    try {
      localStorage.setItem(CONFIG.popupKey, '1');
    } catch (e) {}
    
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
  }

  /**
   * Initialize community popup triggers
   */
  function initPopup() {
    if (!popup) return;
    
    checkPopupStorage();
    
    if (!popupShown) {
      // Exit intent (mouse leaves top of viewport)
      document.addEventListener('mouseleave', function(e) {
        if (e.clientY < 10) {
          showPopup();
        }
      }, { once: true });
      
      // Time fallback
      setTimeout(showPopup, CONFIG.popupDelay);
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
    
    videoItems.forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const videoSrc = this.getAttribute('href');
        
        // Check if it's a video file
        if (videoSrc.match(/\.(mp4|webm|ogg)$/i)) {
          // Create video modal or lightbox
          // For now, open in new tab
          window.open(videoSrc, '_blank');
        } else {
          // Assume it's an image
          window.open(videoSrc, '_blank');
        }
        
        // Track video view
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('ViewContent', {
            content_name: 'Farm Video',
            content_category: 'Media'
          });
        }
      });
      
      // Make video items keyboard accessible
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  /* ------------------------------------ */
  /* PRODUCT TABS (Shop Page)            */
  /* ------------------------------------ */

  /**
   * Initialize product tabs on shop page
   */
  function initProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (!tabBtns.length) return;
    
    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const tabId = this.dataset.tab;
        
        // Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        // Add active class to current tab
        this.classList.add('active');
        
        const targetPane = document.getElementById(tabId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
      
      // Ensure touch target size
      btn.classList.add('touch-target');
    });
    
    // Activate first tab by default
    if (tabBtns.length > 0 && !document.querySelector('.tab-btn.active')) {
      tabBtns[0].click();
    }
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
      '.tab-btn'
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
  }

  /* ------------------------------------ */
  /* ACTIVE NAVIGATION LINK              */
  /* ------------------------------------ */

  /**
   * Set active state in navigation based on current URL
   */
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.m-link');
    
    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      
      // Remove any existing active class
      link.classList.remove('active');
      
      // Check if current path matches link
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
  }

  /* ------------------------------------ */
  /* EXTERNAL LINK TRACKING              */
  /* ------------------------------------ */

  /**
   * Initialize tracking for external links
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

    // Instagram links
    document.querySelectorAll('[href*="instagram.com"]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('CustomEvent', { event_name: 'InstagramClick' });
        }
      });
    });

    // TikTok links
    document.querySelectorAll('[href*="tiktok.com"]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('CustomEvent', { event_name: 'TikTokClick' });
        }
      });
    });
  }

  /* ------------------------------------ */
  /* IMAGE LAZY LOADING (FALLBACK)       */
  /* ------------------------------------ */

  /**
   * Fallback lazy loading for browsers without IntersectionObserver
   */
  function initLazyLoading() {
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
  }

  /* ------------------------------------ */
  /* INITIALIZATION — RUN ON PAGE LOAD   */
  /* ------------------------------------ */

  /**
   * Initialize all modules when DOM is ready
   */
  function init() {
    // Core functionality
    initOrderButtons();
    initMobileMenu();
    initLanguageDropdown();
    initFaqAccordion();
    initRippleEffect();
    initPopup();
    initVideoHandling();
    initProductTabs();
    initTouchOptimizations();
    initExternalLinkTracking();
    initLazyLoading();
    
    // Set active navigation
    setActiveNavLink();
    
    // Debug log
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1') {
      console.log('✅ MorinVibes® main.js v18 initialized');
      console.log('📱 Mobile mode:', window.innerWidth < 768);
      console.log('🔄 Checkout URL:', CONFIG.checkoutUrl);
    }
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded, run immediately
    init();
  }

  /* ------------------------------------ */
  /* PUBLIC API (for debugging)          */
  /* ------------------------------------ */

  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1') {
    window.MorinVibes = {
      goToCheckout,
      openMenu,
      closeMenu,
      scrollToTop,
      showPopup,
      closePopup,
      CONFIG
    };
  }

})();
