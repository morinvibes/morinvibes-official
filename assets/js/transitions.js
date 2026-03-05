/**
 * MorinVibes® — Page Transitions & Smooth Navigation v1.0
 * ================================================================
 * Smooth page transitions, preloading, and navigation enhancements
 * Creates a seamless app-like experience between pages
 * Zero lag · Mobile optimized · Respects reduced motion preferences
 * ================================================================
 */

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const config = {
        transitionDuration: 400, // ms
        enablePreload: true,
        enableTransition: true,
        debug: false
    };

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Disable transitions if user prefers reduced motion
    if (prefersReducedMotion) {
        if (config.debug) console.log('🔄 User prefers reduced motion — disabling transitions');
        return;
    }

    // ===== CREATE TRANSITION OVERLAY =====
    let overlay = document.querySelector('.page-transition-overlay');
    
    if (!overlay && config.enableTransition) {
        overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="transition-spinner"></div>
            <div class="transition-logo">
                <img src="/morinvibes-official/images/logo-full.svg" alt="MorinVibes®" height="40">
            </div>
        `;
        document.body.appendChild(overlay);
        
        // Add styles dynamically
        const style = document.createElement('style');
        style.id = 'transition-styles';
        style.textContent = `
            .page-transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--paper, #f9fdfd);
                z-index: 9999;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                opacity: 0;
                pointer-events: none;
                transition: opacity ${config.transitionDuration}ms var(--ease, cubic-bezier(0.4, 0, 0.2, 1));
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
            }
            
            .page-transition-overlay.active {
                opacity: 1;
                pointer-events: all;
            }
            
            .transition-spinner {
                width: 48px;
                height: 48px;
                margin-bottom: 24px;
                border: 3px solid var(--teal-soft, #e1f3f5);
                border-top-color: var(--teal, #0097b2);
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }
            
            .transition-logo {
                opacity: 0.8;
                animation: pulse 2s ease-in-out infinite;
            }
            
            .transition-logo img {
                height: 40px;
                width: auto;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== PRELOAD LINKS ON HOVER =====
    function initPreload() {
        if (!config.enablePreload) return;

        // Get all internal links
        const links = document.querySelectorAll('a[href^="/morinvibes-official/"], a[href^="./"], a[href^="../"]');
        
        links.forEach(link => {
            // Skip external links
            if (link.hostname && link.hostname !== window.location.hostname) return;
            
            // Preload on hover (desktop only)
            if (window.innerWidth > 768) {
                link.addEventListener('mouseenter', () => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                        preloadPage(href);
                    }
                }, { passive: true });
            }
        });
    }

    // ===== PRELOAD PAGE FUNCTION =====
    function preloadPage(url) {
        // Resolve full URL
        const fullUrl = new URL(url, window.location.origin).href;
        
        // Don't preload current page
        if (fullUrl === window.location.href) return;
        
        // Create preload link
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'prefetch';
        preloadLink.href = fullUrl;
        preloadLink.as = 'document';
        document.head.appendChild(preloadLink);
        
        if (config.debug) console.log(`🔄 Preloading: ${fullUrl}`);
    }

    // ===== INTERCEPT NAVIGATION =====
    function initNavigationIntercept() {
        // Get all internal links
        const links = document.querySelectorAll('a[href^="/morinvibes-official/"], a[href^="./"], a[href^="../"]');
        
        links.forEach(link => {
            // Skip external links
            if (link.hostname && link.hostname !== window.location.hostname) return;
            
            // Skip anchor links
            if (link.getAttribute('href')?.startsWith('#')) return;
            
            // Skip links with target="_blank"
            if (link.target === '_blank') return;
            
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if not an internal link
                if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
                
                e.preventDefault();
                
                // Resolve full URL
                const fullUrl = new URL(href, window.location.origin).href;
                
                // Don't transition to same page
                if (fullUrl === window.location.href) return;
                
                navigateToPage(fullUrl);
            });
        });
    }

    // ===== NAVIGATE TO PAGE WITH TRANSITION =====
    function navigateToPage(url) {
        if (!overlay) {
            window.location.href = url;
            return;
        }
        
        // Show overlay
        overlay.classList.add('active');
        
        // Save scroll position for this page
        sessionStorage.setItem('scrollPosition', window.scrollY);
        
        // Navigate after delay
        setTimeout(() => {
            window.location.href = url;
        }, config.transitionDuration / 2);
    }

    // ===== RESTORE SCROLL POSITION =====
    function restoreScrollPosition() {
        const savedPosition = sessionStorage.getItem('scrollPosition');
        if (savedPosition) {
            setTimeout(() => {
                window.scrollTo({
                    top: parseInt(savedPosition),
                    behavior: 'instant' // Use instant for saved positions
                });
                sessionStorage.removeItem('scrollPosition');
            }, 100);
        }
    }

    // ===== HIDE OVERLAY ON PAGE LOAD =====
    function hideOverlay() {
        if (overlay) {
            // Small delay to ensure page is rendered
            setTimeout(() => {
                overlay.classList.remove('active');
                
                // Restore scroll position if coming from another page
                restoreScrollPosition();
            }, 100);
        }
    }

    // ===== ADD ENTRANCE ANIMATIONS =====
    function initEntranceAnimations() {
        // Add entrance classes to main content
        const main = document.querySelector('main');
        if (main) {
            main.classList.add('page-entrance');
        }
        
        // Add styles for entrance animation
        const style = document.createElement('style');
        style.id = 'entrance-styles';
        style.textContent = `
            @keyframes pageEntrance {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .page-entrance {
                animation: pageEntrance 0.5s var(--ease, cubic-bezier(0.4, 0, 0.2, 1)) both;
            }
            
            /* Stagger child animations */
            .page-entrance > * {
                animation: fadeInStagger 0.4s var(--ease, cubic-bezier(0.4, 0, 0.2, 1)) both;
            }
            
            @keyframes fadeInStagger {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== ADD TRANSITION BETWEEN SECTIONS =====
    function initSectionTransitions() {
        // Add intersection observer for section transitions
        const sections = document.querySelectorAll('section');
        
        if (sections.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        sections.forEach(section => {
            section.classList.add('section-transition');
            observer.observe(section);
        });
        
        // Add styles for section transitions
        const style = document.createElement('style');
        style.id = 'section-transition-styles';
        style.textContent = `
            .section-transition {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s var(--ease, cubic-bezier(0.4, 0, 0.2, 1)),
                            transform 0.6s var(--ease, cubic-bezier(0.4, 0, 0.2, 1));
            }
            
            .section-transition.section-visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Sequential child animations */
            .section-transition.section-visible > *:nth-child(1) { transition-delay: 0.05s; }
            .section-transition.section-visible > *:nth-child(2) { transition-delay: 0.1s; }
            .section-transition.section-visible > *:nth-child(3) { transition-delay: 0.15s; }
            .section-transition.section-visible > *:nth-child(4) { transition-delay: 0.2s; }
            .section-transition.section-visible > *:nth-child(5) { transition-delay: 0.25s; }
            .section-transition.section-visible > *:nth-child(6) { transition-delay: 0.3s; }
        `;
        document.head.appendChild(style);
    }

    // ===== ADD HOVER TRANSITIONS FOR CARDS =====
    function initCardTransitions() {
        const cards = document.querySelectorAll('.benefit-card, .testimonial-card, .farm-stat-card, .purity-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1))';
            });
        });
    }

    // ===== ADD PAGE LOAD PROGRESS =====
    function initPageLoadProgress() {
        // Add progress bar at top for page loads
        const progressBar = document.createElement('div');
        progressBar.className = 'page-load-progress';
        document.body.appendChild(progressBar);
        
        const style = document.createElement('style');
        style.id = 'load-progress-styles';
        style.textContent = `
            .page-load-progress {
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, var(--teal, #0097b2), var(--teal-light, #61cad8));
                width: 0%;
                z-index: 10000;
                transition: width 0.3s var(--ease, cubic-bezier(0.4, 0, 0.2, 1));
                pointer-events: none;
            }
            
            .page-load-progress.loading {
                width: 60%;
            }
            
            .page-load-progress.loaded {
                width: 100%;
                opacity: 0;
                transition: width 0.2s, opacity 0.3s;
            }
        `;
        document.head.appendChild(style);
        
        // Simulate load progress
        window.addEventListener('load', () => {
            progressBar.classList.add('loaded');
            setTimeout(() => {
                progressBar.remove();
            }, 500);
        });
        
        // Start loading indication
        setTimeout(() => {
            progressBar.classList.add('loading');
        }, 50);
    }

    // ===== ADD SMOOTH SCROLL WITH EASING =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    e.preventDefault();
                    
                    // Smooth scroll with custom easing
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                    const startPosition = window.scrollY;
                    const distance = targetPosition - startPosition;
                    const duration = 800;
                    let startTime = null;
                    
                    function animation(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        const timeElapsed = currentTime - startTime;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Easing function: easeInOutCubic
                        const easeProgress = progress < 0.5
                            ? 4 * progress * progress * progress
                            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                        
                        window.scrollTo(0, startPosition + distance * easeProgress);
                        
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animation);
                        }
                    }
                    
                    requestAnimationFrame(animation);
                }
            });
        });
    }

    // ===== ADD BACK FORWARD CACHE SUPPORT =====
    function initBFCache() {
        window.addEventListener('pageshow', (event) => {
            // If page is loaded from back/forward cache
            if (event.persisted) {
                hideOverlay();
                
                // Re-initialize animations
                const fadeElements = document.querySelectorAll('.fade-up');
                fadeElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        el.classList.add('visible');
                    }
                });
            }
        });
    }

    // ===== ADD PAGE TRANSITION FOR BACK BUTTON =====
    function initBackButtonTransition() {
        // Detect back/forward navigation
        window.addEventListener('popstate', () => {
            if (overlay) {
                overlay.classList.add('active');
                setTimeout(() => {
                    overlay.classList.remove('active');
                }, 300);
            }
        });
    }

    // ===== ADD IMAGE TRANSITIONS =====
    function initImageTransitions() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading animation
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s var(--ease)';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
        });
    }

    // ===== INITIALIZE ALL =====
    function init() {
        if (config.enableTransition) {
            initNavigationIntercept();
            initEntranceAnimations();
            initSectionTransitions();
            initCardTransitions();
            initBackButtonTransition();
            initImageTransitions();
        }
        
        initPreload();
        initPageLoadProgress();
        initSmoothScroll();
        initBFCache();
        
        // Hide overlay if visible
        hideOverlay();
        
        if (config.debug) console.log('🔄 Page transitions initialized');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
