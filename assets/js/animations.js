/* ===== MORINVIBES® — ANIMATIONS.JS ===== */
/* Version: 16.0 · March 2026 */
/* External JS — Scroll-based animations, counters, IntersectionObserver */
/* Path: /morinvibes-official/assets/js/animations.js */

(function() {
  'use strict';

  /* ------------------------------------ */
  /* FADE ANIMATIONS — IntersectionObserver */
  /* ------------------------------------ */

  // Select all elements with fade classes
  const fadeElements = document.querySelectorAll(
    '.fade-up, .fade-left, .fade-right, .fade-in'
  );

  if (fadeElements.length > 0) {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
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
          threshold: 0.08,
          rootMargin: '0px 0px -36px 0px', // Trigger slightly before element enters viewport
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
  /* COUNTER ANIMATION — Stats numbers    */
  /* ------------------------------------ */

  const countElements = document.querySelectorAll('[data-count]');
  let counted = false;

  if (countElements.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      function(entries) {
        // Check if any stats section is visible
        const shouldCount = entries.some(function(entry) {
          return entry.isIntersecting;
        });

        if (shouldCount && !counted) {
          counted = true;
          
          // Animate each counter
          countElements.forEach(function(el) {
            const targetValue = parseInt(el.dataset.count, 10);
            if (!isNaN(targetValue)) {
              animateCounter(el, targetValue);
            }
          });

          // Unobserve all stats elements after animation starts
          entries.forEach(function(entry) {
            if (entry.target.classList.contains('soc-stats') || 
                entry.target.classList.contains('soc-stat')) {
              counterObserver.unobserve(entry.target);
            }
          });
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px'
      }
    );

    // Observe the stats container and individual stat elements
    const statsContainer = document.querySelector('.soc-stats');
    if (statsContainer) {
      counterObserver.observe(statsContainer);
    } else {
      // Fallback: observe each stat element individually
      countElements.forEach(function(el) {
        counterObserver.observe(el);
      });
    }
  }

  /**
   * Animate a counter from 0 to target value
   * @param {HTMLElement} element - The element to update
   * @param {number} target - Target value
   */
  function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const isLargeNumber = target >= 1000;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: cubic-out (slow then fast then slow at end)
      // Using 1 - (1 - t)^3 for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * target);
      
      // Format number with commas for thousands
      if (isLargeNumber) {
        element.textContent = currentValue.toLocaleString() + '+';
      } else {
        element.textContent = currentValue + '+';
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure final value is exact
        if (isLargeNumber) {
          element.textContent = target.toLocaleString() + '+';
        } else {
          element.textContent = target + '+';
        }
      }
    }

    // Start animation
    requestAnimationFrame(updateCounter);
  }

  /* ------------------------------------ */
  /* STAGGERED CARD REVEALS               */
  /* ------------------------------------ */

  // This works in conjunction with fade animations
  // data-delay attributes are already applied in HTML
  // No additional code needed, but we ensure they work with IntersectionObserver

  // Log that animations.js is loaded (for debugging)
  console.log('MorinVibes® animations.js loaded');
})();
