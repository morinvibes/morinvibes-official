/**
 * MorinVibes® - Main JavaScript File
 * Farm-Direct Botanical Nutrition Authority
 * Version: 1.0
 * Last Updated: 2026
 * 
 * This file contains core functionality for the website:
 * - Mobile navigation
 * - FAQ accordions
 * - Smooth scrolling
 * - Form handling
 * - Lazy loading
 * - Back to top button
 */

(function() {
    'use strict';

    // ===== DOM ELEMENTS =====
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.navbar__mobile-toggle');
    const mobileMenu = document.querySelector('.navbar__menu');
    const backToTopBtn = document.querySelector('.back-to-top');
    const faqItems = document.querySelectorAll('.faq-item');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const lazyImages = document.querySelectorAll('img[data-src]');
    const yearElement = document.querySelector('.current-year');

    // ===== UTILITY FUNCTIONS =====

    /**
     * Debounce function to limit function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    const debounce = (func, wait = 100) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    /**
     * Throttle function to limit function calls
     * @param {Function} func - Function to throttle
     * @param {number} limit - Limit in milliseconds
     * @returns {Function} Throttled function
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
     * Check if element is in viewport
     * @param {HTMLElement} el - Element to check
     * @param {number} offset - Offset from viewport
     * @returns {boolean} True if element is in viewport
     */
    const isInViewport = (el, offset = 0) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    };

    // ===== MOBILE NAVIGATION =====

    /**
     * Initialize mobile navigation
     */
    const initMobileNav = () => {
        if (!mobileToggle || !mobileMenu) return;

        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('nav-open');
            
            // Update ARIA attributes
            const isExpanded = mobileToggle.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && 
                !mobileToggle.contains(e.target) && 
                mobileMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.classList.remove('nav-open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.classList.remove('nav-open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    };

    // ===== FAQ ACCORDION =====

    /**
     * Initialize FAQ accordions
     */
    const initFaqAccordion = () => {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');

            if (!question || !answer) return;

            question.addEventListener('click', () => {
                const isOpen = answer.classList.contains('faq-answer--open');
                
                // Close all other FAQs (optional - remove if you want independent)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        if (otherAnswer) {
                            otherAnswer.classList.remove('faq-answer--open');
                            if (otherToggle) otherToggle.textContent = '+';
                        }
                    }
                });

                // Toggle current FAQ
                answer.classList.toggle('faq-answer--open');
                if (toggle) {
                    toggle.textContent = isOpen ? '+' : '−';
                }
            });
        });
    };

    /**
     * Initialize enhanced accordion (for FAQ page)
     */
    const initEnhancedAccordion = () => {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const isActive = header.classList.contains('active');
                
                // Close all other accordions
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== header && otherHeader.classList.contains('active')) {
                        otherHeader.classList.remove('active');
                    }
                });

                // Toggle current accordion
                header.classList.toggle('active', !isActive);
            });
        });
    };

    // ===== PRODUCT TABS =====

    /**
     * Initialize product tabs (shop page)
     */
    const initProductTabs = () => {
        if (!tabBtns.length) return;

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                const tabContainer = btn.closest('.product-tabs');
                
                if (!tabContainer) return;

                // Remove active class from all buttons and panes in this container
                const containerBtns = tabContainer.querySelectorAll('.tab-btn');
                const containerPanes = tabContainer.querySelectorAll('.tab-pane');
                
                containerBtns.forEach(b => b.classList.remove('active'));
                containerPanes.forEach(p => p.classList.remove('active'));

                // Add active class to current button and pane
                btn.classList.add('active');
                const targetPane = tabContainer.querySelector(`#${tabId}`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    };

    // ===== SMOOTH SCROLLING =====

    /**
     * Initialize smooth scrolling for anchor links
     */
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileToggle.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        body.classList.remove('nav-open');
                    }

                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            });
        });
    };

    // ===== BACK TO TOP BUTTON =====

    /**
     * Initialize back to top button
     */
    const initBackToTop = () => {
        if (!backToTopBtn) {
            // Create button if it doesn't exist
            const btn = document.createElement('button');
            btn.className = 'back-to-top';
            btn.setAttribute('aria-label', 'Back to top');
            btn.innerHTML = '↑';
            document.body.appendChild(btn);
            backToTopBtn = btn;
        }

        const toggleBackToTop = throttle(() => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 100);

        window.addEventListener('scroll', toggleBackToTop);

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // ===== LAZY LOADING IMAGES =====

    /**
     * Initialize lazy loading for images
     */
    const initLazyLoading = () => {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
            });
            return;
        }

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    };

    // ===== ACTIVE NAVIGATION HIGHLIGHT =====

    /**
     * Highlight current page in navigation
     */
    const initActiveNav = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar__link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href) && href !== 'index.html') {
                link.classList.add('navbar__link--active');
            } else if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
                if (link.getAttribute('href') === 'index.html') {
                    link.classList.add('navbar__link--active');
                }
            }
        });
    };

    // ===== STICKY CART BAR (Mobile) =====

    /**
     * Initialize sticky cart bar for shop page
     */
    const initStickyCartBar = () => {
        const shopPage = document.querySelector('.shop-container');
        if (!shopPage) return;

        const stickyBar = document.createElement('div');
        stickyBar.className = 'sticky-cart-bar';
        stickyBar.innerHTML = `
            <div class="sticky-cart-bar__info">
                <div class="sticky-cart-bar__image">
                    <img src="assets/images/product-card.webp" alt="MorinVibes Moringa Capsules" loading="lazy">
                </div>
                <div>
                    <div style="font-size: 14px;">MorinVibes® Moringa</div>
                    <div class="sticky-cart-bar__price">RM89</div>
                </div>
            </div>
            <a href="#buy" class="btn btn--primary" style="padding: 12px 24px;">Buy Now</a>
        `;

        document.body.appendChild(stickyBar);
        document.body.classList.add('has-sticky-cart');

        // Hide on scroll up, show on scroll down
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                stickyBar.style.transform = 'translateY(100%)';
            } else {
                stickyBar.style.transform = 'translateY(0)';
            }
            lastScrollY = window.scrollY;
        }, 50));
    };

    // ===== SCROLL REVEAL ANIMATIONS =====

    /**
     * Initialize scroll reveal animations
     */
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal');
        
        if (!revealElements.length) return;

        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements
            revealElements.forEach(el => el.classList.add('reveal--visible'));
            return;
        }

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    // Optional: unobserve after reveal
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    };

    // ===== UPDATE COPYRIGHT YEAR =====

    /**
     * Update copyright year in footer
     */
    const updateCopyrightYear = () => {
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    // ===== FORM VALIDATION =====

    /**
     * Initialize form validation
     */
    const initFormValidation = () => {
        const forms = document.querySelectorAll('form:not([data-no-validate])');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        // Add error message
                        let errorMsg = field.nextElementSibling;
                        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                            errorMsg = document.createElement('span');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'This field is required';
                            field.parentNode.insertBefore(errorMsg, field.nextSibling);
                        }
                    } else {
                        field.classList.remove('error');
                        const errorMsg = field.nextElementSibling;
                        if (errorMsg && errorMsg.classList.contains('error-message')) {
                            errorMsg.remove();
                        }
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                }
            });

            // Clear error on input
            form.querySelectorAll('[required]').forEach(field => {
                field.addEventListener('input', function() {
                    this.classList.remove('error');
                    const errorMsg = this.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                });
            });
        });
    };

    // ===== DETECT TOUCH DEVICE =====

    /**
     * Detect if device is touch-enabled
     */
    const detectTouchDevice = () => {
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            document.documentElement.classList.add('touch-device');
        } else {
            document.documentElement.classList.add('no-touch');
        }
    };

    // ===== LOAD MORE BUTTON (for future use) =====

    /**
     * Initialize load more functionality
     * @param {string} buttonSelector - Load more button selector
     * @param {string} itemsSelector - Items container selector
     * @param {number} totalItems - Total number of items
     * @param {number} itemsPerPage - Items per page
     */
    const initLoadMore = (buttonSelector, itemsSelector, totalItems, itemsPerPage = 6) => {
        const loadMoreBtn = document.querySelector(buttonSelector);
        if (!loadMoreBtn) return;

        let currentItems = itemsPerPage;

        loadMoreBtn.addEventListener('click', () => {
            const items = document.querySelectorAll(itemsSelector);
            const nextItems = currentItems + itemsPerPage;
            
            items.forEach((item, index) => {
                if (index < nextItems) {
                    item.style.display = 'block';
                }
            });

            currentItems = nextItems;

            if (currentItems >= totalItems) {
                loadMoreBtn.style.display = 'none';
            }
        });
    };

    // ===== INITIALIZE ALL FUNCTIONS =====

    /**
     * Initialize all components when DOM is ready
     */
    const init = () => {
        // Run all initializations
        detectTouchDevice();
        initMobileNav();
        initFaqAccordion();
        initEnhancedAccordion();
        initProductTabs();
        initSmoothScroll();
        initBackToTop();
        initLazyLoading();
        initActiveNav();
        initScrollReveal();
        updateCopyrightYear();
        initFormValidation();

        // Conditionally initialize sticky cart bar
        if (window.location.pathname.includes('shop.html')) {
            initStickyCartBar();
        }

        // Add current year to any element with class 'current-year'
        document.querySelectorAll('.current-year').forEach(el => {
            el.textContent = new Date().getFullYear();
        });

        console.log('MorinVibes® - Initialized successfully');
    };

    // Run initialization when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM is already loaded
        init();
    }

    // ===== WINDOW RESIZE HANDLER =====

    /**
     * Handle window resize events
     */
    window.addEventListener('resize', debounce(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('nav-open');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    }, 250));

})();
