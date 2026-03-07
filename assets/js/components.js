/* ═══════════════════════════════════════════════════════════
   MORINVIBES® — components.js
   NAV_HTML · FOOTER_HTML · injectComponents()
   Single source of truth for shared UI
   v1.0 · March 2026
═══════════════════════════════════════════════════════════ */
'use strict';

/* ═══════════════════════════════════════
   NAV HTML
═══════════════════════════════════════ */
var NAV_HTML = `
<nav class="nav" id="mainNav" role="navigation" aria-label="Main navigation">
  <div class="nav__inner">

    <!-- Logo -->
    <a class="nav__logo" href="/morinvibes-official/en/index.html" aria-label="MorinVibes® Home">
      <img src="/morinvibes-official/images/logo-full.svg"
           alt="MorinVibes® — Farm-Direct Moringa, Penang"
           width="160" height="34">
    </a>

    <!-- Desktop links -->
    <ul class="nav__links" role="list">
      <li><a class="nav__link" href="/morinvibes-official/en/our-farm.html">Our Farm</a></li>
      <li><a class="nav__link" href="/morinvibes-official/en/quality-and-safety.html">Quality &amp; Safety</a></li>
      <li><a class="nav__link" href="/morinvibes-official/en/the-product.html">The Product</a></li>
      <li><a class="nav__link" href="/morinvibes-official/en/about-us.html">About Us</a></li>
      <li><a class="nav__link" href="/morinvibes-official/en/reviews.html">Reviews</a></li>
      <li><a class="nav__link" href="/morinvibes-official/en/faq.html">FAQ</a></li>
    </ul>

    <!-- Desktop actions -->
    <div class="nav__actions">
      <button class="nav__lang" id="navLangBtn" aria-label="Change language" aria-expanded="false">
        EN
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <a class="btn btn--primary btn--sm nav__order"
         href="/morinvibes-official/en/checkout.html">
        Order Now
      </a>
      <!-- Hamburger -->
      <button class="nav__burger" id="navBurger" aria-label="Open menu" aria-expanded="false" aria-controls="navDrawer">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

  </div>
</nav>

<!-- Mobile drawer -->
<div class="nav__drawer" id="navDrawer" role="dialog" aria-modal="true" aria-label="Navigation menu" aria-hidden="true">
  <button class="nav__drawer-close" id="navDrawerClose" aria-label="Close menu">✕</button>
  <nav class="nav__drawer-links" aria-label="Mobile navigation">
    <a class="nav__drawer-link" href="/morinvibes-official/en/index.html">Home</a>
    <a class="nav__drawer-link" href="/morinvibes-official/en/our-farm.html">Our Farm</a>
    <a class="nav__drawer-link" href="/morinvibes-official/en/quality-and-safety.html">Quality &amp; Safety</a>
    <a class="nav__drawer-link" href="/morinvibes-official/en/the-product.html">The Product</a>
    <a class="nav__drawer-link" href="/morinvibes-official/en/about-us.html">About Us</a>
    <a class="nav__drawer-link" href="/morinvibes-official/en/reviews.html">Reviews</a>
    <a class="nav__drawer-link" href="/morinvibes-official/en/faq.html">FAQ</a>
  </nav>
  <div class="nav__drawer-cta">
    <a class="btn btn--primary btn--full btn--lg"
       href="/morinvibes-official/en/checkout.html">
      Order Now — RM89
    </a>
  </div>
</div>

<!-- Drawer overlay -->
<div class="nav__overlay" id="navOverlay" aria-hidden="true"></div>
`;


