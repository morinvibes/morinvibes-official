/**
 * MorinVibes® — Main JavaScript v8.0
 * GitHub Pages: /morinvibes-official/ base path
 * Handles: mobile menu, scroll effects, animations, trust bar, popup, counters
 */

(function() {
    'use strict';

    // ===== DOM Elements =====
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.nav__hamburger');
    const mobileMenu = document.querySelector('.nav__mobile');
    const closeBtn = document.querySelector('.nav__mobile-close');
    const scrollBtn = document.getElementById('scrollTop');
    const trustBar = document.querySelector('.trust-bar');
    const progressBar = document.getElementById('progressBar');
    const langToggle = document.querySelector('.lang-drop__toggle');
    const langDropdown = document.querySelector('.lang-drop');

    // ===== Mobile Menu =====
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

    // ===== Navbar Scroll Effect =====
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

    // ===== Scroll Progress Bar =====
    function initProgressBar() {
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const winScroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ===== Scroll to Top Button =====
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

    // ===== Language Dropdown =====
    function initLangDropdown() {
        if (!langToggle || !langDropdown) return;

        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('open');
            }
        });
    }

    // ===== Scroll Animations (Intersection Observer) =====
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.fade-up, .fade-in, .fade-left, .fade-right, .scale-in');
        
        if (elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Optional: unobserve after animation for performance
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    // ===== Counter Animation =====
    function initCounters() {
        const counters = document.querySelectorAll('.stat__number[data-count]');
        
        if (counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count || el.innerText.replace(/\D/g, ''), 10);
                    const suffix = el.dataset.suffix || '';
                    let current = 0;
                    const increment = target / 50;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            el.innerText = Math.floor(current) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.innerText = target + suffix;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ===== Community Popup (Exit Intent or 45s delay) =====
    function initCommunityPopup() {
        const popup = document.querySelector('.community-popup');
        if (!popup) return;

        // Check if already shown
        if (localStorage.getItem('mv_popup_shown')) return;

        function showPopup() {
            popup.classList.add('show');
            localStorage.setItem('mv_popup_shown', 'true');
        }

        // Show after 45 seconds
        setTimeout(showPopup, 45000);

        // Exit intent
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 10 && !localStorage.getItem('mv_popup_shown')) {
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

    // ===== Trust Bar Pause on Hover =====
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

    // ===== Button Ripple Effect =====
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

    // Add ripple styles dynamically
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

    // ===== Card 3D Tilt Effect (Desktop only) =====
    function initCardTilt() {
        if (window.innerWidth < 768) return;
        
        document.querySelectorAll('.stat, .card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ===== Initialize Everything =====
    function init() {
        initMobileMenu();
        initNavScroll();
        initProgressBar();
        initScrollTop();
        initLangDropdown();
        initScrollAnimations();
        initCounters();
        initCommunityPopup();
        initTrustBarHover();
        addRippleStyles();
        initButtonRipple();
        initCardTilt();

        // Update copyright year
        document.querySelectorAll('.current-year').forEach(el => {
            el.textContent = new Date().getFullYear();
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
