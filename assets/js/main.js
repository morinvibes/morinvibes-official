/**
 * MORINVIBES® - MAIN JS (Core Functionality)
 * Colors: #0097b2 (Primary) | #61cad8 (Secondary)
 * Version: 1.0 - Zero Lag, Optimized
 * 
 * Features:
 * - Mobile menu toggle
 * - Active navigation highlight
 * - FAQ accordion
 * - Smooth scroll (passive)
 * - Copyright year update
 * - Touch device detection
 * - No memory leaks
 */

(function() {
    'use strict';

    // ===== CACHE DOM ELEMENTS (once for performance) =====
    const dom = {
        // Navigation
        mobileToggle: document.querySelector('.mobile-toggle'),
        navLinks: document.querySelector('.nav-links'),
        navRight: document.querySelector('.nav-right'),
        mobileBottom: document.querySelector('.mobile-bottom'),
        
        // FAQ
        faqItems: document.querySelectorAll('.faq-item'),
        
        // Year
        yearElements: document.querySelectorAll('.current-year'),
        
        // Body
        body: document.body
    };

    // ===== MOBILE MENU (Lightweight) =====
    if (dom.mobileToggle && dom.navLinks && dom.navRight) {
        // Create mobile menu container if not exists
        let mobileMenu = document.querySelector('.mobile-menu');
        
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.style.cssText = `
                display: none;
                position: fixed;
                top: 80px;
                left: 0;
                right: 0;
                bottom: 0;
                background: white;
                z-index: 999;
                padding: 32px 24px;
                flex-direction: column;
                gap: 24px;
                overflow-y: auto;
                border-top: 1px solid var(--border-light);
            `;
            
            // Clone navigation links and CTA
            const linksClone = dom.navLinks.cloneNode(true);
            const ctaClone = dom.navRight.cloneNode(true);
            
            // Remove language dropdown from mobile menu (keep in top bar)
            const langDropdown = ctaClone.querySelector('.lang-dropdown');
            if (langDropdown) langDropdown.remove();
            
            mobileMenu.appendChild(linksClone);
            mobileMenu.appendChild(ctaClone);
            dom.body.appendChild(mobileMenu);
        }

        // Toggle menu
        dom.mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isOpen = mobileMenu.style.display === 'flex';
            
            if (!isOpen) {
                // Open menu
                mobileMenu.style.display = 'flex';
                dom.mobileToggle.textContent = '✕';
                dom.mobileToggle.style.fontSize = '24px';
                dom.body.style.overflow = 'hidden'; // Prevent background scroll
            } else {
                // Close menu
                mobileMenu.style.display = 'none';
                dom.mobileToggle.textContent = '☰';
                dom.mobileToggle.style.fontSize = '24px';
                dom.body.style.overflow = '';
            }
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
                dom.mobileToggle.textContent = '☰';
                dom.body.style.overflow = '';
            });
        });

        // Close on resize (if going to desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.style.display === 'flex') {
                mobileMenu.style.display = 'none';
                dom.mobileToggle.textContent = '☰';
                dom.body.style.overflow = '';
            }
        });
    }

    // ===== ACTIVE NAVIGATION HIGHLIGHT =====
    const setActiveNav = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            // Skip if no href or it's the CTA button
            if (!href || link.classList.contains('nav-cta')) return;
            
            // Check if current page matches link
            if (currentPath.includes(href) && href !== 'index.html' && href !== './' && href !== '/') {
                link.classList.add('active');
            } else if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
                if (href === 'index.html' || href === './' || href === '/') {
                    link.classList.add('active');
                }
            }
        });
    };
    
    setActiveNav();

    // ===== FAQ ACCORDION (Lightweight) =====
    if (dom.faqItems.length) {
        dom.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            if (question && answer) {
                question.addEventListener('click', function() {
                    const isOpen = answer.classList.contains('open');
                    
                    // Close other FAQs (optional - for better UX)
                    dom.faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            const otherToggle = otherItem.querySelector('.faq-toggle');
                            if (otherAnswer) {
                                otherAnswer.classList.remove('open');
                                otherAnswer.style.maxHeight = null;
                            }
                            if (otherToggle) {
                                otherToggle.textContent = '+';
                            }
                        }
                    });
                    
                    // Toggle current
                    if (isOpen) {
                        answer.classList.remove('open');
                        answer.style.maxHeight = null;
                        if (toggle) toggle.textContent = '+';
                    } else {
                        answer.classList.add('open');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        if (toggle) toggle.textContent = '−';
                    }
                });
            }
        });
    }

    // ===== SMOOTH SCROLL (Passive, for anchor links) =====
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.style.display === 'flex') {
                    mobileMenu.style.display = 'none';
                    if (dom.mobileToggle) {
                        dom.mobileToggle.textContent = '☰';
                    }
                    dom.body.style.overflow = '';
                }
                
                // Smooth scroll
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, { passive: true });
    });

    // ===== UPDATE COPYRIGHT YEAR =====
    if (dom.yearElements.length) {
        const year = new Date().getFullYear();
        dom.yearElements.forEach(el => {
            el.textContent = year;
        });
    }

    // ===== TOUCH DEVICE DETECTION =====
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        dom.body.classList.add('touch-device');
        
        // Add touch feedback for buttons
        document.querySelectorAll('.btn, .nav-links a, .mobile-bottom a').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            }, { passive: true });
            
            el.addEventListener('touchend', function() {
                this.style.opacity = '1';
            }, { passive: true });
        });
    }

    // ===== LAZY LOAD IMAGES (Only if IntersectionObserver exists) =====
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (lazyImages.length) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px',
                threshold: 0.1
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // ===== DROPDOWN CLOSE ON ESC KEY (Accessibility) =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close language dropdown
            const langOptions = document.querySelector('.lang-options.show');
            if (langOptions) {
                langOptions.classList.remove('show');
            }
            
            // Close mobile menu
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.style.display === 'flex') {
                mobileMenu.style.display = 'none';
                if (dom.mobileToggle) {
                    dom.mobileToggle.textContent = '☰';
                }
                dom.body.style.overflow = '';
            }
        }
    });

    // ===== PREVENT BODY SCROLL WHEN MOBILE MENU OPEN (for touch devices) =====
    dom.body.addEventListener('touchmove', (e) => {
        if (document.querySelector('.mobile-menu')?.style.display === 'flex') {
            e.preventDefault();
        }
    }, { passive: false });

    // ===== CLEANUP on page unload (prevent memory leaks) =====
    window.addEventListener('beforeunload', () => {
        // Remove any pending observers
        if (window.imageObserver) {
            window.imageObserver.disconnect();
        }
    });

    console.log('✅ MorinVibes® - Core functionality ready');
})();
