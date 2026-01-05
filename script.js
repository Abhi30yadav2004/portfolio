// Smooth scroll for navbar links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll Reveal Animation (SAFE VERSION)
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    function revealElements() {
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 80) {
                el.classList.add("active");
            }
        });
    }

    revealElements(); // run once
    window.addEventListener("scroll", revealElements);
});
