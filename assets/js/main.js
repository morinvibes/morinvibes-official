/**
 * MorinVibes® — Main JavaScript v6.0
 * All interactions, animations, and UI enhancements
 * Smooth, fast, no lag on any device
 */

(function() {
    'use strict';

    // ===== DOM Elements =====
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.nav__hamburger');
    const mobileMenu = document.querySelector('.nav__mobile');
    const closeBtn = document.querySelector('.nav__mobile-close');
    const scrollBtn = document.getElementById('scrollTop');
    const progressBar = document.getElementById('progressBar');
    const langBtn = document.querySelector('.lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');

    // ===== 1. Mobile Menu with smooth animation =====
    function initMobileMenu() {
        if (!hamburger || !mobileMenu) return;

        function openMenu() {
            mobileMenu.classList.add('open');
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            hamburger.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            mobileMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        }

        hamburger.addEventListener('click', openMenu);

        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMenu();
            }
        });

        // Close on backdrop click
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
            if (window.scrollY > 20) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ===== 3. Scroll progress bar =====
    function initProgressBar() {
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const winScroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
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
        });

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

        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('open');
            }
        });
    }

    // ===== 6. Fade-up animations on scroll (Intersection Observer) =====
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-up');
        
        if (fadeElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    }

    // ===== 7. Counter animation for stats =====
    function initCounters() {
        const counters = document.querySelectorAll('.farm-stat__number, .product-svg-stat-number');
        
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

    // ===== 8. Community popup (exit intent) =====
    function initCommunityPopup() {
        const popup = document.querySelector('.community-popup');
        if (!popup) return;

        // Check if already shown
        if (sessionStorage.getItem('popupShown')) return;

        function showPopup() {
            popup.classList.add('show');
            sessionStorage.setItem('popupShown', 'true');
        }

        // Show after 30 seconds
        setTimeout(showPopup, 30000);

        // Exit intent
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 10 && !sessionStorage.getItem('popupShown')) {
                showPopup();
            }
        });

        // Close button
        const closeBtn = popup.querySelector('.community-popup__close');
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
        const track = document.querySelector('.trust-bar__track');
        if (!track) return;

        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }

    // ===== 10. Button ripple effect =====
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

    // ===== 11. Card hover tilt effect (desktop only) =====
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

    // ===== 12. Smooth scroll for anchor links =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ===== 13. Image lazy loading =====
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ===== 14. Add ripple styles =====
    function addRippleStyles() {
        const style = document.createElement('style');
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
            }
            @keyframes ripple {
                to { transform: scale(30); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== 15. Initialize everything =====
    function init() {
        addRippleStyles();
        initMobileMenu();
        initNavScroll();
        initProgressBar();
        initScrollTop();
        initLanguageDropdown();
        initScrollAnimations();
        initCounters();
        initCommunityPopup();
        initTrustBarHover();
        initButtonRipple();
        initCardTilt();
        initSmoothScroll();
        initLazyLoading();

        // Update copyright year
        document.querySelectorAll('.current-year').forEach(el => {
            el.textContent = new Date().getFullYear();
        });

        console.log('✅ MorinVibes® — All animations ready');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
