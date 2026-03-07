'use strict';

/* ============================================================
   MORINVIBES® — components.js
   NAV + FOOTER injection · Language switcher
   ============================================================ */

// ── Language utilities ────────────────────────────────────────
function getCurrentLang() {
  var path = window.location.pathname;
  if (path.indexOf('/bm/') !== -1) return 'BM';
  if (path.indexOf('/zh/') !== -1) return '中文';
  return 'EN';
}

function switchLanguage(lang) {
  var path = window.location.pathname;
  var newPath = path
    .replace('/morinvibes-official/en/', '/morinvibes-official/' + lang + '/')
    .replace('/morinvibes-official/bm/', '/morinvibes-official/' + lang + '/')
    .replace('/morinvibes-official/zh/', '/morinvibes-official/' + lang + '/');
  if (newPath === path) {
    newPath = '/morinvibes-official/' + lang + '/index.html';
  }
  window.location.href = newPath;
}

window.switchLanguage = switchLanguage;

// ── Detect active page for nav link highlighting ──────────────
function isActivePage(href) {
  var path = window.location.pathname;
  if (!href) return false;
  var hrefPath = href.split('?')[0];
  return path.indexOf(hrefPath) !== -1 && hrefPath !== '/';
}

// ── NAV HTML ─────────────────────────────────────────────────
var currentLang = getCurrentLang();

var NAV_HTML = '<nav id="nav" role="navigation" aria-label="Main navigation">'
  + '<div class="nav__inner">'

  // Left — hamburger
  + '<div class="nav__left">'
  + '<button class="nav__burger" id="navBurger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="navDrawer">'
  + '<span class="nav__burger-line"></span>'
  + '<span class="nav__burger-line"></span>'
  + '<span class="nav__burger-line"></span>'
  + '</button>'
  + '</div>'

  // Centre — logo
  + '<div class="nav__center">'
  + '<a class="nav__logo" href="/morinvibes-official/en/index.html" aria-label="MorinVibes® — Home">'
  + '<img src="/morinvibes-official/images/logo-full.svg" alt="MorinVibes® Farm-Direct Moringa" width="160" height="36">'
  + '</a>'
  + '</div>'

  // Right — desktop links + CTA + lang
  + '<div class="nav__right">'

  // Desktop links (hidden on mobile via CSS)
  + '<div class="nav__links" role="list">'
  + '<a class="nav__link' + (isActivePage('/en/journal.html') ? ' is-active' : '') + '" href="/morinvibes-official/en/journal.html" role="listitem">Journal</a>'
  + '<a class="nav__link' + (isActivePage('/en/the-product.html') ? ' is-active' : '') + '" href="/morinvibes-official/en/the-product.html" role="listitem">The Product</a>'
  + '<a class="nav__link' + (isActivePage('/en/reviews.html') ? ' is-active' : '') + '" href="/morinvibes-official/en/reviews.html" role="listitem">Reviews</a>'
  + '<a class="nav__link' + (isActivePage('/en/faq.html') ? ' is-active' : '') + '" href="/morinvibes-official/en/faq.html" role="listitem">FAQ</a>'
  + '</div>'

  // Order Now (desktop)
  + '<a class="btn btn--primary btn--sm" href="/morinvibes-official/en/checkout.html">Order Now — RM89</a>'

  // Language toggle (desktop)
  + '<div class="nav__lang" id="navLang">'
  + '<button class="nav__lang-btn" id="navLangBtn" aria-haspopup="listbox" aria-expanded="false">'
  + '<span id="navLangCurrent">' + currentLang + '</span>'
  + '<svg class="nav__lang-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>'
  + '</button>'
  + '<div class="nav__lang-dropdown" id="navLangDropdown" role="listbox">'
  + '<button class="nav__lang-option' + (currentLang === 'EN' ? ' is-active' : '') + '" role="option" onclick="switchLanguage(\'en\')">EN</button>'
  + '<button class="nav__lang-option' + (currentLang === 'BM' ? ' is-active' : '') + '" role="option" onclick="switchLanguage(\'bm\')">BM</button>'
  + '<button class="nav__lang-option' + (currentLang === '中文' ? ' is-active' : '') + '" role="option" onclick="switchLanguage(\'zh\')">中文</button>'
  + '</div>'
  + '</div>'

  + '</div>'// /nav__right
  + '</div>'// /nav__inner
  + '</nav>'

  // Overlay
  + '<div class="nav__overlay" id="navOverlay" aria-hidden="true"></div>'

  // Drawer
  + '<div class="nav__drawer" id="navDrawer" role="dialog" aria-modal="true" aria-label="Navigation menu" aria-hidden="true">'
  + '<div class="nav__drawer-header">'
  + '<img src="/morinvibes-official/images/logo-full.svg" class="nav__drawer-logo" alt="MorinVibes®" width="130" height="30">'
  + '<button class="nav__drawer-close" id="navDrawerClose" aria-label="Close navigation menu">'
  + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
  + '</button>'
  + '</div>'
  + '<div class="nav__drawer-body">'

  // Left column — nav links
  + '<div class="nav__drawer-left">'
  + '<a class="nav__drawer-link" href="/morinvibes-official/en/our-farm.html">Our Farm</a>'
  + '<a class="nav__drawer-link" href="/morinvibes-official/en/quality-and-safety.html">Quality &amp; Safety</a>'
  + '<a class="nav__drawer-link" href="/morinvibes-official/en/journal.html">Journal</a>'
  + '<a class="nav__drawer-link" href="/morinvibes-official/en/the-product.html">The Product</a>'
  + '<a class="nav__drawer-link" href="/morinvibes-official/en/about-us.html">About Us</a>'
  + '<a class="nav__drawer-link" href="/morinvibes-official/en/reviews.html">Reviews</a>'
  + '<a class="nav__drawer-link" href="/morinvibes-official/en/faq.html">FAQ</a>'
  + '<div class="nav__drawer-langs">'
  + '<button class="nav__drawer-lang-btn' + (currentLang === 'EN' ? ' is-active' : '') + '" onclick="switchLanguage(\'en\')">EN</button>'
  + '<button class="nav__drawer-lang-btn' + (currentLang === 'BM' ? ' is-active' : '') + '" onclick="switchLanguage(\'bm\')">BM</button>'
  + '<button class="nav__drawer-lang-btn' + (currentLang === '中文' ? ' is-active' : '') + '" onclick="switchLanguage(\'zh\')">中文</button>'
  + '</div>'
  + '</div>'

  // Right column — bottle + CTA
  + '<div class="nav__drawer-right">'
  + '<img src="/morinvibes-official/images/bottle-new.svg" class="nav__drawer-bottle" alt="MorinVibes Moringa Capsule" width="140">'
  + '<p class="nav__drawer-price"><sup>RM</sup>89</p>'
  + '<a class="btn btn--primary btn--full" href="/morinvibes-official/en/checkout.html">Order Now — RM89</a>'
  + '</div>'

  + '</div>'// /nav__drawer-body
  + '</div>';// /nav__drawer

