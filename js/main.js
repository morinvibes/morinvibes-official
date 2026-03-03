/* =======================================
   MORINVIBES® INTERACTION + META SYSTEM
   ======================================= */


/* ================================
   1️⃣ SCROLL REVEAL (Calm Luxury)
   ================================ */

const revealElements = document.querySelectorAll('.section, .hero');

const revealOnScroll = () => {
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

revealElements.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "all 0.6s ease";
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();



/* ================================
   2️⃣ CTA PULSE EVERY 8 SECONDS
   ================================ */

const primaryButtons = document.querySelectorAll('.btn-primary');

setInterval(() => {
  primaryButtons.forEach(btn => {
    btn.style.transition = "transform 0.4s ease";
    btn.style.transform = "scale(1.03)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 400);
  });
}, 8000);



/* ================================
   3️⃣ INITIATE CHECKOUT TRACKING
   ================================ */

document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'InitiateCheckout');
    }
  });
});



/* ==========================================
   4️⃣ ORDERLA PURCHASE EVENT BRIDGE (CRITICAL)
   ========================================== */

/*
  Detect Orderla success message dynamically.
  Adjust successText if needed based on Orderla's final message.
*/

const successText = "Thank you"; // update if Orderla shows different message

const observer = new MutationObserver(() => {

  if (document.body.innerText.includes(successText)) {

    if (typeof fbq !== 'undefined') {

      fbq('track', 'Purchase', {
        value: 78.99,
        currency: 'MYR'
      });

      console.log("Meta Purchase Event Fired");
    }

    observer.disconnect(); // prevent duplicate firing
  }

});

observer.observe(document.body, {
  childList: true,
  subtree: true
});



/* ================================
   5️⃣ SCROLL DEPTH TRACKING (Optional Boost)
   ================================ */

let scroll25 = false;
let scroll50 = false;
let scroll75 = false;

window.addEventListener("scroll", () => {

  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.body.offsetHeight;

  const scrollPercent = (scrollPosition / pageHeight) * 100;

  if (scrollPercent > 25 && !scroll25) {
    scroll25 = true;
    if (typeof fbq !== 'undefined') fbq('trackCustom', 'Scroll25');
  }

  if (scrollPercent > 50 && !scroll50) {
    scroll50 = true;
    if (typeof fbq !== 'undefined') fbq('trackCustom', 'Scroll50');
  }

  if (scrollPercent > 75 && !scroll75) {
    scroll75 = true;
    if (typeof fbq !== 'undefined') fbq('trackCustom', 'Scroll75');
  }

});
