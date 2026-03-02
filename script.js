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
