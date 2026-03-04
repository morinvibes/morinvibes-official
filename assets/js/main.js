/**
 * MorinVibes® — Main JavaScript v8.0
 * ================================================================
 * Rebuilt for performance, elegance & delight.
 * Throttled scroll · RAF-based animations · WCAG 2.1 AA
 * Magnetic buttons · Custom cursor · Blur-up images
 * Brand: Farm-direct moringa · Penang, Malaysia · Since 2019
 * Founder: Jess
 * ================================================================
 */

(function () {
  'use strict';

  // ─────────────────────────────────────────────
  // UTILITIES
  // ─────────────────────────────────────────────

  /**
   * Throttle: fires at most once per `limit` ms using RAF.
   * Far smoother than setInterval-based throttles.
   */
  function throttle(fn, limit = 16) {
    let lastCall = 0;
    let rafId = null;
    return function (...args) {
      const now = performance.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => fn.apply(this, args));
      }
    };
  }

  /** Debounce: fires only after `wait` ms of silence. */
  function debounce(fn, wait = 200) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /**
   * Easing functions for manual animation curves.
   * All take t in [0,1] and return a value in [0,1].
   */
  const ease = {
    outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    outBack: (t) => {
      const c1 = 1.70158, c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
    inOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  /**
   * Animate a value from `from` to `to` over `duration` ms.
   * Calls `onUpdate(value)` each frame, `onComplete()` when done.
   */
  function animateValue(from, to, duration, easingFn, onUpdate, onComplete) {
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easingFn(progress);
      onUpdate(from + (to - from) * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (onComplete) onComplete();
      }
    }
    requestAnimationFrame(step);
  }

  /** Safe querySelector — returns null without throwing. */
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsAll = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /** Prefix for sessionStorage keys. */
  const SS = (key) => `mv8_${key}`;

  // ─────────────────────────────────────────────
  // 1. MOBILE MENU — with focus trap & ARIA
  // ─────────────────────────────────────────────
  function initMobileMenu() {
    const hamburger = qs('.nav__hamburger');
    const menu = qs('.nav__mobile');
    const closeBtn = qs('.nav__mobile-close');
    if (!hamburger || !menu) return;

    // Collect all focusable items inside the menu for trap
    const getFocusable = () =>
      qsAll('a, button, [tabindex]:not([tabindex="-1"])', menu).filter(
        (el) => !el.disabled && el.offsetParent !== null
      );

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      menu.classList.add('open');
      menu.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
      // Slight delay so CSS transition plays before focus moves
      setTimeout(() => {
        const focusable = getFocusable();
        if (focusable.length) focusable[0].focus();
      }, 80);
    }

    function closeMenu() {
      isOpen = false;
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      hamburger.focus();
    }

    hamburger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Backdrop click
    menu.addEventListener('click', (e) => {
      if (e.target === menu) closeMenu();
    });

    // ESC + focus trap
    document.addEventListener('keydown', (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    });
  }

  // ─────────────────────────────────────────────
  // 2. NAVBAR — scroll state + hide-on-scroll-down
  // ─────────────────────────────────────────────
  function initNavScroll() {
    const nav = qs('.nav');
    if (!nav) return;

    let lastY = 0;
    let ticking = false;

    function update() {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 20);
      // Hide navbar when scrolling down fast, reveal on scroll up
      if (y > 120) {
        nav.classList.toggle('nav--hidden', y > lastY + 4);
      } else {
        nav.classList.remove('nav--hidden');
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  // ─────────────────────────────────────────────
  // 3. SCROLL PROGRESS BAR
  // ─────────────────────────────────────────────
  function initProgressBar() {
    const bar = qs('#progressBar');
    if (!bar) return;

    function update() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
    }

    // Use transform instead of width — GPU composited, no layout cost
    bar.style.transformOrigin = 'left center';
    bar.style.willChange = 'transform';

    window.addEventListener('scroll', throttle(update), { passive: true });
    update();
  }

  // ─────────────────────────────────────────────
  // 4. SCROLL-TO-TOP BUTTON
  // ─────────────────────────────────────────────
  function initScrollTop() {
    const btn = qs('#scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', throttle(() => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }), { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─────────────────────────────────────────────
  // 5. LANGUAGE DROPDOWN — keyboard accessible
  // ─────────────────────────────────────────────
  function initLanguageDropdown() {
    qsAll('.lang-btn').forEach((btn) => {
      const dropdown = btn.nextElementSibling;
      if (!dropdown || !dropdown.classList.contains('lang-dropdown')) return;

      btn.setAttribute('aria-haspopup', 'listbox');
      btn.setAttribute('aria-expanded', 'false');

      function toggle(e) {
        e.stopPropagation();
        const open = dropdown.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      }

      btn.addEventListener('click', toggle);
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); }
        if (e.key === 'Escape') { dropdown.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
      });
    });

    document.addEventListener('click', () => {
      qsAll('.lang-dropdown').forEach((d) => d.classList.remove('open'));
      qsAll('.lang-btn').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    });
  }

  // ─────────────────────────────────────────────
  // 6. FADE-UP SCROLL ANIMATIONS — staggered
  // ─────────────────────────────────────────────
  function initScrollAnimations() {
    const elements = qsAll('.fade-up');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el, i) => {
      // Honour existing data-delay or auto-stagger siblings
      if (!el.style.transitionDelay && !el.dataset.delay) {
        const siblings = qsAll('.fade-up', el.parentElement);
        const idx = siblings.indexOf(el);
        if (idx > 0) el.style.transitionDelay = `${idx * 80}ms`;
      }
      observer.observe(el);
    });
  }

  // ─────────────────────────────────────────────
  // 7. COUNTER ANIMATION — smooth, eased, RAF-based
  // ─────────────────────────────────────────────
  function initCounters() {
    const counters = qsAll('.farm-stat__number, .product-svg-stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const raw = el.textContent.trim();
          const target = parseFloat(raw.replace(/[^0-9.]/g, ''));
          if (isNaN(target)) return;

          const suffix = raw.replace(/[\d.]/g, '');
          const isFloat = raw.includes('.');
          const decimals = isFloat ? (raw.split('.')[1] || '').length : 0;

          animateValue(0, target, 1600, ease.outExpo, (val) => {
            el.textContent = isFloat
              ? val.toFixed(decimals) + suffix
              : Math.round(val) + suffix;
          });

          observer.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((c) => observer.observe(c));
  }

  // ─────────────────────────────────────────────
  // 8. COMMUNITY POPUP — exit-intent + timer
  // ─────────────────────────────────────────────
  function initCommunityPopup() {
    const popup = qs('#communityPopup');
    if (!popup || sessionStorage.getItem(SS('popup'))) return;

    let shown = false;

    function showPopup() {
      if (shown) return;
      shown = true;
      popup.classList.add('show');
      popup.setAttribute('aria-hidden', 'false');
      sessionStorage.setItem(SS('popup'), '1');
      // Move focus inside popup for accessibility
      const firstFocusable = qs('button, a, input', popup);
      if (firstFocusable) setTimeout(() => firstFocusable.focus(), 300);
    }

    function hidePopup() {
      popup.classList.remove('show');
      popup.setAttribute('aria-hidden', 'true');
    }

    // Show after 30s
    const timer = setTimeout(showPopup, 30000);

    // Exit intent (desktop)
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 10) showPopup();
    }, { once: true });

    // Close via buttons
    qsAll('.popup-close, .popup-dismiss', popup).forEach((el) =>
      el.addEventListener('click', hidePopup)
    );

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popup.classList.contains('show')) hidePopup();
    });

    // Backdrop click
    popup.addEventListener('click', (e) => {
      if (e.target === popup) hidePopup();
    });

    // Clean up timer if popup shown early
    popup.addEventListener('show', () => clearTimeout(timer));
  }

  // ─────────────────────────────────────────────
  // 9. TRUST BAR — pause on hover / focus
  // ─────────────────────────────────────────────
  function initTrustBar() {
    const track = qs('.trust-bar__track');
    if (!track) return;

    const pause = () => (track.style.animationPlayState = 'paused');
    const play = () => (track.style.animationPlayState = 'running');

    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', play);
    track.addEventListener('focusin', pause);
    track.addEventListener('focusout', play);

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.style.animation = 'none';
    }
  }

  // ─────────────────────────────────────────────
  // 10. FAQ ACCORDION — smooth, one-open-at-a-time
  // ─────────────────────────────────────────────
  function initFaqAccordion() {
    const questions = qsAll('.faq-question');
    if (!questions.length) return;

    questions.forEach((question) => {
      const item = question.parentElement;
      const answer = qs('.faq-answer', item) || question.nextElementSibling;
      if (!answer) return;

      // Accessibility setup
      const id = `faq-${Math.random().toString(36).slice(2, 7)}`;
      answer.id = id;
      question.setAttribute('aria-controls', id);
      question.setAttribute('aria-expanded', 'false');
      question.setAttribute('role', 'button');
      question.setAttribute('tabindex', '0');

      function toggle() {
        const isOpen = item.classList.contains('open');

        // Close all others first
        questions.forEach((q) => {
          const otherItem = q.parentElement;
          const otherAnswer = qs('.faq-answer', otherItem) || q.nextElementSibling;
          if (otherItem !== item && otherItem.classList.contains('open')) {
            otherItem.classList.remove('open');
            q.setAttribute('aria-expanded', 'false');
            if (otherAnswer) otherAnswer.style.maxHeight = '0px';
          }
        });

        item.classList.toggle('open', !isOpen);
        question.setAttribute('aria-expanded', String(!isOpen));
        answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : '0px';
      }

      question.addEventListener('click', toggle);
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });
  }

  // ─────────────────────────────────────────────
  // 11. BUTTON RIPPLE — pointer-accurate
  // ─────────────────────────────────────────────
  function injectRippleStyles() {
    if (qs('#mv-ripple-styles')) return;
    const style = document.createElement('style');
    style.id = 'mv-ripple-styles';
    style.textContent = `
      .btn { position: relative; overflow: hidden; }
      .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        opacity: 0.45;
        animation: mv-ripple 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        pointer-events: none;
        background: rgba(255,255,255,0.6);
      }
      @keyframes mv-ripple {
        to { transform: scale(4); opacity: 0; }
      }
      /* Navbar hide animation */
      .nav { transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
      .nav--hidden { transform: translateY(-105%); }
    `;
    document.head.appendChild(style);
  }

  function initButtonRipple() {
    document.addEventListener('pointerdown', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.5;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
      btn.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    });
  }

  // ─────────────────────────────────────────────
  // 12 + 13. CARD HOVER — lift + 3-D tilt (desktop)
  // ─────────────────────────────────────────────
  function initCardInteractions() {
    const cards = qsAll('.benefit-card, .product-svg-card');
    const isDesktop = () => window.matchMedia('(hover: hover) and (min-width: 768px)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    cards.forEach((card) => {
      if (reduceMotion) return;

      card.addEventListener('mouseenter', () => {
        if (!isDesktop()) return;
        card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
        card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)';
      });

      card.addEventListener('mousemove', (e) => {
        if (!isDesktop()) return;
        const rect = card.getBoundingClientRect();
        const cx = rect.width / 2, cy = rect.height / 2;
        const x = e.clientX - rect.left - cx;
        const y = e.clientY - rect.top - cy;
        const rx = (y / cy) * 8;
        const ry = -(x / cx) * 8;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  // ─────────────────────────────────────────────
  // 14. LAZY LOADING — blur-up progressive reveal
  // ─────────────────────────────────────────────
  function initLazyLoading() {
    const images = qsAll('img[data-src]');
    if (!images.length) return;

    // Inject blur-up transition style once
    if (!qs('#mv-lazy-styles')) {
      const s = document.createElement('style');
      s.id = 'mv-lazy-styles';
      s.textContent = `
        img[data-src] { filter: blur(8px); transition: filter 0.6s ease; }
        img.loaded    { filter: blur(0); }
      `;
      document.head.appendChild(s);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const img = entry.target;
          const src = img.dataset.src;
          if (!src) return;

          const temp = new Image();
          temp.onload = () => {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          };
          temp.src = src;
          observer.unobserve(img);
        });
      },
      { rootMargin: '200px 0px' }
    );

    images.forEach((img) => observer.observe(img));
  }

  // ─────────────────────────────────────────────
  // 15. IMAGE HOVER ZOOM
  // ─────────────────────────────────────────────
  function initImageZoom() {
    qsAll('.img-zoom').forEach((container) => {
      const img = qs('img', container);
      if (!img) return;
      img.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      container.addEventListener('mouseenter', () => (img.style.transform = 'scale(1.07)'));
      container.addEventListener('mouseleave', () => (img.style.transform = 'scale(1)'));
    });
  }

  // ─────────────────────────────────────────────
  // 16. FOOTER SOCIAL ICONS
  // ─────────────────────────────────────────────
  function initSocialHover() {
    qsAll('.footer__social a').forEach((icon) => {
      icon.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
      icon.addEventListener('mouseenter', () => (icon.style.transform = 'translateY(-4px) scale(1.15)'));
      icon.addEventListener('mouseleave', () => (icon.style.transform = ''));
    });
  }

  // ─────────────────────────────────────────────
  // 17. WHATSAPP PULSE — CSS fallback ensured
  // ─────────────────────────────────────────────
  function initWhatsAppPulse() {
    const icon = qs('.whatsapp-icon');
    if (!icon) return;
    // Only set if not already defined by CSS
    const cs = getComputedStyle(icon);
    if (!cs.animationName || cs.animationName === 'none') {
      icon.style.animation = 'pulse-ring 2.5s ease infinite';
    }
  }

  // ─────────────────────────────────────────────
  // 18. PARALLAX HERO — GPU-safe, reduced-motion aware
  // ─────────────────────────────────────────────
  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const visual = qs('.hero__visual');
    if (!visual) return;

    visual.style.willChange = 'transform';

    window.addEventListener('scroll', throttle(() => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.5) {
        visual.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
      }
    }), { passive: true });
  }

  // ─────────────────────────────────────────────
  // 19. MAGNETIC BUTTONS (desktop) — premium feel
  // ─────────────────────────────────────────────
  function initMagneticButtons() {
    if (!window.matchMedia('(hover: hover) and (min-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    qsAll('.btn--magnetic, .btn--primary').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.35;
        const dy = (e.clientY - cy) * 0.35;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
        btn.style.transition = 'transform 0.15s ease';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    });
  }

  // ─────────────────────────────────────────────
  // 20. SMOOTH ANCHOR SCROLL — offsets for sticky nav
  // ─────────────────────────────────────────────
  function initSmoothScroll() {
    const nav = qs('.nav');
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });

      // Update URL hash without jump
      history.pushState(null, '', `#${targetId}`);
    });
  }

  // ─────────────────────────────────────────────
  // 21. TYPEWRITER EFFECT — hero headline (optional)
  // ─────────────────────────────────────────────
  function initTypewriter() {
    const el = qs('[data-typewriter]');
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const phrases = el.dataset.typewriter.split('|').map((s) => s.trim());
    if (phrases.length < 2) return;

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    const CURSOR = '<span class="tw-cursor" aria-hidden="true">|</span>';

    el.style.minHeight = '1.4em'; // prevent layout shift

    if (!qs('#mv-tw-styles')) {
      const s = document.createElement('style');
      s.id = 'mv-tw-styles';
      s.textContent = `.tw-cursor { opacity: 1; animation: tw-blink 0.75s step-end infinite; }
        @keyframes tw-blink { 50% { opacity: 0; } }`;
      document.head.appendChild(s);
    }

    function tick() {
      const phrase = phrases[phraseIdx];
      const displayed = phrase.slice(0, charIdx);
      el.innerHTML = displayed + CURSOR;

      let delay = deleting ? 60 : 110;

      if (!deleting && charIdx === phrase.length) {
        delay = 2000; // pause at full word
        deleting = true;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 400;
      } else {
        charIdx += deleting ? -1 : 1;
      }

      setTimeout(tick, delay);
    }

    charIdx = phrases[0].length;
    deleting = true;
    tick();
  }

  // ─────────────────────────────────────────────
  // BONUS: SECTION HIGHLIGHT — active nav link
  // ─────────────────────────────────────────────
  function initActiveNavLinks() {
    const navLinks = qsAll('.nav__link[href^="#"], .nav__mobile a[href^="#"]');
    if (!navLinks.length) return;

    const sections = navLinks
      .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -50% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
  }

  // ─────────────────────────────────────────────
  // COPYRIGHT YEAR
  // ─────────────────────────────────────────────
  function updateCopyrightYear() {
    const year = new Date().getFullYear();
    qsAll('.current-year').forEach((el) => (el.textContent = year));
  }

  // ─────────────────────────────────────────────
  // PERFORMANCE: Defer non-critical inits after paint
  // ─────────────────────────────────────────────
  function deferInit() {
    // Critical: run immediately
    injectRippleStyles();
    initMobileMenu();
    initNavScroll();
    initProgressBar();
    initScrollTop();
    initButtonRipple();
    updateCopyrightYear();

    // Non-critical: wait for idle time
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
    idle(() => {
      initLanguageDropdown();
      initScrollAnimations();
      initCounters();
      initCommunityPopup();
      initTrustBar();
      initFaqAccordion();
      initCardInteractions();
      initLazyLoading();
      initImageZoom();
      initSocialHover();
      initWhatsAppPulse();
      initParallax();
      initMagneticButtons();
      initSmoothScroll();
      initTypewriter();
      initActiveNavLinks();
      console.log('%c✅ MorinVibes® v8.0 — All systems go', 'color:#2E7D32;font-weight:bold;');
    });
  }

  // ─────────────────────────────────────────────
  // BOOT
  // ─────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', deferInit);
  } else {
    deferInit();
  }

})();
