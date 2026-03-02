// =========================
// LANGUAGE SWITCH
// =========================
const translations = {
  en: {
    nav_home: "Home",
    nav_benefits: "Benefits",
    nav_science: "Science",
    nav_reviews: "Reviews",
    nav_faq: "FAQ",
    nav_order: "Order Now",
    hero_desc: "Premium Moringa Capsules for Wellness",
    hero_btn: "Shop Now",
    stat_customers: "Happy Customers",
    stat_satisfaction: "Satisfaction Rate",
    order_title: "Place Your Order"
  },
  bm: {
    nav_home: "Laman Utama",
    nav_benefits: "Manfaat",
    nav_science: "Sains",
    nav_reviews: "Ulasan",
    nav_faq: "Soalan Lazim",
    nav_order: "Pesan Sekarang",
    hero_desc: "Kapsul Moringa Premium untuk Kesihatan",
    hero_btn: "Beli Sekarang",
    stat_customers: "Pelanggan Gembira",
    stat_satisfaction: "Kadar Kepuasan",
    order_title: "Buat Pesanan"
  },
  "zh-cn": {
    nav_home: "首页",
    nav_benefits: "功效",
    nav_science: "科学",
    nav_reviews: "评价",
    nav_faq: "常见问题",
    nav_order: "立即订购",
    hero_desc: "优质辣木胶囊，呵护健康",
    hero_btn: "立即购买",
    stat_customers: "满意顾客",
    stat_satisfaction: "满意度",
    order_title: "下单购买"
  },
  "zh-tw": {
    nav_home: "首頁",
    nav_benefits: "功效",
    nav_science: "科學",
    nav_reviews: "評價",
    nav_faq: "常見問題",
    nav_order: "立即訂購",
    hero_desc: "優質辣木膠囊，守護健康",
    hero_btn: "立即購買",
    stat_customers: "滿意顧客",
    stat_satisfaction: "滿意度",
    order_title: "下單購買"
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    el.textContent = translations[lang][key];
  });

  // 語言選單顏色互動
  const langSelect = document.querySelector(".lang-switch select");
  if (lang === "bm") {
    langSelect.style.color = "#1FB5A8"; // 綠色
  } else if (lang === "zh-cn" || lang === "zh-tw") {
    langSelect.style.color = "#6C8BCB"; // 藍色
  } else {
    langSelect.style.color = "#333"; // 英文深灰
  }
}

// =========================
// TYPING ANIMATION
// =========================
const typingElement = document.querySelector(".hero h1");
const typingTexts = [
  "Elevate Your Wellness with MorinVibes",
  "Premium Moringa Capsules",
  "Made in Penang, Malaysia"
];
let typingIndex = 0;
let charIndex = 0;

function typeEffect() {
  if (charIndex < typingTexts[typingIndex].length) {
    typingElement.textContent += typingTexts[typingIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 2000);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent = typingTexts[typingIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    typingIndex = (typingIndex + 1) % typingTexts.length;
    setTimeout(typeEffect, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingTexts.length) typeEffect();
});

// =========================
// COUNTER ANIMATION
// =========================
const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const speed = 200;
  const updateCount = () => {
    const count = +counter.innerText;
    const increment = target / speed;
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
};

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// =========================
// SCROLL FADE-IN ANIMATION
// =========================
const hiddenElements = document.querySelectorAll(".hidden");

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

hiddenElements.forEach(el => fadeObserver.observe(el));

// =========================
// HAMBURGER MENU TOGGLE
// =========================
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("open");
});
