// ==========================================================================
// components.js — MorinVibes® v22.0
// Nav and footer HTML templates + injection function.
// Load this after pixel.js, before main.js and animations.js.
// ==========================================================================
'use strict';

// --------------------------------------------------------------------------
// NAV_HTML — Desktop + mobile menu structure (split panel)
// --------------------------------------------------------------------------
const NAV_HTML = `
<nav class="nav" id="mainNav">
  <div class="nav__container">
    <!-- Hamburger (left) -->
    <div class="nav__hamburger" id="menuToggle" aria-label="Open menu" role="button" tabindex="0">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </div>

    <!-- Logo (absolute centered) -->
    <a href="/morinvibes-official/en/index.html" class="nav__logo" aria-label="MorinVibes home">
      <img src="/morinvibes-official/images/logo-full.svg" alt="MorinVibes®" width="160" height="44">
    </a>

    <!-- Right side: language + order now -->
    <div class="nav__right">
      <div class="lang-dropdown" id="langDropdown">
        <div class="lang-current" id="langCurrent" role="button" tabindex="0">
          EN <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="lang-options" id="langOptions">
          <a href="/morinvibes-official/en/index.html">EN</a>
          <a href="/morinvibes-official/bm/index.html">BM</a>
          <a href="/morinvibes-official/zh/index.html">中文</a>
        </div>
      </div>
      <a href="/morinvibes-official/en/checkout.html" class="btn btn--primary btn--sm nav__order">Order Now</a>
    </div>
  </div>
</nav>

<!-- Mobile menu (split panel) — hidden by default -->
<div class="mobile-menu" id="mobileMenu">
  <div class="mobile-menu__split">
    <!-- Left panel (56%) -->
    <div class="mobile-menu__left">
      <div class="mobile-menu__close">
        <button class="close-btn" id="menuClose" aria-label="Close menu">✕</button>
      </div>
      <div class="mobile-menu__logo">
        <img src="/morinvibes-official/images/logo-full.svg" alt="MorinVibes®" width="140" height="38">
      </div>
      <div class="mobile-menu__lang">
        <a href="/morinvibes-official/en/index.html" class="active">EN</a>
        <a href="/morinvibes-official/bm/index.html">BM</a>
        <a href="/morinvibes-official/zh/index.html">中文</a>
      </div>
      <div class="mobile-menu__divider"></div>
      <ul class="mobile-nav-links">
        <li><a href="/morinvibes-official/en/our-farm.html">Our Farm</a></li>
        <li><a href="/morinvibes-official/en/quality-and-safety.html">Quality & Safety</a></li>
        <li><a href="/morinvibes-official/en/wellness-journal.html">Wellness Journal</a></li>
        <li><a href="/morinvibes-official/en/the-product.html">The Product</a></li>
        <li><a href="/morinvibes-official/en/about-us.html">About Us</a></li>
        <li><a href="/morinvibes-official/en/reviews.html">Reviews</a></li>
        <li><a href="/morinvibes-official/en/faq.html">FAQ</a></li>
      </ul>
    </div>
    <!-- Right panel (44%) -->
    <div class="mobile-menu__right">
      <div class="right-content">
        <img src="/morinvibes-official/images/bottle-new.svg" alt="MorinVibes bottle" loading="lazy">
        <div class="price">RM89 <small>90 caps</small></div>
        <div class="caps">500mg vegetable capsules</div>
        <a href="/morinvibes-official/en/checkout.html" class="btn btn--primary btn--full">Order Now →</a>
        <a href="https://wa.me/60102766095?text=Hi%2C%20I%27m%20interested%20in%20MorinVibes%20Moringa%20Capsules" class="wa-small" target="_blank">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          WhatsApp
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Menu overlay (for mobile) -->
<div class="menu-overlay" id="menuOverlay"></div>
`;

