/* =====================================
   MORINVIBES® BOTANICAL AUTHORITY JS
   v6.0 Minimal Performance Build
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       LANGUAGE DETECTION
    ========================== */
    const getCurrentLanguage = () => {
        const path = window.location.pathname;
        if (path.includes("/bm/")) return "bm";
        if (path.includes("/zh/")) return "zh";
        return "en";
    };

    const currentLang = getCurrentLanguage();
    console.log("Current Language:", currentLang);

    /* ==========================
       SCROLL REVEAL (SUBTLE)
    ========================== */
    const revealElements = document.querySelectorAll(".section, .social-proof, .cta");

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0px)";
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealOnScroll, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.8s ease";
        revealObserver.observe(el);
    });

    /* ==========================
       META PIXEL: AddToCart Trigger
       Fires when #order enters viewport
    ========================== */
    const orderSection = document.getElementById("order");

    if (orderSection) {
        const orderObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    console.log("Meta Pixel: AddToCart", currentLang);

                    if (typeof fbq !== "undefined") {
                        fbq('track', 'AddToCart', {
                            content_language: currentLang
                        });
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        orderObserver.observe(orderSection);
    }

    /* ==========================
       GA4 PAGE VIEW
    ========================== */
    if (typeof gtag !== "undefined") {
        gtag('event', 'page_view', {
            page_language: currentLang
        });
    }

    /* ==========================
       PURCHASE DETECTION
       Trigger only on thank-you.html
    ========================== */
    if (window.location.pathname.includes("thank-you.html")) {

        console.log("Purchase Event Triggered");

        if (typeof fbq !== "undefined") {
            fbq('track', 'Purchase', {
                currency: "MYR",
                value: 0
            });
        }

        if (typeof gtag !== "undefined") {
            gtag('event', 'purchase', {
                currency: "MYR",
                value: 0
            });
        }
    }

});
