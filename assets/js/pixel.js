/**
 * MORINVIBES® - META PIXEL + ORDERLA BRIDGE
 * With Shopee referral tracking and complete e-commerce events
 * Version: 3.0 - Zero Lag, Memory Efficient
 * 
 * Features:
 * - Meta Pixel installation
 * - PageView tracking on all pages
 * - ViewContent on product pages
 * - InitiateCheckout on buy buttons
 * - Purchase tracking from Orderla
 * - Lead tracking on farm/quality pages
 * - Scroll depth tracking (25%, 50%, 75%, 100%)
 * - Shopee referral tracking
 * - WhatsApp click tracking
 * - V element interaction tracking
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
        shopeeStores: ['MorinVibes', 'moringa_morinvibes'],
        lazadaStore: 'MorinVibes',
        debug: false // Set to false in production
    };

    // Skip if no pixel ID (development)
    if (config.pixelId === 'PIXEL_ID') {
        if (config.debug) {
            console.log('🔵 Meta Pixel: Please set your Pixel ID in pixel.js');
        }
        return;
    }

    // ===== DEBUG LOGGER =====
    const log = (...args) => {
        if (config.debug) {
            console.log('🔵 [Meta Pixel]', ...args);
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
        
        log('Pixel initialized with ID:', config.pixelId);
        
        // Also track user language
        const userLang = localStorage.getItem('morinvibes_lang') || 'en';
        fbq('trackCustom', 'UserLanguage', { language: userLang });
    };

    // ===== TRACK PAGE VIEWS =====
    const trackPageView = () => {
        if (!window.fbq) return;
        
        fbq('track', 'PageView');
        log('PageView tracked');
        
        // Track page type for better segmentation
        const pageType = getPageType();
        fbq('trackCustom', 'PageType', { type: pageType });
    };

    // ===== GET PAGE TYPE =====
    const getPageType = () => {
        const path = window.location.pathname;
        if (path.includes('index') || path.endsWith('/')) return 'home';
        if (path.includes('farm')) return 'farm';
        if (path.includes('quality')) return 'quality';
        if (path.includes('shop')) return 'shop';
        if (path.includes('story')) return 'story';
        if (path.includes('faq')) return 'faq';
        return 'other';
    };

    // ===== TRACK VIEW CONTENT =====
    const trackViewContent = () => {
        if (!window.fbq) return;
        
        // Track on product pages
        if (window.location.pathname.includes('shop.html') || 
            window.location.pathname.includes('product')) {
            
            setTimeout(() => {
                fbq('track', 'ViewContent', {
                    content_name: config.productName,
                    content_category: 'Moringa Capsules',
                    content_ids: [config.productId],
                    content_type: 'product',
                    value: config.price,
                    currency: config.currency
                });
                log('ViewContent tracked (product page)');
            }, 2000);
        }
        
        // Track on farm/quality pages (interest signals)
        if (window.location.pathname.includes('farm.html') || 
            window.location.pathname.includes('quality.html')) {
            
            setTimeout(() => {
                fbq('track', 'ViewContent', {
                    content_name: getPageType(),
                    content_category: 'Education'
                });
                log('ViewContent tracked (educational page)');
            }, 5000);
        }
    };

    // ===== TRACK INITIATE CHECKOUT =====
    const trackInitiateCheckout = () => {
        if (!window.fbq) return;
        
        // Track when user clicks any buy button
        document.addEventListener('click', (e) => {
            const buyButton = e.target.closest(
                '.btn-primary, .nav-cta, [href*="#buy"], .mobile-bottom a:last-child, .product-card .btn, .btn:contains("Buy")'
            );
            
            if (buyButton) {
                fbq('track', 'InitiateCheckout', {
                    content_name: config.productName,
                    content_category: 'Moringa Capsules',
                    content_ids: [config.productId],
                    content_type: 'product',
                    value: config.price,
                    currency: config.currency,
                    num_items: 1
                });
                log('InitiateCheckout tracked');
            }
        });
    };

    // ===== TRACK LEAD (Interest) =====
    const trackLead = () => {
        if (!window.fbq) return;
        
        // Track if user spends 30+ seconds on farm or quality pages
        if (window.location.pathname.includes('farm.html') || 
            window.location.pathname.includes('quality.html') ||
            window.location.pathname.includes('story.html')) {
            
            let leadTracked = false;
            
            const leadTimer = setTimeout(() => {
                if (!leadTracked) {
                    fbq('track', 'Lead', {
                        content_name: getPageType(),
                        content_category: 'Education',
                        value: 1,
                        currency: 'MYR'
                    });
                    leadTracked = true;
                    log('Lead tracked (30s on page)');
                }
            }, 30000);
            
            // Clear timer if user leaves page early
            window.addEventListener('beforeunload', () => {
                clearTimeout(leadTimer);
            });
        }
    };

    // ===== TRACK SHOPEE REFERRAL =====
    const trackShopeeReferral = () => {
        if (!window.fbq) return;
        
        // Check if user came from Shopee
        const referrer = document.referrer || '';
        if (referrer.includes('shopee') || referrer.includes('shopee.com.my')) {
            fbq('trackCustom', 'ShopeeReferral', {
                referrer: referrer,
                landing_page: window.location.pathname
            });
            log('Shopee referral tracked');
        }
        
        // Track clicks to Shopee links
        document.addEventListener('click', (e) => {
            const shopeeLink = e.target.closest('a[href*="shopee"], .shopee-badge, .store-id');
            if (shopeeLink) {
                fbq('trackCustom', 'ShopeeClick', {
                    store: config.shopeeStores.join(' or '),
                    destination: 'Shopee'
                });
                log('Shopee click tracked');
            }
            
            // Track clicks to WhatsApp
            const whatsappLink = e.target.closest('.btn-whatsapp, a[href*="wa.me"], a[href*="whatsapp"]');
            if (whatsappLink) {
                fbq('trackCustom', 'WhatsAppClick', {
                    page: getPageType()
                });
                log('WhatsApp click tracked');
            }
        });
    };

    // ===== TRACK V ELEMENT INTERACTIONS =====
    const trackVInteractions = () => {
        if (!window.fbq) return;
        
        document.addEventListener('click', (e) => {
            const vElement = e.target.closest('.v-icon, .v-icon-large, .v-icon-small, .v-divider');
            if (vElement) {
                fbq('trackCustom', 'VElementClick', {
                    element_type: vElement.className,
                    page: getPageType()
                });
                log('V element interaction tracked');
            }
        });
    };

    // ===== ORDERLA PURCHASE BRIDGE (CRITICAL) =====
    const setupOrderlaBridge = () => {
        if (!window.fbq) return;
        
        log('Setting up Orderla purchase bridge...');
        
        // Success indicators in multiple languages
        const successIndicators = [
            'Thank you', 'Terima kasih', '谢谢', '成功',
            'Order Complete', 'Pesanan Berjaya', '订单成功',
            'success', 'berjaya', 'complete', 'thankyou',
            'payment successful', 'pembayaran berjaya', '支付成功'
        ];
        
        let purchaseTracked = false;
        let checkCount = 0;
        const MAX_CHECKS = 30; // Stop after 30 checks (30 seconds)
        
        // Check for success message
        const checkForSuccess = setInterval(() => {
            checkCount++;
            
            // Check body text
            const bodyText = document.body.innerText || '';
            if (!purchaseTracked && successIndicators.some(word => 
                bodyText.toLowerCase().includes(word.toLowerCase()))) {
                trackPurchase('text_detection');
            }
            
            // Check URL parameters
            if (!purchaseTracked && (
                window.location.href.toLowerCase().includes('success') ||
                window.location.href.toLowerCase().includes('complete') ||
                window.location.href.toLowerCase().includes('thankyou') ||
                window.location.href.toLowerCase().includes('berjaya')
            )) {
                trackPurchase('url_detection');
            }
            
            // Check for Orderla iframe (if exists)
            const orderlaIframe = document.querySelector('#orderla-embed iframe');
            if (!purchaseTracked && orderlaIframe) {
                try {
                    // Try to access iframe content (if same origin)
                    if (orderlaIframe.contentDocument) {
                        const iframeText = orderlaIframe.contentDocument.body.innerText || '';
                        if (successIndicators.some(word => iframeText.toLowerCase().includes(word.toLowerCase()))) {
                            trackPurchase('iframe_content');
                        }
                    }
                } catch (e) {
                    // Cross-origin iframe - can't access content
                    // Check iframe src instead
                    if (orderlaIframe.src && (
                        orderlaIframe.src.toLowerCase().includes('success') ||
                        orderlaIframe.src.toLowerCase().includes('complete')
                    )) {
                        trackPurchase('iframe_src');
                    }
                }
            }
            
            // Check for specific Orderla success elements
            const successElements = document.querySelectorAll('.orderla-success, .payment-success, [class*="success"]');
            if (!purchaseTracked && successElements.length > 0) {
                trackPurchase('element_detection');
            }
            
            // Stop after max checks
            if (checkCount >= MAX_CHECKS || purchaseTracked) {
                clearInterval(checkForSuccess);
                log('Orderla bridge stopped after ' + checkCount + ' checks');
            }
        }, 1000); // Check every second
        
        // Track purchase event
        function trackPurchase(method) {
            if (purchaseTracked) return;
            
            purchaseTracked = true;
            
            // Generate transaction ID
            const transactionId = 'MV_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            
            fbq('track', 'Purchase', {
                value: config.price,
                currency: config.currency,
                content_name: config.productName,
                content_type: 'product',
                content_ids: [config.productId],
                transaction_id: transactionId,
                num_items: 1
            });
            
            log('🎉 Purchase tracked from Orderla! Detection method:', method);
            
            // Also track custom event for Orderla success
            fbq('trackCustom', 'OrderlaSuccess', {
                method: method,
                transaction_id: transactionId
            });
            
            clearInterval(checkForSuccess);
        }
    };

    // ===== SCROLL DEPTH TRACKING =====
    const setupScrollTracking = () => {
        if (!window.fbq) return;
        
        let trackedDepths = {
            25: false,
            50: false,
            75: false,
            100: false
        };
        
        // Use Intersection Observer for scroll depth
        if ('IntersectionObserver' in window) {
            // Create sentinel elements
            const depths = [25, 50, 75, 100];
            const sentinels = [];
            
            depths.forEach(depth => {
                const sentinel = document.createElement('div');
                sentinel.className = 'scroll-sentinel';
                sentinel.dataset.depth = depth;
                sentinel.style.cssText = `
                    position: absolute;
                    height: 1px;
                    width: 100%;
                    pointer-events: none;
                    opacity: 0;
                `;
                
                // Position based on depth
                if (depth < 100) {
                    sentinel.style.top = depth + '%';
                } else {
                    sentinel.style.bottom = '0';
                }
                
                document.body.appendChild(sentinel);
                sentinels.push(sentinel);
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
                                page: getPageType()
                            });
                            
                            log(`Scroll depth ${depth}% tracked`);
                        }
                    }
                });
            }, {
                threshold: 0.1
            });
            
            sentinels.forEach(sentinel => {
                scrollObserver.observe(sentinel);
            });
            
            // Store observer for cleanup
            window.scrollObserver = scrollObserver;
        }
    };

    // ===== TRACK TIME ON PAGE =====
    const setupTimeTracking = () => {
        if (!window.fbq) return;
        
        const startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            
            if (timeSpent > 10) { // Only track if more than 10 seconds
                fbq('trackCustom', 'TimeOnPage', {
                    page: getPageType(),
                    seconds: timeSpent,
                    minutes: Math.round(timeSpent / 60 * 10) / 10
                });
                log(`Time on page: ${timeSpent}s`);
            }
        });
    };

    // ===== TRACK EXTERNAL LINKS =====
    const trackExternalLinks = () => {
        if (!window.fbq) return;
        
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Track external links
            if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                fbq('trackCustom', 'ExternalLinkClick', {
                    url: href,
                    page: getPageType()
                });
                log('External link tracked:', href);
            }
        });
    };

    // ===== CLEANUP =====
    const cleanup = () => {
        window.addEventListener('beforeunload', () => {
            if (window.scrollObserver) {
                window.scrollObserver.disconnect();
            }
            if (window.fbq) {
                // Final heartbeat
                fbq('trackCustom', 'SessionEnd', {
                    page: getPageType()
                });
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
        trackShopeeReferral();
        trackVInteractions();
        setupOrderlaBridge();
        setupScrollTracking();
        setupTimeTracking();
        trackExternalLinks();
        cleanup();
        
        log('Meta Pixel fully initialized with all events');
        
        // Expose for debugging if needed
        window.MorinVibesPixel = {
            trackPurchase: (value = config.price) => {
                fbq('track', 'Purchase', {
                    value: value,
                    currency: config.currency,
                    content_name: config.productName
                });
            },
            trackCustom: (event, params) => {
                fbq('trackCustom', event, params);
            },
            getConfig: () => config
        };
    };

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
