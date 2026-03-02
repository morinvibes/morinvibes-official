// 多語言翻譯
const translations = {
  en: {
    title: "Welcome to MorinVibes Moringa",
    subtitle: "Natural Wellness from Penang, Malaysia"
  },
  ms: {
    title: "Selamat datang ke MorinVibes Moringa",
    subtitle: "Kesihatan semula jadi dari Pulau Pinang, Malaysia"
  },
  "zh-cn": {
    title: "欢迎来到 MorinVibes Moringa",
    subtitle: "来自马来西亚槟城的天然健康"
  },
  "zh-tw": {
    title: "歡迎來到 MorinVibes Moringa",
    subtitle: "來自馬來西亞檳城的天然健康"
  }
};

function setLang(lang) {
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("subtitle").innerText = translations[lang].subtitle;
}

// 滾動動畫效果
window.addEventListener("scroll", function() {
  const heroImg = document.querySelector(".hero img");
  const position = heroImg.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;
  if (position < screenHeight) {
    heroImg.classList.add("fade-in");
  }
});
