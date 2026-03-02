<script>
/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('section, .card, .hero h1, .hero p')
    .forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

/* =========================
   NAVBAR SCROLL EFFECT
========================= */

window.addEventListener('scroll', function(){
    const nav = document.querySelector('nav');
    if(window.scrollY > 50){
        nav.style.background = "rgba(10,15,20,0.95)";
        nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
    } else {
        nav.style.background = "rgba(10,15,20,0.8)";
        nav.style.boxShadow = "none";
    }
});

/* =========================
   BUTTON RIPPLE EFFECT
========================= */

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e){
        const circle = document.createElement('span');
        circle.classList.add('ripple');
        const rect = button.getBoundingClientRect();
        circle.style.left = e.clientX - rect.left + 'px';
        circle.style.top = e.clientY - rect.top + 'px';
        this.appendChild(circle);

        setTimeout(() => circle.remove(), 600);
    });
});
</script>
