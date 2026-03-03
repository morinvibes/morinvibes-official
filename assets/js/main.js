/**
 * MORINVIBES® - MAIN JS (Core Functionality)
 * With special V element support
 * Version: 3.0 - Zero Lag, Optimized
 * 
 * Features:
 * - Mobile menu with V icons
 * - Active navigation highlight
 * - FAQ accordion with V toggles
 * - Smooth scroll
 * - Back to top button with V
 * - Copyright year update
 * - Touch device detection
 * - No memory leaks
 */

(function() {
    'use strict';

    // ===== CACHE DOM ELEMENTS =====
    const dom = {
        // Navigation
        mobileToggle: document.querySelector('.mobile-toggle'),
        navLinks: document.querySelector('.nav-links'),
        navRight: document.querySelector('.nav-right'),
        mobileBottom: document.querySelector('.mobile-bottom'),
        
        // FAQ
        faqItems: document.querySelectorAll('.faq-item'),
        
        // Back to top
        backToTop: document.querySelector('.back-to-top'),
        
        // Year
        yearElements: document.querySelectorAll('.current-year'),
        
        // Body
        body: document.body
    };

    // ===== MOBILE MENU with V icons =====
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
                backdrop-filter: blur(10px);
            `;
            
            // Clone navigation links and add V icons
            const linksClone = dom.navLinks.cloneNode(true);
            
            // Add V icons to each link in mobile menu
            linksClone.querySelectorAll('a').forEach(link => {
                const vIcon = document.createElement('span');
                vIcon.className = 'v-icon-small';
                vIcon.style.marginRight = '12px';
                link.prepend(vIcon);
            });
            
            // Clone CTA and add V icon
            const ctaClone = dom.navRight.cloneNode(true);
            const ctaButton = ctaClone.querySelector('.nav-cta');
            if (ctaButton) {
                const vIcon = document.createElement('span');
                vIcon.className = 'v-icon-small';
                vIcon.style.background = 'white';
                vIcon.style.marginRight = '8px';
                ctaButton.prepend(vIcon);
            }
            
            // Remove language dropdown from mobile menu
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
                dom.mobileToggle.innerHTML = '<span class="v-icon"></span>';
                dom.body.style.overflow = 'hidden';
            } else {
                // Close menu
                mobileMenu.style.display = 'none';
                dom.mobileToggle.innerHTML = '☰';
                dom.body.style.overflow = '';
            }
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
                dom.mobileToggle.innerHTML = '☰';
                dom.body.style.overflow = '';
            });
        });

        // Close on resize (if going to desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.style.display === 'flex') {
                mobileMenu.style.display = 'none';
                dom.mobileToggle.innerHTML = '☰';
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

    // ===== FAQ ACCORDION with V toggles =====
    if (dom.faqItems.length) {
        dom.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const vIcon = question?.querySelector('.v-icon');
            
            if (question && answer) {
                question.addEventListener('click', function() {
                    const isOpen = answer.classList.contains('open');
                    
                    // Close other FAQs (optional - for better UX)
                    dom.faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            const otherIcon = otherItem.querySelector('.faq-question .v-icon');
                            if (otherAnswer) {
                                otherAnswer.classList.remove('open');
                                otherAnswer.style.maxHeight = null;
                            }
                            if (otherIcon) {
                                otherIcon.style.transform = 'rotate(0deg)';
                            }
                        }
                    });
                    
                    // Toggle current
                    if (isOpen) {
                        answer.classList.remove('open');
                        answer.style.maxHeight = null;
                        if (vIcon) {
                            vIcon.style.transform = 'rotate(0deg)';
                        }
                    } else {
                        answer.classList.add('open');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        if (vIcon) {
                            vIcon.style.transform = 'rotate(45deg)';
                        }
                    }
                });
            }
        });
    }

    // ===== BACK TO TOP BUTTON with V icon =====
    if (dom.backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                dom.backToTop.classList.add('visible');
            } else {
                dom.backToTop.classList.remove('visible');
            }
        });

        dom.backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== SMOOTH SCROLL for anchor links =====
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
                        dom.mobileToggle.innerHTML = '☰';
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
        document.querySelectorAll('.btn, .nav-links a, .mobile-bottom a, .stat-card').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            }, { passive: true });
            
            el.addEventListener('touchend', function() {
                this.style.opacity = '1';
            }, { passive: true });
        });
    }

    // ===== LAZY LOAD IMAGES =====
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

    // ===== DROPDOWN CLOSE ON ESC KEY =====
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
                    dom.mobileToggle.innerHTML = '☰';
                }
                dom.body.style.overflow = '';
            }
        }
    });

    // ===== STAT COUNTERS for Shopee stats =====
    if ('IntersectionObserver' in window) {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const text = element.textContent;
                        const number = parseInt(text.replace(/[^0-9]/g, ''));
                        
                        if (!isNaN(number)) {
                            let current = 0;
                            const increment = number / 50;
                            const suffix = text.replace(/[0-9]/g, '');
                            
                            const updateCounter = () => {
                                current += increment;
                                if (current < number) {
                                    element.textContent = Math.floor(current) + suffix;
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    element.textContent = number + suffix;
                                }
                            };
                            
                            updateCounter();
                        }
                        
                        counterObserver.unobserve(element);
                    }
                });
            }, {
                threshold: 0.5
            });

            statNumbers.forEach(stat => counterObserver.observe(stat));
        }
    }

    // ===== PREVENT BODY SCROLL WHEN MOBILE MENU OPEN =====
    dom.body.addEventListener('touchmove', (e) => {
        if (document.querySelector('.mobile-menu')?.style.display === 'flex') {
            e.preventDefault();
        }
    }, { passive: false });

    // ===== CLEANUP on page unload =====
    window.addEventListener('beforeunload', () => {
        if (window.imageObserver) {
            window.imageObserver.disconnect();
        }
        if (window.counterObserver) {
            window.counterObserver.disconnect();
        }
    });

    console.log('✅ MorinVibes® - Core functionality ready with V element');
})();
