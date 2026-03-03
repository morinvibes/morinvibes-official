/**
 * MORINVIBES® - META PIXEL (Performance Optimized)
 * Version: 3.0 - Lightweight, no lag
 * 
 * Features:
 * - Simple initialization
 * - Button click tracking
 * - Orderla success detection (minimal)
 * - NO MutationObserver
 * - NO scroll listeners
 */

(function() {
    'use strict';

    // ===== CONFIG =====
    const config = {
        pixelId: 'PIXEL_ID', // REPLACE WITH YOUR ACTUAL ID
        price: 89.00,
        currency: 'MYR',
        productName: 'MorinVibes Moringa Capsules'
    };

    // Skip if no pixel ID
    if (config.pixelId === 'PIXEL_ID') {
        console.warn('Meta Pixel: Please set your Pixel ID');
        return;
    }

    // ===== LOAD PIXEL (Standard Facebook code) =====
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    // Initialize
    fbq('init', config.pixelId);
    fbq('track', 'PageView');

    // ===== TRACK BUTTON CLICKS (One listener) =====
    document.addEventListener('click', function(e) {
        // Check if clicked element or parent is a buy button
        const isBuyButton = e.target.closest('.btn-primary, [href*="#buy"], .nav-cta, .mobile-bottom a:last-child');
        
        if (isBuyButton) {
            fbq('track', 'InitiateCheckout', {
                value: config.price,
                currency: config.currency,
                content_name: config.productName,
                content_type: 'product'
            });
        }
    });

    // ===== TRACK PAGE VIEWS (Simple) =====
    if (window.location.pathname.includes('shop.html')) {
        setTimeout(() => {
            fbq('track', 'ViewContent', {
                value: config.price,
                currency: config.currency,
                content_name: config.productName
            });
        }, 2000);
    }

    // ===== ORDERLA SUCCESS DETECTION (Simple check, no observer) =====
    let attempts = 0;
    const maxAttempts = 15; // Check 15 times max
    
    const checkOrderla = setInterval(() => {
        attempts++;
        
        // Simple text check
        const bodyText = document.body.innerText || '';
        if (bodyText.includes('Thank you') || 
            bodyText.includes('Terima kasih') || 
            bodyText.includes('success') ||
            bodyText.includes('Order Complete')) {
            
            fbq('track', 'Purchase', {
                value: config.price,
                currency: config.currency,
                content_name: config.productName,
                content_type: 'product'
            });
            
            clearInterval(checkOrderla);
        }
        
        // Stop after max attempts
        if (attempts >= maxAttempts) {
            clearInterval(checkOrderla);
        }
    }, 1000); // Check every second

    console.log('✅ Meta Pixel: Active');
})();
