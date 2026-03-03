/* ==============================
   DOM READY
============================== */
document.addEventListener("DOMContentLoaded", function () {

  /* ==============================
     MOBILE MENU TOGGLE
  ============================== */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });
  }

  /* ==============================
     SCROLL REVEAL (INTERSECTION OBSERVER)
  ============================== */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==============================
     ADD TO CART EVENT (When #order visible)
  ============================== */
  const orderSection = document.getElementById("order");
  let addToCartFired = false;

  if (orderSection) {
    const orderObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !addToCartFired) {
          addToCartFired = true;

          if (typeof fbq !== "undefined") {
            fbq('track', 'AddToCart', {
              content_name: 'MorinVibes Moringa',
              content_category: 'Moringa Supplement',
              currency: 'MYR'
            });
          }

          if (typeof gtag !== "undefined") {
            gtag('event', 'add_to_cart', {
              currency: 'MYR',
              value: 0
            });
          }
        }
      });
    }, { threshold: 0.5 });

    orderObserver.observe(orderSection);
  }

  /* ==============================
     PURCHASE EVENT (Thank You Page)
  ============================== */
  if (window.location.pathname.includes("thank-you.html")) {

    if (typeof fbq !== "undefined") {
      fbq('track', 'Purchase', {
        currency: 'MYR',
        value: 0
      });
    }

    if (typeof gtag !== "undefined") {
      gtag('event', 'purchase', {
        currency: 'MYR',
        value: 0
      });
    }
  }

  /* ==============================
     LANGUAGE SWITCHER (Subfolder Logic)
     Structure:
     /index.html
     /bm/index.html
     /zh/index.html
  ============================== */
  const languageSwitcher = document.getElementById("languageSwitcher");

  if (languageSwitcher) {

    languageSwitcher.addEventListener("change", function () {

      const selectedLang = this.value;
      const currentPath = window.location.pathname;

      // Remove leading slash
      let path = currentPath.replace(/^\/+/, "");

      // Detect if currently in subfolder
      const segments = path.split("/");

      if (segments[0] === "bm" || segments[0] === "zh") {
        segments.shift();
      }

      const cleanPath = segments.join("/");

      let newPath = "";

      if (selectedLang === "en") {
        newPath = "/" + cleanPath;
      } else {
        newPath = "/" + selectedLang + "/" + cleanPath;
      }

      window.location.href = newPath;
    });
  }

});
