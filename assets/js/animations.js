/* ═══════════════════════════════════════════════════════════
   MORINVIBES® — animations.js
   Scroll-Reveal · Scroll-Top Visibility · Nav Scroll ·
   Counter Animation · Parallax Leaves
   v1.0 · March 2026
═══════════════════════════════════════════════════════════ */
'use strict';

document.addEventListener('DOMContentLoaded', function() {

  /* ═══════════════════════════════════════
     SCROLL-REVEAL (IntersectionObserver)
  ═══════════════════════════════════════ */
  var revealClasses = ['.fade-up', '.fade-left', '.fade-right', '.scale-in', '.clip-in'];
  var revealEls = document.querySelectorAll(revealClasses.join(','));

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function(el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback for browsers without IntersectionObserver */
    revealEls.forEach(function(el) {
      el.classList.add('visible');
    });
  }


  /* ═══════════════════════════════════════
     SCROLL-TO-TOP VISIBILITY
  ═══════════════════════════════════════ */
  var scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    var scrollTopHandler = function() {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', scrollTopHandler, { passive: true });
    /* Run once on load in case page is already scrolled */
    scrollTopHandler();
  }


  /* ═══════════════════════════════════════
     NAV: SHRINK + SHADOW ON SCROLL
  ═══════════════════════════════════════ */
  var nav = document.getElementById('mainNav');

  if (nav) {
    var navScrollHandler = function() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', navScrollHandler, { passive: true });
    navScrollHandler();
  }


  /* ═══════════════════════════════════════
     MOBILE STICKY CTA — show after hero exits
  ═══════════════════════════════════════ */
  var stickyCta = document.getElementById('stickyCta');
  var heroSection = document.getElementById('hero');

  if (stickyCta && heroSection && 'IntersectionObserver' in window) {
    /* Only on mobile — CSS hides on desktop */
    var heroObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) {
          stickyCta.classList.add('visible');
          stickyCta.setAttribute('aria-hidden', 'false');
        } else {
          stickyCta.classList.remove('visible');
          stickyCta.setAttribute('aria-hidden', 'true');
        }
      });
    }, { threshold: 0 });

    heroObserver.observe(heroSection);
  }


  /* ═══════════════════════════════════════
     COUNTER ANIMATION
     Usage: <span class="count-up" data-target="1000" data-suffix="+">0</span>
  ═══════════════════════════════════════ */
  var counters = document.querySelectorAll('.count-up');

  if (counters.length > 0 && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
      counterObserver.observe(counter);
    });
  }

  function animateCounter(el) {
    var target  = parseInt(el.dataset.target, 10) || 0;
    var suffix  = el.dataset.suffix || '';
    var prefix  = el.dataset.prefix || '';
    var duration= 1600; /* ms */
    var start   = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      /* Ease out cubic */
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }
    requestAnimationFrame(step);
  }


  /* ═══════════════════════════════════════
     PARALLAX — HERO LEAVES
     Uses requestAnimationFrame + scroll
  ═══════════════════════════════════════ */
  var parallaxEls = document.querySelectorAll('.parallax-el');
  var ticking = false;

  if (parallaxEls.length > 0) {
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var scrollY = window.scrollY;
          parallaxEls.forEach(function(el) {
            var speed = parseFloat(el.dataset.parallax) || 0.15;
            el.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  /* ═══════════════════════════════════════
     HERO BOTTLE 3D TILT (subtle)
  ═══════════════════════════════════════ */
  var heroBottle = document.getElementById('heroBottle');

  if (heroBottle) {
    var heroVisual = heroBottle.closest('.hero__visual');
    if (heroVisual) {
      heroVisual.addEventListener('mousemove', function(e) {
        var rect = heroVisual.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top  + rect.height / 2;
        var rotX = ((e.clientY - centerY) / rect.height) * -10;
        var rotY = ((e.clientX - centerX) / rect.width)  *  10;
        heroBottle.style.transform =
          'translateY(var(--float-offset, 0px)) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
      });
      heroVisual.addEventListener('mouseleave', function() {
        heroBottle.style.transform = '';
      });
    }
  }


  /* ═══════════════════════════════════════
     FAQ — ANIMATE SCROLL HIGHLIGHT
     Highlights the currently open FAQ item
     with a subtle border glow after opening
  ═══════════════════════════════════════ */
  /* (Actual FAQ open/close logic is in main.js) */


  /* ═══════════════════════════════════════
     COMPARISON TABLE — STAGGERED ROW REVEAL
  ═══════════════════════════════════════ */
  var compareTable = document.querySelector('.compare-table');
  if (compareTable && 'IntersectionObserver' in window) {
    var tableObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var rows = entry.target.querySelectorAll('tbody tr');
          rows.forEach(function(row, i) {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-12px)';
            row.style.transition = 'opacity .45s ease, transform .45s ease';
            row.style.transitionDelay = (i * 0.09) + 's';
            /* Trigger reflow */
            row.getBoundingClientRect();
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
          });
          tableObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    tableObserver.observe(compareTable);
  }


  /* ═══════════════════════════════════════
     BENEFIT CARDS — stagger already handled
     by data-delay in scroll-reveal above.
     This adds a hover glow effect via JS
     for browsers that don't support :has()
  ═══════════════════════════════════════ */
  var benefitCards = document.querySelectorAll('.benefit-card');
  benefitCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      benefitCards.forEach(function(other) {
        if (other !== card) {
          other.style.opacity = '.72';
        }
      });
    });
    card.addEventListener('mouseleave', function() {
      benefitCards.forEach(function(other) {
        other.style.opacity = '';
      });
    });
  });


  /* ═══════════════════════════════════════
     JOURNEY TIMELINE — animate line draw
  ═══════════════════════════════════════ */
  var timeline = document.querySelector('.journey__timeline');
  if (timeline && 'IntersectionObserver' in window) {
    var timelineObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('timeline-animated');
          /* Animate the ::before line via a custom property trick */
          var pseudoStyle = document.getElementById('timeline-anim-style');
          if (!pseudoStyle) {
            var s = document.createElement('style');
            s.id = 'timeline-anim-style';
            s.textContent = '.timeline-animated::before { animation: timeline-grow 1.2s ease forwards; }';
            document.head.appendChild(s);
          }
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    timelineObserver.observe(timeline);
  }

}); /* end DOMContentLoaded */
