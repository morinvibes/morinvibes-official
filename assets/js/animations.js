/**
 * MorinVibes® - Animations & Interactions
 * Farm-Direct Botanical Nutrition Authority
 * Version: 1.0
 * Last Updated: 2026
 * 
 * This file handles:
 * - Scroll reveal animations
 * - Product float animations
 * - CTA pulse effects
 * - Parallax effects (subtle)
 * - Hover animations
 * - Loading states
 */

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const ANIMATION_CONFIG = {
        revealThreshold: 0.15,
        revealOffset: '0px 0px -50px 0px',
        floatDuration: 6000,
        pulseInterval: 8000,
        parallaxStrength: 0.1,
        smoothScrollDuration: 800,
        debug: false
    };

    // ===== UTILITY FUNCTIONS =====

    /**
     * Debug logger
     */
    const log = (...args) => {
        if (ANIMATION_CONFIG.debug) {
            console.log('[Animations]', ...args);
        }
    };

    /**
     * Check if reduced motion is preferred
     * @returns {boolean} True if reduced motion is preferred
     */
    const prefersReducedMotion = () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    /**
     * Throttle function for performance
     */
    const throttle = (func, limit = 100) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    /**
     * Debounce function for performance
     */
    const debounce = (func, wait = 100) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // ===== SCROLL REVEAL ANIMATIONS =====

    /**
     * Initialize scroll reveal animations
     */
    const initScrollReveal = () => {
        // Skip if reduced motion is preferred
        if (prefersReducedMotion()) {
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('reveal--visible');
            });
            log('Reduced motion preferred - skipping animations');
            return;
        }

        const revealElements = document.querySelectorAll('.reveal');
        
        if (!revealElements.length) {
            log('No reveal elements found');
            return;
        }

        // Create Intersection Observer
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    
                    // Optional: add subtle scale effect on reveal
                    entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                    
                    // Unobserve after reveal for performance
                    revealObserver.unobserve(entry.target);
                    
                    log('Element revealed:', entry.target);
                }
            });
        }, {
            threshold: ANIMATION_CONFIG.revealThreshold,
            rootMargin: ANIMATION_CONFIG.revealOffset
        });

        // Observe each element
        revealElements.forEach(el => {
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            
            revealObserver.observe(el);
        });

        log(`Scroll reveal initialized for ${revealElements.length} elements`);
    };

    /**
     * Staggered reveal for grid items
     */
    const initStaggeredReveal = () => {
        const grids = document.querySelectorAll('.grid-3, .grid-4, .gallery-grid');
        
        grids.forEach(grid => {
            const items = grid.children;
            
            Array.from(items).forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
                item.classList.add('reveal');
            });
        });
    };

    // ===== PRODUCT FLOAT ANIMATION =====

    /**
     * Initialize product float animation
     */
    const initFloatAnimation = () => {
        // Skip if reduced motion is preferred
        if (prefersReducedMotion()) return;

        const floatElements = document.querySelectorAll('.hero__product, .product-card__image, .float-animation');
        
        floatElements.forEach(element => {
            // Remove any existing animation
            element.style.animation = 'none';
            
            // Force reflow
            void element.offsetWidth;
            
            // Add float animation
            element.style.animation = `float ${ANIMATION_CONFIG.floatDuration}ms ease-in-out infinite`;
            
            log('Float animation applied to:', element);
        });

        // Add CSS keyframe if not already present
        if (!document.querySelector('#float-keyframes')) {
            const style = document.createElement('style');
            style.id = 'float-keyframes';
            style.textContent = `
                @keyframes float {
                    0% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-12px);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    /**
     * Gentle hover float for cards
     */
    const initCardHoverFloat = () => {
        const cards = document.querySelectorAll('.card, .product-card, .testimonial-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (!prefersReducedMotion()) {
                    this.style.transform = 'translateY(-8px)';
                    this.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    };

    // ===== CTA PULSE ANIMATION =====

    /**
     * Initialize CTA pulse animation
     */
    const initCTAPulse = () => {
        // Skip if reduced motion is preferred
        if (prefersReducedMotion()) return;

        const ctaButtons = document.querySelectorAll('.btn--primary, .navbar__cta, .mobile-bottom-bar__btn--primary');
        
        ctaButtons.forEach((btn, index) => {
            // Add pulse class
            btn.classList.add('btn-pulse');
            
            // Stagger pulse start times
            const delay = index * 2000; // 2 second stagger
            btn.style.animationDelay = `${delay}ms`;
            
            log('Pulse animation applied to button:', btn);
        });

        // Add CSS keyframe if not already present
        if (!document.querySelector('#pulse-keyframes')) {
            const style = document.createElement('style');
            style.id = 'pulse-keyframes';
            style.textContent = `
                @keyframes soft-pulse {
                    0% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(0, 122, 113, 0.2);
                    }
                    50% {
                        transform: scale(1.03);
                        box-shadow: 0 0 0 10px rgba(0, 122, 113, 0);
                    }
                    100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(0, 122, 113, 0);
                    }
                }
                
                .btn-pulse {
                    animation: soft-pulse 8s ease-in-out infinite;
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ===== PARALLAX EFFECT (SUBTLE) =====

    /**
     * Initialize subtle parallax effect
     */
    const initParallax = () => {
        // Skip if reduced motion is preferred
        if (prefersReducedMotion()) return;

        const parallaxElements = document.querySelectorAll('[data-parallax], .hero__visual, .farm-difference__media');
        
        if (!parallaxElements.length) return;

        const handleParallax = throttle(() => {
            const scrolled = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallaxSpeed || ANIMATION_CONFIG.parallaxStrength;
                const yPos = -(scrolled * speed);
                
                // Only apply if element is in viewport (performance)
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        }, 10); // Throttle to 10ms for smooth performance

        window.addEventListener('scroll', handleParallax);
        log('Parallax initialized');
    };

    // ===== SMOOTH SCROLL TO ANCHORS =====

    /**
     * Initialize smooth scroll with easing
     */
    const initSmoothScroll = () => {
        // Skip if reduced motion is preferred
        if (prefersReducedMotion()) {
            // Still scroll, just without animation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;
                    
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView();
                    }
                });
            });
            return;
        }

        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (!targetElement) return;

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Smooth scroll with custom easing
                smoothScrollTo(offsetPosition, ANIMATION_CONFIG.smoothScrollDuration);
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
                
                log(`Smooth scrolling to: ${targetId}`);
            });
        });
    };

    /**
     * Smooth scroll with easing function
     * @param {number} targetPosition - Target scroll position
     * @param {number} duration - Animation duration
     */
    const smoothScrollTo = (targetPosition, duration = 800) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const easeInOutCubic = (t) => {
            return t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + (distance * easeProgress));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // ===== LOADING ANIMATIONS =====

    /**
     * Initialize loading animations
     */
    const initLoadingAnimations = () => {
        // Page load fade-in
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
            log('Page load animation complete');
        });

        // Image load fade-in
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
        });
    };

    // ===== HOVER ANIMATIONS =====

    /**
     * Initialize hover animations for interactive elements
     */
    const initHoverAnimations = () => {
        // Skip if reduced motion is preferred
        if (prefersReducedMotion()) return;

        // Gallery items zoom on hover
        document.querySelectorAll('.gallery-item, .farm-difference__media').forEach(item => {
            item.addEventListener('mouseenter', function() {
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.05)';
                    img.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
        });

        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 122, 113, 0.2)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });

        // Link hover underline animation
        document.querySelectorAll('.navbar__link:not(.btn)').forEach(link => {
            link.style.position = 'relative';
            
            link.addEventListener('mouseenter', function() {
                const underline = document.createElement('span');
                underline.className = 'hover-underline';
                underline.style.cssText = `
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background-color: var(--deep-teal);
                    animation: slideIn 0.3s ease forwards;
                `;
                
                // Add keyframe if not exists
                if (!document.querySelector('#underline-keyframes')) {
                    const style = document.createElement('style');
                    style.id = 'underline-keyframes';
                    style.textContent = `
                        @keyframes slideIn {
                            from {
                                transform: scaleX(0);
                                opacity: 0;
                            }
                            to {
                                transform: scaleX(1);
                                opacity: 1;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                this.appendChild(underline);
                
                setTimeout(() => {
                    underline.remove();
                }, 300);
            });
        });
    };

    // ===== TEXT REVEAL ANIMATIONS =====

    /**
     * Initialize text reveal animations
     */
    const initTextReveal = () => {
        const textElements = document.querySelectorAll('.clinical-label, h2, .hero__headline');
        
        textElements.forEach(element => {
            element.classList.add('text-reveal');
        });

        // Add CSS if not present
        if (!document.querySelector('#text-reveal-keyframes') && !prefersReducedMotion()) {
            const style = document.createElement('style');
            style.id = 'text-reveal-keyframes';
            style.textContent = `
                .text-reveal {
                    animation: revealText 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                }
                
                @keyframes revealText {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ===== COUNTER ANIMATIONS (for metrics) =====

    /**
     * Initialize number counters
     */
    const initCounters = () => {
        const counters = document.querySelectorAll('[data-counter]');
        
        if (!counters.length) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.dataset.counter);
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            element.textContent = target;
                            clearInterval(timer);
                        } else {
                            element.textContent = Math.floor(current);
                        }
                    }, 16);
                    
                    counterObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => counterObserver.observe(counter));
    };

    // ===== BACKGROUND ANIMATIONS =====

    /**
     * Initialize subtle background animations
     */
    const initBackgroundAnimations = () => {
        // Skip if reduced motion is preferred
        if (prefersReducedMotion()) return;

        const heroBg = document.querySelector('.hero__botanical-bg');
        
        if (heroBg) {
            let angle = 0;
            
            setInterval(() => {
                angle = (angle + 0.5) % 360;
                heroBg.style.background = `radial-gradient(circle at ${50 + Math.sin(angle) * 5}% ${50 + Math.cos(angle) * 5}%, var(--mint-bg) 0%, transparent 70%)`;
            }, 100);
        }
    };

    // ===== PAGE TRANSITIONS =====

    /**
     * Initialize page transition effects
     */
    const initPageTransitions = () => {
        // Add page transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--soft-white);
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);

        // Handle internal links
        document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])').forEach(link => {
            const href = link.getAttribute('href');
            
            // Only internal links
            if (href && !href.startsWith('http') && !href.startsWith('//')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    overlay.style.opacity = '1';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                });
            }
        });
    };

    // ===== LAZY LOAD ANIMATIONS =====

    /**
     * Initialize lazy load with fade-in
     */
    const initLazyLoadWithFade = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (!lazyImages.length) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    img.src = img.dataset.src;
                    
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    };

    // ===== MOBILE TOUCH FEEDBACK =====

    /**
     * Add touch feedback for mobile
     */
    const initTouchFeedback = () => {
        if ('ontouchstart' in window) {
            document.querySelectorAll('.btn, .navbar__link, .gallery-item').forEach(element => {
                element.addEventListener('touchstart', function() {
                    this.style.opacity = '0.8';
                });
                
                element.addEventListener('touchend', function() {
                    this.style.opacity = '1';
                });
                
                element.addEventListener('touchcancel', function() {
                    this.style.opacity = '1';
                });
            });
        }
    };

    // ===== INITIALIZE ALL ANIMATIONS =====

    /**
     * Initialize all animations
     */
    const init = () => {
        log('Initializing animations...');

        // Staggered reveal setup
        initStaggeredReveal();
        
        // Core animations
        initScrollReveal();
        initFloatAnimation();
        initCTAPulse();
        initCardHoverFloat();
        
        // Enhanced effects
        initParallax();
        initSmoothScroll();
        initLoadingAnimations();
        initHoverAnimations();
        initTextReveal();
        
        // Optional effects
        initCounters();
        initBackgroundAnimations();
        initLazyLoadWithFade();
        initTouchFeedback();
        
        // Page transitions (optional - comment out if not wanted)
        // initPageTransitions();

        log('✅ All animations initialized');

        // Add reduced motion listener
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            if (e.matches) {
                document.querySelectorAll('.btn-pulse, .float-animation').forEach(el => {
                    el.style.animation = 'none';
                });
                log('Reduced motion enabled - animations disabled');
            }
        });
    };

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===== EXPOSE API =====
    window.MorinVibesAnimations = {
        refresh: () => {
            // Re-run scroll reveal for dynamically added content
            initScrollReveal();
        },
        
        disable: () => {
            document.querySelectorAll('.btn-pulse, .float-animation, .reveal').forEach(el => {
                el.style.animation = 'none';
                el.style.transition = 'none';
                el.classList.add('reveal--visible');
            });
        },
        
        enable: () => {
            if (!prefersReducedMotion()) {
                init();
            }
        }
    };

})();
