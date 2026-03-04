/**
 * MorinVibes® — Meta Pixel Tracking v6.0
 * Events: PageView, ViewContent, AddToCart, InitiateCheckout, Purchase, Lead
 * Replace 'YOUR_PIXEL_ID' with your actual Meta Pixel ID
 */

(function() {
    'use strict';

    // ===== Configuration =====
    const PIXEL_ID = 'YOUR_PIXEL_ID'; // ← REPLACE WITH YOUR ACTUAL ID
    const PRODUCT_PRICE = 89;
    const PRODUCT_CURRENCY = 'MYR';
    const PRODUCT_NAME = 'MorinVibes Moringa 90s';
    const PRODUCT_ID = 'moringa-90';

    // ===== Load Meta Pixel Script =====
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    // Initialize Pixel
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
    console.log('✅ Meta Pixel initialized');

    // ===== 1. Track PageView (already done) =====

    // ===== 2. Track ViewContent on product pages =====
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
            console.log('✅ ViewContent tracked');
        }, 2000);
    }

    // ===== 3. Track AddToCart on any Buy button click =====
    document.addEventListener('click', function(e) {
        const buyButton = e.target.closest('.btn--primary, .btn--small, [href*="checkout"], .nav__mobile-right .btn');
        
        if (buyButton) {
            fbq('track', 'AddToCart', {
                content_ids: [PRODUCT_ID],
                content_name: PRODUCT_NAME,
                content_type: 'product',
                value: PRODUCT_PRICE,
                currency: PRODUCT_CURRENCY,
                num_items: 1
            });
            console.log('✅ AddToCart tracked');
        }
    });

    // ===== 4. Track InitiateCheckout on checkout page =====
    if (window.location.pathname.includes('/checkout')) {
        // Fire immediately when page loads
        fbq('track', 'InitiateCheckout', {
            content_name: PRODUCT_NAME,
            content_ids: [PRODUCT_ID],
            content_type: 'product',
            value: PRODUCT_PRICE,
            currency: PRODUCT_CURRENCY,
            num_items: 1
        });
        console.log('✅ InitiateCheckout tracked');
    }

    // ===== 5. Track Purchase on thank-you page =====
    if (window.location.pathname.includes('/thankyou')) {
        // Get quantity from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const qty = parseInt(urlParams.get('qty') || '1', 10);
        const total = qty * PRODUCT_PRICE;
        
        fbq('track', 'Purchase', {
            value: total,
            currency: PRODUCT_CURRENCY,
            content_ids: [PRODUCT_ID],
            content_name: PRODUCT_NAME,
            num_items: qty
        });
        console.log(`✅ Purchase tracked (${qty} bottle${qty > 1 ? 's' : ''})`);
    }

    // ===== 6. Track Lead on WhatsApp clicks =====
    document.addEventListener('click', function(e) {
        const waLink = e.target.closest('a[href*="wa.me"], a[href*="whatsapp"]');
        
        if (waLink) {
            fbq('track', 'Lead', {
                content_name: 'WhatsApp Contact'
            });
            console.log('✅ Lead tracked (WhatsApp)');
        }
    });

    // ===== 7. Track external links (Shopee, Lazada) =====
    document.addEventListener('click', function(e) {
        const shopeeLink = e.target.closest('a[href*="shopee"]');
        const lazadaLink = e.target.closest('a[href*="lazada"]');
        
        if (shopeeLink) {
            fbq('trackCustom', 'ShopeeClick', {
                destination: 'Shopee Store'
            });
        }
        
        if (lazadaLink) {
            fbq('trackCustom', 'LazadaClick', {
                destination: 'Lazada Store'
            });
        }
    });

})();
