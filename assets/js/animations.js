/* ===== MORINVIBES® — ANIMATIONS.JS ===== */
/* Version: 17.0 · March 2026 · Mobile-First */
/* Path: /morinvibes-official/assets/js/animations.js */

(function() {
  'use strict';

  /* ------------------------------------ */
  /* FADE ANIMATIONS — IntersectionObserver */
  /* ------------------------------------ */

  // Select all elements with fade classes
  const fadeElements = document.querySelectorAll(
    '.fade-up, .fade-left, .fade-right'
  );

  if (fadeElements.length > 0) {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      // Mobile needs lower threshold for better UX
      const isMobile = window.innerWidth < 768;
      
      const fadeObserver = new IntersectionObserver(
        function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Unobserve after animation to improve performance
              fadeObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: isMobile ? 0.05 : 0.1, // Lower threshold on mobile
          rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px',
          root: null // Use viewport as root
        }
      );

      // Observe each fade element
      fadeElements.forEach(function(el) {
        fadeObserver.observe(el);
      });
    } else {
      // Fallback for older browsers — show all elements immediately
      fadeElements.forEach(function(el) {
        el.classList.add('visible');
      });
    }
  }

  /* ------------------------------------ */
  /* STAGGERED CARD REVEALS              */
  /* ------------------------------------ */

  // This works in conjunction with fade animations
  // data-delay attributes are already applied in HTML
  // No additional code needed, but we ensure they work with IntersectionObserver

  // Add a small utility to handle any elements that might need
  // manual triggering (e.g., elements that become visible after user interaction)
  const manuallyTriggeredElements = document.querySelectorAll('[data-trigger]');
  
  manuallyTriggeredElements.forEach(function(el) {
    const triggerEvent = el.dataset.trigger || 'click';
    
    el.addEventListener(triggerEvent, function() {
      const targetId = el.dataset.target;
      if (targetId) {
        const target = document.getElementById(targetId);
        if (target && !target.classList.contains('visible')) {
          target.classList.add('visible');
        }
      }
    });
  });

  /* ------------------------------------ */
  /* SCROLL-BASED HIGHLIGHTING           */
  /* ------------------------------------ */

  // Optional: Highlight current section in view (for future use)
  const sections = document.querySelectorAll('section[id]');
  
  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            // Could be used for active nav highlighting if needed
            // Currently not implemented, but kept for future enhancement
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px 0px 0px' // Account for fixed header
      }
    );

    sections.forEach(function(section) {
      sectionObserver.observe(section);
    });
  }

  /* ------------------------------------ */
  /* LAZY LOAD IMAGES (if any)           */
  /* ------------------------------------ */

  // Simple lazy loading for images with data-src
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px' // Load images 100px before they enter viewport
      }
    );

    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  /* ------------------------------------ */
  /* RESPONSIVE ANIMATION ADJUSTMENTS    */
  /* ------------------------------------ */

  // Reduce animations on low-power devices or when prefers-reduced-motion is set
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Disable all fade animations
    fadeElements.forEach(function(el) {
      el.classList.add('visible');
      el.style.transition = 'none';
    });
    
    // Disable marquee animation
    const marquees = document.querySelectorAll('.trust-bar__track');
    marquees.forEach(function(marquee) {
      marquee.style.animation = 'none';
    });
  }

  // Detect low-end mobile devices (optional)
  const isLowEndDevice = navigator.deviceMemory && navigator.deviceMemory < 4;
  
  if (isLowEndDevice) {
    // Simplify animations for low-end devices
    fadeElements.forEach(function(el) {
      el.style.transitionDuration = '0.4s'; // Faster animation
    });
  }

  /* ------------------------------------ */
  /* DEBUGGING (development only)        */
  /* ------------------------------------ */

  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1') {
    console.log('MorinVibes® animations.js v17 loaded');
    console.log('Mobile mode:', window.innerWidth < 768);
    console.log('Reduced motion:', prefersReducedMotion);
  }

})();
