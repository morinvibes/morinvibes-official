// =========================
// LANGUAGE SWITCH
// =========================
const translations = { /* 同之前版本，省略翻譯字典 */ };

function setLanguage(lang) {
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    el.textContent = translations[lang][key];
  });

  const langSelect = document.querySelector(".lang-switch select");
  if (lang === "bm") langSelect.style.color = "#1FB5A8";
  else if (lang === "zh-cn" || lang === "zh-tw") langSelect.style.color = "#6C8BCB";
  else langSelect.style.color = "#333";
}

// =========================
// TYPING ANIMATION (首頁 Hero)
// =========================
const typingElement = document.querySelector(".typing");
if (typingElement) {
  const typingTexts = [
    "Elevate Your Wellness with MorinVibes",
    "Premium Moringa Capsules",
    "Made in Penang, Malaysia"
  ];
  let typingIndex = 0, charIndex = 0;

  function typeEffect() {
    if (charIndex < typingTexts[typingIndex].length) {
      typingElement.textContent += typingTexts[typingIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 100);
    } else setTimeout(eraseEffect, 2000);
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
  typeEffect();
}

// =========================
// COUNTER ANIMATION (Stats)
// =========================
document.querySelectorAll(".counter").forEach(counter => {
  const animateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const speed = 200;
    const updateCount = () => {
      const count = +counter.innerText;
      const increment = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else counter.innerText = target;
    };
    updateCount();
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(); observer.unobserve(counter); }
    });
  }, { threshold: 0.6 });
  observer.observe(counter);
});

// =========================
// SCROLL FADE-IN (通用)
// =========================
document.querySelectorAll(".hidden").forEach(el => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("show"); observer.unobserve(el); }
    });
  }, { threshold: 0.2 });
  observer.observe(el);
});

// =========================
// HAMBURGER MENU
// =========================
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
if (hamburger) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
    hamburger.classList.toggle("open");
  });
}

// =========================
// HOVER FLIP CARD (Benefits 頁)
// =========================
document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("mouseenter", () => card.classList.add("flipped"));
  card.addEventListener("mouseleave", () => card.classList.remove("flipped"));
});

// =========================
// PARALLAX SCROLL (Science 頁)
// =========================
window.addEventListener("scroll", () => {
  document.querySelectorAll(".parallax").forEach(bg => {
    let offset = window.pageYOffset;
    bg.style.backgroundPositionY = (offset * 0.5) + "px";
  });
});

// =========================
// ACCORDION FAQ
// =========================
document.querySelectorAll(".accordion-item").forEach(item => {
  const header = item.querySelector(".accordion-header");
  header.addEventListener("click", () => {
    item.classList.toggle("open");
    const body = item.querySelector(".accordion-body");
    if (item.classList.contains("open")) body.style.maxHeight = body.scrollHeight + "px";
    else body.style.maxHeight = null;
  });
});

// =========================
// CAROUSEL SLIDER (Reviews 頁)
// =========================
const sliders = document.querySelectorAll(".carousel");
sliders.forEach(slider => {
  let index = 0;
  const items = slider.querySelectorAll(".carousel-item");
  function showSlide(i) {
    items.forEach((item, idx) => item.style.display = idx === i ? "block" : "none");
  }
  showSlide(index);
  setInterval(() => {
    index = (index + 1) % items.length;
    showSlide(index);
  }, 4000);
});
