/* =========================================
   MORINVIBES MAIN JS
   Stable Production Version
========================================= */

console.log("MorinVibes JS Loaded");

/* =========================================
   1. SAFE LANGUAGE SYSTEM
========================================= */

const translations = {
  en: {
    hero_btn: "Shop Now",
    footer_rights: "All rights reserved."
  },
  bm: {
    hero_btn: "Beli Sekarang",
    footer_rights: "Hak cipta terpelihara."
  },
  zh: {
    hero_btn: "立即购买",
    footer_rights: "版权所有。"
  },
  zht: {
    hero_btn: "立即購買",
    footer_rights: "版權所有。"
  }
};

function setLanguage(lang) {
  if (!translations[lang]) return;

  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });

  localStorage.setItem("mv_lang", lang);
}

document.addEventListener("DOMContentLoaded", function () {
  const savedLang = localStorage.getItem("mv_lang") || "en";
  setLanguage(savedLang);
});


/* =========================================
   2. SAFE SCROLL REVEAL
========================================= */

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* =========================================
   3. SAFE SMOOTH ANCHOR SCROLL
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});


/* =========================================
   4. ADD TO CART (Shopee Redirect)
========================================= */

function addToCart() {
  console.log("Redirecting to Shopee...");
  window.location.href = "https://shopee.com.my/YOUR_PRODUCT_LINK";
}


/* =========================================
   5. HERO SCROLL BUTTON
========================================= */

function scrollToOrder() {
  const order = document.getElementById("order");
  if (order) {
    order.scrollIntoView({ behavior: "smooth" });
  }
}


/* =========================================
   6. OPTIONAL NAVBAR SCROLL EFFECT
========================================= */

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (!header) return;

  if (window.scrollY > 50) {
    header.style.background = "rgba(255,255,255,0.95)";
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
  } else {
    header.style.background = "rgba(255,255,255,0.75)";
    header.style.boxShadow = "none";
  }
});
