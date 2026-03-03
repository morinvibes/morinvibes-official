/* =====================================================
   MORINVIBES® BOTANICAL AUTHORITY SCRIPT
   Brand Locked v5.0
   Minimal • Clean • Performance Safe
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     LANGUAGE DETECTION
     Detect folder: /, /bm/, /zh/
  ===================================================== */

  const path = window.location.pathname;
  let currentLang = "en";

  if (path.includes("/bm/")) {
    currentLang = "bm";
  } else if (path.includes("/zh/")) {
    currentLang = "zh";
  }

  /* =====================================================
     LANGUAGE SWITCHER
     Switch to same page in selected folder
  ===================================================== */

  const switcher = document.getElementById("languageSwitcher");

  if (switcher) {
    switcher.value = currentLang === "en" ? "/" : `/${currentLang}/`;

    switcher.addEventListener("change", function () {
      const selected = this.value;

      let cleanPath = path
        .replace("/bm/", "/")
        .replace("/zh/", "/");

      if (selected === "/") {
        window.location.href = cleanPath;
      } else {
        window.location.href = selected + cleanPath.replace("/", "");
      }
    });
  }

  /* =====================================================
     SCROLL REVEAL (Subtle Only)
  ===================================================== */

  const revealElements = document.querySelectorAll(".fade-in");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* =====================================================
     META PIXEL TRACKING
  ===================================================== */

  if (typeof fbq === "function") {
    fbq("track", "PageView", {
      page_path: path,
      language: currentLang
    });
  }

  /* =====================================================
     GA4 PAGE VIEW
  ===================================================== */

  if (typeof gtag === "function") {
    gtag("event", "page_view", {
      page_path: path,
      language: currentLang
    });
  }

  /* =====================================================
     ADD TO CART TRIGGER
     Fires when #order section enters viewport
  ===================================================== */

  const orderSection = document.getElementById("order");
  let addToCartFired = false;

  if (orderSection) {
    const orderObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !addToCartFired) {

            if (typeof fbq === "function") {
              fbq("track", "AddToCart");
            }

            addToCartFired = true;
          }
        });
      },
      { threshold: 0.4 }
    );

    orderObserver.observe(orderSection);
  }

  /* =====================================================
     PURCHASE TRIGGER (THANK YOU PAGE ONLY)
  ===================================================== */

  if (path.includes("thank-you.html")) {

    if (typeof fbq === "function") {
      fbq("track", "Purchase");
    }

    if (typeof gtag === "function") {
      gtag("event", "purchase");
    }

  }

  /* =====================================================
     MOBILE NAV TOGGLE (If Implemented Later)
  ===================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      mobileNav.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    });
  }

});
