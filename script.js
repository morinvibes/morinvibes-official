// 語言切換
const translations = { /* 同之前 */ };

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
    navbar.style.background = "#007a8a"; // darker shade
  } else {
    navbar.style.background = "#0097b2";
  }
});
