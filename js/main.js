// Translation Dictionary
const translations = {
    en: {
        nav_home: "Home",
        nav_benefits: "Benefits",
        nav_farm: "Our Farm",
        nav_shop: "Shop Now",
        hero_tagline: "PENANG'S PRIDE",
        hero_h1: "Pure Moringa.<br><em>Grown for You.</em>",
        hero_desc: "Harvested from our GMP-certified farm in Penang. High-potency nutrition in every capsule.",
        order_title: "Order Your Fresh Batch",
        promo: "FREE SHIPPING ACROSS MALAYSIA FOR ORDERS ABOVE RM150"
    },
    bm: {
        nav_home: "Utama",
        nav_benefits: "Khasiat",
        nav_farm: "Ladang Kami",
        nav_shop: "Beli Sekarang",
        hero_tagline: "KEBANGGAAN PENANG",
        hero_h1: "Moringa Tulen.<br><em>Khas Untuk Anda.</em>",
        hero_desc: "Dituai dari ladang berstatus GMP kami di Pulau Pinang. Nutrisi berpotensi tinggi dalam setiap kapsul.",
        order_title: "Tempah Pesanan Anda",
        promo: "PENGHANTARAN PERCUMA DI MALAYSIA UNTUK PESANAN RM150 KE ATAS"
    },
    zh: {
        nav_home: "首页",
        nav_benefits: "产品功效",
        nav_farm: "自有农场",
        nav_shop: "立即购买",
        hero_tagline: "槟城之傲",
        hero_h1: "纯净辣木。<br><em>为您守护健康。</em>",
        hero_desc: "产自槟城 GMP 认证农场。每一粒胶囊都蕴含高浓度营养。",
        order_title: "立即预订您的辣木精华",
        promo: "马来西亚境内订单满 RM150 即可享受免运费"
    }
};

// Language Engine
function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    localStorage.setItem('morinVibesLang', lang);
    // Track Language Selection in Meta Pixel
    fbq('trackCustom', 'LanguageSelected', { language: lang });
}

// Scroll Reveal Logic
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Auto-fire AddToCart when user scrolls to the order section
            if (entry.target.id === 'order') {
                fbq('track', 'AddToCart', { currency: 'MYR', value: 85.00 });
                console.log("Meta Event: AddToCart fired.");
            }
        }
    });
}, { threshold: 0.15 });

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('morinVibesLang') || 'en';
    setLanguage(savedLang);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
});
