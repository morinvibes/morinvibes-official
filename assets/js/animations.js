/**
 * MORINVIBES® - ANIMATIONS JS
 * With special V element animations
 * Version: 3.0 - Subtle, Smooth, Zero Lag
 * 
 * Features:
 * - Scroll reveal animations
 * - V element floating effects
 * - Gradient text reveal
 * - Product float animation
 * - CTA pulse animation
 * - Respects prefers-reduced-motion
 * - No animation frame loops
 */

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const config = {
        revealThreshold: 0.2,
        revealRootMargin: '0px 0px -50px 0px',
        floatDuration: 6000,
        pulseDuration: 8000,
        vFloatDuration: 4000
    };

    // ===== CHECK FOR REDUCED MOTION =====
    const prefersReducedMotion = () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    // ===== ADD V ELEMENT ANIMATION KEYFRAMES =====
    const addVKeyframes = () => {
        if (document.querySelector('#v-animations')) return;
        
        const style = document.createElement('style');
        style.id = 'v-animations';
        style.textContent = `
            @keyframes vFloat {
                0%, 100% { 
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.8;
                }
                50% { 
                    transform: translateY(-5px) rotate(5deg);
                    opacity: 1;
                }
            }
            
            @keyframes vPulse {
                0%, 100% { 
                    transform: scale(1);
                    filter: brightness(1);
                }
                50% { 
                    transform: scale(1.1);
                    filter: brightness(1.2);
                }
            }
            
            @keyframes vSpin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes vGlow {
                0%, 100% { 
                    box-shadow: 0 0 5px rgba(0,151,178,0.3);
                }
                50% { 
                    box-shadow: 0 0 20px rgba(0,151,178,0.6);
                }
            }
            
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .v-float {
                animation: vFloat ${config.vFloatDuration}ms ease-in-out infinite;
            }
            
            .v-pulse {
                animation: vPulse ${config.pulseDuration}ms ease-in-out infinite;
            }
            
            .v-spin {
                animation: vSpin 10s linear infinite;
            }
            
            .v-glow {
                animation: vGlow 3s ease-in-out infinite;
            }
            
            .gradient-shift {
                background: linear-gradient(270deg, #0097b2, #61cad8, #0097b2);
                background-size: 200% 200%;
                animation: gradientShift 6s ease infinite;
            }
        `;
        document.head.appendChild(style);
    };

    // ===== SCROLL REVEAL ANIMATIONS =====
    const initScrollReveal = () => {
        // Skip if reduced motion is preferred
        if (prefersReducedMotion()) {
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('visible');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
            return;
        }

        const revealElements = document.querySelectorAll('.reveal');
        
        if (!revealElements.length) return;

        // Set initial styles
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        });

        // Create observer
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add a little V icon pop when element reveals
                    const vIcons = entry.target.querySelectorAll('.v-icon, .v-icon-large, .v-icon-small');
                    vIcons.forEach((icon, index) => {
                        icon.style.transition = `transform 0.3s ease ${index * 0.1}s`;
                        icon.style.transform = 'scale(1)';
                    });
                    
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: config.revealThreshold,
            rootMargin: config.revealRootMargin
        });

        // Observe each element
        revealElements.forEach(el => revealObserver.observe(el));

        // Store observer for cleanup
        window.revealObserver = revealObserver;
    };

    // ===== V ELEMENT DECORATIVE ANIMATIONS =====
    const initVAnimations = () => {
        if (prefersReducedMotion()) return;

        // Animate V icons in headings
        document.querySelectorAll('.clinical-label .v-icon').forEach((icon, index) => {
            icon.style.animation = `vFloat ${config.vFloatDuration}ms ease-in-out infinite`;
            icon.style.animationDelay = `${index * 0.2}s`;
        });

        // Animate V dividers
        document.querySelectorAll('.v-divider .v-icon').forEach((icon, index) => {
            icon.style.animation = `vPulse ${config.pulseDuration}ms ease-in-out infinite`;
            icon.style.animationDelay = `${index * 0.3}s`;
        });

        // Animate stat card V icons
        document.querySelectorAll('.stat-card .v-icon').forEach(icon => {
            icon.style.animation = 'vSpin 20s linear infinite';
        });

        // Animate footer V icons
        document.querySelectorAll('.footer-links .v-icon').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.animation = 'vPulse 0.5s ease';
            });
            icon.addEventListener('mouseleave', function() {
                this.style.animation = '';
            });
        });

        // Background V pattern animation (very subtle)
        const vPattern = document.querySelector('.v-pattern');
        if (vPattern) {
            vPattern.style.transition = 'opacity 0.5s ease';
        }
    };

    // ===== PRODUCT FLOAT ANIMATION =====
    const initFloatAnimation = () => {
        if (prefersReducedMotion()) return;

        const floatElements = document.querySelectorAll('.float, .hero-product, .product-image');
        
        floatElements.forEach(el => {
            el.style.animation = `float ${config.floatDuration}ms ease-in-out infinite`;
        });

        // Add floating V elements around product
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual && !heroVisual.querySelector('.floating-v')) {
            for (let i = 0; i < 3; i++) {
                const v = document.createElement('span');
                v.className = 'v-icon floating-v';
                v.style.position = 'absolute';
                v.style.width = '20px';
                v.style.height = '20px';
                v.style.opacity = '0.2';
                v.style.animation = `vFloat ${config.vFloatDuration}ms ease-in-out infinite`;
                v.style.animationDelay = `${i * 0.5}s`;
                
                // Position randomly around product
                const positions = [
                    { top: '10%', left: '10%' },
                    { bottom: '20%', right: '15%' },
                    { top: '30%', right: '25%' }
                ];
                
                Object.assign(v.style, positions[i]);
                heroVisual.appendChild(v);
            }
        }
    };

    // ===== CTA PULSE ANIMATION =====
    const initPulseAnimation = () => {
        if (prefersReducedMotion()) return;

        const pulseElements = document.querySelectorAll('.pulse, .btn-primary, .nav-cta');
        
        pulseElements.forEach(el => {
            el.style.animation = `pulse ${config.pulseDuration}ms ease-in-out infinite`;
            
            // Add V icon pulse on hover
            const vIcon = el.querySelector('.v-icon');
            if (vIcon) {
                el.addEventListener('mouseenter', () => {
                    vIcon.style.animation = 'vPulse 0.5s ease';
                });
                el.addEventListener('mouseleave', () => {
                    vIcon.style.animation = '';
                });
            }
        });
    };

    // ===== GRADIENT TEXT SHIMMER =====
    const initGradientShimmer = () => {
        if (prefersReducedMotion()) return;

        const gradientTexts = document.querySelectorAll('h1.gradient-text, h2.gradient-text, .gradient-text');
        
        gradientTexts.forEach(el => {
            el.style.backgroundSize = '200% auto';
            el.style.animation = 'gradientShift 6s ease infinite';
        });
    };

    // ===== STAT COUNTERS ENHANCEMENT =====
    const initStatEnhancements = () => {
        const statCards = document.querySelectorAll('.stat-card');
        
        statCards.forEach(card => {
            // Add V icon to each stat card if not present
            if (!card.querySelector('.v-icon')) {
                const vIcon = document.createElement('span');
                vIcon.className = 'v-icon-small';
                vIcon.style.margin = '0 auto 12px';
                card.prepend(vIcon);
            }
            
            // Hover effect
            card.addEventListener('mouseenter', function() {
                const vIcon = this.querySelector('.v-icon');
                if (vIcon) {
                    vIcon.style.animation = 'vPulse 0.5s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const vIcon = this.querySelector('.v-icon');
                if (vIcon) {
                    vIcon.style.animation = '';
                }
            });
        });
    };

    // ===== SHOPEE SECTION ANIMATIONS =====
    const initShopeeAnimations = () => {
        const shopeeSection = document.querySelector('.shopee-proof');
        if (!shopeeSection || prefersReducedMotion()) return;

        // Animate the background gradient
        shopeeSection.style.animation = 'gradientShift 10s ease infinite';
        
        // Animate store IDs
        document.querySelectorAll('.store-id').forEach((el, index) => {
            el.style.animation = `vFloat ${config.vFloatDuration}ms ease-in-out infinite`;
            el.style.animationDelay = `${index * 0.2}s`;
        });
    };

    // ===== OBSERVE DYNAMIC CONTENT =====
    const observeContentChanges = () => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    // Check for new V icons that need animation
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) {
                            if (node.classList && node.classList.contains('v-icon')) {
                                node.style.animation = `vFloat ${config.vFloatDuration}ms ease-in-out infinite`;
                            }
                            
                            // Check for new reveal elements
                            if (node.classList && node.classList.contains('reveal')) {
                                initScrollReveal();
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        window.contentObserver = observer;
    };

    // ===== CLEANUP =====
    const cleanup = () => {
        window.addEventListener('beforeunload', () => {
            if (window.revealObserver) {
                window.revealObserver.disconnect();
            }
            if (window.contentObserver) {
                window.contentObserver.disconnect();
            }
        });
    };

    // ===== INITIALIZE ALL ANIMATIONS =====
    const init = () => {
        // Add keyframes first
        addVKeyframes();
        
        // Initialize all animations
        initScrollReveal();
        initVAnimations();
        initFloatAnimation();
        initPulseAnimation();
        initGradientShimmer();
        initStatEnhancements();
        initShopeeAnimations();
        
        // Watch for content changes
        observeContentChanges();
        
        // Setup cleanup
        cleanup();

        console.log('✅ MorinVibes® - V animations ready');
    };

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===== RESPOND TO REDUCED MOTION CHANGES =====
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    motionQuery.addEventListener('change', (e) => {
        if (e.matches) {
            // User now prefers reduced motion
            document.querySelectorAll('.v-icon, .float, .pulse, .reveal, .gradient-text').forEach(el => {
                el.style.animation = 'none';
                el.style.transition = 'none';
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        } else {
            // User no longer prefers reduced motion - reinitialize
            init();
        }
    });

})();
