// =========================================================
// MOBILE NAV TOGGLE
// =========================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen);
    });
}

// =========================================================
// SMOOTH SCROLL + CLOSE MOBILE MENU ON LINK CLICK
// =========================================================
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
        navLinks.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
    });
});

// =========================================================
// NAVBAR SHADOW ON SCROLL + ACTIVE LINK HIGHLIGHT
// =========================================================
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-link");

function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 10);

    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.getAttribute("id");
    });

    navAnchors.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
}
window.addEventListener("scroll", onScroll);
onScroll();

// =========================================================
// HERO TYPING EFFECT
// =========================================================
const typedTextEl = document.getElementById("typedText");
const words = ["Java", "Python", "MySQL", "Power BI", "IoT"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
    if (!typedTextEl) return;

    const current = words[wordIndex];

    if (!deleting) {
        charIndex++;
        typedTextEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1400);
            return;
        }
    } else {
        charIndex--;
        typedTextEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeLoop, deleting ? 55 : 110);
}
typeLoop();

// =========================================================
// SCROLL REVEAL ANIMATION (SAFE VERSION)
// =========================================================
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

// =========================================================
// SKILL BAR ANIMATION (runs once per bar, when visible)
// =========================================================
const skillBars = document.querySelectorAll(".skill-bar-fill");

if ("IntersectionObserver" in window && skillBars.length) {
    const barObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    skillBars.forEach(bar => barObserver.observe(bar));
} else {
    // Fallback: just show full bars
    skillBars.forEach(bar => bar.classList.add("animate"));
}

// =========================================================
// BACK TO TOP BUTTON
// =========================================================
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.scrollY > 500);
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// =========================================================
// FOOTER YEAR
// =========================================================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();