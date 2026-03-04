/**
 * MorinVibes® — Meta Pixel Tracking v8.0
 * Events: PageView, ViewContent, AddToCart, InitiateCheckout, Purchase, Lead
 * Pixel ID: Replace 'YOUR_PIXEL_ID' with actual ID
 * GitHub Pages: /morinvibes-official/ base path
 */

(function() {
    'use strict';

    // ===== Configuration =====
    const PIXEL_ID = 'YOUR_PIXEL_ID'; // REPLACE WITH YOUR ACTUAL PIXEL ID
    const PRODUCT_PRICE = 89;
    const PRODUCT_CURRENCY = 'MYR';
    const PRODUCT_NAME = 'MorinVibes Moringa 90s';
    const PRODUCT_ID = 'moringa-90';

    // ===== Load Pixel Script =====
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
    fbq('track', 'PageView');

    // ===== Track PageView on all pages =====
    console.log('Meta Pixel: PageView tracked');

    // ===== Track ViewContent on product pages =====
    if (window.location.pathname.includes('/shop') || 
        window.location.pathname.includes('/benefits')) {
        
        setTimeout(() => {
            fbq('track', 'ViewContent', {
                content_name: PRODUCT_NAME,
                content_category: 'Moringa Capsules',
                content_ids: [PRODUCT_ID],
                content_type: 'product',
                value: PRODUCT_PRICE,
                currency: PRODUCT_CURRENCY
            });
            console.log('Meta Pixel: ViewContent tracked');
        }, 2000);
    }

    // ===== Track AddToCart on Buy Now clicks =====
    document.addEventListener('click', function(e) {
        const buyButton = e.target.closest('.btn--primary, .btn--outline, [href*="checkout"], .nav__cta, .mobile-bottom a:last-child');
        
        if (buyButton) {
            fbq('track', 'AddToCart', {
                content_ids: [PRODUCT_ID],
                content_name: PRODUCT_NAME,
                content_type: 'product',
                value: PRODUCT_PRICE,
                currency: PRODUCT_CURRENCY,
                num_items: 1
            });
            console.log('Meta Pixel: AddToCart tracked');
        }
    });

    // ===== Track InitiateCheckout on checkout page load =====
    if (window.location.pathname.includes('/checkout')) {
        fbq('track', 'InitiateCheckout', {
            content_name: PRODUCT_NAME,
            content_ids: [PRODUCT_ID],
            content_type: 'product',
            value: PRODUCT_PRICE,
            currency: PRODUCT_CURRENCY,
            num_items: 1
        });
        console.log('Meta Pixel: InitiateCheckout tracked');
    }

    // ===== Track Purchase on thank-you page =====
    if (window.location.pathname.includes('/thankyou')) {
        const urlParams = new URLSearchParams(window.location.search);
        const qty = parseInt(urlParams.get('qty') || '1', 10);
        
        fbq('track', 'Purchase', {
            value: qty * PRODUCT_PRICE,
            currency: PRODUCT_CURRENCY,
            content_ids: [PRODUCT_ID],
            content_name: PRODUCT_NAME,
            num_items: qty
        });
        console.log(`Meta Pixel: Purchase tracked (qty: ${qty})`);
    }

    // ===== Track Lead on WhatsApp clicks =====
    document.addEventListener('click', function(e) {
        const waLink = e.target.closest('a[href*="wa.me"], a[href*="whatsapp"]');
        
        if (waLink) {
            fbq('track', 'Lead', {
                content_name: 'WhatsApp Contact'
            });
            console.log('Meta Pixel: Lead tracked');
        }
    });

})();