// ── FOOTER HTML ───────────────────────────────────────────────
var FOOTER_HTML = '<footer id="footer" role="contentinfo">'
  + '<div class="footer__inner">'
  + '<div class="footer__grid">'

  // Col 1 — Brand
  + '<div class="footer__brand">'
  + '<div class="footer__logo-wrap">'
  + '<img src="/morinvibes-official/images/logo-full.svg" class="footer__logo" alt="MorinVibes®" width="140" height="32">'
  + '<img src="/morinvibes-official/images/v-mark.svg" class="footer__vmark vmark--white" alt="" aria-hidden="true">'
  + '</div>'
  + '<p class="footer__tagline">Farm-direct moringa capsules from Bayan Lepas, Penang. Single ingredient. KKM registered. GMP certified. Since 2019.</p>'
  + '<div class="footer__socials">'

  // Instagram
  + '<a class="footer__social-link" href="https://www.instagram.com/moringa_morinvibes/" target="_blank" rel="noopener noreferrer" aria-label="MorinVibes on Instagram">'
  + '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>'
  + '</a>'

  // Facebook
  + '<a class="footer__social-link" href="[FACEBOOK_URL]" target="_blank" rel="noopener noreferrer" aria-label="MorinVibes on Facebook">'
  + '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>'
  + '</a>'

  // TikTok
  + '<a class="footer__social-link" href="[TIKTOK_URL]" target="_blank" rel="noopener noreferrer" aria-label="MorinVibes on TikTok">'
  + '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.77 1.52V6.66a4.85 4.85 0 01-1-.03z"/></svg>'
  + '</a>'

  // WhatsApp
  + '<a class="footer__social-link" href="https://wa.me/60102766095" target="_blank" rel="noopener noreferrer" aria-label="MorinVibes on WhatsApp">'
  + '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'
  + '</a>'

  + '</div>'// /footer__socials

  + '<div class="footer__lang-row">'
  + '<button class="footer__lang-btn' + (currentLang === 'EN' ? ' is-active' : '') + '" onclick="switchLanguage(\'en\')" aria-label="Switch to English">EN</button>'
  + '<button class="footer__lang-btn' + (currentLang === 'BM' ? ' is-active' : '') + '" onclick="switchLanguage(\'bm\')" aria-label="Switch to Bahasa Malaysia">BM</button>'
  + '<button class="footer__lang-btn' + (currentLang === '中文' ? ' is-active' : '') + '" onclick="switchLanguage(\'zh\')" aria-label="Switch to Chinese">中文</button>'
  + '</div>'
  + '</div>'// /footer__brand

  // Col 2 — Explore
  + '<div>'
  + '<p class="footer__col-title">Explore</p>'
  + '<nav class="footer__links" aria-label="Explore MorinVibes">'
  + '<a class="footer__link" href="/morinvibes-official/en/our-farm.html">Our Farm</a>'
  + '<a class="footer__link" href="/morinvibes-official/en/quality-and-safety.html">Quality &amp; Safety</a>'
  + '<a class="footer__link" href="/morinvibes-official/en/journal.html">Journal</a>'
  + '<a class="footer__link" href="/morinvibes-official/en/the-product.html">The Product</a>'
  + '<a class="footer__link" href="/morinvibes-official/en/about-us.html">About Us</a>'
  + '<a class="footer__link" href="/morinvibes-official/en/reviews.html">Reviews</a>'
  + '<a class="footer__link" href="/morinvibes-official/en/faq.html">FAQ</a>'
  + '</nav>'
  + '</div>'

  // Col 3 — Legal
  + '<div>'
  + '<p class="footer__col-title">Legal</p>'
  + '<nav class="footer__links" aria-label="Legal pages">'
  + '<a class="footer__link" href="/morinvibes-official/en/privacy.html">Privacy Policy</a>'
  + '<a class="footer__link" href="/morinvibes-official/en/terms.html">Terms of Service</a>'
  + '<a class="footer__link" href="/morinvibes-official/en/returns.html">Returns Policy</a>'
  + '<a class="footer__link" href="/morinvibes-official/en/ethics.html">Our Ethics</a>'
  + '</nav>'
  + '</div>'

  // Col 4 — Contact
  + '<div>'
  + '<p class="footer__col-title">Contact Us</p>'
  + '<div class="footer__contact-item">'
  + '<svg class="footer__contact-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  + '<span>2-C Wisma Tylo, Lintang Sungai Tiram 4, 11900 Bayan Lepas, Pulau Pinang, Malaysia</span>'
  + '</div>'
  + '<div class="footer__contact-item">'
  + '<svg class="footer__contact-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>'
  + '<span>+60 10-276 6095</span>'
  + '</div>'
  + '<a class="footer__wa-btn" href="https://wa.me/60102766095?text=Hi%2C%20I%27m%20interested%20in%20MorinVibes%20Moringa%20Capsules" target="_blank" rel="noopener noreferrer">'
  + '💬 Chat on WhatsApp →</a>'
  + '</div>'

  + '</div>'// /footer__grid

  // Bottom row
  + '<div class="footer__bottom">'
  + '<p class="footer__copyright">© 2026 Morinvibes Sdn. Bhd. All rights reserved.</p>'
  + '<div class="footer__legal-links">'
  + '<a class="footer__legal-link" href="/morinvibes-official/en/privacy.html">Privacy</a>'
  + '<a class="footer__legal-link" href="/morinvibes-official/en/terms.html">Terms</a>'
  + '<a class="footer__legal-link" href="/morinvibes-official/en/returns.html">Returns</a>'
  + '</div>'
  + '</div>'

  // Legal disclaimer
  + '<p class="footer__disclaimer">'
  + 'MorinVibes® moringa capsules are a traditional medicine registered with the Ministry of Health Malaysia. '
  + 'MAL No: [MAL_NUMBER]. Warning: This is a traditional medicine. Please consult your pharmacist or doctor before taking this product. '
  + 'Keep out of reach of children. Pregnancy and breastfeeding: Insufficient reliable data. '
  + 'This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results vary.'
  + '</p>'

  + '</div>'// /footer__inner
  + '</footer>';

