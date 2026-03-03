/* =====================================================
   ENTERPRISE UX + TRACKING SCRIPT
   Premium Production Version
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       SMOOTH SCROLL NAVIGATION
    ============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* ==============================
       STICKY NAVBAR SHADOW EFFECT
    ============================== */
    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                navbar.style.transition = "0.3s ease";
            } else {
                navbar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
            }
        });
    }


    /* ==============================
       FADE-IN SCROLL ANIMATION
    ============================== */
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => observer.observe(el));


    /* ==============================
       CONTACT FORM VALIDATION
    ============================== */
    const form = document.querySelector("#contactForm");

    if (form) {

        const nameInput = document.querySelector("#name");
        const emailInput = document.querySelector("#email");
        const messageInput = document.querySelector("#message");
        const submitBtn = form.querySelector("button[type='submit']");

        function showError(input, message) {
            const formGroup = input.parentElement;
            const error = formGroup.querySelector(".error-message");

            if (error) {
                error.innerText = message;
                error.style.display = "block";
            }

            input.style.borderColor = "#dc3545";
        }

        function clearError(input) {
            const formGroup = input.parentElement;
            const error = formGroup.querySelector(".error-message");

            if (error) {
                error.innerText = "";
                error.style.display = "none";
            }

            input.style.borderColor = "#ced4da";
        }

        function validateEmail(email) {
            const regex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email.toLowerCase());
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let valid = true;

            // Name validation
            if (nameInput.value.trim() === "") {
                showError(nameInput, "Please enter your full name.");
                valid = false;
            } else {
                clearError(nameInput);
            }

            // Email validation
            if (emailInput.value.trim() === "") {
                showError(emailInput, "Please enter your email address.");
                valid = false;
            } else if (!validateEmail(emailInput.value)) {
                showError(emailInput, "Please enter a valid email address.");
                valid = false;
            } else {
                clearError(emailInput);
            }

            // Message validation
            if (messageInput.value.trim().length < 10) {
                showError(messageInput, "Message must be at least 10 characters.");
                valid = false;
            } else {
                clearError(messageInput);
            }

            if (!valid) return;

            /* ==============================
               BUTTON LOADING STATE
            ============================== */
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";
            submitBtn.style.opacity = "0.7";


            /* ==============================
               TRACKING EVENTS
            ============================== */

            // Google Analytics 4
            if (typeof gtag === "function") {
                gtag("event", "contact_form_submit", {
                    event_category: "engagement",
                    event_label: "Contact Form",
                    value: 1
                });
            }

            // Meta Pixel
            if (typeof fbq === "function") {
                fbq("track", "Lead");
            }


            /* ==============================
               SIMULATED SUBMISSION
               (Replace with real backend)
            ============================== */
            setTimeout(() => {

                alert("Thank you! Your message has been sent successfully.");

                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
                submitBtn.style.opacity = "1";

            }, 1500);
        });
    }


    /* ==============================
       BUTTON CLICK TRACKING
    ============================== */
    document.querySelectorAll(".btn-primary").forEach(button => {
        button.addEventListener("click", function () {

            if (typeof gtag === "function") {
                gtag("event", "cta_click", {
                    event_category: "conversion",
                    event_label: this.innerText
                });
            }

            if (typeof fbq === "function") {
                fbq("trackCustom", "CTA_Click");
            }
        });
    });


    /* ==============================
       SCROLL DEPTH TRACKING
    ============================== */
    let scrollTracked = false;

    window.addEventListener("scroll", () => {
        const scrollPercent =
            (window.scrollY + window.innerHeight) /
            document.documentElement.scrollHeight;

        if (scrollPercent > 0.75 && !scrollTracked) {

            if (typeof gtag === "function") {
                gtag("event", "scroll_75_percent", {
                    event_category: "engagement"
                });
            }

            scrollTracked = true;
        }
    });

});
