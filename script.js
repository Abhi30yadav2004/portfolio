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
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
            }
        }
        navLinks?.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
    });
});

// Close the mobile menu with the Escape key
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && navLinks?.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
        navToggle?.focus();
    }
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
const words = ["Python", "SQL", "ETL pipelines", "Power BI", "Java"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
    if (!typedTextEl) return;

    // Respect reduced-motion: show the first skill statically, no typing loop
    if (prefersReducedMotion) {
        typedTextEl.textContent = words[0];
        return;
    }

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