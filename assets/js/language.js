/**
 * MorinVibes® - Language Switcher
 * Supports: English (EN), Bahasa Malaysia (BM), Chinese (ZH)
 * Version: 1.0
 */

(function() {
    'use strict';

    // ===== TRANSLATIONS =====
    const translations = {
        en: {
            // Navigation
            nav_home: 'Home',
            nav_farm: 'Our Farm',
            nav_quality: 'Quality',
            nav_story: 'Story',
            nav_shop: 'Shop',
            nav_faq: 'FAQ',
            nav_cta: 'Secure Fresh Supply',
            
            // Mobile bottom bar
            mobile_learn: 'Learn',
            mobile_buy: 'Buy Fresh Supply',
            
            // Hero section
            hero_headline: 'Fresh From Farm.<br>Made for Everyday Resilience.',
            hero_subhead: 'Farm-to-capsule moringa grown and prepared in Penang since 2019.',
            hero_cta_primary: 'Secure Fresh Supply',
            hero_cta_secondary: 'Discover Our Farm',
            
            // Trust strip
            trust_since: 'Since 2019',
            trust_farm: 'Farm Direct',
            trust_gmp: 'GMP',
            trust_kkm: 'KKM',
            trust_vegan: 'Vegan Friendly',
            trust_malaysia: 'Malaysia Brand',
            
            // Farm difference
            farm_label: 'The Origin',
            farm_headline: 'Not Warehouse Stock.<br>Real Harvest.',
            farm_text: 'Our moringa comes from small farms in Penang, not industrial warehouses. Each batch follows the natural rhythm of the land — harvested at peak, dried with care, and prepared gently.',
            farm_harvest: 'Harvest',
            farm_harvest_desc: 'Morning-picked leaves, same-day processing',
            farm_dry: 'Dry',
            farm_dry_desc: 'Low-temperature shade drying for nutrient care',
            farm_prepare: 'Prepare',
            farm_prepare_desc: 'Gentle milling into fine powder',
            farm_capsule: 'Capsule',
            farm_capsule_desc: 'Vegetarian capsules, nothing added',
            farm_link: 'Visit Our Farm →',
            
            // Why moringa
            why_label: 'Traditional Wisdom',
            why_headline: 'Why Moringa?',
            why_text: 'Known as the "miracle tree" in traditional practices, moringa has been part of daily wellness for generations.',
            why_card1: 'Traditionally Used Plant',
            why_card1_text: 'Used in traditional practices across South Asia for daily nutritional support.',
            why_card2: 'Nutrient Dense Leaf',
            why_card2_text: 'Each leaf contains a complex profile of naturally occurring nutrients.',
            why_card3: 'Gentle Daily Support',
            why_card3_text: 'Easy to incorporate into daily routines — simply two capsules with water.',
            
            // Clinical transparency
            clinical_label: 'Pure & Transparent',
            clinical_headline: 'What\'s inside is all you need.',
            clinical_text: 'No hidden ingredients, no fillers, no additives. Just pure moringa leaf powder in vegetarian capsules.',
            clinical_100: '100% Moringa Leaf Powder',
            clinical_fillers: 'No Fillers',
            clinical_additives: 'No Additives',
            clinical_gmp: 'GMP Manufacturing',
            clinical_kkm: 'KKM Registration In Progress',
            clinical_vegan: 'Vegetarian Capsules',
            
            // Founder story
            story_label: 'Founded 2019',
            story_headline: 'From personal need to farm-direct purpose.',
            story_text: 'In difficult years, my mother — a nurse — introduced me to moringa. What began as family support grew into something larger: a desire to share farm-direct moringa with others seeking gentle daily wellness.',
            story_quote: 'We started small, with one harvest and a simple goal — prepare moringa the way it deserves.',
            story_link: 'Read Full Story →',
            
            // Product
            product_label: 'One Product • Pure Purpose',
            product_headline: 'Farm-Direct Moringa Capsules',
            product_title: 'MorinVibes® Moringa Capsules',
            product_subtitle: 'Farm-Direct Botanical Nutrition',
            product_price: 'RM89',
            product_details: 'View Details',
            product_buy: 'Buy Fresh Supply',
            
            // Website advantages
            advantage_label: 'Official Website Benefits',
            advantage_headline: 'Why buy from our farm channel',
            advantage_fresh: 'Freshest batch allocation — direct from harvest',
            advantage_support: 'Direct founder support — we\'re here for you',
            advantage_tea: 'Future tea early access — be first',
            advantage_channel: 'Official farm channel — the real source',
            advantage_shopee: 'Not available on Shopee',
            advantage_shopee_text: 'Our official website is the only place for farm-direct batches. Shopee purchases come from third-party resellers — for the freshest supply, buy directly from the source.',
            
            // Buy section
            buy_label: 'Secure Your Batch',
            buy_headline: 'Fresh Supply Available Now',
            buy_text: 'Each batch prepared upon order to ensure maximum freshness.',
            orderla_placeholder: 'Orderla.my Checkout',
            orderla_text: 'Secure checkout will appear here after Orderla integration.',
            orderla_note: 'RM30+ Orderla package purchased separately.',
            
            // FAQ Preview
            faq_label: 'Common Questions',
            faq_headline: 'Quick Answers',
            faq_q1: 'Is MorinVibes registered with KKM?',
            faq_a1: 'Registration is currently in progress. Our facility follows GMP standards and we maintain full transparency about our process.',
            faq_q2: 'Who is moringa suitable for?',
            faq_a2: 'Moringa is generally suitable for adults seeking daily nutritional support. If you are pregnant, nursing, or have medical conditions, please consult your healthcare provider.',
            faq_q3: 'How is this different from Shopee sellers?',
            faq_a3: 'We are the original farm source since 2019. Shopee resellers purchase from us or others — buying directly ensures you receive the freshest batch with full traceability.',
            faq_q4: 'Shipping to East Malaysia?',
            faq_a4: 'Yes, we ship to Sabah and Sarawak. Delivery typically takes 3-5 business days for West Malaysia, 5-7 days for East Malaysia.',
            faq_view_all: 'View All FAQs →',
            
            // Footer
            footer_brand: 'MorinVibes®',
            footer_description: 'Farm-direct botanical nutrition, prepared in Penang since 2019.',
            footer_shop: 'Shop',
            footer_quality: 'Quality',
            footer_connect: 'Connect',
            footer_legal: 'Legal',
            footer_privacy: 'Privacy Policy',
            footer_terms: 'Terms',
            footer_copyright: '© 2026 MorinVibes®. All rights reserved.',
            footer_disclaimer: 'These statements have not been evaluated by the Ministry of Health Malaysia. This product is not intended to diagnose, treat, cure, or prevent any disease.',
            
            // Buttons
            btn_back: 'Back',
            btn_submit: 'Submit',
            btn_learn_more: 'Learn More',
            
            // Form placeholders
            form_name: 'Your Name',
            form_email: 'Email Address',
            form_phone: 'Phone Number',
            form_message: 'Your Message',
            
            // Error messages
            error_required: 'This field is required',
            error_email: 'Please enter a valid email',
            error_phone: 'Please enter a valid phone number',
            
            // Success messages
            success_thanks: 'Thank you for your message!',
            success_respond: 'We will respond within 24 hours.'
        },
        
        bm: {
            // Navigation
            nav_home: 'Utama',
            nav_farm: 'Ladang Kami',
            nav_quality: 'Kualiti',
            nav_story: 'Cerita',
            nav_shop: 'Kedai',
            nav_faq: 'Soalan',
            nav_cta: 'Dapatkan Bekalan Segar',
            
            // Mobile bottom bar
            mobile_learn: 'Pelajari',
            mobile_buy: 'Beli Bekalan Segar',
            
            // Hero section
            hero_headline: 'Segar dari Ladang.<br>Untuk Ketahanan Harian.',
            hero_subhead: 'Moringa ladang-ke-kapsul ditanam dan disediakan di Pulau Pinang sejak 2019.',
            hero_cta_primary: 'Dapatkan Bekalan Segar',
            hero_cta_secondary: 'Terokai Ladang Kami',
            
            // Trust strip
            trust_since: 'Sejak 2019',
            trust_farm: 'Ladang Langsung',
            trust_gmp: 'GMP',
            trust_kkm: 'KKM',
            trust_vegan: 'Mesra Vegan',
            trust_malaysia: 'Jenama Malaysia',
            
            // Farm difference
            farm_label: 'Asal Usul',
            farm_headline: 'Bukan Stok Gudang.<br>Hasil Tuai Sebenar.',
            farm_text: 'Moringa kami datang dari ladang kecil di Pulau Pinang, bukan gudang industri. Setiap kelompok mengikut irama semula jadi tanah — dituai ketika puncak, dikeringkan dengan penjagaan, dan disediakan dengan lembut.',
            farm_harvest: 'Tuai',
            farm_harvest_desc: 'Daun dipetik pagi, diproses hari yang sama',
            farm_dry: 'Kering',
            farm_dry_desc: 'Pengeringan teduh suhu rendah untuk penjagaan nutrien',
            farm_prepare: 'Sedia',
            farm_prepare_desc: 'Kisar lembut menjadi serbuk halus',
            farm_capsule: 'Kapsul',
            farm_capsule_desc: 'Kapsul vegetarian, tiada bahan tambahan',
            farm_link: 'Lawati Ladang Kami →',
            
            // Why moringa
            why_label: 'Kebijaksanaan Tradisional',
            why_headline: 'Mengapa Moringa?',
            why_text: 'Dikenali sebagai "pokok ajaib" dalam amalan tradisional, moringa telah menjadi sebahagian daripada kesihatan harian turun-temurun.',
            why_card1: 'Tumbuhan Tradisional',
            why_card1_text: 'Digunakan dalam amalan tradisional di seluruh Asia Selatan untuk sokongan nutrisi harian.',
            why_card2: 'Daun Kaya Nutrien',
            why_card2_text: 'Setiap daun mengandungi profil kompleks nutrien semula jadi.',
            why_card3: 'Sokongan Harian Lembut',
            why_card3_text: 'Mudah diamalkan dalam rutin harian — hanya dua kapsul dengan air.',
            
            // Clinical transparency
            clinical_label: 'Tulen & Telus',
            clinical_headline: 'Apa yang ada di dalam adalah apa yang anda perlukan.',
            clinical_text: 'Tiada bahan tersembunyi, tiada pengisi, tiada bahan tambahan. Hanya serbuk daun moringa tulen dalam kapsul vegetarian.',
            clinical_100: '100% Serbuk Daun Moringa',
            clinical_fillers: 'Tiada Pengisi',
            clinical_additives: 'Tiada Bahan Tambahan',
            clinical_gmp: 'Pembuatan GMP',
            clinical_kkm: 'Pendaftaran KKM Dalam Proses',
            clinical_vegan: 'Kapsul Vegetarian',
            
            // Founder story
            story_label: 'Ditubuhkan 2019',
            story_headline: 'Dari keperluan peribadi kepada tujuan ladang-langsung.',
            story_text: 'Pada tahun-tahun sukar, ibu saya — seorang jururawat — memperkenalkan saya kepada moringa. Apa yang bermula sebagai sokongan keluarga berkembang menjadi lebih besar: hasrat untuk berkongsi moringa ladang-langsung dengan orang lain yang mencari kesihatan harian yang lembut.',
            story_quote: 'Kami bermula kecil, dengan satu tuaian dan matlamat mudah — menyediakan moringa seperti yang sepatutnya.',
            story_link: 'Baca Cerita Penuh →',
            
            // Product
            product_label: 'Satu Produk • Tujuan Tulen',
            product_headline: 'Kapsul Moringa Ladang-Langsung',
            product_title: 'MorinVibes® Kapsul Moringa',
            product_subtitle: 'Pemakanan Botani Ladang-Langsung',
            product_price: 'RM89',
            product_details: 'Lihat Butiran',
            product_buy: 'Beli Bekalan Segar',
            
            // Website advantages
            advantage_label: 'Faedah Laman Web Rasmi',
            advantage_headline: 'Mengapa beli dari saluran ladang kami',
            advantage_fresh: 'Peruntukan kelompok paling segar — terus dari tuaian',
            advantage_support: 'Sokongan pengasas langsung — kami di sini untuk anda',
            advantage_tea: 'Akses awal teh masa depan — jadi yang pertama',
            advantage_channel: 'Saluran ladang rasmi — sumber sebenar',
            advantage_shopee: 'Tidak tersedia di Shopee',
            advantage_shopee_text: 'Laman web rasmi kami adalah satu-satunya tempat untuk kelompok ladang-langsung. Pembelian Shopee datang dari penjual semula pihak ketiga — untuk bekalan paling segar, beli terus dari sumber.',
            
            // Buy section
            buy_label: 'Pastikan Kelompok Anda',
            buy_headline: 'Bekalan Segar Tersedia Sekarang',
            buy_text: 'Setiap kelompok disediakan selepas pesanan untuk memastikan kesegaran maksimum.',
            orderla_placeholder: 'Pembayaran Orderla.my',
            orderla_text: 'Pembayaran selamat akan muncul di sini selepas integrasi Orderla.',
            orderla_note: 'Pakej Orderla RM30+ dibeli secara berasingan.',
            
            // FAQ Preview
            faq_label: 'Soalan Lazim',
            faq_headline: 'Jawapan Pantas',
            faq_q1: 'Adakah MorinVibes berdaftar dengan KKM?',
            faq_a1: 'Pendaftaran sedang dalam proses. Kemudahan kami mengikut piawaian GMP dan kami mengekalkan ketelusan penuh mengenai proses kami.',
            faq_q2: 'Siapa yang sesuai mengambil moringa?',
            faq_a2: 'Moringa umumnya sesuai untuk orang dewasa yang mencari sokongan nutrisi harian. Jika anda hamil, menyusu, atau mempunyai keadaan perubatan, sila berunding dengan pembekal penjagaan kesihatan anda.',
            faq_q3: 'Bagaimana ini berbeza dari penjual Shopee?',
            faq_a3: 'Kami adalah sumber ladang asal sejak 2019. Penjual semula Shopee membeli dari kami atau orang lain — membeli terus memastikan anda menerima kelompok paling segar dengan kebolehkesanan penuh.',
            faq_q4: 'Penghantaran ke Malaysia Timur?',
            faq_a4: 'Ya, kami menghantar ke Sabah dan Sarawak. Penghantaran biasanya mengambil masa 3-5 hari bekerja untuk Semenanjung Malaysia, 5-7 hari untuk Malaysia Timur.',
            faq_view_all: 'Lihat Semua Soalan →',
            
            // Footer
            footer_brand: 'MorinVibes®',
            footer_description: 'Pemakanan botani ladang-langsung, disediakan di Pulau Pinang sejak 2019.',
            footer_shop: 'Kedai',
            footer_quality: 'Kualiti',
            footer_connect: 'Hubungi',
            footer_legal: 'Undang-undang',
            footer_privacy: 'Dasar Privasi',
            footer_terms: 'Terma',
            footer_copyright: '© 2026 MorinVibes®. Hak cipta terpelihara.',
            footer_disclaimer: 'Kenyataan ini belum dinilai oleh Kementerian Kesihatan Malaysia. Produk ini tidak bertujuan untuk mendiagnosis, merawat, menyembuhkan, atau mencegah sebarang penyakit.',
            
            // Buttons
            btn_back: 'Kembali',
            btn_submit: 'Hantar',
            btn_learn_more: 'Ketahui Lebih',
            
            // Form placeholders
            form_name: 'Nama Anda',
            form_email: 'Alamat Emel',
            form_phone: 'Nombor Telefon',
            form_message: 'Mesej Anda',
            
            // Error messages
            error_required: 'Medan ini diperlukan',
            error_email: 'Sila masukkan emel yang sah',
            error_phone: 'Sila masukkan nombor telefon yang sah',
            
            // Success messages
            success_thanks: 'Terima kasih atas mesej anda!',
            success_respond: 'Kami akan membalas dalam masa 24 jam.'
        },
        
        zh: {
            // Navigation
            nav_home: '首页',
            nav_farm: '我们的农场',
            nav_quality: '品质',
            nav_story: '故事',
            nav_shop: '商店',
            nav_faq: '常见问题',
            nav_cta: '获取新鲜供应',
            
            // Mobile bottom bar
            mobile_learn: '了解',
            mobile_buy: '购买新鲜供应',
            
            // Hero section
            hero_headline: '农场直送。<br>日常活力之源。',
            hero_subhead: '自2019年起在槟城种植和制备的农场到胶囊辣木。',
            hero_cta_primary: '获取新鲜供应',
            hero_cta_secondary: '探索我们的农场',
            
            // Trust strip
            trust_since: '始于2019',
            trust_farm: '农场直供',
            trust_gmp: 'GMP认证',
            trust_kkm: 'KKM注册中',
            trust_vegan: '纯素',
            trust_malaysia: '马来西亚品牌',
            
            // Farm difference
            farm_label: '源头',
            farm_headline: '不是仓库库存。<br>真正收获。',
            farm_text: '我们的辣木来自槟城的小农场，而不是工业仓库。每批产品都遵循土地的自然节奏 — 在最佳时期收获，精心干燥，温和制备。',
            farm_harvest: '收获',
            farm_harvest_desc: '早晨采摘的叶子，当天加工',
            farm_dry: '干燥',
            farm_dry_desc: '低温遮荫干燥，保护营养',
            farm_prepare: '制备',
            farm_prepare_desc: '温和研磨成细粉',
            farm_capsule: '胶囊',
            farm_capsule_desc: '素食胶囊，无添加',
            farm_link: '参观我们的农场 →',
            
            // Why moringa
            why_label: '传统智慧',
            why_headline: '为什么选择辣木？',
            why_text: '在传统实践中被称为"奇迹之树"，辣木世代以来一直是日常健康的一部分。',
            why_card1: '传统植物',
            why_card1_text: '在南亚的传统实践中用于日常营养支持。',
            why_card2: '营养丰富的叶子',
            why_card2_text: '每片叶子含有复杂的天然营养素。',
            why_card3: '温和日常支持',
            why_card3_text: '易于融入日常生活 — 只需两粒胶囊配水。',
            
            // Clinical transparency
            clinical_label: '纯净透明',
            clinical_headline: '内在所含，即你所需。',
            clinical_text: '无隐藏成分，无填充剂，无添加剂。纯素食胶囊中的纯辣木叶粉。',
            clinical_100: '100%辣木叶粉',
            clinical_fillers: '无填充剂',
            clinical_additives: '无添加剂',
            clinical_gmp: 'GMP生产',
            clinical_kkm: 'KKM注册进行中',
            clinical_vegan: '素食胶囊',
            
            // Founder story
            story_label: '成立于2019',
            story_headline: '从个人需求到农场直供的使命。',
            story_text: '在困难时期，我的母亲 — 一名护士 — 向我介绍了辣木。起初是家庭支持，后来发展成更大的愿望：与寻求温和日常健康的人分享农场直供的辣木。',
            story_quote: '我们从小开始，一次收获，一个简单的目标 — 以应有的方式制备辣木。',
            story_link: '阅读完整故事 →',
            
            // Product
            product_label: '单一产品 • 纯粹使命',
            product_headline: '农场直供辣木胶囊',
            product_title: 'MorinVibes® 辣木胶囊',
            product_subtitle: '农场直供植物营养',
            product_price: 'RM89',
            product_details: '查看详情',
            product_buy: '购买新鲜供应',
            
            // Website advantages
            advantage_label: '官网专属福利',
            advantage_headline: '为什么从我们的农场渠道购买',
            advantage_fresh: '最新批次分配 — 直接从收获',
            advantage_support: '创始人直接支持 — 我们为您服务',
            advantage_tea: '未来茶叶抢先体验 — 成为第一',
            advantage_channel: '官方农场渠道 — 真正源头',
            advantage_shopee: 'Shopee上无售',
            advantage_shopee_text: '我们的官方网站是农场直供批次的唯一购买渠道。Shopee的购买来自第三方经销商 — 要获得最新鲜的供应，请直接从源头购买。',
            
            // Buy section
            buy_label: '锁定您的批次',
            buy_headline: '新鲜供应现可购买',
            buy_text: '每批产品按订单制备，确保最大新鲜度。',
            orderla_placeholder: 'Orderla.my 结账',
            orderla_text: 'Orderla集成后将显示安全结账。',
            orderla_note: 'RM30+ Orderla套餐单独购买。',
            
            // FAQ Preview
            faq_label: '常见问题',
            faq_headline: '快速解答',
            faq_q1: 'MorinVibes是否在KKM注册？',
            faq_a1: '注册正在进行中。我们的设施遵循GMP标准，我们对生产过程保持完全透明。',
            faq_q2: '辣木适合谁？',
            faq_a2: '辣木通常适合寻求日常营养支持的成年人。如果您怀孕、哺乳或有医疗状况，请咨询您的医疗保健提供者。',
            faq_q3: '这与Shopee卖家有何不同？',
            faq_a3: '自2019年以来，我们是原始农场来源。Shopee经销商从我们或其他处购买 — 直接购买确保您收到最新鲜的批次，并可完全追溯。',
            faq_q4: '运送到东马？',
            faq_a4: '是的，我们运送到沙巴和砂拉越。西马通常需要3-5个工作日，东马需要5-7个工作日。',
            faq_view_all: '查看所有问题 →',
            
            // Footer
            footer_brand: 'MorinVibes®',
            footer_description: '自2019年起在槟城制备的农场直供植物营养。',
            footer_shop: '商店',
            footer_quality: '品质',
            footer_connect: '联系',
            footer_legal: '法律',
            footer_privacy: '隐私政策',
            footer_terms: '条款',
            footer_copyright: '© 2026 MorinVibes®。保留所有权利。',
            footer_disclaimer: '这些声明未经马来西亚卫生部评估。本产品不用于诊断、治疗、治愈或预防任何疾病。',
            
            // Buttons
            btn_back: '返回',
            btn_submit: '提交',
            btn_learn_more: '了解更多',
            
            // Form placeholders
            form_name: '您的姓名',
            form_email: '电子邮件地址',
            form_phone: '电话号码',
            form_message: '您的留言',
            
            // Error messages
            error_required: '此字段为必填',
            error_email: '请输入有效的电子邮件',
            error_phone: '请输入有效的电话号码',
            
            // Success messages
            success_thanks: '感谢您的留言！',
            success_respond: '我们将在24小时内回复。'
        }
    };

    // ===== LANGUAGE SWITCHER FUNCTIONALITY =====

    class LanguageSwitcher {
        constructor() {
            this.currentLang = localStorage.getItem('morinvibes_lang') || 'en';
            this.observers = [];
            this.init();
        }

        init() {
            // Set initial language
            this.setLanguage(this.currentLang, false);
            
            // Add event listeners to language buttons
            document.querySelectorAll('.language-switcher__btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const lang = e.target.dataset.lang;
                    if (lang) {
                        this.setLanguage(lang, true);
                    }
                });
            });

            // Watch for dynamically added content
            this.observeContent();
        }

        setLanguage(langCode, saveToStorage = true) {
            if (!translations[langCode]) {
                console.error(`Language ${langCode} not supported`);
                return;
            }

            this.currentLang = langCode;
            
            if (saveToStorage) {
                localStorage.setItem('morinvibes_lang', langCode);
            }

            // Update HTML lang attribute
            document.documentElement.lang = langCode;

            // Update active button states
            document.querySelectorAll('.language-switcher__btn').forEach(btn => {
                if (btn.dataset.lang === langCode) {
                    btn.classList.add('language-switcher__btn--active');
                } else {
                    btn.classList.remove('language-switcher__btn--active');
                }
            });

            // Update all translatable elements
            this.updateContent();

            // Dispatch custom event for other scripts
            window.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: langCode } 
            }));

            console.log(`Language switched to: ${langCode}`);
        }

        updateContent() {
            const elements = document.querySelectorAll('[data-i18n]');
            
            elements.forEach(element => {
                const key = element.dataset.i18n;
                const translation = this.getTranslation(key);
                
                if (translation) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = translation;
                    } else {
                        element.innerHTML = translation;
                    }
                }
            });

            // Update placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.dataset.i18nPlaceholder;
                const translation = this.getTranslation(key);
                if (translation) {
                    element.placeholder = translation;
                }
            });

            // Update alt text
            document.querySelectorAll('[data-i18n-alt]').forEach(element => {
                const key = element.dataset.i18nAlt;
                const translation = this.getTranslation(key);
                if (translation) {
                    element.alt = translation;
                }
            });
        }

        getTranslation(key) {
            return translations[this.currentLang]?.[key] || key;
        }

        observeContent() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.addedNodes.length) {
                        this.updateContent();
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        addTranslations(customTranslations) {
            Object.keys(customTranslations).forEach(lang => {
                if (!translations[lang]) {
                    translations[lang] = {};
                }
                Object.assign(translations[lang], customTranslations[lang]);
            });
            this.updateContent();
        }
    }

    // Initialize language switcher
    window.MorinVibesLanguage = new LanguageSwitcher();

})();
