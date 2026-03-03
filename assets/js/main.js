/**
 * MORINVIBES® - MAIN JS (Vivid Brand)
 * Version: 3.0 - Smooth, No Lag
 * 
 * Features:
 * - Mobile menu with animation
 * - Smooth scroll
 * - FAQ accordion
 * - Active nav highlight
 * - Stat counters (for 90+, 46, 18)
 * - Rating display
 * - No lag, optimized
 */

(function() {
    'use strict';

    // ===== DOM CACHE =====
    const dom = {
        // Navigation
        mobileToggle: document.querySelector('.mobile-toggle'),
        navLinks: document.querySelector('.nav-links'),
        mobileBottom: document.querySelector('.mobile-bottom'),
        
        // FAQ
        faqItems: document.querySelectorAll('.faq-item'),
        
        // Stats counters
        statNumbers: document.querySelectorAll('.stat-number[data-count]'),
        
        // Year
        yearElements: document.querySelectorAll('.current-year'),
        
        // Rating
        ratingStars: document.querySelector('.rating-stars')
    };

    // ===== MOBILE MENU (Smooth but fast) =====
    if (dom.mobileToggle && dom.navLinks) {
        // Create mobile menu container if not exists
        let mobileMenu = document.querySelector('.mobile-menu');
        
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = dom.navLinks.innerHTML;
            document.body.appendChild(mobileMenu);
        }

        dom.mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isOpen = mobileMenu.classList.contains('active');
            
            if (!isOpen) {
                // Open menu
                mobileMenu.classList.add('active');
                mobileMenu.style.display = 'flex';
                dom.mobileToggle.textContent = '✕';
                dom.mobileToggle.style.fontSize = '28px';
                
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
            } else {
                // Close menu
                mobileMenu.classList.remove('active');
                mobileMenu.style.display = 'none';
                dom.mobileToggle.textContent = '☰';
                dom.mobileToggle.style.fontSize = '28px';
                
                // Restore scroll
                document.body.style.overflow = '';
            }
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenu.style.display = 'none';
                dom.mobileToggle.textContent = '☰';
                document.body.style.overflow = '';
            });
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !dom.mobileToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenu.style.display = 'none';
                dom.mobileToggle.textContent = '☰';
                document.body.style.overflow = '';
            }
        });
    }

    // ===== SMOOTH SCROLL (Passive) =====
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenu.style.display = 'none';
                    if (dom.mobileToggle) {
                        dom.mobileToggle.textContent = '☰';
                    }
                    document.body.style.overflow = '';
                }
                
                // Smooth scroll
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, { passive: true });
    });

    // ===== FAQ ACCORDION =====
    if (dom.faqItems.length) {
        dom.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            if (question && answer) {
                question.addEventListener('click', function() {
                    const isOpen = answer.classList.contains('open');
                    
                    // Close others (optional - remove if you want independent)
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

    // ===== STAT COUNTERS (For 90+, 46, 18) =====
    if (dom.statNumbers.length && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.dataset.count) || 0;
                    const suffix = element.dataset.suffix || '';
                    let current = 0;
                    const increment = target / 50; // Smooth over 50 frames
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            element.textContent = Math.floor(current) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            element.textContent = target + suffix;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.5
        });

        dom.statNumbers.forEach(stat => counterObserver.observe(stat));
    }

    // ===== ACTIVE NAVIGATION =====
    const setActiveNav = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta), .mobile-menu a:not(.nav-cta)');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            if (currentPath.includes(href) && href !== 'index.html' && href && href !== '/') {
                link.classList.add('active');
            } else if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
                if (href === 'index.html' || href === './' || href === '/') {
                    link.classList.add('active');
                }
            }
        });
    };
    
    setActiveNav();

    // ===== UPDATE COPYRIGHT YEAR =====
    if (dom.yearElements.length) {
        const year = new Date().getFullYear();
        dom.yearElements.forEach(el => {
            el.textContent = year;
        });
    }

    // ===== RATING STARS (For 1000+ 5-Star) =====
    if (dom.ratingStars) {
        const rating = 5; // 5 stars
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        dom.ratingStars.textContent = stars;
    }

    // ===== LAZY LOAD IMAGES (Optimized) =====
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

    // ===== PRODUCT STATS HOVER EFFECT =====
    const statItems = document.querySelectorAll('.product-stat');
    statItems.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // ===== TOUCH DEVICE DETECTION =====
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.documentElement.classList.add('touch-device');
        
        // Add touch feedback
        document.querySelectorAll('.btn, .nav-links a, .product-stat').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            });
            el.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
    }

    // ===== SIMPLE SCROLL REVEAL (Only one observer) =====
    if ('IntersectionObserver' in window) {
        const revealElements = document.querySelectorAll('.card, .product-showcase, .hero-content');
        
        if (revealElements.length) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px'
            });

            revealElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                revealObserver.observe(el);
            });
        }
    }

    console.log('✅ MorinVibes® - Vivid Brand Ready');
})();
