// Scroll to order
function scrollToOrder(){
  document.getElementById('order').scrollIntoView({behavior:'smooth'});
  fbq('track','AddToCart');
}

// Scroll Reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
});

document.querySelectorAll('.reveal').forEach(el=>{
  observer.observe(el);
});

// Fire AddToCart when order section visible
const orderSection = document.getElementById('order');
const orderObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      fbq('track','AddToCart');
    }
  });
},{threshold:0.6});

orderObserver.observe(orderSection);

// Translation Engine
const translations = {
  en: {
    heroTitle: "Penang’s Purest Moringa",
    heroDesc: "Farm-grown in Penang. GMP manufactured. KKM registered."
  },
  bm: {
    heroTitle: "Moringa Paling Tulen dari Pulau Pinang",
    heroDesc: "Ditanam sendiri dan diproses di kilang GMP."
  },
  zh: {
    heroTitle: "槟城最纯正的辣木精华",
    heroDesc: "自家农场种植，GMP工厂生产，KKM认证。"
  }
};

document.getElementById('languageSwitcher')
.addEventListener('change', function(){
  const lang = this.value;
  document.querySelectorAll('[data-key]').forEach(el=>{
    el.innerText = translations[lang][el.dataset.key];
  });
  fbq('trackCustom','LanguageSwitch',{language:lang});
});
