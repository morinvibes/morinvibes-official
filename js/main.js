// Trilingual Translation Object
const translations = {
    en: {
        nav_farm: "Our Farm",
        nav_science: "KKM/Science",
        nav_order: "Order Now",
        hero_h1: "Penang's Purest Farm-to-Capsule Moringa",
        hero_p: "Unlock peak vitality with 100% organic Moringa, grown in our own Penang farm.",
        order_title: "Secure Your Bottle Today"
    },
    bm: {
        nav_farm: "Ladang Kami",
        nav_science: "KKM/Sains",
        nav_order: "Tempah Sekarang",
        hero_h1: "Moringa Paling Tulen Dari Ladang Pulau Pinang",
        hero_p: "Tingkatkan kecergasan anda dengan 100% Moringa organik, ditanam sendiri di Pulau Pinang.",
        order_title: "Dapatkan Botol Anda Hari Ini"
    },
    zh: {
        nav_farm: "我们的农场",
        nav_science: "KKM认证/科学",
        nav_order: "立即购买",
        hero_h1: "槟城最纯净的辣木精华 (农场直供)",
        hero_p: "通过 100% 有机辣木解锁巅峰生命力，产自我们位于槟城的自有农场。",
        order_title: "立即订购"
    }
};

// Language Switcher Logic
function switchLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = translations[lang][key];
    });
    // Track Language Preference in Meta
    fbq('trackCustom', 'LanguagePreference', { language: lang });
}

// Scroll Reveal Observer
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Trigger AddToCart when user reaches the Order section
            if (entry.target.id === 'order') {
                trackAddToCart();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Tracking Logic
function trackAddToCart() {
    fbq('track', 'AddToCart', {
        content_name: 'MorinVibes Moringa Capsules',
        content_category: 'Supplements',
        value: 85.00,
        currency: 'MYR'
    });
    console.log('Meta: AddToCart Fired');
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});