/* ═══════════════════════════════════════
   FOOTER HTML
═══════════════════════════════════════ */
var FOOTER_HTML = `
<footer class="footer" role="contentinfo">

  <div class="footer__top">
    <div class="footer__grid">

      <!-- Col 1: Brand -->
      <div class="footer__col">
        <div class="footer__logo">
          <img src="/morinvibes-official/images/logo-full.svg"
               alt="MorinVibes® — Farm-Direct Moringa, Penang"
               width="140" height="30">
        </div>
        <p class="footer__tagline">
          Farm-direct moringa capsules from Bayan Lepas, Penang.
          Small-batch. KKM registered. GMP certified.
        </p>
        <div class="footer__certs">
          <span class="footer__cert">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            KKM Traditional Medicine
          </span>
          <span class="footer__cert">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            GMP Certified
          </span>
          <span class="footer__cert">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Since 2019
          </span>
        </div>
      </div>

      <!-- Col 2: Explore -->
      <div class="footer__col">
        <h3 class="footer__col-title">Explore</h3>
        <ul class="footer__col-links" role="list">
          <li><a class="footer__col-link" href="/morinvibes-official/en/our-farm.html">Our Farm</a></li>
          <li><a class="footer__col-link" href="/morinvibes-official/en/quality-and-safety.html">Quality &amp; Safety</a></li>
          <li><a class="footer__col-link" href="/morinvibes-official/en/wellness-journal.html">Wellness Journal</a></li>
          <li><a class="footer__col-link" href="/morinvibes-official/en/the-product.html">The Product</a></li>
          <li><a class="footer__col-link" href="/morinvibes-official/en/about-us.html">About Us</a></li>
          <li><a class="footer__col-link" href="/morinvibes-official/en/reviews.html">Reviews</a></li>
          <li><a class="footer__col-link" href="/morinvibes-official/en/faq.html">FAQ</a></li>
        </ul>
      </div>

      <!-- Col 3: Legal -->
      <div class="footer__col">
        <h3 class="footer__col-title">Legal</h3>
        <ul class="footer__col-links" role="list">
          <li><a class="footer__col-link" href="/morinvibes-official/en/privacy.html">Privacy Policy</a></li>
          <li><a class="footer__col-link" href="/morinvibes-official/en/terms.html">Terms of Service</a></li>
          <li><a class="footer__col-link" href="/morinvibes-official/en/returns.html">Returns Policy</a></li>
          <li><a class="footer__col-link" href="/morinvibes-official/en/ethics.html">Our Ethics</a></li>
        </ul>
      </div>

      <!-- Col 4: Connect -->
      <div class="footer__col">
        <h3 class="footer__col-title">Connect</h3>
        <div class="footer__socials">
          <a class="footer__social"
             href="https://www.instagram.com/moringa_morinvibes/"
             target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a class="footer__social"
             href="https://www.threads.net/@moringa_morinvibes"
             target="_blank" rel="noopener noreferrer" aria-label="Threads">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-.505-1.808-1.316-3.233-2.456-4.154-1.232-1-2.743-1.518-4.502-1.53h-.012c-2.975.02-5.115.918-6.362 2.67-1.177 1.656-1.777 4.057-1.802 7.137.024 3.08.625 5.48 1.802 7.137 1.247 1.752 3.387 2.65 6.362 2.67h.012c1.976-.018 3.357-.564 4.258-1.665.85-1.032 1.327-2.61 1.42-4.697h-5.69v-2.04h7.738v.96c-.083 2.976-.783 5.318-2.07 6.931-1.408 1.767-3.564 2.672-6.41 2.672z"/>
            </svg>
          </a>
          <a class="footer__social"
             href="[FACEBOOK_URL]"
             target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a class="footer__social"
             href="[TIKTOK_URL]"
             target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </a>
          <a class="footer__social"
             href="https://wa.me/60102766095"
             target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>

        <div class="footer__shops">
          <a class="footer__shop" href="[SHOPEE_URL]" target="_blank" rel="noopener noreferrer">🛒 Shopee</a>
          <a class="footer__shop" href="[LAZADA_URL]" target="_blank" rel="noopener noreferrer">🛍️ Lazada</a>
        </div>

        <p class="footer__location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          Bayan Lepas, Penang, Malaysia
        </p>
      </div>

    </div>
  </div>

  <!-- Bottom bar -->
  <div class="footer__bottom">
    <div class="footer__bottom-inner">
      <p class="footer__disclaimer">
        MorinVibes® moringa capsules are a traditional medicine registered with the Ministry of Health Malaysia.
        MAL No: [MAL_NUMBER]. Warning: This is a traditional medicine. Please consult your pharmacist or doctor
        before taking this product. Keep out of reach of children. Pregnancy and breastfeeding: Insufficient
        reliable data. This product is not intended to diagnose, treat, cure, or prevent any disease.
        Individual results vary.
      </p>
      <div class="footer__bottom-bar">
        <p class="footer__copy">© 2026 Morinvibes Sdn. Bhd. All rights reserved.</p>
        <div class="footer__lang-switch" role="group" aria-label="Language">
          <button class="footer__lang-btn is-active" data-lang="en" onclick="window.location.href='/morinvibes-official/en/index.html'">EN</button>
          <button class="footer__lang-btn" data-lang="bm" onclick="window.location.href='/morinvibes-official/bm/index.html'">BM</button>
          <button class="footer__lang-btn" data-lang="zh" onclick="window.location.href='/morinvibes-official/zh/index.html'">中文</button>
        </div>
      </div>
    </div>
  </div>

</footer>
`;


