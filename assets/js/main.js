/**
 * MORINVIBES® - MAIN JS (Performance Optimized)
 * Version: 3.0 - No lag, smooth performance
 * 
 * Features:
 * - Mobile menu (simple)
 * - Smooth scroll (passive)
 * - FAQ accordion (lightweight)
 * - Active nav highlight
 * - NO scroll listeners
 * - NO heavy observers
 * - NO animation frame loops
 */

(function() {
    'use strict';

    // ===== CACHE DOM ELEMENTS (once) =====
    const dom = {
        mobileToggle: document.querySelector('.mobile-toggle'),
        navLinks: document.querySelector('.nav-links'),
        mobileBottom: document.querySelector('.mobile-bottom'),
        faqItems: document.querySelectorAll('.faq-item'),
        yearElements: document.querySelectorAll('.current-year'),
        buyButtons: document.querySelectorAll('.btn-primary, [href*="#buy"], .nav-cta')
    };

    // ===== MOBILE MENU (Simple, no animations) =====
    if (dom.mobileToggle && dom.navLinks) {
        dom.mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isVisible = dom.navLinks.style.display === 'flex';
            
            if (!isVisible) {
                // Show menu
                dom.navLinks.style.display = 'flex';
                dom.navLinks.style.flexDirection = 'column';
                dom.navLinks.style.position = 'absolute';
                dom.navLinks.style.top = '70px';
                dom.navLinks.style.left = '0';
                dom.navLinks.style.right = '0';
                dom.navLinks.style.background = 'white';
                dom.navLinks.style.padding = '24px';
                dom.navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                dom.navLinks.style.zIndex = '1000';
                dom.navLinks.style.gap = '16px';
                
                dom.mobileToggle.textContent = '✕';
            } else {
                // Hide menu
                dom.navLinks.style.display = 'none';
                dom.mobileToggle.textContent = '☰';
            }
        });

        // Close on outside click (passive)
        document.addEventListener('click', function(e) {
            if (dom.navLinks.style.display === 'flex' && 
                !dom.navLinks.contains(e.target) && 
                !dom.mobileToggle.contains(e.target)) {
                dom.navLinks.style.display = 'none';
                dom.mobileToggle.textContent = '☰';
            }
        });
    }

    // ===== SMOOTH SCROLL (Passive, only for anchor links) =====
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (dom.navLinks && dom.navLinks.style.display === 'flex') {
                    dom.navLinks.style.display = 'none';
                    if (dom.mobileToggle) dom.mobileToggle.textContent = '☰';
                }
                
                // Simple scroll - browser handles smoothness
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, { passive: true });
    });

    // ===== FAQ ACCORDION (Lightweight) =====
    if (dom.faqItems.length) {
        dom.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', function() {
                    // Toggle current
                    if (answer.classList.contains('open')) {
                        answer.classList.remove('open');
                        answer.style.maxHeight = null;
                    } else {
                        answer.classList.add('open');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
            }
        });
    }

    // ===== ACTIVE NAVIGATION (Run once) =====
    const setActiveNav = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            if (currentPath.includes(href) && href !== 'index.html' && href) {
                link.classList.add('active');
            } else if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
                if (href === 'index.html' || href === './') {
                    link.classList.add('active');
                }
            }
        });
    };
    
    setActiveNav();

    // ===== UPDATE COPYRIGHT YEAR (Once) =====
    if (dom.yearElements.length) {
        const year = new Date().getFullYear();
        dom.yearElements.forEach(el => {
            el.textContent = year;
        });
    }

    // ===== SIMPLE INTERSECTION OBSERVER (Only for images, lightweight) =====
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

    // ===== TRUST BAR SCROLL (Mobile only, minimal) =====
    const trustBar = document.querySelector('.trust-bar');
    if (trustBar && window.innerWidth <= 768) {
        // No JS needed, just CSS overflow
    }

    console.log('✅ MorinVibes: Running smoothly');
})();
