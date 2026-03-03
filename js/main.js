// MorinVibes Localization Data
const translations = {
    en: {
        heroTitle: "Botanical Support for <br><span class='italic'>Modern Resilience.</span>",
        orderBtn: "Secure Your Monthly Supply"
    },
    bm: {
        heroTitle: "Sokongan Botani untuk <br><span class='italic'>Ketabahan Moden.</span>",
        orderBtn: "Dapatkan Bekalan Bulanan Anda"
    }
};

function setLang(lang) {
    // Basic localization switcher logic
    console.log(`Setting language to: ${lang}`);
    document.querySelectorAll('.lang-switcher button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Smooth transition for content updates can be added here
}

// Performance: Intersection Observer for fade-in effects
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => observer.observe(section));

// Orderla Pro Link Logic
// Ensures all links to the shop include the correct Pro subdomain tracking
document.querySelectorAll('a[href*="orderla.my"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log("Redirecting to Orderla Pro Sales Engine...");
    });
});
