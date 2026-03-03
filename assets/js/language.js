/**
 * MORINVIBES® - LANGUAGE SWITCHER
 * Premium EN/BM/ZH with Dropdown - Zero Lag
 * Version: 2.0
 * 
 * Features:
 * - Smooth dropdown animation (CSS, not JS)
 * - localStorage persistence
 * - No page reload
 * - All text translated
 * - Zero performance impact
 */

(function() {
    'use strict';

    // ===== COMPLETE TRANSLATIONS =====
    const translations = {
        en: {
            // Navigation
            'nav_farm': 'Our Farm',
            'nav_quality': 'Quality',
            'nav_story': 'Story',
            'nav_shop': 'Shop',
            'nav_faq': 'FAQ',
            'nav_cta': 'Secure Fresh Supply',
            
            // Mobile bottom
            'mobile_learn': 'Learn',
            'mobile_buy': 'Buy Fresh Supply',
            
            // Hero
            'hero_badge': 'SINCE 2019 • PENANG',
            'hero_title': 'Fresh From Farm.<br>Made for Everyday Resilience.',
            'hero_sub': 'Farm-to-capsule moringa grown and prepared in Penang since 2019.',
            'hero_btn1': 'Secure Fresh Supply',
            'hero_btn2': 'Discover Our Farm',
            
            // Trust micro
            'trust_since': 'Since 2019',
            'trust_farm': 'Farm Direct',
            'trust_gmp': 'GMP',
            'trust_kkm': 'KKM',
            'trust_vegan': 'Vegan Friendly',
            'trust_msia': 'Malaysia',
            
            // Trust strip
            'trust_item_since': 'Since 2019',
            'trust_item_farm': 'Farm Direct',
            'trust_item_gmp': 'GMP',
            'trust_item_kkm': 'KKM',
            'trust_item_vegan': 'Vegan Friendly',
            'trust_item_msia': 'Malaysia Brand',
            
            // Farm difference
            'farm_label': 'THE ORIGIN',
            'farm_title': 'Not Warehouse Stock.<br>Real Harvest.',
            'farm_text': 'Our moringa comes from small farms in Penang, not industrial warehouses. Each batch follows the natural rhythm of the land — harvested at peak, dried with care.',
            'farm_harvest': 'HARVEST',
            'farm_harvest_desc': 'Morning-picked leaves, same-day processing',
            'farm_dry': 'DRY',
            'farm_dry_desc': 'Low-temperature shade drying',
            'farm_mill': 'MILL',
            'farm_mill_desc': 'Gentle milling into fine powder',
            'farm_capsule': 'CAPSULE',
            'farm_capsule_desc': 'Vegetarian capsules, nothing added',
            'farm_link': 'Visit Our Farm →',
            
            // Why moringa
            'why_label': 'TRADITIONAL WISDOM',
            'why_title': 'Why Moringa?',
            'why_text': 'Known as the "miracle tree" in traditional practices, moringa has been part of daily wellness for generations.',
            'why_card1': 'Traditionally Used Plant',
            'why_card1_text': 'Used in traditional practices across South Asia for daily nutritional support.',
            'why_card2': 'Nutrient Dense Leaf',
            'why_card2_text': 'Each leaf contains a complex profile of naturally occurring nutrients.',
            'why_card3': 'Gentle Daily Support',
            'why_card3_text': 'Easy to incorporate into daily routines — simply two capsules with water.',
            
            // Clinical transparency
            'clinical_label': 'PURE & TRANSPARENT',
            'clinical_title': 'What\'s inside is all you need.',
            'clinical_text': 'No hidden ingredients, no fillers, no additives. Just pure moringa leaf powder in vegetarian capsules.',
            'clinical_100': '100% Moringa Leaf Powder',
            'clinical_fillers': 'No Fillers',
            'clinical_additives': 'No Additives',
            'clinical_gmp': 'GMP Manufacturing',
            'clinical_kkm': 'KKM Registration In Progress',
            'clinical_vegan': 'Vegetarian Capsules',
            
            // Founder story
            'story_label': 'FOUNDED 2019',
            'story_title': 'From personal need to farm-direct purpose.',
            'story_text': 'In difficult years, my mother — a nurse — introduced me to moringa. What began as family support grew into something larger.',
            'story_quote': '"We started small, with one harvest and a simple goal — prepare moringa the way it deserves."',
            'story_link': 'Read Full Story →',
            
            // Product
            'product_label': 'ONE PRODUCT • PURE PURPOSE',
            'product_title': 'Farm-Direct Moringa Capsules',
            'product_name': 'MorinVibes® Moringa Capsules',
            'product_sub': 'Farm-Direct Botanical Nutrition',
            'product_price': 'RM89',
            'product_details': 'View Details',
            'product_buy': 'Buy Fresh Supply',
            
            // Advantages
            'adv_label': 'OFFICIAL WEBSITE BENEFITS',
            'adv_title': 'Why buy from our farm channel',
            'adv_fresh': 'Freshest batch allocation — direct from harvest',
            'adv_support': 'Direct founder support — we\'re here for you',
            'adv_tea': 'Future tea early access — be first',
            'adv_channel': 'Official farm channel — the real source',
            'adv_shopee': 'Not available on Shopee',
            'adv_shopee_text': 'Our official website is the only place for farm-direct batches. Shopee purchases come from third-party resellers — for the freshest supply, buy directly from the source.',
            
            // Buy section
            'buy_label': 'SECURE YOUR BATCH',
            'buy_title': 'Fresh Supply Available Now',
            'buy_text': 'Each batch prepared upon order to ensure maximum freshness.',
            'orderla_placeholder': 'Orderla.my Checkout',
            'orderla_note': 'RM30+ package purchased separately',
            
            // FAQ
            'faq_label': 'COMMON QUESTIONS',
            'faq_title': 'Quick Answers',
            'faq_q1': 'Is MorinVibes registered with KKM?',
            'faq_a1': 'Registration is currently in progress. Our facility follows GMP standards and we maintain full transparency about our process.',
            'faq_q2': 'Who is moringa suitable for?',
            'faq_a2': 'Moringa is generally suitable for adults seeking daily nutritional support. If you are pregnant, nursing, or have medical conditions, please consult your healthcare provider.',
            'faq_q3': 'How is this different from Shopee sellers?',
            'faq_a3': 'We are the original farm source since 2019. Shopee resellers purchase from us or others — buying directly ensures you receive the freshest batch with full traceability.',
            'faq_q4': 'Shipping to East Malaysia?',
            'faq_a4': 'Yes, we ship to Sabah and Sarawak. Delivery typically takes 3-5 business days for West Malaysia, 5-7 days for East Malaysia.',
            'faq_link': 'View All FAQs →',
            
            // Footer
            'footer_brand': 'MorinVibes®',
            'footer_desc': 'Farm-direct botanical nutrition, prepared in Penang since 2019.',
            'footer_shop': 'Shop',
            'footer_quality': 'Quality',
            'footer_connect': 'Connect',
            'footer_legal': 'Legal',
            'footer_privacy': 'Privacy Policy',
            'footer_terms': 'Terms',
            'footer_copyright': '© 2026 MorinVibes®. All rights reserved.',
            'footer_kkm': 'KKM: Registration in progress',
            'footer_disclaimer': 'These statements have not been evaluated by the Ministry of Health Malaysia. This product is not intended to diagnose, treat, cure, or prevent any disease.'
        },
        
        bm: {
            // Navigation
            'nav_farm': 'Ladang Kami',
            'nav_quality': 'Kualiti',
            'nav_story': 'Cerita',
            'nav_shop': 'Kedai',
            'nav_faq': 'Soalan',
            'nav_cta': 'Dapatkan Bekalan Segar',
            
            // Mobile bottom
            'mobile_learn': 'Pelajari',
            'mobile_buy': 'Beli Bekalan Segar',
            
            // Hero
            'hero_badge': 'SEJAK 2019 • PULAU PINANG',
            'hero_title': 'Segar Dari Ladang.<br>Untuk Ketahanan Harian.',
            'hero_sub': 'Moringa ladang-ke-kapsul ditanam dan disediakan di Pulau Pinang sejak 2019.',
            'hero_btn1': 'Dapatkan Bekalan Segar',
            'hero_btn2': 'Terokai Ladang Kami',
            
            // Trust micro
            'trust_since': 'Sejak 2019',
            'trust_farm': 'Ladang Langsung',
            'trust_gmp': 'GMP',
            'trust_kkm': 'KKM',
            'trust_vegan': 'Mesra Vegan',
            'trust_msia': 'Malaysia',
            
            // Trust strip
            'trust_item_since': 'Sejak 2019',
            'trust_item_farm': 'Ladang Langsung',
            'trust_item_gmp': 'GMP',
            'trust_item_kkm': 'KKM',
            'trust_item_vegan': 'Mesra Vegan',
            'trust_item_msia': 'Jenama Malaysia',
            
            // Farm difference
            'farm_label': 'ASAL USUL',
            'farm_title': 'Bukan Stok Gudang.<br>Hasil Tuai Sebenar.',
            'farm_text': 'Moringa kami dari ladang kecil di Pulau Pinang, bukan gudang industri. Setiap kelompok mengikut irama semula jadi tanah — dituai ketika puncak, dikeringkan dengan penjagaan.',
            'farm_harvest': 'TUAI',
            'farm_harvest_desc': 'Daun dipetik pagi, diproses hari yang sama',
            'farm_dry': 'KERING',
            'farm_dry_desc': 'Pengeringan teduh suhu rendah',
            'farm_mill': 'KISAR',
            'farm_mill_desc': 'Kisar lembut menjadi serbuk halus',
            'farm_capsule': 'KAPSUL',
            'farm_capsule_desc': 'Kapsul vegetarian, tiada bahan tambahan',
            'farm_link': 'Lawati Ladang Kami →',
            
            // Why moringa
            'why_label': 'KEBIJAKSANAAN TRADISIONAL',
            'why_title': 'Mengapa Moringa?',
            'why_text': 'Dikenali sebagai "pokok ajaib" dalam amalan tradisional, moringa telah menjadi sebahagian daripada kesihatan harian turun-temurun.',
            'why_card1': 'Tumbuhan Tradisional',
            'why_card1_text': 'Digunakan dalam amalan tradisional di seluruh Asia Selatan untuk sokongan nutrisi harian.',
            'why_card2': 'Daun Kaya Nutrien',
            'why_card2_text': 'Setiap daun mengandungi profil kompleks nutrien semula jadi.',
            'why_card3': 'Sokongan Harian Lembut',
            'why_card3_text': 'Mudah diamalkan dalam rutin harian — hanya dua kapsul dengan air.',
            
            // Clinical transparency
            'clinical_label': 'TULEN & TELUS',
            'clinical_title': 'Apa yang ada di dalam adalah apa yang anda perlukan.',
            'clinical_text': 'Tiada bahan tersembunyi, tiada pengisi, tiada bahan tambahan. Hanya serbuk daun moringa tulen dalam kapsul vegetarian.',
            'clinical_100': '100% Serbuk Daun Moringa',
            'clinical_fillers': 'Tiada Pengisi',
            'clinical_additives': 'Tiada Bahan Tambahan',
            'clinical_gmp': 'Pembuatan GMP',
            'clinical_kkm': 'Pendaftaran KKM Dalam Proses',
            'clinical_vegan': 'Kapsul Vegetarian',
            
            // Founder story
            'story_label': 'DITUBUHKAN 2019',
            'story_title': 'Dari keperluan peribadi kepada tujuan ladang-langsung.',
            'story_text': 'Pada tahun-tahun sukar, ibu saya — seorang jururawat — memperkenalkan saya kepada moringa. Apa yang bermula sebagai sokongan keluarga berkembang menjadi lebih besar.',
            'story_quote': '"Kami bermula kecil, dengan satu tuaian dan matlamat mudah — menyediakan moringa seperti yang sepatutnya."',
            'story_link': 'Baca Cerita Penuh →',
            
            // Product
            'product_label': 'SATU PRODUK • TUJUAN TULEN',
            'product_title': 'Kapsul Moringa Ladang-Langsung',
            'product_name': 'MorinVibes® Kapsul Moringa',
            'product_sub': 'Pemakanan Botani Ladang-Langsung',
            'product_price': 'RM89',
            'product_details': 'Lihat Butiran',
            'product_buy': 'Beli Bekalan Segar',
            
            // Advantages
            'adv_label': 'FAEDAH LAMAN WEB RASMI',
            'adv_title': 'Mengapa beli dari saluran ladang kami',
            'adv_fresh': 'Peruntukan kelompok paling segar — terus dari tuaian',
            'adv_support': 'Sokongan pengasas langsung — kami di sini untuk anda',
            'adv_tea': 'Akses awal teh masa depan — jadi yang pertama',
            'adv_channel': 'Saluran ladang rasmi — sumber sebenar',
            'adv_shopee': 'Tidak tersedia di Shopee',
            'adv_shopee_text': 'Laman web rasmi kami adalah satu-satunya tempat untuk kelompok ladang-langsung. Pembelian Shopee datang dari penjual semula pihak ketiga — untuk bekalan paling segar, beli terus dari sumber.',
            
            // Buy section
            'buy_label': 'PASTIKAN KELOMPOK ANDA',
            'buy_title': 'Bekalan Segar Tersedia Sekarang',
            'buy_text': 'Setiap kelompok disediakan selepas pesanan untuk memastikan kesegaran maksimum.',
            'orderla_placeholder': 'Pembayaran Orderla.my',
            'orderla_note': 'Pakej RM30+ dibeli secara berasingan',
            
            // FAQ
            'faq_label': 'SOALAN LAZIM',
            'faq_title': 'Jawapan Pantas',
            'faq_q1': 'Adakah MorinVibes berdaftar dengan KKM?',
            'faq_a1': 'Pendaftaran sedang dalam proses. Kemudahan kami mengikut piawaian GMP dan kami mengekalkan ketelusan penuh mengenai proses kami.',
            'faq_q2': 'Siapa yang sesuai mengambil moringa?',
            'faq_a2': 'Moringa umumnya sesuai untuk orang dewasa yang mencari sokongan nutrisi harian. Jika anda hamil, menyusu, atau mempunyai keadaan perubatan, sila berunding dengan pembekal penjagaan kesihatan anda.',
            'faq_q3': 'Bagaimana ini berbeza dari penjual Shopee?',
            'faq_a3': 'Kami adalah sumber ladang asal sejak 2019. Penjual semula Shopee membeli dari kami atau orang lain — membeli terus memastikan anda menerima kelompok paling segar dengan kebolehkesanan penuh.',
            'faq_q4': 'Penghantaran ke Malaysia Timur?',
            'faq_a4': 'Ya, kami menghantar ke Sabah dan Sarawak. Penghantaran biasanya mengambil masa 3-5 hari bekerja untuk Semenanjung Malaysia, 5-7 hari untuk Malaysia Timur.',
            'faq_link': 'Lihat Semua Soalan →',
            
            // Footer
            'footer_brand': 'MorinVibes®',
            'footer_desc': 'Pemakanan botani ladang-langsung, disediakan di Pulau Pinang sejak 2019.',
            'footer_shop': 'Kedai',
            'footer_quality': 'Kualiti',
            'footer_connect': 'Hubungi',
            'footer_legal': 'Undang-undang',
            'footer_privacy': 'Dasar Privasi',
            'footer_terms': 'Terma',
            'footer_copyright': '© 2026 MorinVibes®. Hak cipta terpelihara.',
            'footer_kkm': 'KKM: Pendaftaran Dalam Proses',
            'footer_disclaimer': 'Kenyataan ini belum dinilai oleh Kementerian Kesihatan Malaysia. Produk ini tidak bertujuan untuk mendiagnosis, merawat, menyembuhkan, atau mencegah sebarang penyakit.'
        },
        
        zh: {
            // Navigation
            'nav_farm': '我们的农场',
            'nav_quality': '品质',
            'nav_story': '故事',
            'nav_shop': '商店',
            'nav_faq': '常见问题',
            'nav_cta': '获取新鲜供应',
            
            // Mobile bottom
            'mobile_learn': '了解',
            'mobile_buy': '购买新鲜供应',
            
            // Hero
            'hero_badge': '始于2019 • 槟城',
            'hero_title': '农场直送。<br>日常活力之源。',
            'hero_sub': '自2019年起在槟城种植和制备的农场到胶囊辣木。',
            'hero_btn1': '获取新鲜供应',
            'hero_btn2': '探索我们的农场',
            
            // Trust micro
            'trust_since': '始于2019',
            'trust_farm': '农场直供',
            'trust_gmp': 'GMP',
            'trust_kkm': 'KKM',
            'trust_vegan': '纯素',
            'trust_msia': '马来西亚',
            
            // Trust strip
            'trust_item_since': '始于2019',
            'trust_item_farm': '农场直供',
            'trust_item_gmp': 'GMP',
            'trust_item_kkm': 'KKM',
            'trust_item_vegan': '纯素',
            'trust_item_msia': '马来西亚品牌',
            
            // Farm difference
            'farm_label': '源头',
            'farm_title': '不是仓库库存。<br>真正收获。',
            'farm_text': '我们的辣木来自槟城的小农场，而不是工业仓库。每批产品都遵循土地的自然节奏 — 在最佳时期收获，精心干燥。',
            'farm_harvest': '收获',
            'farm_harvest_desc': '早晨采摘的叶子，当天加工',
            'farm_dry': '干燥',
            'farm_dry_desc': '低温遮荫干燥',
            'farm_mill': '研磨',
            'farm_mill_desc': '温和研磨成细粉',
            'farm_capsule': '胶囊',
            'farm_capsule_desc': '素食胶囊，无添加',
            'farm_link': '参观我们的农场 →',
            
            // Why moringa
            'why_label': '传统智慧',
            'why_title': '为什么选择辣木？',
            'why_text': '在传统实践中被称为"奇迹之树"，辣木世代以来一直是日常健康的一部分。',
            'why_card1': '传统植物',
            'why_card1_text': '在南亚的传统实践中用于日常营养支持。',
            'why_card2': '营养丰富的叶子',
            'why_card2_text': '每片叶子含有复杂的天然营养素。',
            'why_card3': '温和日常支持',
            'why_card3_text': '易于融入日常生活 — 只需两粒胶囊配水。',
            
            // Clinical transparency
            'clinical_label': '纯净透明',
            'clinical_title': '内在所含，即你所需。',
            'clinical_text': '无隐藏成分，无填充剂，无添加剂。纯素食胶囊中的纯辣木叶粉。',
            'clinical_100': '100%辣木叶粉',
            'clinical_fillers': '无填充剂',
            'clinical_additives': '无添加剂',
            'clinical_gmp': 'GMP生产',
            'clinical_kkm': 'KKM注册进行中',
            'clinical_vegan': '素食胶囊',
            
            // Founder story
            'story_label': '成立于2019',
            'story_title': '从个人需求到农场直供的使命。',
            'story_text': '在困难时期，我的母亲 — 一名护士 — 向我介绍了辣木。起初是家庭支持，后来发展成更大的愿望。',
            'story_quote': '"我们从小开始，一次收获，一个简单的目标 — 以应有的方式制备辣木。"',
            'story_link': '阅读完整故事 →',
            
            // Product
            'product_label': '单一产品 • 纯粹使命',
            'product_title': '农场直供辣木胶囊',
            'product_name': 'MorinVibes® 辣木胶囊',
            'product_sub': '农场直供植物营养',
            'product_price': 'RM89',
            'product_details': '查看详情',
            'product_buy': '购买新鲜供应',
            
            // Advantages
            'adv_label': '官网专属福利',
            'adv_title': '为什么从我们的农场渠道购买',
            'adv_fresh': '最新批次分配 — 直接从收获',
            'adv_support': '创始人直接支持 — 我们为您服务',
            'adv_tea': '未来茶叶抢先体验 — 成为第一',
            'adv_channel': '官方农场渠道 — 真正源头',
            'adv_shopee': 'Shopee上无售',
            'adv_shopee_text': '我们的官方网站是农场直供批次的唯一购买渠道。Shopee的购买来自第三方经销商 — 要获得最新鲜的供应，请直接从源头购买。',
            
            // Buy section
            'buy_label': '锁定您的批次',
            'buy_title': '新鲜供应现可购买',
            'buy_text': '每批产品按订单制备，确保最大新鲜度。',
            'orderla_placeholder': 'Orderla.my 结账',
            'orderla_note': 'RM30+套餐单独购买',
            
            // FAQ
            'faq_label': '常见问题',
            'faq_title': '快速解答',
            'faq_q1': 'MorinVibes是否在KKM注册？',
            'faq_a1': '注册正在进行中。我们的设施遵循GMP标准，我们对生产过程保持完全透明。',
            'faq_q2': '辣木适合谁？',
            'faq_a2': '辣木通常适合寻求日常营养支持的成年人。如果您怀孕、哺乳或有医疗状况，请咨询您的医疗保健提供者。',
            'faq_q3': '这与Shopee卖家有何不同？',
            'faq_a3': '自2019年以来，我们是原始农场来源。Shopee经销商从我们或其他处购买 — 直接购买确保您收到最新鲜的批次，并可完全追溯。',
            'faq_q4': '运送到东马？',
            'faq_a4': '是的，我们运送到沙巴和砂拉越。西马通常需要3-5个工作日，东马需要5-7个工作日。',
            'faq_link': '查看所有问题 →',
            
            // Footer
            'footer_brand': 'MorinVibes®',
            'footer_desc': '自2019年起在槟城制备的农场直供植物营养。',
            'footer_shop': '商店',
            'footer_quality': '品质',
            'footer_connect': '联系',
            'footer_legal': '法律',
            'footer_privacy': '隐私政策',
            'footer_terms': '条款',
            'footer_copyright': '© 2026 MorinVibes®。保留所有权利。',
            'footer_kkm': 'KKM注册进行中',
            'footer_disclaimer': '这些声明未经马来西亚卫生部评估。本产品不用于诊断、治疗、治愈或预防任何疾病。'
        }
    };

    // ===== LANGUAGE MANAGER (Zero Lag) =====
    class LanguageManager {
        constructor() {
            this.currentLang = localStorage.getItem('morinvibes_lang') || 'en';
            this.init();
        }
        
        init() {
            // Set up dropdown
            this.setupDropdown();
            
            // Apply initial language
            this.setLanguage(this.currentLang, false);
            
            // Update HTML lang attribute
            document.documentElement.lang = this.currentLang;
        }
        
        setupDropdown() {
            const selector = document.querySelector('.lang-selector');
            const options = document.querySelector('.lang-options');
            const currentSpan = document.querySelector('.lang-current');
            const optionItems = document.querySelectorAll('.lang-option');
            
            if (!selector || !options) return;
            
            // Toggle dropdown on click (simple, no animation lag)
            selector.addEventListener('click', (e) => {
                e.stopPropagation();
                options.classList.toggle('show');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                options.classList.remove('show');
            });
            
            // Handle option selection
            optionItems.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const lang = option.dataset.lang;
                    
                    // Update current language display
                    if (currentSpan) {
                        currentSpan.textContent = lang.toUpperCase();
                    }
                    
                    // Update active class
                    optionItems.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                    
                    // Set language
                    this.setLanguage(lang, true);
                    
                    // Close dropdown
                    options.classList.remove('show');
                });
            });
        }
        
        setLanguage(langCode, save = true) {
            if (!translations[langCode]) return;
            
            this.currentLang = langCode;
            
            if (save) {
                localStorage.setItem('morinvibes_lang', langCode);
                document.documentElement.lang = langCode;
            }
            
            // Update all elements with data-i18n
            this.updateContent();
            
            // Dispatch event for other scripts (pixel, etc)
            window.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: langCode } 
            }));
        }
        
        updateContent() {
            // Batch DOM updates for performance
            const elements = document.querySelectorAll('[data-i18n]');
            
            elements.forEach(el => {
                const key = el.dataset.i18n;
                const translation = this.getTranslation(key);
                
                if (translation) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = translation;
                    } else if (el.tagName === 'META' && el.name === 'description') {
                        el.content = translation;
                    } else {
                        el.innerHTML = translation;
                    }
                }
            });
        }
        
        getTranslation(key) {
            return translations[this.currentLang]?.[key] || translations.en[key] || key;
        }
    }

    // Initialize when DOM is ready (never blocks)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new LanguageManager();
        });
    } else {
        new LanguageManager();
    }

})();
