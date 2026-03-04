/**
 * MorinVibes® — i18n Engine + Translations v8.0
 * ================================================================
 * Languages: English (en) · Bahasa Malaysia (bm) · Chinese (zh)
 *
 * Improvements over v7:
 *  ✦ Full i18n engine — no external dependency
 *  ✦ Fallback chain: current lang → 'en' → key itself
 *  ✦ Template interpolation:  t('key', { name: 'Jess' })
 *  ✦ Pluralization:           t('bottles', { count: 3 })
 *  ✦ Auto-detect language from browser / URL param / localStorage
 *  ✦ Live DOM swap via data-i18n, data-i18n-attr, data-i18n-plural
 *  ✦ <html lang=""> updated on every switch
 *  ✦ MutationObserver — translates dynamically injected HTML
 *  ✦ Public API: MorinVibes.i18n.setLang('bm')
 *  ✦ Custom event: document fires 'mv:langchange' on switch
 *  ✦ Zero dependencies · ~3KB gzip
 *
 * HTML usage:
 *   <span data-i18n="nav_home"></span>
 *   <input data-i18n-attr="placeholder:search_placeholder">
 *   <span data-i18n-plural="bottle_count" data-count="3"></span>
 * ================================================================
 */

(function (root) {
  'use strict';

  // ─────────────────────────────────────────────
  // TRANSLATION DATA
  // ─────────────────────────────────────────────
  const translations = {

    // ══════════════════════════════════════════
    // ENGLISH
    // ══════════════════════════════════════════
    en: {
      _meta: { dir: 'ltr', label: 'English', flag: '🇬🇧' },

      // — Navigation —
      nav_home:            'Home',
      nav_farm:            'The Farm',
      nav_quality:         'Quality',
      nav_benefits:        'Benefits',
      nav_shop:            'Shop',
      nav_story:           'Our Story',
      nav_authentic:       'Authenticity',
      nav_ethics:          'Ethics',
      nav_faq:             'FAQ',
      nav_cta:             'Buy Now — RM89',
      nav_lang_en:         'English',
      nav_lang_bm:         'Bahasa Malaysia',
      nav_lang_zh:         '中文',

      // — Mobile menu —
      mobile_whatsapp:     'WhatsApp',
      mobile_close:        'Close menu',

      // — Trust bar —
      trust_since:         'SINCE 2019',
      trust_farm:          'FARM DIRECT',
      trust_gmp:           'GMP CERTIFIED',
      trust_kkm:           'KKM APPROVED',
      trust_vegan:         'VEGAN',
      trust_malaysia:      'MALAYSIA',
      trust_capsules:      '90 CAPSULES',
      trust_mg:            '500MG EACH',

      // — Hero —
      hero_eyebrow:        'EST. 2019 · PENANG, MALAYSIA',
      hero_title:          'Fresh From My Farm. Made for Everyday Wellness.',
      hero_subhead:        'Grown on my own land in Penang. Harvested by hand, gently dried, and encapsulated with care. No middlemen. Just me and my farm.',
      hero_btn_shop:       'Shop Now — RM89',
      hero_btn_farm:       'Discover My Farm',
      hero_badge:          'KKM Approved',
      hero_badge_aria:     'KKM Approved — Ministry of Health Malaysia',

      // — Shopee section —
      shopee_eyebrow:      '6+ YEARS ON SHOPEE',
      shopee_title:        '1000+ 5-Star Reviews',
      shopee_text:         'Trusted by customers since 2019. Now experience something better — direct from my farm.',
      shopee_store1:       'MorinVibes',
      shopee_store2:       'moringa_morinvibes',
      shopee_sales:        'Sales',
      shopee_years:        'Years',
      shopee_pure:         'Pure',
      shopee_cta:          'Shop on Shopee',
      shopee_cta_lazada:   'Shop on Lazada',

      // — Why Buy Direct —
      why_title:           'Why Buy Direct',
      why_subtitle:        'From My Farm to Your Door',
      why_fresher_title:   'Fresher Batches',
      why_fresher_text:    'Prepared after you order. No warehouse sitting.',
      why_price_title:     'Better Price',
      why_price_text:      'No 20% commission means savings for you.',
      why_support_title:   'Direct Support',
      why_support_text:    'WhatsApp me — the person who made your capsules.',
      why_pure_title:      '100% Pure',
      why_pure_text:       'No fillers, no additives. Just pure moringa.',

      // — Product card —
      product_eyebrow:         'ONE PRODUCT · PURE PURPOSE',
      product_title:           'Farm-Direct Moringa Capsules',
      product_brand:           'MORINVIBES',
      product_brand_small:     'MORINGA',
      product_name:            'LEAF POWDER',
      product_organic:         '100% ORGANIC',
      product_badge_raw:       'RAW',
      product_badge_organic:   'ORGANIC',
      product_badge_superfood: 'SUPERFOOD',
      product_badge_caffeine:  'CAFFEINE-FREE',
      product_badge_gluten:    'GLUTEN-FREE',
      product_badge_noadditive:'NON-ADDITIVE',
      product_badge_nongmo:    'NON-GMO',
      product_stat_nutrients:  'NUTRIENTS',
      product_stat_antioxidants:'ANTIOXIDANTS',
      product_stat_amino:      'AMINO ACID',
      product_capsules:        '90 CAPSULES',
      product_mg:              '(500mg per capsule)',
      product_price:           'RM89',
      product_btn_details:     'View Details',
      product_btn_buy:         'Buy Now',
      product_stock:           'In stock',
      product_low_stock:       'Low stock — order soon',

      // — Pluralization example —
      bottle_one:     '{{count}} bottle',
      bottle_other:   '{{count}} bottles',

      // — Farm section —
      farm_eyebrow:              'MY LAND, MY HANDS',
      farm_title:                'Not Warehouse Stock. Real Harvest.',
      farm_text:                 'My moringa comes from my own land in Penang. I bought this land — it\'s mine. No middlemen. No partners. Just me and my farm.',
      farm_process_harvest:      'HARVEST',
      farm_process_harvest_desc: 'Morning-picked, same-day processing',
      farm_process_dry:          'DRY',
      farm_process_dry_desc:     'Gently dried to preserve nutrients',
      farm_process_mill:         'MILL',
      farm_process_mill_desc:    'Fine powder, nothing added',
      farm_process_capsule:      'CAPSULE',
      farm_process_capsule_desc: 'Vegetarian capsules, 500mg each',
      farm_btn:                  'Visit My Farm →',

      // — Founder story —
      founder_eyebrow:  'FOUNDER\'S STORY',
      founder_title:    'From personal need to farm-direct purpose.',
      founder_text:     'My body was often weak. Discovering moringa changed my daily energy and became part of my life journey. What started in my house compound grew into a mission to share farm-direct moringa with others.',
      founder_quote:    'I started small, with one harvest and a simple goal — prepare moringa the way it deserves.',
      founder_name:     '— Jess, Founder',
      founder_btn:      'Read Full Story →',

      // — Shipping —
      shipping_title:       'Shipping',
      shipping_west:        'West Malaysia',
      shipping_east:        'East Malaysia',
      shipping_free:        'Free over RM150',
      shipping_west_price:  'RM7',
      shipping_east_price:  'RM15',
      shipping_days_west:   '3–5 business days',
      shipping_days_east:   '5–7 business days',

      // — Loyalty —
      loyalty_title:  'Loyalty Programme',
      loyalty_text:   'Coming soon — stay tuned for rewards and exclusive offers.',
      loyalty_badge:  '✨ Stay tuned',

      // — WhatsApp —
      whatsapp_title: 'We\'re Here for You!',
      whatsapp_text:  'Reach out on WhatsApp for quick responses, order support, or any questions.',
      whatsapp_btn:   'WhatsApp Me',
      whatsapp_aria:  'Open WhatsApp to contact Jess',

      // — FAQ —
      faq_eyebrow:  'COMMON QUESTIONS',
      faq_title:    'Quick Answers',
      faq_q1:       'Is MorinVibes KKM approved?',
      faq_a1:       'Yes! KKM Approved and GMP Certified.',
      faq_q2:       'Who is moringa suitable for?',
      faq_a2:       'Generally suitable for adults. If pregnant or nursing, consult your healthcare provider.',
      faq_q3:       'Is this the same brand as on Shopee?',
      faq_a3:       'Yes! Same brand, same quality. Website offers fresher batches and better prices.',
      faq_q4:       'Shipping to East Malaysia?',
      faq_a4:       'Yes, RM15. Delivery: 3–5 days West, 5–7 days East.',
      faq_btn:      'View All FAQs →',

      // — Search / accessibility —
      search_placeholder:  'Search…',
      loading:             'Loading…',
      close:               'Close',
      open:                'Open',
      required_field:      'This field is required',

      // — Footer —
      footer_tagline:    'Farm-direct moringa from my land in Penang · Since 2019',
      footer_navigate:   'Navigate',
      footer_trust:      'Trust',
      footer_contact:    'Contact',
      footer_privacy:    'Privacy',
      footer_terms:      'Terms',
      footer_copyright:  '© {{year}} MorinVibes®. All rights reserved.',

      // — Checkout —
      checkout_title:     'Complete Your Order',
      checkout_secure:    'Secure payment',
      checkout_bank:      'Bank transfer',
      checkout_fpx:       'FPX',
      checkout_encrypted: '256-bit encryption',
      checkout_name:      'Full Name',
      checkout_phone:     'Phone Number',
      checkout_address:   'Delivery Address',
      checkout_submit:    'Confirm Order',

      // — Thank you —
      thankyou_title:     'Thank You for Your Order!',
      thankyou_text:      'Your fresh batch is being prepared and will ship within 24–48 hours.',
      thankyou_questions: 'Questions?',
      thankyou_wa:        'WhatsApp Jess',
      thankyou_home:      'Return Home',
      thankyou_order_id:  'Order #{{id}}',

      // — Community popup —
      popup_title:    'Join Our Community',
      popup_text:     'Get updates, tips, and exclusive offers',
      popup_wa:       'WhatsApp Community',
      popup_ig:       'Instagram',
      popup_dismiss:  'No thanks, I\'ll browse',

      // — Cookie consent —
      cookie_text:    'We use cookies to improve your experience.',
      cookie_accept:  'Accept',
      cookie_decline: 'Decline',
    },

    // ══════════════════════════════════════════
    // BAHASA MALAYSIA
    // ══════════════════════════════════════════
    bm: {
      _meta: { dir: 'ltr', label: 'Bahasa Malaysia', flag: '🇲🇾' },

      // — Navigation —
      nav_home:      'Utama',
      nav_farm:      'Ladang',
      nav_quality:   'Kualiti',
      nav_benefits:  'Manfaat',
      nav_shop:      'Kedai',
      nav_story:     'Cerita Kami',
      nav_authentic: 'Keaslian',
      nav_ethics:    'Etika',
      nav_faq:       'Soalan',
      nav_cta:       'Beli — RM89',
      nav_lang_en:   'English',
      nav_lang_bm:   'Bahasa Malaysia',
      nav_lang_zh:   '中文',

      // — Mobile menu —
      mobile_whatsapp: 'WhatsApp',
      mobile_close:    'Tutup menu',

      // — Trust bar —
      trust_since:    'SEJAK 2019',
      trust_farm:     'LADANG LANGSUNG',
      trust_gmp:      'GMP',
      trust_kkm:      'KKM',
      trust_vegan:    'VEGAN',
      trust_malaysia: 'MALAYSIA',
      trust_capsules: '90 KAPSUL',
      trust_mg:       '500MG',

      // — Hero —
      hero_eyebrow:   'EST. 2019 · PULAU PINANG',
      hero_title:     'Segar Dari Ladang Saya. Untuk Kesihatan Harian.',
      hero_subhead:   'Ditanam di tanah saya sendiri di Pulau Pinang. Dituai sendiri, dikeringkan dengan lembut, dan dikapsulkan dengan penuh kasih. Tiada orang tengah.',
      hero_btn_shop:  'Beli — RM89',
      hero_btn_farm:  'Lawati Ladang',
      hero_badge:     'KKM',
      hero_badge_aria:'KKM Diluluskan — Kementerian Kesihatan Malaysia',

      // — Shopee —
      shopee_eyebrow:    '6+ TAHUN DI SHOPEE',
      shopee_title:      '1000+ Ulasan 5-Bintang',
      shopee_text:       'Dipercayai pelanggan sejak 2019. Kini lebih baik — terus dari ladang saya.',
      shopee_store1:     'MorinVibes',
      shopee_store2:     'moringa_morinvibes',
      shopee_sales:      'Jualan',
      shopee_years:      'Tahun',
      shopee_pure:       'Tulen',
      shopee_cta:        'Beli di Shopee',
      shopee_cta_lazada: 'Beli di Lazada',

      // — Why Buy Direct —
      why_title:          'Mengapa Beli Terus',
      why_subtitle:       'Dari Ladang ke Pintu Anda',
      why_fresher_title:  'Batch Lebih Segar',
      why_fresher_text:   'Disediakan selepas pesanan. Tiada stok gudang.',
      why_price_title:    'Harga Lebih Baik',
      why_price_text:     'Tiada komisen 20% — harga lebih baik untuk anda.',
      why_support_title:  'Sokongan Terus',
      why_support_text:   'WhatsApp saya — orang yang buat kapsul anda.',
      why_pure_title:     '100% Tulen',
      why_pure_text:      'Tiada pengisi, tiada bahan tambahan.',

      // — Product card —
      product_eyebrow:          'SATU PRODUK · TUJUAN TULEN',
      product_title:            'Kapsul Moringa Terus Ladang',
      product_brand:            'MORINVIBES',
      product_brand_small:      'MORINGA',
      product_name:             'SERBUK DAUN',
      product_organic:          '100% ORGANIK',
      product_badge_raw:        'MENTAH',
      product_badge_organic:    'ORGANIK',
      product_badge_superfood:  'SUPERFOOD',
      product_badge_caffeine:   'BEBAS KAFEIN',
      product_badge_gluten:     'BEBAS GLUTEN',
      product_badge_noadditive: 'TIADA BAHAN TAMBAH',
      product_badge_nongmo:     'BUKAN GMO',
      product_stat_nutrients:   'NUTRIEN',
      product_stat_antioxidants:'ANTIOKSIDA',
      product_stat_amino:       'ASID AMINO',
      product_capsules:         '90 KAPSUL',
      product_mg:               '(500mg per kapsul)',
      product_price:            'RM89',
      product_btn_details:      'Lihat Butiran',
      product_btn_buy:          'Beli',
      product_stock:            'Dalam stok',
      product_low_stock:        'Stok terhad — segera order',

      // — Pluralization —
      bottle_one:   '{{count}} botol',
      bottle_other: '{{count}} botol',

      // — Farm section —
      farm_eyebrow:              'TANAH SAYA, TANGAN SAYA',
      farm_title:                'Bukan Stok Gudang. Hasil Tuian Sebenar.',
      farm_text:                 'Moringa saya dari tanah saya sendiri di Pulau Pinang. Tanah ini milik saya. Tiada orang tengah. Hanya saya dan ladang saya.',
      farm_process_harvest:      'TUAI',
      farm_process_harvest_desc: 'Dipetik pagi, diproses hari sama',
      farm_process_dry:          'KERING',
      farm_process_dry_desc:     'Dikeringkan lembut untuk khasiat',
      farm_process_mill:         'KISAR',
      farm_process_mill_desc:    'Serbuk halus, tiada tambahan',
      farm_process_capsule:      'KAPSUL',
      farm_process_capsule_desc: 'Kapsul vegetarian, 500mg',
      farm_btn:                  'Lawati Ladang →',

      // — Founder story —
      founder_eyebrow: 'CERITA PENGASAS',
      founder_title:   'Dari keperluan peribadi ke tujuan ladang terus.',
      founder_text:    'Tubuh saya sering lemah. Menemui moringa mengubah tenaga harian saya. Bermula di halaman rumah, kini menjadi misi untuk kongsikan moringa terus dari ladang.',
      founder_quote:   'Saya bermula kecil, dengan satu tuaian dan matlamat mudah — sediakan moringa sepertimana ia layak dapatkan.',
      founder_name:    '— Jess, Pengasas',
      founder_btn:     'Baca Cerita →',

      // — Shipping —
      shipping_title:      'Penghantaran',
      shipping_west:       'Semenanjung',
      shipping_east:       'Sabah/Sarawak',
      shipping_free:       'Percuma over RM150',
      shipping_west_price: 'RM7',
      shipping_east_price: 'RM15',
      shipping_days_west:  '3–5 hari bekerja',
      shipping_days_east:  '5–7 hari bekerja',

      // — Loyalty —
      loyalty_title: 'Program Loyaliti',
      loyalty_text:  'Akan datang — nantikan ganjaran dan tawaran eksklusif.',
      loyalty_badge: '✨ Nantikan',

      // — WhatsApp —
      whatsapp_title: 'Kami di Sini untuk Anda!',
      whatsapp_text:  'WhatsApp saya untuk respons cepat, sokongan pesanan, atau sebarang pertanyaan.',
      whatsapp_btn:   'WhatsApp Saya',
      whatsapp_aria:  'Buka WhatsApp untuk hubungi Jess',

      // — FAQ —
      faq_eyebrow: 'SOALAN LAZIM',
      faq_title:   'Jawapan Pantas',
      faq_q1:      'Adakah MorinVibes diluluskan KKM?',
      faq_a1:      'Ya! Diluluskan KKM dan diperakui GMP.',
      faq_q2:      'Siapa sesuai ambil moringa?',
      faq_a2:      'Sesuai untuk dewasa. Jika hamil atau menyusu, rujuk doktor.',
      faq_q3:      'Jenama sama seperti di Shopee?',
      faq_a3:      'Ya! Jenama sama. Laman web tawarkan batch lebih segar dan harga lebih baik.',
      faq_q4:      'Penghantaran ke Sabah/Sarawak?',
      faq_a4:      'Ya, RM15. Penghantaran: 3–5 hari Semenanjung, 5–7 hari Sabah/Sarawak.',
      faq_btn:     'Semua Soalan →',

      // — Search / accessibility —
      search_placeholder: 'Cari…',
      loading:            'Memuatkan…',
      close:              'Tutup',
      open:               'Buka',
      required_field:     'Medan ini diperlukan',

      // — Footer —
      footer_tagline:   'Moringa terus ladang dari tanah saya di Pulau Pinang · Sejak 2019',
      footer_navigate:  'Navigasi',
      footer_trust:     'Amanah',
      footer_contact:   'Hubungi',
      footer_privacy:   'Privasi',
      footer_terms:     'Terma',
      footer_copyright: '© {{year}} MorinVibes®. Hak cipta terpelihara.',

      // — Checkout —
      checkout_title:     'Lengkapkan Pesanan Anda',
      checkout_secure:    'Pembayaran selamat',
      checkout_bank:      'Pindahan bank',
      checkout_fpx:       'FPX',
      checkout_encrypted: 'Enkripsi 256-bit',
      checkout_name:      'Nama Penuh',
      checkout_phone:     'Nombor Telefon',
      checkout_address:   'Alamat Penghantaran',
      checkout_submit:    'Sahkan Pesanan',

      // — Thank you —
      thankyou_title:     'Terima Kasih Atas Pesanan Anda!',
      thankyou_text:      'Batch segar anda sedang disediakan dan akan dihantar dalam 24–48 jam.',
      thankyou_questions: 'Ada soalan?',
      thankyou_wa:        'WhatsApp Jess',
      thankyou_home:      'Kembali ke Utama',
      thankyou_order_id:  'Pesanan #{{id}}',

      // — Community popup —
      popup_title:   'Sertai Komuniti Kami',
      popup_text:    'Dapatkan kemas kini, petua, dan tawaran eksklusif',
      popup_wa:      'Komuniti WhatsApp',
      popup_ig:      'Instagram',
      popup_dismiss: 'Tidak, terima kasih',

      // — Cookie consent —
      cookie_text:    'Kami menggunakan kuki untuk meningkatkan pengalaman anda.',
      cookie_accept:  'Terima',
      cookie_decline: 'Tolak',
    },

    // ══════════════════════════════════════════
    // CHINESE (SIMPLIFIED)
    // ══════════════════════════════════════════
    zh: {
      _meta: { dir: 'ltr', label: '中文', flag: '🇨🇳' },

      // — Navigation —
      nav_home:      '首页',
      nav_farm:      '农场',
      nav_quality:   '品质',
      nav_benefits:  '功效',
      nav_shop:      '商店',
      nav_story:     '故事',
      nav_authentic: '正品',
      nav_ethics:    '道德',
      nav_faq:       '常见问题',
      nav_cta:       '购买 — RM89',
      nav_lang_en:   'English',
      nav_lang_bm:   'Bahasa Malaysia',
      nav_lang_zh:   '中文',

      // — Mobile menu —
      mobile_whatsapp: 'WhatsApp',
      mobile_close:    '关闭菜单',

      // — Trust bar —
      trust_since:    '始于2019',
      trust_farm:     '农场直供',
      trust_gmp:      'GMP认证',
      trust_kkm:      '卫生部批准',
      trust_vegan:    '纯素',
      trust_malaysia: '马来西亚',
      trust_capsules: '90粒',
      trust_mg:       '500毫克',

      // — Hero —
      hero_eyebrow:   '始于2019 · 槟城',
      hero_title:     '我的农场新鲜直送。为日常健康而生。',
      hero_subhead:   '在我自己的槟城土地上种植。亲手采摘，温和干燥，精心封装。没有中间商。只有我和我的农场。',
      hero_btn_shop:  '立即购买 — RM89',
      hero_btn_farm:  '探索农场',
      hero_badge:     '卫生部批准',
      hero_badge_aria:'卫生部批准 — 马来西亚卫生部',

      // — Shopee —
      shopee_eyebrow:    'Shopee 6年以上',
      shopee_title:      '1000+五星好评',
      shopee_text:       '自2019年深受顾客信赖。现在体验更好 — 直接从我的农场购买。',
      shopee_store1:     'MorinVibes',
      shopee_store2:     'moringa_morinvibes',
      shopee_sales:      '销量',
      shopee_years:      '年',
      shopee_pure:       '纯正',
      shopee_cta:        '在Shopee购买',
      shopee_cta_lazada: '在Lazada购买',

      // — Why Buy Direct —
      why_title:         '为何直接购买',
      why_subtitle:      '从我的农场到您家门',
      why_fresher_title: '更新鲜批次',
      why_fresher_text:  '下单后准备。没有仓库库存。',
      why_price_title:   '更优惠价格',
      why_price_text:    '免20%佣金，为您省钱。',
      why_support_title: '直接支持',
      why_support_text:  'WhatsApp联系我 — 亲自制作您胶囊的人。',
      why_pure_title:    '100%纯正',
      why_pure_text:     '无填充剂，无添加剂。纯辣木。',

      // — Product card —
      product_eyebrow:          '单一产品 · 纯粹使命',
      product_title:            '农场直供辣木胶囊',
      product_brand:            'MORINVIBES',
      product_brand_small:      '辣木',
      product_name:             '叶粉',
      product_organic:          '100%有机',
      product_badge_raw:        '生食',
      product_badge_organic:    '有机',
      product_badge_superfood:  '超级食物',
      product_badge_caffeine:   '无咖啡因',
      product_badge_gluten:     '无麸质',
      product_badge_noadditive: '无添加剂',
      product_badge_nongmo:     '非转基因',
      product_stat_nutrients:   '营养素',
      product_stat_antioxidants:'抗氧化剂',
      product_stat_amino:       '氨基酸',
      product_capsules:         '90粒',
      product_mg:               '（每粒500毫克）',
      product_price:            'RM89',
      product_btn_details:      '查看详情',
      product_btn_buy:          '立即购买',
      product_stock:            '有货',
      product_low_stock:        '库存紧张 — 尽快下单',

      // — Pluralization —
      bottle_one:   '{{count}}瓶',
      bottle_other: '{{count}}瓶',

      // — Farm section —
      farm_eyebrow:              '我的土地，我的双手',
      farm_title:                '不是仓库库存。真正收获。',
      farm_text:                 '我的辣木来自我在槟城的土地。这是我拥有的土地。没有中间商。只有我和我的农场。',
      farm_process_harvest:      '收获',
      farm_process_harvest_desc: '清晨采摘，当天加工',
      farm_process_dry:          '干燥',
      farm_process_dry_desc:     '温和干燥，保留营养',
      farm_process_mill:         '研磨',
      farm_process_mill_desc:    '细粉，无添加',
      farm_process_capsule:      '胶囊',
      farm_process_capsule_desc: '素食胶囊，每粒500毫克',
      farm_btn:                  '参观农场 →',

      // — Founder story —
      founder_eyebrow: '创始人故事',
      founder_title:   '从个人需求到农场直供使命。',
      founder_text:    '我身体常感虚弱。发现辣木改变了我的日常精力，成为我人生旅程的一部分。从我家院子开始，发展成分享农场直供辣木的使命。',
      founder_quote:   '我从一个小收获开始，目标很简单 — 以应有的方式准备辣木。',
      founder_name:    '— Jess，创始人',
      founder_btn:     '阅读故事 →',

      // — Shipping —
      shipping_title:      '运费',
      shipping_west:       '西马',
      shipping_east:       '东马',
      shipping_free:       '满RM150免运费',
      shipping_west_price: 'RM7',
      shipping_east_price: 'RM15',
      shipping_days_west:  '3–5个工作日',
      shipping_days_east:  '5–7个工作日',

      // — Loyalty —
      loyalty_title: '会员计划',
      loyalty_text:  '即将推出 — 敬请期待奖励和独家优惠。',
      loyalty_badge: '✨ 敬请期待',

      // — WhatsApp —
      whatsapp_title: '我们为您服务！',
      whatsapp_text:  '通过WhatsApp联系我们，快速回复、订单支持或任何问题。',
      whatsapp_btn:   'WhatsApp联系',
      whatsapp_aria:  '打开WhatsApp联系Jess',

      // — FAQ —
      faq_eyebrow: '常见问题',
      faq_title:   '快速解答',
      faq_q1:      'MorinVibes获得卫生部批准吗？',
      faq_a1:      '是的！已获卫生部批准和GMP认证。',
      faq_q2:      '辣木适合谁？',
      faq_a2:      '一般适合成年人。如怀孕或哺乳，请咨询医生。',
      faq_q3:      '这是Shopee上的同一品牌吗？',
      faq_a3:      '是的！同一品牌，相同品质。官网提供更新鲜批次和更优惠价格。',
      faq_q4:      '运送到东马？',
      faq_a4:      '是的，RM15。送货时间：西马3–5天，东马5–7天。',
      faq_btn:     '查看所有问题 →',

      // — Search / accessibility —
      search_placeholder: '搜索…',
      loading:            '加载中…',
      close:              '关闭',
      open:               '打开',
      required_field:     '此字段为必填项',

      // — Footer —
      footer_tagline:   '来自我槟城土地的农场直供辣木 · 始于2019',
      footer_navigate:  '导航',
      footer_trust:     '信任',
      footer_contact:   '联系',
      footer_privacy:   '隐私政策',
      footer_terms:     '条款',
      footer_copyright: '© {{year}} MorinVibes®。保留所有权利。',

      // — Checkout —
      checkout_title:     '完成您的订单',
      checkout_secure:    '安全支付',
      checkout_bank:      '银行转账',
      checkout_fpx:       'FPX',
      checkout_encrypted: '256位加密',
      checkout_name:      '全名',
      checkout_phone:     '电话号码',
      checkout_address:   '送货地址',
      checkout_submit:    '确认订单',

      // — Thank you —
      thankyou_title:     '感谢您的订单！',
      thankyou_text:      '您的新鲜批次正在准备中，将在24–48小时内发货。',
      thankyou_questions: '有问题？',
      thankyou_wa:        'WhatsApp Jess',
      thankyou_home:      '返回首页',
      thankyou_order_id:  '订单 #{{id}}',

      // — Community popup —
      popup_title:   '加入我们的社区',
      popup_text:    '获取更新、技巧和独家优惠',
      popup_wa:      'WhatsApp社区',
      popup_ig:      'Instagram',
      popup_dismiss: '不，谢谢',

      // — Cookie consent —
      cookie_text:    '我们使用Cookie来改善您的体验。',
      cookie_accept:  '接受',
      cookie_decline: '拒绝',
    },
  };

  // ─────────────────────────────────────────────
  // i18n ENGINE
  // ─────────────────────────────────────────────

  const SUPPORTED  = Object.keys(translations).filter((k) => k !== '_meta');
  const FALLBACK   = 'en';
  const LS_KEY     = 'mv_lang';
  const URL_PARAM  = 'lang';

  let currentLang = FALLBACK;

  /** Detect best language: URL param → localStorage → browser → fallback. */
  function detectLang() {
    const urlLang = new URLSearchParams(window.location.search).get(URL_PARAM);
    if (urlLang && SUPPORTED.includes(urlLang)) return urlLang;

    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (_) { /* localStorage blocked */ }

    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('ms') || browserLang === 'bm') return 'bm';

    return FALLBACK;
  }

  /**
   * Translate a key with optional interpolation and pluralization.
   *
   * @param {string} key
   * @param {object} [vars]  - { count, year, name, id, … }
   * @param {string} [lang]  - override language
   * @returns {string}
   */
  function t(key, vars = {}, lang = currentLang) {
    // Pluralization: look for key_one / key_other based on count
    let resolvedKey = key;
    if ('count' in vars) {
      const pluralKey = vars.count === 1 ? `${key}_one` : `${key}_other`;
      if (translations[lang] && translations[lang][pluralKey]) {
        resolvedKey = pluralKey;
      }
    }

    // Fallback chain
    const value =
      (translations[lang]    && translations[lang][resolvedKey]) ||
      (translations[FALLBACK] && translations[FALLBACK][resolvedKey]) ||
      key; // last resort: return the key itself

    // Interpolate {{ variable }} tokens
    return value.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, token) => {
      if (token === 'year') return new Date().getFullYear();
      return vars[token] !== undefined ? vars[token] : `{{${token}}}`;
    });
  }

  // ─────────────────────────────────────────────
  // DOM RENDERING
  // ─────────────────────────────────────────────

  /**
   * Translate a single element.
   * Supports: data-i18n, data-i18n-attr, data-i18n-html, data-i18n-plural
   */
  function translateEl(el) {
    const key = el.dataset.i18n;
    if (key) {
      el.textContent = t(key);
    }

    // data-i18n-html: sets innerHTML (use sparingly — sanitise if user input possible)
    const htmlKey = el.dataset.i18nHtml;
    if (htmlKey) {
      el.innerHTML = t(htmlKey);
    }

    // data-i18n-attr="placeholder:key1,aria-label:key2"
    const attrStr = el.dataset.i18nAttr;
    if (attrStr) {
      attrStr.split(',').forEach((pair) => {
        const [attr, attrKey] = pair.split(':').map((s) => s.trim());
        if (attr && attrKey) el.setAttribute(attr, t(attrKey));
      });
    }

    // data-i18n-plural="key" data-count="3"
    const pluralKey = el.dataset.i18nPlural;
    if (pluralKey) {
      const count = parseInt(el.dataset.count || '1', 10);
      el.textContent = t(pluralKey, { count });
    }
  }

  /** Translate all qualifying elements inside a root node. */
  function translateDOM(root = document) {
    root.querySelectorAll('[data-i18n], [data-i18n-attr], [data-i18n-html], [data-i18n-plural]')
      .forEach(translateEl);
  }

  // ─────────────────────────────────────────────
  // LANGUAGE SWITCHER
  // ─────────────────────────────────────────────

  /** Switch active language and re-render the page. */
  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) {
      console.warn(`[MorinVibes i18n] Unknown language: "${lang}". Supported: ${SUPPORTED.join(', ')}`);
      return;
    }

    currentLang = lang;

    // Persist
    try { localStorage.setItem(LS_KEY, lang); } catch (_) { }

    // Update <html lang="">
    document.documentElement.lang = lang;

    // Update text direction
    const meta = translations[lang]._meta || {};
    document.documentElement.dir = meta.dir || 'ltr';

    // Re-render all translated elements
    translateDOM();

    // Update active state on switcher buttons
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.langBtn === lang);
      btn.setAttribute('aria-pressed', String(btn.dataset.langBtn === lang));
    });

    // Fire custom event for other scripts to hook into
    document.dispatchEvent(
      new CustomEvent('mv:langchange', { detail: { lang, meta } })
    );
  }

  // ─────────────────────────────────────────────
  // SWITCHER BUTTON WIRING
  // ─────────────────────────────────────────────

  function initSwitcherButtons() {
    // Support both [data-lang-btn="bm"] and legacy [data-lang="bm"] patterns
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang-btn], [data-lang]');
      if (!btn) return;
      const lang = btn.dataset.langBtn || btn.dataset.lang;
      if (lang && SUPPORTED.includes(lang)) {
        e.preventDefault();
        setLang(lang);
      }
    });
  }

  // ─────────────────────────────────────────────
  // MUTATION OBSERVER — handles dynamic HTML
  // ─────────────────────────────────────────────

  function initMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return; // elements only
          // Translate the node itself and its children
          if (node.dataset && (node.dataset.i18n || node.dataset.i18nAttr || node.dataset.i18nPlural)) {
            translateEl(node);
          }
          translateDOM(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ─────────────────────────────────────────────
  // BOOT
  // ─────────────────────────────────────────────

  function init() {
    currentLang = detectLang();
    initSwitcherButtons();
    translateDOM();
    initMutationObserver();

    // Set initial html[lang] and dir
    document.documentElement.lang = currentLang;
    const meta = (translations[currentLang] || {})._meta || {};
    document.documentElement.dir = meta.dir || 'ltr';

    // Mark active switcher button
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.langBtn === currentLang);
      btn.setAttribute('aria-pressed', String(btn.dataset.langBtn === currentLang));
    });

    if (typeof window !== 'undefined' && window.location.search.includes('mv_debug=1')) {
      console.log('%c[MorinVibes i18n] v8.0 ready', 'color:#2e7d32;font-weight:bold', {
        lang: currentLang,
        supported: SUPPORTED,
        keys: Object.keys(translations[currentLang]).length,
      });
    }
  }

  // ─────────────────────────────────────────────
  // PUBLIC API
  // ─────────────────────────────────────────────

  root.MorinVibes = root.MorinVibes || {};
  root.MorinVibes.i18n = {
    /** Translate a key: MorinVibes.i18n.t('nav_home') */
    t,
    /** Switch language: MorinVibes.i18n.setLang('bm') */
    setLang,
    /** Get current language code */
    getLang: () => currentLang,
    /** List supported language codes */
    supported: () => [...SUPPORTED],
    /** Access raw translation data */
    data: translations,
  };

  // CommonJS / Node (SSR, testing)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.MorinVibes.i18n;
  }

  // Boot when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}(typeof globalThis !== 'undefined' ? globalThis : window));
