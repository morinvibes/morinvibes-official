/**
 * MorinVibes® Main Logic Engine
 * Architecture: Trilingual Support, Meta Event Tracking, & Liquid Animations
 */

const langData = {
    en: {
        nav_home: "Home",
        nav_benefits: "Benefits",
        nav_farm: "Our Farm",
        nav_science: "Science & KKM",
        nav_shop: "Shop Now",
        hero_overline: "EST. 2019 • PENANG, MALAYSIA",
        hero_h1: "Pure Moringa.<br><em>Grown by Us.</em>",
        hero_p: "Direct from our GMP-certified farm in Penang to your wellness ritual. High-potency nutrition with total transparency.",
        btn_cta: "Start My Journey",
        btn_secondary: "Why Moringa?",
        order_h2: "Select Your Bundle",
        order_p: "Safe, secure checkout via Orderla.my",
        promo: "FREE SHIPPING MALAYSIA-WIDE ON ORDERS ABOVE RM150"
    },
    bm: {
        nav_home: "Utama",
        nav_benefits: "Khasiat",
        nav_farm: "Ladang Kami",
        nav_science: "Sains & KKM",
        nav_shop: "Beli Sekarang",
        hero_overline: "EST. 2019 • PULAU PINANG",
        hero_h1: "Moringa Tulen.<br><em>Hasil Ladang Kami.</em>",
        hero_p: "Terus dari ladang berstatus GMP kami di Pulau Pinang ke ritual kesihatan anda. Nutrisi berpotensi tinggi dengan ketelusan penuh.",
        btn_cta: "Mulakan Perjalanan Saya",
        btn_secondary: "Kenapa Moringa?",
        order_h2: "Pilih Pakej Anda",
        order_p: "Pembayaran selamat melalui Orderla.my",
        promo: "PENGHANTARAN PERCUMA KE SELURUH MALAYSIA UNTUK PESANAN RM150 KE ATAS"
    },
    zh: {
        nav_home: "首页",
        nav_benefits: "营养价值",
        nav_farm: "自有农场",
        nav_science: "科学与认证",
        nav_shop: "立即购买",
        hero_overline: "创立于 2019 • 马来西亚槟城",
        hero_h1: "纯净辣木。<br><em>自家种植。</em>",
        hero_p: "从我们位于槟城的 GMP 认证农场直接送到您的手中。高浓度营养，全透明生产过程。",
        btn_cta: "开启健康之旅",
        btn_secondary: "为何选择辣木？",
        order_h2: "选择您的优惠组合",
        order_p: "通过 Orderla.my 安全支付",
        promo: "马来西亚境内订单满 RM150 即可享受免运费"
    }
};

/**
 * 1. Translation System
 */
function setLanguage(lang) {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[lang] && langData[lang][key]) {
            element.innerHTML = langData[lang][key];
        }
    });

    // Save preference and update Meta Pixel
    localStorage.setItem('morinVibesLang', lang);
    fbq('trackCustom', 'LanguageSelection', { language: lang });
    
    // Update active state in UI
    document.querySelectorAll('.lang-toggle span').forEach(span => {
        span.style.fontWeight = span.innerText.toLowerCase().includes(lang) ? '700' : '300';
    });
}

/**
 * 2. Intersection Observer (Scroll Reveal & Tracking)
 */
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Trigger AddToCart when Orderla section is viewed
            if (entry.target.id === 'order') {
                fbq('track', 'AddToCart', {
                    content_name: 'Moringa Capsules',
                    content_category: 'Health Supplement',
                    value: 85.00,
                    currency: 'MYR'
                });
                console.log('Meta: AddToCart event fired (Section Viewed)');
            }
        }
    });
};

const observer = new IntersectionObserver(revealCallback, {
    threshold: 0.15 // Elements reveal when 15% visible
});

/**
 * 3. Navigation & Interaction Logic
 */
const initInteractions = () => {
    // Sticky Header Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            menuIcon.classList.toggle('open');
        });
    }

    // Initialize Scroll Reveals
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
};

/**
 * 4. Boot System
 */
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('morinVibesLang') || 'en';
    setLanguage(savedLang);
    initInteractions();
});
