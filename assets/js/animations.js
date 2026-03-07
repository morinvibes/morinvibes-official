/* ===== MORINVIBES® — ANIMATIONS.JS v18.0 ===== */
/* Version: 18.0 · March 2026 · Mobile-First */
/* Path: /morinvibes-official/assets/js/animations.js */

(function() {
  'use strict';

  /* ------------------------------------ */
  /* CONFIGURATION                        */
  /* ------------------------------------ */

  const CONFIG = {
    // Thresholds (percentage of element visible)
    mobileThreshold: 0.05,  // 5% visible on mobile
    desktopThreshold: 0.1,   // 10% visible on desktop
    
    // Root margins (adjust when animation triggers)
    mobileRootMargin: '0px 0px -20px 0px',
    desktopRootMargin: '0px 0px -50px 0px',
    
    // Image lazy loading margin
    imageRootMargin: '100px 0px',
    
    // Section observer margin (for future use)
    sectionRootMargin: '-80px 0px 0px 0px',
    
    // Animation durations
    fadeDuration: 0.6,      // 600ms
    fastFadeDuration: 0.4,   // 400ms for low-end devices
  };

  /* ------------------------------------ */
  /* UTILITY FUNCTIONS                    */
  /* ------------------------------------ */

  /**
   * Check if device is mobile
   * @returns {boolean} True if viewport width < 768px
   */
  function isMobile() {
    return window.innerWidth < 768;
  }

  /**
   * Check if device is low-end (memory < 4GB)
   * @returns {boolean} True for low-end devices
   */
  function isLowEndDevice() {
    return navigator.deviceMemory && navigator.deviceMemory < 4;
  }

  /**
   * Check if user prefers reduced motion
   * @returns {boolean} True if reduced motion preferred
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Log debug messages in development
   * @param {string} message - Debug message
   * @param {any} data - Optional data to log
   */
  function debugLog(message, data) {
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1') {
      console.log(`[Animations] ${message}`, data || '');
    }
  }

  /* ------------------------------------ */
  /* FADE ANIMATIONS — IntersectionObserver */
  /* ------------------------------------ */

  /**
   * Initialize fade animations on scroll
   */
  function initFadeAnimations() {
    // Select all elements with fade classes
    const fadeSelectors = [
      '.fade-up',
      '.fade-left', 
      '.fade-right',
      '.fade-in'
    ];
    
    let fadeElements = [];
    fadeSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      fadeElements = [...fadeElements, ...elements];
    });

    if (fadeElements.length === 0) {
      debugLog('No fade elements found');
      return;
    }

    debugLog(`Found ${fadeElements.length} fade elements`);

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers — show all elements immediately
      fadeElements.forEach(el => {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      debugLog('IntersectionObserver not supported, showing all elements');
      return;
    }

    // Configure observer based on device
    const threshold = isMobile() ? CONFIG.mobileThreshold : CONFIG.desktopThreshold;
    const rootMargin = isMobile() ? CONFIG.mobileRootMargin : CONFIG.desktopRootMargin;

    debugLog(`Observer config - threshold: ${threshold}, rootMargin: ${rootMargin}`);

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          
          // Handle data-delay attributes for staggered animations
          const delay = el.getAttribute('data-delay');
          if (delay) {
            const delayMs = parseInt(delay) * 100;
            setTimeout(() => {
              el.classList.add('visible');
            }, delayMs);
          } else {
            el.classList.add('visible');
          }
          
          // Unobserve after animation to improve performance
          fadeObserver.unobserve(el);
        }
      });
    }, {
      threshold: threshold,
      rootMargin: rootMargin,
      root: null // use viewport
    });

    // Observe each fade element
    fadeElements.forEach(el => {
      // Ensure element starts hidden (in case CSS doesn't)
      if (!el.classList.contains('visible')) {
        el.style.opacity = '0';
        if (el.classList.contains('fade-up')) {
          el.style.transform = 'translateY(24px)';
        } else if (el.classList.contains('fade-left')) {
          el.style.transform = 'translateX(-20px)';
        } else if (el.classList.contains('fade-right')) {
          el.style.transform = 'translateX(20px)';
        }
      }
      
      fadeObserver.observe(el);
    });

    debugLog('Fade animations initialized');
  }

  /* ------------------------------------ */
  /* STAGGERED CARD REVEALS              */
  /* ------------------------------------ */

  /**
   * Initialize staggered card reveals
   * Works with data-delay attributes on child elements
   */
  function initStaggeredReveals() {
    const containers = document.querySelectorAll('[data-stagger]');
    
    if (containers.length === 0) return;

    containers.forEach(container => {
      const children = container.children;
      const baseDelay = parseInt(container.getAttribute('data-stagger')) || 1;
      
      Array.from(children).forEach((child, index) => {
        child.setAttribute('data-delay', (baseDelay + index * 1).toString());
      });
    });

    debugLog(`Staggered reveals initialized for ${containers.length} containers`);
  }

  /* ------------------------------------ */
  /* COUNTER ANIMATIONS (Trust Phrases, NOT Numbers) */
  /* ------------------------------------ */

  /**
   * Animate counters (now used for emphasis, not numbers)
   * This is a simplified version that adds visual emphasis
   * without counting actual numbers (trust-first approach)
   */
  function initCounterEmphasis() {
    const statItems = document.querySelectorAll('.stat-item, .soc-stat');
    
    if (statItems.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: add emphasis class immediately
      statItems.forEach(item => {
        item.classList.add('visible');
      });
      return;
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          
          // Add a subtle pulse animation to draw attention
          item.classList.add('visible');
          
          // Add a temporary highlight effect
          item.style.transition = 'all 0.3s ease';
          item.style.transform = 'scale(1.02)';
          
          setTimeout(() => {
            item.style.transform = '';
          }, 300);
          
          counterObserver.unobserve(item);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px'
    });

    statItems.forEach(item => {
      counterObserver.observe(item);
    });

    debugLog(`Counter emphasis initialized for ${statItems.length} items`);
  }

  /* ------------------------------------ */
  /* LAZY LOAD IMAGES                     */
  /* ------------------------------------ */

  /**
   * Initialize lazy loading for images with data-src
   */
  function initLazyImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;

    debugLog(`Found ${lazyImages.length} lazy images`);

    if (!('IntersectionObserver' in window)) {
      // Fallback: load all images immediately
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.add('loaded');
      });
      return;
    }

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          
          // Remove data-src to prevent re-processing
          img.removeAttribute('data-src');
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: CONFIG.imageRootMargin
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });

    debugLog('Lazy image loading initialized');
  }

  /* ------------------------------------ */
  /* VIDEO LAZY LOADING                   */
  /* ------------------------------------ */

  /**
   * Initialize lazy loading for videos with data-src
   */
  function initLazyVideos() {
    const lazyVideos = document.querySelectorAll('video[data-src]');
    
    if (lazyVideos.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: load all videos immediately
      lazyVideos.forEach(video => {
        video.src = video.dataset.src;
        video.load();
      });
      return;
    }

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.src = video.dataset.src;
          video.load();
          video.removeAttribute('data-src');
          videoObserver.unobserve(video);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: CONFIG.imageRootMargin
    });

    lazyVideos.forEach(video => {
      videoObserver.observe(video);
    });

    debugLog('Lazy video loading initialized');
  }

  /* ------------------------------------ */
  /* PARALLAX EFFECTS (Lightweight)      */
  /* ------------------------------------ */

  /**
   * Initialize subtle parallax effects on hero sections
   * Only on desktop to avoid performance issues on mobile
   */
  function initParallax() {
    // Only on non-mobile devices
    if (isMobile() || prefersReducedMotion()) return;

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
        const yPos = scrollY * speed;
        el.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    debugLog('Parallax initialized');
  }

  /* ------------------------------------ */
  /* RESPONSIVE ANIMATION ADJUSTMENTS    */
  /* ------------------------------------ */

  /**
   * Adjust animations based on device capabilities
   */
  function adjustForDevice() {
    const style = document.createElement('style');
    
    if (prefersReducedMotion()) {
      // Disable all animations
      style.textContent = `
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        .fade-up, .fade-left, .fade-right, .fade-in {
          opacity: 1 !important;
          transform: none !important;
        }
        .trust-bar__track {
          animation: none !important;
        }
      `;
      document.head.appendChild(style);
      debugLog('Reduced motion enabled, animations disabled');
      return;
    }
    
    if (isLowEndDevice()) {
      // Faster animations for low-end devices
      style.textContent = `
        .fade-up, .fade-left, .fade-right, .fade-in {
          transition-duration: 0.4s !important;
        }
        .trust-bar__track {
          animation-duration: 20s !important;
        }
      `;
      document.head.appendChild(style);
      debugLog('Low-end device optimizations applied');
    }
  }

  /* ------------------------------------ */
  /* SECTION HIGHLIGHT (Future Use)      */
  /* ------------------------------------ */

  /**
   * Track visible sections for analytics or nav highlighting
   */
  function initSectionTracking() {
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0 || !('IntersectionObserver' in window)) return;

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Could be used for analytics or updating URL hash
          // Currently just logs in development
          if (window.location.hostname === 'localhost' || 
              window.location.hostname === '127.0.0.1') {
            debugLog(`Section visible: ${sectionId}`);
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: CONFIG.sectionRootMargin
    });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  /* ------------------------------------ */
  /* MARQUEE PAUSE ON HOVER/TAP          */
  /* ------------------------------------ */

  /**
   * Add pause on hover/tap for marquee elements
   */
  function initMarqueeControls() {
    const marquees = document.querySelectorAll('.trust-bar__track');
    
    marquees.forEach(marquee => {
      // Pause on hover (desktop)
      marquee.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
      });
      
      marquee.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
      });
      
      // Pause on tap (mobile)
      marquee.addEventListener('touchstart', () => {
        marquee.style.animationPlayState = 'paused';
      });
      
      marquee.addEventListener('touchend', () => {
        // Resume after a short delay to prevent accidental pauses
        setTimeout(() => {
          marquee.style.animationPlayState = 'running';
        }, 300);
      });
    });
  }

  /* ------------------------------------ */
  /* RESIZE HANDLER — Update Observers   */
  /* ------------------------------------ */

  /**
   * Handle window resize to update mobile/desktop settings
   */
  function initResizeHandler() {
    let resizeTimer;
    let wasMobile = isMobile();

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      
      resizeTimer = setTimeout(() => {
        const nowMobile = isMobile();
        
        if (nowMobile !== wasMobile) {
          // Device orientation changed between mobile and desktop
          debugLog(`Device mode changed: ${nowMobile ? 'mobile' : 'desktop'}`);
          
          // Reload observers by re-initializing
          // This is a simple approach — for production, you might want
          // to dynamically update observer thresholds
          window.location.reload();
        }
        
        wasMobile = nowMobile;
      }, 250);
    }, { passive: true });
  }

  /* ------------------------------------ */
  /* INITIALIZATION — RUN ON PAGE LOAD   */
  /* ------------------------------------ */

  /**
   * Initialize all animation modules
   */
  function init() {
    debugLog('Initializing animations...');
    
    // Apply device-specific adjustments first
    adjustForDevice();
    
    // Initialize all animation types
    initStaggeredReveals();
    initFadeAnimations();
    initCounterEmphasis();
    initLazyImages();
    initLazyVideos();
    initParallax();
    initSectionTracking();
    initMarqueeControls();
    initResizeHandler();
    
    debugLog('✅ All animations initialized');
    
    // Log device info
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1') {
      console.log('📱 Mobile mode:', isMobile());
      console.log('💻 Low-end device:', isLowEndDevice());
      console.log('🎭 Reduced motion:', prefersReducedMotion());
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
    window.MorinVibesAnimations = {
      isMobile,
      isLowEndDevice,
      prefersReducedMotion,
      refresh: init,
      CONFIG
    };
  }

})();
