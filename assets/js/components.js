'use strict';

/* ═══════════════════════════════════════════════════════════════
   MORINVIBES® — components.js
   NAV_HTML + FOOTER_HTML templates
   injectComponents() — single call injects both into every page
   ═══════════════════════════════════════════════════════════════ */

/* ─── NAV HTML TEMPLATE ─── */
var NAV_HTML = `
<nav class="nav" id="mainNav" role="navigation" aria-label="Main navigation">
  <div class="nav__inner">

    <!-- Hamburger — always visible (even on desktop) -->
    <button
      class="nav__hamburger"
      id="navHamburger"
      aria-label="Open menu"
      aria-expanded="false"
      aria-controls="mobileMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Logo — absolutely centred -->
    <a href="/morinvibes-official/en/index.html" class="nav__logo" aria-label="MorinVibes home">
      <img
        src="/morinvibes-official/images/logo-full.svg"
        alt="MorinVibes®"
        width="140"
        height="32"
      >
    </a>

    <!-- Right group — language dropdown + Order Now -->
    <div class="nav__right">

      <!-- Language dropdown -->
      <div class="lang-drop" id="langDrop">
        <button
          class="lang-drop__trigger"
          id="langTrigger"
          aria-haspopup="true"
          aria-expanded="false"
          aria-label="Select language"
        >
          EN <span class="lang-drop__arrow" aria-hidden="true">▾</span>
        </button>
        <div class="lang-drop__menu" id="langMenu" role="menu">
          <a href="/morinvibes-official/en/index.html" class="lang-drop__item active" role="menuitem" hreflang="en">English</a>
          <a href="/morinvibes-official/bm/index.html" class="lang-drop__item" role="menuitem" hreflang="ms">Bahasa Malaysia</a>
          <a href="/morinvibes-official/zh/index.html" class="lang-drop__item" role="menuitem" hreflang="zh">中文</a>
        </div>
      </div>

      <!-- Order Now CTA -->
      <button
        class="btn btn--primary btn--sm nav__order-btn"
        onclick="openCheckout()"
        aria-label="Order MorinVibes"
      >
        Order Now
      </button>

    </div>
  </div>
</nav>

<!-- ─── MOBILE MENU — SPLIT PANEL ─── -->
<div
  class="m-menu"
  id="mobileMenu"
  role="dialog"
  aria-modal="true"
  aria-label="Navigation menu"
  aria-hidden="true"
>

  <!-- LEFT PANEL — nav links -->
  <div class="m-menu__left">
    <button
      class="m-menu__close"
      id="menuClose"
      aria-label="Close menu"
    >✕</button>

    <a href="/morinvibes-official/en/index.html" class="m-menu__logo" aria-label="MorinVibes home">
      <img
        src="/morinvibes-official/images/logo-full.svg"
        alt="MorinVibes®"
        width="120"
        height="28"
      >
    </a>

    <!-- Language switcher -->
    <div class="m-menu__lang">
      <a href="/morinvibes-official/en/index.html" class="active" hreflang="en">EN</a>
      <span aria-hidden="true">|</span>
      <a href="/morinvibes-official/bm/index.html" hreflang="ms">BM</a>
      <span aria-hidden="true">|</span>
      <a href="/morinvibes-official/zh/index.html" hreflang="zh">中文</a>
    </div>

    <!-- Nav links -->
    <nav class="m-menu__links" aria-label="Site pages">
      <a href="/morinvibes-official/en/our-farm.html"          class="m-menu__link nav__link">Our Farm</a>
      <a href="/morinvibes-official/en/quality-and-safety.html" class="m-menu__link nav__link">Quality &amp; Safety</a>
      <a href="/morinvibes-official/en/wellness-journal.html"   class="m-menu__link nav__link">Wellness Journal</a>
      <a href="/morinvibes-official/en/the-product.html"        class="m-menu__link nav__link">The Product</a>
      <a href="/morinvibes-official/en/about-us.html"           class="m-menu__link nav__link">About Us</a>
      <a href="/morinvibes-official/en/reviews.html"            class="m-menu__link nav__link">Reviews</a>
      <a href="/morinvibes-official/en/faq.html"                class="m-menu__link nav__link">FAQ</a>
    </nav>
  </div>

  <!-- RIGHT PANEL — product highlight -->
  <div class="m-menu__right" aria-hidden="true">
    <img
      src="/morinvibes-official/images/bottle-new.svg"
      alt="MorinVibes® Moringa Capsules"
      class="m-menu__bottle"
      loading="lazy"
    >
    <p class="m-menu__price">RM89</p>
    <p class="m-menu__sub">90 capsules · 500mg</p>
    <div class="m-menu__cta-group">
      <button
        class="btn btn--primary btn--full"
        onclick="openCheckout(); closeMenu();"
        aria-label="Order MorinVibes for RM89"
      >
        Order Now
      </button>
      <a
        href="https://wa.me/60[NUMBER]?text=Hi%2C%20I%27m%20interested%20in%20MorinVibes%C2%AE"
        class="btn btn--outline btn--full"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        WhatsApp Us
      </a>
    </div>
  </div>

</div>
`;

