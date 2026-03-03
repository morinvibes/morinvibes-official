/* ===========================
   main.js — MorinVibes®
   Premium Botanical Authority Infrastructure
=========================== */

// ✅ Scroll Reveal (fade + translateY)
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll("section, .hero-image img");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const position = el.getBoundingClientRect().top;
      if (position < windowHeight - 100) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      }
    });
  };

  // Initial state
  revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
  });

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

// ✅ Language Switcher (folder-based)
document.querySelectorAll(".lang-switch a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    window.location.href = target;
  });
});

// ✅ Tracking: Meta Pixel & GA4
// Meta Pixel stub
window.fbq = window.fbq || function() {
  (window.fbq.q = window.fbq.q || []).push(arguments);
};
window.fbq('init', 'YOUR_PIXEL_ID'); // Replace with actual Pixel ID
window.fbq('track', 'PageView', { language: document.documentElement.lang });

// Track AddToCart when #order enters viewport
const orderSection = document.querySelector("#order");
if (orderSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.fbq('track', 'AddToCart');
        gtag('event', 'add_to_cart');
      }
    });
  }, { threshold: 0.5 });
  observer.observe(orderSection);
}

// Track Purchase on thank-you.html
if (window.location.pathname.includes("thank-you.html")) {
  window.fbq('track', 'Purchase');
  gtag('event', 'purchase');
}

// ✅ GA4 stub
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'YOUR_GA4_ID'); // Replace with actual GA4 ID

// ✅ Mobile Navigation (hamburger)
const navToggle = document.createElement("button");
navToggle.className = "nav-toggle";
navToggle.innerHTML = "☰";
document.querySelector(".header").appendChild(navToggle);

navToggle.addEventListener("click", () => {
  const nav = document.querySelector(".nav ul");
  if (nav.style.display === "flex") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
    nav.style.flexDirection = "column";
    nav.style.gap = "1rem";
  }
});
