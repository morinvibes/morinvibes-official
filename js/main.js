/* ========================================
   MORINVIBES WEBSITE SCRIPT
   Clean Professional Build
======================================== */

/* ========= 1. MOBILE NAVIGATION TOGGLE ========= */
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector(".nav-menu");

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        mobileMenuBtn.classList.toggle("open");
    });
}

/* ========= 2. SMOOTH SCROLL FOR NAV LINKS ========= */
const navLinks = document.querySelectorAll("a[href^='#']");

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: "smooth"
            });
        }

        // Close mobile menu after click
        if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
        }
    });
});

/* ========= 3. STICKY HEADER ON SCROLL ========= */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* ========= 4. SCROLL REVEAL ANIMATION ========= */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);


/* ========= 5. PRODUCT QUANTITY SELECTOR ========= */
const minusBtn = document.querySelector(".qty-minus");
const plusBtn = document.querySelector(".qty-plus");
const qtyInput = document.querySelector(".qty-input");

if (minusBtn && plusBtn && qtyInput) {
    minusBtn.addEventListener("click", () => {
        let currentValue = parseInt(qtyInput.value);
        if (currentValue > 1) {
            qtyInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener("click", () => {
        let currentValue = parseInt(qtyInput.value);
        qtyInput.value = currentValue + 1;
    });
}


/* ========= 6. CONTACT FORM VALIDATION ========= */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all required fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("Thank you for contacting Morinvibes. We will get back to you soon!");
        contactForm.reset();
    });
}

/* ========= EMAIL VALIDATION FUNCTION ========= */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
