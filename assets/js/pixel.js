/**
 * MORINVIBES® - META PIXEL (LIGHTWEIGHT)
 * Version: 2.0
 * 
 * Simple, reliable tracking without complex observers
 */

(function() {
    'use strict';

    // ===== CONFIG =====
    const PIXEL_ID = 'PIXEL_ID'; // REPLACE WITH YOUR ACTUAL ID
    const PRODUCT_PRICE = 89.00;
    const PRODUCT_CURRENCY = 'MYR';

    // ===== INITIALIZE PIXEL (Only if not in dev) =====
    const initPixel = () => {
        // Skip if localhost (optional)
        if (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1') {
            console.log('Meta Pixel: Skipped in development');
            return;
        }

        // Load pixel script
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');

        // Initialize
        fbq('init', PIXEL_ID);
        
        // Track PageView
        fbq('track', 'PageView');
        
        console.log('Meta Pixel: Initialized');
    };

    // ===== TRACK BUTTON CLICKS (Simple) =====
    const trackClicks = () => {
        // Track "Buy" buttons
        document.querySelectorAll('.btn-primary, [href*="#buy"], .nav-cta, .mobile-bottom-bar a:last-child').forEach(btn => {
            btn.addEventListener('click', function() {
                if (window.fbq) {
                    fbq('track', 'InitiateCheckout', {
                        value: PRODUCT_PRICE,
                        currency: PRODUCT_CURRENCY,
                        content_name: 'Moringa Capsules'
                    });
                    console.log('Pixel: Checkout tracked');
                }
            });
        });

        // Track "Shop" page views
        if (window.location.pathname.includes('shop.html')) {
            setTimeout(() => {
                if (window.fbq) {
                    fbq('track', 'ViewContent', {
                        value: PRODUCT_PRICE,
                        currency: PRODUCT_CURRENCY,
                        content_name: 'Moringa Capsules'
                    });
                }
            }, 2000);
        }
    };

    // ===== ORDERLA BRIDGE (Simple - check for success message) =====
    const trackOrderlaSuccess = () => {
        // Simple check - runs 3 times only
        let attempts = 0;
        const maxAttempts = 10;
        
        const checkForSuccess = setInterval(() => {
            attempts++;
            
            // Check if success message appears anywhere
            const bodyText = document.body.innerText || '';
            if (bodyText.includes('Thank you') || 
                bodyText.includes('Terima kasih') || 
                bodyText.includes('success')) {
                
                if (window.fbq) {
                    fbq('track', 'Purchase', {
                        value: PRODUCT_PRICE,
                        currency: PRODUCT_CURRENCY,
                        content_name: 'Moringa Capsules',
                        content_type: 'product'
                    });
                    console.log('Pixel: Purchase tracked from Orderla');
                }
                
                clearInterval(checkForSuccess);
            }
            
            // Stop after max attempts
            if (attempts >= maxAttempts) {
                clearInterval(checkForSuccess);
            }
        }, 1000); // Check every second
    };

    // ===== START =====
    initPixel();
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            trackClicks();
            trackOrderlaSuccess();
        });
    } else {
        trackClicks();
        trackOrderlaSuccess();
    }

})();
