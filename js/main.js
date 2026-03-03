/* =========================================
   MORINVIBES – PREMIUM MAIN JS
   Language Engine + Effects + Commerce
========================================= */

/* =========================================
   1. LANGUAGE ENGINE
========================================= */

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About Us",
    nav_mission: "Mission & Vision",
    nav_blog: "Blog",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    nav_terms: "Terms",

    hero_title: "Penang’s Purest Moringa.",
    hero_desc:
      "Farm-grown. GMP-certified. Officially registered with KKM (MAL).",
    hero_btn: "Shop Now",

    footer_rights: "All rights reserved."
  },

  bm: {
    nav_home: "Utama",
    nav_about: "Tentang Kami",
    nav_mission: "Misi & Visi",
    nav_blog: "Blog",
    nav_faq: "Soalan Lazim",
    nav_contact: "Hubungi",
    nav_terms: "Terma",

    hero_title: "Moringa Paling Tulen di Pulau Pinang.",
    hero_desc:
      "Ditanam sendiri. Kilang GMP. Berdaftar rasmi dengan KKM (MAL).",
    hero_btn: "Beli Sekarang",

    footer_rights: "Hak cipta terpelihara."
  },

  zh: {
    nav_home: "首页",
    nav_about: "关于我们",
    nav_mission: "使命与愿景",
    nav_blog: "博客",
    nav_faq: "常见问题",
    nav_contact: "联系我们",
    nav_terms: "条款",

    hero_title: "槟城最纯正的辣木。",
    hero_desc:
      "自家农场种植。GMP认证。马来西亚卫生部注册。",
    hero_btn: "立即购买",

    footer_rights: "版权所有。"
  },

  zht: {
    nav_home: "首頁",
    nav_about: "關於我們",
    nav_mission: "使命與願景",
    nav_blog: "部落格",
    nav_faq: "常見問題",
    nav_contact: "聯絡我們",
    nav_terms: "條款",

    hero_title: "檳城最純正的辣木。",
    hero_desc:
      "自家農場種植。GMP認證。馬來西亞衛生部註冊。",
    hero_btn: "立即購買",

    footer_rights: "版權所有。"
  }
};

/* =========================================
   APPLY TRANSLATION
========================================= */

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });

  localStorage.setItem("language", lang);
}

/* =========================================
   LANGUAGE SWITCHER INIT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);

  const switcher = document.querySelectorAll(".lang-option");

  switcher.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      setLanguage(selectedLang);
    });
  });
});


/* =========================================
   2. SCROLL REVEAL EFFECT
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* =========================================
   3. NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


/* =========================================
   4. SMOOTH SCROLL
========================================= */

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth"
    });
  }
}


/* =========================================
   5. ADD TO CART TRIGGER (Shopee Ready)
========================================= */

function addToCart() {
  // Future: integrate Meta Pixel, TikTok Pixel here

  console.log("Add to cart triggered");

  // Replace with your Shopee link
  window.location.href = "https://shopee.com.my/YOUR_PRODUCT_LINK";
}


/* =========================================
   6. HERO CTA SCROLL
========================================= */

function scrollToOrder() {
  scrollToSection("order");
}


/* =========================================
   7. MOBILE MENU TOGGLE
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}