/* ═══════════════════════════════════════
   NAV OVERLAY CSS (injected once)
═══════════════════════════════════════ */
var OVERLAY_STYLE = `
<style id="nav-overlay-style">
.nav__overlay {
  position: fixed;
  inset: 0;
  z-index: 998;
  background: rgba(26,58,64,.45);
  backdrop-filter: blur(2px);
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s cubic-bezier(.4,0,.2,1);
}
.nav__overlay.is-open {
  opacity: 1;
  pointer-events: all;
}
</style>
`;


/* ═══════════════════════════════════════
   INJECT COMPONENTS
═══════════════════════════════════════ */
function injectComponents() {

  /* ── Inject nav ── */
  var navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.innerHTML = NAV_HTML;
    document.head.insertAdjacentHTML('beforeend', OVERLAY_STYLE);
    markActiveNavLink();
    initMobileMenu();
  }

  /* ── Inject footer ── */
  var footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = FOOTER_HTML;
    markActiveFooterLang();
  }

}


/* ─── MARK ACTIVE NAV LINK ─── */
function markActiveNavLink() {
  var path = window.location.pathname;
  var links = document.querySelectorAll('.nav__link, .nav__drawer-link');
  links.forEach(function(link) {
    var href = link.getAttribute('href') || '';
    /* Extract filename from href */
    var hrefFile = href.split('/').pop();
    var pathFile = path.split('/').pop();
    if (hrefFile && pathFile && hrefFile === pathFile) {
      link.classList.add('is-active');
    }
    /* Special case: root/index */
    if ((pathFile === '' || pathFile === 'index.html') && hrefFile === 'index.html') {
      link.classList.add('is-active');
    }
  });
}


/* ─── MARK ACTIVE FOOTER LANG ─── */
function markActiveFooterLang() {
  var path = window.location.pathname;
  var lang = 'en';
  if (path.includes('/bm/')) lang = 'bm';
  if (path.includes('/zh/')) lang = 'zh';
  var btns = document.querySelectorAll('.footer__lang-btn');
  btns.forEach(function(btn) {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });
}


/* ─── MOBILE MENU ─── */
function initMobileMenu() {
  var burger     = document.getElementById('navBurger');
  var drawer     = document.getElementById('navDrawer');
  var drawerClose= document.getElementById('navDrawerClose');
  var overlay    = document.getElementById('navOverlay');

  if (!burger || !drawer) return;

  function openMenu() {
    burger.classList.add('is-open');
    drawer.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.classList.remove('is-open');
    drawer.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function() {
    if (drawer.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (drawerClose) drawerClose.addEventListener('click', closeMenu);
  if (overlay)     overlay.addEventListener('click', closeMenu);

  /* Close on Escape */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMenu();
    }
  });

  /* Close when a drawer link is clicked */
  var drawerLinks = drawer.querySelectorAll('.nav__drawer-link, .btn');
  drawerLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });
}


/* ─── RUN ON DOM READY ─── */
document.addEventListener('DOMContentLoaded', injectComponents);