// ── Inject both components ────────────────────────────────────
function injectComponents() {
  var navPlaceholder    = document.getElementById('nav-placeholder');
  var footerPlaceholder = document.getElementById('footer-placeholder');

  if (navPlaceholder) {
    navPlaceholder.outerHTML = NAV_HTML;
    initNav();
  }

  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = FOOTER_HTML;
  }
}

// ── Nav interactions ──────────────────────────────────────────
function initNav() {
  var nav         = document.getElementById('nav');
  var burger      = document.getElementById('navBurger');
  var drawer      = document.getElementById('navDrawer');
  var drawerClose = document.getElementById('navDrawerClose');
  var overlay     = document.getElementById('navOverlay');
  var langBtn     = document.getElementById('navLangBtn');
  var langEl      = document.getElementById('navLang');

  // ── Scroll: add is-scrolled class ──────────────────────────
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 12) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Drawer open ─────────────────────────────────────────────
  function openDrawer() {
    if (!drawer || !overlay || !burger) return;
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (drawerClose) drawerClose.focus();
  }

  // ── Drawer close ────────────────────────────────────────────
  function closeDrawer() {
    if (!drawer || !overlay || !burger) return;
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    burger.focus();
  }

  if (burger)      burger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (overlay)     overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // ── Lang dropdown ────────────────────────────────────────────
  if (langBtn && langEl) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = langEl.classList.toggle('is-open');
      langBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function () {
      if (langEl) {
        langEl.classList.remove('is-open');
        if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// ── Run on DOM ready ──────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectComponents);
} else {
  injectComponents();
}
