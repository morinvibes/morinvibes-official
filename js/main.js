// LANGUAGE DICTIONARY
const translations = {
    en: {
        nav_home:"Home",
        nav_benefits:"Benefits",
        nav_science:"Science",
        nav_reviews:"Reviews",
        nav_faq:"FAQ",
        nav_order:"Order Now",
        hero_desc:"Premium Moringa Capsules formulated for modern vitality.",
        hero_btn:"Start Now",
        stat_customers:"Happy Customers",
        stat_satisfaction:"Satisfaction Rate (%)",
        order_title:"Begin Your Wellness Journey Today"
    },
    bm: {
        nav_home:"Utama",
        nav_benefits:"Kelebihan",
        nav_science:"Sains",
        nav_reviews:"Ulasan",
        nav_faq:"Soalan Lazim",
        nav_order:"Pesan Sekarang",
        hero_desc:"Kapsul Moringa premium untuk tenaga dan kesihatan moden.",
        hero_btn:"Mulakan Sekarang",
        stat_customers:"Pelanggan Gembira",
        stat_satisfaction:"Kadar Kepuasan (%)",
        order_title:"Mulakan Perjalanan Kesihatan Anda"
    },
    "zh-cn": {
        nav_home:"首页",
        nav_benefits:"功效",
        nav_science:"科学依据",
        nav_reviews:"评价",
        nav_faq:"常见问题",
        nav_order:"立即购买",
        hero_desc:"专为现代活力打造的高品质辣木胶囊。",
        hero_btn:"立即开始",
        stat_customers:"满意顾客",
        stat_satisfaction:"满意率 (%)",
        order_title:"开启您的健康之旅"
    },
    "zh-tw": {
        nav_home:"首頁",
        nav_benefits:"功效",
        nav_science:"科學依據",
        nav_reviews:"評價",
        nav_faq:"常見問題",
        nav_order:"立即購買",
        hero_desc:"專為現代活力打造的高品質辣木膠囊。",
        hero_btn:"立即開始",
        stat_customers:"滿意顧客",
        stat_satisfaction:"滿意率 (%)",
        order_title:"開啟您的健康之旅"
    }
};

// LANGUAGE SWITCH
function setLanguage(lang){
    document.querySelectorAll("[data-translate]").forEach(el=>{
        const key = el.getAttribute("data-translate");
        el.innerText = translations[lang][key];
    });
}

// COUNTER ANIMATION
document.querySelectorAll(".counter").forEach(counter=>{
    const update = ()=>{
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target/100;

        if(count < target){
            counter.innerText = Math.ceil(count + increment);
            setTimeout(update,20);
        } else {
            counter.innerText = target;
        }
    };
    update();
});

// TYPING EFFECT
const text = "Fuel Your Body. Power Your Life.";
let i=0;
function type(){
    if(i < text.length){
        document.querySelector(".typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(type,50);
    }
}
type();

// PARALLAX
window.addEventListener("scroll",()=>{
    document.querySelector(".hero").style.backgroundPositionY =
        window.pageYOffset * 0.5 + "px";
});
