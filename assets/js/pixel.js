/**
 * MORINVIBES® - META PIXEL (Vivid Brand)
 * Version: 3.0 - Lightweight Tracking
 * 
 * Tracks:
 * - Page views
 * - Button clicks
 * - Purchases from Orderla
 * - Product views
 */

(function() {
    'use strict';

    // ===== CONFIG =====
    const config = {
        pixelId: 'PIXEL_ID', // REPLACE WITH YOUR ACTUAL ID
        price: 89.00,
        currency: 'MYR',
        productName: 'MorinVibes Moringa Capsules',
        productId: 'MV001'
    };

    // Skip if no pixel ID
    if (config.pixelId === 'PIXEL_ID') {
        console.log('Meta Pixel: Please set your Pixel ID');
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
        // Buy buttons
        const buyButton = e.target.closest('.btn-primary, [href*="#buy"], .nav-cta, .mobile-bottom a:last-child, .product-card .btn');
        
        if (buyButton) {
            fbq('track', 'InitiateCheckout', {
                value: config.price,
                currency: config.currency,
                content_name: config.productName,
                content_type: 'product',
                content_ids: [config.productId]
            });
            console.log('Pixel: Checkout tracked');
        }
        
        // View product details
        const productView = e.target.closest('.product-stat, .product-showcase, [data-track="view"]');
        if (productView) {
            fbq('track', 'ViewContent', {
                value: config.price,
                currency: config.currency,
                content_name: config.productName,
                content_type: 'product'
            });
        }
    });

    // ===== TRACK PAGE VIEWS =====
    if (window.location.pathname.includes('shop.html') || 
        window.location.pathname.includes('product')) {
        
        setTimeout(() => {
            fbq('track', 'ViewContent', {
                value: config.price,
                currency: config.currency,
                content_name: config.productName,
                content_type: 'product'
            });
        }, 2000);
    }

    // ===== TRACK FARM/QUALITY INTEREST =====
    if (window.location.pathname.includes('farm.html') || 
        window.location.pathname.includes('quality.html')) {
        
        setTimeout(() => {
            fbq('track', 'Lead', {
                content_name: 'Farm Quality Page',
                content_category: 'Education'
            });
        }, 30000); // 30 seconds = interested
    }

    // ===== ORDERLA SUCCESS DETECTION (Simple) =====
    let attempts = 0;
    const maxAttempts = 20;
    
    const checkOrderla = setInterval(() => {
        attempts++;
        
        // Check for success indicators
        const bodyText = document.body.innerText || '';
        const successWords = [
            'Thank you', 'Terima kasih', '谢谢', 
            'success', 'berjaya', '成功',
            'Order Complete', 'Pesanan Berjaya',
            'payment successful', 'pembayaran berjaya'
        ];
        
        if (successWords.some(word => bodyText.includes(word))) {
            fbq('track', 'Purchase', {
                value: config.price,
                currency: config.currency,
                content_name: config.productName,
                content_type: 'product',
                content_ids: [config.productId]
            });
            
            console.log('🎉 Pixel: Purchase tracked from Orderla');
            clearInterval(checkOrderla);
        }
        
        // Also check URL for success parameters
        if (window.location.href.includes('success') || 
            window.location.href.includes('complete')) {
            
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
    }, 1000); // Check every second for 20 seconds

    // ===== TRACK CUSTOM EVENTS =====
    window.MorinVibesPixel = {
        trackPurchase: (value = config.price) => {
            fbq('track', 'Purchase', {
                value: value,
                currency: config.currency,
                content_name: config.productName
            });
        },
        trackCheckout: () => {
            fbq('track', 'InitiateCheckout', {
                value: config.price,
                currency: config.currency
            });
        }
    };

    console.log('✅ Meta Pixel: Active for MorinVibes');
})();
