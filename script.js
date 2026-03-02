const translations = {
  en: {
    title: "Welcome to MorinVibes Moringa",
    about: "This is our wellness brand from Penang, Malaysia."
  },
  ms: {
    title: "Selamat datang ke MorinVibes Moringa",
    about: "Ini adalah jenama kesihatan kami dari Pulau Pinang, Malaysia."
  },
  "zh-cn": {
    title: "欢迎来到 MorinVibes Moringa",
    about: "这是我们来自马来西亚槟城的健康品牌。"
  },
  "zh-tw": {
    title: "歡迎來到 MorinVibes Moringa",
    about: "這是我們來自馬來西亞檳城的健康品牌。"
  }
};

function setLang(lang) {
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("about").innerText = translations[lang].about;
}
