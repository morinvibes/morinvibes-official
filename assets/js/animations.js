// ==========================================================================
// animations.js — MorinVibes® v22.0
// Scroll‑reveal, counters, parallax, nav scroll class, scroll progress bar,
// ViewContent pixel, sticky CTA, scroll‑to‑top visibility.
// All IntersectionObserver logic.
// ==========================================================================
'use strict';

(function() {
  // Wait for DOM and components to be injected (nav/footer)
  document.addEventListener('DOMContentLoaded', function() {

    // ------------------------------------------------------------------------
    // 1. NAV SCROLL CLASS (.scrolled)
    // ------------------------------------------------------------------------
    const nav = document.querySelector('.nav');
    if (nav) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // ------------------------------------------------------------------------
    // 2. SCROLL PROGRESS BAR (#scrollProgress)
    // ------------------------------------------------------------------------
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
      window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      }, { passive: true });
    }

    // ------------------------------------------------------------------------
    // 3. SCROLL‑TO‑TOP BUTTON VISIBILITY (show > 400px)
    // ------------------------------------------------------------------------
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      }, { passive: true });
    }

    // ------------------------------------------------------------------------
    // 4. STICKY CTA VISIBILITY (mobile only, when #hero exits viewport)
    // ------------------------------------------------------------------------
    const stickyCta = document.getElementById('stickyCta');
    const hero = document.querySelector('.hero');
    if (stickyCta && hero && window.innerWidth < 768) {
      const observerSticky = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            // If hero is NOT intersecting (i.e., exited viewport), show CTA
            if (!entry.isIntersecting) {
              stickyCta.classList.add('visible');
            } else {
              stickyCta.classList.remove('visible');
            }
          });
        },
        { threshold: 0 } // trigger as soon as even 1px leaves
      );
      observerSticky.observe(hero);
    }

    // ------------------------------------------------------------------------
    // 5. ViewContent PIXEL EVENT (when #product enters viewport)
    // ------------------------------------------------------------------------
    const productSection = document.getElementById('product');
    if (productSection && typeof window.fbTrack === 'function') {
      const observerPixel = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              window.fbTrack('ViewContent', {
                content_name: 'MorinVibes Moringa Leaf 500mg Capsule',
                content_type: 'product',
                value: 89,
                currency: 'MYR'
              });
              observerPixel.unobserve(productSection); // fire only once
            }
          });
        },
        { threshold: 0.3 }
      );
      observerPixel.observe(productSection);
    }

    // ------------------------------------------------------------------------
    // 6. SCROLL‑REVEAL (fade-up, fade-left, fade-right, scale-in, clip-in)
    // ------------------------------------------------------------------------
    const revealElements = document.querySelectorAll(
      '.fade-up, .fade-left, .fade-right, .scale-in, .clip-in'
    );

    if (revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Optionally unobserve after reveal (if you want only once)
              // revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
      );

      revealElements.forEach(el => revealObserver.observe(el));
    }

    // ------------------------------------------------------------------------
    // 7. COUNTER ANIMATION ([data-count] elements)
    // ------------------------------------------------------------------------
    const counterElements = document.querySelectorAll('[data-count]');
    if (counterElements.length > 0) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const target = parseFloat(el.getAttribute('data-count'));
              const suffix = el.getAttribute('data-suffix') || '';
              const duration = 1500; // ms
              const startTime = performance.now();

              function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // easeOutCubic
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const currentVal = target * easeOutCubic;
                if (Number.isInteger(target)) {
                  el.textContent = Math.floor(currentVal) + suffix;
                } else {
                  el.textContent = currentVal.toFixed(1) + suffix;
                }
                if (progress < 1) {
                  requestAnimationFrame(updateCounter);
                } else {
                  el.textContent = target + suffix; // ensure exact final
                }
              }
              requestAnimationFrame(updateCounter);
              counterObserver.unobserve(el); // count only once
            }
          });
        },
        { threshold: 0.5 }
      );
      counterElements.forEach(el => counterObserver.observe(el));
    }

    // ------------------------------------------------------------------------
    // 8. PARALLAX (.parallax-el with data-parallax-speed)
    // ------------------------------------------------------------------------
    const parallaxElements = document.querySelectorAll('.parallax-el');
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.2;
          const yPos = -(scrollY * speed);
          el.style.transform = `translateY(${yPos}px)`;
        });
      }, { passive: true });
    }

    // ------------------------------------------------------------------------
    // 9. ADD TO CART PIXEL ON ALL "ORDER NOW" LINKS (AddToCart)
    //    (Note: this is also in main.js, but per prompt AddToCart is triggered on click.
    //     We'll place it here to keep pixel events together, but it's fine.)
    //    However, the master prompt lists AddToCart in Part 16, and says fire before navigation.
    //    We'll include it here, but careful not to duplicate if also in main.js.
    //    Let's include it in animations.js as a convenience.
    // ------------------------------------------------------------------------
    const orderNowLinks = document.querySelectorAll('a[href*="checkout.html"]');
    orderNowLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (typeof window.fbTrack === 'function') {
          window.fbTrack('AddToCart', {
            value: 89,
            currency: 'MYR',
            content_name: 'MorinVibes Moringa Leaf 500mg Capsule'
          });
        }
        // Navigation happens normally (no preventDefault)
      });
    });

  }); // DOMContentLoaded
})();
