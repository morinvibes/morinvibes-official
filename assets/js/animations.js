/**
 * MORINVIBES® - META PIXEL + ORDERLA BRIDGE
 * Colors: #0097b2 (Primary) | #61cad8 (Secondary)
 * Version: 1.0 - Zero Lag, Memory Efficient
 * 
 * Features:
 * - Meta Pixel installation
 * - Event tracking (PageView, ViewContent, InitiateCheckout, Purchase)
 * - Orderla purchase detection (with cleanup)
 * - Scroll depth tracking (optional)
 * - No memory leaks
 */

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const config = {
        pixelId: 'PIXEL_ID', // REPLACE WITH YOUR ACTUAL PIXEL ID
        price: 89.00,
        currency: 'MYR',
        productName: 'MorinVibes Moringa Capsules',
        productId: 'MV001',
        debug: false // Set to false in production
    };

    // Skip if no pixel ID (development)
    if (config.pixelId === 'PIXEL_ID') {
        if (config.debug) {
            console.log('Meta Pixel: Please set your Pixel ID in pixel.js');
        }
        return;
    }

    // ===== DEBUG LOGGER =====
    const log = (...args) => {
        if (config.debug) {
            console.log('[Meta Pixel]', ...args);
        }
    };

    // ===== LOAD META PIXEL =====
    const loadPixel = () => {
        // Standard Facebook Pixel code
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
        
        log('Pixel initialized');
    };

    // ===== TRACK PAGE VIEWS =====
    const trackPageView = () => {
        if (!window.fbq) return;
        
        fbq('track', 'PageView');
        log('PageView tracked');
    };

    // ===== TRACK VIEW CONTENT =====
    const trackViewContent = () => {
        if (!window.fbq) return;
        
        // Track on product pages
        if (window.location.pathname.includes('shop.html')) {
            setTimeout(() => {
                fbq('track', 'ViewContent', {
                    content_name: config.productName,
                    content_category: 'Moringa Capsules',
                    content_ids: [config.productId],
                    content_type: 'product',
                    value: config.price,
                    currency: config.currency
                });
                log('ViewContent tracked');
            }, 2000);
        }
    };

    // ===== TRACK INITIATE CHECKOUT =====
    const trackInitiateCheckout = () => {
        if (!window.fbq) return;
        
        // Track when user clicks any buy button
        document.addEventListener('click', (e) => {
            const buyButton = e.target.closest(
                '.btn-primary, .nav-cta, [href*="#buy"], .mobile-bottom a:last-child, .product-card .btn'
            );
            
            if (buyButton) {
                fbq('track', 'InitiateCheckout', {
                    content_name: config.productName,
                    content_category: 'Moringa Capsules',
                    content_ids: [config.productId],
                    content_type: 'product',
                    value: config.price,
                    currency: config.currency
                });
                log('InitiateCheckout tracked');
            }
        });
    };

    // ===== TRACK LEAD (Interest on farm/quality pages) =====
    const trackLead = () => {
        if (!window.fbq) return;
        
        // Track if user spends 30+ seconds on farm or quality pages
        if (window.location.pathname.includes('farm.html') || 
            window.location.pathname.includes('quality.html')) {
            
            let leadTracked = false;
            
            setTimeout(() => {
                if (!leadTracked) {
                    fbq('track', 'Lead', {
                        content_name: window.location.pathname.replace('.html', ''),
                        content_category: 'Education'
                    });
                    leadTracked = true;
                    log('Lead tracked (30s on page)');
                }
            }, 30000);
        }
    };

    // ===== ORDERLA PURCHASE BRIDGE (CRITICAL) =====
    const setupOrderlaBridge = () => {
        if (!window.fbq) return;
        
        log('Setting up Orderla purchase bridge...');
        
        // Success indicators in multiple languages
        const successIndicators = [
            'Thank you', 'Terima kasih', '谢谢', '成功',
            'Order Complete', 'Pesanan Berjaya', '订单成功',
            'success', 'berjaya', 'complete'
        ];
        
        let purchaseTracked = false;
        let checkCount = 0;
        const MAX_CHECKS = 20; // Stop after 20 checks (prevents memory leaks)
        
        // Check for success message
        const checkForSuccess = setInterval(() => {
            checkCount++;
            
            // Check body text
            const bodyText = document.body.innerText || '';
            if (!purchaseTracked && successIndicators.some(word => bodyText.includes(word))) {
                trackPurchase();
            }
            
            // Check URL parameters
            if (!purchaseTracked && (
                window.location.href.includes('success') ||
                window.location.href.includes('complete') ||
                window.location.href.includes('thankyou')
            )) {
                trackPurchase();
            }
            
            // Check for Orderla iframe (if exists)
            const orderlaIframe = document.querySelector('#orderla-embed iframe');
            if (!purchaseTracked && orderlaIframe) {
                try {
                    // Try to access iframe content (if same origin)
                    if (orderlaIframe.contentDocument) {
                        const iframeText = orderlaIframe.contentDocument.body.innerText || '';
                        if (successIndicators.some(word => iframeText.includes(word))) {
                            trackPurchase();
                        }
                    }
                } catch (e) {
                    // Cross-origin iframe - can't access content
                    // Check iframe src instead
                    if (orderlaIframe.src && (
                        orderlaIframe.src.includes('success') ||
                        orderlaIframe.src.includes('complete')
                    )) {
                        trackPurchase();
                    }
                }
            }
            
            // Stop after max checks
            if (checkCount >= MAX_CHECKS || purchaseTracked) {
                clearInterval(checkForSuccess);
                log('Orderla bridge stopped after ' + checkCount + ' checks');
            }
        }, 1000); // Check every second
        
        // Track purchase event
        function trackPurchase() {
            if (purchaseTracked) return;
            
            purchaseTracked = true;
            
            fbq('track', 'Purchase', {
                value: config.price,
                currency: config.currency,
                content_name: config.productName,
                content_type: 'product',
                content_ids: [config.productId],
                transaction_id: generateTransactionId()
            });
            
            log('🎉 Purchase tracked from Orderla!');
            clearInterval(checkForSuccess);
        }
        
        // Generate unique transaction ID
        function generateTransactionId() {
            return 'MV_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
    };

    // ===== SCROLL DEPTH TRACKING (Optional) =====
    const setupScrollTracking = () => {
        if (!window.fbq) return;
        
        let trackedDepths = {
            25: false,
            50: false,
            75: false,
            100: false
        };
        
        // Use Intersection Observer for scroll depth (more efficient than scroll listener)
        if ('IntersectionObserver' in window) {
            const sentinels = {};
            
            // Create sentinel elements
            [25, 50, 75, 100].forEach(depth => {
                const sentinel = document.createElement('div');
                sentinel.className = 'scroll-sentinel';
                sentinel.dataset.depth = depth;
                sentinel.style.cssText = 'position: absolute; height: 1px; width: 100%; pointer-events: none;';
                
                // Position based on depth
                if (depth < 100) {
                    sentinel.style.top = depth + '%';
                } else {
                    sentinel.style.bottom = '0';
                }
                
                document.body.appendChild(sentinel);
                sentinels[depth] = sentinel;
            });
            
            // Observe sentinels
            const scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const depth = entry.target.dataset.depth;
                        
                        if (!trackedDepths[depth]) {
                            trackedDepths[depth] = true;
                            
                            fbq('trackCustom', 'ScrollDepth', {
                                depth: parseInt(depth),
                                page: window.location.pathname
                            });
                            
                            log(`Scroll depth ${depth}% tracked`);
                        }
                    }
                });
            }, {
                threshold: 0.1
            });
            
            Object.values(sentinels).forEach(sentinel => {
                scrollObserver.observe(sentinel);
            });
            
            // Store observer for cleanup
            window.scrollObserver = scrollObserver;
        }
    };

    // ===== CLEANUP =====
    const cleanup = () => {
        window.addEventListener('beforeunload', () => {
            if (window.scrollObserver) {
                window.scrollObserver.disconnect();
            }
        });
    };

    // ===== INITIALIZE =====
    const init = () => {
        loadPixel();
        trackPageView();
        trackViewContent();
        trackInitiateCheckout();
        trackLead();
        setupOrderlaBridge();
        setupScrollTracking();
        cleanup();
        
        log('Meta Pixel fully initialized');
    };

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
