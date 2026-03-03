/**
 * MorinVibes® - Meta Pixel & Orderla Bridge
 * Farm-Direct Botanical Nutrition Authority
 * Version: 1.0
 * Last Updated: 2026
 * 
 * This file handles:
 * - Meta Pixel installation and event tracking
 * - Orderla purchase detection bridge
 * - Conversion tracking for RM30+ package
 * - Scroll depth tracking
 * - E-commerce events
 */

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const PIXEL_CONFIG = {
        id: 'PIXEL_ID', // IMPORTANT: Replace with your actual Meta Pixel ID
        currency: 'MYR',
        productValue: 89.00,
        productId: 'MV001',
        productName: 'MorinVibes Moringa Capsules',
        debug: false // Set to false in production
    };

    // ===== UTILITY FUNCTIONS =====

    /**
     * Debug logger
     * @param {...any} args - Arguments to log
     */
    const log = (...args) => {
        if (PIXEL_CONFIG.debug) {
            console.log('[Meta Pixel]', ...args);
        }
    };

    /**
     * Load Meta Pixel script dynamically
     */
    const loadPixelScript = () => {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (window.fbq) {
                log('Pixel already loaded');
                resolve();
                return;
            }

            // Create script element
            const script = document.createElement('script');
            script.src = 'https://connect.facebook.net/en_US/fbevents.js';
            script.async = true;
            script.defer = true;
            
            script.onload = () => {
                log('Pixel script loaded');
                resolve();
            };
            
            script.onerror = () => {
                console.error('[Meta Pixel] Failed to load script');
                reject(new Error('Failed to load Pixel script'));
            };

            document.head.appendChild(script);

            // Initialize fbq
            window.fbq = function() {
                window.fbq.callMethod ? 
                window.fbq.callMethod.apply(window.fbq, arguments) : 
                window.fbq.queue.push(arguments);
            };
            
            if (!window._fbq) window._fbq = window.fbq;
            
            window.fbq.push = window.fbq;
            window.fbq.loaded = true;
            window.fbq.version = '2.0';
            window.fbq.queue = [];
            
            // Initialize with Pixel ID
            window.fbq('init', PIXEL_CONFIG.id);
            log('Pixel initialized with ID:', PIXEL_CONFIG.id);
        });
    };

    /**
     * Track PageView event
     */
    const trackPageView = () => {
        if (!window.fbq) {
            log('fbq not available for PageView');
            return;
        }
        
        window.fbq('track', 'PageView');
        log('PageView tracked');
    };

    /**
     * Track ViewContent event
     * @param {Object} params - Additional parameters
     */
    const trackViewContent = (params = {}) => {
        if (!window.fbq) return;

        const contentParams = {
            content_name: PIXEL_CONFIG.productName,
            content_category: 'Moringa Capsules',
            content_ids: [PIXEL_CONFIG.productId],
            content_type: 'product',
            value: PIXEL_CONFIG.productValue,
            currency: PIXEL_CONFIG.currency,
            ...params
        };

        window.fbq('track', 'ViewContent', contentParams);
        log('ViewContent tracked', contentParams);
    };

    /**
     * Track AddToCart event
     * @param {Object} params - Additional parameters
     */
    const trackAddToCart = (params = {}) => {
        if (!window.fbq) return;

        const cartParams = {
            content_name: PIXEL_CONFIG.productName,
            content_category: 'Moringa Capsules',
            content_ids: [PIXEL_CONFIG.productId],
            content_type: 'product',
            value: PIXEL_CONFIG.productValue,
            currency: PIXEL_CONFIG.currency,
            ...params
        };

        window.fbq('track', 'AddToCart', cartParams);
        log('AddToCart tracked', cartParams);
    };

    /**
     * Track InitiateCheckout event
     * @param {Object} params - Additional parameters
     */
    const trackInitiateCheckout = (params = {}) => {
        if (!window.fbq) return;

        const checkoutParams = {
            content_name: PIXEL_CONFIG.productName,
            content_category: 'Moringa Capsules',
            content_ids: [PIXEL_CONFIG.productId],
            content_type: 'product',
            value: PIXEL_CONFIG.productValue,
            currency: PIXEL_CONFIG.currency,
            num_items: 1,
            ...params
        };

        window.fbq('track', 'InitiateCheckout', checkoutParams);
        log('InitiateCheckout tracked', checkoutParams);
    };

    /**
     * Track Purchase event
     * @param {Object} params - Additional parameters
     */
    const trackPurchase = (params = {}) => {
        if (!window.fbq) return;

        const purchaseParams = {
            content_name: PIXEL_CONFIG.productName,
            content_category: 'Moringa Capsules',
            content_ids: [PIXEL_CONFIG.productId],
            content_type: 'product',
            value: PIXEL_CONFIG.productValue,
            currency: PIXEL_CONFIG.currency,
            num_items: 1,
            ...params
        };

        window.fbq('track', 'Purchase', purchaseParams);
        log('Purchase tracked', purchaseParams);
    };

    /**
     * Track Lead event (for warm audiences)
     * @param {Object} params - Additional parameters
     */
    const trackLead = (params = {}) => {
        if (!window.fbq) return;

        window.fbq('track', 'Lead', params);
        log('Lead tracked', params);
    };

    /**
     * Track custom event
     * @param {string} eventName - Custom event name
     * @param {Object} params - Event parameters
     */
    const trackCustom = (eventName, params = {}) => {
        if (!window.fbq) return;

        window.fbq('trackCustom', eventName, params);
        log(`Custom event "${eventName}" tracked`, params);
    };

    // ===== ORDERLA PURCHASE BRIDGE (CRITICAL) =====

    /**
     * Set up MutationObserver to detect Orderla success message
     * This bridges the gap between Orderla embed and Meta Pixel
     */
    const setupOrderlaBridge = () => {
        log('Setting up Orderla purchase bridge...');

        // Success messages to detect (in multiple languages)
        const successIndicators = [
            'Thank you',
            'Terima kasih',
            '谢谢',
            'Thank You',
            'Order Complete',
            'Pesanan Berjaya',
            '订单成功',
            'success',
            'berjaya',
            '成功'
        ];

        // Target the Orderla container
        const orderlaContainer = document.getElementById('orderla-embed');
        
        if (!orderlaContainer) {
            log('Orderla container not found - may be on different page');
            return;
        }

        log('Orderla container found, watching for success...');

        // Track if purchase has been tracked to avoid duplicates
        let purchaseTracked = false;

        // Create observer
        const observer = new MutationObserver((mutations) => {
            // Check if purchase already tracked
            if (purchaseTracked) {
                return;
            }

            // Check each mutation
            mutations.forEach((mutation) => {
                // Check added nodes
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        // Check node and its children for success text
                        checkNodeForSuccess(node);
                    });
                }

                // Check attribute changes (iframe src might change)
                if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                    if (mutation.target.src && mutation.target.src.includes('success')) {
                        triggerPurchase();
                    }
                }

                // Check text content changes
                if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    const text = document.body.innerText || '';
                    if (successIndicators.some(indicator => text.includes(indicator))) {
                        triggerPurchase();
                    }
                }
            });

            // Also check entire container text periodically
            const containerText = orderlaContainer.innerText || '';
            if (containerText && successIndicators.some(indicator => containerText.includes(indicator))) {
                triggerPurchase();
            }
        });

        // Helper function to check a node for success indicators
        function checkNodeForSuccess(node) {
            if (!node || purchaseTracked) return;

            // Check node's text content
            if (node.innerText) {
                if (successIndicators.some(indicator => node.innerText.includes(indicator))) {
                    triggerPurchase();
                    return;
                }
            }

            // Check node's attributes
            if (node.src && typeof node.src === 'string') {
                if (node.src.includes('success') || node.src.includes('complete')) {
                    triggerPurchase();
                    return;
                }
            }

            // Check node's value (for input changes)
            if (node.value && typeof node.value === 'string') {
                if (successIndicators.some(indicator => node.value.includes(indicator))) {
                    triggerPurchase();
                    return;
                }
            }

            // Recursively check child nodes
            if (node.childNodes && node.childNodes.length > 0) {
                node.childNodes.forEach(child => checkNodeForSuccess(child));
            }
        }

        // Trigger purchase event
        function triggerPurchase() {
            if (purchaseTracked) {
                log('Purchase already tracked, skipping duplicate');
                return;
            }

            log('🎉 Orderla purchase detected! Firing Purchase event...');
            
            // Track purchase
            trackPurchase({
                transaction_id: generateTransactionId(),
                content_name: PIXEL_CONFIG.productName,
                content_ids: [PIXEL_CONFIG.productId],
                content_type: 'product',
                value: PIXEL_CONFIG.productValue,
                currency: PIXEL_CONFIG.currency
            });

            purchaseTracked = true;

            // Also track to Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'purchase', {
                    transaction_id: generateTransactionId(),
                    value: PIXEL_CONFIG.productValue,
                    currency: PIXEL_CONFIG.currency,
                    items: [{
                        id: PIXEL_CONFIG.productId,
                        name: PIXEL_CONFIG.productName,
                        price: PIXEL_CONFIG.productValue,
                        quantity: 1
                    }]
                });
            }

            // Show thank you message or redirect (optional)
            // You can uncomment if you want to show a custom thank you
            // showThankYouMessage();
        }

        // Generate unique transaction ID
        function generateTransactionId() {
            return 'MV_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }

        // Show thank you message (optional)
        function showThankYouMessage() {
            const thankYouDiv = document.createElement('div');
            thankYouDiv.className = 'thank-you-message';
            thankYouDiv.innerHTML = `
                <div style="text-align: center; padding: 48px; background: var(--mint-bg); border-radius: 24px; margin: 24px 0;">
                    <div style="font-size: 48px; margin-bottom: 16px;">🌿</div>
                    <h3>Thank You for Your Order!</h3>
                    <p>Your farm-direct moringa batch is being prepared in Penang.</p>
                </div>
            `;
            
            const orderlaContainer = document.getElementById('orderla-embed');
            if (orderlaContainer) {
                orderlaContainer.innerHTML = '';
                orderlaContainer.appendChild(thankYouDiv);
            }
        }

        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true,
            attributeFilter: ['src', 'value', 'innerText']
        });

        // Also check iframe content (if same origin)
        const checkIframes = setInterval(() => {
            if (purchaseTracked) {
                clearInterval(checkIframes);
                return;
            }

            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                try {
                    // Check if iframe is from same origin
                    if (iframe.contentDocument) {
                        const iframeText = iframe.contentDocument.body.innerText || '';
                        if (successIndicators.some(indicator => iframeText.includes(indicator))) {
                            triggerPurchase();
                        }
                    }
                } catch (e) {
                    // Cross-origin iframe - can't access content
                    // But we can check src
                    if (iframe.src && iframe.src.includes('success')) {
                        triggerPurchase();
                    }
                }
            });
        }, 1000);

        // Clean up interval after 5 minutes (300,000ms)
        setTimeout(() => {
            clearInterval(checkIframes);
            observer.disconnect();
            log('Orderla bridge cleanup completed');
        }, 300000);

        log('Orderla bridge active - watching for conversions');
    }

    // ===== SCROLL DEPTH TRACKING =====

    /**
     * Set up scroll depth tracking
     */
    const setupScrollTracking = () => {
        if (!window.fbq) return;

        let trackedDepths = {
            25: false,
            50: false,
            75: false,
            100: false
        };

        const trackScrollDepth = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (window.scrollY / scrollHeight) * 100;

            Object.keys(trackedDepths).forEach(depth => {
                if (!trackedDepths[depth] && scrollPercent >= parseInt(depth)) {
                    trackedDepths[depth] = true;
                    
                    trackCustom('ScrollDepth', {
                        depth: parseInt(depth),
                        page: window.location.pathname
                    });

                    log(`Scroll depth ${depth}% tracked`);
                }
            });
        };

        // Throttle scroll events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    trackScrollDepth();
                    ticking = false;
                });
                ticking = true;
            }
        });
    };

    // ===== TIME ON PAGE TRACKING =====

    /**
     * Track time on page for lead generation
     */
    const setupTimeTracking = () => {
        let startTime = Date.now();
        let leadTracked = false;

        // Track lead after 30 seconds on quality/farm pages
        if (window.location.pathname.includes('quality.html') || 
            window.location.pathname.includes('farm.html')) {
            
            setTimeout(() => {
                if (!leadTracked) {
                    trackLead({
                        page: window.location.pathname,
                        time_spent: Math.round((Date.now() - startTime) / 1000)
                    });
                    leadTracked = true;
                    log('Lead tracked after 30 seconds');
                }
            }, 30000); // 30 seconds
        }

        // Track before unload
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            
            trackCustom('TimeOnPage', {
                page: window.location.pathname,
                seconds: timeSpent
            });
        });
    };

    // ===== BUTTON CLICK TRACKING =====

    /**
     * Set up button click tracking
     */
    const setupButtonTracking = () => {
        // Track all buy buttons
        document.querySelectorAll('[data-pixel="initiate_checkout"], .btn--primary, a[href*="buy"], a[href*="shop.html#buy"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                trackInitiateCheckout({
                    location: window.location.pathname,
                    button_text: btn.innerText.trim()
                });
            });
        });

        // Track add to cart buttons
        document.querySelectorAll('.add-to-cart-btn, [data-pixel="add_to_cart"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                trackAddToCart({
                    location: window.location.pathname
                });
            });
        });

        // Track view content on product pages
        if (window.location.pathname.includes('shop.html') || 
            window.location.pathname.includes('product')) {
            
            setTimeout(() => {
                trackViewContent({
                    page: window.location.pathname
                });
            }, 2000);
        }

        // Track farm and quality page visits as interest signals
        if (window.location.pathname.includes('farm.html') || 
            window.location.pathname.includes('quality.html')) {
            
            trackCustom('PageEngagement', {
                page_type: window.location.pathname.replace('.html', '').replace('/', ''),
                timestamp: new Date().toISOString()
            });
        }
    };

    // ===== E-COMMERCE PARAMETERS =====

    /**
     * Set up e-commerce parameters for dynamic pricing
     * @param {Object} productData - Product data override
     */
    const updateProductConfig = (productData = {}) => {
        Object.assign(PIXEL_CONFIG, productData);
        log('Product config updated:', PIXEL_CONFIG);
    };

    // ===== CONSENT MODE (GDPR/Privacy) =====

    /**
     * Set up consent mode for privacy compliance
     * @param {boolean} granted - Whether consent is granted
     */
    const setConsent = (granted = true) => {
        if (!window.fbq) return;

        window.fbq('consent', granted ? 'grant' : 'revoke');
        log(`Consent ${granted ? 'granted' : 'revoked'}`);
    };

    // ===== INITIALIZATION =====

    /**
     * Initialize Meta Pixel and all tracking
     */
    const initPixel = async () => {
        try {
            // Don't initialize in development with localhost (optional)
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                if (PIXEL_CONFIG.debug) {
                    log('Development mode - pixel events will be logged but not sent');
                } else {
                    console.log('[Meta Pixel] Skipped in development mode');
                    return;
                }
            }

            // Load pixel script
            await loadPixelScript();

            // Track initial page view
            trackPageView();

            // Set up all tracking
            setupButtonTracking();
            setupOrderlaBridge();
            setupScrollTracking();
            setupTimeTracking();

            // Set default consent (granted)
            setConsent(true);

            // Expose pixel functions globally for debugging/advanced use
            window.MorinVibesPixel = {
                trackViewContent,
                trackAddToCart,
                trackInitiateCheckout,
                trackPurchase,
                trackLead,
                trackCustom,
                updateProductConfig,
                setConsent
            };

            log('✅ Meta Pixel fully initialized and ready');

        } catch (error) {
            console.error('[Meta Pixel] Initialization failed:', error);
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPixel);
    } else {
        initPixel();
    }

    // ===== ADVANCED: DYNAMIC PRICE DETECTION =====

    /**
     * Detect product price from DOM (for future use)
     */
    const detectPriceFromDOM = () => {
        const priceElements = document.querySelectorAll('.product-card__price, [data-price]');
        priceElements.forEach(el => {
            const priceText = el.innerText || el.getAttribute('data-price');
            const priceMatch = priceText.match(/RM\s*(\d+(?:\.\d{2})?)/);
            
            if (priceMatch && priceMatch[1]) {
                const price = parseFloat(priceMatch[1]);
                if (!isNaN(price) && price > 0) {
                    PIXEL_CONFIG.productValue = price;
                    log('Price detected from DOM:', price);
                }
            }
        });
    };

    // Try to detect price if on shop page
    if (window.location.pathname.includes('shop.html')) {
        setTimeout(detectPriceFromDOM, 1000);
    }

})();