/* ─── FOOTER HTML TEMPLATE ─── */
var FOOTER_HTML = `
<footer class="footer" role="contentinfo">
  <div class="container">

    <div class="footer__grid">

      <!-- Col 1 — Logo + tagline + cert badges -->
      <div class="footer__col footer__col-logo">
        <img
          src="/morinvibes-official/images/logo-full.svg"
          alt="MorinVibes®"
          width="150"
          height="36"
          loading="lazy"
        >
        <p class="footer__tagline">
          Farm-direct moringa capsules from Bayan Lepas, Penang.
          Small-batch. KKM approved. GMP certified. Trusted since 2019.
        </p>
        <div class="footer__certs">
          <span class="footer__cert-badge">KKM Approved</span>
          <span class="footer__cert-badge">GMP Certified</span>
          <span class="footer__cert-badge">Since 2019</span>
        </div>
      </div>

      <!-- Col 2 — Explore -->
      <div class="footer__col">
        <p class="footer__heading">Explore</p>
        <nav class="footer__links" aria-label="Explore pages">
          <a href="/morinvibes-official/en/our-farm.html"          class="footer__link">Our Farm</a>
          <a href="/morinvibes-official/en/quality-and-safety.html" class="footer__link">Quality &amp; Safety</a>
          <a href="/morinvibes-official/en/wellness-journal.html"   class="footer__link">Wellness Journal</a>
          <a href="/morinvibes-official/en/the-product.html"        class="footer__link">The Product</a>
          <a href="/morinvibes-official/en/about-us.html"           class="footer__link">About Us</a>
          <a href="/morinvibes-official/en/reviews.html"            class="footer__link">Reviews</a>
          <a href="/morinvibes-official/en/faq.html"                class="footer__link">FAQ</a>
        </nav>
      </div>

      <!-- Col 3 — Legal -->
      <div class="footer__col">
        <p class="footer__heading">Legal</p>
        <nav class="footer__links" aria-label="Legal pages">
          <a href="/morinvibes-official/en/privacy.html"  class="footer__link">Privacy Policy</a>
          <a href="/morinvibes-official/en/terms.html"    class="footer__link">Terms of Service</a>
          <a href="/morinvibes-official/en/returns.html"  class="footer__link">Returns Policy</a>
          <a href="/morinvibes-official/en/ethics.html"   class="footer__link">Our Ethics</a>
        </nav>
      </div>

      <!-- Col 4 — Connect -->
      <div class="footer__col">
        <p class="footer__heading">Connect</p>

        <div class="footer__social">
          <a
            href="[INSTAGRAM_URL]"
            class="footer__social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MorinVibes on Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a
            href="[FACEBOOK_URL]"
            class="footer__social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MorinVibes on Facebook"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="[TIKTOK_URL]"
            class="footer__social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MorinVibes on TikTok"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </a>
        </div>

        <a
          href="https://wa.me/60[NUMBER]?text=Hi%2C%20I%27m%20interested%20in%20MorinVibes%C2%AE"
          class="footer__wa-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Chat on WhatsApp
        </a>

        <p class="footer__location">
          Bayan Lepas, Penang,<br>Malaysia
        </p>
      </div>

    </div><!-- /.footer__grid -->

    <!-- Bottom bar -->
    <div class="footer__bar">
      <div class="footer__bar-inner">

        <p class="footer__disclaimer">
          MorinVibes® moringa capsules are a food supplement registered with the Ministry of Health Malaysia.
          KKM registration: [KKM_NUMBER]. These statements have not been evaluated by the Ministry of Health Malaysia.
          This product is not intended to diagnose, treat, cure, or prevent any disease.
          Individual results vary. Consult your healthcare provider before use if you are pregnant,
          breastfeeding, or under medical supervision.
        </p>

        <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;">
          <p class="footer__copy">© 2024 MorinVibes® All rights reserved</p>

          <div class="footer__legal-links">
            <a href="/morinvibes-official/en/privacy.html" class="footer__legal-link">Privacy</a>
            <a href="/morinvibes-official/en/terms.html"   class="footer__legal-link">Terms</a>
            <a href="/morinvibes-official/en/returns.html" class="footer__legal-link">Returns</a>
          </div>

          <div class="footer__lang-sw">
            <a href="/morinvibes-official/en/index.html" class="active" hreflang="en">EN</a>
            <span aria-hidden="true">|</span>
            <a href="/morinvibes-official/bm/index.html" hreflang="ms">BM</a>
            <span aria-hidden="true">|</span>
            <a href="/morinvibes-official/zh/index.html" hreflang="zh">中文</a>
          </div>
        </div>

      </div>
    </div><!-- /.footer__bar -->

  </div>
</footer>
`;

