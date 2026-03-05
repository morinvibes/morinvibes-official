/**
 * MorinVibes® — Meta Pixel Tracking v10.0
 * ================================================================
 * Complete tracking for all user actions
 * Events: PageView, ViewContent, AddToCart, InitiateCheckout, Purchase, Lead
 * Replace 'YOUR_PIXEL_ID' with your actual Meta Pixel ID
 * ================================================================
 */

(function() {
    'use strict';

    // ===== Configuration =====
    const PIXEL_ID = 'YOUR_PIXEL_ID'; // ← REPLACE WITH YOUR ACTUAL META PIXEL ID
    const PRODUCT_PRICE = 89;
    const PRODUCT_CURRENCY = 'MYR';
    const PRODUCT_NAME = 'MorinVibes Moringa 90s';
    const PRODUCT_ID = 'moringa-90';

    // Skip if no pixel ID (development)
    if (PIXEL_ID === 'YOUR_PIXEL_ID') {
        console.log('⚠️ Meta Pixel: Please set your Pixel ID in pixel.js');
        return;
    }

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
    console.log('✅ Meta Pixel initialized with ID:', PIXEL_ID);

    // ===== 1. Track PageView (already done) =====

    // ===== 2. Track ViewContent on product pages =====
    if (window.location.pathname.includes('/shop') || 
        window.location.pathname.includes('/benefits') ||
        window.location.pathname.includes('/product')) {
        
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
        const buyButton = e.target.closest(
            '.btn--primary, .btn--small, [href*="checkout"], ' +
            '.nav__mobile-right .btn, .product-actions .btn--primary, ' +
            '.cta-buttons .btn--primary, .hero__ctas .btn--primary'
        );
        
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
        const waLink = e.target.closest(
            'a[href*="wa.me"], a[href*="whatsapp"], ' +
            '.btn--whatsapp, .footer__social a[href*="wa.me"], ' +
            '.nav__mobile-link[href*="wa.me"]'
        );
        
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
                destination: 'Shopee Store',
                content_name: 'Shopee Referral'
            });
            console.log('✅ Shopee click tracked');
        }
        
        if (lazadaLink) {
            fbq('trackCustom', 'LazadaClick', {
                destination: 'Lazada Store',
                content_name: 'Lazada Referral'
            });
            console.log('✅ Lazada click tracked');
        }
    });

    // ===== 8. Track social media clicks =====
    document.addEventListener('click', function(e) {
        const facebookLink = e.target.closest('a[href*="facebook"]');
        const instagramLink = e.target.closest('a[href*="instagram"]');
        const tiktokLink = e.target.closest('a[href*="tiktok"]');
        const threadsLink = e.target.closest('a[href*="threads"]');
        
        if (facebookLink) {
            fbq('trackCustom', 'SocialClick', {
                platform: 'Facebook'
            });
        }
        
        if (instagramLink) {
            fbq('trackCustom', 'SocialClick', {
                platform: 'Instagram'
            });
        }
        
        if (tiktokLink) {
            fbq('trackCustom', 'SocialClick', {
                platform: 'TikTok'
            });
        }
        
        if (threadsLink) {
            fbq('trackCustom', 'SocialClick', {
                platform: 'Threads'
            });
        }
    });

    // ===== 9. Track scroll depth (25%, 50%, 75%, 100%) =====
    let scrollTracked = {
        25: false,
        50: false,
        75: false,
        100: false
    };

    function trackScrollDepth() {
        const winScroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (scrolled > 25 && !scrollTracked[25]) {
            fbq('trackCustom', 'ScrollDepth', { depth: 25, page: window.location.pathname });
            scrollTracked[25] = true;
            console.log('✅ Scroll depth 25% tracked');
        }
        if (scrolled > 50 && !scrollTracked[50]) {
            fbq('trackCustom', 'ScrollDepth', { depth: 50, page: window.location.pathname });
            scrollTracked[50] = true;
            console.log('✅ Scroll depth 50% tracked');
        }
        if (scrolled > 75 && !scrollTracked[75]) {
            fbq('trackCustom', 'ScrollDepth', { depth: 75, page: window.location.pathname });
            scrollTracked[75] = true;
            console.log('✅ Scroll depth 75% tracked');
        }
        if (scrolled >= 98 && !scrollTracked[100]) {
            fbq('trackCustom', 'ScrollDepth', { depth: 100, page: window.location.pathname });
            scrollTracked[100] = true;
            console.log('✅ Scroll depth 100% tracked');
        }
    }

    // Throttled scroll listener for depth tracking
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                trackScrollDepth();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ===== 10. Track time on page =====
    let timeTracked = false;
    setTimeout(() => {
        if (!timeTracked) {
            fbq('trackCustom', 'TimeOnPage', {
                seconds: 30,
                page: window.location.pathname
            });
            timeTracked = true;
            console.log('✅ Time on page (30s) tracked');
        }
    }, 30000); // 30 seconds

    // ===== 11. Track search (if you add search later) =====

    // ===== 12. Track email newsletter signup (if you add newsletter) =====

    // ===== 13. Track form submissions (contact form) =====
    document.addEventListener('submit', function(e) {
        const form = e.target;
        if (form.classList.contains('contact-form') || form.id === 'contactForm') {
            fbq('track', 'Lead', {
                content_name: 'Contact Form',
                content_category: 'Form Submission'
            });
            console.log('✅ Contact form submission tracked');
        }
    });

    // ===== 14. Track phone number clicks =====
    document.addEventListener('click', function(e) {
        const phoneLink = e.target.closest('a[href^="tel:"]');
        if (phoneLink) {
            fbq('trackCustom', 'PhoneClick', {
                phone_number: phoneLink.getAttribute('href')
            });
            console.log('✅ Phone click tracked');
        }
    });

    // ===== 15. Track email clicks =====
    document.addEventListener('click', function(e) {
        const emailLink = e.target.closest('a[href^="mailto:"]');
        if (emailLink) {
            fbq('trackCustom', 'EmailClick', {
                email: emailLink.getAttribute('href').replace('mailto:', '')
            });
            console.log('✅ Email click tracked');
        }
    });

    // ===== 16. Track FAQ interactions =====
    document.addEventListener('click', function(e) {
        const faqQuestion = e.target.closest('.faq-question');
        if (faqQuestion) {
            const questionText = faqQuestion.querySelector('.faq-question__text')?.textContent || 'Unknown question';
            fbq('trackCustom', 'FAQInteraction', {
                question: questionText.substring(0, 50)
            });
            console.log('✅ FAQ interaction tracked');
        }
    });

    // ===== 17. Track testimonial interactions =====
    document.addEventListener('click', function(e) {
        const testimonialCard = e.target.closest('.testimonial-card');
        if (testimonialCard) {
            fbq('trackCustom', 'TestimonialView', {
                location: 'testimonials_preview'
            });
            console.log('✅ Testimonial interaction tracked');
        }
    });

    // ===== 18. Track journal/blog post views =====
    if (window.location.pathname.includes('/journal/') && 
        !window.location.pathname.endsWith('/journal/') &&
        !window.location.pathname.endsWith('/journal/index.html')) {
        
        setTimeout(() => {
            const postTitle = document.querySelector('h1')?.textContent || 'Unknown post';
            fbq('trackCustom', 'JournalView', {
                post_title: postTitle.substring(0, 50)
            });
            console.log('✅ Journal post view tracked');
        }, 2000);
    }

    // ===== 19. Track video engagement (if you add videos) =====

    // ===== 20. Track outbound link clicks (already covered by Shopee/Lazada) =====

    // ===== Expose for debugging if needed =====
    window.MorinVibesPixel = {
        trackPurchase: (qty = 1) => {
            fbq('track', 'Purchase', {
                value: qty * PRODUCT_PRICE,
                currency: PRODUCT_CURRENCY,
                content_ids: [PRODUCT_ID],
                content_name: PRODUCT_NAME,
                num_items: qty
            });
            console.log('✅ Manual Purchase tracked');
        },
        trackCustom: (event, params) => {
            fbq('trackCustom', event, params);
            console.log(`✅ Custom event "${event}" tracked`);
        },
        getConfig: () => ({
            pixelId: PIXEL_ID,
            price: PRODUCT_PRICE,
            currency: PRODUCT_CURRENCY,
            productName: PRODUCT_NAME
        })
    };

    console.log('✅ Meta Pixel — All events ready');
})();
