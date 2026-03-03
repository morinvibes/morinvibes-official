/**
 * MORINVIBES® - LIGHTWEIGHT MAIN JS
 * Version: 2.0 - Optimized for Performance
 * 
 * Only essential functionality:
 * - Mobile menu
 * - Smooth scroll (passive)
 * - Active nav highlight
 * - No heavy observers
 * - No scroll listeners
 */

(function() {
    'use strict';

    // ===== DOM ELEMENTS =====
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const mobileBottomBar = document.querySelector('.mobile-bottom-bar');
    const yearElement = document.querySelector('.current-year');
    
    // ===== MOBILE MENU TOGGLE (Simple) =====
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Simple toggle
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '1000';
            }
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
                navLinks.style.display = 'none';
            }
        });
    }

    // ===== SMOOTH SCROLL (Only for anchor links - passive) =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks) navLinks.style.display = 'none';
                
                // Simple smooth scroll - no complex easing
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, { passive: true });
    });

    // ===== ACTIVE NAVIGATION (Simple) =====
    const setActiveNav = () => {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-links a');
        
        navItems.forEach(link => {
            const href = link.getAttribute('href');
            
            // Remove all active classes
            link.classList.remove('active');
            
            // Check if current page matches link
            if (currentPath.includes(href) && href !== 'index.html') {
                link.classList.add('active');
            } else if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
                if (href === 'index.html') {
                    link.classList.add('active');
                }
            }
        });
    };
    
    setActiveNav();

    // ===== UPDATE COPYRIGHT YEAR (Once) =====
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ===== SIMPLE IMAGE LAZY LOAD (Only if IntersectionObserver exists) =====
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (lazyImages.length > 0) {
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
                rootMargin: '50px'
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // ===== FAQ TOGGLE (Only if FAQ items exist) =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    const answer = this.nextElementSibling;
                    const toggle = this.querySelector('.faq-toggle');
                    
                    // Simple toggle
                    if (answer && answer.style.maxHeight) {
                        answer.style.maxHeight = null;
                        if (toggle) toggle.textContent = '+';
                    } else {
                        if (answer) {
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                            if (toggle) toggle.textContent = '−';
                        }
                    }
                });
            }
        });
    }

    // ===== TOUCH DEVICE DETECTION (For mobile optimizations) =====
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch');
    }

    // ===== SIMPLE FLOAT ANIMATION (Only one element) =====
    // Only apply to hero product if exists - no heavy animation loops
    const heroProduct = document.querySelector('.hero-image img, .hero-product');
    if (heroProduct && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        heroProduct.classList.add('float');
    }

    console.log('MorinVibes® - Ready (Lightweight Mode)');
})();
