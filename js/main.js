/**
 * MORINVIBES® Core Infrastructure Script v8.0
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Language Path Detection & Switching
    const langLinks = document.querySelectorAll('.lang-link');
    const currentPath = window.location.pathname;

    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Simplified logic for simulation:
            // Path logic: / -> /bm/index.html -> /zh/index.html
            const targetLang = e.target.textContent.trim();
            if(targetLang === 'BM') window.location.href = '/bm/index.html';
            if(targetLang === '中文') window.location.href = '/zh/index.html';
            if(targetLang === 'EN') window.location.href = '/index.html';
        });
    });

    // 2. Scroll Reveal System
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 3. Invisible Tracking Hooks (Meta Pixel / GA4)
    const trackEvent = (name, params = {}) => {
        console.log(`[Tracking] ${name}`, params);
        // if(window.fbq) fbq('track', name, params);
        // if(window.gtag) gtag('event', name, params);
    };

    // Track "AddToCart" on Shopee/Orderla clicks
    document.querySelectorAll('.btn-solid').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('AddToCart', { 
                content_name: 'Premium Moringa', 
                currency: 'MYR', 
                value: 65.00 
            });
        });
    });
});
