/**
 * MorinVibes® Premium Brand Logic v1.0
 * Architect: Gemini x MorinVibes
 * Features: High-Performance Scroll Reveals, Meta Event Tracking, Dynamic Urgency
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SMART REVEAL ON SCROLL (The Treelogy Look) ---
    // Uses IntersectionObserver for better performance than 'window.onscroll'
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    // --- 2. META ADS TRACKING (The "Money" Logic) ---
    // We track every high-intent action to train your RM 50/day Meta Ads
    const trackEvent = (eventName, params = {}) => {
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, params);
            console.log(`[Meta Tracking] ${eventName} fired`, params);
        } else {
            console.warn(`[Meta Tracking] Pixel not loaded for ${eventName}`);
        }
    };

    // Tracking: Clicks on "Order Now" buttons across the page
    document.querySelectorAll('a[href="#order"]').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('InitiateCheckout', { content_name: 'Moringa 90s Bottle' });
        });
    });

    // Tracking: Interaction with the Orderla Iframe
    // Because we can't see inside an Iframe, we detect when the container is clicked
    const orderContainer = document.getElementById('orderla-container');
    let hasInteractedWithForm = false;

    if (orderContainer) {
        orderContainer.addEventListener('mousedown', () => {
            if (!hasInteractedWithForm) {
                trackEvent('AddToCart', { 
                    content_name: 'Moringa 90s', 
                    currency: 'MYR', 
                    value: 120.00 // Adjust based on your pricing
                });
                hasInteractedWithForm = true; // Only fire once per session
            }
        });
    }


    // --- 3. DYNAMIC PARALLAX (Product Bottle) ---
    // Makes the bottle image react to mouse movement (Desktop Only)
    const heroImage = document.querySelector('.main-bottle');
    if (heroImage && window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroImage.style.transform = `translate(${moveX}px, ${moveY}px) translateY(0px)`;
            // Note: Keep the floating animation active via CSS, this just adds an extra layer
        });
    }


    // --- 4. THE "TRUST & URGENCY" ENGINE ---
    // Simulates a "Live Stock" feel to encourage conversion
    const updateUrgency = () => {
        const stockElement = document.getElementById('stock-count');
        if (stockElement) {
            let currentStock = 14; // Start with a random small number
            const interval = setInterval(() => {
                if (currentStock > 3) {
                    currentStock -= Math.floor(Math.random() * 2);
                    stockElement.innerText = currentStock;
                } else {
                    clearInterval(interval);
                }
            }, 15000); // Reduce every 15 seconds
        }
    };
    updateUrgency();


    // --- 5. SMOOTH ANCHOR SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for the fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 6. NAVIGATION SCROLL EFFECT ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = "10px 0";
            nav.style.background = "rgba(255, 255, 255, 0.95)";
            nav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
        } else {
            nav.style.padding = "20px 0";
            nav.style.background = "rgba(255, 255, 255, 0.8)";
            nav.style.boxShadow = "none";
        }
    });

});
