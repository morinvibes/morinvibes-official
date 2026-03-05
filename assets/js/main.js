/**
 * MorinVibes® — Main JavaScript v10.0
 * ================================================================
 * All interactions, animations, and UI enhancements
 * 21+ smooth animations · Zero lag · Mobile optimized
 * Professional · Fresh · SEO-Optimized
 * ================================================================
 */

(function() {
    'use strict';

    // ===== DOM Elements =====
    const nav = document.getElementById('mainNav');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('menuClose');
    const scrollBtn = document.getElementById('scrollTop');
    const progressBar = document.getElementById('progressBar');
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const fadeElements = document.querySelectorAll('.fade-up');
    const counters = document.querySelectorAll('.quality-badge-circle[data-count], .stat-number[data-count]');
    const images = document.querySelectorAll('img[data-src]');
    const yearElements = document.querySelectorAll('.current-year');
    const trustTrack = document.querySelector('.trust-bar__track');
    const expandAllBtn = document.getElementById('expandAllBtn');

    // ===== 1. Mobile Menu with smooth animation =====
    function initMobileMenu() {
        if (!hamburger || !mobileMenu) return;

        function openMenu() {
            mobileMenu.classList.add('open');
            document.body.classList.add('menu-open');
            hamburger.setAttribute('aria-expanded', 'true');
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            mobileMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', openMenu);

        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }

        // 20. ESC key closes mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMenu();
            }
        });

        // Close on backdrop click (click outside left panel)
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });
    }

    // ===== 2. Navbar scroll effect (frosted glass) =====
    function initNavScroll() {
        if (!nav) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ===== 3. Scroll progress bar =====
    function initProgressBar() {
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const winScroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }, { passive: true });
    }

    // ===== 4. Scroll to top button =====
    function initScrollTop() {
        if (!scrollBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== 5. Language dropdown =====
    function initLanguageDropdown() {
        if (!langBtn || !langDropdown) return;

        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('open');
        });

        document.addEventListener('click', () => {
            langDropdown.classList.remove('open');
        });
    }

    // ===== 6. Fade-up animations on scroll (Intersection Observer) =====
    function initScrollAnimations() {
        if (fadeElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Optional: unobserve after animation for performance
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    }

    // ===== 7. Counter animation for stats =====
    function initCounters() {
        if (counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    const target = parseInt(text.replace(/[^0-9]/g, ''), 10);
                    
                    if (isNaN(target)) return;
                    
                    let current = 0;
                    const increment = target / 50;
                    const suffix = text.replace(/[0-9]/g, '');
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            el.textContent = Math.floor(current) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.textContent = target + suffix;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ===== 8. Community popup (exit intent + timer) — OPTIONAL =====
    function initCommunityPopup() {
        const popup = document.querySelector('.community-popup');
        if (!popup) return;

        // Check if already shown
        if (sessionStorage.getItem('popupShown')) return;

        function showPopup() {
            popup.classList.add('show');
            sessionStorage.setItem('popupShown', 'true');
        }

        // Show after 45 seconds
        setTimeout(showPopup, 45000);

        // Exit intent
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 10 && !sessionStorage.getItem('popupShown')) {
                showPopup();
            }
        });

        // Close button
        const closeBtn = popup.querySelector('.popup-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                popup.classList.remove('show');
            });
        }

        // Dismiss link
        const dismiss = popup.querySelector('.popup-dismiss');
        if (dismiss) {
            dismiss.addEventListener('click', () => {
                popup.classList.remove('show');
            });
        }
    }

    // ===== 9. Trust bar pause on hover =====
    function initTrustBarHover() {
        if (!trustTrack) return;

        trustTrack.addEventListener('mouseenter', () => {
            trustTrack.style.animationPlayState = 'paused';
        });

        trustTrack.addEventListener('mouseleave', () => {
            trustTrack.style.animationPlayState = 'running';
        });
    }

    // ===== 10. FAQ accordion smooth expand =====
    function initFaqAccordion() {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const answer = this.nextElementSibling;
                const icon = this.querySelector('.faq-question__icon');
                
                // Toggle current
                faqItem.classList.toggle('open');
                
                if (faqItem.classList.contains('open')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    if (icon) icon.textContent = '−';
                } else {
                    answer.style.maxHeight = null;
                    if (icon) icon.textContent = '+';
                }
            });
        });
    }

    // ===== 11. Expand/Collapse All FAQs =====
    function initExpandAll() {
        if (!expandAllBtn) return;

        expandAllBtn.addEventListener('click', function() {
            const allFaqItems = document.querySelectorAll('.faq-item');
            const expandText = document.getElementById('expandAllText');
            const isAnyOpen = Array.from(allFaqItems).some(item => item.classList.contains('open'));
            
            allFaqItems.forEach(item => {
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('.faq-question__icon');
                
                if (isAnyOpen) {
                    // Close all
                    item.classList.remove('open');
                    answer.style.maxHeight = null;
                    if (icon) icon.textContent = '+';
                    if (expandText) expandText.textContent = 'Expand All';
                } else {
                    // Open all
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    if (icon) icon.textContent = '−';
                    if (expandText) expandText.textContent = 'Collapse All';
                }
            });
        });
    }

    // ===== 12. Button ripple effect =====
    function initButtonRipple() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // ===== 13. Card hover scale effect (handled by CSS, but we add class for compatibility) =====
    function initCardHover() {
        // CSS handles this, but we ensure no conflicts
    }

    // ===== 14. Card tilt effect (desktop only) =====
    function initCardTilt() {
        if (window.innerWidth < 768) return;
        
        document.querySelectorAll('.benefit-card, .product-svg-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ===== 15. Image lazy loading =====
    function initLazyLoading() {
        if ('IntersectionObserver' in window && images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px',
                threshold: 0.1
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ===== 16. Image hover zoom (handled by CSS) =====
    function initImageZoom() {
        // CSS handles this with .img-zoom class
    }

    // ===== 17. Social icon hover (handled by CSS) =====
    function initSocialHover() {
        // CSS handles this
    }

    // ===== 18. WhatsApp pulse animation (handled by CSS) =====
    function initWhatsAppPulse() {
        // CSS handles this with .wa-section__icon
    }

    // ===== 19. Parallax hero effect (subtle) =====
    function initParallax() {
        const heroVisual = document.querySelector('.hero__visual');
        if (!heroVisual) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        }, { passive: true });
    }

    // ===== 20. Staggered card reveals (handled by CSS data-delay) =====

    // ===== 21. Loading spinner for checkout (handled in checkout page) =====

    // ===== Add ripple styles dynamically =====
    function addRippleStyles() {
        // Check if styles already exist
        if (document.querySelector('#ripple-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .btn { position: relative; overflow: hidden; }
            .ripple {
                position: absolute;
                width: 10px;
                height: 10px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 5;
            }
            @keyframes ripple {
                to { transform: scale(30); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== Update copyright year =====
    function updateCopyrightYear() {
        const year = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = year;
        });
    }

    // ===== Handle touch devices (remove hover effects) =====
    function detectTouchDevice() {
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            document.documentElement.classList.add('touch-device');
        }
    }

    // ===== Smooth scroll for anchor links =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ===== Initialize everything =====
    function init() {
        addRippleStyles();
        detectTouchDevice();
        initMobileMenu();
        initNavScroll();
        initProgressBar();
        initScrollTop();
        initLanguageDropdown();
        initScrollAnimations();
        initCounters();
        initCommunityPopup();
        initTrustBarHover();
        initFaqAccordion();
        initExpandAll();
        initButtonRipple();
        initCardTilt();
        initLazyLoading();
        initParallax();
        initSmoothScroll();
        updateCopyrightYear();

        console.log('✅ MorinVibes® — All 21+ animations ready');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