// --------------------------------------------------------------------------
// FOOTER_HTML — Full footer with 4 columns, deep forest gradient
// --------------------------------------------------------------------------
const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <!-- Column 1: Brand -->
      <div class="footer__brand">
        <img src="/morinvibes-official/images/logo-full.svg" alt="MorinVibes®" width="200" height="55">
        <p class="footer__tagline">Farm-direct moringa capsules from Bayan Lepas, Penang. Small-batch. KKM registered. GMP certified.</p>
        <div class="footer__badges">
          <span class="footer__badge">KKM Traditional Medicine</span>
          <span class="footer__badge">GMP Certified</span>
          <span class="footer__badge">Since 2019</span>
        </div>
      </div>

      <!-- Column 2: Explore -->
      <div class="footer__explore">
        <h4 class="footer__heading">Explore</h4>
        <ul class="footer__list">
          <li><a href="/morinvibes-official/en/our-farm.html">Our Farm</a></li>
          <li><a href="/morinvibes-official/en/quality-and-safety.html">Quality & Safety</a></li>
          <li><a href="/morinvibes-official/en/wellness-journal.html">Wellness Journal</a></li>
          <li><a href="/morinvibes-official/en/the-product.html">The Product</a></li>
          <li><a href="/morinvibes-official/en/about-us.html">About Us</a></li>
          <li><a href="/morinvibes-official/en/reviews.html">Reviews</a></li>
          <li><a href="/morinvibes-official/en/faq.html">FAQ</a></li>
        </ul>
      </div>

      <!-- Column 3: Legal -->
      <div class="footer__legal">
        <h4 class="footer__heading">Legal</h4>
        <ul class="footer__list">
          <li><a href="/morinvibes-official/en/privacy.html">Privacy Policy</a></li>
          <li><a href="/morinvibes-official/en/terms.html">Terms of Service</a></li>
          <li><a href="/morinvibes-official/en/returns.html">Returns Policy</a></li>
          <li><a href="/morinvibes-official/en/ethics.html">Our Ethics</a></li>
        </ul>
      </div>

      <!-- Column 4: Connect -->
      <div class="footer__connect">
        <h4 class="footer__heading">Connect</h4>
        <div class="footer__socials">
          <a href="https://www.instagram.com/moringa_morinvibes/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://www.threads.net/@moringa_morinvibes" target="_blank" rel="noopener" aria-label="Threads">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>
          </a>
          <a href="[FACEBOOK_URL]" target="_blank" rel="noopener" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="[TIKTOK_URL]" target="_blank" rel="noopener" aria-label="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
          </a>
        </div>
        <a href="https://wa.me/60102766095?text=Hi%2C%20I%27d%20like%20to%20connect%20with%20MorinVibes" class="footer__wa-link" target="_blank">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          Chat on WhatsApp
        </a>
        <div class="footer__location">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Bayan Lepas, Penang, Malaysia
        </div>
        <div class="footer__shop-links">
          <a href="[SHOPEE_URL]" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2 2h3l1.68 8.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Shopee
          </a>
          <a href="[LAZADA_URL]" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7l-10-5z"/><path d="M2 7l10 5 10-5"/><path d="M12 22V12"/></svg>
            Lazada
          </a>
        </div>
      </div>
    </div>

    <!-- Footer bottom bar (no duplicate legal links) -->
    <div class="footer__bottom">
      <p class="footer__disclaimer">
        MorinVibes® moringa capsules are a traditional medicine registered with the Ministry of Health Malaysia. MAL No: [MAL_NUMBER]. Warning: This is a traditional medicine. Please consult your pharmacist or doctor before taking this product. Keep out of reach of children. Pregnancy and breastfeeding: Insufficient reliable data. These statements have not been evaluated by the Ministry of Health Malaysia. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results vary.
      </p>
      <div class="footer__copyright">
        © 2026 Morinvibes Sdn. Bhd. All rights reserved
      </div>
      <div class="lang-switch">
        <a href="/morinvibes-official/en/index.html">EN</a> | <a href="/morinvibes-official/bm/index.html">BM</a> | <a href="/morinvibes-official/zh/index.html">中文</a>
      </div>
    </div>
  </div>
</footer>
`;

// --------------------------------------------------------------------------
// injectComponents() — Inserts nav and footer into placeholders, marks active link
// --------------------------------------------------------------------------
function injectComponents() {
  // Nav
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.innerHTML = NAV_HTML;
  }

  // Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = FOOTER_HTML;
  }

  // Mark active link in desktop nav (by comparing path)
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav .nav__right a:not(.btn)'); // language links are inside dropdown, but we'll handle lang separately
  // For simplicity, we highlight the Order Now button maybe? But prompt says mark active nav link by URL path.
  // We'll handle mobile nav links and maybe desktop if we had a list, but desktop doesn't have list. So we focus on mobile.
  // Actually, desktop doesn't have page links, only mobile menu has them. So we mark active in mobile menu.
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.classList.add('nav-link-active');
    }
  });

  // Also mark active language in dropdown and mobile lang switcher
  const langLinks = document.querySelectorAll('.lang-options a, .mobile-menu__lang a');
  const currentLang = currentPath.includes('/bm/') ? 'bm' : (currentPath.includes('/zh/') ? 'zh' : 'en');
  langLinks.forEach(link => {
    const href = link.getAttribute('href');
    if ((currentLang === 'en' && href.includes('/en/')) ||
        (currentLang === 'bm' && href.includes('/bm/')) ||
        (currentLang === 'zh' && href.includes('/zh/'))) {
      link.classList.add('active');
    }
  });

  // Initialize language dropdown toggle (simple)
  const langCurrent = document.getElementById('langCurrent');
  const langDropdown = document.getElementById('langDropdown');
  if (langCurrent && langDropdown) {
    langCurrent.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove('open');
      }
    });
  }
}

// Auto-run on DOM ready (will be called after DOMContentLoaded, but we also call explicitly in main to ensure order)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectComponents);
} else {
  // Already loaded
  injectComponents();
}
