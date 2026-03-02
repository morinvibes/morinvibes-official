// 語言切換
const translations = {
  en: { title: "Welcome to MorinVibes Moringa", subtitle: "Natural Wellness from Penang, Malaysia" },
  ms: { title: "Selamat datang ke MorinVibes Moringa", subtitle: "Kesihatan semula jadi dari Pulau Pinang, Malaysia" },
  "zh-cn": { title: "欢迎来到 MorinVibes Moringa", subtitle: "来自马来西亚槟城的天然健康" },
  "zh-tw": { title: "歡迎來到 MorinVibes Moringa", subtitle: "來自馬來西亞檳城的天然健康" }
};

function setLang(lang) {
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("subtitle").innerText = translations[lang].subtitle;
}

// Mobile Menu Toggle
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("show");
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// FAQ 手風琴效果
document.querySelectorAll(".faq-question").forEach(item => {
  item.addEventListener("click", () => {
    const answer = item.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});