/* ─── INJECT COMPONENTS ─── */
function injectComponents() {

  // Inject nav
  var navEl = document.getElementById('nav-placeholder');
  if (navEl) {
    navEl.innerHTML = NAV_HTML;
  }

  // Inject footer
  var footerEl = document.getElementById('footer-placeholder');
  if (footerEl) {
    footerEl.innerHTML = FOOTER_HTML;
  }

  // Mark active nav link based on current URL
  var path = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href && path.includes(href) && href !== '/morinvibes-official/en/index.html') {
      link.classList.add('active');
    }
  });

  // Mark active language in dropdown
  var langItems = document.querySelectorAll('.lang-drop__item');
  langItems.forEach(function(item) {
    var href = item.getAttribute('href') || '';
    if (path.includes('/en/') && href.includes('/en/')) {
      item.classList.add('active');
      var trigger = document.getElementById('langTrigger');
      if (trigger) trigger.childNodes[0].textContent = 'EN ';
    } else if (path.includes('/bm/') && href.includes('/bm/')) {
      item.classList.add('active');
      var trigger = document.getElementById('langTrigger');
      if (trigger) trigger.childNodes[0].textContent = 'BM ';
    } else if (path.includes('/zh/') && href.includes('/zh/')) {
      item.classList.add('active');
      var trigger = document.getElementById('langTrigger');
      if (trigger) trigger.childNodes[0].textContent = '中文 ';
    }
  });

  // Init language dropdown toggle
  initLangDrop();
}

/* ─── LANGUAGE DROPDOWN INIT ─── */
function initLangDrop() {
  var drop = document.getElementById('langDrop');
  var trigger = document.getElementById('langTrigger');
  var menu = document.getElementById('langMenu');

  if (!drop || !trigger || !menu) return;

  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    var isOpen = drop.classList.toggle('open');
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', function() {
    drop.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  });

  menu.addEventListener('click', function(e) {
    e.stopPropagation();
  });
}

/* ─── RUN ON DOM READY ─── */
document.addEventListener('DOMContentLoaded', injectComponents);
